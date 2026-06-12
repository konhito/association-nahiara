import Image from "next/image";
import Link from "next/link";
import { cookies } from "next/headers";
import { Baskervville } from "next/font/google";
import {
  ArrowLeft,
  CalendarDays,
  Copy,
  Flower2,
  Globe2,
  HeartHandshake,
  Leaf,
  Mail,
  MapPin,
  Sparkles,
  Users,
} from "lucide-react";
import enMessages from "../../../messages/en.json";
import esMessages from "../../../messages/es.json";

const displayFont = Baskervville({
  subsets: ["latin"],
  weight: ["400"],
  style: ["normal", "italic"],
});

const PAGE_PATH = "/eventos/dia-de-los-polinizadores-2026";
const PAGE_URL = `https://asociacionnahiara.org${PAGE_PATH}`;
const OG_IMAGE_URL = `${PAGE_URL}/opengraph-image`;

const eventDetails = {
  date: "21 June 2026",
  time: "[time TBC]",
  location: "La Blanca, Sardina del Sur - Santa Lucia de Tirajana, Gran Canaria",
  exactVenue: "[exact venue TBC]",
  audienceEs: "Abierto a todos los publicos - [gratuito / inscripcion TBC]",
  audienceEn: "Open to all - [free / registration TBC]",
  organizer:
    "Universo Nahiara - Asociacion Internacional en Defensa de las Flores (Proveneya & Nahiara)",
  collaborator: "Asociacion de Vecinos de La Blanca",
  contact: "contacto@asociacionnahiara.org",
};

const esCopy = esMessages.pollinatorsEvent2026;
const enCopy = enMessages.pollinatorsEvent2026;

export const metadata = {
  title: "Dia de los Polinizadores 2026 | Universo Nahiara",
  description:
    "Public bilingual event page for All Pollinators Day 2026 in Gran Canaria: Draw the flower and its pollinator. Permanent Scientix-ready URL with event details in Spanish and English.",
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
      "21 June 2026 in Gran Canaria. Bilingual public event page for 'Draw the flower and its pollinator' by Universo Nahiara.",
    images: [
      {
        url: OG_IMAGE_URL,
        width: 1200,
        height: 630,
        alt: "All Pollinators Day 2026 event preview",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Dia de Todos los Polinizadores 2026 | Universo Nahiara",
    description:
      "21 June 2026 in Gran Canaria. Bilingual public event page for 'Draw the flower and its pollinator'.",
    images: [OG_IMAGE_URL],
  },
};

const eventJsonLd = {
  "@context": "https://schema.org",
  "@type": "Event",
  name: "Dia de Todos los Polinizadores - Dibuja la flor y su polinizador / All Pollinators Day - Draw the flower and its pollinator",
  startDate: "2026-06-21",
  endDate: "2026-06-21",
  eventStatus: "https://schema.org/EventScheduled",
  eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
  url: PAGE_URL,
  image: [OG_IMAGE_URL],
  description:
    "Bilingual public event page for Universo Nahiara's All Pollinators Day in Gran Canaria, featuring the activity 'Draw the flower and its pollinator'.",
  inLanguage: ["es", "en"],
  location: {
    "@type": "Place",
    name: "La Blanca, Sardina del Sur - Santa Lucia de Tirajana, Gran Canaria",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Santa Lucia de Tirajana",
      addressRegion: "Gran Canaria",
      addressCountry: "ES",
      streetAddress: "[exact venue TBC]",
    },
  },
  organizer: {
    "@type": "Organization",
    name: eventDetails.organizer,
    url: "https://asociacionnahiara.org",
    email: eventDetails.contact,
  },
};

function LanguageColumn({ lang, copy }) {
  const audience = lang === "es" ? eventDetails.audienceEs : eventDetails.audienceEn;

  return (
    <article
      lang={lang}
      className="relative flex h-full flex-col border-t border-[#d6c7a1] pt-6"
    >
      <div className="flex items-center gap-4">
        <span className="text-xs font-semibold uppercase tracking-[0.22em] text-[#9a7330]">
          {lang.toUpperCase()}
        </span>
        <div className="h-px flex-1 bg-[#d6c7a1]/80" />
      </div>

      <p className="mt-6 text-xs font-semibold uppercase tracking-[0.24em] text-[#9a7330]">
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
          <dd className="mt-2 text-sm font-medium text-[#16352d]">{eventDetails.date}</dd>
          <dd className="text-sm text-[#50655d]">{eventDetails.time}</dd>
        </div>
        <div>
          <dt className="text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-[#6b7b74]">
            {sharedCopy.detailLocationLabel}
          </dt>
          <dd className="mt-2 text-sm font-medium text-[#16352d]">{eventDetails.location}</dd>
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
          <p className="mt-2 text-sm leading-6 text-[#284239]">{eventDetails.collaborator}</p>
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
  const locale = cookieStore.get("NEXT_LOCALE")?.value === "es" ? "es" : "en";
  const pageCopy = locale === "es" ? esCopy : enCopy;
  const sharedCopy = pageCopy.shared;
  const factItems = [
    {
      icon: CalendarDays,
      label: sharedCopy.factDateLabel,
      primary: sharedCopy.heroDate,
      secondary: "21 June 2026",
      detail: eventDetails.time,
    },
    {
      icon: MapPin,
      label: sharedCopy.factLocationLabel,
      primary: sharedCopy.factLocationPrimary,
      secondary: sharedCopy.factLocationSecondary,
      detail: eventDetails.exactVenue,
    },
    {
      icon: Users,
      label: sharedCopy.factAudienceLabel,
      primary: sharedCopy.factAudiencePrimary,
      secondary: sharedCopy.factAudienceSecondary,
      detail: "[gratuito / inscripcion TBC] / [free / registration TBC]",
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

          <div className="relative mt-10 grid items-end gap-12 lg:grid-cols-[minmax(0,1.15fr)_minmax(320px,0.85fr)]">
            <div className="relative z-10">
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[#d6b56d]">
                {sharedCopy.heroDate}
              </p>
              <h1
                className={`${displayFont.className} mt-6 max-w-4xl text-[clamp(3.4rem,8vw,7rem)] leading-[0.94] tracking-[-0.04em] text-[#fbf8f0]`}
                style={{ textWrap: "balance" }}
              >
                {sharedCopy.heroTitleLine1}
                <br />
                {sharedCopy.heroTitleLine2}
              </h1>
              <p className="mt-5 text-lg font-semibold uppercase tracking-[0.18em] text-[#efc85f]">
                {sharedCopy.heroEnglishTitle}
              </p>
              <p
                className={`${displayFont.className} mt-6 max-w-3xl text-[clamp(1.7rem,3vw,2.9rem)] italic leading-[1.08] tracking-[-0.02em] text-[#f4baa9]`}
              >
                Dibuja la flor y su polinizador
              </p>
              <p className="mt-7 max-w-2xl text-[1.05rem] leading-8 text-[#d7ded8]">
                {sharedCopy.heroDescription}
              </p>

              <div className="mt-10 grid gap-4 md:grid-cols-3">
                {factItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <div
                      key={item.label}
                      className="rounded-[24px] border border-white/10 bg-white/[0.04] p-4 backdrop-blur-sm"
                    >
                      <div className="flex items-center gap-2 text-[#efc85f]">
                        <Icon className="h-4 w-4" />
                        <span className="text-[0.68rem] font-semibold uppercase tracking-[0.16em]">
                          {item.label}
                        </span>
                      </div>
                      <p className="mt-4 text-base font-medium text-white">{item.primary}</p>
                      <p className="mt-1 text-sm text-[#d8d3c7]">{item.secondary}</p>
                      <p className="mt-3 text-sm text-[#b7c1bb]">{item.detail}</p>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="relative min-h-[28rem] lg:min-h-[40rem]">
              <div className="absolute right-[10%] top-[2%] rounded-full bg-[#d6b56d]/10 px-4 py-2 text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-[#efc85f]">
                {sharedCopy.eventBadge}
              </div>
              <div className="absolute left-[10%] top-[5%] h-16 w-16 rounded-full border border-[#d6b56d]/35" />
              <div className="absolute bottom-0 right-0 h-full w-full">
                <div className="absolute right-[8%] top-[10%] z-20">
                  <div className="relative h-28 w-28 overflow-hidden rounded-full border border-[#e8d3a3]/30 bg-[#123f34] shadow-[0_20px_50px_-24px_rgba(0,0,0,0.7)] md:h-36 md:w-36">
                    <Image
                      src="/pollinators/honeybee.jpg"
                      alt={sharedCopy.pollinatorAlt}
                      fill
                      sizes="(max-width: 768px) 112px, 144px"
                      className="object-cover"
                    />
                  </div>
                </div>
                <div className="absolute bottom-0 right-0 z-10 h-[24rem] w-[24rem] md:h-[34rem] md:w-[34rem]">
                  <Image
                    src="/complete-flowers/Espana.png"
                    alt={sharedCopy.flowerAlt}
                    fill
                    sizes="(max-width: 768px) 384px, 544px"
                    className="object-contain object-bottom"
                    priority
                  />
                </div>
                <div className="absolute bottom-[8%] left-[2%] z-0 h-32 w-32 rounded-full bg-[#d66152]/16 blur-2xl md:h-48 md:w-48" />
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

      <section className="relative mx-auto max-w-7xl px-4 pb-10 pt-10 md:px-6 md:pb-12">
        <div className="grid gap-10 lg:grid-cols-[0.82fr_1.18fr] lg:items-start">
          <div className="relative overflow-hidden rounded-[28px] bg-[#ede4d0] p-4 shadow-[0_18px_48px_-34px_rgba(9,35,27,0.28)]">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(214,97,82,0.12),transparent_26%),radial-gradient(circle_at_bottom_right,rgba(15,91,72,0.12),transparent_32%)]" />
            <div className="relative aspect-[4/5] overflow-hidden rounded-[22px] bg-white">
              <Image
                src="/events/dibuja-flor-2026.png"
                alt={sharedCopy.posterAlt}
                fill
                sizes="(max-width: 1024px) 100vw, 34vw"
                className="object-cover object-top"
              />
            </div>
          </div>

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
              <p>{sharedCopy.activityBodyEs}</p>
              <p>{sharedCopy.activityBodyEn}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-12 md:px-6 md:pb-16">
        <div className="grid gap-12">
          <LanguageColumn id={locale} lang={locale} copy={pageCopy} />
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-16 md:px-6 md:pb-20">
        <div className="border-t border-[#d6c7a1] pt-8">
          <div className="grid gap-8 lg:grid-cols-[1fr_0.9fr]">
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

            <div className="grid gap-6 sm:grid-cols-2">
              <div>
                <div className="flex items-center gap-2 text-[#0f5b48]">
                  <Mail className="h-4 w-4" />
                  <span className="text-[0.68rem] font-semibold uppercase tracking-[0.16em]">
                    {sharedCopy.infoHeading}
                  </span>
                </div>
                <p className="mt-3 text-sm leading-7 text-[#355148]">{eventDetails.contact}</p>
              </div>
              <div>
                <div className="flex items-center gap-2 text-[#0f5b48]">
                  <Globe2 className="h-4 w-4" />
                  <span className="text-[0.68rem] font-semibold uppercase tracking-[0.16em]">
                    {sharedCopy.websiteHeading}
                  </span>
                </div>
                <p className="mt-3 text-sm leading-7 text-[#355148]">asociacionnahiara.org</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
