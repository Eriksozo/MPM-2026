# MPM 2026 — A Nova Linguagem da Pentatônica

Landing page gamificada do treinamento "A Nova Linguagem da Pentatônica" por Prof. Joab Pereira.

## Tech Stack
- Next.js 14 (App Router, Static Export)
- React 18
- TypeScript
- CSS puro com Custom Properties
- Deploy: Cloudflare Pages

## Setup local
```bash
npm install
npm run dev
```

## Deploy no Cloudflare Pages

### Configuração no Dashboard do Cloudflare Pages:
1. Conecte o repositório no Cloudflare Pages
2. **Build command:** `npm run build`
3. **Output directory:** `out`
4. **Framework preset:** Next.js (Static HTML Export)
5. Deploy automático a cada push na main

### Ou via CLI:
```bash
npm run build
npx wrangler pages deploy out
```
