const title = "Nahiara y los Guardianes de las Flores 2026";
const description =
  "Galeria y memoria del encuentro Nahiara y los Guardianes de las Flores, celebrado el 19 de mayo de 2026 en Parque El Canario, Gran Canaria.";

export const metadata = {
  title,
  description,
  openGraph: {
    title: `${title} | IADF`,
    description,
    url: "https://asociacionnahiara.org/eventos/guardianes-de-las-flores-2026",
    images: [
      {
        url: "/guardianes-flores-2026/poster.jpeg",
        alt: "Cartel de Nahiara y los Guardianes de las Flores",
      },
    ],
  },
  alternates: {
    canonical: "/eventos/guardianes-de-las-flores-2026",
  },
};

export default function GuardianesDeLasFlores2026Layout({ children }) {
  return children;
}
