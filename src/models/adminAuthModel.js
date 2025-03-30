const db = require('../config/database');

const AdminAuthModel = {
  async findByEmail(email) {
    const query = `SELECT * FROM admins WHERE email = ?`;
    const [rows] = await db.promise().query(query, [email]);
    return rows[0] || null;
  },

  async findByResetToken(token) {
    const query = `SELECT * FROM admins WHERE reset_token = ? AND reset_token_expiry > NOW()`;
    const [rows] = await db.promise().query(query, [token]);
    return rows[0] || null;
  },

  async saveResetToken(email, token, expiry) {
    const query = `UPDATE admins SET reset_token = ?, reset_token_expiry = ? WHERE email = ?`;
    await db.promise().query(query, [token, expiry, email]);
  },

  async updatePassword(id_admin, hashedPassword) {
    console.log("🛠 Updating password for admin ID:", id_admin);
    console.log("🔐 New hashed password:", hashedPassword);
  
    const query = `
      UPDATE admins
      SET password_hash = ?, reset_token = NULL, reset_token_expiry = NULL
      WHERE id_admin = ?
    `;
    await db.promise().query(query, [hashedPassword, id_admin]);
  }   
  
};

module.exports = AdminAuthModel;
