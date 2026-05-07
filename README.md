# Premium Department Leave Permit System

A military-grade premium leave permit document generator with real-time preview and professional PDF export capabilities.

## ✨ Features

### 🎯 Core Functionality
- **Real-Time Live Preview**: Instant document preview as you type
- **Document Upload System**: 
  - Passport photo upload with preview
  - Digital signature capture
  - Company logo customization
  - Supporting document attachments
- **Premium Military-Grade Styling**: 
  - Official navy blue & gold color scheme
  - Professional typography (Georgia serif headers)
  - Decorative borders and watermarks
  - Classification labels and reference numbers
- **Print-Ready PDF Export**: Optimized A4 format for official printing

### 📄 Document Types
1. **Leave Request Form** - Primary application form
2. **Leave Approval Letter** - Official approval documentation
3. **Leave Cancellation Form** - Request cancellation processing
4. **Leave Extension Request** - Extension application form
5. **Leave Status Tracker** - Track application status

## 🚀 Quick Start

### Local Development
```bash
pnpm install
pnpm run dev
pnpm run build
```

## 🌐 GitHub Pages Deployment

### Option 1: Manual Deployment

1. **Build the project**:
   ```bash
   pnpm run build
   ```

2. **Deploy the `dist/public` folder** to GitHub Pages:
   - Go to repository Settings → Pages
   - Select "Deploy from a branch"
   - Choose source as `gh-pages` branch
   - Push the `dist/public` contents to that branch

### Option 2: Automated Deployment with GitHub Actions

The project includes automated deployment workflow.

#### Setup Steps:

1. **Enable GitHub Pages**:
   - Go to repository Settings → Pages
   - Under "Source", select "GitHub Actions"

2. **Push to main branch**:
   - Every push triggers automatic deployment
   - Check "Actions" tab for progress

3. **Access deployed site**:
   - URL: `https://yourusername.github.io/your-repo-name/`

## 📁 Project Structure

```
/workspace
├── client/                 # Frontend React app
│   ├── index.html
│   ├── public/
│   └── src/
│       ├── components/    # React components
│       │   ├── LeaveRequestForm.tsx
│       │   ├── LeaveApprovalLetter.tsx
│       │   ├── LeaveCancellationForm.tsx
│       │   ├── LeaveExtensionRequest.tsx
│       │   └── LeaveStatusTracker.tsx
│       ├── index.css      # Military-grade styling
│       ├── App.tsx
│       └── main.tsx
├── .github/workflows/deploy.yml
├── package.json
├── vite.config.ts
└── tsconfig.json
```

## 🎨 Customization

- **Company Logo**: Upload through UI or replace in `/client/public/`
- **Color Scheme**: Modify CSS in `client/src/index.css`
- **Typography**: Google Fonts in `client/index.html`

## 🖨️ Print Optimization

- A4 page size optimization
- Hide interactive elements
- Professional margins and spacing
- High-quality PDF output

## 🔧 Technical Stack

- **Frontend**: React 19, TypeScript
- **Styling**: Tailwind CSS v4
- **Build Tool**: Vite 7
- **UI Components**: Radix UI, Framer Motion
- **Forms**: React Hook Form, Zod
- **Package Manager**: pnpm

---

**Built with military-grade precision for professional departmental use.**
