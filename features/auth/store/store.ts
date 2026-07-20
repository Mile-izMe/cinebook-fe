import { create } from "zustand";
import { User } from "../types";
import { devtools } from "zustand/middleware";

type AuthStatus = "idle" | "loading" | "authenticated" | "unauthenticated";

interface AuthState {
  user: User | null;
  status: AuthStatus;
  setAuth: (user: User) => void;
  clearAuth: () => void;
  setLoading: () => void;
  setUnauthenticated: () => void;
}

export const useAuthStore = create<AuthState>()(
  devtools(
    (set) => ({
      user: null,
      status: "idle",
      setAuth: (user) =>
        set({ user, status: "authenticated" }, false, "auth/setAuth"),
      clearAuth: () =>
        set({ user: null, status: "unauthenticated" }, false, "auth/clearAuth"),
      setLoading: () => set({ status: "loading" }, false, "auth/loading"),
      setUnauthenticated: () =>
        set({ status: "unauthenticated" }, false, "auth/unauthenticated"),
    }),
    { name: "AuthStore" },
  ),
);
