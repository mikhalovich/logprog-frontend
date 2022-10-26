import { db } from '@/firebase/config';
import { collection, getDocs } from 'firebase/firestore';

export default {
  namespaced: true,

  state: {
    allClients: []
  },
  getters: {
  },
  mutations: {
    setCustomer (state, data) {
      state.allClients = data;
    }
  },
  actions: {
    async fetchCustomers ({ commit }) {
      const customersCol = collection(db, 'customers');
      const customerSnapshot = await getDocs(customersCol);
      const customerList = customerSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      commit('setCustomer', customerList);
    }
  }
};
