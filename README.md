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

1. Crie um repositório no GitHub e faça push do código
2. Importe o projeto em [vercel.com/new](https://vercel.com/new)
3. Configure as variáveis de ambiente (`ADMIN_PASSWORD`, `BLOB_READ_WRITE_TOKEN`)
4. Crie um **Blob Store** em Storage e vincule ao projeto
5. Deploy automático a cada push na branch `main`

### Domínio próprio

Após o deploy, configure o domínio em **Vercel > Project Settings > Domains**.

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

GitHub Actions roda lint e build em cada push/PR na branch `main`.
