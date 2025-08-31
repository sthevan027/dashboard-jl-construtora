import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../components/ui/select';
import { useToast } from '../../components/ui/toast';
import { rhService } from '../../services/rhService';
import { ArrowLeft, UserPlus, Save } from 'lucide-react';

const NovoFuncionarioPage = () => {
  const navigate = useNavigate();
  const { showToast, ToastContainer } = useToast();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    nome: '',
    cargo: '',
    departamento: '',
    salario: '',
    data_admissao: ''
  });

  const departamentos = [
    'Administrativo',
    'Obras',
    'Segurança',
    'Manutenção',
    'Financeiro',
    'Comercial'
  ];

  const cargos = [
    'Pedreiro',
    'Encarregado',
    'Engenheiro',
    'Auxiliar Administrativo',
    'Técnico de Segurança',
    'Mestre de Obras',
    'Ajudante',
    'Eletricista',
    'Encanador',
    'Pintor'
  ];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.nome || !formData.cargo || !formData.departamento || !formData.salario || !formData.data_admissao) {
      showToast('Preencha todos os campos obrigatórios', 'error');
      return;
    }

    setLoading(true);
    try {
      const novoFuncionario = await rhService.createFuncionario({
        ...formData,
        salario: parseFloat(formData.salario),
        status: 'ativo'
      });

      showToast('Funcionário cadastrado com sucesso!', 'success');
      setTimeout(() => {
        navigate('/rh');
      }, 1500);
    } catch (error) {
      console.error('Erro ao cadastrar funcionário:', error);
      showToast('Erro ao cadastrar funcionário', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 space-y-6">
      <ToastContainer />
      
      {/* Cabeçalho */}
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
          <h1 className="text-3xl font-bold text-gray-900">Novo Funcionário</h1>
          <p className="text-gray-600 mt-1">Cadastre um novo funcionário no sistema</p>
        </div>
      </div>

      {/* Formulário */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <UserPlus className="w-5 h-5" />
            Dados do Funcionário
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Nome */}
              <div className="space-y-2">
                <Label htmlFor="nome">Nome Completo *</Label>
                <Input
                  id="nome"
                  value={formData.nome}
                  onChange={(e) => handleInputChange('nome', e.target.value)}
                  placeholder="Digite o nome completo"
                  required
                />
              </div>

              {/* Cargo */}
              <div className="space-y-2">
                <Label htmlFor="cargo">Cargo *</Label>
                <Select value={formData.cargo} onValueChange={(value) => handleInputChange('cargo', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o cargo" />
                  </SelectTrigger>
                  <SelectContent>
                    {cargos.map(cargo => (
                      <SelectItem key={cargo} value={cargo}>{cargo}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Departamento */}
              <div className="space-y-2">
                <Label htmlFor="departamento">Departamento *</Label>
                <Select value={formData.departamento} onValueChange={(value) => handleInputChange('departamento', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o departamento" />
                  </SelectTrigger>
                  <SelectContent>
                    {departamentos.map(dept => (
                      <SelectItem key={dept} value={dept}>{dept}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Salário */}
              <div className="space-y-2">
                <Label htmlFor="salario">Salário (R$) *</Label>
                <Input
                  id="salario"
                  type="number"
                  step="0.01"
                  value={formData.salario}
                  onChange={(e) => handleInputChange('salario', e.target.value)}
                  placeholder="0,00"
                  required
                />
              </div>

              {/* Data de Admissão */}
              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="data_admissao">Data de Admissão *</Label>
                <Input
                  id="data_admissao"
                  type="date"
                  value={formData.data_admissao}
                  onChange={(e) => handleInputChange('data_admissao', e.target.value)}
                  required
                />
              </div>
            </div>

            {/* Botões */}
            <div className="flex gap-4 pt-4">
              <Button
                type="submit"
                disabled={loading}
                className="flex items-center gap-2"
              >
                <Save className="w-4 h-4" />
                {loading ? 'Salvando...' : 'Cadastrar Funcionário'}
              </Button>
              
              <Button
                type="button"
                variant="outline"
                onClick={() => navigate('/rh')}
                disabled={loading}
              >
                Cancelar
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default NovoFuncionarioPage;
