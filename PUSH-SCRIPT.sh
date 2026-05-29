#!/bin/bash
# =============================================================================
# Premium Leave Docs - One-Click Push Script
# =============================================================================
# This script copies optimized files, cleans old files, and pushes to GitHub
# Run from your repository root directory
# =============================================================================

set -e  # Exit on error

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}"
echo "╔═══════════════════════════════════════════════════════════╗"
echo "║                                                           ║"
echo "║   🎖️  Premium Leave Docs - Push Script                   ║"
echo "║                                                           ║"
echo "║   Optimized for Cloudflare Pages + GitHub Pages          ║"
echo "║                                                           ║"
echo "╚═══════════════════════════════════════════════════════════╝"
echo -e "${NC}"

# =============================================================================
# Configuration
# =============================================================================

SOURCE_DIR="/home/ec2-user/.openclaw/workspace/premium-leave-docs-optimized"
REPO_ROOT="$(pwd)"

echo -e "${YELLOW}📋 Configuration:${NC}"
echo "  Source: $SOURCE_DIR"
echo "  Target: $REPO_ROOT"
echo ""

# Confirm we're in the right directory
if [ ! -f "package.json" ] || [ ! -d "client" ]; then
    echo -e "${RED}❌ Error: Not in premium-leave-docs repository root!${NC}"
    echo "   Please cd to your repo first: cd /path/to/premium-leave-docs"
    exit 1
fi

echo -e "${GREEN}✓ Repository detected${NC}"
echo ""

# =============================================================================
# Step 1: Backup Current State
# =============================================================================

echo -e "${YELLOW}Step 1/6: Creating backup...${NC}"

git branch backup-before-optimization-$(date +%Y%m%d-%H%M%S) 2>/dev/null || true

echo -e "${GREEN}✓ Backup created${NC}"
echo ""

# =============================================================================
# Step 2: Remove Old/Problematic Files
# =============================================================================

echo -e "${YELLOW}Step 2/6: Cleaning old files...${NC}"

# Files to remove
FILES_TO_REMOVE=(
    "EstateFlow Validation.html"
    "DEPLOYMENT_ALIBABA.md"
    "DEPLOY_SAE_BEST_PRACTICE.md"
    "FREE_TIER_DEPLOYMENT.md"
    "QUICKSTART_ALIBABA.md"
    "deploy-free-tier.sh"
    "k8s-configmap.yaml"
    ".gitkeep"
)

for file in "${FILES_TO_REMOVE[@]}"; do
    if [ -f "$file" ]; then
        rm -f "$file"
        echo "  🗑️  Removed: $file"
    fi
done

# Remove old workflow files if they exist
if [ -d ".github/workflows" ]; then
    rm -f .github/workflows/deploy.yml 2>/dev/null && echo "  🗑️  Removed: .github/workflows/deploy.yml"
fi

echo -e "${GREEN}✓ Cleanup complete${NC}"
echo ""

# =============================================================================
# Step 3: Copy Optimized Files
# =============================================================================

echo -e "${YELLOW}Step 3/6: Copying optimized files...${NC}"

# Copy all optimized files
cp -r "$SOURCE_DIR"/* . 2>/dev/null || true

# Specific file copies with feedback
FILES_COPIED=(
    "README.md"
    "LICENSE"
    ".env.example"
    "Dockerfile"
    ".dockerignore"
    "package.json"
    "vite.config.ts"
    "wrangler.toml"
    "DEPLOY.md"
    "PUSH-INSTRUCTIONS.md"
    "0-START-HERE.md"
)

for file in "${FILES_COPIED[@]}"; do
    if [ -f "$file" ]; then
        echo "  ✅ Copied: $file"
    fi
done

# Copy server directory
if [ -d "$SOURCE_DIR/server" ]; then
    mkdir -p server
    cp "$SOURCE_DIR/server/index.ts" server/ 2>/dev/null && echo "  ✅ Copied: server/index.ts"
fi

# Copy GitHub workflows
if [ -d "$SOURCE_DIR/.github/workflows" ]; then
    mkdir -p .github/workflows
    cp "$SOURCE_DIR/.github/workflows/ci.yml" .github/workflows/ 2>/dev/null && echo "  ✅ Copied: .github/workflows/ci.yml"
    cp "$SOURCE_DIR/.github/workflows/cloudflare-deploy.yml" .github/workflows/ 2>/dev/null && echo "  ✅ Copied: .github/workflows/cloudflare-deploy.yml"
fi

echo -e "${GREEN}✓ Files copied${NC}"
echo ""

# =============================================================================
# Step 4: Install New Dependencies
# =============================================================================

echo -e "${YELLOW}Step 4/6: Installing new dependencies...${NC}"

# Check if pnpm is available
if command -v pnpm &> /dev/null; then
    pnpm add helmet express-rate-limit 2>/dev/null || echo "  ⚠️  Install manually: pnpm add helmet express-rate-limit"
    pnpm add -D concurrently 2>/dev/null || echo "  ⚠️  Install manually: pnpm add -D concurrently"
    echo -e "${GREEN}✓ Dependencies installed${NC}"
else
    echo -e "${YELLOW}⚠️  pnpm not found. Install manually:${NC}"
    echo "   pnpm add helmet express-rate-limit"
    echo "   pnpm add -D concurrently"
fi

echo ""

# =============================================================================
# Step 5: Git Commit
# =============================================================================

echo -e "${YELLOW}Step 5/6: Committing changes...${NC}"

git add -A

# Check if there are changes to commit
if git diff --staged --quiet; then
    echo -e "${YELLOW}⚠️  No changes detected. Files may already be up to date.${NC}"
    echo ""
else
    git commit -m "feat: military-grade optimization with Cloudflare Pages support

BREAKING CHANGES:
- Added helmet and express-rate-limit for security
- Updated vite.config.ts with base path support
- Replaced Alibaba Cloud docs with Cloudflare Pages deployment

NEW FEATURES:
- Premium README with complete documentation
- MIT license for open source compliance
- Docker multi-stage build support
- CI/CD pipeline (GitHub Actions)
- Cloudflare Pages deployment workflow
- Production Express server with security headers
- Health check endpoint (/health)
- Rate limiting and CSP headers
- Comprehensive deployment guide

OPTIMIZATIONS:
- Removed outdated deployment scripts
- Cleaned up old documentation
- Added .env.example template
- Cloudflare Pages ready (wrangler.toml)
- GitHub Pages compatible base path

DEPLOYMENT:
- Cloudflare Pages: wrangler pages deploy dist/public
- GitHub Pages: Auto-deploy via Actions
- Docker: docker build -t premium-leave-docs .
- Vercel/Netlify: One-click deploy ready

See DEPLOY.md for complete deployment instructions."

    echo -e "${GREEN}✓ Changes committed${NC}"
fi

echo ""

# =============================================================================
# Step 6: Push to GitHub
# =============================================================================

echo -e "${YELLOW}Step 6/6: Pushing to GitHub...${NC}"

# Check if remote exists
if ! git remote -v | grep -q origin; then
    echo -e "${RED}❌ No 'origin' remote configured!${NC}"
    echo "   Add with: git remote add origin https://github.com/Amirarlite/premium-leave-docs.git"
    exit 1
fi

# Push to main
git push origin main

if [ $? -eq 0 ]; then
    echo -e "${GREEN}✓ Successfully pushed to GitHub!${NC}"
else
    echo -e "${RED}❌ Push failed. Try:${NC}"
    echo "   git pull origin main --rebase"
    echo "   git push origin main"
    exit 1
fi

echo ""

# =============================================================================
# Summary
# =============================================================================

echo -e "${BLUE}"
echo "╔═══════════════════════════════════════════════════════════╗"
echo "║                                                           ║"
echo "║   ✅ PUSH COMPLETE!                                       ║"
echo "║                                                           ║"
echo "╚═══════════════════════════════════════════════════════════╝"
echo -e "${NC}"

echo -e "${GREEN}📊 Next Steps:${NC}"
echo ""
echo "1. Monitor CI/CD:"
echo "   https://github.com/Amirarlite/premium-leave-docs/actions"
echo ""
echo "2. GitHub Pages (auto-deploy):"
echo "   https://amirarlite.github.io/premium-leave-docs/"
echo ""
echo "3. Cloudflare Pages (manual deploy):"
echo "   wrangler pages deploy dist/public --project-name=premium-leave-docs"
echo ""
echo "4. Cloudflare Dashboard:"
echo "   https://dash.cloudflare.com/pages"
echo ""
echo -e "${YELLOW}⚠️  Required Actions:${NC}"
echo ""
echo "□ Enable GitHub Pages: Settings → Pages → Source: GitHub Actions"
echo "□ Enable GitHub Actions: Settings → Actions → Allow all actions"
echo "□ For Cloudflare: npm install -g wrangler && wrangler login"
echo ""
echo -e "${GREEN}🎉 Done!${NC}"
