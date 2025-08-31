import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line } from 'recharts';
import { Building, TrendingUp, TrendingDown, Calendar, FileText } from 'lucide-react';
import { obrasService } from '../services/obrasService';
import { useToast } from './ui/toast';

const ObrasModule = () => {
  const navigate = useNavigate();
  const { showToast, ToastContainer } = useToast();
  const [loading, setLoading] = useState(true);
  const [obras, setObras] = useState([]);
  const [estatisticas, setEstatisticas] = useState(null);
  const [historico, setHistorico] = useState([]);

  useEffect(() => {
    carregarDados();
  }, []);

  const carregarDados = async () => {
    setLoading(true);
    try {
      const obrasData = await obrasService.getObras();
      const stats = await obrasService.getEstatisticas();
      
      setObras(obrasData);
      setEstatisticas(stats);
      
      // Simular dados históricos
      const historicoData = [
        { mes: 'Jan', obras: 8, progresso: 65 },
        { mes: 'Fev', obras: 10, progresso: 72 },
        { mes: 'Mar', obras: 12, progresso: 78 },
        { mes: 'Abr', obras: 11, progresso: 82 },
        { mes: 'Mai', obras: 13, progresso: 85 },
        { mes: 'Jun', obras: 12, progresso: 88 }
      ];
      setHistorico(historicoData);
    } catch (error) {
      console.error('Erro ao carregar dados Obras:', error);
      showToast('Erro ao carregar dados', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleNovaObra = () => {
    navigate('/obras/nova-obra');
  };

  const handleCronogramaGeral = () => {
    navigate('/obras/cronograma-geral');
  };

  const getStatusBadge = (obra) => {
    if (obra.status === 'concluida') {
      return <Badge variant="default">Concluída</Badge>;
    } else if (obra.progresso >= 80) {
      return <Badge variant="default">Finalização</Badge>;
    } else if (obra.progresso >= 50) {
      return <Badge variant="secondary">Em Andamento</Badge>;
    } else {
      return <Badge variant="destructive">Início</Badge>;
    }
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
          <h1 className="text-3xl font-bold text-gray-900">Gestão de Obras</h1>
          <p className="text-gray-600 mt-1">
            Controle de obras, cronogramas e indicadores de performance
          </p>
        </div>
        
        {/* Botões de Ação */}
        <div className="flex gap-3">
          <button
            onClick={handleNovaObra}
            className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
          >
            <Building className="w-4 h-4" />
            Nova Obra
          </button>
          
          <button
            onClick={handleCronogramaGeral}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Calendar className="w-4 h-4" />
            Cronograma Geral
          </button>
        </div>
      </div>

      {/* Cards de Estatísticas */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Obras</CardTitle>
            <Building className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{estatisticas?.totalObras || 0}</div>
            <p className="text-xs text-muted-foreground">
              Obras ativas
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Em Andamento</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{estatisticas?.emAndamento || 0}</div>
            <p className="text-xs text-muted-foreground">
              Obras ativas
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Progresso Médio</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{Math.round(estatisticas?.progressoMedio || 0)}%</div>
            <p className="text-xs text-muted-foreground">
              Média geral
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Cronograma</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{estatisticas?.cronograma || 0}%</div>
            <p className="text-xs text-muted-foreground">
              No prazo
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Gráficos */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Progresso das Obras</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={obras}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="codigo" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="progresso" fill="#3b82f6" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Evolução Histórica</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={historico}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="mes" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="obras" stroke="#3b82f6" />
                <Line type="monotone" dataKey="progresso" stroke="#10b981" />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Tabela de Obras */}
      <Card>
        <CardHeader>
          <CardTitle>Obras Ativas</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Código</TableHead>
                <TableHead>Obra</TableHead>
                <TableHead>Tipo</TableHead>
                <TableHead>Responsável</TableHead>
                <TableHead>Progresso</TableHead>
                <TableHead>Prazo</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {obras.map((obra) => (
                <TableRow key={obra.id}>
                  <TableCell className="font-medium">{obra.codigo}</TableCell>
                  <TableCell>
                    <div>
                      <div className="font-medium">{obra.nome}</div>
                      <div className="text-sm text-gray-500">{obra.endereco}</div>
                    </div>
                  </TableCell>
                  <TableCell>{obra.tipo}</TableCell>
                  <TableCell>{obra.responsavel}</TableCell>
                  <TableCell>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>{obra.progresso}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-blue-600 h-2 rounded-full" 
                          style={{ width: `${obra.progresso}%` }}
                        />
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    {new Date(obra.prazo).toLocaleDateString('pt-BR')}
                  </TableCell>
                  <TableCell>
                    {getStatusBadge(obra)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default ObrasModule;

