"use client";

import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import EventGallery from "./EventGallery";
import { useTranslation } from "../../lib/useTranslation";
import React, { Suspense } from 'react';

/* ── photo + video manifest (from public folder) ── */
const MEDIA_DIR = "/Photographs and videos of the April 11 event";

const PHOTOS = [
  { src: `${MEDIA_DIR}/WhatsApp Image 2026-04-11 at 18.01.44.jpeg`, alt: "Vista general del evento" },
  { src: `${MEDIA_DIR}/WhatsApp Image 2026-04-12 at 10.14.28 (3).jpeg`, alt: "Participantes dibujando" },
  { src: `${MEDIA_DIR}/WhatsApp Image 2026-04-12 at 10.14.29 (1).jpeg`, alt: "Familias dibujando flores juntas" },
  { src: `${MEDIA_DIR}/WhatsApp Image 2026-04-12 at 10.15.04 (2).jpeg`, alt: "Exposición de obras terminadas" },
  { src: `${MEDIA_DIR}/WhatsApp Image 2026-04-12 at 10.14.29 (4).jpeg`, alt: "Madre e hijas dibujando juntas" },
  { src: `${MEDIA_DIR}/WhatsApp Image 2026-04-11 at 18.00.27 (2).jpeg`, alt: "Niños y padre dibujando" },
  { src: `${MEDIA_DIR}/WhatsApp Image 2026-04-11 at 18.00.22 (1).jpeg`, alt: "Niños participando" },
  { src: `${MEDIA_DIR}/WhatsApp Image 2026-04-11 at 18.00.22 (3).jpeg`, alt: "Participantes concentrados" },
  { src: `${MEDIA_DIR}/WhatsApp Image 2026-04-12 at 10.14.29 (2).jpeg`, alt: "Mesa de dibujo" },
  { src: `${MEDIA_DIR}/WhatsApp Image 2026-04-12 at 10.14.29 (3).jpeg`, alt: "Participantes dibujando" },
  { src: `${MEDIA_DIR}/WhatsApp Image 2026-04-11 at 18.00.24 (1).jpeg`, alt: "Artistas comunitarios" },
  { src: `${MEDIA_DIR}/WhatsApp Image 2026-04-11 at 18.00.24 (2).jpeg`, alt: "Niños dibujando flores" },
  { src: `${MEDIA_DIR}/WhatsApp Image 2026-04-11 at 18.00.24.jpeg`, alt: "Participante dibujando" },
  { src: `${MEDIA_DIR}/WhatsApp Image 2026-04-11 at 18.00.27 (1).jpeg`, alt: "Artista comunitario" },
  { src: `${MEDIA_DIR}/WhatsApp Image 2026-04-11 at 18.00.27.jpeg`, alt: "Niños disfrutando" },
  { src: `${MEDIA_DIR}/WhatsApp Image 2026-04-11 at 18.00.56 (1).jpeg`, alt: "Taller creativo" },
  { src: `${MEDIA_DIR}/WhatsApp Image 2026-04-11 at 18.00.56.jpeg`, alt: "Ambiente del evento" },
  { src: `${MEDIA_DIR}/WhatsApp Image 2026-04-11 at 18.01.45 (3).jpeg`, alt: "Obra terminada" },
  { src: `${MEDIA_DIR}/WhatsApp Image 2026-04-11 at 18.01.49 (3).jpeg`, alt: "Proceso creativo" },
  { src: `${MEDIA_DIR}/WhatsApp Image 2026-04-11 at 18.01.51 (4).jpeg`, alt: "Participantes disfrutando" },
  { src: `${MEDIA_DIR}/WhatsApp Image 2026-04-11 at 18.05.01 (2).jpeg`, alt: "Dibujos terminados" },
  { src: `${MEDIA_DIR}/WhatsApp Image 2026-04-11 at 18.05.02 (1).jpeg`, alt: "Obra artística" },
  { src: `${MEDIA_DIR}/WhatsApp Image 2026-04-11 at 18.05.02 (3).jpeg`, alt: "Detalles de las flores" },
  { src: `${MEDIA_DIR}/WhatsApp Image 2026-04-11 at 18.00.22.jpeg`, alt: "Actividad de dibujo" },
  { src: `${MEDIA_DIR}/WhatsApp Image 2026-04-11 at 18.00.23.jpeg`, alt: "Espacio comunitario" },
  { src: `${MEDIA_DIR}/WhatsApp Image 2026-04-11 at 18.00.24 (3).jpeg`, alt: "Momento del evento" },
  { src: `${MEDIA_DIR}/WhatsApp Image 2026-04-11 at 18.00.24 (4).jpeg`, alt: "Detalle de flores" },
  { src: `${MEDIA_DIR}/WhatsApp Image 2026-04-12 at 10.14.28.jpeg`, alt: "Obra finalizada" },
  { src: `${MEDIA_DIR}/WhatsApp Image 2026-04-12 at 10.14.29.jpeg`, alt: "Mesa con materiales" },
];

const VIDEOS = [
  { src: `${MEDIA_DIR}/WhatsApp Video 2026-04-12 at 10.14.45.mp4`, title: "El ambiente del taller en acción" },
  { src: `${MEDIA_DIR}/WhatsApp Video 2026-04-12 at 10.15.00.mp4`, title: "Familias dibujando juntas" },
  { src: `${MEDIA_DIR}/WhatsApp Video 2026-04-12 at 10.15.04.mp4`, title: "Obras terminadas en exposición" },
];

function EventoDibujaFlorContent() {
  const { locale, isLoading } = useTranslation();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="w-8 h-8 border-2 border-emerald-300 border-t-emerald-600 rounded-full animate-spin"></div>
      </div>
    );
  }

  // --- Translation Dictionary ---
  const tBack = { es: "Volver al Inicio", en: "Back to Home", de: "Zurück zur Startseite", fr: "Retour à l'accueil", it: "Torna alla Home", zh: "返回首页" }[locale] || "Back to Home";
  const tBadge = { es: "Evento realizado · 11 de abril 2026", en: "Past Event · April 11 2026", de: "Vergangenes Ereignis · 11. April 2026", fr: "Événement passé · 11 Avril 2026", it: "Evento passato · 11 Aprile 2026", zh: "过往活动 · 2026年4月11日" }[locale] || "Past Event · April 11 2026";
  const tHero1 = { es: "Dibuja la Flor", en: "Draw the Flower", de: "Zeichne die Blume", fr: "Dessinez la Fleur", it: "Disegna il Fiore", zh: "画出花朵" }[locale] || "Draw the Flower";
  const tHero2 = { es: "de Tu País", en: "of Your Country", de: "deines Landes", fr: "de Votre Pays", it: "del Tuo Paese", zh: "你国家的" }[locale] || "of Your Country";
  const tHeroSub = {
    es: "Una galería sin fronteras, hecha por el mundo — así fue nuestra primera jornada de arte comunitario en Vecindario, Gran Canaria.",
    en: "A borderless gallery, made by the world — this was our first community art day in Vecindario, Gran Canaria.",
    de: "Eine grenzenlose Galerie, gemacht von der Welt — das war unser erster Gemeinschaftskunst-Tag in Vecindario, Gran Canaria.",
    fr: "Une galerie sans frontières, réalisée par le monde — ce fut notre première journée d'art communautaire à Vecindario, Grande Canarie.",
    it: "Una galleria senza confini, creata dal mondo — questa è stata la nostra prima giornata di arte comunitaria a Vecindario, Gran Canaria.",
    zh: "一个无国界的画廊，由世界共同创造 —— 这是我们在大加那利岛韦辛达里奥的第一个社区艺术日。"
  }[locale] || "A borderless gallery, made by the world — this was our first community art day in Vecindario, Gran Canaria.";

  const tLocInfo = { es: "Local Social Unión Sardina · Vecindario, Gran Canaria", en: "Local Social Unión Sardina · Vecindario, Gran Canaria", de: "Local Social Unión Sardina · Vecindario, Gran Canaria", fr: "Local Social Unión Sardina · Vecindario, Grande Canarie", it: "Local Social Unión Sardina · Vecindario, Gran Canaria", zh: "Local Social Unión Sardina · 韦辛达里奥，大加那利岛" }[locale] || "Local Social Unión Sardina · Vecindario, Gran Canaria";
  
  const tStats = [
    { icon: "📅", label: { es: "Fecha", en: "Date", de: "Datum", fr: "Date", it: "Data", zh: "日期" }[locale], value: { es: "Sábado, 11 de abril de 2026", en: "Saturday, April 11, 2026", de: "Samstag, 11. April 2026", fr: "Samedi 11 avril 2026", it: "Sabato 11 Aprile 2026", zh: "2026年4月11日星期六" }[locale] },
    { icon: "🕐", label: { es: "Horario", en: "Time", de: "Zeit", fr: "Horaire", it: "Orario", zh: "时间" }[locale], value: "10:00 – 13:00 h" },
    { icon: "📍", label: { es: "Lugar", en: "Location", de: "Ort", fr: "Lieu", it: "Luogo", zh: "地点" }[locale], value: "Local Social Unión Sardina, Vecindario" },
    { icon: "🎨", label: { es: "Participación", en: "Participation", de: "Teilnahme", fr: "Participation", it: "Partecipazione", zh: "参与" }[locale], value: { es: "Entrada libre · Todas las edades", en: "Free entry · All ages", de: "Freier Eintritt · Alle Altersgruppen", fr: "Entrée libre · Tous âges", it: "Ingresso libero · Tutte le età", zh: "免费入场 · 所有年龄段" }[locale] },
  ];

  const tTitleAbout = { es: "Sobre la iniciativa", en: "About the initiative", de: "Über die Initiative", fr: "À propos de l'initiative", it: "Informazioni sull'iniziativa", zh: "关于倡议" }[locale] || "About the initiative";
  const tD1 = { es: "Es una iniciativa de participación comunitaria global. Invita a cualquier persona en el mundo a crear y compartir una obra.", en: "It is a global community participation initiative. It invites anyone in the world to create and share a work.", de: "Es ist eine weltweite Initiative zur Beteiligung der Gemeinschaft. Sie lädt jeden auf der Welt ein, ein Werk zu schaffen und zu teilen.", fr: "C'est une initiative de participation communautaire mondiale. Elle invite toute personne dans le monde à créer et partager une œuvre.", it: "È un'iniziativa di partecipazione comunitaria globale. Invita chiunque nel mondo a creare e condividere un'opera.", zh: "这是一项全球社区参与倡议。它邀请世界上的任何人创作并分享作品。" }[locale] || "It is a global community participation initiative. It invites anyone in the world to create and share a work.";
  const tD2 = { es: "En algún lugar del mundo hay una flor que solo tú conoces. Queremos verla.", en: "Somewhere in the world there is a flower that only you know. We want to see it.", de: "Irgendwo auf der Welt gibt es eine Blume, die nur du kennst. Wir wollen sie sehen.", fr: "Quelque part dans le monde il y a une fleur que vous seul connaissez. Nous voulons la voir.", it: "Da qualche parte nel mondo c'è un fiore che conosci solo tu. Vogliamo vederlo.", zh: "世界上某个地方有一朵只有你知道的花。我们想看它。" }[locale] || "Somewhere in the world there is a flower that only you know. We want to see it.";
  const tD3 = { es: "No importa la técnica ni el nivel. Cada rincón del planeta tiene una flor que merece ser dibujada.", en: "Technique and skill level do not matter. Every corner of the planet has a flower that deserves to be drawn.", de: "Technik und Fähigkeitsniveau spielen keine Rolle. Jede Ecke des Planeten hat eine Blume, die es verdient, gezeichnet zu werden.", fr: "La technique et le niveau n'ont pas d'importance. Chaque recoin de la planète a une fleur qui mérite d'être dessinée.", it: "La tecnica e il livello di abilità non contano. Ogni angolo del pianeta ha un fiore che merita di essere disegnato.", zh: "技术和技能水平并不重要。地球的每个角落都有一朵值得被画下来的花。" }[locale] || "Technique and skill level do not matter. Every corner of the planet has a flower that deserves to be drawn.";
  const tNoContest = { es: "No es un concurso", en: "Not a contest", de: "Kein Wettbewerb", fr: "Pas un concours", it: "Non un concorso", zh: "不是比赛" }[locale] || "Not a contest";
  const tNoContestDesc = { es: "No hay ganadores ni jurado. Lo que se construye es un mosaico vivo.", en: "No winners or jury. What is built is a living mosaic.", de: "Keine Gewinner oder Jury. Was aufgebaut wird, ist ein lebendiges Mosaik.", fr: "Pas de gagnants ni de jury. Ce qui se construit est une mosaïque vivante.", it: "Nessun vincitore o giuria. Quello che si costruisce è un mosaico vivente.", zh: "没有赢家或评委。建立的是一个生动的马赛克。" }[locale] || "No winners or jury. What is built is a living mosaic.";

  const tWhyTitle = { es: "¿Por qué?", en: "Why?", de: "Warum?", fr: "Pourquoi ?", it: "Perché?", zh: "为什么？" }[locale] || "Why?";
  const tWhy1 = { es: "Porque las flores no entienden de fronteras.", en: "Because flowers do not understand borders.", de: "Weil Blumen keine Grenzen verstehen.", fr: "Parce que les fleurs ne connaissent pas de frontières.", it: "Perché i fiori non conoscono confini.", zh: "因为花朵不懂国界。" }[locale] || "Because flowers do not understand borders.";
  const tWhy2 = { es: "Porque la biodiversidad floral es un patrimonio hermoso y frágil.", en: "Because floral biodiversity is a beautiful and fragile heritage.", de: "Weil blumige Artenvielfalt ein schönes und fragiles Erbe ist.", fr: "Parce que la biodiversité florale est un patrimoine magnifique et fragile.", it: "Perché la biodiversità floreale è un patrimonio bellissimo e fragile.", zh: "因为花卉多样性是美丽而脆弱的遗产。" }[locale] || "Because floral biodiversity is a beautiful and fragile heritage.";
  const tWhy3 = { es: "Cada obra es una pieza de un mosaico que el mundo construye para sí mismo.", en: "Every artwork is a piece of a mosaic the world builds for itself.", de: "Jedes Kunstwerk ist ein Teil eines Mosaiks, das die Welt für sich selbst baut.", fr: "Chaque œuvre est une pièce d'une mosaïque que le monde construit pour lui-même.", it: "Ogni opera è un tassello di un mosaico che il mondo costruisce per sé.", zh: "每一件艺术品都是世界为自己建立的马赛克的一块。" }[locale] || "Every artwork is a piece of a mosaic the world builds for itself.";

  const tCta1 = { es: "🎨 Ver la Galería Global", en: "🎨 View the Global Gallery", de: "🎨 Globale Galerie ansehen", fr: "🎨 Voir la Galerie Mondiale", it: "🎨 Visualizza la Galleria Globale", zh: "🎨 查看全球画廊" }[locale] || "🎨 View the Global Gallery";
  const tCta2 = { es: "✏️ Envía tu obra", en: "✏️ Submit your artwork", de: "✏️ Reiche dein Werk ein", fr: "✏️ Soumettez votre œuvre", it: "✏️ Invia la tua opera", zh: "✏️ 提交你的作品" }[locale] || "✏️ Submit your artwork";

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
          <div className="absolute -bottom-20 -right-20 h-[400px] w-[400px] rounded-full bg-gradient-to-tl from-rose-200/30 via-amber-100/20 to-transparent blur-3xl" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[600px] w-[600px] rounded-full bg-gradient-to-r from-violet-100/15 via-sky-100/10 to-transparent blur-3xl" />
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
              <span className="bg-gradient-to-r from-emerald-600 via-teal-500 to-cyan-500 bg-clip-text text-transparent">
                {tHero1}
              </span>{" "}
              <br className="hidden sm:inline" />
              {tHero2}
            </h1>

            <p className="mt-5 max-w-2xl text-lg text-slate-600 sm:text-xl">
              {tHeroSub}
            </p>
          </div>

          <div className="relative mt-10 overflow-hidden rounded-3xl shadow-2xl shadow-emerald-900/10 ring-1 ring-slate-200/60">
            <img
              src={PHOTOS[0].src}
              alt={PHOTOS[0].alt}
              className="h-auto w-full object-cover"
              style={{ maxHeight: "540px", objectPosition: "center 40%" }}
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
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {tStats.map((item) => (
            <div
              key={item.label}
              className="group relative overflow-hidden rounded-2xl border border-slate-200/80 bg-white p-5 transition-all duration-300 hover:shadow-lg"
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
      <section className="mx-auto max-w-6xl px-4 md:px-6 pb-16">
        <div className="grid gap-10 lg:grid-cols-5">
          <div className="lg:col-span-3 order-2 lg:order-1">
            <h2 className="text-2xl font-bold text-slate-900 sm:text-3xl">
              {tTitleAbout}
            </h2>
            <div className="mt-5 space-y-4 text-slate-700 leading-relaxed text-[0.975rem]">
              <p>{tD1}</p>
              <p>{tD2}</p>
              <p>{tD3}</p>
              <div className="mt-6 rounded-2xl border border-emerald-100 bg-gradient-to-br from-emerald-50/60 to-teal-50/40 p-5">
                <h3 className="text-base font-bold text-emerald-800">
                  {tNoContest}
                </h3>
                <p className="mt-2 text-sm text-slate-700">
                  {tNoContestDesc}
                </p>
              </div>
            </div>
          </div>
          <div className="lg:col-span-2 order-1 lg:order-2 flex items-center">
            <div className="relative w-full overflow-hidden rounded-2xl shadow-xl">
              <img
                src={PHOTOS[3].src}
                alt={PHOTOS[3].alt}
                className="aspect-[3/4] w-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════ WHY? ═══════════ */}
      <section className="relative overflow-hidden bg-gradient-to-br from-emerald-900 via-emerald-800 to-teal-900 py-16 text-white">
        <div className="relative mx-auto max-w-4xl px-4 text-center md:px-6">
          <h2 className="text-3xl font-bold sm:text-4xl" style={{ fontFamily: "Bangers, cursive", letterSpacing: "0.04em" }}>
            {tWhyTitle}
          </h2>
          <div className="mt-8 space-y-4 text-lg text-emerald-100/90">
            <p>{tWhy1}</p>
            <p>{tWhy2}</p>
            <p className="text-white font-semibold text-xl pt-2">{tWhy3}</p>
          </div>
        </div>
      </section>

      {/* ═══════════ GALLERY ═══════════ */}
      <EventGallery photos={PHOTOS} videos={VIDEOS} />

      {/* ═══════════ CTA ═══════════ */}
      <section className="mx-auto max-w-6xl px-4 md:px-6 py-16">
        <div className="flex justify-center gap-4">
          <a href="/galeria-dibujos" className="rounded-xl bg-emerald-600 px-6 py-3 font-bold text-white shadow-lg transition-all hover:bg-emerald-700 hover:-translate-y-0.5">
            {tCta1}
          </a>
          <a href="/dibuja-la-flor-de-tu-pais" className="rounded-xl border border-emerald-300 bg-white px-6 py-3 font-bold text-emerald-800 transition-all hover:bg-emerald-50 hover:-translate-y-0.5">
            {tCta2}
          </a>
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
  )
}
