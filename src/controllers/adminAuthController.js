const { DateTime } = require("luxon");

const AdminAuthService = require('../services/adminAuthService');
const AdminAuthModel = require('../models/adminAuthModel');

const AdminAuthController = {
  async forgotPassword(req, res) {
    const { email } = req.body;

    try {
      const admin = await AdminAuthModel.findByEmail(email);
      if (!admin) {
        return res.status(404).json({ error: "No existe un administrador con este correo." });
      }
      const token = AdminAuthService.generateResetToken();

      const expiry = DateTime.now()
        .setZone("Europe/Madrid")
        .plus({ minutes: 15 })
        .toISO(); // returns string like "2025-04-25T16:44:00.000+02:00"

      await AdminAuthModel.saveResetToken(email, token, expiry);
      await AdminAuthService.sendResetEmail(email, token);

      res.json({ message: "Correo de restablecimiento enviado con éxito." });
    } catch (err) {
      console.error("❌ Forgot password error:", err);
      res.status(500).json({ error: "Error al enviar el correo de recuperación." });
    }
  },

  async resetPassword(req, res) {
    const { token } = req.params;
    const { newPassword } = req.body;
  
    try {
      const admin = await AdminAuthModel.findByResetToken(token);
      
      if (!admin) {
        return res.status(400).json({ error: "Token inválido." });
      }
  
      // ✅ CHECK IF TOKEN IS EXPIRED IN JS
      const now = new Date();
      const expiry = new Date(admin.reset_token_expiry);
  
      console.log("⏰ Current time:", now);
      console.log("📆 Token expiry:", expiry);
  
      if (now > expiry) {
        return res.status(400).json({ error: "Token expirado. Solicita uno nuevo." });
      }
  
      // ✅ Continue with password reset
      const hashedPassword = await AdminAuthService.hashPassword(newPassword);
      await AdminAuthModel.updatePassword(admin.id_admin, hashedPassword);
  
      res.json({ message: "Contraseña restablecida con éxito." });
  
    } catch (err) {
      console.error("❌ Reset password error:", err.message, err.stack);
      res.status(500).json({ error: "No se pudo restablecer la contraseña." });
    }
  }
  
};

module.exports = AdminAuthController;
