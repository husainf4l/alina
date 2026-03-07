# Media CDN Setup Guide (CloudFront + Custom Domain)

Our backend stores images as **relative S3 keys** (e.g. `uploads/{userId}/avatars/{uuid}.png`).  
The `AppSettings:CdnBaseUrl` in `appsettings.json` is the only thing that determines what the full public URL looks like.

**Current URL format:**
```
https://media.aqlaan.cloud/uploads/{userId}/avatars/{uuid}.png
```

---

## Why CloudFront + Custom Domain?

| Approach | URL | SEO | Speed | Cost |
|---|---|---|---|---|
| ❌ Raw S3 URL | `https://aqlaan.s3.amazonaws.com/...` | Poor (no branding) | Slow (single region) | - |
| ❌ Backend proxy | `https://api.aqlaan.cloud/media/...` | OK | Bottleneck | High (server load) |
| ✅ CloudFront + CDN | `https://media.aqlaan.cloud/...` | Best | ~15x faster globally | Low (CDN caching) |

---

## One-Time AWS Console Setup

### Step 1: Request an SSL Certificate (ACM)
> **IMPORTANT**: Must be done in `us-east-1` (N. Virginia) — CloudFront requires certificates from this region.

1. Go to **AWS Console → Certificate Manager → N. Virginia region**
2. Click **Request a certificate**
3. Add domain: `media.aqlaan.cloud`
4. Choose **DNS validation** and complete it in your DNS provider
5. Wait until status is **Issued**

### Step 2: Create CloudFront Distribution

1. Go to **CloudFront → Create distribution**
2. **Origin domain**: Select your S3 bucket `aqlaan`
3. **Origin access**: Choose **Origin access control settings (OAC)**
   - Create a new OAC and note the generated bucket policy statement
4. **Viewer protocol policy**: `Redirect HTTP to HTTPS`
5. **Cache policy**: `CachingOptimized` (AWS managed)
6. **Alternate domain names (CNAMEs)**: Add `media.aqlaan.cloud`
7. **Custom SSL certificate**: Select the cert you created in Step 1
8. Click **Create distribution** and copy the **CloudFront domain name** (e.g. `a1b2c3d4.cloudfront.net`)

### Step 3: Update the S3 Bucket Policy

After creating the distribution, AWS will show you a bucket policy to add. Go to:

**S3 → `aqlaan` → Permissions → Bucket policy** and paste:

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "AllowCloudFrontServicePrincipal",
      "Effect": "Allow",
      "Principal": {
        "Service": "cloudfront.amazonaws.com"
      },
      "Action": "s3:GetObject",
      "Resource": "arn:aws:s3:::aqlaan/*",
      "Condition": {
        "StringEquals": {
          "AWS:SourceArn": "arn:aws:cloudfront::{YOUR_ACCOUNT_ID}:distribution/{YOUR_DISTRIBUTION_ID}"
        }
      }
    }
  ]
}
```

> This means S3 is **NOT publicly open** — only CloudFront can read from it. Much more secure.

### Step 4: Add a DNS CNAME Record

In your DNS provider (or Route 53), add:

| Type | Name | Value |
|---|---|---|
| CNAME | `media` | `a1b2c3d4.cloudfront.net` |

This makes `media.aqlaan.cloud` point to your CloudFront distribution.

### Step 5: Update Backend Config

In `appsettings.json`:
```json
"AppSettings": {
  "CdnBaseUrl": "https://media.aqlaan.cloud"
}
```

This is **already set**. No code changes needed — just restart the backend.

---

## Result

After setup, all image URLs in API responses will look like:
```
https://media.aqlaan.cloud/uploads/{userId}/avatars/{uuid}.png
https://media.aqlaan.cloud/uploads/{userId}/covers/{uuid}.png
```

✅ SEO-friendly branded domain  
✅ Global CDN — ~15x faster delivery  
✅ S3 bucket stays private (only CloudFront can access)  
✅ HTTPS enforced  
✅ Zero code changes required — only `CdnBaseUrl` config value matters
