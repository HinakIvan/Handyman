"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { LayoutDashboard, Wrench, ShieldCheck, ChevronRight, Globe, LogOut, UserCheck } from "lucide-react";
import { useAdminSession } from "@/tools/BackendSession";
export function Sidebar() {
  const pathname = usePathname() || "";
  const router = useRouter();
  const session = useAdminSession();
  const [activeLangView, setActiveLangView] = useState<"DE" | "EN" | "RU">("DE");
  const navItems = [{
    id: "dashboard",
    label: "Operations Dashboard",
    sublabel: "Overview & KPIs",
    icon: LayoutDashboard,
    href: "/adminoperationsdashboard",
    activeMatch: (p: string) => p.startsWith("/adminoperationsdashboard") || p.startsWith("/adminquotedetail")
  }, {
    id: "categories",
    label: "Categories & Rates",
    sublabel: "Rates & Trade Scope",
    icon: Wrench,
    href: "/admincategoriesrates",
    activeMatch: (p: string) => p.startsWith("/admincategoriesrates")
  }, {
    id: "compliance",
    label: "Compliance Checklist",
    sublabel: "Vienna GewO Setup",
    icon: ShieldCheck,
    href: "/admincompliancechecklist",
    activeMatch: (p: string) => p.startsWith("/admincompliancechecklist")
  }];
  const handleSignOut = () => {
    session.reset();
    router.push("/adminlogin");
  };
  return <aside className="w-60 h-full min-h-0 shrink-0 flex flex-col bg-sidebar text-sidebar-foreground border-r border-sidebar-border select-none">
      {/* Brand Header */}
      <div className="p-4 shrink-0 border-b border-sidebar-border">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded bg-sidebar-primary flex items-center justify-center text-sidebar-primary-foreground shadow-[0_2px_8px_rgba(168,74,20,0.22)] shrink-0">
            <Wrench className="w-4 h-4 stroke-2" />
          </div>
          <div className="min-w-0">
            <div className="font-display font-bold text-sm text-sidebar-foreground truncate whitespace-nowrap">
              Werkstatt Admin
            </div>
            <div className="text-[10px] text-muted-foreground truncate uppercase tracking-wider whitespace-nowrap font-medium">
              Vienna Handyman Ops
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Entries */}
      <nav className="flex-1 min-h-0 overflow-y-auto p-3 space-y-1">
        <div className="px-2 pb-1.5 text-[10px] uppercase font-semibold tracking-wider text-muted-foreground">
          Operations Menu
        </div>
        {navItems.map((item, index) => {
        const Icon = item.icon;
        const isActive = item.activeMatch(pathname);
        return <Link key={item.id} href={item.href} className={`group flex items-center gap-3 px-2.5 py-2 rounded-md text-xs transition-colors whitespace-nowrap ${isActive ? "bg-sidebar-primary text-sidebar-primary-foreground font-medium shadow-[0_1px_4px_rgba(168,74,20,0.18)]" : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"}`}>
              <Icon className={`w-4 h-4 shrink-0 ${isActive ? "text-sidebar-primary-foreground" : "text-muted-foreground group-hover:text-sidebar-foreground"}`} />
              <div className="min-w-0 flex-1 truncate">
                <span className="block truncate font-medium">{item.label}</span>
                <span className={`block text-[10px] truncate ${isActive ? "opacity-85" : "text-muted-foreground"}`}>
                  {item.sublabel}
                </span>
              </div>
              <ChevronRight className={`w-3.5 h-3.5 shrink-0 transition-transform ${isActive ? "opacity-90" : "opacity-0 group-hover:opacity-60"}`} />
            </Link>;
      })}
      </nav>

      {/* Language View Switcher & Bottom Status */}
      <div className="p-3 shrink-0 border-t border-sidebar-border space-y-3 bg-card/40">
        <div>
          <div className="px-1 pb-1.5 flex items-center justify-between text-[10px] text-muted-foreground">
            <span className="uppercase font-semibold tracking-wider">
              Language View
            </span>
            <Globe className="w-3 h-3" />
          </div>
          <div className="grid grid-cols-3 gap-1 bg-muted p-1 rounded-md border border-border">
            {(["DE", "EN", "RU"] as const).map((lang, index) => <button key={lang} type="button" onClick={() => setActiveLangView(lang)} className={`py-1 text-[11px] font-medium rounded transition-colors text-center ${activeLangView === lang ? "bg-sidebar-primary text-sidebar-primary-foreground shadow-sm" : "text-muted-foreground hover:text-sidebar-foreground hover:bg-background/50"}`}>
                {lang}
              </button>)}
          </div>
        </div>

        {/* Compliance Status Indicator */}
        <div className="p-2 rounded bg-muted/60 border border-border text-[10px] text-muted-foreground space-y-1">
          <div className="flex items-center gap-1.5 font-medium text-foreground truncate">
            <ShieldCheck className="w-3.5 h-3.5 text-primary shrink-0" />
            <span className="truncate">GewO Compliance Mode</span>
          </div>
          <div className="text-[9px] text-muted-foreground leading-tight truncate">
            Wien Bezirke 1–23 Active
          </div>
        </div>

        {/* Admin Session Identity Card */}
        <div className="pt-2 border-t border-sidebar-border flex items-center justify-between gap-2">
          <div className="flex items-center gap-2 min-w-0">
            <div className="w-7 h-7 rounded-full bg-sidebar-accent border border-sidebar-border flex items-center justify-center shrink-0 text-sidebar-foreground">
              <UserCheck className="w-3.5 h-3.5" />
            </div>
            <div className="min-w-0">
              <div className="text-xs font-semibold text-sidebar-foreground truncate">
                {session.full_name || "Admin"}
              </div>
              <div className="text-[10px] text-muted-foreground truncate">
                {session.email || "Operations Lead"}
              </div>
            </div>
          </div>
          <button type="button" onClick={handleSignOut} title="Sign Out" className="p-1.5 rounded text-muted-foreground hover:text-destructive hover:bg-sidebar-accent transition-colors shrink-0">
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </div>
    </aside>;
}
