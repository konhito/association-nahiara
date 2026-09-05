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

The map is available at `/pollinator-corridor` and `/corredor-de-los-polinizadores`. Its fire layer fetches NASA FIRMS' public global 24-hour Suomi-NPP VIIRS CSV directly. All valid detections load in version-checked pages of 5,000 and render as clustered map features; there is no sampling limit. The server reuses a download for five minutes per running instance, and the client refreshes every five minutes after completing its previous request. No Atlas-specific S3 bucket, scheduled refresh, or FIRMS API key is required. This is a single satellite feed, not the combined satellite layers available on NASA's map.

If FIRMS is temporarily unavailable, the map falls back to up to 100 NASA EONET open-wildfire events and labels that source clearly. These are not satellite detection counts. Failed refreshes retain the last complete download with an error message; no demo fires are substituted. Observation and download timestamps are shown separately. Nearby detection counts use a 50 km geodesic distance to the displayed route or selected point and follow the map's time filter; they are not ecological health scores or burned-area estimates.

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
