import { policyDb } from '../config/database.js';
import { v4 as uuidv4 } from 'uuid';

export class PolicyService {
  async createPolicy(policyData) {
    const id = uuidv4();
    const connection = await policyDb.getConnection();
    
    try {
      await connection.beginTransaction();
      
      const [result] = await connection.execute(
        'INSERT INTO policies (id, policy_number, policy_type_id, start_date, end_date, premium_amount, payment_frequency, status) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
        [id, policyData.policyNumber, policyData.policyTypeId, policyData.startDate, policyData.endDate, policyData.premiumAmount, policyData.paymentFrequency, 'PENDING']
      );
      
      await connection.commit();
      return { id, ...policyData };
    } catch (error) {
      await connection.rollback();
      throw error;
    } finally {
      connection.release();
    }
  }

  async getPolicyById(id) {
    const [rows] = await policyDb.execute(
      'SELECT * FROM policies WHERE id = ?',
      [id]
    );
    return rows[0];
  }

  async updatePolicyStatus(id, status) {
    const [result] = await policyDb.execute(
      'UPDATE policies SET status = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?',
      [status, id]
    );
    return result.affectedRows > 0;
  }
}