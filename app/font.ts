import { Inter, Orbitron, Jost } from 'next/font/google';

// Display font: geometric headings and brand elements.
export const display = Orbitron({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-display',
  display: 'swap',
});

// UI / headings: clean sans-serif, not a decorative serif.
export const header = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-header',
  display: 'swap',
});

// Body: readable rounded sans-serif.
export const body = Jost({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-body',
  display: 'swap',
});
