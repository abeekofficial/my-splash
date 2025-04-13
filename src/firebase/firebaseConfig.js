import { getAuth } from "firebase/auth";
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyA5oShsJfl8Ox6E5-ID1TQ3foZdScS6MyI",
  authDomain: "mysplash-abeek.firebaseapp.com",
  projectId: "mysplash-abeek",
  storageBucket: "mysplash-abeek.firebasestorage.app",
  messagingSenderId: "486893956334",
  appId: "1:486893956334:web:438343dbf10174d64b57ff",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth();
