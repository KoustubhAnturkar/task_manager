from flask import *
from libs import dbmanager as DB
app = Flask(__name__)

# Required
dbObject = DB.DBManager('localhost','root','admin','task_manager_db')
dbObject.connect()
@app.route("/login", methods=['GET'])
def login():
    return render_template('login.html')

@app.route("/home", methods=['GET'])
def home():
    return render_template('home.html')

@app.route("/", methods=["GET"])
def default_redirect():
    return redirect(url_for("login"))

@app.route("/loginpost", methods=['POST'])
def login_post():

    username = request.form['username']
    password = request.form['password']
    
    # Add your authentication logic here
    creds = dbObject.fetch_auth_creds(username)
    dbObject.disconnect()
    if password==creds[0][1]:
        return redirect(url_for('home'))
    else: 
        print(creds)
        abort(401)
    # For demonstration purposes, redirect  to a different page after login


@app.route("/tasks", methods=['GET'])
def get_tasks():
    return dbObject.fetch_all_tasks()

@app.route("/getTask/<id>", methods=['GET'])
def get_tasks_by_id(id):
    return dbObject.fetch_task_by_id(id)

@app.route("/createTask", methods=['POST'])
def create_tasks():
    return Response("Not Implemented", status=501)

@app.route("/taskDets/<id>", methods=['GET'])
def task_details(id):
    return render_template("task.html")

@app.route("/moveTask", methods=['PATCH'])
def move_task():
    fields = request.get_json()
    success = dbObject.move_task(fields['id'],fields['ns'])
    if success: 
        return Response("Success",status=200)
    return Response("Something went wrong",status=500)

@app.route("/users", methods=['GET'])
def get_users():
    return dbObject.fetch_all_users()

@app.route("/clients", methods=['GET'])
def get_clients():
    return dbObject.fetch_all_clients()


@app.route("/newTask", methods=['POST'])
def add_new_task():
    if not request.is_json:
        return Response("BAD REQUEST", status=400)
    task_json = request.json
    params = task_json.keys()
    required_params = ['subject', 'description', 'creator_id', 'owner_id', 'assignee_id', 'client_id', 'due_date']
    for param in required_params:
        if param not in params:
            return Response("BAD REQUEST", status=400)
    resp = dbObject.create_new_task(task_json)
    if resp:
        return Response(jsonify({'status': "Created"}), status=201)
    else: 
        return Response(jsonify({'status': "Oops something went wrong"}), status=502)

if __name__ == "__main__":
    app.run(debug=True)
