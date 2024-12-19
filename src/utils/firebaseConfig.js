import { initializeApp } from "firebase/app"
import { getFirestore } from "firebase/firestore"

// Optionally import the services that you want to use
// import {...} from "firebase/auth";
// import {...} from "firebase/database";
// import {...} from "firebase/functions";
// import {...} from "firebase/storage";

// Initialize Firebase
const firebaseConfig = {
   apiKey: "AIzaSyBkQFmcyLf2_GZSa71twPsclzpxkra-8MA",
   authDomain: "wordle-ed8fe.firebaseapp.com",
   projectId: "wordle-ed8fe",
   databaseURL: "https://wordle-ed8fe.firebaseio.com",
   storageBucket: "wordle-ed8fe.firebasestorage.app",
   messagingSenderId: "389552907914",
   appId: "1:389552907914:web:d23e00ffbb4c62ff43ef73",
}

const app = initializeApp(firebaseConfig)
export const FIREBASE_DB = getFirestore(app)
