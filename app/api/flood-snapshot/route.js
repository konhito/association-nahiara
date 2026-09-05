import { NextResponse } from "next/server";

export const revalidate = 900;

export async function GET() {
  try {
    const response = await fetch("https://eonet.gsfc.nasa.gov/api/v3/events?category=severeStorms&status=open&limit=100", { next: { revalidate } });
    if (!response.ok) throw new Error(`NASA EONET returned ${response.status}`);
    const { events = [] } = await response.json();
    const eventsWithPoints = events.flatMap((event) => {
      const geometry = [...(event.geometry || [])].reverse().find((item) => item.type === "Point" && Array.isArray(item.coordinates));
      const [longitude, latitude] = geometry?.coordinates || [];
      return Number.isFinite(longitude) && Number.isFinite(latitude)
        ? [{ longitude, latitude, title: event.title, observedAt: geometry.date || null, eventId: event.id, sourceUrl: event.sources?.[0]?.url || event.link }]
        : [];
    });
    return NextResponse.json({ updatedAt: new Date().toISOString(), status: "Live NASA EONET severe storm events", events: eventsWithPoints });
  } catch (error) {
    console.error("Atlas flood events failed", error);
    return NextResponse.json({ updatedAt: null, status: "Storm event data unavailable", events: [] });
  }
}
