# Deploy na Vercel

## URLs ativas

| Ambiente | URL |
|----------|-----|
| **Production** (`main`) | https://garage-910.vercel.app |
| **Preview** (`staging`) | https://garage-910-git-staging-vdveiculos.vercel.app *(ou URL por deploy)* |
| **GitHub** | https://github.com/RodoxCB/garage-910 |
| **Vercel Dashboard** | https://vercel.com/vdveiculos/garage-910 |

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

## CI (GitHub Actions)

O arquivo `.github/workflows/ci.yml` está pronto localmente. Para publicá-lo no GitHub:

```bash
gh auth refresh -h github.com -s workflow
git add .github/workflows/ci.yml
git commit -m "Add CI workflow for main and staging"
git push origin main
```

Sem o scope `workflow`, o GitHub bloqueia push de arquivos em `.github/workflows/`. Os deploys na Vercel funcionam independentemente via integração Git.

Após validar em preview/staging, adicione o domínio em **Project Settings → Domains** (apenas no ambiente Production).
