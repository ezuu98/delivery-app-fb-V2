import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const env = import.meta.env || {};
const firebaseConfig = {
  apiKey: env.VITE_FIREBASE_API_KEY || 'AIzaSyD-zBSQk_OIyIDzRG0wBNlQCloBqu25ijo',
  authDomain: env.VITE_FIREBASE_AUTH_DOMAIN || 'fresh-basket-a8933.firebaseapp.com',
  projectId: env.VITE_FIREBASE_PROJECT_ID || 'fresh-basket-a8933',
  storageBucket: env.VITE_FIREBASE_STORAGE_BUCKET || 'fresh-basket-a8933.appspot.com',
  messagingSenderId: env.VITE_FIREBASE_MESSAGING_SENDER_ID || '163656027399',
  appId: env.VITE_FIREBASE_APP_ID || '1:163656027399:web:7bbd739740ec13453489a2',
  measurementId: env.VITE_FIREBASE_MEASUREMENT_ID || 'G-7M8H5YJF18',
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
