
CREATE TABLE IF NOT EXISTS customers (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100),
  email VARCHAR(100)
);

CREATE TABLE IF NOT EXISTS policies (
  id SERIAL PRIMARY KEY,
  type VARCHAR(50),
  description TEXT,
  customer_id INT
);

INSERT INTO customers (name, email) VALUES
('John Doe', 'john@example.com'),
('Jane Smith', 'jane@example.com');

INSERT INTO policies (type, description, customer_id) VALUES
('Health', 'Health Insurance Policy', 1),
('Auto', 'Car Insurance Policy', 2);
