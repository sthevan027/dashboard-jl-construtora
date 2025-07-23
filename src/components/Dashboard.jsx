import { 
  Users, 
  Shield, 
  Building, 
  TrendingUp, 
  TrendingDown,
  AlertTriangle,
  CheckCircle,
  Clock
} from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import { funcionarios, seguranca, obras, kpis, alertas, historico } from '../data/mockData';

const Dashboard = () => {
  const COLORS = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444'];

  const KPICard = ({ title, value, meta, unit, trend, icon: Icon, color }) => (
    <div className="bg-white rounded-lg p-6 shadow-sm border">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <div className="flex items-center gap-2 mt-1">
            <span className="text-2xl font-bold text-gray-900">
              {value}{unit}
            </span>
            {trend === 'subindo' ? (
              <TrendingUp className="w-4 h-4 text-green-500" />
            ) : trend === 'descendo' ? (
              <TrendingDown className="w-4 h-4 text-red-500" />
            ) : (
              <div className="w-4 h-4" />
            )}
          </div>
          <p className="text-xs text-gray-500 mt-1">Meta: {meta}{unit}</p>
        </div>
        <div className={`p-3 rounded-full ${color}`}>
          <Icon className="w-6 h-6 text-white" />
        </div>
      </div>
    </div>
  );

  const AlertCard = ({ alerta }) => {
    const getAlertColor = (tipo) => {
      switch (tipo) {
        case 'urgente': return 'border-red-500 bg-red-50';
        case 'atencao': return 'border-yellow-500 bg-yellow-50';
        default: return 'border-blue-500 bg-blue-50';
      }
    };

    const getAlertIcon = (tipo) => {
      switch (tipo) {
        case 'urgente': return <AlertTriangle className="w-4 h-4 text-red-500" />;
        case 'atencao': return <Clock className="w-4 h-4 text-yellow-500" />;
        default: return <CheckCircle className="w-4 h-4 text-blue-500" />;
      }
    };

    return (
      <div className={`p-4 rounded-lg border-l-4 ${getAlertColor(alerta.tipo)}`}>
        <div className="flex items-start gap-3">
          {getAlertIcon(alerta.tipo)}
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <span className="text-xs font-medium text-gray-500 uppercase">
                {alerta.categoria}
              </span>
              <span className="text-xs text-gray-400">
                {new Date(alerta.timestamp).toLocaleTimeString('pt-BR', {
                  hour: '2-digit',
                  minute: '2-digit'
                })}
              </span>
            </div>
            <h4 className="font-medium text-gray-900 mt-1">{alerta.titulo}</h4>
            <p className="text-sm text-gray-600 mt-1">{alerta.descricao}</p>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Dashboard Geral</h1>
          <p className="text-gray-600 mt-1">
            Visão geral dos indicadores da JL Construtora
          </p>
        </div>
        <div className="text-right">
          <p className="text-sm text-gray-500">Última atualização</p>
          <p className="font-medium text-gray-900">
            {new Date().toLocaleString('pt-BR')}
          </p>
        </div>
      </div>

      {/* KPIs Principais */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <KPICard
          title="Funcionários Ativos"
          value={funcionarios.ativos}
          meta={funcionarios.total}
          unit=""
          trend="estavel"
          icon={Users}
          color="bg-blue-500"
        />
        <KPICard
          title="Rotatividade Mensal"
          value={funcionarios.rotatividade.mensal}
          meta={funcionarios.rotatividade.meta}
          unit="%"
          trend="subindo"
          icon={TrendingUp}
          color="bg-yellow-500"
        />
        <KPICard
          title="Acidentes no Mês"
          value={seguranca.acidentes.mes}
          meta={seguranca.acidentes.meta}
          unit=""
          trend="descendo"
          icon={Shield}
          color="bg-red-500"
        />
        <KPICard
          title="Obras no Prazo"
          value={obras.cronograma.noPrazo}
          meta="90"
          unit="%"
          trend="estavel"
          icon={Building}
          color="bg-green-500"
        />
      </div>

      {/* Gráficos e Alertas */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Gráfico de Rotatividade */}
        <div className="lg:col-span-2 bg-white rounded-lg p-6 shadow-sm border">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Tendência de Rotatividade (%)
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={historico.rotatividade}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="mes" />
              <YAxis />
              <Tooltip />
              <Line 
                type="monotone" 
                dataKey="valor" 
                stroke="#3B82F6" 
                strokeWidth={2}
                dot={{ fill: '#3B82F6' }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Alertas */}
        <div className="bg-white rounded-lg p-6 shadow-sm border">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Alertas Recentes
          </h3>
          <div className="space-y-4 max-h-80 overflow-y-auto">
            {alertas.slice(0, 4).map((alerta) => (
              <AlertCard key={alerta.id} alerta={alerta} />
            ))}
          </div>
        </div>
      </div>

      {/* Gráficos de Departamentos e Acidentes */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Funcionários por Departamento */}
        <div className="bg-white rounded-lg p-6 shadow-sm border">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Funcionários por Departamento
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={funcionarios.departamentos}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="nome" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="funcionarios" fill="#3B82F6" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Acidentes por Mês */}
        <div className="bg-white rounded-lg p-6 shadow-sm border">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Acidentes por Mês
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={historico.acidentes}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="mes" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="valor" fill="#EF4444" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Status das Obras */}
      <div className="bg-white rounded-lg p-6 shadow-sm border">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Status das Obras Principais
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left py-3 px-4 font-medium text-gray-900">Projeto</th>
                <th className="text-left py-3 px-4 font-medium text-gray-900">Progresso</th>
                <th className="text-left py-3 px-4 font-medium text-gray-900">Prazo</th>
                <th className="text-left py-3 px-4 font-medium text-gray-900">Status</th>
                <th className="text-left py-3 px-4 font-medium text-gray-900">Responsável</th>
              </tr>
            </thead>
            <tbody>
              {obras.projetos.map((projeto) => (
                <tr key={projeto.id} className="border-b hover:bg-gray-50">
                  <td className="py-3 px-4 font-medium">{projeto.nome}</td>
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-2">
                      <div className="w-20 bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-blue-500 h-2 rounded-full" 
                          style={{ width: `${projeto.progresso}%` }}
                        />
                      </div>
                      <span className="text-sm text-gray-600">{projeto.progresso}%</span>
                    </div>
                  </td>
                  <td className="py-3 px-4 text-sm text-gray-600">
                    {new Date(projeto.prazo).toLocaleDateString('pt-BR')}
                  </td>
                  <td className="py-3 px-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      projeto.status === 'Concluído' 
                        ? 'bg-green-100 text-green-800'
                        : projeto.status === 'Atrasado'
                        ? 'bg-red-100 text-red-800'
                        : 'bg-blue-100 text-blue-800'
                    }`}>
                      {projeto.status}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-sm text-gray-600">{projeto.responsavel}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

