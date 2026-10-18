import { Jost, JetBrains_Mono } from 'next/font/google';

// Clear, highly readable typography for a practical local-services website.
export const display = Jost({ subsets: ['latin'], weight: ['500', '600', '700'], variable: '--font-display', display: 'swap' });
export const header = Jost({ subsets: ['latin'], weight: ['500', '600', '700'], variable: '--font-header', display: 'swap' });
export const body = Jost({ subsets: ['latin'], weight: ['300', '400', '500', '600', '700'], variable: '--font-body', display: 'swap' });
export const mono = JetBrains_Mono({ subsets: ['latin'], weight: ['400', '500', '700'], variable: '--font-mono', display: 'swap' });
