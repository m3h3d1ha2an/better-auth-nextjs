import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  server: {
    DATABASE_URL: z.string().url(),
    NODE_ENV: z.enum(["development", "test", "production"]).default("development"),
    // Better Auth
    BETTER_AUTH_SECRET: z.string().min(1),
    EMAIL_SENDER_ADDRESS: z.string().email(),

    // Auth Providers
    GOOGLE_CLIENT_ID: z.string().min(1),
    GOOGLE_CLIENT_SECRET: z.string().min(1),
    GITHUB_CLIENT_ID: z.string().min(1),
    GITHUB_CLIENT_SECRET: z.string().min(1),

    // Email (Nodemailer)
    GOOGLE_USER_ADDRESS: z.string().email().optional(),
    GOOGLE_APP_PASSWORD: z.string().min(1).optional(),

    // Admin config
    ADMIN_EMAILS: z.string().optional(),

    // App Config
    ALLOWED_EMAIL_DOMAINS: z.string().default("gmail.com;yahoo.com;hotmail.com;outlook.com"),
  },
  client: {
    NEXT_PUBLIC_BASE_URL: z.url(),
  },
  experimental__runtimeEnv: {
    NEXT_PUBLIC_BASE_URL: process.env.NEXT_PUBLIC_BASE_URL,
  },
});
