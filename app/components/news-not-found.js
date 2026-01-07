'use client';

import Link from 'next/link';
import { useTranslations } from './TranslationProvider';

export default function NewsNotFound({ slug, locale }) {
  const t = useTranslations('not_found');
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-[var(--bg)] text-white">
      <h2 className="text-4xl font-bold">{t('news_not_found')}</h2>
      <p className="mt-4 text-lg text-zinc-400">{t('news_id_not_found', { slug })}</p>
      <Link
        href={`/${locale}`}
        className="mt-8 rounded-full border border-white/10 bg-white/5 px-6 py-3 text-sm font-medium text-white transition hover:border-cyan-300/40 hover:text-cyan-200"
      >
        {t('return_home')}
      </Link>
    </div>
  );
}
