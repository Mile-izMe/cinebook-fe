import { create } from "zustand";
import { User } from "../types";
import { devtools } from "zustand/middleware";

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;

  setAuth: (user: User | null) => void;
  clearAuth: () => void;
}

export const useAuthStore = create<AuthState>()(
  devtools(
    (set) => ({
      user: null,
      isAuthenticated: false,

      setAuth: (user) =>
        set({ user, isAuthenticated: true }, false, "auth/setAuth"),

      clearAuth: () =>
        set({ user: null, isAuthenticated: false }, false, "auth/clearAuth"),
    }),
    { name: "AuthStore" },
  ),
);
