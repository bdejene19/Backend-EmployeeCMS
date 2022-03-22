INSERT INTO department(dept_name)
VALUES  ('Engineer'),
        ('Administration'),
        ("Communications"),
        ("Sales"),
        ("Finance"),
        ('Executive');

INSERT INTO employee_role(title, salary, dept_id)
VALUES  ('Software Developer', 80000.0, 1),
        ("Receptionist", 60000.0, 3),
        ("Sales Manager", 90000.0, 4),
        ("Lead Software Engineer", 120000.0, 1),
        ('Sales Associate', 70000.0, 4);

INSERT INTO employee(first_name, last_name, role_id, manager_id)
VALUES  ("Bement", "Dejene", 1, 1),
        ("Bruk", "Dejene", 1, 2),
        ("Teddy", "Dejene", 3, 2),
        ("Dejene", "Sahle", 2, 2),
        ("Justin", "Kim", 5, 3);

        