"use client";

import React from "react";
import { AltbauCondition } from "@/frontend/types/QuoteRequestForm";
import { Minus, Plus, PackageCheck, Flame, Building } from "lucide-react";
interface TaskLaborPanelProps {
  taskTitle: string;
  taskDescription: string;
  altbauCondition: AltbauCondition;
  estimatedHours: number;
  hasMaterials: boolean;
  isUrgent: boolean;
  baselineHourlyRate: number;
  onChangeTitle: (val: string) => void;
  onChangeDescription: (val: string) => void;
  onChangeAltbau: (field: keyof AltbauCondition, val: string) => void;
  onChangeHours: (val: number) => void;
  onToggleMaterials: () => void;
  onToggleUrgent: () => void;
}
export default function TaskLaborPanel({
  taskTitle,
  taskDescription,
  altbauCondition,
  estimatedHours,
  hasMaterials,
  isUrgent,
  baselineHourlyRate,
  onChangeTitle,
  onChangeDescription,
  onChangeAltbau,
  onChangeHours,
  onToggleMaterials,
  onToggleUrgent
}: TaskLaborPanelProps) {
  const calculatedBudget = estimatedHours * baselineHourlyRate;
  /* Extracted array: _labels */
  const _labels = [{
    key: "BRICK_ALTBAU",
    label: "Altbau Ziegel (Solid Brick)"
  }, {
    key: "REINFORCED_CONCRETE",
    label: "Stahlbeton (Concrete)"
  }, {
    key: "MIXED_HISTORIC",
    label: "Mischmauerwerk (Mixed)"
  }];
  /* Extracted array: _labels2 */
  const _labels2 = [{
    key: "STANDARD_250",
    label: "Standard (< 2.60m)"
  }, {
    key: "ALTBAU_HIGH_320",
    label: "Altbau High (2.80–3.30m)"
  }, {
    key: "MONUMENTAL_380",
    label: "Monumental (> 3.50m)"
  }];
  /* Extracted array: _labels3 */
  const _labels3 = [{
    key: "GOOD_PLASTER",
    label: "Intact Plaster (Guter Putz)"
  }, {
    key: "POROUS_SANDY",
    label: "Sandy / Porous (Sandig)"
  }, {
    key: "DAMAGED_CRACKED",
    label: "Cracked / Needs Prep"
  }];
  return <div data-controller-name="Task Specification and Labor Calculator" className="bg-card text-card-foreground border border-border rounded-lg p-6 sm:p-8 space-y-6 shadow-soft" data-api-unique-id='tasklaborpanel-rcc01a9d9f492e9e0-s4249171273' data-api-unique-page-name='src/frontend/components/QuoteRequestForm/TaskLaborPanel'>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border-b border-border pb-4" data-api-unique-id='tasklaborpanel-r92b52cdef226d615-s4249171273' data-api-unique-page-name='src/frontend/components/QuoteRequestForm/TaskLaborPanel'>
        <div data-api-unique-id='tasklaborpanel-rdedfd3c2f8b352ba-s4249171273' data-api-unique-page-name='src/frontend/components/QuoteRequestForm/TaskLaborPanel'>
          <h2 className="text-xl sm:text-2xl font-bold font-header tracking-tight" data-api-unique-id='tasklaborpanel-r0d73e2f3181ca7bf-s4249171273' data-api-unique-page-name='src/frontend/components/QuoteRequestForm/TaskLaborPanel'>
            3. Task Scope & Altbau Physical Masonry
          </h2>
          <p className="text-sm text-muted-foreground mt-0.5" data-api-unique-id='tasklaborpanel-rc76f6250b340a0f3-s4249171273' data-api-unique-page-name='src/frontend/components/QuoteRequestForm/TaskLaborPanel'>
            Configure historic masonry parameters, ceiling height, estimated hours and material procurement.
          </p>
        </div>
        <div className="flex items-center gap-2" data-api-unique-id='tasklaborpanel-rf0b77c889d355d24-s4249171273' data-api-unique-page-name='src/frontend/components/QuoteRequestForm/TaskLaborPanel'>
          <span className="text-xs px-2.5 py-1 rounded-sm bg-secondary text-secondary-foreground font-mono" data-api-unique-id='tasklaborpanel-rf615b7983dd4f935-s4249171273' data-api-unique-page-name='src/frontend/components/QuoteRequestForm/TaskLaborPanel'>
            Direct €/h Multiplication
          </span>
        </div>
      </div>

      {/* Task Title & Description Input */}
      <div className="space-y-4" data-api-unique-id='tasklaborpanel-r7150a1cb0574d1a7-s4249171273' data-api-unique-page-name='src/frontend/components/QuoteRequestForm/TaskLaborPanel'>
        <div data-api-unique-id='tasklaborpanel-re4c109f5a5de23fc-s4249171273' data-api-unique-page-name='src/frontend/components/QuoteRequestForm/TaskLaborPanel'>
          <label htmlFor="task-title-input" className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1" data-api-unique-id='tasklaborpanel-r2b5e806ae4046895-s4249171273' data-api-unique-page-name='src/frontend/components/QuoteRequestForm/TaskLaborPanel'>
            Task Title / Projektbezeichnung *
          </label>
          <input id="task-title-input" type="text" value={taskTitle} onChange={e => onChangeTitle(e.target.value)} placeholder="e.g. Drywall partition wall & door framing in 3.4m Altbau living room" className="w-full bg-background text-foreground border border-input rounded-md px-3.5 py-2.5 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring" data-api-unique-id='tasklaborpanel-rf6d02ab6030042d0-s4249171273' data-api-unique-page-name='src/frontend/components/QuoteRequestForm/TaskLaborPanel' />
        </div>

        <div data-api-unique-id='tasklaborpanel-rb3fc08f63183ec84-s4249171273' data-api-unique-page-name='src/frontend/components/QuoteRequestForm/TaskLaborPanel'>
          <label htmlFor="task-desc-input" className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1" data-api-unique-id='tasklaborpanel-rb81150cd7afccad2-s4249171273' data-api-unique-page-name='src/frontend/components/QuoteRequestForm/TaskLaborPanel'>
            Comprehensive Task Description & Condition Details *
          </label>
          <textarea id="task-desc-input" rows={4} value={taskDescription} onChange={e => onChangeDescription(e.target.value)} placeholder="Describe scope, e.g. solid brick wall drilling required, sandy plaster undercoat, 3.2m ceiling requires scaffolding ladder, parquet flooring to protect..." className="w-full bg-background text-foreground border border-input rounded-md p-3 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring leading-relaxed" data-api-unique-id='tasklaborpanel-r51602298a36b72c7-s4249171273' data-api-unique-page-name='src/frontend/components/QuoteRequestForm/TaskLaborPanel' />
        </div>
      </div>

      {/* Altbau Specific Masonry & Architecture Parameters Chips */}
      <div className="p-4 rounded-md border border-border bg-background space-y-4" data-api-unique-id='tasklaborpanel-r04244decf43a46e0-s4249171273' data-api-unique-page-name='src/frontend/components/QuoteRequestForm/TaskLaborPanel'>
        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-foreground" data-api-unique-id='tasklaborpanel-re5b9766c402295f0-s4249171273' data-api-unique-page-name='src/frontend/components/QuoteRequestForm/TaskLaborPanel'>
          <Building className="w-4 h-4 text-primary" data-api-unique-id='tasklaborpanel-r556dc2216891b68d-s4249171273' data-api-unique-page-name='src/frontend/components/QuoteRequestForm/TaskLaborPanel' />
          <span data-api-unique-id='tasklaborpanel-r54cec05e1f2ced3c-s4249171273' data-api-unique-page-name='src/frontend/components/QuoteRequestForm/TaskLaborPanel'>Vienna Altbau Structural Conditions</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4" data-api-unique-id='tasklaborpanel-rbe76bfba29c36790-s4249171273' data-api-unique-page-name='src/frontend/components/QuoteRequestForm/TaskLaborPanel'>
          {/* Masonry Type */}
          <div className="space-y-1.5" data-api-unique-id='tasklaborpanel-r03fb781aab4e8fc0-s4249171273' data-api-unique-page-name='src/frontend/components/QuoteRequestForm/TaskLaborPanel'>
            <label className="text-xs text-muted-foreground block font-medium" data-api-unique-id='tasklaborpanel-racc80c5aa3f04e55-s4249171273' data-api-unique-page-name='src/frontend/components/QuoteRequestForm/TaskLaborPanel'>
              Masonry / Mauerwerk
            </label>
            <div className="grid grid-cols-1 gap-1.5 text-xs" data-api-unique-id='tasklaborpanel-r8182a29cb9b419c3-s4249171273' data-api-unique-page-name='src/frontend/components/QuoteRequestForm/TaskLaborPanel'>
              {_labels.map((m, index) => <button key={m.key} type="button" onClick={() => onChangeAltbau("masonryType", m.key)} className={`text-left px-2.5 py-1.5 rounded border text-xs transition-colors ${altbauCondition.masonryType === m.key ? "border-primary bg-primary text-primary-foreground font-semibold" : "border-border bg-card text-card-foreground hover:bg-secondary"}`} data-api-unique-id='tasklaborpanel-r3a55b9291b5e415c-s4249171273' data-api-unique-page-name='src/frontend/components/QuoteRequestForm/TaskLaborPanel' data-api-in-loop='1' data-api-bind-info={`_labels-${index}-label`} data-api-map-var-name='m'>
                  {m.label}
                </button>)}
            </div>
          </div>

          {/* Ceiling Height */}
          <div className="space-y-1.5" data-api-unique-id='tasklaborpanel-r2996673fae57116c-s4249171273' data-api-unique-page-name='src/frontend/components/QuoteRequestForm/TaskLaborPanel'>
            <label className="text-xs text-muted-foreground block font-medium" data-api-unique-id='tasklaborpanel-r02ae79100aa2b643-s4249171273' data-api-unique-page-name='src/frontend/components/QuoteRequestForm/TaskLaborPanel'>
              Ceiling Height / Raumhöhe
            </label>
            <div className="grid grid-cols-1 gap-1.5 text-xs" data-api-unique-id='tasklaborpanel-rca116beddeca2296-s4249171273' data-api-unique-page-name='src/frontend/components/QuoteRequestForm/TaskLaborPanel'>
              {_labels2.map((h, index) => <button key={h.key} type="button" onClick={() => onChangeAltbau("ceilingHeight", h.key)} className={`text-left px-2.5 py-1.5 rounded border text-xs transition-colors ${altbauCondition.ceilingHeight === h.key ? "border-primary bg-primary text-primary-foreground font-semibold" : "border-border bg-card text-card-foreground hover:bg-secondary"}`} data-api-unique-id='tasklaborpanel-r6b2f96442b6c383d-s4249171273' data-api-unique-page-name='src/frontend/components/QuoteRequestForm/TaskLaborPanel' data-api-in-loop='1' data-api-bind-info={`_labels2-${index}-label`} data-api-map-var-name='h'>
                  {h.label}
                </button>)}
            </div>
          </div>

          {/* Surface Quality */}
          <div className="space-y-1.5" data-api-unique-id='tasklaborpanel-rc392e88adfea46f8-s4249171273' data-api-unique-page-name='src/frontend/components/QuoteRequestForm/TaskLaborPanel'>
            <label className="text-xs text-muted-foreground block font-medium" data-api-unique-id='tasklaborpanel-r9fb9ffad3dc32957-s4249171273' data-api-unique-page-name='src/frontend/components/QuoteRequestForm/TaskLaborPanel'>
              Surface Quality / Putz
            </label>
            <div className="grid grid-cols-1 gap-1.5 text-xs" data-api-unique-id='tasklaborpanel-r87c2fbe429d4c172-s4249171273' data-api-unique-page-name='src/frontend/components/QuoteRequestForm/TaskLaborPanel'>
              {_labels3.map((s, index) => <button key={s.key} type="button" onClick={() => onChangeAltbau("surfaceQuality", s.key)} className={`text-left px-2.5 py-1.5 rounded border text-xs transition-colors ${altbauCondition.surfaceQuality === s.key ? "border-primary bg-primary text-primary-foreground font-semibold" : "border-border bg-card text-card-foreground hover:bg-secondary"}`} data-api-unique-id='tasklaborpanel-rc13017242797a89e-s4249171273' data-api-unique-page-name='src/frontend/components/QuoteRequestForm/TaskLaborPanel' data-api-in-loop='1' data-api-bind-info={`_labels3-${index}-label`} data-api-map-var-name='s'>
                  {s.label}
                </button>)}
            </div>
          </div>
        </div>
      </div>

      {/* Labor Duration Stepper & Toggles */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 pt-2 items-center" data-api-unique-id='tasklaborpanel-r891bb8e5e260efa8-s4249171273' data-api-unique-page-name='src/frontend/components/QuoteRequestForm/TaskLaborPanel'>
        {/* Hours Stepper */}
        <div className="lg:col-span-6 space-y-2" data-api-unique-id='tasklaborpanel-r2cba4a990da2b7e9-s4249171273' data-api-unique-page-name='src/frontend/components/QuoteRequestForm/TaskLaborPanel'>
          <label className="text-xs uppercase font-semibold tracking-wider text-muted-foreground block" data-api-unique-id='tasklaborpanel-rcbaadaee2187aa2f-s4249171273' data-api-unique-page-name='src/frontend/components/QuoteRequestForm/TaskLaborPanel'>
            Labor Duration Estimate (Hours)
          </label>
          <div className="flex items-center gap-3" data-api-unique-id='tasklaborpanel-r1b5b98ef92cf8802-s4249171273' data-api-unique-page-name='src/frontend/components/QuoteRequestForm/TaskLaborPanel'>
            <button type="button" onClick={() => onChangeHours(Math.max(1, estimatedHours - 1))} className="p-2.5 rounded-md border border-border bg-background hover:bg-secondary text-foreground transition-colors disabled:opacity-50" disabled={estimatedHours <= 1} aria-label="Decrease estimated hours" data-api-unique-id='tasklaborpanel-rc59c6d550781335a-s4249171273' data-api-unique-page-name='src/frontend/components/QuoteRequestForm/TaskLaborPanel'>
              <Minus className="w-4 h-4" data-api-unique-id='tasklaborpanel-rad71d16b7fe4e6c8-s4249171273' data-api-unique-page-name='src/frontend/components/QuoteRequestForm/TaskLaborPanel' />
            </button>
            <div className="flex-1 text-center bg-background border border-border rounded-md py-2 px-4" data-api-unique-id='tasklaborpanel-r2213142f756c20c4-s4249171273' data-api-unique-page-name='src/frontend/components/QuoteRequestForm/TaskLaborPanel'>
              <span className="text-2xl font-mono font-extrabold text-foreground" data-api-unique-id='tasklaborpanel-r925377f2c968413b-s4249171273' data-api-unique-page-name='src/frontend/components/QuoteRequestForm/TaskLaborPanel'>
                {estimatedHours}
              </span>
              <span className="text-xs text-muted-foreground ml-1.5" data-api-unique-id='tasklaborpanel-rd89fbb6816ad6968-s4249171273' data-api-unique-page-name='src/frontend/components/QuoteRequestForm/TaskLaborPanel'>Hours</span>
            </div>
            <button type="button" onClick={() => onChangeHours(Math.min(80, estimatedHours + 1))} className="p-2.5 rounded-md border border-border bg-background hover:bg-secondary text-foreground transition-colors" aria-label="Increase estimated hours" data-api-unique-id='tasklaborpanel-r800ddfbd4194d3e0-s4249171273' data-api-unique-page-name='src/frontend/components/QuoteRequestForm/TaskLaborPanel'>
              <Plus className="w-4 h-4" data-api-unique-id='tasklaborpanel-ra3041cfc6f8d8c0a-s4249171273' data-api-unique-page-name='src/frontend/components/QuoteRequestForm/TaskLaborPanel' />
            </button>
          </div>
          <p className="text-[11px] text-muted-foreground" data-api-unique-id='tasklaborpanel-ra08c0500523e8773-s4249171273' data-api-unique-page-name='src/frontend/components/QuoteRequestForm/TaskLaborPanel'>
            Multiplied by baseline rate: €{baselineHourlyRate.toFixed(2)}/h = €{calculatedBudget.toFixed(2)}
          </p>
        </div>

        {/* Toggles: Materials & Urgent Inflow */}
        <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-3" data-api-unique-id='tasklaborpanel-rf8b84de79bb55f84-s4249171273' data-api-unique-page-name='src/frontend/components/QuoteRequestForm/TaskLaborPanel'>
          {/* Materials Toggle */}
          <button type="button" onClick={onToggleMaterials} className={`p-3.5 rounded-md border text-left transition-all flex flex-col justify-between gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${hasMaterials ? "border-primary bg-primary/10 shadow-soft" : "border-border bg-background text-foreground"}`} data-api-unique-id='tasklaborpanel-ra7d215d7045e2da8-s4249171273' data-api-unique-page-name='src/frontend/components/QuoteRequestForm/TaskLaborPanel'>
            <div className="flex items-center justify-between" data-api-unique-id='tasklaborpanel-rc5df62ee50de4910-s4249171273' data-api-unique-page-name='src/frontend/components/QuoteRequestForm/TaskLaborPanel'>
              <PackageCheck className={`w-4 h-4 ${hasMaterials ? "text-primary" : "text-muted-foreground"}`} data-api-unique-id='tasklaborpanel-r481fc1823a26ec03-s4249171273' data-api-unique-page-name='src/frontend/components/QuoteRequestForm/TaskLaborPanel' />
              <span className={`w-4 h-4 rounded border flex items-center justify-center text-[10px] ${hasMaterials ? "bg-primary border-primary text-primary-foreground font-bold" : "border-border"}`} data-api-unique-id='tasklaborpanel-rfe9efdb2d7b99656-s4249171273' data-api-unique-page-name='src/frontend/components/QuoteRequestForm/TaskLaborPanel'>
                {hasMaterials ? "✓" : ""}
              </span>
            </div>
            <div data-api-unique-id='tasklaborpanel-r902224cac5b6914f-s4249171273' data-api-unique-page-name='src/frontend/components/QuoteRequestForm/TaskLaborPanel'>
              <p className="text-xs font-bold text-foreground" data-api-unique-id='tasklaborpanel-rc2e24b3a5fba6884-s4249171273' data-api-unique-page-name='src/frontend/components/QuoteRequestForm/TaskLaborPanel'>Materials On-Site</p>
              <p className="text-[11px] text-muted-foreground mt-0.5" data-api-unique-id='tasklaborpanel-r413cd19716ac325b-s4249171273' data-api-unique-page-name='src/frontend/components/QuoteRequestForm/TaskLaborPanel'>
                {hasMaterials ? "Client has purchased materials" : "Requires artisan procurement"}
              </p>
            </div>
          </button>

          {/* Urgent Dispatch Toggle */}
          <button type="button" onClick={onToggleUrgent} className={`p-3.5 rounded-md border text-left transition-all flex flex-col justify-between gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${isUrgent ? "border-destructive bg-destructive/10 shadow-soft" : "border-border bg-background text-foreground"}`} data-api-unique-id='tasklaborpanel-rc2557c0f9062e612-s4249171273' data-api-unique-page-name='src/frontend/components/QuoteRequestForm/TaskLaborPanel'>
            <div className="flex items-center justify-between" data-api-unique-id='tasklaborpanel-r3901741c85e9184e-s4249171273' data-api-unique-page-name='src/frontend/components/QuoteRequestForm/TaskLaborPanel'>
              <Flame className={`w-4 h-4 ${isUrgent ? "text-destructive" : "text-muted-foreground"}`} data-api-unique-id='tasklaborpanel-rebc37d6442043f2d-s4249171273' data-api-unique-page-name='src/frontend/components/QuoteRequestForm/TaskLaborPanel' />
              <span className={`w-4 h-4 rounded border flex items-center justify-center text-[10px] ${isUrgent ? "bg-destructive border-destructive text-destructive-foreground font-bold" : "border-border"}`} data-api-unique-id='tasklaborpanel-rcd4ed4639e684e2e-s4249171273' data-api-unique-page-name='src/frontend/components/QuoteRequestForm/TaskLaborPanel'>
                {isUrgent ? "✓" : ""}
              </span>
            </div>
            <div data-api-unique-id='tasklaborpanel-r9bfdefd695affaeb-s4249171273' data-api-unique-page-name='src/frontend/components/QuoteRequestForm/TaskLaborPanel'>
              <p className="text-xs font-bold text-foreground" data-api-unique-id='tasklaborpanel-r8432550d8512846e-s4249171273' data-api-unique-page-name='src/frontend/components/QuoteRequestForm/TaskLaborPanel'>Urgent Dispatch</p>
              <p className="text-[11px] text-muted-foreground mt-0.5" data-api-unique-id='tasklaborpanel-rb5ec8ac01a244a19-s4249171273' data-api-unique-page-name='src/frontend/components/QuoteRequestForm/TaskLaborPanel'>
                {isUrgent ? "Priority 24h allocation" : "Standard booking schedule"}
              </p>
            </div>
          </button>
        </div>
      </div>
    </div>;
}