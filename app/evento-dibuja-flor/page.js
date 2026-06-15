"use client";

import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { Suspense } from "react";
import EventGallery from "./EventGallery";
import { useTranslation } from "../../lib/useTranslation";

const MEDIA_DIR = "/Photographs and videos of the April 11 event";

const PHOTOS = [
  { src: `${MEDIA_DIR}/WhatsApp Image 2026-04-11 at 18.01.44.jpeg`, alt: "Vista general del evento" },
  { src: `${MEDIA_DIR}/WhatsApp Image 2026-04-12 at 10.14.28 (3).jpeg`, alt: "Participantes dibujando" },
  { src: `${MEDIA_DIR}/WhatsApp Image 2026-04-12 at 10.14.29 (1).jpeg`, alt: "Familias dibujando flores juntas" },
  { src: `${MEDIA_DIR}/WhatsApp Image 2026-04-12 at 10.15.04 (2).jpeg`, alt: "Exposicion de obras terminadas" },
  { src: `${MEDIA_DIR}/WhatsApp Image 2026-04-12 at 10.14.29 (4).jpeg`, alt: "Madre e hijas dibujando juntas" },
  { src: `${MEDIA_DIR}/WhatsApp Image 2026-04-11 at 18.00.27 (2).jpeg`, alt: "Ninos y padre dibujando" },
  { src: `${MEDIA_DIR}/WhatsApp Image 2026-04-11 at 18.00.22 (1).jpeg`, alt: "Ninos participando" },
  { src: `${MEDIA_DIR}/WhatsApp Image 2026-04-11 at 18.00.22 (3).jpeg`, alt: "Participantes concentrados" },
  { src: `${MEDIA_DIR}/WhatsApp Image 2026-04-12 at 10.14.29 (2).jpeg`, alt: "Mesa de dibujo" },
  { src: `${MEDIA_DIR}/WhatsApp Image 2026-04-12 at 10.14.29 (3).jpeg`, alt: "Participantes dibujando" },
  { src: `${MEDIA_DIR}/WhatsApp Image 2026-04-11 at 18.00.24 (1).jpeg`, alt: "Artistas comunitarios" },
  { src: `${MEDIA_DIR}/WhatsApp Image 2026-04-11 at 18.00.24 (2).jpeg`, alt: "Ninos dibujando flores" },
  { src: `${MEDIA_DIR}/WhatsApp Image 2026-04-11 at 18.00.24.jpeg`, alt: "Participante dibujando" },
  { src: `${MEDIA_DIR}/WhatsApp Image 2026-04-11 at 18.00.27 (1).jpeg`, alt: "Artista comunitario" },
  { src: `${MEDIA_DIR}/WhatsApp Image 2026-04-11 at 18.00.27.jpeg`, alt: "Ninos disfrutando" },
  { src: `${MEDIA_DIR}/WhatsApp Image 2026-04-11 at 18.00.56 (1).jpeg`, alt: "Taller creativo" },
  { src: `${MEDIA_DIR}/WhatsApp Image 2026-04-11 at 18.00.56.jpeg`, alt: "Ambiente del evento" },
  { src: `${MEDIA_DIR}/WhatsApp Image 2026-04-11 at 18.01.45 (3).jpeg`, alt: "Obra terminada" },
  { src: `${MEDIA_DIR}/WhatsApp Image 2026-04-11 at 18.01.49 (3).jpeg`, alt: "Proceso creativo" },
  { src: `${MEDIA_DIR}/WhatsApp Image 2026-04-11 at 18.01.51 (4).jpeg`, alt: "Participantes disfrutando" },
  { src: `${MEDIA_DIR}/WhatsApp Image 2026-04-11 at 18.05.01 (2).jpeg`, alt: "Dibujos terminados" },
  { src: `${MEDIA_DIR}/WhatsApp Image 2026-04-11 at 18.05.02 (1).jpeg`, alt: "Obra artistica" },
  { src: `${MEDIA_DIR}/WhatsApp Image 2026-04-11 at 18.05.02 (3).jpeg`, alt: "Detalles de las flores" },
  { src: `${MEDIA_DIR}/WhatsApp Image 2026-04-11 at 18.00.22.jpeg`, alt: "Actividad de dibujo" },
  { src: `${MEDIA_DIR}/WhatsApp Image 2026-04-11 at 18.00.23.jpeg`, alt: "Espacio comunitario" },
  { src: `${MEDIA_DIR}/WhatsApp Image 2026-04-11 at 18.00.24 (3).jpeg`, alt: "Momento del evento" },
  { src: `${MEDIA_DIR}/WhatsApp Image 2026-04-11 at 18.00.24 (4).jpeg`, alt: "Detalle de flores" },
  { src: `${MEDIA_DIR}/WhatsApp Image 2026-04-12 at 10.14.28.jpeg`, alt: "Obra finalizada" },
  { src: `${MEDIA_DIR}/WhatsApp Image 2026-04-12 at 10.14.29.jpeg`, alt: "Mesa con materiales" },
];

const VIDEOS = [
  { src: `${MEDIA_DIR}/WhatsApp Video 2026-04-12 at 10.14.45.mp4`, title: "El ambiente del taller en accion" },
  { src: `${MEDIA_DIR}/WhatsApp Video 2026-04-12 at 10.15.00.mp4`, title: "Familias dibujando juntas" },
  { src: `${MEDIA_DIR}/WhatsApp Video 2026-04-12 at 10.15.04.mp4`, title: "Obras terminadas en exposicion" },
];

function EventoDibujaFlorContent() {
  const { locale, isLoading } = useTranslation();

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-white">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-emerald-300 border-t-emerald-600" />
      </div>
    );
  }

  const copy = {
    es: {
      back: "Volver al inicio",
      badge: "Evento realizado - 11 de abril 2026",
      titleA: "Dibuja la Flor",
      titleB: "de Tu Pais",
      subtitle:
        "Una galeria sin fronteras, hecha por el mundo: asi fue nuestra primera jornada de arte comunitario en Vecindario, Gran Canaria.",
      aboutTitle: "Sobre la iniciativa",
      about:
        "La iniciativa invita a cualquier persona en el mundo a crear y compartir una obra. No es un concurso: es un mosaico vivo de flores, memoria e identidad.",
      gallery: "Ver la Galeria Global",
      submit: "Envia tu obra",
    },
    de: {
      back: "Zurueck zur Startseite",
      badge: "Vergangene Veranstaltung - 11. April 2026",
      titleA: "Zeichne die Blume",
      titleB: "deines Landes",
      subtitle:
        "Eine grenzenlose Galerie, geschaffen von der Welt: so war unser erster gemeinschaftlicher Kunsttag in Vecindario, Gran Canaria.",
      aboutTitle: "Ueber die Initiative",
      about:
        "Die Initiative laedt Menschen weltweit ein, ein Werk zu schaffen und zu teilen. Es ist kein Wettbewerb: Es ist ein lebendiges Mosaik aus Blumen, Erinnerung und Identitaet.",
      gallery: "Globale Galerie ansehen",
      submit: "Werk einreichen",
    },
    en: {
      back: "Back to home",
      badge: "Past event - April 11 2026",
      titleA: "Draw the Flower",
      titleB: "of Your Country",
      subtitle:
        "A borderless gallery, made by the world: this was our first community art day in Vecindario, Gran Canaria.",
      aboutTitle: "About the initiative",
      about:
        "The initiative invites anyone in the world to create and share an artwork. It is not a contest: it is a living mosaic of flowers, memory and identity.",
      gallery: "View the Global Gallery",
      submit: "Submit your artwork",
    },
  }[locale] || {};

  return (
    <div className="min-h-screen bg-[#faf9f6]">
      <div className="sticky top-0 z-[100] flex items-center justify-between border-b border-gray-100 bg-white/80 px-6 py-4 backdrop-blur-md">
        <Link
          href="/"
          className="inline-flex items-center text-sm font-semibold text-gray-600 transition-colors hover:text-emerald-600"
        >
          <ChevronLeft className="mr-1 h-5 w-5" />
          {copy.back}
        </Link>
      </div>

      <section className="relative overflow-hidden pb-0 pt-16">
        <div className="mx-auto max-w-6xl px-4 md:px-6">
          <div className="flex flex-col items-center text-center">
            <span className="mb-5 inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-emerald-700">
              <span className="inline-block h-2 w-2 rounded-full bg-emerald-500" />
              {copy.badge}
            </span>

            <h1 className="max-w-4xl text-4xl font-extrabold leading-tight text-slate-900 sm:text-5xl md:text-6xl lg:text-7xl">
              <span className="text-emerald-700">{copy.titleA}</span>
              <br />
              {copy.titleB}
            </h1>

            <p className="mt-5 max-w-2xl text-lg text-slate-600 sm:text-xl">{copy.subtitle}</p>
          </div>

          <div className="relative mt-10 overflow-hidden rounded-2xl shadow-2xl shadow-emerald-900/10 ring-1 ring-slate-200/60">
            <img
              src={PHOTOS[0].src}
              alt={PHOTOS[0].alt}
              className="h-auto w-full object-cover"
              style={{ maxHeight: "540px", objectPosition: "center 40%" }}
            />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-14 md:px-6">
        <div className="max-w-3xl">
          <h2 className="text-2xl font-bold text-slate-900 sm:text-3xl">{copy.aboutTitle}</h2>
          <p className="mt-5 text-[1rem] leading-8 text-slate-700">{copy.about}</p>
        </div>
      </section>

      <EventGallery photos={PHOTOS} videos={VIDEOS} />

      <section className="mx-auto max-w-6xl px-4 py-16 md:px-6">
        <div className="flex flex-wrap justify-center gap-4">
          <Link
            href="/galeria-dibujos"
            className="rounded-xl bg-emerald-600 px-6 py-3 font-bold text-white shadow-lg transition-all hover:bg-emerald-700"
          >
            {copy.gallery}
          </Link>
          <Link
            href="/dibuja-la-flor-de-tu-pais"
            className="rounded-xl border border-emerald-300 bg-white px-6 py-3 font-bold text-emerald-800 transition-all hover:bg-emerald-50"
          >
            {copy.submit}
          </Link>
        </div>
      </section>
    </div>
  );
}

export default function EventoDibujaFlorWrapper() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <EventoDibujaFlorContent />
    </Suspense>
  );
}
