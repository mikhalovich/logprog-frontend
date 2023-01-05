import { IVehicle, IDriver, IContractorDto } from '../order';

export interface ICompanyDto {
  uid: string;
  agreement: string;
  details: ICompanyDetails;
  name: string;
  post: string;
  signsName: string;
  vehicles?: IVehicle[];
  drivers?: IDriver[];
  contractors?: IContracrotDto[];
  carrier?: IContracrotDto[];
  type: string;
}

export interface ICompanyDetails {
  taxUid: string;
  bankAccount: string;
  bankDetails: string;
  mailAddress?: string;
  legalAddress: string;
  contacts: string;
}
