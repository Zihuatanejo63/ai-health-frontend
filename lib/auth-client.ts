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
  planId: string;
  status: string;
  currentPeriodEnd?: string;
}

export interface MeResponse {
  user: ServerUser | null;
  entitlement: ServerEntitlement;
}

const API_BASE =
  process.env.NEXT_PUBLIC_API_BASE_URL?.replace(/\/$/, "") ||
  (typeof window !== "undefined" && window.location.hostname === "healthmatchai.com"
    ? "https://api.healthmatchai.com"
    : "");

let cachedMe: MeResponse | null = null;
let mePromise: Promise<MeResponse> | null = null;

export async function fetchMe(): Promise<MeResponse> {
  // Deduplicate concurrent calls
  if (mePromise) return mePromise;

  mePromise = fetch(`${API_BASE}/api/me`, { credentials: "include" })
    .then((res) => (res.ok ? (res.json() as Promise<MeResponse>) : { user: null, entitlement: { planId: "free", status: "inactive" } }))
    .catch(() => ({ user: null, entitlement: { planId: "free", status: "inactive" } }))
    .finally(() => {
      mePromise = null;
    });

  const result = await mePromise;
  cachedMe = result;
  return result;
}

export function getCachedMe(): MeResponse {
  return cachedMe ?? { user: null, entitlement: { planId: "free", status: "inactive" } };
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

export async function registerWithPassword(
  email: string,
  password: string,
  name?: string
): Promise<{ ok: boolean; message: string; user?: ServerUser }> {
  const url = `${API_BASE}/api/auth/register`;
  console.log("[register] API_BASE:", API_BASE);
  console.log("[register] URL:", url);

  try {
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password, name }),
      credentials: "include",
    });
    const data = (await res.json().catch(() => ({}))) as {
      ok?: boolean; message?: string; code?: string; user?: ServerUser; error?: { message?: string };
    };
    console.log("[register] response.status:", res.status);
    console.log("[register] response JSON:", data);

    if (res.ok && data.ok) {
      clearCachedMe();
      return { ok: true, message: data.message || "Account created successfully.", user: data.user };
    }
    // Show real backend message
    return {
      ok: false,
      message: data.message || data.error?.message || "Registration failed. Please try again.",
    };
  } catch (err) {
    console.error("[register] fetch error:", err);
    return { ok: false, message: "Registration failed. Please check your connection and try again." };
  }
}

export async function loginWithPassword(
  email: string,
  password: string
): Promise<{ ok: boolean; message: string; user?: ServerUser }> {
  const url = `${API_BASE}/api/auth/login`;
  console.log("[login] API_BASE:", API_BASE);
  console.log("[login] URL:", url);

  try {
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
      credentials: "include",
    });
    const data = (await res.json().catch(() => ({}))) as {
      ok?: boolean; message?: string; code?: string; user?: ServerUser; error?: { message?: string };
    };
    console.log("[login] response.status:", res.status);
    console.log("[login] response JSON:", data);

    if (res.ok && data.ok) {
      clearCachedMe();
      return { ok: true, message: data.message || "Logged in successfully.", user: data.user };
    }
    return {
      ok: false,
      message: data.message || data.error?.message || "Login failed. Please try again.",
    };
  } catch (err) {
    console.error("[login] fetch error:", err);
    return { ok: false, message: "Login failed. Please check your connection and try again." };
  }
}

export async function logout(): Promise<void> {
  await fetch(`${API_BASE}/api/auth/logout`, {
    method: "POST",
    credentials: "include",
  }).catch(() => {});
  clearCachedMe();
}

export async function updateProfile(name: string): Promise<{ ok: boolean; message: string; user?: ServerUser }> {
  try {
    const res = await fetch(`${API_BASE}/api/me`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ name }),
    });
    const data = (await res.json().catch(() => ({}))) as {
      ok?: boolean; message?: string; user?: ServerUser; error?: { message?: string };
    };
    if (res.ok && data.ok) {
      clearCachedMe();
      return { ok: true, message: data.message || "Profile updated.", user: data.user };
    }
    return { ok: false, message: data.error?.message || data.message || "Update failed." };
  } catch {
    return { ok: false, message: "Update failed. Please check your connection." };
  }
}

export function isLoggedIn(me?: MeResponse | null): boolean {
  return Boolean((me ?? cachedMe)?.user);
}

export function hasActivePlan(planId: string, me?: MeResponse | null): boolean {
  const ent = (me ?? cachedMe)?.entitlement;
  return ent !== null && ent !== undefined && ent.planId === planId && ent.status === "active";
}

export function getActivePlan(me?: MeResponse | null): string | null {
  const ent = (me ?? cachedMe)?.entitlement;
  if (ent && ent.status === "active" && ent.planId !== "free") return ent.planId;
  return null;
}
