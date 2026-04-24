"use client";

import Link from "next/link";
import { ChevronLeft } from "lucide-react";
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
  alt: `Sant Jordi 2026, Barcelona — ${i + 1}`,
}));

function PressPlaceholder({ locale }) {
  const isEs = locale === "es";
  return (
    <section
      className="mx-auto max-w-6xl px-4 md:px-6 py-12 border-t border-slate-200/80"
      aria-label={isEs ? "Prensa" : "Press"}
    >
      <div className="rounded-3xl border border-slate-200/80 bg-white p-8 md:p-12 text-center shadow-sm">
        <h2
          className="text-2xl font-bold text-slate-900 sm:text-3xl"
          style={{ fontFamily: "Archivo, sans-serif" }}
        >
          {isEs ? "📰 Prensa" : "📰 Press"}
        </h2>
        <p
          className="mt-3 text-slate-500 max-w-xl mx-auto"
          style={{ fontFamily: "Rubik, sans-serif" }}
        >
          {isEs
            ? "Clippings, notas y enlaces aparecerán aquí cuando el material esté listo."
            : "Clippings, notes, and links will appear here once materials are ready."}
        </p>
        <p
          className="mt-4 inline-flex items-center gap-2 rounded-full border border-amber-200/80 bg-amber-50/80 px-4 py-2 text-sm font-semibold text-amber-900"
        >
          {isEs ? "Próximamente" : "Coming soon"}
        </p>
      </div>
    </section>
  );
}

function SantJordi2026Content() {
  const { locale, isLoading } = useTranslation();
  const isEs = locale === "es";

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="w-8 h-8 border-2 border-emerald-300 border-t-emerald-600 rounded-full animate-spin" />
      </div>
    );
  }

  const tBack = {
    es: "Volver al inicio",
    en: "Back to Home",
    de: "Zurück zur Startseite",
    fr: "Retour à l'accueil",
    it: "Torna alla Home",
    zh: "返回首页",
  }[locale] || "Back to Home";

  const tBadge = isEs
    ? "Sant Jordi 2026 · 23 de abril"
    : "Sant Jordi 2026 · April 23";

  const tSub = isEs
    ? "Galería del encuentro y espacio de prensa — Asociación Nahiara en Passeig de Fabra i Puig 370, Nou Barris."
    : "Event gallery and press hub — Nahiara Association at Passeig de Fabra i Puig 370, Nou Barris.";

  const tLoc = "Passeig de Fabra i Puig 370, Barcelona";

  const galleryTitle = isEs ? "📸 Galería de fotos" : "📸 Photo gallery";
  const gallerySubtitle = isEs
    ? `${PHOTOS.length} fotografías del evento · Haz clic para ampliar`
    : `${PHOTOS.length} event photos · Click to enlarge`;

  const loadMoreLabel = (n) =>
    isEs
      ? `Ver más fotos (${n} restantes)`
      : `View more photos (${n} left)`;

  return (
    <div className="min-h-screen bg-[#faf9f6]">
      <div className="bg-white/80 backdrop-blur-md sticky top-0 z-[100] border-b border-gray-100 flex items-center justify-between px-6 py-4">
        <Link
          href="/"
          className="inline-flex items-center text-sm font-semibold text-gray-600 hover:text-emerald-600 transition-colors"
        >
          <ChevronLeft className="w-5 h-5 mr-1" />
          {tBack}
        </Link>
        <img src="/logo.svg" alt="Nahiara" className="h-8 w-auto opacity-90" />
      </div>

      <section className="relative overflow-hidden pt-16 pb-0">
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute -top-32 -right-32 h-[500px] w-[500px] rounded-full bg-gradient-to-br from-rose-200/40 via-amber-100/30 to-transparent blur-3xl" />
          <div className="absolute -bottom-20 -left-20 h-[400px] w-[400px] rounded-full bg-gradient-to-tl from-emerald-200/30 via-sky-100/20 to-transparent blur-3xl" />
        </div>

        <div className="mx-auto max-w-6xl px-4 md:px-6">
          <div className="flex flex-col items-center text-center">
            <span className="mb-5 inline-flex items-center gap-2 rounded-full border border-rose-200 bg-rose-50 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-rose-800">
              <span className="inline-block h-2 w-2 rounded-full bg-rose-500" />
              {tBadge}
            </span>
            <h1
              className="max-w-4xl text-4xl font-extrabold leading-tight text-slate-900 sm:text-5xl md:text-6xl"
              style={{ fontFamily: "Bangers, cursive", letterSpacing: "0.03em" }}
            >
              <span className="bg-gradient-to-r from-rose-600 via-amber-500 to-emerald-600 bg-clip-text text-transparent">
                Sant Jordi 2026
              </span>
              <br />
              <span className="text-slate-800">Barcelona</span>
            </h1>
            <p className="mt-5 max-w-2xl text-lg text-slate-600 sm:text-xl">{tSub}</p>
          </div>

          <div className="relative mt-10 overflow-hidden rounded-3xl shadow-2xl shadow-rose-900/10 ring-1 ring-slate-200/60">
            <img
              src={PHOTOS[0].src}
              alt={PHOTOS[0].alt}
              className="h-auto w-full object-cover"
              style={{ maxHeight: "480px", objectPosition: "center" }}
            />
            <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/55 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 px-6 pb-6 md:px-10 md:pb-8">
              <p className="text-sm font-medium text-white/90">{tLoc}</p>
            </div>
          </div>
        </div>
      </section>

      <EventGallery
        photos={PHOTOS}
        galleryTitle={galleryTitle}
        gallerySubtitle={gallerySubtitle}
        loadMoreLabel={loadMoreLabel}
      />

      <PressPlaceholder locale={locale} />
    </div>
  );
}

export default function SantJordi2026Page() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-white">
          <div className="w-8 h-8 border-2 border-emerald-300 border-t-emerald-600 rounded-full animate-spin" />
        </div>
      }
    >
      <SantJordi2026Content />
    </Suspense>
  );
}
