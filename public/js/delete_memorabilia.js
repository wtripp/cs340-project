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

            // Clear any row that contained updates // TODO - Update this when adding UPDATE functionality 
            updateOrderId = document.getElementById("update-order-id");
            if (updateOrderId.value == orderID) {
                updateOrderId.value = '';
                updateOrderId.setAttribute("disabled","disabled");

                updateOrderDate = document.getElementById("update-order-date");
                updateOrderDate.value = '';
                updateOrderDate.setAttribute("disabled","disabled");

                updateShipDate = document.getElementById("update-ship-date");
                updateShipDate.value = '';
                updateShipDate.setAttribute("disabled","disabled");

                updateDeliveredDate = document.getElementById("update-delivered-date");
                updateDeliveredDate.value = '';
                updateDeliveredDate.setAttribute("disabled","disabled");

                updateComment = document.getElementById("update-comment");
                updateComment.value = '';
                updateComment.setAttribute("disabled","disabled");

                updateCustomerId = document.getElementById("update-customer-id");
                updateCustomerId.value = '';
                updateCustomerId.setAttribute("disabled","disabled");
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