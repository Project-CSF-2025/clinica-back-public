const express = require('express');
const router = express.Router();
const AdminController = require('../controllers/adminController');
const authenticateAdmin = require('../middlewares/authMiddleware'); // new middleware

router.post('/login', AdminController.login);
router.get('/dashboard', authenticateAdmin, AdminController.dashboard);

module.exports = router;
