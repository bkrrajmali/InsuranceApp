import express from 'express';
import { body, validationResult } from 'express-validator';
import { CustomerService } from '../services/customerService.js';
import { authenticateToken } from '../middleware/auth.js';

const router = express.Router();
const customerService = new CustomerService();

const validateCustomer = [
  body('firstName').notEmpty().withMessage('First name is required'),
  body('lastName').notEmpty().withMessage('Last name is required'),
  body('email').isEmail().withMessage('Valid email is required'),
  body('phone').optional().matches(/^\+?[\d\s-]+$/).withMessage('Valid phone number is required'),
  body('dateOfBirth').isISO8601().withMessage('Valid date of birth is required'),
  body('address').notEmpty().withMessage('Address is required'),
  body('city').notEmpty().withMessage('City is required'),
  body('state').isLength({ min: 2, max: 2 }).withMessage('Valid state code is required'),
  body('zipCode').matches(/^\d{5}(-\d{4})?$/).withMessage('Valid ZIP code is required')
];

router.post('/', authenticateToken, validateCustomer, async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const customer = await customerService.createCustomer(req.body);
    res.status(201).json(customer);
  } catch (error) {
    next(error);
  }
});

router.get('/:id', authenticateToken, async (req, res, next) => {
  try {
    const customer = await customerService.getCustomerById(req.params.id);
    if (!customer) {
      return res.status(404).json({ error: 'Customer not found' });
    }
    res.json(customer);
  } catch (error) {
    next(error);
  }
});

router.patch('/:id/status', authenticateToken, async (req, res, next) => {
  try {
    const { status } = req.body;
    const updated = await customerService.updateCustomerStatus(req.params.id, status);
    if (!updated) {
      return res.status(404).json({ error: 'Customer not found' });
    }
    res.json({ message: 'Customer status updated successfully' });
  } catch (error) {
    next(error);
  }
});

export default router;