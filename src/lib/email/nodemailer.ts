import nodemailer from "nodemailer";

export const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.GOOGLE_USER_ADDRESS,
    pass: process.env.GOOGLE_APP_PASSWORD,
  },
});
