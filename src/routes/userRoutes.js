const express = require('express');
const UserController = require('../controllers/userController');

const router = express.Router();

router.get('/', UserController.getAllUsers);
router.get('/:id_user', UserController.getUserById);
router.post('/', UserController.createUser);
router.put('/:id_user', UserController.updateUser);
router.delete('/:id_user', UserController.deleteUser);

module.exports = router;