Create table tasks (
    id INT AUTO_INCREMENT PRIMARY KEY,
    subject VARCHAR(255) NOT NULL,
    description VARCHAR(255),
    creator_id INT NOT NULL,
    owner_id INT NOT NULL,
    assignee_id INT,
    client_id INT NOT NULL,
    task_stage INT NOT NULL DEFAULT 1,
    task_type INT,
    created_date DATE ,
    due_date DATE,
    FOREIGN KEY (creator_id) REFERENCES users(id),
    FOREIGN KEY (owner_id) REFERENCES users(id),
    FOREIGN KEY (assignee_id) REFERENCES users(id),
    FOREIGN KEY (client_id) REFERENCES clients(id),
    FOREIGN KEY (task_stage) REFERENCES stages(id),
    FOREIGN KEY (task_type) REFERENCES types(id)
);