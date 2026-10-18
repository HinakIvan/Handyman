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
