import { RouteRecordRaw } from 'vue-router';
import Home from '@/views/Home.vue';
import Order from '@/views/Order.vue';
import User from '@/views/User.vue';
import Company from '@/views/Company.vue';
import Vehicles from '@/views/Vehicles.vue';
import Vehicle from '@/views/Vehicle.vue';
import Registration from '@/views/Registration.vue';
import Login from '@/views/Login.vue';
import ResetPassword from '@/views/ResetPassword.vue';

export const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'home',
    component: Home,
    meta: {
      layout: 'MainLayout',
    },
  },
  {
    path: '/login',
    name: 'login',
    component: Login,
    meta: {
      authNotRequired: true,
    },
  },
  {
    path: '/registration',
    name: 'registration',
    component: Registration,
    meta: {
      authNotRequired: true,
    },
  },
  {
    path: '/orders/order',
    name: 'order',
    component: Order,
    meta: {
      layout: 'MainLayout',
    },
  },
  // {
  //   path: '/user',
  //   name: 'user',
  //   component: () => User,
  //   meta: {
  //     layout: 'MainLayout',
  //   },
  // },
  // {
  //   path: '/company',
  //   name: 'company',
  //   component: Company,
  //   meta: {
  //     layout: 'MainLayout',
  //   },
  // },
  // {
  //   path: '/vehicles',
  //   name: 'vehicles',
  //   component: Vehicles,
  //   meta: {
  //     layout: 'MainLayout',
  //   },
  // },
  // {
  //   path: '/vehicles/vehicle',
  //   name: 'vehicle',
  //   component: () => Vehicle,
  //   meta: {
  //     layout: 'MainLayout',
  //   },
  // },
  // {
  //   path: '/registration',
  //   name: 'registration',
  //   component: Registration,
  //   meta: {
  //     authNotRequired: true,
  //   },
  // },
  // {
  //   path: '/',
  //   name: 'login',
  //   component: Login,
  //   meta: {
  //     authNotRequired: true,
  //   },
  // },
  // {
  //   path: '/reset-password',
  //   name: 'reset-password',
  //   component: ResetPassword,
  //   meta: {
  //     authNotRequired: true,
  //   },
  // },
];
