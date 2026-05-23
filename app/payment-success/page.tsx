"use client";

import { useEffect, useState, useCallback } from "react";
import { Card, PageHeader, PrimaryButton, SecondaryButton, StatusBadge } from "@/components/app-ui";
import { useI18n } from "@/components/i18n-provider";
import { fetchMe, isLoggedIn, getActivePlan } from "@/lib/auth-client";
import type { MeResponse } from "@/lib/auth-client";

type EntitlementState = "checking" | "granted" | "not_granted";

function planLabel(plan: string) {
  if (plan === "plus") return "Plus";
  if (plan === "one_time_report") return "One-Time Report";
  return "";
}

export default function PaymentSuccessPage() {
  const { t } = useI18n();
  const [plan, setPlan] = useState("");
  const [entitlementState, setEntitlementState] = useState<EntitlementState>("checking");
  const [me, setMe] = useState<MeResponse | null>(null);

  const checkEntitlement = useCallback(async () => {
    const result = await fetchMe();
    setMe(result);
    if (isLoggedIn(result) && getActivePlan(result)) {
      setEntitlementState("granted");
    } else if (isLoggedIn(result)) {
      // Logged in but no active entitlement yet — webhook may still be processing
      setEntitlementState("checking");
    } else {
      setEntitlementState("not_granted");
    }
  }, []);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setPlan(params.get("plan") || "");
    checkEntitlement();
  }, [checkEntitlement]);

  // Poll while entitlement is not yet confirmed
  useEffect(() => {
    if (entitlementState !== "checking") return;
    const timer = setInterval(checkEntitlement, 3000);
    return () => clearInterval(timer);
  }, [entitlementState, checkEntitlement]);

  const activePlan = getActivePlan(me);

  return (
    <section className="app-page">
      <PageHeader
        eyebrow={t("payment.eyebrow")}
        title={entitlementState === "granted"
          ? t("payment.receivedTitle")
          : t("payment.verifyingTitle")}
        description={entitlementState === "granted"
          ? t("payment.creemDescription")
          : t("payment.verificationNote")}
      />

      {entitlementState === "granted" && activePlan ? (
        <Card className="paid-tool-card">
          <StatusBadge tone="primary">{t("payment.creemBadge")}</StatusBadge>
          <h2>{planLabel(activePlan)} — Active</h2>
          <p>{t("payment.planActiveDescription")}</p>
        </Card>
      ) : entitlementState === "checking" ? (
        <Card className="paid-tool-card">
          <StatusBadge tone="primary">{t("payment.creemBadge")}</StatusBadge>
          <h2>{t("payment.verifyingEntitlement")}</h2>
          <p>{t("payment.verificationNote")}</p>
        </Card>
      ) : (
        <Card className="paid-tool-card">
          <StatusBadge tone="warning">{t("payment.creemBadge")}</StatusBadge>
          <h2>{t("payment.notLoggedInTitle")}</h2>
          <p>{t("payment.notLoggedInDescription")}</p>
          <PrimaryButton href="/login">{t("nav.login")}</PrimaryButton>
        </Card>
      )}

      <div className="paid-tool-grid">
        <Card className="paid-tool-card">
          <h2>{t("nav.healthSummary")}</h2>
          <p>{t("payment.recordsText")}</p>
          <PrimaryButton href="/health-records">{t("payment.goHealthRecords")}</PrimaryButton>
        </Card>
        <Card className="paid-tool-card">
          <h2>{t("common.startSymptomCheck")}</h2>
          <p>{t("payment.symptomText")}</p>
          <SecondaryButton href="/symptom-check">{t("common.startSymptomCheck")}</SecondaryButton>
        </Card>
        <Card className="paid-tool-card">
          <h2>{t("nav.home")}</h2>
          <p>{t("payment.dashboardText")}</p>
          <SecondaryButton href="/">{t("payment.backDashboard")}</SecondaryButton>
        </Card>
      </div>
    </section>
  );
}
