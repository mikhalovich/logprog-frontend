import { defineStore, storeToRefs } from 'pinia';
import { db } from '@/firebase/firebase';
import {
  doc,
  getDoc,
  getDocs,
  collection,
  query,
  orderBy,
  limit,
  addDoc,
  updateDoc,
  setDoc,
} from 'firebase/firestore';
import {
  IOrderDto,
  IContractorDto,
  IVehicle,
  IDriver,
  ICompanyDto,
  IFilteredOrder,
} from '@/types';
import { Currencies } from '@/types/order/enums';
import { useUsersStore } from '@/stores/users.store';
import { useCompaniesStore } from '@/stores/companies.store';

export type OrdersState = {
  orders: IOrderDto[];
  currencies: Currencies[];
  contractors: IContractorDto[];
  order: IOrderDto;
  lastOrder: IOrderDto;
};

export const useOrdersStore = defineStore('ordersStore', {
  state: () =>
    ({
      orders: [],
      currencies: ['RUB', 'EUR', 'BYN', 'USD'],
      contractors: [],
      order: {} as IOrderDto | {},
      lastOrder: {} as IOrderDto | {},
    } as OrdersState),
  getters: {
    filteredOrders: (state) =>
      state.orders.map(
        (order: IOrderDto) =>
          <IFilteredOrder>{
            orderUid: order.uid,
            orderNumber: order.orderNumber,
            shipmentDate: `${order.shipmentDate[0]}, ${order.shipmentDate[1]}`,
            client: order.client,
            carrier: order.carrier,
            route: `${order.fromPoint} - ${order.toPoint}`,
          },
      ),
    getCarriersTrucks: (state) =>
      state.order?.carrier?.vehicles?.filter(
        (vehicle: IVehicle) => vehicle.type === 'truck',
      ),
    getCarriersTrailers: (state) =>
      state.order?.carrier?.vehicles?.filter(
        (vehicle: IVehicle) => vehicle.type === 'trailer',
      ),
    getCarriersDrivers: (state) => state.order.carrier?.drivers || [],
    getCariers: (state) =>
      state.contractors.filter((contractor) => contractor.type === 'carrier'),
    getClients: (state) =>
      state.contractors.filter((contractor) => contractor.type === 'client'),
  },
  actions: {
    async fetchOrder(orderId: string) {
      const docRef = doc(db, 'orders', orderId);
      const docSnap = await getDoc(docRef);
      this.order = docSnap.data() as IOrderDto;
    },

    async fetchOrders() {
      const ordersCol = collection(db, 'orders');
      const ordersSnapshot = await getDocs(ordersCol);
      this.orders = ordersSnapshot.docs.map((doc) => ({
        uid: doc.id,
        ...doc.data(),
      })) as IOrderDto[];
    },

    async fetchLastOrder() {
      const orders = await query(
        collection(db, 'orders'),
        orderBy('orderNumber', 'desc'),
        limit(1),
      );
      const ordersSnapshot = await getDocs(orders);
      ordersSnapshot.forEach((order) => {
        this.lastOrder = order.data() as IOrderDto;
      });
      this.order.orderNumber = this.lastOrder.orderNumber + 1;
    },

    async fetchContractors() {
      const userStore = useUsersStore();
      const { company } = storeToRefs(useCompaniesStore());
      const contractorsCol = collection(
        db,
        'companies',
        userStore.user.companyUid,
        'contractors',
      );
      const contractorsSnapshot = await getDocs(contractorsCol);
      const contractorsList = contractorsSnapshot.docs.map((doc) => ({
        uid: doc.id,
        ...doc.data(),
      }));

      this.contractors = <IContractorDto[]>[...contractorsList, company];
    },
    async fetchCarrier(data: ICompanyDto) {
      const carrierRef = doc(db, 'companies', data.uid);
      const carrierSnap = await getDoc(carrierRef);
      const carrier = <ICompanyDto>carrierSnap.data();
      carrier.uid = carrierSnap.id;

      const carrierVehiclesCol = collection(
        db,
        'companies',
        data.uid || '',
        'vehicles',
      );
      const carrierVehiclesSnapshot = await getDocs(carrierVehiclesCol);
      const carrierVehiclesList = <IVehicle[]>carrierVehiclesSnapshot.docs.map(
        (doc) => ({
          uid: doc.id,
          ...doc.data(),
        }),
      );

      const carrierDriversCol = collection(
        db,
        'companies',
        data.uid || '',
        'drivers',
      );
      const carrierDriversSnapshot = await getDocs(carrierDriversCol);
      const carrierDriversList = <IDriver[]>carrierDriversSnapshot.docs.map(
        (doc) => ({
          uid: doc.id,
          ...doc.data(),
        }),
      );

      this.order.carrier = <ICompanyDto>{
        ...carrier,
        agreement: data.agreement,
        vehicles: carrierVehiclesList,
        drivers: carrierDriversList,
      };
    },
    async fetchClient(data: ICompanyDto) {
      const clientRef = doc(db, 'companies', data.uid || '');
      const clientSnap = await getDoc(clientRef);
      const client = clientSnap.data();
      this.order.client = <ICompanyDto>{
        uid: clientSnap.id,
        ...client,
      };
    },
    async createOrder() {
      const orderRef = await doc(collection(db, 'orders'));
      await setDoc(orderRef, this.order);
      this.order.uid = orderRef.id;
    },
    async updateOrder(orderId: string) {
      const orderRef = doc(db, 'orders', orderId);
      await updateDoc(orderRef, this.order as {});
    },
  },
});
