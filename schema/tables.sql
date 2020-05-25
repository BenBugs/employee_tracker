USE employee_tracker;

CREATE TABLE employee 
(
employee_id INT AUTO_INCREMENT NOT NULL,
 first_name VARCHAR(30),
 last_name VARCHAR(30), 
 role_id INT, 
 manager_id int,
 PRIMARY KEY (employee_id)
 );



CREATE TABLE role 
(
role_id INT AUTO_INCREMENT NOT NULL,
 title VARCHAR(30),
 salary INT, 
 department_id int,
 PRIMARY KEY (role_id)
 );
 

 CREATE TABLE department
(
department_id INT AUTO_INCREMENT NOT NULL,
 department_name VARCHAR(30),
 PRIMARY KEY (department_id)
 );