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
      const expiry = new Date(Date.now() + 15 * 60 * 1000); // 15 mins

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
        return res.status(400).json({ error: "Token inválido o expirado." });
      }

      // ✅ FIXED: Await the hash function
      const hashedPassword = await AdminAuthService.hashPassword(newPassword);

      // ✅ Use admin.id_admin, not token
      await AdminAuthModel.updatePassword(admin.id_admin, hashedPassword);

      res.json({ message: "Contraseña restablecida con éxito." });
    } catch (err) {
      console.error("❌ Reset password error:", err.message, err.stack);
      res.status(500).json({ error: "No se pudo restablecer la contraseña." });
    }
  }
};

module.exports = AdminAuthController;
