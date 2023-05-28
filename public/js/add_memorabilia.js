// This file uses starter code adapted from:
// https://github.com/osu-cs340-ecampus/nodejs-starter-app


// Get the objects we need to modify
let addItemForm = document.getElementById('add-item-form');

// Modify the objects we need
addItemForm.addEventListener("submit", function (event) {
    
    // Prevent the form from submitting
    event.preventDefault();

    // Get form fields we need to get data from
    let inputDescription = document.getElementById("input-description");
    let inputType = document.getElementById("input-type");
    let inputCondition = document.getElementById("input-condition");
    let inputPrice = document.getElementById("input-price");
    let inputOrderId = document.getElementById("input-order-id");

    // Get the values from the form fields
    let descriptionValue = inputDescription.value;
    let typeValue = inputType.value;
    let conditionValue = inputCondition.value;
    let priceValue = inputPrice.value;
    let orderIdValue = inputOrderId.value;

    // No JS validation for this form needed. It's all handled in the HTML.

    // Put our data we want to send in a javascript object
    let data = {
        description: descriptionValue,
        type: typeValue,
        condition: conditionValue,
        price: priceValue,
        orderId: orderIdValue
    }
    
    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();

    // Add new row to database using Express route.
    xhttp.open("POST", "/add-memorabilia", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell our AJAX request how to resolve.
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {

            // Add the new data to the table (see helper function below)
            addRowToTable(xhttp.response);

            // Clear the input fields for another transaction
            inputDescription.value = '';
            inputType.value = '';
            inputCondition.value = '';
            inputPrice.value = '';
            inputOrderId.value = '';
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
    let currentTable = document.getElementById("memorabilia-table");
    let tbody = currentTable.getElementsByTagName("tbody")[0];

    // Get a reference to the new row from the database query (last object)
    const parsedData = JSON.parse(data);
    const newRow = parsedData[parsedData.length - 1] // last row of data

    // Create a row
    const row = document.createElement("tr");
    row.setAttribute("data-value", `${newRow.item_id}`);

    let editCell = document.createElement("td");
    editCell.innerHTML = `<button onclick=updateItem(${newRow.item_id})>Edit</button>`;

    let deleteCell = document.createElement("td");
    deleteCell.innerHTML = `<button onclick=confirmDelete(${newRow.item_id})>Delete</button>`;

    let itemIdCell = document.createElement("td");
    itemIdCell.className = "item-id";

    let descriptionCell = document.createElement("td");
    descriptionCell.className = "description";

    let typeCell = document.createElement("td");
    typeCell.className = "type";

    let conditionCell = document.createElement("td");
    conditionCell.className = "condition";

    let priceCell = document.createElement("td");
    priceCell.className = "price";

    let orderIdCell = document.createElement("td");
    orderIdCell.className = "order-id";

    // Fill the cells with correct data
    itemIdCell.innerText = newRow.item_id;
    descriptionCell.innerText = newRow.description;
    typeCell.innerText = newRow.type;
    conditionCell.innerText = newRow.condition;
    priceCell.innerText = newRow.price;
    orderIdCell.innerText = newRow.order_id;

    // Add the cells to the row
    row.appendChild(editCell);
    row.appendChild(deleteCell);
    row.appendChild(itemIdCell);
    row.appendChild(descriptionCell);
    row.appendChild(typeCell);
    row.appendChild(conditionCell);
    row.appendChild(priceCell);
    row.appendChild(orderIdCell);
    
    // Add the row to the table
    tbody.appendChild(row);
}