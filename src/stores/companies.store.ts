import { defineStore } from 'pinia';
import { db } from '@/firebase/firebase';
import {
  doc,
  collection,
  getDocs,
  getDoc,
  updateDoc,
  setDoc
} from 'firebase/firestore';
import { ICompanyDto, IVehicle, IDriver } from '@/types';
import { VehicleTypes } from '@/types/order/enums';
import { useUsersStore } from '@/stores/users.store';

export type CompaniesState = {
  company: ICompanyDto;
  vehicle: IVehicle;
  driver: IDriver;
  vehicleTypes: VehicleTypes[];
  isCompanyLoaded: Boolean;
};

export const useCompaniesStore = defineStore('companiesStore', {
  state: () =>
    ({
      company: {} as ICompanyDto | {},
      vehicle: {} as IVehicle | {},
      driver: {} as IDriver | {},
      vehicleTypes: ['trailer', 'truck'],
      isCompanyLoaded: false
    } as CompaniesState),
  
  getters: {
    getCompanyVehicles: (state) =>
    state.company.vehicles,
    getCompanyDrivers: (state) =>
      state.company.drivers,
  },

  actions: {
    async fetchCompany() {
      const userStore = useUsersStore();

      const docRef = doc(db, 'companies', userStore.user.companyUid);
      const docSnap = await getDoc(docRef);
      const company = docSnap.data();

      const companyVehiclesCol = collection(
        db,
        'companies',
        userStore.user.companyUid,
        'vehicles',
      );
      const companyVehiclesSnapshot = await getDocs(companyVehiclesCol);
      const companyVehiclesList = <IVehicle[]>companyVehiclesSnapshot.docs.map(
        (doc) => ({
          uid: doc.id,
          ...doc.data(),
        }),
      );

      const companyDriversCol = collection(
        db,
        'companies',
        userStore.user.companyUid,
        'drivers',
      );
      const companyDriversSnapshot = await getDocs(companyDriversCol);
      const companyDriversList = <IDriver[]>companyDriversSnapshot.docs.map(
        (doc) => ({
          uid: doc.id,
          ...doc.data(),
        }),
      );

      this.company = <ICompanyDto>{
        uid: docSnap.id,
        ...company,
        vehicles: companyVehiclesList,
        drivers: companyDriversList,
      };

      this.isCompanyLoaded = true;
    },
    async saveCompany(companyUid: string) {
      const orderRef = doc(db, 'companies', companyUid);
      await updateDoc(orderRef, this.company);
    },

    setVehicle(vehicleId: string) {
      this.vehicle = <IVehicle>this.company.vehicles?.find((vehicle) => vehicle.uid === vehicleId);
    },

    setDriver(driverId: string) {
      this.driver = <IDriver>this.company.drivers?.find((driver) => driver.uid === driverId)
    },

    async createVehicle() {
      const userStore = useUsersStore();
      const companyVehiclesCol = collection(
        db,
        'companies',
        userStore.user.companyUid,
        'vehicles',
      );
      const vehicleRef = await doc(companyVehiclesCol);
      this.vehicle.uid = vehicleRef.id;
      await setDoc(vehicleRef, this.vehicle);
    },

    async updateVehicle(vehicleId: string) {
      const userStore = useUsersStore();
      const vehicleRef = doc(db, 'companies',  userStore.user.companyUid, 'vehicles', vehicleId);
      await updateDoc(vehicleRef, this.vehicle as {});
    },

    async createDriver() {
      const userStore = useUsersStore();
      const companyDriversCol = collection(
        db,
        'companies',
        userStore.user.companyUid,
        'drivers',
      );
      const driverRef = await doc(companyDriversCol);
      this.driver.uid = driverRef.id;
      await setDoc(driverRef, this.driver);
    },

    async updateDriver(driverId: string) {
      const userStore = useUsersStore();
      const driverRef = doc(db, 'companies',  userStore.user.companyUid, 'drivers', driverId);
      await updateDoc(driverRef, this.driver as {});
    },
  },
});
