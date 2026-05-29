# 🎖️ Premium Department Leave Permit System

> **Military-grade professional leave documentation suite** with real-time preview, digital signatures, and automated PDF generation. Built for enterprise and government-grade deployments.

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Build](https://img.shields.io/github/actions/workflow/status/Amirarlite/premium-leave-docs/deploy.yml?branch=main)
![React](https://img.shields.io/badge/React-19.2.1-61dafb.svg)
![TypeScript](https://img.shields.io/badge/TypeScript-5.6.3-3178c6.svg)

---

## 📋 Table of Contents

- [Features](#-features)
- [Live Demo](#-live-demo)
- [Quick Start](#-quick-start)
- [Installation](#-installation)
- [Configuration](#-configuration)
- [Document Types](#-document-types)
- [Deployment](#-deployment)
- [API Reference](#-api-reference)
- [Security](#-security)
- [Troubleshooting](#-troubleshooting)
- [Contributing](#-contributing)
- [License](#-license)

---

## ✨ Features

### 🎯 Core Capabilities

| Feature | Description | Status |
|---------|-------------|--------|
| **Real-Time Preview** | Instant document rendering as you type | ✅ Active |
| **Digital Signature** | Upload and embed signature images | ✅ Active |
| **Passport Photo Upload** | Professional photo integration | ✅ Active |
| **Company Logo** | Custom branding support | ✅ Active |
| **PDF Export** | Print-ready A4 format output | ✅ Active |
| **Auto-Validation** | Real-time form validation with Zod | ✅ Active |
| **Responsive Design** | Mobile, tablet, desktop optimized | ✅ Active |
| **Dark Mode** | Automatic theme switching | ✅ Active |

### 🛡️ Military-Grade Security

- **Client-side validation** - No sensitive data sent to server
- **Secure file uploads** - Sanitized image processing
- **CSP headers** - Content Security Policy enabled
- **HTTPS enforcement** - Production deployments
- **No tracking** - Zero analytics or telemetry

---

## 🌐 Live Demo

**Production URL:** `https://amirarlite.github.io/premium-leave-docs/`

> ⚠️ **Note:** This is a static deployment. For full functionality, run locally or deploy to your own infrastructure.

---

## 🚀 Quick Start

### Prerequisites

- **Node.js** 20.x or higher
- **pnpm** 9.x or higher (`npm install -g pnpm`)
- **Git** (for cloning)

### 60-Second Setup

```bash
# 1. Clone repository
git clone https://github.com/Amirarlite/premium-leave-docs.git
cd premium-leave-docs

# 2. Install dependencies
pnpm install

# 3. Start development server
pnpm run dev
```

**Access:** `http://localhost:3000`

---

## 📦 Installation

### Local Development

```bash
# Clone
git clone https://github.com/Amirarlite/premium-leave-docs.git
cd premium-leave-docs

# Install
pnpm install

# Environment setup (optional)
cp .env.example .env

# Development server
pnpm run dev

# Production build
pnpm run build

# Preview production build
pnpm run preview
```

### Docker Deployment

```bash
# Build Docker image
docker build -t premium-leave-docs:latest .

# Run container
docker run -d -p 3000:3000 \
  -e NODE_ENV=production \
  premium-leave-docs:latest
```

---

## ⚙️ Configuration

### Environment Variables

Create `.env` or `.env.local`:

```env
# Application
NODE_ENV=development
PORT=3000

# GitHub Pages (if deploying to GH Pages)
VITE_BASE_PATH=/premium-leave-docs

# Optional: Custom branding
VITE_COMPANY_NAME="Your Organization"
VITE_SUPPORT_EMAIL="support@example.com"
```

### Configuration File

Edit `client/src/const.ts` for:

- Default company name
- Document templates
- Color schemes
- Logo paths

---

## 📄 Document Types

### 1. Leave Request Form
**Purpose:** Primary application for leave approval

**Fields:**
- Employee name, ID, department
- Leave type (annual, sick, emergency, etc.)
- Start/end dates
- Reason (optional)
- Passport photo upload
- Digital signature

### 2. Leave Approval Letter
**Purpose:** Official approval documentation

**Fields:**
- Auto-populated from request
- Approver name and signature
- Approval date
- Reference number
- Official seal placeholder

### 3. Leave Cancellation Form
**Purpose:** Request to cancel approved leave

**Fields:**
- Original leave reference
- Cancellation reason
- Employee signature
- Date

### 4. Leave Extension Request
**Purpose:** Extend existing approved leave

**Fields:**
- Original leave details
- New end date
- Extension justification
- Supporting documents upload

### 5. Leave Status Tracker
**Purpose:** Monitor application progress

**Features:**
- Search by employee ID or reference
- Real-time status updates
- Timeline visualization
- Export to PDF

---

## 🚀 Deployment

### GitHub Pages (Automated)

1. **Enable GitHub Actions:**
   - Go to Settings → Actions → General
   - Allow all actions

2. **Configure Pages:**
   - Settings → Pages
   - Source: **GitHub Actions**

3. **Push to main:**
   ```bash
   git push origin main
   ```

4. **Access:** `https://yourusername.github.io/premium-leave-docs/`

### Vercel Deployment

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel --prod
```

### Netlify Deployment

```bash
# Install Netlify CLI
npm i -g netlify-cli

# Deploy
netlify deploy --prod
```

### Self-Hosted (Node.js)

```bash
# Build
pnpm run build

# Start server
pnpm run start
```

**Access:** `http://your-server:3000`

---

## 🔧 API Reference

### Server Endpoints (Optional)

If running with server component:

#### `POST /api/validate`
Validate leave request data

**Request:**
```json
{
  "employeeId": "EMP-12345",
  "leaveType": "annual",
  "startDate": "2026-06-01",
  "endDate": "2026-06-15"
}
```

**Response:**
```json
{
  "valid": true,
  "availableDays": 20,
  "warnings": []
}
```

#### `POST /api/generate-pdf`
Generate PDF document

**Request:** Form data with document JSON

**Response:** PDF file download

---

## 🛡️ Security

### Best Practices Implemented

- ✅ **No server-side storage** - All data client-side
- ✅ **File type validation** - Images only (PNG, JPG)
- ✅ **Size limits** - Max 5MB per upload
- ✅ **CSP headers** - Prevent XSS attacks
- ✅ **HTTPS** - Enforced in production
- ✅ **No external dependencies** - Minimal attack surface

### Recommendations for Production

1. **Enable HTTPS** - Use Let's Encrypt or cloud provider SSL
2. **Add authentication** - Integrate with your SSO provider
3. **Rate limiting** - Prevent abuse on server endpoints
4. **Audit logs** - Track document generation
5. **Backup strategy** - Regular snapshots of generated documents

---

## 🐛 Troubleshooting

### Common Issues

#### ❌ Build fails with "Module not found"

**Solution:**
```bash
# Clear cache and reinstall
rm -rf node_modules pnpm-lock.yaml
pnpm install
```

#### ❌ GitHub Pages 404 on refresh

**Solution:** Add to `vite.config.ts`:
```typescript
build: {
  outDir: 'dist/public',
  rollupOptions: {
    output: {
      manualChunks: undefined
    }
  }
}
```

#### ❌ Images not uploading

**Solution:**
- Check file size (< 5MB)
- Verify format (PNG, JPG only)
- Clear browser cache

#### ❌ PDF export blank

**Solution:**
- Disable browser ad-blockers
- Check print CSS in DevTools
- Try different browser (Chrome recommended)

### Getting Help

- **GitHub Issues:** [Report a bug](https://github.com/Amirarlite/premium-leave-docs/issues)
- **Discussions:** [Ask a question](https://github.com/Amirarlite/premium-leave-docs/discussions)
- **Email:** support@example.com (replace with your contact)

---

## 🤝 Contributing

### How to Contribute

1. **Fork** the repository
2. **Create** feature branch (`git checkout -b feature/amazing-feature`)
3. **Commit** changes (`git commit -m 'Add amazing feature'`)
4. **Push** to branch (`git push origin feature/amazing-feature`)
5. **Open** Pull Request

### Development Guidelines

- **Code style:** Follow existing Prettier config
- **Testing:** Add tests for new features
- **Documentation:** Update README for user-facing changes
- **Commits:** Use conventional commits (`feat:`, `fix:`, `docs:`)

### Running Tests

```bash
# Unit tests
pnpm test

# Type checking
pnpm run check

# Linting
pnpm run lint
```

---

## 📝 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

```
MIT License

Copyright (c) 2026 Amirarlite

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

---

## 🙏 Acknowledgments

- **React Team** - For the amazing UI library
- **Tailwind CSS** - For the utility-first styling
- **Vite** - For blazing-fast builds
- **Radix UI** - For accessible components
- **Manus** - For the development environment

---

**Built with 🎖️ military-grade precision for professional departmental use.**

**Last Updated:** May 29, 2026  
**Version:** 1.0.0  
**Maintainer:** [@Amirarlite](https://github.com/Amirarlite)
