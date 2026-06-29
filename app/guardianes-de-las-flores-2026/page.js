"use client";

import Link from "next/link";
import Image from "next/image";
import {
  ArrowLeft,
  CalendarDays,
  Camera,
  Clock3,
  Flower2,
  MapPin,
  Palette,
  Sparkles,
  Users,
} from "lucide-react";
import { Suspense } from "react";
import EventGallery from "../evento-dibuja-flor/EventGallery";
import { useTranslation } from "../../lib/useTranslation";

const MEDIA_DIR = "/guardianes-flores-2026";
const POSTER = `${MEDIA_DIR}/poster.jpeg`;
const PHOTOS = Array.from({ length: 14 }, (_, index) => ({
  src: `${MEDIA_DIR}/photo-${String(index + 1).padStart(2, "0")}.jpeg`,
  alt: `Nahiara y los Guardianes de las Flores, Parque El Canario - ${index + 1}`,
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
    <div className="rounded-[24px] border border-white/10 bg-white/[0.04] p-4 backdrop-blur-sm">
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

function Hero({ locale }) {
  const isEs = locale === "es";
  const facts = [
    {
      icon: CalendarDays,
      label: isEs ? "Fecha" : "Date",
      primary: isEs ? "19 de mayo de 2026" : "May 19, 2026",
      secondary: isEs ? "Martes, desde las 18:30" : "Tuesday, from 18:30",
    },
    {
      icon: MapPin,
      label: isEs ? "Lugar" : "Location",
      primary: "Parque El Canario",
      secondary: "AA.VV. Vereda El Canario, Santa Lucia de Tirajana",
    },
    {
      icon: Users,
      label: isEs ? "Encuentro" : "Gathering",
      primary: isEs ? "Para todas las edades" : "For all ages",
      secondary: isEs ? "Arte, juego y biodiversidad" : "Art, play, and biodiversity",
    },
  ];
  const posterLabel = isEs ? "Cartel del encuentro" : "Event poster";
  const posterTime = isEs ? "Desde las 18:30" : "From 18:30";

  return (
    <section className="relative overflow-hidden bg-[#072c26] text-[#f7f4ec]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(196,140,70,0.18),transparent_30%),radial-gradient(circle_at_78%_26%,rgba(214,97,82,0.18),transparent_24%),radial-gradient(circle_at_bottom_left,rgba(114,148,100,0.18),transparent_30%)]" />
      <div className="absolute right-[-8rem] top-[8rem] h-[28rem] w-[28rem] rounded-full border border-[#d6b56d]/15" />
      <div className="absolute left-[-10rem] top-[18rem] h-[24rem] w-[24rem] rounded-full border border-[#d6b56d]/10" />

      <div className="relative mx-auto flex max-w-7xl flex-col px-4 pb-18 pt-6 md:px-6 md:pb-24 md:pt-8">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm font-medium text-[#e3ece7] transition hover:text-[#fffaf0]"
        >
          <ArrowLeft className="h-4 w-4" />
          {isEs ? "Volver al inicio" : "Back to Home"}
        </Link>

        <div className="relative mt-10 grid items-end gap-12 lg:grid-cols-[minmax(0,1.08fr)_minmax(360px,0.92fr)] lg:gap-16">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[#f0c858]">
              {isEs ? "19 de mayo, Gran Canaria" : "May 19, Gran Canaria"}
            </p>
            <h1 className="mt-6 max-w-4xl text-[clamp(3.1rem,7.5vw,6.8rem)] leading-[0.96] text-[#fffaf0]">
              {isEs ? "Guardianes de las Flores" : "Guardians of the Flowers"}
            </h1>
            <p className="mt-6 max-w-2xl text-lg font-semibold uppercase tracking-[0.14em] text-[#f2cd68]">
              Nahiara y los Guardianes de las Flores
            </p>
            <p className="mt-7 max-w-2xl text-[1.05rem] leading-8 text-[#d7e2dd]">
              {isEs
                ? "Una tarde de creatividad, juego y convivencia para descubrir las flores y los polinizadores en comunidad."
                : "An afternoon of creativity, play, and community celebrating flowers and pollinators together."}
            </p>

            <div className="mt-10 grid gap-5 md:grid-cols-3">
              {facts.map((fact) => (
                <FactItem key={fact.label} {...fact} />
              ))}
            </div>
          </div>

          <figure className="relative mx-auto min-h-[28rem] w-full max-w-[32rem] lg:min-h-[39rem] lg:translate-y-4">
            <div className="absolute left-[-1rem] top-[5%] h-16 w-16 rounded-full border border-[#d6b56d]/35" />
            <div className="absolute bottom-[8%] left-[-8%] z-0 h-36 w-36 rounded-full bg-[#d66152]/20 blur-2xl md:h-52 md:w-52" />
            <div className="absolute right-[-10%] top-[20%] z-0 h-44 w-44 rounded-full bg-[#d6b56d]/14 blur-3xl md:h-64 md:w-64" />
            <div className="absolute inset-6 rounded-[2.3rem] border border-[#d6b56d]/16" />
            <div className="relative z-10 rounded-[2rem] border border-white/10 bg-[#123f35]/88 p-4 shadow-[0_45px_110px_-45px_rgba(0,0,0,0.9)] backdrop-blur-[2px] sm:p-5">
              <div className="absolute inset-0 rounded-[2rem] bg-[linear-gradient(160deg,rgba(214,181,109,0.15),transparent_34%,transparent_72%,rgba(214,97,82,0.12))]" />
              <div className="relative overflow-hidden rounded-[1.4rem] border border-white/12 bg-[#efe6d4] p-2 shadow-[0_18px_50px_-24px_rgba(0,0,0,0.75)] sm:p-3">
                <Image
                  src={POSTER}
                  alt="Cartel de Nahiara y los Guardianes de las Flores"
                  width={1080}
                  height={1920}
                  priority
                  unoptimized
                  sizes="(min-width: 1024px) 32rem, min(100vw - 2rem, 32rem)"
                  className="h-auto w-full rounded-[1rem] object-contain"
                />
              </div>
              <figcaption className="relative mt-4 flex flex-wrap items-center justify-between gap-3 px-1">
                <div>
                  <p className="text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-[#f0c858]">
                    {posterLabel}
                  </p>
                  <p className="mt-1 text-sm leading-6 text-[#d4dfda]">
                    {isEs
                      ? "El afiche oficial acompana la memoria visual del encuentro."
                      : "The official poster anchors the event's visual memory."}
                  </p>
                </div>
                <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-black/10 px-3 py-2 text-sm text-[#f6efe1]">
                  <Clock3 className="h-4 w-4 text-[#f0c858]" />
                  {posterTime}
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

function Activity({ icon: Icon, title, body }) {
  return (
    <article className="border-t border-[#cfbea0] pt-6">
      <Icon className="h-6 w-6 text-[#c85243]" />
      <h3 className="mt-5 text-xl font-semibold text-[#13352d]">{title}</h3>
      <p className="mt-3 max-w-md text-sm leading-7 text-[#49635a]">{body}</p>
    </article>
  );
}

function EventStory({ locale }) {
  const isEs = locale === "es";
  const activities = isEs
    ? [
        [Palette, "Dibuja tu polinizador", "Un mural colectivo construido con las flores, insectos y colores imaginados por las familias."],
        [Sparkles, "Mesa de Guardianes", "Un juego de cartas para todas las edades que acerca la biodiversidad a traves del juego."],
        [Flower2, "Flores del mundo", "Una invitacion a reconocer la flor nacional de distintos paises y compartir su historia."],
        [Users, "Guardianes de las Flores", "Cada participante pudo recibir su diploma oficial con el sello de la asociacion."],
      ]
    : [
        [Palette, "Draw your pollinator", "A collective mural built from the flowers, insects, and colors imagined by participating families."],
        [Sparkles, "Guardians table", "An all-ages card game that brings biodiversity closer through play."],
        [Flower2, "Flowers of the world", "An invitation to identify national flowers from different countries and share their stories."],
        [Users, "Guardians of the Flowers", "Each participant could receive an official diploma bearing the association's seal."],
      ];

  return (
    <section className="bg-[#f5f1e8] px-4 py-20 md:px-6 md:py-28">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-end">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#9a7330]">
              {isEs ? "Memoria del encuentro" : "Event memory"}
            </p>
            <h2 className="mt-5 max-w-3xl text-[clamp(2.5rem,5vw,5rem)] leading-[1] text-[#13352d]">
              {isEs ? "Una plaza convertida en jardin compartido" : "A public square transformed into a shared garden"}
            </h2>
          </div>
          <div className="border-t border-[#cfbea0] pt-6 lg:border-t-0 lg:border-l lg:pl-10 lg:pt-0">
            <p className="text-[1.03rem] leading-8 text-[#355148]">
              {isEs
                ? "Nahiara y la AA.VV. Vereda El Canario reunieron a ninas, ninos y familias para aprender haciendo: dibujar, jugar, reconocer flores y celebrar a quienes cuidan la biodiversidad."
                : "Nahiara and AA.VV. Vereda El Canario brought children and families together to learn by doing: drawing, playing, identifying flowers, and celebrating those who protect biodiversity."}
            </p>
            <p className="mt-5 text-[1.03rem] leading-8 text-[#355148]">
              {isEs
                ? "La exposicion de dibujos y el mural colectivo dejaron una memoria visible de una tarde dedicada a la tradicion, la cultura y la convivencia."
                : "The drawing exhibition and collective mural left a visible record of an afternoon devoted to tradition, culture, and community."}
            </p>
          </div>
        </div>

        <div className="mt-16 grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
          {activities.map(([icon, title, body]) => (
            <Activity key={title} icon={icon} title={title} body={body} />
          ))}
        </div>
      </div>
    </section>
  );
}

function InstitutionalClose({ locale }) {
  const isEs = locale === "es";
  return (
    <section className="bg-[#103a31] px-4 py-16 text-[#f8f3e9] md:px-6">
      <div className="mx-auto grid max-w-7xl gap-8 md:grid-cols-[1fr_auto] md:items-end">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#f0c858]">
            {isEs ? "Con la colaboracion de" : "With the collaboration of"}
          </p>
          <p className="mt-4 max-w-3xl text-xl leading-8">
            AA.VV. Vereda El Canario y Ayuntamiento de Santa Lucia de Tirajana
          </p>
          <p className="mt-3 text-sm text-[#cbd9d4]">
            {isEs ? "Tradicion, cultura y convivencia" : "Tradition, culture, and community"}
          </p>
        </div>
        <Link href="/" className="inline-flex items-center gap-2 text-sm font-semibold text-[#f0c858] hover:text-[#fffaf0]">
          <Flower2 className="h-4 w-4" />
          Asociacion Nahiara
        </Link>
      </div>
    </section>
  );
}

function GuardianesContent() {
  const { locale, isLoading } = useTranslation();
  const isEs = locale === "es";

  if (isLoading) return <LoadingScreen />;

  return (
    <main className="min-h-screen bg-[#f5f1e8] text-[#13352d]">
      <Hero locale={locale} />
      <EventStory locale={locale} />
      <div className="bg-[#edf2e9]">
        <div className="mx-auto max-w-7xl px-4 pt-16 text-center md:px-6">
          <Camera className="mx-auto h-6 w-6 text-[#c85243]" />
        </div>
        <EventGallery
          photos={PHOTOS}
          galleryTitle={isEs ? "Galeria del encuentro" : "Event gallery"}
          gallerySubtitle={
            isEs
              ? "14 fotografias de la jornada, haz clic para ampliar"
              : "14 photographs from the event, click to enlarge"
          }
          loadMoreLabel={(remaining) =>
            isEs ? `Ver mas fotos (${remaining} restantes)` : `View more photos (${remaining} left)`
          }
        />
      </div>
      <InstitutionalClose locale={locale} />
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
