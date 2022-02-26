import { collection, getDoc, getDocs, getFirestore } from "firebase/firestore";
import { getApps } from "firebase/app";

export default function Home() {
  if (getApps().length > 0) {
    // const db = getFirestore();
    // const colRef = collection(db, "books");
    // getDocs(colRef).then((snap) => {
    //   console.log(snap.docs);
    // });
  }
  return <div>hi</div>;
}
