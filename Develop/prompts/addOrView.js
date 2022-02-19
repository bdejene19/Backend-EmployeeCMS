const inquirer = require('inquirer');
/**
 * view all departments, 
 * view all roles, 
 * view all employees, 
 * add a department, 
 * add a role, 
 * add an employee
 * update an employee role
 */

const addViewDecision = () => {
    return inquirer.prompt([
        {
            type: 'list',
            choices: ["View All Departments" , "View All Roles", "View All Employees", "Add a Department", "Add a Role", "Add an Employee", "Update an Employee Role"],
            message: "Options",
            name: 'options',
        }
    ])
}
module.exports = {
    addViewDecision,
}