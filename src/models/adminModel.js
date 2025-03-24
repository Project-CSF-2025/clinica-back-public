const db = require('../config/database');

const AdminModel = {
    async getAdminByEmail(email) {
        const query = `SELECT * FROM admins WHERE email = ?`;
        const [rows] = await db.promise().query(query, [email]);
        return rows.length ? rows[0] : null;
    }
};

module.exports = AdminModel;
