import nodemailer from "nodemailer";
import { env } from "@/env";

export const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: env.GOOGLE_USER_ADDRESS,
    pass: env.GOOGLE_APP_PASSWORD,
  },
});
