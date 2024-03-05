// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "drop-access.firebaseapp.com",
  projectId: "drop-access",
  storageBucket: "drop-access.appspot.com",
  messagingSenderId: "719445916138",
  appId: "1:719445916138:web:c9501be792132e09dada93"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);