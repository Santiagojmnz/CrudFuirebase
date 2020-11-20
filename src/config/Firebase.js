import firebase from 'firebase/app';
import 'firebase/firestore'
import 'firebase/storage'

const firebaseConfig = {
    apiKey: "AIzaSyAkkwKB_GegdgoV7EBrLJyNyfIrGGiZPr0",
    authDomain: "crud-firebase-1b9c0.firebaseapp.com",
    databaseURL: "https://crud-firebase-1b9c0.firebaseio.com",
    projectId: "crud-firebase-1b9c0",
    storageBucket: "crud-firebase-1b9c0.appspot.com",
    messagingSenderId: "749581221499",
    appId: "1:749581221499:web:59af91c567d7d06cb4acde"
};

const fb = firebase.initializeApp(firebaseConfig);
export const db = fb.firestore();
export const storage = fb.storage();