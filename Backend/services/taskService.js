const { queryDatabase } = require('../database/database-calls');

function getAllTasks(userId) {
  return userId ? queryDatabase("SELECT * FROM tasks WHERE userId = ?", [userId]) :
  queryDatabase("SELECT * FROM tasks") ;
}

function getAllTaskItemsByTaskId(taskId) {
  const query = `Select * from taskItems where taskId=?`;
  const values = [taskId];
  return queryDatabase(query,values) ;
}


function addTask(userId, title, description) {
  const query = `INSERT INTO tasks (userId, title, description,statusId) VALUES (?, ?, ?,?)`;
  const values = [userId, title, description,1];
  return queryDatabase(query, values).then(result => result.insertId);
}

function addTaskItem(taskId,title) {
  const query = `INSERT INTO taskItems (taskId, title) VALUES (?, ?)`;
  const values = [taskId, title];
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

function updateTaskItem(itemId,title) {
  const query = `UPDATE taskItems SET title = ?  WHERE itemId = ?`;
  const values = [title,itemId];
  return queryDatabase(query, values);
}

function deleteTask(id) {
  const query = `DELETE FROM tasks WHERE id = ?`;
  const values = [id];
  return queryDatabase(query, values);
}

function deleteTaskItem(id) {
  const query = `DELETE FROM taskItems WHERE itemId = ?`;
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

/*function addTaskFile(taskId, filePath) {
  const query = 'UPDATE tasks SET file_path = ? WHERE id = ?';
  const values = [filePath, taskId];
  return queryDatabase(query, values);
}

function getTaskFile(taskId) {
  const query = 'SELECT file_path FROM tasks WHERE id = ?';
  const values = [taskId];
  return queryDatabase(query, values);
}

function deleteTaskFile(taskId) {
  const query = 'UPDATE tasks SET file_path = NULL WHERE id = ?';
  const values = [taskId];
  return queryDatabase(query, values);
}*/

async function addTaskFile(taskId, filePath) {
  const sql = 'UPDATE tasks SET file_path = ? WHERE id = ?';
  await queryDatabase(sql, [filePath, taskId]);
}

async function getTaskFile(taskId) {
  const sql = 'SELECT file_path FROM tasks WHERE id = ?';
  const result = await queryDatabase(sql, [taskId]);
  return result.length > 0 ? result[0].file_path : null;
}

async function deleteTaskFile(taskId) {
  const sql = 'UPDATE tasks SET file_path = NULL WHERE id = ?';
  await queryDatabase(sql, [taskId]);
}

module.exports = {
  getAllTasks,
  addTask,
  updateTask,
  deleteTask,
  getUserIdByTaskId,
  getStatusById,
  updateStatus,
  getAllTaskItemsByTaskId,
  addTaskItem,
  updateTaskItem,
  deleteTaskItem,
  addTaskFile,
  getTaskFile,
  deleteTaskFile,
};