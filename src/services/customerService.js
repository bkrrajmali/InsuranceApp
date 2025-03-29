import { customerDb } from '../config/database.js';
import { v4 as uuidv4 } from 'uuid';

export class CustomerService {
  async createCustomer(customerData) {
    const id = uuidv4();
    const connection = await customerDb.getConnection();
    
    try {
      await connection.beginTransaction();
      
      const [result] = await connection.execute(
        'INSERT INTO customers (id, first_name, last_name, email, phone, date_of_birth, address, city, state, zip_code, customer_since, status) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
        [id, customerData.firstName, customerData.lastName, customerData.email, customerData.phone, customerData.dateOfBirth, customerData.address, customerData.city, customerData.state, customerData.zipCode, new Date(), 'ACTIVE']
      );
      
      await connection.commit();
      return { id, ...customerData };
    } catch (error) {
      await connection.rollback();
      throw error;
    } finally {
      connection.release();
    }
  }

  async getCustomerById(id) {
    const [rows] = await customerDb.execute(
      'SELECT * FROM customers WHERE id = ?',
      [id]
    );
    return rows[0];
  }

  async updateCustomerStatus(id, status) {
    const [result] = await customerDb.execute(
      'UPDATE customers SET status = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?',
      [status, id]
    );
    return result.affectedRows > 0;
  }
}