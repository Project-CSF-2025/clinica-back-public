const { sql, pool, poolConnect } = require('../config/database');

const UserModel = {
  async createUser(userData) {
    const { email } = userData;

    if (!email) {
      return { id_user: 1, email: "anonymous@clinica.com" };
    }

    try {
      await poolConnect;
      const existingUser = await this.getUserByEmail(email);
      if (existingUser) {
        return existingUser;
      }

      const query = `
        INSERT INTO users (email, created_at)
        OUTPUT INSERTED.id_user
        VALUES (@email, GETDATE())`;

      const request = pool.request();
      request.input('email', sql.VarChar, email);

      const result = await request.query(query);
      return { id_user: result.recordset[0].id_user, email };
    } catch (error) {
      console.error("❌ Error creating user:", error);
      throw error;
    }
  },

  async getAllUsers() {
    const query = `SELECT * FROM users`;

    try {
      await poolConnect;
      const result = await pool.request().query(query);
      return result.recordset;
    } catch (error) {
      console.error("❌ Error fetching all users:", error);
      throw error;
    }
  },

  async getUserByEmail(email) {
    const query = `SELECT * FROM users WHERE email = @email`;

    try {
      await poolConnect;
      const request = pool.request();
      request.input('email', sql.VarChar, email);

      const result = await request.query(query);
      return result.recordset.length ? result.recordset[0] : null;
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
      WHERE r.report_code = @report_code
    `;

    try {
      await poolConnect;
      const request = pool.request();
      request.input('report_code', sql.VarChar, report_code);

      const result = await request.query(query);
      return result.recordset[0] || null;
    } catch (error) {
      console.error("❌ Error fetching user by report_code:", error);
      throw error;
    }
  },

  async findByReportId(id_report) {
    const query = `
      SELECT u.email
      FROM users u
      INNER JOIN reports r ON u.id_user = r.id_user
      WHERE r.id_report = @id_report
    `;

    try {
      await poolConnect;
      const request = pool.request();
      request.input('id_report', sql.Int, id_report);

      const result = await request.query(query);
      return result.recordset[0] || null;
    } catch (error) {
      console.error("❌ Error fetching user by report_id:", error);
      throw error;
    }
  }
};

module.exports = UserModel;
