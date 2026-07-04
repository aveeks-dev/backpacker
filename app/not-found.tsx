import Link from "next/link";

export default function NotFound() {
  return (
    <main className="mx-auto flex w-full max-w-2xl flex-1 flex-col items-center justify-center px-6 py-24 text-center">
      <p className="font-mono text-sm text-slate-400">404</p>
      <h1 className="mt-2 text-2xl font-semibold tracking-tight">
        That page doesn&apos;t exist.
      </h1>
      <p className="mt-2 text-sm text-slate-600">
        The course or page you&apos;re looking for may have moved.
      </p>
      <div className="mt-6 flex gap-3">
        <Link
          href="/courses"
          className="rounded-md bg-slate-900 px-4 py-2 text-sm font-medium text-white hover:bg-slate-800"
        >
          Browse courses
        </Link>
        <Link
          href="/"
          className="rounded-md border border-slate-200 px-4 py-2 text-sm text-slate-700 hover:bg-slate-50"
        >
          Go home
        </Link>
      </div>
    </main>
  );
}
