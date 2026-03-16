export default function sitemap() {
  const baseUrl = 'https://asociacionnahiara.org';
  
  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
      alternates: {
        languages: {
          en: `${baseUrl}`,
          es: `${baseUrl}?lang=es`,
          fr: `${baseUrl}?lang=fr`,
          de: `${baseUrl}?lang=de`,
          zh: `${baseUrl}?lang=zh`,
          it: `${baseUrl}?lang=it`,
        },
      },
    },
  ];
}
