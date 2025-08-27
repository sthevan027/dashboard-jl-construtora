dashboard para obra.

Objetivo

Entregar uma versão fechada (MVP-Final) com:

Relatórios funcionais (filtros + exportação).

Configurações básicas (metas/KPIs, identidade, limiares de alerta).

Autenticação simples (admin) + proteção de rotas.

Dados mock organizados com camada de serviço (pronto para trocar por API).

Build de produção hospedado (Vercel/Netlify) e documentação pronta.

Backlog Prioritário (do agora → depois)
P0 — imprescindível para “dar baixa”

Relatórios

Filtros por período (mês, trimestre, ano) e área (RH, Segurança, Obras).

KPIs agregados, séries históricas e comparação vs meta.

Exportação: CSV e PDF (relatório enxuto com capa, data e seção).

“Última atualização” automática.

Configurações

Metas/KPIs (rotatividade, acidentes/mês, % EPIs, prazos).

Limiar de alertas (ex.: “acidentes > X” aciona badge vermelho).

Identidade visual (nome empresa, logotipo opcional, cores do tema).

Persistência local (localStorage) com interface simples.

Autenticação (admin)

Tela de login + sessão em localStorage (token fake + expiração).

Proteção de rotas (Redirect → /login quando não autenticado).

Dados & Serviços

Reorganizar src/data por domínios: rh/, seguranca/, obras/, kpis/.

Criar services (/src/services/*.ts|js) para ler/filtrar dados.

Adapter único para exportação (CSV/PDF) reutilizável.

P1 — valor alto, esforço baixo

Página “Sobre/Help” com instruções rápidas de uso.

Preferências de usuário (tema claro/escuro, densidade de tabela).

Loading states e mensagens de vazio (“sem dados no período”).

P2 — pós-entrega (opcionais)

Notificações (toasts) e e-mail (simulado) ao romper limiares.

Integração simples com planilha (CSV upload).

RBAC (administrador/gestor/leitor).

Critérios de Aceite (Definition of Done)

Relatórios: ao selecionar “últimos 3 meses”, gráficos/tabelas atualizam e exportam CSV e PDF sem quebrar layout.

Configurações: alterar meta de rotatividade reflete na cor/estado dos KPIs e nos badges de alerta imediatamente.

Autenticação: rotas internas bloqueadas sem login; logout limpa sessão.

Responsividade: desktop, tablet, mobile sem estouro de layout.

Performance: build de produção carrega principal em <2,5 s em rede normal.

Qualidade: sem erros no console; lints passam.

Docs: README com “como rodar”, “como configurar”, “como exportar” e “variáveis de ambiente (se houver)”.

Arquitetura/Implementação (mínima e limpa)

Pasta sugerida

src/
  components/
    reports/   # telas e widgets de relatórios
    settings/  # telas e formulários de configurações
    auth/      # Login, Guard
    common/    # Tabela, Card, Modal, ExportButton
  data/
    rh/*.json
    seguranca/*.json
    obras/*.json
    kpis/*.json
  services/
    kpiService.ts      # agrega séries e metas
    reportService.ts   # filtra, agrupa e formata p/ gráficos
    exportService.ts   # CSV/PDF
    authService.ts     # login fake + session
  pages/ (ou routes/)
    /login
    /dashboard
    /relatorios
    /configuracoes


Autenticação simples

authService.login(email, senha) → salva {token, expiresAt} no localStorage.

AuthGuard (HOC/componente) verifica token e redireciona.

Relatórios

reportService.getSeries({area, periodo}) retorna {kpis, tabelas, series}.

Exportadores:

CSV: gera via Blob.

PDF: jspdf + html2canvas (ou só jspdf-autotable para tabelas).

Configurações

settings persistidas em localStorage (chave jl-settings-v1).

Hook useSettings() para ler/salvar e notificar UI.

Sprint relâmpago (7 dias)

Dia 1 – Fundação

Refatorar estrutura de pastas + criar services.

Implementar AuthGuard e tela de Login.

Conectar guard nas rotas internas.

Dia 2 – Relatórios (base)

Página /relatorios com layout, filtros (período/área) e estados de loading/empty.

reportService: agregações por mês e comparação vs meta.

Dia 3 – Relatórios (gráficos + tabelas)

Gráficos (Recharts) + tabela consolidada.

KPI header: valores, variação vs meta, badges de risco.

Dia 4 – Exportação

Export CSV (dados filtrados).

Export PDF (capa + KPIs + gráficos + tabela).

Testar em diferentes períodos.

Dia 5 – Configurações

Página /configuracoes: metas/KPIs, limiares, identidade.

Persistir no localStorage + refletir imediatamente nos relatórios/KPIs.

Dia 6 – Polimento

Responsividade (mobile/tablet).

Estados de erro/sem dados.

Acessibilidade básica (aria-labels, foco, contraste).

Dia 7 – Release

Build de produção.

Deploy (Vercel/Netlify).

Revisão geral, README atualizado e checklist de entrega.

Checklist de entrega

 Login funcional + rotas protegidas

 Relatórios com filtros (mês/trimestre/ano, RH/Segurança/Obras)

 Export CSV e PDF confiáveis

 Configurações persistentes (metas, limiares, identidade)

 KPIs e alertas reagindo às metas

 Responsivo e sem erros no console

 Deploy online + README atualizado

Boas práticas rápidas

Commits: feat(reports): export PDF, fix(rh): kpi meta calc, chore: lint.

Branches: feat/reports, feat/settings, feat/auth, chore/export.

UI: manter o visual corporativo já definido; usar componentes comuns (Card/Tabela/Modal/Badge) para consistência.