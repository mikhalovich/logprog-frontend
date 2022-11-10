import { defineStore } from 'pinia';
import { db } from '@/firebase/firebase';
import {
  doc,
  collection,
  getDocs,
  getDoc,
  updateDoc,
} from 'firebase/firestore';
import { ICompanyDto, IVehicle, IDriver } from '@/types';
import { useUsersStore } from '@/stores/users.store';

export type CompaniesState = {
  company: ICompanyDto;
};

export const useCompaniesStore = defineStore('companiesStore', {
  state: () =>
    ({
      company: {},
    } as CompaniesState),

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
    },
    async saveCompany(companyUid: string) {
      const orderRef = doc(db, 'companies', companyUid);
      await updateDoc(orderRef, this.company);
    },
  },
});
