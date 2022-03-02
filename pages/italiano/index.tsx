import { useAuth } from "../../src/providers/AuthUserContext";
import { db } from "../../src/firebase/client";
import { doc, setDoc } from "firebase/firestore";
import { FormEvent, useState } from "react";

const verbConjugations = ["jag", "du", "vi", "han", "hon", "dom"];

const UI_STATES = {
  ADD_SWEDISH_VERB: 1,
  OPEN_TRANSLATE: 2,
  ADD_TRANSLATE_URI: 3,
};

export default function Italiano() {
  const [word, setWord] = useState("");
  const [googleUri, setGoogleUri] = useState("");
  const [viewGoogleUri, setViewGoogleUri] = useState(false);
  const [newGoogleUri, setNewGoogleUri] = useState("");
  const [currentUiState, setCurrentUiState] = useState(
    UI_STATES.ADD_SWEDISH_VERB
  );

  const { authUser } = useAuth();

  const getGoogleUri = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let verbs = "";
    verbConjugations.forEach((verb) => {
      verbs = ` ${verbs} ${verb} ${word},`;
    });

    const encodedUri = encodeURI(
      `https://translate.google.com/?sl=sv&tl=it&text=${verbs
        .trimStart()
        .trimEnd()}&op=translate`
    );
    setGoogleUri(encodedUri);
  };

  const writeToFirestore = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newUri = new URL(newGoogleUri).search.split("text=")[1].split("&")[0];
    const verbs: string[] = [];
    decodeURIComponent(newUri)
      .split(",")
      .forEach((verb) => {
        if (verb) {
          verbs.push(verb.trim());
        }
      });
    await setDoc(doc(db, "verbs", word), {
      verbs,
    })
      .then((res) => {
        console.log(res);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div>
      {authUser && (
        <>
          <form
            onSubmit={(e) => {
              getGoogleUri(e);
              setCurrentUiState(2);
            }}
          >
            <fieldset disabled={currentUiState !== 1}>
              <label htmlFor="verb"></label>
              <input
                id="verb"
                type="text"
                onChange={(e) => setWord(e.target.value)}
              />
              <button type="submit">Open google translate</button>
            </fieldset>
          </form>
          <div className={currentUiState === 2 && "active"}>
            <a
              href={googleUri}
              target="_blank"
              rel="noreferrer"
              onClick={() => {
                setViewGoogleUri(true);
                setCurrentUiState(3);
              }}
            >
              Google translate
            </a>
          </div>
          <form onSubmit={(e) => writeToFirestore(e)}>
            <fieldset disabled={currentUiState !== 3}>
              <input
                type="text"
                onChange={(e) => setNewGoogleUri(e.target.value)}
              />
              <button type="submit">add Google translate uri</button>
            </fieldset>
          </form>
        </>
      )}
    </div>
  );
}
