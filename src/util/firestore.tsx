  // Import the functions you need from the SDKs you need
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyA7wm83ld5sTyXT0M7gwMTe6pDAsdICwJQ",
    authDomain: "boxed-7cb05.firebaseapp.com",
    projectId: "boxed-7cb05",
    storageBucket: "boxed-7cb05.appspot.com",
    messagingSenderId: "487761626055",
    appId: "1:487761626055:web:87e9093ea5e29c088bcfe2",
    measurementId: "G-QJ1D5Y683W"
  };
  
  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);
  const storage = getStorage(app)

  export { app, db, storage}