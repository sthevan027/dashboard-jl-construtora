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
- [x] **Criar estrutura de autenticação**
  - [x] `src/services/authService.js` - login fake + session management
  - [x] `src/components/auth/Login.jsx` - tela de login
  - [x] `src/components/auth/AuthGuard.jsx` - proteção de rotas
  - [x] Implementar React Router DOM para rotas protegidas
  - [x] Testar fluxo: login → logout → proteção de rotas

### 📊 2. RELATÓRIOS (Módulo Completo)
- [ ] **Estrutura de dados e serviços**
  - [ ] Reorganizar `src/data/` por domínios: `rh/`, `seguranca/`, `obras/`, `kpis/`
  - [ ] `src/services/reportService.js` - agregações e filtros
  - [ ] `src/services/exportService.js` - CSV e PDF
  - [ ] `src/services/kpiService.js` - cálculos de KPIs vs metas

- [ ] **Interface de relatórios**
  - [ ] `src/components/reports/ReportsPage.jsx` - página principal
  - [ ] Filtros: período (mês/trimestre/ano) e área (RH/Segurança/Obras)
  - [ ] KPIs agregados com comparação vs meta
  - [ ] Gráficos (Recharts) + tabelas consolidadas
  - [ ] Estados: loading, empty, erro

- [ ] **Exportação**
  - [ ] Export CSV (dados filtrados)
  - [ ] Export PDF (capa + KPIs + gráficos + tabela)
  - [ ] "Última atualização" automática

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
- [x] **Reorganizar estrutura de pastas**
  - [x] Mover módulos para `src/pages/` ou `src/routes/`
  - [ ] Criar `src/components/common/` para componentes reutilizáveis
  - [ ] Organizar `src/data/` por domínios
  - [x] Implementar React Router DOM

---

## 📋 TAREFAS SECUNDÁRIAS (P1)

### 🎨 5. POLIMENTO DE
 UI/UX
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
- [ ] **README atualizado**
  - [ ] Como rodar o projeto
  - [ ] Como configurar
  - [ ] Como exportar relatórios
  - [ ] Variáveis de ambiente (se houver)

- [ ] **Documentação técnica**
  - [ ] API dos serviços
  - [ ] Estrutura de dados
  - [ ] Guia de deploy

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
- [ ] Selecionar "últimos 3 meses" atualiza gráficos/tabelas
- [ ] Export CSV e PDF funcionam sem quebrar layout
- [ ] Filtros por área funcionam corretamente

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

## 📅 CRONOGRAMA SUGERIDO

### **Dia 1 - Fundação**
- [x] Refatorar estrutura de pastas
- [x] Implementar AuthGuard e Login
- [x] Conectar React Router DOM

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
- [ ] Relatórios com filtros (mês/trimestre/ano, RH/Segurança/Obras)
- [ ] Export CSV e PDF confiáveis
- [ ] Configurações persistentes (metas, limiares, identidade)
- [ ] KPIs e alertas reagindo às metas
- [ ] Responsivo e sem erros no console
- [ ] Deploy online + README atualizado

---

**Status Atual**: 🟢 Autenticação implementada - Faltam módulos principais (Relatórios, Configurações)

**Próximo Passo**: Implementar módulo de Relatórios com filtros e exportação
