"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Globe, ChevronDown, Menu, X, Wrench, User, LogOut, ClipboardList, MessageCircle, Phone, Mail } from "lucide-react";
import { useUserSession } from "@/tools/FrontendSession";
interface NavItemDef {
  id: string;
  label: string;
  href: string;
  authOnly?: boolean;
}
export function Navigation() {
  const pathname = usePathname() || "";
  const router = useRouter();
  const session = useUserSession();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const [moreDropdownOpen, setMoreDropdownOpen] = useState(false);
  const [activeLang, setActiveLang] = useState<"DE" | "EN" | "RU">("DE");
  useEffect(() => {
    const valid = (value: string | null): value is "de" | "en" | "ru" => value === "de" || value === "en" || value === "ru";
    try {
      const saved = window.localStorage.getItem("handyman-language");
      if (valid(saved)) setActiveLang(saved.toUpperCase() as "DE" | "EN" | "RU");
    } catch { /* ignore unavailable storage */ }
    const onLanguageChange = (event: Event) => {
      const value = (event as CustomEvent<string>).detail;
      if (valid(value)) setActiveLang(value.toUpperCase() as "DE" | "EN" | "RU");
    };
    window.addEventListener("handyman-language-change", onLanguageChange);
    return () => window.removeEventListener("handyman-language-change", onLanguageChange);
  }, []);
  const translations = {
    EN: { services: "All Services Catalog", pricing: "Pricing & Legal Scope", areas: "Vienna Service Areas", tracking: "Quotes Tracking", more: "More", signIn: "Sign In", signUp: "Sign Up", quote: "Request a Quote" },
    DE: { services: "Alle Leistungen", pricing: "Preise & rechtlicher Umfang", areas: "Einsatzgebiete Wien", tracking: "Angebotsstatus", more: "Mehr", signIn: "Anmelden", signUp: "Registrieren", quote: "Angebot anfordern" },
    RU: { services: "Все услуги", pricing: "Preise", areas: "Районы обслуживания Вены", tracking: "Статус заявок", more: "Ещё", signIn: "Войти", signUp: "Регистрация", quote: "Запросить смету" },
  };
  const t = translations[activeLang];
  const applyLanguage = (code: "DE" | "EN" | "RU") => {
    setActiveLang(code);
    const value = code.toLowerCase();
    try { window.localStorage.setItem("handyman-language", value); } catch { /* ignore */ }
    window.dispatchEvent(new CustomEvent("handyman-language-change", { detail: value }));
    // Apply the selected language immediately without a full reload. This prevents
    // the default locale from racing with the user's explicit choice.
    const runtime = (window as any).__i18n;
    if (typeof runtime === "function") {
      void runtime(value);
    }
  };
  const [visibleCount, setVisibleCount] = useState<number>(2);
  const navContainerRef = useRef<HTMLDivElement>(null);
  const userMenuRef = useRef<HTMLDivElement>(null);
  const langMenuRef = useRef<HTMLDivElement>(null);
  const moreMenuRef = useRef<HTMLDivElement>(null);
  const isAuthenticated = Boolean(session.token && session.user_id);
  const allNavItems: NavItemDef[] = [{
    id: "services",
    label: t.services,
    href: "/servicescatalog"
  }, ...(isAuthenticated ? [{
    id: "tracking",
    label: t.tracking,
    href: "/customerinquirytracker",
    authOnly: true
  }] : [])];
  const languages = [{
    code: "DE",
    label: "Deutsch (AT)"
  }, {
    code: "EN",
    label: "English"
  }, {
    code: "RU",
    label: "Русский"
  }] as const;

  // Responsive item measurement to avoid overflow clipping
  useEffect(() => {
    const container = navContainerRef.current;
    if (!container) return;
    const measureAndFit = () => {
      const containerWidth = container.offsetWidth;
      if (containerWidth <= 0) return;

      // Approximate item width measurement: avg ~170px per link + gap
      // F02 ("All Services Catalog") ~ 160px, F04 ("Pricing & Legal Scope") ~ 170px, F05 ("Vienna Service Areas") ~ 170px, F07 ~ 140px
      const itemWidths = [165, 175, 175, 150];
      const moreButtonWidth = 90;
      const gap = 20;
      let accumulatedWidth = 0;
      let count = 0;
      for (let i = 0; i < allNavItems.length; i++) {
        const itemW = itemWidths[i] || 160;
        const widthNeeded = i === allNavItems.length - 1 ? accumulatedWidth + itemW + (count > 0 ? gap : 0) : accumulatedWidth + itemW + (count > 0 ? gap : 0) + moreButtonWidth + gap;
        if (widthNeeded <= containerWidth) {
          accumulatedWidth += itemW + (count > 0 ? gap : 0);
          count++;
        } else {
          break;
        }
      }
      setVisibleCount(Math.max(1, count));
    };
    measureAndFit();
    const observer = new ResizeObserver(() => {
      measureAndFit();
    });
    observer.observe(container);
    return () => {
      observer.disconnect();
    };
  }, [allNavItems.length]);

  // Click outside listener for dropdowns
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;
      if (userMenuRef.current && !userMenuRef.current.contains(target)) {
        setUserDropdownOpen(false);
      }
      if (langMenuRef.current && !langMenuRef.current.contains(target)) {
        setLangDropdownOpen(false);
      }
      if (moreMenuRef.current && !moreMenuRef.current.contains(target)) {
        setMoreDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  const visibleItems = allNavItems.slice(0, visibleCount);
  const moreItems = allNavItems.slice(visibleCount);
  const isMoreActive = moreItems.some(item => pathname === "/" ? item.href === "/" : pathname.startsWith(item.href));
  const handleSignOut = () => {
    session.reset();
    setUserDropdownOpen(false);
    router.push("/");
  };
  return <header className="sticky top-0 z-50 h-16 w-full bg-background border-b border-border select-none">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center justify-between gap-4">
        {/* Brand identity */}
        <div className="flex items-center gap-3 shrink-0">
          <Link href="/" className="flex items-center gap-2.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-md">
            <div className="w-8 h-8 rounded bg-primary flex items-center justify-center text-primary-foreground shadow-[0_2px_8px_rgba(168,74,20,0.22)] shrink-0">
              <Wrench className="w-4 h-4 stroke-2" />
            </div>
            <div className="flex flex-col">
              <span className="font-display font-bold text-base tracking-tight text-foreground leading-tight whitespace-nowrap">
                Wiener Bauhandwerk
              </span>
              <span className="text-[10px] text-muted-foreground uppercase tracking-wider font-medium leading-tight whitespace-nowrap">
                Handyman Services Vienna
              </span>
            </div>
          </Link>
        </div>

        {/* Desktop Dynamic Page Navigation */}
        <div ref={navContainerRef} className="hidden lg:flex items-center gap-5 flex-1 min-w-0 justify-center overflow-visible">
          {visibleItems.map((item, index) => {
          const isActive = pathname === "/" ? item.href === "/" : pathname.startsWith(item.href);
          return <Link key={item.id} href={item.href} className={`text-sm font-medium transition-colors whitespace-nowrap shrink-0 py-1.5 px-2 rounded-md ${isActive ? "text-primary font-semibold" : "text-foreground hover:text-primary"}`}>
                {item.label}
              </Link>;
        })}

          {/* Un-clipped More Dropdown */}
          {moreItems.length > 0 && <div ref={moreMenuRef} className="relative shrink-0">
              <button type="button" onClick={() => setMoreDropdownOpen(!moreDropdownOpen)} aria-expanded={moreDropdownOpen} aria-haspopup="true" className={`h-8 px-2.5 rounded-md border text-xs font-medium flex items-center gap-1 transition-colors whitespace-nowrap ${isMoreActive ? "border-primary text-primary font-semibold bg-muted/50" : "border-border bg-card text-foreground hover:bg-muted"}`}>
                <span>{t.more}</span>
                <ChevronDown className="w-3.5 h-3.5" />
              </button>

              {moreDropdownOpen && <div className="absolute right-0 top-full mt-1.5 w-56 rounded-md border border-border bg-popover text-popover-foreground shadow-elevated py-1.5 z-50 animate-in fade-in-50">
                  {moreItems.map((item, index) => {
              const isActive = pathname === "/" ? item.href === "/" : pathname.startsWith(item.href);
              return <Link key={item.id} href={item.href} onClick={() => setMoreDropdownOpen(false)} className={`w-full text-left px-3.5 py-2 text-xs flex items-center justify-between hover:bg-muted transition-colors ${isActive ? "font-semibold text-primary bg-muted/40" : "text-foreground"}`}>
                        <span>{item.label}</span>
                      </Link>;
            })}
                </div>}
            </div>}
        </div>

        {/* Account & Actions Zone */}
        <div className="hidden sm:flex items-center gap-2.5 shrink-0">
          {/* Language Switcher */}
          <div ref={langMenuRef} className="relative">
            <button type="button" onClick={() => setLangDropdownOpen(!langDropdownOpen)} className="h-9 px-2.5 rounded-md border border-border bg-card hover:bg-muted text-foreground text-xs font-medium flex items-center gap-1.5 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring whitespace-nowrap" aria-expanded={langDropdownOpen} aria-label="Select language">
              <Globe className="w-3.5 h-3.5 text-muted-foreground" />
              <span>{activeLang}</span>
              <ChevronDown className="w-3.5 h-3.5 text-muted-foreground" />
            </button>

            {langDropdownOpen && <div className="absolute right-0 top-full mt-1.5 w-36 rounded-md border border-border bg-popover text-popover-foreground shadow-elevated py-1 z-50">
                {languages.map((lang, index) => <button key={lang.code} type="button" onClick={() => {
              applyLanguage(lang.code);
              setLangDropdownOpen(false);
            }} className={`w-full text-left px-3 py-1.5 text-xs flex items-center justify-between hover:bg-muted transition-colors ${activeLang === lang.code ? "font-semibold text-primary bg-muted/40" : "text-foreground"}`}>
                    <span>{lang.label}</span>
                    <span className="text-[10px] text-muted-foreground font-mono">
                      {lang.code}
                    </span>
                  </button>)}
              </div>}
          </div>

          {/* WhatsApp contact beside language selector */}
          <a href="https://wa.me/431234567890" target="_blank" rel="noopener noreferrer" aria-label="Contact us on WhatsApp" title="WhatsApp" className="h-9 w-9 rounded-md border border-border bg-card text-[#25D366] hover:bg-muted flex items-center justify-center transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
            <MessageCircle className="w-4 h-4" />
          </a>

          {/* User Profile / Auth Links */}
          {isAuthenticated ? <div ref={userMenuRef} className="relative">
              <button type="button" onClick={() => setUserDropdownOpen(!userDropdownOpen)} className="h-9 px-3 rounded-md border border-border bg-card hover:bg-muted text-foreground text-xs font-medium flex items-center gap-2 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring" aria-expanded={userDropdownOpen}>
                <div className="w-5 h-5 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-[10px] font-bold">
                  {session.full_name?.charAt(0) || "U"}
                </div>
                <span className="max-w-[100px] truncate">
                  {session.full_name || "Customer"}
                </span>
                <ChevronDown className="w-3 h-3 text-muted-foreground" />
              </button>

              {userDropdownOpen && <div className="absolute right-0 top-full mt-1.5 w-48 rounded-md border border-border bg-popover text-popover-foreground shadow-elevated py-1 z-50">
                  <div className="px-3 py-1.5 border-b border-border">
                    <div className="text-xs font-semibold text-foreground truncate">
                      {session.full_name || "Customer"}
                    </div>
                    <div className="text-[10px] text-muted-foreground truncate">
                      {session.email}
                    </div>
                  </div>
                  <Link href="/customerinquirytracker" onClick={() => setUserDropdownOpen(false)} className="w-full text-left px-3 py-2 text-xs flex items-center gap-2 text-foreground hover:bg-muted transition-colors">
                    <ClipboardList className="w-3.5 h-3.5 text-primary" />
                    <span>My Quotes Tracking</span>
                  </Link>
                  <button type="button" onClick={handleSignOut} className="w-full text-left px-3 py-2 text-xs flex items-center gap-2 text-destructive hover:bg-muted transition-colors border-t border-border">
                    <LogOut className="w-3.5 h-3.5" />
                    <span>Sign Out</span>
                  </button>
                </div>}
            </div> : false && <div className="flex items-center gap-1.5">
              <Link href="/customerlogin" className="h-9 px-3 rounded-md text-xs font-medium text-foreground hover:text-primary transition-colors flex items-center justify-center whitespace-nowrap">
                {t.signIn}
              </Link>
              <Link href="/customerregister" className="h-9 px-3 rounded-md border border-border bg-card hover:bg-muted text-foreground text-xs font-medium transition-colors flex items-center justify-center whitespace-nowrap">
                {t.signUp}
              </Link>
            </div>}

          {/* Primary CTA: Dedicated Quote Request */}
          <Link href="/quoterequestform" className="h-9 px-4 rounded-md bg-primary text-primary-foreground hover:bg-primary/90 text-xs font-semibold shadow-primary flex items-center justify-center transition-all whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ml-1">
            {t.quote}
          </Link>
        </div>

        {/* Mobile Menu Trigger (< 768px) */}
        <div className="flex sm:hidden items-center gap-2">
          <Link href="/quoterequestform" className="h-8 px-2.5 rounded bg-primary text-primary-foreground text-xs font-medium flex items-center justify-center whitespace-nowrap">
            Quote
          </Link>
          <button type="button" onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="p-2 rounded-md border border-border bg-card text-foreground hover:bg-muted transition-colors" aria-label="Toggle menu">
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Viewport Slide-over Drawer */}
      {mobileMenuOpen && <div className="sm:hidden border-b border-border bg-background px-4 py-4 space-y-4 shadow-elevated animate-in fade-in-50">
          <nav className="flex flex-col space-y-1">
            <Link href="/" onClick={() => setMobileMenuOpen(false)} className={`py-2 px-2 text-sm font-medium rounded-md transition-colors whitespace-nowrap ${pathname === "/" ? "bg-primary text-primary-foreground font-semibold" : "text-foreground hover:bg-muted"}`}>
              Handyman Portal Home
            </Link>
            {allNavItems.map((item, index) => {
          const isActive = pathname.startsWith(item.href);
          return <Link key={item.id} href={item.href} onClick={() => setMobileMenuOpen(false)} className={`py-2 px-2 text-sm font-medium rounded-md transition-colors whitespace-nowrap ${isActive ? "bg-primary text-primary-foreground font-semibold" : "text-foreground hover:bg-muted"}`}>
                  {item.label}
                </Link>;
        })}
          </nav>

          <div className="pt-3 border-t border-border flex flex-col space-y-3">
            {/* Mobile Auth options */}
            {isAuthenticated ? <div className="flex items-center justify-between bg-muted/60 p-2.5 rounded-md">
                <div className="flex items-center gap-2 min-w-0">
                  <div className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs font-bold shrink-0">
                    {session.full_name?.charAt(0) || "U"}
                  </div>
                  <div className="min-w-0">
                    <div className="text-xs font-semibold text-foreground truncate">
                      {session.full_name || "Customer"}
                    </div>
                    <div className="text-[10px] text-muted-foreground truncate">
                      {session.email}
                    </div>
                  </div>
                </div>
                <button type="button" onClick={handleSignOut} className="text-xs text-destructive hover:underline font-medium px-2 py-1">
                  Sign Out
                </button>
              </div> : <div className="grid grid-cols-2 gap-2">
                <a href="tel:+431234567890" className="flex min-w-0 items-center justify-center gap-2 py-2 px-2 text-center text-xs font-semibold border border-border rounded-md bg-card text-foreground hover:bg-muted">
                  <Phone className="h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
                  <span className="truncate">+43 66 567 284 985</span>
                </a>
                <a href="mailto:handwerk.vienna@gmail.com" className="flex min-w-0 items-center justify-center gap-2 py-2 px-2 text-center text-xs font-semibold border border-border rounded-md bg-card text-foreground hover:bg-muted">
                  <Mail className="h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
                  <span className="truncate">handwerk.vienna@gmail.com</span>
                </a>
              </div>}

            {/* Mobile Language Switcher & Quote CTA */}
            <div className="flex items-center justify-between pt-2">
              <div className="flex items-center gap-1">
                {languages.map((lang, index) => <button key={lang.code} type="button" onClick={() => applyLanguage(lang.code)} className={`px-2.5 py-1 text-xs rounded border transition-colors ${activeLang === lang.code ? "border-primary bg-primary text-primary-foreground font-semibold" : "border-border bg-card text-foreground hover:bg-muted"}`}>
                    {lang.code}
                  </button>)}
                <a href="https://wa.me/431234567890" target="_blank" rel="noopener noreferrer" aria-label="Contact us on WhatsApp" title="WhatsApp" className="ml-1 h-8 w-8 rounded-md border border-border bg-card text-[#25D366] hover:bg-muted flex items-center justify-center">
                  <MessageCircle className="w-4 h-4" />
                </a>
              </div>

              <Link href="/quoterequestform" onClick={() => setMobileMenuOpen(false)} className="h-9 px-4 rounded-md bg-primary text-primary-foreground text-xs font-semibold shadow-primary flex items-center justify-center whitespace-nowrap">
                {t.quote}
              </Link>
            </div>
          </div>
        </div>}
    </header>;
}
