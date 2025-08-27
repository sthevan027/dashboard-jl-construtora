### Dashboard JL Construtora

Dashboard corporativo para acompanhamento de KPIs das áreas de RH, Segurança e Obras.

- **Stack**: Vite + React 19, Tailwind CSS 4, Radix UI, Recharts, React Router (planejado), lucide-react, zod, react-hook-form, date-fns
- **Gerenciador de pacotes**: pnpm

### Status e andamento
- [x] Planejamento do MVP-Final (`docs/planejamento.md`)
- [x] Documentação base (arquitetura, execução, relatórios, configs, auth, design)
- [x] UI base com `Sidebar` e módulos iniciais (Dashboard, RH, Segurança, Obras)
- [ ] Relatórios com filtros (período/área), KPIs e séries históricas
- [ ] Exportação CSV e PDF
- [ ] Configurações persistentes (metas/limiares/identidade)
- [ ] Autenticação (login simples + rotas protegidas)
- [ ] Deploy (Vercel/Netlify) e README final

### Como rodar
```bash
pnpm i
pnpm dev
```
Abrirá em `http://localhost:5173`.

Build e preview:
```bash
pnpm build
pnpm preview
```

Lint:
```bash
pnpm lint
```

### Estrutura (resumo)
- `src/App.jsx`: layout principal e controle da seção ativa
- `src/components/Sidebar.jsx`: navegação lateral
- `src/components/*Module.jsx`: módulos de áreas
- `src/components/ui/*`: componentes UI
- `src/data/mockData.js`: dados mock

Estrutura proposta para o MVP (ver detalhes em `docs/arquitetura.md`):
- `src/services/`: `kpiService`, `reportService`, `exportService`, `authService`
- `src/data/`: por domínios (`rh/`, `seguranca/`, `obras/`, `kpis/`)
- Rotas com `react-router-dom` incluindo `/login` e guard

### Funcionalidades do MVP
- Relatórios com filtros por período (mês/trimestre/ano) e área (RH/Segurança/Obras)
- KPIs agregados e comparação vs meta, com badges de alerta
- Exportação CSV e PDF
- Configurações com persistência em `localStorage` (metas, limiares, identidade)
- Autenticação simples e proteção de rotas

### Documentação
- Planejamento: `docs/planejamento.md`
- Arquitetura: `docs/arquitetura.md`
- Execução/Build/Deploy: `docs/guia-execucao.md`
- Relatórios: `docs/relatorios.md`
- Configurações: `docs/configuracoes.md`
- Autenticação: `docs/autenticacao.md`
- Design UI/UX: `docs/design-ui-ux.md`
- Bibliotecas e API de serviços: `docs/documentacao/`

### Deploy (previsto)
- Vercel ou Netlify
- Comando de build: `pnpm build`
- Diretório de saída: `dist`
