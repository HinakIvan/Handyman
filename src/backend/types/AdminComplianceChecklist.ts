export type ChecklistItemKey =
  | "VAT_UID"
  | "OFFICIAL_CONTACT"
  | "REGISTERED_ADDRESS"
  | "OPERATING_HOURS";

export type ChecklistStatus = "PENDING" | "IN_REVIEW" | "COMPLETED";

// Backward compatibility aliases for UI components
export type ComplianceItemKey = ChecklistItemKey;
export type ComplianceStatus = ChecklistStatus;

export interface SetupChecklistItem {
  id: string; // data-from: SetupChecklistItem-id
  itemKey: ChecklistItemKey; // data-from: SetupChecklistItem-itemKey
  title: string; // data-from: SetupChecklistItem-title
  subtitle: string; // data-from: SetupChecklistItem-subtitle
  status: ChecklistStatus; // data-from: SetupChecklistItem-status
  fieldValue: string; // data-from: SetupChecklistItem-fieldValue
  legalRef: string; // data-from: SetupChecklistItem-legalRef
  lastUpdated: string; // data-from: SetupChecklistItem-lastUpdated
  createdAt: Date; // data-from: SetupChecklistItem-createdAt
  updatedAt: Date; // data-from: SetupChecklistItem-updatedAt
}

export interface ComplianceStats {
  total: number;
  completed: number;
  inReview: number;
  pending: number;
  readinessScore: number;
}

export interface GetComplianceChecklistOutput {
  items: SetupChecklistItem[];
  stats: ComplianceStats;
}

export interface UpdateComplianceItemInput {
  id: string;
  fieldValue: string;
  status: ChecklistStatus;
}

export interface UpdateComplianceItemOutput {
  item: SetupChecklistItem;
  stats: ComplianceStats;
}

export interface AuditFormValues {
  fieldValue: string;
  status: ChecklistStatus;
  auditNotes: string;
}