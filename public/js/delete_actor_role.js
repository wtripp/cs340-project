/*
Citation for this file:
Date: 6/8/2023
Adapted from OSU CS340 Ecampus starter code.
Source URL: https://github.com/osu-cs340-ecampus/nodejs-starter-app
*/

function confirmDelete(actorRoleID) {
    const row = document.querySelector(`tr[data-value='${actorRoleID}']`);
    const result = confirm(`Are you sure you want to delete actor role ${actorRoleID}?`);
    if (result) {
        deleteActorRole(actorRoleID);
    } else {
        // Do nothing
    }
}

function deleteActorRole(actorRoleID) {
    // Put our data we want to send in a javascript object
    let data = {
        id: actorRoleID
    };

    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("DELETE", "/delete-actor-role", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 204) {
            // Add the new data to the table
            deleteRow(actorRoleID);
            // Clear any row that contained updates 
            updateActorRoleId = document.getElementById("update-actor-role-id");
            if (updateActorRoleId.value == actorRoleID) {
                updateActorRoleId.value = '';
                updateActorRoleId.setAttribute("disabled", "disabled");

                updateMovieId = document.getElementById("update-movie-id");
                updateMovieId.value = '';
                updateMovieId.setAttribute("disabled", "disabled");

                updateActorId = document.getElementById("update-actor-id");
                updateActorId.value = '';
                updateActorId.setAttribute("disabled", "disabled");
            }
        }
        else if (xhttp.readyState == 4 && xhttp.status != 204) {
            console.log("There was an error with the input.")
        }
    }
    // Send the request and wait for the response
    xhttp.send(JSON.stringify(data));
}

function deleteRow(actorRoleId) {

    let table = document.getElementById("actor-roles-table");
    for (let i = 0, row; row = table.rows[i]; i++) {
        //iterate through rows
        //rows would be accessed using the "row" variable assigned in the for loop
        if (table.rows[i].getAttribute("data-value") == actorRoleId) {
            table.deleteRow(i);
            break;
        }
    }
}