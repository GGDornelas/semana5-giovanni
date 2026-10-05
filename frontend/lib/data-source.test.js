import { describe, expect, it, vi } from "vitest";

vi.mock("./api", () => ({
  fetchHealth: vi.fn().mockResolvedValue({ status: "ok", items: ["da API"] }),
}));

vi.mock("./firestore", () => ({
  fetchItemsFromFirestore: vi.fn().mockResolvedValue({ status: "ok", items: ["do Firestore"] }),
}));

import { loadData } from "./data-source";

describe("loadData", () => {
  it("usa a API do Django por padrão", async () => {
    expect((await loadData("api")).items).toEqual(["da API"]);
  });

  it("usa o Firestore quando a fonte é `firestore`", async () => {
    expect((await loadData("firestore")).items).toEqual(["do Firestore"]);
  });
});
