-- Create databases
CREATE DATABASE IF NOT EXISTS policy_service;
CREATE DATABASE IF NOT EXISTS claims_service;
CREATE DATABASE IF NOT EXISTS customer_service;
CREATE DATABASE IF NOT EXISTS billing_service;
CREATE DATABASE IF NOT EXISTS analytics_service;

-- Create user and grant privileges
CREATE USER IF NOT EXISTS 'insurance_user'@'%' IDENTIFIED BY 'insurance_password';
GRANT ALL PRIVILEGES ON policy_service.* TO 'insurance_user'@'%';
GRANT ALL PRIVILEGES ON claims_service.* TO 'insurance_user'@'%';
GRANT ALL PRIVILEGES ON customer_service.* TO 'insurance_user'@'%';
GRANT ALL PRIVILEGES ON billing_service.* TO 'insurance_user'@'%';
GRANT ALL PRIVILEGES ON analytics_service.* TO 'insurance_user'@'%';
FLUSH PRIVILEGES;

-- Policy Service Schema
USE policy_service;

CREATE TABLE IF NOT EXISTS policy_types (
    id VARCHAR(36) PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    coverage_rules JSON,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS policies (
    id VARCHAR(36) PRIMARY KEY,
    policy_number VARCHAR(50) UNIQUE NOT NULL,
    policy_type_id VARCHAR(36) NOT NULL,
    customer_id VARCHAR(36) NOT NULL,
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    premium_amount DECIMAL(10,2) NOT NULL,
    payment_frequency ENUM('MONTHLY', 'QUARTERLY', 'ANNUALLY') NOT NULL,
    status ENUM('ACTIVE', 'EXPIRED', 'CANCELLED', 'PENDING') NOT NULL,
    terms_and_conditions TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (policy_type_id) REFERENCES policy_types(id)
);

CREATE TABLE IF NOT EXISTS coverage_details (
    id VARCHAR(36) PRIMARY KEY,
    policy_id VARCHAR(36) NOT NULL,
    coverage_type VARCHAR(100) NOT NULL,
    coverage_limit DECIMAL(12,2) NOT NULL,
    deductible DECIMAL(10,2) NOT NULL,
    co_payment_percentage DECIMAL(5,2),
    exclusions TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (policy_id) REFERENCES policies(id)
);

-- Claims Service Schema
USE claims_service;

CREATE TABLE IF NOT EXISTS claims (
    id VARCHAR(36) PRIMARY KEY,
    policy_id VARCHAR(36) NOT NULL,
    claim_number VARCHAR(50) UNIQUE NOT NULL,
    customer_id VARCHAR(36) NOT NULL,
    incident_date DATE NOT NULL,
    filing_date DATE NOT NULL,
    claim_type VARCHAR(100) NOT NULL,
    description TEXT NOT NULL,
    incident_location VARCHAR(255),
    status ENUM('PENDING', 'IN_REVIEW', 'APPROVED', 'REJECTED', 'SETTLED') NOT NULL,
    amount_requested DECIMAL(12,2) NOT NULL,
    amount_approved DECIMAL(12,2),
    adjuster_id VARCHAR(36),
    resolution_date DATE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS claim_documents (
    id VARCHAR(36) PRIMARY KEY,
    claim_id VARCHAR(36) NOT NULL,
    document_type VARCHAR(100) NOT NULL,
    file_path VARCHAR(255) NOT NULL,
    file_size INT NOT NULL,
    mime_type VARCHAR(100) NOT NULL,
    upload_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    uploaded_by VARCHAR(36) NOT NULL,
    verification_status ENUM('PENDING', 'VERIFIED', 'REJECTED') DEFAULT 'PENDING',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (claim_id) REFERENCES claims(id)
);

CREATE TABLE IF NOT EXISTS claim_notes (
    id VARCHAR(36) PRIMARY KEY,
    claim_id VARCHAR(36) NOT NULL,
    note_text TEXT NOT NULL,
    note_type ENUM('INTERNAL', 'CUSTOMER_FACING') NOT NULL,
    created_by VARCHAR(36) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (claim_id) REFERENCES claims(id)
);

-- Customer Service Schema
USE customer_service;

CREATE TABLE IF NOT EXISTS customers (
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

-- Billing Service Schema
USE billing_service;

CREATE TABLE IF NOT EXISTS invoices (
    id VARCHAR(36) PRIMARY KEY,
    policy_id VARCHAR(36) NOT NULL,
    customer_id VARCHAR(36) NOT NULL,
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

CREATE TABLE IF NOT EXISTS payments (
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

-- Analytics Service Schema
USE analytics_service;

CREATE TABLE IF NOT EXISTS analytics_metrics (
    id VARCHAR(36) PRIMARY KEY,
    metric_name VARCHAR(100) NOT NULL,
    metric_value DECIMAL(15,2) NOT NULL,
    metric_type ENUM('FINANCIAL', 'OPERATIONAL', 'CUSTOMER', 'RISK') NOT NULL,
    calculation_period_start DATE NOT NULL,
    calculation_period_end DATE NOT NULL,
    dimension_values JSON,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS report_definitions (
    id VARCHAR(36) PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    report_type ENUM('CLAIMS', 'POLICIES', 'FINANCIAL', 'CUSTOMER', 'OPERATIONAL') NOT NULL,
    query_definition JSON NOT NULL,
    parameters JSON,
    output_format ENUM('PDF', 'EXCEL', 'CSV', 'JSON') NOT NULL,
    created_by VARCHAR(36) NOT NULL,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);