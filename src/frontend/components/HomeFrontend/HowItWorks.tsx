"use client";

import React from "react";
import type { Language } from "@/frontend/types/HomeFrontend";
import { MessageSquare, Camera, Calculator, CalendarCheck, CheckCircle } from "lucide-react";
interface HowItWorksProps {
  lang: Language;
}
const stepsData = [{
  stepNumber: "01",
  icon: MessageSquare,
  title: {
    en: "Initial Inquiry",
    de: "Kostenlose Anfrage",
    ru: "Заявка и описание"
  },
  desc: {
    en: "Submit tasks via form, phone, or WhatsApp with your Vienna district postal code.",
    de: "Aufgaben per Formular, Anruf oder WhatsApp mit Angabe Ihres Wiener Bezirks übermitteln.",
    ru: "Отправьте заявку через форму, по телефону или в WhatsApp с указанием района Вены."
  }
}, {
  stepNumber: "02",
  icon: Camera,
  title: {
    en: "Photos & Dimensions",
    de: "Fotos & Maße",
    ru: "Фото и замеры"
  },
  desc: {
    en: "Upload photos of the room, furniture, or damage for an accurate time and tool estimate.",
    de: "Fotos der Möbel, Wände oder Mängel senden für eine exakte Werkzeug- und Zeiteinschätzung.",
    ru: "Пришлите фото помещения или мебели для точной оценки времени и необходимого инструмента."
  }
}, {
  stepNumber: "03",
  icon: Calculator,
  title: {
    en: "Transparent Quote",
    de: "Transparenter Kostenvoranschlag",
    ru: "Расчёт сметы"
  },
  desc: {
    en: "Receive an itemized estimate (€15/hr baseline + flat travel + materials if requested).",
    de: "Sie erhalten ein faires Angebot mit transparenter Stundenaufschlüsselung und Anfahrt.",
    ru: "Получите прозрачную смету с разбивкой по часам, выезду и материалам."
  }
}, {
  stepNumber: "04",
  icon: CalendarCheck,
  title: {
    en: "Scheduled Execution",
    de: "Pünktliche Ausführung",
    ru: "Выезд и выполнение"
  },
  desc: {
    en: "Craftsman arrives on time equipped with professional Makita/Bosch tools and supplies.",
    de: "Pünktliches Eintreffen mit professionellem Profi-Werkzeug und Verbrauchsmaterialien.",
    ru: "Мастер приезжает вовремя с профессиональным инструментом и расходниками."
  }
}, {
  stepNumber: "05",
  icon: CheckCircle,
  title: {
    en: "Acceptance & Invoice",
    de: "Abnahme & Rechnung",
    ru: "Приёмка и счёт"
  },
  desc: {
    en: "Inspect completed work together, approve results, and receive a compliant tax invoice.",
    de: "Gemeinsame Qualitätsabnahme und Erhalt einer ordnungsgemäßen Rechnung mit MwSt.",
    ru: "Совместная проверка качества и получение официального счета с НДС."
  }
}];
export default function HowItWorks({
  lang
}: HowItWorksProps) {
  return <section data-controller-name="How It Works Timeline" className="w-full border-b border-border bg-background text-foreground py-14 sm:py-16" data-api-unique-id='howitworks-r0d4679e9e7485d94-s2664622954' data-api-unique-page-name='src/frontend/components/HomeFrontend/HowItWorks'>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8" data-api-unique-id='howitworks-r7d3cd806f0b6a990-s2664622954' data-api-unique-page-name='src/frontend/components/HomeFrontend/HowItWorks'>
        <div className="mb-10 text-center max-w-2xl mx-auto" data-api-unique-id='howitworks-r58605e73df3840aa-s2664622954' data-api-unique-page-name='src/frontend/components/HomeFrontend/HowItWorks'>
          <h2 className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-foreground" data-api-unique-id='howitworks-r29d5e9bb0faf1d8e-s2664622954' data-api-unique-page-name='src/frontend/components/HomeFrontend/HowItWorks'>
            {lang === "de" ? "In 5 Schritten zur fertigen Arbeit" : lang === "ru" ? "5 простых шагов от заявки до результата" : "How It Works: 5-Step Clear Process"}
          </h2>
          <p className="mt-1 text-sm sm:text-base text-muted-foreground" data-api-unique-id='howitworks-r3850cd27c6338e72-s2664622954' data-api-unique-page-name='src/frontend/components/HomeFrontend/HowItWorks'>
            {lang === "de" ? "Präzise, termintreu und ohne bürokratischen Mehraufwand." : lang === "ru" ? "Пунктуально, надёжно и без лишней бюрократии." : "Predictable, punctual, and free of bureaucratic friction."}
          </p>
        </div>

        {/* 5-Step Horizontal Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4" data-api-unique-id='howitworks-r1e4ec39c8bd854f4-s2664622954' data-api-unique-page-name='src/frontend/components/HomeFrontend/HowItWorks'>
          {stepsData.map((s, index) => {
          const Icon = s.icon;
          return <div key={s.stepNumber} className="relative rounded-lg border border-border bg-card text-card-foreground p-5 flex flex-col justify-between shadow-soft" data-api-unique-id='howitworks-r07424c0af3938ade-s2664622954' data-api-unique-page-name='src/frontend/components/HomeFrontend/HowItWorks' data-api-in-loop='1'>
                <div data-api-unique-id='howitworks-rce8e4ad0e3e8f034-s2664622954' data-api-unique-page-name='src/frontend/components/HomeFrontend/HowItWorks' data-api-in-loop='1'>
                  <div className="flex items-center justify-between mb-4" data-api-unique-id='howitworks-rd6c82463ac3e7f54-s2664622954' data-api-unique-page-name='src/frontend/components/HomeFrontend/HowItWorks' data-api-in-loop='1'>
                    <span className="font-display text-xl font-bold text-primary" data-api-unique-id='howitworks-r0fd71d875795eec8-s2664622954' data-api-unique-page-name='src/frontend/components/HomeFrontend/HowItWorks' data-api-in-loop='1' data-api-bind-info={`stepsData-${index}-stepNumber`} data-api-map-var-name='s'>
                      {s.stepNumber}
                    </span>
                    <span className="inline-flex h-8 w-8 items-center justify-center rounded-md bg-muted text-foreground border border-border" data-api-unique-id='howitworks-r13f7925ffa96e219-s2664622954' data-api-unique-page-name='src/frontend/components/HomeFrontend/HowItWorks' data-api-in-loop='1'>
                      <Icon className="h-4 w-4" data-api-bind-info={`stepsData-${index}-icon`} data-api-map-var-name='s' data-api-unique-id='howitworks-rfb46120d4e63eab0-s2664622954' data-api-unique-page-name='src/frontend/components/HomeFrontend/HowItWorks' data-api-in-loop='1' />
                    </span>
                  </div>

                  <h3 className="font-display text-base font-bold text-card-foreground" data-api-unique-id='howitworks-r9a7b3f62028fd9c9-s2664622954' data-api-unique-page-name='src/frontend/components/HomeFrontend/HowItWorks' data-api-in-loop='1' data-api-bind-info={`stepsData-${index}-title.lang`} data-api-map-var-name='s'>
                    {s.title[lang]}
                  </h3>
                  <p className="mt-2 text-xs text-muted-foreground leading-relaxed" data-api-unique-id='howitworks-r51040f22ac1b7065-s2664622954' data-api-unique-page-name='src/frontend/components/HomeFrontend/HowItWorks' data-api-in-loop='1' data-api-bind-info={`stepsData-${index}-desc.lang`} data-api-map-var-name='s'>
                    {s.desc[lang]}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-border flex items-center gap-1 text-[11px] text-muted-foreground" data-api-unique-id='howitworks-r6047e499d8dbef25-s2664622954' data-api-unique-page-name='src/frontend/components/HomeFrontend/HowItWorks' data-api-in-loop='1'>
                  <span className="h-1.5 w-1.5 rounded-full bg-primary" data-api-unique-id='howitworks-r404952c11defc81e-s2664622954' data-api-unique-page-name='src/frontend/components/HomeFrontend/HowItWorks' data-api-in-loop='1' />
                  <span data-api-unique-id='howitworks-r763840915552cf0d-s2664622954' data-api-unique-page-name='src/frontend/components/HomeFrontend/HowItWorks' data-api-in-loop='1'>Verified Step</span>
                </div>
              </div>;
        })}
        </div>
      </div>
    </section>;
}