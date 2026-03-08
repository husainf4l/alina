# Alina Frontend — UX/UI System Audit
> Generated: 2026-03-08 | Stack: Next.js 16, React 19, TypeScript, TailwindCSS v4, next-intl

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 16 (App Router) |
| UI | React 19, TailwindCSS v4 |
| Language | TypeScript |
| i18n | next-intl (EN / AR + RTL) |
| Auth | JWT (in-memory) + HttpOnly refresh cookie |
| State | React Context (no Redux/Zustand) |
| Icons | lucide-react |
| Fonts | Plus Jakarta Sans, Instrument Serif, Noto Sans Arabic |
| Images | Next.js Image + AWS CloudFront CDN |
| OAuth | @react-oauth/google |
| Theming | next-themes (dark/light/system) |

---

## Route Map

```
/[locale]
├── /                        ✅ Home
├── /about                   ✅ About
├── /services                ⚠️  Listing (filters incomplete)
├── /services/[id]           ✅ Gig detail (no checkout link)
├── /contact                 ✅ Contact form
├── /auth                    ✅ Login / Register / Google OAuth
├── /onboarding              ⚠️  Exists, flow unclear
└── /dashboard               🔒 Protected
    ├── /                    ✅ Overview / stats
    ├── /profile             ✅ Edit profile
    ├── /gigs                ✅ My gigs list
    │   ├── /create          ✅ 3-step create form
    │   └── /[id]/edit       ✅ Edit gig
    ├── /orders              ⚠️  Listing only (no actions)
    ├── /messages            ⚠️  Basic chat (polling, no attachments)
    ├── /wallet              ⚠️  Balance view (no withdrawal)
    ├── /notifications       ✅ Feed with mark-as-read
    └── /settings            ⚠️  Missing security tab
```

Legend: ✅ Complete &nbsp; ⚠️ Partial &nbsp; ❌ Missing

---

## Design System

### Brand Colors
| Token | Value | Usage |
|-------|-------|-------|
| Primary | `#c71463` | Buttons, links, accents |
| Secondary | `#B05088` | Muted highlights |
| Success | `#3E9666` | Confirmations, badges |
| Error | Tailwind `red-*` | Validation, alerts |
| Neutral | Tailwind `gray-*` | Text, borders, backgrounds |

### Typography
| Font | Usage |
|------|-------|
| Plus Jakarta Sans | Body text, UI labels |
| Instrument Serif | Display headings |
| Geist Mono | Code snippets |
| Noto Sans Arabic | RTL Arabic content |

### Component Patterns
- **Cards:** `rounded-xl` / `rounded-2xl` with border + shadow
- **Buttons:** CVA-based variants — `default`, `outline`, `secondary`, `ghost`, `destructive`, `link`
- **Inputs:** Icon prefix, focus ring, error state in red
- **Loading:** `animate-pulse` skeletons + `animate-spin` Loader2
- **Spacing:** 4px base Tailwind scale
- **Responsive:** Mobile-first (`sm:` / `md:` / `lg:` / `xl:`)

### Dark Mode
- Implemented via `next-themes` with `class` strategy
- `dark:` prefix throughout all components
- System preference auto-detection
- Persisted in localStorage

---

## Page-by-Page UX Audit

### Home (`/`)
**Status: ✅ Good**

What's there:
- Hero with search bar
- Featured categories grid
- How It Works steps
- Trending gigs carousel
- Top Freelancers cards
- Testimonials carousel
- CTA Banner + WhyAlina section

Missing / Improvements:
- [ ] Hero search should route to `/services?q=...`
- [ ] Popular search chips should be clickable with pre-filled queries
- [ ] "View all" links on carousels should be styled consistently

---

### Auth (`/auth`)
**Status: ✅ Good**

What's there:
- Tab switcher (Login / Register)
- Email + password fields with visibility toggle
- Google OAuth button
- Animated photo carousel on side panel
- Error message display

Missing / Improvements:
- [ ] **Forgot password link** — no reset flow
- [ ] Email verification notice after register
- [ ] Redirect back to intended URL after login (return URL)
- [ ] "Remember me" checkbox
- [ ] Loading spinner on OAuth button during redirect

---

### Onboarding (`/onboarding`)
**Status: ⚠️ Incomplete**

Missing / Improvements:
- [ ] Role selection (buyer / seller / both) with visual cards
- [ ] Category interest selection
- [ ] Profile photo upload prompt
- [ ] Skills entry (for sellers)
- [ ] Profile completion progress bar
- [ ] Skip option with clear CTA

---

### Services (`/services`)
**Status: ⚠️ Partial**

What's there:
- Basic gig listing

Missing / Improvements:
- [ ] Filter sidebar: price range, delivery time, seller level, rating
- [ ] Sort dropdown: Most Popular, Newest, Price Low/High
- [ ] Search bar at top of page
- [ ] Pagination controls
- [ ] Active filter chips/tags to clear filters
- [ ] Empty state with helpful message + CTA
- [ ] Results count label ("Showing 24 of 150 results")
- [ ] Category breadcrumb

---

### Gig Detail (`/services/[id]`)
**Status: ✅ Good**

What's there:
- Package selection cards
- Gallery viewer
- Seller info card
- Average rating display
- Breadcrumb

Missing / Improvements:
- [ ] **"Order Now" must route to a checkout page**
- [ ] "Contact Seller" button opens a message thread
- [ ] Share gig (copy link, social share)
- [ ] Save/Bookmark gig (buyer wishlist)
- [ ] Individual reviews list below gig
- [ ] Related gigs section at bottom
- [ ] Delivery countdown / estimated delivery date

---

### Dashboard Overview (`/dashboard`)
**Status: ✅ Good**

What's there:
- Stats cards (gigs, orders, earnings, rating)
- Recent activity feed

Missing / Improvements:
- [ ] Quick action buttons (Create Gig, View Orders, Check Messages)
- [ ] Profile completion progress bar with % and next steps
- [ ] Earnings chart (time series — last 30/90 days)
- [ ] Pending action alerts (deliver by date X, unread messages)

---

### Profile (`/dashboard/profile`)
**Status: ✅ Good**

What's there:
- Avatar + cover photo upload with preview
- DisplayName, Bio, Role selection
- Save button with feedback

Missing / Improvements:
- [ ] Skills management (add/remove tags)
- [ ] Languages spoken
- [ ] Portfolio links / external URLs
- [ ] Social media links (LinkedIn, GitHub, etc.)
- [ ] "Preview as public profile" button
- [ ] Profile completion checklist

---

### My Gigs (`/dashboard/gigs`)
**Status: ✅ Good**

What's there:
- Gig cards with main image, title, status badge, rating, price
- Edit / View / Toggle active buttons

Missing / Improvements:
- [ ] Per-gig performance stats (views, clicks, orders)
- [ ] Duplicate gig action
- [ ] Delete gig with confirmation dialog
- [ ] Sort/filter my gigs
- [ ] Bulk actions (deactivate all, delete selected)
- [ ] Empty state with "Create your first gig" CTA

---

### Create Gig (`/dashboard/gigs/create`)
**Status: ✅ Good**

What's there:
- 3-step form: Basics → Details → Media
- Category + subcategory dropdowns
- Gallery upload (max 5 images)

Missing / Improvements:
- [ ] Visual step progress bar (not just text)
- [ ] Rich text editor for description (bold, bullets, links)
- [ ] Requirements from buyer field
- [ ] FAQ section (Q&A pairs)
- [ ] Save as draft
- [ ] SEO title preview
- [ ] Image upload progress bar
- [ ] Dirty form warning on navigation away

---

### Edit Gig (`/dashboard/gigs/[id]/edit`)
**Status: ✅ Good**

Missing (same as create):
- [ ] Rich text editor
- [ ] Dirty form warning
- [ ] Save as draft
- [ ] Preview mode

---

### Orders (`/dashboard/orders`)
**Status: ⚠️ Partial**

What's there:
- Status tabs (All / Pending / InProgress / Delivered / Completed / Cancelled / Disputed)
- Order table with buyer/seller, amount, deadline
- Basic modal preview

Missing / Improvements:
- [ ] **Seller: "Deliver Work" button** with file upload
- [ ] **Buyer: "Request Revision" button** with note
- [ ] **Buyer: "Mark as Complete" button** → triggers review prompt
- [ ] **Dispute button** on active orders
- [ ] Cancel order with reason selection
- [ ] Download delivery attachments
- [ ] Order timeline / status history
- [ ] Deadline countdown (X days left)
- [ ] Confirmation dialogs for all destructive actions

---

### Messages (`/dashboard/messages`)
**Status: ⚠️ Basic**

What's there:
- Conversation list with search
- Message thread view
- Text message sending
- Polling every 5 seconds

Missing / Improvements:
- [ ] **WebSocket** instead of polling (real-time)
- [ ] File / image attachment sending
- [ ] Read receipts (double checkmarks)
- [ ] Typing indicator ("Seller is typing...")
- [ ] Message search within thread
- [ ] Block / report user
- [ ] Create custom offer from conversation
- [ ] Emoji picker
- [ ] Message timestamps (grouped by day)
- [ ] "No conversations yet" empty state

---

### Wallet (`/dashboard/wallet`)
**Status: ⚠️ Partial**

What's there:
- Available balance card
- Escrow balance card
- Transaction history list with filter

Missing / Improvements:
- [ ] **Withdraw funds button** → withdrawal flow (bank/PayPal/etc.)
- [ ] Payment method management
- [ ] Earnings chart (last 30/90/365 days)
- [ ] Export transactions as CSV
- [ ] Filter by type (credit / debit / escrow)
- [ ] Pending payouts section
- [ ] Add funds flow (top-up)

---

### Notifications (`/dashboard/notifications`)
**Status: ✅ Good**

What's there:
- Notification feed with icons by type
- Mark single / mark all as read

Missing / Improvements:
- [ ] Filter by type (orders, messages, payments, system)
- [ ] Click-through navigates to relevant page
- [ ] Real-time push via WebSocket
- [ ] Notification dot on sidebar icon (real-time count)
- [ ] "No notifications" empty state

---

### Settings (`/dashboard/settings`)
**Status: ⚠️ Partial**

What's there:
- General tab (language, timezone, currency)
- Notifications tab (email, push, SMS toggles)
- Privacy tab (visibility, showEmail, showPhone, activityStatus)

Missing / Improvements:
- [ ] **Security tab:** Change password, 2FA setup/manage
- [ ] **Connected accounts:** Show Google link status, disconnect option
- [ ] **Danger zone:** Delete account with confirmation
- [ ] Billing tab: payment methods, saved cards
- [ ] Save confirmation feedback per section

---

## Global UX Issues

| Issue | Priority | Fix |
|-------|----------|-----|
| No global toast system | P1 | Add react-hot-toast or Sonner |
| No error boundaries | P1 | Wrap routes in `<ErrorBoundary>` |
| Inconsistent loading states | P2 | Standardize skeleton vs spinner usage |
| No empty states with CTAs | P2 | Add per-component empty state UI |
| No breadcrumb navigation | P2 | Add breadcrumb on all inner pages |
| No dirty form warning | P2 | Use `useBeforeUnload` hook |
| No session expiry warning | P2 | Show modal 5 min before token expires |
| No confirmation dialogs | P1 | Add for all destructive actions |
| Chat polling (5s) | P2 | Migrate to SignalR WebSocket |
| No upload progress bars | P3 | Add progress indicator on image uploads |
| No offline detection | P3 | Show banner when network drops |

---

## Missing Critical Flows (Priority Order)

| # | Feature | Priority | Notes |
|---|---------|----------|-------|
| 1 | Checkout / Order Placement | P0 | Blocking all revenue |
| 2 | Password Reset | P0 | Users locked out permanently |
| 3 | Email Verification | P0 | Security risk |
| 4 | Seller: Deliver Work | P0 | Core platform function |
| 5 | Buyer: Request Revision + Complete | P0 | Core platform function |
| 6 | Post-delivery Review Submission | P1 | Trust & safety |
| 7 | Withdrawal Flow | P1 | Sellers can't get paid |
| 8 | Advanced Search & Filters | P1 | Discovery blocked |
| 9 | Dispute Creation UI | P2 | Conflict resolution |
| 10 | Seller Analytics Charts | P2 | Seller retention |
| 11 | 2FA Setup UI | P2 | Security |
| 12 | Skills / Portfolio on Profile | P2 | Seller completeness |
| 13 | Public Seller Profile Page | P2 | Trust building |
| 14 | WebSocket for Messages | P2 | Real-time UX |
| 15 | Admin Dashboard | P3 | Platform management |

---

## Recommended Sprint Plan

### Sprint 1 — Launch Blockers
- [ ] Checkout page → order placement
- [ ] Password reset flow (forgot password + reset token page)
- [ ] Email verification on signup
- [ ] Seller: deliver work in order detail (file upload + message)
- [ ] Buyer: mark complete + review submission modal

### Sprint 2 — Quality of Life
- [ ] Advanced search/filter on `/services`
- [ ] Withdrawal flow in wallet
- [ ] Skills + portfolio section on profile
- [ ] Global toast notification system (Sonner)
- [ ] Dispute creation UI from order detail
- [ ] Dirty form warning hook

### Sprint 3 — Growth & Retention
- [ ] Seller analytics charts (earnings time series)
- [ ] Public seller profile page `/sellers/[id]`
- [ ] 2FA setup in Security settings tab
- [ ] WebSocket migration for messages (SignalR)
- [ ] Admin dashboard
- [ ] Mobile app (React Native or Expo)
