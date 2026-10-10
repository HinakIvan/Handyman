# Handyman — Railway deployment patch

This patch changes the project from static export to a Next.js server plus its Express RPC backend in one Railway service.

## Files to replace / add

Copy these files into the matching paths in your existing project, replacing files with the same names:

- `package.json` (replace)
- `next.config.mjs` (replace)
- `src/tools/rpc-client.ts` (replace)
- `prisma/schema.prisma` (replace)
- `server/dev-host.ts` (replace)
- `.gitignore` (replace)
- `scripts/start-production.mjs` (new file)
- `railway.json` (new file)

Do not replace the rest of the project with this patch ZIP: it intentionally contains only deployment-related files.

## Railway variables

In the app service, set:

- `DATABASE_URL` = `${{MySQL.MYSQL_URL}}` (use the actual Railway MySQL service name in the reference if it differs)
- Leave `NEXT_PUBLIC_API_BASE_URL` empty unless you deliberately host the API on another public origin.
- Do not set `PORT` manually; Railway supplies it.
- `RPC_PORT` can be omitted; the app uses `3100` internally.

Do not set `NEXT_PUBLIC_RUNTIME_API` to `https://www.autocoder.cc/rpc`.

## Deploy

1. Apply these files to your working project.
2. Check `git diff` before committing.
3. Commit and push to the GitHub branch connected to Railway.
4. Railway should use Nixpacks, run `pnpm run build`, and start with `pnpm start`.
5. Confirm the build succeeds before testing the site and admin login.

The build command generates the Prisma Client for Railway's Linux environment, rebuilds the RPC action bundle, then builds Next.js. The start command runs Next.js and the Express RPC server together.

## Important database note

`DATABASE_URL` must point to the Railway MySQL database whose schema/data you intend to use. This patch deliberately does not run `prisma db push --force-reset`, `backend_deal.mjs`, or database seeding automatically, because those operations can destroy existing data. If the Railway database is empty, apply the project's schema and seed data separately after confirming the target database.

## Validation note

JavaScript/config syntax was checked in the patch environment. A full `pnpm install` and production build could not be executed here because the package registry was unreachable. The first Railway deployment must be used to verify the actual dependency installation and build; inspect logs if it fails.
