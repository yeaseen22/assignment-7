import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-[var(--bg)] text-white">
      <h2 className="text-4xl font-bold">404 - Page Not Found</h2>
      <p className="mt-4 text-lg text-zinc-400">Could not find the requested resource</p>
      <Link
        href="/"
        className="mt-8 rounded-full border border-white/10 bg-white/5 px-6 py-3 text-sm font-medium text-white transition hover:border-cyan-300/40 hover:text-cyan-200"
      >
        Return Home
      </Link>
    </div>
  );
}
