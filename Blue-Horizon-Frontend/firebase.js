// firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyC7A3Lg-I-p3Q3ir9CxWeHaGO2rivTo4Ks",
    authDomain: "blue-horizon-18795.firebaseapp.com",
    projectId: "blue-horizon-18795",
    storageBucket: "blue-horizon-18795.firebasestorage.app",
    messagingSenderId: "51225588006",
    appId: "1:51225588006:web:d139a399bb79de22bf11e7",
    measurementId: "G-FZCQ6ELKK5",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };
