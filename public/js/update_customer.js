/*
Citation for this file:
Date: 5/10/2023
Adapted from OSU CS340 Ecampus starter code.
Source URL: https://github.com/osu-cs340-ecampus/nodejs-starter-app
*/

function updateCustomer(customerID) {

    window.scrollTo(0, document.body.scrollHeight);

    // Get the objects we need to modify
    let updateCustomerForm = document.getElementById('update-customer-form');

    // Populate the update fields with the data from the table.
    // document.getElementById('update-customer-id').removeAttribute('disabled'); // we want this to stay disabled during edit
    document.getElementById("update-customer-fname").removeAttribute("disabled");
    document.getElementById("update-customer-lname").removeAttribute("disabled");
    document.getElementById("update-customer-phone").removeAttribute("disabled");
    document.getElementById("update-customer-email").removeAttribute("disabled");
    document.getElementById("update-customer-address").removeAttribute("disabled");
    document.getElementById("update-customer-city").removeAttribute("disabled");
    document.getElementById("update-customer-state").removeAttribute("disabled");
    document.getElementById("update-customer-pcode").removeAttribute("disabled");

    const rowToUpdate = document.querySelector(`[data-value="${customerID}"]`);

    document.getElementById("update-customer-id").value = customerID;

    let customerFname = rowToUpdate.getElementsByClassName("customer-fname")[0].textContent;
    document.getElementById("update-customer-fname").value = customerFname;

    let customerLname = rowToUpdate.getElementsByClassName("customer-lname")[0].textContent;
    document.getElementById("update-customer-lname").value = customerLname;

    let customerPhone = rowToUpdate.getElementsByClassName("customer-phone")[0].textContent;
    document.getElementById("update-customer-phone").value = customerPhone;

    let customerEmail = rowToUpdate.getElementsByClassName("customer-email")[0].textContent;
    document.getElementById("update-customer-email").value = customerEmail;

    let customerAddress = rowToUpdate.getElementsByClassName("customer-address")[0].textContent;
    document.getElementById("update-customer-address").value = customerAddress;

    let customerCity = rowToUpdate.getElementsByClassName("customer-city")[0].textContent;
    document.getElementById("update-customer-city").value = customerCity;

    let customerState = rowToUpdate.getElementsByClassName("customer-state")[0].textContent;
    document.getElementById("update-customer-state").value = customerState;

    let customerPcode = rowToUpdate.getElementsByClassName("customer-pcode")[0].textContent;
    document.getElementById("update-customer-pcode").value = customerPcode;

    // Modify the objects we need
    updateCustomerForm.addEventListener("submit", function (event) {

        event.preventDefault(); // prevent form from submitting
        event.stopImmediatePropagation(); // prevent mulitple unintended submissions and dialog box messages

        // Get form fields we need to get data from
        let updateCustomerId = document.getElementById("update-customer-id");
        // doesn't change but probably better to keep this in
        let updateCustomerFname = document.getElementById("update-customer-fname");
        let updateCustomerLname = document.getElementById("update-customer-lname");
        let updateCustomerPhone = document.getElementById("update-customer-phone");
        let updateCustomerEmail = document.getElementById("update-customer-email");
        let updateCustomerAddress = document.getElementById("update-customer-address");
        let updateCustomerCity = document.getElementById("update-customer-city");
        let updateCustomerState = document.getElementById("update-customer-state");
        let updateCustomerPcode = document.getElementById("update-customer-pcode");

        // Get the values from the form fields
        let updateCustomerIdValue = updateCustomerId.value;
        let updateCustomerFnameValue = updateCustomerFname.value;
        let updateCustomerLnameValue = updateCustomerLname.value;
        let updateCustomerPhoneValue = updateCustomerPhone.value;
        let updateCustomerEmailValue = updateCustomerEmail.value;
        let updateCustomerAddressValue = updateCustomerAddress.value;
        let updateCustomerCityValue = updateCustomerCity.value;
        let updateCustomerStateValue = updateCustomerState.value;
        let updateCustomerPcodeValue = updateCustomerPcode.value;

        // Perform data validation: Check that email is unique
        let emailCells = document.querySelectorAll(".customer-email");
        let emails = Array.from(emailCells).map(function(email){
            
            let rowBeingUpdated = document.querySelector(`[data-value="${updateCustomerIdValue}"]`);
            let originalEmail = rowBeingUpdated.getElementsByClassName("customer-email")[0].textContent;
            
            // exclude the title + year of row being edited
            if (email.textContent !== originalEmail)  
                // Returns array of text combinations extracted from table
                return email.textContent;
        });

        let isDuplicate = emails.includes(updateCustomerEmailValue);
        if (isDuplicate) {
            alert("Email must be unique.");
            return;
        }



        // Put our data we want to send in a Javascript object
        let data = {
            customer_id: updateCustomerIdValue,
            first_name: updateCustomerFnameValue,
            last_name: updateCustomerLnameValue,
            phone: updateCustomerPhoneValue,
            email: updateCustomerEmailValue,
            address: updateCustomerAddressValue,
            city: updateCustomerCityValue,
            state: updateCustomerStateValue,
            postal_code: updateCustomerPcodeValue
        }

        // Setup our AJAX request
        var xhttp = new XMLHttpRequest();
        xhttp.open("PUT", "/update-customer", true);
        xhttp.setRequestHeader("Content-type", "application/json");

        // Tell our AJAX request how to resolve
        xhttp.onreadystatechange = () => {
            if (xhttp.readyState == 4 && xhttp.status == 200) {
                // Add the new data to the table
                updateRow(xhttp.response, updateCustomerIdValue);
                alert(`Updated customer ${updateCustomerIdValue}`);
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

function updateRow(data, customerID) {
    let parsedData = JSON.parse(data);

    // Get the location of the row where we found the matching ID
    let updateRow = document.querySelector(`[data-value='${customerID}'`);

    // Reassign values in the table.
    let customerFname = updateRow.getElementsByClassName("customer-fname")
    customerFname[0].innerText = parsedData[0].first_name;

    let customerLname = updateRow.getElementsByClassName("customer-lname")
    customerLname[0].innerText = parsedData[0].last_name;

    let customerPhone = updateRow.getElementsByClassName("customer-phone")
    customerPhone[0].innerText = parsedData[0].phone;

    let customerEmail = updateRow.getElementsByClassName("customer-email")
    customerEmail[0].innerText = parsedData[0].email;

    let customerAddress = updateRow.getElementsByClassName("customer-address")
    customerAddress[0].innerText = parsedData[0].address;

    let customerCity = updateRow.getElementsByClassName("customer-city")
    customerCity[0].innerText = parsedData[0].city;

    let customerState = updateRow.getElementsByClassName("customer-state")
    customerState[0].innerText = parsedData[0].state;

    let customerPcode = updateRow.getElementsByClassName("customer-pcode")
    customerPcode[0].innerText = parsedData[0].postal_code;
}