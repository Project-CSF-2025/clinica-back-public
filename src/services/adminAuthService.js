const crypto = require('crypto');
const bcrypt = require('bcrypt');
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
});

const AdminAuthService = {
  generateResetToken() {
    return crypto.randomBytes(32).toString('hex');
  },

  async hashPassword(plainText) {
    return await bcrypt.hash(plainText, 10); // ✅ Secure and compatible
  },

  async sendResetEmail(to, token) {
    const resetLink = `${process.env.CLIENT_URL}/admin/reset-password/${token}`;

    await transporter.sendMail({
      from: `"Clínica Sagrada Familia" <${process.env.MAIL_USER}>`,
      to,
      subject: "Restablecer contraseña",
      html: `
        <p>Has solicitado restablecer tu contraseña.</p>
        <p>Haz clic en el siguiente enlace para continuar:</p>
        <a href="${resetLink}">${resetLink}</a>
        <p>Este enlace expirará en 15 minutos.</p>
      `,
    });
  },
};

module.exports = AdminAuthService;
