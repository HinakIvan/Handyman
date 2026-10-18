import Link from 'next/link';

export type ServiceLandingContent = {
  slug: string;
  title: string;
  description: string;
  h1: string;
  intro: string;
  benefits: string[];
  included: string[];
  suitableFor: string[];
  faqs: { question: string; answer: string }[];
};

const siteUrl = 'https://handwerker-wien.com';

export function ServiceLandingPage({ content }: { content: ServiceLandingContent }) {
  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: content.title,
    serviceType: content.title,
    description: content.description,
    url: `${siteUrl}/${content.slug}/`,
    areaServed: [
      { '@type': 'City', name: 'Wien', containedInPlace: { '@type': 'Country', name: 'Österreich' } },
      { '@type': 'AdministrativeArea', name: 'Wien und Umgebung' },
    ],
    provider: { '@type': 'Organization', name: 'Wiener Bauhandwerk', url: siteUrl },
  };
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: content.faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: { '@type': 'Answer', text: faq.answer },
    })),
  };

  return (
    <main className="mx-auto w-full max-w-5xl px-4 py-10 md:px-6 md:py-16">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema).replace(/</g, '\\u003c') }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema).replace(/</g, '\\u003c') }} />
      <nav aria-label="Breadcrumb" className="mb-6 text-sm text-muted-foreground">
        <ol className="flex flex-wrap items-center gap-2">
          <li><Link href="/" className="underline-offset-4 hover:underline">Startseite</Link></li>
          <li aria-hidden="true">/</li>
          <li aria-current="page">{content.title}</li>
        </ol>
      </nav>

      <section className="rounded-2xl border border-border bg-card p-6 shadow-sm md:p-10">
        <p className="mb-3 text-sm font-semibold uppercase tracking-wide text-primary">Handwerkerservice in Wien</p>
        <h1 className="max-w-4xl text-3xl font-bold tracking-tight md:text-5xl">{content.h1}</h1>
        <p className="mt-5 max-w-3xl text-lg leading-8 text-muted-foreground">{content.intro}</p>
        <p className="mt-4 text-sm text-muted-foreground">Preisorientierung: ab 15 €/Stunde, abhängig von Tätigkeit und Aufwand. Den konkreten Umfang und Preis stimmen wir vor Beginn ab.</p>
        <div className="mt-7 flex flex-wrap gap-3">
          <Link href="/quoterequestform" className="inline-flex min-h-11 items-center justify-center rounded-lg bg-primary px-5 py-3 font-semibold text-primary-foreground hover:opacity-90">Unverbindliche Anfrage stellen</Link>
          <Link href="/servicescatalog" className="inline-flex min-h-11 items-center justify-center rounded-lg border border-border px-5 py-3 font-semibold hover:bg-muted">Alle Leistungen ansehen</Link>
        </div>
      </section>

      <section className="mt-12 grid gap-6 md:grid-cols-2">
        <div className="rounded-xl border border-border p-6">
          <h2 className="text-xl font-bold">Wobei wir helfen können</h2>
          <ul className="mt-4 list-disc space-y-2 pl-5 leading-7">
            {content.included.map((item) => <li key={item}>{item}</li>)}
          </ul>
        </div>
        <div className="rounded-xl border border-border p-6">
          <h2 className="text-xl font-bold">Für wen ist der Service geeignet?</h2>
          <ul className="mt-4 list-disc space-y-2 pl-5 leading-7">
            {content.suitableFor.map((item) => <li key={item}>{item}</li>)}
          </ul>
        </div>
      </section>

      <section className="mt-12">
        <h2 className="text-2xl font-bold">Warum eine Anfrage sinnvoll ist</h2>
        <div className="mt-5 grid gap-4 sm:grid-cols-3">
          {content.benefits.map((benefit, index) => (
            <div key={benefit} className="rounded-xl bg-muted/40 p-5">
              <p className="text-sm font-semibold text-primary">0{index + 1}</p>
              <p className="mt-2 leading-7">{benefit}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-12 rounded-xl border border-border p-6 md:p-8">
        <h2 className="text-2xl font-bold">Häufige Fragen</h2>
        <div className="mt-5 divide-y divide-border">
          {content.faqs.map((faq) => (
            <details key={faq.question} className="py-4">
              <summary className="cursor-pointer font-semibold">{faq.question}</summary>
              <p className="mt-3 leading-7 text-muted-foreground">{faq.answer}</p>
            </details>
          ))}
        </div>
      </section>

      <section className="mt-12 rounded-2xl bg-primary/5 p-6 md:p-8">
        <h2 className="text-2xl font-bold">Service in Wien anfragen</h2>
        <p className="mt-3 max-w-3xl leading-7 text-muted-foreground">Beschreibe kurz, was gemacht werden soll und wo sich der Einsatzort befindet. Wir können dann den voraussichtlichen Aufwand und die nächsten Schritte abstimmen.</p>
        <Link href="/quoterequestform" className="mt-5 inline-flex min-h-11 items-center justify-center rounded-lg bg-primary px-5 py-3 font-semibold text-primary-foreground hover:opacity-90">Anfrage starten</Link>
      </section>
    </main>
  );
}
