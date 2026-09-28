export const HEALTH_ENDPOINT = "/api/health/";

export function parseHealth(payload) {
  if (!payload || typeof payload !== "object") {
    throw new Error("Resposta inválida da API");
  }

  return {
    status: payload.status ?? "desconhecido",
    database: payload.database ?? "desconhecido",
    items: Array.isArray(payload.items) ? payload.items : [],
  };
}

export async function fetchHealth(fetcher = fetch) {
  const response = await fetcher(HEALTH_ENDPOINT, { cache: "no-store" });

  if (!response.ok) {
    throw new Error(`API respondeu com status ${response.status}`);
  }

  return parseHealth(await response.json());
}
