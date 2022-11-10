import { IVehicle, IDriver, IContractorDto } from '../order';

export interface ICompanyDto {
  uid?: string;
  agreement: string;
  details: string;
  name: string;
  post: string;
  signsName: string;
  vehicles?: IVehicle[];
  drivers?: IDriver[];
  contractors?: IContracrotDto[];
  address?: string;
}
