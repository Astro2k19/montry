import { initializeApp } from "firebase/app";
import { getFirestore } from '@firebase/firestore';


const firebaseConfig = {
    apiKey: "AIzaSyBOAUj3HK6mVst-S3xkDNmn9sxCi7aiE6s",
    authDomain: "montra-768a4.firebaseapp.com",
    projectId: "montra-768a4",
    storageBucket: "montra-768a4.appspot.com",
    messagingSenderId: "145690759489",
    appId: "1:145690759489:web:f22946680c99888a1811c0",
    measurementId: "G-MCFLP3MDVV"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);