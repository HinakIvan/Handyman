export type AccountUserRoleType = 'CUSTOMER' | 'ADMIN';

export interface RegisterCustomerInput {
  email: string;
  password: string;
  fullName: string;
  phone?: string | null;
}

export interface RegisterCustomerOutput {
  token: string;
  userId: string; // data-from: AccountUser-id
  email: string; // data-from: AccountUser-email
  fullName: string; // data-from: AccountUser-fullName
  role: AccountUserRoleType; // data-from: AccountUser-role
  phone: string | null; // data-from: AccountUser-phone
  createdAt: Date; // data-from: AccountUser-createdAt
}

export interface RegistrationOverviewOutput {
  districtCount: number;
  baselineHourlyRateEur: number;
  featuredCategories: Array<{
    id: string; // data-from: ServiceCategory-id
    key: string; // data-from: ServiceCategory-key
    titleEn: string; // data-from: ServiceCategory-titleEn
    typicalRangeEur: string; // data-from: ServiceCategory-typicalRangeEur
  }>;
}

export interface RegistrationFormData {
  fullName: string;
  email: string;
  password: string;
  phone: string;
  agreedToTerms: boolean;
}

export interface RegistrationFormErrors {
  fullName?: string;
  email?: string;
  password?: string;
  phone?: string;
  agreedToTerms?: string;
  form?: string;
}

export interface ClientBenefit {
  id: string;
  title: string;
  germanTag: string;
  description: string;
  iconName: 'ClipboardList' | 'Calculator' | 'CalendarClock';
  metricLabel: string;
}

export interface PasswordCriterion {
  id: string;
  label: string;
  met: boolean;
}