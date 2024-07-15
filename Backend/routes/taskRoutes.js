const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController');
const path = '/api/tasks/:id'
const { verifyToken } = require('../authMiddleware');


router.get(path, verifyToken, taskController.getAllTasks);
router.post(path, verifyToken,taskController.addTask);
router.put(path,verifyToken, taskController.updateTask);
router.put(path + "/status", verifyToken,taskController.updateStatus);
router.delete(path,verifyToken, taskController.deleteTask);

module.exports = router;