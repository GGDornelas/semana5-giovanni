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

## Desenvolvimento com Docker Compose

```bash
cp .env.example .env          # ajuste as credenciais locais
docker compose up --build
```

- Frontend: http://localhost:3000 (hot reload)
- Backend:  http://localhost:8000/api/health/ (auto-reload do runserver)
- O backend só inicia após o healthcheck do PostgreSQL (`pg_isready`).

## Imagens de produção

```bash
docker build -f backend/Dockerfile.prod  -t semana5-backend-prod  ./backend
docker build -f frontend/Dockerfile.prod -t semana5-frontend-prod ./frontend
```

- Backend: `python:3.12-alpine`, Gunicorn, usuário `django` (sem root, sem pip, sem testes).
- Frontend: multi-stage `deps` → `builder` → `runner`, `output: 'standalone'`,
  usuário `nextjs`, imagem final < 150 MB.

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
