import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { APIError, createAuthMiddleware } from "better-auth/api";
import { nextCookies } from "better-auth/next-js";
import { hashPassword, verifyPassword } from "@/lib/argon2";
import { db } from "@/lib/db";
import { normalizeName } from "../utils";

export const auth = betterAuth({
  database: prismaAdapter(db, { provider: "postgresql" }),
  emailAndPassword: {
    enabled: true,
    autoSignIn: false,
    password: {
      hash: hashPassword,
      verify: verifyPassword,
    },
  },
  session: {
    expiresIn: 30 * 24 * 60 * 60,
  },
  advanced: {
    database: {
      generateId: false,
    },
  },
  plugins: [nextCookies()],
  hooks: {
    // biome-ignore  lint/suspicious/useAwait: <betterauth requires async>
    before: createAuthMiddleware(async (ctx) => {
      if (ctx.path !== "/sign-up/email") {
        return;
      }
      const email = String(ctx.body.email);
      const domain = email.split("@")[1];
      const VALID_DOMAINS = ["gmail.com", "yahoo.com", "hotmail.com", "outlook.com", "protonmail.com", "proton.me"];
      if (!VALID_DOMAINS.includes(domain)) {
        throw new APIError("BAD_REQUEST", {
          message: "Email must end with popular domains (e.g., gmail.com, outlook.com)",
        });
      }
      const name = normalizeName(ctx.body.name);
      return { context: { ...ctx, body: { ...ctx.body, name } } };
    }),
  },
});

export type ErrorCode = keyof typeof auth.$ERROR_CODES | "UNKNOWN";
export type Session = typeof auth.$Infer.Session;
