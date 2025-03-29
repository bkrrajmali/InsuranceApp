import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

const createPool = (database) => {
  return mysql.createPool({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: database,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
  });
};

export const policyDb = createPool('policy_service');
export const claimsDb = createPool('claims_service');
export const customerDb = createPool('customer_service');
export const billingDb = createPool('billing_service');
export const analyticsDb = createPool('analytics_service');