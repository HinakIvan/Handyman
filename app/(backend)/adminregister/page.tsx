"use client";

import React, { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import AdministrativeHeader from "@/backend/components/AdminRegister/AdministrativeHeader";
import RegisterForm from "@/backend/components/AdminRegister/RegisterForm";
import ComplianceFooter from "@/backend/components/AdminRegister/ComplianceFooter";
import { registerAdmin } from "@/backend/actions/AdminRegister";
import { useAdminSession } from "@/tools/BackendSession";
import { AdminOperationsDashboard, AdminLogin } from "@/backend/route-params";
import { AdminRegisterFormValues, FormValidationErrors, PasswordStrengthState, PasswordRequirement } from "@/backend/types/AdminRegister";
export default function AdminRegisterPage() {
  const router = useRouter();
  const {
    set
  } = useAdminSession();

  // Form values state
  const [formValues, setFormValues] = useState<AdminRegisterFormValues>({
    fullName: "",
    email: "",
    password: ""
  });
  const [errors, setErrors] = useState<FormValidationErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Dynamic Password Complexity Analysis
  const {
    strength,
    requirements
  } = useMemo(() => {
    const pwd = formValues.password;
    const reqs: PasswordRequirement[] = [{
      id: "len",
      label: "Min. 8 characters",
      met: pwd.length >= 8
    }, {
      id: "case",
      label: "Upper & lower case",
      met: /[a-z]/.test(pwd) && /[A-Z]/.test(pwd)
    }, {
      id: "num",
      label: "At least 1 digit",
      met: /\d/.test(pwd)
    }, {
      id: "spec",
      label: "Special symbol (!@#$)",
      met: /[^A-Za-z0-9]/.test(pwd)
    }];
    const metCount = reqs.filter(r => r.met).length;
    let level: "Weak" | "Fair" | "Good" | "Strong" = "Weak";
    let accentClass = "bg-destructive";
    if (metCount === 0 || metCount === 1) {
      level = "Weak";
      accentClass = "bg-destructive";
    } else if (metCount === 2) {
      level = "Fair";
      accentClass = "bg-warning";
    } else if (metCount === 3) {
      level = "Good";
      accentClass = "bg-info";
    } else {
      level = "Strong";
      accentClass = "bg-success";
    }
    const state: PasswordStrengthState = {
      score: metCount,
      level,
      accentClass
    };
    return {
      strength: state,
      requirements: reqs
    };
  }, [formValues.password]);

  // Field change handler
  const handleFieldChange = (field: keyof AdminRegisterFormValues, value: string) => {
    setFormValues(prev => ({
      ...prev,
      [field]: value
    }));
    if (errors[field]) {
      setErrors(prev => {
        const next = {
          ...prev
        };
        delete next[field];
        return next;
      });
    }
  };

  // Form submit handler with inline validations and action execution
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: FormValidationErrors = {};

    // Validate Full Name
    if (!formValues.fullName.trim()) {
      newErrors.fullName = "Administrator full name is required.";
    } else if (formValues.fullName.trim().length < 2) {
      newErrors.fullName = "Name must contain at least 2 characters.";
    }

    // Validate Email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formValues.email.trim()) {
      newErrors.email = "Administrative email address is required.";
    } else if (!emailRegex.test(formValues.email.trim())) {
      newErrors.email = "Please provide a valid administrative email syntax.";
    }

    // Validate Password
    if (!formValues.password) {
      newErrors.password = "Master password is required.";
    } else if (formValues.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters long.";
    } else if (strength.score < 2) {
      newErrors.password = "Password complexity does not meet minimum security tier.";
    }
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      toast.error("Please resolve the validation requirements before submitting.");
      return;
    }
    setIsSubmitting(true);
    try {
      const result = await registerAdmin({
        fullName: formValues.fullName.trim(),
        email: formValues.email.trim(),
        password: formValues.password
      });
      set({
        token: result.token,
        user_id: result.userId,
        email: result.email,
        full_name: result.fullName,
        role: result.role
      });
      toast.success("Administrator account provisioned successfully! Redirecting to dashboard...");
      AdminOperationsDashboard.navigateTo(router);
    } catch (err) {
      const message = err instanceof Error ? err.message : "Failed to register administrator.";
      toast.error(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Navigate to existing Admin Login page [B05]
  const handleNavigateLogin = () => {
    AdminLogin.navigateTo(router);
  };
  return <div className="w-full min-h-screen bg-background text-foreground flex flex-col justify-center items-center p-4 sm:p-6 lg:p-8">
      {/* Background blueprint decorative subtle grid - warm artisan style */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.03]" style={{
      backgroundImage: `radial-gradient(var(--border) 1px, transparent 1px)`,
      backgroundSize: "24px 24px"
    }} />

      {/* Main Single-Canvas Auth Container */}
      <main data-controller-name="Admin Registration Hub" className="relative z-10 w-full max-w-[460px] my-auto">
        {/* Solid artisan card with warm wood-tone border */}
        <div className="w-full rounded-xl bg-card text-card-foreground border border-border shadow-soft p-6 sm:p-8 space-y-6">
          {/* Header section with brand seal */}
          <AdministrativeHeader portalCode="AT-VIE-OPS-2025" />

          {/* Form section */}
          <RegisterForm values={formValues} errors={errors} isSubmitting={isSubmitting} strength={strength} requirements={requirements} onChange={handleFieldChange} onSubmit={handleSubmit} onNavigateLogin={handleNavigateLogin} />

          {/* Compliance & legal registry footer */}
          <ComplianceFooter />
        </div>
      </main>
    </div>;
}
