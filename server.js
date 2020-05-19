// What do I need here?
// 1. Tell node it is an express server
// 2. Tell node I am using mysql
// 3. Use npm path to enable node to work with file and directory paths
// 4. Create the connection object
// 5. Connect to mysql
// 6. Do something and then end connection

const express = require("express");
const mysql = require("mysql");
const path = require("path");

// Connection object
const connection = mysql.createConnection(
    {
    host: 'localhost',
    user: 'root',
    port: 3306,
    password: 'M1l3sd4v1s!',
    database: 'employee_tracker'
}
);

// Wrap connection.connect() in a promise!
async function connect() {
    return new Promise((resolve, reject) => {
        connection.connect(err => {
            if (err) reject(err); // oh no!
            else resolve(); // oh yeah!
        })
    })
}
// Wrap connection.query() in a promise!
async function query(command, values) {
    return new Promise((resolve, reject) => {
        connection.query(command, values, (error, results) => {
            if (error) reject(error); // nay!
            else resolve(results); // yay!
        })
    })
}

connect();

connection.end();

// Questions
// 1. Do you open a new server connection for every query?


