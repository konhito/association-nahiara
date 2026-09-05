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

## Pollinator atlas database

Create the empty database on EC2, set `DATABASE_URL` for it, then run this once after deploy:

```bash
psql "$DATABASE_URL" -v ON_ERROR_STOP=1 -f scripts/setup-atlas-db.sql
```

The script is safe to rerun. It creates the atlas tables and seeds the 15 cited sources and 10 current preliminary route records. It does not invent or seed fire observations; those are inserted only from approved datasets.

## Pollinator atlas live fire feed

The map is available at `/pollinator-corridor`. Its fire layer fetches NASA FIRMS' public global 24-hour VIIRS CSV directly, samples the response to at most 2,000 displayed detections, and caches the API response for five minutes. No Atlas-specific S3 bucket, scheduled refresh, or FIRMS API key is required.

If FIRMS is temporarily unavailable, the map falls back to NASA EONET's open-wildfire events and labels that source clearly.

Cloud, rainfall, and aerosol overlays use public NASA Earthdata GIBS tiles directly in the map. Aerosols are shown as a smoke indicator, not a verified smoke-plume boundary.

Each future-dataset URL must return `{ "model", "pathway", "period", "data" }`, where `data` is a GeoJSON `FeatureCollection`. The map rejects incomplete scenarios rather than presenting them as observed fire data.

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
