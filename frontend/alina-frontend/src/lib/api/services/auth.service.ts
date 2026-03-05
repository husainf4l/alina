// Authentication service

import apiClient from '../client';
import type {
  LoginRequest,
  LoginResponse,
  RegisterRequest,
  RegisterResponse,
  RefreshTokenRequest,
  RefreshTokenResponse,
  GoogleAuthRequest,
  ChangePasswordRequest,
  ResetPasswordRequest,
  ConfirmResetPasswordRequest,
} from '../types';

export const authService = {
  // Login
  login: async (data: LoginRequest): Promise<LoginResponse> => {
    const response = await apiClient.post<LoginResponse>('/auth/web/login', data);
    return response.data;
  },

  // Register
  register: async (data: RegisterRequest): Promise<RegisterResponse> => {
    const response = await apiClient.post<RegisterResponse>('/auth/web/register', data);
    return response.data;
  },

  // Refresh token
  refreshToken: async (data: RefreshTokenRequest): Promise<RefreshTokenResponse> => {
    const response = await apiClient.post<RefreshTokenResponse>('/auth/web/refresh', data);
    return response.data;
  },

  // Google authentication
  googleAuth: async (data: GoogleAuthRequest): Promise<LoginResponse> => {
    const response = await apiClient.post<LoginResponse>('/auth/web/google', data);
    return response.data;
  },

  // Get current user
  getCurrentUser: async (): Promise<any> => {
    const response = await apiClient.get('/auth/me');
    return response.data;
  },

  // Logout
  logout: async (): Promise<void> => {
    await apiClient.post('/auth/logout');
  },

  // Change password
  changePassword: async (data: ChangePasswordRequest): Promise<void> => {
    await apiClient.post('/auth/change-password', data);
  },

  // Request password reset
  requestPasswordReset: async (data: ResetPasswordRequest): Promise<void> => {
    await apiClient.post('/auth/reset-password', data);
  },

  // Confirm password reset
  confirmPasswordReset: async (data: ConfirmResetPasswordRequest): Promise<void> => {
    await apiClient.post('/auth/confirm-reset-password', data);
  },

  // Verify email
  verifyEmail: async (token: string): Promise<void> => {
    await apiClient.get(`/auth/verify-email?token=${token}`);
  },

  // Resend verification email
  resendVerificationEmail: async (): Promise<void> => {
    await apiClient.post('/auth/resend-verification');
  },
};
