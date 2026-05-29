/**
 * =============================================================================
 * Premium Leave Docs - Production Server
 * =============================================================================
 * Express.js server with security headers, health checks, and PDF generation
 * Optional: Run standalone or alongside Vite dev server
 * =============================================================================
 */

import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';

// ES Module compatibility
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// =============================================================================
// Configuration
// =============================================================================

const PORT = process.env.PORT || 3000;
const NODE_ENV = process.env.NODE_ENV || 'development';
const IS_PRODUCTION = NODE_ENV === 'production';

// =============================================================================
// Express App Setup
// =============================================================================

const app = express();

// -----------------------------------------------------------------------------
// Security Middleware
// -----------------------------------------------------------------------------

// Helmet security headers
app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        styleSrc: ["'self'", "'unsafe-inline'", 'https://fonts.googleapis.com'],
        fontSrc: ["'self'", 'https://fonts.gstatic.com'],
        imgSrc: ["'self'", 'data:', 'blob:'],
        scriptSrc: ["'self'"],
        connectSrc: ["'self'"],
        frameSrc: ["'none'"],
        objectSrc: ["'none'"],
        upgradeInsecureRequests: IS_PRODUCTION ? [] : null,
      },
    },
    crossOriginEmbedderPolicy: false, // Required for some frontend features
    hsts: IS_PRODUCTION
      ? {
          maxAge: 31536000,
          includeSubDomains: true,
          preload: true,
        }
      : false,
  })
);

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
  message: {
    error: 'Too many requests',
    message: 'Please try again later',
  },
  standardHeaders: true,
  legacyHeaders: false,
});

app.use('/api/', limiter);

// Body parsing
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// -----------------------------------------------------------------------------
// Static Files (Production)
// -----------------------------------------------------------------------------

if (IS_PRODUCTION) {
  const publicPath = path.resolve(__dirname, '../public');
  app.use(express.static(publicPath));
}

// =============================================================================
// API Routes
// =============================================================================

// -----------------------------------------------------------------------------
// Health Check Endpoint
// -----------------------------------------------------------------------------

app.get('/health', (_req, res) => {
  res.json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    environment: NODE_ENV,
    version: process.env.npm_package_version || '1.0.0',
  });
});

// -----------------------------------------------------------------------------
// API Version Endpoint
// -----------------------------------------------------------------------------

app.get('/api/version', (_req, res) => {
  res.json({
    version: '1.0.0',
    name: 'Premium Leave Docs API',
    environment: NODE_ENV,
    build: process.env.BUILD_NUMBER || 'development',
  });
});

// -----------------------------------------------------------------------------
// Validate Leave Request (Example Endpoint)
// -----------------------------------------------------------------------------

app.post('/api/validate', (req, res) => {
  try {
    const { employeeId, leaveType, startDate, endDate } = req.body;

    // Validation
    if (!employeeId || !leaveType || !startDate || !endDate) {
      return res.status(400).json({
        valid: false,
        error: 'Missing required fields',
        required: ['employeeId', 'leaveType', 'startDate', 'endDate'],
      });
    }

    // Date validation
    const start = new Date(startDate);
    const end = new Date(endDate);

    if (isNaN(start.getTime()) || isNaN(end.getTime())) {
      return res.status(400).json({
        valid: false,
        error: 'Invalid date format',
      });
    }

    if (end < start) {
      return res.status(400).json({
        valid: false,
        error: 'End date must be after start date',
      });
    }

    // Calculate leave days (excluding weekends)
    const days = calculateBusinessDays(start, end);

    // Mock validation logic (replace with actual business logic)
    const mockAvailableDays = 30;
    const isValid = days <= mockAvailableDays;

    res.json({
      valid: isValid,
      requestedDays: days,
      availableDays: mockAvailableDays,
      remainingDays: isValid ? mockAvailableDays - days : 0,
      warnings: isValid ? [] : ['Insufficient leave balance'],
    });
  } catch (error) {
    console.error('Validation error:', error);
    res.status(500).json({
      valid: false,
      error: 'Internal server error',
    });
  }
});

// -----------------------------------------------------------------------------
// Generate PDF (Example Endpoint)
// -----------------------------------------------------------------------------

app.post('/api/generate-pdf', (req, res) => {
  try {
    const { documentType, data } = req.body;

    if (!documentType || !data) {
      return res.status(400).json({
        error: 'Missing documentType or data',
      });
    }

    // In production, integrate with PDF generation library
    // Example: puppeteer, pdfkit, or @react-pdf/renderer

    res.json({
      success: true,
      message: 'PDF generation endpoint (implement with your PDF library)',
      documentType,
      receivedData: data,
    });
  } catch (error) {
    console.error('PDF generation error:', error);
    res.status(500).json({
      error: 'Failed to generate PDF',
    });
  }
});

// -----------------------------------------------------------------------------
// 404 Handler - Serve index.html for SPA routing
// -----------------------------------------------------------------------------

app.get('*', (_req, res) => {
  if (IS_PRODUCTION) {
    const indexPath = path.resolve(__dirname, '../public/index.html');
    res.sendFile(indexPath);
  } else {
    res.status(404).json({
      error: 'Not Found',
      message: 'In development, Vite handles routing',
    });
  }
});

// =============================================================================
// Error Handling
// =============================================================================

// Global error handler
app.use((err: Error, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
  console.error('Unhandled error:', err);

  res.status(500).json({
    error: 'Internal Server Error',
    message: IS_PRODUCTION ? 'Something went wrong' : err.message,
    ...(IS_PRODUCTION ? {} : { stack: err.stack }),
  });
});

// =============================================================================
// Server Startup
// =============================================================================

const server = app.listen(PORT, () => {
  console.log(`
╔═══════════════════════════════════════════════════════════╗
║                                                           ║
║   🎖️  Premium Leave Docs Server                          ║
║                                                           ║
║   Environment: ${NODE_ENV.padEnd(42)}║
║   Port: ${String(PORT).padEnd(48)}║
║   URL: ${`http://localhost:${PORT}`.padEnd(46)}║
║                                                           ║
║   Health: http://localhost:${PORT}/health${' '.repeat(28)}║
║                                                           ║
╚═══════════════════════════════════════════════════════════╝
  `);
});

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('SIGTERM received. Shutting down gracefully...');
  server.close(() => {
    console.log('Server closed');
    process.exit(0);
  });
});

process.on('SIGINT', () => {
  console.log('SIGINT received. Shutting down gracefully...');
  server.close(() => {
    console.log('Server closed');
    process.exit(0);
  });
});

// =============================================================================
// Helper Functions
// =============================================================================

/**
 * Calculate business days between two dates (excluding weekends)
 */
function calculateBusinessDays(start: Date, end: Date): number {
  let days = 0;
  const current = new Date(start);

  while (current <= end) {
    const dayOfWeek = current.getDay();
    if (dayOfWeek !== 0 && dayOfWeek !== 6) {
      days++;
    }
    current.setDate(current.getDate() + 1);
  }

  return days;
}

// =============================================================================
// Exports
// =============================================================================

export default app;
