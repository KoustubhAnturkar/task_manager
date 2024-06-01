CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255),
    contact_num VARCHAR(255),
    role_id int,
    FOREIGN KEY (role_id) REFERENCES roles(id)
);
