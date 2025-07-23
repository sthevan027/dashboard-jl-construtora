import { useState } from 'react';
import { 
  LayoutDashboard, 
  Users, 
  Shield, 
  Building, 
  BarChart3, 
  Settings,
  Menu,
  X
} from 'lucide-react';

const Sidebar = ({ activeSection, setActiveSection }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'rh', label: 'Recursos Humanos', icon: Users },
    { id: 'seguranca', label: 'Segurança', icon: Shield },
    { id: 'obras', label: 'Obras', icon: Building },
    { id: 'relatorios', label: 'Relatórios', icon: BarChart3 },
    { id: 'configuracoes', label: 'Configurações', icon: Settings }
  ];

  return (
    <div className={`bg-slate-900 text-white transition-all duration-300 ${
      isCollapsed ? 'w-16' : 'w-64'
    } min-h-screen flex flex-col`}>
      {/* Header */}
      <div className="p-4 border-b border-slate-700">
        <div className="flex items-center justify-between">
          {!isCollapsed && (
            <div>
              <h1 className="text-xl font-bold text-blue-400">JL Construtora</h1>
              <p className="text-sm text-slate-400">Dashboard Integrado</p>
            </div>
          )}
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="p-2 rounded-lg hover:bg-slate-800 transition-colors"
          >
            {isCollapsed ? <Menu size={20} /> : <X size={20} />}
          </button>
        </div>
      </div>

      {/* Menu Items */}
      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeSection === item.id;
            
            return (
              <li key={item.id}>
                <button
                  onClick={() => setActiveSection(item.id)}
                  className={`w-full flex items-center gap-3 p-3 rounded-lg transition-colors ${
                    isActive 
                      ? 'bg-blue-600 text-white' 
                      : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                  }`}
                  title={isCollapsed ? item.label : ''}
                >
                  <Icon size={20} />
                  {!isCollapsed && (
                    <span className="font-medium">{item.label}</span>
                  )}
                </button>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Footer */}
      {!isCollapsed && (
        <div className="p-4 border-t border-slate-700">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
              <span className="text-sm font-bold">U</span>
            </div>
            <div>
              <p className="text-sm font-medium">Usuário</p>
              <p className="text-xs text-slate-400">Técnico de Automação</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Sidebar;

