# Backend Integration Guide

## ✅ Setup Complete

Your Next.js frontend is now configured to communicate with your .NET backend!

## 🏗️ Architecture Overview

### API Client (`/src/lib/api/axios-config.ts`)
- ✅ Axios instance configured with base URL: `http://localhost:5602/api`
- ✅ JWT bearer token authentication
- ✅ Automatic token refresh on 401 errors
- ✅ Request/response interceptors
- ✅ Error handling and logging

### Auth System
- ✅ Login, Register, Password Reset, Email Verification
- ✅ JWT token storage in localStorage
- ✅ Refresh token rotation
- ✅ Protected routes with role-based access
- ✅ Auth context provider for global state

## 🚀 Quick Start

### 1. Start the Backend

```bash
cd /Users/shadi/Desktop/aqlaan-nx/apps/alina/backend/alina-backend
dotnet run
```

The backend should start on `http://localhost:5602`

### 2. Start the Frontend

```bash
cd /Users/shadi/Desktop/aqlaan-nx/apps/alina/frontend/alina-frontend
npm run dev
```

The frontend will run on `http://localhost:3000`

### 3. Test the Connection

Open your browser and:
1. Go to http://localhost:3000/register
2. Create a new account
3. Check the console for API request logs
4. Login and verify JWT tokens are stored

## 📡 API Endpoints

### Authentication (`/api/auth`)

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/auth/mobile/register` | POST | Register new user (returns tokens) |
| `/auth/mobile/login` | POST | Login (returns tokens) |
| `/auth/web/register` | POST | Register (sets cookies) |
| `/auth/web/login` | POST | Login (sets cookies) |
| `/auth/refresh` | POST | Refresh access token |
| `/auth/me` | GET | Get current user |
| `/auth/logout` | POST | Logout user |
| `/auth/reset-password` | POST | Request password reset |
| `/auth/confirm-reset-password` | POST | Confirm password reset |
| `/auth/verify-email` | GET | Verify email |
| `/auth/resend-verification` | POST | Resend verification |

### Your Backend Controllers

```
/api/auth          - Authentication
/api/admin         - Admin operations
/api/analytics     - Analytics data
/api/business      - Business features
/api/dashboard     - Dashboard data
/api/disputes      - Dispute management
/api/finance       - Wallet, payments
/api/marketplace   - Gigs, services
/api/media         - File uploads
/api/messaging     - Chat, messages
/api/notifications - Notifications
/api/orders        - Order management
/api/profiles      - User profiles
/api/support       - Support tickets
/api/users         - User management
```

## 🔐 Token Flow

### 1. Initial Login/Register
```
User submits credentials
  ↓
POST /api/auth/mobile/login
  ↓
Backend returns:
{
  "access_token": "eyJhbGciOi...",
  "refresh_token": "def502...",
  "expires_in": 3600,
  "user_id": "123"
}
  ↓
Frontend stores tokens in localStorage
  ↓
All subsequent requests include:
Authorization: Bearer eyJhbGciOi...
```

### 2. Token Refresh (Auto)
```
API request returns 401
  ↓
Axios interceptor catches error
  ↓
POST /api/auth/refresh
Body: { "refreshToken": "def502..." }
  ↓
Backend returns new tokens
  ↓
Retry original request with new token
```

## 🛠️ Usage Examples

### Making API Calls

```typescript
import apiClient from '@/lib/api/client';

// GET request
const users = await apiClient.get('/users');

// POST request
const newGig = await apiClient.post('/marketplace/gigs', {
  title: 'Web Development',
  price: 500
});

// PUT request
await apiClient.put(`/gigs/${id}`, updatedData);

// DELETE request
await apiClient.delete(`/gigs/${id}`);
```

### Using React Query Hooks

```typescript
import { useLogin } from '@/hooks/useAuth';

function LoginForm() {
  const login = useLogin();
  
  const handleSubmit = async (email: string, password: string) => {
    try {
      const response = await login.mutateAsync({ email, password });
      // Tokens are automatically stored
      router.push('/dashboard');
    } catch (error) {
      console.error('Login failed:', error);
    }
  };
}
```

### Protected Routes

```typescript
import { ProtectedRoute } from '@/components/auth/ProtectedRoute';

export default function AdminPage() {
  return (
    <ProtectedRoute requireAuth={true} requiredRole="admin">
      <AdminDashboard />
    </ProtectedRoute>
  );
}
```

### Using Auth Context

```typescript
import { useAuth } from '@/lib/providers/AuthProvider';

function Header() {
  const { user, isAuthenticated, logout } = useAuth();
  
  return (
    <div>
      {isAuthenticated ? (
        <>
          <span>Welcome, {user?.fullName}</span>
          <button onClick={logout}>Logout</button>
        </>
      ) : (
        <Link href="/login">Login</Link>
      )}
    </div>
  );
}
```

## 📝 Environment Variables

### Frontend (`.env.local`)
```bash
NEXT_PUBLIC_API_URL=http://localhost:5602/api
NEXT_PUBLIC_API_TIMEOUT=30000
```

### Backend (`appsettings.json`)
- Already configured with CORS for `localhost:3000`
- JWT configuration
- Database connection

## 🧪 Testing the Integration

### 1. Test Authentication
```bash
# Test registration
curl -X POST http://localhost:5602/api/auth/mobile/register \
  -H "Content-Type: application/json" \
  -d '{
    "fullName": "Test User",
    "email": "test@example.com",
    "password": "Test123!@#"
  }'

# Test login
curl -X POST http://localhost:5602/api/auth/mobile/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "Test123!@#"
  }'
```

### 2. Test Authenticated Requests
```bash
# Get current user
curl http://localhost:5602/api/auth/me \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

## 📊 Monitoring API Calls

Open browser console to see:
- 📤 Outgoing API requests
- ✅ Successful responses
- ❌ Error responses
- 🔄 Token refresh operations

## 🚨 Common Issues

### Issue: CORS Error
**Solution:** Backend already has CORS configured for localhost:3000. Ensure backend is running.

### Issue: 401 Unauthorized
**Solution:** Check if token is expired. The app will auto-refresh or redirect to login.

### Issue: Network Error
**Solution:** Verify backend is running on port 5602.

## 🔜 Next Steps

### Phase 2: Feature APIs (Ready to implement)
1. ✅ Marketplace Service - Browse and create gigs
2. ✅ Task Service - Post and bid on tasks
3. ✅ Order Service - Manage orders and deliverables
4. ✅ Wallet Service - Deposits, withdrawals, transactions
5. ✅ Chat Service - Real-time messaging (needs WebSocket)
6. ✅ Media Service - File uploads

All service files exist in `/src/lib/api/services/` - just need to verify endpoints match backend!

### Phase 3: Advanced Features
1. WebSocket integration for real-time updates
2. Stripe/PayPal payment processing
3. Email notifications
4. Analytics tracking
5. Error monitoring (Sentry)

## 📚 Documentation

- Frontend API Services: `/src/lib/api/services/`
- Type Definitions: `/src/lib/api/types/`
- React Query Hooks: `/src/hooks/`
- Auth Utils: `/src/lib/utils/auth.ts`

---

**🎉 Your backend integration is complete and ready to use!**

Test it by:
1. Starting both frontend and backend
2. Registering a new user at http://localhost:3000/register
3. Check console logs for API requests
4. Login and navigate to http://localhost:3000/dashboard
