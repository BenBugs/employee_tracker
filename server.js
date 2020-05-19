// What do I need here?
// 1. Tell node it is an express server
// 2. Tell node I am using mysql
// 3. Use npm path to enable node to work with file and directory paths

const express = require("express");
const mysql = require("mysql");
const path = require("path");

// Connection object
const connection = mysql.createConnection(
    {
    host: 'localhost',
    user: 'root',
    port: 3306,
    password: "M1l3sd4v1s!",
    database: "employee_tracker"
}
);

connection.connect(function (err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId);
    afterConnection();
});

function afterConnection() {
    connection.query("SELECT * FROM songs", function (err, res) {
        if (err) throw err;
        connection.end();
    })
};

connection.end();

