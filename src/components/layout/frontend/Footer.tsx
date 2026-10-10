import React from "react";
import Link from "next/link";
import { Wrench, MapPin, Clock, ArrowRight, ShieldAlert, Phone, Mail } from "lucide-react";
export function Footer() {
  const viennaDistricts = ["Innere Stadt (1.)", "Leopoldstadt (2.)", "Landstraße (3.)", "Wieden & Margareten (4./5.)", "Neubau & Josefstadt (7./8.)", "Alsergrund (9.)", "Favoriten & Simmering (10./11.)", "Meidling & Hietzing (12./13.)", "Penzing & Rudolfsheim (14./15.)", "Ottakring & Hernals (16./17.)", "Währing & Döbling (18./19.)", "Brigittenau & Floridsdorf (20./21.)", "Donaustadt & Liesing (22./23.)", "Großraum Wien & NÖ"];
  const quickServices = [{
    label: "All Services Catalog",
    href: "/servicescatalog"
  }, {
    label: "Pricing & Legal Scope",
    href: "/pricingscope"
  }, {
    label: "Vienna Service Areas",
    href: "/serviceareas"
  }, {
    label: "Request a Custom Quote",
    href: "/quoterequestform"
  }];
  const customerLinks = [{
    label: "Handyman Portal Home",
    href: "/"
  }, {
    label: "Quotes Tracking",
    href: "/customerinquirytracker"
  }, {
    label: "Customer Login",
    href: "/customerlogin"
  }, {
    label: "Customer Registration",
    href: "/customerregister"
  }];
  return <footer className="w-full bg-card border-t border-border py-12 sm:py-16 text-card-foreground">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-10">
          {/* Brand & Mission (4 cols) */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded bg-primary flex items-center justify-center text-primary-foreground shadow-[0_2px_8px_rgba(168,74,20,0.22)] shrink-0">
                <Wrench className="w-4 h-4 stroke-2" />
              </div>
              <div className="flex flex-col">
                <span className="font-display font-bold text-base tracking-tight text-foreground leading-tight">
                  Wiener Bauhandwerk
                </span>
                <span className="text-[10px] text-muted-foreground uppercase tracking-wider font-medium leading-tight">
                  Vienna Handyman &amp; Altbausanierung
                </span>
              </div>
            </div>

            <p className="text-sm text-muted-foreground leading-relaxed">
              Professional handyman, assembly, and property maintenance services
              across Vienna and surrounding Lower Austria. Built on Austrian
              standards of precision, transparent hourly benchmarks from €15/h,
              and strict legal compliance.
            </p>

            <div className="space-y-2 text-xs text-muted-foreground">
              <div className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-primary shrink-0" />
                <span>
                  Wien &amp; Umgebung (Operates throughout all 23 Vienna Districts)
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-3.5 h-3.5 text-primary shrink-0" />
                <span>Mon – Sat: 07:30 – 18:30 (Emergency coordination on request)</span>
              </div>
            </div>
          </div>

          {/* Quick Services (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h3 className="font-header font-semibold text-sm text-foreground uppercase tracking-wider">
              Service Catalog
            </h3>
            <ul className="space-y-2 text-xs text-muted-foreground">
              {quickServices.map((item, index) => <li key={item.label}>
                  <Link href={item.href} className="hover:text-primary transition-colors flex items-center gap-1.5">
                    <ArrowRight className="w-3 h-3 text-border shrink-0" />
                    <span>{item.label}</span>
                  </Link>
                </li>)}
            </ul>
          </div>

          {/* Temporarily hidden: Customer Portal & Quotes */}
          {false && (
          <div className="lg:col-span-2 space-y-3">
            <h3 className="font-header font-semibold text-sm text-foreground uppercase tracking-wider">
              Customer Hub
            </h3>
            <ul className="space-y-2 text-xs text-muted-foreground">
              {customerLinks.map((item, index) => <li key={item.label}>
                  <Link href={item.href} className="hover:text-primary transition-colors flex items-center gap-1.5">
                    <ArrowRight className="w-3 h-3 text-border shrink-0" />
                    <span>{item.label}</span>
                  </Link>
                </li>)}
            </ul>
          </div>
          )}

          {/* Vienna Service Coverage (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h3 className="font-header font-semibold text-sm text-foreground uppercase tracking-wider">
              Vienna Districts
            </h3>
            <p className="text-xs text-muted-foreground">
              Rapid response across all 23 municipal districts:
            </p>
            <div className="grid grid-cols-2 gap-1 text-[11px] text-muted-foreground">
              {viennaDistricts.map((district, index) => <div key={district} className="truncate">
                  • {district}
                </div>)}
            </div>
          </div>
        </div>

        {/* Temporarily hidden: Legal Disclaimer & Austrian GewO Trade Regulation Notice */}
        {false && (
        <div className="p-4 rounded-lg border border-border bg-muted/60 text-xs text-muted-foreground space-y-2">
          <div className="flex items-center gap-2 font-medium text-foreground">
            <ShieldAlert className="w-4 h-4 text-primary shrink-0" />
            <span>Gewerberechtlicher Hinweis &amp; Gesetzliche Dienstleistungsgrenzen (GewO 1994)</span>
          </div>
          <p className="leading-relaxed text-[11px]">
            Wir erbringen handwerkliche Instandhaltungs-, Montage- und Ausbesserungsleistungen im Rahmen des freien
            Gewerbes gemäß der österreichischen Gewerbeordnung (GewO). Sämtliche Arbeiten, die reglementierten
            Handwerken (insbesondere konzessionierte Elektro-, Gas- und Sanitärinstallationen sowie statische Eingriffe)
            vorbehalten sind, werden ausschließlich in Kooperation mit behördlich befugten Meisterbetrieben durchgeführt.
            Transparente Basiskalkulationen ab €15/Std.; verbindliche Gesamtkosten richten sich nach Aufwand und Anfahrtszone.
          </p>
        </div>
        )}

        {/* Bottom Copyright & Footer Links */}
        <div className="pt-6 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-muted-foreground">
          <div>
            © {new Date().getFullYear()} Wiener Bauhandwerk. All rights reserved. Vienna, Austria.
          </div>
          <div className="flex items-center gap-6">
            <Link href="/pricingscope" className="hover:text-foreground transition-colors whitespace-nowrap">
              Trade Terms &amp; Scope
            </Link>
            {/* Temporarily hidden: Districts & Logistics */}
            {/* <Link href="/serviceareas" className="hover:text-foreground transition-colors whitespace-nowrap">Districts &amp; Logistics</Link> */}
            <Link href="/quoterequestform" className="hover:text-foreground transition-colors whitespace-nowrap">
              Online Inquiry
            </Link>
          </div>
        </div>
      </div>
    </footer>;
}
