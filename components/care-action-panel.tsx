"use client";

import { Card, StatusBadge } from "@/components/app-ui";
import { useI18n } from "@/components/i18n-provider";
import {
  activePartnersForCare,
  costRows,
  recommendedCostRowId
} from "@/lib/partners";

interface CareActionPanelProps {
  recommendedCare: string;
}

/**
 * Cost comparison + partner action section shown on non-emergency results.
 * Commercial links are flat-rate advertising placements; the FTC disclosure
 * below the table renders whenever this panel renders.
 */
export function CareActionPanel({ recommendedCare }: CareActionPanelProps) {
  const { t } = useI18n();
  const highlightId = recommendedCostRowId(recommendedCare);
  const partners = activePartnersForCare(recommendedCare);

  return (
    <Card className="tool-section care-action-panel">
      <h2>{t("action.title")}</h2>
      <p className="help-text">{t("action.subtitle")}</p>

      <div className="table-scroll">
        <table className="tool-table action-cost-table">
          <thead>
            <tr>
              <th>{t("action.table.option")}</th>
              <th>{t("action.table.cost")}</th>
              <th>{t("action.table.wait")}</th>
            </tr>
          </thead>
          <tbody>
            {costRows.map((row) => (
              <tr key={row.id} className={row.id === highlightId ? "action-row-recommended" : undefined}>
                <th>
                  {t(row.labelKey)}
                  {row.id === highlightId ? (
                    <span className="action-recommended-badge">
                      <StatusBadge tone="primary">{t("action.recommendedBadge")}</StatusBadge>
                    </span>
                  ) : null}
                </th>
                <td>{row.cost}</td>
                <td>{t(row.waitKey)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="help-text" style={{ marginTop: 8 }}>{t("action.costSource")}</p>

      {partners.length > 0 ? (
        <div className="partner-link-list">
          <h3>{t("action.partnersTitle")}</h3>
          {partners.map((partner) => (
            <a
              key={partner.id}
              className="partner-link"
              href={partner.url}
              target="_blank"
              rel="sponsored noopener noreferrer"
            >
              <span className="partner-link-label">{t(partner.labelKey)}</span>
              <span className="partner-link-desc">{t(partner.descKey)}</span>
            </a>
          ))}
        </div>
      ) : null}

      <p className="help-text action-disclosure">{t("action.disclosure")}</p>
    </Card>
  );
}
