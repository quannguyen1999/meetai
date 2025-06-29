Step create
Step 1 install project
npx create-next-app@15.3.2

Step 2 then choose option
✔ Would you like to use TypeScript? … / Yes
✔ Would you like to use ESLint? … / Yes
✔ Would you like to use Tailwind CSS? … / Yes
✔ Would you like your code inside a `src/` directory? … / Yes
✔ Would you like to use App Router? (recommended) … / Yes
✔ Would you like to use Turbopack for `next dev`? … / Yes
✔ Would you like to customize the import alias (`@/*` by default)? … No

Step 3 then install shadcn
npx shadcn@2.5.0 init

Step 4 then choose
Neutral
Use --legacy-peer-deps

Step 5 then
npx shadcn@2.5.0 add --all
then choose
Use --legacy-peer-deps

Step 6 now access link
https://console.neon.tech/app/projects?modal=create_project
==> create table and database

Step 7 copy link and create .env
DATABASE_URL=<pass your link connect db>

Step 8 now install drizzle
npm i drizzle-orm@0.43.1 @neondatabase/serverless@1.0.0 dotenv@16.5.0 --legacy-peer-deps

npm i -D drizzle-kit@0.31.1 tsx@4.19.4 --legacy-peer-deps

Step 9 follow these guild and read the document
https://orm.drizzle.team/docs/get-started/neon-new

Step 10 when you reach step create file drizzle.config.ts
do this
npx drizzle-kit push

Step 11 now execute
npx drizzle-kit studio

Step 12 then execute this command
npm install better-auth@1.2.8 --legacy-peer-deps

Step 13 then add
BETTER_AUTH_SECRET in env
copy secret from here
https://www.better-auth.com/docs/installation
also
BETTER_AUTH_URL=http://localhost:3000

Step 14 then install version
npx @better-auth/cli@1.2.8 generate
if u get some problem when install just do this
export DATABASE_URL=<your actual url>
then yes for auth-schema.ts

Step 15 when done schema
do this
npm run db:push

Step 16 create github secret
copy client id and client secret to env
GITHUB_CLIENT_ID=<client id>
GITHUB_CLIENT_SECRET=<client secret>

Step 17 do the same for google
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=

Step 18 now install
npm i react-icons --legacy-peer-deps

Step 19 now install
npm i @dicebear/core @dicebear/collection --legacy-peer-deps

Step 20 install tRPC
npm install @trpc/server@11.1.2 @trpc/client@11.1.2 @trpc/tanstack-react-query@11.1.2 @tanstack/react-query@5.76.1 zod@3.25.7 client-only server-only --legacy-peer-deps

and import this env
NEXT_PUBLIC_VERCEL_URL=<same host 3000>

Step 21 now install
npm i nanoid --legacy-peer-deps

Step 22 now install
npm i react-error-boundary --legacy-peer-deps

Step 23

Step 21

Step 6
This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

# meetai
