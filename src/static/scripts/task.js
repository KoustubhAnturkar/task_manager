const subject = null;
const description = null;
const create_date = null;
const due_date=null
const path=window.location.pathname.split('/')
const id = path[path.length - 1]
console.log(id)
fetch('http://127.0.0.1:5000/getTask/'+ id)
    .then(function(response) {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        // Parse the response JSON and return it
        return response.json();
    })
    .then(function(data) {
        console.log(data);
        document.getElementById('subject').textContent = data[0][1];
        document.getElementById('description').textContent = data[0][2];
        document.getElementById('create-date').textContent = format_date(data[0][0]);
        document.getElementById('due-date').textContent = format_date(data[0][3]);

    })
    .catch(function(error) {
        // Request failed
        console.error('Fetch error:', error.message);
})

function format_date(date) {
    var date = new Date(date);

    // Get the day, month, and year components
    var day = date.getDate();
    var month = date.toLocaleString('default', { month: 'short' });
    var year = date.getFullYear();

    // Format the date as "DD Mon YYYY"
    var formattedDate = `${day} ${month} ${year}`;
    return formattedDate;
}


