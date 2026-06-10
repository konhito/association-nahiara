import Link from "next/link";

export const metadata = {
  title: "Dia de Todos los Polinizadores",
  description:
    "Declaracion institucional de la Asociacion Nahiara para el Dia de Todos los Polinizadores (21 de junio).",
  alternates: {
    canonical: "https://asociacionnahiara.org/dia-de-todos-los-polinizadores",
  },
};

const MANIFESTO_TEXT = [
  "[Inserta aqui, sin alterar una sola palabra, el texto integro del manifiesto oficial del Dia de Todos los Polinizadores recibido en el Google Doc.]",
  "[Este marcador mantiene la estructura de publicacion hasta integrar el documento fundacional definitivo.]",
];

export default function DiaDeTodosLosPolinizadoresPage() {
  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      <div className="mx-auto max-w-5xl px-6 py-10 md:py-14">
        <div className="mb-10 flex flex-wrap items-center justify-between gap-4 border-b border-slate-200 pb-6">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-700">
              Asociacion Nahiara
            </p>
            <h1 className="mt-3 text-3xl font-semibold leading-tight md:text-5xl">
              Dia de Todos los Polinizadores
            </h1>
            <p className="mt-3 text-base text-slate-600 md:text-lg">
              Declaracion institucional oficial · 21 de junio
            </p>
          </div>

          <div className="flex gap-3">
            <Link
              href="/reloj-dia-de-todos-los-polinizadores"
              className="rounded-full border border-emerald-700 px-4 py-2 text-sm font-semibold text-emerald-700 transition hover:bg-emerald-700 hover:text-white"
            >
              Ver reloj anual
            </Link>
            <Link
              href="/"
              className="rounded-full border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-100"
            >
              Inicio
            </Link>
          </div>
        </div>

        <article className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm md:p-10">
          <header className="border-b border-slate-100 pb-6">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">
              Proclamacion permanente
            </p>
            <p className="mt-3 text-sm text-slate-600">
              URL oficial: https://asociacionnahiara.org/dia-de-todos-los-polinizadores
            </p>
          </header>

          <div className="mt-8 space-y-6 text-[1.05rem] leading-8 text-slate-800">
            {MANIFESTO_TEXT.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>

          <footer className="mt-10 border-t border-slate-100 pt-6 text-sm text-slate-600">
            Publicacion institucional preparada para integrar el texto fundacional final sin recortes ni adaptaciones.
          </footer>
        </article>
      </div>
    </main>
  );
}
