"use client";

import { useEffect, useState } from "react";

const API_BASE =
  process.env.NEXT_PUBLIC_API_BASE_URL?.replace(/\/$/, "") ?? "";

interface DashboardData {
  counts: {
    users: number;
    symptomChecks: number;
    activeEntitlements: number;
    paymentEvents: number;
  };
  webhookFailures: { event_type: string; count: number }[];
  recentErrors: { event_type: string; route: string; message: string; created_at: string }[];
}

export default function AdminPage() {
  const [token, setToken] = useState("");
  const [authed, setAuthed] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [data, setData] = useState<DashboardData | null>(null);
  const [showTokenInput, setShowTokenInput] = useState(false);

  useEffect(() => {
    // Try session-based auth first (HttpOnly cookie, credentials: "include")
    fetchDashboard();
  }, []);

  async function fetchDashboard(adminToken?: string) {
    setLoading(true);
    setError("");
    try {
      const headers: Record<string, string> = {};
      if (adminToken) {
        headers["Authorization"] = `Bearer ${adminToken}`;
      }

      const res = await fetch(`${API_BASE}/api/admin/dashboard`, {
        credentials: "include",
        headers: { "Content-Type": "application/json", ...headers },
      });

      if (!res.ok) {
        if (res.status === 401) {
          setAuthed(false);
          // If no token was provided, suggest session login first
          if (!adminToken) {
            setError("Admin access required. Sign in with an admin account, or use an API token.");
          } else {
            setError("Invalid admin token.");
          }
          setShowTokenInput(true);
          return;
        }
        const body = await res.json().catch(() => ({})) as { error?: { message?: string } };
        setError(body.error?.message || `Request failed (${res.status})`);
        return;
      }

      const json = (await res.json()) as DashboardData;
      setData(json);
      setAuthed(true);
      setShowTokenInput(false);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Network error. Is the backend reachable?");
    } finally {
      setLoading(false);
    }
  }

  function handleTokenSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!token.trim()) return;
    fetchDashboard(token.trim());
    // Never store token in localStorage
  }

  if (loading) {
    return (
      <section className="app-page">
        <div className="intro-card">
          <h1>Admin</h1>
          <p>Verifying access...</p>
        </div>
      </section>
    );
  }

  if (!authed) {
    return (
      <section className="app-page">
        <div className="intro-card">
          <h1>Admin</h1>
          <p className="notice-card" style={{ color: "var(--color-warning, #b45309)" }}>
            {error || "Admin access required."}
          </p>
          <div style={{ marginTop: 16 }}>
            <p>Sign in with an admin account to access the dashboard.</p>
            <a href="/login" className="btn-primary" style={{ display: "inline-block", marginTop: 8 }}>
              Sign in
            </a>
          </div>
          {showTokenInput ? (
            <details style={{ marginTop: 24 }}>
              <summary>Use API token instead</summary>
              <form onSubmit={handleTokenSubmit} style={{ marginTop: 8 }}>
                <label className="form-field">
                  API token
                  <input
                    type="password"
                    value={token}
                    onChange={(e) => setToken(e.target.value)}
                    placeholder="Enter admin API token"
                    autoComplete="off"
                  />
                </label>
                <button className="btn-secondary" type="submit" disabled={loading || !token.trim()}>
                  {loading ? "Checking..." : "Access with token"}
                </button>
              </form>
              <small style={{ display: "block", marginTop: 8, color: "var(--color-muted, #666)" }}>
                Tokens are never stored in browser storage.
              </small>
            </details>
          ) : null}
        </div>
      </section>
    );
  }

  return (
    <section className="app-page">
      <div className="intro-card">
        <h1>Admin Dashboard</h1>
        <button
          className="btn-secondary"
          onClick={() => {
            setAuthed(false);
            setData(null);
            setError("");
            setToken("");
            setShowTokenInput(false);
            setLoading(true);
            // Clear any cached state
            window.location.reload();
          }}
          style={{ marginTop: 8 }}
          type="button"
        >
          Sign out / refresh
        </button>
      </div>

      {data ? (
        <>
          <div className="pricing-grid" style={{ marginTop: 24 }}>
            <article className="panel">
              <h2>Users</h2>
              <strong style={{ fontSize: "2rem" }}>{data.counts.users}</strong>
            </article>
            <article className="panel">
              <h2>Symptom Checks</h2>
              <strong style={{ fontSize: "2rem" }}>{data.counts.symptomChecks}</strong>
            </article>
            <article className="panel">
              <h2>Active Entitlements</h2>
              <strong style={{ fontSize: "2rem" }}>{data.counts.activeEntitlements}</strong>
            </article>
            <article className="panel">
              <h2>Payment Events</h2>
              <strong style={{ fontSize: "2rem" }}>{data.counts.paymentEvents}</strong>
            </article>
          </div>

          {data.webhookFailures.length > 0 ? (
            <article className="panel" style={{ marginTop: 24 }}>
              <h2>Webhook Failures</h2>
              <div className="table-scroll">
                <table className="tool-table">
                  <thead>
                    <tr>
                      <th>Event Type</th>
                      <th>Count</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.webhookFailures.map((f) => (
                      <tr key={f.event_type}>
                        <td>{f.event_type}</td>
                        <td>{f.count}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </article>
          ) : null}

          {data.recentErrors.length > 0 ? (
            <article className="panel" style={{ marginTop: 24 }}>
              <h2>Recent API Errors</h2>
              <div className="table-scroll">
                <table className="tool-table">
                  <thead>
                    <tr>
                      <th>Time</th>
                      <th>Type</th>
                      <th>Route</th>
                      <th>Message</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.recentErrors.map((err, i) => (
                      <tr key={i}>
                        <td style={{ whiteSpace: "nowrap" }}>{new Date(err.created_at).toLocaleString()}</td>
                        <td>{err.event_type}</td>
                        <td>{err.route}</td>
                        <td style={{ maxWidth: 300, overflow: "hidden", textOverflow: "ellipsis" }}>{err.message}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </article>
          ) : null}
        </>
      ) : null}

      <p className="footer-disclaimer" style={{ marginTop: 24, fontSize: "0.8rem", color: "var(--color-muted, #666)" }}>
        This dashboard never displays health data, encrypted payloads, AI prompt/response content, magic link tokens, or secrets.
      </p>
    </section>
  );
}
