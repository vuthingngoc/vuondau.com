// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyD18a1UxSqfHcx4xFb-O7oILp3rNz_w1t0',
  authDomain: 'vuondau-c7514.firebaseapp.com',
  projectId: 'vuondau-c7514',
  storageBucket: 'vuondau-c7514.appspot.com',
  messagingSenderId: '666618735426',
  appId: '1:666618735426:web:951454eac18782eb0b76db',
  measurementId: 'G-ECE9V6L95W',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
export const auth = getAuth(app);
