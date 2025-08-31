import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Badge } from '../../components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../components/ui/table';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { useToast } from '../../components/ui/toast';
import { rhService } from '../../services/rhService';
import { exportReport } from '../../services/exportService';
import { ArrowLeft, Download, FileText, Users, TrendingUp, TrendingDown } from 'lucide-react';

const RelatorioMensalPage = () => {
  const navigate = useNavigate();
  const { showToast, ToastContainer } = useToast();
  const [loading, setLoading] = useState(true);
  const [exporting, setExporting] = useState(false);
  const [relatorio, setRelatorio] = useState(null);
  const [mes, setMes] = useState(new Date().getMonth() + 1);
  const [ano, setAno] = useState(new Date().getFullYear());

  useEffect(() => {
    carregarRelatorio();
  }, [mes, ano]);

  const carregarRelatorio = async () => {
    setLoading(true);
    try {
      const dados = await rhService.gerarRelatorioMensal(mes, ano);
      setRelatorio(dados);
    } catch (error) {
      console.error('Erro ao carregar relatório:', error);
      showToast('Erro ao carregar relatório', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleExport = async (format) => {
    if (!relatorio) return;
    
    setExporting(true);
    try {
      const result = await exportReport(relatorio, 'rh', format);
      if (result.success) {
        showToast(`Relatório exportado com sucesso!`, 'success');
      } else {
        showToast(`Erro na exportação: ${result.message}`, 'error');
      }
    } catch (error) {
      console.error('Erro na exportação:', error);
      showToast('Falha ao exportar relatório', 'error');
    } finally {
      setExporting(false);
    }
  };

  const meses = [
    'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
    'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
  ];

  const anos = Array.from({ length: 5 }, (_, i) => new Date().getFullYear() - i);

  if (loading) {
    return (
      <div className="p-6">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/4 mb-6"></div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            {[1, 2, 3].map(i => (
              <div key={i} className="h-32 bg-gray-200 rounded"></div>
            ))}
          </div>
          <div className="h-64 bg-gray-200 rounded"></div>
        </div>
      </div>
    );
  }

  if (!relatorio) {
    return (
      <div className="p-6">
        <div className="text-center">
          <p className="text-gray-600">Nenhum dado encontrado para o período selecionado.</p>
        </div>
      </div>
    );
  }

  // Dados para gráficos
  const dadosDepartamentos = relatorio.departamentos.map(dept => ({
    name: dept.nome,
    funcionarios: dept.funcionarios_count,
    rotatividade: dept.rotatividade
  }));

  const dadosKPIs = relatorio.kpis.map(kpi => ({
    name: kpi.nome.replace('_', ' ').toUpperCase(),
    valor: kpi.valor,
    meta: kpi.meta
  }));

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];

  return (
    <div className="p-6 space-y-6">
      <ToastContainer />
      
      {/* Cabeçalho */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button
            variant="outline"
            size="sm"
            onClick={() => navigate('/rh')}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Voltar
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Relatório Mensal - RH</h1>
            <p className="text-gray-600 mt-1">
              {meses[mes - 1]} de {ano}
            </p>
          </div>
        </div>

        {/* Filtros */}
        <div className="flex gap-4">
          <select
            value={mes}
            onChange={(e) => setMes(parseInt(e.target.value))}
            className="px-3 py-2 border border-gray-300 rounded-md"
          >
            {meses.map((nome, index) => (
              <option key={index + 1} value={index + 1}>{nome}</option>
            ))}
          </select>
          
          <select
            value={ano}
            onChange={(e) => setAno(parseInt(e.target.value))}
            className="px-3 py-2 border border-gray-300 rounded-md"
          >
            {anos.map(ano => (
              <option key={ano} value={ano}>{ano}</option>
            ))}
          </select>

          <Button
            onClick={() => handleExport('pdf')}
            disabled={exporting}
            className="flex items-center gap-2"
          >
            <Download className="w-4 h-4" />
            {exporting ? 'Exportando...' : 'PDF'}
          </Button>
        </div>
      </div>

      {/* Resumo */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Funcionários</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{relatorio.totalFuncionarios}</div>
            <p className="text-xs text-muted-foreground">
              Funcionários ativos
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Departamentos</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{relatorio.departamentos.length}</div>
            <p className="text-xs text-muted-foreground">
              Departamentos ativos
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Rotatividade Média</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {relatorio.kpis.find(k => k.nome === 'rotatividade')?.valor || 0}%
            </div>
            <p className="text-xs text-muted-foreground">
              Taxa de rotatividade
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
              <BarChart data={dadosDepartamentos}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="funcionarios" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>KPIs do Mês</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={dadosKPIs}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="valor" fill="#82ca9d" />
                <Bar dataKey="meta" fill="#ffc658" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Tabela de Funcionários */}
      <Card>
        <CardHeader>
          <CardTitle>Funcionários Cadastrados</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nome</TableHead>
                <TableHead>Cargo</TableHead>
                <TableHead>Departamento</TableHead>
                <TableHead>Salário</TableHead>
                <TableHead>Data Admissão</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {relatorio.funcionarios.map((funcionario) => (
                <TableRow key={funcionario.id}>
                  <TableCell className="font-medium">{funcionario.nome}</TableCell>
                  <TableCell>{funcionario.cargo}</TableCell>
                  <TableCell>{funcionario.departamento}</TableCell>
                  <TableCell>R$ {funcionario.salario.toLocaleString('pt-BR')}</TableCell>
                  <TableCell>
                    {new Date(funcionario.data_admissao).toLocaleDateString('pt-BR')}
                  </TableCell>
                  <TableCell>
                    <Badge variant={funcionario.status === 'ativo' ? 'default' : 'secondary'}>
                      {funcionario.status}
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

export default RelatorioMensalPage;
