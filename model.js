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
            `SELECT employee_id, first_name, last_name, title, salary, department.department_name
        FROM employee
        INNER JOIN role ON employee.role_id = role.role_id
        INNER JOIN department ON role.role_id = department.department_id
        ORDER BY role.salary DESC`);
        return console.table(newQuery);
    }


    // Reads departments to form a list
    async getDepts() {
        const deptsObj = await openConnection.query(
            `SELECT department_name FROM department`);
        const deptsArr = [];
        await deptsObj.forEach(({ department_name: department_name }) => deptsArr.push(department_name));
        return deptsArr;
    }


    // Gets employee name + title + salary BY department.
    async viewAllEmployeesByDept(value) {
        const department = value;
        const newQuery = await openConnection.query(
            `SELECT employee_id, first_name, last_name, title, salary, department.department_name FROM employee
        INNER JOIN role ON employee.role_id = role.role_id
        INNER JOIN department ON role.role_id = department.department_id
        WHERE department.department_name = ?`, [department]);
        return console.table(newQuery);
    }


    async getEmployeeRoles() {
        const rolesObj = await openConnection.query(
            `SELECT role_id, title FROM role`);
        const rolesArr = [];
        await rolesObj.forEach(({ role_id, title }) => rolesArr.push({
            value: role_id,
            name: title
        }));
        return rolesArr;
    }


    async getManagers() {
        const mgrsObj = await openConnection.query(
            `SELECT employee_id, first_name, last_name, title, role.role_id
        FROM employee
        INNER JOIN role
        ON employee.role_id = role.role_id
        ORDER BY role.role_id ASC`);
        const mgrsArr = [];
        await mgrsObj.forEach(({ employee_id, first_name, last_name, title }) => mgrsArr.push({
            value: employee_id,
            name: first_name + ' ' + last_name + ' ' + '-' + ' ' + title
        }));
        return mgrsArr;
    }


    async addEmployee(employeeMenu) {
        const queryString = `INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)`
        const addNewEmployee = await openConnection.query(queryString, [
            employeeMenu['first_name'],
            employeeMenu['last_name'],
            employeeMenu['role'],
            employeeMenu['manager']
        ])
    }


    async getEmployees() {
        const currentRole = `SELECT employee_id, first_name, last_name FROM employee`;
        const employeesObj = await openConnection.query(currentRole);
        const employeesArr = [];
        await employeesObj.forEach(({ employee_id, first_name, last_name, }) => employeesArr.push({
            value: employee_id,
            name: first_name + ' ' + last_name
        }));
        return employeesArr;
    }


    async updateEmployeeRole(updateRole) {
        const userId = updateRole['employees'];
        const newRoleId = updateRole['roles'];
        console.log(userId,newRoleId)
        const queryString = `UPDATE employee SET ?  WHERE ?`
        const addNewEmployee = await openConnection.query(queryString, [
            {role_id: newRoleId}, { employee_id: userId }
        ])
    }

    endConnection() {
        const openConnection = new ConnectDB()
        console.log('Thank you for using Employee Tracker - it nearly killed me to build this bloody thing :)')
        openConnection.end() // closes database connection after every query
    }
}

module.exports = Query;