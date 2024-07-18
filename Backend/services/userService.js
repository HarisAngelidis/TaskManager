const  {queryDatabase }= require('../database/database-calls');


function getAllUsers() {

    
    return queryDatabase("SELECT * FROM Users", []);

    
}

function getUserById(id) {
    return queryDatabase("SELECT * FROM Users WHERE UserId = ?", [id]);
}

function addUser(lastname, firstname, age, dateofbirth,RoleId,username,password,email) {
    const query = `INSERT INTO Users (LastName, FirstName, Age, DateOfBirth,RoleId,username,password,email) VALUES (?, ?, ?, ?, ?,?,?,?)`;
    const values = [lastname, firstname, age, dateofbirth,RoleId,username,password,email];
    return queryDatabase(query, values).then(result => result.insertId);
}

function updateUser(id,lastname, firstname, age, dateofbirth,username,password,email) {
    const query = `UPDATE Users SET LastName = ?, FirstName = ?, Age = ?, DateOfBirth = ?, Username = ? , Password = ?, email = ? WHERE UserId = ?`;
    const values = [lastname, firstname, age, dateofbirth,username,password,email,id];
    return queryDatabase(query, values);
}

function deleteUser(id) {
    return queryDatabase("DELETE FROM Users WHERE UserId = ?", [id]);
}

function getUsersByDate(ApoDate, MexriDate) {
    const query = `SELECT * FROM Users WHERE DateOfBirth BETWEEN ? AND ?`;
    const values = [ApoDate, MexriDate];
    return queryDatabase(query, values);
}

function getEmailByUsername(username) {
    const query = `SELECT email,Password FROM Users WHERE Username = ?`;
    const values = [username];
    return queryDatabase(query, values);
}

function UserLogin(username, password) {
    const query = 'SELECT * FROM users WHERE Username = ? AND Password = ?';
    const values = [username, password];
    return queryDatabase(query, values);
}

function countUsers(){

    const query = 'SELECT count(UserId) FROM users';
    const values = [];
    return queryDatabase(query, values);

}

module.exports = {
    getAllUsers,
    getUserById,
    addUser,
    updateUser,
    deleteUser,
    getUsersByDate,
    UserLogin,
    getEmailByUsername,
    countUsers
};