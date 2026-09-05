const radians = (degrees) => degrees * Math.PI / 180;
const radius = 6371.0088;
export function distanceKm(a, b) {
  const dLat = radians(b[1] - a[1]);
  const dLon = radians(b[0] - a[0]);
  const h = Math.sin(dLat / 2) ** 2 + Math.cos(radians(a[1])) * Math.cos(radians(b[1])) * Math.sin(dLon / 2) ** 2;
  return radius * 2 * Math.asin(Math.sqrt(Math.min(1, h)));
}
function bearing(a, b) {
  const delta = radians(b[0] - a[0]);
  return Math.atan2(Math.sin(delta) * Math.cos(radians(b[1])), Math.cos(radians(a[1])) * Math.sin(radians(b[1])) - Math.sin(radians(a[1])) * Math.cos(radians(b[1])) * Math.cos(delta));
}
export function routeDistanceKm(point, coordinates) {
  let nearest = Infinity;
  for (let i = 0; i < coordinates.length; i++) {
    const start = coordinates[i];
    const fromStart = distanceKm(start, point);
    nearest = Math.min(nearest, fromStart);
    if (!i) continue;
    const end = coordinates[i - 1];
    const length = distanceKm(start, end);
    if (!length) continue;
    const angle = bearing(start, point) - bearing(start, end);
    const along = Math.atan2(Math.sin(fromStart / radius) * Math.cos(angle), Math.cos(fromStart / radius)) * radius;
    if (along >= 0 && along <= length) nearest = Math.min(nearest, Math.abs(Math.asin(Math.max(-1, Math.min(1, Math.sin(fromStart / radius) * Math.sin(angle))))) * radius);
  }
  return nearest;
}

// A conservative spherical cap excludes distant points before checking the path.
export function withinRouteKm(coordinates, limit) {
  if (!coordinates.length) return () => false;
  const origin = coordinates[0];
  let cap = limit;
  for (let i = 0; i < coordinates.length; i++) {
    cap = Math.max(cap, distanceKm(origin, coordinates[i]) + (i ? distanceKm(coordinates[i - 1], coordinates[i]) : 0) + limit);
  }
  return point => distanceKm(origin, point) <= cap && routeDistanceKm(point, coordinates) <= limit;
}
