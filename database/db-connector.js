/*
Citation for this file:
Date: 5/14/2023
Adapted from OSU CS340 Ecampus starter code.
Source URL: https://github.com/osu-cs340-ecampus/nodejs-starter-app
*/

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

// Export it for use in our application
module.exports.pool = pool;