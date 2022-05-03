const express = require('express');
const mysql = require('mysql2');
const inquirer = require('inquirer');


const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());


const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Tellez215$',
    database: 'employee_db'
});


connection.connect(err => {
    if (err)
        throw err;
    console.log('Connected!');
});

function options() {
    inquirer
        .prompt({
            type: 'list',
            message: 'What would you like to do?',
            name: 'action',
            choices: [
                'View all employees',
                'View all departments',
                'View all roles',
                'Add an employee',
                'Add a department',
                'Add a role',
                'Update employee role',
                'Delete an employee',
                'EXIT'
            ]
        })





}








app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});