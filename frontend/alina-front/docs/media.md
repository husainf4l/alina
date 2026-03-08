# Media & File Service — Frontend Integration Guide

All files are stored in S3 and served through CloudFront CDN (`media.aqlaan.com`).
The backend handles all S3 credentials — the frontend never sees them.

---

## File Types & URL Formats

| Type | Examples | URL format | Expires? |
|---|---|---|---|
| **Public** | Avatars, cover photos, gig images | `https://media.aqlaan.com/public/...` | Never |
| **Private** | Order attachments, PDFs, videos | `/api/media/file/{id}` (proxied by Next.js) | No |

**Rule:** Use the `url` field from any API response directly. Never construct file URLs yourself.

---

## Profile Images

### Upload Avatar
```
POST /api/auth/me/avatar
Content-Type: multipart/form-data   ← let the browser set this (with boundary)
```
Field name: `file` — JPEG, PNG, GIF, WebP — max 5 MB

**Response:** `{ "avatar_url": "https://media.aqlaan.com/public/..." }`

### Upload Cover
```
POST /api/auth/me/cover
Content-Type: multipart/form-data
```
Field name: `file` — JPEG, PNG, GIF, WebP — max 10 MB

**Response:** `{ "cover_url": "https://media.aqlaan.com/public/..." }`

### Reading Profile Images

`GET /api/auth/me` and `GET /api/profiles/{userId}` return `avatarUrl` and `coverImageUrl`
as ready-to-use CDN URLs. Store them freely — they never expire.

```tsx
<img src={profile.avatarUrl} alt={profile.displayName} />
<img src={profile.coverImageUrl} alt="cover" />
```

> **After uploading**, call `refreshUser()` to pull the new URL into state.
> Do **not** reuse the old `avatarUrl` after an upload.

---

## General File Upload (Gig Images, Attachments)

```
POST /api/media/upload
Content-Type: multipart/form-data
```

**Optional query params:** `gigId` (UUID), `taskId` (UUID), `customOfferId` (int)

**Allowed types:**

| MIME type | Stored as |
|---|---|
| `image/jpeg`, `image/png`, `image/gif`, `image/webp`, `image/svg+xml` | Public → CDN URL |
| `application/pdf`, `video/mp4` | Private → proxy URL |

**Response:**
```json
{
  "id": "3fa85f64-...",
  "url": "https://media.aqlaan.com/public/media/abc123.jpg",
  "fileName": "photo.jpg",
  "fileType": "image/jpeg",
  "fileSize": 204800,
  "createdAt": "2026-03-08T12:00:00Z"
}
```

**Usage in components (always use `url` directly):**
```tsx
<img src={media.url} alt={media.fileName} />      // image
<a href={media.url} target="_blank">PDF</a>         // pdf
<video src={media.url} controls />                  // video
```

**Error codes:** `400` no file / profile not found · `401` unauthenticated · `415` type not allowed

---

## Delete a File

```
DELETE /api/media/{id}
```
Owner only. Returns `204 No Content`.

---

## Using with `apiClient`

```ts
// Upload — do NOT set Content-Type manually
const fd = new FormData();
fd.append("file", file);
const { data } = await apiClient.post("/api/media/upload", fd);
// data.url is the ready-to-use CDN or proxy URL

// Delete
await apiClient.delete(`/api/media/${id}`);
```

---

## `next/image` Remote Patterns (`next.config.ts`)

```ts
images: {
  remotePatterns: [
    {
      protocol: "https",
      hostname: "media.aqlaan.com",
      pathname: "/public/**",
    },
  ],
},
```

---

## Rules

| Do | Don't |
|---|---|
| Use `url` from the API response | Construct CDN URLs manually |
| Store public CDN URLs in state/cache | Assume public URLs will expire — they won't |
| Call `refreshUser()` after avatar/cover upload | Reuse the old `avatarUrl` after uploading |
| Let the browser set `Content-Type` on FormData | Pass `headers: { "Content-Type": "multipart/form-data" }` to axios |

---

## Environment

CDN base URL is `https://media.aqlaan.com` in all environments.
The `url` field in all API responses uses this domain — no frontend construction needed.
