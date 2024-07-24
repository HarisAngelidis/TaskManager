const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController');
const path = '/api/tasks/:id'
const path2 = '/api/taskItems/:id';
const { verifyToken } = require('../authMiddleware');

router.get(path2,taskController.getAllTaskItemsByTaskId);
router.get('/api/tasks/count', taskController.countTasks);
router.get('/api/tasks/countC', taskController.countCompletedTasks);
router.get('/api/tasks/countP', taskController.countPendingTasks);
router.get('/api/tasks/Notifications', taskController.getTaskNotifications);
router.get('/api/tasks/Notification/:id', taskController.getTaskNotification);
router.get(path, verifyToken, taskController.getAllTasks);
router.post(path, verifyToken,taskController.addTask);
router.post(path2,taskController.addTaskItem);
router.put(path,verifyToken, taskController.updateTask);
router.put(path2,taskController.updateTaskItem);
router.put(path + "/status", verifyToken,taskController.updateStatus);
router.delete(path,verifyToken, taskController.deleteTask);
router.delete(path2,taskController.deleteTaskItem);

module.exports = router;