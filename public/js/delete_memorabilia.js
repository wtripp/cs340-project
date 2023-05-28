// This file uses starter code adapted from:
// https://github.com/osu-cs340-ecampus/nodejs-starter-app


function confirmDelete(itemID) {

    const row = document.querySelector(`tr[data-value='${itemID}']`);

    const result = confirm(`Are you sure you want to delete memorabilia item ${itemID}?`);

    if (result) {
        deleteItem(itemID);
    } else {
        // Do nothing
    }
}


function deleteItem(itemID) {
    // Put our data we want to send in a javascript object
    let data = {
        id: itemID
    };

    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("DELETE", "/delete-memorabilia", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 204) {

            // Add the new data to the table
            deleteRow(itemID);

            // Clear any row that contained updates 
            updateItemId = document.getElementById("update-item-id");
            if (updateItemId.value == itemID) {
                updateItemId.value = '';
                updateItemId.setAttribute("disabled","disabled");

                updateDescription = document.getElementById("update-description");
                updateDescription.value = '';
                updateDescription.setAttribute("disabled","disabled");

                updateType = document.getElementById("update-type");
                updateType.value = '';
                updateType.setAttribute("disabled","disabled");

                updateCondition = document.getElementById("update-condition");
                updateCondition.value = '';
                updateCondition.setAttribute("disabled","disabled");

                updatePrice = document.getElementById("update-price");
                updatePrice.value = '';
                updatePrice.setAttribute("disabled","disabled");

                updateOrderId = document.getElementById("update-order-id");
                updateOrderId.value = '';
                updateOrderId.setAttribute("disabled","disabled");
            }

        }
        else if (xhttp.readyState == 4 && xhttp.status != 204) {
            console.log("There was an error with the input.")
        }
    }
    // Send the request and wait for the response
    xhttp.send(JSON.stringify(data));
}


function deleteRow(itemID){

    let table = document.getElementById("memorabilia-table");
    for (let i = 0, row; row = table.rows[i]; i++) {
       //iterate through rows
       //rows would be accessed using the "row" variable assigned in the for loop
       if (table.rows[i].getAttribute("data-value") == itemID) {
            table.deleteRow(i);
            break;
       }
    }
}