'use client';

import { useState } from 'react';
import { ProtectedRoute } from '@/components/auth/ProtectedRoute';
import { PageTransition } from '@/components/ui/PageTransition';
import { Button } from '@/components/ui/Button';
import Link from 'next/link';

export default function AdminUsersPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterRole, setFilterRole] = useState<'all' | 'buyer' | 'seller' | 'admin'>('all');
  const [filterStatus, setFilterStatus] = useState<'all' | 'active' | 'suspended' | 'banned'>('all');

  // Mock users data
  const users = [
    { id: '1', name: 'John Doe', email: 'john@example.com', role: 'buyer', status: 'active', joinedAt: '2025-12-01', totalOrders: 15, totalSpent: 2450, avatar: '' },
    { id: '2', name: 'Jane Designer', email: 'jane@example.com', role: 'seller', status: 'active', joinedAt: '2025-11-15', totalGigs: 8, totalEarnings: 12500, rating: 4.9, avatar: '' },
    { id: '3', name: 'Mike Developer', email: 'mike@example.com', role: 'seller', status: 'active', joinedAt: '2025-10-20', totalGigs: 12, totalEarnings: 25000, rating: 4.8, avatar: '' },
    { id: '4', name: 'Sarah Marketing', email: 'sarah@example.com', role: 'buyer', status: 'suspended', joinedAt: '2026-01-10', totalOrders: 3, totalSpent: 450, avatar: '' },
    { id: '5', name: 'Tom Writer', email: 'tom@example.com', role: 'seller', status: 'banned', joinedAt: '2025-09-05', totalGigs: 5, totalEarnings: 1200, rating: 3.2, avatar: '' },
    { id: '6', name: 'Admin User', email: 'admin@example.com', role: 'admin', status: 'active', joinedAt: '2025-01-01', totalOrders: 0, totalSpent: 0, avatar: '' },
  ];

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         user.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesRole = filterRole === 'all' || user.role === filterRole;
    const matchesStatus = filterStatus === 'all' || user.status === filterStatus;
    return matchesSearch && matchesRole && matchesStatus;
  });

  const handleSuspend = async (userId: string) => {
    try {
      // Import admin service
      const { adminService } = await import('@/lib/api/services/admin.service');
      
      // Suspend user
      await adminService.suspendUser(userId, 'Suspended by admin');
      
      // In a real implementation, refresh user list
      console.log('User suspended');
    } catch (error) {
      console.error('Failed to suspend user:', error);
      // Error handling would show toast notification
    }
  };

  const handleBan = async (userId: string) => {
    if (confirm('Are you sure you want to ban this user?')) {
      try {
        // Import admin service
        const { adminService } = await import('@/lib/api/services/admin.service');
        
        // Ban user
        await adminService.banUser(userId, 'Banned by admin');
        
        // In a real implementation, refresh user list
        console.log('User banned');
      } catch (error) {
        console.error('Failed to ban user:', error);
        // Error handling would show toast notification
      }
    }
  };

  const handleReactivate = async (userId: string) => {
    try {
      // Import admin service
      const { adminService } = await import('@/lib/api/services/admin.service');
      
      // Reactivate user
      await adminService.reactivateUser(userId);
      
      // In a real implementation, refresh user list
      console.log('User reactivated');
    } catch (error) {
      console.error('Failed to reactivate user:', error);
      // Error handling would show toast notification
    }
  };

  return (
    <ProtectedRoute requiredRole="admin">
      <PageTransition>
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 py-8">
          <div className="max-w-7xl mx-auto px-6">
            {/* Header */}
            <div className="mb-8">
              <Link href="/admin" className="text-blue-600 hover:text-blue-700 mb-4 inline-block">
                ← Back to Admin Dashboard
              </Link>
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">User Management</h1>
                  <p className="text-gray-600 dark:text-gray-400">Manage platform users and accounts</p>
                </div>
                <Button>
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                  Add User
                </Button>
              </div>
            </div>

            {/* Stats Cards */}
            <div className="grid md:grid-cols-4 gap-6 mb-8">
              <div className="bg-white dark:bg-gray-800 rounded-3xl border border-gray-100 dark:border-gray-700 p-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-600 dark:text-gray-400">Total Users</span>
                  <svg className="w-8 h-8 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
                  </svg>
                </div>
                <div className="text-3xl font-bold text-gray-900 dark:text-white">12,845</div>
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-3xl border border-gray-100 dark:border-gray-700 p-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-600 dark:text-gray-400">Active Buyers</span>
                  <svg className="w-8 h-8 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M8 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM15 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
                    <path d="M3 4a1 1 0 00-1 1v10a1 1 0 001 1h1.05a2.5 2.5 0 014.9 0H10a1 1 0 001-1V5a1 1 0 00-1-1H3zM14 7a1 1 0 00-1 1v6.05A2.5 2.5 0 0115.95 16H17a1 1 0 001-1v-5a1 1 0 00-.293-.707l-2-2A1 1 0 0015 7h-1z" />
                  </svg>
                </div>
                <div className="text-3xl font-bold text-gray-900 dark:text-white">8,234</div>
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-3xl border border-gray-100 dark:border-gray-700 p-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-600 dark:text-gray-400">Active Sellers</span>
                  <svg className="w-8 h-8 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M6 6V5a3 3 0 013-3h2a3 3 0 013 3v1h2a2 2 0 012 2v3.57A22.952 22.952 0 0110 13a22.95 22.95 0 01-8-1.43V8a2 2 0 012-2h2zm2-1a1 1 0 011-1h2a1 1 0 011 1v1H8V5zm1 5a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1z" clipRule="evenodd" />
                    <path d="M2 13.692V16a2 2 0 002 2h12a2 2 0 002-2v-2.308A24.974 24.974 0 0110 15c-2.796 0-5.487-.46-8-1.308z" />
                  </svg>
                </div>
                <div className="text-3xl font-bold text-gray-900 dark:text-white">3,421</div>
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-3xl border border-gray-100 dark:border-gray-700 p-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-600 dark:text-gray-400">Suspended</span>
                  <svg className="w-8 h-8 text-red-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M13.477 14.89A6 6 0 015.11 6.524l8.367 8.368zm1.414-1.414L6.524 5.11a6 6 0 018.367 8.367zM18 10a8 8 0 11-16 0 8 8 0 0116 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="text-3xl font-bold text-gray-900 dark:text-white">187</div>
              </div>
            </div>

            {/* Filters */}
            <div className="bg-white dark:bg-gray-800 rounded-3xl border border-gray-100 dark:border-gray-700 p-6 mb-6">
              <div className="grid md:grid-cols-3 gap-4">
                <div>
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search by name or email..."
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <select
                    value={filterRole}
                    onChange={(e) => setFilterRole(e.target.value as any)}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="all">All Roles</option>
                    <option value="buyer">Buyers</option>
                    <option value="seller">Sellers</option>
                    <option value="admin">Admins</option>
                  </select>
                </div>

                <div>
                  <select
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value as any)}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="all">All Statuses</option>
                    <option value="active">Active</option>
                    <option value="suspended">Suspended</option>
                    <option value="banned">Banned</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Users Table */}
            <div className="bg-white dark:bg-gray-800 rounded-3xl border border-gray-100 dark:border-gray-700 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 dark:bg-gray-900/50 border-b border-gray-100 dark:border-gray-700">
                    <tr>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase">User</th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase">Role</th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase">Status</th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase">Stats</th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase">Joined</th>
                      <th className="px-6 py-4 text-right text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                    {filteredUsers.map((user) => (
                      <tr key={user.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50">
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-500" />
                            <div>
                              <p className="font-semibold text-gray-900 dark:text-white">{user.name}</p>
                              <p className="text-sm text-gray-600 dark:text-gray-400">{user.email}</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                            user.role === 'admin' ? 'bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300' :
                            user.role === 'seller' ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300' :
                            'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300'
                          }`}>
                            {user.role}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                            user.status === 'active' ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300' :
                            user.status === 'suspended' ? 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-300' :
                            'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300'
                          }`}>
                            {user.status}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm">
                            {user.role === 'seller' ? (
                              <>
                                <p className="text-gray-900 dark:text-white">{user.totalGigs} gigs</p>
                                <p className="text-gray-600 dark:text-gray-400">${user.totalEarnings?.toLocaleString()} earned</p>
                                {user.rating && (
                                  <p className="text-yellow-600">★ {user.rating}</p>
                                )}
                              </>
                            ) : user.role === 'buyer' ? (
                              <>
                                <p className="text-gray-900 dark:text-white">{user.totalOrders} orders</p>
                                <p className="text-gray-600 dark:text-gray-400">${user.totalSpent?.toLocaleString()} spent</p>
                              </>
                            ) : (
                              <p className="text-gray-600 dark:text-gray-400">-</p>
                            )}
                          </div>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-400">
                          {new Date(user.joinedAt).toLocaleDateString()}
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center justify-end gap-2">
                            <Link href={`/admin/users/${user.id}`}>
                              <Button size="sm" variant="outline">View</Button>
                            </Link>
                            
                            {user.status === 'active' && user.role !== 'admin' && (
                              <>
                                <Button size="sm" variant="outline" onClick={() => handleSuspend(user.id)}>
                                  Suspend
                                </Button>
                                <Button size="sm" variant="outline" className="text-red-600 border-red-200" onClick={() => handleBan(user.id)}>
                                  Ban
                                </Button>
                              </>
                            )}
                            
                            {(user.status === 'suspended' || user.status === 'banned') && (
                              <Button size="sm" onClick={() => handleReactivate(user.id)}>
                                Reactivate
                              </Button>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {filteredUsers.length === 0 && (
                <div className="text-center py-12">
                  <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                  </svg>
                  <p className="text-gray-600 dark:text-gray-400">No users found</p>
                </div>
              )}

              {/* Pagination */}
              {filteredUsers.length > 0 && (
                <div className="px-6 py-4 border-t border-gray-100 dark:border-gray-700 flex items-center justify-between">
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Showing {filteredUsers.length} of {users.length} users
                  </p>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" disabled>Previous</Button>
                    <Button variant="outline" size="sm" disabled>Next</Button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </PageTransition>
    </ProtectedRoute>
  );
}
