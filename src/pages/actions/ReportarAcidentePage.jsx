import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../components/ui/select';
import { Textarea } from '../../components/ui/textarea';
import { useToast } from '../../components/ui/toast';
import { segurancaService } from '../../services/segurancaService';
import { rhService } from '../../services/rhService';
import { ArrowLeft, AlertTriangle, Save } from 'lucide-react';

const ReportarAcidentePage = () => {
  const navigate = useNavigate();
  const { showToast, ToastContainer } = useToast();
  const [loading, setLoading] = useState(false);
  const [funcionarios, setFuncionarios] = useState([]);
  const [formData, setFormData] = useState({
    tipo: '',
    local: '',
    data: new Date().toISOString().split('T')[0],
    funcionario_id: '',
    gravidade: '',
    descricao: ''
  });

  // Carregar funcionários
  useState(() => {
    const funcs = rhService.getFuncionarios();
    setFuncionarios(funcs);
  }, []);

  const tiposAcidente = [
    'Queda',
    'Corte',
    'Queimadura',
    'Choque Elétrico',
    'Esforço Repetitivo',
    'Acidente de Trânsito',
    'Outro'
  ];

  const locais = [
    'Canteiro A',
    'Canteiro B',
    'Oficina',
    'Escritório',
    'Estacionamento',
    'Almoxarifado',
    'Outro'
  ];

  const gravidades = [
    'Leve',
    'Médio',
    'Grave',
    'Fatal'
  ];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.tipo || !formData.local || !formData.data || !formData.funcionario_id || !formData.gravidade) {
      showToast('Preencha todos os campos obrigatórios', 'error');
      return;
    }

    setLoading(true);
    try {
      const acidente = await segurancaService.reportarAcidente(formData);
      showToast('Acidente reportado com sucesso!', 'success');
      setTimeout(() => {
        navigate('/seguranca');
      }, 1500);
    } catch (error) {
      console.error('Erro ao reportar acidente:', error);
      showToast('Erro ao reportar acidente', 'error');
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
          onClick={() => navigate('/seguranca')}
          className="flex items-center gap-2"
        >
          <ArrowLeft className="w-4 h-4" />
          Voltar
        </Button>
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Reportar Acidente</h1>
          <p className="text-gray-600 mt-1">Registre um novo acidente de trabalho</p>
        </div>
      </div>

      {/* Formulário */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-red-600" />
            Dados do Acidente
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Tipo de Acidente */}
              <div className="space-y-2">
                <Label htmlFor="tipo">Tipo de Acidente *</Label>
                <Select value={formData.tipo} onValueChange={(value) => handleInputChange('tipo', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o tipo" />
                  </SelectTrigger>
                  <SelectContent>
                    {tiposAcidente.map(tipo => (
                      <SelectItem key={tipo} value={tipo}>{tipo}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Local */}
              <div className="space-y-2">
                <Label htmlFor="local">Local do Acidente *</Label>
                <Select value={formData.local} onValueChange={(value) => handleInputChange('local', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o local" />
                  </SelectTrigger>
                  <SelectContent>
                    {locais.map(local => (
                      <SelectItem key={local} value={local}>{local}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Data */}
              <div className="space-y-2">
                <Label htmlFor="data">Data do Acidente *</Label>
                <Input
                  id="data"
                  type="date"
                  value={formData.data}
                  onChange={(e) => handleInputChange('data', e.target.value)}
                  required
                />
              </div>

              {/* Funcionário */}
              <div className="space-y-2">
                <Label htmlFor="funcionario">Funcionário Envolvido *</Label>
                <Select value={formData.funcionario_id} onValueChange={(value) => handleInputChange('funcionario_id', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o funcionário" />
                  </SelectTrigger>
                  <SelectContent>
                    {funcionarios.map(func => (
                      <SelectItem key={func.id} value={func.id.toString()}>
                        {func.nome} - {func.cargo}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Gravidade */}
              <div className="space-y-2">
                <Label htmlFor="gravidade">Gravidade *</Label>
                <Select value={formData.gravidade} onValueChange={(value) => handleInputChange('gravidade', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione a gravidade" />
                  </SelectTrigger>
                  <SelectContent>
                    {gravidades.map(grav => (
                      <SelectItem key={grav} value={grav}>{grav}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Descrição */}
            <div className="space-y-2">
              <Label htmlFor="descricao">Descrição do Acidente</Label>
              <Textarea
                id="descricao"
                value={formData.descricao}
                onChange={(e) => handleInputChange('descricao', e.target.value)}
                placeholder="Descreva detalhadamente como ocorreu o acidente..."
                rows={4}
              />
            </div>

            {/* Botões */}
            <div className="flex gap-4 pt-4">
              <Button
                type="submit"
                disabled={loading}
                className="flex items-center gap-2"
              >
                <Save className="w-4 h-4" />
                {loading ? 'Salvando...' : 'Reportar Acidente'}
              </Button>
              
              <Button
                type="button"
                variant="outline"
                onClick={() => navigate('/seguranca')}
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

export default ReportarAcidentePage;
