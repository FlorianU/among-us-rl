
// Import the functions you need from the SDKs you need
import { initializeApp, getApps } from "firebase/app";
import { getFirestore, collection, getDocs } from 'firebase/firestore/lite';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBZESaCQxICkbw58hxoc3bkI-eTKBlrx_E",
    authDomain: "minigame-rappenstein.firebaseapp.com",
    projectId: "minigame-rappenstein",
    storageBucket: "minigame-rappenstein.appspot.com",
    messagingSenderId: "997633146369",
    appId: "1:997633146369:web:0a6115213b401ed8d10a00"
  };
  

// Initialize Firebase
let firebase_app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];

export default firebase_app;
  