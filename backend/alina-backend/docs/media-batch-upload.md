# Multi-File Upload — Frontend Integration

## Endpoint

```
POST /api/media/upload/batch
Authorization: Bearer <token>
Content-Type: multipart/form-data
```

**Query params (all optional):**

| Param | Type | Use case |
|---|---|---|
| `gigId` | UUID | Attach images to a gig |
| `taskId` | UUID | Attach to a task |
| `customOfferId` | int | Attach to a custom offer |

**Limits:** Max **10 files** per request. Images only (JPEG, PNG, GIF, WebP, SVG).

---

## Response

```json
{
  "succeeded": [
    {
      "id": "uuid",
      "url": "https://media.aqlaan.com/public/media/abc123.jpg",
      "fileName": "photo.jpg",
      "fileType": "image/jpeg",
      "fileSize": 204800,
      "createdAt": "2026-03-08T12:00:00Z"
    }
  ],
  "failed": [
    {
      "fileName": "document.pdf",
      "reason": "Only image types are allowed in batch upload"
    }
  ]
}
```

A `200 OK` is returned even if some files fail — always check `failed[]`.

---

## TypeScript Helper

```ts
async function uploadGigImages(files: File[], token: string, gigId: string) {
  const form = new FormData();

  // All files must use the field name "files"
  files.forEach(file => form.append('files', file));

  const res = await fetch(`${API_BASE}/api/media/upload/batch?gigId=${gigId}`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${token}` },
    // Do NOT set Content-Type manually — browser sets it with the boundary
    body: form,
  });

  if (!res.ok) throw new Error(await res.text());

  const { succeeded, failed } = await res.json();

  // Array of permanent CDN URLs — safe to store and cache
  const urls: string[] = succeeded.map((m: any) => m.url);

  if (failed.length > 0) {
    console.warn('Some files failed:', failed);
  }

  return { urls, failed };
}
```

---

## React Component Example

```tsx
function GigImageUploader({ gigId, token }: { gigId: string; token: string }) {
  const [urls, setUrls] = useState<string[]>([]);
  const [errors, setErrors] = useState<{ fileName: string; reason: string }[]>([]);
  const [loading, setLoading] = useState(false);

  async function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const files = Array.from(e.target.files ?? []);
    if (files.length === 0) return;
    if (files.length > 10) return alert('Max 10 images at a time');

    setLoading(true);
    try {
      const { urls: newUrls, failed } = await uploadGigImages(files, token, gigId);
      setUrls(prev => [...prev, ...newUrls]);
      setErrors(failed);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <input
        type="file"
        multiple
        accept="image/jpeg,image/png,image/gif,image/webp,image/svg+xml"
        onChange={handleChange}
        disabled={loading}
      />

      {loading && <p>Uploading...</p>}

      {errors.length > 0 && (
        <ul style={{ color: 'red' }}>
          {errors.map(e => (
            <li key={e.fileName}>{e.fileName}: {e.reason}</li>
          ))}
        </ul>
      )}

      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
        {urls.map(url => (
          <img key={url} src={url} style={{ width: 120, height: 120, objectFit: 'cover' }} />
        ))}
      </div>
    </div>
  );
}
```

---

## Error Responses

| Status | Meaning |
|---|---|
| `400` | No files sent, or more than 10 files |
| `401` | Not authenticated |
| `200` with `failed[]` non-empty | Some files rejected (wrong type, corrupt, etc.) |

---

## Rules

| Do | Don't |
|---|---|
| Use field name `files` for all files | Use `file` (singular) — that's the single-upload endpoint |
| Let browser set `Content-Type` | Set `Content-Type: multipart/form-data` manually |
| Check `failed[]` and show per-file errors | Assume all files succeeded because status is `200` |
| Store `succeeded[].url` — it's a permanent CDN URL | Re-fetch or re-upload the same file |
| Send max 10 files per call | Send more — backend rejects with `400` |
