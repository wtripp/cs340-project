/*
Citation for this file:
Date: 6/8/2023
Adapted from OSU CS340 Ecampus starter code.
Source URL: https://github.com/osu-cs340-ecampus/nodejs-starter-app
*/

function updateActor(actorID) {
    window.scrollTo(0, document.body.scrollHeight);

    // Get the objects we need to modify
    let updateActorForm = document.getElementById('update-actor-form');

    // Populate the update fields with the data from the table.
    document.getElementById("update-actor-fname").removeAttribute("disabled");
    document.getElementById("update-actor-lname").removeAttribute("disabled");
    document.getElementById("update-actor-button").removeAttribute("disabled");

    const rowToUpdate = document.querySelector(`[data-value="${actorID}"]`);

    document.getElementById("update-actor-id").value = actorID;

    let actorFname = rowToUpdate.getElementsByClassName("actor-fname")[0].textContent;
    document.getElementById("update-actor-fname").value = actorFname;

    let actorLname = rowToUpdate.getElementsByClassName("actor-lname")[0].textContent;
    document.getElementById("update-actor-lname").value = actorLname;

    // Modify the objects we need
    updateActorForm.addEventListener("submit", function (event) {

        event.preventDefault(); // prevent form from submitting
        event.stopImmediatePropagation(); // prevent mulitple unintended submissions and dialog box messages

        // Get form fields we need to get data from
        let updateActorId = document.getElementById("update-actor-id");
        let updateActorFname = document.getElementById("update-actor-fname");
        let updateActorLname = document.getElementById("update-actor-lname");

        // Get the values from the form fields
        let updateActorIdValue = updateActorId.value;
        let updateActorFnameValue = updateActorFname.value;
        let updateActorLnameValue = updateActorLname.value;

    // Perform data validation: Check that title + year is unique
    let fnames = document.querySelectorAll(".actor-fname");
    let lnames = document.querySelectorAll(".actor-lname");
    let fullNames = Array.from(fnames).map(function(fname ,i) {
        let lname = lnames[i];

        let rowBeingUpdated = document.querySelector(`[data-value="${updateActorIdValue}"]`);
        let originalFName = rowBeingUpdated.getElementsByClassName("actor-fname")[0].textContent;
        let originalLName = rowBeingUpdated.getElementsByClassName("actor-lname")[0].textContent;

        // exclude the row being edited
        if ((fname.textContent !== originalFName) && (lname.textContent !== originalLName)) 
            // Returns array of text combinations extracted from table
            return fname.textContent + lname.textContent;
    });

    let isDuplicate = fullNames.includes(updateActorFnameValue + updateActorLnameValue);
    if (isDuplicate) {
        alert("First name and last name combination must be unique.");
        return;
    }

        // Put our data we want to send in a Javascript object
        let data = {
            actor_id: updateActorIdValue,
            first_name: updateActorFnameValue,
            last_name: updateActorLnameValue
        }

        // Setup our AJAX request
        var xhttp = new XMLHttpRequest();
        xhttp.open("PUT", "/update-actor", true);
        xhttp.setRequestHeader("Content-type", "application/json");

        // Tell our AJAX request how to resolve
        xhttp.onreadystatechange = () => {
            if (xhttp.readyState == 4 && xhttp.status == 200) {
                // Add the new data to the table
                updateRow(xhttp.response, updateActorIdValue);
                alert(`Updated actor ${updateActorIdValue}`);
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

function updateRow(data, actorID) {
    let parsedData = JSON.parse(data);

    // Get the location of the row where we found the matching ID
    let updateRow = document.querySelector(`[data-value='${actorID}'`);

    // Reassign values in the table.
    let actorFname = updateRow.getElementsByClassName("actor-fname")
    actorFname[0].innerText = parsedData[0].first_name;

    let actorLname = updateRow.getElementsByClassName("actor-lname")
    actorLname[0].innerText = parsedData[0].last_name;
}