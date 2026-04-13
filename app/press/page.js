"use client";
import React, { Suspense } from 'react';
import Link from 'next/link';
import { ArrowLeft, PlayCircle, Radio, ArrowRight } from 'lucide-react';
import { useTranslation } from '../../lib/useTranslation';

function PressPageContent() {
  const { locale, isLoading } = useTranslation();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="w-8 h-8 border-2 border-slate-300 border-t-emerald-500 rounded-full animate-spin"></div>
      </div>
    );
  }

  const tBack = {
    es: "Volver al inicio",
    en: "Back to Home",
    de: "Zurück zur Startseite",
    fr: "Retour à l'accueil",
    it: "Torna alla Home",
    zh: "返回首页"
  }[locale] || "Back to Home";

  const tTitle = {
    es: "Sala de Prensa",
    en: "Press Room",
    de: "Presseraum",
    fr: "Salle de Presse",
    it: "Sala Stampa",
    zh: "新闻中心"
  }[locale] || "Press Room";

  const tDesc = {
    es: "Últimas entrevistas, comunicados oficiales y apariciones en medios de la Asociación.",
    en: "Latest interviews, official announcements, and media appearances.",
    de: "Aktuelle Interviews, offizielle Ankündigungen und Medienauftritte.",
    fr: "Dernières interviews, annonces officielles et apparitions dans les médias.",
    it: "Ultime interviste, annunci ufficiali e apparizioni sui media.",
    zh: "最新采访、官方公告和媒体露面。"
  }[locale] || "Latest interviews, official announcements, and media appearances.";

  const tInterview = {
    es: "Entrevista exclusiva en español con Matías Gonzalez sobre el ecosistema transmedia y los valores fundamentales de la Asociación Nahiara. El audio a continuación es una grabación en bruto de la sesión para el disfrute directo y sin publicidad de nuestra comunidad.",
    en: "Exclusive Spanish interview with Matías Gonzalez on the transmedia ecosystem and the core values of Asociación Nahiara. The audio below is a raw recording for our community's ad-free uninterrupted listening.",
    de: "Exklusives spanisches Interview mit Matías Gonzalez über das Transmedia-Ökosystem und die Grundwerte der Asociación Nahiara. Das folgende Audio ist eine rohe Aufnahme für das werbefreie Hörvergnügen unserer Gemeinschaft.",
    fr: "Interview exclusive en espagnol de Matías Gonzalez sur l'écosystème transmédia et les valeurs fondamentales de l'Asociación Nahiara. L'audio ci-dessous est un enregistrement brut pour l'écoute sans publicité de notre communauté.",
    it: "Intervista esclusiva in spagnolo con Matías Gonzalez sull'ecosistema transmediale e i valori fondamentali dell'Asociación Nahiara. L'audio sottostante è una registrazione grezza per l'ascolto senza pubblicità della nostra comunità.",
    zh: "与 Matías Gonzalez 就跨媒体生态系统和 Nahiara 协会的核心价值进行的独家西班牙语采访。以下音频是原始录音，供我们社区无广告不间断收听。"
  }[locale] || "Exclusive Spanish interview with Matías Gonzalez on the transmedia ecosystem and the core values of Asociación Nahiara. The audio below is a raw recording for our community's ad-free uninterrupted listening.";

  const tListen = {
    es: "Escuchar el archivo (Audio)",
    en: "Listen to the recording (Audio)",
    de: "Aufnahme anhören (Audio)",
    fr: "Écouter l'enregistrement (Audio)",
    it: "Ascolta la registrazione (Audio)",
    zh: "收听录音 (音频)"
  }[locale] || "Listen to the recording (Audio)";

  const tOriginal = {
    es: "¿Prefieres escuchar la transmisión original?",
    en: "Prefer to listen to the original broadcast?",
    de: "Möchten Sie lieber die Originalsendung hören?",
    fr: "Vous préférez écouter l'émission originale?",
    it: "Preferisci ascoltare la trasmissione originale?",
    zh: "更喜欢收听原版广播？"
  }[locale] || "Prefer to listen to the original broadcast?";

  const tOriginalLink = {
    es: "Escuchar episodio oficial en iVoox",
    en: "Listen to official episode on iVoox",
    de: "Offizielle Episode auf iVoox anhören",
    fr: "Écouter l'épisode officiel sur iVoox",
    it: "Ascolta l'episodio ufficiale su iVoox",
    zh: "在 iVoox 上收听官方剧集"
  }[locale] || "Listen to official episode on iVoox";

  return (
    <main className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="py-6 px-6 bg-white border-b border-slate-200">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <Link href="/" className="inline-flex items-center text-slate-600 hover:text-slate-900 transition font-medium">
            {tBack}
          </Link>
        </div>
      </header>

      {/* Hero */}
      <section className="py-16 px-6 bg-slate-900 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4" style={{ fontFamily: 'Playfair Display, serif' }}>
            {tTitle}
          </h1>
          <p className="text-xl text-slate-300 max-w-2xl mx-auto">
            {tDesc}
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 px-6">
        <div className="max-w-4xl mx-auto">
          {/* Interview Card */}
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-slate-200 hover:border-emerald-200 transition-colors duration-300">
            <div className="p-8 md:p-10">
              <div className="flex items-center gap-2 text-emerald-600 font-bold mb-4 text-sm uppercase tracking-wider">
                <Radio className="w-5 h-5" />
                <span>Podcast Interview - April 09, 2026</span>
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-4" style={{ fontFamily: 'Playfair Display, serif' }}>
                Con Acento Planeta - Matías Gonzalez
              </h2>
              <p className="text-lg text-slate-600 mb-8 leading-relaxed">
                {tInterview}
              </p>
              
              <div className="bg-slate-50 border border-slate-200 rounded-xl p-6 shadow-inner">
                <h3 className="font-semibold text-slate-900 flex items-center gap-2 mb-4">
                  <PlayCircle className="w-6 h-6 text-emerald-600" />
                  {tListen}
                </h3>
                
                {/* Audio Player using the raw mpeg file */}
                <div className="bg-white p-3 rounded-xl border border-slate-200 shadow-sm">
                  <audio controls className="w-full h-12 outline-none">
                    <source src="/Tour/WhatsApp%20Audio%202026-04-10%20at%203.58.19%20PM.mpeg" type="audio/mpeg" />
                    Your browser does not support the audio element.
                  </audio>
                </div>
                
                <div className="mt-6 pt-6 border-t border-slate-200">
                  <p className="text-sm text-slate-500 mb-2">
                    {tOriginal}
                  </p>
                  <a 
                    href="https://go.ivoox.com/rf/171639731" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center font-semibold text-emerald-600 hover:text-emerald-700 transition group"
                  >
                    {tOriginalLink}
                    <ArrowRight className="w-4 h-4 ml-1 -rotate-45 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export default function PressPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-slate-50"></div>}>
       <PressPageContent />
    </Suspense>
  )
}
