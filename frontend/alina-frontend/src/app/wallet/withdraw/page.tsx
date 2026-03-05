'use client';

import { useState } from 'react';
import { ProtectedRoute } from '@/components/auth/ProtectedRoute';
import { PageTransition } from '@/components/ui/PageTransition';
import { Button } from '@/components/ui/Button';
import { getErrorMessage, logError } from '@/lib/utils/errors';
import { useToast } from '@/contexts/ToastContext';

export default function WithdrawPage() {
  const [amount, setAmount] = useState('');
  const [withdrawalMethod, setWithdrawalMethod] = useState('bank');
  const [isProcessing, setIsProcessing] = useState(false);
  const toast = useToast();
  const [accountDetails, setAccountDetails] = useState({
    accountHolder: '',
    accountNumber: '',
    routingNumber: '',
  });

  const availableBalance = 5100.50;

  const handleWithdraw = async () => {
    const withdrawAmount = parseFloat(amount);
    
    // Validation
    if (!amount || withdrawAmount <= 0) {
      toast.error('Please enter a valid amount');
      return;
    }
    
    if (withdrawAmount > availableBalance) {
      toast.error('Insufficient balance');
      return;
    }
    
    if (withdrawalMethod === 'bank' && (!accountDetails.accountHolder || !accountDetails.accountNumber || !accountDetails.routingNumber)) {
      toast.error('Please fill in all account details');
      return;
    }
    
    setIsProcessing(true);
    
    try {
      // Import API client
      const { apiClient } = await import('@/lib/api/axios-config');
      
      await apiClient.post('/wallet/withdraw', { 
        amount: withdrawAmount, 
        method: withdrawalMethod, 
        accountDetails 
      });
      
      toast.success(`Withdrawal request for $${withdrawAmount.toFixed(2)} submitted successfully`);
      setAmount('');
      setAccountDetails({
        accountHolder: '',
        accountNumber: '',
        routingNumber: '',
      });
    } catch (error) {
      const errorMessage = getErrorMessage(error);
      toast.error(errorMessage);
      logError(error, { action: 'withdraw', amount: withdrawAmount, method: withdrawalMethod });
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <ProtectedRoute>
      <PageTransition>
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 py-8">
          <div className="max-w-3xl mx-auto px-6">
            <div className="mb-8">
              <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">Withdraw Funds</h1>
              <p className="text-gray-600 dark:text-gray-400">Transfer money from your wallet</p>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-3xl p-8 border border-gray-100 dark:border-gray-700">
              {/* Available Balance */}
              <div className="mb-6 p-4 bg-green-50 dark:bg-green-900/20 rounded-2xl">
                <div className="text-sm text-green-700 dark:text-green-300 mb-1">Available Balance</div>
                <div className="text-3xl font-bold text-green-600 dark:text-green-400">${availableBalance.toFixed(2)}</div>
              </div>

              {/* Amount */}
              <div className="mb-6">
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">Withdrawal Amount</label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-2xl font-bold text-gray-900 dark:text-white">$</span>
                  <input
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    placeholder="0.00"
                    max={availableBalance}
                    className="w-full pl-12 pr-4 py-4 text-2xl font-bold bg-gray-50 dark:bg-gray-700 border-2 border-gray-200 dark:border-gray-600 rounded-2xl focus:outline-none focus:border-blue-500 text-gray-900 dark:text-white"
                  />
                </div>
                <button
                  onClick={() => setAmount(availableBalance.toString())}
                  className="text-sm text-blue-600 dark:text-blue-400 hover:underline mt-2"
                >
                  Withdraw all
                </button>
              </div>

              {/* Method */}
              <div className="mb-6">
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">Withdrawal Method</label>
                <select
                  value={withdrawalMethod}
                  onChange={(e) => setWithdrawalMethod(e.target.value)}
                  className="w-full p-4 bg-gray-50 dark:bg-gray-700 border-2 border-gray-200 dark:border-gray-600 rounded-2xl focus:outline-none focus:border-blue-500 text-gray-900 dark:text-white font-semibold"
                >
                  <option value="bank">Bank Transfer</option>
                  <option value="paypal">PayPal</option>
                  <option value="card">Debit Card</option>
                </select>
              </div>

              {/* Account Details */}
              {withdrawalMethod === 'bank' && (
                <div className="space-y-4 mb-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Account Holder Name</label>
                    <input
                      type="text"
                      value={accountDetails.accountHolder}
                      onChange={(e) => setAccountDetails({ ...accountDetails, accountHolder: e.target.value })}
                      className="w-full p-4 bg-gray-50 dark:bg-gray-700 border-2 border-gray-200 dark:border-gray-600 rounded-2xl focus:outline-none focus:border-blue-500 text-gray-900 dark:text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Account Number</label>
                    <input
                      type="text"
                      value={accountDetails.accountNumber}
                      onChange={(e) => setAccountDetails({ ...accountDetails, accountNumber: e.target.value })}
                      className="w-full p-4 bg-gray-50 dark:bg-gray-700 border-2 border-gray-200 dark:border-gray-600 rounded-2xl focus:outline-none focus:border-blue-500 text-gray-900 dark:text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Routing Number</label>
                    <input
                      type="text"
                      value={accountDetails.routingNumber}
                      onChange={(e) => setAccountDetails({ ...accountDetails, routingNumber: e.target.value })}
                      className="w-full p-4 bg-gray-50 dark:bg-gray-700 border-2 border-gray-200 dark:border-gray-600 rounded-2xl focus:outline-none focus:border-blue-500 text-gray-900 dark:text-white"
                    />
                  </div>
                </div>
              )}

              {/* Warning */}
              <div className="mb-6 p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-2xl border border-yellow-200 dark:border-yellow-800">
                <div className="flex gap-3">
                  <svg className="w-5 h-5 text-yellow-600 dark:text-yellow-400 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                  <div className="text-sm text-yellow-900 dark:text-yellow-300">
                    Withdrawals typically take 3-5 business days to process. Minimum withdrawal is $20.
                  </div>
                </div>
              </div>

              <Button
                onClick={handleWithdraw}
                disabled={!amount || parseFloat(amount) < 20 || parseFloat(amount) > availableBalance}
                className="w-full py-4 text-lg font-semibold"
              >
                Withdraw ${amount || '0.00'}
              </Button>
            </div>
          </div>
        </div>
      </PageTransition>
    </ProtectedRoute>
  );
}
