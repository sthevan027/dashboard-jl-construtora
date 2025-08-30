import db from '../database/database';

// Serviço de RH usando localStorage como banco
export const rhService = {
  // Buscar funcionários
  getFuncionarios: () => {
    return db.getFuncionarios();
  },

  // Criar funcionário
  createFuncionario: (dados) => {
    return db.createFuncionario(dados);
  },

  // Atualizar funcionário
  updateFuncionario: (id, dados) => {
    return db.updateFuncionario(id, dados);
  },

  // Deletar funcionário
  deleteFuncionario: (id) => {
    return db.deleteFuncionario(id);
  },

  // Buscar departamentos
  getDepartamentos: () => {
    return db.getDepartamentos();
  },

  // Buscar horas extras
  getHorasExtras: () => {
    // Simular dados de horas extras
    return [
      { id: 1, funcionario_id: 1, horas: 12, mes: 12, ano: 2024, custo: 180 },
      { id: 2, funcionario_id: 2, horas: 8, mes: 12, ano: 2024, custo: 160 },
      { id: 3, funcionario_id: 3, horas: 16, mes: 12, ano: 2024, custo: 360 }
    ];
  },

  // Adicionar horas extras
  addHorasExtras: (dados) => {
    // Simular adição
    return { id: Math.random(), ...dados, created_at: new Date().toISOString() };
  },

  // Buscar estatísticas
  getEstatisticas: () => {
    const funcionarios = db.getFuncionarios();
    const departamentos = db.getDepartamentos();
    const kpis = db.getKPIs('rh');

    return {
      totalFuncionarios: funcionarios.length,
      departamentos: departamentos.length,
      rotatividade: kpis.find(k => k.nome === 'rotatividade')?.valor || 0,
      absenteismo: kpis.find(k => k.nome === 'absenteismo')?.valor || 0,
      satisfacao: kpis.find(k => k.nome === 'satisfacao')?.valor || 0,
      horasExtras: kpis.find(k => k.nome === 'horas_extras')?.valor || 0
    };
  },

  // Gerar relatório mensal
  gerarRelatorioMensal: (mes, ano) => {
    const funcionarios = db.getFuncionarios();
    const departamentos = db.getDepartamentos();
    const kpis = db.getKPIs('rh');

    return {
      periodo: `${mes}/${ano}`,
      totalFuncionarios: funcionarios.length,
      departamentos: departamentos,
      kpis: kpis,
      funcionarios: funcionarios,
      geradoEm: new Date().toISOString()
    };
  }
};
