import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyBeBkWulmBjnWh6KxJE0K3xPvO3c136eUc",
  authDomain: "kaia-verse.firebaseapp.com",
  projectId: "kaia-verse",
  storageBucket: "kaia-verse.firebasestorage.app",
  messagingSenderId: "391938553161",
  appId: "1:391938553161:web:b7a45774f08dc7c8ce1698",
  measurementId: "G-B8WMD5PWZX"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export default app;