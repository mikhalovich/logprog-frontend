import { db } from '@/firebase/config';
import { collection, getDocs } from 'firebase/firestore';

export default {
  namespaced: true,

  state: {
    allCarriers: []
  },
  getters: {
  },
  mutations: {
    setCarriers (state, data) {
      state.allCarriers = data;
    }
  },
  actions: {
    async fetchCarriers ({ commit }) {
      const carriersCol = collection(db, 'carriers');
      const carrierSnapshot = await getDocs(carriersCol);
      const carrierList = carrierSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      commit('setCarriers', carrierList);
    }
  }
};
