import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../components/ui/select';
import { Textarea } from '../../components/ui/textarea';
import { useToast } from '../../components/ui/toast';
import { obrasService } from '../../services/obrasService';
import { ArrowLeft, Building, Save } from 'lucide-react';

const NovaObraPage = () => {
  const navigate = useNavigate();
  const { showToast, ToastContainer } = useToast();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    nome: '',
    tipo: '',
    endereco: '',
    orcamento: '',
    prazo: '',
    responsavel: '',
    descricao: '',
    progresso: 0
  });

  const tiposObra = [
    'Construção',
    'Reforma',
    'Manutenção',
    'Demolição',
    'Infraestrutura',
    'Residencial',
    'Comercial',
    'Industrial'
  ];

  const responsaveis = [
    'Eng. Carlos Silva',
    'Eng. Maria Santos',
    'Téc. Pedro Lima',
    'Arq. Ana Costa',
    'Eng. João Oliveira'
  ];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.nome || !formData.tipo || !formData.endereco || !formData.orcamento || !formData.prazo || !formData.responsavel) {
      showToast('Preencha todos os campos obrigatórios', 'error');
      return;
    }

    setLoading(true);
    try {
      const novaObra = await obrasService.createObra({
        ...formData,
        orcamento: parseFloat(formData.orcamento),
        progresso: parseFloat(formData.progresso)
      });

      showToast('Obra cadastrada com sucesso!', 'success');
      setTimeout(() => {
        navigate('/obras');
      }, 1500);
    } catch (error) {
      console.error('Erro ao cadastrar obra:', error);
      showToast('Erro ao cadastrar obra', 'error');
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
          onClick={() => navigate('/obras')}
          className="flex items-center gap-2"
        >
          <ArrowLeft className="w-4 h-4" />
          Voltar
        </Button>
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Nova Obra</h1>
          <p className="text-gray-600 mt-1">Cadastre uma nova obra no sistema</p>
        </div>
      </div>

      {/* Formulário */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Building className="w-5 h-5" />
            Dados da Obra
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Nome da Obra */}
              <div className="space-y-2">
                <Label htmlFor="nome">Nome da Obra *</Label>
                <Input
                  id="nome"
                  value={formData.nome}
                  onChange={(e) => handleInputChange('nome', e.target.value)}
                  placeholder="Digite o nome da obra"
                  required
                />
              </div>

              {/* Tipo */}
              <div className="space-y-2">
                <Label htmlFor="tipo">Tipo de Obra *</Label>
                <Select value={formData.tipo} onValueChange={(value) => handleInputChange('tipo', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o tipo" />
                  </SelectTrigger>
                  <SelectContent>
                    {tiposObra.map(tipo => (
                      <SelectItem key={tipo} value={tipo}>{tipo}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Endereço */}
              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="endereco">Endereço *</Label>
                <Input
                  id="endereco"
                  value={formData.endereco}
                  onChange={(e) => handleInputChange('endereco', e.target.value)}
                  placeholder="Digite o endereço completo"
                  required
                />
              </div>

              {/* Orçamento */}
              <div className="space-y-2">
                <Label htmlFor="orcamento">Orçamento (R$) *</Label>
                <Input
                  id="orcamento"
                  type="number"
                  step="0.01"
                  value={formData.orcamento}
                  onChange={(e) => handleInputChange('orcamento', e.target.value)}
                  placeholder="0,00"
                  required
                />
              </div>

              {/* Prazo */}
              <div className="space-y-2">
                <Label htmlFor="prazo">Prazo de Conclusão *</Label>
                <Input
                  id="prazo"
                  type="date"
                  value={formData.prazo}
                  onChange={(e) => handleInputChange('prazo', e.target.value)}
                  required
                />
              </div>

              {/* Responsável */}
              <div className="space-y-2">
                <Label htmlFor="responsavel">Responsável *</Label>
                <Select value={formData.responsavel} onValueChange={(value) => handleInputChange('responsavel', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o responsável" />
                  </SelectTrigger>
                  <SelectContent>
                    {responsaveis.map(resp => (
                      <SelectItem key={resp} value={resp}>{resp}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Progresso */}
              <div className="space-y-2">
                <Label htmlFor="progresso">Progresso Atual (%)</Label>
                <Input
                  id="progresso"
                  type="number"
                  min="0"
                  max="100"
                  value={formData.progresso}
                  onChange={(e) => handleInputChange('progresso', e.target.value)}
                  placeholder="0"
                />
              </div>
            </div>

            {/* Descrição */}
            <div className="space-y-2">
              <Label htmlFor="descricao">Descrição da Obra</Label>
              <Textarea
                id="descricao"
                value={formData.descricao}
                onChange={(e) => handleInputChange('descricao', e.target.value)}
                placeholder="Descreva detalhes da obra..."
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
                {loading ? 'Salvando...' : 'Cadastrar Obra'}
              </Button>
              
              <Button
                type="button"
                variant="outline"
                onClick={() => navigate('/obras')}
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

export default NovaObraPage;
