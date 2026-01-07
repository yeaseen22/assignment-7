import '../globals.css';
import { Inter } from 'next/font/google';
import { TranslationProvider } from '../components/TranslationProvider';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Dev News',
  description: 'Signals from the builders shaping tomorrow.',
};

export default async function RootLayout({
  children,
  news,
  params: { locale },
}) {
  let messages;
  try {
    messages = (await import(`../../languages/${locale}.json`)).default;
  } catch (error) {
    // Fallback to default locale or handle error
    messages = (await import(`../../languages/en.json`)).default;
  }

  return (
    <html lang={locale}>
      <body className={inter.className}>
        <TranslationProvider messages={messages}>
          {children}
          {news}
        </TranslationProvider>
      </body>
    </html>
  );
}
