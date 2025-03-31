const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
});

const EmailNotificationService = {
  async sendReportStatusUpdate(email, reportCode, newStatus) {
    const directLink = `${process.env.CLIENT_URL}/view/${reportCode}`;

    const mailOptions = {
      from: `"Clínica Sagrada Familia" <${process.env.MAIL_USER}>`,
      to: email,
      subject: 'Actualización de estado del reporte',
      html: `
        <p>El estado de tu reporte <strong>${reportCode}</strong> ha sido actualizado a: <strong>${newStatus}</strong>.</p>
        <p>Puedes consultar los detalles directamente aquí:</p>
        <a href="${directLink}">${directLink}</a>
      `,
    };

    await transporter.sendMail(mailOptions);
  },

  async sendAdminMessage(email, messageContent, reportCode) {
    const mailOptions = {
      from: `"Clínica Sagrada Familia" <${process.env.MAIL_USER}>`,
      to: email,
      subject: 'Nuevo mensaje de seguimiento del administrador',
      html: `
        <p>Has recibido un nuevo mensaje de un administrador sobre tu reporte <strong>${reportCode}</strong>:</p>
        <blockquote style="border-left: 3px solid #007bff; margin: 1em 0; padding: 0.5em 1em; background-color: #f9f9f9; font-style: italic;">
          ${messageContent}
        </blockquote>
        <p>Puedes revisar tu reporte directamente aquí:</p>
        <p><a href="${process.env.CLIENT_URL}/view/${reportCode}">${process.env.CLIENT_URL}/view/${reportCode}</a></p>
      `
    };
  
    await transporter.sendMail(mailOptions);
  }  
};

module.exports = EmailNotificationService;
