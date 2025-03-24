const AdminService = require('../services/adminService');

const AdminController = {
    async login(req, res) {
        try {
            const { email, password } = req.body;
            const response = await AdminService.login(email, password);
            res.status(200).json(response);
        } catch (error) {
            res.status(401).json({ error: error.message });
        }
    },
    async dashboard(req, res) {
        res.status(200).json({
            message: `Welcome Admin #${req.admin.id_admin}`,
            admin: req.admin
        });
    }
};

module.exports = AdminController;
