### Autenticação

#### Objetivos
- Login simples (admin) + proteção de rotas.
- Sessão em `localStorage` com `{ token, expiresAt }`.

#### Fluxo
1. `authService.login(email, senha)` valida credenciais mock e salva sessão.
2. `AuthGuard` verifica validade do token e redireciona para `/login` quando inválido.
3. Logout limpa a sessão e volta para `/login`.

#### Estrutura proposta
- `src/services/authService.js`
- `src/components/auth/Login.jsx`
- `src/components/auth/AuthGuard.jsx` (ou HOC)
- Rotas com `react-router-dom` (`/login`, `/dashboard`, ...)

#### Segurança
- Não armazenar dados sensíveis; token é fake para MVP.
- Definir `expiresAt` curto e renovar com interação do usuário, se necessário.


