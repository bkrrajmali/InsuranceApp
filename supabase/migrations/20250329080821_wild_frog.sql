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