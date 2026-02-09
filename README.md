# Webalize

Marketing website and CMS for Webalize, built with [Payload 3](https://payloadcms.com/) and Next.js 15.

## Stack

- **CMS**: Payload 3.x
- **Framework**: Next.js 15 (App Router)
- **Database**: PostgreSQL via `@payloadcms/db-postgres`
- **i18n**: English and German (`/en`, `/de`) using Payload's built-in localization

## Collections

- **News** — Blog posts with localized title, description, and rich text content
- **FAQ** — Frequently asked questions grouped by category
- **Integrations** — Partner integrations (Truck OEMs, Telematics, TMS)
- **Contact Submissions** — Demo booking form submissions
- **Media** — Image uploads
- **Users** — Admin authentication

## Local Setup

1. Clone the repo and install dependencies:

```bash
pnpm install
```

2. Copy `.env.example` to `.env` and fill in:

```
DATABASE_URL=postgresql://user:pass@localhost:5432/webalize
PAYLOAD_SECRET=your-secret-here
```

3. Start the dev server:

```bash
pnpm dev
```

4. Open [http://localhost:3000](http://localhost:3000) — you'll be redirected to `/en`
5. Go to [http://localhost:3000/admin](http://localhost:3000/admin) to create your first admin user

## Scripts

| Command               | Description                    |
| --------------------- | ------------------------------ |
| `pnpm dev`            | Start development server       |
| `pnpm build`          | Production build               |
| `pnpm test:int`       | Run integration tests (Vitest) |
| `pnpm test:e2e`       | Run E2E tests (Playwright)     |
| `pnpm generate:types` | Regenerate `payload-types.ts`  |
| `pnpm lint`           | Lint with ESLint               |
| `pnpm format`         | Format with Prettier           |
