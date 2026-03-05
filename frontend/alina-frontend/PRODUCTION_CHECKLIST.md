# 🚀 Production Deployment Checklist
**Last Updated:** March 5, 2026

## 📋 Pre-Deployment Configuration

### ✅ Environment Variables (.env.production)

Create `.env.production` file with:

```bash
# API Configuration
NEXT_PUBLIC_API_URL=https://api.yourdomain.com/api
NEXT_PUBLIC_API_TIMEOUT=30000

# Google OAuth
NEXT_PUBLIC_GOOGLE_CLIENT_ID=your-production-google-client-id.apps.googleusercontent.com

# Environment
NODE_ENV=production
NEXT_PUBLIC_ENVIRONMENT=production

# Feature Flags
NEXT_PUBLIC_ENABLE_2FA=true
NEXT_PUBLIC_ENABLE_ANALYTICS=true
NEXT_PUBLIC_ENABLE_NOTIFICATIONS=true
NEXT_PUBLIC_ENABLE_GOOGLE_AUTH=true

# Analytics
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
NEXT_PUBLIC_HOTJAR_ID=XXXXXXX

# Error Monitoring
NEXT_PUBLIC_SENTRY_DSN=https://xxx@xxx.ingest.sentry.io/xxx
SENTRY_AUTH_TOKEN=xxx
```

### ✅ Backend CORS Configuration

Update `apps/alina/backend/alina-backend/Program.cs` line 26-41:

**Current (Development):**
```csharp
policy.WithOrigins(
    "http://149.200.251.12", 
    "https://149.200.251.12", 
    "http://149.200.251.14", 
    "https://149.200.251.14", 
    "https://alina-backend.aqloon.cloud",
    "http://localhost:5602",
    "http://192.168.1.66:5602",
    "http://localhost:3000",
    "http://localhost:3001",
    "http://192.168.1.66:3000"
)
```

**Production (Add your domain):**
```csharp
policy.WithOrigins(
    // Production domains
    "https://yourdomain.com",
    "https://www.yourdomain.com",
    "https://api.yourdomain.com",
    
    // Staging/Testing (if needed)
    "https://staging.yourdomain.com",
    
    // Development (remove in production for security)
    "http://localhost:3000",
    "http://localhost:3001"
)
```

### ✅ Security Headers

Already configured in `next.config.ts` ✅  
Review and ensure CSP allows your production domains.

### ✅ Database

- [ ] Production database connection string configured
- [ ] Database migrations run
- [ ] Database backups automated
- [ ] Connection pooling optimized
- [ ] SSL/TLS enabled for database connections

### ✅ File Storage

- [ ] Cloud storage configured (AWS S3/Cloudinary)
- [ ] Upload limits configured
- [ ] CDN configured for static assets
- [ ] Virus scanning enabled (ClamAV)

### ✅ Authentication

- [ ] JWT secrets rotated for production
- [ ] RSA keys generated for production
- [ ] Session timeout configured
- [ ] Cookie domain set to production domain
- [ ] HTTPS enforced for cookies

### ✅ Payment Integration

- [ ] Stripe production keys configured
- [ ] Webhook endpoints configured
- [ ] Webhook secrets set
- [ ] Payment flow tested in production mode

### ✅ Monitoring & Logging

- [ ] Sentry initialized
- [ ] Google Analytics configured
- [ ] Error alerting setup
- [ ] Log aggregation configured
- [ ] Uptime monitoring setup (UptimeRobot/Pingdom)

### ✅ Performance

- [ ] Next.js production build tested
- [ ] Bundle size optimized
- [ ] Images optimized
- [ ] CDN configured
- [ ] Caching strategy implemented
- [ ] Redis configured (if using)

### ✅ SEO

- [ ] Sitemap.xml generated
- [ ] robots.txt configured
- [ ] Meta tags for all pages
- [ ] Open Graph images
- [ ] Canonical URLs set

### ✅ Testing

- [ ] End-to-end tests passed
- [ ] Load testing completed
- [ ] Security audit completed
- [ ] Accessibility audit passed (WCAG AA)

## 🚀 Deployment Steps

1. **Build Frontend:**
   ```bash
   cd apps/alina/frontend/alina-frontend
   npm run build
   npm start
   ```

2. **Deploy Backend:**
   ```bash
   cd apps/alina/backend/alina-backend
   dotnet publish -c Release
   ```

3. **Update DNS:**
   - Point domain to hosting server
   - Configure SSL certificates (Let's Encrypt)

4. **Smoke Test:**
   - [ ] Homepage loads
   - [ ] Login/Register works
   - [ ] Protected routes redirect
   - [ ] Payment flow works
   - [ ] Real-time features work
   - [ ] Error monitoring capturing errors

## 📊 Post-Deployment

- [ ] Monitor error rates
- [ ] Check performance metrics
- [ ] Verify analytics tracking
- [ ] Test email delivery
- [ ] Test payment webhooks
- [ ] Monitor database performance
- [ ] Check CDN hit rates

## 🔄 Rollback Plan

If issues occur:
1. Revert to previous deployment
2. Check logs in monitoring dashboard
3. Fix issues in staging
4. Re-deploy with fixes

---

**Status:** 📝 Ready for configuration  
**Next Action:** Configure production environment variables
