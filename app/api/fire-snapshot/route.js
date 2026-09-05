import { NextResponse } from "next/server";
import { FALLBACK_FIRE_SNAPSHOT } from "../../../lib/fireSnapshot";

export const revalidate = 300;
const FIRMS_24H_URL = "https://firms.modaps.eosdis.nasa.gov/data/active_fire/suomi-npp-viirs-c2/csv/SUOMI_VIIRS_C2_Global_24h.csv";
const MAX_DETECTIONS = 2000;

function sampleDetections(detections) {
  const step = Math.ceil(detections.length / MAX_DETECTIONS);
  return step > 1 ? detections.filter((_, index) => index % step === 0).slice(0, MAX_DETECTIONS) : detections;
}

async function readFirmsWildfires() {
  const response = await fetch(FIRMS_24H_URL, { cache: "no-store" });
  if (!response.ok) throw new Error(`NASA FIRMS returned ${response.status}`);
  const [header, ...rows] = (await response.text()).trim().split(/\r?\n/).map((line) => line.split(","));
  const column = (name) => header.indexOf(name);
  const latitude = column("latitude");
  const longitude = column("longitude");
  const date = column("acq_date");
  const time = column("acq_time");
  const confidence = column("confidence");
  const frp = column("frp");
  const detections = rows.flatMap((row) => {
    const lat = Number(row[latitude]);
    const lng = Number(row[longitude]);
    if (!Number.isFinite(lat) || !Number.isFinite(lng)) return [];
    const observedAt = date >= 0 && time >= 0 ? `${row[date]} ${row[time]?.padStart(4, "0")} UTC` : null;
    return [{ longitude: lng, latitude: lat, detectedAt: observedAt, confidence: row[confidence] || null, frp: Number(row[frp]) || null, title: "NASA FIRMS active fire", eventId: `firms-${row[date]}-${row[time]}-${lat}-${lng}`, sourceUrl: "https://firms.modaps.eosdis.nasa.gov/", dataSource: "NASA FIRMS VIIRS" }];
  });
  return { ...FALLBACK_FIRE_SNAPSHOT, updatedAt: new Date().toISOString(), status: "Live NASA FIRMS 24-hour active-fire sample", currentDetections: sampleDetections(detections), totalDetections: detections.length };
}

async function readEonetWildfires() {
  const response = await fetch("https://eonet.gsfc.nasa.gov/api/v3/events?category=wildfires&status=open&limit=100", { next: { revalidate } });
  if (!response.ok) throw new Error(`NASA EONET returned ${response.status}`);
  const { events = [] } = await response.json();
  const currentDetections = events.flatMap((event) => {
    const geometry = [...(event.geometry || [])].reverse().find((item) => item.type === "Point" && Array.isArray(item.coordinates));
    const [longitude, latitude] = geometry?.coordinates || [];
    return Number.isFinite(longitude) && Number.isFinite(latitude) ? [{ longitude, latitude, detectedAt: geometry.date || null, title: event.title, eventId: event.id, sourceUrl: event.sources?.[0]?.url || event.link, dataSource: "NASA EONET" }] : [];
  });
  return { ...FALLBACK_FIRE_SNAPSHOT, updatedAt: new Date().toISOString(), status: "Live NASA EONET open wildfire events", currentDetections };
}

export async function GET() {
  try {
    return NextResponse.json(await readFirmsWildfires(), { headers: { "Cache-Control": "public, s-maxage=300, stale-while-revalidate=86400" } });
  } catch (error) {
    console.error("Atlas FIRMS fallback failed", error);
    try {
      return NextResponse.json(await readEonetWildfires(), { headers: { "Cache-Control": "public, s-maxage=300, stale-while-revalidate=86400" } });
    } catch (fallbackError) {
      console.error("Atlas EONET fallback failed", fallbackError);
      return NextResponse.json(FALLBACK_FIRE_SNAPSHOT);
    }
  }
}
