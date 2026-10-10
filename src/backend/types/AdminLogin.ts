export interface LoginFormValues {
  email: string;
  password: string;
}

export interface FormValidationErrors {
  email?: string;
  password?: string;
  general?: string;
}

export interface AuditTelemetryInfo {
  sessionNode: string;
  wkoRegistration: string;
  jurisdiction: string;
  dsgvoArticle: string;
  auditStatus: string;
  timestamp: string;
}

export interface AdminLoginInput {
  email: string;
  password: string;
}

export interface AdminLoginOutput {
  token: string;
  userId: string; // data-from: AccountUser-id
  email: string; // data-from: AccountUser-email
  fullName: string; // data-from: AccountUser-fullName
  role: "ADMIN"; // data-from: AccountUser-role
}

export interface AuditTelemetryOutput {
  sessionNode: string;
  wkoRegistration: string;
  jurisdiction: string;
  dsgvoArticle: string;
  auditStatus: string;
  timestamp: string;
}