"use client";

import React from "react";
import { ShieldCheck, Award } from "lucide-react";
export interface HeaderProps {
  portalCode?: string;
}
export default function AdministrativeHeader({
  portalCode = "AT-VIE-OPS-2025"
}: HeaderProps) {
  return <div className="flex flex-col items-center text-center space-y-3" data-api-unique-id='administrativeheader-rfeac092ef12c6d51-s1612780965' data-api-unique-page-name='src/backend/components/AdminRegister/AdministrativeHeader'>
      {/* Brand Icon Badge - Artisan seal stamp style */}
      <div className="relative flex items-center justify-center w-14 h-14 rounded-xl bg-card border border-border shadow-sm text-primary" data-api-unique-id='administrativeheader-r831d4c84d1582968-s1612780965' data-api-unique-page-name='src/backend/components/AdminRegister/AdministrativeHeader'>
        <ShieldCheck className="w-8 h-8 text-primary" strokeWidth={1.8} data-api-unique-id='administrativeheader-r9c997074c97f54a3-s1612780965' data-api-unique-page-name='src/backend/components/AdminRegister/AdministrativeHeader' />
        <span className="absolute -top-1.5 -right-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-accent text-[9px] font-bold text-accent-foreground" title="WKO Gewerbe Compliance" data-api-unique-id='administrativeheader-rf5928f00b06e8e7c-s1612780965' data-api-unique-page-name='src/backend/components/AdminRegister/AdministrativeHeader'>
          ✓
        </span>
      </div>

      {/* Main Title & Subtitle */}
      <div className="space-y-1" data-api-unique-id='administrativeheader-r8dd90fdd153ba613-s1612780965' data-api-unique-page-name='src/backend/components/AdminRegister/AdministrativeHeader'>
        <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-secondary text-secondary-foreground text-[11px] font-medium tracking-wide" data-api-unique-id='administrativeheader-r5ae45f0139e2fc5e-s1612780965' data-api-unique-page-name='src/backend/components/AdminRegister/AdministrativeHeader'>
          <Award className="w-3 h-3 text-primary" data-api-unique-id='administrativeheader-rdec3ad129f285960-s1612780965' data-api-unique-page-name='src/backend/components/AdminRegister/AdministrativeHeader' />
          <span data-api-unique-id='administrativeheader-re573e1217b893f2d-s1612780965' data-api-unique-page-name='src/backend/components/AdminRegister/AdministrativeHeader'>Vienna Handwerk Operations Portal</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-display font-bold text-card-foreground tracking-tight" data-api-unique-id='administrativeheader-r011f12956820365e-s1612780965' data-api-unique-page-name='src/backend/components/AdminRegister/AdministrativeHeader'>
          Administrator Provisioning
        </h1>
        <p className="text-xs sm:text-sm text-muted-foreground max-w-sm mx-auto leading-relaxed" data-api-unique-id='administrativeheader-r5b6a3aad43afa76a-s1612780965' data-api-unique-page-name='src/backend/components/AdminRegister/AdministrativeHeader'>
          Staff credential issuer for Vienna craft dispatch coordinators. Creates an authorized internal record strictly with role{" "}
          <span className="font-mono font-semibold text-accent" data-api-unique-id='administrativeheader-r7679bc6001a035f2-s1612780965' data-api-unique-page-name='src/backend/components/AdminRegister/AdministrativeHeader'>ADMIN</span>.
        </p>
      </div>

      {/* Authority Code Tag */}
      <div className="flex items-center gap-2 text-[11px] text-muted-foreground font-mono" data-api-unique-id='administrativeheader-rc8d9996ec6c8c04f-s1612780965' data-api-unique-page-name='src/backend/components/AdminRegister/AdministrativeHeader'>
        <span data-api-unique-id='administrativeheader-rf8ce702088fedc27-s1612780965' data-api-unique-page-name='src/backend/components/AdminRegister/AdministrativeHeader'>Authority: WKO GewO §94</span>
        <span data-api-unique-id='administrativeheader-rdf547693a85858ae-s1612780965' data-api-unique-page-name='src/backend/components/AdminRegister/AdministrativeHeader'>•</span>
        <span data-api-unique-id='administrativeheader-r495f97527a33b514-s1612780965' data-api-unique-page-name='src/backend/components/AdminRegister/AdministrativeHeader'>Portal: {portalCode}</span>
      </div>
    </div>;
}