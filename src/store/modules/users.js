import { auth, db } from '@/firebase/config';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth';

export default {
  namespaced: true,

  state: {
    user: {}
  },
  getters: {
    isUserInStore: (state) => Object.entries(state.user).length,
    getCurrentUser: (state) => state.user

  },
  mutations: {
    setUser (state, data) {
      state.user = data;
    },

    removeUser (state) {
      state.user = {};
    }
  },
  actions: {
    async createUserEmailPassword ({ commit, dispatch }, userData, password) {
      await createUserWithEmailAndPassword(auth, userData.email, password)
        .then((userCredential) => {
          const user = {
            id: userCredential.user.uid,
            ...userData
          };

          commit('setUser', user);
          dispatch('setUserToDB', user);
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log(`error code: ${errorCode}, error message: ${errorMessage}`);
        });
    },

    async setUserToDB ({ commit }, { id, ...user }) {
      await setDoc(doc(db, 'users', id), user);
    },

    async signInUserEmailPassword ({ dispatch }, { email, password }) {
      await signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          dispatch('fetchUserDataFromUsers', userCredential.user.uid);
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log(`error code: ${errorCode}, error message: ${errorMessage}`);
        });
    },

    async fetchUserDataFromUsers ({ commit }, userId) {
      const docRef = doc(db, 'users', userId);
      const docSnap = await getDoc(docRef);
      const user = docSnap.data();

      commit('setUser', user);
    },

    signOutUser ({ commit }) {
      signOut(auth).then(() => {
        commit('removeUser');
      }).catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(`error code: ${errorCode}, error message: ${errorMessage}`);
      });
    }
  }
};
