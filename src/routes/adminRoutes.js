const express = require('express');
const router = express.Router();

const AdminController = require('../controllers/adminController');
const AdminAuthController = require('../controllers/adminAuthController'); // ✅ Add this

const authenticateAdmin = require('../middlewares/authMiddleware');

// Auth routes
router.post('/login', AdminController.login);
router.get('/dashboard', authenticateAdmin, AdminController.dashboard);

// Password recovery routes
router.post('/forgot-password', AdminAuthController.forgotPassword);
router.post('/reset-password/:token', AdminAuthController.resetPassword);

module.exports = router;
