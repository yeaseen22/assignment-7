'use client';

import NewsNotFound from '@/app/components/news-not-found';
import { useTranslations } from '@/app/components/TranslationProvider';
import LanguageSwitcher from './LanguageSwitcher';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';

const formatCount = (count) => {
  const num = parseInt(count);
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + 'M';
  } else if (num >= 1000) {
    return (num / 1000).toFixed(1) + 'K';
  }
  return count;
};

const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
};

export default function NewsDetailsClient({ params }) {
  const [newsItem, setNewsItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const t = useTranslations('news_details');
  const th = useTranslations('header');
  const thome = useTranslations('home_page');

  useEffect(() => {
    async function fetchNews() {
      try {
        const response = await fetch(`/api/news/${params.slug}`);
        if (!response.ok) {
          throw new Error('News not found');
        }
        const data = await response.json();
        setNewsItem(data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    }
    fetchNews();
  }, [params.slug]);

  if (loading) {
    return <p>Loading news details...</p>;
  }

  if (error || !newsItem) {
    return <NewsNotFound slug={params.slug} locale={params.locale} />;
  }

  return (
    <div className="relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0">
        {/* Background glow and noise as per details.html */}
        <div
          className="absolute -left-32 top-10 h-80 w-80 rounded-full"
          style={{
            background: 'radial-gradient(circle, var(--glow-strong), transparent 70%)',
          }}
        ></div>
        <div
          className="absolute right-0 top-52 h-72 w-72 rounded-full"
          style={{
            background: 'radial-gradient(circle, var(--glow), transparent 70%)',
          }}
        ></div>
        <div className="noise absolute inset-0"></div>
      </div>

      <div className="relative mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
        <header className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-4">
            <div className="rounded-2xl bg-gradient-to-br from-cyan-300 via-emerald-300 to-sky-400 p-[1px] shadow-[0_0_30px_rgba(94,234,212,0.25)]">
              <div className="flex h-12 w-12 items-center justify-center rounded-[15px] bg-[#0b0d12] text-lg font-semibold text-white">
                DN
              </div>
            </div>
            <div>
              <h1 className="text-2xl font-semibold text-white">{th('title')}</h1>
              <p className="mt-1 text-sm text-zinc-400">{th('subtitle')}</p>
            </div>
          </div>

          <div className="flex w-full items-center md:max-w-md">
            <div className="relative w-full">
              <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400">
                <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5">
                  <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="1.5" />
                  <path d="M20 20L17 17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              </span>
              <input
                type="search"
                placeholder={th('search_placeholder')}
                className="w-full rounded-2xl border border-white/10 bg-white/5 py-3 pl-12 pr-4 text-sm text-white placeholder:text-zinc-500 shadow-[0_10px_30px_rgba(10,10,20,0.35)] outline-none ring-1 ring-transparent transition focus:border-cyan-300/40 focus:ring-cyan-300/20"
              />
            </div>
          </div>

          <div className="flex items-center gap-6">
            <LanguageSwitcher locale={params.locale} />
            <div className="rounded-full bg-white/10 p-[2px]">
              <Image
                src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=facearea&w=96&h=96&q=80"
                alt="User avatar"
                className="h-12 w-12 rounded-full object-cover"
                width={48}
                height={48}
              />
            </div>
            <div>
              <p className="text-sm font-medium text-white">{th('user_name')}</p>
              <p className="text-xs text-zinc-400">{th('user_status')}</p>
            </div>
          </div>
        </header>

        <main className="mt-12">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <Link href={`/${params.locale}/`} className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-medium text-white transition hover:border-cyan-300/40 hover:text-cyan-200">
              {thome('back_to_home')}
            </Link>
          </div>

          <div className="mt-8 grid gap-8 lg:grid-cols-[minmax(0,1fr)_340px]">
            <article className="rounded-2xl bg-gradient-to-br from-white/15 via-white/5 to-transparent p-[1px] reveal">
              <div className="rounded-2xl border border-white/10 bg-[var(--surface)] p-6 shadow-[0_24px_50px_rgba(5,8,16,0.55)]">
                <h3 className="text-3xl font-semibold text-white">
                  {newsItem.title}
                </h3>
                <p className="mt-3 text-base text-zinc-300">
                  {newsItem.description}
                </p>
                <div className="mt-5 flex flex-wrap items-center gap-4 text-xs text-zinc-400">
                  <div className="flex items-center gap-2">
                    <Image
                      src={`/${newsItem.author_avatar}`}
                      alt={`Author ${newsItem.author_name}`}
                      className="h-8 w-8 rounded-full object-cover"
                      width={32}
                      height={32}
                    />
                    <span className="text-sm font-medium text-white">
                      {newsItem.author_name}
                    </span>
                  </div>
                  <span className="text-xs text-zinc-500">•</span>
                  <span>{t('published_on')} {formatDate(newsItem.published_date)}</span>
                </div>
                <div className="mt-6 overflow-hidden rounded-2xl border border-white/10">
                  <Image
                    src={`/` + newsItem.thumbnail}
                    alt={newsItem.title}
                    className="h-full w-full object-cover"
                    width={1200}
                    height={675}
                  />
                </div>
                <div className="mt-6 space-y-4 text-sm leading-7 text-zinc-300">
                  <p>{newsItem.description}</p>
                </div>
              </div>
            </article>

            <aside className="space-y-6">
              <div
                className="rounded-2xl bg-gradient-to-br from-white/15 via-white/5 to-transparent p-[1px] reveal"
                style={{ animationDelay: '120ms' }}
              >
                <div className="rounded-2xl border border-white/10 bg-[var(--surface)] p-5 shadow-[0_24px_50px_rgba(5,8,16,0.55)]">
                  <h4 className="text-sm font-semibold text-white">{t('engagement')}</h4>
                  <div className="mt-4 space-y-3 text-sm text-zinc-300">
                    <div className="flex items-center justify-between">
                      <span className="flex items-center gap-2">
                        <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4 text-emerald-300">
                          <path d="M12 4L5 11H9V20H15V11H19L12 4Z" fill="currentColor" />
                        </svg>
                        {t('upvotes')}
                      </span>
                      <span className="text-white">{formatCount(newsItem.upvotes)}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="flex items-center gap-2">
                        <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4 text-rose-300">
                          <path d="M12 20L19 13H15V4H9V13H5L12 20Z" fill="currentColor" />
                        </svg>
                        {t('downvotes')}
                      </span>
                      <span className="text-white">{formatCount(newsItem.downvotes)}</span>
                    </div>
                  </div>
                  <div className="mt-4 flex items-center justify-between border-t border-white/10 pt-4 text-xs text-zinc-400">
                    <span className="flex items-center gap-2">
                      <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4 text-zinc-500">
                        <path
                          d="M2 12C4.5 7 7.5 5 12 5C16.5 5 19.5 7 22 12C19.5 17 16.5 19 12 19C7.5 19 4.5 17 2 12Z"
                          stroke="currentColor"
                          strokeWidth="1.4"
                        />
                        <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.4" />
                      </svg>
                      {t('views')}
                    </span>
                    <span className="text-white">{formatCount(newsItem.views)}</span>
                  </div>
                </div>
              </div>

              <div
                className="rounded-2xl bg-gradient-to-br from-white/15 via-white/5 to-transparent p-[1px] reveal"
                style={{ animationDelay: '200ms' }}
              >
                <div className="rounded-2xl border border-white/10 bg-[var(--surface)] p-5 shadow-[0_24px_50px_rgba(5,8,16,0.55)]">
                  <h4 className="text-sm font-semibold text-white">{t('tags')}</h4>
                  <div className="mt-4 flex flex-wrap gap-2 text-[11px] text-cyan-200/80">
                    {newsItem.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full border border-cyan-300/20 bg-cyan-300/10 px-3 py-1"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div
                className="rounded-2xl bg-gradient-to-br from-white/15 via-white/5 to-transparent p-[1px] reveal"
                style={{ animationDelay: '280ms' }}
              >
                <div className="rounded-2xl border border-white/10 bg-[var(--surface)] p-5 shadow-[0_24px_50px_rgba(5,8,16,0.55)]">
                  <h4 className="text-sm font-semibold text-white">{t('author')}</h4>
                  <div className="mt-4 flex items-center gap-3">
                    <div className="rounded-full bg-white/10 p-[2px]">
                      <Image
                        src={`/` + newsItem.author_avatar}
                        alt={`Author ${newsItem.author_name}`}
                        className="h-12 w-12 rounded-full object-cover"
                        width={48}
                        height={48}
                      />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-white">
                        {newsItem.author_name}
                      </p>
                      <p className="text-xs text-zinc-400">{t('research_lead')}</p>
                    </div>
                  </div>
                  <p className="mt-4 text-xs text-zinc-400">
                    {t('published_on')} <time dateTime={newsItem.published_date}>
                      {formatDate(newsItem.published_date)}
                    </time>
                  </p>
                </div>
              </div>
            </aside>
          </div>
        </main>
      </div>
    </div>
  );
}
