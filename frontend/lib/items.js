// Converte documentos da coleção `items` no mesmo formato da API da Semana 5:
// { "status": "ok", "items": [...] }
export function toHealthPayload(docs) {
  const items = [...docs]
    .sort((a, b) => (a.ordem ?? 0) - (b.ordem ?? 0))
    .map((doc) => doc.nome)
    .filter((nome) => typeof nome === "string" && nome.length > 0);

  return {
    status: "ok",
    database: "firestore",
    items,
  };
}
