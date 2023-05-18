// This file uses starter code adapted from:
// https://github.com/osu-cs340-ecampus/nodejs-starter-app


// Get the objects we need to modify
let addOrderForm = document.getElementById('add-order-form');

// Modify the objects we need
addOrderForm.addEventListener("submit", function (event) {
    
    // Prevent the form from submitting
    event.preventDefault();

    // Get form fields we need to get data from
    let inputOrderDate = document.getElementById("input-order-date");
    let inputShipDate = document.getElementById("input-ship-date");
    let inputDeliveredDate = document.getElementById("input-delivered-date");
    let inputComment = document.getElementById("input-comment");
    let inputCustomerId = document.getElementById("input-customer-id");

    // Get the values from the form fields
    let orderDateValue = inputOrderDate.value;
    let shipDateValue = inputShipDate.value;
    let deliveredDateValue = inputDeliveredDate.value;
    let commentValue = inputComment.value;
    let customerIdValue = inputCustomerId.value;

    // Put our data we want to send in a javascript object
    let data = {
        orderDate: orderDateValue,
        shipDate: shipDateValue,
        deliveredDate: deliveredDateValue,
        comment: commentValue,
        customerId: customerIdValue
    }
    
    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();

    // Add new row to database using Express route.
    xhttp.open("POST", "/add-order", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell our AJAX request how to resolve.
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {

            // Add the new data to the table (see helper function below)
            addRowToTable(xhttp.response);

            // Clear the input fields for another transaction
            inputOrderDate.value = '';
            inputShipDate.value = '';
            inputDeliveredDate.value = '';
            inputComment.value = '';
            inputCustomerId.value = '-- Select a Customer --';
        }
        else if (xhttp.readyState == 4 && xhttp.status != 200) {
            console.log("There was an error with the input.")
        }
    }

    // Send the request and wait for the response

    console.log("Sending the request...");
    xhttp.send(JSON.stringify(data));

});


// Creates a single HTML row from an Object representing a single record,
// where data is the response that includes all records, including the newly created one.
addRowToTable = (data) => {

    // Get a reference to the current table on the page and clear it out.
    let currentTable = document.getElementById("orders-table");

    // Get a reference to the new row from the database query (last object)
    const parsedData = JSON.parse(data);
    const newRow = parsedData[parsedData.length - 1] // last row of data

    // Create a row
    const row = document.createElement("tr");
    let editCell = document.createElement("td");
    let deleteCell = document.createElement("td");
    let orderIdCell = document.createElement("td");
    let orderDateCell = document.createElement("td");
    let shipDateCell = document.createElement("td");
    let deliveredDateCell = document.createElement("td");
    let commentCell = document.createElement("td");
    let customerIdCell = document.createElement("td");

    // Add buttons
    let editButton = document.createElement("button");
    editButton.innerHTML = "Edit";
    editButton.onclick = function(){
        updateOrder(newRow.id);
    };
    editCell.appendChild(editButton);

    let deleteButton = document.createElement("button");
    deleteButton.innerHTML = "Delete";
    deleteButton.onclick = function(){
        deleteOrder(newRow.id);
    };
    deleteCell.appendChild(deleteButton);


    // Fill the cells with correct data
    orderIdCell.innerText = newRow.order_id;
    orderDateCell.innerText = newRow.order_date.substring(0,10);
    shipDateCell.innerText = newRow.ship_date.substring(0,10);
    deliveredDateCell.innerText = newRow.delivered_date.substring(0,10);
    commentCell.innerText = newRow.comment;
    customerIdCell.innerText = newRow.customer_id;

    // Add the cells to the row
    row.appendChild(editCell);
    row.appendChild(deleteCell);
    row.appendChild(orderIdCell);
    row.appendChild(orderDateCell);
    row.appendChild(shipDateCell);
    row.appendChild(deliveredDateCell);
    row.appendChild(commentCell);
    row.appendChild(customerIdCell);
    
    // Add the row to the table
    currentTable.appendChild(row);

}