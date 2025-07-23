import { useState } from 'react';
import './App.css';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import RHModule from './components/RHModule';
import SegurancaModule from './components/SegurancaModule';
import ObrasModule from './components/ObrasModule';

function App() {
  const [activeSection, setActiveSection] = useState('dashboard');

  const renderContent = () => {
    switch (activeSection) {
      case 'dashboard':
        return <Dashboard />;
      case 'rh':
        return <RHModule />;
      case 'seguranca':
        return <SegurancaModule />;
      case 'obras':
        return <ObrasModule />;
      case 'relatorios':
        return (
          <div className="p-6">
            <h1 className="text-3xl font-bold text-gray-900">Relatórios</h1>
            <p className="text-gray-600 mt-1">Módulo em desenvolvimento...</p>
          </div>
        );
      case 'configuracoes':
        return (
          <div className="p-6">
            <h1 className="text-3xl font-bold text-gray-900">Configurações</h1>
            <p className="text-gray-600 mt-1">Módulo em desenvolvimento...</p>
          </div>
        );
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar 
        activeSection={activeSection} 
        setActiveSection={setActiveSection} 
      />
      <main className="flex-1 overflow-auto">
        {renderContent()}
      </main>
    </div>
  );
}

export default App;
