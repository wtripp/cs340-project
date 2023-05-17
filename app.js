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
    
    // const selectAllOrdersQuery = `SELECT * FROM Orders;`;

    const selectAllOrdersQuery = `
        SELECT o.order_id, o.order_date, o.ship_date, o.delivered_date, o.comment,
        CONCAT(c.customer_id, ' - ', c.first_name, ' ', c.last_name, ' (', c.email, ')') AS customer_id
        FROM Orders AS o
        JOIN Customers AS c ON o.customer_id = c.customer_id
        ORDER BY o.order_date;`

    const selectAllCustomersQuery = `SELECT * FROM Customers;`;




    db.pool.query(selectAllOrdersQuery, function(error, rows, fields) {
        let orders = rows;
        db.pool.query(selectAllCustomersQuery, function(error, rows, fields) {
            let customers = rows;
            res.render('orders', {orders: orders, customers: customers});
        });

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
    const insertOrderQuery = `
    INSERT INTO Orders (order_date, ship_date, delivered_date, comment, customer_id)
    VALUES
    (
        '${data.orderDate}',
        '${data.shipDate}',
        '${data.deliveredDate}',
        '${data.comment}',
        '${data.customerId}'
    );`;
    db.pool.query(insertOrderQuery, function(error, rows, fields) {
        
        if (error) {
            console.log(error)
            res.sendStatus(400);
        } else {
            const selectAllOrdersQuery = `SELECT * FROM Orders;`;
            db.pool.query(selectAllOrdersQuery, function(error, rows, fields){

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


app.delete('/delete-order', function(req, res) {

    let data = req.body;

    let orderID = parseInt(data.id);
    let deleteOrderQuery = `DELETE FROM Orders WHERE order_id = ?`;
    
    db.pool.query(deleteOrderQuery, [orderID], function(error, rows, fields) {
        if (error) {
            console.log(error);
            res.sendStatus(400);
        } else {
            res.sendStatus(204);
        }
    });
});


/*
    LISTENER
*/
app.listen(PORT, function() {
    console.log('Express started on http://localhost:' + PORT + '; press Ctrl-C to terminate.')
});