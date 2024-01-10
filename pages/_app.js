import { AmongUsProvider } from "../context/main-data";
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import "../styles/global.css";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBZESaCQxICkbw58hxoc3bkI-eTKBlrx_E",
  authDomain: "minigame-rappenstein.firebaseapp.com",
  projectId: "minigame-rappenstein",
  storageBucket: "minigame-rappenstein.appspot.com",
  messagingSenderId: "997633146369",
  appId: "1:997633146369:web:0a6115213b401ed8d10a00"
};

export default function App({ Component, pageProps }) {

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  
  return <AmongUsProvider><Component {...pageProps} />
  </AmongUsProvider>;
}
