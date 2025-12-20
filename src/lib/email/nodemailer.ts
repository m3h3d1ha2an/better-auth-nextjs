import nodemailer from "nodemailer";

// const emailSender = nodemailer.createTransport({
//   service: "gmail",
//   auth: {
//     user: process.env.GOOGLE_USER_ADDRESS,
//     pass: process.env.GOOGLE_APP_PASSWORD
//   }
// });

const testAccount = await nodemailer.createTestAccount();

export const transporter = nodemailer.createTransport({
  host: testAccount.smtp.host,
  port: testAccount.smtp.port,
  secure: testAccount.smtp.secure,
  auth: {
    user: testAccount.user,
    pass: testAccount.pass,
  },
});
