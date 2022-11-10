export interface IUserDto {
  id?: string;
  companyUid: string;
  dataAgreements: Boolean;
  email: string;
  organizationType: number;
  phoneNumber: string;
  terms: Boolean;
  userName: string;
}

export interface IUserRegistrationDto {
  userName: string;
  companyName: string;
  companyUid: string;
  organizationType: number;
  phoneNumber: string;
  email: string;
  terms: Boolean;
  dataAgreements: Boolean;
}
