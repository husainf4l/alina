// Finance types

export interface Wallet {
  id: string;
  userId: string;
  balance: number;
  currency: string;
  pendingBalance: number;
  availableBalance: number;
  totalEarnings: number;
  totalWithdrawals: number;
  createdAt: string;
  updatedAt: string;
}

export interface Transaction {
  id: string;
  walletId: string;
  type: TransactionType;
  amount: number;
  currency: string;
  description: string;
  status: TransactionStatus;
  metadata?: Record<string, any>;
  createdAt: string;
  completedAt?: string;
}

export enum TransactionType {
  Credit = 'Credit',
  Debit = 'Debit',
  OrderPayment = 'OrderPayment',
  OrderRefund = 'OrderRefund',
  Withdrawal = 'Withdrawal',
  Fee = 'Fee',
}

export enum TransactionStatus {
  Pending = 'Pending',
  Completed = 'Completed',
  Failed = 'Failed',
  Cancelled = 'Cancelled',
}

export interface WithdrawalRequest {
  id: string;
  userId: string;
  amount: number;
  currency: string;
  method: WithdrawalMethod;
  accountDetails: Record<string, string>;
  status: WithdrawalStatus;
  processedAt?: string;
  rejectionReason?: string;
  createdAt: string;
  updatedAt: string;
}

export enum WithdrawalMethod {
  BankTransfer = 'BankTransfer',
  PayPal = 'PayPal',
  Stripe = 'Stripe',
  Crypto = 'Crypto',
}

export enum WithdrawalStatus {
  Pending = 'Pending',
  Processing = 'Processing',
  Completed = 'Completed',
  Rejected = 'Rejected',
  Cancelled = 'Cancelled',
}

export interface CreateWithdrawalRequest {
  amount: number;
  method: WithdrawalMethod;
  accountDetails: Record<string, string>;
}

export interface CurrencyRate {
  id: string;
  fromCurrency: string;
  toCurrency: string;
  rate: number;
  updatedAt: string;
}
