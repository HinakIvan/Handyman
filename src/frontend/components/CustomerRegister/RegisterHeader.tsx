"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { Hammer, ShieldCheck, ArrowRight } from "lucide-react";
import { HomeFrontend, CustomerLogin } from "@/frontend/route-params";
export default function RegisterHeader() {
  const router = useRouter();
  return <header className="w-full border-b border-border bg-background" data-api-unique-id='registerheader-r9a878ee7a2d6e9b3-s307990741' data-api-unique-page-name='src/frontend/components/CustomerRegister/RegisterHeader'>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8" data-api-unique-id='registerheader-r15226af052549c11-s307990741' data-api-unique-page-name='src/frontend/components/CustomerRegister/RegisterHeader'>
        <div className="flex h-16 items-center justify-between gap-4" data-api-unique-id='registerheader-rdac951099c2db068-s307990741' data-api-unique-page-name='src/frontend/components/CustomerRegister/RegisterHeader'>
          {/* Brand Link to F01 Handyman Portal */}
          <button type="button" onClick={() => HomeFrontend.navigateTo(router)} className="flex items-center gap-2.5 rounded-md text-left text-foreground transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring" title="Return to Vienna Handwerk Portal" data-api-unique-id='registerheader-r4e361100d1949a3c-s307990741' data-api-unique-page-name='src/frontend/components/CustomerRegister/RegisterHeader'>
            <div className="flex h-9 w-9 items-center justify-center rounded-md bg-primary text-primary-foreground shadow-soft" data-api-unique-id='registerheader-ree4640e5adbd268f-s307990741' data-api-unique-page-name='src/frontend/components/CustomerRegister/RegisterHeader'>
              <Hammer className="h-4 w-4" data-api-unique-id='registerheader-r601590413bc8d776-s307990741' data-api-unique-page-name='src/frontend/components/CustomerRegister/RegisterHeader' />
            </div>
            <div className="flex flex-col" data-api-unique-id='registerheader-r04831a6b192ad841-s307990741' data-api-unique-page-name='src/frontend/components/CustomerRegister/RegisterHeader'>
              <span className="font-display text-base font-bold tracking-tight text-foreground" data-api-unique-id='registerheader-r5031bac864e94b11-s307990741' data-api-unique-page-name='src/frontend/components/CustomerRegister/RegisterHeader'>
                Vienna Handwerk
              </span>
              <span className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground" data-api-unique-id='registerheader-r30e92bcee32c6d37-s307990741' data-api-unique-page-name='src/frontend/components/CustomerRegister/RegisterHeader'>
                Meisterbetrieb & Gewerbe Wien
              </span>
            </div>
          </button>

          {/* Right Header Navigation to F08 Customer Login */}
          <div className="flex items-center gap-3" data-api-unique-id='registerheader-r80f64f7a12238c67-s307990741' data-api-unique-page-name='src/frontend/components/CustomerRegister/RegisterHeader'>
            <div className="hidden items-center gap-1.5 rounded-sm border border-border bg-card px-2.5 py-1 text-xs font-medium text-card-foreground sm:inline-flex" data-api-unique-id='registerheader-re6763aafdd6b9c3d-s307990741' data-api-unique-page-name='src/frontend/components/CustomerRegister/RegisterHeader'>
              <ShieldCheck className="h-3.5 w-3.5 text-accent" data-api-unique-id='registerheader-re19155c9bc52b264-s307990741' data-api-unique-page-name='src/frontend/components/CustomerRegister/RegisterHeader' />
              <span data-api-unique-id='registerheader-rc395e9904b8afd23-s307990741' data-api-unique-page-name='src/frontend/components/CustomerRegister/RegisterHeader'>GewO § 94 Compliant</span>
            </div>

            <div className="flex items-center gap-2 text-sm" data-api-unique-id='registerheader-r549628bd34d5b0de-s307990741' data-api-unique-page-name='src/frontend/components/CustomerRegister/RegisterHeader'>
              <span className="hidden text-muted-foreground sm:inline" data-api-unique-id='registerheader-r451da51293d64531-s307990741' data-api-unique-page-name='src/frontend/components/CustomerRegister/RegisterHeader'>Already registered?</span>
              <button type="button" onClick={() => CustomerLogin.navigateTo(router)} className="inline-flex items-center gap-1 rounded-md border border-border bg-card px-3 py-1.5 font-medium text-card-foreground transition-colors hover:bg-muted hover:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring" data-api-unique-id='registerheader-re6bbb388d7bbf803-s307990741' data-api-unique-page-name='src/frontend/components/CustomerRegister/RegisterHeader'>
                <span data-api-unique-id='registerheader-r65316257cccd39b8-s307990741' data-api-unique-page-name='src/frontend/components/CustomerRegister/RegisterHeader'>Sign In</span>
                <ArrowRight className="h-3.5 w-3.5" data-api-unique-id='registerheader-r9974814ed4c40024-s307990741' data-api-unique-page-name='src/frontend/components/CustomerRegister/RegisterHeader' />
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>;
}