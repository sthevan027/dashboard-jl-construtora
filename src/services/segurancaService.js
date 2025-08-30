import db from '../database/database';

// Serviço de Segurança usando localStorage como banco
export const segurancaService = {
  // Buscar acidentes
  getAcidentes: () => {
    // Simular dados de acidentes
    return [
      { id: 1, protocolo: 'AC-2024-001', tipo: 'Queda', local: 'Canteiro A', data: '2024-12-01', funcionario_id: 1, gravidade: 'Leve', descricao: 'Queda de escada', status: 'investigando' },
      { id: 2, protocolo: 'AC-2024-002', tipo: 'Corte', local: 'Oficina', data: '2024-12-05', funcionario_id: 3, gravidade: 'Médio', descricao: 'Corte na mão com ferramenta', status: 'resolvido' }
    ];
  },

  // Reportar acidente
  reportarAcidente: (dados) => {
    // Simular criação
    return { id: Math.random(), ...dados, created_at: new Date().toISOString() };
  },

  // Buscar EPIs
  getEPIs: () => {
    return db.getEPIs();
  },

  // Atualizar EPI
  updateEPI: (id, updates) => {
    return db.updateEPI(id, updates);
  },

  // Controle de EPIs
  controleEPIs: () => {
    const epis = db.getEPIs();
    return {
      total: epis.length,
      emEstoque: epis.reduce((sum, epi) => sum + epi.estoque, 0),
      emUso: epis.reduce((sum, epi) => sum + epi.em_uso, 0),
      vencendo: epis.filter(epi => {
        const vencimento = new Date(epi.vencimento);
        const hoje = new Date();
        const diffTime = vencimento - hoje;
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        return diffDays <= 30 && diffDays > 0;
      }).length
    };
  },

  // Buscar treinamentos
  getTreinamentos: () => {
    // Simular dados de treinamentos
    return [
      { id: 1, nome: 'NR-35 Trabalho em Altura', funcionario_id: 1, data_realizacao: '2024-11-15', vencimento: '2025-11-15', status: 'concluido' },
      { id: 2, nome: 'NR-10 Segurança em Instalações Elétricas', funcionario_id: 3, data_realizacao: '2024-10-20', vencimento: '2025-10-20', status: 'concluido' },
      { id: 3, nome: 'Primeiros Socorros', funcionario_id: 2, data_realizacao: null, vencimento: '2024-12-31', status: 'pendente' }
    ];
  },

  // Adicionar treinamento
  addTreinamento: (dados) => {
    // Simular criação
    return { id: Math.random(), ...dados, created_at: new Date().toISOString() };
  },

  // Buscar estatísticas
  getEstatisticas: () => {
    const acidentes = segurancaService.getAcidentes();
    const epis = db.getEPIs();
    const treinamentos = segurancaService.getTreinamentos();
    const kpis = db.getKPIs('seguranca');

    return {
      totalAcidentes: acidentes.length,
      acidentesMes: kpis.find(k => k.nome === 'acidentes_mes')?.valor || 0,
      diasSemAcidentes: kpis.find(k => k.nome === 'dias_sem_acidentes')?.valor || 0,
      conformidadeEPIs: kpis.find(k => k.nome === 'conformidade_epis')?.valor || 0,
      totalEPIs: epis.length,
      treinamentosPendentes: treinamentos.filter(t => t.status === 'pendente').length,
      treinamentosVencendo: treinamentos.filter(t => {
        const vencimento = new Date(t.vencimento);
        const hoje = new Date();
        const diffTime = vencimento - hoje;
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        return diffDays <= 30 && diffDays > 0;
      }).length
    };
  },

  // Gerar relatório de segurança
  gerarRelatorioSeguranca: (mes, ano) => {
    const acidentes = segurancaService.getAcidentes();
    const epis = db.getEPIs();
    const treinamentos = segurancaService.getTreinamentos();
    const kpis = db.getKPIs('seguranca');

    return {
      periodo: `${mes}/${ano}`,
      acidentes: acidentes,
      epis: epis,
      treinamentos: treinamentos,
      kpis: kpis,
      geradoEm: new Date().toISOString()
    };
  }
};
