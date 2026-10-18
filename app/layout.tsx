import '../src/index.css';
import { Providers } from './providers';
import { Toaster } from 'sonner';
import { Suspense } from 'react';
import { display, header, body } from './font';

const siteTitle = process.env.NEXT_PUBLIC_SITE_TITLE ?? "Handwerker Wien | Montage, Reparatur & Möbelmontage";
const siteUrl = 'https://handwerker-wien.com';

export const metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: siteTitle, template: '%s | Handwerker Wien' },
  description: 'Handwerker in Wien für Möbelmontage, Aufbau, Demontage und kleinere Reparaturen. Transparente Preise ab 15 €/Std. Anfrage für Wien und Umgebung.',
  keywords: ['Handwerker Wien', 'Handwerkerservice Wien', 'Montageservice Wien', 'Möbelmontage Wien', 'Möbelaufbau Wien', 'Demontage Wien', 'Kleinreparaturen Wien', 'Bodenverlegung Wien'],
  alternates: { canonical: siteUrl + '/', languages: { 'de-AT': siteUrl + '/', ru: siteUrl + '/ru/', en: siteUrl + '/en/', 'x-default': siteUrl + '/' } },
  openGraph: { type: 'website', locale: 'de_AT', url: siteUrl + '/', siteName: 'Wiener Bauhandwerk', title: siteTitle, description: 'Handwerker in Wien für Möbelmontage, Aufbau, Demontage und kleinere Reparaturen. Transparente Preise ab 15 €/Std.' },
  robots: { index: true, follow: true },
  verification: process.env.GOOGLE_SITE_VERIFICATION ? { google: process.env.GOOGLE_SITE_VERIFICATION } : undefined,
  applicationName: 'Wiener Bauhandwerk',
  icons: {
    icon: [
      {
        url: '/favicon.svg',
        type: 'image/svg+xml'
      },
      {
        url: '/favicon-32x32.png',
        sizes: '32x32',
        type: 'image/png'
      },
      {
        url: '/favicon-16x16.png',
        sizes: '16x16',
        type: 'image/png'
      },
      {
        url: '/favicon.ico',
        type: 'image/x-icon'
      }
    ],
    apple: [
      {
        url: '/apple-touch-icon.png',
        sizes: '180x180',
        type: 'image/png'
      }
    ]
  }
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="de-AT" className={`${display.variable} ${header.variable} ${body.variable}`} style={{
      backgroundColor: '#fff',
      color: 'rgba(0, 0, 0, 0.85)'
    }}>
      <head>
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="icon" type="image/x-icon" href="/favicon.ico" />
        <link rel="shortcut icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
      </head>
      <body className={`${body.className} antialiased`}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Organization',
              name: 'Wiener Bauhandwerk',
              url: siteUrl,
              email: 'handwerk.vienna@gmail.com',
              areaServed: [
                { '@type': 'City', name: 'Wien' },
                { '@type': 'AdministrativeArea', name: 'Wien und Umgebung' }
              ]
            }).replace(/</g, '\\u003c')
          }}
        />
        <Providers>
          <Toaster position="top-center" richColors offset="100px" />
          <Suspense fallback={<div>Loading...</div>}>
            {children}
          </Suspense>
        </Providers>
      </body>
    </html>
  );
}
