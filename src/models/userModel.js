const db = require('../config/database');

const UserModel = {
    async createUser(userData) {
        const query = `INSERT INTO users (email) VALUES (?)`;
        const { email } = userData;

        const [result] = await db.promise().query(query, [email]);

        // Return a cleaner response
        return { id_user: result.insertId, email };
    },

    async getUserById(userId) {
        const query = `SELECT * FROM users WHERE id_user = ?`;  // Fix here

        const [results] = await db.promise().query(query, [userId]);
        return results[0] || null;
    },

    async getAllUsers() {
        const query = `SELECT * FROM users`;

        const [results] = await db.promise().query(query);
        return results;
    },

    async updateUser(userId, updateData) {
        const query = `UPDATE users SET email = ? WHERE id_user = ?`;
        const { email } = updateData;

        const [result] = await db.promise().query(query, [email, userId]);
        return result;
    },        

    async deleteUser(userId) {
        const query = `DELETE FROM users WHERE id_user = ?`;  // Fix here

        const [result] = await db.promise().query(query, [userId]);
        return result;
    }
};

module.exports = UserModel;
