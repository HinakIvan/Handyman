import type { Metadata } from 'next';
import { ServiceLandingPage, type ServiceLandingContent } from '@/components/seo/ServiceLandingPage';

const content: ServiceLandingContent = {
  slug: 'moebelmontage-wien',
  title: 'Möbelmontage Wien',
  h1: 'Möbelmontage in Wien – Möbel fachgerecht aufbauen lassen',
  description: 'Möbelmontage und Möbelaufbau in Wien: Unterstützung beim Aufbau von Schränken, Betten, Regalen, Tischen und weiteren Möbelstücken. Aufwand und Preis vorab abstimmen.',
  intro: 'Du brauchst Hilfe beim Aufbau neuer Möbel oder beim Zusammenbau nach einem Umzug? Beschreibe die Möbelstücke und den Einsatzort in Wien. Wir stimmen den möglichen Umfang und den Aufwand vorab mit dir ab.',
  benefits: ['Vorab klären, welche Möbel montiert werden sollen und ob Aufbauanleitungen vorhanden sind.', 'Transparente Abstimmung des voraussichtlichen Zeitaufwands vor Beginn.', 'Anfrage für Wohnungen, Häuser und geeignete gewerbliche Räume möglich.'],
  included: ['Aufbau von Schränken, Kommoden und Regalen', 'Montage von Betten, Tischen und ähnlichen Möbelstücken', 'Zusammenbau von zerlegten Möbeln nach vorhandener Anleitung', 'Abstimmung zu Wandbefestigungen und zusätzlichen Arbeiten vor dem Termin'],
  suitableFor: ['Neue Möbel nach einer Lieferung', 'Möbelaufbau nach einem Umzug', 'Einzelne Möbelstücke oder mehrere Teile in einer Wohnung', 'Kleine Büros oder geeignete Geschäftsräume'],
  faqs: [
    { question: 'Was kostet die Möbelmontage in Wien?', answer: 'Die allgemeine Preisorientierung beginnt bei 15 €/Stunde. Der konkrete Preis hängt von Möbeltyp, Anzahl der Teile, Zugänglichkeit und erforderlichen Zusatzarbeiten ab. Den Umfang stimmen wir vor Beginn ab.' },
    { question: 'Muss ich die Montageanleitung bereithalten?', answer: 'Wenn eine Montageanleitung vorhanden ist, halte sie bitte bereit. Teile uns bei der Anfrage auch Marke oder Modell mit, sofern bekannt.' },
    { question: 'Montiert ihr auch Möbel an der Wand?', answer: 'Bitte gib bei der Anfrage an, welche Wandbefestigung benötigt wird und aus welchem Material die Wand besteht. Die Machbarkeit wird anhand der konkreten Situation geklärt.' },
    { question: 'In welchen Gebieten ist die Möbelmontage möglich?', answer: 'Der Schwerpunkt liegt auf Wien. Gib die genaue Einsatzadresse oder den Bezirk in der Anfrage an, damit die Verfügbarkeit geprüft werden kann.' },
  ],
};

export const metadata: Metadata = {
  title: 'Möbelmontage Wien | Möbelaufbau ab 15 €/Std.',
  description: 'Möbelmontage in Wien: Schränke, Betten, Regale und Tische aufbauen lassen. Aufwand und Preis vorab abstimmen. Unverbindliche Anfrage online.',
  alternates: { canonical: 'https://handwerker-wien.com/moebelmontage-wien/' },
  openGraph: { title: 'Möbelmontage Wien | Möbelaufbau', description: content.description, url: 'https://handwerker-wien.com/moebelmontage-wien/', locale: 'de_AT', type: 'website' },
};
export default function Page() { return <ServiceLandingPage content={content} />; }
