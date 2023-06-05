// This file uses starter code adapted from:
// https://github.com/osu-cs340-ecampus/nodejs-starter-app


function confirmDelete(actorID) {
    const row = document.querySelector(`tr[data-value='${actorID}']`);
    const result = confirm(`Are you sure you want to delete actor ${actorID}?`);
    if (result) {
        deleteActor(actorID);
    } else {
        // Do nothing
    }
}

function deleteActor(actorID) {
    // Put our data we want to send in a javascript object
    let data = {
        id: actorID
    };

    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("DELETE", "/delete-actor", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 204) {

            // Add the new data to the table
            deleteRow(actorID);

            // Clear any row that contained updates
            updateActorId = document.getElementById("update-actor-id");
            if (updateActorId.value == actorID) {
                updateActorId.value = '';
                updateActorId.setAttribute("disabled", "disabled");

                updateActorFname = document.getElementById("update-actor-fname");
                updateActorFname.value = '';
                updateActorFname.setAttribute("disabled", "disabled");

                updateActorLname = document.getElementById("update-actor-lname");
                updateActorLname.value = '';
                updateActorLname.setAttribute("disabled", "disabled");
            }
        }
        else if (xhttp.readyState == 4 && xhttp.status != 204) {
            console.log("There was an error with the input.")
        }
    }
    // Send the request and wait for the response
    xhttp.send(JSON.stringify(data));
}

function deleteRow(actorID) {

    let table = document.getElementById("actors-table");
    for (let i = 0, row; row = table.rows[i]; i++) {
        //iterate through rows
        //rows would be accessed using the "row" variable assigned in the for loop
        if (table.rows[i].getAttribute("data-value") == actorID) {
            table.deleteRow(i);
            break;
        }
    }
}