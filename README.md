# Webalize

Next.js + Payload CMS app.

## Run locally

1. Install packages

```bash
pnpm install
```

2. Configure env

Copy `.env.example` to `.env` and set at least:

```bash
DATABASE_URL=your-data-base-url
PAYLOAD_SECRET=your-secret-here
```

3. Start

```bash
pnpm dev
```

4. Test

```bash
pnpm test:e2e:install OR just npx playwright install chromium without it your tests won't run
pnpm test:e2e
```

Frontend: http://localhost:3000 (redirects to `/en`)
Admin: http://localhost:3000/admin

## Useful commands

```bash
pnpm dev
pnpm build
pnpm test:int
pnpm test:e2e
pnpm generate:types
pnpm lint
pnpm format
```
