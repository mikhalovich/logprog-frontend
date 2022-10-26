import Vue from 'vue';
import VueRouter from 'vue-router';
import store from './../store';
import { auth } from '@/firebase/config';
import { onAuthStateChanged } from 'firebase/auth';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import(/* webpackChunkName: "registration" */ '../views/HomeView.vue'),
    meta: {
      layout: 'MainLayout',
      authRequired: true
    }
  },
  // {
  //   path: '/order/:id',
  //   name: 'editOrder',
  //   component: () => import(/* webpackChunkName: "registration" */ '../views/EditOrderView.vue'),
  //   meta: {
  //     layout: 'MainLayout',
  //     authRequired: true
  //   }
  // },
  {
    path: '/orders/order',
    name: 'order',
    component: () => import(/* webpackChunkName: "registration" */ '../views/OrderView.vue'),
    meta: {
      layout: 'MainLayout',
      authRequired: true
    }
  },
  {
    path: '/user',
    name: 'user',
    component: () => import(/* webpackChunkName: "registration" */ '../views/UserView.vue'),
    meta: {
      layout: 'MainLayout',
      authRequired: true
    }
  },
  {
    path: '/company',
    name: 'company',
    component: () => import(/* webpackChunkName: "registration" */ '../views/CompanyView.vue'),
    meta: {
      layout: 'MainLayout',
      authRequired: true
    }
  },
  {
    path: '/vehicles',
    name: 'vehicles',
    component: () => import(/* webpackChunkName: "registration" */ '../views/VehiclesView.vue'),
    meta: {
      layout: 'MainLayout',
      authRequired: true
    }
  },
  {
    path: '/vehicles/vehicle',
    name: 'vehicle',
    component: () => import(/* webpackChunkName: "registration" */ '../views/VehicleView.vue'),
    meta: {
      layout: 'MainLayout',
      authRequired: true
    }
  },
  {
    path: '/registration',
    name: 'registration',
    component: () => import(/* webpackChunkName: "registration" */ '../views/RegistrationView.vue')
  },
  {
    path: '/login',
    name: 'login',
    component: () => import(/* webpackChunkName: "login" */ '../views/LoginView.vue')
  },
  {
    path: '/reset-password',
    name: 'reset-password',
    component: () => import(/* webpackChunkName: "login" */ '../views/ResetPasswordView.vue')
  }
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.authRequired)) {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        // if user curently in store, no need to fetch user from users. It need when we route without page reloading.
        if (!store.getters['users/isUserInStore']) await store.dispatch('users/fetchUserDataFromUsers', user.uid);
        next();
      } else {
        alert('You must be logged in to see this page');
        next({
          path: '/login'
        });
      }
    });
  } else {
    next();
  }
});

export default router;
