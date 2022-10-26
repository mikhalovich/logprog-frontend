import { db } from '@/firebase/config';
import { doc, collection, getDocs, getDoc, updateDoc } from 'firebase/firestore';

export default {
  namespaced: true,

  state: {
    company: {},
    isPageDataLoadedCompany: false
  },
  getters: {
    getCompany: (state) => {
      return state.company;
    }
  },
  mutations: {
    setCurrentCompany (state, data) {
      state.company = { ...state.company, ...data };
      state.isPageDataLoadedCompany = true;
    }
  },
  actions: {
    async fetchCompany ({ commit, rootState }) {
      const docRef = doc(db, 'companies', rootState.users.user.companyUid);
      const docSnap = await getDoc(docRef);
      const company = docSnap.data();

      const companyVehiclesCol = collection(db, 'companies', rootState.users.user.companyUid, 'vehicles');
      const companyVehiclesSnapshot = await getDocs(companyVehiclesCol);
      const companyVehiclesList = companyVehiclesSnapshot.docs.map(doc => ({
        vehicleUid: doc.id,
        ...doc.data()
      }));

      const companyDriversCol = collection(db, 'companies', rootState.users.user.companyUid, 'drivers');
      const companyDriversSnapshot = await getDocs(companyDriversCol);
      const companyDriversList = companyDriversSnapshot.docs.map(doc => ({
        driverUid: doc.id,
        ...doc.data()
      }));

      commit('setCurrentCompany', {
        companyUid: docSnap.id,
        ...company,
        vehicles: companyVehiclesList,
        drivers: companyDriversList
      });
    },

    async saveCompany ({ state }, companyUid) {
      const orderRef = doc(db, 'companies', companyUid);
      await updateDoc(orderRef, state.company);
    }
  }
};
