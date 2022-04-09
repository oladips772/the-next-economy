/** @format */
import { getApps, initializeApp ,getApp} from "firebase/app";
import { getAuth, } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import {getStorage} from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBKlQ_Zlz3-tMfmVzK4hXZCim0VvYuw05k",
  authDomain: "next-economy.firebaseapp.com",
  projectId: "next-economy",
  storageBucket: "next-economy.appspot.com",
  messagingSenderId: "814894731715",
  appId: "1:814894731715:web:5b2c6d64fc9c3decd9ad76",
};

const app = getApps.length ? getApp() : initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore();
const storage = getStorage();

export { auth, db, storage, app};
