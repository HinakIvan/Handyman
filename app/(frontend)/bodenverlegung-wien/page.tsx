import type { Metadata } from 'next';
import { ServiceLandingPage, type ServiceLandingContent } from '@/components/seo/ServiceLandingPage';

const content: ServiceLandingContent = {
  slug: 'bodenverlegung-wien',
  title: 'Bodenverlegung Wien',
  h1: 'Bodenverlegung in Wien – Bodenarbeiten anfragen',
  description: 'Bodenverlegung und geeignete Bodenarbeiten in Wien anfragen. Bodenart, Fläche und Zustand des Untergrunds angeben, damit der Leistungsumfang geprüft werden kann.',
  intro: 'Du planst neue Bodenbeläge oder kleinere Bodenarbeiten? Nenne die ungefähre Fläche, die gewünschte Bodenart und den aktuellen Zustand des Untergrunds. So lässt sich besser einschätzen, welche Arbeiten erforderlich sein könnten.',
  benefits: ['Fläche, Bodenart und Untergrund vorab beschreiben.', 'Vor Beginn klären, ob Vorarbeiten, Material oder Entsorgung zusätzlich nötig sind.', 'Keine pauschale Zusage ohne Kenntnis des tatsächlichen Untergrunds.'],
  included: ['Erste Abstimmung zu geeigneten Bodenbelägen', 'Anfrage für Montage von Bodenbelägen, soweit angeboten und geeignet', 'Klärung möglicher Vorarbeiten am Untergrund', 'Abstimmung zu Sockelleisten und ergänzenden Arbeiten'],
  suitableFor: ['Renovierung einzelner Räume', 'Erneuerung vorhandener Bodenbeläge', 'Kleinere Projekte in Wohnungen und Häusern', 'Projekte, bei denen Fläche und Material bekannt sind'],
  faqs: [
    { question: 'Welche Informationen braucht ihr für ein Angebot?', answer: 'Hilfreich sind die ungefähre Fläche, die gewünschte Bodenart, Fotos des vorhandenen Bodens und Angaben zum Zustand des Untergrunds.' },
    { question: 'Ist die Vorbereitung des Untergrunds enthalten?', answer: 'Nicht automatisch. Je nach Zustand können zusätzliche Vorarbeiten erforderlich sein; diese werden vorab geprüft und abgestimmt.' },
    { question: 'Kann ich das Material selbst kaufen?', answer: 'Bitte gib bei der Anfrage an, ob das Material bereits vorhanden ist oder noch benötigt wird. Die Zuständigkeit wird vor Beginn geklärt.' },
    { question: 'Ist jede Bodenarbeit möglich?', answer: 'Nein, die Machbarkeit hängt von Bodenart, Untergrund und Projektumfang ab. Die konkrete Arbeit wird vor einer Zusage geprüft.' },
  ],
};

export const metadata: Metadata = {
  title: 'Bodenverlegung Wien | Bodenarbeiten anfragen',
  description: 'Bodenverlegung in Wien anfragen. Teile Bodenart, Fläche und Untergrund mit, damit Aufwand und notwendige Vorarbeiten eingeschätzt werden können.',
  alternates: { canonical: 'https://handwerker-wien.com/bodenverlegung-wien/' },
  openGraph: { title: 'Bodenverlegung Wien', description: content.description, url: 'https://handwerker-wien.com/bodenverlegung-wien/', locale: 'de_AT', type: 'website' },
};
export default function Page() { return <ServiceLandingPage content={content} />; }
