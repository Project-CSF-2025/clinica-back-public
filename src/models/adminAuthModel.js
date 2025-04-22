const db = require('../config/database');

const AdminAuthModel = {
  async findByEmail(email) {
    const query = `SELECT * FROM admins WHERE email = ?`;
    return new Promise((resolve, reject) => {
      db.query(query, [email], (err, results) => {
        if (err) return reject(err);
        resolve(results[0] || null);
      });
    });
  },

  async findByResetToken(token) {
    const query = `SELECT * FROM admins WHERE reset_token = ? AND reset_token_expiry > NOW()`;
    return new Promise((resolve, reject) => {
      db.query(query, [token], (err, results) => {
        if (err) return reject(err);
        resolve(results[0] || null);
      });
    });
  },

  async saveResetToken(email, token, expiry) {
    const query = `UPDATE admins SET reset_token = ?, reset_token_expiry = ? WHERE email = ?`;
    return new Promise((resolve, reject) => {
      db.query(query, [token, expiry, email], (err) => {
        if (err) return reject(err);
        resolve();
      });
    });
  },

  async updatePassword(id_admin, hashedPassword) {
    console.log("🛠 Updating password for admin ID:", id_admin);
    console.log("🔐 New hashed password:", hashedPassword);

    const query = `
      UPDATE admins
      SET password_hash = ?, reset_token = NULL, reset_token_expiry = NULL
      WHERE id_admin = ?
    `;
    return new Promise((resolve, reject) => {
      db.query(query, [hashedPassword, id_admin], (err) => {
        if (err) return reject(err);
        resolve();
      });
    });
  }
};

module.exports = AdminAuthModel;
