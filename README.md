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

## Stack de produção (Nginx + SSL)

```bash
sh nginx/generate-certs.sh                            # certificado autoassinado
docker compose -f docker-compose-prod.yml up -d --build
```

- Apenas o Nginx publica portas (80 e 443); HTTP redireciona (301) para HTTPS.
- `/api/`, `/admin/` e `/static/` → `backend:8000`; `/` → `frontend:3000`.
- backend, frontend e db usam somente `expose`; o banco fica numa rede `internal`.

## CI/CD e imagens publicadas (GHCR)

Workflow: [`.github/workflows/ci.yml`](.github/workflows/ci.yml)

```
lint-backend  -> build-backend  -> test-backend  -> deploy-backend
lint-frontend -> build-frontend -> test-frontend -> deploy-frontend
```

A cada push no `main` com as trilhas verdes, as imagens de produção são publicadas:

```bash
docker pull ghcr.io/ggdornelas/semana5-giovanni-backend:latest
docker pull ghcr.io/ggdornelas/semana5-giovanni-frontend:latest
# ou fixando a versão pelo commit: ...:<sha-do-commit>
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
