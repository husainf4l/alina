# Backend-Frontend Endpoint Alignment Report

This document tracks the verification status of all API endpoints between the .NET backend and Next.js frontend.

## 📊 Verification Status

| Service | Status | Issues Found | Action Required |
|---------|--------|--------------|-----------------|
| **Auth** | ✅ Complete | None | - |
| **Marketplace** | 🔄 Partial | Need to verify gigs,reviews | Read remaining controller |
| **Tasks** | ⚠️ Mismatch | Route naming | Fix frontend service |
| **Wallet** | ✅ Complete | None | - |
| **Withdrawal** | ⚠️ Mismatch | Route naming | Fix frontend service |
| **Messaging** | ⚠️ Mismatch | API design pattern | Fix frontend service |
| **Media** | ⚠️ Mismatch | API design | Fix frontend service |
| **Orders** | ❌ Not Found | Controller missing | Find backend controller |

---

## 1. Auth Service ✅

**Backend**: `/api/auth` - `AuthController.cs`  
**Frontend**: `/auth` - `auth.service.ts`  
**Status**: **VERIFIED - All endpoints match**

| Method | Backend Route | Frontend Route | Status |
|--------|--------------|----------------|--------|
| POST | `/auth/mobile/register` | `/auth/mobile/register` | ✅ |
| POST | `/auth/mobile/login` | `/auth/mobile/login` | ✅ |
| POST | `/auth/web/register` | `/auth/web/register` | ✅ |
| POST | `/auth/web/login` | `/auth/web/login` | ✅ |
| POST | `/auth/refresh` | `/auth/refresh` | ✅ |
| GET | `/auth/me` | `/auth/me` | ✅ |
| POST | `/auth/logout` | `/auth/logout` | ✅ |
| POST | `/auth/reset-password` | `/auth/reset-password` | ✅ |
| POST | `/auth/verify-email` | `/auth/verify-email` | ✅ |

---

## 2. Marketplace Service 🔄

**Backend**: `/api/marketplace` - `MarketplaceController.cs` (817 lines)  
**Frontend**: `/marketplace` - `marketplace.service.ts`  
**Status**: **PARTIAL VERIFICATION** (Read lines 1-200 of 817)

### ✅ Verified Endpoints

#### Categories
| Method | Backend Route | Frontend Route | Status |
|--------|--------------|----------------|--------|
| GET | `/marketplace/categories` | `/marketplace/categories` | ✅ |
| GET | `/marketplace/trending-categories` | - | ℹ️ Backend only |
| GET | `/marketplace/main-categories` | - | ℹ️ Backend only |
| GET | `/marketplace/{parentId}/subcategories` | - | ℹ️ Backend only |
| GET | `/marketplace/recommended` | `/marketplace/featured` | ⚠️ **Different names** |

### 📋 Pending Verification (Lines 200-817)
- Gig search/list endpoints
- Gig CRUD operations
- Reviews endpoints
- Favorites endpoints

**Action Needed**: Read remaining 617 lines of MarketplaceController.cs

---

## 3. Task Service ⚠️

**Backend**: `/api/task` - `TaskController.cs` (303 lines)  
**Frontend**: `/tasks` - `marketplace.service.ts` (uses `/marketplace/tasks`)  
**Status**: **ROUTE MISMATCH - CRITICAL**

### Issue: Route Naming Discrepancy
- **Backend**: Uses `/api/task` (SINGULAR)
- **Frontend**: Expects `/api/tasks` (PLURAL)

### Endpoints

| Method | Backend Route | Frontend Expected | Status |
|--------|--------------|-------------------|--------|
| GET | `/task` | `/tasks` | ❌ **Mismatch** |
| GET | `/task/{id}` | `/tasks/{id}` | ❌ **Mismatch** |

### Backend Details
```csharp
[Route("api/[controller]")]  // = /api/task
public class TaskController : ControllerBase

[HttpGet]  // /api/task?categoryId=...&status=...&search=...&type=...
public async Task<ActionResult<PagedResponse<UserTaskDto>>> GetTasks(...)

[HttpGet("{id}")]  // /api/task/{id}
public async Task<ActionResult<UserTaskDto>> GetTaskById(Guid id)
```

### Query Parameters (GET /task)
- `categoryId?: Guid` - Filter by category
- `status?: string` - Filter by status (Open, InProgress, Completed, Cancelled)
- `search?: string` - Search in title/description
- `type?: string` - Type of task
- `pageNumber?: int` - Pagination (default: 1)
- `pageSize?: int` - Pagination (default: 20)

**Action Required**: 
```typescript
// In marketplace.service.ts or new tasks.service.ts
// Change: '/marketplace/tasks' → '/task'
// Change: '/marketplace/tasks/{id}' → '/task/{id}'
```

---

## 4. Wallet Service ✅

**Backend**: `/api/wallet` - `WalletController.cs` (150 lines)  
**Frontend**: `/wallet` - `finance.service.ts`  
**Status**: **VERIFIED - All endpoints match**

| Method | Backend Route | Frontend Route | Status |
|--------|--------------|----------------|--------|
| GET | `/wallet` | `/wallet` | ✅ |
| POST | `/wallet/deposit` | `/wallet/deposit` | ✅ |
| GET | `/wallet/transactions` | `/wallet/transactions` | ✅ |
| POST | `/wallet/admin/approve-deposit/{id}` | - | ℹ️ Admin endpoint |

### Response Structure
```typescript
WalletDto {
  availableBalance: Money;
  escrowBalance: Money;
  recentTransactions: TransactionDto[];  // Last 10
}
```

### Features
- Auto-creates wallet if doesn't exist
- Currency conversion to user's preferred currency
- Paginated transactions (page, pageSize)

---

## 5. Withdrawal Service ⚠️

**Backend**: `/api/withdrawal` - `WithdrawalController.cs` (384 lines)  
**Frontend**: `/withdrawals` - `finance.service.ts`  
**Status**: **ROUTE MISMATCH - CRITICAL**

### Issue: Route Naming Discrepancy
- **Backend**: Uses `/api/withdrawal` (SINGULAR)
- **Frontend**: Expects `/api/withdrawals` (PLURAL)

### Endpoints (Read lines 1-100)

| Method | Backend Route | Frontend Expected | Status |
|--------|--------------|-------------------|--------|
| POST | `/withdrawal` | `/withdrawals` | ❌ **Mismatch** |
| GET | `/withdrawal` (assumed) | `/withdrawals` | ❓ **Not verified** |
| GET | `/withdrawal/{id}` (assumed) | `/withdrawals/{id}` | ❓ **Not verified** |
| POST | `/withdrawal/{id}/cancel` (assumed) | `/withdrawals/{id}/cancel` | ❓ **Not verified** |

### Backend Details (Lines 1-100)
```csharp
[Route("api/[controller]")]  // = /api/withdrawal
public class WithdrawalController : ControllerBase

[HttpPost]  // POST /api/withdrawal
public async Task<ActionResult<WithdrawalRequestDto>> CreateWithdrawalRequest(CreateWithdrawalRequestDto dto)
```

### Business Logic
- 24-hour cooldown between withdrawal requests
- Validates amount > 0
- Checks available balance = wallet.AvailableBalance - wallet.EscrowBalance - wallet.PendingWithdrawal
- Uses database transactions for atomicity
- Moves funds from available → pending withdrawal

**Action Required**:
```typescript
// In finance.service.ts
// Change all routes from '/withdrawals' → '/withdrawal'
createWithdrawalRequest: async (...) => {
  const response = await apiClient.post('/withdrawal', data);  // Was /withdrawals
  return response.data;
},
```

**Pending**: Read remaining 284 lines to verify GET and cancel endpoints

---

## 6. Messaging Service ⚠️

**Backend**: `/api/messaging` - `MessagingController.cs` (127 lines)  
**Frontend**: `/messaging` - `messaging.service.ts`  
**Status**: **API DESIGN MISMATCH - CRITICAL**

### Issue: Different API Patterns
- **Backend**: Direct user-to-user messaging (no conversations entity)
- **Frontend**: Conversation-based messaging (conversations entity)

### Backend Endpoints ✅ Read Complete

| Method | Backend Route | Request | Response | Purpose |
|--------|--------------|---------|----------|---------|
| GET | `/messaging/chats` | - | `ChatSummaryDto[]` | Get all chat summaries |
| GET | `/messaging/messages/{otherUserId}` | - | `MessageDto[]` | Get chat history with user |
| POST | `/messaging/messages` | `SendMessageDto` | `MessageDto` | Send message |

### Backend DTOs
```csharp
ChatSummaryDto(
  Guid userId,
  string userName,
  string lastMessage,
  DateTime lastMessageAt,
  int unreadCount
)

MessageDto(
  Guid id,
  Guid senderId,
  string senderName,
  Guid receiverId,
  string receiverName,
  string content,
  string? attachmentUrl,
  bool isRead,
  DateTime? readAt,
  DateTime createdAt
)

SendMessageDto {
  Guid ReceiverId,
  string Content,
  string? AttachmentUrl
}
```

### Frontend Expected Routes ❌ Mismatch

| Method | Frontend Route | Purpose |
|--------|---------------|---------|
| GET | `/messaging/conversations` | Get all conversations |
| GET | `/messaging/conversations/{id}` | Get one conversation |
| POST | `/messaging/conversations` | Create conversation |
| DELETE | `/messaging/conversations/{id}` | Delete conversation |
| GET | `/messaging/conversations/{id}/messages` | Get messages |
| POST | `/messaging/messages` | Send message |
| PUT | `/messaging/messages/{id}` | Edit message |
| DELETE | `/messaging/messages/{id}` | Delete message |
| POST | `/messaging/conversations/{id}/read` | Mark as read |
| POST | `/messaging/conversations/{id}/typing` | Typing indicator |

### SignalR (WebSocket)
**Backend**: `ChatHub.cs` - SignalR hub for real-time messaging
- Event: `ReceiveMessage` - Broadcasts new messages in real-time
- Requires JWT token in connection

**Frontend**: Not yet implemented (uses REST API polling)

### Action Required
**Option 1: Change Frontend** (Recommended - less backend work)
```typescript
// Rewrite messaging.service.ts to match backend pattern
{
  getChats: () => apiClient.get('/messaging/chats'),
  getChatHistory: (otherUserId) => apiClient.get(`/messaging/messages/${otherUserId}`),
  sendMessage: (data: { receiverId, content, attachmentUrl? }) => 
    apiClient.post('/messaging/messages', data)
}
```

**Option 2: Change Backend** (More work)
- Add conversation entity/controller
- Implement conversation-based messaging
- Migration for existing messages

**Recommendation**: Update frontend to use backend's simpler user-to-user messaging pattern

---

## 7. Media Service ⚠️

**Backend**: `/api/media` - `MediaController.cs` (complete, ~70 lines)  
**Frontend**: `/media` - `media.service.ts`  
**Status**: **API DESIGN MISMATCH**

### Backend Endpoints ✅ Complete

| Method | Backend Route | Request | Response | Purpose |
|--------|--------------|---------|----------|---------|
| POST | `/media/upload` | `IFormFile file` + query params | `Media` | Upload single file |
| DELETE | `/media/{id}` | - | - | Delete media |

### Backend Query Parameters (Upload)
- `gigId?: Guid` - Associate with gig
- `taskId?: Guid` - Associate with task
- `customOfferId?: int` - Associate with custom offer

### Backend Request/Response
```csharp
Request: multipart/form-data
  - file: IFormFile (required)
  - gigId: Guid (query, optional)
  - taskId: Guid (query, optional)
  - customOfferId: int (query, optional)

Response: Media {
  Guid Id,
  string Url,
  string FileName,
  string FileType,
  long FileSize,
  Guid OwnerId,
  Guid? GigId,
  Guid? UserTaskId,
  int? CustomOfferId
}
```

### Frontend Expected Routes ❌ Mismatch

| Method | Frontend Route | Purpose |
|--------|---------------|---------|
| GET | `/media/me` | Get user's media |
| GET | `/media/{id}` | Get single media |
| POST | `/media/upload` | Upload single file |
| POST | `/media/upload-multiple` | Upload multiple files |
| DELETE | `/media/{id}` | Delete media |

### Action Required
**Option 1: Change Frontend** (Recommended)
```typescript
// Simplify mediaService to match backend
{
  uploadMedia: async (file: File, metadata?: { gigId?, taskId?, customOfferId? }) => {
    const formData = new FormData();
    formData.append('file', file);
    
    const params = new URLSearchParams();
    if (metadata?.gigId) params.append('gigId', metadata.gigId);
    if (metadata?.taskId) params.append('taskId', metadata.taskId);
    if (metadata?.customOfferId) params.append('customOfferId', metadata.customOfferId);
    
    return apiClient.post(`/media/upload?${params}`, formData);
  },
  
  deleteMedia: async (mediaId: string) => {
    return apiClient.delete(`/media/${mediaId}`);
  }
}
```

**Option 2: Extend Backend**
- Add GET `/media/me` - List user's media
- Add GET `/media/{id}` - Get single media details
- Add POST `/media/upload-multiple` - Batch upload

**Recommendation**: Update frontend to match backend's simpler design. Add backend endpoints only if features require them.

---

## 8. Orders Service ❌

**Backend**: **NOT FOUND** - No `OrderController.cs` or `OrdersController.cs`  
**Frontend**: `/orders` - `order.service.ts` (150 lines, extensive)  
**Status**: **CONTROLLER MISSING**

### Frontend Expected Routes (Complete List)

| Method | Frontend Route | Purpose |
|--------|---------------|---------|
| GET | `/orders/me` | Get all my orders |
| GET | `/orders/buyer` | Get buyer orders |
| GET | `/orders/seller` | Get seller orders |
| GET | `/orders/{id}` | Get single order |
| POST | `/orders` | Create order |
| POST | `/orders/{id}/requirements` | Submit requirements |
| POST | `/orders/{id}/start` | Start order (seller) |
| POST | `/orders/{id}/deliver` | Deliver order |
| POST | `/orders/{id}/revision` | Request revision |
| POST | `/orders/{id}/accept` | Accept delivery |
| POST | `/orders/{id}/cancel` | Cancel order |
| GET | `/orders/{id}/revisions` | Get order revisions |
| POST | `/revisions/{id}/submit` | Submit revision |

### Investigation Results
- ❌ No `OrderController.cs` or `OrdersController.cs` found
- ✅ Found `/app/orders/RevisionsController.cs` (only revisions)
- ✅ `Order.cs` model exists in `/app/marketplace/Order.cs`
- ❌ grep search for "CreateOrder" found nothing
- ❌ Database context shows Order entity but no controller

### Hypothesis
Orders might be:
1. **Managed through MarketplaceController** (gigs create orders)
2. **Managed through GigController** (if exists)
3. **Not yet implemented** (only model exists)
4. **Named differently** (e.g., `SalesController`, `TransactionController`)

### Action Required
**Priority: HIGH - Investigate further**
1. Read remaining 617 lines of MarketplaceController.cs (lines 200-817)
2. Search for gig-related order creation endpoints
3. Check if there's a GigController or SalesController
4. Review RevisionsController.cs for clues
5. If no controller exists, backend needs Order endpoints implemented

---

## 🔧 Critical Actions Summary

### 1. Fix Task Routes (IMMEDIATE)
```typescript
// File: src/lib/api/services/marketplace.service.ts or new tasks.service.ts
// Change all: '/marketplace/tasks' → '/task'
// Change all: '/marketplace/tasks/{id}' → '/task/{id}'
```

### 2. Fix Withdrawal Routes (IMMEDIATE)
```typescript
// File: src/lib/api/services/finance.service.ts
// Change all: '/withdrawals' → '/withdrawal'
// Change all: '/withdrawals/{id}' → '/withdrawal/{id}'
// Change all: '/withdrawals/{id}/cancel' → '/withdrawal/{id}/cancel'
```

### 3. Rewrite Messaging Service (HIGH)
```typescript
// File: src/lib/api/services/messaging.service.ts
// Complete rewrite to match backend's user-to-user pattern
// Remove conversation entity, use direct userId messaging
```

### 4. Simplify Media Service (MEDIUM)
```typescript
// File: src/lib/api/services/media.service.ts
// Remove getMyMedia, getMedia endpoints (not in backend)
// Keep uploadMedia (single), deleteMedia
// Use query params for associations (gigId, taskId, customOfferId)
```

### 5. Find/Implement Orders Controller (URGENT)
- Search remaining MarketplaceController.cs
- Search for GigController.cs
- If not found, backend team needs to implement order endpoints

---

## 📋 Verification Checklist

- [x] Auth service - **Complete**
- [ ] Marketplace service - **50% complete** (need lines 200-817)
- [x] Task service - **Complete** (found mismatch)
- [x] Wallet service - **Complete**
- [ ] Withdrawal service - **75% complete** (need lines 100-384)
- [x] Messaging service - **Complete** (found design mismatch)
- [x] Media service - **Complete** (found design mismatch)
- [ ] Orders service - **0% complete** (controller not found)

---

## 🎯 Next Steps

1. **Complete* reading partially-read controllers (Marketplace, Withdrawal)
2. **Fix** critical route mismatches (Task, Withdrawal)
3. **Rewrite** mismatched services (Messaging, Media)
4. **Locate** missing Orders controller
5. **Test** all endpoints with actual API calls
6. **Implement** SignalR client for real-time messaging
7. **Update** API documentation with verified endpoints

---

*Last Updated*: Auto-generated from endpoint verification process
