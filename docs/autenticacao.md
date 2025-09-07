### Autenticação

#### Objetivo
Prover um fluxo simples e seguro o suficiente para o MVP: login com credenciais mock, criação de sessão no `localStorage` com expiração e proteção de rotas via guard.

#### Visão Geral do Fluxo
1. Usuário envia e‑mail e senha na tela de login (`Login.jsx`).
2. `authService.login(email, password)` valida contra credenciais mock e cria uma sessão `{ token, expiresAt }`.
3. A sessão é persistida em `localStorage` com a chave `jl-auth-session-v1`.
4. O `AuthGuard` verifica `authService.isAuthenticated()` nas rotas privadas; quando inválido, redireciona para `/login`.
5. `authService.logout()` remove a sessão e retorna o usuário ao `/login`.

#### Estrutura dos Arquivos
- `src/services/authService.js`: regras de negócio de autenticação (login/logout, sessão, refresh).
- `src/components/auth/Login.jsx`: UI do formulário, feedback e navegação.
- `src/components/auth/AuthGuard.jsx`: proteção de rotas privadas.
- Rotas configuradas com `react-router-dom` (`/login`, `/dashboard`, etc.).

#### Sessão e Expiração
- Chave de armazenamento: `jl-auth-session-v1`.
- Estrutura: `{ token: string, expiresAt: ISOString }`.
- Expiração padrão: 24h a partir do login.
- Funções principais:
  - `getSession()`: retorna sessão válida ou `null`.
  - `isAuthenticated()`: `true` se a sessão existir e não estiver expirada.
  - `refreshToken()`: gera novo token/expiração quando houver sessão ativa.

#### Estados e Retornos
- `authService.login(email, password)`:
  - Sucesso: `{ success: true, user: { id, name, email, role }, session }`.
  - Erro: lança `Error('Credenciais inválidas')` ou `Error('Erro ao salvar sessão')`.
- `authService.logout()`:
  - `{ success: true }` após limpar o storage.

#### Proteção de Rotas (AuthGuard)
- Verifica autenticação em `useEffect` e exibe loading enquanto valida.
- Quando não autenticado, redireciona para `/login` preservando `state.from`.
- Quando autenticado, renderiza `children` (rota privada).

#### Boas Práticas e Segurança (MVP)
- Não armazenar informações sensíveis no `localStorage`.
- Token é fictício; em produção usar `httpOnly cookies` e backend real.
- Tratar erros de parsing do storage e cenários de storage indisponível.
- Fornecer feedback visual e acessível durante loading/erros.

#### Próximos Passos (evolução para produção)
- Integração com backend/IdP (OAuth2/OIDC, JWT, sessões server-side).
- Cookies `httpOnly`, `SameSite`, `Secure` e rotação de refresh tokens.
- Controle de permissões por papel (RBAC/ABAC) nas rotas e componentes.
- Auditoria de sessões e revogação.

