import Link from 'next/link';
import { getDictionary } from '../../../../lib/getDictionary';
import NewsDetailsContent from '../../../components/NewsDetailsContent';

async function getNewsItem(slug) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/news/${slug}`, { cache: 'no-store' });
  if (res.status === 404) {
    return null;
  }
  if (!res.ok) {
    throw new Error('Failed to fetch news item');
  }
  return res.json();
}

export default async function NewsDetailsPage({ params: { lang, slug } }) {
  const newsItem = await getNewsItem(slug);
  const dict = await getDictionary(lang);

  if (!newsItem) {
    return (
      <div className="relative mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8 text-center text-zinc-400">
        <h1 className="text-3xl font-semibold text-white">Not Found</h1>
        <p className="mt-4">This News with &quot;{slug}&quot; id was not found!</p>
      </div>
    );
  }

  return (
    <div className="relative overflow-hidden min-h-screen text-zinc-100">
      <div className="relative mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
        <header
          className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between"
        >
          <div className="flex items-center gap-4">
            <div
              className="rounded-2xl bg-gradient-to-br from-cyan-300 via-emerald-300 to-sky-400 p-[1px] shadow-[0_0_30px_rgba(94,234,212,0.25)]"
            >
              <div
                className="flex h-12 w-12 items-center justify-center rounded-[15px] bg-[#0b0d12] text-lg font-semibold text-white"
              >
                DN
              </div>
            </div>
            <div>
              <h1 className="text-2xl font-semibold text-white">{dict.devNews}</h1>
              <p className="mt-1 text-sm text-zinc-400">
                {dict.slogan}
              </p>
            </div>
          </div>

          <div className="flex w-full items-center md:max-w-md">
            <div className="relative w-full">
              <span
                className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400"
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  className="h-5 w-5"
                >
                  <circle
                    cx="11"
                    cy="11"
                    r="7"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  />
                  <path
                    d="M20 20L17 17"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                </svg>
              </span>
              <input
                type="search"
                placeholder={dict.searchPlaceholder}
                className="w-full rounded-2xl border border-white/10 bg-white/5 py-3 pl-12 pr-4 text-sm text-white placeholder:text-zinc-500 shadow-[0_10px_30px_rgba(10,10,20,0.35)] outline-none ring-1 ring-transparent transition focus:border-cyan-300/40 focus:ring-cyan-300/20"
              />
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="rounded-full bg-white/10 p-[2px]">
              <img
                src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=facearea&w=96&h=96&q=80"
                alt="User avatar"
                className="h-12 w-12 rounded-full object-cover"
              />
            </div>
            <div>
              <p className="text-sm font-medium text-white">Alex Rivera</p>
              <p className="text-xs text-zinc-400">{dict.proMember}</p>
            </div>
          </div>
        </header>
        <main className="mt-12">
          <div
            className="flex flex-wrap items-center justify-between gap-4"
          >
            <Link
              href={`/${lang}`}
              className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-medium text-white transition hover:border-cyan-300/40 hover:text-cyan-200"
            >
              {dict.backToHome}
            </Link>
          </div>
          <NewsDetailsContent newsItem={newsItem} dict={dict} />
        </main>
      </div>
    </div>
  );
}
