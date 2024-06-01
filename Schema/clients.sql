CREATE TABLE clients (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    contact_num VARCHAR(255),
    pan VARCHAR(255) NOT NULL,
    gst_num VARCHAR(255),
    tan VARCHAR(255),
    address VARCHAR(255),
    email VARCHAR(255),
    gst boolean,
    tds boolean,
    tax_audit boolean,
    status_id int,
    group_id int,
    FOREIGN KEY (status_id) REFERENCES client_status(id),
    FOREIGN KEY (group_id) REFERENCES client_groups(id)
);
