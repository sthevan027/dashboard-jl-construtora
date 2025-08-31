import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Badge } from '../../components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../components/ui/table';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { useToast } from '../../components/ui/toast';
import { segurancaService } from '../../services/segurancaService';
import { ArrowLeft, Shield, Edit, Save, X } from 'lucide-react';

const ControleEPIsPage = () => {
  const navigate = useNavigate();
  const { showToast, ToastContainer } = useToast();
  const [loading, setLoading] = useState(true);
  const [epis, setEpis] = useState([]);
  const [controle, setControle] = useState(null);
  const [editingId, setEditingId] = useState(null);
  const [editData, setEditData] = useState({});

  useEffect(() => {
    carregarDados();
  }, []);

  const carregarDados = () => {
    setLoading(true);
    try {
      const episData = segurancaService.getEPIs();
      const controleData = segurancaService.controleEPIs();
      setEpis(episData);
      setControle(controleData);
    } catch (error) {
      console.error('Erro ao carregar dados:', error);
      showToast('Erro ao carregar dados', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (epi) => {
    setEditingId(epi.id);
    setEditData({
      estoque: epi.estoque,
      em_uso: epi.em_uso
    });
  };

  const handleSave = async (epiId) => {
    try {
      await segurancaService.updateEPI(epiId, editData);
      showToast('EPI atualizado com sucesso!', 'success');
      setEditingId(null);
      setEditData({});
      carregarDados();
    } catch (error) {
      console.error('Erro ao atualizar EPI:', error);
      showToast('Erro ao atualizar EPI', 'error');
    }
  };

  const handleCancel = () => {
    setEditingId(null);
    setEditData({});
  };

  const getStatusBadge = (epi) => {
    const vencimento = new Date(epi.vencimento);
    const hoje = new Date();
    const diffTime = vencimento - hoje;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays < 0) {
      return <Badge variant="destructive">Vencido</Badge>;
    } else if (diffDays <= 30) {
      return <Badge variant="secondary">Vencendo</Badge>;
    } else {
      return <Badge variant="default">Válido</Badge>;
    }
  };

  if (loading) {
    return (
      <div className="p-6">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/4 mb-6"></div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            {[1, 2, 3].map(i => (
              <div key={i} className="h-32 bg-gray-200 rounded"></div>
            ))}
          </div>
          <div className="h-64 bg-gray-200 rounded"></div>
        </div>
      </div>
    );
  }

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
          <h1 className="text-3xl font-bold text-gray-900">Controle de EPIs</h1>
          <p className="text-gray-600 mt-1">Gerencie o estoque e uso de equipamentos de proteção</p>
        </div>
      </div>

      {/* Resumo */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total EPIs</CardTitle>
            <Shield className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{controle?.total || 0}</div>
            <p className="text-xs text-muted-foreground">
              Tipos de EPIs
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Em Estoque</CardTitle>
            <Shield className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{controle?.emEstoque || 0}</div>
            <p className="text-xs text-muted-foreground">
              Unidades disponíveis
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Em Uso</CardTitle>
            <Shield className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">{controle?.emUso || 0}</div>
            <p className="text-xs text-muted-foreground">
              Unidades em uso
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Tabela de EPIs */}
      <Card>
        <CardHeader>
          <CardTitle>Inventário de EPIs</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Tipo</TableHead>
                <TableHead>Nome</TableHead>
                <TableHead>Estoque</TableHead>
                <TableHead>Em Uso</TableHead>
                <TableHead>Vencimento</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {epis.map((epi) => (
                <TableRow key={epi.id}>
                  <TableCell className="font-medium">{epi.tipo}</TableCell>
                  <TableCell>{epi.nome}</TableCell>
                  <TableCell>
                    {editingId === epi.id ? (
                      <Input
                        type="number"
                        value={editData.estoque}
                        onChange={(e) => setEditData(prev => ({ ...prev, estoque: parseInt(e.target.value) }))}
                        className="w-20"
                      />
                    ) : (
                      epi.estoque
                    )}
                  </TableCell>
                  <TableCell>
                    {editingId === epi.id ? (
                      <Input
                        type="number"
                        value={editData.em_uso}
                        onChange={(e) => setEditData(prev => ({ ...prev, em_uso: parseInt(e.target.value) }))}
                        className="w-20"
                      />
                    ) : (
                      epi.em_uso
                    )}
                  </TableCell>
                  <TableCell>
                    {new Date(epi.vencimento).toLocaleDateString('pt-BR')}
                  </TableCell>
                  <TableCell>
                    {getStatusBadge(epi)}
                  </TableCell>
                  <TableCell>
                    {editingId === epi.id ? (
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          onClick={() => handleSave(epi.id)}
                          className="flex items-center gap-1"
                        >
                          <Save className="w-3 h-3" />
                          Salvar
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={handleCancel}
                          className="flex items-center gap-1"
                        >
                          <X className="w-3 h-3" />
                          Cancelar
                        </Button>
                      </div>
                    ) : (
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleEdit(epi)}
                        className="flex items-center gap-1"
                      >
                        <Edit className="w-3 h-3" />
                        Editar
                      </Button>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default ControleEPIsPage;
