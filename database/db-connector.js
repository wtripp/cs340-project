'use strict';
// ./database/db-connector.js

// This file uses starter code adapted from:
// https://github.com/osu-cs340-ecampus/nodejs-starter-app

// Get an instance of mysql we can use in the app
const mysql = require('mysql');
const dotenv = require('dotenv');
dotenv.config( { path: '../.env' });

// Create a 'connection pool' using the provided credentials
const pool = mysql.createPool({
    connectionLimit : 10,
    host            : process.env.DB_HOST,
    user            : process.env.DB_USER,
    password        : process.env.DB_PASSWORD,
    database        : process.env.DATABASE
})

// Export it for use in our applicaiton
module.exports.pool = pool;