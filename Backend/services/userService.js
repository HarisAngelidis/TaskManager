const  {queryDatabase }= require('../database/database-calls');


function getAllUsers(flag,role) {

    if(!flag){
    return queryDatabase("SELECT * FROM Users", []);}

    else{return queryDatabase("SELECT * FROM Users u INNER JOIN UserRole UR on U.RoleID = UR.RoleID WHERE Role= ?", [role]);}
}

function getUserById(id) {
    return queryDatabase("SELECT * FROM Users WHERE UserId = ?", [id]);
}

function addUser(lastname, firstname, age, dateofbirth,RoleId,username,password) {
    const query = `INSERT INTO Users (LastName, FirstName, Age, DateOfBirth,RoleId,username,password) VALUES (?, ?, ?, ?, ?,?,?)`;
    const values = [lastname, firstname, age, dateofbirth,RoleId,username,password];
    return queryDatabase(query, values).then(result => result.insertId);
}

function updateUser(id,lastname, firstname, age, dateofbirth,username,password) {
    const query = `UPDATE Users SET LastName = ?, FirstName = ?, Age = ?, DateOfBirth = ?, Username = ? , Password = ? WHERE UserId = ?`;
    const values = [lastname, firstname, age, dateofbirth,username,password,id];
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

function UserLogin(username, password) {
    const query = 'SELECT * FROM users WHERE Username = ? AND Password = ?';
    const values = [username, password];
    return queryDatabase(query, values);
}

module.exports = {
    getAllUsers,
    getUserById,
    addUser,
    updateUser,
    deleteUser,
    getUsersByDate,
    UserLogin
};