DROP DATABASE IF EXISTS bamazon;
CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products (
  item_id INTEGER(10) AUTO_INCREMENT NOT NULL PRIMARY KEY,
  product_name VARCHAR(50) NOT NULL,
  department_name VARCHAR(50) NULL,
  price DECIMAL(10, 2) NULL,
  stock_quantity INTEGER(10) NULL
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Gillette Razors", "Men's Grooming", 15.00, 20);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Tide Laundry Detergent", "Laundry", 30.00, 15);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Doom", "Entertainment", 60.00, 45);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Apex Legends", "Entertainment", 0.00, 100);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Razer Laptop", "Computers", 2000.00, 5);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Bic Pens", "Office Supplies", 5.85, 50);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Bananas", "Produce", 2.00, 1000);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Fuji Apples", "Produce", 3.00, 500);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("MacBook Pro 15-inch", "Computers", 3140.58, 5);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("XBOX One X", "Entertainment", 320.99, 10);

SELECT * FROM products;
