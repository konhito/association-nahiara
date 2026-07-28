import { NextResponse } from "next/server";
import { hasAtlasStorage, writeAtlasSnapshot } from "../../../../lib/atlasStorage";

const csvRows = (csv) => {
  const [header, ...rows] = csv.trim().split(/\r?\n/).map((row) => row.split(","));
  return rows.map((row) => Object.fromEntries(header.map((key, index) => [key, row[index]])));
};

const emptyFeatureCollection = { type: "FeatureCollection", features: [] };

async function loadHistoricalBurnedArea() {
  if (!process.env.ATLAS_HISTORICAL_BURNED_AREA_URL) return emptyFeatureCollection;
  const response = await fetch(process.env.ATLAS_HISTORICAL_BURNED_AREA_URL, { cache: "no-store" });
  if (!response.ok) throw new Error(`Historical burned-area source returned ${response.status}`);
  const data = await response.json();
  if (data?.type !== "FeatureCollection" || !Array.isArray(data.features)) throw new Error("Historical burned-area source must be GeoJSON FeatureCollection");
  return data;
}

async function loadScenario(url, label) {
  if (!url) return null;
  const response = await fetch(url, { cache: "no-store" });
  if (!response.ok) throw new Error(`${label} source returned ${response.status}`);
  const scenario = await response.json();
  if (scenario?.data?.type !== "FeatureCollection" || !Array.isArray(scenario.data.features) || !scenario.model || !scenario.pathway || !scenario.period) {
    throw new Error(`${label} must provide model, pathway, period and GeoJSON data`);
  }
  return scenario;
}

export async function GET(request) {
  if (!process.env.CRON_SECRET || request.headers.get("authorization") !== `Bearer ${process.env.CRON_SECRET}`) return new NextResponse("Unauthorized", { status: 401 });
  if (!process.env.FIRMS_MAP_KEY || !hasAtlasStorage()) return NextResponse.json({ error: "FIRMS_MAP_KEY and AWS storage credentials are required" }, { status: 503 });

  try {
    const response = await fetch(`https://firms.modaps.eosdis.nasa.gov/api/area/csv/${process.env.FIRMS_MAP_KEY}/VIIRS_SNPP_NRT/world/1`, { cache: "no-store" });
    if (!response.ok) throw new Error(`FIRMS returned ${response.status}`);
    const currentDetections = csvRows(await response.text()).flatMap((row) => {
      const longitude = Number(row.longitude);
      const latitude = Number(row.latitude);
      const time = String(row.acq_time || "0000").padStart(4, "0");
      return Number.isFinite(longitude) && Number.isFinite(latitude) ? [{ longitude, latitude, detectedAt: `${row.acq_date || ""}T${time.slice(0, 2)}:${time.slice(2)}:00Z`, confidence: row.confidence || null }] : [];
    });
    const historicalBurnedArea = await loadHistoricalBurnedArea();
    const dates = historicalBurnedArea.features.map((feature) => feature.properties?.date).filter(Boolean).sort();
    const [fireWeatherRisk, burnedArea] = await Promise.all([
      loadScenario(process.env.ATLAS_FIRE_WEATHER_RISK_URL, "Fire-weather risk scenario"),
      loadScenario(process.env.ATLAS_PROJECTED_BURNED_AREA_URL, "Projected burned-area scenario"),
    ]);
    const snapshot = { updatedAt: new Date().toISOString(), status: "Live NASA FIRMS snapshot", timeline: { min: dates[0] || null, max: dates.at(-1) || null }, currentDetections, historicalBurnedArea, scenarios: { fireWeatherRisk, burnedArea } };
    await writeAtlasSnapshot(snapshot);
    return NextResponse.json({ updatedAt: snapshot.updatedAt, detections: currentDetections.length });
  } catch (error) {
    console.error("Fire snapshot refresh failed", error);
    return NextResponse.json({ error: "Fire snapshot refresh failed" }, { status: 502 });
  }
}
