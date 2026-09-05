"use client";

import "maplibre-gl/dist/maplibre-gl.css";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { Map as MapLibre, Marker, NavigationControl } from "maplibre-gl";
import { CloudLightning, Flame, Layers3, MapPinned, Pause, Play, Radio, Route, X } from "lucide-react";
import { POLLINATOR_ROUTES, getAtlasSource, getCorridorTimeline } from "../lib/pollinatorAtlas";
import { MOCK_FIRE_SNAPSHOT } from "./mockFireSnapshot";
import styles from "./PollinatorAtlas.module.css";

const copy = {
  en: { title: "Pollinator Corridor Atlas", intro: "Follow the living routes across a changing planet.", layers: "Live data", routes: "Explore routes", routeList: "Choose a pollinator route", close: "Close", source: "Read the route source", details: "Pollinator corridor", fire: "Wildfire events", storm: "Severe storm events", fieldLens: "Fire field lens", thermalAnomaly: "Satellite thermal anomaly", observed: "Observed", confidence: "Confidence", radiativePower: "Fire radiative power", lastHours: "Last observed hours", journey: "Route journey", play: "Play journey", pause: "Pause journey", updated: "Updated", demo: "Demo fire data - not observed", noData: "Loading NASA FIRMS fire data…", imagery: "Open NASA imagery", atmosphere: "NASA Blue Marble surface · NASA FIRMS 24h detections", timeline: "Corridor risk timeline", projectedWindow: "Potential critical window", timelineNote: "Scenario estimate, not an extinction date", timelineBasis: "Based on fragmentation, climate and disturbance pressure; route-specific projections need reviewed GIS models." },
  es: { title: "Atlas de corredores de polinizadores", intro: "Sigue las rutas vivas a traves de un planeta cambiante.", layers: "Datos en directo", routes: "Explorar rutas", routeList: "Elige una ruta de polinizadores", close: "Cerrar", source: "Leer la fuente de la ruta", details: "Corredor de polinizadores", fire: "Incendios forestales", storm: "Tormentas severas", fieldLens: "Lente de campo del incendio", thermalAnomaly: "Anomalía térmica satelital", observed: "Observado", confidence: "Confianza", radiativePower: "Potencia radiativa del fuego", lastHours: "Últimas horas observadas", journey: "Viaje de la ruta", play: "Reproducir viaje", pause: "Pausar viaje", updated: "Actualizado", demo: "Datos de incendios de demostracion", noData: "Los datos de incendios no estan disponibles.", imagery: "Abrir imágenes de la NASA", atmosphere: "Superficie NASA Blue Marble · detecciones NASA FIRMS de 24 h", timeline: "Cronología de riesgo del corredor", projectedWindow: "Ventana crítica potencial", timelineNote: "Estimación de escenario, no una fecha de extinción", timelineBasis: "Basada en fragmentación, clima y perturbaciones; se necesitan modelos GIS revisados para proyecciones específicas." },
};

const emptySnapshot = { currentDetections: [] };
const fetchSnapshot = (url) => fetch(url, { cache: "no-store" }).then((response) => response.json());
const loadLiveSnapshot = (url) => fetchSnapshot(url).then((value) => value?.updatedAt ? value : fetchSnapshot(url)).catch(() => fetchSnapshot(url).catch(() => null));
const layers = [
  { id: "fire", Icon: Flame, label: (t) => t.fire },
  { id: "flood", Icon: CloudLightning, label: (t) => t.storm },
];
const globeStyle = { version: 8, sources: { "blue-marble": { type: "raster", tiles: ["https://gibs.earthdata.nasa.gov/wmts/epsg3857/best/BlueMarble_ShadedRelief_Bathymetry/default/2018-01-01/GoogleMapsCompatible_Level8/{z}/{y}/{x}.jpeg"], tileSize: 256, maxzoom: 8 } }, layers: [{ id: "space", type: "background", paint: { "background-color": "#020806" } }, { id: "blue-marble", type: "raster", source: "blue-marble", paint: { "raster-saturation": -0.1, "raster-contrast": 0.08 } }] };
const storyStages = { en: ["Pollination", "Refuel", "Crossing", "Arrival"], es: ["Polinización", "Recarga", "Travesía", "Llegada"] };
const storyImage = (route) => `/pollinators/stories/${route.id}.png`;
const journeyImage = (route) => `/pollinators/journeys/${route.id}.png`;
const fireTimestamp = (value) => Date.parse(String(value || "").replace(/^(\d{4}-\d{2}-\d{2}) (\d{2})(\d{2}) UTC$/, "$1T$2:$3:00Z"));
const fireLocation = (point) => `${Math.abs(Number(point.latitude)).toFixed(3)}°${Number(point.latitude) >= 0 ? "N" : "S"}, ${Math.abs(Number(point.longitude)).toFixed(3)}°${Number(point.longitude) >= 0 ? "E" : "W"}`;
const fireImageryUrl = (point) => `https://worldview.earthdata.nasa.gov/?v=${Number(point.longitude) - 0.3},${Number(point.latitude) - 0.2},${Number(point.longitude) + 0.3},${Number(point.latitude) + 0.2}`;
const distanceDegrees = (a, b) => Math.hypot(Number(a[0]) - Number(b[0]), Number(a[1]) - Number(b[1]));
const nearestDistance = (point, coordinates) => Math.min(...coordinates.map((coordinate) => distanceDegrees(point, coordinate)));
const pointAlongRoute = (coordinates, progress) => {
  const segments = coordinates.slice(1).map((point, index) => ({ start: coordinates[index], end: point, length: Math.hypot(point[0] - coordinates[index][0], point[1] - coordinates[index][1]) }));
  const total = segments.reduce((sum, segment) => sum + segment.length, 0);
  let distance = total * progress;
  const segment = segments.find((item) => { distance -= item.length; return distance <= 0; }) || segments.at(-1);
  const ratio = Math.max(0, 1 + distance / segment.length);
  return [segment.start[0] + (segment.end[0] - segment.start[0]) * ratio, segment.start[1] + (segment.end[1] - segment.start[1]) * ratio];
};
const revealedRoute = (coordinates, progress) => {
  if (progress <= 0 || coordinates.length < 2) return [];
  const lastIndex = Math.min(coordinates.length - 1, Math.max(1, Math.ceil(progress * (coordinates.length - 1))));
  return coordinates.slice(0, lastIndex + 1);
};
const focusRoute = (instance, route, onComplete) => {
  const coordinates = route?.geometry?.geometry?.coordinates || [];
  if (!coordinates.length) return;
  const longitudes = coordinates.map(([longitude]) => longitude);
  const latitudes = coordinates.map(([, latitude]) => latitude);
  const west = Math.min(...longitudes);
  const east = Math.max(...longitudes);
  const south = Math.min(...latitudes);
  const north = Math.max(...latitudes);
  const mapWidth = instance.getContainer().clientWidth;
  const compact = mapWidth < 900;
  const sidePadding = compact ? 36 : Math.min(390, Math.round(mapWidth * 0.3));
  if (onComplete) instance.once("moveend", onComplete);
  instance.fitBounds([[west, south], [east, north]], { padding: { top: 130, right: sidePadding, bottom: compact ? 210 : 250, left: sidePadding }, maxZoom: 4.2, duration: 1250, essential: false });
};

export default function PollinatorAtlas({ locale = "en" }) {
  const language = locale === "es" ? "es" : "en";
  const t = copy[language];
  const mapNode = useRef(null);
  const map = useRef(null);
  const fireMarkers = useRef(new Map());
  const stormMarkers = useRef(new Map());
  const [ready, setReady] = useState(false);
  const [selectedRoute, setSelectedRoute] = useState("eastern-monarch");
  const [enabledRoutes, setEnabledRoutes] = useState(() => new Set(POLLINATOR_ROUTES.map((route) => route.id)));
  const [snapshot, setSnapshot] = useState(emptySnapshot);
  const [floodSnapshot, setFloodSnapshot] = useState({ events: [] });
  const [showRoutes, setShowRoutes] = useState(false);
  const [showLayers, setShowLayers] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [hoveredRoute, setHoveredRoute] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeLayers, setActiveLayers] = useState({ fire: true, flood: true });
  const [journeyProgress, setJourneyProgress] = useState(0);
  const [journeyPlaying, setJourneyPlaying] = useState(false);
  const [selectedFire, setSelectedFire] = useState(null);
  const [insightPoint, setInsightPoint] = useState(null);
  const [fireHours, setFireHours] = useState(24);

  useEffect(() => {
    let cancelled = false;
    const refresh = () => loadLiveSnapshot("/api/fire-snapshot").then((value) => { if (!cancelled) setSnapshot(value?.updatedAt ? value : MOCK_FIRE_SNAPSHOT); });
    refresh();
    const interval = window.setInterval(refresh, 300000);
    return () => { cancelled = true; window.clearInterval(interval); };
  }, []);

  useEffect(() => {
    let cancelled = false;
    const refresh = () => loadLiveSnapshot("/api/flood-snapshot").then((value) => { if (!cancelled) setFloodSnapshot(value?.events ? value : { events: [] }); });
    refresh();
    const interval = window.setInterval(refresh, 300000);
    return () => { cancelled = true; window.clearInterval(interval); };
  }, []);

  useEffect(() => {
    const timeout = window.setTimeout(() => setLoading(false), 20000);
    return () => window.clearTimeout(timeout);
  }, []);

  useEffect(() => {
    let cancelled = false;
    const startedAt = Date.now();
    Promise.allSettled([loadLiveSnapshot("/api/fire-snapshot"), loadLiveSnapshot("/api/flood-snapshot")]).then(() => {
      const remaining = Math.max(0, 3000 - (Date.now() - startedAt));
      window.setTimeout(() => { if (!cancelled) setLoading(false); }, remaining);
    });
    return () => { cancelled = true; };
  }, []);

  useEffect(() => {
    if (map.current || !mapNode.current) return;
    const instance = new MapLibre({ container: mapNode.current, style: globeStyle, center: [-96, 37], zoom: 1.45, projection: "globe", renderWorldCopies: false, attributionControl: false });
    const markers = fireMarkers.current;
    const storms = stormMarkers.current;
    instance.addControl(new NavigationControl({ showCompass: false }), "bottom-right");
    instance.on("load", () => {
      POLLINATOR_ROUTES.forEach((route) => {
        instance.addSource(route.id, { type: "geojson", data: route.geometry });
        instance.addLayer({ id: `${route.id}-hit`, type: "line", source: route.id, paint: { "line-color": "#ffffff", "line-width": 18, "line-opacity": 0.01 } });
        instance.addLayer({ id: route.id, type: "line", source: route.id, paint: { "line-color": route.color, "line-width": 2.4, "line-opacity": 0.58, "line-blur": route.dashed ? 0.35 : 0.1, "line-dasharray": route.dashed ? [2, 2] : [1, 0] } });
        instance.on("mouseenter", `${route.id}-hit`, (event) => { instance.getCanvas().style.cursor = "pointer"; setHoveredRoute({ id: route.id, x: event.point.x, y: event.point.y }); });
        instance.on("mousemove", `${route.id}-hit`, (event) => setHoveredRoute({ id: route.id, x: event.point.x, y: event.point.y }));
        instance.on("mouseleave", `${route.id}-hit`, () => { instance.getCanvas().style.cursor = ""; setHoveredRoute(null); });
        instance.on("click", `${route.id}-hit`, () => { setSelectedRoute(route.id); setJourneyProgress(0); setJourneyPlaying(false); setHoveredRoute(null); setInsightPoint(null); setShowDetails(true); setShowRoutes(false); focusRoute(instance, route, () => setJourneyPlaying(true)); });
      });
      instance.addSource("route-pulse", { type: "geojson", data: { type: "FeatureCollection", features: [] } });
      instance.addSource("route-progress", { type: "geojson", data: { type: "FeatureCollection", features: [] } });
      instance.addLayer({ id: "route-progress-glow", type: "line", source: "route-progress", paint: { "line-color": "#f5f1e8", "line-width": 9, "line-opacity": 0.22, "line-blur": 0.75 } });
      instance.addLayer({ id: "route-progress", type: "line", source: "route-progress", paint: { "line-color": "#d6b56d", "line-width": 3.8, "line-opacity": 1 } });
      instance.addLayer({ id: "route-pulse-halo", type: "circle", source: "route-pulse", paint: { "circle-color": "#d6b56d", "circle-radius": 11, "circle-opacity": 0.22, "circle-blur": 0.6 } });
      instance.addLayer({ id: "route-pulse", type: "circle", source: "route-pulse", paint: { "circle-color": "#f5f1e8", "circle-radius": 4.5, "circle-stroke-color": "#d6b56d", "circle-stroke-width": 2 } });
      instance.addSource("current-fire", { type: "geojson", data: { type: "FeatureCollection", features: [] }, cluster: true, clusterMaxZoom: 4, clusterRadius: 52 });
      instance.addSource("current-flood", { type: "geojson", data: { type: "FeatureCollection", features: [] } });
      instance.addLayer({ id: "current-flood-events-dot", type: "circle", source: "current-flood", paint: { "circle-color": "#55c7e8", "circle-radius": ["interpolate", ["linear"], ["zoom"], 0, 2.5, 4, 4, 8, 6], "circle-opacity": 0.9, "circle-stroke-color": "#d9f7ff", "circle-stroke-width": 1.2, "circle-blur": 0.08 } });
      instance.on("click", (event) => {
        const routeHit = instance.queryRenderedFeatures(event.point, { layers: POLLINATOR_ROUTES.map((route) => `${route.id}-hit`) });
        if (!routeHit.length) setInsightPoint({ longitude: event.lngLat.lng, latitude: event.lngLat.lat });
      });
      map.current = instance;
      setReady(true);
      instance.flyTo({ center: [-96, 37], zoom: 2.1, duration: 2600, essential: false });
      instance.loadImage("/pollinators/icon-wildfires.svg").then(({ data }) => {
        if (!instance.hasImage("wildfire-icon")) instance.addImage("wildfire-icon", data, { pixelRatio: 2 });
        instance.addLayer({ id: "current-fire-clusters", type: "symbol", source: "current-fire", filter: ["has", "point_count"], layout: { "icon-image": "wildfire-icon", "icon-size": ["interpolate", ["linear"], ["zoom"], 0, 0.7, 4, 1.05, 8, 1.25], "icon-allow-overlap": true, "text-field": ["get", "point_count_abbreviated"], "text-size": 9, "text-offset": [0, 1.65], "text-allow-overlap": true }, paint: { "icon-opacity": 0.96, "text-color": "#fff7e8", "text-halo-color": "#6b241e", "text-halo-width": 1.5 } });
        instance.addLayer({ id: "current-fire-embers", type: "symbol", source: "current-fire", filter: ["!", ["has", "point_count"]], layout: { "icon-image": "wildfire-icon", "icon-size": ["interpolate", ["linear"], ["zoom"], 0, 0.62, 4, 0.86, 8, 1.05], "icon-allow-overlap": true }, paint: { "icon-opacity": 0.96 } });
        instance.on("click", "current-fire-clusters", async (event) => {
          const cluster = event.features?.[0];
          if (!cluster) return;
          const source = instance.getSource("current-fire");
          const zoom = await source.getClusterExpansionZoom(cluster.properties.cluster_id);
          instance.easeTo({ center: cluster.geometry.coordinates, zoom: Math.min(zoom, 7), duration: 850, essential: false });
        });
        instance.on("click", "current-fire-embers", (event) => {
          const point = event.features?.[0];
          if (!point) return;
          setSelectedFire(point.properties);
          instance.easeTo({ center: point.geometry.coordinates, zoom: Math.max(instance.getZoom(), 6), duration: 850, essential: false });
        });
        instance.on("mouseenter", "current-fire-embers", () => { instance.getCanvas().style.cursor = "pointer"; });
        instance.on("mouseleave", "current-fire-embers", () => { instance.getCanvas().style.cursor = ""; });
        instance.on("mouseenter", "current-fire-clusters", () => { instance.getCanvas().style.cursor = "pointer"; });
        instance.on("mouseleave", "current-fire-clusters", () => { instance.getCanvas().style.cursor = ""; });
      }).catch(() => null);
      instance.loadImage("/pollinators/icon-storms.svg").then(({ data }) => {
        if (!instance.hasImage("storm-icon")) instance.addImage("storm-icon", data, { pixelRatio: 2 });
        if (!instance.getLayer("current-flood-events")) instance.addLayer({ id: "current-flood-events", type: "symbol", source: "current-flood", layout: { "icon-image": "storm-icon", "icon-size": ["interpolate", ["linear"], ["zoom"], 0, 0.42, 4, 0.68, 8, 0.9], "icon-allow-overlap": true }, paint: { "icon-opacity": 0.95 } });
      }).catch(() => null);
    });
    return () => { markers.forEach((marker) => marker.remove()); storms.forEach((marker) => marker.remove()); instance.remove(); };
  }, []);

  useEffect(() => {
    if (!ready || !map.current) return;
    POLLINATOR_ROUTES.forEach((route) => {
      if (!map.current.getLayer(`${route.id}-hit`) || !map.current.getLayer(route.id)) return;
      map.current.setLayoutProperty(`${route.id}-hit`, "visibility", enabledRoutes.has(route.id) ? "visible" : "none");
      map.current.setLayoutProperty(route.id, "visibility", enabledRoutes.has(route.id) ? "visible" : "none");
      map.current.setPaintProperty(route.id, "line-width", route.id === selectedRoute || route.id === hoveredRoute?.id ? 4.25 : 2.2);
      map.current.setPaintProperty(route.id, "line-opacity", route.id === selectedRoute && journeyPlaying ? 0.16 : route.id === selectedRoute || route.id === hoveredRoute?.id ? 1 : 0.42);
    });
  }, [enabledRoutes, hoveredRoute, journeyPlaying, ready, selectedRoute]);

  useEffect(() => {
    if (!journeyPlaying || !selectedRoute || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return undefined;
    const timer = window.setInterval(() => setJourneyProgress((value) => value >= 1 ? 0 : value + 0.006), 45);
    return () => window.clearInterval(timer);
  }, [journeyPlaying, selectedRoute]);

  useEffect(() => {
    if (!ready || !map.current) return;
    const selected = POLLINATOR_ROUTES.find((item) => item.id === selectedRoute);
    const source = map.current.getSource("route-pulse");
    const progressSource = map.current.getSource("route-progress");
    if (!source || !progressSource || !map.current.getLayer("route-pulse") || !map.current.getLayer("route-progress")) return;
    if (!selected) {
      source.setData({ type: "FeatureCollection", features: [] });
      progressSource.setData({ type: "FeatureCollection", features: [] });
      return;
    }
    const coordinates = selected.geometry.geometry.coordinates;
    const visiblePath = revealedRoute(coordinates, journeyProgress);
    source.setData({ type: "FeatureCollection", features: visiblePath.length ? [{ type: "Feature", properties: {}, geometry: { type: "Point", coordinates: pointAlongRoute(coordinates, journeyProgress) } }] : [] });
    progressSource.setData({ type: "FeatureCollection", features: visiblePath.length > 1 ? [{ type: "Feature", properties: {}, geometry: { type: "LineString", coordinates: visiblePath } }] : [] });
    map.current.setPaintProperty("route-pulse-halo", "circle-color", selected.color);
    map.current.setPaintProperty("route-pulse", "circle-stroke-color", selected.color);
    map.current.setPaintProperty("route-progress", "line-color", selected.color);
    map.current.setPaintProperty("route-progress-glow", "line-color", selected.color);
  }, [journeyProgress, ready, selectedRoute]);

  useEffect(() => {
    if (!ready || !map.current) return;
    layers.forEach(({ id }) => {
      const ids = id === "fire" ? ["current-fire-embers", "current-fire-clusters"] : ["current-flood-events-dot", "current-flood-events"];
      ids.forEach((layerId) => { if (map.current.getLayer(layerId)) map.current.setLayoutProperty(layerId, "visibility", id === "flood" && layerId === "current-flood-events-dot" ? "none" : activeLayers[id] ? "visible" : "none"); });
    });
  }, [activeLayers, ready]);

  useEffect(() => {
    if (!ready || !map.current) return;
    const detections = snapshot.currentDetections || [];
    const newest = Math.max(...detections.map((point) => fireTimestamp(point.detectedAt)).filter(Number.isFinite));
    const cutoff = Number.isFinite(newest) ? newest - fireHours * 60 * 60 * 1000 : -Infinity;
    map.current.getSource("current-fire").setData({ type: "FeatureCollection", features: detections.filter((point) => !Number.isFinite(fireTimestamp(point.detectedAt)) || fireTimestamp(point.detectedAt) >= cutoff).map((point) => ({ type: "Feature", properties: point, geometry: { type: "Point", coordinates: [point.longitude, point.latitude] } })) });
  }, [fireHours, ready, snapshot]);

  useEffect(() => {
    if (!ready || !map.current) return;
    const source = map.current.getSource("current-flood");
    if (!source) return;
    source.setData({ type: "FeatureCollection", features: (floodSnapshot.events || []).map((event) => ({ type: "Feature", properties: event, geometry: { type: "Point", coordinates: [event.longitude, event.latitude] } })) });
  }, [floodSnapshot, ready]);

  useEffect(() => {
    if (!ready || !map.current) return;
    const detections = snapshot.currentDetections || [];
    const newest = Math.max(...detections.map((point) => fireTimestamp(point.detectedAt)).filter(Number.isFinite));
    const cutoff = Number.isFinite(newest) ? newest - fireHours * 60 * 60 * 1000 : -Infinity;
    const visible = !activeLayers.fire ? [] : detections.filter((point) => !Number.isFinite(fireTimestamp(point.detectedAt)) || fireTimestamp(point.detectedAt) >= cutoff).slice(0, 80);
    const ids = new Set(visible.map((point) => point.eventId || `${point.longitude}:${point.latitude}`));
    fireMarkers.current.forEach((marker, id) => { if (!ids.has(id)) { marker.remove(); fireMarkers.current.delete(id); } });
    visible.forEach((point) => {
      const id = point.eventId || `${point.longitude}:${point.latitude}`;
      if (fireMarkers.current.has(id)) return;
      const element = document.createElement("button");
      element.type = "button";
      element.className = styles.fireMarker;
      element.setAttribute("aria-label", `Fire detection at ${fireLocation(point)}`);
      element.style.backgroundImage = 'url("/pollinators/icon-wildfires.svg")';
      element.style.backgroundPosition = "center";
      element.style.backgroundRepeat = "no-repeat";
      element.style.backgroundSize = "contain";
      element.addEventListener("click", () => {
        setSelectedFire(point);
        map.current?.easeTo({ center: [point.longitude, point.latitude], zoom: Math.max(map.current.getZoom(), 6), duration: 850, essential: false });
      });
      fireMarkers.current.set(id, new Marker({ element, anchor: "center" }).setLngLat([point.longitude, point.latitude]).addTo(map.current));
    });
  }, [activeLayers.fire, fireHours, ready, snapshot]);

  useEffect(() => {
    if (!ready || !map.current) return;
    const visible = !activeLayers.flood ? [] : (floodSnapshot.events || []).slice(0, 80);
    const ids = new Set(visible.map((point) => point.eventId || `${point.longitude}:${point.latitude}`));
    stormMarkers.current.forEach((marker, id) => { if (!ids.has(id)) { marker.remove(); stormMarkers.current.delete(id); } });
    visible.forEach((point) => {
      const id = point.eventId || `${point.longitude}:${point.latitude}`;
      if (stormMarkers.current.has(id) || !Number.isFinite(Number(point.longitude)) || !Number.isFinite(Number(point.latitude))) return;
      const element = document.createElement("button");
      element.type = "button";
      element.className = styles.stormMarker;
      element.setAttribute("aria-label", `Severe storm at ${point.latitude}, ${point.longitude}`);
      element.style.backgroundImage = 'url("/pollinators/icon-storms.svg")';
      element.style.backgroundPosition = "center";
      element.style.backgroundRepeat = "no-repeat";
      element.style.backgroundSize = "contain";
      stormMarkers.current.set(id, new Marker({ element, anchor: "center" }).setLngLat([Number(point.longitude), Number(point.latitude)]).addTo(map.current));
    });
  }, [activeLayers.flood, floodSnapshot, ready]);

  const route = selectedRoute ? POLLINATOR_ROUTES.find((item) => item.id === selectedRoute) : null;
  const hovered = hoveredRoute ? POLLINATOR_ROUTES.find((item) => item.id === hoveredRoute.id) : null;
  const hoverCardStyle = hoveredRoute ? { left: `${Math.max(18, Math.min(hoveredRoute.x + 18, window.innerWidth - 440))}px`, top: `${Math.max(126, Math.min(hoveredRoute.y + 18, window.innerHeight - 210))}px` } : undefined;
  const source = route ? getAtlasSource(route.sourceId) : null;
  const timeline = route ? getCorridorTimeline(route.id, language) : null;
  const corridorCoordinates = route?.geometry?.geometry?.coordinates || [];
  const corridorImpact = route ? {
    fires: (snapshot.currentDetections || []).filter((item) => nearestDistance([item.longitude, item.latitude], corridorCoordinates) <= 8),
    storms: (floodSnapshot.events || []).filter((item) => nearestDistance([item.longitude, item.latitude], corridorCoordinates) <= 12),
  } : null;
  const insight = insightPoint ? (() => {
    const point = [insightPoint.longitude, insightPoint.latitude];
    const nearbyRoute = POLLINATOR_ROUTES.map((item) => ({ item, distance: Math.min(...item.geometry.geometry.coordinates.map((coordinate) => distanceDegrees(point, coordinate))) })).sort((a, b) => a.distance - b.distance)[0];
    const firesNearby = (snapshot.currentDetections || []).filter((item) => distanceDegrees(point, [item.longitude, item.latitude]) <= 8).length;
    const stormsNearby = (floodSnapshot.events || []).filter((item) => distanceDegrees(point, [item.longitude, item.latitude]) <= 12).length;
    const healthScore = nearbyRoute && nearbyRoute.distance < 8 ? Math.max(0, Math.min(100, Math.round(100 - (nearbyRoute.distance * 2) - (firesNearby * 8) - (stormsNearby * 5)))) : null;
    return { nearbyRoute, firesNearby, stormsNearby, healthScore };
  })() : null;
  const journeyStage = Math.min(storyStages[language].length - 1, Math.floor(journeyProgress * storyStages[language].length));
  const toggleRoute = (id) => setEnabledRoutes((current) => { const next = new Set(current); if (next.has(id)) next.delete(id); else next.add(id); return next; });
  const chooseRoute = (id) => { const selected = POLLINATOR_ROUTES.find((item) => item.id === id); setSelectedRoute(id); setJourneyProgress(0); setJourneyPlaying(false); setHoveredRoute(null); setInsightPoint(null); setShowDetails(true); setShowRoutes(false); if (map.current && selected) focusRoute(map.current, selected, () => setJourneyPlaying(true)); };
  const toggleLayer = (id) => setActiveLayers((current) => ({ ...current, [id]: !current[id] }));
  const status = snapshot.isDemo ? t.demo : snapshot.updatedAt ? `${snapshot.status || "Live data"} - ${t.updated} ${new Date(snapshot.updatedAt).toLocaleString(language)}` : t.noData;
  const detailImpact = route && showDetails ? <section className={styles.detailImpact} aria-label={language === "es" ? "Impactos y coordenadas del corredor" : "Corridor impacts and coordinates"}><div className={styles.impactHeading}><span>{language === "es" ? "Qué afecta al corredor" : "What is affecting this corridor"}</span><small>{language === "es" ? "Feeds NASA en directo" : "Live NASA feeds"}</small></div><div className={styles.impactGrid}><div className={corridorImpact.fires.length ? styles.impactAlert : styles.impactClear}><Flame aria-hidden="true" /><span>{language === "es" ? "Incendios cercanos" : "Nearby fires"}</span><strong>{corridorImpact.fires.length}</strong></div><div className={corridorImpact.storms.length ? styles.impactAlert : styles.impactClear}><CloudLightning aria-hidden="true" /><span>{language === "es" ? "Tormentas cercanas" : "Nearby storms"}</span><strong>{corridorImpact.storms.length}</strong></div></div><div className={styles.coordinatePanel}><div className={styles.impactHeading}><span><MapPinned aria-hidden="true" />{language === "es" ? "Coordenadas detalladas" : "Detailed path coordinates"}</span><small>{corridorCoordinates.length} points · {timeline.monthRange}</small></div><details><summary>{language === "es" ? "Mostrar la ruta completa" : "Show full path"}</summary><code>{corridorCoordinates.map(([longitude, latitude]) => `[${longitude.toFixed(4)}, ${latitude.toFixed(4)}]`).join(" → ")}</code></details></div></section> : null;
  const corridorSlideshow = (detail = false) => route ? <aside className={`${styles.routePreview} ${detail ? styles.detailJourneyPreview : ""}`} aria-live="polite" aria-label={`${route.name[language]}, ${storyStages[language][journeyStage]}`}><div className={styles.journeyScenes} aria-hidden="true">{[0, 1].map((variation) => <i key={variation} style={{ backgroundImage: `url(${journeyImage(route)})`, backgroundPosition: `${journeyStage * 33.333}% ${variation ? "100%" : "0%"}` }} />)}</div><strong>{route.name[language]}</strong></aside> : null;
  const expandedJourney = route && showDetails ? <>{corridorSlideshow(true)}<section className={styles.journeyRail} aria-label={t.journey}><div><span>{t.journey}</span><strong>{route.name[language]}</strong></div><ol>{storyStages[language].map((stage, index) => <li key={stage} className={index === journeyStage ? styles.currentStage : ""}><button type="button" onClick={() => { setJourneyProgress(index / storyStages[language].length); setJourneyPlaying(false); }}><i style={{ background: route.color }} />{stage}</button></li>)}</ol><button type="button" className={styles.journeyToggle} onClick={() => { if (!journeyPlaying && journeyProgress >= 1) setJourneyProgress(0); setJourneyPlaying((value) => !value); }} aria-label={journeyPlaying ? t.pause : t.play}>{journeyPlaying ? <Pause /> : <Play />}<span>{journeyPlaying ? t.pause : t.play}</span></button></section></> : null;

  return <main className={styles.page} data-atlas>
    <section className={styles.atlas} aria-label={t.title}>
      {expandedJourney}
      <div className={styles.map} ref={mapNode} />
      <div className={`${styles.loading} ${loading ? "" : styles.loadingDone}`} aria-hidden="true"><b>Pollinator Corridor Atlas</b></div>
      <header className={styles.topbar}><div><h1>{t.title}</h1><p className={styles.intro}>{t.intro}</p><p className={styles.liveStatus}><Radio aria-hidden="true" />{status}</p></div><div className={styles.actions}><button type="button" className={showLayers ? styles.activeAction : ""} onClick={() => { setShowLayers((value) => !value); setShowRoutes(false); }} aria-label={t.layers} aria-expanded={showLayers}><Layers3 /><span>{t.layers}</span></button><button type="button" className={showRoutes ? styles.activeAction : ""} onClick={() => { setShowRoutes((value) => !value); setShowLayers(false); }} aria-label={t.routes} aria-expanded={showRoutes}><Route /><span>{t.routes}</span></button></div></header>
      {showLayers ? <aside className={styles.layersPanel} aria-label={t.layers}><div className={styles.panelHeading}><span>{t.layers}</span><button type="button" onClick={() => setShowLayers(false)} aria-label={t.close}><X /></button></div>{layers.map(({ id, Icon, label }) => <button type="button" key={id} className={activeLayers[id] ? styles.layerOn : ""} onClick={() => toggleLayer(id)} aria-pressed={activeLayers[id]}><Icon /><span>{label(t)}</span><i aria-hidden="true" /></button>)}</aside> : null}
      {insight ? <aside className={styles.insights} aria-live="polite"><button type="button" className={styles.closeInsight} onClick={() => setInsightPoint(null)} aria-label={t.close}><X /></button><span className={styles.insightsKicker}>Corridor insights</span><h2>{Math.abs(insightPoint.latitude).toFixed(2)}°{insightPoint.latitude >= 0 ? "N" : "S"}, {Math.abs(insightPoint.longitude).toFixed(2)}°{insightPoint.longitude >= 0 ? "E" : "W"}</h2><p className={styles.insightsNote}>A transparent map summary for this location. Select a route for its species and journey detail.</p><div className={styles.insightsScore}><span>Prototype corridor health</span><strong>{insight.healthScore === null ? "—" : insight.healthScore}<small>{insight.healthScore === null ? "No route signal" : "/100 signal"}</small></strong></div><dl className={styles.insightsGrid}><div><dt>Nearest corridor</dt><dd>{insight.nearbyRoute?.item.name?.[language] || "No mapped route"}</dd></div><div><dt>Route signal</dt><dd>{insight.nearbyRoute && insight.nearbyRoute.distance < 8 ? "Within mapped range" : "Outside mapped range"}</dd></div><div><dt>Nearby active fires</dt><dd>{insight.firesNearby}</dd></div><div><dt>Nearby storms</dt><dd>{insight.stormsNearby}</dd></div></dl><p className={styles.insightsSource}>Sources: mapped corridor geometry, NASA FIRMS, NASA EONET. No predictive model applied.</p></aside> : null}
      {selectedFire ? <aside className={styles.fireLens} aria-live="polite"><button type="button" onClick={() => setSelectedFire(null)} aria-label={t.close}><X /></button><span>{t.fieldLens}</span><div className={styles.fireLensFlame} aria-hidden="true"><i /></div><strong>{fireLocation(selectedFire)}</strong><p>{t.thermalAnomaly} · {selectedFire.dataSource || "NASA FIRMS VIIRS"}</p><dl><div><dt>{t.observed}</dt><dd>{selectedFire.detectedAt || "—"}</dd></div><div><dt>{t.confidence}</dt><dd>{selectedFire.confidence || "—"}</dd></div>{selectedFire.frp ? <div><dt>{t.radiativePower}</dt><dd>{selectedFire.frp} MW</dd></div> : null}</dl><a href={fireImageryUrl(selectedFire)} target="_blank" rel="noreferrer">{t.imagery}</a></aside> : null}
      {showRoutes ? <aside className={styles.routePicker} aria-label={t.routeList}><div className={styles.panelHeading}><span>{t.routeList}</span><button type="button" onClick={() => setShowRoutes(false)} aria-label={t.close}><X /></button></div><div className={styles.routeList}>{POLLINATOR_ROUTES.map((item) => { const itemTimeline = getCorridorTimeline(item.id, language); return <div key={item.id} className={selectedRoute === item.id ? styles.activeRoute : ""}><label><input type="checkbox" checked={enabledRoutes.has(item.id)} onChange={() => toggleRoute(item.id)} /><span style={{ background: item.color }} /></label><div className={styles.routeOption}><button type="button" onClick={() => chooseRoute(item.id)}>{item.name[language]}</button><small><b>{language === "es" ? "Movimiento" : "Movement"}</b><span>{itemTimeline.monthRange}</span></small></div></div>; })}</div></aside> : null}
      {hovered && !showDetails ? <aside className={styles.glimpse} style={hoverCardStyle} aria-live="polite"><Image src={storyImage(hovered)} alt="" width={640} height={640} sizes="(max-width:760px) 32vw, 124px" /><div><span>{hovered.scientificName}</span><strong>{hovered.name[language]}</strong><p>{hovered.summary?.[language]}</p></div></aside> : null}
      {route && !showDetails ? corridorSlideshow() : null}
      {route && showDetails ? <article className={styles.detail} aria-live="polite"><button type="button" className={styles.closeDetail} onClick={() => setShowDetails(false)} aria-label={t.close}><X /><span>{t.close}</span></button><p>{t.details}</p><h2>{route.name[language]}</h2><em>{route.scientificName}</em><span className={styles.routeKey}><i style={{ background: route.color }} />{route.method[language]}</span><strong className={styles.routeSeason}>{route.season?.[language]}</strong><span className={styles.routeSummary}>{route.summary?.[language]}</span>{detailImpact}<section className={styles.seasonCalendar} aria-label={language === "es" ? "Calendario estacional" : "Season calendar"}><div className={styles.timelineHeading}><span>{language === "es" ? "Meses de movimiento" : "Movement months"}</span><strong>{timeline.monthRange}</strong></div><div className={styles.monthGrid}>{timeline.monthLabels.map((month, index) => <span key={month} className={`${styles.monthCell} ${timeline.peakMonths.includes(index) ? styles.monthPeak : ""} ${timeline.activeMonths.includes(index) ? styles.monthActive : ""}`}>{month}</span>)}</div><p>{language === "es" ? "Pico estacional" : "Seasonal peak"}: <strong>{timeline.peakLabel}</strong></p><small>{language === "es" ? "Ventana aproximada basada en la evidencia de la fuente; puede variar según clima y alimento." : "Approximate window based on source evidence; timing can shift with weather and food availability."}</small></section><section className={styles.timeline} aria-label={t.timeline}><div className={styles.timelineHeading}><span>{t.timeline}</span><strong>{timeline.window}</strong></div><div className={styles.timelineTrack} aria-hidden="true"><i /><i /><i /><i /></div><div className={styles.timelineLabels}><span>Now</span><span>2030</span><span>2040</span><span>2050+</span></div><p>{t.projectedWindow}: <strong>{timeline.window}</strong></p><small>{timeline.confidence} · {t.timelineNote}. {t.timelineBasis}</small></section><span className={styles.routeCaveat}>{source.status}</span><a href={`/sources/${source.id}`}>{t.source} <span aria-hidden="true">-&gt;</span></a></article> : <p className={styles.mapPrompt}>{t.routes}</p>}
      {route && !showDetails ? <section className={styles.journeyRail} aria-label={t.journey}><div><span>{t.journey}</span><strong>{route.name[language]}</strong></div><ol>{storyStages[language].map((stage, index) => <li key={stage} className={index === journeyStage ? styles.currentStage : ""}><button type="button" onClick={() => { setJourneyProgress(index / storyStages[language].length); setJourneyPlaying(false); }}><i style={{ background: route.color }} />{stage}</button></li>)}</ol><button type="button" className={styles.journeyToggle} onClick={() => setJourneyPlaying((value) => !value)} aria-label={journeyPlaying ? t.pause : t.play}>{journeyPlaying ? <Pause /> : <Play />}<span>{journeyPlaying ? t.pause : t.play}</span></button></section> : null}
      {selectedFire ? <label className={styles.fireReplay}><span>{t.lastHours}: {fireHours}</span><input type="range" min="1" max="24" value={fireHours} onChange={(event) => setFireHours(Number(event.target.value))} /></label> : null}
      <p className={styles.atmosphereSource}>{t.atmosphere}</p>
    </section>
  </main>;
}
