// This file uses starter code adapted from:
// https://github.com/osu-cs340-ecampus/nodejs-starter-app


function confirmDelete(customerID) {
    const row = document.querySelector(`tr[data-value='${customerID}']`);
    const result = confirm(`Are you sure you want to delete customer ${customerID}?`);
    if (result) {
        deleteCustomer(customerID);
    } else {
        // Do nothing
    }
}

function deleteCustomer(customerID) {
    // Put our data we want to send in a javascript object
    let data = {
        id: customerID
    };

    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("DELETE", "/delete-customer", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 204) {

            // Add the new data to the table
            deleteRow(customerID);

            // Clear any row that contained updates
            updateCustomerId = document.getElementById("update-customer-id");
            if (updateCustomerId.value == customerID) {
                updateCustomerId.value = '';
                updateCustomerId.setAttribute("disabled", "disabled");

                updateCustomerFname = document.getElementById("update-customer-fname");
                updateCustomerFname.value = '';
                updateCustomerFname.setAttribute("disabled", "disabled");

                updateCustomerLname = document.getElementById("update-customer-lname");
                updateCustomerLname.value = '';
                updateCustomerLname.setAttribute("disabled", "disabled");

                updateCustomerPhone = document.getElementById("update-customer-phone");
                updateCustomerPhone.value = '';
                updateCustomerPhone.setAttribute("disabled", "disabled");

                updateCustomerEmail = document.getElementById("update-customer-email");
                updateCustomerEmail.value = '';
                updateCustomerEmail.setAttribute("disabled", "disabled");

                updateCustomerAddress = document.getElementById("update-customer-address");
                updateCustomerAddress.value = '';
                updateCustomerAddress.setAttribute("disabled", "disabled");

                updateCustomerCity = document.getElementById("update-customer-city");
                updateCustomerCity.value = '';
                updateCustomerCity.setAttribute("disabled", "disabled");

                updateCustomerState = document.getElementById("update-customer-state");
                updateCustomerState.value = '';
                updateCustomerState.setAttribute("disabled", "disabled");

                updateCustomerPcode = document.getElementById("update-customer-pcode");
                updateCustomerPcode.value = '';
                updateCustomerPcode.setAttribute("disabled", "disabled");
            }
        }
        else if (xhttp.readyState == 4 && xhttp.status != 204) {
            console.log("There was an error with the input.")
        }
    }
    // Send the request and wait for the response
    xhttp.send(JSON.stringify(data));
}

function deleteRow(customerID) {

    let table = document.getElementById("customers-table");
    for (let i = 0, row; row = table.rows[i]; i++) {
        //iterate through rows
        //rows would be accessed using the "row" variable assigned in the for loop
        if (table.rows[i].getAttribute("data-value") == customerID) {
            table.deleteRow(i);
            break;
        }
    }
}