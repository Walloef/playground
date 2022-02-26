import { useAuth } from "../../src/providers/AuthUserContext";
import { db } from "../../src/firebase/client";
import { addDoc, collection } from "firebase/firestore";
import { FormEvent, useState } from "react";
import { parseUrl } from "next/dist/shared/lib/router/utils/parse-url";

const verbConjugations = ["jag", "du", "vi", "han", "hon", "dom"];

const url =
  "https://translate.google.com/?sl=sv&tl=it&text=Jag%20%C3%A4ter%2C%20du%20%C3%A4ter%2C%20vi%20%C3%A4ter%2C%20de%20%C3%A4ter%2C%20hon%20%C3%A4ter%2C%20han%20%C3%A4ter&op=translate";

export default function Italiano() {
  const [word, setWord] = useState("");
  const [googleUri, setGoogleUri] = useState("");
  const [viewGoogleUri, setViewGoogleUri] = useState(false);
  const [newGoogleUri, setNewGoogleUri] = useState("");

  const { authUser } = useAuth();

  const getGoogleUri = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let verbs = "";
    verbConjugations.forEach((verb) => {
      console.log(verb);
      verbs = ` ${verbs} ${verb} ${word},`;
    });

    const encodedUri = encodeURI(
      `https://translate.google.com/?sl=sv&tl=it&text=${verbs.trimStart()}&op=translate`
    );
    setGoogleUri(encodedUri);
    // console.log(googleUri);
  };

  const writeToFirestore = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newUri = new URL(newGoogleUri).search.split("text=")[1].split("&")[0];
    // console.log(decodeURIComponent(newGoogleUri));

    decodeURIComponent(newUri)
      .split(",")
      .map((verb) => {
        if (verb.trimStart()) {
          // console.log(verb.trimStart());
          const key = verb.trimStart().split(" ")[0].trim();
          const value = verb.trimStart().split(" ")[1].trim();
          console.log(key, value);
          addDoc(collection(db, "verbs", word), {
            key: value,
          });
          // addDoc(collection(db, "verbs"), {
          //   text: "hej",
          //   verb.trimStart(): "hej"
          // })
          //   .then((docRef) => {
          //     console.log(docRef);
          //   })
          //   .catch((error) => console.log(error));
        }
      });

    console.log(newGoogleUri);

    return;
    addDoc(collection(db, "verbs"), {
      text: "hej",
    })
      .then((docRef) => {
        console.log(docRef);
      })
      .catch((error) => console.log(error));
  };

  return (
    <div>
      {googleUri && (
        <a
          href={googleUri}
          target="_blank"
          rel="noreferrer"
          onClick={() => setViewGoogleUri(true)}
        >
          Google translate
        </a>
      )}
      {/* {googleUri} */}
      {/* <input type="text" />
      <button></button> */}
      {/* <button onClick={writeToFirestore}>hejhej</button> */}
      {authUser &&
        (!viewGoogleUri ? (
          <form onSubmit={(e) => getGoogleUri(e)}>
            <input type="text" onChange={(e) => setWord(e.target.value)} />
            <button type="submit">Open google translate</button>
          </form>
        ) : (
          <form onSubmit={(e) => writeToFirestore(e)}>
            <input
              type="text"
              onChange={(e) => setNewGoogleUri(e.target.value)}
            />
            <button type="submit">add Google translate uri</button>
          </form>
        ))}
      hi
    </div>
  );
}
