"use client";

import { useEffect, useState } from "react";
export type HandymanLocale = "de" | "en" | "ru";
function readLocale(): HandymanLocale {
  if (typeof window === "undefined") return "de";
  const value = window.localStorage.getItem("handyman-language")?.toLowerCase();
  return value === "en" || value === "ru" || value === "de" ? value : "de";
}
export function useHandymanLocale(): HandymanLocale {
  const [locale, setLocale] = useState<HandymanLocale>("de");
  useEffect(() => {
    setLocale(readLocale());
    const onChange = (event: Event) => {
      const value = (event as CustomEvent<string>).detail?.toLowerCase();
      if (value === "de" || value === "en" || value === "ru") setLocale(value);
    };
    const onStorage = () => setLocale(readLocale());
    window.addEventListener("handyman-language-change", onChange);
    window.addEventListener("storage", onStorage);
    return () => { window.removeEventListener("handyman-language-change", onChange); window.removeEventListener("storage", onStorage); };
  }, []);
  return locale;
}
export function localizedCategory<T extends { titleDe: string; titleEn: string; titleRu: string; descriptionDe?: string | null; descriptionEn?: string | null; descriptionRu?: string | null }>(item: T, locale: HandymanLocale) {
  return { title: locale === "de" ? item.titleDe : locale === "ru" ? item.titleRu : item.titleEn, description: locale === "de" ? item.descriptionDe || item.descriptionEn : locale === "ru" ? item.descriptionRu || item.descriptionEn : item.descriptionEn };
}


const catalogCopy = {
  noMatches: { de: "Keine passenden Gewerke gefunden", en: "No matching service categories found", ru: "Подходящие категории услуг не найдены" },
  noMatchesHelp: { de: "Für diese Suchanfrage oder den gewählten Gewerbefilter wurden keine passenden Leistungen gefunden.", en: "No service matched your search or selected trade classification.", ru: "По вашему запросу или выбранному фильтру услуги не найдены." },
  resetFilters: { de: "Filter zurücksetzen", en: "Reset filters", ru: "Сбросить фильтры" },
  catalogTitle: { de: "Alle Handwerksleistungen nach österreichischer Gewerbeordnung", en: "All services under Austrian trade regulations", ru: "Все услуги согласно австрийским правилам ремесленной деятельности" },
  catalogDescription: { de: "Transparente Stundensätze ab 15 €/h. Leistungsumfang gemäß österreichischer Gewerbeordnung.", en: "Transparent hourly rates from €15/h. Services are subject to Austrian trade regulations.", ru: "Прозрачные почасовые ставки от 15 €/ч. Услуги оказываются с учётом австрийских правил." },
  startingRate: { de: "Stundensatz ab", en: "Starting hourly rate", ru: "Почасовая ставка от" },
  typicalRange: { de: "Üblicher Preisrahmen", en: "Typical price range", ru: "Обычный диапазон цен" },
  viewEstimate: { de: "Leistungsumfang und Kostenschätzung", en: "View scope and estimate", ru: "Объём работ и оценка стоимости" },
  flagship: { de: "Besondere Leistungen im Überblick", en: "Featured services", ru: "Рекомендуемые услуги" },
  startingHourly: { de: "Stundensatz ab", en: "Starting hourly rate", ru: "Почасовая ставка от" },
  typical: { de: "Typischer Preisrahmen", en: "Typical range", ru: "Обычный диапазон" },
  permittedScope: { de: "Zulässiger Leistungsumfang gemäß GewO 1994", en: "Permitted scope under GewO 1994", ru: "Разрешённый объём работ по GewO 1994" },
  viewSpecs: { de: "Leistungsdetails anzeigen", en: "View specifications", ru: "Посмотреть детали услуги" },
  baselineRate: { de: "Grund-Stundensatz", en: "Baseline hourly rate", ru: "Базовая почасовая ставка" },
  rateRange: { de: "Üblicher Preisrahmen:", en: "Typical rate range:", ru: "Обычный диапазон цен:" },
  leadArtisan: { de: "Zuständiger Handwerker:", en: "Lead artisan assigned:", ru: "Назначенный мастер:" },
  overview: { de: "Leistungsübersicht und Details", en: "Service overview and specifications", ru: "Описание и характеристики услуги" },
  permittedTasks: { de: "Gesetzlich zulässige Arbeiten (GewO 1994)", en: "Legally permitted tasks (GewO 1994)", ru: "Разрешённые законом работы (GewO 1994)" },
  restrictedTasks: { de: "Meisterpflichtige Tätigkeiten", en: "Tasks requiring a master qualification", ru: "Работы, требующие квалификации мастера" },
  instantCost: { de: "Unverbindliche Kostenberechnung", en: "Instant cost estimate", ru: "Предварительный расчёт стоимости" },
  estimatedHours: { de: "Geschätzte Stunden:", en: "Estimated hours:", ru: "Ориентировочно часов:" },
  indicative: { de: "* Richtwert auf Basis des Stundensatzes. Ein verbindliches Angebot erfolgt nach kurzer Besichtigung oder anhand von Fotos.", en: "* Indicative estimate based on the hourly rate. A fixed quote requires a brief inspection or photos.", ru: "* Ориентировочная оценка по почасовой ставке. Точная смета составляется после осмотра или по фотографиям." },
  detailPage: { de: "Detaillierte Leistungsseite öffnen", en: "Open service details", ru: "Открыть подробное описание услуги" },
  requestQuote: { de: "Angebot für diese Leistung anfordern", en: "Request a quote for this service", ru: "Запросить смету на эту услугу" },
  searchPlaceholder: { de: "Leistungen suchen (z. B. Möbelmontage, Parkett, Trockenbau)…", en: "Search services (e.g. furniture assembly, flooring, drywall)…", ru: "Поиск услуг (например, сборка мебели, полы, гипсокартон)…" },
  clear: { de: "Löschen", en: "Clear", ru: "Очистить" },
  showing: { de: "Angezeigt", en: "Showing", ru: "Показано" },
  of: { de: "von", en: "of", ru: "из" },
  services: { de: "Leistungen", en: "services", ru: "услуг" },
  filterActive: { de: "Filter aktiv", en: "Filter active", ru: "Фильтр активен" },
  allCrafts: { de: "Alle Gewerke", en: "All services", ru: "Все услуги" },
  classification: { de: "Gewerbliche Einordnung:", en: "Trade classification:", ru: "Категория деятельности:" },
  freeTrade: { de: "Freies Gewerbe", en: "Non-regulated trade", ru: "Свободный вид деятельности" },
  masterCoop: { de: "Meisterkooperation", en: "Master-craft cooperation", ru: "Сотрудничество с мастером" },
};
export function catalogText(key: keyof typeof catalogCopy, locale: HandymanLocale): string { return catalogCopy[key][locale]; }
