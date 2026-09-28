import { describe, expect, it, vi } from "vitest";

import { HEALTH_ENDPOINT, fetchHealth, parseHealth } from "./api";

describe("parseHealth", () => {
  it("normaliza o payload da API", () => {
    const data = parseHealth({
      status: "ok",
      database: "ok",
      items: ["Configurar Docker", "Automatizar CI", "Publicar no GHCR"],
    });

    expect(data.status).toBe("ok");
    // Falha controlada (teste): quantidade esperada incorreta
    expect(data.items).toHaveLength(4);
  });

  it("usa lista vazia quando items não é array", () => {
    expect(parseHealth({ status: "ok" }).items).toEqual([]);
  });

  it("rejeita payload inválido", () => {
    expect(() => parseHealth(null)).toThrow("Resposta inválida da API");
  });
});

describe("fetchHealth", () => {
  it("chama o endpoint relativo e devolve os dados", async () => {
    const fetcher = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ status: "ok", database: "ok", items: ["A"] }),
    });

    const data = await fetchHealth(fetcher);

    expect(fetcher).toHaveBeenCalledWith(HEALTH_ENDPOINT, { cache: "no-store" });
    expect(data.items).toEqual(["A"]);
  });

  it("lança erro quando a API falha", async () => {
    const fetcher = vi.fn().mockResolvedValue({ ok: false, status: 502 });

    await expect(fetchHealth(fetcher)).rejects.toThrow("status 502");
  });
});
