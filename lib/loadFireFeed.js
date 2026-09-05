export async function loadFireFeed(signal, onProgress = () => {}, fetcher = fetch) {
  try {
    return await downloadFireFeed(signal, onProgress, fetcher);
  } catch (error) {
    // A source rollover is normal. Restart once instead of mixing versions.
    if (error.status !== 409 || signal?.aborted) throw error;
    return downloadFireFeed(signal, onProgress, fetcher);
  }
}

async function downloadFireFeed(signal, onProgress, fetcher) {
  const read = async (url) => {
    const response = await fetcher(url, { signal, cache: 'no-store' });
    if (!response.ok) throw Object.assign(new Error(`Fire feed: ${response.status}`), { status: response.status });
    return response.json();
  };
  const first = await read('/api/fire-snapshot?page=0');
  const points = [...first.currentDetections];
  onProgress(points.length, first.totalDetections);
  for (let start = 1; start < first.pageCount; start += 3) {
    const pages = await Promise.all(Array.from({ length: Math.min(3, first.pageCount - start) }, (_, index) => read(`/api/fire-snapshot?page=${start + index}&version=${encodeURIComponent(first.version)}`)));
    for (const page of pages) {
      if (page.version !== first.version || page.totalDetections !== first.totalDetections) throw new Error('Fire feed changed during download');
      points.push(...page.currentDetections);
    }
    onProgress(points.length, first.totalDetections);
  }
  if (points.length !== first.totalDetections) throw new Error('Incomplete fire feed');
  return { ...first, currentDetections: points.map((point, index) => ({ ...point, dataSource: point.dataSource || 'NASA FIRMS Suomi-NPP VIIRS', eventId: `${first.version}-${index}` })) };
}
