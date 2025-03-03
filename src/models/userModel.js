const db = require('../config/database');

const UserModel = {
    async createUser(userData) {
        const { email } = userData;

        if (!email) {
            return { id_user: 1, email: "anonymous@clinica.com" }; 
        }

        try {
          
            const existingUser = await this.getUserByEmail(email);
            if (existingUser) {
                return existingUser; 
            }

            const query = `INSERT INTO users (email) VALUES (?)`;
            const [result] = await db.promise().query(query, [email]);

            return { id_user: result.insertId, email };
        } catch (error) {
            console.error("❌ Error creating user:", error);
            throw error;
        }
    },

    async getAllUsers() {  // ✅ Adding missing function
        const query = `SELECT * FROM users`;

        try {
            const [results] = await db.promise().query(query);
            return results;
        } catch (error) {
            console.error("❌ Error fetching all users:", error);
            throw error;
        }
    },

    async getUserByEmail(email) {
        const query = `SELECT * FROM users WHERE email = ?`;

        try {
            const [results] = await db.promise().query(query, [email]);
            return results.length ? results[0] : null;
        } catch (error) {
            console.error("❌ Error fetching user by email:", error);
            throw error;
        }
    }
};

module.exports = UserModel;
