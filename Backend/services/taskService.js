const { queryDatabase } = require('../database/database-calls');

function getAllTasks(userId) {
  return userId ? queryDatabase("SELECT * FROM tasks WHERE userId = ?", [userId]) :
  queryDatabase("SELECT * FROM tasks") ;
}

function addTask(userId, title, description) {
  const query = `INSERT INTO tasks (userId, title, description,statusId) VALUES (?, ?, ?,?)`;
  const values = [userId, title, description,1];
  return queryDatabase(query, values).then(result => result.insertId);
}

function updateTask(id, userId, title, description) {
  const query = `UPDATE tasks SET title = ?, description = ?  WHERE id = ? AND userId = ?`;
  const values = [title, description, id, userId];
  return queryDatabase(query, values);
}

function updateStatus(id, statusId) {
  const query = `UPDATE tasks SET statusId = ? WHERE id = ? `;
  const values = [statusId,id];
  return queryDatabase(query, values);
}

function deleteTask(id) {
  const query = `DELETE FROM tasks WHERE id = ?`;
  const values = [id];
  return queryDatabase(query, values);
}

function getUserIdByTaskId(id) {
  const query = `select UserId from tasks WHERE id = ?`;
  const values = [id];
  return queryDatabase(query, values);
}

function getStatusById(id){

  const query = `select status from tasksStatus WHERE id = ?`;
  const values = [id];
  return queryDatabase(query, values);

}

module.exports = {
  getAllTasks,
  addTask,
  updateTask,
  deleteTask,
  getUserIdByTaskId,
  getStatusById,
  updateStatus
};