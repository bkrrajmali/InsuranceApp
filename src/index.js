import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import { config } from 'dotenv';
import policiesRouter from './routes/policies.js';
import claimsRouter from './routes/claims.js';
import customersRouter from './routes/customers.js';
import billingRouter from './routes/billing.js';
import analyticsRouter from './routes/analytics.js';
import { errorHandler } from './middleware/errorHandler.js';

// Load environment variables
config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

// Basic route for testing
app.get('/', (req, res) => {
  res.json({ 
    message: 'Insurance Microservices API',
    endpoints: {
      policies: '/api/policies',
      claims: '/api/claims',
      customers: '/api/customers',
      billing: '/api/billing',
      analytics: '/api/analytics'
    }
  });
});

// Routes
app.use('/api/policies', policiesRouter);
app.use('/api/claims', claimsRouter);
app.use('/api/customers', customersRouter);
app.use('/api/billing', billingRouter);
app.use('/api/analytics', analyticsRouter);

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'healthy' });
});

// Error handling
app.use(errorHandler);

// Start server and log the port
app.listen(PORT, () => {
  console.log(`Insurance Microservices running on port ${PORT}`);
  console.log(`Visit http://localhost:${PORT} to see available endpoints`);
});