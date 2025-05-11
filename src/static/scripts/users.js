
var mini = false;
var roles = null;
var roleClicked = false;


// Side bar functions
function toggleSidebar() {
    var sidebar = document.getElementById("mySidebar");
    if (!mini) {
        sidebar.style.width = "250px";
        sidebar.style.boxShadow = "12px 12px 12px rgba(0,0,0,.3)";
    } else {
        sidebar.style.width = "100px";
        sidebar.style.boxShadow = "";
    }
}

// Set mini to true only when mouse leaves the sidebar
var sidebarElem = document.getElementById("mySidebar");
if (sidebarElem) {
    sidebarElem.addEventListener('mouseover', function() {
        mini = false;
        toggleSidebar();
    });
    sidebarElem.addEventListener('mouseout', function() {
        mini = true;
        toggleSidebar();
    });
}


// Populate Users dashboard
document.addEventListener('DOMContentLoaded', function () {
    fetch('http://127.0.0.1:5000/usersDetailed')
        .then(function (response) {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(function (data) {
            var tbody = document.querySelector('.table tbody');
            tbody.innerHTML = '';
            data.forEach(function (user) {
                console.log(user)
                var tr = document.createElement('tr');
                tr.innerHTML =
                    `<td>${user[0]}</td>` +
                    `<td>${user[1]}</td>` +
                    `<td>${user[2] || ''}</td>` +
                    `<td class='a-center'>${user[3] || ''}</td>` +
                    `<td class='a-center'>${user[4] || ''}</td>` +
                    `<td class='a-right'><a href='#' class='edit'>Edit</a></td>`;
                tbody.appendChild(tr);
            });
        })
        .catch(function (error) {
            console.error('Fetch error:', error.message);
        });
});

/* New User Popups*/
function populateRoleDropDown() {
    if (!roleClicked) {
        var select = document.getElementById("role_id"); // Get the select element
        if (!roles) {
            fetch('http://127.0.0.1:5000/roles')
            .then(function (response) {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                // Parse the response JSON and return it
                return response.json();
            })
            .then(function (data) {
                console.log(data);
                roles = data;
                for (var i = 0; i < roles.length; i++) {
                    var option = document.createElement("option"); // Create a new option element
                    option.text = roles[i][1]; // Set the text of the option
                    option.value = roles[i][0]; // Set the value of the option (optional)
                    select.appendChild(option); // Append the option to the select element
                }
            })
            .catch(function (error) {
                // Request failed
                console.error('Fetch error:', error.message);
            })
        }
        else {
            for (var i = 0; i < roles.length; i++) {
                var option = document.createElement("option"); // Create a new option element
                option.text = roles[i][1]; // Set the text of the option
                option.value = roles[i][0]; // Set the value of the option (optional)
                select.appendChild(option); // Append the option to the select element
            }
        }
        roleClicked = true;
    }
}


function togglePopup() {
    const overlay = document.getElementById('popupOverlay');
    overlay.classList.toggle('show');
};


document.getElementById('user-form').addEventListener('submit', function(event) {
    event.preventDefault();  // Prevent the default form submission

    // Get form values
    var task_dict = {};
    task_dict['name'] = document.getElementById('name').value;
    task_dict['email'] = document.getElementById('email').value;
    task_dict['contact_num'] = document.getElementById('contact_num').value
    task_dict['role_id'] = document.getElementById('role_id').value
    // Execute your function with the form values
    fetch('http://127.0.0.1:5000/newUser', {
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