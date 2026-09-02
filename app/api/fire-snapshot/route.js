import { NextResponse } from "next/server";
import { FALLBACK_FIRE_SNAPSHOT } from "../../../lib/fireSnapshot";
import { hasAtlasStorage, readAtlasSnapshot } from "../../../lib/atlasStorage";

export const revalidate = 300;

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
  if (!hasAtlasStorage()) {
    try {
      return NextResponse.json(await readEonetWildfires(), { headers: { "Cache-Control": "public, s-maxage=300, stale-while-revalidate=86400" } });
    } catch (error) {
      console.error("Atlas EONET fallback failed", error);
      return NextResponse.json(FALLBACK_FIRE_SNAPSHOT);
    }
  }

  try {
    return NextResponse.json(await readAtlasSnapshot(), { headers: { "Cache-Control": "public, s-maxage=300, stale-while-revalidate=86400" } });
  } catch (error) {
    console.error("Atlas snapshot read failed", error);
    try {
      return NextResponse.json(await readEonetWildfires(), { headers: { "Cache-Control": "public, s-maxage=300, stale-while-revalidate=86400" } });
    } catch (fallbackError) {
      console.error("Atlas EONET fallback failed", fallbackError);
      return NextResponse.json(FALLBACK_FIRE_SNAPSHOT);
    }
  }
}
