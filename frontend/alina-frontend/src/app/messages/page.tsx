'use client';

import React, { useState } from 'react';
import { ProtectedRoute } from '@/components/auth/ProtectedRoute';
import { PageTransition } from '@/components/ui/PageTransition';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { EmptyState } from '@/components/ui/EmptyState';
import { TypingIndicator, OnlineStatusBadge } from '@/components/realtime/TypingIndicator';
import { useChatMessages, useTypingIndicator, useUserPresence } from '@/hooks/useSignalR';

interface Message {
  id: string;
  senderId: string;
  senderName: string;
  senderAvatar?: string;
  text: string;
  timestamp: Date;
  isRead: boolean;
}

interface Conversation {
  id: string;
  userId: string;
  userName: string;
  userAvatar?: string;
  lastMessage: string;
  lastMessageTime: Date;
  unreadCount: number;
  isOnline: boolean;
}

export default function MessagesPage() {
  const [selectedConversation, setSelectedConversation] = useState<string | null>(null);
  const [messageText, setMessageText] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  // Real-time features
  const { sendMessage } = useChatMessages();
  const { typingUsers, setTyping, isTyping } = useTypingIndicator(selectedConversation || undefined);
  const { isUserOnline } = useUserPresence();

  // Mock data - Replace with actual API calls
  const conversations: Conversation[] = [
    {
      id: '1',
      userId: 'user1',
      userName: 'Sarah Johnson',
      userAvatar: undefined,
      lastMessage: 'Sure, I can help you with that project!',
      lastMessageTime: new Date(Date.now() - 1000 * 60 * 5),
      unreadCount: 2,
      isOnline: true,
    },
    {
      id: '2',
      userId: 'user2',
      userName: 'Mike Chen',
      userAvatar: undefined,
      lastMessage: 'When can you start the design work?',
      lastMessageTime: new Date(Date.now() - 1000 * 60 * 60),
      unreadCount: 0,
      isOnline: false,
    },
    {
      id: '3',
      userId: 'user3',
      userName: 'Emily Davis',
      userAvatar: undefined,
      lastMessage: 'Thank you for the quick turnaround!',
      lastMessageTime: new Date(Date.now() - 1000 * 60 * 60 * 24),
      unreadCount: 0,
      isOnline: true,
    },
  ];

  const messages: Message[] = selectedConversation
    ? [
        {
          id: '1',
          senderId: 'user1',
          senderName: 'Sarah Johnson',
          text: 'Hi! I saw your portfolio and I\'m interested in hiring you for a web design project.',
          timestamp: new Date(Date.now() - 1000 * 60 * 60),
          isRead: true,
        },
        {
          id: '2',
          senderId: 'me',
          senderName: 'You',
          text: 'Hello Sarah! Thank you for reaching out. I\'d be happy to discuss your project. What did you have in mind?',
          timestamp: new Date(Date.now() - 1000 * 60 * 50),
          isRead: true,
        },
        {
          id: '3',
          senderId: 'user1',
          senderName: 'Sarah Johnson',
          text: 'I need a modern e-commerce website with payment integration. Do you have experience with that?',
          timestamp: new Date(Date.now() - 1000 * 60 * 30),
          isRead: true,
        },
        {
          id: '4',
          senderId: 'me',
          senderName: 'You',
          text: 'Yes, I have extensive experience with e-commerce platforms. I can definitely help you with that!',
          timestamp: new Date(Date.now() - 1000 * 60 * 10),
          isRead: true,
        },
        {
          id: '5',
          senderId: 'user1',
          senderName: 'Sarah Johnson',
          text: 'Sure, I can help you with that project!',
          timestamp: new Date(Date.now() - 1000 * 60 * 5),
          isRead: false,
        },
      ]
    : [];

  const filteredConversations = conversations.filter((conv) =>
    conv.userName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const formatTime = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (minutes < 1) return 'Just now';
    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    if (days < 7) return `${days}d ago`;
    return date.toLocaleDateString();
  };

  const handleSendMessage = async () => {
    if (!messageText.trim() || !selectedConversation) return;

    try {
      // Send message via real-time service
      await sendMessage(selectedConversation, messageText);
      
      // Clear input and stop typing indicator
      setMessageText('');
      setTyping(false);
    } catch (error) {
      console.error('Failed to send message:', error);
      // Error handling would show toast notification
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMessageText(e.target.value);
    
    // Send typing indicator when user starts typing
    if (e.target.value && !isTyping) {
      setTyping(true);
    }
  };

  const handleInputBlur = () => {
    // Stop typing indicator when input loses focus
    setTyping(false);
  };

  return (
    <ProtectedRoute>
      <PageTransition>
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8">
          <div className="max-w-7xl mx-auto px-6">
            {/* Header */}
            <div className="mb-8">
              <h1 className="text-4xl font-bold text-gray-900 mb-2">Messages</h1>
              <p className="text-gray-600">Communicate with buyers and sellers</p>
            </div>

            {/* Messages Container */}
            <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100">
              <div className="grid grid-cols-1 lg:grid-cols-3 h-[calc(100vh-280px)]">
                {/* Conversations List */}
                <div className="lg:col-span-1 border-r border-gray-100 flex flex-col">
                  {/* Search */}
                  <div className="p-4 border-b border-gray-100">
                    <Input
                      placeholder="Search conversations..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      icon={
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                      }
                    />
                  </div>

                  {/* Conversation List */}
                  <div className="flex-1 overflow-y-auto">
                    {filteredConversations.length === 0 ? (
                      <div className="p-8">
                        <EmptyState
                          title="No conversations"
                          description="Start a conversation by contacting a seller"
                        />
                      </div>
                    ) : (
                      filteredConversations.map((conv) => (
                        <button
                          key={conv.id}
                          onClick={() => setSelectedConversation(conv.id)}
                          className={`
                            w-full p-4 flex items-center gap-3 hover:bg-gray-50 transition-colors border-b border-gray-50
                            ${selectedConversation === conv.id ? 'bg-blue-50' : ''}
                          `}
                        >
                          {/* Avatar with real-time online status */}
                          <div className="relative flex-shrink-0">
                            <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-full flex items-center justify-center text-white font-semibold">
                              {conv.userName.charAt(0)}
                            </div>
                            <div className="absolute bottom-0 right-0">
                              <OnlineStatusBadge isOnline={isUserOnline(conv.userId)} />
                            </div>
                          </div>

                          {/* Content */}
                          <div className="flex-1 text-left min-w-0">
                            <div className="flex items-center justify-between mb-1">
                              <h3 className="font-semibold text-gray-900 truncate">{conv.userName}</h3>
                              <span className="text-xs text-gray-500 ml-2">{formatTime(conv.lastMessageTime)}</span>
                            </div>
                            <p className="text-sm text-gray-600 truncate">{conv.lastMessage}</p>
                          </div>

                          {/* Unread Badge */}
                          {conv.unreadCount > 0 && (
                            <div className="flex-shrink-0 w-5 h-5 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full flex items-center justify-center text-white text-xs font-bold">
                              {conv.unreadCount}
                            </div>
                          )}
                        </button>
                      ))
                    )}
                  </div>
                </div>

                {/* Chat Area */}
                <div className="lg:col-span-2 flex flex-col">
                  {selectedConversation ? (
                    <>
                      {/* Chat Header */}
                      <div className="p-4 border-b border-gray-100 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="relative flex-shrink-0">
                            <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-full flex items-center justify-center text-white font-semibold">
                              {conversations.find((c) => c.id === selectedConversation)?.userName.charAt(0)}
                            </div>
                            <div className="absolute bottom-0 right-0">
                              <OnlineStatusBadge 
                                isOnline={isUserOnline(conversations.find((c) => c.id === selectedConversation)?.userId || '')} 
                              />
                            </div>
                          </div>
                          <div>
                            <h2 className="font-bold text-gray-900">
                              {conversations.find((c) => c.id === selectedConversation)?.userName}
                            </h2>
                            <p className="text-sm text-gray-500">
                              {isUserOnline(conversations.find((c) => c.id === selectedConversation)?.userId || '')
                                ? 'Active now'
                                : 'Offline'}
                            </p>
                          </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex items-center gap-2">
                          <button className="p-2 hover:bg-gray-100 rounded-xl transition-colors">
                            <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                            </svg>
                          </button>
                          <button className="p-2 hover:bg-gray-100 rounded-xl transition-colors">
                            <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                            </svg>
                          </button>
                        </div>
                      </div>

                      {/* Messages */}
                      <div className="flex-1 overflow-y-auto p-6 space-y-4">
                        {messages.map((message) => (
                          <div
                            key={message.id}
                            className={`flex ${message.senderId === 'me' ? 'justify-end' : 'justify-start'}`}
                          >
                            <div className={`max-w-md ${message.senderId === 'me' ? 'order-2' : 'order-1'}`}>
                              <div
                                className={`
                                  px-4 py-3 rounded-2xl
                                  ${
                                    message.senderId === 'me'
                                      ? 'bg-gray-900 text-white rounded-br-sm'
                                      : 'bg-gray-100 text-gray-900 rounded-bl-sm'
                                  }
                                `}
                              >
                                <p className="text-sm">{message.text}</p>
                              </div>
                              <div className={`mt-1 flex items-center gap-2 text-xs text-gray-500 ${message.senderId === 'me' ? 'justify-end' : 'justify-start'}`}>
                                <span>{formatTime(message.timestamp)}</span>
                                {message.senderId === 'me' && (
                                  <svg className="w-4 h-4 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                  </svg>
                                )}
                              </div>
                            </div>
                          </div>
                        ))}

                        {/* Typing Indicator */}
                        {typingUsers.length > 0 && (
                          <div className="flex justify-start">
                            <TypingIndicator 
                              userName={conversations.find((c) => c.id === selectedConversation)?.userName}
                            />
                          </div>
                        )}
                      </div>

                      {/* Message Input */}
                      <div className="p-4 border-t border-gray-100">
                        <div className="flex items-center gap-3">
                          <button className="p-2 hover:bg-gray-100 rounded-xl transition-colors">
                            <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
                            </svg>
                          </button>

                          <Input
                            placeholder="Type a message..."
                            value={messageText}
                            onChange={handleInputChange}
                            onBlur={handleInputBlur}
                            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                            className="flex-1"
                          />

                          <Button onClick={handleSendMessage} disabled={!messageText.trim()}>
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                            </svg>
                          </Button>
                        </div>
                      </div>
                    </>
                  ) : (
                    <div className="flex-1 flex items-center justify-center">
                      <EmptyState
                        icon={
                          <svg className="w-16 h-16 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                          </svg>
                        }
                        title="Select a conversation"
                        description="Choose a conversation from the list to start messaging"
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </PageTransition>
    </ProtectedRoute>
  );
}
