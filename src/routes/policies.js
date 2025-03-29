import express from 'express';
import { body, validationResult } from 'express-validator';
import { PolicyService } from '../services/policyService.js';
import { authenticateToken } from '../middleware/auth.js';

const router = express.Router();
const policyService = new PolicyService();

const validatePolicy = [
  body('policyNumber').notEmpty().withMessage('Policy number is required'),
  body('policyTypeId').notEmpty().withMessage('Policy type is required'),
  body('startDate').isISO8601().withMessage('Valid start date is required'),
  body('endDate').isISO8601().withMessage('Valid end date is required'),
  body('premiumAmount').isFloat({ min: 0 }).withMessage('Valid premium amount is required'),
  body('paymentFrequency').isIn(['MONTHLY', 'QUARTERLY', 'ANNUALLY']).withMessage('Valid payment frequency is required')
];

router.post('/', authenticateToken, validatePolicy, async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const policy = await policyService.createPolicy(req.body);
    res.status(201).json(policy);
  } catch (error) {
    next(error);
  }
});

router.get('/:id', authenticateToken, async (req, res, next) => {
  try {
    const policy = await policyService.getPolicyById(req.params.id);
    if (!policy) {
      return res.status(404).json({ error: 'Policy not found' });
    }
    res.json(policy);
  } catch (error) {
    next(error);
  }
});

router.patch('/:id/status', authenticateToken, async (req, res, next) => {
  try {
    const { status } = req.body;
    const updated = await policyService.updatePolicyStatus(req.params.id, status);
    if (!updated) {
      return res.status(404).json({ error: 'Policy not found' });
    }
    res.json({ message: 'Policy status updated successfully' });
  } catch (error) {
    next(error);
  }
});

export default router;