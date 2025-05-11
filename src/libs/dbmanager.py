import mysql.connector
from datetime import date

class DBManager:
    def __init__(self, host, user, password, database):
        self.host = host
        self.user = user
        self.password = password
        self.database = database
        self.connection = None

    def connect(self):
        try:
            self.connection = mysql.connector.connect(
                host=self.host,
                user=self.user,
                password=self.password,
                database=self.database
            )
            print("Connected to MySQL database")
        except mysql.connector.Error as e:
            print(f"Error connecting to MySQL database: {e}")

    def disconnect(self):
        if self.connection:
            self.connection.close()
            print("Disconnected from MySQL database")

    def query(self, query):
        cursor = self.connection.cursor()
        try:
            cursor.execute(query)
            rows = cursor.fetchall()
            return rows
        except mysql.connector.Error as e:
            print(f"Error executing query: {e}")
            return None
        finally:
            cursor.close()

    def fetch_all_tasks(self):
        self.connection.reconnect()
        cursor = self.connection.cursor()
        try:
            cursor.execute(f"""SELECT id, Subject, task_stage FROM tasks """)
            rows = cursor.fetchall()
            return rows
        except Exception as e:
            print(e)
            return None
        
    def fetch_task_by_id(self,id):
        self.connection.reconnect()
        cursor = self.connection.cursor()
        try:
            cursor.execute(f"SELECT created_date,subject,description,due_date FROM tasks where id={id}")

            rows = cursor.fetchall()
            return rows
        except Exception as e:
            print(e)
            return None

    def fetch_auth_creds(self, username):
        self.connection.reconnect()
        cursor = self.connection.cursor()   
        try:
            cursor.execute(f"""SELECT * FROM auth WHERE username="{username}" """)
            rows = cursor.fetchall()
            return rows
        except Exception as e:
            print(e)
            return[('','')]
        
    def move_task(self, id, new_stage):
        self.connection.reconnect()
        cursor = self.connection.cursor()
        try:
            print(f"UPDATE tasks SET task_stage={new_stage} WHERE id={id};")
            cursor.execute(f"UPDATE tasks SET task_stage={new_stage} WHERE id={id};")
            self.connection.commit()
            rows = cursor.fetchall()
            return 1
        except:
            return 0
        
    def fetch_all_users(self):
        self.connection.reconnect()
        cursor = self.connection.cursor()
        try:
            cursor.execute(f"""SELECT id, name FROM users """)
            rows = cursor.fetchall()
            return rows
        except Exception as e:
            print(e)
            return None
        
    def fetch_all_users_detailed(self):
        self.connection.reconnect()
        cursor = self.connection.cursor()
        try:
            cursor.execute(f"""SELECT id, name, email, contact_num, role_id FROM users """)
            rows = cursor.fetchall()
            return rows
        except Exception as e:
            print(e)
            return None
        
    def fetch_all_clients(self):
        self.connection.reconnect()
        cursor = self.connection.cursor()
        try:
            cursor.execute(f"""SELECT id, name FROM clients """)
            rows = cursor.fetchall()
            return rows
        except Exception as e:
            print(e)
            return None
        
    def fetch_all_roles(self):
        self.connection.reconnect()
        cursor = self.connection.cursor()
        try:
            cursor.execute("SELECT id, role FROM roles ")
            rows = cursor.fetchall()
            return rows
        except Exception as e:
            print(e)
            return None

    def create_new_task(self, request_json: dict):
        query = f"""INSERT INTO task_manager_db.tasks \
(subject, description, creator_id, owner_id, assignee_id, client_id, task_stage, task_type, created_date, due_date) \
VALUES('{request_json['subject']}', '{request_json['description']}', {request_json['creator_id']}, {request_json['owner_id']}, \
{request_json['assignee_id']}, {request_json['client_id']}, {request_json.get('task_stage', 1)}, NULL, '{date.today()}', '{request_json['due_date']}');"""
        print(query)
        cursor = self.connection.cursor()
        try:
            cursor.execute(query)
            self.connection.commit()
            return 1
        except Exception as e:
            print(e)
            return 0

    def create_new_user(self, request_json: dict): 
        query = f"""INSERT INTO task_manager_db.users \
(name, email, contact_num, role_id) VALUES \
('{request_json['name']}','{request_json['email']}','{request_json['contact_num']}','{request_json['role_id']}')
"""
        cursor = self.connection.cursor()
        try:
            cursor.execute(query)
            self.connection.commit()
            return 1
        except Exception as e:
            print(e)
            return 0
