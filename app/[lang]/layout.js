import '../globals.css';
import { getDictionary } from '../../lib/getDictionary';
import { TranslationProvider } from '../../app/context/TranslationContext'; // Adjusted path

export const metadata = {
  title: "Dev News",
  description: "Signals from the builders shaping tomorrow.",
};

export default async function RootLayout({ children, modal, params: { lang } }) {
  const dictionary = await getDictionary(lang);

  return (
    <html lang={lang}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600&family=Sora:wght@500;600;700&display=swap"
          rel="stylesheet"
        />

      </head>
      <body className="min-h-screen text-zinc-100">
        <TranslationProvider dictionary={dictionary}>
          {children}
          {modal}
        </TranslationProvider>
      </body>
    </html>
  );
}
