# 🚀 Deployment Guide - Premium Leave Docs

Complete deployment instructions for all supported platforms.

---

## 📋 Quick Deploy Options

| Platform | Time | Cost | Best For |
|----------|------|------|----------|
| **GitHub Pages** | 2 min | Free | Static demos, personal use |
| **Vercel** | 3 min | Free tier | Production apps, auto-SSL |
| **Netlify** | 3 min | Free tier | Production apps, forms |
| **Docker** | 5 min | Varies | Self-hosted, enterprise |
| **Alibaba Cloud ECS** | 10 min | $5-10/mo | Enterprise, China region |

---

## 🌐 Option 1: GitHub Pages (Recommended for Demo)

### Automated (GitHub Actions)

**Already configured!** Just push to main:

```bash
# 1. Ensure GitHub Pages is enabled
# Go to: Settings → Pages → Source: GitHub Actions

# 2. Push your code
git add .
git commit -m "Deploy premium leave docs"
git push origin main

# 3. Check deployment status
# Go to: Actions tab → Wait for build to complete

# 4. Access your site
# URL: https://yourusername.github.io/premium-leave-docs/
```

### Manual Deployment

```bash
# 1. Build the project
pnpm run build

# 2. Install gh-pages CLI
pnpm add -D gh-pages

# 3. Deploy to gh-pages branch
pnpm exec gh-pages -d dist/public

# 4. Enable GitHub Pages
# Settings → Pages → Source: Deploy from a branch → gh-pages branch
```

---

## ⚡ Option 2: Vercel Deployment

### One-Click Deploy

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/Amirarlite/premium-leave-docs)

### CLI Deployment

```bash
# 1. Install Vercel CLI
npm install -g vercel

# 2. Login to Vercel
vercel login

# 3. Deploy (preview)
vercel

# 4. Deploy to production
vercel --prod
```

### Vercel Configuration

Create `vercel.json` in root:

```json
{
  "buildCommand": "pnpm run build",
  "outputDirectory": "dist/public",
  "devCommand": "pnpm run dev",
  "installCommand": "pnpm install",
  "framework": "vite"
}
```

---

## 🦋 Option 3: Netlify Deployment

### One-Click Deploy

[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/Amirarlite/premium-leave-docs)

### CLI Deployment

```bash
# 1. Install Netlify CLI
npm install -g netlify-cli

# 2. Login
netlify login

# 3. Link to site
netlify link

# 4. Deploy
netlify deploy --prod
```

### Netlify Configuration

Create `netlify.toml` in root:

```toml
[build]
  command = "pnpm run build"
  publish = "dist/public"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

---

## 🐳 Option 4: Docker Deployment

### Build Image

```bash
# Build Docker image
docker build -t premium-leave-docs:latest .

# Tag for registry (optional)
docker tag premium-leave-docs:latest your-registry/premium-leave-docs:latest
```

### Run Locally

```bash
# Basic run
docker run -d -p 3000:3000 --name premium-leave-docs premium-leave-docs:latest

# With custom environment
docker run -d -p 3000:3000 \
  -e VITE_COMPANY_NAME="My Org" \
  -e VITE_BASE_PATH="/leave-docs" \
  premium-leave-docs:latest

# View logs
docker logs -f premium-leave-docs

# Stop and remove
docker stop premium-leave-docs
docker rm premium-leave-docs
```

### Docker Compose

Create `docker-compose.yml`:

```yaml
version: '3.8'

services:
  premium-leave-docs:
    build: .
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
      - VITE_COMPANY_NAME=My Organization
    restart: unless-stopped
    healthcheck:
      test: ["CMD", "wget", "--spider", "-q", "http://localhost:3000/health"]
      interval: 30s
      timeout: 3s
      retries: 3
```

Run:
```bash
docker-compose up -d
```

### Deploy to Container Registry

#### Docker Hub
```bash
# Login
docker login

# Push
docker push your-username/premium-leave-docs:latest
```

#### Alibaba Cloud ACR
```bash
# Login
docker login --username=<your-username> registry.cn-hangzhou.aliyuncs.com

# Tag
docker tag premium-leave-docs:latest registry.cn-hangzhou.aliyuncs.com/your-namespace/premium-leave-docs:latest

# Push
docker push registry.cn-hangzhou.aliyuncs.com/your-namespace/premium-leave-docs:latest
```

---

## ☁️ Option 5: Alibaba Cloud ECS

### Prerequisites

- Alibaba Cloud account
- ECS instance (Ubuntu 22.04 recommended)
- Domain name (optional)
- SSL certificate (optional)

### Step-by-Step

```bash
# 1. SSH into ECS
ssh root@your-ecs-ip

# 2. Install Docker
curl -fsSL https://get.docker.com | bash
systemctl enable docker
systemctl start docker

# 3. Install Docker Compose
curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
chmod +x /usr/local/bin/docker-compose

# 4. Clone repository
git clone https://github.com/Amirarlite/premium-leave-docs.git
cd premium-leave-docs

# 5. Build and run
docker-compose up -d

# 6. Configure security group
# ECS Console → Security Groups → Add rule
# Port: 3000, Protocol: TCP, Source: 0.0.0.0/0

# 7. Access application
# http://your-ecs-ip:3000
```

### With Nginx Reverse Proxy

```bash
# Install Nginx
apt update && apt install -y nginx

# Create Nginx config
cat > /etc/nginx/sites-available/premium-leave-docs << 'EOF'
server {
    listen 80;
    server_name your-domain.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    }
}
EOF

# Enable site
ln -s /etc/nginx/sites-available/premium-leave-docs /etc/nginx/sites-enabled/
nginx -t
systemctl restart nginx

# Install SSL certificate (Certbot)
apt install -y certbot python3-certbot-nginx
certbot --nginx -d your-domain.com
```

---

## 🔧 Post-Deployment Checklist

### ✅ Security

- [ ] HTTPS enabled
- [ ] Security headers configured
- [ ] Rate limiting active
- [ ] No sensitive data in client bundle
- [ ] CORS configured correctly

### ✅ Performance

- [ ] Gzip/Brotli compression enabled
- [ ] Static assets cached
- [ ] Images optimized
- [ ] CDN configured (optional)

### ✅ Monitoring

- [ ] Health check endpoint responding
- [ ] Error tracking configured (Sentry, etc.)
- [ ] Uptime monitoring enabled
- [ ] Log aggregation setup

### ✅ Backup

- [ ] Database backups (if using server)
- [ ] Configuration versioned in Git
- [ ] Disaster recovery plan documented

---

## 🐛 Troubleshooting

### Build Fails on GitHub Pages

**Error:** `Module not found`

**Solution:**
```bash
# Clear cache
pnpm clean
pnpm install

# Rebuild
pnpm run build
```

### 404 on Page Refresh

**Cause:** SPA routing without proper configuration

**Solution:** Add to `vite.config.ts`:
```typescript
build: {
  rollupOptions: {
    output: {
      manualChunks: undefined
    }
  }
}
```

Or create `public/_redirects` (Netlify):
```
/*    /index.html   200
```

### Docker Container Won't Start

**Check logs:**
```bash
docker logs premium-leave-docs
```

**Common fixes:**
```bash
# Remove and rebuild
docker rm -f premium-leave-docs
docker build -t premium-leave-docs:latest .
docker run -d -p 3000:3000 --name premium-leave-docs premium-leave-docs:latest
```

### GitHub Pages 404 on Custom Domain

**Solution:**
1. Create `public/CNAME` file with your domain
2. Configure DNS records:
   - A record: `185.199.108.153`
   - CNAME: `yourusername.github.io`

---

## 📊 Deployment Comparison

| Feature | GitHub Pages | Vercel | Netlify | Docker |
|---------|-------------|--------|---------|--------|
| **Setup Time** | 2 min | 3 min | 3 min | 10 min |
| **Cost** | Free | Free tier | Free tier | $5+/mo |
| **Custom Domain** | ✅ | ✅ | ✅ | ✅ |
| **HTTPS** | ✅ | ✅ | ✅ | Manual |
| **Auto Deploy** | ✅ | ✅ | ✅ | Manual |
| **Server APIs** | ❌ | ✅ | ✅ | ✅ |
| **Form Handling** | ❌ | ✅ | ✅ | Manual |
| **Analytics** | ❌ | ✅ | ✅ | Manual |
| **Preview Deploys** | ❌ | ✅ | ✅ | Manual |
| **China Access** | ⚠️ Slow | ⚠️ Slow | ⚠️ Slow | ✅ (Local) |

---

## 🎯 Recommendation

**For Demo/Testing:** GitHub Pages (free, fast setup)

**For Production (Global):** Vercel or Netlify (auto-SSL, CDN, forms)

**For Production (China/Enterprise):** Alibaba Cloud ECS + Docker (full control, compliance)

**For Enterprise:** Docker on Kubernetes (scalability, high availability)

---

## 📞 Support

- **Documentation:** [GitHub Repo](https://github.com/Amirarlite/premium-leave-docs)
- **Issues:** [Report a Bug](https://github.com/Amirarlite/premium-leave-docs/issues)
- **Discussions:** [Ask Questions](https://github.com/Amirarlite/premium-leave-docs/discussions)

---

**Last Updated:** May 29, 2026  
**Version:** 1.0.0
