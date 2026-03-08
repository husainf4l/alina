# Alina Backend — System Audit
> Generated: 2026-03-08 | Stack: .NET Core 8, PostgreSQL, EF Core 8, SignalR, AWS S3

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | ASP.NET Core 8 |
| ORM | Entity Framework Core 8 |
| Database | PostgreSQL |
| Auth | JWT (RSA-signed) + HttpOnly refresh cookie |
| OAuth | Google Identity (GoogleAuthService) |
| Real-time | SignalR (messaging + notifications hub) |
| Storage | AWS S3 + CloudFront CDN |
| Email | Stubbed (not delivered) |
| Currency | Internal rates table + `/api/currency/rates` |
| Architecture | Modular monolith (per-domain `/Modules/`) |

---

## Module Map

```
/Modules/
├── auth/           JWT, OAuth, password, 2FA (TOTP)
├── marketplace/    Gigs, packages, offers, reviews, categories, search
├── profiles/       User profiles, skills, languages, seller level
├── orders/         Order ops, cancellation, auto-release (escrow)
├── finance/        Wallets, transactions, currency rates, withdrawals
├── messaging/      Chat messages, conversations, SignalR hub
├── notifications/  Notification records, preferences, SignalR push
├── dashboard/      Stats, activity feed, analytics, business tools
├── disputes/       Dispute creation, resolution, escrow handling
├── settings/       User settings, notification prefs
├── media/          Image uploads → S3
└── admin/          Admin operations (partial)
```

---

## API Endpoints Inventory

### Auth — `/api/auth`
| Method | Endpoint | Status | Notes |
|--------|----------|--------|-------|
| POST | `/web/register` | ✅ | Sets HttpOnly refresh cookie |
| POST | `/web/login` | ✅ | Sets HttpOnly refresh cookie |
| POST | `/web/google` | ✅ | Validates Google ID token |
| POST | `/web/refresh` | ✅ | Silent token refresh |
| GET | `/me` | ✅ | Returns current user |
| PUT | `/me` | ✅ | Update displayName, bio, role |
| POST | `/me/avatar` | ✅ | Upload avatar → S3 |
| POST | `/me/cover` | ✅ | Upload cover → S3 |
| POST | `/password/reset-request` | ❌ | Email not delivered |
| POST | `/password/reset` | ❌ | Token flow not complete |
| POST | `/email/verify` | ❌ | Not implemented |
| POST | `/2fa/setup` | ⚠️ | TOTP backend exists, email stub |
| POST | `/2fa/verify` | ⚠️ | Backend exists |

---

### Marketplace — `/api/marketplace` + `/api/MarketplaceOps`
| Method | Endpoint | Status | Notes |
|--------|----------|--------|-------|
| GET | `/categories` | ✅ | With subcategories |
| GET | `/trending-categories` | ✅ | |
| GET | `/gigs` | ✅ | Public listing, paginated |
| GET | `/gigs/{id}` | ✅ | With packages, seller info |
| GET | `/gigs/me` | ✅ | My gigs, paginated |
| POST | `/gigs` | ✅ | Create gig |
| PUT | `/gigs/{id}` | ✅ | Update gig |
| PATCH | `/gigs/{id}/status` | ✅ | Toggle active |
| DELETE | `/gigs/{id}` | ⚠️ | Exists? Not confirmed in frontend |
| GET | `/gigs/{id}/reviews` | ⚠️ | Backend uncertain |
| POST | `/reviews` | ❌ | No review submission endpoint confirmed |
| GET | `/search` | ⚠️ | Partial — analytics logged but filter logic incomplete |

---

### Orders — `/api/MarketplaceOps`
| Method | Endpoint | Status | Notes |
|--------|----------|--------|-------|
| GET | `/orders` | ✅ | Paginated, filterable by status |
| GET | `/orders/{id}` | ✅ | Order detail |
| POST | `/orders` | ⚠️ | Create order exists — no frontend |
| POST | `/orders/{id}/deliver` | ⚠️ | Backend may exist, no frontend |
| POST | `/orders/{id}/complete` | ⚠️ | Backend exists (double path fixed) |
| POST | `/orders/{id}/revision` | ❌ | Not confirmed |
| POST | `/orders/{id}/cancel` | ⚠️ | Backend exists, no frontend |

---

### Finance — `/api/Wallet`
| Method | Endpoint | Status | Notes |
|--------|----------|--------|-------|
| GET | `/` | ✅ | Balance (available + escrow) |
| GET | `/transactions` | ✅ | Transaction history |
| POST | `/withdraw` | ⚠️ | Backend exists, no frontend |
| POST | `/deposit` | ⚠️ | Admin-approved, no payment gateway |
| PUT | `/admin/deposit/{id}/approve` | ⚠️ | Auth added, admin-only |

---

### Messaging — `/api/Messaging`
| Method | Endpoint | Status | Notes |
|--------|----------|--------|-------|
| GET | `/chats` | ✅ | Conversation summaries |
| GET | `/messages/{userId}` | ✅ | Thread with user |
| POST | `/messages` | ✅ | Send text message |
| POST | `/messages/attachment` | ❌ | Not implemented |
| SignalR | `/hubs/messaging` | ✅ | Real-time hub exists |

> **Note:** Frontend uses polling (5s) — SignalR hub is ready but not consumed by frontend.

---

### Notifications — `/api/Notification`
| Method | Endpoint | Status | Notes |
|--------|----------|--------|-------|
| GET | `/` | ✅ | All notifications |
| PUT | `/{id}/read` | ✅ | Mark one as read |
| PUT | `/read-all` | ✅ | Mark all as read |
| DELETE | `/{id}` | ⚠️ | Not confirmed |
| SignalR | `/hubs/notifications` | ✅ | Push hub exists |

---

### Dashboard — `/api/Dashboard`
| Method | Endpoint | Status | Notes |
|--------|----------|--------|-------|
| GET | `/quick-stats` | ✅ | Gigs, orders, earnings, rating |
| GET | `/recent-activity` | ✅ | Activity feed |
| GET | `/analytics` | ⚠️ | Platform fee bug fixed, time series missing |
| GET | `/business-tools` | ⚠️ | Partial |

---

### Settings — `/api/Settings`
| Method | Endpoint | Status | Notes |
|--------|----------|--------|-------|
| GET | `/` | ✅ | User settings |
| PUT | `/` | ✅ | Update settings |

---

### Disputes — `/api/Disputes`
| Method | Endpoint | Status | Notes |
|--------|----------|--------|-------|
| POST | `/` | ⚠️ | Backend exists, no frontend |
| GET | `/` | ⚠️ | Backend exists, no frontend |
| PUT | `/{id}/resolve` | ⚠️ | Backend exists, admin only |

---

### Media — `/api/media`
| Method | Endpoint | Status | Notes |
|--------|----------|--------|-------|
| POST | `/upload` | ✅ | Single image → S3 |
| POST | `/upload/batch` | ✅ | Batch upload (documented) |

---

### System
| Method | Endpoint | Status | Notes |
|--------|----------|--------|-------|
| GET | `/api/health` | ✅ | Health check |
| GET | `/api/debug/db-test` | ⚠️ | Remove before production |
| GET | `/api/currency/rates` | ✅ | Currency rates |

---

## Data Models (Key Entities)

### User
```csharp
User {
  Id: Guid
  FullName: string
  Email: string
  PasswordHash: string
  Role: string  // "buyer" | "seller" | "both" | "admin"
  ProfileCompletionPercentage: int
  CreatedAt: DateTime
  IsEmailVerified: bool   // not enforced on login
  TwoFactorEnabled: bool
}
```

### Profile
```csharp
Profile {
  UserId: Guid
  DisplayName: string
  Bio: string
  AvatarUrl: string
  CoverUrl: string
  SellerLevel: string   // "new" | "level1" | "level2" | "top"
  Skills: string[]
  Languages: string[]
}
```

### Gig
```csharp
Gig {
  Id: Guid
  SellerId: Guid
  Title: string
  Description: string
  CategoryId: Guid
  SubcategoryId: Guid?
  MainImage: string
  Gallery: string[]
  IsActive: bool
  AverageRating: decimal
  ReviewCount: int
  Packages: List<Package>
}
```

### Package
```csharp
Package {
  Id: Guid
  GigId: Guid
  Name: string            // "Basic" | "Standard" | "Premium"
  Description: string
  Price: decimal
  Currency: string
  DeliveryTimeInDays: int
  Revisions: int
}
```

### Order
```csharp
Order {
  Id: Guid
  GigId: Guid
  PackageId: Guid
  BuyerId: Guid
  SellerId: Guid
  Amount: decimal
  Currency: string
  Status: OrderStatus    // Pending | InProgress | Delivered | Completed | Cancelled | Disputed
  Deadline: DateTime?
  DeliveryMessage: string?
  AttachmentUrls: string[]
  CreatedAt: DateTime
}
```

### Wallet
```csharp
Wallet {
  UserId: Guid
  AvailableBalance: decimal
  EscrowBalance: decimal
  Currency: string
}
```

### Transaction
```csharp
Transaction {
  Id: Guid
  WalletId: Guid
  Amount: decimal
  Type: string     // "credit" | "debit" | "escrow_hold" | "escrow_release"
  Reference: string
  CreatedAt: DateTime
}
```

---

## Security Audit

### Strengths
- JWT signed with RSA key pair (not symmetric secret)
- Refresh token in HttpOnly cookie (XSS-resistant)
- Access token in-memory only (never localStorage)
- Silent refresh on 401 via Axios interceptor
- Role-based authorization with `[Authorize(Roles = "...")]`
- Google ID token validated server-side

### Issues / Gaps

| Issue | Severity | Fix |
|-------|----------|-----|
| Email not verified on login | High | Enforce `IsEmailVerified` check |
| Password reset not delivered | High | Integrate email service (SendGrid/SES) |
| 2FA email stubbed | High | Integrate SMTP or SES |
| `/api/debug/db-test` exposed | Medium | Remove in production |
| No rate limiting on auth endpoints | Medium | Add IP-based throttle (ASP.NET rate limiting middleware) |
| No brute-force protection on login | Medium | Add lockout after N failures |
| Auto-migrations disabled | Low | Re-enable or use CI migration job |
| RSA keys in `/keys/` directory | Medium | Move to secrets manager (AWS Secrets Manager / Azure Key Vault) |
| CORS configuration review needed | Medium | Confirm only trusted origins allowed |
| No API versioning | Low | Add `/api/v1/` prefix for future compatibility |

---

## Known Bugs (Fixed ✅ / Outstanding ⚠️)

| # | Bug | Status |
|---|-----|--------|
| 1 | Admin role JWT claim not issued | ✅ Fixed |
| 2 | Dispute controller uses wrong ID type | ✅ Fixed |
| 3 | Seller escrow not decremented on cancellation | ✅ Fixed |
| 4 | Dispute escrow uses negative amount | ✅ Fixed |
| 5 | AutoReleaseService targets wrong order status | ✅ Fixed |
| 6 | Double complete-order paths | ✅ Fixed |
| 7 | Admin deposit approval missing auth | ✅ Fixed |
| 8 | Analytics returns platform fee as earnings | ✅ Fixed |
| 9 | Email delivery for 2FA still stubbed | ⚠️ Outstanding |
| 10 | Email verification flow not implemented | ⚠️ Outstanding |
| 11 | Password reset requires email service | ⚠️ Outstanding |
| 12 | Payment gateway not integrated | ⚠️ Outstanding |
| 13 | Profile view tracking not logged | ⚠️ Outstanding |
| 14 | Backup files committed to repo | ⚠️ Outstanding |
| 15 | Auto-migrations commented out | ⚠️ Outstanding |

---

## Missing Backend Features

| Feature | Endpoint Needed | Priority |
|---------|----------------|----------|
| Checkout / place order | `POST /api/orders` (verify) | P0 |
| Email verification | `POST /api/auth/email/verify` + send email | P0 |
| Password reset | `POST /api/auth/password/reset-request` + email | P0 |
| Deliver work (seller) | `POST /api/orders/{id}/deliver` + file upload | P0 |
| Request revision (buyer) | `POST /api/orders/{id}/revision` | P0 |
| Complete order (buyer) | `POST /api/orders/{id}/complete` | P0 |
| Review submission | `POST /api/reviews` | P1 |
| Withdrawal request | `POST /api/Wallet/withdraw` | P1 |
| Payment gateway | Stripe / PayPal integration | P1 |
| Seller analytics time series | `GET /api/Dashboard/earnings?period=30d` | P2 |
| Dispute creation | `POST /api/Disputes` (verify frontend) | P2 |
| Seller profile public view | `GET /api/profiles/{userId}` | P2 |
| Skills management | `PUT /api/profiles/me/skills` | P2 |
| Gig FAQ management | `POST /api/marketplace/gigs/{id}/faq` | P3 |
| Gig requirements | `PUT /api/marketplace/gigs/{id}/requirements` | P3 |
| Admin: user management | `GET /api/admin/users` etc. | P3 |
| Admin: dispute resolution | `PUT /api/admin/disputes/{id}/resolve` | P3 |
| Admin: platform stats | `GET /api/admin/stats` | P3 |

---

## Infrastructure & Performance

### Current
- PostgreSQL via EF Core with migrations
- AWS S3 + CloudFront for media
- SignalR hubs deployed (messaging + notifications)
- Docker support (implied by project structure)

### Recommendations

| Area | Issue | Fix |
|------|-------|-----|
| Email | All email flows stubbed | Integrate AWS SES or SendGrid |
| Payment | No gateway | Integrate Stripe (cards) or PayPal |
| Caching | No Redis/cache layer | Add Redis for currency rates, category lists |
| Search | No Elasticsearch | Add full-text search or pg_trgm for gig discovery |
| Rate limiting | None on auth | Add ASP.NET Core rate limiting middleware |
| Logging | Unknown | Confirm Serilog or similar structured logging |
| Monitoring | None visible | Add Application Insights or Datadog |
| Background jobs | AutoReleaseService | Consider Hangfire for reliable scheduling |
| API docs | No Swagger exposed | Enable Swagger UI for dev/staging |
| Secrets | RSA keys in `/keys/` | Move to AWS Secrets Manager |

---

## Recommended Sprint Plan

### Sprint 1 — Launch Blockers
- [ ] Email service integration (AWS SES / SendGrid)
- [ ] Email verification on register
- [ ] Password reset full flow (request + token + reset)
- [ ] Verify `POST /api/orders` creates order correctly
- [ ] Confirm deliver / complete / revision endpoints
- [ ] Remove `/api/debug/db-test` endpoint

### Sprint 2 — Core Commerce
- [ ] Stripe payment gateway integration
- [ ] Deposit flow (card → wallet)
- [ ] Withdrawal request handling
- [ ] Review submission endpoint
- [ ] `GET /api/profiles/{userId}` — public seller profile

### Sprint 3 — Platform Completeness
- [ ] Seller analytics time series endpoint
- [ ] Skills management endpoints
- [ ] Rate limiting on auth routes
- [ ] Redis caching for categories + currency rates
- [ ] Admin user/dispute management endpoints
- [ ] Move RSA keys to secrets manager
- [ ] Structured logging (Serilog + Seq or Datadog)
