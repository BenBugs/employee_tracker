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


async function mainMenuChoice() {
    const mainResponse = await mainMenu(); // Get user's main menu choice and store this object in mainResponse.
    const mainChoice = mainResponse['choice']; // Let mainChoice equal user choice value 'string'

    switch (mainChoice) {
        case 'View all employees':
            // function
            break;
        case 'View employees by department':
            // function
            break;
        case 'View employees by manager':
            // function
            break;
        case 'Add employee':
            // function
            break;
        case 'Remove employee':
            // function
            break;
        case 'Update employee role':
            // function
            break;
        case 'Update employee manager':
            // function
            break;
        case 'Exit':
            // function
            break;
    }
}

mainMenuChoice()






