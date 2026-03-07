# Media & Image Integration Guide (Alina Frontend)

The backend stores image **relative keys** in the database and resolves them to full URLs before returning them in API responses. The frontend always receives **complete absolute URLs** — it never handles raw storage paths.

---

## How It Works

```
Upload:  POST /api/auth/me/avatar  (form-data, field name: "file")
              ↓
         S3 stores: uploads/{userId}/avatars/{uuid}.png
              ↓
         DB stores: uploads/{userId}/avatars/{uuid}.png  (relative key)
              ↓
API GET /api/auth/me returns:
{
  "avatarUrl": "https://media.aqlaan.cloud/uploads/{userId}/avatars/{uuid}.png",
  "coverImageUrl": "https://media.aqlaan.cloud/uploads/{userId}/covers/{uuid}.png"
}
```

---

## Local Development Setup

### `.env.local` (Next.js)
```env
NEXT_PUBLIC_API_URL=http://192.168.1.66:5602
```

### `next.config.ts`
Add the backend hostname to `remotePatterns` so `next/image` can optimize local images:

```typescript
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      // Local dev — backend serves images directly
      {
        protocol: 'http',
        hostname: '192.168.1.66',
        port: '5602',
        pathname: '/uploads/**',
      },
      // Production CDN
      {
        protocol: 'https',
        hostname: 'media.aqlaan.cloud',
        pathname: '/uploads/**',
      },
    ],
  },
};

export default nextConfig;
```

> **Note**: During local development, `CdnBaseUrl` falls back to `BaseUrl` (`http://192.168.1.66:5602`), so image URLs point to the local backend's static file server.

---

## Production Setup

### `.env.production`
```env
NEXT_PUBLIC_API_URL=https://alina-backend.aqloon.cloud
```

Images are served from `https://media.aqlaan.cloud` (CloudFront CDN in front of S3).

See `docs/media-cdn.md` for the one-time AWS CloudFront + custom domain setup.

---

## Using Images in Next.js Components

Always use the `next/image` component with the `alt` attribute for SEO.

### Profile Avatar
```tsx
import Image from 'next/image';

<Image
  src={profile.avatarUrl ?? '/default-avatar.png'}
  alt={`${profile.displayName ?? profile.fullName} profile photo`}
  width={80}
  height={80}
  className="rounded-full object-cover"
/>
```

### Cover Image
```tsx
<Image
  src={profile.coverImageUrl ?? '/default-cover.jpg'}
  alt={`${profile.displayName}'s profile cover`}
  fill
  className="object-cover"
  priority  // Cover is likely an LCP element — load it with high priority
/>
```

### Gig Image
```tsx
<Image
  src={gig.imageUrl}
  alt={gig.title}  // Use the gig title — it's descriptive for SEO
  width={712}
  height={430}
  className="rounded-lg object-cover"
/>
```

---

## Uploading Images

Use `multipart/form-data` with the field name **`file`** (required by the backend).

```typescript
const uploadAvatar = async (file: File, accessToken: string) => {
  const formData = new FormData();
  formData.append('file', file); // ← must be 'file', not 'avatar'

  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/me/avatar`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    body: formData,
    credentials: 'include', // Send refresh_token cookie
  });

  const data = await response.json();
  return data.avatar_url; // Full resolved URL ready to use
};
```

| Endpoint | Purpose | Max Size |
|---|---|---|
| `POST /api/auth/me/avatar` | Upload profile avatar | 5 MB |
| `POST /api/auth/me/cover` | Upload profile cover image | 5 MB |

**Accepted formats**: JPEG, PNG, GIF, WebP

---

## SEO Best Practices for Images

1. **Always provide `alt` text** — use meaningful descriptions (name, gig title, etc.)
2. **Use `priority` on LCP images** — hero images, cover photos, above-the-fold content
3. **Use `fill` for flexible containers** — avoids layout shifts (CLS)
4. **Use `width`/`height` for fixed-size images** — avatars, thumbnails
5. **Provide fallbacks** — always have a default image if `avatarUrl` or `coverImageUrl` is null

---

## Environment Summary

| Environment | API URL | Image URLs |
|---|---|---|
| Local Dev | `http://192.168.1.66:5602` | `http://192.168.1.66:5602/uploads/...` |
| Production | `https://alina-backend.aqloon.cloud` | `https://media.aqlaan.cloud/uploads/...` |
