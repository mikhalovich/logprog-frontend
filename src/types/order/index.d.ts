import { VehicleTypes, CompanyTypes } from './enums';
import { ICompanyDto } from '../company';

export interface IDriver {
  uid?: string;
  driverContacts: string;
  driverName: string;
  driverPassport: string;
}

export interface IVehicle {
  mark: string;
  registrationNumber: string;
  type: VehicleTypes;
  uid?: string;
}

export interface IOrderDto {
  uid: string;
  cargo: string;
  carrierPrice: string;
  clientPrice: string;
  currency: string;
  fromPoint: string;
  toPoint: string;
  orderCreateDate: string;
  orderNumber: number;
  shipmentDate: string[];
  carrier: ICompanyDto;
  client: ICompanyDto;
  trailer: IVehicle;
  truck: IVehicle;
  driver: IDriver;
}

export interface IFilteredOrder {
  orderUid: string;
  orderNumber: number;
  shipmentDate: string;
  client: ICompanyDto;
  carrier: ICompanyDto;
  route: string;
}

export interface IContractorDto {
  uid: string;
  agreement: string;
  name: string;
  type: CompanyTypes;
}
