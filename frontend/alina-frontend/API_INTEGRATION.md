# API Integration Documentation

This frontend is now fully integrated with your C# backend. All backend endpoints are available as TypeScript services and React hooks.

## 🚀 Quick Start

### 1. Environment Setup

Update your `.env.local` file with your backend API URL:

```env
NEXT_PUBLIC_API_URL=http://localhost:5000
NEXT_PUBLIC_API_TIMEOUT=30000
```

### 2. Authentication Example

```typescript
'use client';

import { useLogin, useCurrentUser } from '@/hooks';
import { useState } from 'react';

export function LoginExample() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  const login = useLogin();
  const { data: currentUser } = useCurrentUser();

  const handleLogin = async () => {
    try {
      await login.mutateAsync({ email, password });
      // User is now logged in, tokens are stored
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  return (
    <div>
      {currentUser ? (
        <p>Welcome, {currentUser.username}!</p>
      ) : (
        <form onSubmit={(e) => { e.preventDefault(); handleLogin(); }}>
          <input 
            type="email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            placeholder="Email"
          />
          <input 
            type="password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            placeholder="Password"
          />
          <button type="submit" disabled={login.isPending}>
            {login.isPending ? 'Logging in...' : 'Login'}
          </button>
        </form>
      )}
    </div>
  );
}
```

### 3. Marketplace Example

```typescript
'use client';

import { useSearchGigs, useCategories } from '@/hooks';

export function MarketplaceExample() {
  const { data: categories } = useCategories();
  const { data: gigsResponse } = useSearchGigs({
    query: 'design',
    page: 1,
    pageSize: 10,
  });

  return (
    <div>
      <h2>Categories</h2>
      {categories?.map((category) => (
        <div key={category.id}>{category.name}</div>
      ))}

      <h2>Gigs</h2>
      {gigsResponse?.items.map((gig) => (
        <div key={gig.id}>
          <h3>{gig.title}</h3>
          <p>{gig.description}</p>
          <p>Rating: {gig.averageRating} ({gig.totalReviews} reviews)</p>
        </div>
      ))}
    </div>
  );
}
```

### 4. Orders Example

```typescript
'use client';

import { useSellerOrders, useStartOrder } from '@/hooks';

export function OrdersExample() {
  const { data: ordersResponse } = useSellerOrders();
  const startOrder = useStartOrder();

  const handleStartOrder = async (orderId: string) => {
    try {
      await startOrder.mutateAsync(orderId);
      alert('Order started!');
    } catch (error) {
      console.error('Failed to start order:', error);
    }
  };

  return (
    <div>
      <h2>My Orders</h2>
      {ordersResponse?.items.map((order) => (
        <div key={order.id}>
          <h3>{order.gigTitle}</h3>
          <p>Status: {order.status}</p>
          <p>Price: ${order.price}</p>
          {order.status === 'RequirementsSubmitted' && (
            <button onClick={() => handleStartOrder(order.id)}>
              Start Order
            </button>
          )}
        </div>
      ))}
    </div>
  );
}
```

### 5. Messaging Example

```typescript
'use client';

import { useConversations, useSendMessage } from '@/hooks';
import { useState } from 'react';

export function MessagingExample() {
  const { data: conversations } = useConversations();
  const sendMessage = useSendMessage();
  const [message, setMessage] = useState('');

  const handleSendMessage = async (conversationId: string) => {
    try {
      await sendMessage.mutateAsync({
        conversationId,
        content: message,
      });
      setMessage('');
    } catch (error) {
      console.error('Failed to send message:', error);
    }
  };

  return (
    <div>
      <h2>Conversations</h2>
      {conversations?.map((conversation) => (
        <div key={conversation.id}>
          <p>Unread: {conversation.unreadCount}</p>
          <input
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type a message..."
          />
          <button onClick={() => handleSendMessage(conversation.id)}>
            Send
          </button>
        </div>
      ))}
    </div>
  );
}
```

## 📁 Project Structure

```
src/
├── lib/
│   ├── api/
│   │   ├── client.ts                 # Axios client with interceptors
│   │   ├── types/                    # TypeScript types
│   │   │   ├── auth.ts
│   │   │   ├── user.ts
│   │   │   ├── profile.ts
│   │   │   ├── marketplace.ts
│   │   │   ├── order.ts
│   │   │   ├── messaging.ts
│   │   │   ├── notification.ts
│   │   │   ├── finance.ts
│   │   │   ├── dispute.ts
│   │   │   ├── support.ts
│   │   │   ├── analytics.ts
│   │   │   ├── media.ts
│   │   │   └── common.ts
│   │   └── services/                 # API service modules
│   │       ├── auth.service.ts
│   │       ├── user.service.ts
│   │       ├── profile.service.ts
│   │       ├── marketplace.service.ts
│   │       ├── order.service.ts
│   │       ├── messaging.service.ts
│   │       ├── notification.service.ts
│   │       ├── finance.service.ts
│   │       ├── dispute.service.ts
│   │       ├── support.service.ts
│   │       ├── analytics.service.ts
│   │       └── media.service.ts
│   └── providers/
│       └── query-provider.tsx        # React Query provider
├── hooks/                            # React Query hooks
│   ├── useAuth.ts
│   ├── useUser.ts
│   ├── useProfile.ts
│   ├── useMarketplace.ts
│   ├── useOrders.ts
│   ├── useMessaging.ts
│   ├── useNotifications.ts
│   ├── useFinance.ts
│   └── useAnalytics.ts
└── app/
    └── layout.tsx                    # Root layout with QueryProvider
```

## 🔧 Available Services

### Authentication (`authService`)
- `login(data)` - Login with email/password
- `register(data)` - Register new user
- `googleAuth(data)` - Google OAuth login
- `logout()` - Logout user
- `changePassword(data)` - Change password
- `requestPasswordReset(data)` - Request password reset
- `confirmPasswordReset(data)` - Confirm password reset
- `verifyEmail(token)` - Verify email
- `resendVerificationEmail()` - Resend verification email

### User (`userService`)
- `getCurrentUser()` - Get current user
- `getUser(userId)` - Get user by ID
- `updateCurrentUser(data)` - Update current user
- `deleteAccount()` - Delete account

### Profile (`profileService`)
- `getMyProfile()` - Get own profile
- `getProfile(userId)` - Get profile by user ID
- `updateProfile(data)` - Update profile
- `uploadAvatar(file)` - Upload avatar
- `uploadCoverImage(file)` - Upload cover image
- `deleteAvatar()` - Delete avatar
- `deleteCoverImage()` - Delete cover image

### Marketplace (`marketplaceService`)
- `searchGigs(params)` - Search gigs
- `getGig(gigId)` - Get gig details
- `getMyGigs()` - Get seller's gigs
- `createGig(data)` - Create new gig
- `updateGig(gigId, data)` - Update gig
- `deleteGig(gigId)` - Delete gig
- `toggleGigStatus(gigId)` - Toggle gig active status
- `getCategories()` - Get all categories
- `getCategory(categoryId)` - Get category details
- `getGigReviews(gigId)` - Get gig reviews
- `createReview(gigId, data)` - Create review
- `replyToReview(reviewId, reply)` - Reply to review
- `getFavorites()` - Get user favorites
- `addToFavorites(gigId)` - Add to favorites
- `removeFromFavorites(gigId)` - Remove from favorites
- `getCustomOffers()` - Get custom offers
- `acceptCustomOffer(offerId)` - Accept custom offer
- `getTasks()` - Get user tasks
- `createTask(data)` - Create task
- `updateTaskStatus(taskId, status)` - Update task status

### Orders (`orderService`)
- `getMyOrders(params)` - Get all orders
- `getBuyerOrders(params)` - Get buyer orders
- `getSellerOrders(params)` - Get seller orders
- `getOrder(orderId)` - Get order details
- `createOrder(data)` - Create new order
- `submitRequirements(orderId, data)` - Submit order requirements
- `startOrder(orderId)` - Start order (seller)
- `deliverOrder(orderId, data)` - Deliver order
- `requestRevision(orderId, data)` - Request revision
- `acceptDelivery(orderId)` - Accept delivery
- `cancelOrder(orderId, reason)` - Cancel order
- `getOrderRevisions(orderId)` - Get order revisions

### Messaging (`messagingService`)
- `getConversations()` - Get all conversations
- `getConversation(conversationId)` - Get conversation details
- `createConversation(data)` - Create new conversation
- `getMessages(conversationId, params)` - Get messages
- `sendMessage(data)` - Send message
- `editMessage(messageId, content)` - Edit message
- `deleteMessage(messageId)` - Delete message
- `markAsRead(conversationId)` - Mark conversation as read

### Notifications (`notificationService`)
- `getNotifications(params)` - Get notifications
- `getUnreadCount()` - Get unread notification count
- `markAsRead(data)` - Mark notifications as read
- `markAllAsRead()` - Mark all as read
- `deleteNotification(notificationId)` - Delete notification
- `getNotificationSettings()` - Get notification settings
- `updateNotificationSettings(data)` - Update notification settings

### Finance (`financeService`)
- `getWallet()` - Get wallet details
- `getTransactions(params)` - Get transactions
- `getTransaction(transactionId)` - Get transaction details
- `getWithdrawalRequests(params)` - Get withdrawal requests
- `createWithdrawalRequest(data)` - Create withdrawal request
- `cancelWithdrawalRequest(requestId)` - Cancel withdrawal request
- `getCurrencyRates()` - Get currency rates
- `convertCurrency(amount, from, to)` - Convert currency

### Dispute (`disputeService`)
- `getMyDisputes()` - Get user disputes
- `getDispute(disputeId)` - Get dispute details
- `createDispute(data)` - Create new dispute
- `addDisputeMessage(disputeId, message)` - Add message to dispute

### Support (`supportService`)
- `getMyTickets(params)` - Get support tickets
- `getTicket(ticketId)` - Get ticket details
- `createTicket(data)` - Create support ticket
- `addResponse(ticketId, data)` - Add response to ticket
- `closeTicket(ticketId)` - Close ticket

### Analytics (`analyticsService`)
- `getSellerAnalytics(params)` - Get seller analytics
- `getPlatformMetrics(params)` - Get platform metrics (admin)
- `exportSellerAnalytics(params)` - Export analytics data

### Media (`mediaService`)
- `getMyMedia()` - Get user media files
- `getMedia(mediaId)` - Get media details
- `uploadMedia(file, metadata)` - Upload media file
- `uploadMultipleMedia(files, metadata)` - Upload multiple files
- `deleteMedia(mediaId)` - Delete media file

## 🎣 Available Hooks

All services have corresponding React Query hooks. Use hooks in components for automatic caching, refetching, and state management:

### Query Hooks (for fetching data)
- `useCurrentUser()`
- `useMyProfile()`
- `useSearchGigs(params)`
- `useGig(gigId)`
- `useCategories()`
- `useSellerOrders(params)`
- `useConversations()`
- `useNotifications(params)`
- `useWallet()`
- `useSellerAnalytics(params)`
- And many more...

### Mutation Hooks (for modifying data)
- `useLogin()`
- `useRegister()`
- `useCreateGig()`
- `useUpdateProfile()`
- `useCreateOrder()`
- `useSendMessage()`
- `useCreateWithdrawalRequest()`
- And many more...

## 🔐 Authentication

The API client automatically:
- Adds JWT tokens to requests
- Handles token refresh on 401 errors
- Stores tokens in localStorage
- Redirects to /login on auth failure

## 🎨 Best Practices

1. **Use hooks in components** - They handle loading states, errors, and caching automatically
2. **Don't call services directly** - Use hooks for better UX and automatic refetching
3. **Handle errors** - All mutations return error states
4. **Use optimistic updates** - For better UX, update UI before backend confirms
5. **Leverage React Query features** - Use `isLoading`, `isError`, `refetch`, etc.

## 🔄 Real-time Updates

Some hooks have automatic refetching:
- `useConversations()` - Refetches every 10 seconds
- `useMessages()` - Refetches every 5 seconds
- `useNotifications()` - Refetches every 30 seconds
- `useUnreadNotificationCount()` - Refetches every 10 seconds

For true real-time, consider integrating SignalR with the ChatHub and NotificationHub from your backend.

## 📝 TypeScript Support

Full TypeScript support with:
- Type-safe API calls
- IntelliSense for all endpoints
- Compile-time error checking
- Auto-completion for request/response types

## 🐛 Debugging

React Query DevTools are included in development mode. Press the React Query icon in bottom corner to inspect queries and mutations.

## 🚀 Next Steps

1. **Update API URL** in `.env.local` to point to your backend
2. **Implement authentication flow** using login/register hooks
3. **Build your UI components** using the provided hooks
4. **Add error handling** and loading states
5. **Implement real-time features** with SignalR (optional)

## 📚 Additional Resources

- [React Query Documentation](https://tanstack.com/query/latest)
- [Axios Documentation](https://axios-http.com/)
- [Next.js Documentation](https://nextjs.org/docs)
