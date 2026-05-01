"use client";
import React, { Suspense } from "react";
import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useTranslation } from "../../lib/useTranslation";

function AlliancesPageContent() {
  const { isLoading, t } = useTranslation();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="w-8 h-8 border-2 border-slate-300 border-t-emerald-500 rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-[#f8f5f0]">
      <header className="py-6 px-6 bg-white border-b border-slate-200">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <Link href="/" className="inline-flex items-center text-slate-600 hover:text-slate-900 transition font-medium">
            <ArrowLeft className="w-4 h-4 mr-2" />
            {t("alliances.backToHome")}
          </Link>
        </div>
      </header>

      <section className="py-16 px-6 bg-[#1a3a2f] text-[#f8f5f0] border-b border-[#9b7b3d]/30">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-xs uppercase tracking-[0.2em] text-[#d0b47a] mb-4">{t("alliances.eyebrow")}</p>
          <h1 className="text-4xl md:text-5xl leading-tight" style={{ fontFamily: 'Georgia, Cambria, "Times New Roman", Times, serif' }}>
            {t("alliances.title")}
          </h1>
        </div>
      </section>

      <section className="py-16 px-6">
        <div className="max-w-5xl mx-auto grid lg:grid-cols-[1.2fr_0.8fr] gap-8 items-stretch">
          <article className="bg-white border border-[#1a3a2f]/15 p-8 md:p-10">
            <p className="text-[#2d4f40] text-lg leading-relaxed mb-6">{t("alliances.body1")}</p>
            <p className="text-[#2d4f40] text-lg leading-relaxed mb-6">{t("alliances.body2")}</p>
            <p className="text-[#2d4f40] text-lg leading-relaxed">{t("alliances.body3")}</p>
          </article>

          <aside className="bg-white border border-[#1a3a2f]/15 p-8 md:p-10 flex flex-col justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-[#9b7b3d] mb-4">{t("alliances.partnerLabel")}</p>
              <div className="bg-slate-50 border border-slate-200 p-6 rounded-sm">
                <img
                  src="https://www.lpu.in/lpu-assets/images/logo/logo-dark.svg"
                  alt="Lovely Professional University official logo"
                  className="w-full h-16 object-contain"
                />
              </div>
            </div>
            <a
              href="https://www.lpu.in"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 inline-flex items-center text-sm uppercase tracking-[0.12em] font-semibold text-[#1a3a2f] hover:text-[#9b7b3d] transition-colors"
            >
              {t("alliances.visitLpu")}
              <ArrowRight className="ml-2 w-4 h-4" />
            </a>
          </aside>
        </div>
      </section>

      <section className="pb-16 px-6">
        <div className="max-w-5xl mx-auto bg-[#f4ebd9] border border-[#9b7b3d]/25 p-8 md:p-10">
          <h2 className="text-2xl md:text-3xl text-[#1a3a2f] mb-4" style={{ fontFamily: 'Georgia, Cambria, "Times New Roman", Times, serif' }}>
            {t("alliances.futureTitle")}
          </h2>
          <p className="text-[#2d4f40] leading-relaxed">{t("alliances.futureBody")}</p>
        </div>
      </section>
    </main>
  );
}

export default function AlliancesPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#f8f5f0]"></div>}>
      <AlliancesPageContent />
    </Suspense>
  );
}
