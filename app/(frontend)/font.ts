import { Jost, JetBrains_Mono } from 'next/font/google';

const jostSubsets = ['latin', 'cyrillic'] as const;

export const display = Jost({ subsets: [...jostSubsets], weight: ['500', '600', '700'], variable: '--font-display', display: 'swap' });
export const header = Jost({ subsets: [...jostSubsets], weight: ['400', '500', '600', '700'], variable: '--font-header', display: 'swap' });
export const body = Jost({ subsets: [...jostSubsets], weight: ['300', '400', '500', '600', '700'], variable: '--font-body', display: 'swap' });
export const mono = JetBrains_Mono({ subsets: ['latin'], weight: ['400', '500', '700'], variable: '--font-mono', display: 'swap' });
