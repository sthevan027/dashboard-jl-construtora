import { 
  Users, 
  UserPlus, 
  UserMinus, 
  Clock, 
  DollarSign,
  TrendingUp,
  TrendingDown,
  Calendar
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
import { funcionarios, kpis, historico } from '../data/mockData';

const RHModule = () => {
  const COLORS = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6'];

  const StatCard = ({ title, value, change, icon: Icon, color, unit = '' }) => (
    <div className="bg-white rounded-lg p-6 shadow-sm border">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-2xl font-bold text-gray-900 mt-1">
            {value}{unit}
          </p>
          {change && (
            <div className="flex items-center gap-1 mt-2">
              {change > 0 ? (
                <TrendingUp className="w-4 h-4 text-red-500" />
              ) : (
                <TrendingDown className="w-4 h-4 text-green-500" />
              )}
              <span className={`text-sm ${change > 0 ? 'text-red-600' : 'text-green-600'}`}>
                {Math.abs(change)}% vs mês anterior
              </span>
            </div>
          )}
        </div>
        <div className={`p-3 rounded-full ${color}`}>
          <Icon className="w-6 h-6 text-white" />
        </div>
      </div>
    </div>
  );

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Recursos Humanos</h1>
          <p className="text-gray-600 mt-1">
            Gestão de funcionários, rotatividade e indicadores de RH
          </p>
        </div>
        <div className="flex gap-3">
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
            <UserPlus className="w-4 h-4 inline mr-2" />
            Novo Funcionário
          </button>
          <button className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors">
            <Calendar className="w-4 h-4 inline mr-2" />
            Relatório Mensal
          </button>
        </div>
      </div>

      {/* Cards de Estatísticas */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total de Funcionários"
          value={funcionarios.total}
          icon={Users}
          color="bg-blue-500"
        />
        <StatCard
          title="Funcionários Ativos"
          value={funcionarios.ativos}
          icon={UserPlus}
          color="bg-green-500"
        />
        <StatCard
          title="Afastados"
          value={funcionarios.afastados}
          icon={UserMinus}
          color="bg-red-500"
        />
        <StatCard
          title="Rotatividade Mensal"
          value={funcionarios.rotatividade.mensal}
          unit="%"
          change={2.5}
          icon={TrendingUp}
          color="bg-yellow-500"
        />
      </div>

      {/* Gráficos Principais */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Rotatividade por Mês */}
        <div className="bg-white rounded-lg p-6 shadow-sm border">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Rotatividade por Mês (%)
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

        {/* Funcionários por Departamento */}
        <div className="bg-white rounded-lg p-6 shadow-sm border">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Distribuição por Departamento
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={funcionarios.departamentos}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ nome, funcionarios }) => `${nome}: ${funcionarios}`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="funcionarios"
              >
                {funcionarios.departamentos.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Horas Extras e Custos */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Horas Extras */}
        <div className="bg-white rounded-lg p-6 shadow-sm border">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Horas Extras</h3>
            <Clock className="w-5 h-5 text-gray-500" />
          </div>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-gray-600">Horas no Mês</span>
                <span className="font-semibold">{funcionarios.horasExtras.mes}h</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-yellow-500 h-2 rounded-full" 
                  style={{ width: `${(funcionarios.horasExtras.mes / funcionarios.horasExtras.limite) * 100}%` }}
                />
              </div>
              <p className="text-xs text-gray-500 mt-1">
                Limite: {funcionarios.horasExtras.limite}h
              </p>
            </div>
            <div className="pt-4 border-t">
              <div className="flex items-center gap-2">
                <DollarSign className="w-4 h-4 text-green-600" />
                <span className="text-sm text-gray-600">Custo Mensal:</span>
                <span className="font-semibold text-green-600">
                  R$ {funcionarios.horasExtras.custo.toLocaleString('pt-BR')}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* KPIs de RH */}
        <div className="lg:col-span-2 bg-white rounded-lg p-6 shadow-sm border">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Indicadores de Performance
          </h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 bg-blue-50 rounded-lg">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-blue-600 font-medium">Rotatividade</p>
                  <p className="text-2xl font-bold text-blue-900">
                    {kpis.rh.rotatividade.valor}%
                  </p>
                  <p className="text-xs text-blue-600">Meta: {kpis.rh.rotatividade.meta}%</p>
                </div>
                <TrendingUp className="w-8 h-8 text-blue-500" />
              </div>
            </div>
            
            <div className="p-4 bg-green-50 rounded-lg">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-green-600 font-medium">Absenteísmo</p>
                  <p className="text-2xl font-bold text-green-900">
                    {kpis.rh.absenteismo.valor}%
                  </p>
                  <p className="text-xs text-green-600">Meta: {kpis.rh.absenteismo.meta}%</p>
                </div>
                <Users className="w-8 h-8 text-green-500" />
              </div>
            </div>
            
            <div className="p-4 bg-yellow-50 rounded-lg">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-yellow-600 font-medium">Satisfação</p>
                  <p className="text-2xl font-bold text-yellow-900">
                    {kpis.rh.satisfacao.valor}/10
                  </p>
                  <p className="text-xs text-yellow-600">Meta: {kpis.rh.satisfacao.meta}/10</p>
                </div>
                <TrendingUp className="w-8 h-8 text-yellow-500" />
              </div>
            </div>
            
            <div className="p-4 bg-red-50 rounded-lg">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-red-600 font-medium">Horas Extras</p>
                  <p className="text-2xl font-bold text-red-900">
                    {kpis.rh.horasExtras.valor}h
                  </p>
                  <p className="text-xs text-red-600">Meta: {kpis.rh.horasExtras.meta}h</p>
                </div>
                <Clock className="w-8 h-8 text-red-500" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tabela de Departamentos */}
      <div className="bg-white rounded-lg p-6 shadow-sm border">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Detalhes por Departamento
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left py-3 px-4 font-medium text-gray-900">Departamento</th>
                <th className="text-left py-3 px-4 font-medium text-gray-900">Funcionários</th>
                <th className="text-left py-3 px-4 font-medium text-gray-900">Rotatividade</th>
                <th className="text-left py-3 px-4 font-medium text-gray-900">Status</th>
                <th className="text-left py-3 px-4 font-medium text-gray-900">Ações</th>
              </tr>
            </thead>
            <tbody>
              {funcionarios.departamentos.map((dept, index) => (
                <tr key={index} className="border-b hover:bg-gray-50">
                  <td className="py-3 px-4 font-medium">{dept.nome}</td>
                  <td className="py-3 px-4">{dept.funcionarios}</td>
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-2">
                      <span>{dept.rotatividade}%</span>
                      {dept.rotatividade > 15 ? (
                        <TrendingUp className="w-4 h-4 text-red-500" />
                      ) : (
                        <TrendingDown className="w-4 h-4 text-green-500" />
                      )}
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      dept.rotatividade > 15 
                        ? 'bg-red-100 text-red-800'
                        : dept.rotatividade > 10
                        ? 'bg-yellow-100 text-yellow-800'
                        : 'bg-green-100 text-green-800'
                    }`}>
                      {dept.rotatividade > 15 ? 'Atenção' : dept.rotatividade > 10 ? 'Moderado' : 'Normal'}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                      Ver Detalhes
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default RHModule;

