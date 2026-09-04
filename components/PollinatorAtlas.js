"use client";

import "maplibre-gl/dist/maplibre-gl.css";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { Map as MapLibre, Marker, NavigationControl, Popup } from "maplibre-gl";
import { Flame, Layers3, Radio, Route, X } from "lucide-react";
import { POLLINATOR_ROUTES, getAtlasSource } from "../lib/pollinatorAtlas";
import { MOCK_FIRE_SNAPSHOT } from "./mockFireSnapshot";
import styles from "./PollinatorAtlas.module.css";

const copy = {
  en: { title: "Pollinator Corridor Atlas", intro: "Follow the living routes across a changing planet.", layers: "Live data", routes: "Explore routes", routeList: "Choose a pollinator route", close: "Close", source: "Read the route source", details: "Pollinator corridor", fire: "Wildfire events", updated: "Updated", demo: "Demo fire data - not observed", noData: "Live fire data is unavailable.", atmosphere: "NASA Blue Marble surface · NASA FIRMS 24h detections" },
  es: { title: "Atlas de corredores de polinizadores", intro: "Sigue las rutas vivas a traves de un planeta cambiante.", layers: "Datos en directo", routes: "Explorar rutas", routeList: "Elige una ruta de polinizadores", close: "Cerrar", source: "Leer la fuente de la ruta", details: "Corredor de polinizadores", fire: "Incendios forestales", updated: "Actualizado", demo: "Datos de incendios de demostracion", noData: "Los datos de incendios no estan disponibles.", atmosphere: "Superficie NASA Blue Marble · detecciones NASA FIRMS de 24 h" },
};

const emptySnapshot = { currentDetections: [] };
const layers = [
  { id: "fire", Icon: Flame, label: (t) => t.fire },
];
const globeStyle = { version: 8, sources: { "blue-marble": { type: "raster", tiles: ["https://gibs.earthdata.nasa.gov/wmts/epsg3857/best/BlueMarble_ShadedRelief_Bathymetry/default/2018-01-01/GoogleMapsCompatible_Level8/{z}/{y}/{x}.jpeg"], tileSize: 256, maxzoom: 8 } }, layers: [{ id: "space", type: "background", paint: { "background-color": "#020806" } }, { id: "blue-marble", type: "raster", source: "blue-marble", paint: { "raster-saturation": -0.1, "raster-contrast": 0.08 } }] };
const storyStages = { en: ["Pollination", "Refuel", "Crossing", "Arrival"], es: ["Polinización", "Recarga", "Travesía", "Llegada"] };
const storyImage = (route) => `/pollinators/stories/${route.id}.png`;

export default function PollinatorAtlas({ locale = "en" }) {
  const language = locale === "es" ? "es" : "en";
  const t = copy[language];
  const mapNode = useRef(null);
  const map = useRef(null);
  const fireMarkers = useRef(new Map());
  const [ready, setReady] = useState(false);
  const [selectedRoute, setSelectedRoute] = useState(null);
  const [enabledRoutes, setEnabledRoutes] = useState(() => new Set(POLLINATOR_ROUTES.map((route) => route.id)));
  const [snapshot, setSnapshot] = useState(emptySnapshot);
  const [showRoutes, setShowRoutes] = useState(false);
  const [showLayers, setShowLayers] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [hoveredRoute, setHoveredRoute] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeLayers, setActiveLayers] = useState({ fire: true });
  const [mapZoom, setMapZoom] = useState(1.35);
  const [viewVersion, setViewVersion] = useState(0);

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
    const instance = new MapLibre({ container: mapNode.current, style: globeStyle, center: [8, 20], zoom: 0.65, projection: "globe", renderWorldCopies: false, attributionControl: false });
    const markers = fireMarkers.current;
    instance.addControl(new NavigationControl({ showCompass: false }), "bottom-right");
    instance.on("load", () => {
      POLLINATOR_ROUTES.forEach((route) => {
        instance.addSource(route.id, { type: "geojson", data: route.geometry });
        instance.addLayer({ id: `${route.id}-hit`, type: "line", source: route.id, paint: { "line-color": "#ffffff", "line-width": 18, "line-opacity": 0.01 } });
        instance.addLayer({ id: route.id, type: "line", source: route.id, paint: { "line-color": route.color, "line-width": 2.4, "line-opacity": 0.58, "line-blur": route.dashed ? 0.35 : 0.1, "line-dasharray": route.dashed ? [2, 2] : [1, 0] } });
        instance.on("mouseenter", `${route.id}-hit`, (event) => { instance.getCanvas().style.cursor = "pointer"; setHoveredRoute({ id: route.id, x: event.point.x, y: event.point.y }); });
        instance.on("mousemove", `${route.id}-hit`, (event) => setHoveredRoute({ id: route.id, x: event.point.x, y: event.point.y }));
        instance.on("mouseleave", `${route.id}-hit`, () => { instance.getCanvas().style.cursor = ""; setHoveredRoute(null); });
        instance.on("click", `${route.id}-hit`, () => { setSelectedRoute(route.id); setShowDetails(true); setShowRoutes(false); });
      });
      instance.addSource("current-fire", { type: "geojson", data: { type: "FeatureCollection", features: [] }, cluster: true, clusterMaxZoom: 4, clusterRadius: 52 });
      instance.addLayer({ id: "current-fire-clusters", type: "circle", source: "current-fire", filter: ["has", "point_count"], paint: { "circle-color": "#e76f2e", "circle-radius": ["step", ["get", "point_count"], 7, 100, 11, 1000, 16], "circle-opacity": 0.78, "circle-stroke-color": "#ffd18a", "circle-stroke-width": 0.75 } });
      instance.addLayer({ id: "current-fire-embers", type: "circle", source: "current-fire", filter: ["!", ["has", "point_count"]], paint: { "circle-color": "#ff8c32", "circle-radius": ["interpolate", ["linear"], ["zoom"], 0, 1.5, 4, 3.5, 8, 6], "circle-opacity": 0.88, "circle-blur": 0.18, "circle-stroke-color": "#ffe1a6", "circle-stroke-width": 0.45 } });
      instance.on("click", "current-fire-embers", (event) => {
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
      instance.on("mouseenter", "current-fire-embers", () => { instance.getCanvas().style.cursor = "pointer"; });
      instance.on("mouseleave", "current-fire-embers", () => { instance.getCanvas().style.cursor = ""; });
      instance.on("moveend", () => { setMapZoom(instance.getZoom()); setViewVersion((value) => value + 1); });
      map.current = instance;
      setReady(true);
      instance.flyTo({ center: [8, 20], zoom: 1.35, duration: 2600, essential: false });
      window.setTimeout(() => setLoading(false), 1150);
    });
    return () => { markers.forEach((marker) => marker.remove()); instance.remove(); };
  }, []);

  useEffect(() => {
    if (!ready || !map.current) return;
    POLLINATOR_ROUTES.forEach((route) => {
      if (!map.current.getLayer(`${route.id}-hit`) || !map.current.getLayer(route.id)) return;
      map.current.setLayoutProperty(`${route.id}-hit`, "visibility", enabledRoutes.has(route.id) ? "visible" : "none");
      map.current.setLayoutProperty(route.id, "visibility", enabledRoutes.has(route.id) ? "visible" : "none");
      map.current.setPaintProperty(route.id, "line-width", route.id === selectedRoute || route.id === hoveredRoute?.id ? 4.25 : 2.2);
      map.current.setPaintProperty(route.id, "line-opacity", route.id === selectedRoute || route.id === hoveredRoute?.id ? 1 : 0.42);
    });
  }, [enabledRoutes, hoveredRoute, ready, selectedRoute]);

  useEffect(() => {
    if (!ready || !map.current) return;
    layers.forEach(({ id }) => {
      const ids = ["current-fire-embers", "current-fire-clusters"];
      ids.forEach((layerId) => map.current.setLayoutProperty(layerId, "visibility", activeLayers[id] ? "visible" : "none"));
    });
  }, [activeLayers, ready]);

  useEffect(() => {
    if (!ready || !map.current) return;
    map.current.getSource("current-fire").setData({ type: "FeatureCollection", features: (snapshot.currentDetections || []).map((point) => ({ type: "Feature", properties: point, geometry: { type: "Point", coordinates: [point.longitude, point.latitude] } })) });
  }, [ready, snapshot]);

  useEffect(() => {
    if (!ready || !map.current) return;
    if (!activeLayers.fire || mapZoom < 2.75) { fireMarkers.current.forEach((marker) => marker.remove()); fireMarkers.current.clear(); return; }
    const detections = (snapshot.currentDetections || []).filter((point) => map.current.getBounds().contains([point.longitude, point.latitude])).slice(0, 24);
    const ids = new Set(detections.map((point) => point.eventId || `${point.longitude}:${point.latitude}`));
    fireMarkers.current.forEach((marker, id) => { if (!ids.has(id)) { marker.remove(); fireMarkers.current.delete(id); } });
    detections.forEach((point) => {
      const id = point.eventId || `${point.longitude}:${point.latitude}`;
      if (fireMarkers.current.has(id)) return;
      const element = document.createElement("span");
      element.className = styles.fireMarker;
      element.setAttribute("aria-hidden", "true");
      const flame = document.createElement("span");
      flame.className = styles.fireFlame;
      element.append(flame);
      fireMarkers.current.set(id, new Marker({ element, anchor: "bottom" }).setLngLat([point.longitude, point.latitude]).addTo(map.current));
    });
  }, [activeLayers.fire, mapZoom, ready, snapshot, viewVersion]);

  const route = selectedRoute ? POLLINATOR_ROUTES.find((item) => item.id === selectedRoute) : null;
  const hovered = hoveredRoute ? POLLINATOR_ROUTES.find((item) => item.id === hoveredRoute.id) : null;
  const hoverCardStyle = hoveredRoute ? { left: `${Math.max(18, Math.min(hoveredRoute.x + 18, window.innerWidth - 440))}px`, top: `${Math.max(126, Math.min(hoveredRoute.y + 18, window.innerHeight - 210))}px` } : undefined;
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
      {hovered && !showDetails ? <aside className={styles.glimpse} style={hoverCardStyle} aria-live="polite"><Image src={storyImage(hovered)} alt="" width={640} height={640} sizes="(max-width:760px) 32vw, 124px" /><div><span>{hovered.scientificName}</span><strong>{hovered.name[language]}</strong><p>{hovered.summary?.[language]}</p></div></aside> : null}
      {route && showDetails ? <article className={styles.detail} aria-live="polite"><button type="button" className={styles.closeDetail} onClick={() => setShowDetails(false)} aria-label={t.close}><X /></button><p>{t.details}</p><h2>{route.name[language]}</h2><em>{route.scientificName}</em><span className={styles.routeKey}><i style={{ background: route.color }} />{route.method[language]}</span><strong className={styles.routeSeason}>{route.season?.[language]}</strong><span className={styles.routeSummary}>{route.summary?.[language]}</span><section className={styles.storyScenes} aria-label={`${route.name[language]} journey`}><div role="img" aria-label={`${storyStages[language][0]}: ${route.name[language]}`} style={{ backgroundImage: `url(${storyImage(route)})`, backgroundPosition: "0 0" }}><span>{storyStages[language][0]}</span></div><div role="img" aria-label={`${storyStages[language][1]}: ${route.name[language]}`} style={{ backgroundImage: `url(${storyImage(route)})`, backgroundPosition: "100% 0" }}><span>{storyStages[language][1]}</span></div><div role="img" aria-label={`${storyStages[language][2]}: ${route.name[language]}`} style={{ backgroundImage: `url(${storyImage(route)})`, backgroundPosition: "0 100%" }}><span>{storyStages[language][2]}</span></div><div role="img" aria-label={`${storyStages[language][3]}: ${route.name[language]}`} style={{ backgroundImage: `url(${storyImage(route)})`, backgroundPosition: "100% 100%" }}><span>{storyStages[language][3]}</span></div></section><span className={styles.routeCaveat}>{source.status}</span><a href={`/sources/${source.id}`}>{t.source} <span aria-hidden="true">-&gt;</span></a></article> : <p className={styles.mapPrompt}>{t.routes}</p>}
      <p className={styles.atmosphereSource}>{t.atmosphere}</p>
    </section>
  </main>;
}
