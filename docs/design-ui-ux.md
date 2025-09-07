### Tela de Login

#### Objetivos de UX
- Comunicação clara da identidade JL Construtora (logo, cores, título).
- Feedback imediato para loading, erro e sucesso.
- Acessibilidade: navegação por teclado, rótulos e avisos descritivos.

#### Estados
- Padrão: formulário com e‑mail e senha.
- Loading: botão com spinner e campos desabilitados.
- Erro: mensagem em `Alert` e destaque não intrusivo.
- Sucesso: toast de confirmação e navegação para `/dashboard`.

#### Interações
- Mostrar/ocultar senha com ícone de alternância.
- Toasts para feedback (`useToast`).
- Dica com credenciais de teste no ambiente de desenvolvimento.

#### Acessibilidade
- `Label` associado a `Input` por `htmlFor`/`id`.
- Ordem de tabulação natural e foco visível.
- Texto alternativo/descrições para ícones sem conteúdo textual.

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


