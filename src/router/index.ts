import {
  createRouter,
  createWebHistory,
  NavigationGuardNext,
  RouteLocationNormalized,
} from 'vue-router';
import { routes } from './routes';
import { auth } from '@/firebase/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { useUsersStore } from '@/stores/users.store';

const router = createRouter({
  routes,
  history: createWebHistory(),
});

router.beforeEach(
  (
    to: RouteLocationNormalized,
    from: RouteLocationNormalized,
    next: NavigationGuardNext,
  ) => {
    if (to.meta.authNotRequired) {
      return next();
    } else {
      try {
        onAuthStateChanged(auth, async (user) => {
          if (user) {
            const userStore = useUsersStore();
            if (!Object.entries(userStore.user).length)
              await userStore.fetchUserDataFromUsers(user.uid);
            next();
          } else {
            alert('You must be logged in to see this page');
            next({
              path: '/login',
            });
          }
        });
      } catch (error) {
        console.log(error);
      }
    }
  },
);

export default router;
