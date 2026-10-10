"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Lock, Mail, ShieldCheck, ArrowRight, Eye, EyeOff, AlertCircle, FileCheck2 } from "lucide-react";
import { loginCustomer } from "@/frontend/actions/CustomerLogin";
import { CustomerLoginFormValues, CustomerLoginFormErrors } from "@/frontend/types/CustomerLogin";
import { useUserSession } from "@/tools/FrontendSession";
import { HomeFrontend, CustomerRegister } from "@/frontend/route-params";
export interface CredentialFormCardProps {
  onSubmit?: (values: CustomerLoginFormValues) => void;
  isLoading?: boolean;
  serverError?: string | null;
}
export default function CredentialFormCard({
  onSubmit,
  isLoading = false,
  serverError = null
}: CredentialFormCardProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const {
    set
  } = useUserSession();
  const [values, setValues] = useState<CustomerLoginFormValues>({
    email: "",
    password: ""
  });
  const [errors, setErrors] = useState<CustomerLoginFormErrors>({});
  const [showPassword, setShowPassword] = useState(false);
  const [localLoading, setLocalLoading] = useState(false);
  const [localError, setLocalError] = useState<string | null>(null);
  const validate = (): boolean => {
    const newErrors: CustomerLoginFormErrors = {};
    if (!values.email.trim()) {
      newErrors.email = "Please enter your registered email address.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim())) {
      newErrors.email = "Please provide a valid email format (e.g. client@domain.at).";
    }
    if (!values.password) {
      newErrors.password = "Please enter your customer dossier password.";
    } else if (values.password.length < 6) {
      newErrors.password = "Password must contain at least 6 characters.";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) {
      return;
    }
    setLocalError(null);
    setLocalLoading(true);
    try {
      const res = await loginCustomer({
        email: values.email,
        password: values.password
      });
      set({
        token: res.token,
        user_id: res.userId,
        email: res.email,
        full_name: res.fullName,
        role: "CUSTOMER"
      });
      onSubmit?.(values);
      const redirect = searchParams.get("redirect");
      if (redirect && /^\/(?![\/\\])/.test(redirect)) {
        router.replace(redirect);
      } else {
        HomeFrontend.navigateTo(router);
      }
    } catch (err) {
      const message = err instanceof Error ? err.message : "Invalid email address or password.";
      setLocalError(message);
    } finally {
      setLocalLoading(false);
    }
  };
  const currentLoading = isLoading || localLoading;
  const currentError = localError || serverError;
  return <div data-controller-name="Customer Authentication Box" className="w-full rounded-lg border border-border bg-card p-6 text-card-foreground shadow-elevated sm:p-8" data-api-unique-id='credentialformcard-ra70519cf3d1540aa-s669035872' data-api-unique-page-name='src/frontend/components/CustomerLogin/CredentialFormCard'>
      {/* Header Info with Role Badge */}
      <div className="border-b border-border pb-5" data-api-unique-id='credentialformcard-r156d277cee4227dd-s669035872' data-api-unique-page-name='src/frontend/components/CustomerLogin/CredentialFormCard'>
        <div className="flex flex-wrap items-center justify-between gap-2" data-api-unique-id='credentialformcard-r5947139056019990-s669035872' data-api-unique-page-name='src/frontend/components/CustomerLogin/CredentialFormCard'>
          <span className="inline-flex items-center gap-1.5 rounded-sm bg-accent px-2.5 py-1 text-xs font-semibold uppercase tracking-wider text-accent-foreground" data-api-unique-id='credentialformcard-r710d6a2420fe3f85-s669035872' data-api-unique-page-name='src/frontend/components/CustomerLogin/CredentialFormCard'>
            <ShieldCheck className="h-3.5 w-3.5" data-api-unique-id='credentialformcard-ra2f7aec59f46cdb5-s669035872' data-api-unique-page-name='src/frontend/components/CustomerLogin/CredentialFormCard' />
            Customer Portal Access
          </span>
          <span className="text-xs font-medium text-muted-foreground" data-api-unique-id='credentialformcard-rdb994310fb2bc001-s669035872' data-api-unique-page-name='src/frontend/components/CustomerLogin/CredentialFormCard'>
            Role: Registered Client Only
          </span>
        </div>
        <h2 className="mt-4 text-xl font-bold tracking-tight text-card-foreground sm:text-2xl font-header" data-api-unique-id='credentialformcard-r8dbff11ca034723a-s669035872' data-api-unique-page-name='src/frontend/components/CustomerLogin/CredentialFormCard'>
          Account Sign-In
        </h2>
        <p className="mt-1 text-sm text-muted-foreground" data-api-unique-id='credentialformcard-r3586f85211cc0b8b-s669035872' data-api-unique-page-name='src/frontend/components/CustomerLogin/CredentialFormCard'>
          Authenticate to inspect quotes, rate estimates, and artisan site schedules.
        </p>
      </div>

      {/* Server / Credential Feedback */}
      {currentError && <div role="alert" className="mt-5 flex items-start gap-3 rounded-md border border-destructive/20 bg-destructive/10 p-3.5 text-sm text-destructive" data-api-unique-id='credentialformcard-r957e6edf4a55e981-s669035872' data-api-unique-page-name='src/frontend/components/CustomerLogin/CredentialFormCard'>
          <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-destructive" data-api-unique-id='credentialformcard-rd086b5f74006463f-s669035872' data-api-unique-page-name='src/frontend/components/CustomerLogin/CredentialFormCard' />
          <div className="min-w-0" data-api-unique-id='credentialformcard-r3a9300cac51f2a48-s669035872' data-api-unique-page-name='src/frontend/components/CustomerLogin/CredentialFormCard'>
            <p className="font-semibold text-destructive" data-api-unique-id='credentialformcard-r867a0b6e08d59b3d-s669035872' data-api-unique-page-name='src/frontend/components/CustomerLogin/CredentialFormCard'>Authentication Notice</p>
            <p className="mt-0.5 break-words text-xs text-destructive" data-api-unique-id='credentialformcard-ra1de38a669f0e48b-s669035872' data-api-unique-page-name='src/frontend/components/CustomerLogin/CredentialFormCard'>{currentError}</p>
          </div>
        </div>}

      {/* Login Form */}
      <form onSubmit={handleSubmit} className="mt-6 space-y-5" noValidate data-api-unique-id='credentialformcard-r6a4f97727745d43b-s669035872' data-api-unique-page-name='src/frontend/components/CustomerLogin/CredentialFormCard'>
        {/* Email Field */}
        <div className="space-y-1.5" data-api-unique-id='credentialformcard-r271e4013c9a3e8ea-s669035872' data-api-unique-page-name='src/frontend/components/CustomerLogin/CredentialFormCard'>
          <label htmlFor="customer-email" className="block text-xs font-semibold uppercase tracking-wider text-card-foreground" data-api-unique-id='credentialformcard-r57d0163d6e11bdc3-s669035872' data-api-unique-page-name='src/frontend/components/CustomerLogin/CredentialFormCard'>
            Registered Email Address
          </label>
          <div className="relative" data-api-unique-id='credentialformcard-r4e89d6a26cacfabe-s669035872' data-api-unique-page-name='src/frontend/components/CustomerLogin/CredentialFormCard'>
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-muted-foreground" data-api-unique-id='credentialformcard-rc4aefb787833404e-s669035872' data-api-unique-page-name='src/frontend/components/CustomerLogin/CredentialFormCard'>
              <Mail className="h-4 w-4" data-api-unique-id='credentialformcard-r7d1380a55e121e60-s669035872' data-api-unique-page-name='src/frontend/components/CustomerLogin/CredentialFormCard' />
            </div>
            <input id="customer-email" type="email" autoComplete="email" data-auto="account" placeholder="Enter your email address" value={values.email} onChange={e => {
            setValues(prev => ({
              ...prev,
              email: e.target.value
            }));
            if (errors.email) {
              setErrors(prev => ({
                ...prev,
                email: undefined
              }));
            }
          }} className={`w-full rounded-md border bg-background py-3 pl-10 pr-4 text-sm text-foreground transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background ${errors.email ? "border-destructive ring-1 ring-destructive" : "border-input"}`} data-api-unique-id='credentialformcard-r91af25274d936074-s669035872' data-api-unique-page-name='src/frontend/components/CustomerLogin/CredentialFormCard' />
          </div>
          {errors.email && <p className="text-xs text-destructive" data-api-unique-id='credentialformcard-r8333f38694ee8e44-s669035872' data-api-unique-page-name='src/frontend/components/CustomerLogin/CredentialFormCard'>{errors.email}</p>}
        </div>

        {/* Password Field */}
        <div className="space-y-1.5" data-api-unique-id='credentialformcard-rc7e0a4e565d703a8-s669035872' data-api-unique-page-name='src/frontend/components/CustomerLogin/CredentialFormCard'>
          <div className="flex items-center justify-between" data-api-unique-id='credentialformcard-r7e9db15079d7b12b-s669035872' data-api-unique-page-name='src/frontend/components/CustomerLogin/CredentialFormCard'>
            <label htmlFor="customer-password" className="block text-xs font-semibold uppercase tracking-wider text-card-foreground" data-api-unique-id='credentialformcard-r857e6e271e41e398-s669035872' data-api-unique-page-name='src/frontend/components/CustomerLogin/CredentialFormCard'>
              Account Password
            </label>
            <span className="text-xs text-muted-foreground" data-api-unique-id='credentialformcard-rbc20bdb06282eabb-s669035872' data-api-unique-page-name='src/frontend/components/CustomerLogin/CredentialFormCard'>
              Min. 6 characters
            </span>
          </div>
          <div className="relative" data-api-unique-id='credentialformcard-ra542205d8b5d5b7e-s669035872' data-api-unique-page-name='src/frontend/components/CustomerLogin/CredentialFormCard'>
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-muted-foreground" data-api-unique-id='credentialformcard-r641ba98cd977ea31-s669035872' data-api-unique-page-name='src/frontend/components/CustomerLogin/CredentialFormCard'>
              <Lock className="h-4 w-4" data-api-unique-id='credentialformcard-rea42d0673b4893a8-s669035872' data-api-unique-page-name='src/frontend/components/CustomerLogin/CredentialFormCard' />
            </div>
            <input id="customer-password" type={showPassword ? "text" : "password"} autoComplete="current-password" data-auto="password" placeholder="Enter your account password" value={values.password} onChange={e => {
            setValues(prev => ({
              ...prev,
              password: e.target.value
            }));
            if (errors.password) {
              setErrors(prev => ({
                ...prev,
                password: undefined
              }));
            }
          }} className={`w-full rounded-md border bg-background py-3 pl-10 pr-11 text-sm text-foreground transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background ${errors.password ? "border-destructive ring-1 ring-destructive" : "border-input"}`} data-api-unique-id='credentialformcard-r5fd075afc7528f3d-s669035872' data-api-unique-page-name='src/frontend/components/CustomerLogin/CredentialFormCard' />
            <button type="button" onClick={() => setShowPassword(!showPassword)} aria-label={showPassword ? "Hide password" : "Show password"} className="absolute inset-y-0 right-0 flex items-center pr-3 text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2" data-api-unique-id='credentialformcard-re57fe6664a6a936b-s669035872' data-api-unique-page-name='src/frontend/components/CustomerLogin/CredentialFormCard'>
              {showPassword ? <EyeOff className="h-4 w-4" data-api-unique-id='credentialformcard-r023c3a03b219e96c-s669035872' data-api-unique-page-name='src/frontend/components/CustomerLogin/CredentialFormCard' /> : <Eye className="h-4 w-4" data-api-unique-id='credentialformcard-r1ea812b2596ab79b-s669035872' data-api-unique-page-name='src/frontend/components/CustomerLogin/CredentialFormCard' />}
            </button>
          </div>
          {errors.password && <p className="text-xs text-destructive" data-api-unique-id='credentialformcard-r5e497b631d82dc13-s669035872' data-api-unique-page-name='src/frontend/components/CustomerLogin/CredentialFormCard'>{errors.password}</p>}
        </div>

        {/* Trust Notice */}
        <div className="rounded-md border border-border bg-muted/40 p-3 text-xs text-muted-foreground" data-api-unique-id='credentialformcard-r83784e6d3a68f494-s669035872' data-api-unique-page-name='src/frontend/components/CustomerLogin/CredentialFormCard'>
          <div className="flex items-center gap-2" data-api-unique-id='credentialformcard-r59e7f39061beadaf-s669035872' data-api-unique-page-name='src/frontend/components/CustomerLogin/CredentialFormCard'>
            <FileCheck2 className="h-4 w-4 shrink-0 text-accent" data-api-unique-id='credentialformcard-rd1e2678c71045dd0-s669035872' data-api-unique-page-name='src/frontend/components/CustomerLogin/CredentialFormCard' />
            <span data-api-unique-id='credentialformcard-rd321bfc8942dc1c8-s669035872' data-api-unique-page-name='src/frontend/components/CustomerLogin/CredentialFormCard'>
              Direct stateless session verification under Austrian GewO compliance standards.
            </span>
          </div>
        </div>

        {/* Submit Button */}
        <button type="submit" data-auto="submit" disabled={currentLoading} className="flex w-full items-center justify-center gap-2 rounded-md bg-primary px-6 py-3.5 text-sm font-semibold text-primary-foreground shadow-primary transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-50" data-api-unique-id='credentialformcard-rdf772e68d40f4b5a-s669035872' data-api-unique-page-name='src/frontend/components/CustomerLogin/CredentialFormCard'>
          {currentLoading ? <span data-api-unique-id='credentialformcard-rd7889415fea4d3b1-s669035872' data-api-unique-page-name='src/frontend/components/CustomerLogin/CredentialFormCard'>Verifying Credentials...</span> : <>
              <span data-api-unique-id='credentialformcard-rf3bc3e7c944a94b5-s669035872' data-api-unique-page-name='src/frontend/components/CustomerLogin/CredentialFormCard'>Access Repair Dossier</span>
              <ArrowRight className="h-4 w-4" data-api-unique-id='credentialformcard-rbc7828fce68060c2-s669035872' data-api-unique-page-name='src/frontend/components/CustomerLogin/CredentialFormCard' />
            </>}
        </button>
      </form>

      {/* Footnote Link */}
      <div className="mt-6 border-t border-border pt-4 text-center" data-api-unique-id='credentialformcard-r5b1019161cb80a7e-s669035872' data-api-unique-page-name='src/frontend/components/CustomerLogin/CredentialFormCard'>
        <p className="text-xs text-muted-foreground" data-api-unique-id='credentialformcard-rb5b01283702be99d-s669035872' data-api-unique-page-name='src/frontend/components/CustomerLogin/CredentialFormCard'>
          First-time property client in Vienna?{" "}
          <Link href={CustomerRegister.path} className="font-semibold text-primary underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring" data-api-unique-id='credentialformcard-r74c4acae2d5fe79a-s669035872' data-api-unique-page-name='src/frontend/components/CustomerLogin/CredentialFormCard'>
            Create your customer account
          </Link>
        </p>
      </div>
    </div>;
}