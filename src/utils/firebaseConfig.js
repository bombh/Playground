import { initializeApp } from "firebase/app"
import { getFirestore } from "firebase/firestore"

// Optionally import the services that you want to use
// import {...} from "firebase/auth";
// import {...} from "firebase/database";
// import {...} from "firebase/functions";
// import {...} from "firebase/storage";

// Initialize Firebase
const firebaseConfig = {
   apiKey: process.env.EXPO_PUBLIC_FIREBASE_API_KEY,
   authDomain: process.env.EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN,
   projectId: process.env.EXPO_PUBLIC_FIREBASE_PROJECT_ID,
   databaseURL: process.env.EXPO_PUBLIC_FIREBASE_DATABASE_URL,
   storageBucket: process.env.EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET,
   messagingSenderId: process.env.EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
   appId: process.env.EXPO_PUBLIC_FIREBASE_APP_ID,
}

const app = initializeApp(firebaseConfig)
export const FIREBASE_DB = getFirestore(app)
