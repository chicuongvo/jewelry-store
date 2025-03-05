import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

export const sendVerificationEmail = async (client, verificationToken) => {
  const transport = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: process.env.EMAIL_ACCOUNT,
      pass: process.env.EMAIL_PASSWORD,
    },
  });
  const sender = '"Jewelry Store" <khanhngoc230705@gmail.com>';
  const mailContent = {
    from: sender,
    to: client,
    subject: "Email Confirmation",
    html: `
    <div>Hello,</div>
    <div>Thank you for signing up! Your verification code is:</div>
    <div style="font-size: 20px; font-weight: bold; color: #ff6600;">${verificationToken}</div>
    <div>Enter this code on the verification page to complete your registration.</div>
    <br>
    <div>Best Regards,</div>
    <div><strong>Jewelry Store</strong></div>
  `,
  };

  transport.sendMail(mailContent, (err, res) => {
    if (err) {
      console.log("Error sending mail:", err);
    } else {
      console.log("Mail sent");
    }
  });
};
