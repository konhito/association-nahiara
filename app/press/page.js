"use client";
import React, { Suspense } from 'react';
import Link from 'next/link';
import { ArrowLeft, PlayCircle, Radio, ArrowRight } from 'lucide-react';
import { useTranslation } from '../../lib/useTranslation';

function PressPageContent() {
  const { locale, isLoading, t } = useTranslation();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="w-8 h-8 border-2 border-slate-300 border-t-emerald-500 rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="py-6 px-6 bg-white border-b border-slate-200">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <Link href="/" className="inline-flex items-center text-slate-600 hover:text-slate-900 transition font-medium">
            {t('press.backToHome')}
          </Link>
        </div>
      </header>

      {/* Hero */}
      <section className="py-16 px-6 bg-slate-900 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4" style={{ fontFamily: 'Playfair Display, serif' }}>
            {t('press.pressRoomTitle')}
          </h1>
          <p className="text-xl text-slate-300 max-w-2xl mx-auto">
            {t('press.pressRoomDesc')}
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
                <span>{t('press.podcastTitle')}</span>
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-4" style={{ fontFamily: 'Playfair Display, serif' }}>
                {t('press.conAcento')}
              </h2>
              <p className="text-lg text-slate-600 mb-8 leading-relaxed">
                {t('press.interviewDesc')}
              </p>
              
              <div className="bg-slate-50 border border-slate-200 rounded-xl p-6 shadow-inner">
                <h3 className="font-semibold text-slate-900 flex items-center gap-2 mb-4">
                  <PlayCircle className="w-6 h-6 text-emerald-600" />
                  {t('press.listenRecording')}
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
                    {t('press.originalBroadcast')}
                  </p>
                  <a 
                    href="https://go.ivoox.com/rf/171639731" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center font-semibold text-emerald-600 hover:text-emerald-700 transition group"
                  >
                    {t('press.officialEpisode')}
                    <ArrowRight className="w-4 h-4 ml-1 -rotate-45 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Social Media & Reels Card */}
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-slate-200 hover:border-emerald-200 transition-colors duration-300 mt-8">
            <div className="p-8 md:p-10">
              <div className="flex items-center gap-2 text-blue-600 font-bold mb-4 text-sm uppercase tracking-wider">
                <PlayCircle className="w-5 h-5" />
                <span>{t('press.facebookReel')}</span>
              </div>
              <h2 className="text-2xl font-bold text-slate-900 mb-4" style={{ fontFamily: 'Playfair Display, serif' }}>
                {t('press.initiativeOverview')}
              </h2>
              <p className="text-lg text-slate-600 mb-6 leading-relaxed">
                {t('press.initiativeOverviewDesc')}
              </p>
              
              <a 
                href="https://www.facebook.com/reel/1610406273586913?s=yWDuG2&fs=e#m" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center bg-blue-600 text-white rounded-xl px-6 py-3 font-semibold hover:bg-blue-700 transition shadow-md"
              >
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.469h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.469h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                {t('press.watchReel')}
              </a>
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
