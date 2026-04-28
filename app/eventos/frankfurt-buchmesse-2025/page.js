"use client";

import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import EventGallery from "../../evento-dibuja-flor/EventGallery";
import { useTranslation } from "../../../lib/useTranslation";
import React, { Suspense } from 'react';

const PHOTOS = [
  {
    src: "/Frankfurt 2025/WhatsApp Image 2026-04-26 at 14.52.38.jpeg",
    alt: "La salida — destino Frankfurt",
  },
  {
    src: "/Frankfurt 2025/WhatsApp Image 2026-04-26 at 14.52.38 (1).jpeg",
    alt: "La llegada — Juan Unsain ante la Messe",
  },
  {
    src: "/Frankfurt 2025/WhatsApp Image 2026-04-26 at 14.52.38 (2).jpeg",
    alt: "La Messe Frankfurt — fachada exterior",
  },
  {
    src: "/Frankfurt 2025/WhatsApp Image 2026-04-26 at 14.52.38 (3).jpeg",
    alt: "Juan Unsain ante el letrero FRANKFURT",
  },
  {
    src: "/Frankfurt 2025/WhatsApp Image 2026-04-26 at 14.52.39.jpeg",
    alt: "Beth Lord ante el letrero FRANKFURT",
  },
  {
    src: "/Frankfurt 2025/WhatsApp Image 2026-04-26 at 14.52.39 (1).jpeg",
    alt: "Sala preparada — Nahiara en cada silla",
  },
  {
    src: "/Frankfurt 2025/WhatsApp Image 2026-04-26 at 14.52.39 (2).jpeg",
    alt: "El stand — materiales sobre la mesa",
  },
  {
    src: "/Frankfurt 2025/WhatsApp Image 2026-04-26 at 14.52.39 (3).jpeg",
    alt: "El libro en la estantería de la feria",
  },
  {
    src: "/Frankfurt 2025/WhatsApp Image 2026-04-26 at 14.52.39 (4).jpeg",
    alt: "Panel PublisHer — Frankfurter Buchmesse Day 4",
  },
  {
    src: "/Frankfurt 2025/WhatsApp Image 2026-04-26 at 14.52.39 (5).jpeg",
    alt: "Beth Lord en la sesión PublisHer",
  },
  {
    src: "/Frankfurt 2025/WhatsApp Image 2026-04-26 at 14.52.40.jpeg",
    alt: "Conexiones internacionales en la feria",
  },
  {
    src: "/Frankfurt 2025/Sr. Juan Unsain.jpeg",
    alt: "El juego de cartas — cierre",
  },
];

function FrankfurtEventContent() {
  const { locale, isLoading } = useTranslation();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="w-8 h-8 border-2 border-blue-300 border-t-blue-600 rounded-full animate-spin"></div>
      </div>
    );
  }

  // Translations
  const tBack = { es: "Volver", en: "Back", de: "Zurück", fr: "Retour", it: "Torna indietro", zh: "返回" }[locale] || "Back";
  const tBadge = { es: "Evento realizado · Octubre de 2025", en: "Past Event · October 2025", de: "Vergangenes Ereignis · Oktober 2025", fr: "Événement passé · Octobre 2025", it: "Evento passato · Ottobre 2025", zh: "过往活动 · 2025年10月" }[locale] || "Past Event · October 2025";
  const tHero1 = { es: "Frankfurter Buchmesse", en: "Frankfurter Buchmesse", de: "Frankfurter Buchmesse", fr: "Frankfurter Buchmesse", it: "Frankfurter Buchmesse", zh: "法兰克福书展" }[locale] || "Frankfurter Buchmesse";
  const tHero2 = { es: "2025", en: "2025", de: "2025", fr: "2025", it: "2025", zh: "2025" }[locale] || "2025";
  const tHeroSub = {
    es: "Universo Nahiara en la feria más internacional de Alemania.",
    en: "Universo Nahiara at Germany's most international book fair.",
    de: "Universo Nahiara auf der internationalsten Buchmesse Deutschlands.",
    fr: "Universo Nahiara à la foire du livre la plus internationale d'Allemagne.",
    it: "Universo Nahiara alla fiera del libro più internazionale della Germania.",
    zh: "Universo Nahiara 参加德国最国际化的书展。"
  }[locale] || "Universo Nahiara at Germany's most international book fair.";

  const tLocInfo = { es: "Messe Frankfurt · Alemania", en: "Messe Frankfurt · Germany" }[locale] || "Messe Frankfurt · Germany";

  const tStats = [
    { icon: "📅", label: { es: "Fecha", en: "Date" }[locale] || "Date", value: { es: "15-19 oct 2025", en: "Oct 15-19, 2025" }[locale] || "Oct 15-19, 2025" },
    { icon: "📍", label: { es: "Lugar", en: "Location" }[locale] || "Location", value: "Messe Frankfurt" },
  ];

  const tTitleAbout = { es: "El corazón de la industria", en: "The heart of the industry" }[locale] || "The heart of the industry";
  const tD1 = {
    es: "En octubre de 2025, la Asociación Internacional en Defensa de las Flores — Proveneya & Nahiara asistió por primera vez a la Frankfurter Buchmesse — la feria del libro más importante del mundo, celebrada en el recinto Messe Frankfurt, Alemania.",
    en: "In October 2025, the International Association in Defense of Flowers — Proveneya & Nahiara attended the Frankfurter Buchmesse for the first time — the world's most important book fair, held at Messe Frankfurt, Germany."
  }[locale] || "In October 2025, the International Association in Defense of Flowers — Proveneya & Nahiara attended the Frankfurter Buchmesse for the first time — the world's most important book fair, held at Messe Frankfurt, Germany.";
  
  const tD2 = {
    es: "Juan María Unsain, Director de Relaciones Internacionales de la Asociación, representó al proyecto en uno de los escaparates editoriales más exigentes del planeta. Durante la feria, se presentó Nahiara y los Guardianes de las Flores ante profesionales de la industria de todo el mundo, y se establecieron contactos estratégicos para el desarrollo internacional del Universo Nahiara.",
    en: "Juan María Unsain, the Association's Director of International Relations, represented the project at one of the most demanding publishing showcases on the planet. During the fair, Nahiara and the Guardians of the Flowers was presented to industry professionals from around the world, and strategic contacts were established for the international development of Universo Nahiara."
  }[locale] || "Juan María Unsain, the Association's Director of International Relations, represented the project at one of the most demanding publishing showcases on the planet. During the fair, Nahiara and the Guardians of the Flowers was presented to industry professionals from around the world, and strategic contacts were established for the international development of Universo Nahiara.";
  
  const tD3 = {
    es: "Entre los encuentros más significativos destacó el de Beth Lord, escritora estadounidense llegada desde Seattle, quien había leído el manuscrito del libro antes de su publicación y lo valoró de forma extraordinaria. Un encuentro fortuito frente a los pabellones de la Messe que se convirtió en uno de los momentos más humanos y memorables del viaje.",
    en: "Among the most significant encounters was that of Beth Lord, an American author who had travelled from Seattle and had read the manuscript before publication, praising it extraordinarily. A chance meeting outside the Messe pavilions that became one of the most human and memorable moments of the trip."
  }[locale] || "Among the most significant encounters was that of Beth Lord, an American author who had travelled from Seattle and had read the manuscript before publication, praising it extraordinarily. A chance meeting outside the Messe pavilions that became one of the most human and memorable moments of the trip.";

  const tGalleryTitle = { es: "📸 Galería de imágenes", en: "📸 Image Gallery" }[locale] || "📸 Image Gallery";
  const tGallerySub = { es: "Un resumen visual del evento", en: "A visual summary of the event" }[locale] || "A visual summary of the event";

  return (
    <div className="min-h-screen bg-[#faf9f6]">
      <div className="bg-white/80 backdrop-blur-md sticky top-0 z-[100] border-b border-gray-100 flex items-center justify-between px-6 py-4">
        <Link href="/" className="inline-flex items-center text-sm font-semibold text-gray-600 hover:text-blue-600 transition-colors">
          <ChevronLeft className="w-5 h-5 mr-1" />
          {tBack}
        </Link>
      </div>

      {/* ═══════════ HERO ═══════════ */}
      <section className="relative overflow-hidden pt-20 pb-0">
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute -top-32 -left-32 h-[500px] w-[500px] rounded-full bg-gradient-to-br from-blue-200/40 via-indigo-100/30 to-transparent blur-3xl" />
          <div className="absolute -bottom-20 -right-20 h-[400px] w-[400px] rounded-full bg-gradient-to-tl from-blue-200/30 via-indigo-100/20 to-transparent blur-3xl" />
        </div>

        <div className="mx-auto max-w-6xl px-4 md:px-6">
          <div className="flex flex-col items-center text-center">
            <span
              className="mb-5 inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-blue-700"
            >
              <span className="inline-block h-2 w-2 rounded-full bg-blue-500 animate-pulse" />
              {tBadge}
            </span>

            <h1
              className="max-w-4xl text-4xl font-extrabold leading-tight text-slate-900 sm:text-5xl md:text-6xl lg:text-7xl"
              style={{ fontFamily: "Bangers, cursive", letterSpacing: "0.03em" }}
            >
              <span className="bg-gradient-to-r from-blue-600 via-indigo-500 to-blue-500 bg-clip-text text-transparent">
                {tHero1}
              </span>{" "}
              <br className="hidden sm:inline" />
              {tHero2}
            </h1>

            <p className="mt-5 max-w-2xl text-lg text-slate-600 sm:text-xl font-medium">
              {tHeroSub}
            </p>
          </div>

          <div className="relative mt-10 overflow-hidden rounded-3xl shadow-2xl shadow-blue-900/10 ring-1 ring-slate-200/60">
            <img
              src={PHOTOS[3].src} 
              alt={PHOTOS[3].alt}
              className="h-auto w-full object-cover"
              style={{ maxHeight: "540px", objectPosition: "center 20%" }}
            />
            <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/50 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 px-6 pb-6 md:px-10 md:pb-8">
              <p className="text-sm font-medium text-white/80">
                {tLocInfo}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════ EVENT DETAILS ═══════════ */}
      <section className="mx-auto max-w-6xl px-4 md:px-6 py-16">
        <div className="flex justify-center gap-4 sm:gap-6 flex-wrap">
          {tStats.map((item) => (
            <div
              key={item.label}
              className="group relative overflow-hidden rounded-2xl border border-slate-200/80 bg-white p-5 transition-all duration-300 hover:shadow-lg flex-1 min-w-[250px] max-w-xs"
            >
              <div className="absolute -right-4 -top-4 h-20 w-20 rounded-full bg-blue-50/50 transition-transform duration-500 group-hover:scale-150" />
              <span className="relative text-2xl">{item.icon}</span>
              <p className="relative mt-2 text-xs font-bold uppercase tracking-wider text-blue-700">
                {item.label}
              </p>
              <p className="relative mt-1 text-sm font-medium text-slate-800">
                {item.value}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ═══════════ ABOUT ═══════════ */}
      <section className="mx-auto max-w-6xl px-4 md:px-6 pb-8">
        <div className="grid gap-10 lg:grid-cols-5">
          <div className="lg:col-span-3 order-2 lg:order-1">
            <h2 className="text-2xl font-bold text-slate-900 sm:text-3xl">
              {tTitleAbout}
            </h2>
            <div className="mt-5 space-y-4 text-slate-700 leading-relaxed text-[0.975rem]">
              <p>{tD1}</p>
              <p>{tD2}</p>
              <p>{tD3}</p>
            </div>
          </div>
          <div className="lg:col-span-2 order-1 lg:order-2 flex items-center">
            <div className="relative w-full overflow-hidden rounded-2xl shadow-xl">
              <img
                src={PHOTOS[4].src}
                alt={PHOTOS[4].alt}
                className="aspect-[4/3] w-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════ GALLERY ═══════════ */}
      <EventGallery 
        photos={PHOTOS} 
        galleryTitle={tGalleryTitle}
        gallerySubtitle={tGallerySub}
      />
    </div>
  );
}

export default function FrankfurtPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#faf9f6]" />}>
      <FrankfurtEventContent />
    </Suspense>
  );
}
