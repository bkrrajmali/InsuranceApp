import express from 'express';
import { body, validationResult } from 'express-validator';
import { AnalyticsService } from '../services/analyticsService.js';
import { authenticateToken } from '../middleware/auth.js';

const router = express.Router();
const analyticsService = new AnalyticsService();

const validateReport = [
  body('name').notEmpty().withMessage('Report name is required'),
  body('description').optional(),
  body('reportType').isIn(['CLAIMS', 'POLICIES', 'FINANCIAL', 'CUSTOMER', 'OPERATIONAL']).withMessage('Valid report type is required'),
  body('queryDefinition').isObject().withMessage('Query definition is required'),
  body('outputFormat').isIn(['PDF', 'EXCEL', 'CSV', 'JSON']).withMessage('Valid output format is required'),
  body('createdBy').notEmpty().withMessage('Creator ID is required')
];

const validateMetric = [
  body('name').notEmpty().withMessage('Metric name is required'),
  body('value').isFloat().withMessage('Valid metric value is required'),
  body('type').isIn(['FINANCIAL', 'OPERATIONAL', 'CUSTOMER', 'RISK']).withMessage('Valid metric type is required'),
  body('periodStart').isISO8601().withMessage('Valid period start is required'),
  body('periodEnd').isISO8601().withMessage('Valid period end is required'),
  body('dimensions').optional().isObject()
];

router.post('/reports', authenticateToken, validateReport, async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const report = await analyticsService.createReport(req.body);
    res.status(201).json(report);
  } catch (error) {
    next(error);
  }
});

router.post('/metrics', authenticateToken, validateMetric, async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const metric = await analyticsService.recordMetric(req.body);
    res.status(201).json(metric);
  } catch (error) {
    next(error);
  }
});

export default router;