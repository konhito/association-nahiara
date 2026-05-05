"use client";

import Link from "next/link";
import { ChevronLeft } from "lucide-react";

export default function LeoXIVGranCanariaPage() {
  return (
    <div className="min-h-screen bg-[#faf9f6]">
      <div className="bg-white/80 backdrop-blur-md sticky top-0 z-[100] border-b border-gray-100 flex items-center justify-between px-6 py-4">
        <Link
          href="/"
          className="inline-flex items-center text-sm font-semibold text-gray-600 hover:text-emerald-600 transition-colors"
        >
          <ChevronLeft className="w-5 h-5 mr-1" />
          Back
        </Link>
      </div>

      <main className="mx-auto max-w-5xl px-4 py-12 md:px-6 md:py-16">
        <span className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-emerald-700">
          Informational Note
        </span>

        <h1
          className="mt-5 text-4xl font-extrabold leading-tight text-slate-900 sm:text-5xl md:text-6xl"
          style={{ fontFamily: "Bangers, cursive", letterSpacing: "0.03em" }}
        >
          Leo XIV Visits Gran Canaria
        </h1>

        <p className="mt-5 max-w-3xl text-lg text-slate-700 leading-relaxed">
          Added as a historical informational note regarding an event connected
          to the Association and the origin of the Nahiara universe.
        </p>

        <blockquote className="mt-6 border-l-4 border-emerald-300 bg-white/70 px-5 py-4 text-slate-700 italic rounded-r-xl">
          His Holiness Leo XIV visits Gran Canaria, the land where the Nahiara
          universe was born.
        </blockquote>

        <div className="mt-10 overflow-hidden rounded-3xl border border-slate-200 bg-black shadow-xl">
          <video
            className="w-full h-auto"
            controls
            preload="none"
            playsInline
            src="/Leo XIV visits Gran Canaria.mp4"
          >
            Your browser does not support the video tag.
          </video>
        </div>
      </main>
    </div>
  );
}
