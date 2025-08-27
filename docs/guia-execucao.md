### Guia de Execução, Build e Deploy

#### Requisitos
- Node LTS (>= 18)
- pnpm (o projeto usa pnpm)

#### Instalação
```bash
pnpm i
```

#### Desenvolvimento
```bash
pnpm dev
```
Abre em `http://localhost:5173` (padrão Vite).

#### Lint
```bash
pnpm lint
```

#### Build de produção
```bash
pnpm build
```
Saída em `dist/`.

#### Preview do build
```bash
pnpm preview
```

#### Deploy (Vercel/Netlify)
- Suba a pasta do repositório e a plataforma detecta Vite automaticamente.
- Comando de build: `pnpm build`
- Diretório de saída: `dist`


