'use strict';
// App.js

// This file uses starter code adapted from:
// https://github.com/osu-cs340-ecampus/nodejs-starter-app

/*
    SETUP
*/

// Port
require('dotenv').config();
const PORT = process.env.PORT;

// Express
const express = require('express');
const app = express();
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(express.static('public'))

// Database
const db = require('./database/db-connector');

// Handlebars
const { engine } = require('express-handlebars');
require('express-handlebars');
app.engine('.hbs', engine({extname: ".hbs"}));
app.set('view engine', '.hbs');

/*
    ROUTES
*/
app.get('/', function(req, res) {
    res.render('index');
});

app.get('/orders', function(req, res) {
    
    const query = "SELECT * FROM Orders;";
    db.pool.query(query, function(error, rows, fields) {
        res.render('orders', {data:rows});
    });
});

app.post('/add-order', function(req, res) {

    let data = req.body;

    // Capture NULL values
    let customer_id = parseInt(data.customer_id);
    if (isNaN(customer_id))
    {
        customer_id = 'NULL';
    }

    // Create the query and run it on the database
    const insertQuery = `
    INSERT INTO Orders (order_date, ship_date, delivered_date, comment, customer_id)
    VALUES
    (
        '${data.orderDate}',
        '${data.shipDate}',
        '${data.deliveredDate}',
        '${data.comment}',
        '${data.customerId}'
    );`;
    db.pool.query(insertQuery, function(error, rows, fields) {
        
        if (error) {
            console.log(error)
            res.sendStatus(400);
        } else {
            const selectQuery = `SELECT * FROM Orders;`;
            db.pool.query(selectQuery, function(error, rows, fields){

                if (error) {
                    console.log(error);
                    res.sendStatus(400);
                } else {
                    res.send(rows);
                }
            });
        }
    });
});


/*
    LISTENER
*/
app.listen(PORT, function() {
    console.log('Express started on http://localhost:' + PORT + '; press Ctrl-C to terminate.')
});