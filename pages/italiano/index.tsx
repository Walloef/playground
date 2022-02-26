import { useAuth } from "../../src/providers/AuthUserContext";
import { db } from "../../src/firebase/client";
import { addDoc, collection } from "firebase/firestore";
import { useState } from "react";

export default function Italiano() {
  const [word, setWord] = useState("");
  const { authUser } = useAuth();

  const writeToFirestore = async () => {
    addDoc(collection(db, "books"), {
      text: "hej",
    })
      .then((docRef) => {
        console.log(docRef);
      })
      .catch((error) => console.log(error));
  };

  return (
    <div>
      {word}
      <button onClick={writeToFirestore}>hejhej</button>
      {authUser && (
        <form onSubmit={writeToFirestore}>
          <input type="text" onChange={(e) => setWord(e.target.value)} />
          <button type="button">db</button>
        </form>
      )}
      hi
    </div>
  );
}
