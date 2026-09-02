"use client";

import "maplibre-gl/dist/maplibre-gl.css";
import { useEffect, useRef, useState } from "react";
import { Map, NavigationControl, Popup } from "maplibre-gl";
import { Cloud, CloudRain, Flame, Radio, Route, SlidersHorizontal, Wind, X } from "lucide-react";
import { POLLINATOR_ROUTES, getAtlasSource } from "../lib/pollinatorAtlas";
import { MOCK_FIRE_SNAPSHOT } from "./mockFireSnapshot";
import styles from "./PollinatorAtlas.module.css";

const copy = {
  en: { title: "Pollinator Corridor Atlas", routes: "Routes", observed: "Burned area", current: "Active wildfire events", projected: "Projected scenario — not observed data", source: "Open source record", method: "Route evidence", updated: "Updated", noData: "No approved live snapshot is available yet.", date: "Historical record through", risk: "Fire-weather risk", burned: "Projected burned area", scenarioUnavailable: "No approved scenario dataset is available.", preliminary: "This route is a preliminary footprint until a study-specific geometry is approved.", layers: "Map layers", routeList: "Choose a route", close: "Close details", demo: "Demo fire data — not observed", time: "Time layer" },
  es: { title: "Atlas de corredores de polinizadores", routes: "Rutas", observed: "Área quemada", current: "Incendios forestales activos", source: "Abrir ficha de fuente", method: "Evidencia de la ruta", updated: "Actualizado", noData: "Aún no hay una instantánea en directo aprobada.", date: "Registro histórico hasta", risk: "Riesgo meteorológico de incendios", burned: "Superficie quemada proyectada", scenarioUnavailable: "No hay ningún conjunto de datos de escenario aprobado.", preliminary: "Esta ruta es preliminar hasta que se apruebe una geometría específica del estudio.", layers: "Capas del mapa", routeList: "Elige una ruta", close: "Cerrar detalles", demo: "Datos de incendios de demostración — no observados", time: "Capa temporal" },
};

const emptySnapshot = { currentDetections: [], historicalBurnedArea: { type: "FeatureCollection", features: [] }, scenarios: {} };
const atmosphereDate = new Date().toISOString().slice(0, 10);
const atmosphereLayers = [
  { id: "clouds", Icon: Cloud, label: { en: "Clouds", es: "Nubes" }, dataset: "NASA MODIS satellite imagery", layer: "MODIS_Terra_CorrectedReflectance_TrueColor", tileMatrixSet: "GoogleMapsCompatible_Level9", opacity: 0.46, format: "jpg" },
  { id: "rain", Icon: CloudRain, label: { en: "Rainfall", es: "Lluvia" }, dataset: "NASA GPM IMERG precipitation", layer: "IMERG_Precipitation_Rate_30min", tileMatrixSet: "GoogleMapsCompatible_Level6", opacity: 0.7, format: "png" },
  { id: "smoke", Icon: Wind, label: { en: "Aerosols", es: "Aerosoles" }, dataset: "NASA MODIS aerosol - smoke indicator", layer: "MODIS_Terra_Aerosol", tileMatrixSet: "GoogleMapsCompatible_Level6", opacity: 0.58, format: "png" },
];

export default function PollinatorAtlas({ locale = "en" }) {
  const language = locale === "es" ? "es" : "en";
  const t = copy[language];
  const mapNode = useRef(null);
  const map = useRef(null);
  const [ready, setReady] = useState(false);
  const [selectedRoute, setSelectedRoute] = useState(POLLINATOR_ROUTES[0].id);
  const [enabledRoutes, setEnabledRoutes] = useState(() => new Set(POLLINATOR_ROUTES.map((route) => route.id)));
  const [fireMode, setFireMode] = useState("current");
  const [snapshot, setSnapshot] = useState(emptySnapshot);
  const [fireDate, setFireDate] = useState("");
  const [showRoutes, setShowRoutes] = useState(false);
  const [showDetails, setShowDetails] = useState(true);
  const [atmosphere, setAtmosphere] = useState({ clouds: true, rain: false, smoke: false });

  useEffect(() => {
    let cancelled = false;
    fetch("/api/fire-snapshot").then((response) => response.json()).then((value) => { if (!cancelled) setSnapshot(value?.updatedAt ? value : MOCK_FIRE_SNAPSHOT); }).catch(() => { if (!cancelled) setSnapshot(MOCK_FIRE_SNAPSHOT); });
    return () => { cancelled = true; };
  }, []);

  useEffect(() => {
    if (map.current || !mapNode.current) return;
    const instance = new Map({ container: mapNode.current, style: "https://basemaps.cartocdn.com/gl/dark-matter-gl-style/style.json", center: [8, 20], zoom: 1.35, attributionControl: false });
    instance.addControl(new NavigationControl({ showCompass: false }), "bottom-right");
    instance.on("load", () => {
      atmosphereLayers.forEach(({ id, layer, tileMatrixSet, opacity, format }) => {
        instance.addSource(`atmosphere-${id}`, { type: "raster", tiles: [`https://gibs.earthdata.nasa.gov/wmts/epsg3857/best/${layer}/default/${atmosphereDate}/${tileMatrixSet}/{z}/{y}/{x}.${format}`], tileSize: 256, maxzoom: Number(tileMatrixSet.match(/\d+$/)?.[0]) });
        instance.addLayer({ id: `atmosphere-${id}`, type: "raster", source: `atmosphere-${id}`, paint: { "raster-opacity": opacity } });
      });
      POLLINATOR_ROUTES.forEach((route) => {
        instance.addSource(route.id, { type: "geojson", data: route.geometry });
        instance.addLayer({ id: route.id, type: "line", source: route.id, paint: { "line-color": route.color, "line-width": 2.5, "line-opacity": 0.65, "line-blur": route.dashed ? 0.35 : 0.1, "line-dasharray": route.dashed ? [2, 2] : [1, 0] } });
      });
      instance.addSource("historical-fire", { type: "geojson", data: emptySnapshot.historicalBurnedArea });
      instance.addLayer({ id: "historical-fire", type: "fill", source: "historical-fire", paint: { "fill-color": "#fb4f14", "fill-opacity": 0.34 } });
      instance.addSource("current-fire", { type: "geojson", data: { type: "FeatureCollection", features: [] }, cluster: true, clusterRadius: 44 });
      instance.addLayer({ id: "current-fire-halo", type: "circle", source: "current-fire", filter: ["!", ["has", "point_count"]], paint: { "circle-color": "#fb4f14", "circle-radius": 10, "circle-opacity": 0.13, "circle-blur": 0.7 } });
      instance.addLayer({ id: "current-fire-clusters", type: "circle", source: "current-fire", filter: ["has", "point_count"], paint: { "circle-color": "#fb4f14", "circle-radius": ["step", ["get", "point_count"], 15, 100, 21, 1000, 28], "circle-opacity": 0.84 } });
      instance.addLayer({ id: "current-fire-cluster-count", type: "symbol", source: "current-fire", filter: ["has", "point_count"], layout: { "text-field": ["get", "point_count_abbreviated"], "text-size": 11 }, paint: { "text-color": "#fff4d6" } });
      instance.addLayer({ id: "current-fire", type: "circle", source: "current-fire", filter: ["!", ["has", "point_count"]], paint: { "circle-color": "#fb4f14", "circle-radius": 4.5, "circle-stroke-color": "#fff4d6", "circle-stroke-width": 1.2 } });
      instance.on("click", "current-fire", (event) => {
        const point = event.features?.[0];
        if (!point) return;
        const content = document.createElement("div");
        const title = document.createElement("strong");
        title.textContent = point.properties?.title || "Wildfire event";
        content.append(title);
        if (point.properties?.sourceUrl) {
          const link = document.createElement("a");
          link.href = point.properties.sourceUrl;
          link.target = "_blank";
          link.rel = "noreferrer";
          link.textContent = point.properties?.dataSource || "Source";
          content.append(link);
        }
        new Popup({ closeButton: true, maxWidth: "16rem" }).setLngLat(event.lngLat).setDOMContent(content).addTo(instance);
      });
      instance.on("mouseenter", "current-fire", () => { instance.getCanvas().style.cursor = "pointer"; });
      instance.on("mouseleave", "current-fire", () => { instance.getCanvas().style.cursor = ""; });
      instance.addSource("scenario-fire", { type: "geojson", data: { type: "FeatureCollection", features: [] } });
      const pattern = document.createElement("canvas");
      pattern.width = pattern.height = 8;
      const context = pattern.getContext("2d");
      context.strokeStyle = "#e9d5ff";
      context.lineWidth = 2;
      context.beginPath(); context.moveTo(-2, 8); context.lineTo(8, -2); context.moveTo(2, 10); context.lineTo(10, 2); context.stroke();
      instance.addImage("projected-fire-hatch", context.getImageData(0, 0, 8, 8));
      instance.addLayer({ id: "scenario-fire", type: "fill", source: "scenario-fire", paint: { "fill-color": "#7e22ce", "fill-opacity": 0.28, "fill-outline-color": "#e9d5ff", "fill-pattern": "projected-fire-hatch" } });
      map.current = instance;
      setReady(true);
    });
    return () => instance.remove();
  }, []);

  useEffect(() => {
    if (!ready || !map.current) return;
    POLLINATOR_ROUTES.forEach((route) => {
      map.current.setLayoutProperty(route.id, "visibility", enabledRoutes.has(route.id) ? "visible" : "none");
      map.current.setPaintProperty(route.id, "line-width", route.id === selectedRoute ? 4 : 2.25);
      map.current.setPaintProperty(route.id, "line-opacity", route.id === selectedRoute ? 1 : 0.38);
    });
  }, [enabledRoutes, ready, selectedRoute]);

  useEffect(() => {
    if (!ready || !map.current) return;
    atmosphereLayers.forEach(({ id }) => map.current.setLayoutProperty(`atmosphere-${id}`, "visibility", atmosphere[id] ? "visible" : "none"));
  }, [atmosphere, ready]);

  useEffect(() => {
    if (!ready || !map.current) return;
    const current = { type: "FeatureCollection", features: (snapshot.currentDetections || []).map((point) => ({ type: "Feature", properties: point, geometry: { type: "Point", coordinates: [point.longitude, point.latitude] } })) };
    const historical = snapshot.historicalBurnedArea || emptySnapshot.historicalBurnedArea;
    map.current.getSource("historical-fire").setData({ ...historical, features: historical.features.filter((feature) => !fireDate || !feature.properties?.date || feature.properties.date <= fireDate) });
    map.current.getSource("current-fire").setData(current);
    const scenario = fireMode === "risk" ? snapshot.scenarios?.fireWeatherRisk : snapshot.scenarios?.burnedArea;
    map.current.getSource("scenario-fire").setData(scenario?.data || { type: "FeatureCollection", features: [] });
    map.current.setLayoutProperty("historical-fire", "visibility", fireMode === "observed" ? "visible" : "none");
    ["current-fire", "current-fire-halo", "current-fire-clusters", "current-fire-cluster-count"].forEach((id) => map.current.setLayoutProperty(id, "visibility", fireMode === "current" ? "visible" : "none"));
    map.current.setLayoutProperty("scenario-fire", "visibility", fireMode === "risk" || fireMode === "burned" ? "visible" : "none");
  }, [fireDate, fireMode, ready, snapshot]);

  const route = POLLINATOR_ROUTES.find((item) => item.id === selectedRoute);
  const source = getAtlasSource(route.sourceId);
  const scenario = fireMode === "risk" ? snapshot.scenarios?.fireWeatherRisk : snapshot.scenarios?.burnedArea;
  const toggleRoute = (id) => setEnabledRoutes((current) => { const next = new Set(current); if (next.has(id)) next.delete(id); else next.add(id); return next; });
  const chooseRoute = (id) => { setSelectedRoute(id); setShowDetails(true); setShowRoutes(false); };
  const cycleFire = () => setFireMode((current) => current === "current" ? "observed" : current === "observed" ? "risk" : current === "risk" ? "burned" : "current");
  const toggleAtmosphere = (id) => setAtmosphere((current) => ({ ...current, [id]: !current[id] }));

  return <main className={styles.page} data-atlas>
    <header className={styles.topbar}><div><p className={styles.brand}>Universo Nahiara</p><h1>{t.title}</h1></div><div className={styles.liveStatus}><Radio aria-hidden="true" /><span>{snapshot.isDemo ? t.demo : snapshot.updatedAt ? `${snapshot.status || "Live data"} · ${t.updated} ${new Date(snapshot.updatedAt).toLocaleString(language)}` : t.noData}</span></div></header>
    <section className={styles.atlas} aria-label={t.title}>
      <div className={styles.map} ref={mapNode} />
      <p className={styles.atmosphereSource}>{language === "es" ? "Atmósfera en directo: NASA Earthdata" : "Live atmosphere: NASA Earthdata"} · {atmosphereDate}</p>
      <aside className={styles.rail} aria-label={t.layers}>
        <button type="button" className={fireMode === "current" ? styles.activeLayer : ""} onClick={cycleFire} aria-label={t.current}><Flame /><span>{t.current}</span></button>
        {atmosphereLayers.map(({ id, Icon, label, dataset }) => <button type="button" key={id} className={atmosphere[id] ? styles.activeLayer : ""} onClick={() => toggleAtmosphere(id)} aria-pressed={atmosphere[id]} title={dataset}><Icon /><span>{label[language]}</span></button>)}
        <button type="button" className={showRoutes ? styles.activeLayer : ""} onClick={() => setShowRoutes((value) => !value)} aria-expanded={showRoutes}><Route /><span>{t.routes}</span></button>
      </aside>
      {showRoutes ? <aside className={styles.routePicker} aria-label={t.routeList}><div className={styles.panelHeading}><span>{t.routeList}</span><button type="button" onClick={() => setShowRoutes(false)} aria-label={t.close}><X /></button></div><div className={styles.routeList}>{POLLINATOR_ROUTES.map((item) => <div key={item.id} className={selectedRoute === item.id ? styles.activeRoute : ""}><label><input type="checkbox" checked={enabledRoutes.has(item.id)} onChange={() => toggleRoute(item.id)} /><span style={{ background: item.color }} /></label><button type="button" onClick={() => chooseRoute(item.id)}>{item.name[language]}</button></div>)}</div></aside> : null}
      {showDetails ? <article className={styles.detail} aria-live="polite"><button type="button" className={styles.closeDetail} onClick={() => setShowDetails(false)} aria-label={t.close}><X /></button><p className={styles.detailLabel}>{t.method}</p><h2>{route.name[language]}</h2><p className={styles.scientific}>{route.scientificName}</p><div className={styles.routeKey}><span style={{ background: route.color }} />{route.name[language]}</div><p>{route.method[language]}</p><p className={styles.warning}>{t.preliminary}</p><a href={`/sources/${source.id}`}>{t.source} <span aria-hidden="true">→</span></a></article> : <button type="button" className={styles.openDetail} onClick={() => setShowDetails(true)}><SlidersHorizontal /> {route.name[language]}</button>}
      <footer className={styles.timeline}><div><span className={styles.timeLabel}>{t.time}</span><button type="button" className={fireMode === "current" ? styles.selectedTime : ""} onClick={() => setFireMode("current")}>{t.current}</button><button type="button" className={fireMode === "observed" ? styles.selectedTime : ""} onClick={() => setFireMode("observed")}>{t.observed}</button><button type="button" className={fireMode === "risk" ? styles.selectedTime : ""} onClick={() => setFireMode("risk")}>{t.risk}</button><button type="button" className={fireMode === "burned" ? styles.selectedTime : ""} onClick={() => setFireMode("burned")}>{t.burned}</button></div>{fireMode === "observed" && snapshot.timeline?.max ? <label>{t.date}<input type="date" min={snapshot.timeline.min || undefined} max={snapshot.timeline.max} value={fireDate || snapshot.timeline.max} onChange={(event) => setFireDate(event.target.value)} /></label> : null}{(fireMode === "risk" || fireMode === "burned") && <span className={styles.scenario}>{scenario ? `${scenario.model} · ${scenario.pathway} · ${scenario.period}` : t.scenarioUnavailable}</span>}</footer>
    </section>
  </main>;
}
