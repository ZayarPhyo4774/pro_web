import type { Metadata } from 'next';
import { BRAND } from '../lib/constants';
import { playfair, cormorant, inter, notoSansMyanmar } from '../lib/fonts';
import Navbar from '../components/layout/Navbar';
import ScrollProgress from '../components/layout/ScrollProgress';
import Preloader from '../components/layout/Preloader';
import AppProviders from '../components/providers/AppProviders';
import '../styles/globals.css';

export const metadata: Metadata = {
  title: {
    default: `${BRAND.name} | Luxury Timepieces`,
    template: `%s | ${BRAND.name}`,
  },
  description:
    'An original luxury watch maison — cinematic storytelling, precision craftsmanship, and bespoke atelier experiences.',
  keywords: ['luxury watches', 'haute horlogerie', 'bespoke timepieces', 'Echelon Atelier'],
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'),
  openGraph: {
    type: 'website',
    locale: 'en_US',
    siteName: BRAND.name,
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`dark ${playfair.variable} ${cormorant.variable} ${inter.variable} ${notoSansMyanmar.variable}`}
    >
      <body className="luxury-gradient antialiased">
        <AppProviders>
          <Preloader />
          <ScrollProgress />
          <Navbar />
          {children}
        </AppProviders>
      </body>
    </html>
  );
}
