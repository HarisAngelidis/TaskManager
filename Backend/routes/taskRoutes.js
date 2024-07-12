const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController');
const path = '/api/tasks/:id'

router.get(path, taskController.getAllTasks);
router.post(path, taskController.addTask);
router.put(path, taskController.updateTask);
router.delete(path, taskController.deleteTask);

module.exports = router;