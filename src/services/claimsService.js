import { claimsDb } from '../config/database.js';
import { v4 as uuidv4 } from 'uuid';

export class ClaimsService {
  async createClaim(claimData) {
    const id = uuidv4();
    const connection = await claimsDb.getConnection();
    
    try {
      await connection.beginTransaction();
      
      const [result] = await connection.execute(
        'INSERT INTO claims (id, policy_id, claim_number, incident_date, filing_date, claim_type, description, status, amount_requested) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
        [id, claimData.policyId, claimData.claimNumber, claimData.incidentDate, new Date(), claimData.claimType, claimData.description, 'PENDING', claimData.amountRequested]
      );
      
      await connection.commit();
      return { id, ...claimData };
    } catch (error) {
      await connection.rollback();
      throw error;
    } finally {
      connection.release();
    }
  }

  async getClaimById(id) {
    const [rows] = await claimsDb.execute(
      'SELECT * FROM claims WHERE id = ?',
      [id]
    );
    return rows[0];
  }

  async updateClaimStatus(id, status, amountApproved = null) {
    const [result] = await claimsDb.execute(
      'UPDATE claims SET status = ?, amount_approved = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?',
      [status, amountApproved, id]
    );
    return result.affectedRows > 0;
  }
}