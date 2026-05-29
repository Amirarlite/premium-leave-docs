# =============================================================================
# Premium Leave Docs - Production Dockerfile
# =============================================================================
# Multi-stage build for minimal production image
# Optimized for security, size, and performance
# =============================================================================

# -----------------------------------------------------------------------------
# Stage 1: Base Image
# -----------------------------------------------------------------------------
FROM node:22-alpine AS base

# Install pnpm globally
RUN corepack enable && corepack prepare pnpm@latest --activate

# Set working directory
WORKDIR /app

# -----------------------------------------------------------------------------
# Stage 2: Dependencies
# -----------------------------------------------------------------------------
FROM base AS deps

# Copy package files
COPY package.json pnpm-lock.yaml ./

# Install production dependencies only
RUN pnpm install --frozen-lockfile --prod

# -----------------------------------------------------------------------------
# Stage 3: Builder
# -----------------------------------------------------------------------------
FROM base AS builder

# Copy package files
COPY package.json pnpm-lock.yaml ./

# Install all dependencies (including devDependencies for build)
RUN pnpm install --frozen-lockfile

# Copy source code
COPY . .

# Build the application
RUN pnpm run build

# -----------------------------------------------------------------------------
# Stage 4: Production Runtime
# -----------------------------------------------------------------------------
FROM base AS runner

# Create non-root user for security
RUN addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 nodeuser

# Set working directory
WORKDIR /app

# Set environment variables
ENV NODE_ENV=production
ENV PORT=3000

# Copy built assets from builder
COPY --from=builder --chown=nodeuser:nodejs /app/dist/public ./public

# Copy server if exists (optional)
COPY --from=builder --chown=nodeuser:nodejs /app/dist/index.js ./server.js 2>/dev/null || true

# Copy package.json for version info
COPY --from=builder --chown=nodeuser:nodejs /app/package.json ./

# Copy production dependencies
COPY --from=deps --chown=nodeuser:nodejs /app/node_modules ./node_modules

# Switch to non-root user
USER nodeuser

# Expose port
EXPOSE 3000

# Health check endpoint
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD wget --no-verbose --tries=1 --spider http://localhost:3000/health || exit 1

# Start the application
# If server.js exists, use it; otherwise serve static files
CMD [ "sh", "-c", "if [ -f server.js ]; then node server.js; else npx serve public -l 3000; fi" ]

# -----------------------------------------------------------------------------
# Build Instructions
# -----------------------------------------------------------------------------
# Build image:
#   docker build -t premium-leave-docs:latest .
#
# Run container:
#   docker run -d -p 3000:3000 --name premium-leave-docs premium-leave-docs:latest
#
# With custom environment:
#   docker run -d -p 3000:3000 \
#     -e VITE_COMPANY_NAME="My Organization" \
#     premium-leave-docs:latest
#
# Production with server:
#   docker run -d -p 3000:3000 \
#     -e NODE_ENV=production \
#     -e JWT_SECRET=your-secret-key \
#     premium-leave-docs:latest
# -----------------------------------------------------------------------------
