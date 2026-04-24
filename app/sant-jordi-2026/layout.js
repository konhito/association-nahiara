const title = "Sant Jordi 2026 — Barcelona";

export const metadata = {
  title,
  description:
    "Photo gallery and press materials from the association's Sant Jordi 2026 stand in Barcelona, Passeig de Fabra i Puig. Galería y prensa del Sant Jordi 2026.",
  openGraph: {
    title: `${title} | IADF`,
    description:
      "Photos and updates from Sant Jordi 2026 in Barcelona. Fotos y novedades del Sant Jordi 2026.",
    url: "https://asociacionnahiara.org/sant-jordi-2026",
  },
  alternates: {
    canonical: "/sant-jordi-2026",
  },
};

export default function SantJordi2026Layout({ children }) {
  return children;
}
