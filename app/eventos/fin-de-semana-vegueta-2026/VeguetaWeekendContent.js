"use client";

import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowUpRight,
  CalendarDays,
  Clock3,
  MapPin,
  Users,
} from "lucide-react";
import { changeLanguage, locales, useTranslation } from "../../../lib/useTranslation";

const marketPoster = "/events/vegueta-weekend-2026/flower-market.jpeg";
const animalsPoster = "/events/vegueta-weekend-2026/de-patas-vegueta.png";
const officialNoticeUrl =
  "https://www.laspalmasgc.es/es/ayuntamiento/prensa-y-comunicacion/notas-de-prensa/nota-de-prensa/Vegueta-celebra-De-patas-por-Vegueta-una-jornada-familiar-dedicada-a-las-mascotas/";
const festivalProgrammeUrl =
  "https://www.laspalmasgc.es/es/ayuntamiento/prensa-y-comunicacion/notas-de-prensa/nota-de-prensa/Vegueta-celebra-las-Fiestas-del-Rosario-con-musica-tradicion-y-actividades-para-todos-los-publicos/";
const mapUrl =
  "https://www.google.com/maps/search/?api=1&query=Plaza+de+Santo+Domingo%2C+Vegueta%2C+Las+Palmas+de+Gran+Canaria";
const languageNames = {
  en: "English",
  es: "Español",
  fr: "Français",
  de: "Deutsch",
  it: "Italiano",
  zh: "中文",
};

function Fact({ icon: Icon, label, primary, secondary, href }) {
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
    </>
  );
  const className =
    "rounded-2xl border border-white/10 bg-white/[0.04] p-4 backdrop-blur-sm";

  return href ? (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className={className + " transition hover:border-[#efc85f]/45 hover:bg-white/[0.07]"}
    >
      {content}
    </a>
  ) : (
    <div className={className}>{content}</div>
  );
}

export default function VeguetaWeekendContent({ displayFontClassName }) {
  const { t, locale, isLoading } = useTranslation();
  const key = (name) => "veguetaWeekend." + name;

  if (isLoading) {
    return (
      <main lang={locale} className="min-h-screen bg-[#f5f1e8] px-4 py-16 text-[#102a23]">
        <p role="status" className="mx-auto max-w-7xl text-sm text-[#355148]">
          Loading event details…
        </p>
      </main>
    );
  }

  const heroFacts = [
    { icon: Users, text: t(key("publicEvent")) },
    { icon: CalendarDays, text: t(key("saturdayChip")) },
    { icon: CalendarDays, text: t(key("sundayChip")) },
    { icon: MapPin, text: t(key("locationChip")) },
  ];
  const factCards = [
    {
      icon: CalendarDays,
      label: t(key("saturdayLabel")),
      primary: t(key("saturdayPrimary")),
      secondary: t(key("saturdaySecondary")),
    },
    {
      icon: Clock3,
      label: t(key("sundayLabel")),
      primary: t(key("sundayPrimary")),
      secondary: t(key("sundaySecondary")),
    },
    {
      icon: MapPin,
      label: t(key("locationLabel")),
      primary: t(key("locationPrimary")),
      secondary: t(key("locationSecondary")),
      href: mapUrl,
    },
  ];
  const program = t(key("programDetails"));

  return (
    <main lang={locale} className="min-h-screen bg-[#f5f1e8] text-[#102a23]">
      <section className="relative overflow-hidden bg-[#072c26] text-[#f7f4ec]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(196,140,70,0.16),transparent_28%),radial-gradient(circle_at_80%_35%,rgba(217,97,82,0.12),transparent_24%),radial-gradient(circle_at_bottom_left,rgba(114,148,100,0.16),transparent_28%)]" />
        <div className="absolute right-[-8rem] top-[8rem] h-[28rem] w-[28rem] rounded-full border border-[#d6b56d]/15" />
        <div className="absolute left-[-10rem] top-[18rem] h-[24rem] w-[24rem] rounded-full border border-[#d6b56d]/10" />

        <div className="relative mx-auto flex max-w-7xl flex-col px-4 pb-0 pt-6 md:px-6 md:pt-8">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-sm font-medium text-[#e8e0cf] transition hover:text-white"
            >
              <ArrowLeft aria-hidden="true" className="h-4 w-4" />
              {t(key("back"))}
            </Link>

            <div className="flex flex-wrap items-center gap-2">
              <label className="sr-only" htmlFor="event-language">
                {t(key("languageLabel"))}
              </label>
              <select
                id="event-language"
                aria-label={t(key("languageLabel"))}
                value={locale}
                onChange={(event) => changeLanguage(event.target.value)}
                className="rounded-full border border-white/15 bg-[#072c26] px-3 py-1.5 text-xs font-semibold text-[#e8e0cf] focus:outline-none focus:ring-2 focus:ring-[#efc85f]"
              >
                {locales.map((language) => (
                  <option key={language} value={language}>
                    {languageNames[language]}
                  </option>
                ))}
              </select>
              <a
                href="#programme"
                className="inline-flex items-center gap-2 rounded-full border border-white/15 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-[#e8e0cf] transition hover:bg-white/8 hover:text-white"
              >
                <CalendarDays aria-hidden="true" className="h-3.5 w-3.5" />
                {t(key("program"))}
              </a>
              <a
                href={mapUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-white/15 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-[#e8e0cf] transition hover:bg-white/8 hover:text-white"
              >
                <MapPin aria-hidden="true" className="h-3.5 w-3.5" />
                {t(key("directions"))}
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
                      <Icon aria-hidden="true" className="h-4 w-4 shrink-0 text-[#efc85f]" />
                      <span className="leading-tight">{item.text}</span>
                    </span>
                  );
                })}
              </div>

              <h1
                className={displayFontClassName + " mt-0 max-w-4xl text-[clamp(3.4rem,8vw,7rem)] leading-[0.94] tracking-[-0.04em] text-[#fbf8f0] sm:mt-6"}
                style={{ textWrap: "balance" }}
              >
                {t(key("titleTop"))}
                <br />
                {t(key("titleBottom"))}
              </h1>
              <p className="mt-5 text-lg font-semibold uppercase tracking-[0.16em] text-[#efc85f]">
                {t(key("eventLine"))}
              </p>
              <p
                className={displayFontClassName + " mt-6 max-w-3xl text-[clamp(1.7rem,3vw,2.9rem)] italic leading-[1.08] tracking-[-0.02em] text-[#f4baa9]"}
              >
                {t(key("heroSubtitle"))}
              </p>
              <p className="mt-7 max-w-2xl text-[1.05rem] leading-8 text-[#d7ded8]">
                {t(key("heroIntro"))}
              </p>

              <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:mt-10 lg:grid-cols-3">
                {factCards.map((item) => (
                  <Fact key={item.label} {...item} />
                ))}
              </div>
            </div>

            <figure className="relative mx-auto min-h-[27rem] w-full max-w-[24rem] sm:max-w-[34rem] lg:min-h-[42rem]">
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
                {t(key("postersLabel"))}
              </span>
              <div className="relative z-10 grid grid-cols-2 items-start gap-2 sm:gap-3">
                <div className="mt-8 overflow-hidden rounded-2xl border border-[#e8d3a3]/25 bg-[#08251f] shadow-[0_28px_70px_-35px_rgba(0,0,0,0.85)] sm:rounded-[22px]">
                  <Image
                    src={marketPoster}
                    alt={t(key("marketPosterAlt"))}
                    width={1054}
                    height={1536}
                    sizes="(max-width: 1024px) 42vw, 260px"
                    className="h-auto w-full"
                    priority
                  />
                </div>
                <div className="overflow-hidden rounded-2xl border border-[#e8d3a3]/25 bg-[#08251f] shadow-[0_28px_70px_-35px_rgba(0,0,0,0.85)] sm:rounded-[22px]">
                  <Image
                    src={animalsPoster}
                    alt={t(key("animalsPosterAlt"))}
                    width={1123}
                    height={1408}
                    sizes="(max-width: 1024px) 42vw, 260px"
                    className="h-auto w-full"
                    priority
                  />
                </div>
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

      <section
        id="programme"
        aria-labelledby="programme-heading"
        className="mx-auto max-w-7xl px-4 pb-12 pt-4 md:px-6 md:pb-16"
      >
        <h2 id="programme-heading" className="sr-only">
          {t(key("detailsLabel"))}
        </h2>
        <article className="border-y border-[#d6c7a1] py-8 lg:py-10">
          <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[#0f5b48]">
            {languageNames[locale]}
          </p>
          <h3
            className={displayFontClassName + " mt-4 max-w-4xl text-[clamp(2.2rem,3.8vw,3.8rem)] leading-[0.98] tracking-[-0.035em] text-[#13352d]"}
            style={{ textWrap: "balance" }}
          >
            {t(key("copy.hook"))}
          </h3>
          <div className="mt-6 max-w-4xl text-[1.03rem] leading-8 text-[#355148]">
            <p>{t(key("copy.intro"))}</p>
            <ul className="mt-5">
              <li className="border-t border-[#d6c7a1] py-4 text-[1rem] leading-7">
                <strong className="text-[#13352d]">{t(key("copy.saturdayLead"))}</strong>{" "}
                {t(key("copy.saturdayBody"))}
              </li>
              <li className="border-t border-[#d6c7a1] py-4 text-[1rem] leading-7">
                <strong className="text-[#13352d]">{t(key("copy.sundayLead"))}</strong>{" "}
                {t(key("copy.sundayBody"))}
              </li>
            </ul>
            <p className="mt-5">{t(key("copy.booth"))}</p>
            <p className="mt-4 font-semibold leading-8 text-[#244038]">
              {t(key("copy.admission"))}
            </p>
          </div>
        </article>
      </section>

      <section
        aria-labelledby="weekend-program-heading"
        className="mx-auto max-w-7xl px-4 pb-14 md:px-6 md:pb-20"
      >
        <h2
          id="weekend-program-heading"
          className={displayFontClassName + " max-w-4xl text-[clamp(2.3rem,4.2vw,4rem)] leading-[1.02] tracking-[-0.035em] text-[#13352d]"}
          style={{ textWrap: "balance" }}
        >
          {program.sectionTitle}
        </h2>
        <p className="mt-3 max-w-3xl text-sm leading-6 text-[#50655d]">
          {program.context}
        </p>

        <div className="mt-8 grid gap-10 border-t border-[#d6c7a1] pt-8 lg:grid-cols-2 lg:gap-14">
          <article id="flower-market">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#9a7330]">
              {program.marketTitle}
            </p>
            <p className="mt-4 max-w-2xl text-base leading-8 text-[#355148]">
              {program.marketIntro}
            </p>
            <ul className="mt-5 space-y-3 text-sm leading-6 text-[#284239]">
              {program.marketActivities.map((activity) => (
                <li key={activity} className="flex gap-3">
                  <span aria-hidden="true" className="text-[#9a7330]">✳</span>
                  <span>{activity}</span>
                </li>
              ))}
            </ul>
          </article>

          <article
            id="de-patas"
            className="border-t border-[#d6c7a1] pt-8 lg:border-l lg:border-t-0 lg:pl-12 lg:pt-0"
          >
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#0f5b48]">
              {program.familyTitle}
            </p>
            <p className="mt-4 max-w-2xl text-base leading-8 text-[#355148]">
              {program.familyIntro}
            </p>
            <ul className="mt-5 space-y-3 text-sm leading-6 text-[#284239]">
              {program.familyActivities.map((activity) => (
                <li key={activity} className="flex gap-3">
                  <span aria-hidden="true" className="text-[#0f5b48]">✳</span>
                  <span>{activity}</span>
                </li>
              ))}
            </ul>

            <div className="mt-8 border-t border-[#d6c7a1] pt-6">
              <h3 className={displayFontClassName + " text-2xl text-[#13352d]"}>
                {program.runwayTitle}
              </h3>
              <p className="mt-2 text-sm leading-6 text-[#355148]">
                {program.runwayIntro}
              </p>
              <p className="mt-4 text-xs font-semibold uppercase tracking-[0.16em] text-[#6b7b74]">
                {program.runwayAwardsLabel}
              </p>
              <ul className="mt-2 flex flex-wrap gap-x-5 gap-y-2 text-sm text-[#284239]">
                {program.runwayAwards.map((award) => (
                  <li key={award}>{award}</li>
                ))}
              </ul>
            </div>

            <div className="mt-7">
              <h3 className="text-xs font-semibold uppercase tracking-[0.16em] text-[#6b7b74]">
                {program.protectorsLabel}
              </h3>
              <ul className="mt-3 flex flex-wrap gap-x-4 gap-y-2 text-sm font-medium text-[#284239]">
                {program.protectors.map((group) => (
                  <li key={group}>{group}</li>
                ))}
              </ul>
              <p className="mt-4 text-sm leading-6 text-[#355148]">
                {program.advice}
              </p>
              <div className="mt-4 flex flex-wrap gap-x-6 gap-y-3">
                <a
                  href={officialNoticeUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 text-sm font-semibold text-[#0f5b48] underline decoration-[#d6b56d] underline-offset-4 transition hover:text-[#13352d]"
                >
                  {program.sourceLabel}
                  <ArrowUpRight aria-hidden="true" className="h-4 w-4" />
                </a>
                <a
                  href={festivalProgrammeUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 text-sm font-semibold text-[#0f5b48] underline decoration-[#d6b56d] underline-offset-4 transition hover:text-[#13352d]"
                >
                  {program.festivalSourceLabel}
                  <ArrowUpRight aria-hidden="true" className="h-4 w-4" />
                </a>
              </div>
            </div>
          </article>
        </div>
      </section>
    </main>
  );
}
