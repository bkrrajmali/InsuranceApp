import { analyticsDb } from '../config/database.js';
import { v4 as uuidv4 } from 'uuid';

export class AnalyticsService {
  async createReport(reportData) {
    const id = uuidv4();
    const connection = await analyticsDb.getConnection();
    
    try {
      await connection.beginTransaction();
      
      const [result] = await connection.execute(
        'INSERT INTO report_definitions (id, name, description, report_type, query_definition, output_format, created_by, is_active) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
        [id, reportData.name, reportData.description, reportData.reportType, JSON.stringify(reportData.queryDefinition), reportData.outputFormat, reportData.createdBy, true]
      );
      
      await connection.commit();
      return { id, ...reportData };
    } catch (error) {
      await connection.rollback();
      throw error;
    } finally {
      connection.release();
    }
  }

  async recordMetric(metricData) {
    const id = uuidv4();
    const [result] = await analyticsDb.execute(
      'INSERT INTO analytics_metrics (id, metric_name, metric_value, metric_type, calculation_period_start, calculation_period_end, dimension_values) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [id, metricData.name, metricData.value, metricData.type, metricData.periodStart, metricData.periodEnd, JSON.stringify(metricData.dimensions)]
    );
    return { id, ...metricData };
  }
}