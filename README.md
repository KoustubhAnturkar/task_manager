# Task Manager

A web-based task and client management system built with Flask and MySQL.

## Features
- Kanban-style task board (drag and drop)
- Client management dashboard
- Role-based access (Admin, User, etc.)
- Responsive UI with modern sidebar navigation
- Add, edit, and view details for users and clients

## Project Structure
```
.
├── src/
│   ├── app.py                # Flask application
│   ├── templates/            # HTML templates (Jinja2)
│   ├── static/               # CSS, JS, images
│   └── libs/                 # Database manager, utilities
├── Schema/                   # SQL schema files
├── requirements.txt          # Python dependencies
├── task_manager/             # Python virtual environment
└── tests/                    # Test files
```

## Setup Instructions
1. Clone the repository
2. Set up a Python virtual environment and install dependencies:
   ```sh
   python -m venv venv
   venv\Scripts\activate  # On Windows
   pip install -r requirements.txt
   ```
3. Set up the MySQL database using the scripts in the `Schema/` folder.
4. Run the Flask app:
   ```sh
   cd src
   flask run
   ```
5. Open your browser at [http://127.0.0.1:5000](http://127.0.0.1:5000)

## Screenshots
<img width="1910" height="861" alt="Screenshot 2025-08-24 143848" src="https://github.com/user-attachments/assets/41cd962a-6869-4bdf-a423-8631ffee3b36" />
<img width="1918" height="860" alt="Screenshot 2025-08-24 143920" src="https://github.com/user-attachments/assets/046e7b95-8215-4a23-a4cb-86c7778495d9" />
<img width="1914" height="854" alt="Screenshot 2025-08-24 143933" src="https://github.com/user-attachments/assets/aed266a8-2372-4085-af4e-47b3dd994dc3" />
<img width="640" height="795" alt="Screenshot 2025-08-24 143945" src="https://github.com/user-attachments/assets/da7ac4f0-3ada-4e85-a864-6d57b150f6cc" />
<img width="774" height="532" alt="Screenshot 2025-08-24 144002" src="https://github.com/user-attachments/assets/e07f3fb9-3a2f-44ef-8341-4bfc3e1d530f" />
