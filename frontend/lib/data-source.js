import { fetchHealth } from "./api";

// "api" (Django da Semana 5) ou "firestore" (Semana 6). Ambas devolvem o mesmo JSON.
export const DATA_SOURCE = process.env.NEXT_PUBLIC_DATA_SOURCE === "firestore" ? "firestore" : "api";

export async function loadData(source = DATA_SOURCE) {
  if (source === "firestore") {
    const { fetchItemsFromFirestore } = await import("./firestore");
    return fetchItemsFromFirestore();
  }
  return fetchHealth();
}

export async function tryWrite() {
  const { tryWriteItem } = await import("./firestore");
  return tryWriteItem();
}
