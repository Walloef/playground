import { UserCredential } from "firebase/auth";
import { createContext, useContext } from "react";
import useFirebaseAuth from "../hooks/useFirebaseAuth";

type AuthContextInterface = {
  authUser: {
    uid: string;
    email: string;
  } | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<UserCredential>;
  createUser: (email: string, password: string) => Promise<UserCredential>;
  logOut: () => Promise<void>;
};

const authUserContext = createContext<AuthContextInterface | null>(null);

export function AuthUserProvider({ children }: { children: JSX.Element }) {
  const auth: AuthContextInterface = useFirebaseAuth();
  return (
    <authUserContext.Provider value={auth}>{children}</authUserContext.Provider>
  );
}
// custom hook to use the authUserContext and access authUser and loading
export const useAuth = () => useContext(authUserContext);
