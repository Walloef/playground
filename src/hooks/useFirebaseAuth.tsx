import { useState, useEffect } from "react";
// import clientFirebase from "../firebase/client";
import {
  getAuth,
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";

export default function useFirebaseAuth() {
  const auth = getAuth();
  const [authUser, setAuthUser] = useState<{
    uid: string;
    email: string;
  } | null>(null);
  const [loading, setLoading] = useState(true);

  const clear = () => {
    setAuthUser(null);
    setLoading(true);
  };

  const signIn = (email: string, password: string) =>
    signInWithEmailAndPassword(auth, email, password);

  const createUser = (email: string, password: string) =>
    createUserWithEmailAndPassword(auth, email, password);

  const logOut = () => signOut(auth).then(clear);

  // listen for Firebase state change
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const { uid, email } = user;
        setLoading(true);
        setAuthUser({ uid, email });
        setLoading(false);
      } else {
        clear();
      }
    });
  }, [auth]);

  return {
    authUser,
    loading,
    signIn,
    createUser,
    logOut,
  };
}
