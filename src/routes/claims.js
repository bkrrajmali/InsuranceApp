import express from 'express';
import { body, validationResult } from 'express-validator';
import { ClaimsService } from '../services/claimsService.js';
import { authenticateToken } from '../middleware/auth.js';

const router = express.Router();
const claimsService = new ClaimsService();

const validateClaim = [
  body('policyId').notEmpty().withMessage('Policy ID is required'),
  body('claimNumber').notEmpty().withMessage('Claim number is required'),
  body('incidentDate').isISO8601().withMessage('Valid incident date is required'),
  body('claimType').notEmpty().withMessage('Claim type is required'),
  body('description').notEmpty().withMessage('Description is required'),
  body('amountRequested').isFloat({ min: 0 }).withMessage('Valid amount is required')
];

router.post('/', authenticateToken, validateClaim, async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const claim = await claimsService.createClaim(req.body);
    res.status(201).json(claim);
  } catch (error) {
    next(error);
  }
});

router.get('/:id', authenticateToken, async (req, res, next) => {
  try {
    const claim = await claimsService.getClaimById(req.params.id);
    if (!claim) {
      return res.status(404).json({ error: 'Claim not found' });
    }
    res.json(claim);
  } catch (error) {
    next(error);
  }
});

router.patch('/:id/status', authenticateToken, async (req, res, next) => {
  try {
    const { status, amountApproved } = req.body;
    const updated = await claimsService.updateClaimStatus(req.params.id, status, amountApproved);
    if (!updated) {
      return res.status(404).json({ error: 'Claim not found' });
    }
    res.json({ message: 'Claim status updated successfully' });
  } catch (error) {
    next(error);
  }
});

export default router;