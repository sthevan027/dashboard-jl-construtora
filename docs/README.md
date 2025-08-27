### Dashboard JL Construtora — Documentação

Este diretório concentra a documentação do projeto, incluindo planejamento, arquitetura, guias de uso, referências de UI/UX e especificações de bibliotecas e serviços.

- **Projeto**: Dashboard para obra (RH, Segurança, Obras)
- **Stack**: Vite + React 19, Tailwind CSS 4, Radix UI (shadcn/ui), Recharts, React Router (planejado), lucide-react, zod, react-hook-form, date-fns
- **Gerenciador de pacotes**: pnpm

#### Como navegar
- Planejamento: `docs/planejamento.md`
- Arquitetura: `docs/arquitetura.md`
- Guia de execução (dev/build/deploy): `docs/guia-execucao.md`
- Relatórios (filtros, exportação): `docs/relatorios.md`
- Configurações (metas, limiares, identidade): `docs/configuracoes.md`
- Autenticação (login, guard, rotas): `docs/autenticacao.md`
- Design UI/UX: `docs/design-ui-ux.md`
- Documentação técnica (bibliotecas e serviços): `docs/documentacao/`

#### Estado atual
- Sidebar com seções: Dashboard, RH, Segurança, Obras, Relatórios, Configurações
- Módulos de Relatórios e Configurações ainda em desenvolvimento
- Planejamento do MVP-Final definido em `docs/planejamento.md`

#### Scripts úteis (pnpm)
```bash
pnpm i
pnpm dev
pnpm build
pnpm preview
pnpm lint
```

Para detalhes de execução e deploy, ver `docs/guia-execucao.md`.


