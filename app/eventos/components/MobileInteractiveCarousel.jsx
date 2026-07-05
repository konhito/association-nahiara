"use client";

import { useCallback, useEffect, useRef, useState } from "react";

const ANIMATION_DURATION_MS = 115000;

const ANIMATION_CSS = `
  @keyframes mobile-interactive-carousel-scroll {
    from { transform: translateX(0); }
    to { transform: translateX(calc(-100% + var(--mobile-carousel-card-width))); }
  }

  .mobile-interactive-carousel-track {
    --mobile-carousel-card-width: 82vw;
    animation: mobile-interactive-carousel-scroll 115s linear infinite;
  }

  @media (max-width: 639px) {
    .mobile-interactive-carousel-track {
      animation: none;
      transform: none;
    }
  }

  @media (min-width: 640px) {
    .mobile-interactive-carousel-track {
      --mobile-carousel-card-width: 70vw;
    }
  }

  @media (min-width: 768px) {
    .mobile-interactive-carousel-track {
      --mobile-carousel-card-width: 42vw;
    }
  }

  @media (min-width: 1024px) {
    .mobile-interactive-carousel-track {
      --mobile-carousel-card-width: calc((74rem - 2rem) / 3);
    }
  }

  .mobile-interactive-carousel-showcase:hover .mobile-interactive-carousel-track {
    animation-play-state: paused;
  }

  @media (prefers-reduced-motion: reduce) {
    .mobile-interactive-carousel-track {
      animation: none !important;
      transform: none !important;
    }
  }
`;

export default function MobileInteractiveCarousel({
  showcaseClassName = "",
  trackClassName = "",
  items,
  renderCard,
  pauseDelayMs = 1200,
}) {
  const shellRef = useRef(null);
  const resumeTimerRef = useRef(null);
  const animationFrameRef = useRef(null);
  const pausedRef = useRef(false);
  const [isMobile, setIsMobile] = useState(false);

  const clearResumeTimer = useCallback(() => {
    if (resumeTimerRef.current) {
      window.clearTimeout(resumeTimerRef.current);
      resumeTimerRef.current = null;
    }
  }, []);

  const pauseMobileCarousel = useCallback(() => {
    if (!isMobile) return;
    clearResumeTimer();
    pausedRef.current = true;
  }, [clearResumeTimer, isMobile]);

  const scheduleResume = useCallback(() => {
    if (!isMobile) return;
    clearResumeTimer();
    resumeTimerRef.current = window.setTimeout(() => {
      pausedRef.current = false;
      resumeTimerRef.current = null;
    }, pauseDelayMs);
  }, [clearResumeTimer, isMobile, pauseDelayMs]);

  useEffect(() => {
    const media = window.matchMedia("(max-width: 639px)");
    const update = () => setIsMobile(media.matches);

    update();
    media.addEventListener?.("change", update);

    return () => media.removeEventListener?.("change", update);
  }, []);

  useEffect(() => {
    if (!isMobile || !shellRef.current) return undefined;

    const shell = shellRef.current;
    let previousTime;

    const animate = (time) => {
      if (previousTime === undefined) previousTime = time;
      const elapsed = Math.min(time - previousTime, 50);
      previousTime = time;

      if (!pausedRef.current && shell.scrollWidth > shell.clientWidth) {
        const maxScroll = shell.scrollWidth - shell.clientWidth;
        shell.scrollLeft += (maxScroll / ANIMATION_DURATION_MS) * elapsed;

        if (shell.scrollLeft >= maxScroll - 1) shell.scrollLeft = 0;
      }

      animationFrameRef.current = window.requestAnimationFrame(animate);
    };

    animationFrameRef.current = window.requestAnimationFrame(animate);

    return () => {
      window.cancelAnimationFrame(animationFrameRef.current);
      animationFrameRef.current = null;
    };
  }, [isMobile]);

  useEffect(() => {
    return () => clearResumeTimer();
  }, [clearResumeTimer]);

  return (
    <div className={`mobile-interactive-carousel-showcase ${showcaseClassName}`.trim()}>
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-7 rounded-l-xl bg-gradient-to-r from-[#0f3028] via-[#0f3028]/82 to-transparent sm:w-12 sm:rounded-l-2xl md:w-20" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-7 rounded-r-xl bg-gradient-to-l from-[#0f3028] via-[#0f3028]/82 to-transparent sm:w-12 sm:rounded-r-2xl md:w-20" />
      <div className="pointer-events-none absolute inset-x-4 top-0 h-px bg-gradient-to-r from-transparent via-[#d6b56d]/70 to-transparent sm:inset-x-8" />
      <div className="pointer-events-none absolute inset-x-4 bottom-0 h-px bg-gradient-to-r from-transparent via-[#d6b56d]/45 to-transparent sm:inset-x-8" />
      <style dangerouslySetInnerHTML={{ __html: ANIMATION_CSS }} />
      <div
        ref={shellRef}
        className={`py-1 ${isMobile ? "overflow-x-auto overscroll-x-contain" : "overflow-hidden"}`}
        style={{
          touchAction: isMobile ? "pan-x" : undefined,
          WebkitOverflowScrolling: "touch",
          scrollbarWidth: "none",
        }}
        onPointerDown={pauseMobileCarousel}
        onPointerUp={scheduleResume}
        onPointerCancel={scheduleResume}
      >
        <div className={`mobile-interactive-carousel-track ${trackClassName}`.trim()}>
          {items.map((item, index) => (
            <div key={item.key ?? index} className="shrink-0">
              {renderCard(item, index, { isActive: false, isMobile })}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
