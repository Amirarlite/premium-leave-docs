# 🌩️ Cloudflare Pages Deployment Guide

**Fastest, free, global CDN** for your Premium Leave Docs.

---

## ⚡ Quick Deploy (2 Minutes)

### Option 1: GitHub Integration (Recommended)

1. **Login to Cloudflare Dashboard:**
   ```
   https://dash.cloudflare.com/pages
   ```

2. **Connect GitHub:**
   - Click: "Create a project"
   - Select: "Connect to Git"
   - Choose repository: `Amirarlite/premium-leave-docs`
   - Click: "Begin setup"

3. **Configure Build:**
   ```
   Framework preset: Vite
   Build command: pnpm run build
   Build output directory: dist/public
   Root directory: client
   ```

4. **Deploy:**
   - Click: "Save and Deploy"
   - Wait ~2 minutes
   - **URL:** `https://premium-leave-docs.pages.dev`

### Option 2: Wrangler CLI

```bash
# 1. Install Wrangler
npm install -g wrangler

# 2. Login to Cloudflare
wrangler login

# 3. Build project
pnpm run build

# 4. Deploy to preview
wrangler pages deploy dist/public --project-name=premium-leave-docs

# 5. Deploy to production
wrangler pages deploy dist/public --project-name=premium-leave-docs --branch=main
```

**URL:** `https://premium-leave-docs.pages.dev`

---

## 🎯 Why Cloudflare Pages?

| Feature | Cloudflare | GitHub Pages | Vercel |
|---------|-----------|--------------|--------|
| **Build Minutes** | Unlimited | Unlimited | 6,000/mo |
| **Bandwidth** | Unlimited | 100 GB/mo | 100 GB/mo |
| **Global CDN** | ✅ 275+ locations | ✅ Limited | ✅ 100+ |
| **Build Speed** | ⚡ Fastest | 🐌 Slow | ⚡ Fast |
| **Preview Deploys** | ✅ Unlimited | ❌ None | ✅ Limited |
| **Custom Domains** | ✅ Free SSL | ✅ Free SSL | ✅ Free SSL |
| **Environment Variables** | ✅ Unlimited | ❌ None | ✅ Limited |
| **Analytics** | ✅ Free | ❌ None | ✅ Paid |
| **China Access** | ⚠️ Partial | ❌ Blocked | ⚠️ Partial |

---

## 🔧 Configuration

### wrangler.toml

Already configured! See `wrangler.toml` in root.

### Environment Variables

Set in Cloudflare Dashboard → Settings → Environment Variables:

```
VITE_COMPANY_NAME = Your Organization
VITE_SUPPORT_EMAIL = support@example.com
VITE_BASE_PATH = /
NODE_ENV = production
```

---

## 🚀 Auto-Deploy with GitHub Actions

Already configured in `.github/workflows/cloudflare-deploy.yml`

### Setup:

1. **Get Cloudflare API Token:**
   - Go to: https://dash.cloudflare.com/profile/api-tokens
   - Create token: "Edit Cloudflare Pages"
   - Copy token

2. **Add GitHub Secrets:**
   ```bash
   # In GitHub repo: Settings → Secrets and variables → Actions
   
   CLOUDFLARE_API_TOKEN = your_token_here
   CLOUDFLARE_ACCOUNT_ID = your_account_id
   ```

3. **Push to main:**
   ```bash
   git push origin main
   ```

4. **Auto-deploy happens!**
   - Check: Actions tab
   - URL in deployment summary

---

## 🌐 Custom Domain

### In Cloudflare Dashboard:

1. Go to: Pages → Your Project → Custom Domains
2. Click: "Set up a custom domain"
3. Enter: `leave.yourdomain.com` or `www.yourdomain.com`
4. Follow DNS instructions

### DNS Records:

```
Type: CNAME
Name: leave (or www)
Content: premium-leave-docs.pages.dev
Proxy: Enabled (orange cloud)
```

**SSL:** Automatic, renews forever

---

## 📊 Performance

### Expected Metrics:

- **First Contentful Paint:** < 1s
- **Time to Interactive:** < 2s
- **Lighthouse Score:** 95-100
- **Global Latency:** < 50ms (from most locations)

### Optimization Tips:

1. ✅ **Already implemented:**
   - Asset minification
   - Code splitting
   - Image optimization
   - Cache headers

2. **Optional enhancements:**
   - Enable Cloudflare Images
   - Add Cloudflare Analytics
   - Configure Cache Rules

---

## 🛡️ Security

### Automatic:

- ✅ HTTPS (TLS 1.3)
- ✅ DDoS protection
- ✅ Bot management
- ✅ Automatic HTTPS redirects

### Manual (Recommended):

1. **Enable Waiting Room:**
   - For high-traffic launches
   - Pages → Your Project → Waiting Room

2. **Add Rate Limiting:**
   - Already in server/index.ts
   - Cloudflare WAF rules (Dashboard → Security → WAF)

3. **Security Headers:**
   - Already configured in server/index.ts
   - Cloudflare adds additional headers

---

## 📈 Monitoring

### Cloudflare Analytics:

1. **Dashboard:** Pages → Your Project → Analytics
2. **Metrics:**
   - Requests
   - Bandwidth
   - Errors
   - Cache hit ratio

### Real User Monitoring:

```bash
# Enable Cloudflare Web Analytics
# Dashboard → Analytics & Logs → Web Analytics
```

### Alerts:

```bash
# Setup in Dashboard:
Settings → Notifications → Create notification

Recommended alerts:
- Build failures
- High error rate (> 5%)
- Downtime detection
```

---

## 🐛 Troubleshooting

### Build Fails

**Error:** `Build failed with exit code 1`

**Solution:**
```bash
# Test build locally
pnpm run build

# Check Node version
node --version  # Should be 20+

# Clear cache
pnpm clean
pnpm install
pnpm run build
```

### 404 on Refresh

**Cause:** SPA routing

**Solution:** Already fixed in vite.config.ts with proper base path.

If issues persist, create `public/_routes.json`:
```json
{
  "version": 1,
  "include": ["/*"],
  "exclude": ["/assets/*"]
}
```

### Custom Domain Not Working

**Check:**
1. DNS propagation (use: https://dnschecker.org)
2. SSL certificate status (Dashboard → SSL/TLS)
3. Custom domain configuration

**Fix:**
```bash
# In Cloudflare Dashboard:
# 1. Remove custom domain
# 2. Re-add it
# 3. Wait 5 minutes for SSL
```

---

## 💰 Pricing

### Free Tier (What You Get):

- ✅ **Unlimited** requests
- ✅ **Unlimited** bandwidth
- ✅ **Unlimited** build minutes
- ✅ **500** builds/month
- ✅ **1** team member
- ✅ **Custom domains** (unlimited)
- ✅ **Analytics** (basic)

### Paid Tier ($5/month):

- **5,000** builds/month
- **5** team members
- **Advanced analytics**
- **Priority support**

**Verdict:** Free tier is perfect for this project!

---

## 🎯 Comparison with Other Platforms

### vs GitHub Pages:

**Cloudflare Wins:**
- ⚡ Faster builds (2 min vs 10 min)
- 🌍 Better global CDN
- 📊 Built-in analytics
- 🔒 Better security
- 🎨 Preview deployments

**GitHub Pages Wins:**
- Simpler setup (if already on GitHub)

### vs Vercel:

**Cloudflare Wins:**
- 💰 Free unlimited bandwidth
- ⚡ Faster edge network
- 🛡️ Better DDoS protection

**Vercel Wins:**
- Better framework detection
- More integrations

### vs Netlify:

**Cloudflare Wins:**
- Faster CDN
- Better pricing
- Superior security

**Netlify Wins:**
- Better form handling
- More plugins

---

## 📞 Support

- **Cloudflare Docs:** https://developers.cloudflare.com/pages/
- **Community:** https://community.cloudflare.com/
- **Status:** https://www.cloudflarestatus.com/

---

## 🚀 Ready to Deploy?

```bash
# Quick deploy:
wrangler pages deploy dist/public --project-name=premium-leave-docs

# Or use GitHub integration (recommended)
# https://dash.cloudflare.com/pages
```

**Your URL:** `https://premium-leave-docs.pages.dev`

---

**Last Updated:** May 29, 2026  
**Version:** 1.0.0
