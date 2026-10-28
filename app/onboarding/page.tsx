"use client";

import { useEffect, useState } from "react";
import { Card, PageHeader, PrimaryButton } from "@/components/app-ui";
import { useI18n } from "@/components/i18n-provider";
import { readUser, type HealthMatchUser } from "@/lib/auth";

export default function OnboardingPage() {
  const [user, setUser] = useState<HealthMatchUser | null>(null);
  const { t } = useI18n();

  useEffect(() => {
    setUser(readUser());
  }, []);

  return (
    <section className="app-page auth-page">
      <PageHeader title={user?.name ? t("onboarding.welcome").replace("{name}", user.name) : t("onboarding.title")} description={t("onboarding.ready")} />
      <div className="paid-tool-grid">
        <Card className="paid-tool-card"><h2>{t("onboarding.startTitle")}</h2><p>{t("onboarding.startText")}</p><PrimaryButton href="/symptom-check">{t("common.startSymptomCheck")}</PrimaryButton></Card>
        <Card className="paid-tool-card"><h2>{t("onboarding.profileTitle")}</h2><p>{t("onboarding.profileText")}</p><PrimaryButton href="/settings">{t("onboarding.openSettings")}</PrimaryButton></Card>
      </div>
    </section>
  );
}
