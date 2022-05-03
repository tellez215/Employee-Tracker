// requiring express,mysql2,inquirer,and console.table
const express = require('express');
const mysql = require('mysql2');
const inquirer = require('inquirer');
const conTable = require('console.table');
const { type } = require('express/lib/response');


// adding port and calling for express
const PORT = process.env.PORT || 3001;
const app = express();

// Middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());


// creating a connection with mysql
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Tellez215$',
    database: 'employee_db'
});


// console logging a succesful connection else throws error
connection.connect(err => {
    if (err)
        throw err;
    console.log('Connected!');
});


// options menu using inquirer.prompt
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
                // decided to use switch cases instead of if statments and calling for them down below
        }).then(function(answer) {
            switch (answer.action) {
                case 'View all employees':
                    viewEmployees();
                    break;
                case 'View all departments':
                    viewDepartments();
                    break;
                case 'View all roles':
                    viewRoles();
                    break;
                case 'Add an employee':
                    addEmployee();
                    break;
                case 'Add a department':
                    addDepartment();
                    break;
                case 'Add a role':
                    addRole();
                    break;
                case 'Update employee role':
                    updateRole();
                    break;
                case 'Delete an employee':
                    deleteEmployee();
                    break;
                case 'EXIT':
                    exitApp();
                    break;
            }
        })
};
options()


//calling for viewEmployee which displays current table of employees using the 'SELECT * FROM' method and use the connection to database and use console.table to display table 
function viewEmployees() {
    var query = 'SELECT * FROM employee';
    connection.query(query, function(err, res) {
        if (err)
            throw err;
        console.log(res.length + ' Employees Displayed');
        console.table('All Employees', res);
        options();
    })
};


// calling for viewDepartment and using the same method and using console.table to display current departments
function viewDepartments() {
    var query = 'SELECT * FROM department';
    connection.query(query, function(err, res) {
        if (err)
            throw err;
        console.table('All Departments:', res);
        options();
    })
};


// a function to display current roles and we used console.table and 'connection.query' to do this
function viewRoles() {
    var query = 'SELECT * FROM role';
    connection.query(query, function(err, res) {
        if (err)
            throw err;
        console.table('All Roles:', res);
        options();
    })
};



// Now to add an employee , we used the same steps and above and we are now creating a new inquirer prompt to as the user to input new information on the new employee they are adding
function addEmployee() {
    connection.query('SELECT * FROM role', function(err, res) {
        if (err)
            throw err;
        inquirer
            .prompt([{
                    type: 'input',
                    message: 'New employee first name?',
                    name: 'first_name'
                },
                {
                    type: 'input',
                    message: 'New employee last name?',
                    name: 'last_name'
                },
                {
                    type: 'input',
                    message: 'New employee managers ID?',
                    name: 'manager_id'
                },
                {
                    name: 'role',
                    type: 'list',
                    choices: function() {
                        var roleArr = [];
                        for (let i = 0; i < res.length; i++) {
                            roleArr.push(res[i].title);
                        }
                        return roleArr;
                    },
                    message: 'New employees role?'
                }



            ]).then(function(answer) {
                let role_id;
                for (let j = 0; j < res.length; j++) {
                    if (res[j].title == answer.role) {
                        role_id = res[j].id;
                        console.log(role_id)
                    }
                    // connects to the database and uses the 'insert into and set' to insert the new employee back into the table 
                    connection.query(
                        'INSERT INTO employee SET ?', {
                            first_name: answer.first_name,
                            last_name: answer.last_name,
                            manager_id: answer.manager_id,
                            role_id: role_id,
                        },
                        function(err) {
                            if (err)
                                throw err;
                            console.log('Succesfully added!');
                            options();
                        }
                    )
                }
            })
    })
}


// adds new department and uses inquirer to ask the user what the new department name is and connect with the database to add new department into the table 
function addDepartment() {
    inquirer
        .prompt([{
            name: 'newDepartment',
            type: 'input',
            message: 'Which department to add?'
        }]).then(function(answer) {
            connection.query(
                'INSERT INTO department SET ?', {
                    name: answer.newDepartment
                });
            var query = 'SELECT * FROM department';
            connection.query(query, function(err, res) {
                if (err)
                    throw err;
                console.log('Succesfully Added!')
                console.table('All departments:', res);
                options();
            })
        })
};












// if user selects the 'EXIT' button then this function of 'exitApp' will execute will a simple '.end' and a message letting the user know that they have succesfully left or quit
function exitApp() {
    connection.end();
    console.log('You have quit succesfully and are still on port 3001!')
};


app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});