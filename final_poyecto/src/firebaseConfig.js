
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from 'firebase/firestore/lite';

const firebaseConfig = {
    apiKey: "AIzaSyABZZTx4ygY-3-VxQf2etDhzAza-6ZVzxA",
    authDomain: "fir-flutter-codelabs-89db0.firebaseapp.com",
    projectId: "fir-flutter-codelabs-89db0",
    storageBucket: "fir-flutter-codelabs-89db0.appspot.com",
    messagingSenderId: "665604067753",
    appId: "1:665604067753:web:0d4f7e92cc85dd066e74b8"
};

initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore();

export {auth, db};