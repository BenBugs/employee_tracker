const inquirer = require("inquirer");


// STAGE 1 - DISPLAY MENU OF OPTIONS

// When I see my options I may:

// View:
//     a. All employees - will display a table of all employees
//     b. All Employees by Department - displays a table with employees for the chosen department
//     c. All Employees by Manager - display employess for that manager

// Add:
//     a. Employee - go through a prompt cycle requesting all the relevant information from an array of questions

// Remove:
//     a. employee - dsiplay list of employees, chose one and validate iof that is the one to delete?

// Update:
//     a. employee roles - display list of all employees, select employee the option to update role from drop down or new input
//     b. update employee manager

// Exit program: 

// 
async function viewAllEmployees() {
    const userChoice = await mainMenu();
}

viewAllEmployees()


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










