"use client";

import React from "react";
import { ShieldCheck, FileText, CheckCircle2 } from "lucide-react";
import { AuditTelemetryInfo } from "@/backend/types/AdminLogin";
interface ComplianceNoticeProps {
  telemetry: AuditTelemetryInfo;
}
export default function ComplianceNotice({
  telemetry
}: ComplianceNoticeProps) {
  const formattedTimestamp = React.useMemo(() => {
    if (!telemetry.timestamp) return "";
    const date = new Date(telemetry.timestamp);
    if (isNaN(date.getTime())) return telemetry.timestamp;
    return date.toISOString().replace("T", " ").replace("Z", " UTC").slice(0, 23);
  }, [telemetry.timestamp]);
  return <div className="w-full pt-4 border-t border-border flex flex-col gap-2.5 text-xs text-muted-foreground" data-api-unique-id='compliancenotice-rf31c0d702e00a98c-s2898989610' data-api-unique-page-name='src/backend/components/AdminLogin/ComplianceNotice'>
      {/* Compliance Banner & WKO Lock badge */}
      <div className="flex items-center justify-between gap-2 px-2.5 py-1.5 rounded-md bg-secondary text-secondary-foreground border border-border" data-api-unique-id='compliancenotice-rb1ceaaea4ee8c24a-s2898989610' data-api-unique-page-name='src/backend/components/AdminLogin/ComplianceNotice'>
        <div className="flex items-center gap-1.5 font-medium text-[11px] truncate" data-api-unique-id='compliancenotice-rb5e950838a4c8b15-s2898989610' data-api-unique-page-name='src/backend/components/AdminLogin/ComplianceNotice'>
          <ShieldCheck className="w-3.5 h-3.5 text-success shrink-0" data-api-unique-id='compliancenotice-re4723dc0b1f8c58e-s2898989610' data-api-unique-page-name='src/backend/components/AdminLogin/ComplianceNotice' />
          <span className="truncate" data-api-unique-id='compliancenotice-r55624d630fe7ce07-s2898989610' data-api-unique-page-name='src/backend/components/AdminLogin/ComplianceNotice'>WKO Gewerberecht · {telemetry.jurisdiction}</span>
        </div>
        <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-mono font-medium bg-muted text-muted-foreground border border-border shrink-0" data-api-unique-id='compliancenotice-r30f39be19141c0ad-s2898989610' data-api-unique-page-name='src/backend/components/AdminLogin/ComplianceNotice'>
          {telemetry.wkoRegistration}
        </span>
      </div>

      {/* Statutory Legal Statement */}
      <div className="space-y-1.5 px-1 text-[11px] leading-relaxed" data-api-unique-id='compliancenotice-r987d8d6f4da3153d-s2898989610' data-api-unique-page-name='src/backend/components/AdminLogin/ComplianceNotice'>
        <div className="flex items-start gap-1.5" data-api-unique-id='compliancenotice-r7545c194d16aae90-s2898989610' data-api-unique-page-name='src/backend/components/AdminLogin/ComplianceNotice'>
          <FileText className="w-3.5 h-3.5 text-muted-foreground shrink-0 mt-0.5" data-api-unique-id='compliancenotice-r45da7dc782acd58b-s2898989610' data-api-unique-page-name='src/backend/components/AdminLogin/ComplianceNotice' />
          <p data-api-unique-id='compliancenotice-r7c657d9e186f88dc-s2898989610' data-api-unique-page-name='src/backend/components/AdminLogin/ComplianceNotice'>
            <strong className="text-card-foreground" data-api-unique-id='compliancenotice-r3afdcf4db7dbeff7-s2898989610' data-api-unique-page-name='src/backend/components/AdminLogin/ComplianceNotice'>Austrian DSGVO & GewO Compliance:</strong> Access to this management portal is strictly reserved for authorized Vienna Handwerk personnel. In accordance with Austrian Data Protection laws ({telemetry.dsgvoArticle}) and Gewerbeordnung trade standards, operational state changes and authentication attempts are logged with forensic integrity.
          </p>
        </div>

        <div className="flex items-center justify-between pt-1 border-t border-border/50 text-[10px] font-mono text-muted-foreground" data-api-unique-id='compliancenotice-rb90a15938efc13b7-s2898989610' data-api-unique-page-name='src/backend/components/AdminLogin/ComplianceNotice'>
          <span className="flex items-center gap-1" data-api-unique-id='compliancenotice-r03c0a97ab705bbe6-s2898989610' data-api-unique-page-name='src/backend/components/AdminLogin/ComplianceNotice'>
            <CheckCircle2 className="w-3 h-3 text-success shrink-0" data-api-unique-id='compliancenotice-r6d1759a23b28b862-s2898989610' data-api-unique-page-name='src/backend/components/AdminLogin/ComplianceNotice' />
            Audit Protocol: {telemetry.auditStatus}
          </span>
          <span className="truncate max-w-[170px]" title={telemetry.sessionNode} data-api-unique-id='compliancenotice-r1c7b441aec0e5d2c-s2898989610' data-api-unique-page-name='src/backend/components/AdminLogin/ComplianceNotice'>
            Node: {telemetry.sessionNode}
          </span>
        </div>

        {formattedTimestamp && <div className="text-[10px] font-mono text-muted-foreground/75 text-right" data-api-unique-id='compliancenotice-rc161980570258b07-s2898989610' data-api-unique-page-name='src/backend/components/AdminLogin/ComplianceNotice'>
            Verified: {formattedTimestamp}
          </div>}
      </div>
    </div>;
}