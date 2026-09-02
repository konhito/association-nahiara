"use client";

import "maplibre-gl/dist/maplibre-gl.css";
import { useEffect, useRef, useState } from "react";
import { Map, NavigationControl, Popup } from "maplibre-gl";
import { Cloud, CloudRain, Flame, Layers3, Radio, Route, Wind, X } from "lucide-react";
import { POLLINATOR_ROUTES, getAtlasSource } from "../lib/pollinatorAtlas";
import { MOCK_FIRE_SNAPSHOT } from "./mockFireSnapshot";
import styles from "./PollinatorAtlas.module.css";

const copy = {
  en: { title: "Pollinator Corridor Atlas", intro: "Follow the living routes across a changing planet.", layers: "Live layers", routes: "Explore routes", routeList: "Choose a pollinator route", close: "Close", source: "Read the route source", details: "Pollinator corridor", fire: "Wildfire events", clouds: "Clouds", rain: "Rainfall", smoke: "Aerosols", updated: "Updated", demo: "Demo fire data - not observed", noData: "Live fire data is unavailable.", atmosphere: "NASA Earthdata live atmosphere" },
  es: { title: "Atlas de corredores de polinizadores", intro: "Sigue las rutas vivas a traves de un planeta cambiante.", layers: "Capas en directo", routes: "Explorar rutas", routeList: "Elige una ruta de polinizadores", close: "Cerrar", source: "Leer la fuente de la ruta", details: "Corredor de polinizadores", fire: "Incendios forestales", clouds: "Nubes", rain: "Lluvia", smoke: "Aerosoles", updated: "Actualizado", demo: "Datos de incendios de demostracion", noData: "Los datos de incendios no estan disponibles.", atmosphere: "Atmosfera NASA Earthdata en directo" },
};

const emptySnapshot = { currentDetections: [] };
const atmosphereDate = new Date().toISOString().slice(0, 10);
const layers = [
  { id: "fire", Icon: Flame, label: (t) => t.fire },
  { id: "clouds", Icon: Cloud, label: (t) => t.clouds, source: "MODIS_Terra_CorrectedReflectance_TrueColor", matrix: "GoogleMapsCompatible_Level9", opacity: 0.24, format: "jpg" },
  { id: "rain", Icon: CloudRain, label: (t) => t.rain, source: "IMERG_Precipitation_Rate_30min", matrix: "GoogleMapsCompatible_Level6", opacity: 0.7, format: "png" },
  { id: "smoke", Icon: Wind, label: (t) => t.smoke, source: "MODIS_Terra_Aerosol", matrix: "GoogleMapsCompatible_Level6", opacity: 0.58, format: "png" },
];

export default function PollinatorAtlas({ locale = "en" }) {
  const language = locale === "es" ? "es" : "en";
  const t = copy[language];
  const mapNode = useRef(null);
  const map = useRef(null);
  const [ready, setReady] = useState(false);
  const [selectedRoute, setSelectedRoute] = useState(null);
  const [enabledRoutes, setEnabledRoutes] = useState(() => new Set(POLLINATOR_ROUTES.map((route) => route.id)));
  const [snapshot, setSnapshot] = useState(emptySnapshot);
  const [showRoutes, setShowRoutes] = useState(false);
  const [showLayers, setShowLayers] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [loading, setLoading] = useState(true);
  const [activeLayers, setActiveLayers] = useState({ fire: true, clouds: false, rain: false, smoke: false });

  useEffect(() => {
    let cancelled = false;
    fetch("/api/fire-snapshot").then((response) => response.json()).then((value) => { if (!cancelled) setSnapshot(value?.updatedAt ? value : MOCK_FIRE_SNAPSHOT); }).catch(() => { if (!cancelled) setSnapshot(MOCK_FIRE_SNAPSHOT); });
    return () => { cancelled = true; };
  }, []);

  useEffect(() => {
    const timeout = window.setTimeout(() => setLoading(false), 3200);
    return () => window.clearTimeout(timeout);
  }, []);

  useEffect(() => {
    if (map.current || !mapNode.current) return;
    const instance = new Map({ container: mapNode.current, style: "https://basemaps.cartocdn.com/gl/dark-matter-gl-style/style.json", center: [8, 20], zoom: 0.65, attributionControl: false });
    instance.addControl(new NavigationControl({ showCompass: false }), "bottom-right");
    instance.on("load", () => {
      layers.filter(({ source }) => source).forEach(({ id, source, matrix, opacity, format }) => {
        instance.addSource(`atmosphere-${id}`, { type: "raster", tiles: [`https://gibs.earthdata.nasa.gov/wmts/epsg3857/best/${source}/default/${atmosphereDate}/${matrix}/{z}/{y}/{x}.${format}`], tileSize: 256, maxzoom: Number(matrix.match(/\d+$/)?.[0]) });
        instance.addLayer({ id: `atmosphere-${id}`, type: "raster", source: `atmosphere-${id}`, paint: { "raster-opacity": opacity } });
      });
      POLLINATOR_ROUTES.forEach((route) => {
        instance.addSource(route.id, { type: "geojson", data: route.geometry });
        instance.addLayer({ id: route.id, type: "line", source: route.id, paint: { "line-color": route.color, "line-width": 2.4, "line-opacity": 0.58, "line-blur": route.dashed ? 0.35 : 0.1, "line-dasharray": route.dashed ? [2, 2] : [1, 0] } });
      });
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
      map.current = instance;
      setReady(true);
      instance.flyTo({ center: [8, 20], zoom: 1.35, duration: 2600, essential: false });
      window.setTimeout(() => setLoading(false), 1150);
    });
    return () => instance.remove();
  }, []);

  useEffect(() => {
    if (!ready || !map.current) return;
    POLLINATOR_ROUTES.forEach((route) => {
      map.current.setLayoutProperty(route.id, "visibility", enabledRoutes.has(route.id) ? "visible" : "none");
      map.current.setPaintProperty(route.id, "line-width", route.id === selectedRoute ? 4.25 : 2.2);
      map.current.setPaintProperty(route.id, "line-opacity", route.id === selectedRoute ? 1 : 0.42);
    });
  }, [enabledRoutes, ready, selectedRoute]);

  useEffect(() => {
    if (!ready || !map.current) return;
    layers.forEach(({ id, source }) => {
      const ids = source ? [`atmosphere-${id}`] : ["current-fire", "current-fire-halo", "current-fire-clusters", "current-fire-cluster-count"];
      ids.forEach((layerId) => map.current.setLayoutProperty(layerId, "visibility", activeLayers[id] ? "visible" : "none"));
    });
  }, [activeLayers, ready]);

  useEffect(() => {
    if (!ready || !map.current) return;
    map.current.getSource("current-fire").setData({ type: "FeatureCollection", features: (snapshot.currentDetections || []).map((point) => ({ type: "Feature", properties: point, geometry: { type: "Point", coordinates: [point.longitude, point.latitude] } })) });
  }, [ready, snapshot]);

  const route = selectedRoute ? POLLINATOR_ROUTES.find((item) => item.id === selectedRoute) : null;
  const source = route ? getAtlasSource(route.sourceId) : null;
  const toggleRoute = (id) => setEnabledRoutes((current) => { const next = new Set(current); if (next.has(id)) next.delete(id); else next.add(id); return next; });
  const chooseRoute = (id) => { setSelectedRoute(id); setShowDetails(true); setShowRoutes(false); };
  const toggleLayer = (id) => setActiveLayers((current) => ({ ...current, [id]: !current[id] }));
  const status = snapshot.isDemo ? t.demo : snapshot.updatedAt ? `${snapshot.status || "Live data"} - ${t.updated} ${new Date(snapshot.updatedAt).toLocaleString(language)}` : t.noData;

  return <main className={styles.page} data-atlas>
    <section className={styles.atlas} aria-label={t.title}>
      <div className={styles.map} ref={mapNode} />
      <div className={`${styles.loading} ${loading ? "" : styles.loadingDone}`} aria-hidden="true"><b>Pollinator Corridor Atlas</b></div>
      <header className={styles.topbar}><div><h1>{t.title}</h1><p className={styles.intro}>{t.intro}</p><p className={styles.liveStatus}><Radio aria-hidden="true" />{status}</p></div><div className={styles.actions}><button type="button" className={showLayers ? styles.activeAction : ""} onClick={() => { setShowLayers((value) => !value); setShowRoutes(false); }} aria-expanded={showLayers}><Layers3 />{t.layers}</button><button type="button" className={showRoutes ? styles.activeAction : ""} onClick={() => { setShowRoutes((value) => !value); setShowLayers(false); }} aria-expanded={showRoutes}><Route />{t.routes}</button></div></header>
      {showLayers ? <aside className={styles.layersPanel} aria-label={t.layers}><div className={styles.panelHeading}><span>{t.layers}</span><button type="button" onClick={() => setShowLayers(false)} aria-label={t.close}><X /></button></div>{layers.map(({ id, Icon, label }) => <button type="button" key={id} className={activeLayers[id] ? styles.layerOn : ""} onClick={() => toggleLayer(id)} aria-pressed={activeLayers[id]}><Icon /><span>{label(t)}</span><i aria-hidden="true" /></button>)}</aside> : null}
      {showRoutes ? <aside className={styles.routePicker} aria-label={t.routeList}><div className={styles.panelHeading}><span>{t.routeList}</span><button type="button" onClick={() => setShowRoutes(false)} aria-label={t.close}><X /></button></div><div className={styles.routeList}>{POLLINATOR_ROUTES.map((item) => <div key={item.id} className={selectedRoute === item.id ? styles.activeRoute : ""}><label><input type="checkbox" checked={enabledRoutes.has(item.id)} onChange={() => toggleRoute(item.id)} /><span style={{ background: item.color }} /></label><button type="button" onClick={() => chooseRoute(item.id)}>{item.name[language]}</button></div>)}</div></aside> : null}
      {route && showDetails ? <article className={styles.detail} aria-live="polite"><button type="button" className={styles.closeDetail} onClick={() => setShowDetails(false)} aria-label={t.close}><X /></button><p>{t.details}</p><h2>{route.name[language]}</h2><em>{route.scientificName}</em><span className={styles.routeKey}><i style={{ background: route.color }} />{route.method[language]}</span><strong className={styles.routeSeason}>{route.season?.[language]}</strong><span className={styles.routeSummary}>{route.summary?.[language]}</span><span className={styles.routeCaveat}>{source.status}</span><a href={`/sources/${source.id}`}>{t.source} <span aria-hidden="true">-&gt;</span></a></article> : <p className={styles.mapPrompt}>{t.routes}</p>}
      <p className={styles.atmosphereSource}>{t.atmosphere} - {atmosphereDate}</p>
    </section>
  </main>;
}
