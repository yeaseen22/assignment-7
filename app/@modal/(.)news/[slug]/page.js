'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useRef, useCallback, useState } from 'react';
import NewsDetailsContent from '../../../components/NewsDetailsContent';
import { useTranslation } from '../../../../app/context/TranslationContext'; // Import useTranslation

async function getNewsItem(lang, slug) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/news/${slug}?lang=${lang}`, { cache: 'no-store' });
  if (res.status === 404) {
    return null;
  }
  if (!res.ok) {
    throw new Error('Failed to fetch news item');
  }
  return res.json();
}

export default function NewsModal({ params: { lang, slug } }) {
  const router = useRouter();
  const dialogRef = useRef(null);
  const [newsItem, setNewsItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const dict = useTranslation();

  useEffect(() => {
    const fetchContent = async () => {
      setLoading(true);
      const item = await getNewsItem(lang, slug);
      setNewsItem(item);
      setLoading(false);
    };
    fetchContent();
  }, [lang, slug]);

  const onDismiss = useCallback(() => {
    router.back();
  }, [router]);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (dialog) {
      dialog.showModal();
    }
  }, []);

  if (loading) {
    return (
      <dialog ref={dialogRef} className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center p-4">
        <div className="bg-surface p-6 rounded-lg shadow-lg max-w-3xl w-full text-center">
          Loading...
        </div>
      </dialog>
    );
  }

  if (!newsItem) {
    return (
      <dialog ref={dialogRef} className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center p-4">
        <div className="bg-surface p-6 rounded-lg shadow-lg max-w-3xl w-full text-center">
          <h1 className="text-3xl font-semibold text-white">Not Found</h1>
          <p className="mt-4 text-zinc-400">This News with &quot;{slug}&quot; id was not found!</p>
          <button onClick={onDismiss} className="mt-6 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">Close</button>
        </div>
      </dialog>
    );
  }

  return (
    <dialog ref={dialogRef} className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center p-4">
      <div className="bg-[var(--surface-strong)] rounded-2xl shadow-[0_24px_50px_rgba(5,8,16,0.55)] max-w-6xl w-full h-[90vh] overflow-auto relative">
        <button
          onClick={onDismiss}
          className="absolute top-4 right-4 text-zinc-400 hover:text-white transition"
          aria-label="Close modal"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        <NewsDetailsContent newsItem={newsItem} dict={dict} />
      </div>
    </dialog>
  );
}
