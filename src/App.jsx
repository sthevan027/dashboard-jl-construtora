import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import AuthGuard from './components/auth/AuthGuard';
import Login from './components/auth/Login';
import Layout from './components/Layout';
import DashboardPage from './pages/DashboardPage';
import RHPage from './pages/RHPage';
import SegurancaPage from './pages/SegurancaPage';
import ObrasPage from './pages/ObrasPage';
import ReportsPage from './components/reports/ReportsPage';

// Importar páginas dos botões
import NovoFuncionarioPage from './pages/actions/NovoFuncionarioPage';
import RelatorioMensalPage from './pages/actions/RelatorioMensalPage';
import ReportarAcidentePage from './pages/actions/ReportarAcidentePage';
import ControleEPIsPage from './pages/actions/ControleEPIsPage';
import NovaObraPage from './pages/actions/NovaObraPage';
import CronogramaGeralPage from './pages/actions/CronogramaGeralPage';

// Importar página de configurações
import ConfiguracaoPage from './pages/ConfiguracaoPage';

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
        
        {/* Rota de Relatórios */}
        <Route
          path="/relatorios"
          element={
            <AuthGuard>
              <Layout>
                <ReportsPage />
              </Layout>
            </AuthGuard>
          }
        />
        
        {/* Rotas dos botões de ação */}
        <Route
          path="/rh/novo-funcionario"
          element={
            <AuthGuard>
              <Layout>
                <NovoFuncionarioPage />
              </Layout>
            </AuthGuard>
          }
        />
        
        <Route
          path="/rh/relatorio-mensal"
          element={
            <AuthGuard>
              <Layout>
                <RelatorioMensalPage />
              </Layout>
            </AuthGuard>
          }
        />
        
        <Route
          path="/seguranca/reportar-acidente"
          element={
            <AuthGuard>
              <Layout>
                <ReportarAcidentePage />
              </Layout>
            </AuthGuard>
          }
        />
        
        <Route
          path="/seguranca/controle-epis"
          element={
            <AuthGuard>
              <Layout>
                <ControleEPIsPage />
              </Layout>
            </AuthGuard>
          }
        />
        
        <Route
          path="/obras/nova-obra"
          element={
            <AuthGuard>
              <Layout>
                <NovaObraPage />
              </Layout>
            </AuthGuard>
          }
        />
        
        <Route
          path="/obras/cronograma-geral"
          element={
            <AuthGuard>
              <Layout>
                <CronogramaGeralPage />
              </Layout>
            </AuthGuard>
          }
        />
        
        <Route
          path="/configuracoes"
          element={
            <AuthGuard>
              <Layout>
                <ConfiguracaoPage />
              </Layout>
            </AuthGuard>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
