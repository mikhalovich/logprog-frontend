import { db } from '@/firebase/config';
import { collection, getDocs, setDoc, addDoc, query, orderBy, limit, doc, getDoc, updateDoc } from 'firebase/firestore';

export default {
  namespaced: true,

  state: {
    currencies: [
      'RUB',
      'EUR',
      'BYN',
      'USD'
    ],
    allOrders: [],
    allContractors: [],
    carrier: {
      vehicles: [],
      drivers: []
    },
    client: {},
    currentOrder: {},
    order: {
      orderCreateDate: '',
      shipmentDate: ['', ''],
      carrier: {
        vehicles: [],
        drivers: []
      },
      truck: {},
      trailer: {},
      driver: {}
    },
    lastOrder: {}
  },
  getters: {
    getAllOrders: (state) => state.allOrders.map(order => ({
      id: order.id,
      orderNumber: order.orderNumber,
      shipmentDate: `${order.shipmentDate[0]}, ${order.shipmentDate[1]}`,
      customer: order.customer,
      carrier: order.carrier,
      route: `${order.fromPoint} - ${order.toPoint}`,
      orderUid: order.uid
    })),
    getOrder: (state) => state.Order,
    getCarriersTrucks: (state) => state.order.carrier.vehicles?.length ? state.order.carrier.vehicles.filter(vehicle => vehicle.type.type === 'truck') : [],
    getCarriersTrailers: (state) => state.order.carrier.vehicles?.length ? state.order.carrier.vehicles.filter(vehicle => vehicle.type.type === 'trailer') : [],
    getCarriersDrivers: (state) => state.order.carrier.drivers || [],
    getClients: (state) => state.allContractors.filter(contractor => contractor.type === 'client')
  },
  mutations: {
    setOrder (state, data) {
      state.order = { ...state.order, ...data };
    },

    setOrders (state, data) {
      state.allOrders = data;
    },

    setLastOrder (state, data) {
      state.lastOrder = data;
    },

    setContractors (state, data) {
      state.allContractors = data;
    },

    setCarrier (state, data) {
      state.carrier = data;
    }
  },
  actions: {
    async fetchOrder ({ commit }, orderId) {
      const docRef = doc(db, 'orders', orderId);
      const docSnap = await getDoc(docRef);
      const order = docSnap.data();

      commit('setOrder', order);
    },

    async saveOrder ({ rootState, state, commit }, orderUid) {
      if (orderUid) {
        await setDoc(doc(db, 'orders', orderUid), state.order);
      } else {
        const orderRef = await addDoc(collection(db, 'orders'), state.order);
        const orderNumber = state.lastOrder.orderNumber + 1;

        commit('setOrder', { ...state.order, orderNumber, orderUid: orderRef.id });
      }
    },

    async fetchContractors ({ commit, rootState }) {
      const contractorsCol = collection(db, 'companies', rootState.users.user.companyUid, 'contractors');
      const contractorsSnapshot = await getDocs(contractorsCol);
      const contractorsList = contractorsSnapshot.docs.map(doc => ({
        contractorUid: doc.id,
        ...doc.data()
      }));

      commit('setContractors', [...contractorsList, rootState.companies.company]);
    },

    async fetchCarrier ({ commit }, data) {
      const carrierRef = doc(db, 'companies', data.companyUid || data.carrierUid);
      const carrierSnap = await getDoc(carrierRef);
      const carrier = carrierSnap.data();

      const carrierVehiclesCol = collection(db, 'companies', data.companyUid || data.carrierUid, 'vehicles');
      const carrierVehiclesSnapshot = await getDocs(carrierVehiclesCol);
      const carrierVehiclesList = carrierVehiclesSnapshot.docs.map(doc => ({
        vehicleUid: doc.id,
        ...doc.data()
      }));

      const carrierDriversCol = collection(db, 'companies', data.companyUid || data.carrierUid, 'drivers');
      const carrierDriversSnapshot = await getDocs(carrierDriversCol);
      const carrierDriversList = carrierDriversSnapshot.docs.map(doc => ({
        driverUid: doc.id,
        ...doc.data()
      }));

      commit('setOrder', {
        carrier: {
          carrierUid: carrierSnap.id,
          agreement: data.agreement,
          details: data.details,
          ...carrier,
          vehicles: carrierVehiclesList,
          drivers: carrierDriversList
        }
      });
    },

    async fetchClient ({ commit }, data) {
      const clientRef = doc(db, 'companies', data.companyUid);
      const clientSnap = await getDoc(clientRef);
      const client = clientSnap.data();

      commit('setOrder', {
        client: {
          clientUid: clientSnap.id,
          ...client
        }
      });
    },

    async fetchOrders ({ commit }) {
      const ordersCol = collection(db, 'orders');
      const ordersSnapshot = await getDocs(ordersCol);
      const ordersList = ordersSnapshot.docs.map(doc => ({
        uid: doc.id,
        ...doc.data()
      }));
      debugger;
      commit('setOrders', ordersList);
    },
    async createOrder ({ commit }, order) {
      const orderRef = await addDoc(collection(db, 'orders'), {
        ...order
      });
      order.id = orderRef.id;
      commit('setOrder', order);
    },
    async updateOrder ({ commit }, { order, orderId }) {
      const orderRef = doc(db, 'orders', orderId);
      await updateDoc(orderRef, order);
      commit('setOrder', order);
    },
    async fetchLastOrder ({ commit }) {
      const orders = await query(collection(db, 'orders'), orderBy('orderNumber', 'desc'), limit(1));
      const ordersSnapshot = await getDocs(orders);
      ordersSnapshot.forEach(order => {
        commit('setLastOrder', order.data());
      });
    }
  }
};
