"use client";

import React from "react";
import { Lock, FileCheck } from "lucide-react";
import { ComplianceMeta } from "@/backend/types/AdminRegister";
export interface FooterProps {
  meta?: ComplianceMeta;
}
export default function ComplianceFooter({
  meta = {
    portalCode: "AT-VIE-DISPATCH-2025",
    gewoStandard: "Österreichische Gewerbeordnung 1994 (GewO 1994)",
    tlsStandard: "256-bit TLS / EPREL Audited",
    guildReg: "WKO Handwerk Innung Wien (Reg. #WH-98214)"
  }
}: FooterProps) {
  return <div className="pt-4 border-t border-border/80 space-y-2 text-[11px] text-muted-foreground text-center" data-api-unique-id='compliancefooter-r642580c55223de68-s2220525848' data-api-unique-page-name='src/backend/components/AdminRegister/ComplianceFooter'>
      <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1" data-api-unique-id='compliancefooter-r5d816f044b801e8b-s2220525848' data-api-unique-page-name='src/backend/components/AdminRegister/ComplianceFooter'>
        <span className="inline-flex items-center gap-1" data-api-unique-id='compliancefooter-r229e50ba474deab6-s2220525848' data-api-unique-page-name='src/backend/components/AdminRegister/ComplianceFooter'>
          <Lock className="w-3 h-3 text-accent" data-api-unique-id='compliancefooter-r3e82896c202c8ce3-s2220525848' data-api-unique-page-name='src/backend/components/AdminRegister/ComplianceFooter' />
          <span data-api-unique-id='compliancefooter-r60ac33349ae8f200-s2220525848' data-api-unique-page-name='src/backend/components/AdminRegister/ComplianceFooter'>{meta.tlsStandard}</span>
        </span>
        <span data-api-unique-id='compliancefooter-r69d72733ea23fe3e-s2220525848' data-api-unique-page-name='src/backend/components/AdminRegister/ComplianceFooter'>•</span>
        <span className="inline-flex items-center gap-1" data-api-unique-id='compliancefooter-r4f6bdbd3ffcdae33-s2220525848' data-api-unique-page-name='src/backend/components/AdminRegister/ComplianceFooter'>
          <FileCheck className="w-3 h-3 text-success" data-api-unique-id='compliancefooter-rb9cc3ebda565ecd9-s2220525848' data-api-unique-page-name='src/backend/components/AdminRegister/ComplianceFooter' />
          <span data-api-unique-id='compliancefooter-r85126185fb92c90e-s2220525848' data-api-unique-page-name='src/backend/components/AdminRegister/ComplianceFooter'>WKO Compliance</span>
        </span>
        <span data-api-unique-id='compliancefooter-r71871b28ab1977e6-s2220525848' data-api-unique-page-name='src/backend/components/AdminRegister/ComplianceFooter'>•</span>
        <span data-api-unique-id='compliancefooter-rbc87e11bea4d55aa-s2220525848' data-api-unique-page-name='src/backend/components/AdminRegister/ComplianceFooter'>{meta.guildReg}</span>
      </div>
      <p className="text-[10px] text-muted-foreground/80 leading-relaxed max-w-sm mx-auto" data-api-unique-id='compliancefooter-rca643b58d35b6d7a-s2220525848' data-api-unique-page-name='src/backend/components/AdminRegister/ComplianceFooter'>
        Internal administrative provisioning console. All credential generations are cryptographically logged under {meta.gewoStandard} guidelines.
      </p>
    </div>;
}