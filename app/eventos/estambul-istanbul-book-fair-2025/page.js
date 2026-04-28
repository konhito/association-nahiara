"use client";

import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import EventGallery from "../../evento-dibuja-flor/EventGallery";
import { useTranslation } from "../../../lib/useTranslation";
import React, { Suspense } from 'react';

const PHOTOS = [
  {
    src: "/Estambul 2025/WhatsApp Image 2026-04-26 at 16.09.15 1.jpeg",
    alt: "La despedida en Gran Canaria",
  },
  {
    src: "/Estambul 2025/WhatsApp Image 2026-04-26 at 16.09.15 2.jpeg",
    alt: "Puerta de embarque — destino Estambul",
  },
  {
    src: "/Estambul 2025/WhatsApp Image 2026-04-26 at 16.09.15.jpeg",
    alt: "Llegada a Estambul",
  },
  {
    src: "/Estambul 2025/WhatsApp Image 2026-04-26 at 16.09.16 3.jpeg",
    alt: "Juan Unsain ante el cartel de la feria",
  },
  {
    src: "/Estambul 2025/WhatsApp Image 2026-04-26 at 16.09.16 4.jpeg",
    alt: "Entrada al Tüyap — la fila de visitantes",
  },
  {
    src: "/Estambul 2025/WhatsApp Image 2026-04-26 at 16.09.16 5.jpeg",
    alt: "Interior de la feria — pabellón abarrotado",
  },
  {
    src: "/Estambul 2025/WhatsApp Image 2026-04-26 at 16.09.16 6.jpeg",
    alt: "Stand Reading China — presencia internacional",
  },
  {
    src: "/Estambul 2025/WhatsApp Image 2026-04-26 at 16.09.16 7.jpeg",
    alt: "Stand Taze Kitap — mapa mural del mundo",
  },
  {
    src: "/Estambul 2025/WhatsApp Image 2026-04-26 at 16.12.32 8.jpeg",
    alt: "Stand Taze Kitap — plano general con público",
  },
  {
    src: "/Estambul 2025/WhatsApp Image 2026-04-26 at 16.12.32 9.jpeg",
    alt: "Nahiara en el hotel — mesa de mármol y silla roja",
  },
  {
    src: "/Estambul 2025/WhatsApp Image 2026-04-26 at 16.36.51 10.jpeg",
    alt: "Libros turcos junto a Nahiara",
  },
  {
    src: "/Estambul 2025/Estambul 2025.jpeg",
    alt: "Dedicatorias de autores turcos a Matías",
  },
];

function EstambulEventContent() {
  const { locale, isLoading } = useTranslation();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="w-8 h-8 border-2 border-emerald-300 border-t-emerald-600 rounded-full animate-spin"></div>
      </div>
    );
  }

  // Translations
  const tBack = { es: "Volver", en: "Back", de: "Zurück", fr: "Retour", it: "Torna indietro", zh: "返回" }[locale] || "Back";
  const tBadge = { es: "Evento realizado · Diciembre de 2025", en: "Past Event · December 2025", de: "Vergangenes Ereignis · Dezember 2025", fr: "Événement passé · Décembre 2025", it: "Evento passato · Dicembre 2025", zh: "过往活动 · 2025年12月" }[locale] || "Past Event · December 2025";
  const tHero1 = { es: "Istanbul International Book Fair", en: "Istanbul International Book Fair", de: "Istanbul International Book Fair", fr: "Istanbul International Book Fair", it: "Istanbul International Book Fair", zh: "伊斯坦布尔国际书展" }[locale] || "Istanbul International Book Fair";
  const tHero2 = { es: "2025", en: "2025", de: "2025", fr: "2025", it: "2025", zh: "2025" }[locale] || "2025";
  const tHeroSub = {
    es: "Nahiara cruzó el Bósforo.",
    en: "Nahiara crossed the Bosphorus.",
    de: "Nahiara überquerte den Bosporus.",
    fr: "Nahiara a traversé le Bosphore.",
    it: "Nahiara ha attraversato il Bosforo.",
    zh: "Nahiara 越过了博斯普鲁斯海峡。"
  }[locale] || "Nahiara crossed the Bosphorus.";

  const tLocInfo = { es: "Messe Frankfurt · Alemania", en: "Messe Frankfurt · Germany" }[locale] || "Tüyap Fair Convention and Congress Center · Istanbul";

  const tStats = [
    { icon: "📅", label: { es: "Fecha", en: "Date" }[locale] || "Date", value: { es: "13-21 dic 2025", en: "Dec 13-21, 2025" }[locale] || "Dec 13-21, 2025" },
    { icon: "📍", label: { es: "Lugar", en: "Location" }[locale] || "Location", value: "Tüyap Fair Convention Center" },
  ];

  const tTitleAbout = { es: "El corazón de la industria", en: "The heart of the industry" }[locale] || "The heart of the industry";
  const tD1 = {
    es: "En diciembre de 2025, Juan María Unsain, Director de Relaciones Internacionales de la Asociación Internacional en Defensa de las Flores — Proveneya & Nahiara, viajó a Estambul para representar al Universo Nahiara en la 42ª Feria Internacional del Libro de Estambul, celebrada en el Tüyap Fair Convention and Congress Center.",
    en: "In December 2025, Juan María Unsain, Director of International Relations of the International Association in Defense of Flowers — Proveneya & Nahiara, travelled to Istanbul to represent Universo Nahiara at the 42nd Istanbul International Book Fair, held at the Tüyap Fair Convention and Congress Center."
  }[locale] || "In December 2025, Juan María Unsain, Director of International Relations of the International Association in Defense of Flowers — Proveneya & Nahiara, travelled to Istanbul to represent Universo Nahiara at the 42nd Istanbul International Book Fair, held at the Tüyap Fair Convention and Congress Center.";
  
  const tD2 = {
    es: "La presencia en la feria no fue casual — la Asociación recibió una invitación formal de Beijiao Children Joy Education & Technology, prestigiosa editorial china especializada en literatura infantil con más de 1.500 títulos en catálogo, para visitar su stand y explorar posibilidades de colaboración internacional.",
    en: "The Association's presence at the fair was not by chance — they received a formal invitation from Beijiao Children Joy Education & Technology, a prestigious Chinese publisher specialising in children's literature with over 1,500 titles in their catalogue, to visit their stand and explore international collaboration opportunities."
  }[locale] || "The Association's presence at the fair was not by chance — they received a formal invitation from Beijiao Children Joy Education & Technology, a prestigious Chinese publisher specialising in children's literature with over 1,500 titles in their catalogue, to visit their stand and explore international collaboration opportunities.";

  const tGalleryTitle = { es: "📸 Galería de imágenes", en: "📸 Image Gallery" }[locale] || "📸 Image Gallery";
  const tGallerySub = { es: "Un resumen visual del evento", en: "A visual summary of the event" }[locale] || "A visual summary of the event";

  return (
    <div className="min-h-screen bg-[#faf9f6]">
      <div className="bg-white/80 backdrop-blur-md sticky top-0 z-[100] border-b border-gray-100 flex items-center justify-between px-6 py-4">
        <Link href="/" className="inline-flex items-center text-sm font-semibold text-gray-600 hover:text-emerald-600 transition-colors">
          <ChevronLeft className="w-5 h-5 mr-1" />
          {tBack}
        </Link>
      </div>

      {/* ═══════════ HERO ═══════════ */}
      <section className="relative overflow-hidden pt-20 pb-0">
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute -top-32 -left-32 h-[500px] w-[500px] rounded-full bg-gradient-to-br from-emerald-200/40 via-teal-100/30 to-transparent blur-3xl" />
          <div className="absolute -bottom-20 -right-20 h-[400px] w-[400px] rounded-full bg-gradient-to-tl from-emerald-200/30 via-emerald-100/20 to-transparent blur-3xl" />
        </div>

        <div className="mx-auto max-w-6xl px-4 md:px-6">
          <div className="flex flex-col items-center text-center">
            <span
              className="mb-5 inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-emerald-700"
            >
              <span className="inline-block h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
              {tBadge}
            </span>

            <h1
              className="max-w-4xl text-4xl font-extrabold leading-tight text-slate-900 sm:text-5xl md:text-6xl lg:text-7xl"
              style={{ fontFamily: "Bangers, cursive", letterSpacing: "0.03em" }}
            >
              <span className="bg-gradient-to-r from-emerald-600 via-teal-500 to-emerald-500 bg-clip-text text-transparent">
                {tHero1}
              </span>{" "}
              <br className="hidden sm:inline" />
              {tHero2}
            </h1>

            <p className="mt-5 max-w-2xl text-lg text-slate-600 sm:text-xl font-medium">
              {tHeroSub}
            </p>
          </div>

          <div className="relative mt-10 overflow-hidden rounded-3xl shadow-2xl shadow-emerald-900/10 ring-1 ring-slate-200/60">
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
              <div className="absolute -right-4 -top-4 h-20 w-20 rounded-full bg-emerald-50/50 transition-transform duration-500 group-hover:scale-150" />
              <span className="relative text-2xl">{item.icon}</span>
              <p className="relative mt-2 text-xs font-bold uppercase tracking-wider text-emerald-700">
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
            </div>
          </div>
          <div className="lg:col-span-2 order-1 lg:order-2 flex items-center">
            <div className="relative w-full overflow-hidden rounded-2xl shadow-xl">
              <img
                src={PHOTOS[6].src}
                alt={PHOTOS[6].alt}
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

export default function EstambulPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#faf9f6]" />}>
      <EstambulEventContent />
    </Suspense>
  );
}
