"use client";

import React, { useState } from "react";
import { User, Mail, Lock, Eye, EyeOff, ShieldCheck, ArrowRight, Loader2 } from "lucide-react";
import { AdminRegisterFormValues, FormValidationErrors, PasswordStrengthState, PasswordRequirement } from "@/backend/types/AdminRegister";
import PasswordMeter from "./PasswordMeter";
export interface RegisterFormProps {
  values: AdminRegisterFormValues;
  errors: FormValidationErrors;
  isSubmitting: boolean;
  strength: PasswordStrengthState;
  requirements: PasswordRequirement[];
  onChange: (field: keyof AdminRegisterFormValues, val: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  onNavigateLogin: () => void;
}
export default function RegisterForm({
  values,
  errors,
  isSubmitting,
  strength,
  requirements,
  onChange,
  onSubmit,
  onNavigateLogin
}: RegisterFormProps) {
  const [showPassword, setShowPassword] = useState(false);
  return <form onSubmit={onSubmit} className="space-y-4" data-api-unique-id='registerform-r6893d08aa030705b-s996458308' data-api-unique-page-name='src/backend/components/AdminRegister/RegisterForm'>
      {/* Field 1: Administrator Full Name */}
      <div className="space-y-1.5" data-api-unique-id='registerform-r1fc2b289667cff45-s996458308' data-api-unique-page-name='src/backend/components/AdminRegister/RegisterForm'>
        <div className="flex items-center justify-between text-xs" data-api-unique-id='registerform-r41cbe2d5788eaee7-s996458308' data-api-unique-page-name='src/backend/components/AdminRegister/RegisterForm'>
          <label htmlFor="admin-fullname" className="font-medium text-card-foreground flex items-center gap-1.5" data-api-unique-id='registerform-r61c5237fe5334700-s996458308' data-api-unique-page-name='src/backend/components/AdminRegister/RegisterForm'>
            <User className="w-3.5 h-3.5 text-primary" data-api-unique-id='registerform-r35690faedd6870b8-s996458308' data-api-unique-page-name='src/backend/components/AdminRegister/RegisterForm' />
            <span data-api-unique-id='registerform-rff86f59ac849d6e9-s996458308' data-api-unique-page-name='src/backend/components/AdminRegister/RegisterForm'>Administrator Full Name</span>
          </label>
          <span className="text-[11px] text-muted-foreground font-mono" data-api-unique-id='registerform-rab5a18d426b0d3a5-s996458308' data-api-unique-page-name='src/backend/components/AdminRegister/RegisterForm'>Mandatory</span>
        </div>
        <div className="relative" data-api-unique-id='registerform-r2ba2c51671ca5e11-s996458308' data-api-unique-page-name='src/backend/components/AdminRegister/RegisterForm'>
          <input id="admin-fullname" type="text" required autoComplete="name" maxLength={255} placeholder="e.g. Maximilian Weber" value={values.fullName} onChange={e => onChange("fullName", e.target.value)} disabled={isSubmitting} className={`w-full h-10 px-3.5 pr-9 text-sm rounded-md bg-background border text-foreground placeholder:text-muted-foreground/60 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-1 ${errors.fullName ? "border-destructive" : "border-border hover:border-muted-foreground/50"}`} data-api-unique-id='registerform-r96212828d19d7167-s996458308' data-api-unique-page-name='src/backend/components/AdminRegister/RegisterForm' />
          <div className="absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none text-muted-foreground" data-api-unique-id='registerform-r2f094193f138b0de-s996458308' data-api-unique-page-name='src/backend/components/AdminRegister/RegisterForm'>
            <span className="text-[10px] font-mono tracking-wider px-1 py-0.5 rounded bg-muted text-muted-foreground" data-api-unique-id='registerform-r6d4827342eb08fff-s996458308' data-api-unique-page-name='src/backend/components/AdminRegister/RegisterForm'>
              AT
            </span>
          </div>
        </div>
        {errors.fullName ? <p className="text-xs text-destructive font-medium" data-api-unique-id='registerform-r0089e32b0dd2dbc4-s996458308' data-api-unique-page-name='src/backend/components/AdminRegister/RegisterForm'>{errors.fullName}</p> : <p className="text-[11px] text-muted-foreground" data-api-unique-id='registerform-r4a11a95767c8d12c-s996458308' data-api-unique-page-name='src/backend/components/AdminRegister/RegisterForm'>
            Enter your official name registered with the dispatch trade office.
          </p>}
      </div>

      {/* Field 2: Staff Email Address */}
      <div className="space-y-1.5" data-api-unique-id='registerform-r64e2dd6afe6c449d-s996458308' data-api-unique-page-name='src/backend/components/AdminRegister/RegisterForm'>
        <div className="flex items-center justify-between text-xs" data-api-unique-id='registerform-r03f9d04d8c967820-s996458308' data-api-unique-page-name='src/backend/components/AdminRegister/RegisterForm'>
          <label htmlFor="admin-email" className="font-medium text-card-foreground flex items-center gap-1.5" data-api-unique-id='registerform-r0655d0de8b6962e4-s996458308' data-api-unique-page-name='src/backend/components/AdminRegister/RegisterForm'>
            <Mail className="w-3.5 h-3.5 text-primary" data-api-unique-id='registerform-rf538151946b85f0b-s996458308' data-api-unique-page-name='src/backend/components/AdminRegister/RegisterForm' />
            <span data-api-unique-id='registerform-r1d83cbc63ea968ca-s996458308' data-api-unique-page-name='src/backend/components/AdminRegister/RegisterForm'>Staff Email Address</span>
          </label>
          <span className="text-[11px] text-muted-foreground font-mono" data-api-unique-id='registerform-rd8a37902b7ce5827-s996458308' data-api-unique-page-name='src/backend/components/AdminRegister/RegisterForm'>@handwerk.wien</span>
        </div>
        <div className="relative" data-api-unique-id='registerform-r993eab7385b55507-s996458308' data-api-unique-page-name='src/backend/components/AdminRegister/RegisterForm'>
          <input id="admin-email" type="email" required autoComplete="email" maxLength={255} placeholder="dispatcher@handwerk.wien" value={values.email} onChange={e => onChange("email", e.target.value)} disabled={isSubmitting} className={`w-full h-10 px-3.5 pr-20 text-sm rounded-md bg-background border text-foreground placeholder:text-muted-foreground/60 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-1 ${errors.email ? "border-destructive" : "border-border hover:border-muted-foreground/50"}`} data-api-unique-id='registerform-rd89d1c1171dc9e77-s996458308' data-api-unique-page-name='src/backend/components/AdminRegister/RegisterForm' />
          <div className="absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none flex items-center gap-1" data-api-unique-id='registerform-r7427883b10e55fc0-s996458308' data-api-unique-page-name='src/backend/components/AdminRegister/RegisterForm'>
            <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded bg-secondary text-secondary-foreground text-[10px] font-mono" title="WKO Compliance Verified Domain" data-api-unique-id='registerform-re903c783034ffc00-s996458308' data-api-unique-page-name='src/backend/components/AdminRegister/RegisterForm'>
              <ShieldCheck className="w-3 h-3 text-primary" data-api-unique-id='registerform-rb6c8092800adb4a7-s996458308' data-api-unique-page-name='src/backend/components/AdminRegister/RegisterForm' />
              <span data-api-unique-id='registerform-r05d0a83403ab9054-s996458308' data-api-unique-page-name='src/backend/components/AdminRegister/RegisterForm'>WKO</span>
            </span>
          </div>
        </div>
        {errors.email ? <p className="text-xs text-destructive font-medium" data-api-unique-id='registerform-r48bf07b299e5ab10-s996458308' data-api-unique-page-name='src/backend/components/AdminRegister/RegisterForm'>{errors.email}</p> : <p className="text-[11px] text-muted-foreground" data-api-unique-id='registerform-r63ccf8497be70758-s996458308' data-api-unique-page-name='src/backend/components/AdminRegister/RegisterForm'>
            Internal administrative routing email for dispatch notifications.
          </p>}
      </div>

      {/* Field 3: Master Password */}
      <div className="space-y-1.5" data-api-unique-id='registerform-re0a47f3bf1fa5ed3-s996458308' data-api-unique-page-name='src/backend/components/AdminRegister/RegisterForm'>
        <div className="flex items-center justify-between text-xs" data-api-unique-id='registerform-r5c73feb6f0d90421-s996458308' data-api-unique-page-name='src/backend/components/AdminRegister/RegisterForm'>
          <label htmlFor="admin-password" className="font-medium text-card-foreground flex items-center gap-1.5" data-api-unique-id='registerform-r8662501c87dfe0ef-s996458308' data-api-unique-page-name='src/backend/components/AdminRegister/RegisterForm'>
            <Lock className="w-3.5 h-3.5 text-primary" data-api-unique-id='registerform-r7e0270e0dee36156-s996458308' data-api-unique-page-name='src/backend/components/AdminRegister/RegisterForm' />
            <span data-api-unique-id='registerform-r8b68f23941df83e5-s996458308' data-api-unique-page-name='src/backend/components/AdminRegister/RegisterForm'>Master Password</span>
          </label>
          <span className="text-[11px] text-accent font-semibold tracking-wide" data-api-unique-id='registerform-r5522c348ac590a61-s996458308' data-api-unique-page-name='src/backend/components/AdminRegister/RegisterForm'>
            Role: ADMIN
          </span>
        </div>
        <div className="relative" data-api-unique-id='registerform-r5e5e960c09ec45a6-s996458308' data-api-unique-page-name='src/backend/components/AdminRegister/RegisterForm'>
          <input id="admin-password" type={showPassword ? "text" : "password"} required autoComplete="new-password" maxLength={255} placeholder="••••••••••••" value={values.password} onChange={e => onChange("password", e.target.value)} disabled={isSubmitting} className={`w-full h-10 px-3.5 pr-10 text-sm font-mono rounded-md bg-background border text-foreground placeholder:text-muted-foreground/60 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-1 ${errors.password ? "border-destructive" : "border-border hover:border-muted-foreground/50"}`} data-api-unique-id='registerform-r8ddc12888cc86e87-s996458308' data-api-unique-page-name='src/backend/components/AdminRegister/RegisterForm' />
          <button type="button" onClick={() => setShowPassword(!showPassword)} tabIndex={-1} aria-label={showPassword ? "Hide password" : "Show password"} className="absolute right-2.5 top-1/2 -translate-y-1/2 p-1 text-muted-foreground hover:text-foreground rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary" data-api-unique-id='registerform-r7c5fc534f4947183-s996458308' data-api-unique-page-name='src/backend/components/AdminRegister/RegisterForm'>
            {showPassword ? <EyeOff className="w-4 h-4" data-api-unique-id='registerform-r786bf9cacbba61f0-s996458308' data-api-unique-page-name='src/backend/components/AdminRegister/RegisterForm' /> : <Eye className="w-4 h-4" data-api-unique-id='registerform-r60497e2b40b67c57-s996458308' data-api-unique-page-name='src/backend/components/AdminRegister/RegisterForm' />}
          </button>
        </div>
        {errors.password && <p className="text-xs text-destructive font-medium" data-api-unique-id='registerform-r7c7871b6755af98c-s996458308' data-api-unique-page-name='src/backend/components/AdminRegister/RegisterForm'>{errors.password}</p>}

        {/* Real-time Password Strength Meter */}
        <PasswordMeter strength={strength} requirements={requirements} passwordValue={values.password} data-api-unique-id='registerform-rb432ff41bacb42db-s996458308' data-api-unique-page-name='src/backend/components/AdminRegister/RegisterForm' />
      </div>

      {/* Role notice banner - Strict ADMIN notice per contract */}
      <div className="p-2.5 rounded-md bg-muted text-muted-foreground border border-border text-xs flex items-center justify-between" data-api-unique-id='registerform-r79c269c6662351a5-s996458308' data-api-unique-page-name='src/backend/components/AdminRegister/RegisterForm'>
        <div className="flex items-center gap-2" data-api-unique-id='registerform-r1b59a88d8ed1baf8-s996458308' data-api-unique-page-name='src/backend/components/AdminRegister/RegisterForm'>
          <span className="w-2 h-2 rounded-full bg-accent" data-api-unique-id='registerform-rcfce480c7090aea6-s996458308' data-api-unique-page-name='src/backend/components/AdminRegister/RegisterForm' />
          <span className="font-medium text-foreground" data-api-unique-id='registerform-rc2045600beb53db5-s996458308' data-api-unique-page-name='src/backend/components/AdminRegister/RegisterForm'>Designated Access Tier:</span>
        </div>
        <span className="font-mono font-bold text-accent px-1.5 py-0.5 rounded bg-secondary text-secondary-foreground text-[11px]" data-api-unique-id='registerform-rda832b21653e9065-s996458308' data-api-unique-page-name='src/backend/components/AdminRegister/RegisterForm'>
          ADMINISTRATOR (DISPATCH LEAD)
        </span>
      </div>

      {/* Primary Action Button: Create Admin Account */}
      <div className="pt-2" data-api-unique-id='registerform-rd6f42257c0891ade-s996458308' data-api-unique-page-name='src/backend/components/AdminRegister/RegisterForm'>
        <button type="submit" disabled={isSubmitting} className="w-full h-11 px-4 rounded-md bg-primary text-primary-foreground font-semibold text-sm shadow-sm hover:bg-primary/90 active:bg-primary/80 transition-all duration-150 flex items-center justify-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none" data-api-unique-id='registerform-rf04c7c3da02251eb-s996458308' data-api-unique-page-name='src/backend/components/AdminRegister/RegisterForm'>
          {isSubmitting ? <>
              <Loader2 className="w-4 h-4 animate-spin text-primary-foreground" data-api-unique-id='registerform-ra38c2a46ed146b0f-s996458308' data-api-unique-page-name='src/backend/components/AdminRegister/RegisterForm' />
              <span data-api-unique-id='registerform-r518ae6faca2a4c79-s996458308' data-api-unique-page-name='src/backend/components/AdminRegister/RegisterForm'>Provisioning Admin Account...</span>
            </> : <>
              <span data-api-unique-id='registerform-r3b2b3ff981fc9888-s996458308' data-api-unique-page-name='src/backend/components/AdminRegister/RegisterForm'>Create Admin Account</span>
              <ArrowRight className="w-4 h-4 text-primary-foreground" data-api-unique-id='registerform-r1c6b834584a8f0f4-s996458308' data-api-unique-page-name='src/backend/components/AdminRegister/RegisterForm' />
            </>}
        </button>
      </div>

      {/* Secondary Action: Navigation link to Admin Login (B05) */}
      <div className="text-center pt-1" data-api-unique-id='registerform-r17fe4182ae1fc815-s996458308' data-api-unique-page-name='src/backend/components/AdminRegister/RegisterForm'>
        <p className="text-xs text-muted-foreground" data-api-unique-id='registerform-r6c856ac999e264e6-s996458308' data-api-unique-page-name='src/backend/components/AdminRegister/RegisterForm'>
          Existing administrator with active credentials?{" "}
          <button type="button" onClick={onNavigateLogin} className="text-primary font-semibold hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded px-1 py-0.5" data-api-unique-id='registerform-re4087f8bfa9ebb39-s996458308' data-api-unique-page-name='src/backend/components/AdminRegister/RegisterForm'>
            Admin Log In →
          </button>
        </p>
      </div>
    </form>;
}