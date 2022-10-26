import { db } from '@/firebase/config';
import { doc, getDoc, setDoc, addDoc, collection, getDocs } from 'firebase/firestore';

export default {
  namespaced: true,

  state: {
    vehicles: [],
    vehicle: {},
    allTypes: [
      { title: 'Тягач', type: 'truck' },
      { title: 'Прицеп', type: 'trailer' }
    ],
    vehiclesHeaders: [
      {
        text: 'Регистрационный номер',
        align: 'start',
        value: 'registrationNumber'
      },
      { text: 'Тип', value: 'type' },
      { text: 'Марка и модель', value: 'mark' }
      // { text: 'Водитель', value: 'driver' }
    ],
    isPageDataLoadedVehicles: false,
    isPageDataLoadedVehicle: false
  },
  getters: {
  },
  mutations: {
    setVehicles (state, data) {
      state.vehicles = data;
      // state.isPageDataLoadedVehicles = true;
    },

    setVehicle (state, data) {
      state.vehicle = { ...state.vehicle, ...data };
      state.isPageDataLoadedVehicle = true;
    },

    removeVehicle (state) {
      state.vehicle = {};
      state.isPageDataLoadedVehicle = false;
    }
  },
  actions: {
    async fetchVehicle ({ commit, rootState }, vehicleUid) {
      const docRef = doc(db, 'companies', rootState.users.user.companyUid, 'vehicles', vehicleUid);
      const docSnap = await getDoc(docRef);
      const vehicle = docSnap.data();

      commit('setVehicle', vehicle);
    },

    async fetchVehicles ({ commit, rootState }) {
      const vehiclesCol = collection(db, 'companies', rootState.users.user.companyUid, 'vehicles');
      const vehiclesSnapshot = await getDocs(vehiclesCol);
      const vehiclesList = vehiclesSnapshot.docs.map(doc => ({
        vehicleUid: doc.id,
        ...doc.data()
      }));

      commit('setVehicles', vehiclesList);
    },

    async saveVehicle ({ rootState, state, commit }, vehicleUid) {
      if (vehicleUid) {
        await setDoc(doc(db, 'companies', rootState.users.user.companyUid, 'vehicles', vehicleUid), state.vehicle);
      } else {
        const vehicleRef = await addDoc(collection(db, 'companies', rootState.users.user.companyUid, 'vehicles'), state.vehicle);
        commit('setVehicle', { ...state.vehicle, vehicleUid: vehicleRef.id });
      }
    }
  }
};
