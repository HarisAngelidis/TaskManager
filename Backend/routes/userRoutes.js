const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const path = '/api/user/';

const { verifyToken, isAdmin } = require('../authMiddleware');

router.post(path + 'login', userController.UserLogin);
router.get(path + 'ByDate', userController.getUsersByDate);
router.get(path + 'count', userController.countUsers);
router.get(path + 'resetPassword/:username', userController.getEmailByUsername);
router.get(path,verifyToken,isAdmin, userController.getAllUsers);

router.get(path + ':id', userController.getUserById);
router.post(path, userController.addUser);

router.put(path + ':id',verifyToken, userController.updateUser);
router.delete(path + ':id', userController.deleteUser);




module.exports = router;
