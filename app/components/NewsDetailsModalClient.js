'use client';

import NewsNotFound from '@/app/components/news-not-found';
import Image from 'next/image';

import { useTranslations } from '@/app/components/TranslationProvider';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import LanguageSwitcher from './LanguageSwitcher';

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

export default function NewsDetailsModalClient({ params }) {
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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75">
      <div className="relative rounded-2xl bg-gradient-to-br from-white/15 via-white/5 to-transparent p-[1px] w-full max-w-2xl mx-auto my-8">
        <div className="rounded-2xl border border-white/10 bg-[var(--surface)] p-6 shadow-[0_24px_50px_rgba(5,8,16,0.55)]">
          <div className="flex justify-between items-center mb-4">
            <LanguageSwitcher locale={params.locale} />
            <Link href={`/${params.locale}/`} className="text-white hover:text-cyan-300">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </Link>
          </div>
          <h3 className="text-3xl font-semibold text-white mt-4">
            {newsItem.title}
          </h3>
          <p className="mt-3 text-base text-zinc-300">
            {newsItem.description}
          </p>
          <div className="mt-5 flex flex-wrap items-center gap-4 text-xs text-zinc-400">
            <div className="flex items-center gap-2">
              <Image
                src={`/` + newsItem.author_avatar}
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

          <aside className="mt-6 space-y-6">
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
      </div>
    </div>
  );
}
