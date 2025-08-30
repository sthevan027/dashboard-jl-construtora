import { funcionarios, seguranca, obras, kpis, historico } from '../data/mockData.js';

// Tipos de período disponíveis
export const PERIODOS = {
  MES: 'mes',
  TRIMESTRE: 'trimestre', 
  ANO: 'ano'
};

// Áreas disponíveis
export const AREAS = {
  RH: 'rh',
  SEGURANCA: 'seguranca',
  OBRAS: 'obras'
};

// Configurações padrão
const DEFAULT_SETTINGS = {
  metas: {
    rotatividade: 12,
    acidentesMes: 2,
    percentualEPI: 95,
    cronograma: 90
  },
  limiares: {
    acidentesCritico: 5,
    rotatividadeCritico: 20
  }
};

/**
 * Obtém dados filtrados por período e área
 */
export const getReportData = ({ area, periodo, settings = DEFAULT_SETTINGS }) => {
  const data = {
    kpis: {},
    series: [],
    tabelas: [],
    ultimaAtualizacao: new Date().toISOString()
  };

  switch (area) {
    case AREAS.RH:
      data.kpis = getRHKPIs(settings);
      data.series = getRHSeries(periodo);
      data.tabelas = getRHTabelas();
      break;
    
    case AREAS.SEGURANCA:
      data.kpis = getSegurancaKPIs(settings);
      data.series = getSegurancaSeries(periodo);
      data.tabelas = getSegurancaTabelas();
      break;
    
    case AREAS.OBRAS:
      data.kpis = getObrasKPIs(settings);
      data.series = getObrasSeries(periodo);
      data.tabelas = getObrasTabelas();
      break;
    
    default:
      // Dashboard geral
      data.kpis = {
        ...getRHKPIs(settings),
        ...getSegurancaKPIs(settings),
        ...getObrasKPIs(settings)
      };
      data.series = [
        ...getRHSeries(periodo),
        ...getSegurancaSeries(periodo),
        ...getObrasSeries(periodo)
      ];
      data.tabelas = [
        ...getRHTabelas(),
        ...getSegurancaTabelas(),
        ...getObrasTabelas()
      ];
  }

  return data;
};

/**
 * Calcula KPIs de RH vs metas
 */
const getRHKPIs = (settings) => {
  const { rotatividade, horasExtras } = funcionarios;
  
  return {
    rotatividade: {
      valor: rotatividade.mensal,
      meta: settings.metas.rotatividade,
      tendencia: rotatividade.mensal > settings.metas.rotatividade ? 'subindo' : 'descendo',
      risco: rotatividade.mensal > settings.limiares.rotatividadeCritico ? 'critico' : 'normal'
    },
    funcionariosAtivos: {
      valor: rotatividade.ativos,
      total: rotatividade.total,
      percentual: Math.round((rotatividade.ativos / rotatividade.total) * 100)
    },
    horasExtras: {
      valor: horasExtras.mes,
      limite: horasExtras.limite,
      custo: horasExtras.custo,
      percentual: Math.round((horasExtras.mes / horasExtras.limite) * 100)
    }
  };
};

/**
 * Calcula KPIs de Segurança vs metas
 */
const getSegurancaKPIs = (settings) => {
  const { acidentes, epis, indicadores } = seguranca;
  
  return {
    acidentes: {
      valor: acidentes.mes,
      meta: settings.metas.acidentesMes,
      tendencia: acidentes.mes < settings.metas.acidentesMes ? 'descendo' : 'subindo',
      risco: acidentes.mes > settings.limiares.acidentesCritico ? 'critico' : 'normal'
    },
    diasSemAcidentes: {
      valor: indicadores.diasSemAcidentes,
      recorde: indicadores.recordeDias,
      percentual: Math.round((indicadores.diasSemAcidentes / indicadores.recordeDias) * 100)
    },
    conformidadeEPI: {
      valor: epis.conformidade,
      meta: settings.metas.percentualEPI,
      tendencia: epis.conformidade >= settings.metas.percentualEPI ? 'estavel' : 'descendo'
    },
    treinamentos: {
      realizados: epis.treinamentos.realizados,
      pendentes: epis.treinamentos.pendentes,
      percentual: Math.round((epis.treinamentos.realizados / (epis.treinamentos.realizados + epis.treinamentos.pendentes)) * 100)
    }
  };
};

/**
 * Calcula KPIs de Obras vs metas
 */
const getObrasKPIs = (settings) => {
  const { cronograma, projetos } = obras;
  
  return {
    cronograma: {
      valor: cronograma.noPrazo,
      meta: settings.metas.cronograma,
      tendencia: cronograma.noPrazo >= settings.metas.cronograma ? 'estavel' : 'descendo'
    },
    projetosAtivos: {
      valor: obras.emAndamento,
      total: obras.total,
      percentual: Math.round((obras.emAndamento / obras.total) * 100)
    },
    projetosAtrasados: {
      valor: obras.atrasadas,
      percentual: Math.round((obras.atrasadas / obras.total) * 100)
    }
  };
};

/**
 * Obtém séries históricas de RH
 */
const getRHSeries = (periodo) => {
  return [
    {
      nome: 'Rotatividade Mensal',
      dados: historico.rotatividade,
      tipo: 'line',
      cor: '#3b82f6'
    }
  ];
};

/**
 * Obtém séries históricas de Segurança
 */
const getSegurancaSeries = (periodo) => {
  return [
    {
      nome: 'Acidentes Mensais',
      dados: historico.acidentes,
      tipo: 'bar',
      cor: '#ef4444'
    }
  ];
};

/**
 * Obtém séries históricas de Obras
 */
const getObrasSeries = (periodo) => {
  return [
    {
      nome: 'Projetos Concluídos vs Atrasados',
      dados: historico.obras,
      tipo: 'bar',
      cores: ['#10b981', '#f59e0b']
    }
  ];
};

/**
 * Obtém tabelas de dados de RH
 */
const getRHTabelas = () => {
  return [
    {
      titulo: 'Funcionários por Departamento',
      dados: funcionarios.departamentos,
      colunas: [
        { key: 'nome', label: 'Departamento' },
        { key: 'funcionarios', label: 'Funcionários' },
        { key: 'rotatividade', label: 'Rotatividade (%)' }
      ]
    }
  ];
};

/**
 * Obtém tabelas de dados de Segurança
 */
const getSegurancaTabelas = () => {
  return [
    {
      titulo: 'EPIs em Estoque',
      dados: seguranca.epis.tipos,
      colunas: [
        { key: 'nome', label: 'Tipo de EPI' },
        { key: 'estoque', label: 'Em Estoque' },
        { key: 'uso', label: 'Em Uso' }
      ]
    }
  ];
};

/**
 * Obtém tabelas de dados de Obras
 */
const getObrasTabelas = () => {
  return [
    {
      titulo: 'Projetos em Andamento',
      dados: obras.projetos.filter(p => p.status === 'Em Andamento'),
      colunas: [
        { key: 'nome', label: 'Projeto' },
        { key: 'progresso', label: 'Progresso (%)' },
        { key: 'prazo', label: 'Prazo' },
        { key: 'responsavel', label: 'Responsável' }
      ]
    }
  ];
};

/**
 * Obtém última atualização
 */
export const getLastUpdated = () => {
  return new Date().toISOString();
};

/**
 * Formata dados para exportação
 */
export const formatDataForExport = (data, area) => {
  const { kpis, series, tabelas } = data;
  
  return {
    area: area.toUpperCase(),
    dataGeracao: new Date().toLocaleString('pt-BR'),
    kpis: Object.entries(kpis).map(([key, value]) => ({
      indicador: key,
      valor: value.valor || value,
      meta: value.meta || '-',
      tendencia: value.tendencia || '-'
    })),
    tabelas: tabelas.map(tabela => ({
      titulo: tabela.titulo,
      dados: tabela.dados
    }))
  };
};
