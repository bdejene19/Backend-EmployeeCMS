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
        if (index === questionsArr.length - 1 && questionsArr.length > 1) {
            return {
                type: 'list',
                message: 'Select a Role to add to:',
                choices: question,
                name: 'roleSelect',
            }
        } else {
            let nameVal = '';
            if (questionsArr.length > 1) {
                nameVal = question.split(" ")[3];
            } else {
                nameVal = 'deptName';
            }
            return {
                type: 'input',
                message: `${question}`,
                name: `${nameVal}`,
            }

        }
       
    })
    return promptArr;
}
let promptQs = [];
const deptQs = ["What is the name of your department?"];
const roleQs = ['What is the name of the role?', 'What is the salary of the role?', ['Engineer', "Sales", "Customer Services", "Administration"]]
const addRolePrompt = (role) => {
    // raw list questions 'Which department does the role belong to?'
    if (role === 'Role') {
        promptQs = roleQs
    } else if (role === "Department") {
        promptQs = deptQs
    } else {

    }

    const promptObjs = createPromptObjectsArray(promptQs);
    return inquirer.prompt(promptObjs)
}
const allRoles = ["Engineer", "Lead Software Engineer", "Administration", "Receptionist", "Communications", "Sales Associate", "Sales  Manager"]
const addToTable = (name) => {
    let nameArr = name.split(" ");
    let userQuery = nameArr[nameArr.length - 1];
    let dbTableName = '';
    let dept_id = 0;
    let dbColNames = '';
    let insertVals = '';
    let sqlStr = ``;
    console.log(`\nAdd a ${userQuery}\n`);
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
    addRolePrompt(userQuery).then(roleData => {
    // sql insertion after prompts
        if (userQuery === 'Department') {
            const { deptName } = roleData;
            insertVals = `"${deptName}"`;
            // sqlStr = `INSERT INTO ${dbTableName}(${dbColNames}) VALUES (${insertVals});`;

        }
        else if (userQuery === 'Role') {
            const { name, salary, roleSelect } = roleData;
            allRoles.map((role, index) => {
                if (role === roleSelect) {
                    dept_id = index + 1;
                }
            })
            insertVals = `"${name}", ${parseInt(salary)}, ${parseInt(dept_id)}`;            
        }
        sqlStr = `INSERT INTO ${dbTableName}(${dbColNames}) VALUES (${insertVals});`;

        console.log('my sql str: ', sqlStr);
        db.query(`${sqlStr}`, (err, data) => {
            err ? console.log(err) : console.log(`success adding new ${name} role to database${dbTableName}.`);
            console.log(data);
        })
    });
    
}

module.exports = {
    addToTable,
}