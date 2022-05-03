INSERT INTO department (name)
VALUES 
('Operations'),
('Sales & Marketing'),
('Finance & Accounting'),
('IT');

INSERT INTO role (title,salary,department_id)
VALUES 
('Operations Manager',90000,1),
('Operations Analyst',85000,1),
('Sales Representative',70000,2),
('Marketing Manager',110000,2),
('Accountant',55000,3),
('Senior Accountant',95000,3),
('Junior Software Developer',90000,4),
('Software Engineer',135000,4);


INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES 
('Christian','Tellez',4,null),
('Ja', 'Morant',1,1),
('Klay', 'Thompson',2,null),
('Stephen','Curry',3,2),
('Lebron','James',5,null),
('Kai','Cenant',6,3),
('Duke','Dennis',7,null),
('Drake','Miller',8,5);