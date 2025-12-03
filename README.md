## Cleanup

- [x] remove files from `public/`
- [x] clear `globals.css`
- [x] clear `page.tsx`
- [x] install shadcn ui `bunx --bun shadcn@latest init`
- [x] install components `bunx --bun shadcn@latest add button label input checkbox card sonner`
- [x] show `button` and test `dev` server

## Part 1

- [x] install Better auth `bun i better-auth`
- [x] create `.env` and set Environment Variables
- [x] create `src/lib/auth/index.ts` for better auth instance setup
- [x] setup `postgres` database with a free cloud database provider called `neon`
- [x] install `prisma` `bun i -d prisma @types/node @types/pg` & `@prisma/client @prisma/adapter-pg pg dotenv`
- [x] setup prisma with `bunx prisma init --datasource-provider postgresql --output ../src/lib/db/prisma`
- [x] create **Post** model in `prisma.schema`
- [x] generate prisma client using `bunx prisma generate`
- [] migrate database using `bunx prisma migrate dev --name init`
- [x] push changes to database using `bunx prisma db push`
- [x] add reusable scripts to `package.json`
- [x] create `src/lib/db/index.ts` for global prisma instance setup
- [x] setup prisma adapter with better auth using `src/lib/auth/index.ts`
- [x] generate auth tables using `bun x @better-auth/cli@latest generate --config ./src/lib/auth/index.ts --output=./prisma/auth.prisma --yes`
- [x] cleanup to `auth.prisma`
- [x] quick walkthrough of auth tables `User, Session, Account, Verification`
- [x] push changes to database using `bunx prisma db push`
- [x] create mount handler in `src/app/api/auth/[...all]/route.ts`
- [x] replace auth import in mount handler with `import { auth } from "@/lib/auth";`

- [x] enable email and password authentication
- [ ] create signup page (part-1)
  - [ ] create `src/app/auth/signup/page.tsx`
  - [ ] show submit values in `src/app/auth/signup/action.ts`
- [ ] setup sonner
- [ ] create signup page (part-2)
  - [ ] add form vaidation
  - [ ] destructive signup function
  - [ ] showcase onError