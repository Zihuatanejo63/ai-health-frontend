export default function Privacy() {
  return (
    <div className="hm-page hm-prose">
      <header className="hm-page-heading">
        <p className="hm-overline">UPDATED OCTOBER 24, 2026 · PREVIEW</p>
        <h1>Privacy, from the beginning.</h1>
        <p>
          This notice covers the phase 1 marketing preview. Its sample reports
          contain fictional data. It offers no upload, account creation,
          checkout, or health-data submission through the new marketing pages.
        </p>
      </header>
      <section>
        <h2>What this preview processes</h2>
        <p>
          The browser requests static pages and assets. The local preview server
          may record technical request information. The new marketing pages do
          not initialize the legacy account client or load analytics scripts. Do
          not enter health information into retained legacy tools; those pages
          belong to the retired product.
        </p>
      </section>
      <section>
        <h2>Before real reports are accepted</h2>
        <p>
          The planned app must use encryption in transit and at rest, minimize
          retention, and offer one-click export and complete deletion. Health
          information will not be sold or used for advertising. The upload flow
          must explain the purpose, legal basis, retention, user rights, and any
          international transfers before collecting sensitive data.
        </p>
      </section>
      <section>
        <h2>Processing locations and subprocessors</h2>
        <p>
          No production processing region or health-data subprocessors have been
          selected for the rebuilt app. The list is pending and uploads remain
          unavailable. Before launch, this notice must name each storage, OCR,
          model, and email provider, its role and processing countries, and
          applicable transfer safeguards. Existing legacy providers are not
          automatically approved for the new application.
        </p>
      </section>
      <section>
        <h2>Retention and deletion</h2>
        <p>
          Exact retention periods and backup expiry must be established before
          launch. Deletion must cover original files, extracted text, results,
          alerts, reminders, derived exports, caches, and processor-held copies;
          any legally required retention must be explained. Export and deletion
          are design requirements, not active controls in this preview.
        </p>
      </section>
      <section>
        <h2>Privacy contact</h2>
        <p>
          For privacy questions:{" "}
          <a href="mailto:support@healthmatchai.com">
            support@healthmatchai.com
          </a>
          . A full privacy and GDPR readiness review remains a launch
          prerequisite.
        </p>
      </section>
    </div>
  );
}
