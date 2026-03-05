'use client';

import { useState } from 'react';
import { ProtectedRoute } from '@/components/auth/ProtectedRoute';
import { PageTransition } from '@/components/ui/PageTransition';
import { Button } from '@/components/ui/Button';
import Link from 'next/link';

export default function AdminSupportPage() {
  const [activeFilter, setActiveFilter] = useState<'all' | 'open' | 'in-progress' | 'resolved'>('all');
  const [selectedTicket, setSelectedTicket] = useState<string | null>(null);

  // Mock support tickets data
  const tickets = [
    {
      id: '1',
      subject: 'Payment not received',
      user: { id: '1', name: 'John Doe', email: 'john@example.com' },
      category: 'Payment',
      priority: 'high',
      status: 'open',
      createdAt: '2026-03-03T10:00:00Z',
      lastUpdate: '2026-03-03T10:00:00Z',
      assignedTo: null,
      messages: [
        { id: '1', from: 'John Doe', message: 'I completed an order 5 days ago but haven\'t received the payment yet.', timestamp: '2026-03-03T10:00:00Z' },
      ],
    },
    {
      id: '2',
      subject: 'Account verification issue',
      user: { id: '2', name: 'Jane Designer', email: 'jane@example.com' },
      category: 'Account',
      priority: 'medium',
      status: 'in-progress',
      createdAt: '2026-03-02T14:00:00Z',
      lastUpdate: '2026-03-03T09:00:00Z',
      assignedTo: 'Support Agent #1',
      messages: [
        { id: '1', from: 'Jane Designer', message: 'I can\'t verify my account. The verification email never arrives.', timestamp: '2026-03-02T14:00:00Z' },
        { id: '2', from: 'Support Agent #1', message: 'Hi Jane, I\'ve resent the verification email. Please check your spam folder.', timestamp: '2026-03-03T09:00:00Z' },
      ],
    },
    {
      id: '3',
      subject: 'How to upload portfolio items?',
      user: { id: '3', name: 'Mike Developer', email: 'mike@example.com' },
      category: 'General',
      priority: 'low',
      status: 'resolved',
      createdAt: '2026-03-01T11:00:00Z',
      lastUpdate: '2026-03-01T15:00:00Z',
      assignedTo: 'Support Agent #2',
      messages: [
        { id: '1', from: 'Mike Developer', message: 'I can\'t find where to upload my portfolio items.', timestamp: '2026-03-01T11:00:00Z' },
        { id: '2', from: 'Support Agent #2', message: 'Go to Settings > Profile > Portfolio section. Let me know if you need more help!', timestamp: '2026-03-01T15:00:00Z' },
        { id: '3', from: 'Mike Developer', message: 'Found it! Thanks!', timestamp: '2026-03-01T15:30:00Z' },
      ],
    },
    {
      id: '4',
      subject: 'Dispute resolution request',
      user: { id: '4', name: 'Sarah Marketing', email: 'sarah@example.com' },
      category: 'Dispute',
      priority: 'high',
      status: 'in-progress',
      createdAt: '2026-02-28T09:00:00Z',
      lastUpdate: '2026-03-02T16:00:00Z',
      assignedTo: 'Support Agent #1',
      messages: [
        { id: '1', from: 'Sarah Marketing', message: 'I need help with dispute #789. The seller is not responding.', timestamp: '2026-02-28T09:00:00Z' },
        { id: '2', from: 'Support Agent #1', message: 'I\'m looking into your dispute. I\'ll contact the seller directly.', timestamp: '2026-03-02T16:00:00Z' },
      ],
    },
    {
      id: '5',
      subject: 'Feature request: Dark mode',
      user: { id: '5', name: 'Tom Writer', email: 'tom@example.com' },
      category: 'Feature Request',
      priority: 'low',
      status: 'open',
      createdAt: '2026-02-25T14:00:00Z',
      lastUpdate: '2026-02-25T14:00:00Z',
      assignedTo: null,
      messages: [
        { id: '1', from: 'Tom Writer', message: 'It would be great to have a dark mode option for the platform.', timestamp: '2026-02-25T14:00:00Z' },
      ],
    },
  ];

  const filteredTickets = activeFilter === 'all' 
    ? tickets 
    : tickets.filter(ticket => ticket.status === activeFilter);

  const currentTicket = selectedTicket ? tickets.find(t => t.id === selectedTicket) : null;

  const handleAssign = async (ticketId: string) => {
    try {
      // Import admin service
      const { adminService } = await import('@/lib/api/services/admin.service');
      
      // Assign to current admin (would get from auth context)
      await adminService.assignSupportTicket(ticketId, 'current-admin-id');
      
      // In a real implementation, refresh ticket list
      console.log('Ticket assigned');
    } catch (error) {
      console.error('Failed to assign ticket:', error);
      // Error handling would show toast notification
    }
  };

  const handleResolve = async (ticketId: string) => {
    try {
      // Import admin service
      const { adminService } = await import('@/lib/api/services/admin.service');
      
      // Close/resolve ticket
      await adminService.closeSupportTicket(ticketId);
      
      // In a real implementation, refresh ticket list
      console.log('Ticket resolved');
    } catch (error) {
      console.error('Failed to resolve ticket:', error);
      // Error handling would show toast notification
    }
  };

  const handleReopen = async (ticketId: string) => {
    try {
      // Import support service
      const { supportService } = await import('@/lib/api/services/support.service');
      
      // Reopen ticket
      await supportService.reopenTicket(ticketId);
      
      // In a real implementation, refresh ticket list
      console.log('Ticket reopened');
    } catch (error) {
      console.error('Failed to reopen ticket:', error);
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
                  <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">Support Tickets</h1>
                  <p className="text-gray-600 dark:text-gray-400">Manage customer support requests</p>
                </div>
                <div className="flex items-center gap-3">
                  <span className="px-4 py-2 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 rounded-xl font-semibold">
                    {tickets.filter(t => t.status === 'open').length} Open
                  </span>
                </div>
              </div>
            </div>

            {/* Stats Cards */}
            <div className="grid md:grid-cols-4 gap-6 mb-8">
              <div className="bg-white dark:bg-gray-800 rounded-3xl border border-gray-100 dark:border-gray-700 p-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-600 dark:text-gray-400">Total Tickets</span>
                  <svg className="w-8 h-8 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2 5a2 2 0 012-2h7a2 2 0 012 2v4a2 2 0 01-2 2H9l-3 3v-3H4a2 2 0 01-2-2V5z" />
                    <path d="M15 7v2a4 4 0 01-4 4H9.828l-1.766 1.767c.28.149.599.233.938.233h2l3 3v-3h2a2 2 0 002-2V9a2 2 0 00-2-2h-1z" />
                  </svg>
                </div>
                <div className="text-3xl font-bold text-gray-900 dark:text-white">{tickets.length}</div>
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-3xl border border-gray-100 dark:border-gray-700 p-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-600 dark:text-gray-400">Open</span>
                  <svg className="w-8 h-8 text-red-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="text-3xl font-bold text-gray-900 dark:text-white">
                  {tickets.filter(t => t.status === 'open').length}
                </div>
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-3xl border border-gray-100 dark:border-gray-700 p-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-600 dark:text-gray-400">In Progress</span>
                  <svg className="w-8 h-8 text-yellow-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="text-3xl font-bold text-gray-900 dark:text-white">
                  {tickets.filter(t => t.status === 'in-progress').length}
                </div>
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-3xl border border-gray-100 dark:border-gray-700 p-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-600 dark:text-gray-400">Resolved Today</span>
                  <svg className="w-8 h-8 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="text-3xl font-bold text-gray-900 dark:text-white">
                  {tickets.filter(t => t.status === 'resolved').length}
                </div>
              </div>
            </div>

            {/* Filters */}
            <div className="bg-white dark:bg-gray-800 rounded-3xl border border-gray-100 dark:border-gray-700 p-6 mb-6">
              <div className="flex gap-2">
                {(['all', 'open', 'in-progress', 'resolved'] as const).map((filter) => (
                  <button
                    key={filter}
                    onClick={() => setActiveFilter(filter)}
                    className={`px-4 py-2 rounded-xl font-medium capitalize transition-all ${
                      activeFilter === filter
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                    }`}
                  >
                    {filter.replace('-', ' ')}
                  </button>
                ))}
              </div>
            </div>

            {/* Tickets Layout */}
            <div className="grid lg:grid-cols-3 gap-6">
              {/* Tickets List */}
              <div className="lg:col-span-1 space-y-3">
                {filteredTickets.map((ticket) => (
                  <div
                    key={ticket.id}
                    onClick={() => setSelectedTicket(ticket.id)}
                    className={`bg-white dark:bg-gray-800 rounded-2xl border-2 p-4 cursor-pointer transition-all ${
                      selectedTicket === ticket.id
                        ? 'border-blue-600'
                        : 'border-gray-100 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-700'
                    }`}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <span className="text-xs text-gray-500">#{ticket.id}</span>
                      <div className="flex gap-2">
                        <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${
                          ticket.priority === 'high' ? 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300' :
                          ticket.priority === 'medium' ? 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-300' :
                          'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
                        }`}>
                          {ticket.priority}
                        </span>
                        <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${
                          ticket.status === 'open' ? 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300' :
                          ticket.status === 'in-progress' ? 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-300' :
                          'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300'
                        }`}>
                          {ticket.status.replace('-', ' ')}
                        </span>
                      </div>
                    </div>
                    
                    <h3 className="font-bold text-gray-900 dark:text-white mb-2 line-clamp-1">{ticket.subject}</h3>
                    
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-6 h-6 rounded-full bg-gradient-to-br from-blue-500 to-purple-500" />
                      <span className="text-sm text-gray-600 dark:text-gray-400">{ticket.user.name}</span>
                    </div>

                    <div className="flex items-center justify-between text-xs text-gray-500">
                      <span>{ticket.category}</span>
                      <span>{new Date(ticket.createdAt).toLocaleDateString()}</span>
                    </div>
                  </div>
                ))}

                {filteredTickets.length === 0 && (
                  <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 p-8 text-center">
                    <svg className="w-12 h-12 text-gray-400 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <p className="text-gray-600 dark:text-gray-400">No tickets found</p>
                  </div>
                )}
              </div>

              {/* Ticket Detail */}
              <div className="lg:col-span-2">
                {currentTicket ? (
                  <div className="bg-white dark:bg-gray-800 rounded-3xl border border-gray-100 dark:border-gray-700 p-6">
                    {/* Header */}
                    <div className="mb-6 pb-6 border-b border-gray-200 dark:border-gray-700">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">{currentTicket.subject}</h2>
                          <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
                            <span>Category: {currentTicket.category}</span>
                            <span>•</span>
                            <span>Created {new Date(currentTicket.createdAt).toLocaleString()}</span>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-500" />
                        <div>
                          <p className="font-semibold text-gray-900 dark:text-white">{currentTicket.user.name}</p>
                          <p className="text-sm text-gray-600 dark:text-gray-400">{currentTicket.user.email}</p>
                        </div>
                      </div>

                      {currentTicket.assignedTo && (
                        <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-3">
                          <p className="text-sm text-blue-700 dark:text-blue-300">
                            Assigned to: <span className="font-semibold">{currentTicket.assignedTo}</span>
                          </p>
                        </div>
                      )}
                    </div>

                    {/* Messages */}
                    <div className="space-y-4 mb-6">
                      {currentTicket.messages.map((message) => (
                        <div
                          key={message.id}
                          className={`p-4 rounded-xl ${
                            message.from.includes('Agent')
                              ? 'bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800'
                              : 'bg-gray-50 dark:bg-gray-900/50 border border-gray-200 dark:border-gray-700'
                          }`}
                        >
                          <div className="flex items-center justify-between mb-2">
                            <span className="font-semibold text-gray-900 dark:text-white">{message.from}</span>
                            <span className="text-xs text-gray-500">{new Date(message.timestamp).toLocaleString()}</span>
                          </div>
                          <p className="text-gray-700 dark:text-gray-300">{message.message}</p>
                        </div>
                      ))}
                    </div>

                    {/* Reply Form */}
                    {currentTicket.status !== 'resolved' && (
                      <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
                        <textarea
                          rows={4}
                          placeholder="Type your response..."
                          className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 mb-4"
                        />
                        <div className="flex gap-3">
                          <Button>Send Reply</Button>
                          {currentTicket.status === 'open' && !currentTicket.assignedTo && (
                            <Button variant="outline" onClick={() => handleAssign(currentTicket.id)}>
                              Assign to Me
                            </Button>
                          )}
                          {currentTicket.status !== 'resolved' && (
                            <Button variant="outline" onClick={() => handleResolve(currentTicket.id)}>
                              Mark Resolved
                            </Button>
                          )}
                        </div>
                      </div>
                    )}

                    {/* Resolved State */}
                    {currentTicket.status === 'resolved' && (
                      <div className="bg-green-50 dark:bg-green-900/20 border-2 border-green-200 dark:border-green-800 rounded-xl p-6 text-center">
                        <svg className="w-12 h-12 text-green-600 mx-auto mb-3" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        <h3 className="text-lg font-bold text-green-900 dark:text-green-100 mb-2">Ticket Resolved</h3>
                        <p className="text-sm text-green-700 dark:text-green-300 mb-4">
                          This support ticket has been marked as resolved
                        </p>
                        <Button size="sm" variant="outline" onClick={() => handleReopen(currentTicket.id)}>
                          Reopen Ticket
                        </Button>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="bg-white dark:bg-gray-800 rounded-3xl border border-gray-100 dark:border-gray-700 p-12 text-center h-full flex items-center justify-center">
                    <div>
                      <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                      </svg>
                      <p className="text-gray-600 dark:text-gray-400">Select a ticket to view details</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </PageTransition>
    </ProtectedRoute>
  );
}
