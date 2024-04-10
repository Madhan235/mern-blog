// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-blog23.firebaseapp.com",
  projectId: "mern-blog23",
  storageBucket: "mern-blog23.appspot.com",
  messagingSenderId: "276642101686",
  appId: "1:276642101686:web:a5b245874145239a9ae917"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);