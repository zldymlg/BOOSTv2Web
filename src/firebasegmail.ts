import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAWS83pmNe24QVHEzic5NVdEcp6ALMAxAw",
  authDomain: "boost-web-7bdee.firebaseapp.com",
  projectId: "boost-web-7bdee",
  storageBucket: "boost-web-7bdee.appspot.com",
  messagingSenderId: "505760140190",
  appId: "1:505760140190:web:4ef77d785574cef8e4648f",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const firestore = getFirestore(app);
const provider = new GoogleAuthProvider(); 

export { auth, firestore, provider, signInWithPopup, firebaseConfig };