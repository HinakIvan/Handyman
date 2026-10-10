"use client";

import React, { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Mail, Lock, Loader2, ArrowRight, ShieldAlert, KeyRound } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { LoginFormValues, FormValidationErrors } from "@/backend/types/AdminLogin";
import { loginAdmin } from "@/backend/actions/AdminLogin";
import { useAdminSession } from "@/tools/BackendSession";
import { AdminOperationsDashboard, AdminRegister } from "@/backend/route-params";
interface AdminLoginFormProps {
  onSubmit?: (values: LoginFormValues) => Promise<void>;
  isLoading?: boolean;
  onNavigateToRegister?: () => void;
}
export default function AdminLoginForm({
  onSubmit,
  isLoading = false,
  onNavigateToRegister
}: AdminLoginFormProps = {}) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const {
    set
  } = useAdminSession();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<FormValidationErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const effectiveLoading = isLoading || isSubmitting;
  const validate = (): boolean => {
    const nextErrors: FormValidationErrors = {};
    if (!email.trim()) {
      nextErrors.email = "Administrator email is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      nextErrors.email = "Please enter a valid administrative email address.";
    }
    if (!password) {
      nextErrors.password = "Authentication password is required.";
    } else if (password.length < 6) {
      nextErrors.password = "Password must be at least 6 characters.";
    }
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate() || effectiveLoading) return;
    setIsSubmitting(true);
    setErrors(prev => ({
      ...prev,
      general: undefined
    }));
    try {
      const res = await loginAdmin({
        email: email.trim(),
        password
      });
      set({
        token: res.token,
        user_id: res.userId,
        email: res.email,
        full_name: res.fullName,
        role: res.role
      });
      if (onSubmit) {
        try {
          await onSubmit({
            email: email.trim(),
            password
          });
        } catch {
          // Parent callback error does not impede redirect upon successful verification
        }
      }
      const redirect = searchParams?.get("redirect");
      if (redirect && /^\/(?![\/\\])/.test(redirect)) {
        router.replace(redirect);
      } else {
        AdminOperationsDashboard.navigateTo(router);
      }
    } catch (err: unknown) {
      setErrors(prev => ({
        ...prev,
        general: err instanceof Error ? err.message : "Invalid administrator credentials."
      }));
    } finally {
      setIsSubmitting(false);
    }
  };
  const handleRegisterNavigation = () => {
    AdminRegister.navigateTo(router);
    if (onNavigateToRegister) {
      onNavigateToRegister();
    }
  };
  return <form onSubmit={handleSubmit} className="space-y-4 w-full" data-api-unique-id='adminloginform-r3377c52508254ada-s2001826434' data-api-unique-page-name='src/backend/components/AdminLogin/AdminLoginForm'>
      {/* General Submission Error Banner */}
      {errors.general && <div className="p-3 rounded-md bg-destructive/10 border border-destructive/20 flex items-center gap-2 text-xs text-destructive font-medium" data-api-unique-id='adminloginform-r20d7f3c181367427-s2001826434' data-api-unique-page-name='src/backend/components/AdminLogin/AdminLoginForm'>
          <ShieldAlert className="w-4 h-4 shrink-0" data-api-unique-id='adminloginform-r98499195737363dc-s2001826434' data-api-unique-page-name='src/backend/components/AdminLogin/AdminLoginForm' />
          <span data-api-unique-id='adminloginform-rc498a4ee8d422e3a-s2001826434' data-api-unique-page-name='src/backend/components/AdminLogin/AdminLoginForm'>{errors.general}</span>
        </div>}

      {/* Email Address Field */}
      <div className="space-y-1.5" data-api-unique-id='adminloginform-r7d7794b0842e1e17-s2001826434' data-api-unique-page-name='src/backend/components/AdminLogin/AdminLoginForm'>
        <label htmlFor="admin-email" className="flex items-center justify-between text-xs font-semibold text-card-foreground tracking-wide" data-api-unique-id='adminloginform-rdf1c0d95f359e8fa-s2001826434' data-api-unique-page-name='src/backend/components/AdminLogin/AdminLoginForm'>
          <span className="flex items-center gap-1.5" data-api-unique-id='adminloginform-rc1ce1e157e279dae-s2001826434' data-api-unique-page-name='src/backend/components/AdminLogin/AdminLoginForm'>
            <Mail className="w-3.5 h-3.5 text-muted-foreground" data-api-unique-id='adminloginform-r2b9c3e143b4ad24f-s2001826434' data-api-unique-page-name='src/backend/components/AdminLogin/AdminLoginForm' />
            Operations Email Address
          </span>
          <span className="text-[11px] font-mono text-muted-foreground" data-api-unique-id='adminloginform-r49744fa2ee2f364a-s2001826434' data-api-unique-page-name='src/backend/components/AdminLogin/AdminLoginForm'>ADMIN ID</span>
        </label>
        <div className="relative" data-api-unique-id='adminloginform-r16a2dc56a8ccf5eb-s2001826434' data-api-unique-page-name='src/backend/components/AdminLogin/AdminLoginForm'>
          <Input id="admin-email" type="email" value={email} onChange={e => {
          setEmail(e.target.value);
          if (errors.email || errors.general) {
            setErrors(prev => ({
              ...prev,
              email: undefined,
              general: undefined
            }));
          }
        }} placeholder="Enter administrative email" data-auto="account" disabled={effectiveLoading} className="w-full bg-background border-border text-foreground placeholder:text-muted-foreground h-10 px-3 text-sm focus-visible:ring-2 focus-visible:ring-ring focus-visible:border-primary font-body" data-api-unique-id='adminloginform-rda948d0458b08149-s2001826434' data-api-unique-page-name='src/backend/components/AdminLogin/AdminLoginForm' />
        </div>
        {errors.email && <p className="text-[11px] text-destructive flex items-center gap-1 font-medium pt-0.5" data-api-unique-id='adminloginform-r4400ffc2f66b4c95-s2001826434' data-api-unique-page-name='src/backend/components/AdminLogin/AdminLoginForm'>
            <ShieldAlert className="w-3 h-3 shrink-0" data-api-unique-id='adminloginform-r9f25af53a3b39f31-s2001826434' data-api-unique-page-name='src/backend/components/AdminLogin/AdminLoginForm' />
            <span data-api-unique-id='adminloginform-ra00b9c48076c5acd-s2001826434' data-api-unique-page-name='src/backend/components/AdminLogin/AdminLoginForm'>{errors.email}</span>
          </p>}
      </div>

      {/* Password Field */}
      <div className="space-y-1.5" data-api-unique-id='adminloginform-r185923f881903a1f-s2001826434' data-api-unique-page-name='src/backend/components/AdminLogin/AdminLoginForm'>
        <div className="flex items-center justify-between text-xs font-semibold text-card-foreground tracking-wide" data-api-unique-id='adminloginform-rf49e48a4428afd95-s2001826434' data-api-unique-page-name='src/backend/components/AdminLogin/AdminLoginForm'>
          <label htmlFor="admin-password" className="flex items-center gap-1.5" data-api-unique-id='adminloginform-r61275aca83f95862-s2001826434' data-api-unique-page-name='src/backend/components/AdminLogin/AdminLoginForm'>
            <Lock className="w-3.5 h-3.5 text-muted-foreground" data-api-unique-id='adminloginform-rd8f65339fd2a1440-s2001826434' data-api-unique-page-name='src/backend/components/AdminLogin/AdminLoginForm' />
            Security Credential (Password)
          </label>
          <span className="text-[11px] font-mono text-muted-foreground" data-api-unique-id='adminloginform-r7be3e48d93ff43fe-s2001826434' data-api-unique-page-name='src/backend/components/AdminLogin/AdminLoginForm'>HASH V4</span>
        </div>
        <div className="relative" data-api-unique-id='adminloginform-rf4e6643bcb2e5b57-s2001826434' data-api-unique-page-name='src/backend/components/AdminLogin/AdminLoginForm'>
          <Input id="admin-password" type="password" value={password} onChange={e => {
          setPassword(e.target.value);
          if (errors.password || errors.general) {
            setErrors(prev => ({
              ...prev,
              password: undefined,
              general: undefined
            }));
          }
        }} placeholder="Enter password" data-auto="password" disabled={effectiveLoading} className="w-full bg-background border-border text-foreground placeholder:text-muted-foreground h-10 px-3 text-sm focus-visible:ring-2 focus-visible:ring-ring focus-visible:border-primary font-body" data-api-unique-id='adminloginform-r26332d6cab27d957-s2001826434' data-api-unique-page-name='src/backend/components/AdminLogin/AdminLoginForm' />
        </div>
        {errors.password && <p className="text-[11px] text-destructive flex items-center gap-1 font-medium pt-0.5" data-api-unique-id='adminloginform-r21c12d7baa8294df-s2001826434' data-api-unique-page-name='src/backend/components/AdminLogin/AdminLoginForm'>
            <ShieldAlert className="w-3 h-3 shrink-0" data-api-unique-id='adminloginform-r31a577889dab2e82-s2001826434' data-api-unique-page-name='src/backend/components/AdminLogin/AdminLoginForm' />
            <span data-api-unique-id='adminloginform-r4acae433c2135ddf-s2001826434' data-api-unique-page-name='src/backend/components/AdminLogin/AdminLoginForm'>{errors.password}</span>
          </p>}
      </div>

      {/* Role Notice Pill */}
      <div className="px-3 py-2 rounded-md bg-muted/60 border border-border flex items-center justify-between text-xs text-muted-foreground" data-api-unique-id='adminloginform-re8a43c671145f266-s2001826434' data-api-unique-page-name='src/backend/components/AdminLogin/AdminLoginForm'>
        <div className="flex items-center gap-2" data-api-unique-id='adminloginform-r82d7bdc0b06bca58-s2001826434' data-api-unique-page-name='src/backend/components/AdminLogin/AdminLoginForm'>
          <KeyRound className="w-3.5 h-3.5 text-primary shrink-0" data-api-unique-id='adminloginform-r85f83f682457f20e-s2001826434' data-api-unique-page-name='src/backend/components/AdminLogin/AdminLoginForm' />
          <span data-api-unique-id='adminloginform-r38d5ed8579202304-s2001826434' data-api-unique-page-name='src/backend/components/AdminLogin/AdminLoginForm'>Access Tier:</span>
        </div>
        <span className="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-semibold bg-accent text-accent-foreground" data-api-unique-id='adminloginform-r4f41f7932f113fa4-s2001826434' data-api-unique-page-name='src/backend/components/AdminLogin/AdminLoginForm'>
          Operations Administrator (ADMIN)
        </span>
      </div>

      {/* Primary Submit Action */}
      <Button type="submit" data-auto="submit" disabled={effectiveLoading} className="w-full h-11 bg-primary text-primary-foreground hover:bg-primary/90 active:bg-primary/80 font-semibold tracking-wide transition-all shadow-sm flex items-center justify-center gap-2 mt-2" data-api-unique-id='adminloginform-r97a41202d1006bf8-s2001826434' data-api-unique-page-name='src/backend/components/AdminLogin/AdminLoginForm'>
        {effectiveLoading ? <>
            <Loader2 className="w-4 h-4 animate-spin shrink-0" data-api-unique-id='adminloginform-r0aef74d5f6f373e7-s2001826434' data-api-unique-page-name='src/backend/components/AdminLogin/AdminLoginForm' />
            <span data-api-unique-id='adminloginform-r8ec07f3b564a26d0-s2001826434' data-api-unique-page-name='src/backend/components/AdminLogin/AdminLoginForm'>Verifying Credentials...</span>
          </> : <>
            <span data-api-unique-id='adminloginform-r9224434f5cb8d7e6-s2001826434' data-api-unique-page-name='src/backend/components/AdminLogin/AdminLoginForm'>Anmelden / Sign In</span>
            <ArrowRight className="w-4 h-4 shrink-0" data-api-unique-id='adminloginform-r26c7a68e73c8dc0c-s2001826434' data-api-unique-page-name='src/backend/components/AdminLogin/AdminLoginForm' />
          </>}
      </Button>

      {/* Initial Admin Onboarding Link */}
      <div className="pt-2 text-center border-t border-border/80" data-api-unique-id='adminloginform-r9468f4e2bd0d70aa-s2001826434' data-api-unique-page-name='src/backend/components/AdminLogin/AdminLoginForm'>
        <p className="text-xs text-muted-foreground" data-api-unique-id='adminloginform-rcf2ae46fe1a6b632-s2001826434' data-api-unique-page-name='src/backend/components/AdminLogin/AdminLoginForm'>
          First-time administrator onboarding?{" "}
          <button type="button" onClick={handleRegisterNavigation} className="font-semibold text-primary hover:underline focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring rounded px-1" data-api-unique-id='adminloginform-r0dab52889a268cdf-s2001826434' data-api-unique-page-name='src/backend/components/AdminLogin/AdminLoginForm'>
            Register Administrator Account →
          </button>
        </p>
      </div>
    </form>;
}