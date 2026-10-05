import { describe, expect, it } from "vitest";

import { toHealthPayload } from "./items";

describe("toHealthPayload", () => {
  it("devolve o mesmo formato da API da Semana 5, ordenado por `ordem`", () => {
    const payload = toHealthPayload([
      { nome: "Publicar no GHCR", ordem: 3 },
      { nome: "Configurar Docker", ordem: 1 },
      { nome: "Automatizar CI", ordem: 2 },
    ]);

    expect(payload).toEqual({
      status: "ok",
      database: "firestore",
      items: ["Configurar Docker", "Automatizar CI", "Publicar no GHCR"],
    });
  });

  it("ignora documentos sem nome", () => {
    expect(toHealthPayload([{ ordem: 1 }, { nome: "", ordem: 2 }]).items).toEqual([]);
  });
});
