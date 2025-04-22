const { sql, pool } = require('../config/database');

const AdminAuthModel = {
  async findByEmail(email) {
    const query = `SELECT * FROM admins WHERE email = @Email`;
    const request = pool.request();
    request.input('Email', sql.VarChar, email);

    const result = await request.query(query);
    return result.recordset[0] || null;
  },

  async findByResetToken(token) {
    const query = `SELECT * FROM admins WHERE reset_token = @Token AND reset_token_expiry > GETDATE()`;
    const request = pool.request();
    request.input('Token', sql.VarChar, token);

    const result = await request.query(query);
    return result.recordset[0] || null;
  },

  async saveResetToken(email, token, expiry) {
    const query = `UPDATE admins SET reset_token = @Token, reset_token_expiry = @Expiry WHERE email = @Email`;
    const request = pool.request();
    request.input('Token', sql.VarChar, token);
    request.input('Expiry', sql.DateTime, expiry);
    request.input('Email', sql.VarChar, email);

    await request.query(query);
  },

  async updatePassword(id_admin, hashedPassword) {
    console.log("🛠 Updating password for admin ID:", id_admin);
    console.log("🔐 New hashed password:", hashedPassword);

    const query = `
      UPDATE admins
      SET password_hash = @Password, reset_token = NULL, reset_token_expiry = NULL
      WHERE id_admin = @AdminId
    `;
    const request = pool.request();
    request.input('Password', sql.VarChar, hashedPassword);
    request.input('AdminId', sql.Int, id_admin);

    await request.query(query);
  }
};

module.exports = AdminAuthModel;
