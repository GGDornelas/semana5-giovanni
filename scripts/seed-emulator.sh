#!/bin/sh
# Cadastra os 3 itens da Semana 5 no Firestore Emulator.
# O cabeçalho "Authorization: Bearer owner" é o acesso administrativo do emulador
# (equivale a criar os documentos pela interface em localhost:4000) e ignora as regras.
#
# Uso (gera/atualiza a pasta de dados semente firebase-seed/):
#   firebase emulators:exec --only firestore --export-on-exit=./firebase-seed "sh scripts/seed-emulator.sh"
set -e

PROJECT_ID="${PROJECT_ID:-semana6-giovanni}"
HOST="${FIRESTORE_EMULATOR_HOST:-127.0.0.1:8080}"
BASE="http://$HOST/v1/projects/$PROJECT_ID/databases/(default)/documents/items"

criar() {
  curl -sf -X PATCH "$BASE/$1" \
    -H "Authorization: Bearer owner" \
    -H "Content-Type: application/json" \
    -d "{\"fields\": {\"nome\": {\"stringValue\": \"$2\"}, \"ordem\": {\"integerValue\": \"$3\"}}}" \
    >/dev/null
  echo "items/$1 -> $2"
}

criar item-1 "Configurar Docker" 1
criar item-2 "Automatizar CI" 2
criar item-3 "Publicar no GHCR" 3
