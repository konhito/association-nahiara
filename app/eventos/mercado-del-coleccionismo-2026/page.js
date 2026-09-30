import Image from "next/image";
import Link from "next/link";
import { Baskervville } from "next/font/google";
import {
  ArrowLeft,
  ArrowUpRight,
  CalendarDays,
  Clock3,
  MapPin,
  Users,
} from "lucide-react";

const displayFont = Baskervville({ subsets: ["latin"], weight: ["400"] });
const pageUrl = "https://asociacionnahiara.org/eventos/mercado-del-coleccionismo-2026";
const poster = "/events/mercado-del-coleccionismo-2026/poster.jpeg";
const programmePoster = "/events/mercado-del-coleccionismo-2026/program.jpeg";
const mapUrl =
  "https://www.google.com/maps/place//data=!4m2!3m1!1s0xc409f01efa5188d:0xa81b7061662fa300?entry=gemini&utm_source=gemini&utm_campaign=gem-default";

const programme = [
  "Inflatables and children’s activities: workshops, games, stencil tattoos, face painting and glitter.",
  "World dance performances by Macondo, Casa Argentina El Ombú and Cubacan.",
  "Live concerts with Madera Criolla and Raigal.",
  "Food trucks and traditional Colombian and Venezuelan food.",
  "Charity raffles and prize draws.",
];

const beneficiaries = [
  "Unión Canario-Venezolana de Gran Canaria",
  "Asociación Sociocultural «Nuestro barrio, Nuestra Gente»",
  "Cáritas Diocesana de Canarias",
];

export const metadata = {
  title: "Collectors’ Market 2026 | Universo Nahiara",
  description:
    "Join the Mercado del Coleccionismo charity event for Colombia and Venezuela at La Karpa, Vecindario, on 4 October 2026.",
  alternates: { canonical: pageUrl },
  openGraph: {
    type: "website",
    url: pageUrl,
    title: "Mercado del Coleccionismo · 4 October 2026",
    description:
      "A family-friendly charity event for Colombia and Venezuela at La Karpa, Vecindario.",
    images: [
      {
        url: poster,
        width: 1439,
        height: 1778,
        alt: "Official Mercado del Coleccionismo event poster",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Mercado del Coleccionismo · 4 October 2026",
    description:
      "A charity event for Colombia and Venezuela at La Karpa, Vecindario.",
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
  image: [poster, programmePoster],
  inLanguage: "en",
  description:
    "A family-friendly charity market with children’s activities, world dances, live music and food, supporting Colombia and Venezuela.",
  location: {
    "@type": "Place",
    name: "La Karpa, Vecindario",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Vecindario",
      addressRegion: "Santa Lucía de Tirajana, Gran Canaria, Canary Islands",
      addressCountry: "ES",
    },
    sameAs: mapUrl,
  },
};

function Fact({ icon: Icon, label, primary, secondary, detail, href }) {
  const content = (
    <>
      <div className="flex items-center gap-2 text-[#efc85f]">
        <Icon aria-hidden="true" className="h-4 w-4" />
        <span className="text-[0.68rem] font-semibold uppercase tracking-[0.16em]">
          {label}
        </span>
      </div>
      <p className="mt-4 text-base font-medium text-white">{primary}</p>
      <p className="mt-1 text-sm leading-6 text-[#d8d3c7]">{secondary}</p>
      {detail ? (
        <p className="mt-3 text-sm leading-6 text-[#b7c1bb]">{detail}</p>
      ) : null}
    </>
  );

  const className =
    "rounded-2xl border border-white/10 bg-white/[0.04] p-4 backdrop-blur-sm";

  if (href) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noreferrer"
        className={className + " transition hover:border-[#efc85f]/45 hover:bg-white/[0.07]"}
      >
        {content}
      </a>
    );
  }

  return <div className={className}>{content}</div>;
}

export default function MercadoDelColeccionismoPage() {
  const heroFacts = [
    {
      icon: Users,
      text: "Public event",
    },
    {
      icon: CalendarDays,
      text: "Sunday, October 4, 2026",
    },
    {
      icon: Clock3,
      text: "10:00–18:00 h",
    },
    {
      icon: MapPin,
      text: "La Karpa · Vecindario",
    },
  ];

  const factCards = [
    {
      icon: CalendarDays,
      label: "Date",
      primary: "Sunday, October 4, 2026",
      secondary: "10:00–18:00 h",
    },
    {
      icon: MapPin,
      label: "Location",
      primary: "La Karpa · Vecindario",
      secondary: "Santa Lucía de Tirajana, Gran Canaria",
      detail: "Open the venue in Google Maps",
      href: mapUrl,
    },
    {
      icon: Users,
      label: "A shared cause",
      primary: "Colombia and Venezuela",
      secondary: "Supporting people affected by natural disasters",
    },
  ];

  return (
    <main className="min-h-screen bg-[#f5f1e8] text-[#102a23]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(eventJsonLd) }}
      />

      <section className="relative overflow-hidden bg-[#072c26] text-[#f7f4ec]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(196,140,70,0.16),transparent_28%),radial-gradient(circle_at_80%_35%,rgba(217,97,82,0.12),transparent_24%),radial-gradient(circle_at_bottom_left,rgba(114,148,100,0.16),transparent_28%)]" />
        <div className="absolute right-[-8rem] top-[8rem] h-[28rem] w-[28rem] rounded-full border border-[#d6b56d]/15" />
        <div className="absolute left-[-10rem] top-[18rem] h-[24rem] w-[24rem] rounded-full border border-[#d6b56d]/10" />

        <div className="relative mx-auto flex max-w-7xl flex-col px-4 pb-18 pt-6 md:px-6 md:pb-24 md:pt-8">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-sm font-medium text-[#e8e0cf] transition hover:text-white"
            >
              <ArrowLeft aria-hidden="true" className="h-4 w-4" />
              Association home
            </Link>

            <div className="flex flex-wrap items-center gap-2">
              <a
                href="#programme"
                className="inline-flex items-center gap-2 rounded-full border border-white/15 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-[#e8e0cf] transition hover:bg-white/8 hover:text-white"
              >
                <CalendarDays aria-hidden="true" className="h-3.5 w-3.5" />
                Programme
              </a>
              <a
                href={mapUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-white/15 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-[#e8e0cf] transition hover:bg-white/8 hover:text-white"
              >
                <MapPin aria-hidden="true" className="h-3.5 w-3.5" />
                Directions
                <ArrowUpRight aria-hidden="true" className="h-3.5 w-3.5" />
              </a>
            </div>
          </div>

          <div className="relative mt-5 grid items-end gap-12 sm:mt-10 lg:grid-cols-[minmax(0,1.15fr)_minmax(320px,0.85fr)]">
            <div className="relative z-10">
              <div className="hidden max-w-3xl flex-wrap gap-2.5 sm:flex">
                {heroFacts.map((item) => {
                  const Icon = item.icon;
                  return (
                    <span
                      key={item.text}
                      className="inline-flex min-h-10 items-center gap-2 rounded-full border border-[#d6b56d]/28 bg-[#f7f4ec]/8 px-3.5 py-2 text-[0.78rem] font-semibold text-[#fff3cf] shadow-[0_1px_0_rgba(255,255,255,0.08)_inset]"
                    >
                      <Icon
                        aria-hidden="true"
                        className="h-4 w-4 shrink-0 text-[#efc85f]"
                      />
                      <span className="leading-tight">{item.text}</span>
                    </span>
                  );
                })}
              </div>

              <h1
                className={displayFont.className + " mt-0 max-w-4xl text-[clamp(3.4rem,8vw,7rem)] leading-[0.94] tracking-[-0.04em] text-[#fbf8f0] sm:mt-6"}
                style={{ textWrap: "balance" }}
              >
                Collectors’
                <br />
                Market 2026
              </h1>
              <p className="mt-5 text-lg font-semibold uppercase tracking-[0.18em] text-[#efc85f]">
                Mercado del Coleccionismo
              </p>
              <p
                className={displayFont.className + " mt-6 max-w-3xl text-[clamp(1.7rem,3vw,2.9rem)] italic leading-[1.08] tracking-[-0.02em] text-[#f4baa9]"}
              >
                Charity event for Colombia and Venezuela
              </p>
              <p className="mt-7 max-w-2xl text-[1.05rem] leading-8 text-[#d7ded8]">
                This Sunday, we’re joining a shared cause for Colombia and
                Venezuela. Join us at the Mercado del Coleccionismo, a family
                day at La Karpa in Vecindario.
              </p>

              <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:mt-10 lg:grid-cols-3">
                {factCards.map((item) => (
                  <Fact key={item.label} {...item} />
                ))}
              </div>
            </div>

            <figure className="relative mx-auto min-h-[27rem] w-full max-w-[24rem] sm:max-w-[28rem] lg:min-h-[42rem]">
              <div
                aria-hidden="true"
                className="absolute left-[-1rem] top-[5%] h-16 w-16 rounded-full border border-[#d6b56d]/35"
              />
              <div
                aria-hidden="true"
                className="absolute bottom-[8%] left-[-8%] z-0 h-36 w-36 rounded-full bg-[#d66152]/18 blur-2xl md:h-52 md:w-52"
              />
              <div
                aria-hidden="true"
                className="absolute right-[-10%] top-[20%] z-0 h-44 w-44 rounded-full bg-[#8b5cf6]/14 blur-3xl md:h-64 md:w-64"
              />
              <span className="absolute right-[-1rem] top-[-1rem] z-20 rounded-full bg-[#d6b56d]/10 px-4 py-2 text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-[#efc85f]">
                Official event poster
              </span>
              <div className="relative z-10 overflow-hidden rounded-2xl border border-[#e8d3a3]/25 bg-[#08251f] shadow-[0_28px_70px_-35px_rgba(0,0,0,0.85)] sm:rounded-[22px]">
                <Image
                  src={poster}
                  alt="Mercado del Coleccionismo: charity event for Colombia and Venezuela, Sunday 4 October 2026 at La Karpa, Vecindario"
                  width={1439}
                  height={1778}
                  sizes="(max-width: 1024px) 90vw, 448px"
                  className="h-auto w-full"
                  priority
                />
              </div>
            </figure>
          </div>
        </div>

        <div className="relative h-14 w-full overflow-hidden md:h-20">
          <svg
            viewBox="0 0 1440 120"
            className="absolute inset-0 h-full w-full"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <path
              d="M0,28 C170,88 290,114 450,90 C620,64 706,8 880,20 C1088,34 1192,108 1440,72 L1440,120 L0,120 Z"
              fill="#f5f1e8"
            />
          </svg>
        </div>
      </section>

      <section className="relative mx-auto max-w-7xl px-4 pb-10 pt-8 md:px-6 md:pb-12 md:pt-10">
        <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-start">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[#9a7330]">
              The event
            </p>
            <h2
              className={displayFont.className + " mt-4 max-w-2xl text-[clamp(2.7rem,4.8vw,5rem)] leading-[0.98] tracking-[-0.035em] text-[#13352d]"}
              style={{ textWrap: "balance" }}
            >
              A family day for a shared cause
            </h2>
            <div className="mt-6 max-w-3xl space-y-5 text-[1.03rem] leading-8 text-[#355148]">
              <p>
                We’ll be at the Mercado del Coleccionismo, a family-friendly
                charity event at La Karpa in Vecindario. Come along with your
                family and spend the day supporting a good cause.
              </p>
              <p>
                There will be food trucks, live music, children’s activities,
                dances from around the world and charity raffles.
              </p>
            </div>
          </div>

          <div className="border-t border-[#d6c7a1] pt-8 lg:border-l lg:border-t-0 lg:pl-10 lg:pt-0">
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[#0f5b48]">
              Our stand
            </p>
            <h2
              className={displayFont.className + " mt-4 text-[clamp(2.1rem,3.8vw,3.5rem)] leading-[1] tracking-[-0.03em] text-[#13352d]"}
              style={{ textWrap: "balance" }}
            >
              Flowers, pollinators and learning
            </h2>
            <div className="mt-5 space-y-4 text-[1rem] leading-8 text-[#355148]">
              <p>
                At our stand, we’ll host children’s drawing workshops:
                “Paint your favourite flower and pollinator.” You can also
                discover our educational botanical book and card game.
              </p>
              <p>
                One hundred percent of the net proceeds from these works will
                go towards helping people affected by natural disasters in
                both countries.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section
        id="programme"
        className="mx-auto max-w-7xl px-4 pb-12 pt-4 md:px-6 md:pb-16"
      >
        <div className="grid gap-10 border-y border-[#d6c7a1] py-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-start lg:py-10">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[#9a7330]">
              What’s on
            </p>
            <h2
              className={displayFont.className + " mt-4 max-w-2xl text-[clamp(2.7rem,4.8vw,5rem)] leading-[0.98] tracking-[-0.035em] text-[#13352d]"}
              style={{ textWrap: "balance" }}
            >
              A day full of things to discover
            </h2>
            <ul className="mt-7">
              {programme.map((item) => (
                <li
                  key={item}
                  className="border-t border-[#d6c7a1] py-4 text-[1rem] leading-7 text-[#355148]"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <figure className="mx-auto w-full max-w-[28rem] lg:pt-4">
            <div className="overflow-hidden rounded-2xl border border-[#d6c7a1] bg-white shadow-[0_18px_42px_-34px_rgba(7,44,38,0.9)]">
              <Image
                src={programmePoster}
                alt="Official programme for the Mercado del Coleccionismo charity event"
                width={1439}
                height={1790}
                sizes="(max-width: 1024px) 90vw, 448px"
                className="h-auto w-full"
              />
            </div>
            <figcaption className="mt-3 text-center text-sm text-[#50655d]">
              Official programme · Programa oficial
            </figcaption>
          </figure>
        </div>
      </section>

      <section className="bg-[#eae4d7]">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 md:px-6 md:py-20 lg:grid-cols-[1fr_0.9fr] lg:gap-16">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[#9a7330]">
              The fundraising
            </p>
            <h2
              className={displayFont.className + " mt-4 text-[clamp(2.2rem,4vw,3.8rem)] leading-[1] tracking-[-0.03em] text-[#13352d]"}
              style={{ textWrap: "balance" }}
            >
              Help for Colombia and Venezuela
            </h2>
            <p className="mt-5 max-w-2xl text-[1rem] leading-8 text-[#355148]">
              All funds raised at the event will go towards helping Colombia
              and Venezuela through these associations:
            </p>
          </div>

          <ul className="self-center">
            {beneficiaries.map((name) => (
              <li
                key={name}
                className="border-t border-[#cfc3aa] py-4 text-base font-medium leading-7 text-[#244038] last:border-b"
              >
                {name}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <footer className="mx-auto flex max-w-7xl flex-col gap-5 px-4 py-8 text-sm text-[#50655d] md:flex-row md:items-center md:justify-between md:px-6">
        <div>
          <p className="font-medium text-[#244038]">
            Universo Nahiara · Asociación Internacional en Defensa de las Flores
          </p>
          <a
            href="mailto:contacto@asociacionnahiara.org"
            className="mt-1 inline-block underline decoration-[#d6b56d] underline-offset-4 hover:text-[#13352d]"
          >
            contacto@asociacionnahiara.org
          </a>
        </div>
        <a
          href={mapUrl}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-2 font-semibold text-[#0f5b48] underline decoration-[#d6b56d] underline-offset-4 hover:text-[#13352d]"
        >
          La Karpa · Vecindario · Get directions
          <ArrowUpRight aria-hidden="true" className="h-4 w-4" />
        </a>
      </footer>
    </main>
  );
}
