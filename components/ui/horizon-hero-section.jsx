"use client";

import React, { useEffect, useState } from "react";
import { ArrowDownRight } from "lucide-react";

export const Component = ({
  institution,
  domain,
  briefingLabel,
  title,
  versionLabel,
  summary,
  narrative,
  pillars,
  checkpoints,
  stats,
}) => {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const max = Math.max(
        document.documentElement.scrollHeight - window.innerHeight,
        1
      );
      setScrollProgress(Math.min(window.scrollY / max, 1));
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const progressLabel = `${Math.round(scrollProgress * 100)}%`;

  return (
    <section className="horizon-archive-hero" aria-label="Archive introduction">
      <div className="hero-atmosphere" aria-hidden />

      <div className="hero-layout">
        <div className="hero-main">
          <p className="institution">{institution}</p>
          <p className="domain">{domain}</p>
          <p className="briefing">{briefingLabel}</p>
          <h1>{title}</h1>
          <p className="summary">{summary}</p>
          <p className="narrative">{narrative}</p>

          <div className="pillars" role="list" aria-label="Archive foundations">
            {pillars.map((item) => (
              <p key={item} role="listitem">
                {item}
              </p>
            ))}
          </div>

          <a href="#archive-index" className="hero-link">
            Enter the 195-country ledger
            <ArrowDownRight size={15} strokeWidth={2.2} />
          </a>
        </div>

        <aside className="hero-panel">
          <p className="panel-kicker">{versionLabel}</p>
          <ul className="checklist">
            {checkpoints.map((line) => (
              <li key={line}>{line}</li>
            ))}
          </ul>

          <dl className="stats">
            {stats.map((item) => (
              <div key={item.label}>
                <dt>{item.value}</dt>
                <dd>{item.label}</dd>
              </div>
            ))}
          </dl>

          <div className="scroll-meter" aria-hidden>
            <p>Document scroll</p>
            <div className="track">
              <span style={{ width: progressLabel }} />
            </div>
            <p>{progressLabel}</p>
          </div>
        </aside>
      </div>

      <style jsx>{`
        .horizon-archive-hero {
          --paper: oklch(0.982 0.01 102);
          --paper-soft: oklch(0.965 0.014 112);
          --ink: oklch(0.23 0.026 148);
          --ink-soft: oklch(0.42 0.024 145);
          --line: oklch(0.82 0.018 120);
          --brand: oklch(0.46 0.11 152);
          --brand-soft: oklch(0.69 0.08 104);
          --display-face:
            "Alegreya",
            "Iowan Old Style",
            "Palatino Linotype",
            "Book Antiqua",
            Palatino,
            Georgia,
            serif;
          --text-face:
            "Source Sans 3",
            "Segoe UI",
            "Helvetica Neue",
            Arial,
            sans-serif;
          --label-face:
            "Avenir Next",
            "Segoe UI",
            "Helvetica Neue",
            Arial,
            sans-serif;
          --ease-out-quart: cubic-bezier(0.25, 1, 0.5, 1);
          --ease-out-quint: cubic-bezier(0.22, 1, 0.36, 1);
          width: min(1140px, 95vw);
          margin: clamp(1.2rem, 3vw, 2.4rem) auto 0;
          border: 1px solid var(--line);
          border-radius: 1.2rem;
          background:
            radial-gradient(90% 120% at 8% 0%, oklch(0.93 0.05 94 / 0.45), transparent 60%),
            radial-gradient(80% 110% at 92% 10%, oklch(0.94 0.05 145 / 0.38), transparent 65%),
            linear-gradient(165deg, var(--paper), var(--paper-soft));
          position: relative;
          overflow: clip;
        }

        .hero-atmosphere {
          position: absolute;
          inset: 0;
          background-image:
            linear-gradient(to right, oklch(0.38 0.035 145 / 0.11) 1px, transparent 1px),
            linear-gradient(to bottom, oklch(0.38 0.03 145 / 0.08) 1px, transparent 1px);
          background-size: 42px 42px;
          mask-image: radial-gradient(circle at 25% 22%, #000 20%, transparent 72%);
          opacity: 0.32;
          pointer-events: none;
        }

        .hero-layout {
          position: relative;
          z-index: 1;
          display: grid;
          grid-template-columns: 1.35fr minmax(290px, 0.85fr);
          gap: clamp(1rem, 2.5vw, 2rem);
          padding: clamp(1rem, 2.5vw, 2rem);
        }

        .hero-main {
          animation: rise 760ms var(--ease-out-quint) both;
        }

        .institution,
        .domain,
        .briefing {
          margin: 0;
          line-height: 1.2;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          font-family: var(--label-face);
        }

        .institution {
          font-size: 0.6rem;
          font-weight: 640;
          color: var(--ink);
        }

        .domain {
          margin-top: 0.26rem;
          font-size: 0.58rem;
          color: var(--ink-soft);
        }

        .briefing {
          margin-top: 0.75rem;
          font-size: 0.66rem;
          font-weight: 720;
          color: var(--brand);
        }

        h1 {
          margin: 0.9rem 0 0;
          font-size: clamp(2rem, 4.2vw, 4rem);
          line-height: 1.03;
          letter-spacing: 0.005em;
          text-wrap: balance;
          color: var(--ink);
          max-width: 17ch;
          font-family: var(--display-face);
          font-weight: 620;
        }

        .summary,
        .narrative {
          margin: 1rem 0 0;
          max-width: 70ch;
          line-height: 1.64;
          color: var(--ink-soft);
          font-size: clamp(0.98rem, 1.15vw, 1.1rem);
          font-family: var(--text-face);
          font-weight: 450;
          letter-spacing: 0.004em;
          text-wrap: pretty;
        }

        .summary {
          color: oklch(0.35 0.03 148);
          font-weight: 520;
        }

        .pillars {
          margin-top: 1rem;
          display: grid;
          gap: 0.42rem;
        }

        .pillars p {
          margin: 0;
          font-size: 0.88rem;
          line-height: 1.5;
          font-family: var(--text-face);
          font-weight: 500;
          color: oklch(0.35 0.03 150);
          padding: 0.4rem 0.62rem;
          border: 1px solid oklch(0.8 0.02 120 / 0.8);
          border-radius: 0.58rem;
          background: oklch(0.985 0.01 108 / 0.8);
        }

        .hero-link {
          margin-top: 1.3rem;
          display: inline-flex;
          align-items: center;
          gap: 0.34rem;
          text-decoration: none;
          color: var(--ink);
          border: 1px solid var(--ink);
          border-radius: 999px;
          padding: 0.6rem 0.95rem;
          font-size: 0.82rem;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          font-family: var(--label-face);
          font-weight: 620;
          transition:
            background-color 220ms var(--ease-out-quart),
            color 220ms var(--ease-out-quart),
            transform 220ms var(--ease-out-quart);
        }

        .hero-link:hover {
          background: var(--ink);
          color: oklch(0.98 0.008 102);
          transform: translateY(-1px);
        }

        .hero-panel {
          border: 1px solid oklch(0.79 0.02 120 / 0.86);
          border-radius: 0.9rem;
          background: oklch(0.98 0.012 112 / 0.92);
          padding: 0.86rem;
          animation: rise 860ms var(--ease-out-quint) 70ms both;
        }

        .panel-kicker {
          margin: 0;
          font-size: 0.72rem;
          color: var(--brand);
          letter-spacing: 0.1em;
          text-transform: uppercase;
          font-weight: 700;
          font-family: var(--label-face);
        }

        .checklist {
          margin: 0.72rem 0 0;
          padding: 0;
          list-style: none;
          display: grid;
          gap: 0.42rem;
        }

        .checklist li {
          font-size: 0.82rem;
          line-height: 1.56;
          color: var(--ink-soft);
          border-top: 1px dashed oklch(0.81 0.02 121 / 0.82);
          padding-top: 0.42rem;
          font-family: var(--text-face);
        }

        .stats {
          margin: 0.9rem 0 0;
          display: grid;
          gap: 0.4rem;
        }

        .stats div {
          display: flex;
          justify-content: space-between;
          align-items: baseline;
          border-top: 1px solid oklch(0.81 0.02 120 / 0.72);
          padding-top: 0.42rem;
        }

        .stats dt {
          font-size: 1rem;
          font-weight: 700;
          color: var(--ink);
          font-family: var(--display-face);
        }

        .stats dd {
          margin: 0;
          font-size: 0.74rem;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: var(--ink-soft);
          font-family: var(--label-face);
        }

        .scroll-meter {
          margin-top: 0.86rem;
          display: grid;
          gap: 0.34rem;
        }

        .scroll-meter p {
          margin: 0;
          font-size: 0.66rem;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: var(--ink-soft);
          font-family: var(--label-face);
        }

        .track {
          height: 0.35rem;
          border-radius: 999px;
          background: oklch(0.88 0.02 120);
          overflow: hidden;
        }

        .track span {
          display: block;
          height: 100%;
          border-radius: inherit;
          background: linear-gradient(
            90deg,
            oklch(0.43 0.11 152),
            oklch(0.63 0.1 95)
          );
          transition: width 180ms linear;
        }

        @keyframes rise {
          from {
            opacity: 0;
            transform: translateY(14px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @media (max-width: 980px) {
          .hero-layout {
            grid-template-columns: 1fr;
          }
        }

        @media (max-width: 640px) {
          .hero-layout {
            padding: 0.9rem;
          }

          .pillars p {
            font-size: 0.84rem;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .hero-main,
          .hero-panel {
            animation: none !important;
          }

          .hero-link,
          .track span {
            transition: none !important;
          }
        }
      `}</style>
    </section>
  );
};
