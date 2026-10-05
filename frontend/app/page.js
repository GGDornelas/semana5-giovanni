"use client";

import { useEffect, useState } from "react";

import { fetchHealth } from "@/lib/api";

import styles from "./page.module.css";

export default function Home() {
  const [health, setHealth] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchHealth()
      .then(setHealth)
      .catch((err) => setError(err.message));
  }, []);

  return (
    <main className={styles.main}>
      <h1>Semana 5 · Do Dev ao Deploy</h1>
      <p className={styles.subtitle}>Django + Next.js + PostgreSQL + Nginx</p>

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
            {health.items.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>
      )}
    </main>
  );
}
