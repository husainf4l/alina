// User types

export interface User {
  id: string;
  email: string;
  username: string;
  firstName?: string;
  lastName?: string;
  phoneNumber?: string;
  emailConfirmed: boolean;
  phoneConfirmed: boolean;
  twoFactorEnabled: boolean;
  createdAt: string;
  updatedAt: string;
  role: UserRole;
  status: UserStatus;
}

export enum UserRole {
  User = 'User',
  Seller = 'Seller',
  Admin = 'Admin',
  SuperAdmin = 'SuperAdmin',
}

export enum UserStatus {
  Active = 'Active',
  Suspended = 'Suspended',
  Banned = 'Banned',
  PendingVerification = 'PendingVerification',
}

export interface RefreshToken {
  id: string;
  userId: string;
  token: string;
  expiresAt: string;
  createdAt: string;
  isRevoked: boolean;
}
