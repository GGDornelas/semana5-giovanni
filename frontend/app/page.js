"use client";

import { useEffect, useState } from "react";

import { fetchHealth } from "@/lib/api";
// Falha controlada (build): módulo inexistente
import Inexistente from "@/lib/modulo-inexistente";

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
      <Inexistente />
      <p className={styles.subtitle}>Django + Next.js + PostgreSQL + Nginx</p>

      {error && <p className={styles.error}>Erro ao consultar a API: {error}</p>}

      {!health && !error && <p>Carregando dados do backend...</p>}

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
