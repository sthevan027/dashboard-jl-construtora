import { 
  Shield, 
  AlertTriangle, 
  CheckCircle, 
  Clock, 
  HardHat,
  Eye,
  Users,
  TrendingDown,
  TrendingUp
} from 'lucide-react';
import { ActionButton } from './ui/action-button';
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
import { segurancaService } from '../services/segurancaService';
import { moduleActions } from '../services/moduleActions';
import { useModuleActions } from '../services/moduleActions';
import { useState } from 'react';

const SegurancaModule = () => {
  const COLORS = ['#10B981', '#F59E0B', '#EF4444'];
  const { executeAction } = useModuleActions();
  const [loading, setLoading] = useState({ acidente: false, epis: false });
  const [seguranca, setSeguranca] = useState({});
  const [epis, setEpis] = useState([]);
  const [treinamentos, setTreinamentos] = useState([]);
  const [historico, setHistorico] = useState({ acidentes: [] });

  // Carregar dados do banco
  useEffect(() => {
    const carregarDados = () => {
      try {
        const estatisticas = segurancaService.getEstatisticas();
        const episData = segurancaService.getEPIs();
        const treinamentosData = segurancaService.getTreinamentos();
        
        setSeguranca(estatisticas);
        setEpis(episData);
        setTreinamentos(treinamentosData);
        
        // Gerar histórico de acidentes (últimos 6 meses)
        const historicoData = [];
        const hoje = new Date();
        for (let i = 5; i >= 0; i--) {
          const data = new Date(hoje.getFullYear(), hoje.getMonth() - i, 1);
          historicoData.push({
            mes: data.toLocaleDateString('pt-BR', { month: 'short' }),
            valor: Math.floor(Math.random() * 5) + 1 // Simular dados históricos
          });
        }
        setHistorico({ acidentes: historicoData });
      } catch (error) {
        console.error('Erro ao carregar dados:', error);
      }
    };

    carregarDados();
  }, []);

  // Função para reportar acidente
  const handleReportarAcidente = async () => {
    setLoading(prev => ({ ...prev, acidente: true }));
    
    try {
      const dadosAcidente = {
        tipo: 'Queda',
        local: 'Canteiro A',
        data: new Date().toISOString(),
        funcionario: 'João Silva',
        gravidade: 'Leve',
        descricao: 'Queda de altura de aproximadamente 2 metros'
      };
      
      await executeAction(moduleActions.seguranca.reportarAcidente, dadosAcidente);
      
      // Aqui você poderia atualizar a lista de acidentes
      console.log('Acidente reportado com sucesso!');
      
    } catch (error) {
      console.error('Erro ao reportar acidente:', error);
    } finally {
      setLoading(prev => ({ ...prev, acidente: false }));
    }
  };

  // Função para controle de EPIs
  const handleControleEPIs = async () => {
    setLoading(prev => ({ ...prev, epis: true }));
    
    try {
      const dadosEPI = {
        tipo: 'Capacete',
        quantidade: 50,
        acao: 'verificado',
        funcionario: 'Maria Santos'
      };
      
      await executeAction(moduleActions.seguranca.controleEPIs, 'verificado', dadosEPI);
      
      // Aqui você poderia atualizar o controle de EPIs
      console.log('EPI verificado com sucesso!');
      
    } catch (error) {
      console.error('Erro no controle de EPIs:', error);
    } finally {
      setLoading(prev => ({ ...prev, epis: false }));
    }
  };

  const SafetyCard = ({ title, value, subtitle, icon: Icon, color, trend }) => (
    <div className="bg-white rounded-lg p-6 shadow-sm border">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-2xl font-bold text-gray-900 mt-1">{value}</p>
          {subtitle && (
            <p className="text-sm text-gray-500 mt-1">{subtitle}</p>
          )}
          {trend && (
            <div className="flex items-center gap-1 mt-2">
              {trend === 'up' ? (
                <TrendingUp className="w-4 h-4 text-red-500" />
              ) : (
                <TrendingDown className="w-4 h-4 text-green-500" />
              )}
              <span className={`text-sm ${trend === 'up' ? 'text-red-600' : 'text-green-600'}`}>
                vs mês anterior
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

  const gravidadeData = [
    { name: 'Leves', value: seguranca.acidentes.gravidade.leves, color: '#10B981' },
    { name: 'Moderados', value: seguranca.acidentes.gravidade.moderados, color: '#F59E0B' },
    { name: 'Graves', value: seguranca.acidentes.gravidade.graves, color: '#EF4444' }
  ];

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Segurança do Trabalho</h1>
          <p className="text-gray-600 mt-1">
            Monitoramento de acidentes, EPIs e indicadores de segurança
          </p>
        </div>
        <div className="flex gap-3">
          <ActionButton 
            variant="danger" 
            icon={AlertTriangle}
            onClick={handleReportarAcidente}
            loading={loading.acidente}
            disabled={loading.acidente}
          >
            {loading.acidente ? 'Reportando...' : 'Reportar Acidente'}
          </ActionButton>
          <ActionButton 
            variant="primary" 
            icon={HardHat}
            onClick={handleControleEPIs}
            loading={loading.epis}
            disabled={loading.epis}
          >
            {loading.epis ? 'Verificando...' : 'Controle EPIs'}
          </ActionButton>
        </div>
      </div>

      {/* Cards de Indicadores */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                 <SafetyCard
           title="Acidentes no Mês"
           value={seguranca.acidentes?.mes || 0}
           subtitle={`Meta: ${seguranca.acidentes?.meta || 3}`}
           icon={AlertTriangle}
           color="bg-red-500"
           trend="down"
         />
         <SafetyCard
           title="Dias sem Acidentes"
           value={seguranca.indicadores?.diasSemAcidentes || 0}
           subtitle={`Record: ${seguranca.indicadores?.recordeDias || 120} dias`}
           icon={CheckCircle}
           color="bg-green-500"
         />
         <SafetyCard
           title="Conformidade EPIs"
           value={`${seguranca.epis?.conformidade || 0}%`}
           subtitle="Meta: 95%"
           icon={HardHat}
           color="bg-blue-500"
         />
         <SafetyCard
           title="Treinamentos Pendentes"
           value={seguranca.treinamentos?.pendentes || 0}
           subtitle={`${seguranca.treinamentos?.realizados || 0} realizados`}
           icon={Users}
           color="bg-yellow-500"
         />
      </div>

      {/* Gráficos Principais */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
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

        {/* Gravidade dos Acidentes */}
        <div className="bg-white rounded-lg p-6 shadow-sm border">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Acidentes por Gravidade (Ano)
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={gravidadeData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, value }) => `${name}: ${value}`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {gravidadeData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* EPIs e Indicadores */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Controle de EPIs */}
        <div className="lg:col-span-2 bg-white rounded-lg p-6 shadow-sm border">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Controle de EPIs
          </h3>
          <div className="space-y-4">
                         {epis.map((epi, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <HardHat className="w-5 h-5 text-blue-600" />
                  <div>
                    <p className="font-medium text-gray-900">{epi.nome}</p>
                    <p className="text-sm text-gray-600">Em uso: {epi.uso}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-medium text-gray-900">Estoque: {epi.estoque}</p>
                  <div className="flex items-center gap-1 mt-1">
                    {epi.estoque < 50 ? (
                      <>
                        <AlertTriangle className="w-4 h-4 text-red-500" />
                        <span className="text-sm text-red-600">Baixo</span>
                      </>
                    ) : (
                      <>
                        <CheckCircle className="w-4 h-4 text-green-500" />
                        <span className="text-sm text-green-600">OK</span>
                      </>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Indicadores de Segurança */}
        <div className="bg-white rounded-lg p-6 shadow-sm border">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Indicadores de Segurança
          </h3>
          <div className="space-y-4">
            <div className="p-4 bg-green-50 rounded-lg">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-green-600 font-medium">Taxa de Frequência</p>
                                     <p className="text-2xl font-bold text-green-900">
                     2.1
                   </p>
                   <p className="text-xs text-green-600">por 100.000 horas</p>
                </div>
                <TrendingDown className="w-8 h-8 text-green-500" />
              </div>
            </div>
            
            <div className="p-4 bg-blue-50 rounded-lg">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-blue-600 font-medium">Taxa de Gravidade</p>
                                     <p className="text-2xl font-bold text-blue-900">
                     0.8
                   </p>
                   <p className="text-xs text-blue-600">por 100.000 horas</p>
                </div>
                <TrendingDown className="w-8 h-8 text-blue-500" />
              </div>
            </div>
            
            <div className="p-4 bg-yellow-50 rounded-lg">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-yellow-600 font-medium">EPIs Vencidos</p>
                                     <p className="text-2xl font-bold text-yellow-900">
                     {seguranca.epis?.vencidos || 0}
                   </p>
                   <p className="text-xs text-yellow-600">próximos 30 dias</p>
                </div>
                <AlertTriangle className="w-8 h-8 text-yellow-500" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Treinamentos */}
      <div className="bg-white rounded-lg p-6 shadow-sm border">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Status dos Treinamentos de Segurança
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center p-6 bg-green-50 rounded-lg">
            <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-3" />
                         <p className="text-2xl font-bold text-green-900">{seguranca.treinamentos?.realizados || 0}</p>
            <p className="text-sm text-green-600">Treinamentos Realizados</p>
          </div>
          
          <div className="text-center p-6 bg-yellow-50 rounded-lg">
            <Clock className="w-12 h-12 text-yellow-500 mx-auto mb-3" />
                         <p className="text-2xl font-bold text-yellow-900">{seguranca.treinamentos?.pendentes || 0}</p>
            <p className="text-sm text-yellow-600">Treinamentos Pendentes</p>
          </div>
          
          <div className="text-center p-6 bg-red-50 rounded-lg">
            <AlertTriangle className="w-12 h-12 text-red-500 mx-auto mb-3" />
                         <p className="text-2xl font-bold text-red-900">{seguranca.treinamentos?.vencimentos || 0}</p>
            <p className="text-sm text-red-600">Vencimentos Próximos</p>
          </div>
        </div>
      </div>

      {/* Alertas de Segurança */}
      <div className="bg-white rounded-lg p-6 shadow-sm border">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Alertas de Segurança
        </h3>
        <div className="space-y-3">
          <div className="flex items-center gap-3 p-4 bg-red-50 border border-red-200 rounded-lg">
            <AlertTriangle className="w-5 h-5 text-red-500" />
            <div>
              <p className="font-medium text-red-900">EPIs com vencimento próximo</p>
              <p className="text-sm text-red-700">45 equipamentos vencem nos próximos 7 dias</p>
            </div>
          </div>
          
          <div className="flex items-center gap-3 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
            <Clock className="w-5 h-5 text-yellow-500" />
            <div>
              <p className="font-medium text-yellow-900">Treinamentos pendentes</p>
              <p className="text-sm text-yellow-700">12 funcionários com treinamento de segurança pendente</p>
            </div>
          </div>
          
          <div className="flex items-center gap-3 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <Eye className="w-5 h-5 text-blue-500" />
            <div>
              <p className="font-medium text-blue-900">Inspeção programada</p>
              <p className="text-sm text-blue-700">Inspeção de segurança do Setor A agendada para amanhã</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SegurancaModule;

