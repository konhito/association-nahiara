import { Baskervville } from "next/font/google";
import VeguetaWeekendContent from "./VeguetaWeekendContent";

const displayFont = Baskervville({ subsets: ["latin"], weight: ["400"] });
const pageUrl = "https://asociacionnahiara.org/eventos/fin-de-semana-vegueta-2026";
const marketPoster = "/events/vegueta-weekend-2026/flower-market.jpeg";
const animalsPoster = "/events/vegueta-weekend-2026/de-patas-vegueta.png";
const location = {
  "@type": "Place",
  name: "Plaza de Santo Domingo, Vegueta",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Las Palmas de Gran Canaria",
    addressRegion: "Gran Canaria, Canary Islands",
    addressCountry: "ES",
  },
};

export const metadata = {
  title: "A Weekend in Vegueta · Flowers and Animal Welfare | Universo Nahiara",
  description:
    "Join Universo Nahiara at Plaza de Santo Domingo, Vegueta, on October 10 and 11, 2026, for the Flower and Second-Hand Clothing Market and De patas por Vegueta.",
  alternates: { canonical: pageUrl },
  openGraph: {
    type: "website",
    url: pageUrl,
    title: "A Weekend in Vegueta · October 10–11, 2026",
    description:
      "Two family days for sustainability, flowers, and animal welfare at Plaza de Santo Domingo.",
    images: [
      {
        url: marketPoster,
        width: 1054,
        height: 1536,
        alt: "Flower and Second-Hand Clothing Market poster",
      },
      {
        url: animalsPoster,
        width: 1123,
        height: 1408,
        alt: "De patas por Vegueta family day poster",
      },
    ],
  },
};

const eventStructuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Event",
      name: "Flower and Second-Hand Clothing Market",
      startDate: "2026-10-10T10:00:00+01:00",
      endDate: "2026-10-10T16:00:00+01:00",
      eventStatus: "https://schema.org/EventScheduled",
      eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
      isAccessibleForFree: true,
      image: [marketPoster],
      location,
    },
    {
      "@type": "Event",
      name: "De patas por Vegueta · Family Day",
      startDate: "2026-10-11T10:00:00+01:00",
      endDate: "2026-10-11T15:00:00+01:00",
      eventStatus: "https://schema.org/EventScheduled",
      eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
      isAccessibleForFree: true,
      image: [animalsPoster],
      location,
    },
  ],
};

export default function VeguetaWeekendPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(eventStructuredData) }}
      />
      <VeguetaWeekendContent displayFontClassName={displayFont.className} />
    </>
  );
}
