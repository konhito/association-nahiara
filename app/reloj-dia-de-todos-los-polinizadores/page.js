"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";

function getCycleDates(now = new Date()) {
  let year = now.getFullYear();
  let dayStart = new Date(year, 5, 21, 0, 0, 0, 0);
  let dayEnd = new Date(year, 5, 22, 0, 0, 0, 0);

  if (now >= dayEnd) {
    year += 1;
    dayStart = new Date(year, 5, 21, 0, 0, 0, 0);
    dayEnd = new Date(year, 5, 22, 0, 0, 0, 0);
  }

  return { year, dayStart, dayEnd };
}

function getCountdownState(now = new Date()) {
  const { year, dayStart, dayEnd } = getCycleDates(now);

  if (now >= dayStart && now < dayEnd) {
    return {
      arrived: true,
      year,
      days: "00",
      hours: "00",
      minutes: "00",
      seconds: "00",
    };
  }

  const diff = Math.max(dayStart.getTime() - now.getTime(), 0);
  const days = Math.floor(diff / 86400000);
  const hours = Math.floor((diff % 86400000) / 3600000);
  const minutes = Math.floor((diff % 3600000) / 60000);
  const seconds = Math.floor((diff % 60000) / 1000);

  return {
    arrived: false,
    year,
    days: String(days).padStart(2, "0"),
    hours: String(hours).padStart(2, "0"),
    minutes: String(minutes).padStart(2, "0"),
    seconds: String(seconds).padStart(2, "0"),
  };
}

export default function RelojDiaPolinizadoresPage() {
  const [countdown, setCountdown] = useState(() => getCountdownState());
  const clockRef = useRef(null);
  const burstRef = useRef(null);

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown(getCountdownState());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const frame = clockRef.current;
    if (!frame) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const flyers = Array.from(frame.querySelectorAll("[data-flyer]"));
    if (!flyers.length) return;

    const hitTimeouts = new Map();
    const hitCooldown = new Map();

    const setCursorPosition = (clientX, clientY) => {
      const rect = frame.getBoundingClientRect();
      const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
      const y = Math.max(0, Math.min(clientY - rect.top, rect.height));
      frame.style.setProperty("--cursor-x", `${x}px`);
      frame.style.setProperty("--cursor-y", `${y}px`);
    };

    const clearAlerts = () => {
      flyers.forEach((flyer) => flyer.classList.remove("is-alert"));
    };

    const applyThreat = (clientX, clientY, forceBurst = false) => {
      const now = performance.now();
      flyers.forEach((flyer) => {
        const box = flyer.getBoundingClientRect();
        const centerX = box.left + box.width / 2;
        const centerY = box.top + box.height / 2;
        const distance = Math.hypot(clientX - centerX, clientY - centerY);

        flyer.classList.toggle("is-alert", distance < 130);

        const withinHitRange = forceBurst ? distance < 180 : distance < 72;
        if (!withinHitRange) return;

        const lastHit = hitCooldown.get(flyer) || 0;
        if (now - lastHit < 550) return;
        hitCooldown.set(flyer, now);

        flyer.classList.add("is-hit");
        const previousTimeout = hitTimeouts.get(flyer);
        if (previousTimeout) window.clearTimeout(previousTimeout);

        const timeoutId = window.setTimeout(() => {
          flyer.classList.remove("is-hit");
        }, 520);
        hitTimeouts.set(flyer, timeoutId);
      });
    };

    const triggerBurstPulse = () => {
      const burst = burstRef.current;
      if (!burst) return;
      burst.classList.remove("bursting");
      void burst.offsetWidth;
      burst.classList.add("bursting");
    };

    const handlePointerEnter = (event) => {
      frame.classList.add("cursor-on");
      setCursorPosition(event.clientX, event.clientY);
    };

    const handlePointerMove = (event) => {
      setCursorPosition(event.clientX, event.clientY);
      applyThreat(event.clientX, event.clientY, false);
    };

    const handlePointerLeave = () => {
      frame.classList.remove("cursor-on");
      clearAlerts();
    };

    const handlePointerDown = (event) => {
      setCursorPosition(event.clientX, event.clientY);
      triggerBurstPulse();
      applyThreat(event.clientX, event.clientY, true);
    };

    frame.addEventListener("pointerenter", handlePointerEnter);
    frame.addEventListener("pointermove", handlePointerMove);
    frame.addEventListener("pointerleave", handlePointerLeave);
    frame.addEventListener("pointerdown", handlePointerDown);

    return () => {
      frame.removeEventListener("pointerenter", handlePointerEnter);
      frame.removeEventListener("pointermove", handlePointerMove);
      frame.removeEventListener("pointerleave", handlePointerLeave);
      frame.removeEventListener("pointerdown", handlePointerDown);
      for (const timeoutId of hitTimeouts.values()) {
        window.clearTimeout(timeoutId);
      }
    };
  }, []);

  const subtitle = useMemo(() => {
    if (countdown.arrived) {
      return "Hoy es 21 de junio: se activa el Dia de Todos los Polinizadores.";
    }

    return `Cuenta regresiva hacia el 21 de junio de ${countdown.year}`;
  }, [countdown]);

  return (
    <main className={`clock-page ${countdown.arrived ? "arrived" : ""}`} ref={clockRef}>
      <div className="sun" />
      <div className="haze" />
      <div className="cursor-layer" aria-hidden="true">
        <div className="cursor-ring" />
        <div className="cursor-core" />
        <div className="cursor-burst" ref={burstRef} />
      </div>

      <div className="flyer f1" data-flyer>🦋</div>
      <div className="flyer f2" data-flyer>🐝</div>
      <div className="flyer f3" data-flyer>🦋</div>
      <div className="flyer f4" data-flyer>🐦</div>
      <div className="flyer f5" data-flyer>🦟</div>

      <section className="stage">
        <p className="eyebrow">Asociacion Nahiara · Declaracion anual</p>
        <h1>
          Dia de <em>Todos</em>
          <br />
          los Polinizadores
        </h1>
        <p className="subtitle">21 de junio · Solsticio</p>
        <p className="toward">{subtitle}</p>

        {!countdown.arrived && (
          <div className="clock" aria-live="polite" aria-label="Cuenta regresiva al 21 de junio">
            <div className="unit">
              <span className="num">{countdown.days}</span>
              <span className="label">Dias</span>
            </div>
            <div className="unit">
              <span className="num">{countdown.hours}</span>
              <span className="label">Horas</span>
            </div>
            <div className="unit">
              <span className="num">{countdown.minutes}</span>
              <span className="label">Min</span>
            </div>
            <div className="unit">
              <span className="num">{countdown.seconds}</span>
              <span className="label">Seg</span>
            </div>
          </div>
        )}

        {countdown.arrived && (
          <p className="celebrate">Hoy celebramos oficialmente el Dia de Todos los Polinizadores.</p>
        )}

        <div className="actions">
          <Link href="/dia-de-todos-los-polinizadores" className="cta primary">
            Leer manifiesto
          </Link>
          <Link href="/" className="cta secondary">
            Volver al inicio
          </Link>
        </div>
      </section>

      <style jsx>{`
        .clock-page {
          --sky-top: #0f2f2f;
          --sky-mid: #2f5a55;
          --sky-low: #c98856;
          --sun: #ffd78f;
          --cream: #fff8e9;
          --deep: #11211f;
          --accent: #f7c466;
          --cursor-x: 50%;
          --cursor-y: 50%;

          position: relative;
          min-height: 100vh;
          overflow: hidden;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 2rem 1rem;
          color: var(--cream);
          background:
            radial-gradient(120% 90% at 50% 100%, rgba(255, 215, 143, 0.6) 0%, rgba(255, 215, 143, 0) 42%),
            linear-gradient(180deg, var(--sky-top) 0%, var(--sky-mid) 48%, var(--sky-low) 86%, #d99f71 100%);
          cursor: none;
        }

        .sun {
          position: absolute;
          left: 50%;
          bottom: -12vh;
          transform: translateX(-50%);
          width: 48vh;
          height: 48vh;
          border-radius: 50%;
          background: radial-gradient(circle, #fff4da 0%, var(--sun) 42%, rgba(255, 215, 143, 0) 72%);
          filter: blur(2px);
          animation: breathe 8s ease-in-out infinite;
        }

        .haze {
          position: absolute;
          inset: 0;
          background:
            radial-gradient(45% 35% at 25% 30%, rgba(255, 248, 233, 0.12), transparent 70%),
            radial-gradient(40% 30% at 78% 58%, rgba(255, 215, 143, 0.14), transparent 70%);
          pointer-events: none;
        }

        .cursor-layer {
          position: absolute;
          inset: 0;
          z-index: 8;
          pointer-events: none;
          opacity: 0;
          transition: opacity 0.18s ease;
        }

        .cursor-on .cursor-layer {
          opacity: 1;
        }

        .cursor-ring,
        .cursor-core,
        .cursor-burst {
          position: absolute;
          left: var(--cursor-x);
          top: var(--cursor-y);
          transform: translate(-50%, -50%);
          border-radius: 999px;
        }

        .cursor-ring {
          width: 74px;
          height: 74px;
          border: 1px solid rgba(255, 248, 233, 0.52);
          background: radial-gradient(circle, rgba(247, 196, 102, 0.2), rgba(247, 196, 102, 0));
          box-shadow: 0 0 24px rgba(247, 196, 102, 0.2);
        }

        .cursor-core {
          width: 12px;
          height: 12px;
          background: #fff6e1;
          box-shadow: 0 0 16px rgba(255, 246, 225, 0.75);
        }

        .cursor-burst {
          width: 20px;
          height: 20px;
          border: 2px solid rgba(247, 196, 102, 0.8);
          opacity: 0;
        }

        .cursor-burst.bursting {
          animation: burst 0.35s ease-out forwards;
        }

        .stage {
          position: relative;
          z-index: 5;
          text-align: center;
          max-width: 960px;
          width: 100%;
          padding: clamp(1.2rem, 3vw, 2.4rem);
        }

        .eyebrow {
          font-size: 0.74rem;
          letter-spacing: 0.32em;
          text-transform: uppercase;
          color: var(--accent);
          margin-bottom: 1.1rem;
        }

        h1 {
          margin: 0;
          font-size: clamp(2.2rem, 6vw, 4.5rem);
          line-height: 1.05;
          letter-spacing: -0.02em;
          text-wrap: balance;
        }

        h1 em {
          font-style: italic;
          color: #fff3d8;
        }

        .subtitle {
          margin-top: 0.9rem;
          font-size: clamp(1rem, 2.2vw, 1.2rem);
          opacity: 0.92;
        }

        .toward {
          margin: 1.6rem auto 0.4rem;
          text-transform: uppercase;
          letter-spacing: 0.16em;
          font-size: 0.76rem;
          color: rgba(255, 248, 233, 0.88);
        }

        .clock {
          margin: 1.2rem auto 0;
          display: grid;
          grid-template-columns: repeat(4, minmax(75px, 1fr));
          gap: 0.8rem;
          max-width: 520px;
        }

        .unit {
          padding: 0.8rem 0.6rem;
          border-radius: 18px;
          border: 1px solid rgba(255, 248, 233, 0.32);
          background: rgba(17, 33, 31, 0.22);
          backdrop-filter: blur(4px);
          overflow: visible;
        }

        .num {
          display: block;
          font-family: "SFMono-Regular", Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;
          font-size: clamp(2rem, 6vw, 3.4rem);
          line-height: 1.16;
          letter-spacing: -0.02em;
          padding: 0.04em 0 0.02em;
          font-weight: 700;
          font-variant-numeric: tabular-nums;
          background: linear-gradient(180deg, #fff9eb, #f8c86f);
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .label {
          display: block;
          margin-top: 0.45rem;
          font-size: 0.62rem;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: rgba(255, 248, 233, 0.82);
        }

        .celebrate {
          margin: 1.8rem auto 0;
          max-width: 58ch;
          font-size: clamp(1.1rem, 2.3vw, 1.45rem);
          font-style: italic;
          color: #fff3d8;
        }

        .actions {
          margin-top: 1.9rem;
          display: flex;
          flex-wrap: wrap;
          gap: 0.7rem;
          justify-content: center;
        }

        .cta {
          padding: 0.72rem 1.25rem;
          border-radius: 999px;
          font-size: 0.9rem;
          text-decoration: none;
          transition: transform 0.25s ease, background-color 0.25s ease, color 0.25s ease;
        }

        .primary {
          background: var(--accent);
          color: var(--deep);
          font-weight: 700;
          border: 1px solid var(--accent);
        }

        .secondary {
          border: 1px solid rgba(255, 248, 233, 0.48);
          color: var(--cream);
          background: rgba(255, 248, 233, 0.08);
        }

        .cta:hover {
          transform: translateY(-2px);
        }

        .flyer {
          position: absolute;
          z-index: 4;
          font-size: clamp(1.3rem, 2.4vw, 2.1rem);
          opacity: 0.88;
          filter: drop-shadow(0 6px 10px rgba(10, 16, 14, 0.25));
          pointer-events: none;
          transition: filter 0.16s ease, opacity 0.16s ease;
        }

        .flyer.is-alert {
          animation-duration: 14s !important;
          filter: drop-shadow(0 0 14px rgba(255, 236, 173, 0.46)) saturate(1.1);
        }

        .flyer.is-hit {
          animation-duration: 8s !important;
          filter: drop-shadow(0 0 20px rgba(255, 215, 121, 0.72)) brightness(1.12);
        }

        .f1 { animation: path1 28s linear infinite; }
        .f2 { animation: path2 34s linear infinite; }
        .f3 { animation: path3 24s linear infinite; }
        .f4 { animation: path4 38s linear infinite; }
        .f5 { animation: path5 20s linear infinite; }

        .arrived .flyer { opacity: 1; }

        @keyframes path1 {
          0% { transform: translate(-12vw, 74vh) rotate(8deg); }
          30% { transform: translate(24vw, 42vh) rotate(-10deg); }
          65% { transform: translate(68vw, 52vh) rotate(5deg); }
          100% { transform: translate(112vw, 38vh) rotate(8deg); }
        }

        @keyframes path2 {
          0% { transform: translate(108vw, 24vh) rotate(-5deg); }
          35% { transform: translate(66vw, 56vh) rotate(8deg); }
          70% { transform: translate(28vw, 26vh) rotate(-8deg); }
          100% { transform: translate(-14vw, 42vh) rotate(-5deg); }
        }

        @keyframes path3 {
          0% { transform: translate(-10vw, 30vh) rotate(4deg); }
          45% { transform: translate(42vw, 66vh) rotate(-6deg); }
          100% { transform: translate(114vw, 60vh) rotate(4deg); }
        }

        @keyframes path4 {
          0% { transform: translate(110vw, 72vh) rotate(-8deg); }
          35% { transform: translate(58vw, 28vh) rotate(6deg); }
          65% { transform: translate(24vw, 58vh) rotate(-5deg); }
          100% { transform: translate(-12vw, 24vh) rotate(-8deg); }
        }

        @keyframes path5 {
          0% { transform: translate(-8vw, 52vh); }
          50% { transform: translate(50vw, 16vh); }
          100% { transform: translate(112vw, 34vh); }
        }

        @keyframes breathe {
          50% {
            transform: translateX(-50%) scale(1.06);
            opacity: 0.9;
          }
        }

        @keyframes burst {
          0% {
            opacity: 0.95;
            transform: translate(-50%, -50%) scale(0.25);
          }
          100% {
            opacity: 0;
            transform: translate(-50%, -50%) scale(3.2);
          }
        }

        @media (max-width: 560px) {
          .clock {
            grid-template-columns: repeat(2, minmax(90px, 1fr));
            max-width: 300px;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .cursor-layer {
            display: none;
          }

          .flyer,
          .sun {
            animation: none !important;
          }

          .flyer {
            display: none;
          }
        }
      `}</style>
    </main>
  );
}
