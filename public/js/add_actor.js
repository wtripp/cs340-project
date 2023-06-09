/*
Citation for this file:
Date: 6/8/2023
Adapted from OSU CS340 Ecampus starter code.
Source URL: https://github.com/osu-cs340-ecampus/nodejs-starter-app
*/

// Get the objects we need to modify
let addActorForm = document.getElementById('add-actor-form');

// Modify the objects we need
addActorForm.addEventListener("submit", function (event) {

    // Prevent the form from submitting
    event.preventDefault();

    // Get form fields we need to get data from
    let inputActorFname = document.getElementById("input-actor-fname");
    let inputActorLname = document.getElementById("input-actor-lname");

    // Get the values from the form fields
    let actorFnameValue = inputActorFname.value;
    let actorLnameValue = inputActorLname.value;

    // Perform data validation: Check that fname + lname is unique
    let fnames = document.querySelectorAll(".actor-fname");
    let lnames = document.querySelectorAll(".actor-lname");
    let fullNames = Array.from(fnames).map(function(fname ,i) {
        let lname = lnames[i];
        // Returns array of text combinations extracted from table
        return fname.textContent + lname.textContent;
    });

    let isDuplicate = fullNames.includes(actorFnameValue + actorLnameValue);
    if (isDuplicate) {
        alert("First name and last name combination must be unique.");
        return;
    }



    let data = {
        actorFname: actorFnameValue,
        actorLname: actorLnameValue
    }

    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();

    // Add new row to database using Express route.
    xhttp.open("POST", "/add-actor", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell our AJAX request how to resolve.
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {

            // Add the new data to the table (see helper function below)
            addRowToTable(xhttp.response);

            // Clear the input fields for another transaction
            inputActorFname.value = '';
            inputActorLname.value = '';
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
    let currentTable = document.getElementById("actors-table");
    let tbody = currentTable.getElementsByTagName("tbody")[0];

    // Get a reference to the new row from the database query (last object)
    const parsedData = JSON.parse(data);
    const newRow = parsedData[parsedData.length - 1] // last row of data

    // Create a row
    const row = document.createElement("tr");
    row.setAttribute("data-value", `${newRow.actor_id}`);

    let editCell = document.createElement("td");
    editCell.innerHTML = `<button onclick=updateActor(${newRow.actor_id})>Edit</button>`;

    let deleteCell = document.createElement("td");
    deleteCell.innerHTML = `<button onclick=confirmDelete(${newRow.actor_id})>Delete</button>`;

    let actorIdCell = document.createElement("td");
    actorIdCell.className = "actor-id";

    let actorFnameCell = document.createElement("td");
    actorFnameCell.className = "actor-fname";

    let actorLnameCell = document.createElement("td");
    actorLnameCell.className = "actor-lname";

    // Fill the cells with correct data
    actorIdCell.innerText = newRow.actor_id;
    actorFnameCell.innerText = newRow.first_name;
    actorLnameCell.innerText = newRow.last_name;

    // Add the cells to the row
    row.appendChild(editCell);
    row.appendChild(deleteCell);
    row.appendChild(actorIdCell);
    row.appendChild(actorFnameCell);
    row.appendChild(actorLnameCell);

    // Add the row to the table
    tbody.appendChild(row);
}