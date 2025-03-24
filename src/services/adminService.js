const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const AdminModel = require('../models/adminModel');

const AdminService = {
    async login(email, password) {
        const admin = await AdminModel.getAdminByEmail(email);

        if (!admin) {
            throw new Error('Admin not found');
        }

        const match = await bcrypt.compare(password, admin.password_hash);
        if (!match) {
            throw new Error('Incorrect password');
        }

        const token = jwt.sign(
            { id_admin: admin.id_admin, email: admin.email },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        return { message: 'Login successful', token };
    }
};

module.exports = AdminService;
