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

## Pollinator atlas fire refresh

The map is available at `/corredor-de-los-polinizadores`. Its Vercel Cron job stores the latest approved fire snapshot in S3. Configure these production-only variables before enabling the live layer:

```
CRON_SECRET=
FIRMS_MAP_KEY=
AWS_ACCESS_KEY_ID=
AWS_SECRET_ACCESS_KEY=
AWS_REGION=ap-south-1
ATLAS_S3_BUCKET=aquamundi-glb-models
ATLAS_HISTORICAL_BURNED_AREA_URL=https://your-reviewed-data-host/burned-area.geojson
ATLAS_FIRE_WEATHER_RISK_URL=https://your-reviewed-data-host/fire-weather-risk.json
ATLAS_PROJECTED_BURNED_AREA_URL=https://your-reviewed-data-host/projected-burned-area.json
```

`ATLAS_HISTORICAL_BURNED_AREA_URL` is an approved GeoJSON `FeatureCollection`; each feature must have a `properties.date` value in `YYYY-MM-DD` form. Without the production variables, the map uses NASA EONET's public open-wildfire events as a clearly labelled real-event fallback; FIRMS remains the higher-detail active-fire feed.

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
