// Serviço de autenticação para o Dashboard JL Construtora
// Login fake para MVP - em produção seria integrado com backend real

const AUTH_STORAGE_KEY = 'jl-auth-session-v1';

// Credenciais mock para MVP
const MOCK_CREDENTIALS = {
  email: 'admin@jlconstrutora.com',
  password: 'admin123'
};

// Token fake com expiração
const generateFakeToken = () => {
  const token = 'fake-jwt-' + Math.random().toString(36).substr(2, 9);
  const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 horas
  return { token, expiresAt: expiresAt.toISOString() };
};

// Verificar se o token ainda é válido
const isTokenValid = (session) => {
  if (!session || !session.token || !session.expiresAt) {
    return false;
  }
  
  const now = new Date();
  const expiresAt = new Date(session.expiresAt);
  return now < expiresAt;
};

// Salvar sessão no localStorage
const saveSession = (session) => {
  try {
    localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(session));
    return true;
  } catch (error) {
    console.error('Erro ao salvar sessão:', error);
    return false;
  }
};

// Recuperar sessão do localStorage
const getSession = () => {
  try {
    const sessionData = localStorage.getItem(AUTH_STORAGE_KEY);
    if (!sessionData) return null;
    
    const session = JSON.parse(sessionData);
    return isTokenValid(session) ? session : null;
  } catch (error) {
    console.error('Erro ao recuperar sessão:', error);
    return null;
  }
};

// Limpar sessão
const clearSession = () => {
  try {
    localStorage.removeItem(AUTH_STORAGE_KEY);
    return true;
  } catch (error) {
    console.error('Erro ao limpar sessão:', error);
    return false;
  }
};

// Login fake
const login = async (email, password) => {
  // Simular delay de rede
  await new Promise(resolve => setTimeout(resolve, 500));
  
  // Validar credenciais
  if (email === MOCK_CREDENTIALS.email && password === MOCK_CREDENTIALS.password) {
    const session = generateFakeToken();
    const success = saveSession(session);
    
    if (success) {
      return {
        success: true,
        user: {
          id: 1,
          name: 'Administrador',
          email: email,
          role: 'admin'
        },
        session
      };
    } else {
      throw new Error('Erro ao salvar sessão');
    }
  } else {
    throw new Error('Credenciais inválidas');
  }
};

// Logout
const logout = () => {
  clearSession();
  return { success: true };
};

// Verificar se está autenticado
const isAuthenticated = () => {
  const session = getSession();
  return session !== null;
};

// Renovar token (se necessário)
const refreshToken = () => {
  const session = getSession();
  if (session) {
    const newSession = generateFakeToken();
    saveSession(newSession);
    return newSession;
  }
  return null;
};

export const authService = {
  login,
  logout,
  isAuthenticated,
  getSession,
  refreshToken,
  MOCK_CREDENTIALS // Para facilitar testes
};
