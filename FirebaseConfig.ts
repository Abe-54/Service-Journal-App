// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCc7HjFSQZO78v2xKa6t-39KU68_RvIFaU",
  authDomain: "service-journal-47b38.firebaseapp.com",
  projectId: "service-journal-47b38",
  storageBucket: "service-journal-47b38.appspot.com",
  messagingSenderId: "97025793661",
  appId: "1:97025793661:web:451ddfaba4deeea7861b14",
  measurementId: "G-FCMTWB73LT",
};

// Initialize Firebase
export const FIREBASE_APP = initializeApp(firebaseConfig);
export const FIREBASE_AUTH = getAuth(FIREBASE_APP);
