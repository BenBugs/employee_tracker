// Class to use when making server calls

const mysql = require("mysql");

class ConnectAndQuery {
    constructor() {

        // Connection object
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

    // Wrap connection.connect() in a promise!
    async connect() {
        return new Promise((resolve, reject) => {
            this.connection.connect(err => {
                if (err) reject(err); // oh no!
                else resolve(); // oh yeah!
            })
        })
    }
    // Wrap connection.query() in a promise!
    async query(command, values) {
        return new Promise((resolve, reject) => {
            this.connection.query(command, values, (error, results) => {
                if (error) reject(error); // nay!
                else resolve(results); // yay!
            })
        })
    }
    // End connection
    end() {
        this.connection.end();
    }

}

module.export = ConnectAndQuery;



