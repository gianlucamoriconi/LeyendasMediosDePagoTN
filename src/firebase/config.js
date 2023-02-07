// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCvaIcQT1JdAm7rLFSTt3beK2ZYNzcbR_k",
  authDomain: "leyendas-tn.firebaseapp.com",
  projectId: "leyendas-tn",
  storageBucket: "leyendas-tn.appspot.com",
  messagingSenderId: "279697647653",
  appId: "1:279697647653:web:9463e6f66e315bf56777cc",
  measurementId: "G-NFJX6P0F2B"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);