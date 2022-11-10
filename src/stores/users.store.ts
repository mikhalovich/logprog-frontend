import { defineStore } from 'pinia';
import { db, auth } from '@/firebase/firebase';
import {
  doc,
  setDoc,
  collection,
  getDocs,
  getDoc,
  updateDoc,
} from 'firebase/firestore';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth';
import { IUserDto, IUserRegistrationDto } from '@/types';

export type UsersState = {
  user: IUserDto;
};

export const useUsersStore = defineStore('usersStore', {
  state: () =>
    ({
      user: {},
    } as UsersState),

  actions: {
    async createUserEmailPassword(
      userData: IUserRegistrationDto,
      password: string,
    ) {
      await createUserWithEmailAndPassword(auth, userData.email, password)
        .then((userCredential) => {
          const user = {
            id: userCredential.user.uid,
            ...userData,
          };
          this.user = <IUserDto>user;
          this.setUserToDB(user);
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log(
            `error code: ${errorCode}, error message: ${errorMessage}`,
          );
        });
    },
    async setUserToDB({ id, ...user }: { id: string }) {
      await setDoc(doc(db, 'users', id), user);
    },
    async signInUserEmailPassword({
      email,
      password,
    }: {
      email: string;
      password: string;
    }) {
      await signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          this.fetchUserDataFromUsers(userCredential.user.uid);
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log(
            `error code: ${errorCode}, error message: ${errorMessage}`,
          );
        });
    },
    async fetchUserDataFromUsers(userId: string) {
      const docRef = doc(db, 'users', userId);
      const docSnap = await getDoc(docRef);
      this.user = <IUserDto>docSnap.data();
    },
    signOutUser() {
      signOut(auth)
        .then(() => {
          this.user = <IUserDto>{};
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log(
            `error code: ${errorCode}, error message: ${errorMessage}`,
          );
        });
    },
  },
});
