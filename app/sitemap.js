import { ATLAS_SOURCES } from "../lib/pollinatorAtlas";

const LAUNCH_SLUGS = [
  'spain', 'germany', 'peru', 'scotland',
  'pakistan', 'jamaica', 'tanzania', 'nicaragua',
];

export default function sitemap() {
  const baseUrl = 'https://asociacionnahiara.org';

  const staticRoutes = [
    { path: '', freq: 'weekly', priority: 1 },
    { path: '/archive', freq: 'weekly', priority: 0.95 },
    { path: '/dia-de-todos-los-polinizadores', freq: 'weekly', priority: 0.92 },
    { path: '/reloj-dia-de-todos-los-polinizadores', freq: 'daily', priority: 0.9 },
    { path: '/eventos/dia-de-los-polinizadores-2026', freq: 'weekly', priority: 0.9 },
    { path: '/galeria-dibujos', freq: 'monthly', priority: 0.8 },
    { path: '/evento-dibuja-flor', freq: 'monthly', priority: 0.8 },
    { path: '/dibuja-la-flor-de-tu-pais', freq: 'monthly', priority: 0.8 },
    { path: '/alianzas-academicas-e-institucionales', freq: 'monthly', priority: 0.7 },
    { path: '/territories', freq: 'monthly', priority: 0.8 },
    { path: '/press', freq: 'monthly', priority: 0.75 },
    { path: '/sant-jordi-2026', freq: 'monthly', priority: 0.75 },
    { path: '/eventos/guardianes-de-las-flores-2026', freq: 'monthly', priority: 0.8 },
    { path: '/pollinator-corrdor', freq: 'weekly', priority: 0.9 },
  ];

  const archiveProfiles = LAUNCH_SLUGS.map(slug => ({
    path: `/archive/${slug}`,
    freq: 'monthly',
    priority: 0.9,
  }));

  const atlasSources = ATLAS_SOURCES.map(({ id }) => ({ path: `/sources/${id}`, freq: 'monthly', priority: 0.65 }));
  const allRoutes = [...staticRoutes, ...archiveProfiles, ...atlasSources];

  return allRoutes.map(({ path, freq, priority }) => ({
    url: `${baseUrl}${path}`,
    lastModified: new Date(),
    changeFrequency: freq,
    priority,
    alternates: {
      languages: {
        en: `${baseUrl}${path}`,
        es: `${baseUrl}${path}?lang=es`,
        de: `${baseUrl}${path}?lang=de`,
      },
    },
  }));
}
