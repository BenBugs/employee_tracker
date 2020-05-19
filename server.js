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

async function test() {
    await query(`SELECT * FROM role`);
    console.log(query())
}

connect();
test();





// Connection function
// connection.connect(function (err) {
//     if (err) throw err;
//     console.log('connected as id ' + connection.threadId);
// });

// function afterConnection() {
//     connection.query(command, function (err, res) {
//         if (err) throw err;
//     })
// };

// afterConnection();



//connection.end();




// Questions
// 1. Do you open a new server connection for every query?

