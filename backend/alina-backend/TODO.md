# Alina Backend — Bug Fix & Issue Tracker

Generated from review on 2026-03-07. All items are implemented in the same commit unless noted.

---

## 🔴 Critical Logic Bugs

- [x] **#1 — Admin role claim never issued in JWT** (`AuthController.cs`)
  - `GenerateAccessToken` was not emitting a `role` claim, making every `[Authorize(Roles = "Admin")]` endpoint permanently return 403.
  - **Fix:** Read `IsAdmin` from the `Profile` and add a `ClaimTypes.Role` claim to the token.

- [x] **#2 — Dispute controller compares User.Id to Profile.Id** (`DisputeController.cs`)
  - `GetCurrentUserId()` returns the JWT `sub` (User GUID), but `order.BuyerId` is a Profile GUID. Every dispute was rejected with `Forbid()`.
  - **Fix:** Resolve the calling user's Profile from the DB before the ownership check.

- [x] **#3 — Seller escrow not decremented on order cancellation** (`MarketplaceOpsController.cs`)
  - On cancellation only buyer escrow was released; seller's `EscrowBalance` was left permanently inflated.
  - **Fix:** Also decrement `sellerWallet.EscrowBalance` in the cancellation transaction block.

- [x] **#4 — Dispute escrow resolution uses negative amount** (`DisputeController.cs`)
  - The Payment transaction's `Amount` is stored as `-package.Price` (a debit). Using it to credit wallets subtracted money instead of adding it.
  - **Fix:** Use `Math.Abs()` on the escrow transaction amount before distributing.

- [x] **#5 — AutoReleaseService targets wrong order status** (`AutoReleaseService.cs`)
  - Service queried for `Status == Completed && DeliveredAt != null`, but orders sit at `Delivered` awaiting buyer acceptance. The service never fired.
  - **Fix:** Query for `Status == Delivered` instead.

- [x] **#6 — Double complete-order paths with contradictory permissions** (`MarketplaceOpsController.cs`)
  - `PATCH /orders/{id}/status` said only the buyer can complete; `PUT /orders/{id}/complete` said only the seller can complete. Both triggered separate escrow releases.
  - **Fix:** `PUT /orders/{id}/complete` is now buyer-only (buyer accepting delivery = completion). `PUT /orders/{id}/deliver` remains seller-only. The `PATCH status` generic endpoint no longer handles the Completed transition itself to avoid double-release.

- [x] **#7 — Admin deposit approval missing authorization** (`WalletController.cs`)
  - `POST /wallet/admin/approve-deposit/{id}` had no `[Authorize]` attribute at all — any authenticated user could approve any deposit.
  - **Fix:** Added `[Authorize(Roles = "Admin")]`.

- [x] **#8 — Analytics returns platform fee as seller earnings** (`AnalyticsService.cs`)
  - `Earnings7Days/30Days` used `o.CommissionAmount` which is the platform's cut. Seller sees platform revenue as their own earnings.
  - **Fix:** Use `o.SellerAmount` instead.

- [x] **#9 — Double SaveChanges after inner transaction commit** (`MarketplaceOpsController.cs — UpdateOrderStatus`)
  - An unconditional `await _context.SaveChangesAsync()` at the end of `UpdateOrderStatus` fired even after the inner `using var transaction` block already committed, risking partial saves in error states.
  - **Fix:** Removed the trailing save; each branch now saves inside its own transaction.

---

## 🟠 Performance Issues

- [x] **#10 — No database indexes defined** (`AppDbContext.cs`)
  - Zero `HasIndex()` calls in `OnModelCreating`. Every email lookup, token lookup, and order query was a full table scan.
  - **Fix:** Added indexes on `Users.Email`, `RefreshTokens.Token`, `Profiles.UserId`, `Orders.(BuyerId, SellerId, Status)`, `Transactions.(WalletId, OrderId)`, `Gigs.(CategoryId, SellerId)`, `Notifications.UserId`, `SearchAnalytics.SearchTerm`.

- [x] **#11 — Rate limiter `_blockedIps` dictionary grows unbounded** (`RateLimitingMiddleware.cs`)
  - Static `ConcurrentDictionary` was never pruned. Expired entries accumulated forever.
  - **Fix:** Added a periodic cleanup sweep that removes entries whose block expiry has passed.

- [x] **#12 — Review average recalculated by loading all reviews into memory** (`MarketplaceOpsController.cs`)
  - `CreateReview` loaded every review for a gig and averaged them in C#.
  - **Fix:** Replaced with a single `AverageAsync` + `CountAsync` SQL aggregation.

- [x] **#13 — Search analytics race condition** (`MarketplaceController.cs`)
  - Read-then-increment pattern without row locking caused lost increments under concurrency.
  - **Fix:** Replaced with `ExecuteUpdateAsync` to do the increment atomically in a single SQL statement.

---

## 🟡 Missing / Incomplete Features

- [x] **#14 — NotificationService never pushes real-time events** (`NotificationService.cs`)
  - `CreateNotification` only wrote to DB. `IHubContext<NotificationHub>` was never used.
  - **Fix:** Injected `IHubContext<NotificationHub>` and added `SendAsync("ReceiveNotification", ...)` call after DB save.

- [x] **#15 — ChatHub does not create/update Conversation records** (`ChatHub.cs`)
  - `SendMessage` saved `Message` rows but never touched the `Conversation` table, making the conversation inbox unusable.
  - **Fix:** On first message between two users, a `Conversation` is created. On every message, `LastMessageText`, `LastMessageAt`, and per-user unread counts are updated.

- [x] **#16 — Duplicate service registrations in Program.cs** (`Program.cs`)
  - `TwoFactorAuthService` was registered twice; `WebhookVerificationService` was registered twice.
  - **Fix:** Removed duplicate lines.

- [x] **#17 — Add missing `Resolution` field to `Dispute` model** (`Dispute.cs`)
  - `DisputeController.ResolveDispute` set `dispute.Resolution` but the model was missing the `AdminNotes` field used across the controller.
  - *(Already present — verified clean. No change needed.)*

---

## ℹ️ Remaining / Out of Scope

- [ ] **Email delivery for 2FA** — `TwoFactorAuthService.SendVerificationCodeAsync` is still a stub. Requires SMTP/SES integration (separate task).
- [ ] **Email verification on registration** — No verified-email flag or token flow. Requires email service first.
- [ ] **Password reset flow** — Requires email service.
- [ ] **Payment gateway integration** — Deposits are manual approval only. Requires Stripe/PayPal integration.
- [ ] **Profile view & gig click tracking** — Still `0` in analytics. Requires event tracking system.
- [ ] **Delete backup files** — `MarketplaceController.cs.backup` and `.bak2` should be removed from the repo.
- [ ] **Auto-run migrations on startup** — `db.Database.Migrate()` is commented out. Should be re-enabled or moved to a deployment script.
