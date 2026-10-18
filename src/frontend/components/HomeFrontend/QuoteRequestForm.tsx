"use client";

import React, { useState, useEffect } from "react";
import type { Language, ServiceId, ServiceCategoryKey, ServiceCategoryDTO, ViennaDistrictDTO, PreferredTimeSlot, SubmissionLanguage, CreateQuoteOutput } from "@/frontend/types/HomeFrontend";
import { getHomeData, createQuoteRequest } from "@/frontend/actions/HomeFrontend";
import { useUserSession } from "@/tools/FrontendSession";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Send, CheckCircle2, Phone, MessageCircle, ShieldAlert, Paperclip, Flame, Loader2 } from "lucide-react";
import { toast } from "sonner";
interface QuoteRequestFormProps {
  lang: Language;
  preselectedServiceId?: ServiceId | "";
  onResetServiceSelection?: () => void;
}
function serviceIdToKey(serviceId?: ServiceId | string): ServiceCategoryKey {
  if (!serviceId) return "ASSEMBLY";
  const map: Record<string, ServiceCategoryKey> = {
    "service-assembly": "ASSEMBLY",
    "service-demolition": "DEMOLITION",
    "service-flooring": "FLOORING",
    "service-painting": "PAINTING",
    "service-drywall": "DRYWALL",
    "service-bathroom-kitchen": "BATHROOM_KITCHEN",
    "service-doors-windows": "DOORS_WINDOWS",
    "service-outdoor": "OUTDOOR",
    "service-moving": "MOVING",
    "service-commercial": "COMMERCIAL"
  };
  if (map[serviceId]) return map[serviceId];
  const cleaned = serviceId.replace(/^service-/, "").toUpperCase().replace(/-/g, "_");
  const validKeys: ServiceCategoryKey[] = ["ASSEMBLY", "DEMOLITION", "FLOORING", "PAINTING", "DRYWALL", "PLUMBING_MINOR", "BATHROOM_KITCHEN", "DOORS_WINDOWS", "OUTDOOR", "MOVING", "COMMERCIAL"];
  if (validKeys.includes(cleaned as ServiceCategoryKey)) {
    return cleaned as ServiceCategoryKey;
  }
  return "ASSEMBLY";
}
function getServiceTitle(service: ServiceCategoryDTO, lang: Language): string {
  if (lang === "de") return service.titleDe;
  if (lang === "ru") return service.titleRu;
  return service.titleEn;
}
export default function QuoteRequestForm({
  lang,
  preselectedServiceId = "",
  onResetServiceSelection
}: QuoteRequestFormProps) {
  const session = useUserSession();
  const [services, setServices] = useState<ServiceCategoryDTO[]>([]);
  const [districts, setDistricts] = useState<ViennaDistrictDTO[]>([]);
  const [dataLoading, setDataLoading] = useState<boolean>(true);
  const [selectedCategoryKey, setSelectedCategoryKey] = useState<ServiceCategoryKey>(serviceIdToKey(preselectedServiceId));
  const [districtCode, setDistrictCode] = useState<string>("1010");
  const [taskTitle, setTaskTitle] = useState<string>("");
  const [taskDescription, setTaskDescription] = useState<string>("");
  const [addressSnippet, setAddressSnippet] = useState<string>("");
  const [estimatedHours, setEstimatedHours] = useState<number>(3);
  const [preferredDate, setPreferredDate] = useState<string>(() => {
    const d = new Date();
    d.setDate(d.getDate() + 2);
    return d.toISOString().split("T")[0];
  });
  const [preferredTimeSlot, setPreferredTimeSlot] = useState<PreferredTimeSlot>("MORNING");
  const [clientName, setClientName] = useState<string>("");
  const [clientPhone, setClientPhone] = useState<string>("");
  const [clientEmail, setClientEmail] = useState<string>("");
  const [hasMaterials, setHasMaterials] = useState<boolean>(false);
  const [isUrgent, setIsUrgent] = useState<boolean>(false);
  const [agreedToTerms, setAgreedToTerms] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [submissionResult, setSubmissionResult] = useState<CreateQuoteOutput | null>(null);
  const [attachedFileName, setAttachedFileName] = useState<string | null>(null);

  // Fetch catalog services and districts on mount
  useEffect(() => {
    let active = true;
    getHomeData().then(data => {
      if (!active) return;
      setServices(data.services || []);
      setDistricts(data.districts || []);
      if (data.districts?.length && !districtCode) {
        setDistrictCode(data.districts[0].districtCode);
      }
    }).catch(err => {
      console.error("Failed to load catalog data", err);
    }).finally(() => {
      if (active) setDataLoading(false);
    });
    return () => {
      active = false;
    };
  }, []);

  // Pre-fill user contact from active session
  useEffect(() => {
    if (session.full_name) {
      setClientName(prev => prev || session.full_name);
    }
    if (session.email) {
      setClientEmail(prev => prev || session.email);
    }
  }, [session.full_name, session.email]);

  // Sync when preselectedServiceId prop changes
  useEffect(() => {
    if (preselectedServiceId) {
      setSelectedCategoryKey(serviceIdToKey(preselectedServiceId));
    }
  }, [preselectedServiceId]);
  const selectedService = services.find(s => s.key === selectedCategoryKey) || services[0] || null;
  const currentDistrict = districts.find(d => d.districtCode === districtCode) || districts[0] || null;
  const ratePerHour = selectedService?.baselineHourlyRate ?? 15;
  const travelFee = 20;
  const urgencyFee = isUrgent ? 35 : 0;
  const estimatedTotalEur = ratePerHour * estimatedHours + travelFee + urgencyFee;
  const timeSlotLabels: Record<PreferredTimeSlot, string> = {
    MORNING: lang === "de" ? "Vormittag (08:00–12:00)" : lang === "ru" ? "Утро (08:00–12:00)" : "Morning (08:00–12:00)",
    AFTERNOON: lang === "de" ? "Nachmittag (12:00–17:00)" : lang === "ru" ? "День (12:00–17:00)" : "Afternoon (12:00–17:00)",
    FLEXIBLE: lang === "de" ? "Ganztags flexibel" : lang === "ru" ? "Гибкое время" : "Flexible all day"
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!agreedToTerms) {
      toast.error(lang === "de" ? "Bitte stimmen Sie den AGB zu." : lang === "ru" ? "Пожалуйста, подтвердите согласие с условиями." : "Please agree to terms before submitting.");
      return;
    }
    if (!clientName.trim() || !clientPhone.trim() || !taskTitle.trim()) {
      toast.error(lang === "de" ? "Bitte füllen Sie alle Pflichtfelder aus." : lang === "ru" ? "Пожалуйста, заполните обязательные поля." : "Please fill in all required fields.");
      return;
    }
    setIsSubmitting(true);
    try {
      const submissionLang: SubmissionLanguage = lang === "de" ? "DE" : lang === "ru" ? "RU" : "EN";
      const targetDistrictCode = districtCode || (districts[0]?.districtCode ?? "1010");
      const targetCategoryKey = selectedCategoryKey || (services[0]?.key ?? "ASSEMBLY");
      const result = await createQuoteRequest({
        serviceCategoryKey: targetCategoryKey,
        districtCode: targetDistrictCode,
        clientName: clientName.trim(),
        clientPhone: clientPhone.trim(),
        clientEmail: clientEmail.trim(),
        addressSnippet: addressSnippet.trim(),
        taskTitle: taskTitle.trim(),
        taskDescription: taskDescription.trim(),
        estimatedHours,
        preferredDate,
        preferredTimeSlot,
        hasMaterials,
        isUrgent,
        agreedToTerms,
        submissionLang
      });
      setSubmissionResult(result);
      toast.success(lang === "de" ? `Anfrage übermittelt! Code: ${result.trackingCode}` : lang === "ru" ? `Заявка принята! Код: ${result.trackingCode}` : `Quote request submitted! Tracking: ${result.trackingCode}`);
    } catch (err) {
      console.error("Failed to submit quote request", err);
      toast.error(lang === "de" ? "Fehler beim Absenden der Anfrage. Bitte überprüfen Sie Ihre Eingaben." : lang === "ru" ? "Ошибка при отправке заявки. Пожалуйста, попробуйте еще раз." : "Failed to submit quote request. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };
  const handleReset = () => {
    setSubmissionResult(null);
    setTaskTitle("");
    setTaskDescription("");
    setAddressSnippet("");
    setAttachedFileName(null);
    if (onResetServiceSelection) {
      onResetServiceSelection();
    }
  };
  return <section id="quote-section" data-controller-name="Quote & Service Request Form" className="w-full border-b border-border bg-card text-card-foreground py-14 sm:py-16" data-api-unique-id='quoterequestform-racda832f3d1f3bd6-s472664262' data-api-unique-page-name='src/frontend/components/HomeFrontend/QuoteRequestForm'>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8" data-api-unique-id='quoterequestform-r6e32c05c03b671e8-s472664262' data-api-unique-page-name='src/frontend/components/HomeFrontend/QuoteRequestForm'>
        <div className="max-w-3xl mb-8" data-api-unique-id='quoterequestform-r47a46bf198c83917-s472664262' data-api-unique-page-name='src/frontend/components/HomeFrontend/QuoteRequestForm'>
          <h2 className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-card-foreground" data-api-unique-id='quoterequestform-rdb19e7b25170654c-s472664262' data-api-unique-page-name='src/frontend/components/HomeFrontend/QuoteRequestForm'>
            {lang === "de" ? "Kostenloses Angebot & Termin anfragen" : lang === "ru" ? "Запрос сметы и бронирование мастера" : "Request Free Quote & Schedule Work"}
          </h2>
          <p className="mt-1 text-sm sm:text-base text-muted-foreground" data-api-unique-id='quoterequestform-r1d65de696b041e09-s472664262' data-api-unique-page-name='src/frontend/components/HomeFrontend/QuoteRequestForm'>
            {lang === "de" ? "Direkte Antwort innerhalb von 60 Minuten. Unverbindlich & transparent." : lang === "ru" ? "Быстрый ответ в течение 60 минут. Без скрытых условий и обязательств." : "Direct response within 60 minutes. Non-binding estimate."}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start" data-api-unique-id='quoterequestform-ra4df2a099c0cda69-s472664262' data-api-unique-page-name='src/frontend/components/HomeFrontend/QuoteRequestForm'>
          {/* Left Column: Form Panel (8 cols) */}
          <div className="lg:col-span-8 rounded-xl border border-border bg-background text-foreground p-6 sm:p-8 shadow-soft" data-api-unique-id='quoterequestform-r0ca5355a32ccc4fa-s472664262' data-api-unique-page-name='src/frontend/components/HomeFrontend/QuoteRequestForm'>
            {submissionResult ? <div className="py-8 text-center space-y-4" data-api-unique-id='quoterequestform-r9aad6dd4df0d6c2a-s472664262' data-api-unique-page-name='src/frontend/components/HomeFrontend/QuoteRequestForm'>
                <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-success text-success-foreground mx-auto" data-api-unique-id='quoterequestform-r8ef1b6018cc0b9ff-s472664262' data-api-unique-page-name='src/frontend/components/HomeFrontend/QuoteRequestForm'>
                  <CheckCircle2 className="h-8 w-8" data-api-unique-id='quoterequestform-r228b326c2e4dc007-s472664262' data-api-unique-page-name='src/frontend/components/HomeFrontend/QuoteRequestForm' />
                </div>
                <h3 className="font-display text-2xl font-bold text-foreground" data-api-unique-id='quoterequestform-r3a178363a2849cfe-s472664262' data-api-unique-page-name='src/frontend/components/HomeFrontend/QuoteRequestForm'>
                  {lang === "de" ? "Anfrage erfolgreich übermittelt!" : lang === "ru" ? "Заявка успешно отправлена!" : "Quote Request Sent Successfully!"}
                </h3>
                <p className="text-sm text-muted-foreground max-w-md mx-auto leading-relaxed" data-api-unique-id='quoterequestform-r3692219c98b99465-s472664262' data-api-unique-page-name='src/frontend/components/HomeFrontend/QuoteRequestForm'>
                  {lang === "de" ? `Vielen Dank, ${submissionResult.clientName}. Wir prüfen Ihre Angaben für Bezirk ${submissionResult.districtCode} und melden uns umgehend unter ${submissionResult.clientPhone}.` : lang === "ru" ? `Спасибо, ${submissionResult.clientName}. Мы проверили детали для района ${submissionResult.districtCode} и свяжемся с вами по номеру ${submissionResult.clientPhone}.` : `Thank you, ${submissionResult.clientName}. We are reviewing your task details for district ${submissionResult.districtCode} and will reach you at ${submissionResult.clientPhone}.`}
                </p>

                <div className="pt-4 max-w-sm mx-auto border-t border-border flex flex-col gap-2" data-api-unique-id='quoterequestform-rebd437b6d33a9059-s472664262' data-api-unique-page-name='src/frontend/components/HomeFrontend/QuoteRequestForm'>
                  <div className="flex justify-between text-xs text-muted-foreground" data-api-unique-id='quoterequestform-r3d34dbf0513d97d1-s472664262' data-api-unique-page-name='src/frontend/components/HomeFrontend/QuoteRequestForm'>
                    <span data-api-unique-id='quoterequestform-rec2a215b08095afd-s472664262' data-api-unique-page-name='src/frontend/components/HomeFrontend/QuoteRequestForm'>Tracking Code:</span>
                    <span className="font-mono font-bold text-primary" data-api-unique-id='quoterequestform-r1a8329ad7c0681f9-s472664262' data-api-unique-page-name='src/frontend/components/HomeFrontend/QuoteRequestForm'>
                      {submissionResult.trackingCode}
                    </span>
                  </div>
                  <div className="flex justify-between text-xs text-muted-foreground" data-api-unique-id='quoterequestform-r454108e0614e41f4-s472664262' data-api-unique-page-name='src/frontend/components/HomeFrontend/QuoteRequestForm'>
                    <span data-api-unique-id='quoterequestform-r2c0a6aafeb46b7c1-s472664262' data-api-unique-page-name='src/frontend/components/HomeFrontend/QuoteRequestForm'>Selected Trade:</span>
                    <span className="font-semibold text-foreground" data-api-unique-id='quoterequestform-r4381976dfcf36748-s472664262' data-api-unique-page-name='src/frontend/components/HomeFrontend/QuoteRequestForm'>
                      {selectedService ? getServiceTitle(selectedService, lang) : submissionResult.serviceTitle}
                    </span>
                  </div>
                  <div className="flex justify-between text-xs text-muted-foreground" data-api-unique-id='quoterequestform-rbf7b6796bf9ff40e-s472664262' data-api-unique-page-name='src/frontend/components/HomeFrontend/QuoteRequestForm'>
                    <span data-api-unique-id='quoterequestform-r635d233a2e426cc9-s472664262' data-api-unique-page-name='src/frontend/components/HomeFrontend/QuoteRequestForm'>Est. Calculation:</span>
                    <span className="font-semibold text-primary" data-api-unique-id='quoterequestform-r35ba609117a96a80-s472664262' data-api-unique-page-name='src/frontend/components/HomeFrontend/QuoteRequestForm'>
                      ~ €{submissionResult.estimatedBudgetEur} (incl. €20 travel flat
                      {isUrgent ? " + €35 express" : ""})
                    </span>
                  </div>
                </div>

                <button type="button" onClick={handleReset} className="mt-6 inline-flex items-center justify-center rounded-md bg-secondary px-5 py-2.5 text-xs font-semibold text-secondary-foreground hover:brightness-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring" data-api-unique-id='quoterequestform-rc1fe4f9406b51b5b-s472664262' data-api-unique-page-name='src/frontend/components/HomeFrontend/QuoteRequestForm'>
                  {lang === "de" ? "Weitere Anfrage erstellen" : lang === "ru" ? "Создать ещё одну заявку" : "Submit Another Request"}
                </button>
              </div> : <form onSubmit={handleSubmit} className="space-y-5" data-api-unique-id='quoterequestform-r3bf0d59bca105b75-s472664262' data-api-unique-page-name='src/frontend/components/HomeFrontend/QuoteRequestForm'>
                {/* Row 1: Category & District Selector */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4" data-api-unique-id='quoterequestform-r5dc6ba254022649b-s472664262' data-api-unique-page-name='src/frontend/components/HomeFrontend/QuoteRequestForm'>
                  <div data-api-unique-id='quoterequestform-r5c0cae570ec13bdd-s472664262' data-api-unique-page-name='src/frontend/components/HomeFrontend/QuoteRequestForm'>
                    <label className="block text-xs font-semibold text-foreground mb-1.5" data-api-unique-id='quoterequestform-rf0b9ba75a26fd84b-s472664262' data-api-unique-page-name='src/frontend/components/HomeFrontend/QuoteRequestForm'>
                      {lang === "de" ? "Gewerbebereich / Leistung *" : lang === "ru" ? "Категория работ *" : "Service Category *"}
                    </label>
                    <Select value={selectedCategoryKey} onValueChange={val => setSelectedCategoryKey(val as ServiceCategoryKey)} disabled={dataLoading || services.length === 0} data-api-unique-id='quoterequestform-rda48b5754499cc12-s472664262' data-api-unique-page-name='src/frontend/components/HomeFrontend/QuoteRequestForm'>
                      <SelectTrigger className="w-full bg-card text-card-foreground" data-api-unique-id='quoterequestform-ra308cc0f75141888-s472664262' data-api-unique-page-name='src/frontend/components/HomeFrontend/QuoteRequestForm'>
                        <SelectValue placeholder="Select category" data-api-unique-id='quoterequestform-rfbeb2360c62dd4ec-s472664262' data-api-unique-page-name='src/frontend/components/HomeFrontend/QuoteRequestForm'>
                          {selectedService ? `${getServiceTitle(selectedService, lang)} (ab €${selectedService.baselineHourlyRate}/h)` : undefined}
                        </SelectValue>
                      </SelectTrigger>
                      <SelectContent data-api-unique-id='quoterequestform-r45f87012af37ef2e-s472664262' data-api-unique-page-name='src/frontend/components/HomeFrontend/QuoteRequestForm'>
                        {services.map((s, index) => <SelectItem key={s.id || s.key} value={s.key} data-api-unique-id='quoterequestform-rcce5c1ff49db64aa-s472664262' data-api-unique-page-name='src/frontend/components/HomeFrontend/QuoteRequestForm' data-api-in-loop='1' data-api-bind-info={`services-${index}-baselineHourlyRate`} data-api-map-var-name='s'>
                            {getServiceTitle(s, lang)} (ab €{s.baselineHourlyRate}/h)
                          </SelectItem>)}
                      </SelectContent>
                    </Select>
                  </div>

                  <div data-api-unique-id='quoterequestform-r4b5abbe35e96ae5b-s472664262' data-api-unique-page-name='src/frontend/components/HomeFrontend/QuoteRequestForm'>
                    <label className="block text-xs font-semibold text-foreground mb-1.5" data-api-unique-id='quoterequestform-rf867624d112b3dde-s472664262' data-api-unique-page-name='src/frontend/components/HomeFrontend/QuoteRequestForm'>
                      {lang === "de" ? "Wiener Bezirk / Postleitzahl *" : lang === "ru" ? "Район Вены / Индекс *" : "Vienna District / Postcode *"}
                    </label>
                    <Select value={districtCode} onValueChange={val => setDistrictCode(val)} disabled={dataLoading || districts.length === 0} data-api-unique-id='quoterequestform-rd9ae094bc491b5b1-s472664262' data-api-unique-page-name='src/frontend/components/HomeFrontend/QuoteRequestForm'>
                      <SelectTrigger className="w-full bg-card text-card-foreground" data-api-unique-id='quoterequestform-r274d988bedd15f8a-s472664262' data-api-unique-page-name='src/frontend/components/HomeFrontend/QuoteRequestForm'>
                        <SelectValue placeholder="Select district" data-api-unique-id='quoterequestform-r15b41cfe6dfaa682-s472664262' data-api-unique-page-name='src/frontend/components/HomeFrontend/QuoteRequestForm'>
                          {currentDistrict ? `${currentDistrict.districtCode} — ${currentDistrict.districtName}` : undefined}
                        </SelectValue>
                      </SelectTrigger>
                      <SelectContent className="max-h-60 overflow-y-auto" data-api-unique-id='quoterequestform-r4ef2c945103ca49b-s472664262' data-api-unique-page-name='src/frontend/components/HomeFrontend/QuoteRequestForm'>
                        {districts.map((d, index) => <SelectItem key={d.id || d.districtCode} value={d.districtCode} data-api-unique-id='quoterequestform-r010a85d6efbe26dc-s472664262' data-api-unique-page-name='src/frontend/components/HomeFrontend/QuoteRequestForm' data-api-in-loop='1' data-api-bind-info={`districts-${index}-districtCode`} data-api-map-var-name='d'>
                            {d.districtCode} — {d.districtName}
                          </SelectItem>)}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Row 2: Task Short Summary & Address */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4" data-api-unique-id='quoterequestform-r5116a51155b45156-s472664262' data-api-unique-page-name='src/frontend/components/HomeFrontend/QuoteRequestForm'>
                  <div className="sm:col-span-2" data-api-unique-id='quoterequestform-rc04334f00b7fc8e2-s472664262' data-api-unique-page-name='src/frontend/components/HomeFrontend/QuoteRequestForm'>
                    <label className="block text-xs font-semibold text-foreground mb-1.5" data-api-unique-id='quoterequestform-r2fe48b44830e2b55-s472664262' data-api-unique-page-name='src/frontend/components/HomeFrontend/QuoteRequestForm'>
                      {lang === "de" ? "Kurze Aufgabenbeschreibung *" : lang === "ru" ? "Краткое описание задачи *" : "Task Headline / Brief Summary *"}
                    </label>
                    <input type="text" required value={taskTitle} onChange={e => setTaskTitle(e.target.value)} placeholder={lang === "de" ? "z.B. IKEA PAX 3-türig aufbauen und TV an Wand montieren" : lang === "ru" ? "напр., Собрать 3-дверный шкаф ПАКС и повесить ТВ на стену" : "e.g., Assemble 3-door IKEA PAX wardrobe and mount 55' TV"} className="w-full rounded-md border border-input bg-card px-3 py-2 text-sm text-card-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring" data-api-unique-id='quoterequestform-rcaa4e73e4fb6bb54-s472664262' data-api-unique-page-name='src/frontend/components/HomeFrontend/QuoteRequestForm' />
                  </div>
                  <div data-api-unique-id='quoterequestform-rb6579360a305649c-s472664262' data-api-unique-page-name='src/frontend/components/HomeFrontend/QuoteRequestForm'>
                    <label className="block text-xs font-semibold text-foreground mb-1.5" data-api-unique-id='quoterequestform-rb1b9aa23149cee79-s472664262' data-api-unique-page-name='src/frontend/components/HomeFrontend/QuoteRequestForm'>
                      {lang === "de" ? "Adresse / Straße" : lang === "ru" ? "Улица / Адрес" : "Address Snippet"}
                    </label>
                    <input type="text" value={addressSnippet} onChange={e => setAddressSnippet(e.target.value)} placeholder="e.g. Herrengasse 14" className="w-full rounded-md border border-input bg-card px-3 py-2 text-sm text-card-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring" data-api-unique-id='quoterequestform-rd2ee59b31d9c7256-s472664262' data-api-unique-page-name='src/frontend/components/HomeFrontend/QuoteRequestForm' />
                  </div>
                </div>

                {/* Row 3: Detailed Description */}
                <div data-api-unique-id='quoterequestform-r6fc6407757e1d14b-s472664262' data-api-unique-page-name='src/frontend/components/HomeFrontend/QuoteRequestForm'>
                  <label className="block text-xs font-semibold text-foreground mb-1.5" data-api-unique-id='quoterequestform-r7d51c1da523ce468-s472664262' data-api-unique-page-name='src/frontend/components/HomeFrontend/QuoteRequestForm'>
                    {lang === "de" ? "Detailangaben & Besonderheiten (Altbau, Deckenhöhe etc.)" : lang === "ru" ? "Подробности (высота потолков, тип стен и т.д.)" : "Detailed Notes (Altbau walls, ceiling height, special fixtures)"}
                  </label>
                  <textarea rows={3} value={taskDescription} onChange={e => setTaskDescription(e.target.value)} placeholder={lang === "de" ? "Altbau-Ziegelwand vorhanden, 3. Stock ohne Lift, Parkett bereits verlegt..." : lang === "ru" ? "Кирпичные стены в старом фонде, 3 этаж без лифта, паркет..." : "Solid brick Altbau wall, 3rd floor without elevator, please bring Fischer Altbau dowels..."} className="w-full rounded-md border border-input bg-card px-3 py-2 text-sm text-card-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring" data-api-unique-id='quoterequestform-r52c8a7e33da5b60e-s472664262' data-api-unique-page-name='src/frontend/components/HomeFrontend/QuoteRequestForm' />
                </div>

                {/* Row 4: Photo attachment placeholder + Materials + Urgency checkbox */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-center pt-1" data-api-unique-id='quoterequestform-r17ec386ce0b8cf15-s472664262' data-api-unique-page-name='src/frontend/components/HomeFrontend/QuoteRequestForm'>
                  <div data-api-unique-id='quoterequestform-re8c8c5e1cd918345-s472664262' data-api-unique-page-name='src/frontend/components/HomeFrontend/QuoteRequestForm'>
                    <label className="block text-xs font-semibold text-foreground mb-1.5" data-api-unique-id='quoterequestform-r5238fca7ae1f838e-s472664262' data-api-unique-page-name='src/frontend/components/HomeFrontend/QuoteRequestForm'>
                      {lang === "de" ? "Fotos / Skizzen anhängen" : lang === "ru" ? "Прикрепить фото / схему" : "Attach Photos / Room Layout (Optional)"}
                    </label>
                    <div className="flex items-center gap-2" data-api-unique-id='quoterequestform-r4e7e1daa06025c30-s472664262' data-api-unique-page-name='src/frontend/components/HomeFrontend/QuoteRequestForm'>
                      <label className="cursor-pointer inline-flex items-center gap-1.5 rounded-md border border-border bg-muted px-3 py-2 text-xs font-medium text-muted-foreground hover:bg-secondary hover:text-secondary-foreground transition-colors" data-api-unique-id='quoterequestform-r1ef8fc63f6228740-s472664262' data-api-unique-page-name='src/frontend/components/HomeFrontend/QuoteRequestForm'>
                        <Paperclip className="h-3.5 w-3.5" data-api-unique-id='quoterequestform-r55855cca32e5a8e9-s472664262' data-api-unique-page-name='src/frontend/components/HomeFrontend/QuoteRequestForm' />
                        <span data-api-unique-id='quoterequestform-r3c8685797d0d9254-s472664262' data-api-unique-page-name='src/frontend/components/HomeFrontend/QuoteRequestForm'>{attachedFileName ? "Change file" : "Select image/PDF"}</span>
                        <input type="file" className="hidden" onChange={e => {
                      const file = e.target.files?.[0];
                      if (file) {
                        setAttachedFileName(file.name);
                        toast.info(`Attached: ${file.name}`);
                      }
                    }} data-api-unique-id='quoterequestform-r9d14c940c97942ee-s472664262' data-api-unique-page-name='src/frontend/components/HomeFrontend/QuoteRequestForm' />
                      </label>
                      {attachedFileName && <span className="text-xs text-foreground truncate max-w-[120px]" data-api-unique-id='quoterequestform-r17b51cb223e2bb11-s472664262' data-api-unique-page-name='src/frontend/components/HomeFrontend/QuoteRequestForm'>
                          {attachedFileName}
                        </span>}
                    </div>
                  </div>

                  <div className="flex items-center gap-2 pt-2 sm:pt-4" data-api-unique-id='quoterequestform-r92d59ec1bf8c55af-s472664262' data-api-unique-page-name='src/frontend/components/HomeFrontend/QuoteRequestForm'>
                    <input type="checkbox" id="materialsCheckbox" checked={hasMaterials} onChange={e => setHasMaterials(e.target.checked)} className="h-4 w-4 rounded border-input text-primary focus:ring-ring" data-api-unique-id='quoterequestform-r8ed91265cf5d5217-s472664262' data-api-unique-page-name='src/frontend/components/HomeFrontend/QuoteRequestForm' />
                    <label htmlFor="materialsCheckbox" className="text-xs text-muted-foreground cursor-pointer" data-api-unique-id='quoterequestform-rbbdc859cfd7401ab-s472664262' data-api-unique-page-name='src/frontend/components/HomeFrontend/QuoteRequestForm'>
                      {lang === "de" ? "Ich stelle alle Baustoffe selbst" : lang === "ru" ? "Материалы имеются в наличии" : "I will provide all parts & materials"}
                    </label>
                  </div>

                  <div className="flex items-center gap-2 pt-2 sm:pt-4" data-api-unique-id='quoterequestform-r0a023a3151b417d2-s472664262' data-api-unique-page-name='src/frontend/components/HomeFrontend/QuoteRequestForm'>
                    <input type="checkbox" id="urgentCheckbox" checked={isUrgent} onChange={e => setIsUrgent(e.target.checked)} className="h-4 w-4 rounded border-input text-primary focus:ring-ring" data-api-unique-id='quoterequestform-r37db45dcd996a408-s472664262' data-api-unique-page-name='src/frontend/components/HomeFrontend/QuoteRequestForm' />
                    <label htmlFor="urgentCheckbox" className="text-xs font-medium text-warning flex items-center gap-1 cursor-pointer" data-api-unique-id='quoterequestform-r7d257f31e4e18bc9-s472664262' data-api-unique-page-name='src/frontend/components/HomeFrontend/QuoteRequestForm'>
                      <Flame className="h-3.5 w-3.5" data-api-unique-id='quoterequestform-r293aeeb625631978-s472664262' data-api-unique-page-name='src/frontend/components/HomeFrontend/QuoteRequestForm' />
                      <span data-api-unique-id='quoterequestform-r2d162ed972b02742-s472664262' data-api-unique-page-name='src/frontend/components/HomeFrontend/QuoteRequestForm'>
                        {lang === "de" ? "Express-Termin (+€35)" : lang === "ru" ? "Срочный выезд (+€35)" : "Urgent Express Slot (+€35)"}
                      </span>
                    </label>
                  </div>
                </div>

                {/* Row 5: Schedule & Estimated Hours */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2 border-t border-border" data-api-unique-id='quoterequestform-r6c6036b2e0baeac6-s472664262' data-api-unique-page-name='src/frontend/components/HomeFrontend/QuoteRequestForm'>
                  <div data-api-unique-id='quoterequestform-r24061db2401dd81b-s472664262' data-api-unique-page-name='src/frontend/components/HomeFrontend/QuoteRequestForm'>
                    <label className="block text-xs font-semibold text-foreground mb-1.5" data-api-unique-id='quoterequestform-r461269adb275d772-s472664262' data-api-unique-page-name='src/frontend/components/HomeFrontend/QuoteRequestForm'>
                      {lang === "de" ? "Wunschdatum" : lang === "ru" ? "Желаемая дата" : "Preferred Date"}
                    </label>
                    <input type="date" value={preferredDate} onChange={e => setPreferredDate(e.target.value)} className="w-full rounded-md border border-input bg-card px-3 py-2 text-sm text-card-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring" data-api-unique-id='quoterequestform-r521acfbaf9349cf7-s472664262' data-api-unique-page-name='src/frontend/components/HomeFrontend/QuoteRequestForm' />
                  </div>

                  <div data-api-unique-id='quoterequestform-r2fcf631222e01f8d-s472664262' data-api-unique-page-name='src/frontend/components/HomeFrontend/QuoteRequestForm'>
                    <label className="block text-xs font-semibold text-foreground mb-1.5" data-api-unique-id='quoterequestform-r89d6882629ac4812-s472664262' data-api-unique-page-name='src/frontend/components/HomeFrontend/QuoteRequestForm'>
                      {lang === "de" ? "Tageszeit" : lang === "ru" ? "Время суток" : "Time Window"}
                    </label>
                    <Select value={preferredTimeSlot} onValueChange={val => setPreferredTimeSlot(val as PreferredTimeSlot)} data-api-unique-id='quoterequestform-rb63e467b3d286708-s472664262' data-api-unique-page-name='src/frontend/components/HomeFrontend/QuoteRequestForm'>
                      <SelectTrigger className="w-full bg-card text-card-foreground" data-api-unique-id='quoterequestform-r303fa296d52d6e91-s472664262' data-api-unique-page-name='src/frontend/components/HomeFrontend/QuoteRequestForm'>
                        <SelectValue placeholder="Select time slot" data-api-unique-id='quoterequestform-r057a207019d3065f-s472664262' data-api-unique-page-name='src/frontend/components/HomeFrontend/QuoteRequestForm'>
                          {timeSlotLabels[preferredTimeSlot]}
                        </SelectValue>
                      </SelectTrigger>
                      <SelectContent data-api-unique-id='quoterequestform-r15acf4a8247b5387-s472664262' data-api-unique-page-name='src/frontend/components/HomeFrontend/QuoteRequestForm'>
                        <SelectItem value="MORNING" data-api-unique-id='quoterequestform-rd44c2761d941c836-s472664262' data-api-unique-page-name='src/frontend/components/HomeFrontend/QuoteRequestForm'>{timeSlotLabels.MORNING}</SelectItem>
                        <SelectItem value="AFTERNOON" data-api-unique-id='quoterequestform-re9097f76864f6958-s472664262' data-api-unique-page-name='src/frontend/components/HomeFrontend/QuoteRequestForm'>{timeSlotLabels.AFTERNOON}</SelectItem>
                        <SelectItem value="FLEXIBLE" data-api-unique-id='quoterequestform-r52993b5229b92f0d-s472664262' data-api-unique-page-name='src/frontend/components/HomeFrontend/QuoteRequestForm'>{timeSlotLabels.FLEXIBLE}</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div data-api-unique-id='quoterequestform-rb9e0a95ae26c47a1-s472664262' data-api-unique-page-name='src/frontend/components/HomeFrontend/QuoteRequestForm'>
                    <label className="block text-xs font-semibold text-foreground mb-1.5" data-api-unique-id='quoterequestform-r3b9d138d8e1bde31-s472664262' data-api-unique-page-name='src/frontend/components/HomeFrontend/QuoteRequestForm'>
                      {lang === "de" ? "Geschätzte Stunden" : lang === "ru" ? "Оценка часов" : "Estimated Hours"}
                    </label>
                    <div className="flex items-center gap-2" data-api-unique-id='quoterequestform-r546899043273b885-s472664262' data-api-unique-page-name='src/frontend/components/HomeFrontend/QuoteRequestForm'>
                      <input type="range" min="1" max="8" value={estimatedHours} onChange={e => setEstimatedHours(parseInt(e.target.value, 10))} className="flex-1 accent-primary" data-api-unique-id='quoterequestform-r9ddfc1fba95aa9b5-s472664262' data-api-unique-page-name='src/frontend/components/HomeFrontend/QuoteRequestForm' />
                      <span className="font-display font-bold text-sm text-foreground w-10 text-right" data-api-unique-id='quoterequestform-rd01da56d3813f8f6-s472664262' data-api-unique-page-name='src/frontend/components/HomeFrontend/QuoteRequestForm'>
                        {estimatedHours} h
                      </span>
                    </div>
                  </div>
                </div>

                {/* Row 6: Contact Details */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2 border-t border-border" data-api-unique-id='quoterequestform-r1cc143c6fcb6cd30-s472664262' data-api-unique-page-name='src/frontend/components/HomeFrontend/QuoteRequestForm'>
                  <div data-api-unique-id='quoterequestform-r727b76d69f3b2a51-s472664262' data-api-unique-page-name='src/frontend/components/HomeFrontend/QuoteRequestForm'>
                    <label className="block text-xs font-semibold text-foreground mb-1.5" data-api-unique-id='quoterequestform-ra316990816ff0fc7-s472664262' data-api-unique-page-name='src/frontend/components/HomeFrontend/QuoteRequestForm'>
                      {lang === "de" ? "Ihr Name *" : "Your Name *"}
                    </label>
                    <input type="text" required value={clientName} onChange={e => setClientName(e.target.value)} placeholder="e.g. Thomas Bauer" className="w-full rounded-md border border-input bg-card px-3 py-2 text-sm text-card-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring" data-api-unique-id='quoterequestform-r00623db172b1c8eb-s472664262' data-api-unique-page-name='src/frontend/components/HomeFrontend/QuoteRequestForm' />
                  </div>

                  <div data-api-unique-id='quoterequestform-rfba2c40c8e4f37f3-s472664262' data-api-unique-page-name='src/frontend/components/HomeFrontend/QuoteRequestForm'>
                    <label className="block text-xs font-semibold text-foreground mb-1.5" data-api-unique-id='quoterequestform-r7154b904bc02cf43-s472664262' data-api-unique-page-name='src/frontend/components/HomeFrontend/QuoteRequestForm'>
                      {lang === "de" ? "Telefonnummer *" : "Phone Number *"}
                    </label>
                    <input type="tel" required value={clientPhone} onChange={e => setClientPhone(e.target.value)} placeholder="+43 676 1234567" className="w-full rounded-md border border-input bg-card px-3 py-2 text-sm text-card-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring" data-api-unique-id='quoterequestform-r256766c4a8025ae0-s472664262' data-api-unique-page-name='src/frontend/components/HomeFrontend/QuoteRequestForm' />
                  </div>

                  <div data-api-unique-id='quoterequestform-r9d61394def80f310-s472664262' data-api-unique-page-name='src/frontend/components/HomeFrontend/QuoteRequestForm'>
                    <label className="block text-xs font-semibold text-foreground mb-1.5" data-api-unique-id='quoterequestform-r1dc1884b2220e5d9-s472664262' data-api-unique-page-name='src/frontend/components/HomeFrontend/QuoteRequestForm'>
                      {lang === "de" ? "E-Mail (optional)" : "Email (Optional)"}
                    </label>
                    <input type="email" value={clientEmail} onChange={e => setClientEmail(e.target.value)} placeholder="bauer@example.at" className="w-full rounded-md border border-input bg-card px-3 py-2 text-sm text-card-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring" data-api-unique-id='quoterequestform-r5691513750ae163e-s472664262' data-api-unique-page-name='src/frontend/components/HomeFrontend/QuoteRequestForm' />
                  </div>
                </div>

                {/* Submit Action */}
                <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4" data-api-unique-id='quoterequestform-r23db6801799fc3ab-s472664262' data-api-unique-page-name='src/frontend/components/HomeFrontend/QuoteRequestForm'>
                  <div className="flex items-center gap-2" data-api-unique-id='quoterequestform-rc5f1c46ab1bbcb06-s472664262' data-api-unique-page-name='src/frontend/components/HomeFrontend/QuoteRequestForm'>
                    <input type="checkbox" id="agreedToTerms" checked={agreedToTerms} onChange={e => setAgreedToTerms(e.target.checked)} className="h-4 w-4 rounded border-input text-primary focus:ring-ring" data-api-unique-id='quoterequestform-r7fe8121f3888aab1-s472664262' data-api-unique-page-name='src/frontend/components/HomeFrontend/QuoteRequestForm' />
                    <label htmlFor="agreedToTerms" className="text-sm sm:text-base font-semibold text-foreground cursor-pointer leading-relaxed" data-api-unique-id='quoterequestform-r3e87b87714f42272-s472664262' data-api-unique-page-name='src/frontend/components/HomeFrontend/QuoteRequestForm'>
                      {lang === "de" ? "Mit dem Absenden stimmen Sie der Kontaktaufnahme zur Angebotserstellung gemäß DSGVO zu." : lang === "ru" ? "Нажимая кнопку, вы соглашаетесь на обработку данных для составления сметы согласно DSGVO." : "By submitting, you agree to contact for quote preparation in accordance with GDPR."}
                    </label>
                  </div>

                  <button type="submit" disabled={isSubmitting} className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-md bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-primary transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring shrink-0 disabled:opacity-70 disabled:cursor-not-allowed" data-api-unique-id='quoterequestform-rcbe754647478b2c9-s472664262' data-api-unique-page-name='src/frontend/components/HomeFrontend/QuoteRequestForm'>
                    {isSubmitting ? <Loader2 className="h-4 w-4 animate-spin" data-api-unique-id='quoterequestform-r3781e2979e83383f-s472664262' data-api-unique-page-name='src/frontend/components/HomeFrontend/QuoteRequestForm' /> : <Send className="h-4 w-4" data-api-unique-id='quoterequestform-r9981396babe89efc-s472664262' data-api-unique-page-name='src/frontend/components/HomeFrontend/QuoteRequestForm' />}
                    <span data-api-unique-id='quoterequestform-r0aa93d6d9ff4a6c1-s472664262' data-api-unique-page-name='src/frontend/components/HomeFrontend/QuoteRequestForm'>
                      {isSubmitting ? lang === "de" ? "Wird übermittelt..." : lang === "ru" ? "Отправка..." : "Submitting..." : lang === "de" ? "Unverbindlich anfragen" : lang === "ru" ? "Отправить заявку" : "Submit Quote Request"}
                    </span>
                  </button>
                </div>
              </form>}
          </div>

          {/* Right Column: Instant Live Estimate & Direct Contact (4 cols) */}
          <div className="lg:col-span-4 space-y-4" data-api-unique-id='quoterequestform-r533ce898b257ba1c-s472664262' data-api-unique-page-name='src/frontend/components/HomeFrontend/QuoteRequestForm'>
            {/* Live Calculation Box */}
            <div className="rounded-xl border border-border bg-background text-foreground p-5 shadow-soft" data-api-unique-id='quoterequestform-rb67f07f893108edf-s472664262' data-api-unique-page-name='src/frontend/components/HomeFrontend/QuoteRequestForm'>
              <div className="flex items-center justify-between border-b border-border pb-3 mb-3" data-api-unique-id='quoterequestform-rbcdd676da3cca4f3-s472664262' data-api-unique-page-name='src/frontend/components/HomeFrontend/QuoteRequestForm'>
                <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground" data-api-unique-id='quoterequestform-rddae4a97f5e99626-s472664262' data-api-unique-page-name='src/frontend/components/HomeFrontend/QuoteRequestForm'>
                  Live Estimate Preview
                </span>
                <span className="inline-flex items-center rounded-sm bg-muted text-muted-foreground px-1.5 py-0.5 text-[10px] border border-border" data-api-unique-id='quoterequestform-rb311d9ae138fa601-s472664262' data-api-unique-page-name='src/frontend/components/HomeFrontend/QuoteRequestForm'>
                  Vienna 1.–23.
                </span>
              </div>

              <div className="space-y-2 text-xs" data-api-unique-id='quoterequestform-r6abd7bf54ec34698-s472664262' data-api-unique-page-name='src/frontend/components/HomeFrontend/QuoteRequestForm'>
                <div className="flex justify-between text-muted-foreground" data-api-unique-id='quoterequestform-r2195942f772286f2-s472664262' data-api-unique-page-name='src/frontend/components/HomeFrontend/QuoteRequestForm'>
                  <span data-api-unique-id='quoterequestform-r6947d1efdccb504d-s472664262' data-api-unique-page-name='src/frontend/components/HomeFrontend/QuoteRequestForm'>Selected Category:</span>
                  <span className="font-medium text-foreground truncate max-w-[140px]" data-api-unique-id='quoterequestform-r9b0e656fb1103255-s472664262' data-api-unique-page-name='src/frontend/components/HomeFrontend/QuoteRequestForm'>
                    {selectedService ? getServiceTitle(selectedService, lang) : "—"}
                  </span>
                </div>
                <div className="flex justify-between text-muted-foreground" data-api-unique-id='quoterequestform-rbdd0c2dcbfbac49b-s472664262' data-api-unique-page-name='src/frontend/components/HomeFrontend/QuoteRequestForm'>
                  <span data-api-unique-id='quoterequestform-r93ddeeb66935610e-s472664262' data-api-unique-page-name='src/frontend/components/HomeFrontend/QuoteRequestForm'>Base Rate:</span>
                  <span className="font-medium text-foreground" data-api-unique-id='quoterequestform-r94fca93c6ea83ade-s472664262' data-api-unique-page-name='src/frontend/components/HomeFrontend/QuoteRequestForm'>
                    €{ratePerHour} / hour
                  </span>
                </div>
                <div className="flex justify-between text-muted-foreground" data-api-unique-id='quoterequestform-r34599852fb4ac54e-s472664262' data-api-unique-page-name='src/frontend/components/HomeFrontend/QuoteRequestForm'>
                  <span data-api-unique-id='quoterequestform-r26ec6d04957cb56d-s472664262' data-api-unique-page-name='src/frontend/components/HomeFrontend/QuoteRequestForm'>Hours Planned:</span>
                  <span className="font-medium text-foreground" data-api-unique-id='quoterequestform-ree30728550980862-s472664262' data-api-unique-page-name='src/frontend/components/HomeFrontend/QuoteRequestForm'>
                    {estimatedHours} hrs
                  </span>
                </div>
                <div className="flex justify-between text-muted-foreground" data-api-unique-id='quoterequestform-rcbf083dc7794d037-s472664262' data-api-unique-page-name='src/frontend/components/HomeFrontend/QuoteRequestForm'>
                  <span data-api-unique-id='quoterequestform-rd0e90902c5f6168e-s472664262' data-api-unique-page-name='src/frontend/components/HomeFrontend/QuoteRequestForm'>Travel Flat Allowance:</span>
                  <span className="font-medium text-foreground" data-api-unique-id='quoterequestform-rd56e0800e3f17f7f-s472664262' data-api-unique-page-name='src/frontend/components/HomeFrontend/QuoteRequestForm'>€20.00</span>
                </div>
                {isUrgent && <div className="flex justify-between text-warning font-medium" data-api-unique-id='quoterequestform-r4a9be1f30a761709-s472664262' data-api-unique-page-name='src/frontend/components/HomeFrontend/QuoteRequestForm'>
                    <span data-api-unique-id='quoterequestform-rf232d250aed78159-s472664262' data-api-unique-page-name='src/frontend/components/HomeFrontend/QuoteRequestForm'>Express Dispatch Surcharge:</span>
                    <span data-api-unique-id='quoterequestform-rd4560399246aa425-s472664262' data-api-unique-page-name='src/frontend/components/HomeFrontend/QuoteRequestForm'>€35.00</span>
                  </div>}

                <div className="pt-3 border-t border-border flex justify-between items-baseline" data-api-unique-id='quoterequestform-r91320a992e99c27c-s472664262' data-api-unique-page-name='src/frontend/components/HomeFrontend/QuoteRequestForm'>
                  <span className="font-display font-semibold text-foreground text-sm" data-api-unique-id='quoterequestform-r8eb3dc6f8fa73571-s472664262' data-api-unique-page-name='src/frontend/components/HomeFrontend/QuoteRequestForm'>
                    Est. Labor Total:
                  </span>
                  <span className="font-display text-xl font-bold text-primary" data-api-unique-id='quoterequestform-r645088a6980ecdec-s472664262' data-api-unique-page-name='src/frontend/components/HomeFrontend/QuoteRequestForm'>
                    ~ €{estimatedTotalEur}
                  </span>
                </div>
              </div>

              <div className="mt-4 rounded bg-muted text-muted-foreground p-2.5 text-[11px] border border-border flex items-start gap-2" data-api-unique-id='quoterequestform-r44b8314216fbdc02-s472664262' data-api-unique-page-name='src/frontend/components/HomeFrontend/QuoteRequestForm'>
                <ShieldAlert className="h-3.5 w-3.5 text-warning shrink-0 mt-0.5" data-api-unique-id='quoterequestform-r34537e87fbb03f06-s472664262' data-api-unique-page-name='src/frontend/components/HomeFrontend/QuoteRequestForm' />
                <span data-api-unique-id='quoterequestform-r1dfb1cd8053fa27c-s472664262' data-api-unique-page-name='src/frontend/components/HomeFrontend/QuoteRequestForm'>
                  Final quote verified on-site before commencing work. No advance payment required.
                </span>
              </div>
            </div>

            {/* Direct Contact triggers */}
            <div className="rounded-xl border border-border bg-background text-foreground p-5 shadow-soft space-y-3" data-api-unique-id='quoterequestform-r942fc5bf39d09899-s472664262' data-api-unique-page-name='src/frontend/components/HomeFrontend/QuoteRequestForm'>
              <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground block" data-api-unique-id='quoterequestform-r88b4d1896e559dc3-s472664262' data-api-unique-page-name='src/frontend/components/HomeFrontend/QuoteRequestForm'>
                Direct Contact Channels
              </span>

              <a href="tel:+431234567890" className="flex items-center justify-between rounded-md border border-border bg-card text-card-foreground p-3 transition-colors hover:bg-muted" data-api-unique-id='quoterequestform-r0b3a759585c28e5e-s472664262' data-api-unique-page-name='src/frontend/components/HomeFrontend/QuoteRequestForm'>
                <div className="flex items-center gap-3" data-api-unique-id='quoterequestform-r6bc45277d31efbf6-s472664262' data-api-unique-page-name='src/frontend/components/HomeFrontend/QuoteRequestForm'>
                  <div className="inline-flex h-8 w-8 items-center justify-center rounded-md bg-muted text-primary" data-api-unique-id='quoterequestform-rc687f2284ed522fa-s472664262' data-api-unique-page-name='src/frontend/components/HomeFrontend/QuoteRequestForm'>
                    <Phone className="h-4 w-4" data-api-unique-id='quoterequestform-ra241ea18d4826293-s472664262' data-api-unique-page-name='src/frontend/components/HomeFrontend/QuoteRequestForm' />
                  </div>
                  <div data-api-unique-id='quoterequestform-rb11887ff97bfa873-s472664262' data-api-unique-page-name='src/frontend/components/HomeFrontend/QuoteRequestForm'>
                    <div className="text-xs font-semibold text-foreground" data-api-unique-id='quoterequestform-r34a1544451dc2f8d-s472664262' data-api-unique-page-name='src/frontend/components/HomeFrontend/QuoteRequestForm'>
                      Direct Hotline
                    </div>
                    <div className="text-xs text-muted-foreground" data-api-unique-id='quoterequestform-r64713e19986094cb-s472664262' data-api-unique-page-name='src/frontend/components/HomeFrontend/QuoteRequestForm'>
                      +43 66 567 284 985
                    </div>
                  </div>
                </div>
                <span className="text-[11px] font-medium text-primary" data-api-unique-id='quoterequestform-ree9fb9e0a17b8449-s472664262' data-api-unique-page-name='src/frontend/components/HomeFrontend/QuoteRequestForm'>Call</span>
              </a>

              <a href="https://wa.me/431234567890" target="_blank" rel="noreferrer" className="flex items-center justify-between rounded-md border border-border bg-card text-card-foreground p-3 transition-colors hover:bg-muted" data-api-unique-id='quoterequestform-r67196df79ab0de9b-s472664262' data-api-unique-page-name='src/frontend/components/HomeFrontend/QuoteRequestForm'>
                <div className="flex items-center gap-3" data-api-unique-id='quoterequestform-r7071c0f8d7a7cc1d-s472664262' data-api-unique-page-name='src/frontend/components/HomeFrontend/QuoteRequestForm'>
                  <div className="inline-flex h-8 w-8 items-center justify-center rounded-md bg-muted text-success" data-api-unique-id='quoterequestform-r38a3dd8ffac61f63-s472664262' data-api-unique-page-name='src/frontend/components/HomeFrontend/QuoteRequestForm'>
                    <MessageCircle className="h-4 w-4" data-api-unique-id='quoterequestform-r7debaa8665ecaa52-s472664262' data-api-unique-page-name='src/frontend/components/HomeFrontend/QuoteRequestForm' />
                  </div>
                  <div data-api-unique-id='quoterequestform-r529956c0217d60e7-s472664262' data-api-unique-page-name='src/frontend/components/HomeFrontend/QuoteRequestForm'>
                    <div className="text-xs font-semibold text-foreground" data-api-unique-id='quoterequestform-r465b09f6edf084fd-s472664262' data-api-unique-page-name='src/frontend/components/HomeFrontend/QuoteRequestForm'>
                      WhatsApp Quick Chat
                    </div>
                    <div className="text-xs text-muted-foreground" data-api-unique-id='quoterequestform-r88578bfec2dfe1f5-s472664262' data-api-unique-page-name='src/frontend/components/HomeFrontend/QuoteRequestForm'>
                      Send photos directly
                    </div>
                  </div>
                </div>
                <span className="text-[11px] font-medium text-success" data-api-unique-id='quoterequestform-ra6493dc3fe64bbde-s472664262' data-api-unique-page-name='src/frontend/components/HomeFrontend/QuoteRequestForm'>Chat</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>;
}