import type { Metadata } from 'next';
import { ServiceLandingPage, type ServiceLandingContent } from '@/components/seo/ServiceLandingPage';

const content: ServiceLandingContent = {
  slug: 'reparaturen-wien',
  title: 'Kleinreparaturen Wien',
  h1: 'Kleinreparaturen in Wien – Arbeiten im Haushalt anfragen',
  description: 'Kleinreparaturen und praktische Arbeiten im Haushalt in Wien anfragen. Beschreibe den Defekt und die gewünschte Arbeit, damit der Umfang geprüft werden kann.',
  intro: 'Du hast kleinere Arbeiten in der Wohnung oder im Haus, für die du Unterstützung suchst? Beschreibe das Problem so genau wie möglich. Wir prüfen, ob die Arbeit zum angebotenen Leistungsumfang passt und wie sie ausgeführt werden kann.',
  benefits: ['Klare Beschreibung des Problems hilft, den Auftrag richtig einzuordnen.', 'Fotos und Maße können die erste Einschätzung erleichtern.', 'Arbeiten außerhalb des zulässigen oder angebotenen Umfangs werden nicht pauschal zugesagt.'],
  included: ['Kleinere praktische Arbeiten nach vorheriger Abstimmung', 'Einfache Montage- und Nachstellarbeiten, soweit geeignet', 'Prüfung, ob benötigtes Material bereitgestellt werden muss', 'Abstimmung des Aufwands vor Arbeitsbeginn'],
  suitableFor: ['Kleine Aufgaben in Wohnungen und Häusern', 'Arbeiten nach einem Umzug oder Möbelaufbau', 'Mehrere kleine Aufgaben, die gemeinsam angefragt werden', 'Aufträge, deren Umfang vorab beschrieben werden kann'],
  faqs: [
    { question: 'Welche Reparaturen kann ich anfragen?', answer: 'Beschreibe bitte den konkreten Defekt. Ob die Arbeit übernommen werden kann, hängt von der Tätigkeit und den dafür geltenden gewerberechtlichen Anforderungen ab.' },
    { question: 'Übernehmt ihr Elektro- oder Sanitärarbeiten?', answer: 'Solche Arbeiten werden nicht pauschal zugesagt. Bitte beschreibe die Aufgabe; es muss vorab geklärt werden, ob sie im zulässigen Leistungsumfang liegt.' },
    { question: 'Kann ich Fotos mitsenden?', answer: 'Ja, wenn das Anfrageformular Anhänge unterstützt, nutze diese Funktion. Andernfalls beschreibe den Zustand und die Maße möglichst genau.' },
    { question: 'Was kostet eine Kleinreparatur?', answer: 'Die allgemeine Preisorientierung beginnt bei 15 €/Stunde. Der konkrete Preis hängt von Art, Aufwand und eventuell benötigtem Material ab und wird vor Beginn abgestimmt.' },
  ],
};

export const metadata: Metadata = {
  title: 'Kleinreparaturen Wien | Handwerker anfragen',
  description: 'Kleinreparaturen in Wien anfragen: Beschreibe die Arbeit und erhalte eine Einschätzung zu Umfang, Aufwand und möglichen nächsten Schritten.',
  alternates: { canonical: 'https://handwerker-wien.com/reparaturen-wien/' },
  openGraph: { title: 'Kleinreparaturen Wien', description: content.description, url: 'https://handwerker-wien.com/reparaturen-wien/', locale: 'de_AT', type: 'website' },
};
export default function Page() { return <ServiceLandingPage content={content} />; }
