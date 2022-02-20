/**
 * view function pseudocode:
 * take string as parameter
 * have two empty strings for dynamic output => one for sql db query and one for 
 */
const mysql = require("mysql2");
const db = mysql.createConnection(
    {
    host: "localhost",
    user: "root",
    password: '1234',
    database: 'businessoverlook_db',
    },
    console.log('connected to businessoverlook_db in mysql')
)
const viewTableFromDb = (name) => {
    let nameArr = name.split(" ");
    let userQuery = nameArr[nameArr.length - 1];
    let dbTableName = '';
    let dbQuery = '*';
    let sqlStr = ``;
    if (userQuery === 'Departments') {
        dbTableName = 'department';
    } else if (userQuery === 'Roles') {
        dbTableName = 'employee_role';
    } else {
        dbTableName = 'employee';
    }
    sqlStr = `SELECT ${dbQuery} FROM ${dbTableName}`;

    db.query(`${sqlStr}`, (err, data) => {
        err ? console.log('error getting data from sql server') : console.table(data)
    })
}


module.exports = {
    viewTableFromDb,
}