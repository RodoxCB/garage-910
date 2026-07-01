#!/usr/bin/env bash
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT"

echo "==> Garage 910 — Setup de deploy"
echo ""

# 1. Verificar autenticação
if ! gh auth status &>/dev/null; then
  echo "GitHub CLI não autenticado. Iniciando login..."
  gh auth login --hostname github.com --git-protocol ssh --web
fi

if ! vercel whoami &>/dev/null; then
  echo "Vercel CLI não autenticado. Iniciando login..."
  vercel login
fi

echo ""
echo "==> Criando repositório no GitHub (se ainda não existir)..."
if ! gh repo view garage-910 &>/dev/null 2>&1; then
  gh repo create garage-910 --public --source=. --remote=origin --description "Site Garage 910 — Reparação Automotiva"
else
  echo "Repositório garage-910 já existe."
  git remote get-url origin &>/dev/null || git remote add origin "git@github.com:$(gh api user -q .login)/garage-910.git"
fi

echo ""
echo "==> Enviando branches main e staging..."
git push -u origin main
git push -u origin staging

echo ""
echo "==> Conectando projeto na Vercel..."
if [ ! -d .vercel ]; then
  vercel link --yes
fi

echo ""
echo "==> Conectando Git na Vercel (deploy automático)..."
vercel git connect --yes 2>/dev/null || echo "Git já conectado ou conecte manualmente no dashboard."

echo ""
echo "==> Deploy de preview (staging)..."
git checkout staging
vercel --yes

echo ""
echo "==> Deploy de produção (main)..."
git checkout main
vercel --prod --yes

echo ""
echo "✅ Setup concluído!"
echo ""
echo "Próximos passos no dashboard Vercel:"
echo "  1. Settings → Git → Production Branch: main"
echo "  2. Settings → Environment Variables:"
echo "     - ADMIN_PASSWORD (Production + Preview)"
echo "     - BLOB_READ_WRITE_TOKEN (Production + Preview)"
echo "  3. Storage → Create Blob Store e vincular ao projeto"
echo ""
echo "URLs:"
vercel ls 2>/dev/null | head -5 || true
