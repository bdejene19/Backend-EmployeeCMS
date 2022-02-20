const mysql = require("mysql2");
const inquirer = require('inquirer');
const db = mysql.createConnection(
    {
    host: "localhost",
    user: "root",
    password: '1234',
    database: 'businessoverlook_db',
    },
    console.log('connected to businessoverlook_db in mysql')
)

/**
 * Maps array and returns new array of prompt objects
 * @param {[]} questionsArr Array of questions to be asked in prompt
 * @returns new array of prompt objects (properties: type, message, name);
 */
 const createPromptObjectsArray = (questionsArr) => {
    const promptArr = questionsArr.map((question, index) =>  {
        if (index === questionsArr.length - 1) {
            return {
                type: 'list',
                message: 'Select a Role to add to:',
                choices: question,
                name: 'roleSelect',
            }
        } else {
            let nameVal = question.split(" ")[3];
            return {
                type: 'input',
                message: `${question}`,
                name: `${nameVal}`,
            }

        }
       
    })
    return promptArr;
}
const deptQs = [];
const roleQs = ['What is the name of the role?', 'What is the salary of the role?', ['Engineer', "Sales", "Customer Services", "Administration"]]
const addRolePrompt = () => {
    // raw list questions 'Which department does the role belong to?'
    const rolePrompts = createPromptObjectsArray(roleQs);
    return inquirer.prompt(rolePrompts)
}

const addToTable = (name) => {
    let nameArr = name.split(" ");
    let userQuery = nameArr[nameArr.length - 1];
    let dbTableName = '';
    let dbColNames = '';
    let insertVals = '';
    let sqlStr = ``;
    console.log(userQuery);
    if (userQuery === 'Department') {
        dbTableName = 'department';
        dbColNames = 'dept_name';
    } 
    else if (userQuery === 'Role') {
        dbTableName = 'employee_role';
        dbColNames = 'title, salary, dept_id';
    } 
    else {
        dbTableName = 'employee';
    }

    // prompts for new employee
    addRolePrompt().then(roleData => {
    // sql insertion after prompts
    const { name, salary, roleSelect } = roleData;
    insertVals = `"${name}", ${parseInt(salary)}, ${parseInt(232)}`
    sqlStr = `INSERT INTO ${dbTableName}(${dbColNames}) ;`;
    console.log('my sql db query: ', sqlStr);
    console.log('mysql table name', dbTableName);
    db.query(`${sqlStr}`, (err, data) => {
        err ? console.log(err) : console.log(data);
        console.log(data);
    })

    });
    
}

module.exports = {
    addToTable,
}