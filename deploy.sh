#!/usr/bin/env bash
# Deploy rápido: envia tudo pro GitHub e o Cloudflare Pages publica sozinho.
# Uso:  ./deploy.sh "mensagem opcional do commit"
set -e

cd "$(dirname "$0")"

MSG="${1:-update: $(date '+%d/%m/%Y %H:%M')}"

echo "→ Adicionando mudanças..."
git add -A

if git diff --cached --quiet; then
  echo "Nada novo para enviar. Site já está atualizado."
  exit 0
fi

echo "→ Commit: $MSG"
git commit -m "$MSG"

echo "→ Enviando para o GitHub..."
git push origin main

echo ""
echo "✅ Enviado! O Cloudflare Pages vai buildar e publicar em ~1-2 min."
