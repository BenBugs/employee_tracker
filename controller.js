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
                choices: ['View all employees', 'View employees by department', 'View employees by manager', 'Add employee', 'Remove employee', 'Update employee role', 'Update employee manager', 'Exit'],
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

        case 'View employees by manager':
            newQueryObj.viewAllEmployeesByMgr();
            break;

        case 'Add employee':
            newQueryObj.addEmployee();
            break;

        case 'Remove employee':
            newQueryObj.removeEmployee();
            break;

        case 'Update employee role':
            newQueryObj.updateEmployeeRole();
            break;

        case 'Update employee manager':
            newQueryObj.updateEmployeeMgr();
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

