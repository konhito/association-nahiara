import Image from "next/image";
import Link from "next/link";
import { Baskervville } from "next/font/google";
import { ArrowLeft, ArrowUpRight, CalendarDays, Clock3, MapPin } from "lucide-react";

const displayFont = Baskervville({ subsets: ["latin"], weight: ["400"] });
const pageUrl = "https://asociacionnahiara.org/eventos/mercado-del-coleccionismo-2026";
const poster = "/events/mercado-del-coleccionismo-2026/poster.jpeg";
const programPoster = "/events/mercado-del-coleccionismo-2026/program.jpeg";
const mapUrl = "https://www.google.com/maps/place//data=!4m2!3m1!1s0xc409f01efa5188d:0xa81b7061662fa300?entry=gemini&utm_source=gemini&utm_campaign=gem-default";

const program = [
  {
    en: "Inflatables and children's activities: workshops, games, stencil tattoos, face painting and glitter.",
    es: "Hinchables y actividades infantiles: talleres, juegos, tatuajes con plantillas, pintacaras y glitter.",
  },
  {
    en: "World dance performances by Macondo, Casa Argentina El Ombú and Cubacan.",
    es: "Exhibiciones de bailes del mundo a cargo de Macondo, Grupo de danzas Casa Argentina El Ombú y Cubacan.",
  },
  {
    en: "Live concerts with Madera Criolla and Raigal.",
    es: "Conciertos con Madera Criolla y Raigal.",
  },
  {
    en: "Food trucks and traditional Colombian and Venezuelan food.",
    es: "Food trucks y comida típica de Colombia y Venezuela.",
  },
  {
    en: "Charity raffles and prize draws.",
    es: "Rifas y sorteos benéficos.",
  },
];

export const metadata = {
  title: "Collectors’ Market 2026 for Colombia and Venezuela | Universo Nahiara",
  description:
    "Join the Mercado del Coleccionismo at La Karpa, Vecindario, on 4 October 2026. See the activities, find our educational stand and get directions.",
  alternates: { canonical: pageUrl },
  openGraph: {
    type: "website",
    url: pageUrl,
    title: "Mercado del Coleccionismo · 4 October 2026",
    description:
      "A family-friendly charity event for Colombia and Venezuela at La Karpa, Vecindario.",
    images: [{ url: poster, width: 1439, height: 1778, alt: "Mercado del Coleccionismo event poster" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Mercado del Coleccionismo · 4 October 2026",
    description: "A charity event for Colombia and Venezuela at La Karpa, Vecindario.",
    images: [poster],
  },
};

const eventJsonLd = {
  "@context": "https://schema.org",
  "@type": "Event",
  name: "Mercado del Coleccionismo — charity event for Colombia and Venezuela",
  startDate: "2026-10-04T10:00:00+01:00",
  endDate: "2026-10-04T18:00:00+01:00",
  eventStatus: "https://schema.org/EventScheduled",
  eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
  url: pageUrl,
  image: [poster, programPoster],
  inLanguage: ["en", "es"],
  description:
    "A family-friendly charity market with children's activities, world dances, live music and food, supporting Colombia and Venezuela.",
  location: {
    "@type": "Place",
    name: "La Karpa, Vecindario",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Santa Lucía de Tirajana",
      addressRegion: "Gran Canaria, Canary Islands",
      addressCountry: "ES",
    },
    sameAs: mapUrl,
  },
};

function Fact({ icon: Icon, label, primary, secondary }) {
  return (
    <div className="border border-white/12 bg-white/[0.04] p-4">
      <dt className="flex items-center gap-2 text-[#f0c858]">
        <Icon aria-hidden="true" className="h-4 w-4" />
        <span className="text-[0.68rem] font-semibold uppercase tracking-[0.15em]">{label}</span>
      </dt>
      <dd className="mt-3 text-base font-medium text-[#fffaf0]">{primary}</dd>
      <dd lang="es" className="mt-1 text-sm leading-6 text-[#ddd7ca]">{secondary}</dd>
    </div>
  );
}

export default function MercadoDelColeccionismoPage() {
  return (
    <main className="min-h-screen bg-[#f5f1e8] text-[#13352d]">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(eventJsonLd) }} />

      <section className="relative overflow-hidden bg-[#072c26] text-[#f7f4ec]">
        <div aria-hidden="true" className="absolute inset-0 bg-[radial-gradient(circle_at_15%_20%,rgba(196,140,70,0.18),transparent_30%),radial-gradient(circle_at_85%_70%,rgba(217,97,82,0.12),transparent_30%)]" />
        <div className="relative mx-auto max-w-7xl px-4 pb-16 pt-6 md:px-6 md:pb-24 md:pt-8">
          <Link href="/" className="inline-flex items-center gap-2 text-sm font-medium text-[#e8e0cf] transition hover:text-white">
            <ArrowLeft aria-hidden="true" className="h-4 w-4" /> Association home
          </Link>

          <div className="mt-10 grid items-center gap-10 lg:grid-cols-[1fr_0.78fr] lg:gap-16">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#f0c858]">Public benefit event · Evento benéfico</p>
              <h1 className={`${displayFont.className} mt-5 text-[clamp(3rem,6vw,5.8rem)] leading-[0.98] tracking-[-0.03em] text-[#fffaf0]`}>
                Collectors’ Market
              </h1>
              <p lang="es" className="mt-3 text-xl text-[#f0c858]">Mercado del Coleccionismo</p>
              <p className="mt-5 max-w-2xl text-lg leading-8 text-[#e4e1d7]">
                A family day in support of people affected by natural disasters in Colombia and Venezuela.
              </p>
              <p lang="es" className="mt-2 max-w-2xl text-base leading-7 text-[#c9d3cc]">
                Una jornada familiar y solidaria en apoyo a las personas afectadas por catástrofes naturales en Colombia y Venezuela.
              </p>

              <dl className="mt-8 grid gap-3 sm:grid-cols-3">
                <Fact icon={CalendarDays} label="Date · Fecha" primary="Sunday, October 4, 2026" secondary="Domingo 4 de octubre de 2026" />
                <Fact icon={Clock3} label="Time · Horario" primary="10:00 a.m.–6:00 p.m." secondary="De 10:00 a 18:00 h" />
                <Fact icon={MapPin} label="Venue · Lugar" primary="La Karpa · Vecindario" secondary="Santa Lucía de Tirajana, Gran Canaria" />
              </dl>

              <a href={mapUrl} target="_blank" rel="noreferrer" className="mt-6 inline-flex min-h-12 items-center gap-2 bg-[#d6b56d] px-5 py-3 text-sm font-semibold text-[#17342d] transition hover:bg-[#e4c986] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#f0c858]">
                <MapPin aria-hidden="true" className="h-4 w-4" /> Open location in Google Maps <ArrowUpRight aria-hidden="true" className="h-4 w-4" />
              </a>
            </div>

            <figure className="mx-auto w-full max-w-[31rem]">
              <Image src={poster} alt="Official poster for the Mercado del Coleccionismo charity event on 4 October 2026 at La Karpa, Vecindario" width={1439} height={1778} priority sizes="(max-width: 1024px) 90vw, 480px" className="h-auto w-full rounded-sm" />
              <figcaption className="mt-3 text-center text-xs text-[#ddd7ca]">Official event poster · Cartel oficial del evento</figcaption>
            </figure>
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-10 px-4 py-14 md:px-6 md:py-20 lg:grid-cols-[1fr_0.7fr] lg:gap-16">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#9a7330]">Activities · Actividades</p>
          <h2 className={`${displayFont.className} mt-3 text-[clamp(2.4rem,4.5vw,4.3rem)] leading-[1] tracking-[-0.025em] text-[#13352d]`}>
            A day to enjoy together
          </h2>
          <p lang="es" className="mt-2 text-lg text-[#9a7330]">Una jornada para disfrutar en familia</p>
          <ul className="mt-7">
            {program.map((item) => (
              <li key={item.en} className="border-t border-[#d6c7a1] py-4">
                <p className="text-base leading-7 text-[#284239]">{item.en}</p>
                <p lang="es" className="mt-1 text-sm leading-6 text-[#5b6d63]">{item.es}</p>
              </li>
            ))}
          </ul>
        </div>

        <figure className="mx-auto w-full max-w-[28rem] lg:pt-12">
          <Image src={programPoster} alt="Official programme of activities for the Mercado del Coleccionismo charity event" width={1439} height={1790} sizes="(max-width: 1024px) 90vw, 430px" className="h-auto w-full rounded-sm" />
          <figcaption className="mt-3 text-center text-sm text-[#50655d]">Official activities programme · Programa oficial</figcaption>
        </figure>
      </section>

      <section className="bg-[#eae4d7]">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 md:px-6 md:py-18 lg:grid-cols-2 lg:gap-16">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#9a7330]">Visit our stand · Visita nuestro puesto</p>
            <h2 className={`${displayFont.className} mt-3 text-4xl leading-tight text-[#13352d]`}>Flowers, pollinators and a good cause</h2>
            <p lang="es" className="mt-2 text-lg text-[#9a7330]">Flores, polinizadores y una buena causa</p>
            <p className="mt-5 text-base leading-7 text-[#355148]">
              Join our children’s drawing workshop, “Paint your favourite flower and pollinator,” and discover our educational book and botanical card game.
            </p>
            <p lang="es" className="mt-3 text-sm leading-6 text-[#50655d]">
              Participa en nuestro taller infantil de dibujo, «Pinta tu flor y polinizador favorito», y descubre nuestro libro y juego de cartas botánico educativo.
            </p>
            <p className="mt-5 border-t border-[#cfc3aa] pt-4 text-base font-medium leading-7 text-[#244038]">
              100% of the net proceeds from these works will support people affected by natural disasters in both countries.
            </p>
            <p lang="es" className="mt-2 text-sm leading-6 text-[#50655d]">
              El 100% de los beneficios netos de estas obras se destinará a ayudar a las personas afectadas por catástrofes naturales en ambos países.
            </p>
          </div>

          <div className="border-t border-[#cfc3aa] pt-6 lg:border-l lg:border-t-0 lg:pl-10 lg:pt-0">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#9a7330]">Fundraising · Recaudación</p>
            <h2 className={`${displayFont.className} mt-3 text-3xl leading-tight text-[#13352d]`}>Supporting Colombia and Venezuela</h2>
            <p lang="es" className="mt-2 text-lg text-[#9a7330]">Ayuda para Colombia y Venezuela</p>
            <p className="mt-5 text-base leading-7 text-[#355148]">
              All funds raised at the event will support Colombia and Venezuela through these organizations:
            </p>
            <p lang="es" className="mt-2 text-sm leading-6 text-[#50655d]">
              Toda la recaudación del evento se destinará a ayudar a Colombia y Venezuela a través de estas asociaciones:
            </p>
            <ul className="mt-5 list-disc space-y-2 pl-5 text-base leading-7 text-[#244038]">
              <li>Unión Canario-Venezolana de Gran Canaria</li>
              <li>Asociación Sociocultural «Nuestro Barrio, Nuestra Gente»</li>
              <li>Cáritas Diocesana de Canarias</li>
            </ul>
          </div>
        </div>
      </section>

      <footer className="mx-auto flex max-w-7xl flex-col gap-5 px-4 py-8 text-sm text-[#50655d] md:flex-row md:items-center md:justify-between md:px-6">
        <p>Universo Nahiara · Asociación Internacional en Defensa de las Flores</p>
        <a href={mapUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 font-semibold text-[#0f5b48] underline decoration-[#d6b56d] underline-offset-4 hover:text-[#13352d]">
          La Karpa, Vecindario · Get directions <ArrowUpRight aria-hidden="true" className="h-4 w-4" />
        </a>
      </footer>
    </main>
  );
}
