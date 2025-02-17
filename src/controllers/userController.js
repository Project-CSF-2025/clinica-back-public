const UserService = require('../services/userService');

const UserController = {
    async getAllUsers(req, res) {
        try {
            const response = await UserService.getAllUsers();
            res.status(200).json(response);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    async getUserById(req, res) {
        try {
            const userId = req.params.id_user;
            const response = await UserService.getUserById(userId);
            res.status(200).json(response);
        } catch (error) {
            res.status(404).json({ error: error.message });
        }
    },

    async createUser(req, res) {
        try {
            const response = await UserService.createUser(req.body);
            res.status(201).json(response);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    },

    async updateUser(req, res) {
        try {
            const userId = req.params.id_user;
            const response = await UserService.updateUser(userId, req.body);
            res.status(200).json(response);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    },

    async deleteUser(req, res) {
        try {
            const userId = req.params.id_user;
            const response = await UserService.deleteUser(userId);
            res.status(200).json(response);
        } catch (error) {
            res.status(404).json({ error: error.message });
        }
    }
};

module.exports = UserController;
