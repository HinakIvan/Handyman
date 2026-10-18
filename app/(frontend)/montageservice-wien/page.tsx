import type { Metadata } from 'next';
import { ServiceLandingPage, type ServiceLandingContent } from '@/components/seo/ServiceLandingPage';

const content: ServiceLandingContent = {
  slug: 'montageservice-wien',
  title: 'Montageservice Wien',
  h1: 'Montageservice in Wien für Montagearbeiten rund ums Zuhause',
  description: 'Montageservice in Wien für geeignete Montagearbeiten, Möbelaufbau und kleinere Arbeiten im Wohn- und Geschäftsbereich. Leistungsumfang vorab abstimmen.',
  intro: 'Du suchst einen Montageservice in Wien für konkrete Arbeiten in deiner Wohnung, deinem Haus oder einem kleinen Geschäft? Sende uns die Details und wenn möglich Fotos, damit wir den Auftrag besser einschätzen können.',
  benefits: ['Konkrete Beschreibung des Auftrags statt unklarer Pauschalversprechen.', 'Preis- und Aufwandsklärung vor Beginn der Arbeiten.', 'Möglichkeit, mehrere geeignete kleinere Montagearbeiten in einer Anfrage zu bündeln.'],
  included: ['Möbel- und Einrichtungsgegenstände montieren', 'Regale, Tische und vergleichbare Einrichtungsgegenstände aufbauen', 'Kleinere Montagearbeiten nach vorheriger Abstimmung', 'Zusätzliche Arbeiten und benötigtes Material vorab besprechen'],
  suitableFor: ['Privathaushalte und Mietwohnungen', 'Möbelaufbau nach Lieferung oder Umzug', 'Kleine Büros und Geschäftsräume', 'Mehrere kleinere Montagearbeiten an einem Einsatzort'],
  faqs: [
    { question: 'Welche Arbeiten übernimmt der Montageservice?', answer: 'Der mögliche Umfang hängt von der konkreten Arbeit ab. Möbelaufbau und geeignete Montagearbeiten können angefragt werden; spezialisierte oder reglementierte Gewerke müssen separat geprüft werden.' },
    { question: 'Wie kann ich den Preis einschätzen lassen?', answer: 'Beschreibe die Arbeit, den Ort und den gewünschten Termin. Fotos, Maße und Angaben zum Material helfen bei einer ersten Einschätzung. Der konkrete Preis wird vor Beginn abgestimmt.' },
    { question: 'Arbeitet ihr in ganz Wien?', answer: 'Der Service ist auf Wien ausgerichtet. Nenne bitte den Bezirk oder die Adresse in der Anfrage, damit wir die Verfügbarkeit prüfen können.' },
    { question: 'Kann ich mehrere Arbeiten zusammen anfragen?', answer: 'Ja. Liste die gewünschten Arbeiten möglichst einzeln auf, damit der voraussichtliche Aufwand besser eingeschätzt werden kann.' },
  ],
};

export const metadata: Metadata = {
  title: 'Montageservice Wien | Montagearbeiten anfragen',
  description: 'Montageservice in Wien für Möbelaufbau und geeignete Montagearbeiten. Auftrag beschreiben, Aufwand vorab abstimmen und online anfragen.',
  alternates: { canonical: 'https://handwerker-wien.com/montageservice-wien/' },
  openGraph: { title: 'Montageservice Wien', description: content.description, url: 'https://handwerker-wien.com/montageservice-wien/', locale: 'de_AT', type: 'website' },
};
export default function Page() { return <ServiceLandingPage content={content} />; }
