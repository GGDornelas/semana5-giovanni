# semana5-giovanni — Do Dev ao Deploy

Aplicação desacoplada **Django + Next.js + PostgreSQL + Nginx**, containerizada para
desenvolvimento e produção, com pipeline de CI/CD no GitHub Actions e publicação de
imagens no GitHub Container Registry (GHCR).

## Estrutura

```
backend/    Django (projeto `config`, app `api` com GET /api/health/)
frontend/   Next.js (App Router, página em app/page.js)
nginx/      Proxy reverso + SSL (produção)
```

## Rodando sem Docker (referência)

```bash
# backend
python -m venv .venv && source .venv/bin/activate
pip install -r backend/requirements-dev.txt
cd backend && python manage.py runserver

# frontend (outro terminal)
cd frontend && npm install && npm run dev
```

A página em http://localhost:3000 consome `GET /api/health/` do backend.
