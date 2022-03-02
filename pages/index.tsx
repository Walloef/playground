import { doc, setDoc } from "firebase/firestore";
import { db } from "../src/firebase/client";
import { useAuth } from "../src/providers/AuthUserContext";

export default function Home() {
  const { authUser, logOut } = useAuth();

  const docData = {
    stringExample: "Hello world!",
    booleanExample: true,
    numberExample: 3.14159265,
    arrayExample: [5, true, "hello"],
    nullExample: null,
    objectExample: {
      a: 5,
      b: {
        nested: "foo",
      },
    },
  };

  // const test = async () => {
  //   console.log("hej");
  //   // await setDoc(doc(db, "data", "one"), docData);
  // };
  const test = async () => {
    await setDoc(doc(db, "data", "one"), docData);
  };
  console.log(authUser);
  return (
    <div>
      {authUser && (
        <>
          <button type="button" onClick={logOut}>
            Sign out
          </button>
          <button type="button" onClick={test}>
            DB TEST
          </button>
        </>
      )}
      hi
    </div>
  );
}
