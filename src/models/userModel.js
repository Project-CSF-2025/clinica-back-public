const db = require('../config/database');

const UserModel = {
    async createUser(userData) {
        const query = `INSERT INTO users (name, email, role) VALUES (?, ?, ?)`;
        const { name, email, role } = userData;

        const [result] = await db.promise().query(query, [name, email, role]);
        return result;
    },

    async getUserById(userId) {
        const query = `SELECT * FROM users WHERE id = ?`;

        const [results] = await db.promise().query(query, [userId]);
        return results[0] || null;
    },

    async updateUser(userId, updateData) {
        const query = `UPDATE users SET name = ?, email = ?, role = ? WHERE id = ?`;
        const { name, email, role } = updateData;

        const [result] = await db.promise().query(query, [name, email, role, userId]);
        return result;
    },

    async deleteUser(userId) {
        const query = `DELETE FROM users WHERE id = ?`;

        const [result] = await db.promise().query(query, [userId]);
        return result;
    }
};

module.exports = UserModel;
