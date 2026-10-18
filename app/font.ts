import { Jost, JetBrains_Mono } from 'next/font/google';

// Use the same readable sans-serif family for all user-facing text and headings.
// The Cyrillic subset keeps Russian glyphs visually consistent with Latin text.
const jostSubsets = ['latin', 'cyrillic'] as const;

export const display = Jost({
  subsets: [...jostSubsets],
  weight: ['500', '600', '700', '800'],
  variable: '--font-display',
  display: 'swap',
});

export const header = Jost({
  subsets: [...jostSubsets],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-header',
  display: 'swap',
});

export const body = Jost({
  subsets: [...jostSubsets],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-body',
  display: 'swap',
});
