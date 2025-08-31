import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line } from 'recharts';
import { Users, TrendingUp, TrendingDown, UserPlus, FileText } from 'lucide-react';
import { rhService } from '../services/rhService';
import { useToast } from './ui/toast';

const RHModule = () => {
  const navigate = useNavigate();
  const { showToast, ToastContainer } = useToast();
  const [loading, setLoading] = useState(true);
  const [estatisticas, setEstatisticas] = useState(null);
  const [departamentos, setDepartamentos] = useState([]);
  const [historico, setHistorico] = useState([]);

  useEffect(() => {
    carregarDados();
  }, []);

  const carregarDados = async () => {
    setLoading(true);
    try {
      const stats = await rhService.getEstatisticas();
      const depts = await rhService.getDepartamentos();
      
      setEstatisticas(stats);
      setDepartamentos(depts);
      
      // Simular dados históricos
      const historicoData = [
        { mes: 'Jan', funcionarios: 75, rotatividade: 8.2 },
        { mes: 'Fev', funcionarios: 78, rotatividade: 7.8 },
        { mes: 'Mar', funcionarios: 80, rotatividade: 8.5 },
        { mes: 'Abr', funcionarios: 82, rotatividade: 7.9 },
        { mes: 'Mai', funcionarios: 85, rotatividade: 8.1 },
        { mes: 'Jun', funcionarios: 88, rotatividade: 7.5 }
      ];
      setHistorico(historicoData);
    } catch (error) {
      console.error('Erro ao carregar dados RH:', error);
      showToast('Erro ao carregar dados', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleNovoFuncionario = () => {
    navigate('/rh/novo-funcionario');
  };

  const handleRelatorioMensal = () => {
    navigate('/rh/relatorio-mensal');
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
          <h1 className="text-3xl font-bold text-gray-900">Recursos Humanos</h1>
          <p className="text-gray-600 mt-1">
            Gestão de funcionários, departamentos e indicadores de RH
          </p>
        </div>
        
        {/* Botões de Ação */}
        <div className="flex gap-3">
          <button
            onClick={handleNovoFuncionario}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <UserPlus className="w-4 h-4" />
            Novo Funcionário
          </button>
          
          <button
            onClick={handleRelatorioMensal}
            className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
          >
            <FileText className="w-4 h-4" />
            Relatório Mensal
          </button>
        </div>
      </div>

      {/* Cards de Estatísticas */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Funcionários</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{estatisticas?.totalFuncionarios || 0}</div>
            <p className="text-xs text-muted-foreground">
              Funcionários ativos
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Departamentos</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{estatisticas?.departamentos || 0}</div>
            <p className="text-xs text-muted-foreground">
              Departamentos ativos
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Rotatividade</CardTitle>
            <TrendingDown className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{estatisticas?.rotatividade || 0}%</div>
            <p className="text-xs text-muted-foreground">
              Taxa mensal
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Horas Extras</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{estatisticas?.horasExtras || 0}h</div>
            <p className="text-xs text-muted-foreground">
              Total do mês
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Gráficos */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Funcionários por Departamento</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={departamentos}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="nome" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="funcionarios_count" fill="#8884d8" />
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
                <Line type="monotone" dataKey="funcionarios" stroke="#8884d8" />
                <Line type="monotone" dataKey="rotatividade" stroke="#82ca9d" />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Tabela de Departamentos */}
      <Card>
        <CardHeader>
          <CardTitle>Departamentos</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Departamento</TableHead>
                <TableHead>Funcionários</TableHead>
                <TableHead>Rotatividade</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {departamentos.map((dept) => (
                <TableRow key={dept.id}>
                  <TableCell className="font-medium">{dept.nome}</TableCell>
                  <TableCell>{dept.funcionarios_count}</TableCell>
                  <TableCell>{dept.rotatividade}%</TableCell>
                  <TableCell>
                    <Badge variant={dept.rotatividade > 10 ? 'destructive' : 'default'}>
                      {dept.rotatividade > 10 ? 'Alta' : 'Normal'}
                    </Badge>
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

export default RHModule;

