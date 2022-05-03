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
    afterConnection();
});


afterConnection = () => {
    console.log("*****************************")
    console.log("*                           *")
    console.log("*     EMPLOYEE MANAGER      *")
    console.log("*                           *")
    console.log("*****************************")
    promptUser();
};











app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});