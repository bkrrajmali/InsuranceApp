/*
  # Billing and Payments Service Schema
  
  Key tables:
  - invoices: Billing records
  - payments: Payment transactions
  - payment_methods: Stored payment methods
  - billing_schedules: Premium payment schedules
*/

CREATE DATABASE IF NOT EXISTS billing_service;
USE billing_service;

CREATE TABLE invoices (
    id VARCHAR(36) PRIMARY KEY,
    policy_id VARCHAR(36) NOT NULL,
    invoice_number VARCHAR(50) UNIQUE NOT NULL,
    amount DECIMAL(10,2) NOT NULL,
    due_date DATE NOT NULL,
    billing_period_start DATE NOT NULL,
    billing_period_end DATE NOT NULL,
    status ENUM('DRAFT', 'SENT', 'PAID', 'OVERDUE', 'CANCELLED') NOT NULL,
    payment_terms INT DEFAULT 30,
    late_fee_amount DECIMAL(10,2) DEFAULT 0.00,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE payments (
    id VARCHAR(36) PRIMARY KEY,
    invoice_id VARCHAR(36) NOT NULL,
    payment_amount DECIMAL(10,2) NOT NULL,
    payment_date TIMESTAMP NOT NULL,
    payment_method_id VARCHAR(36) NOT NULL,
    transaction_id VARCHAR(100) UNIQUE NOT NULL,
    status ENUM('PENDING', 'COMPLETED', 'FAILED', 'REFUNDED') NOT NULL,
    failure_reason TEXT,
    refund_id VARCHAR(36),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (invoice_id) REFERENCES invoices(id)
);

CREATE TABLE payment_methods (
    id VARCHAR(36) PRIMARY KEY,
    customer_id VARCHAR(36) NOT NULL,
    method_type ENUM('CREDIT_CARD', 'DEBIT_CARD', 'ACH', 'WIRE') NOT NULL,
    account_last4 VARCHAR(4) NOT NULL,
    expiry_date DATE,
    billing_address TEXT,
    is_default BOOLEAN DEFAULT false,
    status ENUM('ACTIVE', 'EXPIRED', 'CANCELLED') NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE billing_schedules (
    id VARCHAR(36) PRIMARY KEY,
    policy_id VARCHAR(36) NOT NULL,
    frequency ENUM('MONTHLY', 'QUARTERLY', 'ANNUALLY') NOT NULL,
    next_billing_date DATE NOT NULL,
    amount DECIMAL(10,2) NOT NULL,
    auto_pay BOOLEAN DEFAULT false,
    payment_method_id VARCHAR(36),
    reminder_days INT DEFAULT 7,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (payment_method_id) REFERENCES payment_methods(id)
);