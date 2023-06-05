/*
Citation for this file:
Date: 5/28/2023
Adapted from OSU CS340 Ecampus starter code.
Source URL: https://github.com/osu-cs340-ecampus/nodejs-starter-app
*/

function confirmDelete(movieID) {

    const row = document.querySelector(`tr[data-value='${movieID}']`);

    const result = confirm(`Are you sure you want to delete movie ${movieID}?`);

    if (result) {
        deleteMovie(movieID);
    } else {
        // Do nothing
    }
}


function deleteMovie(movieID) {
    // Put our data we want to send in a javascript object
    let data = {
        id: movieID
    };

    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("DELETE", "/delete-movie", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 204) {

            // Add the new data to the table
            deleteRow(movieID);

            // Clear any row that contained updates
            updateMovieId = document.getElementById("update-movie-id");
            if (updateMovieId.value == movieID) {
                updateMovieId.value = '';
                updateMovieId.setAttribute("disabled","disabled");

                updateTitle = document.getElementById("update-title");
                updateTitle.value = '';
                updateTitle.setAttribute("disabled","disabled");

                updateYear = document.getElementById("update-year");
                updateYear.value = '2000';
                updateYear.setAttribute("disabled","disabled");

                updateGenre = document.getElementById("update-genre");
                updateGenre.value = '';
                updateGenre.setAttribute("disabled","disabled");
            }

        }
        else if (xhttp.readyState == 4 && xhttp.status != 204) {
            console.log("There was an error with the input.")
        }
    }
    // Send the request and wait for the response
    xhttp.send(JSON.stringify(data));
}


function deleteRow(movieID){

    let table = document.getElementById("movies-table");
    for (let i = 0, row; row = table.rows[i]; i++) {
       //iterate through rows
       //rows would be accessed using the "row" variable assigned in the for loop
       if (table.rows[i].getAttribute("data-value") == movieID) {
            table.deleteRow(i);
            break;
       }
    }
}