// This file uses starter code adapted from:
// https://github.com/osu-cs340-ecampus/nodejs-starter-app

function updateMovie(movieID) {

    window.scrollTo(0, document.body.scrollHeight);

    // Get the objects we need to modify
    let updateMovieForm = document.getElementById('update-movie-form');

    // Populate the update fields with the data from the table.
    document.getElementById("update-title").removeAttribute("disabled");
    document.getElementById("update-year").removeAttribute("disabled");
    document.getElementById("update-genre").removeAttribute("disabled");
    document.getElementById("update-movie-button").removeAttribute("disabled");

    const rowToUpdate = document.querySelector(`[data-value="${movieID}"]`);

    document.getElementById("update-movie-id").value = movieID;

    let title = rowToUpdate.getElementsByClassName("title")[0].textContent;
    document.getElementById("update-title").value = title;

    let year = rowToUpdate.getElementsByClassName("year")[0].textContent;
    document.getElementById("update-year").value = year;

    let genre = rowToUpdate.getElementsByClassName("genre")[0].textContent;
    document.getElementById("update-genre").value = genre;

    // Modify the objects we need
    updateMovieForm.addEventListener("submit", function (event) {
    
        event.preventDefault(); // prevent form from submitting
        event.stopImmediatePropagation(); // prevent mulitple unintended submissions and dialog box messages

        // Get form fields we need to get data from
        let updateMovieId = document.getElementById("update-movie-id");
        let updateTitle = document.getElementById("update-title");
        let updateYear = document.getElementById("update-year");
        let updateGenre = document.getElementById("update-genre");

        // Get the values from the form fields
        let movieIdValue = updateMovieId.value;
        let titleValue = updateTitle.value;
        let yearValue = updateYear.value;
        let genreValue = updateGenre.value;        

    // Perform data validation: Check that title + year is unique
    let titles = document.querySelectorAll(".title");
    let years = document.querySelectorAll(".year");
    let titlesAndYears = Array.from(titles).map(function(title ,i) {
        year = years[i];

        let rowBeingUpdated = document.querySelector(`[data-value="${movieIdValue}"]`);
        let originalTitle = rowBeingUpdated.getElementsByClassName("title")[0].textContent;
        let originalYear = rowBeingUpdated.getElementsByClassName("year")[0].textContent;

        // exclude the title + year of row being edited
        if ((title.textContent !== originalTitle) && (year.textContent !== originalYear)) 
            // Returns array of text combinations extracted from table
            return title.textContent + year.textContent;
    });

    let isDuplicate = titlesAndYears.includes(titleValue + yearValue);
    if (isDuplicate) {
        alert("Title and year combination must be unique.");
        return;
    }

        // Put our data we want to send in a Javascript object
        let data = {
            movieId: movieIdValue,
            title: titleValue,
            year: yearValue,
            genre: genreValue,
        }
        
        // Setup our AJAX request
        var xhttp = new XMLHttpRequest();
        xhttp.open("PUT", "/update-movie", true);
        xhttp.setRequestHeader("Content-type", "application/json");

        // Tell our AJAX request how to resolve
        xhttp.onreadystatechange = () => {
            if (xhttp.readyState == 4 && xhttp.status == 200) {

                // Add the new data to the table
                updateRow(xhttp.response, movieIdValue);
                alert(`Updated movie ${movieIdValue}`);
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

function updateRow(data, movieID){
    let parsedData = JSON.parse(data);

    // Get the location of the row where we found the matching ID
    let updateRow = document.querySelector(`[data-value='${movieID}'`);

    // Reassign values in the table.
    let title = updateRow.getElementsByClassName("title")
    title[0].innerText = parsedData[0].title;

    let year = updateRow.getElementsByClassName("year")
    year[0].innerText = parsedData[0].year;
    
    let genre = updateRow.getElementsByClassName("genre")
    genre[0].innerText = parsedData[0].genre;
}