import { hash, type Options, verify } from "@node-rs/argon2";
import { render } from "@react-email/components";
import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { APIError, createAuthMiddleware } from "better-auth/api";
import { nextCookies } from "better-auth/next-js";
import { admin } from "better-auth/plugins";
import { ac, roles } from "@/lib/auth/permission";
import { db } from "@/lib/db";
import { Role } from "@/lib/db/prisma/enums";
import { transporter } from "@/lib/email/nodemailer";
import { EmailConfirmation } from "@/lib/email/templates/email-confirmation";
import { normalizeName } from "@/lib/utils";
// import { getTestMessageUrl } from "nodemailer";

const options: Options = {
  memoryCost: 19_456,
  timeCost: 2,
  outputLen: 32,
  parallelism: 1,
};

export const auth = betterAuth({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
  database: prismaAdapter(db, { provider: "postgresql" }),
  emailAndPassword: {
    enabled: true,
    autoSignIn: false,
    password: {
      hash: async (password) => await hash(password, options),
      verify: async ({ hash: hashed, password }) => await verify(hashed, password, options),
    },
    requireEmailVerification: true,
  },
  emailVerification: {
    sendOnSignUp: true,
    expiresIn: 60 * 5,
    autoSignInAfterVerification: true,
    sendVerificationEmail: async ({ user, url }) => {
      const emailHtml = await render(EmailConfirmation(url));
      const emailOptions = {
        from: `${process.env.EMAIL_SENDER_NAME} <${process.env.EMAIL_SENDER_ADDRESS}>`,
        to: user.email,
        subject: "BetterAuth Next.js - Email Verification",
        html: emailHtml,
      };
      try {
        await transporter.sendMail(emailOptions);
        // console.log("✅ Verification email sent:", result);
        // const previewUrl = getTestMessageUrl(result);
        // console.log("Preview URL: %s", previewUrl);
      } catch (error) {
        console.error("❌ Failed to send verification email:", error);
        throw error; // Re-throw to let Better Auth handle it
      }
    },
  },
  socialProviders: {
    google: {
      clientId: String(process.env.GOOGLE_CLIENT_ID),
      clientSecret: String(process.env.GOOGLE_CLIENT_SECRET),
    },
    github: {
      clientId: String(process.env.GITHUB_CLIENT_ID),
      clientSecret: String(process.env.GITHUB_CLIENT_SECRET),
    },
  },
  hooks: {
    before: createAuthMiddleware(async (ctx) => {
      if (ctx.path !== "/sign-up/email") {
        return;
      }
      const email = String(ctx.body.email);
      const domain = email.split("@")[1];
      const VALID_DOMAINS = ["gmail.com", "yahoo.com", "hotmail.com", "outlook.com", "protonmail.com", "proton.me", "etlimited.net"];
      if (!VALID_DOMAINS.includes(domain)) {
        throw new APIError("BAD_REQUEST", {
          message: "Email must end with popular domains (e.g., gmail.com, outlook.com)",
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
          const adminEmails = process.env.ADMIN_EMAILS?.split(";") ?? [];
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
