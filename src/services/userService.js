const UserModel = require('../models/userModel');

const UserService = {
    async createUser(userData) {
        const newUser = await UserModel.createUser(userData);
        return {
            message: "User created successfully",
            user: newUser
        };
    },

    async getUserById(userId) {
        const user = await UserModel.getUserById(userId);
        if (!user) {
            throw new Error("User not found");
        }
        return {
            message: "User retrieved successfully",
            user
        };
    },

    async getAllUsers() {
        const users = await UserModel.getAllUsers();
        if (users.length === 0) {
            return {
                message: "No users found",
                users: []
            };
        }
        return {
            message: "Users retrieved successfully",
            users
        };
    },

    async updateUser(userId, updateData) {
        const success = await UserModel.updateUser(userId, updateData);
        if (!success) {
            throw new Error("User not found or update failed");
        }
        return {
            message: "User updated successfully"
        };
    },

    async deleteUser(userId) {
        const success = await UserModel.deleteUser(userId);
        if (!success) {
            throw new Error("User not found or deletion failed");
        }
        return {
            message: "User deleted successfully"
        };
    }
};

module.exports = UserService;
