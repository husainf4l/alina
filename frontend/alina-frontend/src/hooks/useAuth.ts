// React Query hooks for Auth

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { authService } from '@/lib/api/services';
import type {
  LoginRequest,
  RegisterRequest,
  GoogleAuthRequest,
  ChangePasswordRequest,
  ResetPasswordRequest,
  ConfirmResetPasswordRequest,
} from '@/lib/api/types';

export const useCurrentUser = (options?: { enabled?: boolean }) => {
  return useQuery({
    queryKey: ['currentUser'],
    queryFn: () => authService.getCurrentUser(),
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: false, // Don't retry on failure to prevent infinite loading
    enabled: options?.enabled !== false, // Allow disabling the query
    placeholderData: (previousData) => previousData ?? null, // Keep previous data or null to prevent loading flash
    refetchOnMount: false, // Don't refetch on mount if data is available
    refetchOnWindowFocus: false, // Don't refetch on window focus to reduce flashing
  });
};

export const useLogin = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: LoginRequest) => authService.login(data),
    onSuccess: (response) => {
      // Tokens are stored in HTTP-only cookies by backend
      
      // Invalidate queries
      queryClient.invalidateQueries({ queryKey: ['currentUser'] });
    },
  });
};

export const useRegister = () => {
  return useMutation({
    mutationFn: (data: RegisterRequest) => authService.register(data),
  });
};

export const useGoogleAuth = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: GoogleAuthRequest) => authService.googleAuth(data),
    onSuccess: (response) => {
      // Tokens are stored in HTTP-only cookies by backend
      queryClient.invalidateQueries({ queryKey: ['currentUser'] });
    },
  });
};

export const useLogout = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => authService.logout(),
    onSuccess: () => {
      // HTTP-only cookies are cleared by backend /auth/logout endpoint
      // Just clear React Query cache
      queryClient.clear();
    },
  });
};

export const useChangePassword = () => {
  return useMutation({
    mutationFn: (data: ChangePasswordRequest) => authService.changePassword(data),
  });
};

export const useRequestPasswordReset = () => {
  return useMutation({
    mutationFn: (data: ResetPasswordRequest) => authService.requestPasswordReset(data),
  });
};

// Alias for forgot password page
export const useForgotPassword = useRequestPasswordReset;

export const useConfirmPasswordReset = () => {
  return useMutation({
    mutationFn: (data: ConfirmResetPasswordRequest) => authService.confirmPasswordReset(data),
  });
};

// Alias for reset password page
export const useResetPassword = useConfirmPasswordReset;

export const useVerifyEmail = () => {
  return useMutation({
    mutationFn: (data: { token: string }) => authService.verifyEmail(data.token),
  });
};

export const useResendVerificationEmail = () => {
  return useMutation({
    mutationFn: (data: { email: string }) => authService.resendVerificationEmail(),
  });
};

// Alias for verify email page
export const useResendVerification = useResendVerificationEmail;
