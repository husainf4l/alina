"use client";

import { createContext, useContext, useState, useCallback, useEffect, ReactNode } from "react";
import { setAccessToken } from "@/lib/apiClient";
import apiClient from "@/lib/apiClient";

export interface AuthUser {
  id: string;
  fullName: string;
  email: string;
  role: string;
  profileCompletionPercentage: number;
  displayName?: string;
  bio?: string;
  avatarUrl?: string;
  coverUrl?: string;
}

/** Maps a raw /api/auth/me profile response onto AuthUser */
function mapProfile(profile: Record<string, unknown>): Partial<AuthUser> {
  return {
    profileCompletionPercentage: (profile.profileCompletionPercentage as number) ?? 0,
    displayName: profile.displayName as string | undefined,
    bio: profile.bio as string | undefined,
    avatarUrl: profile.avatarUrl as string | undefined,
    // backend returns coverImageUrl
    coverUrl: (profile.coverImageUrl ?? profile.coverUrl) as string | undefined,
    role: (profile.userRole ?? profile.role) as string | undefined,
    fullName: profile.fullName as string | undefined,
    email: profile.email as string | undefined,
  };
}

export interface AuthResult {
  user: AuthUser;
  /** true if the user just registered (never completed onboarding) */
  isNewUser: boolean;
}

interface AuthContextValue {
  user: AuthUser | null;
  /** true once the silent session-restore check on mount has finished */
  isInitialized: boolean;
  login: (email: string, password: string) => Promise<AuthResult>;
  register: (fullName: string, email: string, password: string) => Promise<AuthResult>;
  loginWithGoogle: (idToken: string) => Promise<AuthResult>;
  logout: () => Promise<void>;
  refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isInitialized, setIsInitialized] = useState(false);

  // Silently restore session on mount using the HttpOnly refresh-token cookie
  useEffect(() => {
    (async () => {
      try {
        const { data } = await apiClient.post("/api/auth/web/refresh");
        if (data?.access_token) {
          setAccessToken(data.access_token);
          // Fetch full profile
          const { data: profile } = await apiClient.get("/api/auth/me");
          const mapped = mapProfile(profile);
          setUser({
            id: data.user_id ?? profile.userId ?? profile.id,
            fullName: mapped.fullName ?? data.user_full_name,
            email: mapped.email ?? data.user_email,
            role: mapped.role ?? data.user_role,
            profileCompletionPercentage: mapped.profileCompletionPercentage ?? 0,
            displayName: mapped.displayName,
            bio: mapped.bio,
            avatarUrl: mapped.avatarUrl,
            coverUrl: mapped.coverUrl,
          });
        }
      } catch {
        // No valid session — user stays null, they'll be redirected to /auth
      } finally {
        setIsInitialized(true);
      }
    })();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleAuthResponse = useCallback(async (data: {
    access_token: string;
    user_id: string;
    user_full_name: string;
    user_email: string;
    user_role: string;
    message?: string;
  }): Promise<AuthResult> => {
    setAccessToken(data.access_token);

    // Fetch full profile to get completion percentage + avatar
    let mapped: Partial<AuthUser> = {};
    try {
      const { data: profile } = await apiClient.get("/api/auth/me");
      mapped = mapProfile(profile);
    } catch {
      // non-blocking — continue with defaults
    }

    const authUser: AuthUser = {
      id: data.user_id,
      fullName: data.user_full_name,
      email: data.user_email,
      role: mapped.role ?? data.user_role,
      profileCompletionPercentage: mapped.profileCompletionPercentage ?? 0,
      displayName: mapped.displayName,
      bio: mapped.bio,
      avatarUrl: mapped.avatarUrl,
      coverUrl: mapped.coverUrl,
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

  const refreshUser = useCallback(async () => {
    try {
      const { data: profile } = await apiClient.get("/api/auth/me");
      const mapped = mapProfile(profile);
      setUser((prev) =>
        prev
          ? {
              ...prev,
              profileCompletionPercentage: mapped.profileCompletionPercentage ?? prev.profileCompletionPercentage,
              displayName: mapped.displayName,
              bio: mapped.bio,
              avatarUrl: mapped.avatarUrl,
              coverUrl: mapped.coverUrl,
              fullName: mapped.fullName ?? prev.fullName,
              role: mapped.role ?? prev.role,
            }
          : prev
      );
    } catch {
      // ignore
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, isInitialized, login, register, loginWithGoogle, logout, refreshUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
