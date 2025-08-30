import { useToast } from '../components/ui/toast';
import { rhService } from './rhService';
import { segurancaService } from './segurancaService';
import { obrasService } from './obrasService';

// Serviço para ações dos módulos
export const moduleActions = {
  // RH Module Actions
  rh: {
    novoFuncionario: async (dados) => {
      try {
        const funcionario = rhService.createFuncionario(dados);
        
        return {
          success: true,
          message: 'Funcionário criado com sucesso!',
          data: funcionario
        };
      } catch (error) {
        throw new Error('Erro ao criar funcionário');
      }
    },

    relatorioMensal: async (periodo) => {
      try {
        const [mes, ano] = periodo.split('/');
        const relatorio = rhService.gerarRelatorioMensal(parseInt(mes), parseInt(ano));
        
        return {
          success: true,
          message: 'Relatório gerado com sucesso!',
          data: { periodo, relatorio }
        };
      } catch (error) {
        throw new Error('Erro ao gerar relatório');
      }
    }
  },

  // Segurança Module Actions
  seguranca: {
    reportarAcidente: async (dados) => {
      try {
        const acidente = segurancaService.reportarAcidente(dados);
        
        return {
          success: true,
          message: 'Acidente reportado com sucesso!',
          data: acidente
        };
      } catch (error) {
        throw new Error('Erro ao reportar acidente');
      }
    },

    controleEPIs: async (acao, dados) => {
      try {
        const resultado = segurancaService.controleEPIs(acao, dados);
        
        if (resultado) {
          return {
            success: true,
            message: `EPI ${acao} com sucesso!`,
            data: { acao, ...dados }
          };
        } else {
          throw new Error('Falha no controle de EPIs');
        }
      } catch (error) {
        throw new Error('Erro no controle de EPIs');
      }
    }
  },

  // Obras Module Actions
  obras: {
    novaObra: async (dados) => {
      try {
        const obra = obrasService.createObra(dados);
        
        return {
          success: true,
          message: 'Obra criada com sucesso!',
          data: obra
        };
      } catch (error) {
        throw new Error('Erro ao criar obra');
      }
    },

    cronogramaGeral: async () => {
      try {
        const cronograma = obrasService.gerarCronogramaGeral();
        
        return {
          success: true,
          message: 'Cronograma gerado com sucesso!',
          data: cronograma
        };
      } catch (error) {
        throw new Error('Erro ao gerar cronograma');
      }
    }
  }
};

// Hook para usar as ações com toast
export const useModuleActions = () => {
  const { showToast } = useToast();

  const executeAction = async (action, ...args) => {
    try {
      const result = await action(...args);
      
      if (result.success) {
        showToast(result.message, 'success');
      } else {
        showToast(result.message || 'Erro na operação', 'error');
      }
      
      return result;
    } catch (error) {
      showToast(error.message, 'error');
      throw error;
    }
  };

  return { executeAction };
};
