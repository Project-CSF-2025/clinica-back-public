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
      const result = await new Promise((resolve, reject) => {
        db.query(query, [email], (err, res) => {
          if (err) return reject(err);
          resolve(res);
        });
      });

      return { id_user: result.insertId, email };
    } catch (error) {
      console.error("❌ Error creating user:", error);
      throw error;
    }
  },

  async getAllUsers() {
    const query = `SELECT * FROM users`;

    try {
      const results = await new Promise((resolve, reject) => {
        db.query(query, (err, rows) => {
          if (err) return reject(err);
          resolve(rows);
        });
      });

      return results;
    } catch (error) {
      console.error("❌ Error fetching all users:", error);
      throw error;
    }
  },

  async getUserByEmail(email) {
    const query = `SELECT * FROM users WHERE email = ?`;

    try {
      const results = await new Promise((resolve, reject) => {
        db.query(query, [email], (err, rows) => {
          if (err) return reject(err);
          resolve(rows);
        });
      });

      return results.length ? results[0] : null;
    } catch (error) {
      console.error("❌ Error fetching user by email:", error);
      throw error;
    }
  },

  async findByReportCode(report_code) {
    const query = `
      SELECT u.email 
      FROM users u
      INNER JOIN reports r ON u.id_user = r.id_user
      WHERE r.report_code = ?
    `;

    const rows = await new Promise((resolve, reject) => {
      db.query(query, [report_code], (err, res) => {
        if (err) return reject(err);
        resolve(res);
      });
    });

    return rows[0] || null;
  },

  async findByReportId(id_report) {
    const query = `
      SELECT u.email 
      FROM users u
      INNER JOIN reports r ON u.id_user = r.id_user
      WHERE r.id_report = ?
    `;

    const rows = await new Promise((resolve, reject) => {
      db.query(query, [id_report], (err, res) => {
        if (err) return reject(err);
        resolve(res);
      });
    });

    return rows[0] || null;
  }
};

module.exports = UserModel;
