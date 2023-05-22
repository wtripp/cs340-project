// This file uses starter code adapted from:
// https://github.com/osu-cs340-ecampus/nodejs-starter-app


function confirmDelete(orderID) {

    const row = document.querySelector(`tr[data-value='${orderID}']`);

    const result = confirm(`Are you sure you want to delete order ${orderID}?`);

    if (result) {
        deleteOrder(orderID);
    } else {
        // Do nothing
    }
}


function deleteOrder(orderID) {
    // Put our data we want to send in a javascript object
    let data = {
        id: orderID
    };

    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("DELETE", "/delete-order", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 204) {

            // Add the new data to the table
            deleteRow(orderID);

            // Clear any row that contained updates
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
                updateCustomerId.value = '-- Select a Customer --';
                updateCustomerId.setAttribute("disabled","disabled");
            }

            /*
            document.getElementById("update-order-id").value = '';
            document.getElementById(setAttribute("disabled");
            inputShipDate.value = '';
            inputDeliveredDate.value = '';
            inputComment.value = '';
            inputCustomerId.value = '-- Select a Customer --';
            */

        }
        else if (xhttp.readyState == 4 && xhttp.status != 204) {
            console.log("There was an error with the input.")
        }
    }
    // Send the request and wait for the response
    xhttp.send(JSON.stringify(data));
}


function deleteRow(orderID){

    let table = document.getElementById("orders-table");
    for (let i = 0, row; row = table.rows[i]; i++) {
       //iterate through rows
       //rows would be accessed using the "row" variable assigned in the for loop
       if (table.rows[i].getAttribute("data-value") == orderID) {
            table.deleteRow(i);
            break;
       }
    }
}