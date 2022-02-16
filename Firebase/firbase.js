import * as firebase from "firebase/compat";
import {
  getFirestore,
  setDoc,
  doc,
  collection,
  getDocs,
} from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getDatabase, ref, onValue, set } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyDml1CZx6jb2u8Z3ETf4fpt-j5erFBS3gY",
  authDomain: "hostelattendancereact.firebaseapp.com",
  projectId: "hostelattendancereact",
  storageBucket: "hostelattendancereact.appspot.com",
  messagingSenderId: "738247550669",
  appId: "1:738247550669:web:e0cab4659d5f175029ab84",
  measurementId: "G-YNGHNJFGE9",
};

// let app;
// if (firebase.app.length === 0) {
//   app = firebase.initializeApp(firebaseConfig);
// } else {
//   app = firebase.app();
// }

const app = firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();

const firestore = getFirestore();

const db = getFirestore(app);

const mRef = ref;

export {
  auth,
  firebaseConfig,
  app,
  firestore,
  setDoc,
  doc,
  getAuth,
  onAuthStateChanged,
  getDatabase,
  mRef,
  onValue,
  set,
  db,
  collection,
  getDocs,
};
