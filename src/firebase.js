import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBJGOdkHV2OvASOj5c5VJkx6nS0AYZgg3E",
  authDomain: "blogs-dfe92.firebaseapp.com",
  projectId: "blogs-dfe92",
  storageBucket: "blogs-dfe92.appspot.com",
  messagingSenderId: "29696735085",
  appId: "1:29696735085:web:5c2b36249ff79a7cad4c64",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);

export { db, storage };
