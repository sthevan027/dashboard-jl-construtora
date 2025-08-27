### Design UI e UX

#### Princípios
- Clareza, consistência e foco em KPIs.
- Hierarquia visual: cabeçalhos de seção, KPIs em destaque, gráficos e tabelas.
- Responsividade para desktop/tablet/mobile sem estouro de layout.

#### Identidade
- Nome: JL Construtora
- Paleta base: `slate` escuro no sidebar; acentos em `blue` para foco.
- Tipografia padrão do sistema (Tailwind defaults) para desempenho.

#### Componentes base
- `Card`, `Badge`, `Table`, `Modal`, `ExportButton` em `components/common`.
- Usar Radix UI (acessibilidade) e utilitários de `components/ui/*`.

#### Interações
- Filtros com feedback imediato (loading states visuais).
- Mensagens de vazio: "sem dados no período".
- Tooltips para KPIs explicando cálculo e meta.

#### Acessibilidade
- Labels e `aria-*` nos controles de filtro.
- Contraste suficiente (verificar com Tailwind e tokens de cor).
- Foco visível e navegação por teclado.

#### Estados
- Loading: skeletons.
- Erro: mensagem com retry e detalhe técnico no console apenas.
- Sucesso: confirmadores discretos (toasts opcionais).


