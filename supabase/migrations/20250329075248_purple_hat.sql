/*
  # Customer Profile Service Schema
  
  Key tables:
  - customers: Core customer information
  - customer_documents: KYC and verification documents
  - customer_interactions: Communication history
  - customer_preferences: Communication preferences
*/

CREATE DATABASE IF NOT EXISTS customer_service;
USE customer_service;

CREATE TABLE customers (
    id VARCHAR(36) PRIMARY KEY,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    phone VARCHAR(20),
    date_of_birth DATE NOT NULL,
    ssn VARCHAR(11),
    address TEXT NOT NULL,
    city VARCHAR(100) NOT NULL,
    state VARCHAR(2) NOT NULL,
    zip_code VARCHAR(10) NOT NULL,
    customer_since DATE NOT NULL,
    credit_score INT,
    status ENUM('ACTIVE', 'INACTIVE', 'SUSPENDED') NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE customer_documents (
    id VARCHAR(36) PRIMARY KEY,
    customer_id VARCHAR(36) NOT NULL,
    document_type VARCHAR(100) NOT NULL,
    document_number VARCHAR(100) NOT NULL,
    issuing_authority VARCHAR(100),
    issue_date DATE,
    expiry_date DATE,
    file_path VARCHAR(255) NOT NULL,
    verification_status ENUM('PENDING', 'VERIFIED', 'REJECTED') DEFAULT 'PENDING',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (customer_id) REFERENCES customers(id)
);

CREATE TABLE customer_interactions (
    id VARCHAR(36) PRIMARY KEY,
    customer_id VARCHAR(36) NOT NULL,
    interaction_type ENUM('CALL', 'EMAIL', 'CHAT', 'MEETING') NOT NULL,
    interaction_date TIMESTAMP NOT NULL,
    agent_id VARCHAR(36),
    summary TEXT NOT NULL,
    duration_minutes INT,
    sentiment ENUM('POSITIVE', 'NEUTRAL', 'NEGATIVE'),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (customer_id) REFERENCES customers(id)
);

CREATE TABLE customer_preferences (
    id VARCHAR(36) PRIMARY KEY,
    customer_id VARCHAR(36) NOT NULL,
    communication_channel ENUM('EMAIL', 'SMS', 'PHONE', 'MAIL') NOT NULL,
    marketing_preferences JSON,
    language_preference VARCHAR(2) DEFAULT 'EN',
    time_zone VARCHAR(50),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (customer_id) REFERENCES customers(id)
);