/*
Citation for this file:
Date: 6/8/2023
Adapted from OSU CS340 Ecampus starter code.
Source URL: https://github.com/osu-cs340-ecampus/nodejs-starter-app
*/

function updateActorRole(actorRoleID) {

    window.scrollTo(0, document.body.scrollHeight);

    // Get the objects we need to modify
    let updateActorRoleForm = document.getElementById('update-actor-role-form');

    // Populate the update fields with the data from the table.
    document.getElementById("update-movie-id").removeAttribute("disabled");
    document.getElementById("update-actor-id").removeAttribute("disabled");
    document.getElementById("update-actor-role-button").removeAttribute("disabled");

    const rowToUpdate = document.querySelector(`[data-value="${actorRoleID}"]`);

    document.getElementById("update-actor-role-id").value = actorRoleID;

    let movieId = rowToUpdate.getElementsByClassName("movie-id")[0].textContent;
    document.getElementById("update-movie-id").value = parseInt(movieId); // Gets ID from "ID - FirstName LastName (email)"

    let actorId = rowToUpdate.getElementsByClassName("actor-id")[0].textContent;
    document.getElementById("update-actor-id").value = parseInt(actorId); // Gets ID from "ID - FirstName LastName (email)"


    // Modify the objects we need
    updateActorRoleForm.addEventListener("submit", function (event) {

        event.preventDefault(); // prevent form from submitting
        event.stopImmediatePropagation(); // prevent mulitple unintended submissions and dialog box messages

        // Get form fields we need to get data from
        let updateActorRoleId = document.getElementById("update-actor-role-id");
        let updateMovieId = document.getElementById("update-movie-id");
        let updateActorId = document.getElementById("update-actor-id");

        // Get the values from the form fields
        let actorRoleIdValue = updateActorRoleId.value;
        let movieIdValue = updateMovieId.value;
        let actorIdValue = updateActorId.value;

        // Perform data validation: Check that ID combinations are unique
        let movies = document.querySelectorAll(".movie-id");
        let actors = document.querySelectorAll(".actor-id");
        let actorRolesIds = Array.from(movies).map(function(movie ,i) {
            let actor = actors[i];
            // Returns array of ID combos extracted from table, e.g., ['1-2', '3-4', ...]
            return movie.textContent.match(/\d+/)[0] + "-" + actor.textContent.match(/\d+/)[0];
        });

        let isDuplicate = actorRolesIds.includes(movieIdValue + "-" + actorIdValue);
        if (isDuplicate) {
            alert("Movie ID and actor ID combination must be unique.");
            return;
        }

        // Put our data we want to send in a Javascript object
        let data = {
            actorRoleId: actorRoleIdValue,
            movieId: movieIdValue,
            actorId: actorIdValue,
        }

        // Setup our AJAX request
        var xhttp = new XMLHttpRequest();
        xhttp.open("PUT", "/update-actor-role", true);
        xhttp.setRequestHeader("Content-type", "application/json");

        // Tell our AJAX request how to resolve
        xhttp.onreadystatechange = () => {
            if (xhttp.readyState == 4 && xhttp.status == 200) {
                // Add the new data to the table
                updateRow(xhttp.response, actorRoleIdValue);
                alert(`Updated actor role ${actorRoleIdValue}`);
                window.scrollTo(document.body.scrollHeight, 0);
            }
            else if (xhttp.readyState == 4 && xhttp.status != 200) {
                console.log("There was an error with the input.")
            }
        }
        // Send the request and wait for the response
        xhttp.send(JSON.stringify(data));
    });
}

function updateRow(data, actorRoleID) {
    let parsedData = JSON.parse(data);

    // Get the location of the row where we found the matching ID
    let updateRow = document.querySelector(`[data-value='${actorRoleID}'`);

    // Reassign values in the table.
    let movieId = updateRow.getElementsByClassName("movie-id")
    movieId[0].innerText = parsedData[0].movie_id;

    let actorId = updateRow.getElementsByClassName("actor-id")
    actorId[0].innerText = parsedData[0].actor_id;

}