/**
 * Server-side auth client — replaces localStorage-based mock auth.
 * All auth state comes from /api/me via HttpOnly session cookie.
 */

export interface ServerUser {
  id: string;
  email: string;
  name: string;
  role: string;
}

export interface ServerEntitlement {
  plan: string;
  status: string;
  currentPeriodEnd?: string;
}

export interface MeResponse {
  user: ServerUser | null;
  entitlement: ServerEntitlement | null;
}

const API_BASE =
  process.env.NEXT_PUBLIC_API_BASE_URL?.replace(/\/$/, "") ?? "";

let cachedMe: MeResponse | null = null;
let mePromise: Promise<MeResponse> | null = null;

export async function fetchMe(): Promise<MeResponse> {
  // Deduplicate concurrent calls
  if (mePromise) return mePromise;

  mePromise = fetch(`${API_BASE}/api/me`, { credentials: "include" })
    .then((res) => (res.ok ? (res.json() as Promise<MeResponse>) : { user: null, entitlement: null }))
    .catch(() => ({ user: null, entitlement: null }))
    .finally(() => {
      mePromise = null;
    });

  const result = await mePromise;
  cachedMe = result;
  return result;
}

export function getCachedMe(): MeResponse {
  return cachedMe ?? { user: null, entitlement: null };
}

export function clearCachedMe(): void {
  cachedMe = null;
}

export async function requestMagicLink(email: string): Promise<{ ok: boolean; message: string }> {
  try {
    const res = await fetch(`${API_BASE}/api/auth/request-link`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });

    const data = (await res.json().catch(() => ({}))) as { ok?: boolean; message?: string; error?: { message?: string } };
    return {
      ok: res.ok && (data.ok ?? false),
      message: data.message || data.error?.message || "We could not send the sign-in email right now. Please try again later.",
    };
  } catch {
    return {
      ok: false,
      message: "We could not send the sign-in email right now. Please try again later.",
    };
  }
}

export async function logout(): Promise<void> {
  await fetch(`${API_BASE}/api/auth/logout`, {
    method: "POST",
    credentials: "include",
  }).catch(() => {});
  clearCachedMe();
}

export async function registerWithPassword(
  email: string,
  password: string,
  name?: string
): Promise<{ ok: boolean; message: string; user?: ServerUser }> {
  try {
    const res = await fetch(`${API_BASE}/api/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password, name }),
      credentials: "include",
    });
    const data = (await res.json().catch(() => ({}))) as {
      ok?: boolean; message?: string; user?: ServerUser; error?: { message?: string };
    };
    if (res.ok && data.ok) {
      clearCachedMe();
      return { ok: true, message: data.message || "Account created.", user: data.user };
    }
    return { ok: false, message: data.error?.message || data.message || "Registration failed. Please try again." };
  } catch {
    return { ok: false, message: "Registration failed. Please check your connection and try again." };
  }
}

export async function loginWithPassword(
  email: string,
  password: string
): Promise<{ ok: boolean; message: string; user?: ServerUser }> {
  try {
    const res = await fetch(`${API_BASE}/api/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
      credentials: "include",
    });
    const data = (await res.json().catch(() => ({}))) as {
      ok?: boolean; message?: string; user?: ServerUser; error?: { message?: string };
    };
    if (res.ok && data.ok) {
      clearCachedMe();
      return { ok: true, message: data.message || "Logged in.", user: data.user };
    }
    return { ok: false, message: data.error?.message || data.message || "Login failed. Please try again." };
  } catch {
    return { ok: false, message: "Login failed. Please check your connection and try again." };
  }
}

export function isLoggedIn(me?: MeResponse | null): boolean {
  return Boolean((me ?? cachedMe)?.user);
}

export function hasActivePlan(plan: string, me?: MeResponse | null): boolean {
  const ent = (me ?? cachedMe)?.entitlement;
  return ent !== null && ent !== undefined && ent.plan === plan && ent.status === "active";
}

export function getActivePlan(me?: MeResponse | null): string | null {
  const ent = (me ?? cachedMe)?.entitlement;
  if (ent && ent.status === "active") return ent.plan;
  return null;
}
