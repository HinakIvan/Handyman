"use client";

import React from "react";
import { Check, X } from "lucide-react";
import { PasswordRequirement, PasswordStrengthState } from "@/backend/types/AdminRegister";
export interface PasswordMeterProps {
  strength: PasswordStrengthState;
  requirements: PasswordRequirement[];
  passwordValue: string;
}
export default function PasswordMeter({
  strength,
  requirements,
  passwordValue
}: PasswordMeterProps) {
  if (!passwordValue) {
    return <div className="space-y-1.5 pt-1" data-api-unique-id='passwordmeter-rce1537a1ca98b76e-s3230088323' data-api-unique-page-name='src/backend/components/AdminRegister/PasswordMeter'>
        <div className="flex items-center justify-between text-[11px] text-muted-foreground font-mono" data-api-unique-id='passwordmeter-rf6a498c31a325f26-s3230088323' data-api-unique-page-name='src/backend/components/AdminRegister/PasswordMeter'>
          <span data-api-unique-id='passwordmeter-r9d94bf5e3673d56b-s3230088323' data-api-unique-page-name='src/backend/components/AdminRegister/PasswordMeter'>Security requirement:</span>
          <span data-api-unique-id='passwordmeter-r300896cad5453bbd-s3230088323' data-api-unique-page-name='src/backend/components/AdminRegister/PasswordMeter'>Min. 8 characters + mixed complexity</span>
        </div>
        <div className="grid grid-cols-4 gap-1.5" data-api-unique-id='passwordmeter-rbc5dd1b687d9f54f-s3230088323' data-api-unique-page-name='src/backend/components/AdminRegister/PasswordMeter'>
          <div className="h-1.5 rounded-full bg-muted" data-api-unique-id='passwordmeter-rb1e90f8326663dad-s3230088323' data-api-unique-page-name='src/backend/components/AdminRegister/PasswordMeter' />
          <div className="h-1.5 rounded-full bg-muted" data-api-unique-id='passwordmeter-r850ca663fd993e14-s3230088323' data-api-unique-page-name='src/backend/components/AdminRegister/PasswordMeter' />
          <div className="h-1.5 rounded-full bg-muted" data-api-unique-id='passwordmeter-r091480fe9d7a94c1-s3230088323' data-api-unique-page-name='src/backend/components/AdminRegister/PasswordMeter' />
          <div className="h-1.5 rounded-full bg-muted" data-api-unique-id='passwordmeter-rb3ca4db3ef846a20-s3230088323' data-api-unique-page-name='src/backend/components/AdminRegister/PasswordMeter' />
        </div>
      </div>;
  }
  /* Extracted array: _items */
  const _items = [1, 2, 3, 4];
  return <div className="space-y-2 pt-1" data-api-unique-id='passwordmeter-raff6b3b40635c6f7-s3230088323' data-api-unique-page-name='src/backend/components/AdminRegister/PasswordMeter'>
      {/* 4-segment visual bar */}
      <div className="space-y-1" data-api-unique-id='passwordmeter-rf018672ae747e2f2-s3230088323' data-api-unique-page-name='src/backend/components/AdminRegister/PasswordMeter'>
        <div className="flex items-center justify-between text-[11px]" data-api-unique-id='passwordmeter-r5e982fa17ffa0fe9-s3230088323' data-api-unique-page-name='src/backend/components/AdminRegister/PasswordMeter'>
          <span className="text-muted-foreground font-medium" data-api-unique-id='passwordmeter-r993fc248c7844653-s3230088323' data-api-unique-page-name='src/backend/components/AdminRegister/PasswordMeter'>Complexity Meter:</span>
          <span className={`font-semibold font-mono text-xs ${strength.score <= 1 ? "text-destructive" : strength.score <= 2 ? "text-warning" : strength.score === 3 ? "text-info" : "text-success"}`} data-api-unique-id='passwordmeter-rbf5684c94f58a45b-s3230088323' data-api-unique-page-name='src/backend/components/AdminRegister/PasswordMeter'>
            {strength.level} ({strength.score}/4)
          </span>
        </div>
        <div className="grid grid-cols-4 gap-1.5" data-api-unique-id='passwordmeter-rcad71c1455fe4b3d-s3230088323' data-api-unique-page-name='src/backend/components/AdminRegister/PasswordMeter'>
          {_items.map((step, index) => {
          const isActive = step <= strength.score;
          let barColor = "bg-muted";
          if (isActive) {
            if (strength.score <= 1) barColor = "bg-destructive";else if (strength.score === 2) barColor = "bg-warning";else if (strength.score === 3) barColor = "bg-info";else barColor = "bg-success";
          }
          return <div key={step} className={`h-1.5 rounded-full transition-all duration-300 ${barColor}`} data-api-unique-id='passwordmeter-r529f916b58d7afc6-s3230088323' data-api-unique-page-name='src/backend/components/AdminRegister/PasswordMeter' data-api-in-loop='1' />;
        })}
        </div>
      </div>

      {/* Requirement chips */}
      <div className="grid grid-cols-2 gap-1.5 pt-1" data-api-unique-id='passwordmeter-rdf3272f02c2772d0-s3230088323' data-api-unique-page-name='src/backend/components/AdminRegister/PasswordMeter'>
        {requirements.map((req, index) => <div key={req.id} className={`flex items-center gap-1.5 text-[11px] px-2 py-1 rounded border transition-colors ${req.met ? "border-success/30 bg-success/10 text-success" : "border-border bg-card text-muted-foreground"}`} data-api-unique-id='passwordmeter-r51aca3b8c788dc0f-s3230088323' data-api-unique-page-name='src/backend/components/AdminRegister/PasswordMeter' data-api-in-loop='1'>
            {req.met ? <Check className="w-3 h-3 shrink-0 text-success" data-api-unique-id='passwordmeter-r812ce59d005a8fc9-s3230088323' data-api-unique-page-name='src/backend/components/AdminRegister/PasswordMeter' data-api-in-loop='1' /> : <X className="w-3 h-3 shrink-0 text-muted-foreground/60" data-api-unique-id='passwordmeter-reb273f669bb03ed2-s3230088323' data-api-unique-page-name='src/backend/components/AdminRegister/PasswordMeter' data-api-in-loop='1' />}
            <span className="truncate" data-api-unique-id='passwordmeter-r51c7fa84cd3da219-s3230088323' data-api-unique-page-name='src/backend/components/AdminRegister/PasswordMeter' data-api-in-loop='1' data-api-bind-info={`requirements-${index}-label`} data-api-map-var-name='req'>{req.label}</span>
          </div>)}
      </div>
    </div>;
}