"use client";

import React, { useEffect, useState } from "react";
import { getAuditTelemetry } from "@/backend/actions/AdminLogin";
import { AuditTelemetryOutput } from "@/backend/types/AdminLogin";
import AdminHeader from "@/backend/components/AdminLogin/AdminHeader";
import AdminLoginForm from "@/backend/components/AdminLogin/AdminLoginForm";
import ComplianceNotice from "@/backend/components/AdminLogin/ComplianceNotice";
export default function AdminLoginPage() {
  const [auditTelemetry, setAuditTelemetry] = useState<AuditTelemetryOutput | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    let mounted = true;
    getAuditTelemetry().then(data => {
      if (mounted) {
        setAuditTelemetry(data);
        setIsLoading(false);
      }
    }).catch(() => {
      if (mounted) {
        setAuditTelemetry(null);
        setIsLoading(false);
      }
    });
    return () => {
      mounted = false;
    };
  }, []);
  return <div className="w-full min-h-screen bg-background text-foreground flex flex-col justify-center items-center p-4 lg:p-6">
      {/* Controlled administrative credential vault box (Max 420px strictly constrained) */}
      <main data-controller-name="Admin Authentication Vault" className="w-full max-w-[420px] bg-card text-card-foreground border border-border rounded-xl shadow-soft p-6 sm:p-7 flex flex-col gap-6">
        {/* Header Section */}
        <AdminHeader />

        {/* Authentication Form */}
        <AdminLoginForm />

        {/* Compliance and Audit Notice Attached to Vault Footer */}
        {auditTelemetry && <ComplianceNotice telemetry={auditTelemetry} />}
        {isLoading && <div className="text-center text-xs text-muted-foreground py-2">
            Loading compliance telemetry...
          </div>}
      </main>

      {/* Global Bottom Security Tagline */}
      <footer className="mt-6 text-center text-xs text-muted-foreground font-mono">
        <span>© {new Date().getFullYear()} Vienna Handwerk Betriebsführung · 1010 Wien, Stephansplatz 4</span>
      </footer>
    </div>;
}
