const db = require('../config/database');

const AdminModel = {
  async getAdminByEmail(email) {
    const query = `SELECT * FROM admins WHERE email = ?`;
    return new Promise((resolve, reject) => {
      db.query(query, [email], (err, results) => {
        if (err) return reject(err);
        resolve(results.length ? results[0] : null);
      });
    });
  }
};

module.exports = AdminModel;
