import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "PUT_API_KEY_HERE",
  authDomain: "PUT_AUTH_DOMAIN_HERE",
  projectId: "PUT_PROJECT_ID_HERE",
  storageBucket: "PUT_STORAGE_BUCKET_HERE",
  messagingSenderId: "PUT_MESSAGING_SENDER_ID_HERE",
  appId: "PUT_APP_ID_HERE"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);