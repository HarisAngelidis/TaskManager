const taskService = require('../services/taskService');

async function getAllTasks(req, res) {
  const userId = parseInt(req.params.id);
  try {
    const result = await taskService.getAllTasks(userId);
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ msg: `Something went wrong` });
  }
}

async function addTask(req, res) {
  const {  title, description } = req.body;
  const userId = parseInt(req.params.id);
  try {
    const result = await taskService.addTask(userId, title, description);
    res.status(200).json({ id: result });
  } catch (err) {
    res.status(500).json({ msg: `Something went wrong` });
  }
}

async function updateTask(req, res) {
  const { userId, title, description } = req.body;
  const { id } = req.params;
  try {
    await taskService.updateTask(id, userId, title, description);
    res.status(200).json({ msg: 'Task updated' });
  } catch (err) {
    res.status(500).json({ msg: `Something went wrong` });
  }
}

async function deleteTask(req, res) {

  const { id } = req.params;
  try {
    await taskService.deleteTask(id);
    res.status(200).json({ msg: 'Task deleted' });
  } catch (err) {
    res.status(500).json({ msg: `Something went wrong` });
  }
}

module.exports = {
  getAllTasks,
  addTask,
  updateTask,
  deleteTask
};
