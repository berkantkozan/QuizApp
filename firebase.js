import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  // Replace with your Firebase configuration
  apiKey: "AIzaSyDT9_BoW9Zb8NmGWxX-CnwsMD7V0xSkRUw",
  authDomain: "quizapp-cb2f3.firebaseapp.com",
  projectId: "quizapp-cb2f3",
  storageBucket: "quizapp-cb2f3.appspot.com",
  messagingSenderId: "1013777336833",
  appId: "1:1013777336833:web:c2daa35ce45ba73f268e00",
  measurementId: "G-2KTXN94EH7"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const auth = getAuth(firebaseApp);

export {
  firebaseApp,
  auth,
};
