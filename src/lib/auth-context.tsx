"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import {
  clearToken,
  getToken,
  login as apiLogin,
  logout as apiLogout,
  register as apiRegister,
  setToken,
  type LoginRequest,
  type RegisterRequest,
} from "./api";

interface AuthState {
  token: string | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (payload: LoginRequest) => Promise<void>;
  register: (payload: RegisterRequest) => Promise<{ id: string }>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthState | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [token, setTokenState] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const stored = getToken();
    if (stored) setTokenState(stored);
    setIsLoading(false);
  }, []);

  const login = useCallback(async (payload: LoginRequest) => {
    const res = await apiLogin(payload);
    setToken(res.access_token);
    setTokenState(res.access_token);
  }, []);

  const register = useCallback(async (payload: RegisterRequest) => {
    return apiRegister(payload);
  }, []);

  const logout = useCallback(async () => {
    try {
      await apiLogout();
    } finally {
      clearToken();
      setTokenState(null);
    }
  }, []);

  const value = useMemo(
    () => ({
      token,
      isLoading,
      isAuthenticated: !!token,
      login,
      register,
      logout,
    }),
    [token, isLoading, login, register, logout],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthState {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
