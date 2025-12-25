import { hash, type Options, verify } from "@node-rs/argon2";
import { render } from "@react-email/components";
import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { APIError, createAuthMiddleware } from "better-auth/api";
import { nextCookies } from "better-auth/next-js";
import { admin } from "better-auth/plugins";
import { env } from "@/env";
import { ac, roles } from "@/lib/auth/permission";
import { db } from "@/lib/db";
import { Role } from "@/lib/db/prisma/enums";
import { transporter } from "@/lib/email/nodemailer";
import ResetPasswordTemplate from "@/lib/email/templates/reset-password";
import VerifyEmailTemplate from "@/lib/email/templates/verify-email";
import { normalizeName } from "@/lib/utils";

const options: Options = {
  memoryCost: 19_456,
  timeCost: 2,
  outputLen: 32,
  parallelism: 1,
};

export const auth = betterAuth({
  baseURL: env.NEXT_PUBLIC_BASE_URL,
  database: prismaAdapter(db, { provider: "postgresql" }),
  emailAndPassword: {
    enabled: true,
    autoSignIn: false,
    requireEmailVerification: true,
    password: {
      hash: async (password) => await hash(password, options),
      verify: async ({ hash: hashed, password }) => await verify(hashed, password, options),
    },
    sendResetPassword: async ({ user, url }) => {
      const emailHtml = await render(ResetPasswordTemplate(url));
      const emailOptions = {
        from: `BetterAuth Nextjs <${env.EMAIL_SENDER_ADDRESS}>`,
        to: user.email,
        subject: "Reset Your Password - BetterAuth Next.js",
        html: emailHtml,
      };
      try {
        const result = await transporter.sendMail(emailOptions);
        console.log("Reset email sent:", result);
      } catch (error) {
        console.error("❌ Failed to reset password email:", error);
        throw error; // Re-throw to let Better Auth handle it
      }
    },
  },
  emailVerification: {
    sendOnSignUp: true,
    expiresIn: 60 * 5,
    autoSignInAfterVerification: true,
    sendVerificationEmail: async ({ user, url }) => {
      const emailHtml = await render(VerifyEmailTemplate(url));
      const emailOptions = {
        from: `BetterAuth Nextjs <${env.EMAIL_SENDER_ADDRESS}>`,
        to: user.email,
        subject: "Verify Your Email Address - BetterAuth Next.js",
        html: emailHtml,
      };
      try {
        const result = await transporter.sendMail(emailOptions);
        console.log("Verification email sent:", result);
      } catch (error) {
        console.error("❌ Failed to send verification email:", error);
        throw error; // Re-throw to let Better Auth handle it
      }
    },
  },
  socialProviders: {
    google: {
      clientId: env.GOOGLE_CLIENT_ID,
      clientSecret: env.GOOGLE_CLIENT_SECRET,
    },
    github: {
      clientId: env.GITHUB_CLIENT_ID,
      clientSecret: env.GITHUB_CLIENT_SECRET,
    },
  },
  hooks: {
    before: createAuthMiddleware(async (ctx) => {
      if (ctx.path !== "/sign-up/email") {
        return;
      }
      const email = String(ctx.body.email).toLowerCase(); // Normalize email
      const domain = email.split("@")[1];
      const VALID_DOMAINS = env.ALLOWED_EMAIL_DOMAINS.split(";");

      if (!VALID_DOMAINS.includes(domain)) {
        throw new APIError("BAD_REQUEST", {
          message: `Email must end with allowed domains (e.g., ${VALID_DOMAINS[0]})`,
        });
      }
      const name = normalizeName(ctx.body.name);
      return { context: { ...ctx, body: { ...ctx.body, name } } };
    }),
  },
  databaseHooks: {
    user: {
      create: {
        before: async (user) => {
          const adminEmails = env.ADMIN_EMAILS?.split(";") ?? [];
          if (adminEmails.includes(user.email)) {
            return { data: { ...user, role: Role.Admin } };
          }
          return { data: user };
        },
      },
    },
  },
  user: {
    additionalFields: {
      role: {
        type: ["Admin", "User"] as Role[],
        input: false,
      },
    },
  },
  account: { accountLinking: { enabled: false } },
  session: { expiresIn: 30 * 24 * 60 * 60 },
  advanced: { database: { generateId: false } },
  plugins: [
    nextCookies(),
    admin({
      defaultRole: Role.User,
      adminRoles: [Role.Admin],
      ac,
      roles,
    }),
  ],
});

export type ErrorCode = keyof typeof auth.$ERROR_CODES | "UNKNOWN";
export type Session = typeof auth.$Infer.Session;
