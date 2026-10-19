import Image from "next/image";
import Link from "next/link";
import { Baskervville } from "next/font/google";
import { cookies } from "next/headers";
import { ArrowLeft, ArrowUpRight, CalendarDays, MapPin, Users } from "lucide-react";
import esMessages from "../../../messages/es.json";
import enMessages from "../../../messages/en.json";

const displayFont = Baskervville({ subsets: ["latin"], weight: ["400"] });
const source = "https://oficinasverdes.es/foro-canario-de-cambio-climatico/";
const teideSource = "https://www.hellocanaryislands.com/nature-spaces/tenerife/teide-national-park/";
const nubloSource = "https://www.hellocanaryislands.com/hiking/gran-canaria/roque-nublo/";
const pageUrl = "https://asociacionnahiara.org/alianzas-academicas-e-institucionales/foro-canario-cambio-climatico-2026";
const poster = "/events/foro-canario-2026/poster-v9.png";
const englishPoster = "/events/foro-canario-2026/poster-en-v1.png";

export const metadata = {
  title: esMessages.forumCanario.metadataTitle,
  description: esMessages.forumCanario.metadataDescription,
  alternates: { canonical: pageUrl },
  openGraph: {
    title: `${esMessages.forumCanario.titleLine1} ${esMessages.forumCanario.titleLine2}`,
    description: esMessages.forumCanario.metadataDescription,
    images: [{ url: poster, width: 1080, height: 1350, alt: esMessages.forumCanario.posterAlt }],
  },
};

function Source({ label }) {
  return <a href={source} target="_blank" rel="noreferrer" className="ml-2 font-semibold text-[#0f5b48] underline decoration-[#d6b56d] underline-offset-4 hover:text-[#13352d] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0f5b48]">{label}</a>;
}

export default async function ForoCanarioPage() {
  const locale = (await cookies()).get("NEXT_LOCALE")?.value;
  const copy = locale === "es" ? esMessages.forumCanario : enMessages.forumCanario;
  return (
    <main className="min-h-screen bg-[#f5f1e8] text-[#102a23]">
      <section className="relative overflow-hidden bg-[#072c26] text-[#f7f4ec]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(196,140,70,0.16),transparent_28%),radial-gradient(circle_at_80%_35%,rgba(217,97,82,0.12),transparent_24%),radial-gradient(circle_at_bottom_left,rgba(114,148,100,0.16),transparent_28%)]" />
        <div aria-hidden="true" className="absolute right-[-8rem] top-[8rem] h-[28rem] w-[28rem] rounded-full border border-[#d6b56d]/15" />
        <div aria-hidden="true" className="absolute left-[-10rem] top-[18rem] h-[24rem] w-[24rem] rounded-full border border-[#d6b56d]/10" />

        <div className="relative mx-auto flex max-w-7xl flex-col px-4 pb-18 pt-6 md:px-6 md:pb-24 md:pt-8">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <Link href="/alianzas-academicas-e-institucionales" className="inline-flex items-center gap-2 text-sm font-medium text-[#e8e0cf] hover:text-white"><ArrowLeft aria-hidden="true" className="h-4 w-4" /> {copy.back}</Link>
            <a href={source} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full border border-white/15 px-4 py-2 text-xs font-semibold uppercase tracking-[0.14em] text-[#e8e0cf] hover:bg-white/8 hover:text-white">{copy.officialRegistration} <ArrowUpRight aria-hidden="true" className="h-4 w-4" /></a>
          </div>

          <div className="relative mt-6 grid items-end gap-12 sm:mt-10 lg:grid-cols-[minmax(0,1.15fr)_minmax(320px,0.85fr)]">
            <div className="relative z-10 min-w-0">
              <div className="flex flex-wrap gap-2.5">
                <a href={source} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full border border-[#d6b56d]/28 bg-[#f7f4ec]/8 px-3.5 py-2 text-xs font-semibold text-[#fff3cf]"><Users aria-hidden="true" className="h-4 w-4 text-[#efc85f]" /> {copy.age}</a>
                <a href={source} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full border border-[#d6b56d]/28 bg-[#f7f4ec]/8 px-3.5 py-2 text-xs font-semibold text-[#fff3cf]"><CalendarDays aria-hidden="true" className="h-4 w-4 text-[#efc85f]" /> {copy.dates}</a>
                <a href={source} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full border border-[#d6b56d]/28 bg-[#f7f4ec]/8 px-3.5 py-2 text-xs font-semibold text-[#fff3cf]"><MapPin aria-hidden="true" className="h-4 w-4 text-[#efc85f]" /> {copy.place}</a>
              </div>
              <h1 className={displayFont.className + " mt-7 max-w-4xl text-balance text-[clamp(3rem,6.4vw,6.2rem)] leading-[0.98] tracking-[-0.035em] text-[#fbf8f0]"}>{copy.titleLine1}<br />{copy.titleLine2}</h1>
              <p className="mt-7 text-sm font-semibold text-[#efc85f]">{copy.eventName}</p>
              <p className="mt-2 text-sm text-[#e8e0cf]">{copy.organizerCredit} <a href={source} target="_blank" rel="noreferrer" className="font-semibold text-[#efc85f] underline underline-offset-4">{copy.sourceShort}</a></p>
              <h2 className={displayFont.className + " mt-4 max-w-2xl text-balance text-[clamp(1.8rem,3vw,2.9rem)] italic leading-[1.08] tracking-[-0.02em] text-[#f4baa9]"}>{copy.subtitle}</h2>
              <p className="mt-7 max-w-2xl text-base leading-8 text-[#d7ded8]">{copy.eventDetails} <a href={source} target="_blank" rel="noreferrer" className="font-semibold text-[#efc85f] underline underline-offset-4">{copy.sourceShort}</a></p>

              <div className="mt-8 grid gap-3 sm:grid-cols-3">
                <a href={source} target="_blank" rel="noreferrer" className="rounded-2xl border border-white/10 bg-white/[0.04] p-4 hover:border-[#efc85f]/45"><span className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.12em] text-[#efc85f]"><CalendarDays aria-hidden="true" className="h-4 w-4" /> {copy.scheduleLabel}</span><strong className="mt-4 block text-base font-medium">{copy.dates}</strong><span className="mt-1 block text-sm text-[#d8d3c7]">{copy.venue}</span></a>
                <a href={source} target="_blank" rel="noreferrer" className="rounded-2xl border border-white/10 bg-white/[0.04] p-4 hover:border-[#efc85f]/45"><span className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.12em] text-[#efc85f]"><Users aria-hidden="true" className="h-4 w-4" /> {copy.workshopLabel}</span><strong className="mt-4 block text-base font-medium">{copy.workshopName}</strong><span className="mt-1 block text-sm text-[#d8d3c7]">{copy.age}</span></a>
                <a href={source} target="_blank" rel="noreferrer" className="rounded-2xl border border-white/10 bg-white/[0.04] p-4 hover:border-[#efc85f]/45"><span className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.12em] text-[#efc85f]"><CalendarDays aria-hidden="true" className="h-4 w-4" /> {copy.registrationLabel}</span><strong className="mt-4 block text-base font-medium">{copy.registrationDeadline}</strong><span className="mt-1 block text-sm text-[#d8d3c7]">{copy.officialForm}</span></a>
              </div>
            </div>

            <figure className="relative mx-auto w-full max-w-[24rem] sm:max-w-[28rem] lg:mb-2">
              <div aria-hidden="true" className="absolute bottom-[8%] left-[-8%] h-36 w-36 rounded-full bg-[#d66152]/18 blur-2xl md:h-52 md:w-52" />
              <div aria-hidden="true" className="absolute right-[-10%] top-[20%] h-44 w-44 rounded-full bg-[#8b5cf6]/14 blur-3xl md:h-64 md:w-64" />
              <span className="absolute right-[-1rem] top-[-1rem] z-20 rounded-full bg-[#d6b56d]/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.12em] text-[#efc85f]">{copy.posterLabel}</span>
              <div className="relative z-10 overflow-hidden rounded-2xl border border-[#e8d3a3]/25 bg-[#08251f] shadow-[0_28px_70px_-35px_rgba(0,0,0,0.85)]"><Image src={locale === "es" ? poster : englishPoster} alt={copy.posterAlt} width={1122} height={1402} sizes="(max-width: 1024px) 90vw, 448px" priority unoptimized className="h-auto w-full" /></div>
              <figcaption className="relative z-10 mt-3 text-xs leading-5 text-[#d7ded8]">{copy.landscapeCaption} <a href={teideSource} target="_blank" rel="noreferrer" className="underline underline-offset-2">{copy.teideSourceLabel}</a> · <a href={nubloSource} target="_blank" rel="noreferrer" className="underline underline-offset-2">{copy.nubloSourceLabel}</a></figcaption>
            </figure>
          </div>
        </div>

        <div className="relative h-14 w-full overflow-hidden md:h-20"><svg viewBox="0 0 1440 120" className="absolute inset-0 h-full w-full" preserveAspectRatio="none" aria-hidden="true"><path d="M0,28 C170,88 290,114 450,90 C620,64 706,8 880,20 C1088,34 1192,108 1440,72 L1440,120 L0,120 Z" fill="#f5f1e8" /></svg></div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-10 px-4 pb-16 pt-10 md:px-6 md:pt-14 lg:grid-cols-[1.05fr_0.95fr]">
        <div><p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#9a7330]">{copy.participationLabel}</p><h2 className={displayFont.className + " mt-4 text-balance text-[clamp(2.7rem,4.8vw,5rem)] leading-[0.98] tracking-[-0.035em] text-[#13352d]"}>{copy.participationHeading}</h2><p className="mt-6 max-w-2xl text-base leading-8 text-[#355148]">{copy.participationText}<Source label={copy.sourceFull} /></p></div>
        <div className="border-t border-[#d6c7a1] pt-8 lg:border-l lg:border-t-0 lg:pl-10 lg:pt-0"><p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#0f5b48]">{copy.familiesLabel}</p><h2 className={displayFont.className + " mt-4 text-balance text-[clamp(2.1rem,3.8vw,3.5rem)] leading-[1] tracking-[-0.03em] text-[#13352d]"}>{copy.workshopName}</h2><p className="mt-5 text-base leading-8 text-[#355148]">{copy.familiesText}<Source label={copy.sourceFull} /></p></div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-16 md:px-6" id="inscripcion"><div className="grid gap-10 border-y border-[#d6c7a1] py-10 lg:grid-cols-[1.05fr_0.95fr]">
        <div><p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#9a7330]">{copy.howToLabel}</p><h2 className={displayFont.className + " mt-4 text-balance text-[clamp(2.7rem,4.8vw,5rem)] leading-[0.98] tracking-[-0.035em] text-[#13352d]"}>{copy.howToHeading}</h2><p className="mt-6 max-w-2xl text-base leading-8 text-[#355148]">{copy.registrationInstruction}<Source label={copy.sourceFull} /></p></div>
        <div className="self-center"><p className="border-t border-[#d6c7a1] py-4 text-base leading-7 text-[#355148]">{copy.step1}<Source label={copy.sourceFull} /></p><p className="border-t border-[#d6c7a1] py-4 text-base leading-7 text-[#355148]">{copy.step2}<Source label={copy.sourceFull} /></p><p className="border-y border-[#d6c7a1] py-4 text-base leading-7 text-[#355148]">{copy.step3}<Source label={copy.sourceFull} /></p><a href={source} target="_blank" rel="noreferrer" className="mt-7 inline-flex items-center gap-2 rounded-full bg-[#0f5b48] px-6 py-3 font-semibold text-white hover:bg-[#13352d] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0f5b48]">{copy.openRegistration} <ArrowUpRight aria-hidden="true" className="h-4 w-4" /></a><p className="mt-3 text-sm text-[#355148]">{copy.officialFormLink}</p></div>
      </div></section>

      <footer className="bg-[#eae4d7] px-4 py-12 text-[#244038] md:px-6"><div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-6"><p className="font-medium">{copy.footer}</p><Link href="/alianzas-academicas-e-institucionales" className="font-semibold underline decoration-[#d6b56d] underline-offset-4">{copy.backToCollaborations}</Link></div></footer>
    </main>
  );
}
