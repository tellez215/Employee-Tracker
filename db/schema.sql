DROP DATABASE IF EXISTS employee_db;
CREATE DATABASE employee_db;

USE employee_db;

CREATE TABLE department (

id INT AUTO_INCREMENT,
name VARCHAR(30) NOT NULL,
PRIMARY KEY (id)

);


CREATE TABLE role