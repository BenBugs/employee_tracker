const mysql = require("mysql");


// Database connection.
class ConnectDB {
    constructor() {

        // Connection object.
        this.connection = mysql.createConnection(
            {
                host: 'localhost',
                user: 'root',
                port: 3306,
                password: 'M1l3sd4v1s!',
                database: 'employee_tracker'
            }
        )
    }

    // Wrap connection.connect() in a promise.
    async connect() {
        return new Promise((resolve, reject) => {
            this.connection.connect(err => {
                if (err) reject(err); // oh no!
                else resolve(); // oh yeah!
            })
        })
    }

    // Wrap connection.query() in a promise.
    async query(command, values) {
        return new Promise((resolve, reject) => {
            this.connection.query(command, values, (error, results) => {
                if (error) reject(error); // nay!
                else resolve(results); // yay!
            })
        })
    }

    // End connection.
    end() {
        this.connection.end();
    }
}

module.exports = ConnectDB;


// Open server connection
const openConnection = new ConnectDB();
openConnection.connect();


// Query class
class Query {
    constructor() { }

    // Outputs all employees + title + salary + department.
    async viewAllEmployees() {
        const newQuery = await openConnection.query(
        `SELECT employee_id, first_name, last_name, title, salary, department.name
        FROM employee
        INNER JOIN role ON employee.role_id = role.role_id
        INNER JOIN department ON role.role_id = department.department_id
        ORDER BY role.salary DESC`);
        return console.table(newQuery);
    }

    // Reads departments to form a list
    async getDepts() {
        const deptsObj = await openConnection.query(
        `SELECT name FROM department`);
        const deptsArr = [];
        await deptsObj.forEach(({ name }) => deptsArr.push(name));
        return deptsArr;
    }

    // Gets employee name + title + salary BY department.
    async viewAllEmployeesByDept(value) {
        const department = value;
        const newQuery = await openConnection.query(
        `SELECT employee_id, first_name, last_name, title, salary, department.name FROM employee
        INNER JOIN role ON employee.role_id = role.role_id
        INNER JOIN department ON role.role_id = department.department_id
        WHERE department.name = ?`, [department]);
        return console.table(newQuery);
    }

    async getEmployeeRoles() {
        const rolesObj = await openConnection.query(
        `SELECT title FROM role`);
        const rolesArr = [];
        await rolesObj.forEach(({ title }) => rolesArr.push(title));
        return rolesArr;
    }

    async getManagers() {
        const mgrsObj = await openConnection.query(
        `SELECT first_name, last_name, title, role.role_id
        FROM employee
        INNER JOIN role
        ON employee.role_id = role.role_id
        ORDER BY role.role_id ASC`);
        const mgrsArr = [];
        await mgrsObj.forEach(({ first_name, last_name, title }) => mgrsArr.push(first_name + ' ' + last_name + ' ' + '-' + ' ' + title));
        return mgrsArr;     }

    async addEmployee() {

    }

    async updateEmployeeRole() {

    }

    endConnection() {
        const openConnection = new ConnectDB()
        openConnection.end(); // closes database connection after every query
    }

}

module.exports = Query;