import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const config = {
  apiKey: 'AIzaSyAAeocscZswEzVpj1oxZjuu0dcloS5FsFY',
  authDomain: 'logprog-b8d22.firebaseapp.com',
  projectId: 'logprog-b8d22',
  storageBucket: 'logprog-b8d22.appspot.com',
  messagingSenderId: '787595131134',
  appId: '1:787595131134:web:69e79c126926f4c7344daf',
};

const app = initializeApp(config);
const db = getFirestore(app);
const auth = getAuth(app);

export { auth, db, app };
