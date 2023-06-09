/*
Citation for this file:
Date: 5/28/2023
Adapted from OSU CS340 Ecampus starter code.
Source URL: https://github.com/osu-cs340-ecampus/nodejs-starter-app
*/

// Get the objects we need to modify
let addMovieForm = document.getElementById('add-movie-form');

// Modify the objects we need
addMovieForm.addEventListener("submit", function (event) {
    
    // Prevent the form from submitting
    event.preventDefault();

    // Get form fields we need to get data from
    let inputTitle = document.getElementById("input-title");
    let inputYear = document.getElementById("input-year");
    let inputGenre = document.getElementById("input-genre");

    // Get the values from the form fields
    let titleValue = inputTitle.value;
    let yearValue = inputYear.value;
    let genreValue = inputGenre.value;

    // Perform data validation: Check that title + year is unique
    let titles = document.querySelectorAll(".title");
    let years = document.querySelectorAll(".year");
    let titlesAndYears = Array.from(titles).map(function(title ,i) {
        let year = years[i];
        // Returns array of text combinations extracted from table
        return title.textContent + year.textContent;
    });

    let isDuplicate = titlesAndYears.includes(titleValue + yearValue);
    if (isDuplicate) {
        alert("Title and year combination must be unique.");
        return;
    }

    // Put our data we want to send in a javascript object
    let data = {
        title: titleValue,
        year: yearValue,
        genre: genreValue,
    }
    
    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();

    // Add new row to database using Express route.
    xhttp.open("POST", "/add-movie", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell our AJAX request how to resolve.
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {

            // Add the new data to the table (see helper function below)
            addRowToTable(xhttp.response);

            // Clear the input fields for another transaction
            inputTitle.value = '';
            inputYear.value = '2000';
            inputGenre.value = '';
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
    let currentTable = document.getElementById("movies-table");
    let tbody = currentTable.getElementsByTagName("tbody")[0];

    // Get a reference to the new row from the database query (last object)
    const parsedData = JSON.parse(data);
    const newRow = parsedData[parsedData.length - 1] // last row of data

    // Create a row
    const row = document.createElement("tr");
    row.setAttribute("data-value", `${newRow.movie_id}`);

    let editCell = document.createElement("td");
    editCell.innerHTML = `<button onclick=updateMovie(${newRow.movie_id})>Edit</button>`;

    let deleteCell = document.createElement("td");
    deleteCell.innerHTML = `<button onclick=confirmDelete(${newRow.movie_id})>Delete</button>`;

    let movieIdCell = document.createElement("td");
    movieIdCell.className = "movie-id";

    let titleCell = document.createElement("td");
    titleCell.className = "title";

    let yearCell = document.createElement("td");
    yearCell.className = "year";

    let genreCell = document.createElement("td");
    genreCell.className = "genre";

    // Fill the cells with correct data
    movieIdCell.innerText = newRow.movie_id;
    titleCell.innerText = newRow.title;
    yearCell.innerText = newRow.year;
    genreCell.innerText = newRow.genre;

    // Add the cells to the row
    row.appendChild(editCell);
    row.appendChild(deleteCell);
    row.appendChild(movieIdCell);
    row.appendChild(titleCell);
    row.appendChild(yearCell);
    row.appendChild(genreCell);
    
    // Add the row to the table
    tbody.appendChild(row);
}