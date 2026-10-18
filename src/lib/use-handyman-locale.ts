"use client";
import { useEffect, useState } from "react";
export type HandymanLocale = "de" | "en" | "ru";
export function useHandymanLocale(): HandymanLocale {
 const [locale, setLocale] = useState<HandymanLocale>(() => { if (typeof window === "undefined") return "de"; const v = window.localStorage.getItem("handyman-language"); return v === "en" || v === "ru" || v === "de" ? v : "de"; });
 useEffect(() => { const sync = (value?: string) => { const v = value || window.localStorage.getItem("handyman-language") || "de"; if (v === "de" || v === "en" || v === "ru") setLocale(v); }; const onEvent = (e: Event) => sync((e as CustomEvent<string>).detail); window.addEventListener("handyman-language-change", onEvent); window.addEventListener("storage", () => sync()); return () => window.removeEventListener("handyman-language-change", onEvent); }, []);
 return locale;
}
