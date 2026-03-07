'use client';

import { useState } from 'react';
import { ProtectedRoute } from '@/components/auth/ProtectedRoute';
import { PageTransition } from '@/components/ui/PageTransition';
import { Button } from '@/components/ui/Button';
import { getErrorMessage, logError } from '@/lib/utils/errors';
import { useToast } from '@/contexts/ToastContext';

export default function DepositPage() {
  const [amount, setAmount] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [isProcessing, setIsProcessing] = useState(false);
  const toast = useToast();

  const quickAmounts = [50, 100, 250, 500, 1000];

  const handleDeposit = async () => {
    const depositAmount = parseFloat(amount);
    
    // Validation
    if (!amount || depositAmount <= 0) {
      toast.error('Please enter a valid amount');
      return;
    }
    
    if (depositAmount < 10) {
      toast.error('Minimum deposit is $10');
      return;
    }
    
    setIsProcessing(true);
    
    try {
      // Import payment service
      const { stripePaymentService } = await import('@/lib/api/services/payment.service');
      const { apiClient } = await import('@/lib/api/axios-config');
      
      if (paymentMethod === 'card') {
        // Process card deposit via Stripe
        await stripePaymentService.processPayment({
          gigId: 'wallet-deposit',
          packageType: 'deposit',
          amount: depositAmount,
          paymentMethodId: 'pm_card_visa', // Would come from Stripe Elements
        });
      } else {
        // Process via backend
        await apiClient.post('/wallet/deposit', { 
          amount: depositAmount, 
          paymentMethod 
        });
      }
      
      toast.success(`Successfully deposited $${Number(depositAmount || 0).toFixed(2)}`);
      setAmount('');
    } catch (error) {
      const errorMessage = getErrorMessage(error);
      toast.error(errorMessage);
      logError(error, { action: 'deposit', amount: depositAmount, paymentMethod });
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
              <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">Deposit Funds</h1>
              <p className="text-gray-600 dark:text-gray-400">Add money to your wallet</p>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-3xl p-8 border border-gray-100 dark:border-gray-700">
              {/* Amount Input */}
              <div className="mb-6">
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">Amount</label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-2xl font-bold text-gray-900 dark:text-white">$</span>
                  <input
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    placeholder="0.00"
                    className="w-full pl-12 pr-4 py-4 text-2xl font-bold bg-gray-50 dark:bg-gray-700 border-2 border-gray-200 dark:border-gray-600 rounded-2xl focus:outline-none focus:border-blue-500 text-gray-900 dark:text-white"
                  />
                </div>
              </div>

              {/* Quick Amount Buttons */}
              <div className="mb-8">
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">Quick Amounts</label>
                <div className="grid grid-cols-5 gap-3">
                  {quickAmounts.map((quick) => (
                    <button
                      key={quick}
                      onClick={() => setAmount(quick.toString())}
                      className="py-3 px-4 bg-gray-100 dark:bg-gray-700 hover:bg-blue-500 hover:text-white dark:hover:bg-blue-500 rounded-xl font-semibold transition-all text-gray-900 dark:text-white"
                    >
                      ${quick}
                    </button>
                  ))}
                </div>
              </div>

              {/* Payment Method */}
              <div className="mb-8">
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">Payment Method</label>
                <div className="space-y-3">
                  {[
                    { id: 'card', name: 'Credit/Debit Card', icon: '💳' },
                    { id: 'paypal', name: 'PayPal', icon: '🅿️' },
                    { id: 'bank', name: 'Bank Transfer', icon: '🏦' },
                    { id: 'stripe', name: 'Stripe', icon: '💰' },
                  ].map((method) => (
                    <button
                      key={method.id}
                      onClick={() => setPaymentMethod(method.id)}
                      className={`w-full p-4 rounded-2xl border-2 transition-all flex items-center gap-4 ${
                        paymentMethod === method.id
                          ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                          : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
                      }`}
                    >
                      <span className="text-3xl">{method.icon}</span>
                      <span className="font-semibold text-gray-900 dark:text-white">{method.name}</span>
                      {paymentMethod === method.id && (
                        <svg className="w-6 h-6 text-blue-500 ml-auto" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* Info Box */}
              <div className="mb-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-2xl border border-blue-200 dark:border-blue-800">
                <div className="flex gap-3">
                  <svg className="w-5 h-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                  </svg>
                  <div className="text-sm text-blue-900 dark:text-blue-300">
                    Funds will be available in your wallet immediately. Minimum deposit is $10.
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <Button
                onClick={handleDeposit}
                disabled={!amount || parseFloat(amount) < 10}
                className="w-full py-4 text-lg font-semibold"
              >
                Deposit ${amount || '0.00'}
              </Button>
            </div>
          </div>
        </div>
      </PageTransition>
    </ProtectedRoute>
  );
}
