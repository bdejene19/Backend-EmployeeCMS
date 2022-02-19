DROP DATABASE IF EXISTS businessOverlook_db;
CREATE DATABASE businessOverlook_db;

USE businessOverlook_db;

CREATE TABLE department (
    id INT AUTO_INCREMENT PRIMARY KEY,
    dept_name VARCHAR(30) NOT NULL UNIQUE
);

CREATE TABLE employee_role (
    id INT  AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(30),
    salary DECIMAL,
    dept_id INT,
    FOREIGN KEY (dept_id) REFERENCES department(id) ON DELETE CASCADE
);

CREATE TABLE employee (
    id INT AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(30),
    last_name VARCHAR(30),
    role_id INT,
    manager_id INT,


    -- role table foreign key link to employee table role attribute
    -- NOTE: to add multiple foreign keys, you separate them with a comma, just like other attributes
    FOREIGN KEY (role_id) REFERENCES employee_role(id) ON DELETE CASCADE,
    FOREIGN KEY (manager_id) REFERENCES employee(id) ON DELETE CASCADE

);
