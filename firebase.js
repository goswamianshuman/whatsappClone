import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyB5Vx3NBs5TWv4zH3VZ_FlJUbJIyIjACqU",
  authDomain: "whatsapp-2-ee9aa.firebaseapp.com",
  projectId: "whatsapp-2-ee9aa",
  storageBucket: "whatsapp-2-ee9aa.appspot.com",
  messagingSenderId: "270243550877",
  appId: "1:270243550877:web:6e8cde50f647efa0dfe674",
};

const app = !firebase.apps.length
  ? firebase.initializeApp(firebaseConfig)
  : firebase.app();

const db = app.firestore();
const auth = app.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export { db, auth, provider };
