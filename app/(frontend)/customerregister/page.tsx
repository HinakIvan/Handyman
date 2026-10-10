"use client";

import React, { useState, useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Stamp, Shield, CheckCircle2 } from "lucide-react";
import RegisterHeader from "@/frontend/components/CustomerRegister/RegisterHeader";
import ClientBenefits from "@/frontend/components/CustomerRegister/ClientBenefits";
import RegistrationForm from "@/frontend/components/CustomerRegister/RegistrationForm";
import RegisterFooter from "@/frontend/components/CustomerRegister/RegisterFooter";
import { getRegistrationOverview, registerCustomer } from "@/frontend/actions/CustomerRegister";
import type { RegistrationFormData, RegistrationFormErrors, ClientBenefit, RegistrationOverviewOutput } from "@/frontend/types/CustomerRegister";
import { useUserSession } from "@/tools/FrontendSession";
import { HomeFrontend } from "@/frontend/route-params";
export default function CustomerRegisterPage() {
  const router = useRouter();
  const {
    set: setSession
  } = useUserSession();

  // Overview master data (districts and baseline hourly rate)
  const [overview, setOverview] = useState<RegistrationOverviewOutput | null>(null);
  useEffect(() => {
    let isMounted = true;
    getRegistrationOverview().then(data => {
      if (isMounted && data) {
        setOverview(data);
      }
    }).catch(() => {
      // Fallback to default metrics gracefully if overview fetch fails
    });
    return () => {
      isMounted = false;
    };
  }, []);

  // Derive benefits from overview master data
  const benefits: ClientBenefit[] = useMemo(() => {
    const rate = overview?.baselineHourlyRateEur ?? 15;
    const districtCount = overview?.districtCount ?? 23;
    return [{
      id: "quote-tracking",
      title: "Personal Quote Request Tracking",
      germanTag: "Angebotsverfolgung",
      description: "Follow inspection estimates, itemized material lists, and fixed-price craftsmanship proposals directly from your client dashboard.",
      iconName: "ClipboardList",
      metricLabel: `Transparent breakdown from €${rate}/hr baseline`
    }, {
      id: "estimate-review",
      title: "Altbau Renovation & Inspection Review",
      germanTag: "Besichtigungsgutachten",
      description: "Review detailed on-site diagnostic reports for high-ceiling historic apartments, masonry repairs, and trade scope classifications.",
      iconName: "Calculator",
      metricLabel: "GewO-compliant task demarcation"
    }, {
      id: "execution-scheduling",
      title: "Artisan Execution Scheduling",
      germanTag: "Termin- & Montagekoordination",
      description: `Coordinate guaranteed artisan dispatch windows across all ${districtCount} Vienna districts with verified arrival notifications and task milestones.`,
      iconName: "CalendarClock",
      metricLabel: "Same-day or planned service slots"
    }];
  }, [overview]);

  // Controlled form state
  const [formData, setFormData] = useState<RegistrationFormData>({
    fullName: "",
    email: "",
    password: "",
    phone: "",
    agreedToTerms: false
  });
  const [formErrors, setFormErrors] = useState<RegistrationFormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isRegistered, setIsRegistered] = useState(false);
  const handleFieldChange = (field: keyof RegistrationFormData, value: string | boolean) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    if (formErrors[field] || formErrors.form) {
      setFormErrors(prev => ({
        ...prev,
        [field]: undefined,
        form: undefined
      }));
    }
  };
  const validateForm = (): boolean => {
    const errors: RegistrationFormErrors = {};
    if (!formData.fullName.trim()) {
      errors.fullName = "Please provide your full name or representative title.";
    } else if (formData.fullName.trim().length < 2) {
      errors.fullName = "Full name must be at least 2 characters.";
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      errors.email = "Primary login email is required.";
    } else if (!emailRegex.test(formData.email.trim())) {
      errors.email = "Please enter a valid email address (e.g. name@domain.at).";
    }
    if (!formData.password) {
      errors.password = "Password is required for account security.";
    } else if (formData.password.length < 8) {
      errors.password = "Password must contain at least 8 characters.";
    } else if (!/\d/.test(formData.password) || !/[a-zA-Z]/.test(formData.password)) {
      errors.password = "Password must include both letters and numbers.";
    }
    if (formData.phone.trim()) {
      const phoneClean = formData.phone.replace(/[\s\-\(\)\+]/g, "");
      if (phoneClean.length < 6 || !/^\d+$/.test(phoneClean)) {
        errors.phone = "Please enter a valid telephone number format.";
      }
    }
    if (!formData.agreedToTerms) {
      errors.agreedToTerms = "Please agree to the terms of service and DSGVO compliance.";
    }
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) {
      toast.error("Please resolve the required fields before submitting.");
      return;
    }
    setIsSubmitting(true);
    try {
      const result = await registerCustomer({
        email: formData.email,
        password: formData.password,
        fullName: formData.fullName,
        phone: formData.phone.trim() ? formData.phone.trim() : null
      });

      // Establish authenticated session with verified CUSTOMER role
      setSession({
        token: result.token,
        user_id: result.userId,
        email: result.email,
        full_name: result.fullName,
        role: "CUSTOMER"
      });
      setIsRegistered(true);
      toast.success("Client account registered successfully! Redirecting to Vienna Handyman Portal...");
      setTimeout(() => {
        HomeFrontend.navigateTo(router);
      }, 1200);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Registration failed. Please check your connection and retry.";
      if (errorMessage.toLowerCase().includes("email")) {
        setFormErrors(prev => ({
          ...prev,
          email: errorMessage,
          form: errorMessage
        }));
      } else {
        setFormErrors(prev => ({
          ...prev,
          form: errorMessage
        }));
      }
      toast.error(errorMessage);
      setIsSubmitting(false);
    }
  };
  return <div className="flex min-h-screen flex-col bg-background text-foreground">
      {/* Top Header */}
      <RegisterHeader />

      {/* Main Section */}
      <main className="flex-1">
        <section className="w-full border-b border-border bg-background py-10 sm:py-14 lg:py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            {/* Top Introductory Banner & Headline */}
            <div className="mb-10 max-w-3xl space-y-3">
              <div className="inline-flex items-center gap-2 rounded-sm border border-border bg-accent px-3 py-1 text-xs font-semibold uppercase tracking-wider text-accent-foreground shadow-soft">
                <Stamp className="h-3.5 w-3.5" />
                <span>Wiener Handwerker-Register · Client Account Onboarding</span>
              </div>

              <h1 className="font-display text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
                Open Your Vienna Handyman Dossier
              </h1>

              <p className="text-sm leading-relaxed text-muted-foreground sm:text-base">
                Welcome to Vienna Handwerk. This portal registers your verified client profile (Role: <span className="font-semibold text-foreground">CUSTOMER</span>) with direct access to quotes, transparent Austrian trade rates, and scheduled home repairs.
              </p>
            </div>

            {/* Asymmetric 2-Column Work Area */}
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-12">
              {/* Left Column (5 cols): Client Benefits Overview */}
              <div className="lg:col-span-5">
                <ClientBenefits benefits={benefits} />
              </div>

              {/* Right Column (7 cols): Registration Core Form Card */}
              <div className="lg:col-span-7">
                {isRegistered ? <div className="flex flex-col items-center justify-center rounded-lg border border-border bg-card p-10 text-center text-card-foreground shadow-elevated">
                    <div className="flex h-14 w-14 items-center justify-center rounded-full bg-success/10 text-success">
                      <CheckCircle2 className="h-8 w-8 text-success" />
                    </div>
                    <h2 className="mt-4 font-header text-xl font-bold text-card-foreground">
                      Client Profile Established
                    </h2>
                    <p className="mt-2 max-w-md text-xs leading-relaxed text-muted-foreground">
                      Your customer account has been created with role <span className="font-semibold text-foreground">CUSTOMER</span>. Establishing your active session and navigating to the Vienna Handyman Portal home page...
                    </p>
                    <div className="mt-6 flex items-center gap-2 text-xs font-medium text-accent">
                      <Shield className="h-4 w-4" />
                      <span>Directing to Vienna Handyman Portal...</span>
                    </div>
                  </div> : <RegistrationForm formData={formData} formErrors={formErrors} isSubmitting={isSubmitting} onFieldChange={handleFieldChange} onSubmit={handleSubmit} />}
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <RegisterFooter />
    </div>;
}
