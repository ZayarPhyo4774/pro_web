import { Cormorant_Garamond, Inter, Noto_Sans_Myanmar, Playfair_Display } from 'next/font/google';

export const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
});

export const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-cormorant',
  display: 'swap',
});

export const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

export const notoSansMyanmar = Noto_Sans_Myanmar({
  subsets: ['myanmar'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-myanmar',
  display: 'swap',
});
