const collection = (features) => ({ type: "FeatureCollection", features });
const area = (date, coordinates) => ({ type: "Feature", properties: { date }, geometry: { type: "Polygon", coordinates: [coordinates] } });

// Demo-only geometry for the frontend empty state. It is never stored as observed data.
export const MOCK_FIRE_SNAPSHOT = {
  isDemo: true,
  updatedAt: "2026-07-27T09:00:00.000Z",
  status: "Demo fire data — not observed",
  timeline: { min: "2026-04-01", max: "2026-07-27" },
  currentDetections: [
    { longitude: -121.7, latitude: 38.4, detectedAt: "2026-07-27T08:30:00Z", confidence: "demo" },
    { longitude: -52.4, latitude: -10.1, detectedAt: "2026-07-27T07:10:00Z", confidence: "demo" },
    { longitude: 23.8, latitude: -1.6, detectedAt: "2026-07-27T06:45:00Z", confidence: "demo" },
    { longitude: 117.2, latitude: -2.7, detectedAt: "2026-07-27T08:05:00Z", confidence: "demo" },
    { longitude: 146.8, latitude: -34.2, detectedAt: "2026-07-27T05:50:00Z", confidence: "demo" },
  ],
  historicalBurnedArea: collection([
    area("2026-04-01", [[-123, 39], [-120, 39], [-120, 41], [-123, 41], [-123, 39]]),
    area("2026-05-15", [[-55, -12], [-51, -12], [-51, -8], [-55, -8], [-55, -12]]),
    area("2026-06-20", [[21, -4], [26, -4], [26, 1], [21, 1], [21, -4]]),
    area("2026-07-27", [[114, -5], [120, -5], [120, 0], [114, 0], [114, -5]]),
  ]),
  scenarios: {
    fireWeatherRisk: { model: "Demonstration layer", pathway: "Illustrative only", period: "2030", data: collection([area("2030", [[-14, 32], [21, 32], [21, 46], [-14, 46], [-14, 32]]), area("2030", [[133, -38], [151, -38], [151, -23], [133, -23], [133, -38]])]) },
    burnedArea: { model: "Demonstration layer", pathway: "Illustrative only", period: "2030", data: collection([area("2030", [[-107, 30], [-96, 30], [-96, 40], [-107, 40], [-107, 30]]), area("2030", [[16, -16], [31, -16], [31, -4], [16, -4], [16, -16]])]) },
  },
};
