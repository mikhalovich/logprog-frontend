import { OrganizationTypes } from './enums'

export interface IUserDto {
  id?: string;
  companyUid: string;
  taxId: string,
  dataAgreements: Boolean;
  email: string;
  organizationType: OrganizationTypes;
  phoneNumber: string;
  terms: Boolean;
  userName: string;
}

export interface IUserRegistrationDto {
  userName: string;
  companyName: string;
  companyUid: string;
  taxId: string
  organizationType: OrganizationTypes;
  phoneNumber: string;
  email: string;
  terms: Boolean;
  dataAgreements: Boolean;
}
