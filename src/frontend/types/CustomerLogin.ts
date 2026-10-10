export type AccountUserRole = "CUSTOMER" | "ADMIN";

export interface CustomerLoginFormValues {
  email: string;
  password: string;
}

export interface CustomerLoginFormErrors {
  email?: string;
  password?: string;
  general?: string;
}

export interface ClientDossierPrivilege {
  id: string;
  specCode: string;
  title: string;
  description: string;
}

export interface RegistrationBenefit {
  id: string;
  title: string;
  description: string;
}

export interface LoginCustomerInput {
  email: string;
  password: string;
}

export interface LoginCustomerOutput {
  token: string;
  userId: string; // data-from: AccountUser-id
  email: string; // data-from: AccountUser-email
  fullName: string; // data-from: AccountUser-fullName
  role: AccountUserRole; // data-from: AccountUser-role
}

export interface CustomerPortalMetaOutput {
  totalDistricts: number;
  minHourlyRateEur: number;
  totalCategories: number;
}