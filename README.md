# Better Auth Next.js

A modern Next.js 16 application demonstrating authentication with Better Auth, Prisma, and Tailwind CSS v4.

## Features

- **Authentication**: Email/Password, Google, GitHub using [Better Auth](https://better-auth.com/).
- **Database**: PostgreSQL with [Prisma ORM](https://www.prisma.io/).
- **Validation**: Type-safe environment variables with `@t3-oss/env-nextjs` and `zod`.
- **Styling**: Tailwind CSS v4 with `bricolage-grotesque` font.
- **Email**: Nodemailer for sending verification and reset password emails.

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **Database**: PostgreSQL, Prisma
- **Auth**: Better Auth
- **Package Manager**: Bun

## Getting Started

### Prerequisites

- Node.js 20+
- Bun (`npm install -g bun`)
- PostgreSQL database

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd better-auth-nextjs
   ```

2. Install dependencies:
   ```bash
   bun install
   ```

3. Set up environment variables:
   Copy `example.env` to `.env` and fill in the values:
   ```bash
   cp example.env .env
   ```

   **Required Variables in `.env`:**
   ```env
   # Database
   DATABASE_URL="postgresql://user:password@localhost:5432/better_auth_db?schema=public"
   
   # App
   NODE_ENV="development"
   NEXT_PUBLIC_BASE_URL="http://localhost:3000"
   BETTER_AUTH_SECRET="your-secret-here" # Generate with better-auth-cli or `openssl rand -base64 32`
   
   # Email
   EMAIL_SENDER_ADDRESS="noreply@example.com"
   GOOGLE_USER_ADDRESS="your-email@gmail.com" # If using Gmail SMTP
   GOOGLE_APP_PASSWORD="your-app-password"    # If using Gmail SMTP
   
   # Auth Providers (Optional if not using social login)
   GOOGLE_CLIENT_ID=""
   GOOGLE_CLIENT_SECRET=""
   GITHUB_CLIENT_ID=""
   GITHUB_CLIENT_SECRET=""
   
   # Admin
   ADMIN_EMAILS="admin@example.com;superuser@example.com"
   ALLOWED_EMAIL_DOMAINS="gmail.com;yahoo.com;hotmail.com;outlook.com"
   ```

4. Set up the database:
   ```bash
   bun run db:generate
   ```

5. Run the development server:
   ```bash
   bun run dev
   ```

## Scripts

- `bun run dev`: Start development server
- `bun run build`: Build for production
- `bun run db:generate`: Generate Prisma client and migrate dev (if configured)
- `bun run db:studio`: Open Prisma Studio

## License

MIT