const inquirer = require("inquirer");
const Query = require('./model');
const cTable = require('console.table');


// Main user menu.
function mainMenu() {
    return inquirer
        .prompt([
            {
                type: 'list',
                name: 'choice',
                message: 'What would you like to do?',
                choices: ['View all employees', 'View employees by department', 'Add employee', 'Update employee role', 'Exit']
            }
        ]);
}


// const deptsArr = [];
// deptsObj.forEach(({ name }) => deptsArr.push(name));


// Event handler function.
async function mainMenuChoice() {
    const mainResponse = await mainMenu(); // Get user's main menu choice and store this object in mainResponse.
    const mainChoice = mainResponse['choice']; // Let mainChoice equal user choice value 'string'
    const newQueryObj = new Query();

    switch (mainChoice) {
        case 'View all employees':
            await newQueryObj.viewAllEmployees();
            mainMenuChoice();
            break;

        case 'View employees by department':
            // Launches new inquirer sequence chooseEmployeesByDepartment()
            const deptsArr = await newQueryObj.getDepts();
            const departmentResponse = await chooseEmployeesByDepartment(deptsArr);
            const department = departmentResponse['choice'];
            await newQueryObj.viewAllEmployeesByDept(department);
            mainMenuChoice();
            break;

        case 'Add employee':
            const getEmployeeRoles = await newQueryObj.getEmployeeRoles();
            const getManagers = await newQueryObj.getManagers();
            console.log(getManagers)
            // const employeeMenu = await getEmployee(getEmployeeRoles, getManagers);


            newQueryObj.addEmployee();
            break;

        case 'Update employee role':
            newQueryObj.updateEmployeeRole();
            break;

        case 'Exit':
            newQueryObj.exit();
            break;
    }
}

mainMenuChoice()


// Event handles department choice.
function chooseEmployeesByDepartment(currentChoices) {
    return inquirer
        .prompt([
            {
                type: 'list',
                name: 'choice',
                message: 'Which department?',
                choices: currentChoices,
            }
        ]);
}


// Add employee.
function getEmployee(roles, managers) {

    let questions = [
        {
            type: 'input',
            name: 'choice',
            message: 'Employee first name',
        },
        {
            type: 'input',
            name: 'choice',
            message: 'Employee last name',
        },
        {
            type: 'list',
            name: 'choice',
            message: 'What role will they pretend to do?',
            choices: roles,
        },
        {
            type: 'input',
            name: 'choice',
            message: 'How much will this walking disaster cost us?',
        },
        {
            type: 'list',
            name: 'choice',
            message: 'Who will manage the FNG?',
            choices: managers,
        }
    ];

    return inquirer.prompt(questions); // inquirer.prompt asks the q's and returns the answers to the promise

}