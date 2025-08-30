import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import AuthGuard from './components/auth/AuthGuard';
import Login from './components/auth/Login';
import Layout from './components/Layout';
import DashboardPage from './pages/DashboardPage';
import RHPage from './pages/RHPage';
import SegurancaPage from './pages/SegurancaPage';
import ObrasPage from './pages/ObrasPage';

function App() {
  return (
    <Router>
      <Routes>
        {/* Rota pública - Login */}
        <Route path="/login" element={<Login />} />
        
        {/* Rota raiz - redireciona para dashboard */}
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        
        {/* Rotas protegidas */}
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
        
        <Route
          path="/rh"
          element={
            <AuthGuard>
              <Layout>
                <RHPage />
              </Layout>
            </AuthGuard>
          }
        />
        
        <Route
          path="/seguranca"
          element={
            <AuthGuard>
              <Layout>
                <SegurancaPage />
              </Layout>
            </AuthGuard>
          }
        />
        
        <Route
          path="/obras"
          element={
            <AuthGuard>
              <Layout>
                <ObrasPage />
              </Layout>
            </AuthGuard>
          }
        />
        
        {/* Rotas em desenvolvimento */}
        <Route
          path="/relatorios"
          element={
            <AuthGuard>
              <Layout>
                <div className="p-6">
                  <h1 className="text-3xl font-bold text-gray-900">Relatórios</h1>
                  <p className="text-gray-600 mt-1">Módulo em desenvolvimento...</p>
                </div>
              </Layout>
            </AuthGuard>
          }
        />
        
        <Route
          path="/configuracoes"
          element={
            <AuthGuard>
              <Layout>
                <div className="p-6">
                  <h1 className="text-3xl font-bold text-gray-900">Configurações</h1>
                  <p className="text-gray-600 mt-1">Módulo em desenvolvimento...</p>
                </div>
              </Layout>
            </AuthGuard>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
