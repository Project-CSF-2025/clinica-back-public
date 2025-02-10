const UserModel = require('../models/userModel');

const UserService = {
    async createUser(userData) {
        // Perform business logic, e.g., checking for existing users by email (if needed)
        return await UserModel.createUser(userData);
    },

    async getUserById(userId) {
        const user = await UserModel.getUserById(userId);
        if (!user) {
            throw new Error('User not found');
        }
        return user;
    },

    async updateUser(userId, updateData) {
        return await UserModel.updateUser(userId, updateData);
    },

    async deleteUser(userId) {
        return await UserModel.deleteUser(userId);
    }
};

module.exports = UserService;
