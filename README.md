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

Step 23 then install
npm install @tanstack/react-table --legacy-peer-deps

Step 21 now install
npm i nuqs@2.4.3 --legacy-peer-deps

Step 22 now install
npm i date-fns --legacy-peer-deps
npm i humanize-duration --legacy-peer-deps
npm i -D @types/humanize-duration --lefacy-peer-deps

Step 23 create new env
NEXT_PUBLIC_STREAM_VIDEO_API_KEY (then copy api key from getstream.io)
STREAM_VIDEO_SECRET_KEY (also here)

Step 24 then follow this document
https://getstream.io/video/docs/api/
npm install @stream-io/node-sdk
// or using yarn
yarn add @stream-io/node-sdk

Step 25 now install
npm install @stream-io/video-react-sdk --legacy-peer-deps

Step 26 now attach
OPENAI_API_KEY

Step 27 now install
npm i @stream-io/openai-realtime-api --legacy-peer-deps

Step 28 whenever you run, run 2 command
npm run dev
npm run dev:webhook

Step 29 now install
npm install inngest --legacy-peer-deps
npx inngest-cli@latest dev
npm i jsonl-parse-stringify --legacy-peer-deps

Step 30 now go port 8288 => inggest

Step 31 npw install
npm i @inngest/agent-kit --legacy-peer-deps

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
