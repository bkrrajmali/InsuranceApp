import express from 'express';
import { body, validationResult } from 'express-validator';
import { BillingService } from '../services/billingService.js';
import { authenticateToken } from '../middleware/auth.js';

const router = express.Router();
const billingService = new BillingService();

const validateInvoice = [
  body('policyId').notEmpty().withMessage('Policy ID is required'),
  body('invoiceNumber').notEmpty().withMessage('Invoice number is required'),
  body('amount').isFloat({ min: 0 }).withMessage('Valid amount is required'),
  body('dueDate').isISO8601().withMessage('Valid due date is required'),
  body('periodStart').isISO8601().withMessage('Valid billing period start is required'),
  body('periodEnd').isISO8601().withMessage('Valid billing period end is required')
];

const validatePayment = [
  body('invoiceId').notEmpty().withMessage('Invoice ID is required'),
  body('amount').isFloat({ min: 0 }).withMessage('Valid amount is required'),
  body('paymentMethodId').notEmpty().withMessage('Payment method ID is required'),
  body('transactionId').notEmpty().withMessage('Transaction ID is required')
];

router.post('/invoices', authenticateToken, validateInvoice, async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const invoice = await billingService.createInvoice(req.body);
    res.status(201).json(invoice);
  } catch (error) {
    next(error);
  }
});

router.post('/payments', authenticateToken, validatePayment, async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const payment = await billingService.processPayment(req.body);
    res.status(201).json(payment);
  } catch (error) {
    next(error);
  }
});

export default router;