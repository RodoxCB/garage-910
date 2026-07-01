# Garage 910 — Reparação Automotiva

Site institucional da **Garage 910**, oficina especializada em pintura, lanternagem e recuperação de parachoque.

## Stack

- **Next.js 16** (App Router)
- **React 19**
- **Tailwind CSS 4**
- **Vercel Blob** (armazenamento de conteúdo e fotos em produção)

## Desenvolvimento local

```bash
npm install
cp .env.example .env.local
# Edite .env.local com sua senha de admin
npm run dev
```

Acesse:
- Site: [http://localhost:3000](http://localhost:3000)
- Admin: [http://localhost:3000/admin](http://localhost:3000/admin)

## Painel Admin

O admin (`/admin`) permite:
- Editar textos do hero, sobre, serviços e contato
- Alterar número do WhatsApp e mensagem padrão
- Adicionar/remover fotos da galeria de trabalhos

### Variáveis de ambiente

| Variável | Descrição |
|---|---|
| `ADMIN_PASSWORD` | Senha de acesso ao painel admin |
| `BLOB_READ_WRITE_TOKEN` | Token do Vercel Blob (necessário em produção) |

> **Nota:** Sem o `BLOB_READ_WRITE_TOKEN`, alterações são salvas localmente em `data/content.json` (funciona em dev, mas não persiste na Vercel).

## Deploy na Vercel

**Production:** https://garage-910.vercel.app  
**Repositório:** https://github.com/RodoxCB/garage-910  
**Projeto Vercel:** `vdveiculos/garage-910`

| Branch | Ambiente | Deploy |
|--------|----------|--------|
| `main` | Production | Automático a cada push |
| `staging` | Preview | Automático a cada push |

O projeto está conectado ao GitHub na Vercel. Cada push dispara um novo deploy.

### Variáveis de ambiente (Vercel)

- `ADMIN_PASSWORD` — configurado em Production + Preview
- `BLOB_READ_WRITE_TOKEN` — criar Blob Store e adicionar manualmente

Veja [DEPLOY.md](./DEPLOY.md) para detalhes completos.

### Domínio próprio

Após validar em staging/preview, configure em **Vercel → Project Settings → Domains**.

## Logo

Substitua `public/logo.svg` pela logo oficial (ou adicione `public/logo.png` e atualize `components/Header.js`).

## Cores da marca

| Cor | Hex |
|---|---|
| Preto | `#0a0a0a` |
| Amarelo | `#f5c518` |
| Vermelho | `#e31837` |
| Branco | `#ffffff` |

## CI

GitHub Actions roda lint e build em cada push/PR nas branches `main` e `staging`.

> Para ativar o workflow, execute uma vez: `gh auth refresh -h github.com -s workflow` e faça push do arquivo `.github/workflows/ci.yml`.
