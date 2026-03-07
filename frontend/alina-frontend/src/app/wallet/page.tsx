'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ProtectedRoute } from '@/components/auth/ProtectedRoute';
import { PageTransition } from '@/components/ui/PageTransition';
import { Button } from '@/components/ui/Button';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export default function WalletPage() {
  const [activeTab, setActiveTab] = useState<'all' | 'deposits' | 'withdrawals' | 'earnings'>('all');

  // Mock data (will be replaced with real API)
  const wallet = {
    balance: 5420.50,
    currency: 'USD',
    pendingBalance: 320.00,
    availableBalance: 5100.50,
  };

  const transactions = [
    { id: '1', type: 'earning', amount: 150.00, status: 'completed', description: 'Order #12345 completed', createdAt: '2026-03-03T10:30:00Z' },
    { id: '2', type: 'withdrawal', amount: -500.00, status: 'completed', description: 'Withdrawal to Bank Account', createdAt: '2026-03-02T14:20:00Z' },
    { id: '3', type: 'deposit', amount: 1000.00, status: 'completed', description: 'Deposit via Credit Card', createdAt: '2026-03-01T09:15:00Z' },
    { id: '4', type: 'earning', amount: 250.00, status: 'completed', description: 'Order #12344 completed', createdAt: '2026-02-28T16:45:00Z' },
    { id: '5', type: 'fee', amount: -15.00, status: 'completed', description: 'Platform fee', createdAt: '2026-02-28T16:45:00Z' },
    { id: '6', type: 'earning', amount: 180.00, status: 'pending', description: 'Order #12343 in escrow', createdAt: '2026-02-27T11:30:00Z' },
    { id: '7', type: 'deposit', amount: 2000.00, status: 'completed', description: 'Deposit via PayPal', createdAt: '2026-02-25T13:00:00Z' },
    { id: '8', type: 'refund', amount: 95.00, status: 'completed', description: 'Refund for Order #12340', createdAt: '2026-02-24T10:20:00Z' },
  ];

  const balanceHistory = [
    { month: 'Sep', balance: 2100 },
    { month: 'Oct', balance: 2850 },
    { month: 'Nov', balance: 3420 },
    { month: 'Dec', balance: 4100 },
    { month: 'Jan', balance: 4680 },
    { month: 'Feb', balance: 5250 },
    { month: 'Mar', balance: 5420 },
  ];

  const filteredTransactions = transactions.filter(t => {
    if (activeTab === 'all') return true;
    if (activeTab === 'deposits') return t.type === 'deposit' && t.amount > 0;
    if (activeTab === 'withdrawals') return t.type === 'withdrawal';
    if (activeTab === 'earnings') return t.type === 'earning' && t.description.includes('Order');
    return true;
  });

  const getTransactionIcon = (type: string) => {
    switch (type) {
      case 'deposit':
        return (
          <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m0-16l-4 4m4-4l4 4" />
          </svg>
        );
      case 'withdrawal':
        return (
          <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 20V4m0 16l4-4m-4 4l-4-4" />
          </svg>
        );
      case 'earning':
        return (
          <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        );
      case 'fee':
        return (
          <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 14l6-6m-5.5.5h.01m4.99 5h.01M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16l3.5-2 3.5 2 3.5-2 3.5 2z" />
          </svg>
        );
      case 'refund':
        return (
          <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6" />
          </svg>
        );
      default:
        return null;
    }
  };

  return (
    <ProtectedRoute>
      <PageTransition>
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 py-8">
          <div className="max-w-7xl mx-auto px-6">
            {/* Header */}
            <div className="mb-8">
              <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">Wallet</h1>
              <p className="text-gray-600 dark:text-gray-400">Manage your funds and transactions</p>
            </div>

            {/* Balance Cards */}
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <div className="bg-gradient-to-br from-blue-500 to-cyan-500 rounded-3xl p-6 text-white">
                <div className="text-sm opacity-90 mb-1">Available Balance</div>
                <div className="text-4xl font-bold mb-4">${Number(wallet.availableBalance || 0).toFixed(2)}</div>
                <Link href="/wallet/withdraw">
                  <Button size="sm" variant="outline" className="bg-white/20 hover:bg-white/30 border-white/30 text-white">Withdraw</Button>
                </Link>
              </div>
              <div className="bg-gradient-to-br from-purple-500 to-pink-500 rounded-3xl p-6 text-white">
                <div className="text-sm opacity-90 mb-1">Pending Balance</div>
                <div className="text-4xl font-bold mb-4">${Number(wallet.pendingBalance || 0).toFixed(2)}</div>
                <div className="text-sm opacity-75">In escrow</div>
              </div>
              <div className="bg-gradient-to-br from-green-500 to-emerald-500 rounded-3xl p-6 text-white">
                <div className="text-sm opacity-90 mb-1">Total Balance</div>
                <div className="text-4xl font-bold mb-4">${Number(wallet.balance || 0).toFixed(2)}</div>
                <Link href="/wallet/deposit">
                  <Button size="sm" variant="outline" className="bg-white/20 hover:bg-white/30 border-white/30 text-white">Deposit</Button>
                </Link>
              </div>
            </div>

            {/* Balance History Chart */}
            <div className="mb-8 bg-white dark:bg-gray-800 rounded-3xl border border-gray-100 dark:border-gray-700 p-6">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Balance History</h2>
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={balanceHistory}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip
                    formatter={(value: number | undefined) => value ? `$${value}` : '$0'}
                    contentStyle={{ 
                      backgroundColor: 'rgba(255, 255, 255, 0.95)',
                      border: '1px solid #e5e7eb',
                      borderRadius: '8px'
                    }}
                  />
                  <Area type="monotone" dataKey="balance" stroke="#10b981" fill="#10b981" fillOpacity={0.3} />
                </AreaChart>
              </ResponsiveContainer>
            </div>

            {/* Transactions */}
            <div className="bg-white dark:bg-gray-800 rounded-3xl border border-gray-100 dark:border-gray-700 overflow-hidden">
              <div className="p-6 border-b border-gray-100 dark:border-gray-700">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Transactions</h2>
                <div className="flex gap-2">
                  {['all', 'deposits', 'withdrawals', 'earnings'].map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab as any)}
                      className={`
                        px-4 py-2 rounded-xl font-medium capitalize transition-all
                        ${activeTab === tab
                          ? 'bg-gray-900 dark:bg-white text-white dark:text-gray-900'
                          : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
                        }
                      `}
                    >
                      {tab}
                    </button>
                  ))}
                </div>
              </div>

              <div className="divide-y divide-gray-100 dark:divide-gray-700">
                {filteredTransactions.map((transaction) => (
                  <div key={transaction.id} className="p-6 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-gray-100 dark:bg-gray-700 rounded-2xl flex items-center justify-center flex-shrink-0">
                        {getTransactionIcon(transaction.type)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="font-semibold text-gray-900 dark:text-white">{transaction.description}</div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">
                          {new Date(transaction.createdAt).toLocaleString()}
                        </div>
                      </div>
                      <div className="text-right flex-shrink-0">
                        <div className={`text-xl font-bold ${
                          transaction.amount > 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'
                        }`}>
                          {transaction.amount > 0 ? '+' : ''}${Math.abs(Number(transaction.amount || 0)).toFixed(2)}
                        </div>
                        <div className={`text-xs font-semibold px-2 py-1 rounded-full inline-block ${
                          transaction.status === 'completed'
                            ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300'
                            : 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-300'
                        }`}>
                          {transaction.status}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </PageTransition>
    </ProtectedRoute>
  );
}
