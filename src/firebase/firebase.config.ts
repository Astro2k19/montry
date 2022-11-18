import {initializeApp} from "firebase/app";
import {getFirestore} from '@firebase/firestore';
import {getAuth} from "firebase/auth";


let firebaseConfig;

if (import.meta.env.MODE === "development") {
//use dev keys
    firebaseConfig = {
        apiKey: 'AIzaSyBOAUj3HK6mVst-S3xkDNmn9sxCi7aiE6s',
        authDomain: 'montra-768a4.firebaseapp.com',
        projectId: 'montra-768a4',
        storageBucket: 'montra-768a4.appspot.com',
        messagingSenderId: '145690759489',
        appId: '1:145690759489:web:f22946680c99888a1811c0',
        measurementId: 'G-MCFLP3MDVV'
    }

} else {
//use .env variables
    firebaseConfig = {
        apiKey: import.meta.env.REACT_APP_FIREBASE_API_KEY,
        authDomain: import.meta.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
        projectId: import.meta.env.REACT_APP_FIREBASE_PROJECT_ID,
        storageBucket: import.meta.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
        messagingSenderId: import.meta.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
        appId: import.meta.env.REACT_APP_FIREBASE_APP_ID,
        measurementId: import.meta.env.REACT_APP_FIREBASE_MEASUREMENT_ID
    };
}

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth();


