/*
Citation for this file:
Date: 6/8/2023
Adapted from OSU CS340 Ecampus starter code.
Source URL: https://github.com/osu-cs340-ecampus/nodejs-starter-app
*/

// Get the objects we need to modify
let addActorRoleForm = document.getElementById('add-actor-role-form');

// Modify the objects we need
addActorRoleForm.addEventListener("submit", function (event) {

    // Prevent the form from submitting
    event.preventDefault();

    // Get form fields we need to get data from
    let inputMovieId = document.getElementById("input-movie-id");
    let inputActorId = document.getElementById("input-actor-id");

    // Get the values from the form fields
    let movieIdValue = inputMovieId.value;
    let actorIdValue = inputActorId.value;

    // Perform data validation: Check that ID combinations are unique
    let movies = document.querySelectorAll(".movie-id");
    let actors = document.querySelectorAll(".actor-id");
    let actorRoleIds = Array.from(actors).map(function (actor, i) {
        let movie = movies[i];
        // Returns array of ID combos extracted from table, e.g., ['1-2', '3-4', ...]
        return actor.textContent.match(/\d+/)[0] + "-" + movie.textContent.match(/\d+/)[0];
    });

    let isDuplicate = actorRoleIds.includes(actorIdValue + "-" + movieIdValue);
    if (isDuplicate) {
        alert("Actor ID and movie ID combination must be unique.");
        return;
    }

    // Put our data we want to send in a javascript object
    let data = {
        movieId: movieIdValue,
        actorId: actorIdValue
    }

    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();

    // Add new row to database using Express route.
    xhttp.open("POST", "/add-actor-role", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell our AJAX request how to resolve.
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {

            // Add the new data to the table (see helper function below)
            addRowToTable(xhttp.response);

            // Clear the input fields for another transaction
            inputMovieId.value = '';
            inputActorId.value = '';
        }
        else if (xhttp.readyState == 4 && xhttp.status != 200) {
            console.log("There was an error with the input.")
        }
    }
    // Send the request and wait for the response
    xhttp.send(JSON.stringify(data));

});


// Creates a single HTML row from an Object representing a single record,
// where data is the response that includes all records, including the newly created one.
addRowToTable = (data) => {

    // Get a reference to the current table on the page.
    let currentTable = document.getElementById("actor-roles-table");
    let tbody = currentTable.getElementsByTagName("tbody")[0];

    // Get a reference to the new row from the database query (last object)
    const parsedData = JSON.parse(data);
    const newRow = parsedData[parsedData.length - 1] // last row of data

    // Create a row
    const row = document.createElement("tr");
    row.setAttribute("data-value", `${newRow.actor_role_id}`);

    let editCell = document.createElement("td");
    editCell.innerHTML = `<button onclick=updateActorRole(${newRow.actor_role_id})>Edit</button>`;

    let deleteCell = document.createElement("td");
    deleteCell.innerHTML = `<button onclick=confirmDelete(${newRow.actor_role_id})>Delete</button>`;

    let actorRoleIdCell = document.createElement("td");
    actorRoleIdCell.className = "actor-role-id";

    let actorIdCell = document.createElement("td");
    actorIdCell.className = "actor-id";

    let movieIdCell = document.createElement("td");
    movieIdCell.className = "movie-id";

    // Fill the cells with correct data
    actorRoleIdCell.innerText = newRow.actor_role_id;
    movieIdCell.innerText = newRow.movie_id;
    actorIdCell.innerText = newRow.actor_id;

    // Add the cells to the row
    row.appendChild(editCell);
    row.appendChild(deleteCell);
    row.appendChild(actorRoleIdCell);
    row.appendChild(movieIdCell);
    row.appendChild(actorIdCell);

    // Add the row to the table
    tbody.appendChild(row);
}