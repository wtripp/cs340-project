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
const Handlebars = require('handlebars');
const { engine } = require('express-handlebars');
require('express-handlebars');
app.engine('.hbs', engine({extname: ".hbs"}));
app.set('view engine', '.hbs');

/*
    ROUTES
*/


/* HOME PAGE */
app.get('/', function(req, res) {
    res.render('index');
});

/* Customers */
app.get('/customers', function(req, res) {
    res.render('customers');
});

app.get('/orders', function(req, res) {

    const selectAllOrdersQuery = `
        SELECT o.order_id,
               IF(o.order_date = '0000-00-00', '', DATE_FORMAT(o.order_date, '%Y-%m-%d')) AS order_date,
               IF(o.ship_date = '0000-00-00', '', DATE_FORMAT(o.ship_date, '%Y-%m-%d')) AS ship_date,
               IF(o.delivered_date = '0000-00-00', '', DATE_FORMAT(o.delivered_date, '%Y-%m-%d')) AS delivered_date,
               o.comment,
               CONCAT(c.customer_id, ' - ', c.first_name, ' ', c.last_name, ' (', c.email, ')') AS customer_id
        FROM Orders AS o
        JOIN Customers AS c ON o.customer_id = c.customer_id
        ORDER BY o.order_id;`;

    const selectAllCustomersQuery = `SELECT customer_id, first_name, last_name, email FROM Customers;`;

    db.pool.query(selectAllOrdersQuery, function(error, orders, fields) {
        db.pool.query(selectAllCustomersQuery, function(error, customers, fields) {
            res.render('orders', {orders: orders, customers: customers});
        });

    });
});

app.post('/add-order', function(req, res) {

    let data = req.body;

    /*
    // Capture NULL values
    let customer_id = parseInt(data.customer_id);
    if (isNaN(customer_id))
    {
        customer_id = 'NULL';
    } */

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
                const selectAllOrdersQuery = `
                SELECT o.order_id,
                    IF(o.order_date = '0000-00-00', '', DATE_FORMAT(o.order_date, '%Y-%m-%d')) AS order_date,
                    IF(o.ship_date = '0000-00-00', '', DATE_FORMAT(o.ship_date, '%Y-%m-%d')) AS ship_date,
                    IF(o.delivered_date = '0000-00-00', '', DATE_FORMAT(o.delivered_date, '%Y-%m-%d')) AS delivered_date,
                    o.comment,
                    CONCAT(c.customer_id, ' - ', c.first_name, ' ', c.last_name, ' (', c.email, ')') AS customer_id
                FROM Orders AS o
                JOIN Customers AS c ON o.customer_id = c.customer_id
                ORDER BY o.order_id;`;
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


app.put('/update-order', function(req, res) {

    let data = req.body;
  
    let orderID = parseInt(data.orderId);
    let orderDate = data.orderDate;
    let shipDate = data.shipDate;
    let deliveredDate = data.deliveredDate;
    let comment = data.comment;
    let customerId = parseInt(data.customerId);

    const updateOrderQuery = `
    UPDATE Orders
    SET order_date = ?, ship_date = ?,
        delivered_date = ?, comment = ?,
        customer_id = ?
    WHERE order_id = ?`;

    const selectOrderQuery = `
        SELECT o.order_id, o.order_date, o.ship_date, o.delivered_date, o.comment,
        CONCAT(c.customer_id, ' - ', c.first_name, ' ', c.last_name, ' (', c.email, ')') AS customer_id
        FROM Orders AS o
        JOIN Customers AS c ON o.customer_id = c.customer_id AND o.order_id = ?`;

        // Run the 1st query
        db.pool.query(updateOrderQuery, [orderDate, shipDate, deliveredDate, comment, customerId, orderID], function(error, rows, fields){
            if (error) {

            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error);
            res.sendStatus(400);
            }

            // If there was no error, we run our second query and return that data so we can use it to update the Orders table on the frontend.
            else
            {
                // Run the second query
                db.pool.query(selectOrderQuery, [orderID], function(error, rows, fields) {

            if (error) {
                console.log(error);
                res.sendStatus(400);
            } else {
                res.send(rows);
            }
        });
    }});
});

/* Memorabilia */
app.get('/memorabilia', function(req, res) {

    const selectAllItemsQuery = `
        SELECT items.item_id,
            items.description,
            items.type,
            items.condition,
            items.price,
            CONCAT(o.order_id, ' - ', c.first_name, ' ', c.last_name, ' (', c.email, ') on ', DATE_FORMAT(o.order_date, '%Y-%m-%d')) AS order_id
        FROM Memorabilia AS items
        LEFT JOIN Orders AS o ON items.order_id = o.order_id
        LEFT JOIN Customers AS c ON o.customer_id = c.customer_id
        ORDER BY items.item_id;`;

    const selectAllOrdersQuery = `
        SELECT o.order_id,
            DATE_FORMAT(o.order_date, '%Y-%m-%d') AS order_date,
            CONCAT(c.first_name, ' ', c.last_name, ' (', c.email, ')') AS customer
        FROM Orders AS o
        JOIN Customers AS c ON o.customer_id = c.customer_id
        ORDER BY o.order_id;`;

    db.pool.query(selectAllItemsQuery, function(error, items, fields) {
        db.pool.query(selectAllOrdersQuery, function(error, orders, fields) {
            res.render('memorabilia', {items: items, orders: orders});
        });
    });
});

app.post('/add-memorabilia', function(req, res) {

    let data = req.body;

    
    // Capture NULL values
    let order = parseInt(data.orderId);
    if (isNaN(order))
    {
        order = 'NULL';
    }

    // Create the query and run it on the database
    const insertItemQuery = `
    INSERT INTO Memorabilia (description, type, \`condition\`, price, order_id)
    VALUES
    (
        '${data.description}',
        '${data.type}',
        '${data.condition}',
        '${data.price}',
        ${order}
    );`;
    db.pool.query(insertItemQuery, function(error, rows, fields) {
        
        if (error) {
            console.log(error)
            res.sendStatus(400);
        } else {
                const selectAllItemsQuery = `
                SELECT items.item_id,
                    items.description,
                    items.type,
                    items.condition,
                    items.price,
                    CONCAT(o.order_id, ' - ', c.first_name, ' ', c.last_name, ' (', c.email, ') on ', DATE_FORMAT(o.order_date, '%Y-%m-%d')) AS order_id
                FROM Memorabilia AS items
                LEFT JOIN Orders AS o ON items.order_id = o.order_id
                LEFT JOIN Customers AS c ON o.customer_id = c.customer_id
                ORDER BY items.item_id;`;
                db.pool.query(selectAllItemsQuery, function(error, rows, fields){

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

app.delete('/delete-memorabilia', function(req, res) {

    let data = req.body;

    let itemId = parseInt(data.id);
    let deleteItemQuery = `DELETE FROM Memorabilia WHERE item_id = ?`;
    
    db.pool.query(deleteItemQuery, [itemId], function(error, rows, fields) {
        if (error) {
            console.log(error);
            res.sendStatus(400);
        } else {
            res.sendStatus(204);
        }
    });
});







/* Movie Items */
app.get('/movieitems', function(req, res) {
    res.render('movieitems');
});

/* Movies */
app.get('/movies', function(req, res) {
    res.render('movies');
});

/* Actor Roles */
app.get('/actorroles', function(req, res) {
    res.render('actorroles');
});

/* Actors */
app.get('/actors', function(req, res) {
    res.render('actors');
});

/*
    LISTENER
*/
app.listen(PORT, function() {
    console.log('Express started on http://localhost:' + PORT + '; press Ctrl-C to terminate.')
});