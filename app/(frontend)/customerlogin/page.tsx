"use client";

import React, { useState, useEffect } from "react";
import { toast } from "sonner";
import GuidancePanel from "@/frontend/components/CustomerLogin/GuidancePanel";
import CredentialFormCard from "@/frontend/components/CustomerLogin/CredentialFormCard";
import RegistrationCtaStrip from "@/frontend/components/CustomerLogin/RegistrationCtaStrip";
import { CustomerPortalMetaOutput } from "@/frontend/types/CustomerLogin";
import { getCustomerPortalMeta } from "@/frontend/actions/CustomerLogin";
export default function CustomerLoginPage() {
  const [meta, setMeta] = useState<CustomerPortalMetaOutput | null>(null);
  useEffect(() => {
    let isMounted = true;
    getCustomerPortalMeta().then(data => {
      if (isMounted) {
        setMeta(data);
      }
    }).catch(() => {
      // dynamic meta failure fallback
    });
    return () => {
      isMounted = false;
    };
  }, []);
  const handleLoginSubmit = () => {
    toast.success("Welcome back! Customer repair dossier unlocked.");
  };
  return <div className="w-full bg-background text-foreground">
      {/* Top Main Section: Two-Column Workspace (Open guidance + Boxed credential card) */}
      <section className="w-full border-b border-border bg-background">
        <div className="container mx-auto px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
          <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-12 lg:gap-12">
            {/* Left Guidance Panel (Open architectural display, span 7) */}
            <div className="lg:col-span-7 min-w-0">
              <GuidancePanel meta={meta ?? undefined} />
            </div>

            {/* Right Credential Box (Honed Sandstone Box, span 5) */}
            <div className="lg:col-span-5 min-w-0 sticky top-20">
              <CredentialFormCard onSubmit={handleLoginSubmit} />
            </div>
          </div>
        </div>
      </section>

      {/* Bottom Section: Registration Call-to-Action Strip for First-Time Clients */}
      <RegistrationCtaStrip minHourlyRateEur={meta?.minHourlyRateEur} />
    </div>;
}
