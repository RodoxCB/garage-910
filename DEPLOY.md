# Deploy na Vercel

## Branches e ambientes

| Branch | Ambiente Vercel | URL |
|--------|-----------------|-----|
| `main` | **Production** | domínio principal (ex: `garage-910.vercel.app`) |
| `staging` | **Preview** | URL única por deploy (ex: `garage-910-git-staging-*.vercel.app`) |

Cada push em `main` ou `staging` dispara:
1. **GitHub Actions** — lint + build (`.github/workflows/ci.yml`)
2. **Vercel** — deploy automático via integração GitHub

## Setup inicial (uma vez)

### 1. Autenticar CLIs

```bash
gh auth login
vercel login
```

### 2. Criar repositório e enviar código

```bash
gh repo create garage-910 --public --source=. --remote=origin --push
git checkout -b staging
git push -u origin staging
git checkout main
```

### 3. Conectar Vercel ao GitHub

```bash
vercel link
vercel git connect
```

No dashboard Vercel (**Project Settings → Git**):
- **Production Branch:** `main`
- Preview deployments: habilitado para todas as branches (inclui `staging`)

### 4. Variáveis de ambiente (Vercel Dashboard)

Configure em **Settings → Environment Variables** para Production e Preview:

| Variável | Production | Preview |
|----------|------------|---------|
| `ADMIN_PASSWORD` | ✅ | ✅ |
| `BLOB_READ_WRITE_TOKEN` | ✅ | ✅ |

Crie o Blob Store em **Storage → Create → Blob** e vincule ao projeto.

## Deploy manual (opcional)

```bash
# Preview
vercel

# Production
vercel --prod
```

## Domínio próprio

Após validar em preview/staging, adicione o domínio em **Project Settings → Domains** (apenas no ambiente Production).
