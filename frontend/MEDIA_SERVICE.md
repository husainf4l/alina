# Media & File Service — Frontend Integration Guide

## How It Works

All files are stored in S3 and served through CloudFront CDN (`media.aqlaan.com`).
The backend handles all S3 credentials — the frontend never sees them.

There are two types of files:

| Type | Examples | URL format | Expires? |
|---|---|---|---|
| **Public** | Avatars, cover photos, gig images | `https://media.aqlaan.com/public/...` | Never |
| **Private** | Order attachments, PDFs, videos | `https://api.yourapp.com/api/media/file/{id}` | No (proxy) |

**Rule:** Use the `url` field from any API response directly. Never construct file URLs yourself.

---

## Profile Images

### Upload Avatar

```
POST /api/auth/me/avatar
Authorization: Bearer <token>
Content-Type: multipart/form-data
```

| Field | Type | Limit |
|---|---|---|
| `file` | File | JPEG, PNG, GIF, WebP — max 5 MB |

**Response:**
```json
{
  "avatar_url": "https://media.aqlaan.com/public/user-id/avatars/abc123.jpg"
}
```

**Example:**
```ts
async function uploadAvatar(file: File, token: string) {
  const form = new FormData();
  form.append('file', file);

  const res = await fetch(`${API_BASE}/api/auth/me/avatar`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${token}` },
    body: form,
    // Do NOT set Content-Type manually — browser sets it with the boundary
  });

  if (!res.ok) throw new Error(await res.text());
  const { avatar_url } = await res.json();
  return avatar_url; // permanent CDN URL, safe to cache
}
```

---

### Upload Cover Image

```
POST /api/auth/me/cover
Authorization: Bearer <token>
Content-Type: multipart/form-data
```

| Field | Type | Limit |
|---|---|---|
| `file` | File | JPEG, PNG, GIF, WebP — max 10 MB |

**Response:**
```json
{
  "cover_url": "https://media.aqlaan.com/public/user-id/covers/xyz789.jpg"
}
```

---

### Reading Profile Images

When you call `GET /api/auth/me` or `GET /api/profiles/{userId}`, the `avatarUrl` and `coverImageUrl` fields already contain ready-to-use CDN URLs.

```tsx
<img src={profile.avatarUrl} alt={profile.displayName} />
<img src={profile.coverImageUrl} alt="cover" />
```

These URLs are **permanent** — you can store them in state, localStorage, or a cache indefinitely.

---

## General File Upload (Gig Images, Attachments)

```
POST /api/media/upload
Authorization: Bearer <token>
Content-Type: multipart/form-data
```

**Query params (all optional):**

| Param | Type | Description |
|---|---|---|
| `gigId` | UUID | Link file to a gig |
| `taskId` | UUID | Link file to a task |
| `customOfferId` | int | Link file to a custom offer |

**Allowed file types:**

| MIME type | Visibility |
|---|---|
| `image/jpeg`, `image/png`, `image/gif`, `image/webp`, `image/svg+xml` | Public → CDN URL |
| `application/pdf`, `video/mp4` | Private → proxy URL |

**Response:**
```json
{
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "url": "https://media.aqlaan.com/public/media/abc123.jpg",
  "fileName": "photo.jpg",
  "fileType": "image/jpeg",
  "fileSize": 204800,
  "createdAt": "2026-03-08T12:00:00Z"
}
```

For private files (PDF/video), `url` will be:
```
https://api.yourapp.com/api/media/file/3fa85f64-...
```

**Example:**
```ts
async function uploadFile(file: File, token: string, gigId?: string) {
  const form = new FormData();
  form.append('file', file);

  const url = new URL(`${API_BASE}/api/media/upload`);
  if (gigId) url.searchParams.set('gigId', gigId);

  const res = await fetch(url.toString(), {
    method: 'POST',
    headers: { Authorization: `Bearer ${token}` },
    body: form,
  });

  if (!res.ok) throw new Error(await res.text());
  return await res.json(); // { id, url, fileName, fileType, fileSize, createdAt }
}
```

**Displaying the file:**
```tsx
// Works for both public (CDN) and private (proxy) — just use url directly
<img src={media.url} alt={media.fileName} />

// For PDFs
<a href={media.url} target="_blank">View Document</a>

// For videos
<video src={media.url} controls />
```

**Error responses:**

| Status | Meaning |
|---|---|
| `400` | No file / profile not found |
| `401` | Not authenticated |
| `415` | File type not allowed or file content doesn't match type |

---

## Delete a File

```
DELETE /api/media/{id}
Authorization: Bearer <token>
```

Only the file owner can delete. Returns `204 No Content`.

```ts
async function deleteFile(id: string, token: string) {
  const res = await fetch(`${API_BASE}/api/media/${id}`, {
    method: 'DELETE',
    headers: { Authorization: `Bearer ${token}` },
  });

  if (res.status === 204) return; // deleted
  throw new Error(await res.text());
}
```

---

## Displaying Files — Quick Reference

```tsx
// Avatar
<img src={profile.avatarUrl} />

// Cover
<img src={profile.coverImageUrl} />

// Any uploaded media (image, pdf, video)
<img src={media.url} />          // images
<a href={media.url}>PDF</a>      // pdf
<video src={media.url} controls /> // video
```

**That's it.** Always use the `url` field from the API response — never build the URL yourself.

---

## Rules

| Do | Don't |
|---|---|
| Use `url` from API response directly | Construct `cloudfront.net/...` URLs manually |
| Store public CDN URLs in local state/cache | Assume any URL will expire — public ones won't |
| Re-fetch profile to get fresh `avatarUrl` after upload | Use the old `avatarUrl` after uploading a new avatar |
| Let the browser set `Content-Type` on FormData | Set `Content-Type: multipart/form-data` manually |

---

## Environment

| Environment | CDN Base URL |
|---|---|
| Development & Production | `https://media.aqlaan.com` |
