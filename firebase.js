// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAzOziAwe2RsuB9NW5KrRZmlxPVyyPG2_E",
  authDomain: "lifter-ios-v1.firebaseapp.com",
  projectId: "lifter-ios-v1",
  storageBucket: "lifter-ios-v1.appspot.com",
  messagingSenderId: "716473907866",
  appId: "1:716473907866:web:90600c2415ceef69dffd23"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore();

export { auth, db };