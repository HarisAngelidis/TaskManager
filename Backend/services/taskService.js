const { queryDatabase } = require('../database/database-calls');

function getAllTasks(userId) {
  return queryDatabase("SELECT * FROM tasks WHERE userId = ?", [userId]);
}

function addTask(userId, title, description) {
  const query = `INSERT INTO tasks (userId, title, description) VALUES (?, ?, ?)`;
  const values = [userId, title, description];
  return queryDatabase(query, values).then(result => result.insertId);
}

function updateTask(id, userId, title, description) {
  const query = `UPDATE tasks SET title = ?, description = ? WHERE id = ? AND userId = ?`;
  const values = [title, description, id, userId];
  return queryDatabase(query, values);
}

function deleteTask(id) {
  const query = `DELETE FROM tasks WHERE id = ?`;
  const values = [id];
  return queryDatabase(query, values);
}

module.exports = {
  getAllTasks,
  addTask,
  updateTask,
  deleteTask
};