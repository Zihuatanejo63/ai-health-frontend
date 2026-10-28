import { EditorialContents } from "@/components/editorial-contents";
export default function Privacy() {
  return (
    <div className="hm-page hm-editorial hm-prose">
      <header className="hm-page-heading">
        <p className="hm-overline">UPDATED OCTOBER 24, 2026 · LOCAL PILOT</p>
        <h1>
          Your reports.
          <br />
          Your choices.
        </h1>
        <p>
          This notice describes the local phase 2 application. It has not been
          deployed as a production health-data service. Use fictional data for
          local evaluation.
        </p>
      </header>
      <div className="hm-document">
        <EditorialContents
          items={[
            ["storage", "Storage and processing"],
            ["model-processing", "Optional model processing"],
            ["deletion", "Retention and deletion"],
            ["advertising", "No advertising use"],
            ["before-production", "Before production"],
          ]}
        />
        <div className="hm-document-body">
          <section id="storage">
            <h2>Storage and processing</h2>
            <p>
              Accounts and sessions use the existing D1 data layer, running locally
              through Cloudflare’s emulator. Report values, source text, drafts,
              self-reported profiles and task state are encrypted with AES-256-GCM
              before being stored in the local database. Account email and technical
              record identifiers are not encrypted by the application. The
              encryption key is kept in an ignored local environment file.
            </p>
            <p>
              The browser and API run on this computer over loopback HTTP; this is
              not encrypted transport. External model requests use HTTPS. Production
              TLS, key management and hosting locations have not been established.
            </p>
          </section>
          <section id="model-processing">
            <h2>Optional model processing</h2>
            <p>
              With your permission, uploaded PDF/image bytes are sent to the
              configured Gemini API endpoint for extraction. With report Q&amp;A
              enabled, your question and confirmed marker values are sent to select
              relevant evidence and an answer topic. By default personal-workspace
              Q&amp;A uses templates until you opt in. Sample data is fictional and
              kept separate.
            </p>
            <p>
              The current default endpoint is Google’s Gemini API at
              generativelanguage.googleapis.com. An operator may configure a
              different endpoint. Processing locations, provider retention and
              contractual safeguards are not verified for production use. Model
              access is optional: Sample import, manual entry, rules and template
              answers work without it.
            </p>
          </section>
          <section id="deletion">
            <h2>Retention and deletion</h2>
            <p>
              Original uploads are processed transiently and are not stored by this
              app. A browser preview may remain until the page closes. Saved values,
              source text and pending drafts remain until you delete the selected
              workspace. In Health profile, export all workspace data as JSON or
              delete its profile, reports, drafts and reminder records. Personal and
              Sample workspaces are deleted separately.
            </p>
            <p>
              Deletion removes active records; it does not erase downloaded files,
              device backups, SQLite journals/free pages or copies retained by an
              external model provider. No remote-provider deletion API or backup
              expiry process is implemented. These limits must be resolved before a
              production launch claiming complete erasure. Account/session records
              are managed separately by the existing login service.
            </p>
          </section>
          <section id="advertising">
            <h2>No advertising use</h2>
            <p>
              The new application does not sell health data or use it for
              advertising. No analytics scripts are loaded by these pages. In-app
              reminders are available; reminder email is not connected and sends
              nothing. Local development login links do not send email or verify
              email ownership.
            </p>
          </section>
          <section id="before-production">
            <h2>Before production</h2>
            <p>
              Clinical rule approval, processor contracts, processing countries,
              GDPR legal basis and user-rights handling, retention schedules,
              encrypted transport, operational security and verified
              complete-deletion procedures remain release requirements. This pilot
              makes no production compliance claim.
            </p>
            <p>
              Privacy contact:{" "}
              <a href="mailto:support@healthmatchai.com">
                support@healthmatchai.com
              </a>
              .
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
