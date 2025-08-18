import { doc, setDoc, getDoc, serverTimestamp } from "firebase/firestore";
import { db } from "@/firebase";

let serverOffset = 0;

export const initServerOffset = async () => {
  const ref = doc(db, "meta", "timeCheck");
  await setDoc(ref, { ts: serverTimestamp() });
  const snap = await getDoc(ref);

  if (snap.exists()) {
    const serverNow = snap.data().ts.toMillis();
    const localNow = Date.now();
    serverOffset = serverNow - localNow;
  }
};

export const getServerNow = () => Date.now() + serverOffset;
