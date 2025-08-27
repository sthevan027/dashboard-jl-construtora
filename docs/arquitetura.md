### Arquitetura

Esta seção descreve a arquitetura mínima proposta e o estado atual.

#### Visão geral
- App SPA em React (Vite) com navegação interna por estado local (e migração planejada para `react-router-dom`).
- Camadas sugeridas no planejamento:
  - `components/` (reports, settings, auth, common)
  - `data/` (domínios: `rh/`, `seguranca/`, `obras/`, `kpis/`)
  - `services/` (orquestrações: `kpiService`, `reportService`, `exportService`, `authService`)
  - `pages/` (ou `routes/`)

#### Estado atual do código
- `src/App.jsx`: controla a seção ativa e renderiza `Sidebar` + conteúdo.
- `src/components/Sidebar.jsx`: navegação lateral, colapsável, ícones `lucide-react`.
- `src/components/*Module.jsx`: módulos iniciais de Dashboard, RH, Segurança e Obras.
- `src/data/mockData.js`: fonte mock inicial.
- UI: Tailwind 4 + componentes UI em `src/components/ui/*`.

#### Roadmap de arquitetura (alinhado ao planejamento)
1. Rotas protegidas com `/login` e `AuthGuard`.
2. Services dedicados para dados e exportação: `src/services/*.js`.
3. Reorganizar `src/data/` por domínios.
4. Página de relatórios com filtros e exportadores.
5. Página de configurações com persistência em localStorage.

#### Convenções
- Nomes descritivos; evitar abreviações.
- Componentes UI desacoplados em `components/ui`.
- Services puros, testáveis e sem dependência de UI.
- Chaves de `localStorage` com versão (ex.: `jl-settings-v1`).


