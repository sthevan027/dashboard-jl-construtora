// Simulação de banco de dados usando localStorage para funcionar no navegador
// Em produção, isso seria substituído por uma API real

const DB_PREFIX = 'jl-dashboard-';

// Estrutura de dados simulada
const initialData = {
  funcionarios: [
    { id: 1, nome: 'João Silva', cargo: 'Pedreiro', departamento: 'Obras', salario: 2500, data_admissao: '2023-01-15', status: 'ativo' },
    { id: 2, nome: 'Maria Santos', cargo: 'Encarregada', departamento: 'Obras', salario: 3200, data_admissao: '2022-08-20', status: 'ativo' },
    { id: 3, nome: 'Carlos Oliveira', cargo: 'Engenheiro', departamento: 'Obras', salario: 4500, data_admissao: '2021-03-10', status: 'ativo' },
    { id: 4, nome: 'Ana Costa', cargo: 'Auxiliar Adm', departamento: 'Administrativo', salario: 1800, data_admissao: '2023-06-01', status: 'ativo' },
    { id: 5, nome: 'Pedro Lima', cargo: 'Técnico Segurança', departamento: 'Segurança', salario: 2800, data_admissao: '2022-11-15', status: 'ativo' }
  ],
  departamentos: [
    { id: 1, nome: 'Administrativo', funcionarios_count: 8, rotatividade: 5.2 },
    { id: 2, nome: 'Obras', funcionarios_count: 45, rotatividade: 12.8 },
    { id: 3, nome: 'Segurança', funcionarios_count: 12, rotatividade: 3.1 },
    { id: 4, nome: 'Manutenção', funcionarios_count: 15, rotatividade: 8.5 }
  ],
  epis: [
    { id: 1, tipo: 'Proteção Cabeça', nome: 'Capacete', estoque: 120, em_uso: 85, vencimento: '2025-12-31', status: 'ativo' },
    { id: 2, tipo: 'Proteção Ocular', nome: 'Óculos', estoque: 200, em_uso: 150, vencimento: '2025-12-31', status: 'ativo' },
    { id: 3, tipo: 'Proteção Auditiva', nome: 'Protetor', estoque: 180, em_uso: 120, vencimento: '2025-12-31', status: 'ativo' },
    { id: 4, tipo: 'Proteção Respiratória', nome: 'Máscara', estoque: 300, em_uso: 200, vencimento: '2025-12-31', status: 'ativo' }
  ],
  obras: [
    { id: 1, codigo: 'OB-001', nome: 'Reforma Escritório Central', tipo: 'Reforma', endereco: 'Rua das Flores, 123', orcamento: 150000, prazo: '2024-06-30', responsavel: 'Eng. Carlos Silva', descricao: 'Reforma completa do escritório central', progresso: 65, status: 'em_andamento' },
    { id: 2, codigo: 'OB-002', nome: 'Ampliação Galpão A', tipo: 'Construção', endereco: 'Av. Industrial, 456', orcamento: 280000, prazo: '2024-08-15', responsavel: 'Eng. Maria Santos', descricao: 'Ampliação do galpão para nova linha de produção', progresso: 35, status: 'em_andamento' },
    { id: 3, codigo: 'OB-003', nome: 'Manutenção Predial', tipo: 'Manutenção', endereco: 'Rua Comercial, 789', orcamento: 45000, prazo: '2024-04-20', responsavel: 'Téc. Pedro Lima', descricao: 'Manutenção preventiva do prédio administrativo', progresso: 90, status: 'em_andamento' }
  ],
  kpis: [
    { id: 1, modulo: 'rh', nome: 'rotatividade', valor: 8.5, meta: 10.0, mes: 12, ano: 2024 },
    { id: 2, modulo: 'rh', nome: 'absenteismo', valor: 3.2, meta: 5.0, mes: 12, ano: 2024 },
    { id: 3, modulo: 'rh', nome: 'satisfacao', valor: 8.7, meta: 8.0, mes: 12, ano: 2024 },
    { id: 4, modulo: 'rh', nome: 'horas_extras', valor: 120, meta: 100, mes: 12, ano: 2024 },
    { id: 5, modulo: 'seguranca', nome: 'acidentes_mes', valor: 2, meta: 3, mes: 12, ano: 2024 },
    { id: 6, modulo: 'seguranca', nome: 'dias_sem_acidentes', valor: 45, meta: 30, mes: 12, ano: 2024 },
    { id: 7, modulo: 'seguranca', nome: 'conformidade_epis', valor: 92, meta: 95, mes: 12, ano: 2024 },
    { id: 8, modulo: 'obras', nome: 'cronograma', valor: 78, meta: 85, mes: 12, ano: 2024 },
    { id: 9, modulo: 'obras', nome: 'orcamento', valor: 82, meta: 90, mes: 12, ano: 2024 },
    { id: 10, modulo: 'obras', nome: 'qualidade', valor: 88, meta: 85, mes: 12, ano: 2024 },
    { id: 11, modulo: 'obras', nome: 'produtividade', valor: 75, meta: 80, mes: 12, ano: 2024 }
  ]
};

// Funções de acesso ao "banco"
const db = {
  // Funcionários
  getFuncionarios: () => {
    const data = localStorage.getItem(DB_PREFIX + 'funcionarios');
    return data ? JSON.parse(data) : initialData.funcionarios;
  },
  
  createFuncionario: (funcionario) => {
    const funcionarios = db.getFuncionarios();
    const newId = Math.max(...funcionarios.map(f => f.id)) + 1;
    const newFuncionario = { ...funcionario, id: newId, created_at: new Date().toISOString() };
    funcionarios.push(newFuncionario);
    localStorage.setItem(DB_PREFIX + 'funcionarios', JSON.stringify(funcionarios));
    return newFuncionario;
  },
  
  updateFuncionario: (id, updates) => {
    const funcionarios = db.getFuncionarios();
    const index = funcionarios.findIndex(f => f.id === id);
    if (index !== -1) {
      funcionarios[index] = { ...funcionarios[index], ...updates, updated_at: new Date().toISOString() };
      localStorage.setItem(DB_PREFIX + 'funcionarios', JSON.stringify(funcionarios));
      return funcionarios[index];
    }
    return null;
  },
  
  deleteFuncionario: (id) => {
    const funcionarios = db.getFuncionarios();
    const filtered = funcionarios.filter(f => f.id !== id);
    localStorage.setItem(DB_PREFIX + 'funcionarios', JSON.stringify(filtered));
    return true;
  },
  
  // Departamentos
  getDepartamentos: () => {
    const data = localStorage.getItem(DB_PREFIX + 'departamentos');
    return data ? JSON.parse(data) : initialData.departamentos;
  },
  
  // EPIs
  getEPIs: () => {
    const data = localStorage.getItem(DB_PREFIX + 'epis');
    return data ? JSON.parse(data) : initialData.epis;
  },
  
  updateEPI: (id, updates) => {
    const epis = db.getEPIs();
    const index = epis.findIndex(e => e.id === id);
    if (index !== -1) {
      epis[index] = { ...epis[index], ...updates };
      localStorage.setItem(DB_PREFIX + 'epis', JSON.stringify(epis));
      return epis[index];
    }
    return null;
  },
  
  // Obras
  getObras: () => {
    const data = localStorage.getItem(DB_PREFIX + 'obras');
    return data ? JSON.parse(data) : initialData.obras;
  },
  
  createObra: (obra) => {
    const obras = db.getObras();
    const newId = Math.max(...obras.map(o => o.id)) + 1;
    const newObra = { ...obra, id: newId, created_at: new Date().toISOString() };
    obras.push(newObra);
    localStorage.setItem(DB_PREFIX + 'obras', JSON.stringify(obras));
    return newObra;
  },
  
  updateObra: (id, updates) => {
    const obras = db.getObras();
    const index = obras.findIndex(o => o.id === id);
    if (index !== -1) {
      obras[index] = { ...obras[index], ...updates, updated_at: new Date().toISOString() };
      localStorage.setItem(DB_PREFIX + 'obras', JSON.stringify(obras));
      return obras[index];
    }
    return null;
  },
  
  // KPIs
  getKPIs: (modulo = null) => {
    const data = localStorage.getItem(DB_PREFIX + 'kpis');
    const kpis = data ? JSON.parse(data) : initialData.kpis;
    return modulo ? kpis.filter(k => k.modulo === modulo) : kpis;
  },
  
  updateKPI: (id, updates) => {
    const kpis = db.getKPIs();
    const index = kpis.findIndex(k => k.id === id);
    if (index !== -1) {
      kpis[index] = { ...kpis[index], ...updates };
      localStorage.setItem(DB_PREFIX + 'kpis', JSON.stringify(kpis));
      return kpis[index];
    }
    return null;
  },
  
  // Inicializar dados se necessário
  initialize: () => {
    if (!localStorage.getItem(DB_PREFIX + 'funcionarios')) {
      localStorage.setItem(DB_PREFIX + 'funcionarios', JSON.stringify(initialData.funcionarios));
      localStorage.setItem(DB_PREFIX + 'departamentos', JSON.stringify(initialData.departamentos));
      localStorage.setItem(DB_PREFIX + 'epis', JSON.stringify(initialData.epis));
      localStorage.setItem(DB_PREFIX + 'obras', JSON.stringify(initialData.obras));
      localStorage.setItem(DB_PREFIX + 'kpis', JSON.stringify(initialData.kpis));
    }
  }
};

// Inicializar dados
db.initialize();

export default db;
