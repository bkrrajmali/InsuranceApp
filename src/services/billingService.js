import { billingDb } from '../config/database.js';
import { v4 as uuidv4 } from 'uuid';

export class BillingService {
  async createInvoice(invoiceData) {
    const id = uuidv4();
    const connection = await billingDb.getConnection();
    
    try {
      await connection.beginTransaction();
      
      const [result] = await connection.execute(
        'INSERT INTO invoices (id, policy_id, invoice_number, amount, due_date, billing_period_start, billing_period_end, status) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
        [id, invoiceData.policyId, invoiceData.invoiceNumber, invoiceData.amount, invoiceData.dueDate, invoiceData.periodStart, invoiceData.periodEnd, 'DRAFT']
      );
      
      await connection.commit();
      return { id, ...invoiceData };
    } catch (error) {
      await connection.rollback();
      throw error;
    } finally {
      connection.release();
    }
  }

  async processPayment(paymentData) {
    const id = uuidv4();
    const connection = await billingDb.getConnection();
    
    try {
      await connection.beginTransaction();
      
      const [result] = await connection.execute(
        'INSERT INTO payments (id, invoice_id, payment_amount, payment_date, payment_method_id, transaction_id, status) VALUES (?, ?, ?, ?, ?, ?, ?)',
        [id, paymentData.invoiceId, paymentData.amount, new Date(), paymentData.paymentMethodId, paymentData.transactionId, 'PENDING']
      );
      
      await connection.commit();
      return { id, ...paymentData };
    } catch (error) {
      await connection.rollback();
      throw error;
    } finally {
      connection.release();
    }
  }
}