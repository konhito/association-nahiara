"use client";

import Link from "next/link";
import {
  ArrowLeft,
  CalendarDays,
  Camera,
  MapPin,
  Newspaper,
  Users,
} from "lucide-react";
import { Suspense } from "react";
import EventGallery from "../evento-dibuja-flor/EventGallery";
import { useTranslation } from "../../lib/useTranslation";

const MEDIA_DIR = "/santjordi-pics";

const FILENAMES = [
  "WhatsApp Image 2026-04-24 at 12.00.21 AM.jpeg",
  "WhatsApp Image 2026-04-24 at 12.00.22 AM (1).jpeg",
  "WhatsApp Image 2026-04-24 at 12.00.22 AM (2).jpeg",
  "WhatsApp Image 2026-04-24 at 12.00.22 AM.jpeg",
  "WhatsApp Image 2026-04-24 at 12.00.23 AM (1).jpeg",
  "WhatsApp Image 2026-04-24 at 12.00.23 AM (2).jpeg",
  "WhatsApp Image 2026-04-24 at 12.00.23 AM.jpeg",
  "WhatsApp Image 2026-04-24 at 12.00.55 AM.jpeg",
  "WhatsApp Image 2026-04-24 at 12.00.56 AM (1).jpeg",
  "WhatsApp Image 2026-04-24 at 12.00.56 AM.jpeg",
  "WhatsApp Image 2026-04-24 at 12.00.57 AM (1).jpeg",
  "WhatsApp Image 2026-04-24 at 12.00.57 AM (2).jpeg",
  "WhatsApp Image 2026-04-24 at 12.00.57 AM.jpeg",
  "WhatsApp Image 2026-04-24 at 12.00.58 AM (1).jpeg",
  "WhatsApp Image 2026-04-24 at 12.00.58 AM.jpeg",
  "WhatsApp Image 2026-04-24 at 12.00.59 AM (1).jpeg",
  "WhatsApp Image 2026-04-24 at 12.00.59 AM (2).jpeg",
  "WhatsApp Image 2026-04-24 at 12.00.59 AM.jpeg",
  "WhatsApp Image 2026-04-24 at 12.01.00 AM (1).jpeg",
  "WhatsApp Image 2026-04-24 at 12.01.00 AM.jpeg",
  "WhatsApp Image 2026-04-24 at 12.01.01 AM (1).jpeg",
  "WhatsApp Image 2026-04-24 at 12.01.01 AM.jpeg",
  "WhatsApp Image 2026-04-24 at 12.01.02 AM.jpeg",
  "WhatsApp Image 2026-04-24 at 12.03.38 AM.jpeg",
  "WhatsApp Image 2026-04-24 at 12.07.55 AM.jpeg",
  "WhatsApp Image 2026-04-24 at 12.07.56 AM (1).jpeg",
  "WhatsApp Image 2026-04-24 at 12.07.56 AM.jpeg",
];

const PHOTOS = FILENAMES.map((name, i) => ({
  src: `${MEDIA_DIR}/${encodeURIComponent(name)}`,
  alt: `Sant Jordi 2026, Barcelona - ${i + 1}`,
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
      <div className="flex items-center gap-2 text-[#efc85f]">
        <Icon className="h-4 w-4" />
        <span className="text-[0.68rem] font-semibold uppercase tracking-[0.16em]">
          {label}
        </span>
      </div>
      <p className="mt-4 text-base font-medium text-white">{primary}</p>
      <p className="mt-1 text-sm text-[#d8d3c7]">{secondary}</p>
    </div>
  );
}

function SantJordiHero({ locale }) {
  const isEs = locale === "es";
  const facts = [
    {
      icon: CalendarDays,
      label: isEs ? "Fecha" : "Date",
      primary: isEs ? "23 de abril de 2026" : "April 23, 2026",
      secondary: "Sant Jordi 2026",
    },
    {
      icon: MapPin,
      label: isEs ? "Lugar" : "Location",
      primary: "Barcelona",
      secondary: "Passeig de Fabra i Puig 370, Nou Barris",
    },
    {
      icon: Users,
      label: isEs ? "Comunidad" : "Community",
      primary: isEs
        ? "Literatura, rosas y encuentro"
        : "Literature, roses, and gathering",
      secondary: isEs ? "Asociacion Nahiara" : "Nahiara Association",
    },
  ];

  return (
    <section className="relative overflow-hidden bg-[#072c26] text-[#f7f4ec]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(196,140,70,0.18),transparent_30%),radial-gradient(circle_at_78%_26%,rgba(214,97,82,0.18),transparent_24%),radial-gradient(circle_at_bottom_left,rgba(114,148,100,0.18),transparent_30%)]" />
      <div className="absolute right-[-8rem] top-[8rem] h-[28rem] w-[28rem] rounded-full border border-[#d6b56d]/15" />
      <div className="absolute left-[-10rem] top-[18rem] h-[24rem] w-[24rem] rounded-full border border-[#d6b56d]/10" />

      <div className="relative mx-auto flex max-w-7xl flex-col px-4 pb-18 pt-6 md:px-6 md:pb-24 md:pt-8">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm font-medium text-[#e8e0cf] transition hover:text-white"
          >
            <ArrowLeft className="h-4 w-4" />
            {isEs ? "Volver al inicio" : "Back to Home"}
          </Link>
          <Link
            href="/press"
            className="inline-flex items-center gap-2 rounded-full border border-white/15 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-[#e8e0cf] transition hover:bg-white/8 hover:text-white"
          >
            <Newspaper className="h-3.5 w-3.5" />
            {isEs ? "Prensa" : "Press"}
          </Link>
        </div>

        <div className="relative mt-10 grid items-end gap-12 lg:grid-cols-[minmax(0,1.08fr)_minmax(320px,0.92fr)]">
          <div className="relative z-10">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[#d6b56d]">
              {isEs ? "23 de abril - Barcelona" : "April 23 - Barcelona"}
            </p>
            <h1 className="mt-6 max-w-4xl text-[clamp(3.4rem,8vw,7rem)] leading-[0.94] tracking-[-0.04em] text-[#fbf8f0]">
              Sant Jordi
              <br />
              2026
            </h1>
            <p className="mt-5 text-lg font-semibold uppercase tracking-[0.18em] text-[#efc85f]">
              {isEs
                ? "Literatura, rosas y comunidad"
                : "Literature, roses, and community"}
            </p>
            <p className="mt-7 max-w-2xl text-[1.05rem] leading-8 text-[#d7ded8]">
              {isEs
                ? "Una pagina publica para reunir la memoria visual del encuentro, su contexto cultural y los recursos de prensa de la Asociacion Nahiara en Barcelona."
                : "A public page gathering the visual memory, cultural context, and press resources for Nahiara Association's Sant Jordi presence in Barcelona."}
            </p>

            <div className="mt-10 grid gap-4 md:grid-cols-3">
              {facts.map((fact) => (
                <FactItem key={fact.label} {...fact} />
              ))}
            </div>
          </div>

          <div className="relative mx-auto min-h-[28rem] w-full max-w-[31rem] lg:min-h-[39rem]">
            <div className="absolute right-[-1rem] top-[-1rem] z-20 rounded-full bg-[#d6b56d]/10 px-4 py-2 text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-[#efc85f]">
              {PHOTOS.length} {isEs ? "fotos" : "photos"}
            </div>
            <div className="absolute left-[-1rem] top-[5%] h-16 w-16 rounded-full border border-[#d6b56d]/35" />
            <div className="absolute bottom-[8%] left-[-8%] z-0 h-36 w-36 rounded-full bg-[#d66152]/20 blur-2xl md:h-52 md:w-52" />
            <div className="absolute right-[-10%] top-[20%] z-0 h-44 w-44 rounded-full bg-[#d6b56d]/14 blur-3xl md:h-64 md:w-64" />
            <div className="relative z-10 overflow-hidden rounded-[28px] border border-[#e8d3a3]/25 bg-[#08251f] shadow-[0_28px_70px_-35px_rgba(0,0,0,0.85)]">
              <img
                src={PHOTOS[0].src}
                alt={PHOTOS[0].alt}
                className="h-[34rem] w-full object-cover lg:h-[40rem]"
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent px-6 pb-6 pt-24">
                <p className="flex items-center gap-2 text-sm font-medium text-white/90">
                  <MapPin className="h-4 w-4" />
                  Passeig de Fabra i Puig 370, Barcelona
                </p>
              </div>
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
  );
}

function IntroColumn({ lang, title, intro, body, details }) {
  return (
    <article lang={lang} className="border-t border-[#d6c7a1] pt-6">
      <div className="flex items-center gap-4">
        <span className="text-xs font-semibold uppercase tracking-[0.22em] text-[#9a7330]">
          {lang.toUpperCase()}
        </span>
        <div className="h-px flex-1 bg-[#d6c7a1]/80" />
      </div>
      <h2 className="mt-6 text-[clamp(2.2rem,4vw,3.6rem)] leading-[1.02] tracking-[-0.03em] text-[#11362d]">
        {title}
      </h2>
      <div className="mt-6 space-y-5 text-[1rem] leading-8 text-[#355148]">
        <p>{intro}</p>
        <p>{body}</p>
      </div>
      <dl className="mt-8 grid gap-x-8 gap-y-5 sm:grid-cols-2">
        {details.map((detail) => (
          <div key={detail.label}>
            <dt className="text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-[#6b7b74]">
              {detail.label}
            </dt>
            <dd className="mt-2 text-sm text-[#284239]">{detail.value}</dd>
          </div>
        ))}
      </dl>
    </article>
  );
}

function EditorialIntro({ locale }) {
  const isEs = locale === "es";
  const details = [
    {
      label: isEs ? "Fecha" : "Date",
      value: isEs ? "23 de abril de 2026" : "April 23, 2026",
    },
    {
      label: isEs ? "Lugar" : "Location",
      value: "Passeig de Fabra i Puig 370, Barcelona",
    },
    {
      label: isEs ? "Archivo" : "Archive",
      value: `${PHOTOS.length} ${isEs ? "fotografias del encuentro" : "event photographs"}`,
    },
    {
      label: isEs ? "Organiza" : "Organizer",
      value: isEs ? "Asociacion Nahiara" : "Nahiara Association",
    },
  ];

  return (
    <section className="relative mx-auto max-w-7xl px-4 pb-10 pt-10 md:px-6 md:pb-12">
      <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-start">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[#9a7330]">
            {isEs ? "Memoria del encuentro" : "Event memory"}
          </p>
          <h2 className="mt-4 max-w-2xl text-[clamp(2.7rem,4.8vw,5rem)] leading-[0.98] tracking-[-0.035em] text-[#13352d]">
            {isEs ? "Barcelona, libros y rosas" : "Barcelona, books, and roses"}
          </h2>
          <div className="mt-6 max-w-3xl space-y-5 text-[1.03rem] leading-8 text-[#355148]">
            <p>
              {isEs
                ? "Sant Jordi es una fecha de encuentro publico entre lectura, calle y afecto. Esta pagina recoge la presencia de Nahiara en Barcelona como una extension cultural de su defensa de las flores."
                : "Sant Jordi is a public meeting point for reading, streets, and affection. This page records Nahiara's presence in Barcelona as a cultural extension of its defense of flowers."}
            </p>
            <p>
              {isEs
                ? "La galeria conserva imagenes del evento y deja preparado un espacio de prensa para notas, enlaces y materiales compartibles."
                : "The gallery preserves event images and prepares a press area for notes, links, and shareable material."}
            </p>
          </div>
        </div>

        <div className="border-l border-[#d6c7a1] pl-0 lg:pl-10">
          <div className="flex items-center gap-2 text-[#0f5b48]">
            <Camera className="h-4 w-4" />
            <p className="text-sm font-semibold uppercase tracking-[0.22em]">
              {isEs ? "Galeria documental" : "Documentary gallery"}
            </p>
          </div>
          <h2 className="mt-4 text-[clamp(2.1rem,3.8vw,3.5rem)] leading-[1] tracking-[-0.03em] text-[#13352d]">
            {isEs ? "Un archivo visual listo para ampliar" : "A visual archive ready to grow"}
          </h2>
          <p className="mt-5 text-[1rem] leading-8 text-[#355148]">
            {isEs
              ? "Las fotografias se presentan como archivo vivo: primero una seleccion amplia del encuentro, despues el material de prensa cuando este disponible."
              : "The photographs are presented as a living archive: first a broad event selection, then press material as it becomes available."}
          </p>
        </div>
      </div>

      <div className="mt-12 grid gap-12">
        <IntroColumn
          lang={isEs ? "es" : "en"}
          title={isEs ? "Sant Jordi 2026" : "Sant Jordi 2026"}
          intro={
            isEs
              ? "La Asociacion Nahiara participa en Sant Jordi desde una idea simple: cada rosa tambien puede contar una historia de cuidado, cultura y biodiversidad."
              : "Nahiara Association approaches Sant Jordi through a simple idea: every rose can also tell a story of care, culture, and biodiversity."
          }
          body={
            isEs
              ? "Este espacio conecta la celebracion literaria de Barcelona con el universo Proveneya & Nahiara, sus iniciativas educativas y su archivo botanico internacional."
              : "This space connects Barcelona's literary celebration with the Proveneya & Nahiara universe, its educational initiatives, and its international botanical archive."
          }
          details={details}
        />
      </div>
    </section>
  );
}

function PressPlaceholder({ locale }) {
  const isEs = locale === "es";
  return (
    <section
      className="mx-auto max-w-7xl px-4 pb-16 pt-4 md:px-6 md:pb-20"
      aria-label={isEs ? "Prensa" : "Press"}
    >
      <div className="border-t border-[#d6c7a1] pt-8">
        <div className="grid gap-8 lg:grid-cols-[1fr_0.9fr]">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[#9a7330]">
              {isEs ? "Prensa" : "Press"}
            </p>
            <h2 className="mt-4 text-[clamp(2.2rem,4vw,3.8rem)] leading-[1] tracking-[-0.03em] text-[#13352d]">
              {isEs ? "Material para medios" : "Media material"}
            </h2>
            <p className="mt-4 max-w-2xl text-[1rem] leading-8 text-[#355148]">
              {isEs
                ? "Clippings, notas y enlaces apareceran aqui cuando el material este listo."
                : "Clippings, notes, and links will appear here once materials are ready."}
            </p>
          </div>
          <div className="flex items-start gap-4 border-l border-[#d6c7a1] pl-0 lg:pl-10">
            <div className="mt-1 flex h-10 w-10 flex-none items-center justify-center rounded-full bg-[#0f5b48] text-white">
              <Newspaper className="h-5 w-5" />
            </div>
            <div>
              <p className="text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-[#9a7330]">
                {isEs ? "Proximamente" : "Coming soon"}
              </p>
              <p className="mt-2 text-sm leading-7 text-[#355148]">
                {isEs
                  ? "Este espacio se actualizara con recursos oficiales, apariciones y enlaces utiles para compartir."
                  : "This area will be updated with official resources, appearances, and useful sharing links."}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function SantJordi2026Content() {
  const { locale, isLoading } = useTranslation();
  const isEs = locale === "es";

  if (isLoading) {
    return <LoadingScreen />;
  }

  const galleryTitle = isEs ? "Galeria de fotos" : "Photo gallery";
  const gallerySubtitle = isEs
    ? `${PHOTOS.length} fotografias del evento - haz clic para ampliar`
    : `${PHOTOS.length} event photos - click to enlarge`;

  const loadMoreLabel = (n) =>
    isEs ? `Ver mas fotos (${n} restantes)` : `View more photos (${n} left)`;

  return (
    <main className="min-h-screen bg-[#f5f1e8] text-[#102a23]">
      <SantJordiHero locale={locale} />
      <EditorialIntro locale={locale} />
      <EventGallery
        photos={PHOTOS}
        galleryTitle={galleryTitle}
        gallerySubtitle={gallerySubtitle}
        loadMoreLabel={loadMoreLabel}
      />
      <PressPlaceholder locale={locale} />
    </main>
  );
}

export default function SantJordi2026Page() {
  return (
    <Suspense fallback={<LoadingScreen />}>
      <SantJordi2026Content />
    </Suspense>
  );
}
