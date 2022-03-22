const mysql = require("mysql2");
const inquirer = require("inquirer");
const util = require("util");
const db = mysql.createConnection(
  {
    host: "localhost",
    user: "root",
    password: "1234",
    database: "businessoverlook_db",
  },
  console.log("connected to businessoverlook_db in mysql")
);
db.connect();

/**
 * Maps array and returns new array of prompt objects
 * @param {[]} questionsArr Array of questions to be asked in prompt
 * @returns new array of prompt objects (properties: type, message, name);
 */
//  const allRoles = ["Engineer", "Lead Software Engineer", "Administration", "Receptionist", "Communications", "Sales Associate", "Sales  Manager"];

const createPromptObjectsArray = (questionsArr) => {
  const promptArr = questionsArr.map((question, index) => {
    if (index === questionsArr.length - 1 && questionsArr.length > 1) {
      let listChoices = questionsArr[questionsArr.length - 1].map((item) => ({
        name: item.dept_name,
        value: item.id,
      }));
      return {
        type: "list",
        message: "Select a Role to add to:",
        choices: listChoices,
        name: "roleSelect",
      };
    } else {
      let nameVal = "";
      if (questionsArr.length > 1) {
        nameVal = question.split(" ")[3];
      } else {
        nameVal = "deptName";
      }
      return {
        type: "input",
        message: `${question}`,
        name: `${nameVal}`,
      };
    }
  });
  return promptArr;
};

const addRolePrompt = async (deptArr) => {
  let promptQs = [];

  // raw list questions 'Which department does the role belong to?'
  const roleQs = [
    "What is the name of the role?",
    "What is the salary of the role?",
    await deptArr,
  ];
  promptQs = roleQs; //

  const promptObjs = createPromptObjectsArray(promptQs);
  return inquirer.prompt(promptObjs);
};

const printText = (textContent) => {
  let text = `____________\n${textContent}\n____________`;
  return text;
};

const addDept = (deptName) => {
  let sql_logic = `INSERT INTO department(dept_name) VALUES ("${deptName}")`;
  db.query(`${sql_logic}`, (err, data) => {
    console.log(
      printText(`Successfully added ${deptName} to department database`)
    );
    return db.query(`SELECT * FROM department`, (err, data) => {
      console.table(data);
    });
  });
};

const addToTable = (name) => {
  let nameArr = name.split(" ");
  let userQuery = nameArr[nameArr.length - 1];
  let dbTableName = "";
  if (userQuery === "Department") {
    inquirer
      .prompt([
        {
          type: "input",
          message: "What is the name of the department you want to add?",
          name: "newDept",
        },
      ])
      .then((deptName) => {
        return addDept(deptName.newDept);
      });
  } else if (userQuery === "Role") {
    db.query(`SELECT * FROM department`, (err, data) => {
      addRolePrompt(data).then((newRole) => {
        console.log(newRole);
        const { name, salary, roleSelect } = newRole;
        let sql_logic = `INSERT INTO employee_role(title, salary, dept_id) VALUES("${name}", ${salary}, ${roleSelect} ) `;
        return db.query(sql_logic, (err, data) => {
          console.log(
            printText(
              `Successfully added ${name} to employee_role table in database`
            )
          );
        });
      });
    });
  } else {
    dbTableName = "employee";
  }

  // // prompts for new employee
};

module.exports = {
  addToTable,
  db,
};
