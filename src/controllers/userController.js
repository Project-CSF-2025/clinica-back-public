const CreateUserDTO = require('../dtos/createUser.dto');
const UserService = require('../services/userService');

const UserController = {
    async createUser(req, res) {
        try {
            const userData = new CreateUserDTO(req.body);

            const newUser = await UserService.createUser(userData);
            res.status(201).json(newUser);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    },

    async getUserById(req, res) {
        try {
            const userId = req.params.id;

            const user = await UserService.getUserById(userId);
            if (!user) return res.status(404).json({ error: 'User not found' });

            res.json(user);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    async updateUser(req, res) {
        try {
            const userId = req.params.id;
            const updateData = req.body;

            const updatedUser = await UserService.updateUser(userId, updateData);
            res.json(updatedUser);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    },

    async deleteUser(req, res) {
        try {
            const userId = req.params.id;

            await UserService.deleteUser(userId);
            res.status(204).send();  // No Content
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
};

module.exports = UserController;
