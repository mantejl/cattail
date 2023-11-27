import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getDatabase } from "firebase/database"; 


const firebaseConfig = {
  apiKey: "AIzaSyBNGQkcBleSwvqfQVXR1twp1g1Mk-a9Ab0",
  authDomain: "lavlab-b8a31.firebaseapp.com",
  projectId: "lavlab-b8a31",
  databaseURL: "https://lavlab-b8a31-default-rtdb.firebaseio.com/",
  storageBucket: "lavlab-b8a31.appspot.com",
  messagingSenderId: "245918998937",
  appId: "1:245918998937:web:23f00a467fcb5572bbb308",
  measurementId: "G-YJRCY9QWT3"
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app)
const db = getFirestore(app)
const stg = getStorage(app)
const database = getDatabase(app)

export { db, auth, stg, database }