import HomePageClient from '../components/HomePageClient';

export default function Home({ params: { locale } }) {
  return <HomePageClient locale={locale} />;
}