/*
Citation for this file:
Date: 5/28/2023
Adapted from OSU CS340 Ecampus starter code.
Source URL: https://github.com/osu-cs340-ecampus/nodejs-starter-app
*/

// Get the objects we need to modify
let addMovieItemForm = document.getElementById('add-movie-item-form');

// Modify the objects we need
addMovieItemForm.addEventListener("submit", function (event) {
    
    // Prevent the form from submitting
    event.preventDefault();

    // Get form fields we need to get data from
    let inputItemId = document.getElementById("input-item-id");
    let inputMovieId = document.getElementById("input-movie-id");

    // Get the values from the form fields
    let itemIdValue = inputItemId.value;
    let movieIdValue = inputMovieId.value;

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

    // Put our data we want to send in a javascript object
    let data = {
        itemId: itemIdValue,
        movieId: movieIdValue
    }
    
    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();

    // Add new row to database using Express route.
    xhttp.open("POST", "/add-movie-item", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell our AJAX request how to resolve.
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {

            // Add the new data to the table (see helper function below)
            addRowToTable(xhttp.response);

            // Clear the input fields for another transaction
            inputItemId.value = '';
            inputMovieId.value = '';
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
    let currentTable = document.getElementById("movie-items-table");
    let tbody = currentTable.getElementsByTagName("tbody")[0];

    // Get a reference to the new row from the database query (last object)
    const parsedData = JSON.parse(data);
    const newRow = parsedData[parsedData.length - 1] // last row of data

    // Create a row
    const row = document.createElement("tr");
    row.setAttribute("data-value", `${newRow.movie_item_id}`);

    let editCell = document.createElement("td");
    editCell.innerHTML = `<button onclick=updateMovieItem(${newRow.movie_item_id})>Edit</button>`;

    let deleteCell = document.createElement("td");
    deleteCell.innerHTML = `<button onclick=confirmDelete(${newRow.movie_item_id})>Delete</button>`;

    let movieItemIdCell = document.createElement("td");
    movieItemIdCell.className = "movie-item-id";

    let itemIdCell = document.createElement("td");
    itemIdCell.className = "item-id";
    
    let movieIdCell = document.createElement("td");
    movieIdCell.className = "movie-id";

    // Fill the cells with correct data
    movieItemIdCell.innerText = newRow.movie_item_id;
    itemIdCell.innerText = newRow.item_id;
    movieIdCell.innerText = newRow.movie_id;

    // Add the cells to the row
    row.appendChild(editCell);
    row.appendChild(deleteCell);
    row.appendChild(movieItemIdCell);
    row.appendChild(itemIdCell);
    row.appendChild(movieIdCell);
    
    // Add the row to the table
    tbody.appendChild(row);
}