/*
  # Analytics and Reporting Service Schema
  
  Key tables:
  - report_definitions: Report templates and configurations
  - report_schedules: Scheduled report generation
  - analytics_metrics: Key performance indicators
  - data_aggregations: Pre-calculated analytics data
*/

CREATE DATABASE IF NOT EXISTS analytics_service;
USE analytics_service;

CREATE TABLE report_definitions (
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

CREATE TABLE report_schedules (
    id VARCHAR(36) PRIMARY KEY,
    report_definition_id VARCHAR(36) NOT NULL,
    schedule_type ENUM('DAILY', 'WEEKLY', 'MONTHLY', 'QUARTERLY') NOT NULL,
    next_run_date TIMESTAMP NOT NULL,
    recipients JSON NOT NULL,
    parameters JSON,
    is_active BOOLEAN DEFAULT true,
    last_run_status ENUM('SUCCESS', 'FAILED', 'PENDING') DEFAULT 'PENDING',
    last_run_date TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (report_definition_id) REFERENCES report_definitions(id)
);

CREATE TABLE analytics_metrics (
    id VARCHAR(36) PRIMARY KEY,
    metric_name VARCHAR(100) NOT NULL,
    metric_value DECIMAL(15,2) NOT NULL,
    metric_type ENUM('FINANCIAL', 'OPERATIONAL', 'CUSTOMER', 'RISK') NOT NULL,
    calculation_period_start DATE NOT NULL,
    calculation_period_end DATE NOT NULL,
    dimension_values JSON,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE data_aggregations (
    id VARCHAR(36) PRIMARY KEY,
    aggregation_key VARCHAR(100) NOT NULL,
    aggregation_type ENUM('SUM', 'AVG', 'COUNT', 'MIN', 'MAX') NOT NULL,
    dimension VARCHAR(100) NOT NULL,
    time_period DATE NOT NULL,
    value DECIMAL(15,2) NOT NULL,
    metadata JSON,
    last_updated TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes for better query performance
CREATE INDEX idx_metrics_period ON analytics_metrics(calculation_period_start, calculation_period_end);
CREATE INDEX idx_aggregations_key_period ON data_aggregations(aggregation_key, time_period);