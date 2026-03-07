"use client";

import { createContext, useContext, useState, useCallback, ReactNode } from "react";
import { setAccessToken } from "@/lib/apiClient";
import apiClient from "@/lib/apiClient";

export interface AuthUser {
  id: string;
  fullName: string;
  email: string;
  role: string;
  profileCompletionPercentage: number;
}

export interface AuthResult {
  user: AuthUser;
  /** true if the user just registered (never completed onboarding) */
  isNewUser: boolean;
}

interface AuthContextValue {
  user: AuthUser | null;
  login: (email: string, password: string) => Promise<AuthResult>;
  register: (fullName: string, email: string, password: string) => Promise<AuthResult>;
  loginWithGoogle: (idToken: string) => Promise<AuthResult>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);

  const handleAuthResponse = useCallback(async (data: {
    access_token: string;
    user_id: string;
    user_full_name: string;
    user_email: string;
    user_role: string;
    message?: string;
  }): Promise<AuthResult> => {
    setAccessToken(data.access_token);

    // Fetch full profile to get completion percentage
    let profileCompletionPercentage = 0;
    try {
      const { data: profile } = await apiClient.get("/api/auth/me");
      profileCompletionPercentage = profile.profileCompletionPercentage ?? 0;
    } catch {
      // non-blocking — continue with 0
    }

    const authUser: AuthUser = {
      id: data.user_id,
      fullName: data.user_full_name,
      email: data.user_email,
      role: data.user_role,
      profileCompletionPercentage,
    };
    setUser(authUser);

    const isNewUser = data.message?.toLowerCase().includes("registered") ?? false;
    return { user: authUser, isNewUser };
  }, []);

  const login = useCallback(async (email: string, password: string) => {
    const { data } = await apiClient.post("/api/auth/web/login", { email, password });
    return handleAuthResponse(data);
  }, [handleAuthResponse]);

  const register = useCallback(async (fullName: string, email: string, password: string) => {
    const { data } = await apiClient.post("/api/auth/web/register", { fullName, email, password });
    return handleAuthResponse(data);
  }, [handleAuthResponse]);

  const loginWithGoogle = useCallback(async (idToken: string) => {
    const { data } = await apiClient.post("/api/auth/web/google", { id_token: idToken });
    return handleAuthResponse(data);
  }, [handleAuthResponse]);

  const logout = useCallback(async () => {
    try {
      await apiClient.post("/api/auth/logout");
    } catch {
      // ignore
    } finally {
      setAccessToken(null);
      setUser(null);
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, register, loginWithGoogle, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
