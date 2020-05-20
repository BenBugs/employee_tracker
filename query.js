const mysql = require('mysql');
const cTable = require('console.table');
const ConnectDB = require('./connectdb');


class Query {
    constructor() {
        this.openConnection = new ConnectDB()
        this.openConnection.connect();
    }

    async viewAllEmployees() {
        const newQuery = await this.openConnection.query(`SELECT * FROM employee INNER JOIN role INNER JOIN department`);
        console.table(newQuery);
        this.openConnection.end(); // closes database connection after every query
    }
    async viewAllEmployeesByDept() {
        const newQuery = await this.openConnection.query(`SELECT name FROM department INNER JOIN employee`);
        console.table(newQuery);
        this.openConnection.end(); // closes database connection after every query

    }
    async viewAllEmployeesByMgr() {
        const newQuery = await this.openConnection.query(``);
        console.table(newQuery);
        this.openConnection.end(); // closes database connection after every query

    }
    async addEmployee() {

    }
    async removeEmployee() {

    }
    async updateEmployeeRole() {

    }
    async updateEmployeeMgr() {

    }
    endConnection() {

    }

}

// console.log(Query)

const test = new Query()
const output = test.viewAllEmployeesByDept();


// async function employeeTableTest() {
//     const test = new ConnectDB()
//     let newConnect = test.connect;
//     console.log(newConnect)
//     let newQuery = await test.query(`SELECT * FROM employee INNER JOIN role INNER JOIN department`);
//     console.table(newQuery);
// }

// employeeTableTest()


module.exports = Query;
