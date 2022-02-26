import { initializeApp, getApps, FirebaseApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const clientCredentials = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};
const apps = getApps();

if (!apps.length) {
  initializeApp(clientCredentials);
}

let firebaseApp: FirebaseApp;

if (!apps.length) {
  firebaseApp = initializeApp(clientCredentials);
} else {
  firebaseApp = apps[0];
}
const db = getFirestore(firebaseApp);
export { db };

////////////////

// import clientFirebase from "firebase/compat/app";
// import "firebase/compat/auth";

// const clientCredentials = {
//   apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
//   authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
//   projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
//   storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
//   messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
//   appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
// };
// // if a Firebase instance doesn't exist, create one
// if (!clientFirebase.apps.length) {
//   clientFirebase.initializeApp(clientCredentials);
// }

// export default clientFirebase;
