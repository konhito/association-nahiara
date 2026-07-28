import { notFound } from "next/navigation";
import { ATLAS_SOURCES, getAtlasSource } from "../../../lib/pollinatorAtlas";

export function generateStaticParams() { return ATLAS_SOURCES.map(({ id }) => ({ id })); }

export default async function SourcePage({ params }) {
  const { id } = await params;
  const source = getAtlasSource(id);
  if (!source) notFound();
  return <main style={{ background: "#f5f1e8", color: "#13352d", minHeight: "100svh", padding: "clamp(2rem, 8vw, 8rem) clamp(1rem, 10vw, 12rem)" }}>
    <p style={{ color: "#9a6c12", fontWeight: 700, letterSpacing: ".1em", textTransform: "uppercase" }}>Source record · {source.id}</p>
    <h1 style={{ fontFamily: 'Georgia, "Times New Roman", serif', fontSize: "clamp(2.5rem, 6vw, 5rem)", letterSpacing: "-.04em", lineHeight: .95, margin: "1rem 0" }}>{source.title}</h1>
    <p style={{ fontSize: "1.2rem", lineHeight: 1.6, maxWidth: "62ch" }}>{source.organisation}</p>
    <dl style={{ borderTop: "1px solid #a8b6aa", marginTop: "2.5rem", maxWidth: "50rem", paddingTop: "1rem" }}><dt style={{ fontWeight: 700 }}>Method</dt><dd style={{ margin: ".35rem 0 1.25rem" }}>{source.method}</dd><dt style={{ fontWeight: 700 }}>Status</dt><dd style={{ margin: ".35rem 0 1.25rem" }}>{source.status}</dd></dl>
    <a href={source.href} target="_blank" rel="noreferrer" style={{ color: "#13352d", fontWeight: 700, textUnderlineOffset: ".2em" }}>Open the original source <span aria-hidden="true">→</span></a>
  </main>;
}
