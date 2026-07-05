"use client";

import Link from "next/link";
import Image from "next/image";
import { Baskervville } from "next/font/google";
import {
  ArrowLeft,
  CalendarDays,
  Clock3,
  Globe2,
  Mail,
  MapPin,
  Users,
} from "lucide-react";
import { Suspense } from "react";
import MobileInteractiveCarousel from "../components/MobileInteractiveCarousel";
import { useTranslation } from "../../../lib/useTranslation";

const displayFont = Baskervville({
  subsets: ["latin"],
  weight: ["400"],
  style: ["normal", "italic"],
});

const MEDIA_DIR = "/guardianes-flores-2026";
const ARTWORKS_DIR = `${MEDIA_DIR}/artworks`;
const POSTER = `${MEDIA_DIR}/poster.jpeg`;
const PHOTOS = Array.from({ length: 14 }, (_, index) => ({
  src: `${MEDIA_DIR}/photo-${String(index + 1).padStart(2, "0")}.jpeg`,
  className: index === 0 || index === 5 || index === 10 ? "lg:col-span-2" : "",
}));
const ARTWORK_NUMBERS = [
  1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
  21, 22, 23, 24, 25, 27, 28, 29, 30, 31, 32, 33, 34, 35,
];
const ARTWORK_DETAILS = [
  { lamina: 1, nombre: "Kimberly", edad: 2 },
  { lamina: 2, nombre: "Ritaje", edad: null },
  { lamina: 3, nombre: "Amberly", edad: 4 },
  { lamina: 4, nombre: null, edad: null },
  { lamina: 5, nombre: "Ranime", edad: null },
  { lamina: 6, nombre: "Ines", edad: 6 },
  { lamina: 7, nombre: "Davinia", edad: null },
  { lamina: 8, nombre: "Theylor", edad: 8 },
  { lamina: 9, nombre: "Raquel", edad: null },
  { lamina: 10, nombre: "Catalina", edad: null },
  { lamina: 11, nombre: "Paula", edad: 8 },
  { lamina: 12, nombre: "Martina Crespo Galvan", edad: null },
  { lamina: 13, nombre: null, edad: null },
  { lamina: 14, nombre: "Theylor", edad: 8 },
  { lamina: 15, nombre: "Yarely", edad: null },
  { lamina: 16, nombre: "Melanie", edad: 4 },
  { lamina: 17, nombre: "Violeta, con Theylor", edad: null },
  { lamina: 18, nombre: "Neyzan", edad: 4 },
  { lamina: 19, nombre: "Laia", edad: 3 },
  { lamina: 20, nombre: "Elba", edad: null },
  { lamina: 21, nombre: null, edad: null },
  { lamina: 22, nombre: null, edad: null },
  { lamina: 23, nombre: "Valeria", edad: null },
  { lamina: 24, nombre: "Yurena", edad: 42 },
  { lamina: 25, nombre: "Valeria", edad: null },
  { lamina: 27, nombre: "Catalina", edad: null },
  { lamina: 28, nombre: "Martina Crespo Galvan", edad: null },
  { lamina: 29, nombre: "Candela", edad: null },
  { lamina: 30, nombre: "Janat", edad: null },
  { lamina: 31, nombre: "Laia", edad: null },
  { lamina: 32, nombre: null, edad: null },
  { lamina: 33, nombre: "India", edad: null },
  { lamina: 34, nombre: "Riham", edad: null },
  { lamina: 35, nombre: "Naymar", edad: null },
];
const ARTWORK_DETAILS_BY_NUMBER = new Map(
  ARTWORK_DETAILS.map((artwork) => [artwork.lamina, artwork])
);
const ARTWORKS = ARTWORK_NUMBERS.map((number) => ({
  src: `${ARTWORKS_DIR}/Obra ${number}.jpeg`,
  number,
  details: ARTWORK_DETAILS_BY_NUMBER.get(number),
}));
function LoadingScreen() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[#f5f1e8]">
      <div className="h-8 w-8 animate-spin rounded-full border-2 border-[#d6b56d] border-t-[#0f5b48]" />
    </div>
  );
}

function FactItem({ icon: Icon, label, primary, secondary }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4 backdrop-blur-sm">
      <div className="flex items-center gap-2 text-[#f0c858]">
        <Icon className="h-4 w-4" />
        <span className="text-[0.68rem] font-semibold uppercase tracking-[0.16em]">
          {label}
        </span>
      </div>
      <p className="mt-4 text-base font-medium text-[#fffaf0]">{primary}</p>
      <p className="mt-1 text-sm leading-6 text-[#d8d3c7]">{secondary}</p>
    </div>
  );
}

function Hero({ t }) {
  const facts = [
    {
      icon: CalendarDays,
      label: t("guardianes2026.facts.date.label"),
      primary: t("guardianes2026.facts.date.primary"),
      secondary: t("guardianes2026.facts.date.secondary"),
    },
    {
      icon: MapPin,
      label: t("guardianes2026.facts.location.label"),
      primary: t("guardianes2026.facts.location.primary"),
      secondary: t("guardianes2026.facts.location.secondary"),
    },
    {
      icon: Users,
      label: t("guardianes2026.facts.gathering.label"),
      primary: t("guardianes2026.facts.gathering.primary"),
      secondary: t("guardianes2026.facts.gathering.secondary"),
    },
  ];

  return (
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
            {t("guardianes2026.navHome")}
          </Link>

          <Link
            href="/eventos/dia-de-los-polinizadores-2026"
            className="inline-flex items-center gap-2 rounded-full border border-white/15 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-[#e8e0cf] transition hover:bg-white/8 hover:text-white"
          >
            <CalendarDays className="h-3.5 w-3.5" />
            {t("guardianes2026.navPollinators")}
          </Link>
        </div>

        <div className="relative mt-5 grid items-start gap-12 sm:mt-10 lg:grid-cols-[minmax(0,1.15fr)_minmax(320px,0.85fr)]">
          <div className="relative z-10">
            <div className="hidden max-w-3xl flex-wrap gap-2.5 sm:flex">
              {facts.map((fact) => {
                const Icon = fact.icon;

                return (
                  <span
                    key={fact.label}
                    className="inline-flex min-h-10 items-center gap-2 rounded-full border border-[#d6b56d]/28 bg-[#f7f4ec]/8 px-3.5 py-2 text-[0.78rem] font-semibold text-[#fff3cf] shadow-[0_1px_0_rgba(255,255,255,0.08)_inset]"
                  >
                    <Icon className="h-4 w-4 shrink-0 text-[#efc85f]" />
                    <span className="leading-tight">{fact.primary}</span>
                  </span>
                );
              })}
            </div>
            <h1
              className={`${displayFont.className} mt-0 max-w-4xl text-[clamp(3.4rem,8vw,7rem)] leading-[0.94] tracking-[-0.04em] text-[#fbf8f0] sm:mt-6`}
              style={{ textWrap: "balance" }}
            >
              {t("guardianes2026.hero.title")}
            </h1>
            <p className="mt-6 max-w-2xl text-lg font-semibold uppercase tracking-[0.14em] text-[#f2cd68]">
              {t("guardianes2026.hero.subtitle")}
            </p>
            <p className="mt-7 max-w-2xl text-[1.05rem] leading-8 text-[#d7e2dd]">
              {t("guardianes2026.hero.description")}
            </p>

            <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:mt-10 lg:grid-cols-3">
              {facts.map((fact) => (
                <FactItem key={fact.label} {...fact} />
              ))}
            </div>
          </div>

          <figure className="relative mx-auto min-h-[27rem] w-full max-w-[24rem] sm:max-w-[28rem] lg:min-h-[42rem]">
            <div className="absolute right-[-1rem] top-[-1rem] z-20 rounded-full bg-[#d6b56d]/10 px-4 py-2 text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-[#efc85f]">
              {t("guardianes2026.hero.badge")}
            </div>
            <div className="absolute left-[-1rem] top-[5%] h-16 w-16 rounded-full border border-[#d6b56d]/35" />
            <div className="absolute bottom-[8%] left-[-8%] z-0 h-36 w-36 rounded-full bg-[#d66152]/18 blur-2xl md:h-52 md:w-52" />
            <div className="absolute right-[-10%] top-[20%] z-0 h-44 w-44 rounded-full bg-[#8b5cf6]/14 blur-3xl md:h-64 md:w-64" />
            <div className="relative z-10 overflow-hidden rounded-2xl border border-[#e8d3a3]/25 bg-[#08251f] p-2 shadow-[0_28px_70px_-35px_rgba(0,0,0,0.85)] sm:rounded-[22px] sm:p-3">
                <Image
                  src={POSTER}
                  alt={t("guardianes2026.hero.posterAlt")}
                  width={1080}
                  height={1920}
                  priority
                  unoptimized
                  sizes="(min-width: 1024px) 32rem, min(100vw - 2rem, 32rem)"
                className="h-auto w-full rounded-xl object-contain"
                />
              <figcaption className="mt-4 flex flex-wrap items-center justify-between gap-3 px-1">
                <div>
                  <p className="text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-[#f0c858]">
                    {t("guardianes2026.hero.posterLabel")}
                  </p>
                  <p className="mt-1 text-sm leading-6 text-[#d4dfda]">
                    {t("guardianes2026.hero.posterCaption")}
                  </p>
                </div>
                <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-black/10 px-3 py-2 text-sm text-[#f6efe1]">
                  <Clock3 className="h-4 w-4 text-[#f0c858]" />
                  {t("guardianes2026.hero.posterTime")}
                </div>
              </figcaption>
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
  );
}

function EventStory({ t }) {
  return (
    <section className="relative mx-auto max-w-7xl px-4 pb-10 pt-8 md:px-6 md:pb-12 md:pt-10">
      <div>
        <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-start">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[#9a7330]">
              {t("guardianes2026.story.label")}
            </p>
            <h2
              className={`${displayFont.className} mt-4 max-w-2xl text-[clamp(2.7rem,4.8vw,5rem)] leading-[0.98] tracking-[-0.035em] text-[#13352d]`}
              style={{ textWrap: "balance" }}
            >
              {t("guardianes2026.story.title")}
            </h2>
          </div>
          <div className="border-t border-[#d6c7a1] pt-8 lg:border-l lg:border-t-0 lg:pl-10 lg:pt-0">
            <p className="text-[1.03rem] leading-8 text-[#355148]">
              {t("guardianes2026.story.body1")}
            </p>
            <p className="mt-5 text-[1.03rem] leading-8 text-[#355148]">
              {t("guardianes2026.story.body2")}
            </p>
          </div>
        </div>

      </div>
    </section>
  );
}

function ArtworkSection({ t }) {
  return (
    <section className="mx-auto max-w-7xl overflow-hidden px-4 pb-12 md:px-6 md:pb-16">
      <div className="border-y border-[#d6c7a1] py-7 sm:py-8 lg:py-10">
        <div className="grid gap-6 lg:grid-cols-[0.78fr_1.22fr] lg:items-end">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#0f5b48] sm:text-sm sm:tracking-[0.22em]">
              {t("guardianes2026.artwork.label")}
            </p>
            <h2
              className={`${displayFont.className} mt-3 text-[clamp(2rem,10vw,3.8rem)] leading-[1] tracking-[-0.03em] text-[#13352d] sm:mt-4`}
              style={{ textWrap: "balance" }}
            >
              {t("guardianes2026.artwork.title")}
            </h2>
          </div>
          <p className="max-w-3xl text-[0.95rem] leading-7 text-[#355148] sm:text-[1rem] sm:leading-8">
            {t("guardianes2026.artwork.intro")}
          </p>
        </div>

        <MobileInteractiveCarousel
          showcaseClassName="guardianes-art-showcase relative mt-6 rounded-xl bg-[#0f3028] px-0 py-4 shadow-[0_0_0_1px_rgba(184,138,50,0.24),0_18px_42px_-34px_rgba(7,44,38,0.9)] sm:mt-8 sm:rounded-2xl sm:py-5"
          trackClassName="guardianes-art-track flex w-max gap-4 pr-4"
          items={ARTWORKS}
          renderCard={(artwork, index) => (
            <figure
              className="flex h-[38rem] w-[82vw] shrink-0 flex-col overflow-hidden rounded-lg border border-[#b88a32] bg-[#12392f] sm:h-[40rem] sm:w-[70vw] md:h-[42rem] md:w-[42vw] lg:h-[44rem] lg:w-[calc((74rem-2rem)/3)]"
            >
              <div className="flex items-start justify-between gap-3 border-b border-[#c99f4f]/45 bg-[#102f28] px-3 py-3 text-[#f8f2df] sm:gap-4 sm:px-4 md:px-5">
                <div>
                  <p className="text-[0.68rem] font-semibold uppercase tracking-[0.14em] text-[#d6b56d] sm:text-xs sm:tracking-[0.16em]">
                    {t("guardianes2026.artwork.plate")} {String(artwork.number).padStart(2, "0")}
                  </p>
                  <p className="mt-1 text-xs leading-5 text-[#d8ded8]">
                    {t("guardianes2026.artwork.dateLocation")}
                  </p>
                </div>
                <div className="max-w-[9rem] text-right sm:max-w-[11rem]">
                  <p className={`${displayFont.className} text-2xl leading-none tracking-[-0.03em] sm:text-3xl`}>
                    {String(index + 1).padStart(2, "0")}
                  </p>
                  <p className="mt-1 text-xs leading-5 text-[#d8ded8]">
                    {artwork.details?.nombre ??
                      t("guardianes2026.artwork.unknownAuthor")}
                    {artwork.details?.edad ? `, ${artwork.details.edad}` : ""}
                  </p>
                </div>
              </div>

              <div className="flex min-h-0 flex-1 flex-col">
                <div className="bg-[#173d33] p-2.5 sm:p-3">
                  <div className="relative rounded-md border border-[#f0d686] bg-[#8d6927] p-1.5 shadow-[inset_0_1px_0_rgba(255,247,196,0.75),inset_0_-1px_0_rgba(70,43,10,0.45)] sm:p-2">
                    <div className="rounded-[4px] border border-[#6d4b16] bg-[#f3e6c1] p-1.5 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.45)]">
                      <Image
                        src={artwork.src}
                        alt={`${t("guardianes2026.artwork.imageAlt")} ${artwork.number}`}
                        width={900}
                        height={1200}
                        unoptimized
                        sizes="(max-width: 640px) 82vw, (max-width: 768px) 70vw, (max-width: 1024px) 42vw, 410px"
                        className="h-[14.5rem] w-full rounded-[2px] object-cover sm:h-[16rem] md:h-[18rem]"
                        loading={index < 6 ? "eager" : "lazy"}
                      />
                    </div>
                  </div>
                </div>

                <figcaption className="min-h-0 flex-1 overflow-y-auto bg-white px-3 pb-4 pt-3 sm:px-4 md:px-5">
                  <p className="text-[0.72rem] font-semibold uppercase tracking-[0.16em] text-[#8a6420]">
                    {t("guardianes2026.artwork.work")} {artwork.number}
                  </p>
                  <p className="mt-2 text-[0.78rem] leading-5 text-[#244038] sm:text-[0.82rem]">
                    {t(`guardianes2026.artworks.${artwork.number}.curatorial`)}
                  </p>
                </figcaption>
              </div>
            </figure>
          )}
        />

        <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2 text-xs leading-5 text-[#5c6f66]">
          <span>{t("guardianes2026.hero.subtitle")}</span>
          <span>{t("guardianes2026.facts.date.primary")}</span>
          <span>Parque El Canario</span>
          <span>{ARTWORKS.length} {t("guardianes2026.artwork.digitizedWorks")}</span>
        </div>
      </div>
    </section>
  );
}

function EventPhotoSection({ t }) {
  return (
    <section className="mx-auto max-w-7xl px-4 pb-12 md:px-6 md:pb-16">
      <div className="pt-8 md:pt-10">
        <div
          className="mb-8 h-px w-full bg-[#d6b56d] md:mb-10"
          aria-hidden="true"
        />
        <div className="grid gap-6 lg:grid-cols-[0.72fr_1.28fr] lg:items-end">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[#9a7330]">
              {t("guardianes2026.photos.label")}
            </p>
            <h2
              className={`${displayFont.className} mt-4 text-[clamp(2.4rem,4.8vw,4.8rem)] leading-[0.98] tracking-[-0.035em] text-[#13352d]`}
              style={{ textWrap: "balance" }}
            >
              {t("guardianes2026.photos.title")}
            </h2>
          </div>
          <p className="max-w-3xl text-[1.03rem] leading-8 text-[#355148]">
            {t("guardianes2026.photos.intro")}
          </p>
        </div>

        <div className="mt-8 grid auto-rows-[minmax(20rem,auto)] gap-4 md:grid-cols-2 lg:grid-cols-3">
          {PHOTOS.map((photo, index) => (
            <figure
              key={photo.src}
              className={`group relative overflow-hidden rounded-2xl bg-[#072c26] ${
                photo.className || ""
              }`}
            >
              <Image
                src={photo.src}
                alt={`${t("guardianes2026.photos.imageAlt")} ${index + 1}`}
                width={1400}
                height={1000}
                unoptimized
                sizes={
                  photo.className?.includes("col-span")
                    ? "(max-width: 1024px) 100vw, 820px"
                    : "(max-width: 768px) 100vw, 420px"
                }
                className="h-full min-h-[20rem] w-full object-cover transition duration-700 ease-out group-hover:scale-[1.025]"
                loading={index < 2 ? "eager" : "lazy"}
              />
              <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#061b17]/95 via-[#061b17]/65 to-transparent px-4 pb-4 pt-14 text-[#f8f2df] md:px-5 md:pb-5">
                <p className="text-sm font-medium leading-6">
                  {t("guardianes2026.photos.captionTitle")}
                </p>
                <p className="mt-2 border-t border-white/14 pt-2 text-xs leading-5 text-[#d8ded8]">
                  {t("guardianes2026.photos.captionDate")}
                </p>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

function InstitutionalClose({ t }) {
  return (
    <section className="mx-auto max-w-7xl px-4 pb-16 md:px-6 md:pb-20">
      <div className="border-t border-[#d6c7a1] pt-8">
        <div className="grid gap-8 xl:grid-cols-[1fr_0.9fr]">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[#9a7330]">
              {t("guardianes2026.close.label")}
            </p>
            <h2
              className={`${displayFont.className} mt-4 text-[clamp(2.2rem,4vw,3.8rem)] leading-[1] tracking-[-0.03em] text-[#13352d]`}
            >
              {t("guardianes2026.close.title")}
            </h2>
            <p className="mt-4 max-w-2xl text-[1rem] leading-8 text-[#355148]">
              {t("guardianes2026.close.body")}
            </p>
          </div>

          <div className="grid justify-items-start gap-6 text-left sm:grid-cols-2">
            <div className="justify-self-start text-left">
              <div className="flex items-center gap-2 whitespace-nowrap text-[#0f5b48]">
                <Mail className="h-4 w-4" />
                <span className="text-[0.68rem] font-semibold uppercase tracking-[0.16em]">
                  {t("guardianes2026.close.info")}
                </span>
              </div>
              <p className="mt-3 whitespace-nowrap text-sm leading-7 text-[#355148]">
                contacto@asociacionnahiara.org
              </p>
            </div>
            <div className="justify-self-start text-left">
              <div className="flex items-center gap-2 whitespace-nowrap text-[#0f5b48]">
                <Globe2 className="h-4 w-4" />
                <span className="text-[0.68rem] font-semibold uppercase tracking-[0.16em]">
                  {t("guardianes2026.close.website")}
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
  );
}

function GuardianesContent() {
  const { t, isLoading } = useTranslation();

  if (isLoading) return <LoadingScreen />;

  return (
    <main className="min-h-screen bg-[#f5f1e8] text-[#13352d]">
      <Hero t={t} />
      <EventStory t={t} />
      <EventPhotoSection t={t} />
      <ArtworkSection t={t} />
      <InstitutionalClose t={t} />
    </main>
  );
}

export default function GuardianesDeLasFlores2026Page() {
  return (
    <Suspense fallback={<LoadingScreen />}>
      <GuardianesContent />
    </Suspense>
  );
}
