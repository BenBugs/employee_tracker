const inquirer = require('inquirer');
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
            },
        ]);
}


// Event handler function.
async function mainMenuChoice() {
    const { choice } = await mainMenu(); // Get user's main menu choice and store this object in mainResponse.
    const mainChoice = choice; // Let mainChoice equal user choice value 'string'
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
            const employeeMenu = await getEmployee(getEmployeeRoles, getManagers);
            newQueryObj.addEmployee(employeeMenu);
            mainMenuChoice();
            break;

        case 'Update employee role':
            const employeeNames = await newQueryObj.getEmployees();
            const updateEmployeeRoles = await newQueryObj.getEmployeeRoles();
            const updateRole = await getRoles(employeeNames, updateEmployeeRoles);
            await newQueryObj.updateEmployeeRole(updateRole);
            mainMenuChoice();
            break;

        case 'Exit':
            newQueryObj.endConnection();
            break;
    }
};

mainMenuChoice();


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
};


// Add employee.
function getEmployee(roles, managers) {

    let questions = [
        {
            type: 'input',
            name: 'first_name',
            message: 'Employee first name',
        },
        {
            type: 'input',
            name: 'last_name',
            message: 'Employee last name',
        },
        {
            type: 'list',
            name: 'role',
            message: 'What\'s their role?',
            choices: roles,
        },
        {
            type: 'input',
            name: 'salary',
            message: 'What is their salary?',
        },
        {
            type: 'list',
            name: 'manager',
            message: 'Who will manage the new guy?',
            choices: managers,
        }
    ];

    return inquirer.prompt(questions);
};


// Add employee role update.
function getRoles(employees, roles) {

    let questions = [
        {
            type: 'list',
            name: 'employees',
            message: 'Which employee\'s role would you like to update?',
            choices: employees
        },
        {
            type: 'list',
            name: 'roles',
            message: 'What is their new role?',
            choices: roles
        }

    ];

    return inquirer.prompt(questions);
};