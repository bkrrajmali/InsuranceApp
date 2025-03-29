/*
  # Claims Processing Service Schema
  
  1. Tables
    - claims: Main claims information
    - claim_documents: Supporting documents for claims
    - claim_notes: Processing notes and updates
    - claim_payments: Payment details for approved claims
*/

CREATE TABLE claims (
    id VARCHAR(36) PRIMARY KEY,
    policy_id VARCHAR(36) NOT NULL,
    claim_number VARCHAR(50) UNIQUE NOT NULL,
    incident_date DATE NOT NULL,
    filing_date DATE NOT NULL,
    claim_type VARCHAR(100) NOT NULL,
    description TEXT NOT NULL,
    status ENUM('PENDING', 'IN_REVIEW', 'APPROVED', 'REJECTED', 'SETTLED') NOT NULL,
    amount_requested DECIMAL(12,2) NOT NULL,
    amount_approved DECIMAL(12,2),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE claim_documents (
    id VARCHAR(36) PRIMARY KEY,
    claim_id VARCHAR(36) NOT NULL,
    document_type VARCHAR(100) NOT NULL,
    file_path VARCHAR(255) NOT NULL,
    upload_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (claim_id) REFERENCES claims(id)
);

CREATE TABLE claim_notes (
    id VARCHAR(36) PRIMARY KEY,
    claim_id VARCHAR(36) NOT NULL,
    note_text TEXT NOT NULL,
    created_by VARCHAR(100) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (claim_id) REFERENCES claims(id)
);

CREATE TABLE claim_payments (
    id VARCHAR(36) PRIMARY KEY,
    claim_id VARCHAR(36) NOT NULL,
    payment_amount DECIMAL(12,2) NOT NULL,
    payment_date DATE NOT NULL,
    payment_method VARCHAR(50) NOT NULL,
    transaction_id VARCHAR(100) UNIQUE NOT NULL,
    status ENUM('PENDING', 'PROCESSED', 'FAILED') NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (claim_id) REFERENCES claims(id)
);