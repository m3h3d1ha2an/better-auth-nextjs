import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { APIError, createAuthMiddleware } from "better-auth/api";
import { nextCookies } from "better-auth/next-js";
import { admin } from "better-auth/plugins";
import { ac, roles } from "@/lib/auth/permission";
import { db } from "@/lib/db";
import { Role } from "@/lib/db/prisma/enums";
import { normalizeName } from "@/lib/utils";

export const auth = betterAuth({
  database: prismaAdapter(db, { provider: "postgresql" }),
  emailAndPassword: {
    enabled: true,
    autoSignIn: false,
    password: {
      hash: async (password) => await Bun.password.hash(password),
      verify: async ({ password, hash }) => await Bun.password.verify(password, hash),
    },
  },
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
  databaseHooks: {
    user: {
      create: {
        // biome-ignore  lint/suspicious/useAwait: <betterauth requires async>
        before: async (user) => {
          const adminEmails = process.env.ADMIN_EMAILS?.split(";") ?? [];
          if (adminEmails.includes(user.email)) {
            return { data: { ...user, role: "Admin" } };
          }
          return { data: user };
        },
      },
    },
  },
  user: {
    additionalFields: {
      role: {
        type: ["Admin", "User"],
        input: false,
      },
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
