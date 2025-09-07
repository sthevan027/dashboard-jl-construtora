### Rotas do Aplicativo

#### Visão Geral
As rotas são gerenciadas com `react-router-dom`. O acesso é dividido entre:
- Rotas públicas: acessíveis sem autenticação.
- Rotas privadas: protegidas por `AuthGuard`, renderizadas dentro de `Layout`.

#### Rotas Públicas
- `/login` → Tela de login (com feedback de loading/erro e toasts).
- `/` → Redireciona para `/dashboard` (apenas navegação).

#### Rotas Privadas (com `AuthGuard` + `Layout`)
- `/dashboard` → `DashboardPage`
- `/rh` → `RHPage`
- `/seguranca` → `SegurancaPage`
- `/obras` → `ObrasPage`
- `/relatorios` → `ReportsPage`
- `/configuracoes` → `ConfiguracaoPage`

#### Rotas de Ações (Privadas)
- RH
  - `/rh/novo-funcionario` → `NovoFuncionarioPage`
  - `/rh/relatorio-mensal` → `RelatorioMensalPage`
- Segurança
  - `/seguranca/reportar-acidente` → `ReportarAcidentePage`
  - `/seguranca/controle-epis` → `ControleEPIsPage`
- Obras
  - `/obras/nova-obra` → `NovaObraPage`
  - `/obras/cronograma-geral` → `CronogramaGeralPage`

#### Regras de Navegação
- Ao não autenticado acessar rota privada, usuário é redirecionado para `/login`.
- Após login com sucesso, é feito `navigate('/dashboard')`.
- `AuthGuard` exibe um estado de loading durante a verificação de sessão para evitar flashes de conteúdo.

#### Exemplo Simplificado de Proteção
```jsx
<Route
  path="/dashboard"
  element={
    <AuthGuard>
      <Layout>
        <DashboardPage />
      </Layout>
    </AuthGuard>
  }
/>
```

#### Próximos Passos (opcional)
- Agrupar rotas privadas com um wrapper de rotas para reduzir repetição.
- Adicionar controle por papéis (RBAC) quando houver múltiplos perfis de acesso.
- Definir rota catch‑all (`*`) para página 404 com link de retorno.


