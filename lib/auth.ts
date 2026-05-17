export const USER_STORAGE_KEY = "healthmatchai_user";
export const AUTH_ACCOUNTS_STORAGE_KEY = "healthmatchai_auth_accounts";

export type HealthMatchUser = {
  id: string;
  name: string;
  email: string;
  isGuest: boolean;
  createdAt: string;
};

type LocalAuthAccount = HealthMatchUser & {
  passwordHash: string;
};

export const defaultGuestUser: HealthMatchUser = {
  id: "guest_or_user_id",
  name: "Guest",
  email: "",
  isGuest: true,
  createdAt: ""
};

export function readUser(): HealthMatchUser | null {
  if (typeof window === "undefined") return null;
  try {
    const stored = window.localStorage.getItem(USER_STORAGE_KEY);
    return stored ? JSON.parse(stored) : null;
  } catch {
    return null;
  }
}

export function writeUser(user: HealthMatchUser) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(user));
}

export function clearUser() {
  if (typeof window === "undefined") return;
  window.localStorage.removeItem(USER_STORAGE_KEY);
}

export function createMockUser(email: string, name = "Alex Johnson", isGuest = false): HealthMatchUser {
  return {
    id: isGuest ? "guest_or_user_id" : `user_${Date.now()}`,
    name,
    email,
    isGuest,
    createdAt: new Date().toISOString()
  };
}

function demoHash(password: string) {
  if (typeof window === "undefined") return "";
  return window.btoa(unescape(encodeURIComponent(`healthmatchai-demo:${password}`)));
}

function readAccounts(): LocalAuthAccount[] {
  if (typeof window === "undefined") return [];
  try {
    const stored = window.localStorage.getItem(AUTH_ACCOUNTS_STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
}

function writeAccounts(accounts: LocalAuthAccount[]) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(AUTH_ACCOUNTS_STORAGE_KEY, JSON.stringify(accounts));
}

export function registerMockAccount({ name, email, password }: { name: string; email: string; password: string }) {
  const normalizedEmail = email.trim().toLowerCase();
  const user = createMockUser(normalizedEmail, name.trim(), false);
  const account: LocalAuthAccount = {
    ...user,
    passwordHash: demoHash(password)
  };
  const accounts = readAccounts().filter((item) => item.email.toLowerCase() !== normalizedEmail);
  writeAccounts([account, ...accounts]);
  writeUser(user);
  return user;
}

export function authenticateMockAccount(email: string, password: string) {
  const normalizedEmail = email.trim().toLowerCase();
  const account = readAccounts().find((item) => item.email.toLowerCase() === normalizedEmail);
  if (!account) return { ok: false as const, reason: "not_found" as const };
  if (account.passwordHash !== demoHash(password)) return { ok: false as const, reason: "invalid" as const };
  const { passwordHash: _passwordHash, ...user } = account;
  writeUser(user);
  return { ok: true as const, user };
}
