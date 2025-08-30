import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line } from 'recharts';
import { Calendar, FileText } from 'lucide-react';
import { getReportData, PERIODOS, AREAS } from '../../services/reportService';
import { exportReport } from '../../services/exportService';
import ReportFilters from './ReportFilters';
import { useToast } from '../ui/toast';

const ReportsPage = () => {
  const [area, setArea] = useState(AREAS.RH);
  const [periodo, setPeriodo] = useState(PERIODOS.MES);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [exporting, setExporting] = useState(false);
  const { showToast, ToastContainer } = useToast();

  // Carregar dados quando filtros mudarem
  useEffect(() => {
    setLoading(true);
    const reportData = getReportData({ area, periodo });
    setData(reportData);
    setLoading(false);
  }, [area, periodo]);

  // Função para exportar relatório
  const handleExport = async (format) => {
    if (!data) return;
    
    setExporting(true);
    try {
      const result = await exportReport(data, area, format);
      if (result.success) {
        showToast('Relatório exportado com sucesso!', 'success');
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



  // Função para renderizar badge de risco
  const getRiskBadge = (kpi) => {
    if (!kpi.risco) return null;
    
    return (
      <Badge variant={kpi.risco === 'critico' ? 'destructive' : 'secondary'} className="ml-2">
        {kpi.risco === 'critico' ? 'Crítico' : 'Atenção'}
      </Badge>
    );
  };

  // Função para renderizar tendência
  const getTendenciaIcon = (tendencia) => {
    switch (tendencia) {
      case 'subindo': return '↗';
      case 'descendo': return '↘';
      case 'estavel': return '→';
      default: return '';
    }
  };

  if (loading) {
    return (
      <div className="p-6">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/4 mb-6"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
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
          <h1 className="text-3xl font-bold text-gray-900">Relatórios</h1>
          <p className="text-gray-600 mt-1">
            Análise detalhada de KPIs e indicadores por área
          </p>
        </div>
        
        {/* Filtros */}
        <ReportFilters
          area={area}
          periodo={periodo}
          onAreaChange={setArea}
          onPeriodoChange={setPeriodo}
          onExport={handleExport}
          exporting={exporting}
        />
      </div>

      {/* Última atualização */}
      <div className="text-sm text-gray-500 flex items-center gap-2">
        <Calendar className="w-4 h-4" />
        Última atualização: {data?.ultimaAtualizacao ? new Date(data.ultimaAtualizacao).toLocaleString('pt-BR') : 'N/A'}
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {Object.entries(data?.kpis || {}).map(([key, kpi]) => (
          <Card key={key}>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="text-2xl font-bold">
                  {typeof kpi.valor === 'number' ? kpi.valor.toLocaleString('pt-BR') : kpi.valor}
                  {kpi.percentual && <span className="text-sm text-gray-500 ml-1">%</span>}
                </div>
                <div className="flex items-center gap-1">
                  {kpi.tendencia && (
                    <span className="text-lg">{getTendenciaIcon(kpi.tendencia)}</span>
                  )}
                  {getRiskBadge(kpi)}
                </div>
              </div>
              {kpi.meta && (
                <p className="text-sm text-gray-500 mt-1">
                  Meta: {kpi.meta}
                </p>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Gráficos */}
      {data?.series && data.series.length > 0 && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {data.series.map((serie, index) => (
            <Card key={index}>
              <CardHeader>
                <CardTitle className="text-lg">{serie.nome}</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  {serie.tipo === 'line' ? (
                    <LineChart data={serie.dados}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="mes" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Line 
                        type="monotone" 
                        dataKey="valor" 
                        stroke={serie.cor || "#3b82f6"} 
                        strokeWidth={2}
                      />
                    </LineChart>
                  ) : (
                    <BarChart data={serie.dados}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="mes" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      {serie.cores ? (
                        <>
                          <Bar dataKey="concluidas" fill={serie.cores[0]} />
                          <Bar dataKey="atrasadas" fill={serie.cores[1]} />
                        </>
                      ) : (
                        <Bar dataKey="valor" fill={serie.cor || "#3b82f6"} />
                      )}
                    </BarChart>
                  )}
                </ResponsiveContainer>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Tabelas */}
      {data?.tabelas && data.tabelas.length > 0 && (
        <div className="space-y-6">
          {data.tabelas.map((tabela, index) => (
            <Card key={index}>
              <CardHeader>
                <CardTitle className="text-lg">{tabela.titulo}</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      {tabela.colunas.map((coluna) => (
                        <TableHead key={coluna.key}>{coluna.label}</TableHead>
                      ))}
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {tabela.dados.map((row, rowIndex) => (
                      <TableRow key={rowIndex}>
                        {tabela.colunas.map((coluna) => (
                          <TableCell key={coluna.key}>
                            {row[coluna.key]}
                          </TableCell>
                        ))}
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Estado vazio */}
      {(!data || (!data.kpis && !data.series && !data.tabelas)) && (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <div className="text-gray-400 mb-4">
              <FileText className="w-12 h-12" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              Nenhum dado disponível
            </h3>
            <p className="text-gray-600 text-center">
              Não há dados para o período e área selecionados.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default ReportsPage;
