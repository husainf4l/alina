// Wallet and Transaction types

export interface Wallet {
  id: string;
  userId: string;
  balance: number;
  currency: string;
  pendingBalance: number;
  availableBalance: number;
  createdAt: string;
  updatedAt: string;
}

export enum TransactionType {
  DEPOSIT = 'Deposit',
  WITHDRAWAL = 'Withdrawal',
  PAYMENT = 'Payment',
  EARNING = 'Earning',
  REFUND = 'Refund',
  FEE = 'Fee',
}

export enum TransactionStatus {
  PENDING = 'Pending',
  COMPLETED = 'Completed',
  FAILED = 'Failed',
  CANCELLED = 'Cancelled',
}

export interface Transaction {
  id: string;
  walletId: string;
  type: TransactionType;
  amount: number;
  currency: string;
  status: TransactionStatus;
  description: string;
  referenceId?: string;
  createdAt: string;
  updatedAt: string;
}

export interface DepositRequest {
  amount: number;
  paymentMethod: string;
  currency?: string;
}

export interface WithdrawalRequest {
  amount: number;
  withdrawalMethod: string;
  accountDetails: Record<string, any>;
}

export interface PaymentMethod {
  id: string;
  type: 'card' | 'bank' | 'paypal' | 'stripe';
  name: string;
  lastFour?: string;
  isDefault: boolean;
  createdAt: string;
}
