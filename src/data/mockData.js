// Dados mock para o Dashboard JL Construtora

export const funcionarios = {
  total: 487,
  ativos: 465,
  afastados: 22,
  rotatividade: {
    mensal: 15,
    anual: 35,
    meta: 20
  },
  departamentos: [
    { nome: 'Obras', funcionarios: 320, rotatividade: 18 },
    { nome: 'Administrativo', funcionarios: 85, rotatividade: 8 },
    { nome: 'Engenharia', funcionarios: 45, rotatividade: 12 },
    { nome: 'Segurança', funcionarios: 25, rotatividade: 5 },
    { nome: 'Outros', funcionarios: 12, rotatividade: 10 }
  ],
  horasExtras: {
    mes: 2840,
    custo: 125000,
    limite: 3000
  }
};

export const seguranca = {
  acidentes: {
    mes: 3,
    ano: 28,
    meta: 15,
    gravidade: {
      leves: 18,
      moderados: 8,
      graves: 2
    }
  },
  epis: {
    conformidade: 98,
    distribuidos: 1250,
    vencidos: 45,
    tipos: [
      { nome: 'Capacetes', estoque: 150, uso: 487 },
      { nome: 'Luvas', estoque: 200, uso: 465 },
      { nome: 'Óculos', estoque: 80, uso: 320 },
      { nome: 'Cintos', estoque: 45, uso: 180 },
      { nome: 'Botas', estoque: 120, uso: 487 }
    ]
  },
  treinamentos: {
    realizados: 85,
    pendentes: 12,
    vencimentos: 8
  },
  indicadores: {
    diasSemAcidentes: 45,
    recordeDias: 120,
    taxaFrequencia: 2.1,
    taxaGravidade: 0.8
  }
};

export const obras = {
  total: 12,
  emAndamento: 8,
  concluidas: 3,
  atrasadas: 1,
  cronograma: {
    noPrazo: 85,
    atrasadas: 15
  },
  projetos: [
    {
      id: 1,
      nome: 'Ampliação Galpão A',
      progresso: 75,
      prazo: '2024-03-15',
      status: 'Em Andamento',
      responsavel: 'João Silva',
      orcamento: 850000,
      gasto: 637500
    },
    {
      id: 2,
      nome: 'Reforma Escritório Central',
      progresso: 45,
      prazo: '2024-02-28',
      status: 'Atrasado',
      responsavel: 'Maria Santos',
      orcamento: 320000,
      gasto: 180000
    },
    {
      id: 3,
      nome: 'Construção Almoxarifado',
      progresso: 90,
      prazo: '2024-01-30',
      status: 'Em Andamento',
      responsavel: 'Pedro Costa',
      orcamento: 450000,
      gasto: 425000
    },
    {
      id: 4,
      nome: 'Instalação Elétrica Setor B',
      progresso: 100,
      prazo: '2024-01-15',
      status: 'Concluído',
      responsavel: 'Ana Lima',
      orcamento: 180000,
      gasto: 175000
    }
  ],
  recursos: {
    equipamentos: {
      disponiveis: 45,
      emUso: 38,
      manutencao: 7
    },
    materiais: {
      estoque: 'Adequado',
      pedidos: 12,
      entregas: 8
    }
  }
};

export const financeiro = {
  custos: {
    folhaPagamento: 2850000,
    acidentes: 180000,
    horasExtras: 125000,
    atrasos: 320000,
    total: 3475000
  },
  economia: {
    potencial: 1300000,
    realizada: 0,
    meta: 800000
  }
};

export const alertas = [
  {
    id: 1,
    tipo: 'urgente',
    categoria: 'Segurança',
    titulo: 'EPIs vencendo',
    descricao: '45 EPIs com vencimento em 7 dias',
    timestamp: '2024-01-20T10:30:00'
  },
  {
    id: 2,
    tipo: 'atencao',
    categoria: 'RH',
    titulo: 'Meta de rotatividade',
    descricao: 'Rotatividade mensal acima da meta (15% vs 12%)',
    timestamp: '2024-01-20T09:15:00'
  },
  {
    id: 3,
    tipo: 'info',
    categoria: 'Obras',
    titulo: 'Projeto concluído',
    descricao: 'Instalação Elétrica Setor B finalizada',
    timestamp: '2024-01-19T16:45:00'
  },
  {
    id: 4,
    tipo: 'urgente',
    categoria: 'Obras',
    titulo: 'Atraso no cronograma',
    descricao: 'Reforma Escritório Central com 5 dias de atraso',
    timestamp: '2024-01-19T14:20:00'
  }
];

export const kpis = {
  rh: {
    rotatividade: { valor: 15, meta: 12, tendencia: 'subindo' },
    absenteismo: { valor: 3.2, meta: 2.5, tendencia: 'estavel' },
    satisfacao: { valor: 7.8, meta: 8.0, tendencia: 'subindo' },
    horasExtras: { valor: 2840, meta: 2500, tendencia: 'subindo' }
  },
  seguranca: {
    acidentes: { valor: 3, meta: 2, tendencia: 'descendo' },
    diasSemAcidentes: { valor: 45, meta: 60, tendencia: 'subindo' },
    conformidadeEPI: { valor: 98, meta: 95, tendencia: 'estavel' },
    treinamentos: { valor: 85, meta: 90, tendencia: 'subindo' }
  },
  obras: {
    cronograma: { valor: 85, meta: 90, tendencia: 'estavel' },
    orcamento: { valor: 92, meta: 95, tendencia: 'descendo' },
    qualidade: { valor: 88, meta: 90, tendencia: 'subindo' },
    produtividade: { valor: 78, meta: 80, tendencia: 'subindo' }
  }
};

export const historico = {
  rotatividade: [
    { mes: 'Jul', valor: 18 },
    { mes: 'Ago', valor: 16 },
    { mes: 'Set', valor: 14 },
    { mes: 'Out', valor: 17 },
    { mes: 'Nov', valor: 19 },
    { mes: 'Dez', valor: 15 }
  ],
  acidentes: [
    { mes: 'Jul', valor: 5 },
    { mes: 'Ago', valor: 3 },
    { mes: 'Set', valor: 2 },
    { mes: 'Out', valor: 4 },
    { mes: 'Nov', valor: 6 },
    { mes: 'Dez', valor: 3 }
  ],
  obras: [
    { mes: 'Jul', concluidas: 2, atrasadas: 1 },
    { mes: 'Ago', concluidas: 1, atrasadas: 2 },
    { mes: 'Set', concluidas: 3, atrasadas: 0 },
    { mes: 'Out', concluidas: 2, atrasadas: 1 },
    { mes: 'Nov', concluidas: 1, atrasadas: 2 },
    { mes: 'Dez', concluidas: 2, atrasadas: 1 }
  ]
};

