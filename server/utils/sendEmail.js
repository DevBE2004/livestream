const nodemailer = require("nodemailer");
require("dotenv").config();

module.exports = {
  sendEmail: async (toEmail, subject, html) => {
    const transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: toEmail,
      subject,
      html,
    };

    try {
      const info = await transporter.sendMail(mailOptions);
      return info;
    } catch (error) {
      throw new Error(error);
    }
  },
};
