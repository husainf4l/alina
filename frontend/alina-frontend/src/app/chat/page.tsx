'use client';

import { useState, useRef, useEffect } from 'react';
import { ProtectedRoute } from '@/components/auth/ProtectedRoute';
import { PageTransition } from '@/components/ui/PageTransition';
import { Button } from '@/components/ui/Button';

export default function ChatPage() {
  const [selectedConversation, setSelectedConversation] = useState<string | null>('1');
  const [message, setMessage] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Mock data
  const conversations = [
    { id: '1', participants: [{ userId: '2', userName: 'Jane Designer', userAvatar: '', isOnline: true }], lastMessage: { message: 'Thanks! I will start working on it.', createdAt: '2026-03-03T14:30:00Z' }, unreadCount: 2 },
    { id: '2', participants: [{ userId: '3', userName: 'John Dev', userAvatar: '', isOnline: false, lastSeen: '2026-03-03T12:00:00Z' }], lastMessage: { message: 'Can we discuss the requirements?', createdAt: '2026-03-03T10:15:00Z' }, unreadCount: 0 },
    { id: '3', participants: [{ userId: '4', userName: 'Mike SEO', userAvatar: '', isOnline: true }], lastMessage: { message: 'Perfect! Let me know if you need anything.', createdAt: '2026-03-02T16:45:00Z' }, unreadCount: 0 },
  ];

  const messages = selectedConversation === '1' ? [
    { id: '1', senderId: '1', senderName: 'You', message: 'Hi! I need a logo for my startup.', createdAt: '2026-03-03T14:00:00Z', isRead: true },
    { id: '2', senderId: '2', senderName: 'Jane Designer', message: 'Hello! I would love to help. What is your budget and timeline?', createdAt: '2026-03-03T14:10:00Z', isRead: true },
    { id: '3', senderId: '1', senderName: 'You', message: 'Budget is $200 and I need it within 5 days.', createdAt: '2026-03-03T14:20:00Z', isRead: true },
    { id: '4', senderId: '2', senderName: 'Jane Designer', message: 'Thanks! I will start working on it.', createdAt: '2026-03-03T14:30:00Z', isRead: false },
  ] : [];

  const currentConversation = conversations.find(c => c.id === selectedConversation);
  const otherUser = currentConversation?.participants[0];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = () => {
    if (!message.trim()) return;
    console.log('Send message:', message);
    setMessage('');
  };

  return (
    <ProtectedRoute>
      <PageTransition>
        <div className="h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 flex">
          {/* Conversations List */}
          <div className="w-80 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 flex flex-col">
            <div className="p-6 border-b border-gray-200 dark:border-gray-700">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Messages</h2>
            </div>
            <div className="flex-1 overflow-y-auto">
              {conversations.map((conv) => {
                const user = conv.participants[0];
                return (
                  <button
                    key={conv.id}
                    onClick={() => setSelectedConversation(conv.id)}
                    className={`w-full p-4 flex items-center gap-3 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors border-b border-gray-100 dark:border-gray-700 ${
                      selectedConversation === conv.id ? 'bg-blue-50 dark:bg-blue-900/20' : ''
                    }`}
                  >
                    <div className="relative">
                      <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full flex items-center justify-center text-white font-bold">
                        {user.userName.charAt(0)}
                      </div>
                      {user.isOnline && (
                        <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white dark:border-gray-800" />
                      )}
                    </div>
                    <div className="flex-1 text-left min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-semibold text-gray-900 dark:text-white truncate">{user.userName}</span>
                        {conv.unreadCount > 0 && (
                          <span className="w-5 h-5 bg-blue-500 text-white text-xs rounded-full flex items-center justify-center flex-shrink-0">
                            {conv.unreadCount}
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-400 truncate">{conv.lastMessage?.message}</p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Chat Area */}
          <div className="flex-1 flex flex-col">
            {selectedConversation && otherUser ? (
              <>
                {/* Chat Header */}
                <div className="p-6 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full flex items-center justify-center text-white font-bold">
                        {otherUser.userName.charAt(0)}
                      </div>
                      {otherUser.isOnline && (
                        <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white dark:border-gray-800" />
                      )}
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900 dark:text-white">{otherUser.userName}</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {otherUser.isOnline ? 'Online' : `Last seen ${'lastSeen' in otherUser && otherUser.lastSeen ? new Date(otherUser.lastSeen).toLocaleString() : 'recently'}`}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Messages */}
                <div className="flex-1 overflow-y-auto p-6 space-y-4">
                  {messages.map((msg) => (
                    <div key={msg.id} className={`flex ${msg.senderId === '1' ? 'justify-end' : 'justify-start'}`}>
                      <div className={`max-w-md ${msg.senderId === '1' ? 'bg-blue-500 text-white' : 'bg-white dark:bg-gray-700 text-gray-900 dark:text-white'} rounded-3xl px-5 py-3`}>
                        <p>{msg.message}</p>
                        <span className={`text-xs ${msg.senderId === '1' ? 'text-blue-100' : 'text-gray-500 dark:text-gray-400'} mt-1 block`}>
                          {new Date(msg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </span>
                      </div>
                    </div>
                  ))}
                  <div ref={messagesEndRef} />
                </div>

                {/* Message Input */}
                <div className="p-6 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
                  <div className="flex gap-3">
                    <input
                      type="text"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                      placeholder="Type a message..."
                      className="flex-1 px-6 py-4 bg-gray-100 dark:bg-gray-700 rounded-3xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 dark:text-white"
                    />
                    <Button onClick={handleSend} disabled={!message.trim()}>
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                      </svg>
                    </Button>
                  </div>
                </div>
              </>
            ) : (
              <div className="flex-1 flex items-center justify-center text-gray-500 dark:text-gray-400">
                Select a conversation to start messaging
              </div>
            )}
          </div>
        </div>
      </PageTransition>
    </ProtectedRoute>
  );
}
