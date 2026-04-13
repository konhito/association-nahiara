"use client";
import React, { Suspense } from 'react';
import Link from 'next/link';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { useTranslation } from '../../lib/useTranslation';

// Territories Section Component
function TerritoriesSection({ locale }) {
  const tTitle = {
    es: "Territorios que nos inspiran",
    en: "Territories that inspire us",
    de: "Gebiete, die uns inspirieren",
    fr: "Territoires qui nous inspirent",
    it: "Territori che ci ispirano",
    zh: "启发我们的领土"
  }[locale] || "Territories that inspire us";

  const tDesc = {
    es: "Instituto Tecnológico de Canarias — más de 30 años impulsando la investigación, el desarrollo y la innovación en las Islas Canarias.",
    en: "Instituto Tecnológico de Canarias — over 30 years driving research, development and innovation across the Canary Islands.",
    de: "Instituto Tecnológico de Canarias — seit über 30 Jahren treibende Kraft für Forschung, Entwicklung und Innovation auf den Kanarischen Inseln.",
    fr: "Instituto Tecnológico de Canarias — plus de 30 ans à stimuler la recherche, le développement et l'innovation dans les îles Canaries.",
    it: "Instituto Tecnológico de Canarias — oltre 30 anni di promozione della ricerca, dello sviluppo e dell'innovazione nelle Isole Canarie.",
    zh: "加那利技术学院 — 三十多年来一直推动加那利群岛的研究、开发和创新。"
  }[locale] || "Instituto Tecnológico de Canarias — over 30 years driving research, development and innovation across the Canary Islands.";

  const tBtn = {
    es: "Conocer el ITC",
    en: "Visit ITC",
    de: "ITC Besuchen",
    fr: "Visiter l'ITC",
    it: "Visita l'ITC",
    zh: "访问 ITC"
  }[locale] || "Visit ITC";

  return (
    <section className="py-20 px-6 bg-slate-50 border-y border-slate-100 min-h-[80vh] flex items-center" aria-label="Territories that inspire us">
      <div className="max-w-6xl mx-auto w-full">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          {/* Text Content */}
          <div className="w-full lg:w-1/3 flex flex-col justify-center text-center lg:text-left">
            <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold tracking-widest uppercase mb-6 w-max mx-auto lg:mx-0">
              Inspiration
            </div>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 mb-6 leading-tight" style={{ fontFamily: 'Playfair Display, serif' }}>
              {tTitle}
            </h1>
            <div className="w-16 h-1 bg-emerald-500 mb-6 rounded-full mx-auto lg:mx-0" aria-hidden="true"></div>
            <p className="text-lg text-slate-600 mb-8 leading-relaxed font-medium">
              {tDesc}
            </p>
            <a
              href="https://www.itccanarias.org"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-8 py-3.5 bg-slate-900 text-white text-base font-semibold rounded-lg hover:bg-slate-800 transition-all duration-200 shadow-md hover:shadow-lg transform hover:-translate-y-0.5 group w-max mx-auto lg:mx-0"
              style={{ fontFamily: 'Inter, system-ui, -apple-system, sans-serif' }}
            >
              {tBtn}
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </a>
          </div>

          {/* Photo Gallery Grid */}
          <div className="w-full lg:w-2/3 flex flex-col md:grid md:grid-cols-3 md:grid-rows-2 gap-4 h-auto md:h-[500px]">
             {/* Large Main Image */}
             <div className="md:col-span-2 md:row-span-2 overflow-hidden rounded-2xl shadow-xl group h-[300px] md:h-auto relative bg-slate-200">
               <img 
                 src="/Tour/WhatsApp%20Image%202026-04-10%20at%207.03.02%20PM.jpeg" 
                 alt="ITC Visit Group Photo" 
                 className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
               />
             </div>
             {/* Smaller Image 1 */}
             <div className="md:col-span-1 md:row-span-1 overflow-hidden rounded-2xl shadow-lg group h-[200px] md:h-auto relative bg-slate-200">
               <img 
                 src="/Tour/WhatsApp%20Image%202026-04-10%20at%207.03.02%20PM%20(1).jpeg" 
                 alt="DESALRO 2.0" 
                 className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
               />
             </div>
             {/* Smaller Image 2 */}
             <div className="md:col-span-1 md:row-span-1 overflow-hidden rounded-2xl shadow-lg group h-[200px] md:h-auto relative bg-slate-200">
               <img 
                 src="/Tour/WhatsApp%20Image%202026-04-10%20at%207.03.02%20PM%20(2).jpeg" 
                 alt="ITC Experience Selfie" 
                 className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
               />
             </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function TerritoriesPageContent() {
  const { locale, isLoading } = useTranslation();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="w-8 h-8 border-2 border-slate-300 border-t-emerald-500 rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-white">
      {/* Simple Header */}
      <header className="py-6 px-6 bg-white border-b border-slate-100 flex justify-between items-center max-w-6xl mx-auto">
        <Link 
          href="/" 
          className="inline-flex items-center text-slate-600 hover:text-slate-900 transition font-medium"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          {locale === 'es' ? "Volver" : locale === 'de' ? "Zurück" : "Back"}
        </Link>
      </header>

      {/* Main Section */}
      <TerritoriesSection locale={locale} />
    </main>
  );
}

export default function TerritoriesPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="w-8 h-8 border-2 border-slate-300 border-t-emerald-500 rounded-full animate-spin"></div>
      </div>
    }>
      <TerritoriesPageContent />
    </Suspense>
  );
}
