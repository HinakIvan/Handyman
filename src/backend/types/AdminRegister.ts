export interface AdminRegisterFormValues {
  fullName: string;
  email: string;
  password: string;
}

export interface FormValidationErrors {
  fullName?: string;
  email?: string;
  password?: string;
}

export interface PasswordRequirement {
  id: string;
  label: string;
  met: boolean;
}

export interface PasswordStrengthState {
  score: number; // 0 - 4
  level: "Weak" | "Fair" | "Good" | "Strong";
  accentClass: string;
}

export interface ComplianceMeta {
  portalCode: string;
  gewoStandard: string;
  tlsStandard: string;
  guildReg: string;
}

// ===== Server Action Input & Output Types =====

export interface RegisterAdminInput {
  fullName: string;
  email: string;
  password: string;
}

export interface RegisterAdminOutput {
  token: string;
  userId: string; // data-from: AccountUser-id
  email: string; // data-from: AccountUser-email
  fullName: string; // data-from: AccountUser-fullName
  role: "ADMIN"; // data-from: AccountUser-role
}