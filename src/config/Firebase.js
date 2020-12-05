import firebase from 'firebase/app';
import 'firebase/firestore'
import 'firebase/storage'
import 'firebase/auth'

const firebaseConfig = {
    apiKey: "AIzaSyAIXdL4VTY6hjyXKGlNC3LVSfMMH-wkQ5M",
    authDomain: "recetario-a64d4.firebaseapp.com",
    databaseURL: "https://recetario-a64d4.firebaseio.com",
    projectId: "recetario-a64d4",
    storageBucket: "recetario-a64d4.appspot.com",
    messagingSenderId: "41753101055",
    appId: "1:41753101055:web:c02c222b84c739eb4f42ca"
};

const fb = firebase.initializeApp(firebaseConfig);
export const db = fb.firestore();
export const storage = fb.storage();
export const auth = fb.auth();