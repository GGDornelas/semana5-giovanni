"use client";

import { useEffect, useState } from "react";

import { DATA_SOURCE, loadData, tryWrite } from "@/lib/data-source";

import styles from "./page.module.css";

// Versão B (canal de pré-visualização do Hosting): título, cor e ordem dos itens diferentes.
const isVersionB = process.env.NEXT_PUBLIC_VARIANT === "b";

export default function Home() {
  const [health, setHealth] = useState(null);
  const [error, setError] = useState(null);
  const [writeResult, setWriteResult] = useState(null);

  useEffect(() => {
    loadData()
      .then(setHealth)
      .catch((err) => setError(err.message));
  }, []);

  async function handleTryWrite() {
    setWriteResult("Tentando gravar...");
    const result = await tryWrite();
    setWriteResult(
      result.allowed ? "Escrita permitida (as regras deveriam negar!)" : `Bloqueado: ${result.code}`,
    );
  }

  return (
    <main className={`${styles.main} ${isVersionB ? styles.versionB : ""}`}>
      <h1>{isVersionB ? "Versão B · Do Container à Nuvem" : "Semana 5 · Do Dev ao Deploy"}</h1>
      <p className={styles.subtitle}>
        {isVersionB
          ? "Next.js no Firebase Hosting + Cloud Firestore"
          : "Django + Next.js + PostgreSQL + Nginx"}
      </p>

      {error && (
        <section className={`${styles.card} ${styles.unavailable}`} role="status">
          <p>
            <strong>Dados indisponíveis no momento.</strong>
          </p>
          <p>A página está no ar, mas a fonte de dados não respondeu. Tente novamente mais tarde.</p>
          <p className={styles.detail}>Detalhe técnico: {error}</p>
        </section>
      )}

      {!health && !error && <p>Carregando dados...</p>}

      {health && (
        <section className={styles.card}>
          <p>
            Status da API: <strong>{health.status}</strong>
          </p>
          <p>
            Banco de dados: <strong>{health.database}</strong>
          </p>
          <ul>
            {(isVersionB ? [...health.items].reverse() : health.items).map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>
      )}

      <p className={styles.detail}>Fonte de dados: {DATA_SOURCE}</p>

      {DATA_SOURCE === "firestore" && (
        <section className={styles.writeTest}>
          <button type="button" onClick={handleTryWrite}>
            Testar escrita no Firestore
          </button>
          {writeResult && <p id="write-result">{writeResult}</p>}
        </section>
      )}
    </main>
  );
}
