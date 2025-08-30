import db from '../database/database';

// Serviço de Obras usando localStorage como banco
export const obrasService = {
  // Buscar obras
  getObras: () => {
    return db.getObras();
  },

  // Criar obra
  createObra: (dados) => {
    return db.createObra(dados);
  },

  // Atualizar obra
  updateObra: (id, dados) => {
    return db.updateObra(id, dados);
  },

  // Buscar recursos de obra
  getRecursosObra: (obraId) => {
    // Simular dados de recursos
    return [
      { id: 1, obra_id: obraId, tipo: 'Material', nome: 'Cimento', quantidade: 100, status: 'disponivel' },
      { id: 2, obra_id: obraId, tipo: 'Equipamento', nome: 'Betoneira', quantidade: 2, status: 'em_uso' },
      { id: 3, obra_id: obraId, tipo: 'Mão de Obra', nome: 'Pedreiros', quantidade: 8, status: 'disponivel' }
    ];
  },

  // Adicionar recurso
  addRecursoObra: (dados) => {
    // Simular criação
    return { id: Math.random(), ...dados, created_at: new Date().toISOString() };
  },

  // Buscar estatísticas
  getEstatisticas: () => {
    const obras = db.getObras();
    const kpis = db.getKPIs('obras');

    return {
      totalObras: obras.length,
      emAndamento: obras.filter(o => o.status === 'em_andamento').length,
      concluidas: obras.filter(o => o.status === 'concluida').length,
      cronograma: kpis.find(k => k.nome === 'cronograma')?.valor || 0,
      orcamento: kpis.find(k => k.nome === 'orcamento')?.valor || 0,
      qualidade: kpis.find(k => k.nome === 'qualidade')?.valor || 0,
      produtividade: kpis.find(k => k.nome === 'produtividade')?.valor || 0,
      progressoMedio: obras.reduce((sum, obra) => sum + obra.progresso, 0) / obras.length || 0
    };
  },

  // Gerar cronograma geral
  gerarCronogramaGeral: () => {
    const obras = db.getObras();
    
    return {
      obras: obras.map(obra => ({
        ...obra,
        prazoRestante: Math.ceil((new Date(obra.prazo) - new Date()) / (1000 * 60 * 60 * 24)),
        statusCronograma: obra.progresso >= 85 ? 'no_prazo' : obra.progresso >= 60 ? 'atrasado' : 'critico'
      })),
      geradoEm: new Date().toISOString()
    };
  },

  // Gerar relatório de obras
  gerarRelatorioObras: (mes, ano) => {
    const obras = db.getObras();
    const kpis = db.getKPIs('obras');

    return {
      periodo: `${mes}/${ano}`,
      obras: obras,
      kpis: kpis,
      estatisticas: obrasService.getEstatisticas(),
      geradoEm: new Date().toISOString()
    };
  }
};
