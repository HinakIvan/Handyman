"use client";

import React from "react";
import { TimeSlot, SubmissionLang } from "@/frontend/types/QuoteRequestForm";
interface ScheduleContactPanelProps {
  preferredDate: string;
  preferredTimeSlot: TimeSlot;
  submissionLang: SubmissionLang;
  clientName: string;
  clientPhone: string;
  clientEmail: string;
  agreedToTerms: boolean;
  onChangeDate: (val: string) => void;
  onChangeTimeSlot: (slot: TimeSlot) => void;
  onChangeLang: (lang: SubmissionLang) => void;
  onChangeContact: (field: "clientName" | "clientPhone" | "clientEmail", val: string) => void;
  onToggleTerms: () => void;
}
export default function ScheduleContactPanel({
  preferredDate,
  preferredTimeSlot,
  submissionLang,
  clientName,
  clientPhone,
  clientEmail,
  agreedToTerms,
  onChangeDate,
  onChangeTimeSlot,
  onChangeLang,
  onChangeContact,
  onToggleTerms
}: ScheduleContactPanelProps) {
  return <div data-controller-name="Scheduling and Contact Specification" className="bg-card text-card-foreground border border-border rounded-lg p-6 sm:p-8 space-y-6 shadow-soft" data-api-unique-id='schedulecontactpanel-rcf24597c21ec192b-s961851299' data-api-unique-page-name='src/frontend/components/QuoteRequestForm/ScheduleContactPanel'>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border-b border-border pb-4" data-api-unique-id='schedulecontactpanel-rd7bc2737ebf65359-s961851299' data-api-unique-page-name='src/frontend/components/QuoteRequestForm/ScheduleContactPanel'>
        <div data-api-unique-id='schedulecontactpanel-r05373b59662707d9-s961851299' data-api-unique-page-name='src/frontend/components/QuoteRequestForm/ScheduleContactPanel'>
          <h2 className="text-xl sm:text-2xl font-bold font-header tracking-tight" data-api-unique-id='schedulecontactpanel-reabd6c4968cffb4f-s961851299' data-api-unique-page-name='src/frontend/components/QuoteRequestForm/ScheduleContactPanel'>
            4. Execution Scheduling & Contact Details
          </h2>
          <p className="text-sm text-muted-foreground mt-0.5" data-api-unique-id='schedulecontactpanel-ra64fcba96c724973-s961851299' data-api-unique-page-name='src/frontend/components/QuoteRequestForm/ScheduleContactPanel'>
            Select preferred arrival date, time slot, preferred language, and direct contact details.
          </p>
        </div>
        <div className="flex items-center gap-2" data-api-unique-id='schedulecontactpanel-rfef0851665902ccc-s961851299' data-api-unique-page-name='src/frontend/components/QuoteRequestForm/ScheduleContactPanel'>
          <span className="text-xs px-2.5 py-1 rounded-sm bg-secondary text-secondary-foreground font-mono" data-api-unique-id='schedulecontactpanel-r23d3f6e3c72ab08b-s961851299' data-api-unique-page-name='src/frontend/components/QuoteRequestForm/ScheduleContactPanel'>
            Guest / Customer Ready
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6" data-api-unique-id='schedulecontactpanel-re75aa90349fed92f-s961851299' data-api-unique-page-name='src/frontend/components/QuoteRequestForm/ScheduleContactPanel'>
        {/* Left Column: Preferred Date & Time Slot */}
        <div className="lg:col-span-6 space-y-4" data-api-unique-id='schedulecontactpanel-r1b34879697fcef71-s961851299' data-api-unique-page-name='src/frontend/components/QuoteRequestForm/ScheduleContactPanel'>
          <label className="text-xs uppercase font-semibold tracking-wider text-muted-foreground block" data-api-unique-id='schedulecontactpanel-rcc58dd60585acde2-s961851299' data-api-unique-page-name='src/frontend/components/QuoteRequestForm/ScheduleContactPanel'>
            Preferred On-Site Date & Window
          </label>

          <div className="space-y-1.5" data-api-unique-id='schedulecontactpanel-r90dd0d28a6e832f3-s961851299' data-api-unique-page-name='src/frontend/components/QuoteRequestForm/ScheduleContactPanel'>
            <label htmlFor="pref-date-input" className="block text-xs font-medium text-muted-foreground" data-api-unique-id='schedulecontactpanel-r93eeafb4eaddc9b6-s961851299' data-api-unique-page-name='src/frontend/components/QuoteRequestForm/ScheduleContactPanel'>
              Preferred Work Date *
            </label>
            <div className="relative" data-api-unique-id='schedulecontactpanel-rb89ecbfea60f81a6-s961851299' data-api-unique-page-name='src/frontend/components/QuoteRequestForm/ScheduleContactPanel'>
              <input id="pref-date-input" type="date" value={preferredDate} onChange={e => onChangeDate(e.target.value)} className="w-full bg-background text-foreground border border-input rounded-md px-3.5 py-2.5 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring" data-api-unique-id='schedulecontactpanel-r960e33ba595e0797-s961851299' data-api-unique-page-name='src/frontend/components/QuoteRequestForm/ScheduleContactPanel' />
            </div>
          </div>

          <div className="space-y-1.5" data-api-unique-id='schedulecontactpanel-r196654b3b37c72db-s961851299' data-api-unique-page-name='src/frontend/components/QuoteRequestForm/ScheduleContactPanel'>
            <label className="block text-xs font-medium text-muted-foreground" data-api-unique-id='schedulecontactpanel-r6ecae349aba89da8-s961851299' data-api-unique-page-name='src/frontend/components/QuoteRequestForm/ScheduleContactPanel'>
              Preferred Time Slot *
            </label>
            <div className="grid grid-cols-3 gap-2" data-api-unique-id='schedulecontactpanel-r8d65f1802822be85-s961851299' data-api-unique-page-name='src/frontend/components/QuoteRequestForm/ScheduleContactPanel'>
              {[{
              slot: "MORNING" as TimeSlot,
              label: "Morning",
              sub: "08:00 - 12:00"
            }, {
              slot: "AFTERNOON" as TimeSlot,
              label: "Afternoon",
              sub: "13:00 - 17:00"
            }, {
              slot: "FLEXIBLE" as TimeSlot,
              label: "Flexible",
              sub: "Full Day Window"
            }].map((item, index) => <button key={item.slot} type="button" onClick={() => onChangeTimeSlot(item.slot)} className={`p-2.5 rounded border text-center transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${preferredTimeSlot === item.slot ? "border-primary bg-primary text-primary-foreground font-bold shadow-soft" : "border-border bg-background text-foreground hover:bg-secondary"}`} data-api-unique-id='schedulecontactpanel-rda3fbeeb294d1d0a-s961851299' data-api-unique-page-name='src/frontend/components/QuoteRequestForm/ScheduleContactPanel' data-api-in-loop='1'>
                  <p className="text-xs font-semibold" data-api-unique-id='schedulecontactpanel-r03ccf4044303cbe8-s961851299' data-api-unique-page-name='src/frontend/components/QuoteRequestForm/ScheduleContactPanel' data-api-in-loop='1' data-api-bind-info={`list-${index}-label`} data-api-map-var-name='item'>{item.label}</p>
                  <p className="text-[10px] opacity-80 mt-0.5" data-api-unique-id='schedulecontactpanel-re96edd31f2452f26-s961851299' data-api-unique-page-name='src/frontend/components/QuoteRequestForm/ScheduleContactPanel' data-api-in-loop='1' data-api-bind-info={`list-${index}-sub`} data-api-map-var-name='item'>{item.sub}</p>
                </button>)}
            </div>
          </div>

          <div className="space-y-1.5 pt-2" data-api-unique-id='schedulecontactpanel-re69e577e5013ae69-s961851299' data-api-unique-page-name='src/frontend/components/QuoteRequestForm/ScheduleContactPanel'>
            <label className="block text-xs font-medium text-muted-foreground" data-api-unique-id='schedulecontactpanel-r30ed65cd661be04b-s961851299' data-api-unique-page-name='src/frontend/components/QuoteRequestForm/ScheduleContactPanel'>
              Correspondence & Documentation Language *
            </label>
            <div className="flex gap-2" data-api-unique-id='schedulecontactpanel-rc17e62f232d9467b-s961851299' data-api-unique-page-name='src/frontend/components/QuoteRequestForm/ScheduleContactPanel'>
              {[{
              lang: "DE" as SubmissionLang,
              label: "Deutsch (DE)"
            }, {
              lang: "EN" as SubmissionLang,
              label: "English (EN)"
            }, {
              lang: "RU" as SubmissionLang,
              label: "Русский (RU)"
            }].map((item, index) => <button key={item.lang} type="button" onClick={() => onChangeLang(item.lang)} className={`flex-1 py-1.5 px-3 rounded text-xs font-medium border transition-colors ${submissionLang === item.lang ? "border-primary bg-primary text-primary-foreground font-bold" : "border-border bg-background text-foreground hover:bg-secondary"}`} data-api-unique-id='schedulecontactpanel-re2276b17e3dc5325-s961851299' data-api-unique-page-name='src/frontend/components/QuoteRequestForm/ScheduleContactPanel' data-api-in-loop='1' data-api-bind-info={`list-${index}-label`} data-api-map-var-name='item'>
                  {item.label}
                </button>)}
            </div>
          </div>
        </div>

        {/* Right Column: Contact Details (Guest / Customer) */}
        <div className="lg:col-span-6 space-y-4" data-api-unique-id='schedulecontactpanel-ra4654f512adc7c5f-s961851299' data-api-unique-page-name='src/frontend/components/QuoteRequestForm/ScheduleContactPanel'>
          <label className="text-xs uppercase font-semibold tracking-wider text-muted-foreground block" data-api-unique-id='schedulecontactpanel-r1596c757d715ca65-s961851299' data-api-unique-page-name='src/frontend/components/QuoteRequestForm/ScheduleContactPanel'>
            Client Contact Credentials
          </label>

          <div className="space-y-1.5" data-api-unique-id='schedulecontactpanel-rb85e91ef6a48d9d6-s961851299' data-api-unique-page-name='src/frontend/components/QuoteRequestForm/ScheduleContactPanel'>
            <label htmlFor="client-name-input" className="block text-xs font-medium text-muted-foreground" data-api-unique-id='schedulecontactpanel-rc7e2804dd2b45af7-s961851299' data-api-unique-page-name='src/frontend/components/QuoteRequestForm/ScheduleContactPanel'>
              Full Name / Vollständiger Name *
            </label>
            <div className="relative" data-api-unique-id='schedulecontactpanel-r6114fcda315ea519-s961851299' data-api-unique-page-name='src/frontend/components/QuoteRequestForm/ScheduleContactPanel'>
              <input id="client-name-input" type="text" value={clientName} onChange={e => onChangeContact("clientName", e.target.value)} placeholder="e.g. Maximilian Huber" className="w-full bg-background text-foreground border border-input rounded-md px-3.5 py-2.5 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring" data-api-unique-id='schedulecontactpanel-rfe67dd746241d310-s961851299' data-api-unique-page-name='src/frontend/components/QuoteRequestForm/ScheduleContactPanel' />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3" data-api-unique-id='schedulecontactpanel-r90a89e111dd10c92-s961851299' data-api-unique-page-name='src/frontend/components/QuoteRequestForm/ScheduleContactPanel'>
            <div className="space-y-1.5" data-api-unique-id='schedulecontactpanel-rea9bbd8892eba656-s961851299' data-api-unique-page-name='src/frontend/components/QuoteRequestForm/ScheduleContactPanel'>
              <label htmlFor="client-phone-input" className="block text-xs font-medium text-muted-foreground" data-api-unique-id='schedulecontactpanel-rf6a9c9e70d269606-s961851299' data-api-unique-page-name='src/frontend/components/QuoteRequestForm/ScheduleContactPanel'>
                Phone / Telefon *
              </label>
              <input id="client-phone-input" type="tel" value={clientPhone} onChange={e => onChangeContact("clientPhone", e.target.value)} placeholder="+43 1 234 5678" className="w-full bg-background text-foreground border border-input rounded-md px-3.5 py-2.5 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring" data-api-unique-id='schedulecontactpanel-r07be44874f9a757f-s961851299' data-api-unique-page-name='src/frontend/components/QuoteRequestForm/ScheduleContactPanel' />
            </div>

            <div className="space-y-1.5" data-api-unique-id='schedulecontactpanel-r27e16da5a0464d2d-s961851299' data-api-unique-page-name='src/frontend/components/QuoteRequestForm/ScheduleContactPanel'>
              <label htmlFor="client-email-input" className="block text-xs font-medium text-muted-foreground" data-api-unique-id='schedulecontactpanel-rfe21593fd010f62f-s961851299' data-api-unique-page-name='src/frontend/components/QuoteRequestForm/ScheduleContactPanel'>
                Email Address *
              </label>
              <input id="client-email-input" type="email" value={clientEmail} onChange={e => onChangeContact("clientEmail", e.target.value)} placeholder="m.huber@wien.at" className="w-full bg-background text-foreground border border-input rounded-md px-3.5 py-2.5 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring" data-api-unique-id='schedulecontactpanel-r276c6b980321c0ae-s961851299' data-api-unique-page-name='src/frontend/components/QuoteRequestForm/ScheduleContactPanel' />
            </div>
          </div>

          {/* Terms & Consent Checkbox */}
          <div className="pt-2" data-api-unique-id='schedulecontactpanel-ra1f542d40b5a6b88-s961851299' data-api-unique-page-name='src/frontend/components/QuoteRequestForm/ScheduleContactPanel'>
            <button type="button" onClick={onToggleTerms} className={`w-full p-3 rounded-md border text-left transition-colors flex items-start gap-3 ${agreedToTerms ? "border-primary bg-primary/10 text-foreground" : "border-border bg-background text-muted-foreground hover:bg-secondary"}`} data-api-unique-id='schedulecontactpanel-r72716fb1e12da30d-s961851299' data-api-unique-page-name='src/frontend/components/QuoteRequestForm/ScheduleContactPanel'>
              <span className={`w-5 h-5 rounded border mt-0.5 flex items-center justify-center shrink-0 text-xs ${agreedToTerms ? "bg-primary border-primary text-primary-foreground font-bold" : "border-border bg-background"}`} data-api-unique-id='schedulecontactpanel-rc9824c8c0fc1e262-s961851299' data-api-unique-page-name='src/frontend/components/QuoteRequestForm/ScheduleContactPanel'>
                {agreedToTerms ? "✓" : ""}
              </span>
              <div className="text-xs leading-relaxed" data-api-unique-id='schedulecontactpanel-r5adb9043f6d9d0b2-s961851299' data-api-unique-page-name='src/frontend/components/QuoteRequestForm/ScheduleContactPanel'>
                <span className="font-semibold text-foreground" data-api-unique-id='schedulecontactpanel-rcaaa7bb3fc75b125-s961851299' data-api-unique-page-name='src/frontend/components/QuoteRequestForm/ScheduleContactPanel'>
                  I accept the Austrian Trade Terms & Data Privacy Policy.
                </span>
                <p className="text-[11px] text-muted-foreground mt-0.5" data-api-unique-id='schedulecontactpanel-r355d011cc4b707c9-s961851299' data-api-unique-page-name='src/frontend/components/QuoteRequestForm/ScheduleContactPanel'>
                  Calculation represents an authoritative preliminary cost estimate in accordance with Austrian GewO guidelines. No binding payment charged upon submission.
                </p>
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>;
}