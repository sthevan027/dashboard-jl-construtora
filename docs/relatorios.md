## Acesso e Permissões (Resumo)

- Relatórios são rotas privadas, protegidas por `AuthGuard`.
- Usuário precisa estar autenticado; caso contrário, será redirecionado para `/login`.
- Em evolução futura, filtrar dados conforme papéis (ex.: `admin`, `gestor`).

### Relatórios

#### Objetivos
- Filtros por período (mês, trimestre, ano) e área (RH, Segurança, Obras).
- KPIs agregados, séries históricas e comparação vs meta.
- Exportação CSV e PDF.
- "Última atualização" automática.

#### Estrutura proposta
- `reportService.getSeries({ area, periodo, settings }) => { kpis, series, tabelas }`
- `exportService.toCsv(dataset, options)` e `exportService.toPdf(sections, options)`

#### Fluxo
1. Usuário seleciona período e área.
2. UI chama `reportService` para agregar dados e aplicar metas/limiares de `settings`.
3. Renderiza KPIs + gráficos (Recharts) + tabela.
4. Exportar: chama `exportService` com os dados filtrados.

#### Estados de UI
- Loading: skeletons e placeholders.
- Empty: mensagem "sem dados no período".
- Erro: mensagem amigável com opção de tentar novamente.


