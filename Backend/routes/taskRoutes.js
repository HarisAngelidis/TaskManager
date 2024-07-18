const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController');
const path = '/api/tasks/:id'
const path2 = '/api/taskItems/:id';
const { verifyToken } = require('../authMiddleware');

router.get(path2,taskController.getAllTaskItemsByTaskId);
router.get(path, verifyToken, taskController.getAllTasks);
router.post(path, verifyToken,taskController.addTask);
router.post(path2,taskController.addTaskItem);
router.put(path,verifyToken, taskController.updateTask);
router.put(path2,taskController.updateTaskItem);
router.put(path + "/status", verifyToken,taskController.updateStatus);
router.delete(path,verifyToken, taskController.deleteTask);
router.delete(path2,taskController.deleteTaskItem);

module.exports = router;