import { getApps, initializeApp } from "firebase/app";
import {
  addDoc,
  collection,
  connectFirestoreEmulator,
  getDocs,
  getFirestore,
} from "firebase/firestore";

import { toHealthPayload } from "./items";

// A config web do Firebase é pública por design; a proteção dos dados está nas regras.
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

const useEmulator = process.env.NEXT_PUBLIC_USE_EMULATOR === "true";
const emulatorHost = process.env.NEXT_PUBLIC_FIRESTORE_EMULATOR_HOST || "127.0.0.1:8080";

let db;

function getDb() {
  if (db) return db;

  const app = getApps()[0] ?? initializeApp(firebaseConfig);
  db = getFirestore(app);

  if (useEmulator) {
    const [host, port] = emulatorHost.split(":");
    connectFirestoreEmulator(db, host, Number(port));
  }

  return db;
}

export async function fetchItemsFromFirestore() {
  const snapshot = await getDocs(collection(getDb(), "items"));
  return toHealthPayload(snapshot.docs.map((doc) => doc.data()));
}

// Usado para demonstrar que as regras negam escrita vinda do navegador.
export async function tryWriteItem() {
  try {
    await addDoc(collection(getDb(), "items"), { nome: "Tentativa do navegador", ordem: 99 });
    return { allowed: true };
  } catch (err) {
    return { allowed: false, code: err.code ?? err.message };
  }
}
