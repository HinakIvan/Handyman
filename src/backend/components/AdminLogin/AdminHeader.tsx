"use client";

import React from "react";
import { ShieldCheck, Lock, Building2 } from "lucide-react";
export default function AdminHeader() {
  return <div className="flex flex-col items-center text-center gap-3" data-api-unique-id='adminheader-r9f1da8698273243d-s205640045' data-api-unique-page-name='src/backend/components/AdminLogin/AdminHeader'>
      {/* Brand & Security Badge */}
      <div className="relative flex items-center justify-center w-14 h-14 rounded-xl bg-accent text-accent-foreground shadow-soft" data-api-unique-id='adminheader-rec5b2387d190b2e1-s205640045' data-api-unique-page-name='src/backend/components/AdminLogin/AdminHeader'>
        <Building2 className="w-7 h-7 text-accent-foreground" data-api-unique-id='adminheader-rdb222996f0772d81-s205640045' data-api-unique-page-name='src/backend/components/AdminLogin/AdminHeader' />
        <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-primary flex items-center justify-center text-primary-foreground border-2 border-card" data-api-unique-id='adminheader-r13a65f4081f4c5a1-s205640045' data-api-unique-page-name='src/backend/components/AdminLogin/AdminHeader'>
          <ShieldCheck className="w-3 h-3" data-api-unique-id='adminheader-r2025b66826a7a8cc-s205640045' data-api-unique-page-name='src/backend/components/AdminLogin/AdminHeader' />
        </div>
      </div>

      <div className="space-y-1" data-api-unique-id='adminheader-rbbf2d30fec2203f7-s205640045' data-api-unique-page-name='src/backend/components/AdminLogin/AdminHeader'>
        <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium bg-muted text-muted-foreground border border-border" data-api-unique-id='adminheader-r05d8209eda235204-s205640045' data-api-unique-page-name='src/backend/components/AdminLogin/AdminHeader'>
          <Lock className="w-3 h-3 text-primary" data-api-unique-id='adminheader-r2767e76eb0e75215-s205640045' data-api-unique-page-name='src/backend/components/AdminLogin/AdminHeader' />
          <span data-api-unique-id='adminheader-rd0174590752b1eaa-s205640045' data-api-unique-page-name='src/backend/components/AdminLogin/AdminHeader'>Vienna Handwerk Leitstelle</span>
          <span className="w-1 h-1 rounded-full bg-border" data-api-unique-id='adminheader-rf54b7842276fc624-s205640045' data-api-unique-page-name='src/backend/components/AdminLogin/AdminHeader' />
          <span className="text-primary font-semibold" data-api-unique-id='adminheader-r13776a9d3007c10b-s205640045' data-api-unique-page-name='src/backend/components/AdminLogin/AdminHeader'>1010 Wien</span>
        </div>
        <h1 className="text-2xl font-bold font-display tracking-tight text-card-foreground" data-api-unique-id='adminheader-r8bb8767bf8c4e44a-s205640045' data-api-unique-page-name='src/backend/components/AdminLogin/AdminHeader'>
          Betriebsportal Anmeldung
        </h1>
        <p className="text-xs text-muted-foreground font-body max-w-[340px]" data-api-unique-id='adminheader-rf3feaa97c13f1308-s205640045' data-api-unique-page-name='src/backend/components/AdminLogin/AdminHeader'>
          Operations Portal Access & Dispatch Control Center. Restricted for authenticated administrative staff.
        </p>
      </div>
    </div>;
}