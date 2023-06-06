/*
Citation for this file:
Date: 6/1/2023
Adapted from OSU CS340 Ecampus starter code.
Source URL: https://github.com/osu-cs340-ecampus/nodejs-starter-app
*/

// Get the objects we need to modify
let addCustomerForm = document.getElementById('add-customer-form');

// Modify the objects we need
addCustomerForm.addEventListener("submit", function (event) {

    // Prevent the form from submitting
    event.preventDefault();

    // Get form fields we need to get data from
    let inputCustomerFname = document.getElementById("input-customer-fname");
    let inputCustomerLname = document.getElementById("input-customer-lname");
    let inputCustomerPhone = document.getElementById("input-customer-phone");
    let inputCustomerEmail = document.getElementById("input-customer-email");
    let inputCustomerAddress = document.getElementById("input-customer-address");
    let inputCustomerCity = document.getElementById("input-customer-city");
    let inputCustomerState = document.getElementById("input-customer-state");
    let inputCustomerPcode = document.getElementById("input-customer-pcode");


    // Get the values from the form fields
    let customerFnameValue = inputCustomerFname.value;
    let customerLnameValue = inputCustomerLname.value;
    let customerPhoneValue = inputCustomerPhone.value;
    let customerEmailValue = inputCustomerEmail.value;
    let customerAddressValue = inputCustomerAddress.value;
    let customerCityValue = inputCustomerCity.value;
    let customerStateValue = inputCustomerState.value;
    let customerPcodeValue = inputCustomerPcode.value;

    // Perform data validation.
    // if (shipDateValue && new Date(orderDateValue) > new Date(shipDateValue)) {
    //     alert("Ship date must be later than or equal to order date.");
    //     return;
    // }

    // if (!shipDateValue && deliveredDateValue) {
    //     alert("If delivered date is specified, then ship date must be specified too.");
    //     return;
    // }

    // if (shipDateValue && deliveredDateValue && new Date(shipDateValue) > new Date(deliveredDateValue)) {
    //     alert("Delivered date must be later than or equal to ship date.");
    //     return;
    // }

    // Put our data we want to send in a javascript object
    // let data = {
    //     orderDate: orderDateValue,
    //     shipDate: shipDateValue,
    //     deliveredDate: deliveredDateValue,
    //     comment: commentValue,
    //     customerId: customerIdValue
    // }

    let data = {
        customerFname: customerFnameValue,
        customerLname: customerLnameValue,
        customerPhone: customerPhoneValue,
        customerEmail: customerEmailValue,
        customerAddress: customerAddressValue,
        customerCity: customerCityValue,
        customerState: customerStateValue,
        customerPcode: customerPcodeValue
    }

    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();

    // Add new row to database using Express route.
    xhttp.open("POST", "/add-customer", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell our AJAX request how to resolve.
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {

            // Add the new data to the table (see helper function below)
            addRowToTable(xhttp.response);

            // Clear the input fields for another transaction
            inputCustomerFname.value = '';
            inputCustomerLname.value = '';
            inputCustomerPhone.value = '';
            inputCustomerEmail.value = '';
            inputCustomerAddress.value = '';
            inputCustomerCity.value = '';
            inputCustomerState.value = '';
            inputCustomerPcode.value = '';
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
    let currentTable = document.getElementById("customers-table");
    let tbody = currentTable.getElementsByTagName("tbody")[0];

    // Get a reference to the new row from the database query (last object)
    const parsedData = JSON.parse(data);
    const newRow = parsedData[parsedData.length - 1] // last row of data

    // Create a row
    const row = document.createElement("tr");
    row.setAttribute("data-value", `${newRow.customer_id}`);

    let editCell = document.createElement("td");
    editCell.innerHTML = `<button onclick=updateCustomer(${newRow.customer_id})>Edit</button>`;

    let deleteCell = document.createElement("td");
    deleteCell.innerHTML = `<button onclick=confirmDelete(${newRow.customer_id})>Delete</button>`;

    let customerIdCell = document.createElement("td");
    customerIdCell.className = "customer-id";

    let customerFnameCell = document.createElement("td");
    customerFnameCell.className = "customer-fname";

    let customerLnameCell = document.createElement("td");
    customerLnameCell.className = "customer-lname";

    let customerPhoneCell = document.createElement("td");
    customerPhoneCell.className = "customer-phone";

    let customerEmailCell = document.createElement("td");
    customerEmailCell.className = "customer-email";

    let customerAddressCell = document.createElement("td");
    customerAddressCell.className = "customer-address";

    let customerCityCell = document.createElement("td");
    customerCityCell.className = "customer-city";

    let customerStateCell = document.createElement("td");
    customerStateCell.className = "customer-state";

    let customerPcodeCell = document.createElement("td");
    customerPcodeCell.className = "customer-pcode";

    // Fill the cells with correct data
    customerIdCell.innerText = newRow.customer_id;

    customerFnameCell.innerText = newRow.first_name;
    customerLnameCell.innerText = newRow.last_name;
    customerPhoneCell.innerText = newRow.phone;
    customerEmailCell.innerText = newRow.email;
    customerAddressCell.innerText = newRow.address;
    customerCityCell.innerText = newRow.city;
    customerStateCell.innerText = newRow.state;
    customerPcodeCell.innerText = newRow.postal_code;

    // shipDateCell.innerText = newRow.ship_date.substring(0, 10);
    // deliveredDateCell.innerText = newRow.delivered_date.substring(0, 10);
    // commentCell.innerText = newRow.comment;
    // customerIdCell.innerText = newRow.customer_id;

    // Add the cells to the row
    row.appendChild(editCell);
    row.appendChild(deleteCell);
    row.appendChild(customerIdCell);

    row.appendChild(customerFnameCell);
    row.appendChild(customerLnameCell);
    row.appendChild(customerPhoneCell);
    row.appendChild(customerEmailCell);
    row.appendChild(customerAddressCell);
    row.appendChild(customerCityCell);
    row.appendChild(customerStateCell);
    row.appendChild(customerPcodeCell);

    // Add the row to the table
    tbody.appendChild(row);
}