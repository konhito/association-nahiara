import Image from "next/image";
import Link from "next/link";
import { cookies } from "next/headers";
import { Baskervville } from "next/font/google";
import {
  ArrowLeft,
  ArrowUpRight,
  CalendarDays,
  Clock,
  Copy,
  Globe2,
  Mail,
  MapPin,
  Users,
} from "lucide-react";
import deMessages from "../../../messages/de.json";
import enMessages from "../../../messages/en.json";
import esMessages from "../../../messages/es.json";
import frMessages from "../../../messages/fr.json";
import itMessages from "../../../messages/it.json";
import zhMessages from "../../../messages/zh.json";

const displayFont = Baskervville({
  subsets: ["latin"],
  weight: ["400"],
  style: ["normal", "italic"],
});

const PAGE_PATH = "/eventos/dia-de-los-polinizadores-2026";
const PAGE_URL = `https://asociacionnahiara.org${PAGE_PATH}`;
const EVENT_POSTER_IMAGE = "/events/eventosdia-de-los-polinizadores-2026.jpeg";
const EVENT_POSTER_URL = `https://asociacionnahiara.org${EVENT_POSTER_IMAGE}`;
const MANIFESTO_PDF_URL = "/events/day-of-all-pollinators-manifesto.pdf";
const EVENT_MAP_URL = "https://maps.google.com/?cid=261711776052733802";
const EVENT_FILM_EMBED_URL =
  "https://www.youtube-nocookie.com/embed/HdpjOvamzgY?rel=0&modestbranding=1";
const SCIENTIX_EVENT_URL =
  "https://www.scientix.eu/news-events/events/event?id=110402";

const eventDetails = {
  date: "21 June 2026",
  time: "11:00 - 14:00 h",
  location: "La Blanca, Sardina del Sur - Santa Lucia de Tirajana, Gran Canaria",
  exactVenue:
    "La Blanca - Sardina del Sur - Santa Lucia de Tirajana, Gran Canaria",
  latitude: 27.8532696,
  longitude: -15.4607353,
  audienceEs: "Gratis - No requiere inscripcion",
  audienceEn: "Free - No registration required",
  organizer:
    "Universo Nahiara - Asociacion Internacional en Defensa de las Flores (Proveneya & Nahiara)",
  collaborators: [
    "Asociacion de Vecinos Yniguaden de La Blanca Cercados Bolanos",
    "Concejalia de Participacion Ciudadana del Ayuntamiento de Santa Lucia de Tirajana",
  ],
  contact: "contacto@asociacionnahiara.org",
};

const esCopy = esMessages.pollinatorsEvent2026;
const enCopy = enMessages.pollinatorsEvent2026;
const deCopy = deMessages.pollinatorsEvent2026;
const frCopy = frMessages.pollinatorsEvent2026;
const itCopy = itMessages.pollinatorsEvent2026;
const zhCopy = zhMessages.pollinatorsEvent2026;
const eventMessages = {
  es: esCopy,
  en: enCopy,
  de: deCopy,
  fr: frCopy,
  it: itCopy,
  zh: zhCopy,
};

export const metadata = {
  title: "Dia de los Polinizadores 2026 | Universo Nahiara",
  description:
    "Public trilingual event page for All Pollinators Day 2026 in Gran Canaria: Draw the flower and its pollinator. Permanent Scientix-ready URL with event details in Spanish, English and German.",
  alternates: {
    canonical: PAGE_URL,
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    type: "website",
    url: PAGE_URL,
    title: "Dia de Todos los Polinizadores 2026 | Universo Nahiara",
    description:
      "21 June 2026 in Gran Canaria. Trilingual public event page for 'Draw the flower and its pollinator' by Universo Nahiara.",
    images: [
      {
        url: EVENT_POSTER_URL,
        width: 768,
        height: 1344,
        alt: "Dia de Todos los Polinizadores 2026 event poster",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Dia de Todos los Polinizadores 2026 | Universo Nahiara",
    description:
      "21 June 2026 in Gran Canaria. Trilingual public event page for 'Draw the flower and its pollinator'.",
    images: [EVENT_POSTER_URL],
  },
};

const eventJsonLd = {
  "@context": "https://schema.org",
  "@type": "Event",
  name: "Dia de Todos los Polinizadores - Dibuja la flor y su polinizador / All Pollinators Day - Draw the flower and its pollinator",
  startDate: "2026-06-21T11:00:00+01:00",
  endDate: "2026-06-21T14:00:00+01:00",
  eventStatus: "https://schema.org/EventScheduled",
  eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
  url: PAGE_URL,
  image: [EVENT_POSTER_URL],
  description:
    "Trilingual public event page for Universo Nahiara's All Pollinators Day in Gran Canaria, featuring the activity 'Draw the flower and its pollinator'.",
  inLanguage: ["es", "en", "de"],
  location: {
    "@type": "Place",
    name: "La Blanca, Sardina del Sur - Santa Lucia de Tirajana, Gran Canaria",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Santa Lucia de Tirajana",
      addressRegion: "Gran Canaria",
      addressCountry: "ES",
      streetAddress:
        "Marquee / Stand - La Blanca, Sardina del Sur - Santa Lucia de Tirajana, Gran Canaria",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: eventDetails.latitude,
      longitude: eventDetails.longitude,
    },
  },
  organizer: {
    "@type": "Organization",
    name: eventDetails.organizer,
    url: "https://asociacionnahiara.org",
    email: eventDetails.contact,
  },
  isAccessibleForFree: true,
  contributor: eventDetails.collaborators.map((name) => ({
    "@type": "Organization",
    name,
  })),
};

function LanguageColumn({ lang, copy, sharedCopy }) {
  const audience =
    copy.audienceValue ||
    (lang === "es" ? eventDetails.audienceEs : eventDetails.audienceEn);

  return (
    <article
      lang={lang}
      className="relative flex h-full flex-col"
    >
      <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#9a7330]">
        {copy.eyebrow}
      </p>
      <h2
        className={`${displayFont.className} mt-4 text-[clamp(2.2rem,4vw,3.6rem)] leading-[1.02] tracking-[-0.03em] text-[#11362d]`}
        style={{ textWrap: "balance" }}
      >
        {copy.title}
      </h2>
      <p className="mt-3 text-[1.05rem] italic leading-7 text-[#d66152]">{copy.subtitle}</p>

      <div className="mt-6 space-y-5 text-[1rem] leading-8 text-[#284239]">
        <p>{copy.intro}</p>
        <p>{copy.body}</p>
      </div>

      <dl className="mt-8 grid gap-x-8 gap-y-5 sm:grid-cols-2">
        <div>
          <dt className="text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-[#6b7b74]">
            {sharedCopy.detailDateLabel}
          </dt>
          <dd className="mt-2 text-sm font-medium text-[#16352d]">
            {sharedCopy.detailDateValue || eventDetails.date}
          </dd>
          <dd className="text-sm text-[#50655d]">
            {sharedCopy.detailTimeValue || eventDetails.time}
          </dd>
        </div>
        <div>
          <dt className="text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-[#6b7b74]">
            {sharedCopy.detailLocationLabel}
          </dt>
          <dd className="mt-2 text-sm font-medium text-[#16352d]">
            <a
              href={EVENT_MAP_URL}
              target="_blank"
              rel="noreferrer"
              className="underline decoration-[#d6b56d] underline-offset-4 transition hover:text-[#0f5b48]"
            >
              {eventDetails.location}
            </a>
          </dd>
          <dd className="text-sm text-[#50655d]">{eventDetails.exactVenue}</dd>
        </div>
        <div>
          <dt className="text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-[#6b7b74]">
            {copy.audienceLabel}
          </dt>
          <dd className="mt-2 text-sm text-[#284239]">{audience}</dd>
        </div>
        <div>
          <dt className="text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-[#6b7b74]">
            {copy.infoLabel}
          </dt>
          <dd className="mt-2 text-sm text-[#284239]">{eventDetails.contact}</dd>
          <dd className="text-sm text-[#50655d]">asociacionnahiara.org</dd>
        </div>
      </dl>

      <div className="mt-8 grid gap-6 sm:grid-cols-2">
        <div>
          <p className="text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-[#0f5b48]">
            {copy.organizerLabel}
          </p>
          <p className="mt-2 text-sm leading-6 text-[#284239]">{eventDetails.organizer}</p>
        </div>
        <div>
          <p className="text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-[#9a7330]">
            {copy.collaboratorLabel}
          </p>
          <ul className="mt-2 space-y-2 text-sm leading-6 text-[#284239]">
            {eventDetails.collaborators.map((collaborator) => (
              <li key={collaborator}>{collaborator}</li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mt-8 border-t border-[#e3dac8] pt-5">
        <p className="text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-[#a26617]">
          {copy.practicalTitle}
        </p>
        <p className="mt-2 text-sm leading-6 text-[#5a4b33]">{copy.practicalBody}</p>
      </div>
    </article>
  );
}

export default async function PollinatorsEventPage() {
  const cookieStore = await cookies();
  const requestedLocale = cookieStore.get("NEXT_LOCALE")?.value;
  const locale = requestedLocale && eventMessages[requestedLocale] ? requestedLocale : "en";
  const pageCopy = eventMessages[locale];
  const sharedCopy = pageCopy.shared;
  const heroMetaItems = [
    {
      icon: Users,
      text: sharedCopy.heroEventType,
    },
    {
      icon: CalendarDays,
      text: sharedCopy.heroDate,
    },
    {
      icon: Clock,
      text: sharedCopy.detailTimeValue || eventDetails.time,
    },
    {
      icon: MapPin,
      text: sharedCopy.factLocationPrimary,
    },
  ];
  const factItems = [
    {
      icon: CalendarDays,
      label: sharedCopy.factDateLabel,
      primary: sharedCopy.heroDate,
      secondary: sharedCopy.factDateSecondary,
      detail: sharedCopy.detailTimeValue || eventDetails.time,
    },
    {
      icon: MapPin,
      label: sharedCopy.factLocationLabel,
      primary: sharedCopy.factLocationPrimary,
      secondary: sharedCopy.factLocationSecondary,
      detail: eventDetails.exactVenue,
      href: EVENT_MAP_URL,
    },
    {
      icon: Users,
      label: sharedCopy.factAudienceLabel,
      primary: sharedCopy.factAudiencePrimary,
      secondary: sharedCopy.factAudienceSecondary,
      detail: sharedCopy.factAudienceDetail,
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
              <ArrowLeft className="h-4 w-4" />
              {sharedCopy.homeLabel}
            </Link>

            <div className="flex items-center gap-2">
              <a
                href={PAGE_URL}
                className="inline-flex items-center gap-2 rounded-full border border-white/15 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-[#e8e0cf] transition hover:bg-white/8 hover:text-white"
              >
                <Copy className="h-3.5 w-3.5" />
                {sharedCopy.canonicalLabel}
              </a>
              <Link
                href="/reloj-dia-de-todos-los-polinizadores"
                className="inline-flex items-center gap-2 rounded-full border border-white/15 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-[#e8e0cf] transition hover:bg-white/8 hover:text-white"
              >
                <CalendarDays className="h-3.5 w-3.5" />
                {sharedCopy.countdownLabel}
              </Link>
            </div>
          </div>

          <div className="relative mt-5 grid items-end gap-12 sm:mt-10 lg:grid-cols-[minmax(0,1.15fr)_minmax(320px,0.85fr)]">
            <div className="relative z-10">
              <div className="hidden max-w-3xl flex-wrap gap-2.5 sm:flex">
                {heroMetaItems.map((item) => {
                  const Icon = item.icon;

                  return (
                    <span
                      key={item.text}
                      className="inline-flex min-h-10 items-center gap-2 rounded-full border border-[#d6b56d]/28 bg-[#f7f4ec]/8 px-3.5 py-2 text-[0.78rem] font-semibold text-[#fff3cf] shadow-[0_1px_0_rgba(255,255,255,0.08)_inset]"
                    >
                      <Icon className="h-4 w-4 shrink-0 text-[#efc85f]" />
                      <span className="leading-tight">{item.text}</span>
                    </span>
                  );
                })}
              </div>
              <h1
                className={`${displayFont.className} mt-0 max-w-4xl text-[clamp(3.4rem,8vw,7rem)] leading-[0.94] tracking-[-0.04em] text-[#fbf8f0] sm:mt-6`}
                style={{ textWrap: "balance" }}
              >
                {sharedCopy.heroTitleLine1}
                <br />
                {sharedCopy.heroTitleLine2}
              </h1>
              <p className="mt-5 text-lg font-semibold uppercase tracking-[0.18em] text-[#efc85f]">
                {sharedCopy.heroEnglishTitle}
              </p>
              {sharedCopy.heroSubtitle ? (
                <p
                  className={`${displayFont.className} mt-6 max-w-3xl text-[clamp(1.7rem,3vw,2.9rem)] italic leading-[1.08] tracking-[-0.02em] text-[#f4baa9]`}
                >
                  {sharedCopy.heroSubtitle}
                </p>
              ) : null}
              <p className="mt-7 max-w-2xl text-[1.05rem] leading-8 text-[#d7ded8]">
                {sharedCopy.heroDescription}
              </p>
              <a
                href={SCIENTIX_EVENT_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-5 inline-flex max-w-2xl items-center gap-2 text-sm font-medium leading-6 text-[#f1d993] underline decoration-[#d6b56d]/60 underline-offset-4 transition hover:text-[#fff3cf]"
              >
                {sharedCopy.scientixListingLink}
                <ArrowUpRight className="h-4 w-4 shrink-0" aria-hidden="true" />
              </a>

              <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:mt-10 lg:grid-cols-3">
                {factItems.map((item) => {
                  const Icon = item.icon;
                  const content = (
                    <>
                      <div className="flex items-center gap-2 text-[#efc85f]">
                        <Icon className="h-4 w-4" />
                        <span className="text-[0.68rem] font-semibold uppercase tracking-[0.16em]">
                          {item.label}
                        </span>
                      </div>
                      <p className="mt-4 text-base font-medium text-white">{item.primary}</p>
                      <p className="mt-1 text-sm text-[#d8d3c7]">{item.secondary}</p>
                      <p className="mt-3 text-sm text-[#b7c1bb]">{item.detail}</p>
                    </>
                  );

                  if (item.href) {
                    return (
                      <a
                        key={item.label}
                        href={item.href}
                        target="_blank"
                        rel="noreferrer"
                        className="rounded-2xl border border-white/10 bg-white/[0.04] p-4 backdrop-blur-sm transition hover:border-[#efc85f]/45 hover:bg-white/[0.07]"
                      >
                        {content}
                      </a>
                    );
                  }

                  return (
                    <div
                      key={item.label}
                      className="rounded-2xl border border-white/10 bg-white/[0.04] p-4 backdrop-blur-sm"
                    >
                      {content}
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="relative mx-auto min-h-[27rem] w-full max-w-[24rem] sm:max-w-[28rem] lg:min-h-[42rem]">
              <div className="absolute right-[-1rem] top-[-1rem] z-20 rounded-full bg-[#d6b56d]/10 px-4 py-2 text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-[#efc85f]">
                {sharedCopy.eventBadge}
              </div>
              <div className="absolute left-[-1rem] top-[5%] h-16 w-16 rounded-full border border-[#d6b56d]/35" />
              <div className="absolute bottom-[8%] left-[-8%] z-0 h-36 w-36 rounded-full bg-[#d66152]/18 blur-2xl md:h-52 md:w-52" />
              <div className="absolute right-[-10%] top-[20%] z-0 h-44 w-44 rounded-full bg-[#8b5cf6]/14 blur-3xl md:h-64 md:w-64" />
              <div className="relative z-10 overflow-hidden rounded-2xl border border-[#e8d3a3]/25 bg-[#08251f] shadow-[0_28px_70px_-35px_rgba(0,0,0,0.85)] sm:rounded-[22px]">
                <Image
                  src={EVENT_POSTER_IMAGE}
                  alt="Dia de Todos los Polinizadores 2026 event poster"
                  width={768}
                  height={1344}
                  sizes="(max-width: 1024px) 90vw, 448px"
                  className="h-auto w-full"
                  priority
                />
              </div>
            </div>
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
              {sharedCopy.activityLabel}
            </p>
            <h2
              className={`${displayFont.className} mt-4 max-w-2xl text-[clamp(2.7rem,4.8vw,5rem)] leading-[0.98] tracking-[-0.035em] text-[#13352d]`}
              style={{ textWrap: "balance" }}
            >
              {sharedCopy.activityTitleLine1}
              <br />
              {sharedCopy.activityTitleLine2}
            </h2>
            <div className="mt-6 max-w-3xl space-y-5 text-[1.03rem] leading-8 text-[#355148]">
              <p>{sharedCopy.activityBody}</p>
            </div>
          </div>

          <div className="border-t border-[#d6c7a1] pt-8 lg:border-l lg:border-t-0 lg:pl-10 lg:pt-0">
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[#0f5b48]">
              {sharedCopy.globalParticipationLabel}
            </p>
            <h2
              className={`${displayFont.className} mt-4 text-[clamp(2.1rem,3.8vw,3.5rem)] leading-[1] tracking-[-0.03em] text-[#13352d]`}
              style={{ textWrap: "balance" }}
            >
              {sharedCopy.globalParticipationTitle}
            </h2>
            <div className="mt-5 space-y-4 text-[1rem] leading-8 text-[#355148]">
              <p>{sharedCopy.globalParticipationBody}</p>
            </div>
            <Link
              href="/dibuja-la-flor-de-tu-pais"
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-[#0f5b48] px-5 py-3 text-sm font-semibold text-[#f7f4ec] shadow-[0_12px_30px_-22px_rgba(7,44,38,0.9)] transition hover:bg-[#0a4235] focus:outline-none focus:ring-2 focus:ring-[#d6b56d] focus:ring-offset-2 focus:ring-offset-[#f5f1e8]"
            >
              {sharedCopy.globalParticipationCta}
              <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-10 md:px-6 md:pb-12">
        <div className="grid gap-7 border-t border-[#d6c7a1] py-8 lg:grid-cols-[0.95fr_1.25fr] lg:items-center lg:py-10">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#9a7330]">
              {sharedCopy.manifestoLabel}
            </p>
            <h2
              className={`${displayFont.className} mt-4 text-[clamp(2rem,4vw,3.6rem)] leading-[1] tracking-[-0.03em] text-[#13352d]`}
              style={{ textWrap: "balance" }}
            >
              {sharedCopy.manifestoTitle}
            </h2>
          </div>

          <div className="flex flex-col gap-5 border-t border-[#d6c7a1] pt-6 sm:flex-row sm:items-center sm:justify-between lg:border-t-0 lg:pt-0">
            <p className="max-w-2xl text-[1rem] leading-8 text-[#355148]">
              {sharedCopy.manifestoBody}
            </p>
            <a
              href={MANIFESTO_PDF_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex shrink-0 items-center justify-center gap-2 rounded-full bg-[#0f5b48] px-5 py-3 text-sm font-semibold text-[#f7f4ec] shadow-[0_12px_30px_-22px_rgba(7,44,38,0.9)] transition hover:bg-[#0a4235] focus:outline-none focus:ring-2 focus:ring-[#d6b56d] focus:ring-offset-2 focus:ring-offset-[#f5f1e8]"
            >
              {sharedCopy.manifestoCta}
              <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
            </a>
          </div>
        </div>
      </section>

      <section
        id="short-film"
        className="mx-auto max-w-7xl scroll-mt-8 px-4 pb-10 md:px-6 md:pb-12"
      >
        <div className="grid gap-7 border-y border-[#d6c7a1] py-8 lg:grid-cols-[0.95fr_1.25fr] lg:items-center lg:py-10">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#9a7330]">
              {sharedCopy.filmLabel}
            </p>
            <h2
              className={`${displayFont.className} mt-4 text-[clamp(2rem,4vw,3.6rem)] leading-[1] tracking-[-0.03em] text-[#13352d]`}
              style={{ textWrap: "balance" }}
            >
              {sharedCopy.filmTitle}
            </h2>
            <p className="mt-4 max-w-xl text-[1rem] leading-8 text-[#355148]">
              {sharedCopy.filmBody}
            </p>
          </div>

          <div className="overflow-hidden rounded-2xl bg-[#072c26] shadow-[0_16px_44px_-28px_rgba(7,44,38,0.9)]">
            <div className="aspect-video w-full">
              <iframe
                title={sharedCopy.filmTitle}
                src={EVENT_FILM_EMBED_URL}
                className="h-full w-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-12 pt-2 md:px-6 md:pb-16">
        <div className="grid gap-12">
          <LanguageColumn lang={locale} copy={pageCopy} sharedCopy={sharedCopy} />
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-16 md:px-6 md:pb-20">
        <div className="border-t border-[#d6c7a1] pt-8">
          <div className="grid gap-8 xl:grid-cols-[1fr_0.9fr]">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[#9a7330]">
                {sharedCopy.organizerHeading}
              </p>
              <h2
                className={`${displayFont.className} mt-4 text-[clamp(2.2rem,4vw,3.8rem)] leading-[1] tracking-[-0.03em] text-[#13352d]`}
              >
                Universo Nahiara
              </h2>
              <p className="mt-4 max-w-2xl text-[1rem] leading-8 text-[#355148]">
                {pageCopy.organizerBody}
              </p>
            </div>

            <div className="grid justify-items-start gap-6 text-left sm:grid-cols-2">
              <div className="justify-self-start text-left">
                <div className="flex items-center gap-2 whitespace-nowrap text-[#0f5b48]">
                  <Mail className="h-4 w-4" />
                  <span className="text-[0.68rem] font-semibold uppercase tracking-[0.16em]">
                    {sharedCopy.infoHeading}
                  </span>
                </div>
                <p className="mt-3 whitespace-nowrap text-sm leading-7 text-[#355148]">
                  {eventDetails.contact}
                </p>
              </div>
              <div className="justify-self-start text-left">
                <div className="flex items-center gap-2 whitespace-nowrap text-[#0f5b48]">
                  <Globe2 className="h-4 w-4" />
                  <span className="text-[0.68rem] font-semibold uppercase tracking-[0.16em]">
                    {sharedCopy.websiteHeading}
                  </span>
                </div>
                <p className="mt-3 whitespace-nowrap text-sm leading-7 text-[#355148]">
                  asociacionnahiara.org
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
