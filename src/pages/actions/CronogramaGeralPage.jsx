import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Badge } from '../../components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../components/ui/table';
import { Progress } from '../../components/ui/progress';
import { useToast } from '../../components/ui/toast';
import { obrasService } from '../../services/obrasService';
import { exportReport } from '../../services/exportService';
import { ArrowLeft, Calendar, Download, TrendingUp, AlertTriangle, CheckCircle } from 'lucide-react';

const CronogramaGeralPage = () => {
  const navigate = useNavigate();
  const { showToast, ToastContainer } = useToast();
  const [loading, setLoading] = useState(true);
  const [exporting, setExporting] = useState(false);
  const [cronograma, setCronograma] = useState(null);

  useEffect(() => {
    carregarCronograma();
  }, []);

  const carregarCronograma = async () => {
    setLoading(true);
    try {
      const dados = await obrasService.gerarCronogramaGeral();
      setCronograma(dados);
    } catch (error) {
      console.error('Erro ao carregar cronograma:', error);
      showToast('Erro ao carregar cronograma', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleExport = async (format) => {
    if (!cronograma) return;
    
    setExporting(true);
    try {
      const result = await exportReport(cronograma, 'obras', format);
      if (result.success) {
        showToast(`Cronograma exportado com sucesso!`, 'success');
      } else {
        showToast(`Erro na exportação: ${result.message}`, 'error');
      }
    } catch (error) {
      console.error('Erro na exportação:', error);
      showToast('Falha ao exportar cronograma', 'error');
    } finally {
      setExporting(false);
    }
  };

  const getStatusCronograma = (obra) => {
    if (obra.statusCronograma === 'no_prazo') {
      return <Badge variant="default" className="flex items-center gap-1"><CheckCircle className="w-3 h-3" />No Prazo</Badge>;
    } else if (obra.statusCronograma === 'atrasado') {
      return <Badge variant="secondary" className="flex items-center gap-1"><AlertTriangle className="w-3 h-3" />Atrasado</Badge>;
    } else {
      return <Badge variant="destructive" className="flex items-center gap-1"><AlertTriangle className="w-3 h-3" />Crítico</Badge>;
    }
  };

  const getProgressColor = (progresso) => {
    if (progresso >= 80) return 'bg-green-500';
    if (progresso >= 60) return 'bg-yellow-500';
    if (progresso >= 40) return 'bg-orange-500';
    return 'bg-red-500';
  };

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

  if (!cronograma) {
    return (
      <div className="p-6">
        <div className="text-center">
          <p className="text-gray-600">Nenhum dado encontrado.</p>
        </div>
      </div>
    );
  }

  // Estatísticas
  const totalObras = cronograma.obras.length;
  const obrasNoPrazo = cronograma.obras.filter(o => o.statusCronograma === 'no_prazo').length;
  const obrasAtrasadas = cronograma.obras.filter(o => o.statusCronograma === 'atrasado').length;
  const obrasCriticas = cronograma.obras.filter(o => o.statusCronograma === 'critico').length;
  const progressoMedio = cronograma.obras.reduce((sum, obra) => sum + obra.progresso, 0) / totalObras;

  return (
    <div className="p-6 space-y-6">
      <ToastContainer />
      
      {/* Cabeçalho */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button
            variant="outline"
            size="sm"
            onClick={() => navigate('/obras')}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Voltar
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Cronograma Geral</h1>
            <p className="text-gray-600 mt-1">Visão geral de todas as obras e prazos</p>
          </div>
        </div>

        <Button
          onClick={() => handleExport('pdf')}
          disabled={exporting}
          className="flex items-center gap-2"
        >
          <Download className="w-4 h-4" />
          {exporting ? 'Exportando...' : 'PDF'}
        </Button>
      </div>

      {/* Resumo */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Obras</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalObras}</div>
            <p className="text-xs text-muted-foreground">
              Obras ativas
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">No Prazo</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{obrasNoPrazo}</div>
            <p className="text-xs text-muted-foreground">
              {totalObras > 0 ? Math.round((obrasNoPrazo / totalObras) * 100) : 0}% do total
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Atrasadas</CardTitle>
            <AlertTriangle className="h-4 w-4 text-yellow-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">{obrasAtrasadas}</div>
            <p className="text-xs text-muted-foreground">
              {totalObras > 0 ? Math.round((obrasAtrasadas / totalObras) * 100) : 0}% do total
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Progresso Médio</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{Math.round(progressoMedio)}%</div>
            <p className="text-xs text-muted-foreground">
              Média geral
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Tabela de Cronograma */}
      <Card>
        <CardHeader>
          <CardTitle>Cronograma Detalhado</CardTitle>
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
                <TableHead>Dias Restantes</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {cronograma.obras.map((obra) => (
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
                      <Progress value={obra.progresso} className="h-2" />
                    </div>
                  </TableCell>
                  <TableCell>
                    {new Date(obra.prazo).toLocaleDateString('pt-BR')}
                  </TableCell>
                  <TableCell>
                    <span className={obra.prazoRestante < 0 ? 'text-red-600 font-medium' : 'text-gray-600'}>
                      {obra.prazoRestante < 0 ? `${Math.abs(obra.prazoRestante)} dias atrasado` : `${obra.prazoRestante} dias`}
                    </span>
                  </TableCell>
                  <TableCell>
                    {getStatusCronograma(obra)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Obras Críticas */}
      {obrasCriticas > 0 && (
        <Card className="border-red-200 bg-red-50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-red-800">
              <AlertTriangle className="w-5 h-5" />
              Obras em Situação Crítica
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {cronograma.obras
                .filter(obra => obra.statusCronograma === 'critico')
                .map((obra) => (
                  <div key={obra.id} className="bg-white p-4 rounded-lg border border-red-200">
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-medium text-red-800">{obra.codigo}</h4>
                      <Badge variant="destructive">Crítico</Badge>
                    </div>
                    <p className="text-sm text-gray-700 mb-2">{obra.nome}</p>
                    <div className="text-xs text-gray-500">
                      <p>Progresso: {obra.progresso}%</p>
                      <p>Prazo: {new Date(obra.prazo).toLocaleDateString('pt-BR')}</p>
                      <p className="text-red-600 font-medium">
                        {obra.prazoRestante < 0 ? `${Math.abs(obra.prazoRestante)} dias atrasado` : `${obra.prazoRestante} dias restantes`}
                      </p>
                    </div>
                  </div>
                ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default CronogramaGeralPage;
