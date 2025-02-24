const UserModel = require('../models/userModel');

const UserService = {
    async createUser(userData) {
        try {
            if (!userData.email) {
                // If no email is provided, return the anonymous user
                console.log("No email provided. Assigning anonymous user.");
                const anonymousUser = await UserModel.getUserById(1); // Fetch user with id_user = 1
                if (!anonymousUser) {
                    throw new Error("Anonymous user does not exist. Check database setup.");
                }
                return {
                    message: "Anonymous user assigned",
                    user: anonymousUser
                };
            }

            // If an email is provided, check if the user already exists
            let user = await UserModel.getUserByEmail(userData.email);
            if (!user) {
                // Create new user if not found
                user = await UserModel.createUser(userData);
                return {
                    message: "User created successfully",
                    user
                };
            }

            return {
                message: "User already exists",
                user
            };

        } catch (error) {
            console.error("❌ Error in createUser:", error.message);
            throw new Error(error.message);
        }
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
        return {
            message: users.length ? "Users retrieved successfully" : "No users found",
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
