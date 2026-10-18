import { Jost, JetBrains_Mono } from 'next/font/google';

// Use the same readable sans-serif family for all user-facing text and headings.
// The Cyrillic subset keeps Russian glyphs visually consistent with Latin text.
export const display = Jost({
  subsets: ['latin', 'cyrillic'],
  weight: ['500', '600', '700', '800'],
  variable: '--font-display',
  display: 'swap',
});

export const header = Jost({
  subsets: ['latin', 'cyrillic'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-header',
  display: 'swap',
});

export const body = Jost({
  subsets: ['latin', 'cyrillic'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-body',
  display: 'swap',
});
