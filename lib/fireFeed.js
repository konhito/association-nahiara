export const PAGE_SIZE = 5000;
export function parseFirms(csv) {
  const [header, ...rows] = csv.trim().split(/\r?\n/).map(line => line.split(','));
  const index = Object.fromEntries(header.map((name, i) => [name.trim(), i]));
  for (const name of ['latitude', 'longitude', 'acq_date', 'acq_time']) {
    if (index[name] === undefined) throw new Error(`Missing FIRMS column: ${name}`);
  }
  return rows.flatMap(row => {
    const latitude = Number(row[index.latitude]);
    const longitude = Number(row[index.longitude]);
    const time = (row[index.acq_time] || '').padStart(4, '0');
    const detectedAt = `${row[index.acq_date]}T${time.slice(0, 2)}:${time.slice(2)}:00Z`;
    if (!row[index.latitude] || !row[index.longitude] || !Number.isFinite(latitude) || !Number.isFinite(longitude) || Math.abs(latitude) > 90 || Math.abs(longitude) > 180 || !Number.isFinite(Date.parse(detectedAt))) return [];
    return [{ longitude, latitude, detectedAt, confidence: row[index.confidence] || null, frp: Number(row[index.frp]) || null }];
  });
}
export function pageFeed(feed, page) {
  const totalDetections = feed.currentDetections.length;
  const pageCount = Math.max(1, Math.ceil(totalDetections / PAGE_SIZE));
  return { ...feed, totalDetections, pageCount, page, currentDetections: feed.currentDetections.slice(page * PAGE_SIZE, (page + 1) * PAGE_SIZE) };
}
