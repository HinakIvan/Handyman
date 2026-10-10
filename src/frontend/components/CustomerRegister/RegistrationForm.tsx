"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { User, Mail, Lock, Phone, Eye, EyeOff, Check, X, ShieldCheck, AlertCircle, ArrowRight, Stamp } from "lucide-react";
import type { RegistrationFormData, RegistrationFormErrors, PasswordCriterion } from "@/frontend/types/CustomerRegister";
import { CustomerLogin } from "@/frontend/route-params";
interface RegistrationFormProps {
  formData: RegistrationFormData;
  formErrors: RegistrationFormErrors;
  isSubmitting: boolean;
  onFieldChange: (field: keyof RegistrationFormData, value: string | boolean) => void;
  onSubmit: (e: React.FormEvent) => void;
}
export default function RegistrationForm({
  formData,
  formErrors,
  isSubmitting,
  onFieldChange,
  onSubmit
}: RegistrationFormProps) {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);

  // Compute password criteria in real-time
  const passwordCriteria: PasswordCriterion[] = [{
    id: "length",
    label: "Minimum 8 characters",
    met: formData.password.length >= 8
  }, {
    id: "number",
    label: "At least one numeric digit (0-9)",
    met: /\d/.test(formData.password)
  }, {
    id: "letter",
    label: "At least one letter character",
    met: /[a-zA-Z]/.test(formData.password)
  }];
  return <div data-controller-name="Customer Registration Form" className="rounded-lg border border-border bg-card p-6 text-card-foreground shadow-elevated sm:p-8" data-api-unique-id='registrationform-r3af2d15c2a8399fa-s1617213805' data-api-unique-page-name='src/frontend/components/CustomerRegister/RegistrationForm'>
      {/* Blueprint Spec Stamp: Client Account Role Exclusivity */}
      <div className="mb-6 flex flex-col gap-3 rounded-md border border-border bg-background p-4 sm:flex-row sm:items-center sm:justify-between" data-api-unique-id='registrationform-r37eba4d3ec231488-s1617213805' data-api-unique-page-name='src/frontend/components/CustomerRegister/RegistrationForm'>
        <div className="flex items-center gap-2.5" data-api-unique-id='registrationform-r81af59c81bece5f7-s1617213805' data-api-unique-page-name='src/frontend/components/CustomerRegister/RegistrationForm'>
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-sm bg-accent text-accent-foreground" data-api-unique-id='registrationform-r02fbb7474d7ca67c-s1617213805' data-api-unique-page-name='src/frontend/components/CustomerRegister/RegistrationForm'>
            <Stamp className="h-4 w-4" data-api-unique-id='registrationform-rd56e585069bb2c47-s1617213805' data-api-unique-page-name='src/frontend/components/CustomerRegister/RegistrationForm' />
          </div>
          <div data-api-unique-id='registrationform-r86fdf2584eff08fa-s1617213805' data-api-unique-page-name='src/frontend/components/CustomerRegister/RegistrationForm'>
            <div className="flex items-center gap-2" data-api-unique-id='registrationform-r9cf57a4fc3684e2d-s1617213805' data-api-unique-page-name='src/frontend/components/CustomerRegister/RegistrationForm'>
              <span className="font-header text-xs font-bold uppercase tracking-wider text-accent" data-api-unique-id='registrationform-r3be93c63ab2a77b4-s1617213805' data-api-unique-page-name='src/frontend/components/CustomerRegister/RegistrationForm'>
                Auftraggeber-Konto
              </span>
              <span className="rounded-sm bg-secondary px-1.5 py-0.5 text-[10px] font-semibold text-secondary-foreground" data-api-unique-id='registrationform-r512d3fb6ac29c07d-s1617213805' data-api-unique-page-name='src/frontend/components/CustomerRegister/RegistrationForm'>
                Role: CUSTOMER
              </span>
            </div>
            <p className="text-[11px] text-muted-foreground" data-api-unique-id='registrationform-re87d5025026d1000-s1617213805' data-api-unique-page-name='src/frontend/components/CustomerRegister/RegistrationForm'>
              Registration exclusively issues residential & commercial client dossiers. No artisan role selection required.
            </p>
          </div>
        </div>
        <div className="shrink-0" data-api-unique-id='registrationform-r6456f450485f67cd-s1617213805' data-api-unique-page-name='src/frontend/components/CustomerRegister/RegistrationForm'>
          <span className="inline-flex items-center gap-1 rounded-sm border border-border bg-card px-2 py-1 text-[11px] font-medium text-card-foreground" data-api-unique-id='registrationform-r7692a097ef01d4ad-s1617213805' data-api-unique-page-name='src/frontend/components/CustomerRegister/RegistrationForm'>
            <ShieldCheck className="h-3 w-3 text-success" data-api-unique-id='registrationform-ra3dfa4d91b524e34-s1617213805' data-api-unique-page-name='src/frontend/components/CustomerRegister/RegistrationForm' />
            <span data-api-unique-id='registrationform-r90ca397f450c3ed1-s1617213805' data-api-unique-page-name='src/frontend/components/CustomerRegister/RegistrationForm'>Auto-Assigned</span>
          </span>
        </div>
      </div>

      {/* Global Form Error if any */}
      {formErrors.form && <div className="mb-6 flex items-start gap-2.5 rounded-md border border-destructive/20 bg-destructive/10 p-3.5 text-xs text-destructive" data-api-unique-id='registrationform-r4fed2e614826040d-s1617213805' data-api-unique-page-name='src/frontend/components/CustomerRegister/RegistrationForm'>
          <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-destructive" data-api-unique-id='registrationform-r67391d701543ea2f-s1617213805' data-api-unique-page-name='src/frontend/components/CustomerRegister/RegistrationForm' />
          <div className="space-y-1" data-api-unique-id='registrationform-r3ae76e06311def85-s1617213805' data-api-unique-page-name='src/frontend/components/CustomerRegister/RegistrationForm'>
            <p className="font-semibold text-destructive" data-api-unique-id='registrationform-r1517d39dcc13c9f1-s1617213805' data-api-unique-page-name='src/frontend/components/CustomerRegister/RegistrationForm'>Registration Incomplete</p>
            <p className="leading-relaxed text-destructive" data-api-unique-id='registrationform-r4dd5c75853e3ce9b-s1617213805' data-api-unique-page-name='src/frontend/components/CustomerRegister/RegistrationForm'>{formErrors.form}</p>
          </div>
        </div>}

      <form onSubmit={onSubmit} className="space-y-5" noValidate data-api-unique-id='registrationform-r9afc2c2efd02b95f-s1617213805' data-api-unique-page-name='src/frontend/components/CustomerRegister/RegistrationForm'>
        {/* Full Name */}
        <div className="space-y-1.5" data-api-unique-id='registrationform-r4a2f5b97dbf73b8e-s1617213805' data-api-unique-page-name='src/frontend/components/CustomerRegister/RegistrationForm'>
          <label htmlFor="register-fullname" className="flex items-center justify-between text-xs font-semibold text-card-foreground" data-api-unique-id='registrationform-rd6c073b09d5eb61f-s1617213805' data-api-unique-page-name='src/frontend/components/CustomerRegister/RegistrationForm'>
            <span data-api-unique-id='registrationform-rb241f7466dfaf19d-s1617213805' data-api-unique-page-name='src/frontend/components/CustomerRegister/RegistrationForm'>Full Name / Client Representative</span>
            <span className="text-[11px] text-muted-foreground" data-api-unique-id='registrationform-r92d5e930f60c572a-s1617213805' data-api-unique-page-name='src/frontend/components/CustomerRegister/RegistrationForm'>Vor- & Nachname</span>
          </label>
          <div className="relative" data-api-unique-id='registrationform-re9de5d09a6f53810-s1617213805' data-api-unique-page-name='src/frontend/components/CustomerRegister/RegistrationForm'>
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-muted-foreground" data-api-unique-id='registrationform-r26faf8542f9ff959-s1617213805' data-api-unique-page-name='src/frontend/components/CustomerRegister/RegistrationForm'>
              <User className="h-4 w-4" data-api-unique-id='registrationform-r4ec1b85fc93528e6-s1617213805' data-api-unique-page-name='src/frontend/components/CustomerRegister/RegistrationForm' />
            </div>
            <input id="register-fullname" name="fullName" type="text" autoComplete="name" required value={formData.fullName} onChange={e => onFieldChange("fullName", e.target.value)} placeholder="e.g. Dr. Markus Weber or Anna Gruber" className={`w-full rounded-md border bg-background py-2.5 pl-10 pr-3.5 text-sm text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${formErrors.fullName ? "border-destructive ring-1 ring-destructive" : "border-input"}`} data-api-unique-id='registrationform-r4f6a5f9164e46d83-s1617213805' data-api-unique-page-name='src/frontend/components/CustomerRegister/RegistrationForm' />
          </div>
          {formErrors.fullName && <p className="text-xs text-destructive" data-api-unique-id='registrationform-ra8024c5e2cb62033-s1617213805' data-api-unique-page-name='src/frontend/components/CustomerRegister/RegistrationForm'>{formErrors.fullName}</p>}
        </div>

        {/* Primary Login Email */}
        <div className="space-y-1.5" data-api-unique-id='registrationform-rebb25f06ceede92a-s1617213805' data-api-unique-page-name='src/frontend/components/CustomerRegister/RegistrationForm'>
          <label htmlFor="register-email" className="flex items-center justify-between text-xs font-semibold text-card-foreground" data-api-unique-id='registrationform-rab75b45d9bbb4019-s1617213805' data-api-unique-page-name='src/frontend/components/CustomerRegister/RegistrationForm'>
            <span data-api-unique-id='registrationform-r7062b67074b69f24-s1617213805' data-api-unique-page-name='src/frontend/components/CustomerRegister/RegistrationForm'>Primary Login Email</span>
            <span className="text-[11px] text-muted-foreground" data-api-unique-id='registrationform-rbb1591d844cab513-s1617213805' data-api-unique-page-name='src/frontend/components/CustomerRegister/RegistrationForm'>E-Mail-Adresse</span>
          </label>
          <div className="relative" data-api-unique-id='registrationform-ra1f7b2ece5115c07-s1617213805' data-api-unique-page-name='src/frontend/components/CustomerRegister/RegistrationForm'>
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-muted-foreground" data-api-unique-id='registrationform-r408a7a26edb34b15-s1617213805' data-api-unique-page-name='src/frontend/components/CustomerRegister/RegistrationForm'>
              <Mail className="h-4 w-4" data-api-unique-id='registrationform-r726669bd932342df-s1617213805' data-api-unique-page-name='src/frontend/components/CustomerRegister/RegistrationForm' />
            </div>
            <input id="register-email" name="email" type="email" autoComplete="email" required value={formData.email} onChange={e => onFieldChange("email", e.target.value)} placeholder="markus.weber@wien-immobilien.at" className={`w-full rounded-md border bg-background py-2.5 pl-10 pr-3.5 text-sm text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${formErrors.email ? "border-destructive ring-1 ring-destructive" : "border-input"}`} data-api-unique-id='registrationform-ra07af1490d3bd2b1-s1617213805' data-api-unique-page-name='src/frontend/components/CustomerRegister/RegistrationForm' />
          </div>
          {formErrors.email ? <p className="text-xs text-destructive" data-api-unique-id='registrationform-rf53e6b2c665f0bf2-s1617213805' data-api-unique-page-name='src/frontend/components/CustomerRegister/RegistrationForm'>{formErrors.email}</p> : <p className="text-[11px] text-muted-foreground" data-api-unique-id='registrationform-r73cd4bf1b9f4b16c-s1617213805' data-api-unique-page-name='src/frontend/components/CustomerRegister/RegistrationForm'>
              Used for quote inquiry notifications, estimate PDFs, and appointment confirmations.
            </p>}
        </div>

        {/* Password (Hashed as password_hash on backend) */}
        <div className="space-y-1.5" data-api-unique-id='registrationform-r222e1b2fe7e3bc59-s1617213805' data-api-unique-page-name='src/frontend/components/CustomerRegister/RegistrationForm'>
          <label htmlFor="register-password" className="flex items-center justify-between text-xs font-semibold text-card-foreground" data-api-unique-id='registrationform-rf3b25b1d606ea0fb-s1617213805' data-api-unique-page-name='src/frontend/components/CustomerRegister/RegistrationForm'>
            <span data-api-unique-id='registrationform-rf36c81d0887f8c30-s1617213805' data-api-unique-page-name='src/frontend/components/CustomerRegister/RegistrationForm'>Secure Password</span>
            <span className="text-[11px] text-muted-foreground" data-api-unique-id='registrationform-ra2643f9b959c3f22-s1617213805' data-api-unique-page-name='src/frontend/components/CustomerRegister/RegistrationForm'>Passwort festlegen</span>
          </label>
          <div className="relative" data-api-unique-id='registrationform-recf1f0b3685efb03-s1617213805' data-api-unique-page-name='src/frontend/components/CustomerRegister/RegistrationForm'>
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-muted-foreground" data-api-unique-id='registrationform-rf30955b6023e07b7-s1617213805' data-api-unique-page-name='src/frontend/components/CustomerRegister/RegistrationForm'>
              <Lock className="h-4 w-4" data-api-unique-id='registrationform-r13842ee975e0d03a-s1617213805' data-api-unique-page-name='src/frontend/components/CustomerRegister/RegistrationForm' />
            </div>
            <input id="register-password" name="password" type={showPassword ? "text" : "password"} autoComplete="new-password" required value={formData.password} onChange={e => onFieldChange("password", e.target.value)} placeholder="Minimum 8 characters with numbers" className={`w-full rounded-md border bg-background py-2.5 pl-10 pr-10 text-sm text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${formErrors.password ? "border-destructive ring-1 ring-destructive" : "border-input"}`} data-api-unique-id='registrationform-r88f7ef3d02b4a347-s1617213805' data-api-unique-page-name='src/frontend/components/CustomerRegister/RegistrationForm' />
            <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute inset-y-0 right-0 flex items-center pr-3 text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring" aria-label={showPassword ? "Hide password" : "Show password"} data-api-unique-id='registrationform-r39d8d4dc14ac4006-s1617213805' data-api-unique-page-name='src/frontend/components/CustomerRegister/RegistrationForm'>
              {showPassword ? <EyeOff className="h-4 w-4" data-api-unique-id='registrationform-rd9971d8e08a7ffc4-s1617213805' data-api-unique-page-name='src/frontend/components/CustomerRegister/RegistrationForm' /> : <Eye className="h-4 w-4" data-api-unique-id='registrationform-r278c4270b6621d8f-s1617213805' data-api-unique-page-name='src/frontend/components/CustomerRegister/RegistrationForm' />}
            </button>
          </div>
          {formErrors.password && <p className="text-xs text-destructive" data-api-unique-id='registrationform-rc6f5dd6e3a2fcd1a-s1617213805' data-api-unique-page-name='src/frontend/components/CustomerRegister/RegistrationForm'>{formErrors.password}</p>}

          {/* Password Security Criteria Indicator */}
          <div className="rounded-md border border-border bg-background/50 p-2.5" data-api-unique-id='registrationform-rda3aa007cd356af7-s1617213805' data-api-unique-page-name='src/frontend/components/CustomerRegister/RegistrationForm'>
            <div className="mb-1 text-[11px] font-medium text-muted-foreground" data-api-unique-id='registrationform-re805c739415a287a-s1617213805' data-api-unique-page-name='src/frontend/components/CustomerRegister/RegistrationForm'>
              Security standards for craftsman portal:
            </div>
            <div className="grid grid-cols-1 gap-1 sm:grid-cols-3" data-api-unique-id='registrationform-r98260415eecbfbd9-s1617213805' data-api-unique-page-name='src/frontend/components/CustomerRegister/RegistrationForm'>
              {passwordCriteria.map((criterion, index) => <div key={criterion.id} className="flex items-center gap-1.5 text-[11px]" data-api-unique-id='registrationform-r9ac5e32ca9b82e48-s1617213805' data-api-unique-page-name='src/frontend/components/CustomerRegister/RegistrationForm' data-api-in-loop='1'>
                  {criterion.met ? <Check className="h-3.5 w-3.5 shrink-0 text-success" data-api-unique-id='registrationform-re49e1ccb9139b6ed-s1617213805' data-api-unique-page-name='src/frontend/components/CustomerRegister/RegistrationForm' data-api-in-loop='1' /> : <X className="h-3.5 w-3.5 shrink-0 text-muted-foreground" data-api-unique-id='registrationform-r6d51d1fb0883b106-s1617213805' data-api-unique-page-name='src/frontend/components/CustomerRegister/RegistrationForm' data-api-in-loop='1' />}
                  <span className={criterion.met ? "font-medium text-success" : "text-muted-foreground"} data-api-unique-id='registrationform-r781426c396ca23e1-s1617213805' data-api-unique-page-name='src/frontend/components/CustomerRegister/RegistrationForm' data-api-in-loop='1' data-api-bind-info={`passwordCriteria-${index}-label`} data-api-map-var-name='criterion'>
                    {criterion.label}
                  </span>
                </div>)}
            </div>
          </div>
        </div>

        {/* Optional Contact Phone */}
        <div className="space-y-1.5" data-api-unique-id='registrationform-rd321fe20dfb482fb-s1617213805' data-api-unique-page-name='src/frontend/components/CustomerRegister/RegistrationForm'>
          <label htmlFor="register-phone" className="flex items-center justify-between text-xs font-semibold text-card-foreground" data-api-unique-id='registrationform-r6db7efe1782d3b3f-s1617213805' data-api-unique-page-name='src/frontend/components/CustomerRegister/RegistrationForm'>
            <span className="flex items-center gap-1.5" data-api-unique-id='registrationform-r54c6697d9cd17fdc-s1617213805' data-api-unique-page-name='src/frontend/components/CustomerRegister/RegistrationForm'>
              <span data-api-unique-id='registrationform-r07ecb9dbf009dc75-s1617213805' data-api-unique-page-name='src/frontend/components/CustomerRegister/RegistrationForm'>Contact Telephone</span>
              <span className="text-[10px] font-normal text-muted-foreground" data-api-unique-id='registrationform-rdc4910f52604af64-s1617213805' data-api-unique-page-name='src/frontend/components/CustomerRegister/RegistrationForm'>(Optional)</span>
            </span>
            <span className="text-[11px] text-muted-foreground" data-api-unique-id='registrationform-re4a269c9e7dd8cb2-s1617213805' data-api-unique-page-name='src/frontend/components/CustomerRegister/RegistrationForm'>Telefonnummer</span>
          </label>
          <div className="relative" data-api-unique-id='registrationform-r974b5f9c4a0016be-s1617213805' data-api-unique-page-name='src/frontend/components/CustomerRegister/RegistrationForm'>
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-muted-foreground" data-api-unique-id='registrationform-r70b671634ec9504b-s1617213805' data-api-unique-page-name='src/frontend/components/CustomerRegister/RegistrationForm'>
              <Phone className="h-4 w-4" data-api-unique-id='registrationform-rf420c8fcfcad14b1-s1617213805' data-api-unique-page-name='src/frontend/components/CustomerRegister/RegistrationForm' />
            </div>
            <input id="register-phone" name="phone" type="tel" autoComplete="tel" value={formData.phone} onChange={e => onFieldChange("phone", e.target.value)} placeholder="+43 1 234 5678 or mobile +43 676..." className={`w-full rounded-md border bg-background py-2.5 pl-10 pr-3.5 text-sm text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${formErrors.phone ? "border-destructive ring-1 ring-destructive" : "border-input"}`} data-api-unique-id='registrationform-rf63ed7fbc7e3af72-s1617213805' data-api-unique-page-name='src/frontend/components/CustomerRegister/RegistrationForm' />
          </div>
          {formErrors.phone ? <p className="text-xs text-destructive" data-api-unique-id='registrationform-rc876e15dcb3d9c7e-s1617213805' data-api-unique-page-name='src/frontend/components/CustomerRegister/RegistrationForm'>{formErrors.phone}</p> : <p className="text-[11px] text-muted-foreground" data-api-unique-id='registrationform-raf89f9702466d990-s1617213805' data-api-unique-page-name='src/frontend/components/CustomerRegister/RegistrationForm'>
              Recommended for urgent craftsman dispatch and site access coordination in Vienna.
            </p>}
        </div>

        {/* Terms & GDPR Agreement */}
        <div className="space-y-1.5 pt-1" data-api-unique-id='registrationform-r04ae30dd2e17c561-s1617213805' data-api-unique-page-name='src/frontend/components/CustomerRegister/RegistrationForm'>
          <label className="flex items-start gap-2.5 text-xs text-muted-foreground" data-api-unique-id='registrationform-r431f2f5b7d788d03-s1617213805' data-api-unique-page-name='src/frontend/components/CustomerRegister/RegistrationForm'>
            <input type="checkbox" name="agreedToTerms" checked={formData.agreedToTerms} onChange={e => onFieldChange("agreedToTerms", e.target.checked)} className="mt-0.5 h-4 w-4 rounded border-input text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring" data-api-unique-id='registrationform-r200ea3a846a2b21f-s1617213805' data-api-unique-page-name='src/frontend/components/CustomerRegister/RegistrationForm' />
            <span className="leading-relaxed" data-api-unique-id='registrationform-r51ba724b73f70cb5-s1617213805' data-api-unique-page-name='src/frontend/components/CustomerRegister/RegistrationForm'>
              I agree to the{" "}
              <span className="font-medium text-foreground" data-api-unique-id='registrationform-rc13413387a8738a8-s1617213805' data-api-unique-page-name='src/frontend/components/CustomerRegister/RegistrationForm'>General Terms of Handyman Service (AGB)</span>{" "}
              and acknowledge Austrian Data Protection compliance (DSGVO / GewO § 94).
            </span>
          </label>
          {formErrors.agreedToTerms && <p className="text-xs text-destructive" data-api-unique-id='registrationform-r949cd4f33f29a87a-s1617213805' data-api-unique-page-name='src/frontend/components/CustomerRegister/RegistrationForm'>{formErrors.agreedToTerms}</p>}
        </div>

        {/* Primary Submit Button */}
        <button type="submit" disabled={isSubmitting} className="inline-flex w-full items-center justify-center gap-2 rounded-md bg-primary py-3.5 text-sm font-semibold text-primary-foreground shadow-primary transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50" data-api-unique-id='registrationform-r38ab7e66e3331e6e-s1617213805' data-api-unique-page-name='src/frontend/components/CustomerRegister/RegistrationForm'>
          {isSubmitting ? <span data-api-unique-id='registrationform-rf28f6d692530f8a2-s1617213805' data-api-unique-page-name='src/frontend/components/CustomerRegister/RegistrationForm'>Creating Client Account...</span> : <>
              <span data-api-unique-id='registrationform-re9f2e4639f293aac-s1617213805' data-api-unique-page-name='src/frontend/components/CustomerRegister/RegistrationForm'>Create Client Account (Auftraggeber-Konto)</span>
              <ArrowRight className="h-4 w-4" data-api-unique-id='registrationform-rbb58b27739811f53-s1617213805' data-api-unique-page-name='src/frontend/components/CustomerRegister/RegistrationForm' />
            </>}
        </button>

        {/* Bottom Switch to Login Link */}
        <div className="pt-2 text-center text-xs text-muted-foreground" data-api-unique-id='registrationform-raea0c8db1c56e7ee-s1617213805' data-api-unique-page-name='src/frontend/components/CustomerRegister/RegistrationForm'>
          <span data-api-unique-id='registrationform-rff1d32dfd337c82b-s1617213805' data-api-unique-page-name='src/frontend/components/CustomerRegister/RegistrationForm'>Already registered with Vienna Handwerk? </span>
          <button type="button" onClick={() => CustomerLogin.navigateTo(router)} className="font-semibold text-primary underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring" data-api-unique-id='registrationform-re68b665b96604adb-s1617213805' data-api-unique-page-name='src/frontend/components/CustomerRegister/RegistrationForm'>
            Sign in to your client account
          </button>
        </div>
      </form>
    </div>;
}