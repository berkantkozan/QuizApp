import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  // Replace with your Firebase configuration
  apiKey: "AIzaSyDT9_BoW9Zb8NmGWxX-CnwsMD7V0xSkRUw",
  authDomain: "quizapp-cb2f3.firebaseapp.com",
  projectId: "quizapp-cb2f3",
  storageBucket: "quizapp-cb2f3.appspot.com",
  messagingSenderId: "1013777336833",
  appId: "1:1013777336833:web:c2daa35ce45ba73f268e00",
  measurementId: "G-2KTXN94EH7",
  databaseURL: "https://quizapp-cb2f3-default-rtdb.firebaseio.com"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const auth = getAuth(firebaseApp);
const database = getFirestore(firebaseApp);

export {
  firebaseApp,
  auth,
  database,
};
