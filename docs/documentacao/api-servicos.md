### API de Serviços (Interna)

Os serviços encapsulam a lógica de dados, exportação e autenticação. Mantêm a UI desacoplada e facilitam a troca de fonte de dados (mock → API real).

#### authService
- `login({ email, senha }) => Promise<Session>`: valida, salva `{ token, expiresAt }` em `localStorage`.
- `logout()`: remove sessão.
- `getSession() => Session | null`.
- `isAuthenticated() => boolean`.

#### kpiService
- `getKpis({ area, periodo, settings }) => { kpis, metas, riscos }`.
  - Calcula variação vs meta e sinaliza riscos conforme limiares.

#### reportService
- `getSeries({ area, periodo, settings }) => { kpis, series, tabelas }`.
- `getLastUpdated() => Date`.

#### exportService
- `toCsv(dataset, options) => Blob`.
- `toPdf(sections, options) => Blob` (jspdf + html2canvas ou autotable).

#### Padrões
- Imutabilidade das entradas; funções puras sempre que possível.
- Tipos/contratos definidos e versionados.
- Erros previsíveis (mensagens claras) e sem throw genérico.


