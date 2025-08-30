# TODO - Finalização do Dashboard JL Construtora

## 🎯 Objetivo: MVP-Final Completo

Baseado na documentação em `/docs/`, este TODO lista todas as tarefas necessárias para finalizar o projeto com:
- ✅ Relatórios funcionais (filtros + exportação)
- ✅ Configurações básicas (metas/KPIs, identidade, limiares)
- ✅ Autenticação simples (admin) + proteção de rotas
- ✅ Dados mock organizados com camada de serviço
- ✅ Build de produção hospedado

---

## 📋 TAREFAS PRIORITÁRIAS (P0)

### 🔐 1. AUTENTICAÇÃO
- [x] **Estrutura de autenticação básica**
  - [x] `src/services/authService.js` - login fake + session management
  - [x] `src/components/auth/Login.jsx` - tela de login
  - [x] `src/components/auth/AuthGuard.jsx` - proteção de rotas
  - [x] React Router DOM implementado para rotas protegidas
  - [x] Fluxo: login → logout → proteção de rotas
- [ ] **Polimento da autenticação**
  - [ ] Melhorar UX da tela de login
  - [ ] Adicionar validação de formulário
  - [ ] Implementar expiração de sessão
  - [ ] Adicionar loading states

### 📊 2. RELATÓRIOS (Módulo Completo)
- [x] **Estrutura de dados e serviços**
  - [x] `src/services/reportService.js` - agregações e filtros
  - [x] `src/services/exportService.js` - CSV e PDF
  - [x] Cálculos de KPIs vs metas integrados

- [x] **Interface de relatórios**
  - [x] `src/components/reports/ReportsPage.jsx` - página principal
  - [x] `src/components/reports/ReportFilters.jsx` - componente de filtros
  - [x] Filtros: período (mês/trimestre/ano) e área (RH/Segurança/Obras)
  - [x] KPIs agregados com comparação vs meta
  - [x] Gráficos (Recharts) + tabelas consolidadas
  - [x] Estados: loading, empty, erro

- [x] **Exportação**
  - [x] Export CSV (dados filtrados)
  - [x] Export PDF (capa + KPIs + gráficos + tabela)
  - [x] "Última atualização" automática

### ⚙️ 3. CONFIGURAÇÕES
- [ ] **Estrutura de configurações**
  - [ ] `src/services/settingsService.js` - persistência localStorage
  - [ ] Hook `useSettings()` para ler/salvar
  - [ ] Schema Zod para validação

- [ ] **Interface de configurações**
  - [ ] `src/components/settings/SettingsPage.jsx`
  - [ ] Metas/KPIs (rotatividade, acidentes/mês, % EPIs, prazos)
  - [ ] Limiares de alertas
  - [ ] Identidade visual (nome empresa, cores do tema)
  - [ ] Reflexo imediato nos KPIs e alertas

### 🏗️ 4. REFATORAÇÃO DE ARQUITETURA
- [x] **Estrutura base implementada**
  - [x] Layout e Sidebar funcionais
  - [x] Módulos básicos (Dashboard, RH, Segurança, Obras)
  - [x] Roteamento com React Router DOM
  - [x] Componentes UI (shadcn/ui)
- [ ] **Organização final**
  - [ ] Mover módulos para `src/pages/` (já parcialmente feito)
  - [ ] Criar `src/components/common/` para componentes reutilizáveis
  - [ ] Organizar `src/data/` por domínios
  - [ ] Implementar Context para estado global (se necessário)

---

## 📋 TAREFAS SECUNDÁRIAS (P1)

### 🎨 5. POLIMENTO DE UI/UX
- [ ] **Responsividade**
  - [ ] Mobile (< 768px)
  - [ ] Tablet (768px - 1024px)
  - [ ] Desktop (> 1024px)

- [ ] **Estados de interface**
  - [ ] Loading states com skeletons
  - [ ] Estados vazios ("sem dados no período")
  - [ ] Mensagens de erro amigáveis
  - [ ] Toasts para feedback de ações

- [ ] **Acessibilidade**
  - [ ] ARIA labels
  - [ ] Navegação por teclado
  - [ ] Contraste adequado
  - [ ] Foco visual

### 📚 6. DOCUMENTAÇÃO
- [x] **Documentação base**
  - [x] Planejamento detalhado
  - [x] Arquitetura documentada
  - [x] Guias de execução
- [ ] **Documentação final**
  - [ ] README atualizado com instruções completas
  - [ ] API dos serviços documentada
  - [ ] Guia de deploy atualizado
  

---

## 📋 TAREFAS DE DEPLOY (P0)

### 🚀 7. PREPARAÇÃO PARA PRODUÇÃO
- [ ] **Build e otimização**
  - [ ] `pnpm build` funcionando
  - [ ] Performance: carregamento < 2.5s
  - [ ] Sem erros no console
  - [ ] Lint passando

- [ ] **Deploy**
  - [ ] Configurar Vercel/Netlify
  - [ ] Deploy automático
  - [ ] Testar em produção
  - [ ] URL pública funcionando

---

## 🎯 CRITÉRIOS DE ACEITE

### ✅ Relatórios
- [x] Selecionar "últimos 3 meses" atualiza gráficos/tabelas
- [x] Export CSV e PDF funcionam sem quebrar layout
- [x] Filtros por área funcionam corretamente

### ✅ Configurações
- [ ] Alterar meta de rotatividade reflete na cor/estado dos KPIs
- [ ] Badges de alerta reagem imediatamente
- [ ] Persistência em localStorage funciona

### ✅ Autenticação
- [x] Rotas internas bloqueadas sem login
- [x] Logout limpa sessão corretamente
- [x] Redirecionamento funciona

### ✅ Qualidade
- [ ] Responsivo em desktop, tablet, mobile
- [ ] Performance adequada
- [ ] Sem erros no console
- [ ] Lint passando

---

## 📅 CRONOGRAMA ATUALIZADO

### **Dia 1 - Fundação (JÁ FEITO)**
- [x] Estrutura base implementada
- [x] Autenticação básica funcionando
- [x] Roteamento configurado

### **Dia 2 - Relatórios (Base)**
- [ ] Criar reportService
- [ ] Página de relatórios com filtros
- [ ] Estados de loading/empty

### **Dia 3 - Relatórios (Gráficos)**
- [ ] Gráficos e tabelas consolidadas
- [ ] KPIs com comparação vs meta
- [ ] Badges de risco

### **Dia 4 - Exportação**
- [ ] Export CSV
- [ ] Export PDF
- [ ] Testar diferentes períodos

### **Dia 5 - Configurações**
- [ ] Página de configurações
- [ ] Persistência localStorage
- [ ] Reflexo imediato na UI

### **Dia 6 - Polimento**
- [ ] Responsividade
- [ ] Estados de erro
- [ ] Acessibilidade básica

### **Dia 7 - Release**
- [ ] Build de produção
- [ ] Deploy
- [ ] Documentação final

---

## 🏁 CHECKLIST DE ENTREGA FINAL

- [x] Login funcional + rotas protegidas
- [x] Relatórios com filtros (mês/trimestre/ano, RH/Segurança/Obras)
- [x] Export CSV e PDF confiáveis
- [ ] Configurações persistentes (metas, limiares, identidade)
- [ ] KPIs e alertas reagindo às metas
- [ ] Responsivo e sem erros no console
- [ ] Deploy online + README atualizado

---

## 🎯 PRÓXIMOS PASSOS IMEDIATOS

### **Prioridade 1: Relatórios**
1. Criar `src/services/reportService.js`
2. Implementar `src/components/reports/ReportsPage.jsx`
3. Adicionar filtros de período e área

### **Prioridade 2: Exportação**
1. Implementar `src/services/exportService.js`
2. Adicionar botões de export CSV/PDF
3. Testar com dados reais

### **Prioridade 3: Configurações**
1. Criar `src/services/settingsService.js`
2. Implementar página de configurações
3. Conectar com KPIs existentes

---

**Status Atual**: 🟢 Relatórios implementados - Autenticação e Relatórios funcionando, falta módulo de Configurações

**Próximo Passo**: Implementar módulo de Configurações com persistência localStorage
