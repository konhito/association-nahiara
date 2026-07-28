"use client";

import "maplibre-gl/dist/maplibre-gl.css";
import { useEffect, useRef, useState } from "react";
import { Map, NavigationControl } from "maplibre-gl";
import { POLLINATOR_ROUTES, getAtlasSource } from "../lib/pollinatorAtlas";
import { MOCK_FIRE_SNAPSHOT } from "./mockFireSnapshot";
import styles from "./PollinatorAtlas.module.css";

const copy = {
  en: { title: "Pollinator corridor", intro: "Routes, fire records and scenarios are separate evidence layers.", routes: "Pollinator routes", observed: "Observed fire record", current: "Current satellite detections", projected: "Projected scenario — not observed data", source: "Source record", method: "Method", updated: "Last approved update", noData: "No approved live snapshot is available yet.", date: "Historical record through", risk: "Projected fire-weather risk", burned: "Projected burned area", scenarioUnavailable: "No approved scenario dataset is available.", preliminary: "Route geometry is preliminary and will remain visibly labelled until a study-specific source record is approved." },
  es: { title: "Corredor de los polinizadores", intro: "Las rutas, los registros de incendios y los escenarios son capas de evidencia separadas.", routes: "Rutas de polinizadores", observed: "Registro de incendios observado", current: "Detecciones satelitales actuales", projected: "Escenario proyectado — no son datos observados", source: "Ficha de fuente", method: "Método", updated: "Última actualización aprobada", noData: "Aún no hay una instantánea en directo aprobada.", date: "Registro histórico hasta", risk: "Riesgo meteorológico de incendios proyectado", burned: "Superficie quemada proyectada", scenarioUnavailable: "No hay ningún conjunto de datos de escenario aprobado.", preliminary: "La geometría de la ruta es preliminar y permanecerá identificada hasta que se apruebe una fuente específica del estudio." },
};

const emptySnapshot = { currentDetections: [], historicalBurnedArea: { type: "FeatureCollection", features: [] }, scenarios: {} };

export default function PollinatorAtlas({ locale = "en" }) {
  const language = locale === "es" ? "es" : "en";
  const t = copy[language];
  const demoStatus = language === "es" ? "Datos de incendios de demostración — no observados" : "Demo fire data — not observed";
  const mapNode = useRef(null);
  const map = useRef(null);
  const [ready, setReady] = useState(false);
  const [selectedRoute, setSelectedRoute] = useState(POLLINATOR_ROUTES[0].id);
  const [enabledRoutes, setEnabledRoutes] = useState(() => new Set(POLLINATOR_ROUTES.map((route) => route.id)));
  const [fireMode, setFireMode] = useState("observed");
  const [snapshot, setSnapshot] = useState(emptySnapshot);
  const [fireDate, setFireDate] = useState("");

  useEffect(() => {
    let cancelled = false;
    fetch("/api/fire-snapshot").then((response) => response.json()).then((value) => { if (!cancelled) setSnapshot(value?.updatedAt ? value : MOCK_FIRE_SNAPSHOT); }).catch(() => { if (!cancelled) setSnapshot(MOCK_FIRE_SNAPSHOT); });
    return () => { cancelled = true; };
  }, []);

  useEffect(() => {
    if (map.current || !mapNode.current) return;
    const instance = new Map({ container: mapNode.current, style: "https://basemaps.cartocdn.com/gl/dark-matter-gl-style/style.json", center: [8, 20], zoom: 1.35, attributionControl: true });
    instance.addControl(new NavigationControl({ showCompass: false }), "top-right");
    instance.on("load", () => {
      POLLINATOR_ROUTES.forEach((route) => {
        instance.addSource(route.id, { type: "geojson", data: route.geometry });
        instance.addLayer({ id: route.id, type: "line", source: route.id, paint: { "line-color": route.color, "line-width": 3, "line-opacity": 0.9, "line-dasharray": route.dashed ? [2, 2] : [1, 0] } });
      });
      instance.addSource("historical-fire", { type: "geojson", data: emptySnapshot.historicalBurnedArea });
      instance.addLayer({ id: "historical-fire", type: "fill", source: "historical-fire", paint: { "fill-color": "#f97316", "fill-opacity": 0.42 } });
      instance.addSource("current-fire", { type: "geojson", data: { type: "FeatureCollection", features: [] }, cluster: true, clusterRadius: 42 });
      instance.addLayer({ id: "current-fire-clusters", type: "circle", source: "current-fire", filter: ["has", "point_count"], paint: { "circle-color": "#fb4f14", "circle-radius": ["step", ["get", "point_count"], 15, 100, 21, 1000, 28], "circle-opacity": 0.84 } });
      instance.addLayer({ id: "current-fire-cluster-count", type: "symbol", source: "current-fire", filter: ["has", "point_count"], layout: { "text-field": ["get", "point_count_abbreviated"], "text-size": 11 }, paint: { "text-color": "#fff4d6" } });
      instance.addLayer({ id: "current-fire", type: "circle", source: "current-fire", filter: ["!", ["has", "point_count"]], paint: { "circle-color": "#fb4f14", "circle-radius": 4, "circle-stroke-color": "#fff4d6", "circle-stroke-width": 1 } });
      instance.addSource("scenario-fire", { type: "geojson", data: { type: "FeatureCollection", features: [] } });
      const pattern = document.createElement("canvas");
      pattern.width = pattern.height = 8;
      const context = pattern.getContext("2d");
      context.strokeStyle = "#e9d5ff";
      context.lineWidth = 2;
      context.beginPath(); context.moveTo(-2, 8); context.lineTo(8, -2); context.moveTo(2, 10); context.lineTo(10, 2); context.stroke();
      instance.addImage("projected-fire-hatch", context.getImageData(0, 0, 8, 8));
      instance.addLayer({ id: "scenario-fire", type: "fill", source: "scenario-fire", paint: { "fill-color": "#7e22ce", "fill-opacity": 0.42, "fill-outline-color": "#e9d5ff", "fill-pattern": "projected-fire-hatch" } });
      map.current = instance;
      setReady(true);
    });
    return () => instance.remove();
  }, []);

  useEffect(() => {
    if (!ready || !map.current) return;
    POLLINATOR_ROUTES.forEach((route) => map.current.setLayoutProperty(route.id, "visibility", enabledRoutes.has(route.id) ? "visible" : "none"));
  }, [enabledRoutes, ready]);

  useEffect(() => {
    if (!ready || !map.current) return;
    const current = { type: "FeatureCollection", features: (snapshot.currentDetections || []).map((point) => ({ type: "Feature", properties: point, geometry: { type: "Point", coordinates: [point.longitude, point.latitude] } })) };
    const historical = snapshot.historicalBurnedArea || emptySnapshot.historicalBurnedArea;
    map.current.getSource("historical-fire").setData({ ...historical, features: historical.features.filter((feature) => !fireDate || !feature.properties?.date || feature.properties.date <= fireDate) });
    map.current.getSource("current-fire").setData(current);
    const scenario = fireMode === "risk" ? snapshot.scenarios?.fireWeatherRisk : snapshot.scenarios?.burnedArea;
    map.current.getSource("scenario-fire").setData(scenario?.data || { type: "FeatureCollection", features: [] });
    map.current.setLayoutProperty("historical-fire", "visibility", fireMode === "observed" ? "visible" : "none");
    map.current.setLayoutProperty("current-fire", "visibility", fireMode === "current" ? "visible" : "none");
    map.current.setLayoutProperty("current-fire-clusters", "visibility", fireMode === "current" ? "visible" : "none");
    map.current.setLayoutProperty("current-fire-cluster-count", "visibility", fireMode === "current" ? "visible" : "none");
    map.current.setLayoutProperty("scenario-fire", "visibility", fireMode === "risk" || fireMode === "burned" ? "visible" : "none");
  }, [fireDate, fireMode, ready, snapshot]);

  const route = POLLINATOR_ROUTES.find((item) => item.id === selectedRoute);
  const source = getAtlasSource(route.sourceId);
  const scenario = fireMode === "risk" ? snapshot.scenarios?.fireWeatherRisk : snapshot.scenarios?.burnedArea;
  const toggleRoute = (id) => setEnabledRoutes((current) => {
    const next = new Set(current);
    if (next.has(id)) next.delete(id);
    else next.add(id);
    return next;
  });

  return (
    <main className={styles.page}>
      <header className={styles.header}>
        <p className={styles.kicker}>Universo Nahiara · Atlas</p>
        <h1>{t.title}</h1>
        <p>{t.intro}</p>
      </header>
      <section className={styles.atlas} aria-label={t.title}>
        <div className={styles.map} ref={mapNode} />
        <aside className={styles.controls}>
          <fieldset>
            <legend>{t.routes}</legend>
            <div className={styles.routeList}>{POLLINATOR_ROUTES.map((item) => <label key={item.id} className={selectedRoute === item.id ? styles.activeRoute : ""}>
              <input type="checkbox" checked={enabledRoutes.has(item.id)} onChange={() => toggleRoute(item.id)} />
              <button type="button" onClick={() => setSelectedRoute(item.id)}><span style={{ background: item.color }} />{item.name[language]}</button>
            </label>)}</div>
          </fieldset>
          <fieldset className={styles.fireControls}>
            <legend>Fire layer</legend>
            {[['observed', t.observed], ['current', t.current], ['risk', t.risk], ['burned', t.burned]].map(([value, label]) => <label key={value}><input type="radio" name="fire-mode" value={value} checked={fireMode === value} onChange={() => setFireMode(value)} />{label}</label>)}
            {fireMode === "observed" && snapshot.timeline?.max ? <label className={styles.dateControl}>{t.date}<input type="date" min={snapshot.timeline.min || undefined} max={snapshot.timeline.max} value={fireDate || snapshot.timeline.max} onChange={(event) => setFireDate(event.target.value)} /></label> : null}
          </fieldset>
        </aside>
        <article className={styles.detail} aria-live="polite">
          <p className={styles.detailLabel}>{t.method}</p>
          <h2>{route.name[language]}</h2>
          <p className={styles.scientific}>{route.scientificName}</p>
          <p>{route.method[language]}</p>
          <p className={styles.warning}>{t.preliminary}</p>
          <a href={`/sources/${source.id}`}>{t.source} <span aria-hidden="true">→</span></a>
        </article>
        <div className={styles.status}>
          {fireMode === "risk" || fireMode === "burned" ? <><strong>{t.projected}</strong><span>{scenario ? `${scenario.model} · ${scenario.pathway} · ${scenario.period}` : t.scenarioUnavailable}</span></> : null}
          <span>{snapshot.isDemo ? demoStatus : snapshot.updatedAt ? `${t.updated}: ${new Date(snapshot.updatedAt).toLocaleString(language)}` : t.noData}</span>
        </div>
      </section>
    </main>
  );
}
