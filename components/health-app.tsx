"use client";
import { useState, useEffect, useRef, type FormEvent } from "react";
import Link from "next/link";
import { fetchMe, type ServerUser, clearCachedMe } from "@/lib/auth-client";
import {
  healthApi,
  downloadHealth,
  type HealthState,
  type Answer,
} from "@/lib/health-client";
import type {
  Space,
  Draft,
  Report,
  LabResult,
  Profile,
  Evaluation,
} from "../../shared/health";
import { emptyWorkspace } from "../../shared/health";
import {
  evaluate,
  rank,
  EMERGENCY_TEXT,
  redFlagQuestion,
  RULE_REVIEW,
} from "../../shared/health-rules";
type View =
  | "overview"
  | "import"
  | "confirm"
  | "report"
  | "trends"
  | "todos"
  | "profile";
const views: [View, string][] = [
  ["overview", "Overview"],
  ["import", "Add report"],
  ["trends", "Trends"],
  ["todos", "Follow-ups & to-dos"],
  ["profile", "Health profile"],
];
const severityLabels = {
  normal: "Within range",
  mild: "Mild deviation",
  significant: "Significant abnormality",
  critical: "Critical value",
  unclassified: "Needs review",
};
const trendLabels = {
  new: "New abnormality / 新发",
  persistent: "Persistent / 持续",
  worsening: "Worsening / 恶化",
  improving: "Improving / 改善",
  resolved: "Resolved / 恢复",
  stable: "Stable",
  insufficient_history: "More comparable data needed",
};
const fmt = (n: number) => Number(n.toFixed(3)).toString();
const blankRow = (): LabResult => ({
  id: crypto.randomUUID(),
  marker: "",
  value: 0,
  unit: "",
  comparator: "=",
  low: null,
  high: null,
  confidence: 0,
  source: "Manual entry",
  reviewed: false,
});
export function HealthApp() {
  const [user, setUser] = useState<ServerUser | null>(null);
  const [checked, setChecked] = useState(false);
  const [state, setState] = useState<HealthState | null>(null);
  const [space, setSpace] = useState<Space>("personal");
  const [view, setView] = useState<View>("overview");
  const [reportId, setReportId] = useState("");
  const [draft, setDraft] = useState<Draft | null>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");
  const [sourceUrl, setSourceUrl] = useState("");
  const sourceRef = useRef("");
  const [file, setFile] = useState<File | null>(null);
  const [consent, setConsent] = useState(false);
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState<Answer | null>(null);
  const [allowModel, setAllowModel] = useState(false);
  const [profile, setProfile] = useState<Profile>(emptyWorkspace().profile);
  const [deleteText, setDeleteText] = useState("");
  const activeSpace = useRef<Space>("personal");
  const [ready, setReady] = useState(false);
  function readLocation() {
    const p = new URLSearchParams(window.location.search);
    const s: Space = p.get("space") === "sample" ? "sample" : "personal";
    activeSpace.current = s;
    setSpace(s);
    setView(
      ([
        "overview",
        "import",
        "confirm",
        "report",
        "trends",
        "todos",
        "profile",
      ].includes(p.get("view") || "")
        ? p.get("view")
        : "overview") as View,
    );
    setReportId(p.get("report") || "");
    return { s, draftId: p.get("draft") };
  }
  async function reload(s: Space = activeSpace.current) {
    const data = await healthApi<HealthState>(s);
    if (activeSpace.current === s) {
      setState(data);
      setProfile(data.workspace.profile);
    }
    return data;
  }
  useEffect(() => {
    let active = true;
    const loc = readLocation();
    fetchMe().then(async (me) => {
      if (!active) return;
      setUser(me.user);
      setChecked(true);
      if (me.user) {
        try {
          const data = await reload(loc.s);
          if (!active) return;
          const d = data.workspace.drafts.find((d) => d.id === loc.draftId);
          if (d) setDraft(structuredClone(d));
          setAllowModel(loc.s === "sample");
        } catch (e) {
          setError((e as Error).message);
        }
      }
      setReady(true);
    });
    const pop = () => {
      const loc = readLocation();
      setDraft(null);
      setAnswer(null);
      reload(loc.s)
        .then((data) => {
          const d = data.workspace.drafts.find((d) => d.id === loc.draftId);
          if (d) setDraft(structuredClone(d));
        })
        .catch((e) => setError(e.message));
    };
    window.addEventListener("popstate", pop);
    return () => {
      active = false;
      window.removeEventListener("popstate", pop);
      if (sourceRef.current) URL.revokeObjectURL(sourceRef.current);
    };
  }, []);
  function navigate(
    v: View,
    opts: { space?: Space; report?: string; draft?: string } = {},
  ) {
    const s = opts.space || activeSpace.current;
    setView(v);
    if (opts.report !== undefined) setReportId(opts.report);
    setError("");
    setAnswer(null);
    const p = new URLSearchParams({ space: s, view: v });
    if (opts.report) p.set("report", opts.report);
    if (opts.draft) p.set("draft", opts.draft);
    window.history.pushState(null, "", `/dashboard?${p}`);
    window.scrollTo({ top: 0, behavior: "instant" });
  }
  async function run(action: () => Promise<void>) {
    setBusy(true);
    setError("");
    setNotice("");
    try {
      await action();
    } catch (e) {
      setError((e as Error).message);
    } finally {
      setBusy(false);
    }
  }
  async function switchSpace(s: Space) {
    await run(async () => {
      activeSpace.current = s;
      setSpace(s);
      setState(null);
      setDraft(null);
      setFile(null);
      if (sourceRef.current) URL.revokeObjectURL(sourceRef.current);
      sourceRef.current = "";
      setSourceUrl("");
      setQuestion("");
      setAllowModel(s === "sample");
      setConsent(false);
      navigate("overview", { space: s });
      await reload(s);
    });
  }
  async function createDraft(kind: "sample" | "manual") {
    await run(async () => {
      const s = kind === "sample" ? "sample" : space;
      if (s !== space) {
        activeSpace.current = s;
        setSpace(s);
        setAllowModel(true);
      }
      if (sourceRef.current) URL.revokeObjectURL(sourceRef.current);
      sourceRef.current = "";
      setSourceUrl("");
      const result = await healthApi<{ draft: Draft }>(s, "/drafts", "POST", {
        kind,
      });
      await reload(s);
      setDraft(result.draft);
      navigate("confirm", { space: s, draft: result.draft.id });
    });
  }
  async function upload(e: FormEvent) {
    e.preventDefault();
    if (!file) return;
    await run(async () => {
      const form = new FormData();
      form.set("file", file);
      form.set("consent", String(consent));
      const result = await healthApi<{
        draft?: Draft;
        fallback?: boolean;
        message?: string;
      }>(space, "/extract", "POST", form);
      if (result.fallback) {
        setNotice(
          result.message || "Use manual entry or the fictional sample below.",
        );
        return;
      }
      if (result.draft) {
        await reload();
        setDraft(result.draft);
        navigate("confirm", { draft: result.draft.id });
      }
    });
  }
  function setRow(
    reportIndex: number,
    rowIndex: number,
    patch: Partial<LabResult>,
  ) {
    setDraft((d) =>
      d
        ? {
            ...d,
            reports: d.reports.map((r, i) =>
              i !== reportIndex
                ? r
                : {
                    ...r,
                    results: r.results.map((v, j) =>
                      j !== rowIndex
                        ? v
                        : { ...v, ...patch, reviewed: patch.reviewed ?? false },
                    ),
                  },
            ),
          }
        : d,
    );
  }
  function setReport(index: number, patch: Partial<Report>) {
    setDraft((d) =>
      d
        ? {
            ...d,
            reports: d.reports.map((r, i) =>
              i !== index
                ? r
                : {
                    ...r,
                    ...patch,
                    results: (patch.results || r.results).map((v) => ({
                      ...v,
                      reviewed: false,
                    })),
                  },
            ),
          }
        : d,
    );
  }
  async function confirm(e: FormEvent) {
    e.preventDefault();
    if (!draft || !state) return;
    await run(async () => {
      const result = await healthApi<{ reportId: string }>(
        space,
        "/confirm",
        "POST",
        {
          draftId: draft.id,
          revision: state.workspace.revision,
          reports: draft.reports,
        },
      );
      await reload();
      setDraft(null);
      navigate("report", { report: result.reportId });
      setNotice(
        "Report confirmed and saved. Trends and follow-ups are updated.",
      );
    });
  }
  async function ask(e: FormEvent) {
    e.preventDefault();
    if (redFlagQuestion(question)) {
      setAnswer({
        answer: EMERGENCY_TEXT,
        urgent: true,
        channel: "safety-rules",
        citations: [],
        ruleVersion: state?.ruleVersion || "",
      });
      return;
    }
    await run(async () => {
      setAnswer(
        await healthApi<Answer>(space, "/qa", "POST", {
          question,
          reportId: report?.id,
          allowModel,
        }),
      );
    });
  }
  const latest = state?.latest || [];
  const report =
    state?.workspace.reports.find((r) => r.id === reportId) ||
    [...(state?.workspace.reports || [])].sort((a, b) =>
      b.date.localeCompare(a.date),
    )[0];
  const shown =
    view === "report" && report
      ? state?.evaluations.filter((e) => e.reportId === report.id) || []
      : latest;
  const flagged = shown.filter((e) => e.abnormal);
  const priority = [...flagged].sort((a, b) => rank(b) - rank(a))[0];
  const critical = shown.filter((e) => e.severity === "critical");
  const draftCritical =
    draft?.reports
      .flatMap((r) => r.results)
      .filter(
        (r) =>
          evaluate(r, state?.workspace.profile || emptyWorkspace().profile)
            .severity === "critical",
      ) || [];
  const actions = state?.actions || [];
  const due = actions.filter((a) => a.overdue && !a.done);
  const disclaimer = (
    <p className="hp-disclaimer">
      Health information and self-management only; not a diagnosis or a
      substitute for your clinician. No alert does not rule out illness.{" "}
      {RULE_REVIEW}
    </p>
  );
  if (!checked || !ready)
    return (
      <div className="hp-shell">
        <p role="status">Opening your health workspace…</p>
        <p className="hp-emergency">
          In an emergency, seek medical care now. Do not wait for the app.
        </p>
      </div>
    );
  if (!user)
    return (
      <div className="hp-shell">
        <p className="hp-emergency">
          Seek emergency medical care now if you have chest pain, difficulty
          breathing, or thoughts of harming yourself. Do not wait to sign in.
        </p>
        <h1>Your reports, kept together.</h1>
        <p>Sign in to save and return to your reports.</p>
        <Link className="hm-button" href="/login">
          Sign in / create account →
        </Link>
        <p>
          <Link href="/sample-report">View a public sample</Link>
        </p>
      </div>
    );
  return (
    <div className="hp-shell">
      {(critical.length > 0 ||
        (view === "confirm" && draftCritical.length > 0)) && (
        <div className="hp-emergency" role="alert">
          <strong>{EMERGENCY_TEXT}</strong>
          <p>
            {view === "confirm"
              ? "Possible critical value in an unconfirmed draft — check the original now."
              : "Critical-value rule triggered."}{" "}
            {[
              ...critical.map((r) => r.marker),
              ...(view === "confirm" ? draftCritical.map((r) => r.marker) : []),
            ].join(", ")}
            . This warning is independent of payment.
          </p>
        </div>
      )}
      {view === "report" && state && (
        <section className="hp-conclusions" aria-label="Report conclusions">
          <article>
            <span>Flagged results {space === "sample" ? "· Sample / fictional" : ""}</span>
            <strong>{flagged.length}</strong>
            <p>
              {shown.filter((e) => e.severity === "unclassified").length}{" "}
              unclassified — review needed
            </p>
          </article>
          <article>
            <span>First to discuss</span>
            <strong>{priority?.marker || "No flagged result"}</strong>
            <p>
              {priority
                ? `${fmt(priority.value)} ${priority.unit} · ${severityLabels[priority.severity]}`
                : "Review the full report and your clinical context."}
            </p>
          </article>
          <article>
            <span>Seek urgent care?</span>
            <strong>
              {critical.length
                ? "Yes — now"
                : "No supported critical rule triggered"}
            </strong>
            <p>
              {critical.length
                ? "Do not wait for a follow-up date."
                : "This is not an all-clear. Symptoms and unrecognized markers need separate attention."}
            </p>
          </article>
        </section>
      )}
      <header className="hp-top">
        <div>
          <p className="hm-overline">YOUR LONG-TERM HEALTH WORKSPACE</p>
          <h1>
            {view === "confirm"
              ? "Check the details first."
              : view === "report"
                ? "Here’s what needs attention."
                : "A clearer view of your health."}
          </h1>
          <p>
            {user.email} ·{" "}
            {space === "sample" ? (
              <strong className="hm-badge">Sample / fictional data only</strong>
            ) : (
              "Personal workspace"
            )}
          </p>
        </div>
        <button
          className="hm-button hm-secondary"
          disabled={busy}
          onClick={() =>
            run(async () => {
              const response = await fetch("/api/auth/logout", {
                method: "POST",
                credentials: "include",
              });
              if (!response.ok) throw new Error("Sign-out failed. Retry.");
              clearCachedMe();
              window.location.assign("/login");
            })
          }
        >
          Sign out
        </button>
      </header>
      <div className="hp-workspace-switch" aria-label="Data workspace">
        <button
          disabled={busy}
          aria-pressed={space === "personal"}
          onClick={() => switchSpace("personal")}
        >
          Personal data
        </button>
        <button
          disabled={busy}
          aria-pressed={space === "sample"}
          onClick={() => switchSpace("sample")}
        >
          Sample / fictional
        </button>
        <span>Separate profiles, reports and reminders.</span>
      </div>
      <nav className="hp-tabs" aria-label="Health workspace">
        {views.map(([v, label]) => (
          <button
            key={v}
            disabled={busy}
            aria-current={view === v ? "page" : undefined}
            onClick={() => navigate(v)}
          >
            {label}
            {v === "todos" && due.length > 0 ? ` (${due.length})` : ""}
          </button>
        ))}
      </nav>
      {error && (
        <div className="hp-error" role="alert">
          {error} <Link href="/login">Sign in again</Link>{" "}
          <button
            onClick={() =>
              run(async () => {
                await reload();
                setNotice("Workspace reloaded.");
              })
            }
          >
            Reload workspace
          </button>
        </div>
      )}
      {notice && (
        <p className="hp-notice" role="status">
          {notice}
        </p>
      )}
      {busy && (
        <p role="status" className="hp-busy">
          Working… You can use manual entry if automatic extraction is
          unavailable.
        </p>
      )}
      {!state && !error && <p role="status">Loading saved records…</p>}
      {state && (
        <>
          {(state.workspace.profile.age === null ||
            state.workspace.profile.age < 18) &&
            view !== "profile" && (
              <div className="hp-notice">
                <p>
                  Adult interpretation needs your age and the report’s reference
                  context. Unsupported context stays unclassified;
                  critical-value warnings still apply.
                </p>
                <button
                  className="hm-button hm-secondary"
                  onClick={() => navigate("profile")}
                >
                  Complete health profile
                </button>
              </div>
            )}
          {(view === "overview" || view === "report") && (
            <>
              {view === "overview" && (
                <section
                  className="hp-conclusions"
                  aria-label="Report conclusions"
                >
                  <article>
                    <span>Flagged results {space === "sample" ? "· Sample / fictional" : ""}</span>
                    <strong>{flagged.length}</strong>
                    <p>
                      {
                        shown.filter((e) => e.severity === "unclassified")
                          .length
                      }{" "}
                      unclassified — review needed
                    </p>
                  </article>
                  <article>
                    <span>First to discuss</span>
                    <strong>{priority?.marker || "No flagged result"}</strong>
                    <p>
                      {priority
                        ? `${fmt(priority.value)} ${priority.unit} · ${severityLabels[priority.severity]}`
                        : "Review the full report and your clinical context."}
                    </p>
                  </article>
                  <article>
                    <span>Seek urgent care?</span>
                    <strong>
                      {critical.length
                        ? "Yes — now"
                        : "No supported critical rule triggered"}
                    </strong>
                    <p>
                      {critical.length
                        ? "Do not wait for a follow-up date."
                        : "This is not an all-clear. Symptoms and unrecognized markers need separate attention."}
                    </p>
                  </article>
                </section>
              )}
              {state.workspace.reports.length === 0 && (
                <section className="hm-card hp-empty">
                  <h2>Your first report starts the picture.</h2>
                  <p>
                    Use the fictional three-year example, or add your own
                    report. Both sample import and manual entry work without AI.
                  </p>
                  <div className="hp-actions">
                    <button
                      className="hm-button"
                      disabled={busy}
                      onClick={() => createDraft("sample")}
                    >
                      Import 3-year Sample reports
                    </button>
                    <button
                      className="hm-button hm-secondary"
                      onClick={() => navigate("import")}
                    >
                      Upload or enter a report
                    </button>
                  </div>
                </section>
              )}
              {view === "overview" && (
                <>
                  <div className="hp-actions">
                    <button
                      className="hm-button"
                      onClick={() => navigate("import")}
                    >
                      Add another report →
                    </button>
                    <button
                      className="hm-button hm-secondary"
                      disabled={busy || !state.workspace.reports.length}
                      onClick={() =>
                        run(async () => {
                          await downloadHealth(space, "pdf");
                          setNotice("Doctor summary PDF downloaded.");
                        })
                      }
                    >
                      Export doctor PDF
                    </button>
                  </div>
                  <section>
                    <h2>Saved reports</h2>
                    {[...state.workspace.reports]
                      .sort((a, b) => b.date.localeCompare(a.date))
                      .map((r) => (
                        <article className="hp-report-row" key={r.id}>
                          <div>
                            <strong>{r.title}</strong>
                            <p>
                              {r.date} · {r.lab} · {r.results.length} confirmed
                              markers{" "}
                              {space === "sample" ? "· Sample / fictional" : ""}
                            </p>
                          </div>
                          <button
                            className="hm-button hm-secondary"
                            onClick={() => navigate("report", { report: r.id })}
                          >
                            Read report
                          </button>
                        </article>
                      ))}
                  </section>
                  {due.length > 0 && (
                    <section className="hp-notice">
                      <h2>{due.length} follow-up task(s) due</h2>
                      <p>{due.map((a) => a.marker).join(", ")}</p>
                      <button
                        className="hm-button"
                        onClick={() => navigate("todos")}
                      >
                        Open to-dos →
                      </button>
                    </section>
                  )}
                </>
              )}
              {view === "report" && report && (
                <>
                  <div className="hp-actions">
                    <span>
                      {report.title} · Collected {report.date} ·{" "}
                      {space === "sample"
                        ? "Sample / fictional"
                        : "Patient-confirmed"}
                    </span>
                    <button
                      className="hm-button hm-secondary"
                      disabled={busy}
                      onClick={() =>
                        run(async () => {
                          await downloadHealth(space, "pdf");
                          setNotice("Doctor summary PDF downloaded.");
                        })
                      }
                    >
                      Export doctor PDF
                    </button>
                    <button
                      className="hm-button hm-secondary"
                      onClick={() => navigate("todos")}
                    >
                      View follow-up plan
                    </button>
                  </div>
                  <section className="hp-qa hm-card">
                    <h2>Ask about this report</h2>
                    <form onSubmit={ask}>
                      <label htmlFor="report-question">
                        Your question / 你的问题
                      </label>
                      <textarea
                        id="report-question"
                        required
                        maxLength={2000}
                        value={question}
                        onChange={(e) => setQuestion(e.target.value)}
                        placeholder="我这个指标高要紧吗？ / Is this result concerning?"
                      />
                      <label className="hp-check">
                        <input
                          type="checkbox"
                          checked={allowModel}
                          onChange={(e) => setAllowModel(e.target.checked)}
                        />
                        Use configured Gemini to select relevant report evidence
                        and answer topic. This sends my question and report
                        values to the model provider.
                      </label>
                      <p className="hm-small">
                        {state.modelConfigured
                          ? `Configured channel: Gemini (${state.model}).`
                          : "AI key not configured."}{" "}
                        Rules and validated templates remain available, even if
                        the model fails.
                      </p>
                      <button className="hm-button" disabled={busy}>
                        Ask about my results
                      </button>
                    </form>
                    {answer && (
                      <div
                        className={answer.urgent ? "hp-emergency" : "hp-answer"}
                        role={answer.urgent ? "alert" : "status"}
                      >
                        <p className="hp-answer-text">{answer.answer}</p>
                        <p className="hm-small">
                          Channel: {answer.channel} · {answer.ruleVersion}
                        </p>
                        {answer.citations.map((c, i) => (
                          <span className="hm-badge" key={i}>
                            {c.marker} {c.value} {c.unit} · {c.date}
                          </span>
                        ))}
                      </div>
                    )}
                  </section>
                  <h2>Each result, explained</h2>
                  <div className="hp-results">
                    {shown.map((e) => (
                      <ResultCard key={e.result.id} entry={e} />
                    ))}
                  </div>
                  {disclaimer}
                </>
              )}
            </>
          )}
          {(view === "overview" || view === "import") &&
            state.workspace.drafts.length > 0 && (
              <section>
                <h2>Drafts waiting for review</h2>
                {state.workspace.drafts.map((d) => (
                  <article className="hp-report-row" key={d.id}>
                    <div>
                      <strong>{d.reports[0]?.title}</strong>
                      <p>
                        {d.reports.length} report(s) · {d.source} · Not yet
                        included in trends
                      </p>
                    </div>
                    <div className="hp-actions">
                      <button
                        disabled={busy}
                        className="hm-button"
                        onClick={() => {
                          setDraft(structuredClone(d));
                          navigate("confirm", { draft: d.id });
                        }}
                      >
                        Review draft
                      </button>
                      <button
                        disabled={busy}
                        className="hm-button hm-secondary"
                        onClick={() =>
                          run(async () => {
                            await healthApi(space, "/drafts", "DELETE", {
                              id: d.id,
                            });
                            await reload();
                            setNotice("Draft discarded.");
                          })
                        }
                      >
                        Discard draft
                      </button>
                    </div>
                  </article>
                ))}
              </section>
            )}
          {view === "import" && (
            <section>
              <h2>Bring your next report.</h2>
              <p>
                PDF, PNG or JPEG, up to 8 MB per report. Upload additional
                reports one at a time. Original files are processed transiently
                and not retained by this app; confirmed values and source text
                are encrypted in the local database.
              </p>
              <div className="hp-import-grid">
                <form className="hm-card hp-form" onSubmit={upload}>
                  <h3>Upload a report</h3>
                  <label>
                    PDF or image
                    <input
                      type="file"
                      accept="application/pdf,image/png,image/jpeg"
                      required
                      onChange={(e) => {
                        const f = e.target.files?.[0] || null;
                        setFile(f);
                        if (sourceRef.current)
                          URL.revokeObjectURL(sourceRef.current);
                        sourceRef.current = f ? URL.createObjectURL(f) : "";
                        setSourceUrl(sourceRef.current);
                      }}
                    />
                  </label>
                  <label className="hp-check">
                    <input
                      type="checkbox"
                      checked={consent}
                      required
                      onChange={(e) => setConsent(e.target.checked)}
                    />
                    I agree to send this file to the configured Gemini processor
                    for extraction. For local testing, use fictional data.
                  </label>
                  <p>
                    {state.modelConfigured
                      ? "Gemini extraction configured. You must check every extracted value."
                      : "Automatic extraction is unavailable. Manual entry and Sample import below are ready to use."}
                  </p>
                  <button
                    className="hm-button"
                    disabled={busy || !file || !consent}
                  >
                    Extract and review
                  </button>
                </form>
                <div className="hm-card hp-form">
                  <h3>Always available</h3>
                  <p>No API key or model response required.</p>
                  <button
                    className="hm-button"
                    disabled={busy}
                    onClick={() => createDraft("sample")}
                  >
                    Import 3-year Sample reports
                  </button>
                  <button
                    className="hm-button hm-secondary"
                    disabled={busy}
                    onClick={() => createDraft("manual")}
                  >
                    Enter results manually
                  </button>
                  <p className="hm-small">
                    Sample imports use a separate fictional profile. To see a
                    changed trend, add a manual follow-up in the Sample
                    workspace using the same lab, method, units and ranges.
                  </p>
                </div>
              </div>
            </section>
          )}
          {view === "confirm" && draft && (
            <form onSubmit={confirm} className="hp-confirm">
              <div className="hp-notice">
                <strong>
                  Review required · {draft.source}{" "}
                  {space === "sample" ? "· Sample / fictional" : ""}
                </strong>
                <p>
                  Edit every field as needed, then check each row. Orange rows
                  have low confidence. Only confirmed values enter your record.
                  Leaving or refreshing this page restores the original saved
                  draft; unsaved edits must be re-entered.
                </p>
              </div>
              {sourceUrl && (
                <details>
                  <summary>
                    View original selected file (this browser session)
                  </summary>
                  <object
                    data={sourceUrl}
                    className="hp-source"
                    aria-label="Original report preview"
                  >
                    <a href={sourceUrl} target="_blank" rel="noreferrer">
                      Open original file
                    </a>
                  </object>
                </details>
              )}
              {draft.reports.map((r, ri) => (
                <fieldset className="hm-card" key={r.id}>
                  <legend>
                    {space === "sample" ? "Sample / fictional · " : ""}Report{" "}
                    {ri + 1}
                  </legend>
                  <div className="hp-field-grid">
                    <label>
                      Report title
                      <input
                        required
                        value={r.title}
                        onChange={(e) =>
                          setReport(ri, { title: e.target.value })
                        }
                      />
                    </label>
                    <label>
                      Collection date
                      <input
                        type="date"
                        required
                        max={new Date().toISOString().slice(0, 10)}
                        value={r.date}
                        onChange={(e) =>
                          setReport(ri, { date: e.target.value })
                        }
                      />
                    </label>
                    <label>
                      Laboratory
                      <input
                        required
                        value={r.lab}
                        onChange={(e) => setReport(ri, { lab: e.target.value })}
                      />
                    </label>
                    <label>
                      Method / comparability group
                      <input
                        required
                        value={r.method}
                        onChange={(e) =>
                          setReport(ri, { method: e.target.value })
                        }
                      />
                    </label>
                  </div>
                  {r.results.map((v, vi) => (
                    <div
                      className={`hp-edit-row ${v.confidence < 0.8 ? "hp-low-confidence" : ""}`}
                      key={v.id}
                    >
                      <div className="hp-row-heading">
                        <strong>Marker {vi + 1}</strong>
                        <span>
                          {v.confidence < 0.8
                            ? "Low confidence — check carefully"
                            : `Extraction confidence ${Math.round(v.confidence * 100)}%`}
                        </span>
                      </div>
                      <div className="hp-field-grid">
                        <label>
                          Marker name
                          <input
                            required
                            list="known-markers"
                            value={v.marker}
                            onChange={(e) =>
                              setRow(ri, vi, { marker: e.target.value })
                            }
                          />
                        </label>
                        <label>
                          Value
                          <input
                            type="number"
                            step="any"
                            min="0"
                            required
                            value={v.value}
                            onChange={(e) =>
                              setRow(ri, vi, { value: Number(e.target.value) })
                            }
                          />
                        </label>
                        <label>
                          Unit
                          <input
                            required
                            value={v.unit}
                            placeholder="%, U/L, g/dL…"
                            onChange={(e) =>
                              setRow(ri, vi, { unit: e.target.value })
                            }
                          />
                        </label>
                        <label>
                          Comparator
                          <select
                            value={v.comparator}
                            onChange={(e) =>
                              setRow(ri, vi, {
                                comparator: e.target
                                  .value as LabResult["comparator"],
                              })
                            }
                          >
                            <option>=</option>
                            <option>&lt;</option>
                            <option>&gt;</option>
                          </select>
                        </label>
                        <label>
                          Reference lower
                          <input
                            type="number"
                            step="any"
                            min="0"
                            value={v.low ?? ""}
                            placeholder="Unknown"
                            onChange={(e) =>
                              setRow(ri, vi, {
                                low:
                                  e.target.value === ""
                                    ? null
                                    : Number(e.target.value),
                              })
                            }
                          />
                        </label>
                        <label>
                          Reference upper
                          <input
                            type="number"
                            step="any"
                            min="0"
                            value={v.high ?? ""}
                            placeholder="Unknown"
                            onChange={(e) =>
                              setRow(ri, vi, {
                                high:
                                  e.target.value === ""
                                    ? null
                                    : Number(e.target.value),
                              })
                            }
                          />
                        </label>
                      </div>
                      <p className="hp-source-text">Source: {v.source}</p>
                      <label className="hp-check">
                        <input
                          type="checkbox"
                          required
                          checked={v.reviewed}
                          onChange={(e) =>
                            setRow(ri, vi, { reviewed: e.target.checked })
                          }
                        />
                        I checked this row against the source / manual entry.
                      </label>
                      {r.results.length > 1 && (
                        <button
                          type="button"
                          className="hp-text-button"
                          onClick={() =>
                            setReport(ri, {
                              results: r.results.filter(
                                (row) => row.id !== v.id,
                              ),
                            })
                          }
                        >
                          Exclude this row from the confirmed report
                        </button>
                      )}
                    </div>
                  ))}
                  <button
                    type="button"
                    className="hm-button hm-secondary"
                    onClick={() =>
                      setReport(ri, { results: [...r.results, blankRow()] })
                    }
                  >
                    Add marker
                  </button>
                </fieldset>
              ))}
              <datalist id="known-markers">
                {["HbA1c", "Glucose", "Potassium", "ALT", "Hemoglobin"].map(
                  (m) => (
                    <option key={m} value={m} />
                  ),
                )}
              </datalist>
              <div className="hp-actions">
                <button className="hm-button" disabled={busy}>
                  Confirm and read my report →
                </button>
                <button
                  type="button"
                  className="hm-button hm-secondary"
                  disabled={busy}
                  onClick={() => navigate("import")}
                >
                  Back to drafts
                </button>
              </div>
            </form>
          )}
          {view === "confirm" && !draft && (
            <div className="hp-notice">
              <p>Select a saved draft or add a report to continue.</p>
              <button className="hm-button" onClick={() => navigate("import")}>
                Open reports
              </button>
            </div>
          )}
          {view === "trends" && (
            <section>
              <h2>See the direction of change.</h2>
              <p>
                States compare consecutive results only when the marker, unit,
                lab, method and reference range are compatible. Unknown context
                is never treated as a normal result.
              </p>
              {latest.length === 0 ? (
                <p>Add and confirm reports to start a timeline.</p>
              ) : (
                latest.map((e) => (
                  <article
                    className="hm-card hp-trend"
                    key={e.reportId + e.result.id}
                  >
                    <div className="hm-row">
                      <h3>{e.marker}</h3>
                      <span className="hm-badge">{trendLabels[e.trend]}</span>
                    </div>
                    <TrendChart entry={e} />
                    <div className="hm-table-wrap" tabIndex={0}>
                      <table className="hm-table">
                        <caption>
                          {space === "sample" ? "Sample / fictional · " : ""}
                          {e.marker} · {e.unit}
                        </caption>
                        <thead>
                          <tr>
                            <th>Date</th>
                            <th>Value</th>
                          </tr>
                        </thead>
                        <tbody>
                          {e.history.map((h, i) => (
                            <tr key={i}>
                              <td>{h.date}</td>
                              <td>
                                {fmt(h.value)} {h.unit}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                    <button
                      className="hm-button hm-secondary"
                      onClick={() => navigate("report", { report: e.reportId })}
                    >
                      Read latest report
                    </button>
                  </article>
                ))
              )}
              <button className="hm-button" onClick={() => navigate("import")}>
                Add another report
              </button>
              {disclaimer}
            </section>
          )}
          {view === "todos" && (
            <section>
              <h2>Follow-ups &amp; to-dos</h2>
              <p>
                Dates are rule-generated clinician-review targets from the
                collection date, not a direction to wait or an automatic test
                order. Discuss whether and when to repeat the named test.{" "}
                {space === "sample"
                  ? "These tasks belong to the fictional Sample profile."
                  : ""}
              </p>
              <p className="hp-notice">
                Email: {state.emailStatus}. Nothing is emailed. In-app due dates
                update when you open the workspace.
              </p>
              <h3>Due now · {due.length}</h3>
              {due.length === 0 && <p>No overdue outstanding tasks.</p>}
              {actions.length === 0 && (
                <p>Confirm a report with flagged results to create a plan.</p>
              )}
              {[...actions]
                .sort(
                  (a, b) =>
                    Number(a.done) - Number(b.done) ||
                    a.due.localeCompare(b.due),
                )
                .map((a) => (
                  <article className="hm-card hp-action-card" key={a.id}>
                    <div className="hm-row">
                      <h3>
                        {a.marker} · {fmt(a.value)} {a.unit}
                      </h3>
                      <span className="hm-badge">
                        {a.done
                          ? "Completed"
                          : a.overdue
                            ? "Due / overdue"
                            : "Upcoming"}
                      </span>
                    </div>
                    <p>
                      <strong>
                        {a.severity === "critical"
                          ? "Seek urgent care now."
                          : `Review by ${a.due} (${a.days} days after collection)`}
                      </strong>
                    </p>
                    <p>
                      Discuss repeating: {a.marker}
                      <br />
                      Department: {a.department}
                    </p>
                    <ul>
                      {a.questions.map((q) => (
                        <li key={q}>{q}</li>
                      ))}
                    </ul>
                    <div className="hp-actions">
                      <button
                        disabled={busy}
                        className="hm-button"
                        onClick={() =>
                          run(async () => {
                            await healthApi(space, "/reminders", "PUT", {
                              id: a.id,
                              done: !a.done,
                            });
                            await reload();
                            setNotice(
                              a.done
                                ? "Task reopened."
                                : "Task marked complete.",
                            );
                          })
                        }
                      >
                        {a.done ? "Reopen task" : "Mark complete"}
                      </button>
                      <button
                        className="hm-button hm-secondary"
                        onClick={() =>
                          navigate("report", { report: a.reportId })
                        }
                      >
                        Open source report
                      </button>
                    </div>
                  </article>
                ))}
              {disclaimer}
            </section>
          )}
          {view === "profile" && (
            <section>
              <h2>Your health context</h2>
              <p>
                {space === "sample"
                  ? "Sample / fictional profile. Changes here never affect personal data."
                  : "Self-reported information. Age and reference context help prevent inappropriate classifications."}
              </p>
              <form
                className="hm-card hp-form"
                onSubmit={(e) => {
                  e.preventDefault();
                  run(async () => {
                    await healthApi(space, "/profile", "PUT", {
                      profile,
                      revision: state.workspace.revision,
                    });
                    await reload();
                    setNotice(
                      "Profile saved. Readings and follow-ups recalculated with current context.",
                    );
                  });
                }}
              >
                <div className="hp-field-grid">
                  <label>
                    Age
                    <input
                      type="number"
                      min="0"
                      max="120"
                      value={profile.age ?? ""}
                      onChange={(e) =>
                        setProfile({
                          ...profile,
                          age:
                            e.target.value === ""
                              ? null
                              : Number(e.target.value),
                        })
                      }
                    />
                  </label>
                  <label>
                    Reference sex
                    <select
                      value={profile.sex}
                      onChange={(e) =>
                        setProfile({
                          ...profile,
                          sex: e.target.value as Profile["sex"],
                        })
                      }
                    >
                      <option value="unspecified">Not specified</option>
                      <option value="female">Female</option>
                      <option value="male">Male</option>
                    </select>
                  </label>
                  <label>
                    Height (cm)
                    <input
                      type="number"
                      step="any"
                      min="30"
                      max="260"
                      value={profile.heightCm ?? ""}
                      onChange={(e) =>
                        setProfile({
                          ...profile,
                          heightCm:
                            e.target.value === ""
                              ? null
                              : Number(e.target.value),
                        })
                      }
                    />
                  </label>
                  <label>
                    Weight (kg)
                    <input
                      type="number"
                      step="any"
                      min="1"
                      max="500"
                      value={profile.weightKg ?? ""}
                      onChange={(e) =>
                        setProfile({
                          ...profile,
                          weightKg:
                            e.target.value === ""
                              ? null
                              : Number(e.target.value),
                        })
                      }
                    />
                  </label>
                </div>
                <label>
                  Medical history (self-reported)
                  <textarea
                    maxLength={3000}
                    value={profile.history}
                    onChange={(e) =>
                      setProfile({ ...profile, history: e.target.value })
                    }
                  />
                </label>
                <label>
                  Family history (self-reported)
                  <textarea
                    maxLength={3000}
                    value={profile.familyHistory}
                    onChange={(e) =>
                      setProfile({ ...profile, familyHistory: e.target.value })
                    }
                  />
                </label>
                <button className="hm-button" disabled={busy}>
                  Save health profile
                </button>
              </form>
              <section className="hm-card hp-data-controls">
                <h3>Your data controls</h3>
                <p>
                  Applies only to the selected {space} workspace. Export
                  includes profile, reports, original extraction, pending drafts
                  and completed task IDs. Local database payloads are encrypted;
                  the local preview uses loopback HTTP. No sale or advertising
                  use.
                </p>
                <button
                  className="hm-button hm-secondary"
                  disabled={busy}
                  onClick={() =>
                    run(async () => {
                      await downloadHealth(space, "export");
                      setNotice("Data export downloaded.");
                    })
                  }
                >
                  Export all workspace data (JSON)
                </button>
                <form
                  className="hp-form"
                  onSubmit={(e) => {
                    e.preventDefault();
                    run(async () => {
                      await healthApi(space, "", "DELETE", {
                        confirmation: deleteText,
                      });
                      setDraft(null);
                      setAnswer(null);
                      setQuestion("");
                      setFile(null);
                      if (sourceRef.current)
                        URL.revokeObjectURL(sourceRef.current);
                      setSourceUrl("");
                      setDeleteText("");
                      await reload();
                      setNotice(
                        "Workspace data deleted from the active database. Local SQLite/WAL files and external provider retention require separate cleanup; see privacy notice.",
                      );
                    });
                  }}
                >
                  <label>
                    Type DELETE to remove this workspace’s reports, drafts,
                    profile and task records
                    <input
                      required
                      pattern="DELETE"
                      value={deleteText}
                      onChange={(e) => setDeleteText(e.target.value)}
                    />
                  </label>
                  <button
                    className="hm-button hp-delete"
                    disabled={busy || deleteText !== "DELETE"}
                  >
                    Delete this workspace’s data
                  </button>
                </form>
              </section>
            </section>
          )}
        </>
      )}
    </div>
  );
}
function ResultCard({ entry: e }: { entry: Evaluation }) {
  return (
    <article className="hm-card hp-result">
      <div className="hm-row">
        <h3>
          {e.marker} · {fmt(e.value)} {e.unit}
        </h3>
        <span className={`hp-status hp-status-${e.severity}`}>
          {severityLabels[e.severity]}
        </span>
      </div>
      <p>{e.explanation}</p>
      <p>
        <strong>Possible influences:</strong> {e.causes}
      </p>
      <p>
        <strong>Follow-up:</strong>{" "}
        {e.followUpDays === null
          ? "No automatic abnormal-result follow-up. Keep your clinician’s plan."
          : e.followUpDays === 0
            ? "Seek urgent medical care now."
            : `Clinician review target: ${e.followUpDays} days after collection. Ask whether and when to repeat ${e.marker}; timing depends on clinical context.`}
      </p>
      <span className="hm-badge">{trendLabels[e.trend]}</span>
      <details>
        <summary>Rule and original evidence</summary>
        <p>
          {e.ruleId} · {e.ruleVersion} ·{" "}
          <a href={e.sourceUrl} target="_blank" rel="noreferrer">
            Source reference ↗
          </a>
        </p>
        <p>
          Original: {e.result.marker}{" "}
          {e.result.comparator === "=" ? "" : e.result.comparator}
          {e.result.value} {e.result.unit}, range {e.result.low ?? "?"}–
          {e.result.high ?? "?"}. {e.result.source}
        </p>
        <p>{RULE_REVIEW}</p>
      </details>
    </article>
  );
}
function TrendChart({ entry: e }: { entry: Evaluation }) {
  const values = e.history.map((h) => h.value);
  if (values.length < 2)
    return (
      <p>
        One confirmed observation. Add another comparable report to see a trend.
      </p>
    );
  const min = Math.min(...values),
    max = Math.max(...values);
  const span = max - min || 1;
  const coords = values.map((v, i) => [
    40 + (i * 520) / (values.length - 1),
    130 - ((v - min) * 90) / span,
  ]);
  return (
    <>
      <svg
        className="hp-chart"
        viewBox="0 0 600 180"
        role="img"
        aria-label={`${e.marker}: ${e.history.map((h) => `${h.date}: ${fmt(h.value)} ${h.unit}`).join(", ")}`}
      >
        <path
          d="M40 40H560 M40 85H560 M40 130H560"
          fill="none"
          stroke="#dce3d8"
        />
        <polyline
          points={coords.map((c) => c.join(",")).join(" ")}
          fill="none"
          stroke="#175d48"
          strokeWidth="3"
        />
        {coords.map(([x, y], i) => (
          <g key={i}>
            <circle cx={x} cy={y} r="4" fill="#175d48" />
            {(i === 0 || i === coords.length - 1) && (
              <>
                <text x={x} y={y - 12} textAnchor="middle" fontSize="12">
                  {fmt(values[i])}
                </text>
                <text x={x} y="160" textAnchor="middle" fontSize="11">
                  {e.history[i].date}
                </text>
              </>
            )}
          </g>
        ))}
      </svg>
      <p className="hm-small">
        Chart scale is truncated ({fmt(min)}–{fmt(max)} {e.unit}); exact
        observations are listed below.
      </p>
    </>
  );
}
