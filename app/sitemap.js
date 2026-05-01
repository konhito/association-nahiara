export default function sitemap() {
  const baseUrl = 'https://asociacionnahiara.org';
  
  const routes = [
    '',
    '/galeria-dibujos',
    '/evento-dibuja-flor',
    '/dibuja-la-flor-de-tu-pais',
    '/alianzas-academicas-e-institucionales',
    '/territories',
    '/press',
    '/sant-jordi-2026'
  ];

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: route === '' ? 'weekly' : 'monthly',
    priority: route === '' ? 1 : 0.8,
    alternates: {
      languages: {
        en: `${baseUrl}${route}`,
        es: `${baseUrl}${route}?lang=es`,
        fr: `${baseUrl}${route}?lang=fr`,
        de: `${baseUrl}${route}?lang=de`,
        zh: `${baseUrl}${route}?lang=zh`,
        it: `${baseUrl}${route}?lang=it`,
      },
    },
  }));
}
