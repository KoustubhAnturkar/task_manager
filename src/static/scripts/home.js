let list = document.getElementsByClassName("list");
let newBox = document.getElementById("New");
let reviewBox = document.getElementById("Review");
let completeBox = document.getElementById("Complete");
let progressBox = document.getElementById("Progress");
var assigneeClicked = false;
var ownerClicked = false;
var clientClicked = false;
var users = null;
var clients = null;
var task_stage = null;

// Configuration for the fetch request

fetch('http://127.0.0.1:5000/tasks')
    .then(function (response) {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        // Parse the response JSON and return it
        return response.json();
    })
    .then(function (data) {
        console.log(data)
        // Success! Handle the data here
        for (var i = 0; i < data.length; i++) {
            // Create a new div element with the class 'list'
            var listItem = document.createElement('div');
            listItem.className = 'list';
            listItem.draggable = true; // Enable dragging
            listItem.task_id = data[i][0]
            listItem.onclick = partiallyApply(handleClick, listItem.task_id);

            // Set the content of the list item
            listItem.textContent = '' + data[i][1];

            // Append the list item to the container
            switch (data[i][2]) {
                case 1:
                    newBox.appendChild(listItem);
                    break;
                case 2:
                    progressBox.appendChild(listItem);
                    break;
                case 3:
                    reviewBox.appendChild(listItem);
                    break;
                case 4:
                    completeBox.appendChild(listItem);
                    break;
                default:
                    break;
            }

        }
        console.log(newBox);
        console.log(progressBox);
        console.log(reviewBox);
        console.log(completeBox);
        make_them_draggable();
    })
    .catch(function (error) {
        // Request failed
        console.error('Fetch error:', error.message);
    })
function make_them_draggable() {
    for (item of list) {
        console.log("HERE")

        item.addEventListener("dragstart", function (e) {
            let selected = e.target;
            selected.classList.add("is-dragging");
            console.log(selected.classList)
            newBox.addEventListener("dragover", function (e) {
                e.preventDefault();
                const bottomTask = insertAboveTask(newBox, e.clientY);
                const curTask = document.querySelector(".is-dragging");

                if (!bottomTask) {
                    newBox.appendChild(curTask);
                } else {
                    newBox.insertBefore(curTask, bottomTask);
                }
            });
            newBox.addEventListener("drop", function (e) {
                console.log("Moving task:" + selected.task_id + " to New")
                send_move_task_request(selected.task_id, 1);
                selected.classList.remove("is-dragging");

                const bottomTask = insertAboveTask(newBox, e.clientY);
                const curTask = selected;

                if (!bottomTask) {
                    newBox.appendChild(curTask);
                } else {
                    newBox.insertBefore(curTask, bottomTask);
                }
                selected = null;
                selected = null;
            })

            reviewBox.addEventListener("dragover", function (e) {
                e.preventDefault();
                const bottomTask = insertAboveTask(reviewBox, e.clientY);
                const curTask = document.querySelector(".is-dragging");

                if (!bottomTask) {
                    reviewBox.appendChild(curTask);
                } else {
                    reviewBox.insertBefore(curTask, bottomTask);
                }
            });
            reviewBox.addEventListener("drop", function (e) {
                console.log("Moving task:" + selected.task_id + " to Review")
                send_move_task_request(selected.task_id, 3);
                selected.classList.remove("is-dragging");

                const bottomTask = insertAboveTask(reviewBox, e.clientY);
                const curTask = selected;

                if (!bottomTask) {
                    reviewBox.appendChild(curTask);
                } else {
                    reviewBox.insertBefore(curTask, bottomTask);
                }
                selected = null;
            })

            completeBox.addEventListener("dragover", function (e) {
                e.preventDefault();
                const bottomTask = insertAboveTask(completeBox, e.clientY);
                const curTask = document.querySelector(".is-dragging");

                if (!bottomTask) {
                    completeBox.appendChild(curTask);
                } else {
                    completeBox.insertBefore(curTask, bottomTask);
                }
            });
            completeBox.addEventListener("drop", function (e) {
                console.log("Moving task:" + selected.task_id + " to Complete")
                send_move_task_request(selected.task_id, 4);
                selected.classList.remove("is-dragging");

                const bottomTask = insertAboveTask(completeBox, e.clientY);
                const curTask = selected;

                if (!bottomTask) {
                    completeBox.appendChild(curTask);
                } else {
                    completeBox.insertBefore(curTask, bottomTask);
                }
                selected = null;
                selected = null;
            })

            progressBox.addEventListener("dragover", function (e) {
                e.preventDefault();
                const bottomTask = insertAboveTask(progressBox, e.clientY);
                const curTask = document.querySelector(".is-dragging");

                if (!bottomTask) {
                    progressBox.appendChild(curTask);
                } else {
                    progressBox.insertBefore(curTask, bottomTask);
                }
            });
            progressBox.addEventListener("drop", function (e) {
                console.log("Moving task:" + selected.task_id + " to Progress")
                send_move_task_request(selected.task_id, 2);
                selected.classList.remove("is-dragging");

                const bottomTask = insertAboveTask(progressBox, e.clientY);
                const curTask = selected;

                if (!bottomTask) {
                    progressBox.appendChild(curTask);
                } else {
                    progressBox.insertBefore(curTask, bottomTask);
                }
                selected = null;
                selected = null;
            })

        })
    }
}

function send_move_task_request(id, new_stage) {
    data = {
        "id": id,
        "ns": new_stage
    }
    var requestOptionsPatch = {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    };

    fetch("http://127.0.0.1:5000/moveTask", requestOptionsPatch).then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        // Handle successful response
        console.log('PATCH request succeeded');
    })
        .catch(error => {
            // Handle error
            console.error('There was a problem with the PATCH request:', error.message);
        });
}

const insertAboveTask = (zone, mouseY) => {
    const els = zone.querySelectorAll(".list:not(.is-dragging)");

    let closestTask = null;
    let closestOffset = Number.NEGATIVE_INFINITY;

    els.forEach((task) => {
        const { top } = task.getBoundingClientRect();

        const offset = mouseY - top;

        if (offset < 0 && offset > closestOffset) {
            closestOffset = offset;
            closestTask = task;
        }
    });

    return closestTask;
};

function handleClick(id) {
    window.location.href = 'http://127.0.0.1:5000/taskDets/' + id;
}
function partiallyApply(func, ...args) {
    return function (...remainingArgs) {
        return func(...args, ...remainingArgs);
    };
}
var mini = true;

function toggleSidebar() {
    if (mini) {
        document.getElementById("mySidebar").style.width = "250px";
        document.getElementById("mySidebar").style.boxShadow = "12px 12px 12px rgba(0,0,0,.3)";
        this.mini = false;
    } else {
        document.getElementById("mySidebar").style.width = "100px";
        document.getElementById("mySidebar").style.boxShadow = "";
        this.mini = true;
    }
}

function togglePopup(stage) {
    task_stage=stage;
    console.log("new stage set to: " + task_stage)
    const overlay = document.getElementById('popupOverlay');
    overlay.classList.toggle('show');
}

function populateAssigneeDropdown() {
    if (!assigneeClicked) {
        var select = document.getElementById("assignee"); // Get the select element
        if (!users) {
            fetch('http://127.0.0.1:5000/users')
            .then(function (response) {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                // Parse the response JSON and return it
                return response.json();
            })
            .then(function (data) {
                console.log(data);
                users = data;
                for (var i = 0; i < users.length; i++) {
                    var option = document.createElement("option"); // Create a new option element
                    option.text = users[i][1]; // Set the text of the option
                    option.value = users[i][0]; // Set the value of the option (optional)
                    select.appendChild(option); // Append the option to the select element
                }
            })
            .catch(function (error) {
                // Request failed
                console.error('Fetch error:', error.message);
            })
        }
        else {
            for (var i = 0; i < users.length; i++) {
                var option = document.createElement("option"); // Create a new option element
                option.text = users[i][1]; // Set the text of the option
                option.value = users[i][0]; // Set the value of the option (optional)
                select.appendChild(option); // Append the option to the select element
            }
        }
        assigneeClicked = true;
    }
}

function populateOwnerDropdown() {
    if (!ownerClicked) {
        var select = document.getElementById("owner"); // Get the select element
        if (!users) {
            fetch('http://127.0.0.1:5000/users')
            .then(function (response) {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                // Parse the response JSON and return it
                return response.json();
            })
            .then(function (data) {
                console.log(data);
                users = data;
                for (var i = 0; i < users.length; i++) {
                    var option = document.createElement("option"); // Create a new option element
                    option.text = users[i][1]; // Set the text of the option
                    option.value = users[i][0]; // Set the value of the option (optional)
                    select.appendChild(option); // Append the option to the select element
                }
            })
            .catch(function (error) {
                // Request failed
                console.error('Fetch error:', error.message);
            })
        }
        else {
            for (var i = 0; i < users.length; i++) {
                var option = document.createElement("option"); // Create a new option element
                option.text = users[i][1]; // Set the text of the option
                option.value = users[i][0]; // Set the value of the option (optional)
                select.appendChild(option); // Append the option to the select element
            }
        }
        ownerClicked = true;
    }
}

function populateClientDropdown() {
    if (!clientClicked) {
        var select = document.getElementById("client"); // Get the select element
        if (!clients) {
            fetch('http://127.0.0.1:5000/clients')
            .then(function (response) {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                // Parse the response JSON and return it
                return response.json();
            })
            .then(function (data) {
                console.log(data);
                clients = data;
                for (var i = 0; i < clients.length; i++) {
                    var option = document.createElement("option"); // Create a new option element
                    option.text = clients[i][1]; // Set the text of the option
                    option.value = clients[i][0]; // Set the value of the option (optional)
                    select.appendChild(option); // Append the option to the select element
                }
            })
            .catch(function (error) {
                // Request failed
                console.error('Fetch error:', error.message);
            })
        }
        else {
            for (var i = 0; i < clients.length; i++) {
                var option = document.createElement("option"); // Create a new option element
                option.text = clients[i][1]; // Set the text of the option
                option.value = clients[i][0]; // Set the value of the option (optional)
                select.appendChild(option); // Append the option to the select element
            }
        }
        clientClicked = true;
    }
}

document.getElementById('task-form').addEventListener('submit', function(event) {
    event.preventDefault();  // Prevent the default form submission

    // Get form values
    var task_dict = {};
    task_dict['subject'] = document.getElementById('subject').value;
    task_dict['description'] = document.getElementById('description').value;
    task_dict['creator_id'] = "1" // TODO: Get creator from cookies
    task_dict['owner_id'] = document.getElementById('owner').value
    task_dict['assignee_id'] = document.getElementById('assignee').value
    task_dict['client_id'] = document.getElementById('client').value
    task_dict['due_date'] = document.getElementById('due').value
    if(task_stage){
        task_dict['task_stage']= task_stage
    }
    // Execute your function with the form values
    fetch('http://127.0.0.1:5000/newTask', {
            method: 'POST', // Specify the request method as POST
            headers: {
                'Content-Type': 'application/json' // Indicate that the content type is JSON
            },
            body: JSON.stringify(task_dict) // Attach the JSON data in the request body
        })
        .then(function (response) {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            // Parse the response JSON and return it
            togglePopup(null)
        })
        .catch((error) => {
            console.error('Error:', error); // Handle any errors
        });
});