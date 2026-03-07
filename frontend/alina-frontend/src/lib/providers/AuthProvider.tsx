'use client';

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useCurrentUser } from '@/hooks/useAuth';
import { clearTokens, isAuthenticated } from '@/lib/utils/auth';

interface User {
  id: string;
  email: string;
  username: string;
  role: string;
  fullName?: string;
  avatar?: string;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  logout: () => void;
  refetch: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

// Public routes that don't need auth check
const PUBLIC_ROUTES = ['/login', '/register', '/forgot-password', '/reset-password', '/'];

export function AuthProvider({ children }: AuthProviderProps) {
  const [mounted, setMounted] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  
  useEffect(() => {
    setMounted(true);
  }, []);
  
  // Skip auth fetch on public pages to prevent flashing
  const isPublicRoute = PUBLIC_ROUTES.includes(pathname);
  const { data: userData, isLoading, refetch } = useCurrentUser({ 
    enabled: mounted && !isPublicRoute 
  });

  const logout = () => {
    clearTokens();
    router.push('/login');
  };

  const value: AuthContextType = {
    user: userData || null,
    isLoading,
    isAuthenticated: !!userData,
    logout,
    refetch,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
