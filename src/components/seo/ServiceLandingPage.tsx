import Link from 'next/link';
import type { SeoLocale } from './localized-content';

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

export function ServiceLandingPage({ content, locale = 'de' }: { content: ServiceLandingContent; locale?: SeoLocale }) {
  const labels = {
    de: { brand: 'Handwerkerservice in Wien', home: 'Startseite', included: 'Wobei wir helfen können', suitable: 'Für wen ist der Service geeignet?', why: 'Warum eine Anfrage sinnvoll ist', faq: 'Häufige Fragen', service: 'Service in Wien anfragen', serviceText: 'Beschreibe kurz, was gemacht werden soll und wo sich der Einsatzort befindet. Wir stimmen den voraussichtlichen Aufwand und die nächsten Schritte ab.', request: 'Unverbindliche Anfrage stellen', all: 'Alle Leistungen ansehen', start: 'Anfrage starten', price: 'Preisorientierung: ab 15 €/Stunde, abhängig von Tätigkeit und Aufwand. Den konkreten Umfang und Preis stimmen wir vor Beginn ab.', languages: 'Sprache' },
    ru: { brand: 'Услуги мастера в Вене', home: 'Главная', included: 'Какие работы доступны', suitable: 'Для кого подходит услуга', why: 'Почему стоит оставить заявку', faq: 'Частые вопросы', service: 'Заказать услугу в Вене', serviceText: 'Кратко опишите задачу и место выполнения. Мы согласуем предполагаемый объём работ и дальнейшие шаги.', request: 'Оставить заявку', all: 'Все услуги', start: 'Начать заявку', price: 'Ориентировочная цена — от 15 €/час, в зависимости от задачи и объёма. Конкретную стоимость согласуем заранее.', languages: 'Язык' },
    en: { brand: 'Handyman services in Vienna', home: 'Home', included: 'What we can help with', suitable: 'Who is this service for?', why: 'Why send an enquiry', faq: 'Frequently asked questions', service: 'Request service in Vienna', serviceText: 'Briefly describe the work and location. We will clarify the estimated scope and next steps.', request: 'Send an enquiry', all: 'View all services', start: 'Start enquiry', price: 'Indicative pricing starts at €15/hour, depending on the task and scope. The specific scope and price are agreed in advance.', languages: 'Language' },
  }[locale];
  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: content.title,
    serviceType: content.title,
    description: content.description,
    url: `${siteUrl}${locale === 'de' ? `/${content.slug}/` : `/${locale}/${content.slug}/`}`,
    areaServed: [
      { '@type': 'City', name: 'Wien', containedInPlace: { '@type': 'Country', name: 'Österreich' } },
      { '@type': 'AdministrativeArea', name: 'Wien und Umgebung' },
    ],
    provider: { '@type': 'Organization', name: 'Handwerker Wien', url: siteUrl },
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
          <li><Link href={locale === 'de' ? '/' : `/${locale}/`} className="underline-offset-4 hover:underline">{labels.home}</Link></li>
          <li aria-hidden="true">/</li>
          <li aria-current="page">{content.title}</li>
        </ol>
      </nav>

      <section className="rounded-2xl border border-border bg-card p-6 shadow-sm md:p-10">
        <p className="mb-3 text-sm font-semibold uppercase tracking-wide text-primary">{labels.brand}</p>
        <h1 className="max-w-4xl text-3xl font-bold tracking-tight md:text-5xl">{content.h1}</h1>
        <p className="mt-5 max-w-3xl text-lg leading-8 text-muted-foreground">{content.intro}</p>
        <p className="mt-4 text-sm text-muted-foreground">{labels.price}</p>
        <div className="mt-7 flex flex-wrap gap-3">
          <Link href="/quoterequestform" className="inline-flex min-h-11 items-center justify-center rounded-lg bg-primary px-5 py-3 font-semibold text-primary-foreground hover:opacity-90">{labels.request}</Link>
          <Link href="/servicescatalog" className="inline-flex min-h-11 items-center justify-center rounded-lg border border-border px-5 py-3 font-semibold hover:bg-muted">{labels.all}</Link>
        </div>
      </section>

      <section className="mt-12 grid gap-6 md:grid-cols-2">
        <div className="rounded-xl border border-border p-6">
          <h2 className="text-xl font-bold">{labels.included}</h2>
          <ul className="mt-4 list-disc space-y-2 pl-5 leading-7">
            {content.included.map((item) => <li key={item}>{item}</li>)}
          </ul>
        </div>
        <div className="rounded-xl border border-border p-6">
          <h2 className="text-xl font-bold">{labels.suitable}</h2>
          <ul className="mt-4 list-disc space-y-2 pl-5 leading-7">
            {content.suitableFor.map((item) => <li key={item}>{item}</li>)}
          </ul>
        </div>
      </section>

      <section className="mt-12">
        <h2 className="text-2xl font-bold">{labels.why}</h2>
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
        <h2 className="text-2xl font-bold">{labels.faq}</h2>
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
        <h2 className="text-2xl font-bold">{labels.service}</h2>
        <p className="mt-3 max-w-3xl leading-7 text-muted-foreground">{labels.serviceText}</p>
        <Link href="/quoterequestform" className="mt-5 inline-flex min-h-11 items-center justify-center rounded-lg bg-primary px-5 py-3 font-semibold text-primary-foreground hover:opacity-90">{labels.start}</Link>
      </section>
      <nav aria-label={labels.languages} className="mt-8 flex flex-wrap gap-4 text-sm">
        <Link className="underline underline-offset-4" href={`/${content.slug}/`}>Deutsch</Link>
        <Link className="underline underline-offset-4" href={`/ru/${content.slug}/`}>Русский</Link>
        <Link className="underline underline-offset-4" href={`/en/${content.slug}/`}>English</Link>
      </nav>
    </main>
  );
}
