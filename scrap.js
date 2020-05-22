// const selectRoles = new ConnectAndQuery()

// async function test() {
//     const employee_roles = await selectRoles.query(`SELECT * FROM role`);
//     console.log(employee_roles)

// }

// test();


// async function employeeTableTest() {
//     const test = new ConnectDB()
//     let newConnect = test.connect();
//     let newQuery = await test.query(`SELECT * FROM employee INNER JOIN role INNER JOIN department`);
//     console.table(newQuery);
//     newConnect = test.end();
// }

// employeeTableTest()

const garage = [
    { name: 'Fiat'},
    { cc: '500' },
    { name: 'Lambourghini' },
    // { cc: '4600' },
    // { name: 'Isuzu' },
    // { cc: '3000' }
];


garage.forEach(({name: name, cc: cc}) => console.log(name, cc));


// let {name, cc} = garage;

// garageArr = [];

// for ([name, cc] of garage) {
//     console.log(word+' '+cc);
// }


// let array = [ 1,2,3]

// for (let index = 0; index < array.length; index++) {
//     const element = array[index];
//     console.log(element)
// }