export const USER_STORAGE_KEY = "healthmatchai_user";

export type HealthMatchUser = {
  id: string;
  name: string;
  email: string;
  isGuest: boolean;
  createdAt: string;
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
