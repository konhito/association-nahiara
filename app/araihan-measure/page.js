import Link from "next/link";

export const metadata = {
  title: "Araihan Measure",
  description: "Araihan Measure page",
};

export default function AraihanMeasurePage() {
  return (
    <main className="mx-auto min-h-screen max-w-4xl px-4 py-16 text-slate-900">
      <h1 className="text-3xl font-bold">Araihan Measure</h1>
      <p className="mt-4 text-slate-700">
        This page was restored after fixing a corrupted file that contained
        binary data.
      </p>
      <div className="mt-8">
        <Link
          href="/"
          className="rounded-lg bg-emerald-600 px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-700"
        >
          Back to home
        </Link>
      </div>
    </main>
  );
}
