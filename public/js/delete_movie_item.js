// This file uses starter code adapted from:
// https://github.com/osu-cs340-ecampus/nodejs-starter-app


function confirmDelete(movieItemID) {

    const row = document.querySelector(`tr[data-value='${movieItemID}']`);

    const result = confirm(`Are you sure you want to delete movie item ${movieItemID}?`);

    if (result) {
        deleteItem(movieItemID);
    } else {
        // Do nothing
    }
}


function deleteItem(movieItemID) {
    // Put our data we want to send in a javascript object
    let data = {
        id: movieItemID
    };

    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("DELETE", "/delete-movie-item", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 204) {

            // Add the new data to the table
            deleteRow(movieItemID);

            // Clear any row that contained updates 
            updateMovieItemId = document.getElementById("update-movie-item-id");
            if (updateMovieItemId.value == movieItemID) {
                updateMovieItemId.value = '';
                updateMovieItemId.setAttribute("disabled","disabled");

                updateItemId = document.getElementById("update-item-id");
                updateItemId.value = '';
                updateItemId.setAttribute("disabled","disabled");

                updateMovieId = document.getElementById("update-movie-id");
                updateMovieId.value = '';
                updateMovieId.setAttribute("disabled","disabled");
            }

        }
        else if (xhttp.readyState == 4 && xhttp.status != 204) {
            console.log("There was an error with the input.")
        }
    }
    // Send the request and wait for the response
    xhttp.send(JSON.stringify(data));
}


function deleteRow(movieItemID){

    let table = document.getElementById("movie-items-table");
    for (let i = 0, row; row = table.rows[i]; i++) {
       //iterate through rows
       //rows would be accessed using the "row" variable assigned in the for loop
       if (table.rows[i].getAttribute("data-value") == movieItemID) {
            table.deleteRow(i);
            break;
       }
    }
}