import type { Metadata } from 'next';
import { ServiceLandingPage, type ServiceLandingContent } from '@/components/seo/ServiceLandingPage';

const content: ServiceLandingContent = {
  slug: 'demontage-wien',
  title: 'Demontage Wien',
  h1: 'Demontage in Wien – Möbel und Einrichtungsgegenstände abbauen',
  description: 'Demontage in Wien für Möbel und geeignete Einrichtungsgegenstände vor Umzug, Austausch oder Entsorgung. Umfang und Bedingungen vorab klären.',
  intro: 'Vor einem Umzug, einer Neuanschaffung oder einer Raumänderung müssen Möbel oft zerlegt werden. Beschreibe, was abgebaut werden soll und ob die Teile erhalten, transportiert oder entsorgt werden sollen.',
  benefits: ['Vorab abstimmen, welche Teile zerlegt werden und was erhalten bleiben soll.', 'Besondere Befestigungen, enge Zugänge und schwere Elemente bereits in der Anfrage nennen.', 'Transport oder Entsorgung nicht voraussetzen, sondern separat anfragen.'],
  included: ['Zerlegen geeigneter Möbelstücke', 'Abbau von Regalen, Tischen, Betten und Schränken', 'Vorbereitung von Möbeln für einen Umzug oder Austausch', 'Abstimmung zu Wandbefestigungen und möglichen Zusatzarbeiten'],
  suitableFor: ['Umzug oder Wohnungswechsel', 'Austausch alter Möbel', 'Umgestaltung von Räumen', 'Abbau von Einrichtungsgegenständen in geeigneten Geschäftsräumen'],
  faqs: [
    { question: 'Übernehmt ihr die Demontage vor einem Umzug?', answer: 'Du kannst den Abbau der betreffenden Möbel anfragen. Teile uns mit, wie viele Möbelstücke betroffen sind und ob sie anschließend transportiert werden sollen.' },
    { question: 'Ist Entsorgung im Preis enthalten?', answer: 'Nein, Entsorgung ist nicht automatisch enthalten. Bitte frage sie ausdrücklich an, damit die Möglichkeit und mögliche Zusatzkosten geklärt werden können.' },
    { question: 'Können Möbel für den späteren Wiederaufbau zerlegt werden?', answer: 'Das hängt von Konstruktion, Zustand und Befestigungen ab. Erwähne bei der Anfrage, dass die Möbel später wieder aufgebaut werden sollen.' },
    { question: 'Wie wird der Preis berechnet?', answer: 'Die Preisorientierung beginnt bei 15 €/Stunde, der tatsächliche Aufwand hängt unter anderem von Möbelmenge, Befestigungen und Zugänglichkeit ab. Der Preis wird vor Beginn abgestimmt.' },
  ],
};

export const metadata: Metadata = {
  title: 'Demontage Wien | Möbel abbauen lassen',
  description: 'Demontage in Wien vor Umzug oder Austausch: Schränke, Betten, Regale und weitere Möbel abbauen lassen. Unverbindliche Anfrage online.',
  alternates: { canonical: 'https://handwerker-wien.com/demontage-wien/' },
  openGraph: { title: 'Demontage Wien', description: content.description, url: 'https://handwerker-wien.com/demontage-wien/', locale: 'de_AT', type: 'website' },
};
export default function Page() { return <ServiceLandingPage content={content} />; }
