import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line } from 'recharts';
import { Shield, AlertTriangle, TrendingUp, TrendingDown, FileText, Edit } from 'lucide-react';
import { segurancaService } from '../services/segurancaService';
import { useToast } from './ui/toast';

const SegurancaModule = () => {
  const navigate = useNavigate();
  const { showToast, ToastContainer } = useToast();
  const [loading, setLoading] = useState(true);
  const [seguranca, setSeguranca] = useState(null);
  const [epis, setEpis] = useState([]);
  const [treinamentos, setTreinamentos] = useState([]);
  const [historico, setHistorico] = useState([]);

  useEffect(() => {
    carregarDados();
  }, []);

  const carregarDados = async () => {
    setLoading(true);
    try {
      const stats = await segurancaService.getEstatisticas();
      const episData = await segurancaService.getEPIs();
      const treinamentosData = await segurancaService.getTreinamentos();
      
      setSeguranca(stats);
      setEpis(episData);
      setTreinamentos(treinamentosData);
      
      // Simular dados históricos
      const historicoData = [
        { mes: 'Jan', acidentes: 3, conformidade: 88 },
        { mes: 'Fev', acidentes: 2, conformidade: 92 },
        { mes: 'Mar', acidentes: 1, conformidade: 95 },
        { mes: 'Abr', acidentes: 2, conformidade: 90 },
        { mes: 'Mai', acidentes: 0, conformidade: 98 },
        { mes: 'Jun', acidentes: 2, conformidade: 92 }
      ];
      setHistorico(historicoData);
    } catch (error) {
      console.error('Erro ao carregar dados Segurança:', error);
      showToast('Erro ao carregar dados', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleReportarAcidente = () => {
    navigate('/seguranca/reportar-acidente');
  };

  const handleControleEPIs = () => {
    navigate('/seguranca/controle-epis');
  };

  if (loading) {
    return (
      <div className="p-6">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/4 mb-6"></div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            {[1, 2, 3, 4].map(i => (
              <div key={i} className="h-32 bg-gray-200 rounded"></div>
            ))}
          </div>
          <div className="h-64 bg-gray-200 rounded"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      <ToastContainer />
      
      {/* Cabeçalho */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Segurança do Trabalho</h1>
          <p className="text-gray-600 mt-1">
            Gestão de EPIs, acidentes e treinamentos de segurança
          </p>
        </div>
        
        {/* Botões de Ação */}
        <div className="flex gap-3">
          <button
            onClick={handleReportarAcidente}
            className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
          >
            <AlertTriangle className="w-4 h-4" />
            Reportar Acidente
          </button>
          
          <button
            onClick={handleControleEPIs}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Shield className="w-4 h-4" />
            Controle EPIs
          </button>
        </div>
      </div>

      {/* Cards de Estatísticas */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Acidentes no Mês</CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{seguranca?.acidentesMes || 0}</div>
            <p className="text-xs text-muted-foreground">
              Meta: 3 acidentes
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Dias Sem Acidentes</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{seguranca?.diasSemAcidentes || 0}</div>
            <p className="text-xs text-muted-foreground">
              Recorde: 120 dias
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Conformidade EPIs</CardTitle>
            <Shield className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{seguranca?.conformidadeEPIs || 0}%</div>
            <p className="text-xs text-muted-foreground">
              Meta: 95%
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Treinamentos Pendentes</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{seguranca?.treinamentosPendentes || 0}</div>
            <p className="text-xs text-muted-foreground">
              Necessitam atenção
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Gráficos */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Acidentes vs Conformidade</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={historico}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="mes" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="acidentes" stroke="#ef4444" />
                <Line type="monotone" dataKey="conformidade" stroke="#10b981" />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>EPIs em Estoque</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={epis}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="nome" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="estoque" fill="#3b82f6" />
                <Bar dataKey="em_uso" fill="#f59e0b" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Tabelas */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* EPIs */}
        <Card>
          <CardHeader>
            <CardTitle>Inventário de EPIs</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>EPI</TableHead>
                  <TableHead>Estoque</TableHead>
                  <TableHead>Em Uso</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {epis.slice(0, 5).map((epi) => (
                  <TableRow key={epi.id}>
                    <TableCell className="font-medium">{epi.nome}</TableCell>
                    <TableCell>{epi.estoque}</TableCell>
                    <TableCell>{epi.em_uso}</TableCell>
                    <TableCell>
                      <Badge variant={epi.estoque < 10 ? 'destructive' : 'default'}>
                        {epi.estoque < 10 ? 'Baixo' : 'OK'}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Treinamentos */}
        <Card>
          <CardHeader>
            <CardTitle>Treinamentos</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Treinamento</TableHead>
                  <TableHead>Vencimento</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {treinamentos.slice(0, 5).map((treinamento) => (
                  <TableRow key={treinamento.id}>
                    <TableCell className="font-medium">{treinamento.nome}</TableCell>
                    <TableCell>
                      {new Date(treinamento.vencimento).toLocaleDateString('pt-BR')}
                    </TableCell>
                    <TableCell>
                      <Badge variant={treinamento.status === 'pendente' ? 'destructive' : 'default'}>
                        {treinamento.status}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SegurancaModule;

