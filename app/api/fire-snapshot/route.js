import { NextResponse } from 'next/server';
import { createHash } from 'node:crypto';
import { parseFirms, pageFeed } from '../../../lib/fireFeed';

export const dynamic = 'force-dynamic';
export const maxDuration = 60;
const FIRMS_URL = 'https://firms.modaps.eosdis.nasa.gov/data/active_fire/suomi-npp-viirs-c2/csv/SUOMI_VIIRS_C2_Global_24h.csv';
let cached;
let pending;

async function fetchFeed() {
  try {
    const response = await fetch(FIRMS_URL, { cache: 'no-store', signal: AbortSignal.timeout(45000) });
    if (!response.ok) throw new Error('FIRMS: ' + response.status);
    const csv = await response.text();
    const currentDetections = parseFirms(csv);
    const times = currentDetections.map(p => p.detectedAt).sort();
    return { currentDetections, source: 'FIRMS', status: 'NASA FIRMS Suomi-NPP VIIRS', version: createHash('sha256').update(csv).digest('hex'), updatedAt: new Date().toISOString(), observedFrom: times[0] || null, observedTo: times.at(-1) || null, sourceModifiedAt: response.headers.get('last-modified') };
  } catch (error) {
    console.error('Atlas FIRMS unavailable', error);
    const response = await fetch('https://eonet.gsfc.nasa.gov/api/v3/events?category=wildfires&status=open&limit=100', { cache: 'no-store', signal: AbortSignal.timeout(10000) });
    if (!response.ok) throw new Error('EONET: ' + response.status);
    const { events } = await response.json();
    const currentDetections = events.flatMap(event => {
      const geometry = [...(event.geometry || [])].reverse().find(g => g.type === 'Point');
      if (!geometry) return [];
      const [longitude, latitude] = geometry.coordinates;
      return [{ longitude, latitude, detectedAt: geometry.date, title: event.title, dataSource: 'NASA EONET' }];
    });
    return { currentDetections, source: 'EONET', status: 'NASA EONET fallback: up to 100 open events', version: createHash('sha256').update(JSON.stringify(currentDetections)).digest('hex'), updatedAt: new Date().toISOString(), observedFrom: null, observedTo: null };
  }
}

async function getFeed() {
  if (cached && Date.now() - Date.parse(cached.updatedAt) < 300000) return cached;
  if (!pending) pending = fetchFeed().then(feed => (cached = feed)).finally(() => { pending = null; });
  return pending;
}

export async function GET(request) {
  const params = new URL(request.url).searchParams;
  const page = Number(params.get('page') || 0);
  if (!Number.isInteger(page) || page < 0) return NextResponse.json({ error: 'Invalid page' }, { status: 400 });
  try {
    const feed = await getFeed();
    if (params.has('version') && params.get('version') !== feed.version) return NextResponse.json({ error: 'Feed changed; reload from page zero' }, { status: 409 });
    const result = pageFeed(feed, page);
    if (page >= result.pageCount) return NextResponse.json({ error: 'Page outside feed' }, { status: 400 });
    return NextResponse.json(result, { headers: { 'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=60' } });
  } catch (error) {
    console.error('Atlas feeds unavailable', error);
    return NextResponse.json({ error: 'Fire data temporarily unavailable' }, { status: 503, headers: { 'Cache-Control': 'no-store' } });
  }
}
