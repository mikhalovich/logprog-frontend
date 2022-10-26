import Vue from 'vue';
import Vuex from 'vuex';

import customers from './modules/customers';
import carriers from './modules/carriers';
import orders from './modules/orders';
import users from './modules/users';
import companies from './modules/companies';
import vehicles from './modules/vehicles';

Vue.use(Vuex);

export default new Vuex.Store({
  strict: true,
  state: {
  },
  getters: {
  },
  mutations: {
  },
  actions: {
    async fetchData ({ state }, data) {
      if (state[data.module][`isPageDataLoaded${data.type}`]) return;
      await this.dispatch(`${data.module}/fetch${data.type}`, data.payload);
    }
  },
  modules: {
    customers,
    carriers,
    orders,
    users,
    companies,
    vehicles
  }
});
