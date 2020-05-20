const selectRoles = new ConnectAndQuery()

async function test() {
    const employee_roles = await selectRoles.query(`SELECT * FROM role`);
    console.log(employee_roles)

}

test();


// async function employeeTableTest() {
//     const test = new ConnectDB()
//     let newConnect = test.connect();
//     let newQuery = await test.query(`SELECT * FROM employee INNER JOIN role INNER JOIN department`);
//     console.table(newQuery);
//     newConnect = test.end();
// }

// employeeTableTest()