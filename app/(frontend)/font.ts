import { Jost, JetBrains_Mono } from 'next/font/google';

// Use the same readable sans-serif family for headings and body copy.
// Heading emphasis remains controlled by existing font-bold/font-extrabold classes.
export const display = Jost({
  subsets: ['latin', 'latin-ext', 'cyrillic', 'cyrillic-ext'],
  weight: ['500', '600', '700'],
  variable: '--font-display',
  display: 'swap',
});

export const header = Jost({
  subsets: ['latin', 'latin-ext', 'cyrillic', 'cyrillic-ext'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-header',
  display: 'swap',
});

export const body = Jost({
  subsets: ['latin', 'latin-ext', 'cyrillic', 'cyrillic-ext'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-body',
  display: 'swap',
});

export const mono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  variable: '--font-mono',
  display: 'swap',
});
