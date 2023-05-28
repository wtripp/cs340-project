// This file uses starter code adapted from:
// https://github.com/osu-cs340-ecampus/nodejs-starter-app

function updateMovieItem(movieItemID) {

    window.scrollTo(0, document.body.scrollHeight);

    // Get the objects we need to modify
    let updateMovieItemForm = document.getElementById('update-movie-item-form');

    // Populate the update fields with the data from the table.
    document.getElementById("update-item-id").removeAttribute("disabled");
    document.getElementById("update-movie-id").removeAttribute("disabled");
    document.getElementById("update-movie-items-button").removeAttribute("disabled");

    const rowToUpdate = document.querySelector(`[data-value="${movieItemID}"]`);

    document.getElementById("update-movie-item-id").value = movieItemID;

    let itemId = rowToUpdate.getElementsByClassName("item-id")[0].textContent;
    document.getElementById("update-item-id").value = parseInt(itemId); // Gets ID from "ID - FirstName LastName (email)"

    let movieId = rowToUpdate.getElementsByClassName("movie-id")[0].textContent;
    document.getElementById("update-movie-id").value = parseInt(movieId); // Gets ID from "ID - FirstName LastName (email)"


    // Modify the objects we need
    updateMovieItemForm.addEventListener("submit", function (event) {
    
        event.preventDefault(); // prevent form from submitting
        event.stopImmediatePropagation(); // prevent mulitple unintended submissions and dialog box messages

        // Get form fields we need to get data from
        let updateMovieItemId = document.getElementById("update-movie-item-id");
        let updateItemId = document.getElementById("update-item-id");
        let updateMovieId = document.getElementById("update-movie-id");

        // Get the values from the form fields
        let movieItemIdValue = updateMovieItemId.value;
        let itemIdValue = updateItemId.value;
        let movieIdValue = updateMovieId.value;

        // Perform data validation: Check that ID combinations are unique
        let items = document.querySelectorAll(".item-id");
        let movies = document.querySelectorAll(".movie-id");
        let movieItemIds = Array.from(items).map(function(item ,i) {
            movie = movies[i];
            // Returns array of ID combos extracted from table, e.g., ['1-2', '3-4', ...]
            return item.textContent.match(/\d+/)[0] + "-" + movie.textContent.match(/\d+/)[0];
        });

        let isDuplicate = movieItemIds.includes(itemIdValue + "-" + movieIdValue);
        if (isDuplicate) {
            alert("Memorabilia item ID and movie ID combination must be unique.");
            return;
        }

        // Put our data we want to send in a Javascript object
        let data = {
            movieItemId: movieItemIdValue,
            itemId: itemIdValue,
            movieId: movieIdValue,
        }
        
        // Setup our AJAX request
        var xhttp = new XMLHttpRequest();
        xhttp.open("PUT", "/update-movie-item", true);
        xhttp.setRequestHeader("Content-type", "application/json");

        // Tell our AJAX request how to resolve
        xhttp.onreadystatechange = () => {
            if (xhttp.readyState == 4 && xhttp.status == 200) {

                // Add the new data to the table
                updateRow(xhttp.response, movieItemIdValue);
                alert(`Updated movie item ${movieItemIdValue}`);
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

function updateRow(data, movieItemID) {
    let parsedData = JSON.parse(data);

    // Get the location of the row where we found the matching ID
    let updateRow = document.querySelector(`[data-value='${movieItemID}'`);

    // Reassign values in the table.
    let itemId = updateRow.getElementsByClassName("item-id")
    itemId[0].innerText = parsedData[0].item_id;

    let movieId = updateRow.getElementsByClassName("movie-id")
    movieId[0].innerText = parsedData[0].movie_id;
}