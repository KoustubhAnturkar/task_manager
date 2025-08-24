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
