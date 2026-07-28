export const FALLBACK_FIRE_SNAPSHOT = {
  updatedAt: null,
  status: "No live snapshot has been published yet",
  timeline: { min: null, max: null },
  currentDetections: [],
  historicalBurnedArea: { type: "FeatureCollection", features: [] },
  scenarios: { fireWeatherRisk: null, burnedArea: null },
};
