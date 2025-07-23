import { 
  Building, 
  Calendar, 
  DollarSign, 
  TrendingUp, 
  TrendingDown,
  Clock,
  CheckCircle,
  AlertTriangle,
  Users,
  Wrench
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
import { obras, kpis, historico } from '../data/mockData';

const ObrasModule = () => {
  const COLORS = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444'];

  const ProjectCard = ({ title, value, subtitle, icon: Icon, color, trend }) => (
    <div className="bg-white rounded-lg p-6 shadow-sm border">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-2xl font-bold text-gray-900 mt-1">{value}</p>
          {subtitle && (
            <p className="text-sm text-gray-500 mt-1">{subtitle}</p>
          )}
        </div>
        <div className={`p-3 rounded-full ${color}`}>
          <Icon className="w-6 h-6 text-white" />
        </div>
      </div>
    </div>
  );

  const getStatusColor = (status) => {
    switch (status) {
      case 'Concluído': return 'bg-green-100 text-green-800';
      case 'Atrasado': return 'bg-red-100 text-red-800';
      case 'Em Andamento': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getProgressColor = (progresso) => {
    if (progresso >= 90) return 'bg-green-500';
    if (progresso >= 70) return 'bg-blue-500';
    if (progresso >= 50) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  const statusData = [
    { name: 'Em Andamento', value: obras.emAndamento, color: '#3B82F6' },
    { name: 'Concluídas', value: obras.concluidas, color: '#10B981' },
    { name: 'Atrasadas', value: obras.atrasadas, color: '#EF4444' }
  ];

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Gestão de Obras</h1>
          <p className="text-gray-600 mt-1">
            Acompanhamento de projetos, cronogramas e recursos
          </p>
        </div>
        <div className="flex gap-3">
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
            <Building className="w-4 h-4 inline mr-2" />
            Nova Obra
          </button>
          <button className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors">
            <Calendar className="w-4 h-4 inline mr-2" />
            Cronograma Geral
          </button>
        </div>
      </div>

      {/* Cards de Resumo */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <ProjectCard
          title="Total de Obras"
          value={obras.total}
          subtitle="Projetos ativos"
          icon={Building}
          color="bg-blue-500"
        />
        <ProjectCard
          title="Em Andamento"
          value={obras.emAndamento}
          subtitle={`${obras.cronograma.noPrazo}% no prazo`}
          icon={Clock}
          color="bg-yellow-500"
        />
        <ProjectCard
          title="Concluídas"
          value={obras.concluidas}
          subtitle="Este mês"
          icon={CheckCircle}
          color="bg-green-500"
        />
        <ProjectCard
          title="Atrasadas"
          value={obras.atrasadas}
          subtitle="Requer atenção"
          icon={AlertTriangle}
          color="bg-red-500"
        />
      </div>

      {/* Gráficos Principais */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Status das Obras */}
        <div className="bg-white rounded-lg p-6 shadow-sm border">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Status das Obras
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={statusData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, value }) => `${name}: ${value}`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {statusData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Obras Concluídas vs Atrasadas */}
        <div className="bg-white rounded-lg p-6 shadow-sm border">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Histórico de Conclusões
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={historico.obras}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="mes" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="concluidas" fill="#10B981" name="Concluídas" />
              <Bar dataKey="atrasadas" fill="#EF4444" name="Atrasadas" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Recursos e KPIs */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recursos */}
        <div className="bg-white rounded-lg p-6 shadow-sm border">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Recursos Disponíveis
          </h3>
          <div className="space-y-4">
            <div className="p-4 bg-blue-50 rounded-lg">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-blue-600 font-medium">Equipamentos</p>
                  <p className="text-2xl font-bold text-blue-900">
                    {obras.recursos.equipamentos.disponiveis}
                  </p>
                  <p className="text-xs text-blue-600">
                    {obras.recursos.equipamentos.emUso} em uso
                  </p>
                </div>
                <Wrench className="w-8 h-8 text-blue-500" />
              </div>
            </div>
            
            <div className="p-4 bg-green-50 rounded-lg">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-green-600 font-medium">Materiais</p>
                  <p className="text-lg font-bold text-green-900">
                    {obras.recursos.materiais.estoque}
                  </p>
                  <p className="text-xs text-green-600">
                    {obras.recursos.materiais.pedidos} pedidos pendentes
                  </p>
                </div>
                <Building className="w-8 h-8 text-green-500" />
              </div>
            </div>
          </div>
        </div>

        {/* KPIs de Obras */}
        <div className="lg:col-span-2 bg-white rounded-lg p-6 shadow-sm border">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Indicadores de Performance
          </h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 bg-blue-50 rounded-lg">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-blue-600 font-medium">Cronograma</p>
                  <p className="text-2xl font-bold text-blue-900">
                    {kpis.obras.cronograma.valor}%
                  </p>
                  <p className="text-xs text-blue-600">Meta: {kpis.obras.cronograma.meta}%</p>
                </div>
                <Calendar className="w-8 h-8 text-blue-500" />
              </div>
            </div>
            
            <div className="p-4 bg-green-50 rounded-lg">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-green-600 font-medium">Orçamento</p>
                  <p className="text-2xl font-bold text-green-900">
                    {kpis.obras.orcamento.valor}%
                  </p>
                  <p className="text-xs text-green-600">Meta: {kpis.obras.orcamento.meta}%</p>
                </div>
                <DollarSign className="w-8 h-8 text-green-500" />
              </div>
            </div>
            
            <div className="p-4 bg-yellow-50 rounded-lg">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-yellow-600 font-medium">Qualidade</p>
                  <p className="text-2xl font-bold text-yellow-900">
                    {kpis.obras.qualidade.valor}%
                  </p>
                  <p className="text-xs text-yellow-600">Meta: {kpis.obras.qualidade.meta}%</p>
                </div>
                <CheckCircle className="w-8 h-8 text-yellow-500" />
              </div>
            </div>
            
            <div className="p-4 bg-purple-50 rounded-lg">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-purple-600 font-medium">Produtividade</p>
                  <p className="text-2xl font-bold text-purple-900">
                    {kpis.obras.produtividade.valor}%
                  </p>
                  <p className="text-xs text-purple-600">Meta: {kpis.obras.produtividade.meta}%</p>
                </div>
                <TrendingUp className="w-8 h-8 text-purple-500" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tabela de Projetos */}
      <div className="bg-white rounded-lg p-6 shadow-sm border">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Projetos em Andamento
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left py-3 px-4 font-medium text-gray-900">Projeto</th>
                <th className="text-left py-3 px-4 font-medium text-gray-900">Progresso</th>
                <th className="text-left py-3 px-4 font-medium text-gray-900">Prazo</th>
                <th className="text-left py-3 px-4 font-medium text-gray-900">Orçamento</th>
                <th className="text-left py-3 px-4 font-medium text-gray-900">Status</th>
                <th className="text-left py-3 px-4 font-medium text-gray-900">Responsável</th>
                <th className="text-left py-3 px-4 font-medium text-gray-900">Ações</th>
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
                          className={`h-2 rounded-full ${getProgressColor(projeto.progresso)}`}
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
                    <div className="text-sm">
                      <p className="font-medium">
                        R$ {projeto.gasto.toLocaleString('pt-BR')}
                      </p>
                      <p className="text-gray-500">
                        de R$ {projeto.orcamento.toLocaleString('pt-BR')}
                      </p>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(projeto.status)}`}>
                      {projeto.status}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-sm text-gray-600">{projeto.responsavel}</td>
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

      {/* Alertas de Obras */}
      <div className="bg-white rounded-lg p-6 shadow-sm border">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Alertas e Notificações
        </h3>
        <div className="space-y-3">
          <div className="flex items-center gap-3 p-4 bg-red-50 border border-red-200 rounded-lg">
            <AlertTriangle className="w-5 h-5 text-red-500" />
            <div>
              <p className="font-medium text-red-900">Obra com atraso crítico</p>
              <p className="text-sm text-red-700">Reforma Escritório Central está 5 dias atrasada</p>
            </div>
          </div>
          
          <div className="flex items-center gap-3 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
            <Clock className="w-5 h-5 text-yellow-500" />
            <div>
              <p className="font-medium text-yellow-900">Equipamento em manutenção</p>
              <p className="text-sm text-yellow-700">7 equipamentos indisponíveis por manutenção preventiva</p>
            </div>
          </div>
          
          <div className="flex items-center gap-3 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <DollarSign className="w-5 h-5 text-blue-500" />
            <div>
              <p className="font-medium text-blue-900">Orçamento próximo do limite</p>
              <p className="text-sm text-blue-700">Ampliação Galpão A utilizou 75% do orçamento aprovado</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ObrasModule;

