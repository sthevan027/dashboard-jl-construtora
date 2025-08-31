import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Switch } from '../components/ui/switch';
import { Separator } from '../components/ui/separator';
import { Badge } from '../components/ui/badge';
import { useToast } from '../components/ui/toast';
import { Save, RefreshCw, Database, Bell, Shield, Palette, Users, Settings } from 'lucide-react';

const ConfiguracaoPage = () => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [config, setConfig] = useState({
    empresa: {
      nome: 'JL Construtora',
      cnpj: '12.345.678/0001-90',
      endereco: 'Rua das Construções, 123 - Centro',
      telefone: '(11) 99999-9999',
      email: 'contato@jlconstrutora.com.br'
    },
    sistema: {
      tema: 'light',
      idioma: 'pt-BR',
      timezone: 'America/Sao_Paulo',
      notificacoes: true,
      autoBackup: true,
      backupInterval: 'daily'
    },
    seguranca: {
      senhaMinima: 8,
      expiracaoSenha: 90,
      tentativasLogin: 3,
      bloqueioTemporario: 30,
      doisFatores: false
    },
    relatorios: {
      formatoPadrao: 'pdf',
      incluirGraficos: true,
      incluirTabelas: true,
      assinaturaDigital: false,
      logoEmpresa: true
    },
    usuarios: {
      maxUsuarios: 50,
      permissoesPadrao: 'usuario',
      aprovarNovosUsuarios: true,
      notificarAdmins: true
    }
  });

  useEffect(() => {
    loadConfig();
  }, []);

  const loadConfig = () => {
    try {
      const savedConfig = localStorage.getItem('jl-dashboard-config');
      if (savedConfig) {
        setConfig(JSON.parse(savedConfig));
      }
    } catch (error) {
      console.error('Erro ao carregar configurações:', error);
    }
  };

  const saveConfig = async () => {
    setLoading(true);
    try {
      // Simular delay de salvamento
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      localStorage.setItem('jl-dashboard-config', JSON.stringify(config));
      
      toast({
        title: "Configurações salvas",
        description: "Todas as configurações foram salvas com sucesso!",
        variant: "default"
      });
    } catch (error) {
      toast({
        title: "Erro ao salvar",
        description: "Não foi possível salvar as configurações.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const resetConfig = () => {
    setConfig({
      empresa: {
        nome: 'JL Construtora',
        cnpj: '12.345.678/0001-90',
        endereco: 'Rua das Construções, 123 - Centro',
        telefone: '(11) 99999-9999',
        email: 'contato@jlconstrutora.com.br'
      },
      sistema: {
        tema: 'light',
        idioma: 'pt-BR',
        timezone: 'America/Sao_Paulo',
        notificacoes: true,
        autoBackup: true,
        backupInterval: 'daily'
      },
      seguranca: {
        senhaMinima: 8,
        expiracaoSenha: 90,
        tentativasLogin: 3,
        bloqueioTemporario: 30,
        doisFatores: false
      },
      relatorios: {
        formatoPadrao: 'pdf',
        incluirGraficos: true,
        incluirTabelas: true,
        assinaturaDigital: false,
        logoEmpresa: true
      },
      usuarios: {
        maxUsuarios: 50,
        permissoesPadrao: 'usuario',
        aprovarNovosUsuarios: true,
        notificarAdmins: true
      }
    });
    
    toast({
      title: "Configurações resetadas",
      description: "Configurações foram restauradas para os valores padrão.",
      variant: "default"
    });
  };

  const updateConfig = (section, field, value) => {
    setConfig(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value
      }
    }));
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Configurações</h1>
          <p className="text-gray-600 mt-2">Gerencie as configurações do sistema</p>
        </div>
        <div className="flex gap-3">
          <Button 
            variant="outline" 
            onClick={resetConfig}
            className="flex items-center gap-2"
          >
            <RefreshCw className="h-4 w-4" />
            Restaurar Padrão
          </Button>
          <Button 
            onClick={saveConfig}
            disabled={loading}
            className="flex items-center gap-2"
          >
            <Save className="h-4 w-4" />
            {loading ? 'Salvando...' : 'Salvar Configurações'}
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Configurações da Empresa */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Database className="h-5 w-5" />
              Dados da Empresa
            </CardTitle>
            <CardDescription>
              Informações básicas da empresa
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="nome">Nome da Empresa</Label>
              <Input
                id="nome"
                value={config.empresa.nome}
                onChange={(e) => updateConfig('empresa', 'nome', e.target.value)}
                placeholder="Nome da empresa"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="cnpj">CNPJ</Label>
              <Input
                id="cnpj"
                value={config.empresa.cnpj}
                onChange={(e) => updateConfig('empresa', 'cnpj', e.target.value)}
                placeholder="00.000.000/0000-00"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="endereco">Endereço</Label>
              <Input
                id="endereco"
                value={config.empresa.endereco}
                onChange={(e) => updateConfig('empresa', 'endereco', e.target.value)}
                placeholder="Endereço completo"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="telefone">Telefone</Label>
                <Input
                  id="telefone"
                  value={config.empresa.telefone}
                  onChange={(e) => updateConfig('empresa', 'telefone', e.target.value)}
                  placeholder="(00) 00000-0000"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">E-mail</Label>
                <Input
                  id="email"
                  type="email"
                  value={config.empresa.email}
                  onChange={(e) => updateConfig('empresa', 'email', e.target.value)}
                  placeholder="contato@empresa.com"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Configurações do Sistema */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Settings className="h-5 w-5" />
              Configurações do Sistema
            </CardTitle>
            <CardDescription>
              Preferências gerais do sistema
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="tema">Tema</Label>
              <Select value={config.sistema.tema} onValueChange={(value) => updateConfig('sistema', 'tema', value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="light">Claro</SelectItem>
                  <SelectItem value="dark">Escuro</SelectItem>
                  <SelectItem value="auto">Automático</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="idioma">Idioma</Label>
              <Select value={config.sistema.idioma} onValueChange={(value) => updateConfig('sistema', 'idioma', value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pt-BR">Português (Brasil)</SelectItem>
                  <SelectItem value="en-US">English (US)</SelectItem>
                  <SelectItem value="es-ES">Español</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="timezone">Fuso Horário</Label>
              <Select value={config.sistema.timezone} onValueChange={(value) => updateConfig('sistema', 'timezone', value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="America/Sao_Paulo">São Paulo (GMT-3)</SelectItem>
                  <SelectItem value="America/Manaus">Manaus (GMT-4)</SelectItem>
                  <SelectItem value="America/Belem">Belém (GMT-3)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Notificações</Label>
                <p className="text-sm text-gray-500">Receber notificações do sistema</p>
              </div>
              <Switch
                checked={config.sistema.notificacoes}
                onCheckedChange={(checked) => updateConfig('sistema', 'notificacoes', checked)}
              />
            </div>
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Backup Automático</Label>
                <p className="text-sm text-gray-500">Fazer backup automático dos dados</p>
              </div>
              <Switch
                checked={config.sistema.autoBackup}
                onCheckedChange={(checked) => updateConfig('sistema', 'autoBackup', checked)}
              />
            </div>
            {config.sistema.autoBackup && (
              <div className="space-y-2">
                <Label htmlFor="backupInterval">Intervalo de Backup</Label>
                <Select value={config.sistema.backupInterval} onValueChange={(value) => updateConfig('sistema', 'backupInterval', value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="daily">Diário</SelectItem>
                    <SelectItem value="weekly">Semanal</SelectItem>
                    <SelectItem value="monthly">Mensal</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Configurações de Segurança */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5" />
              Segurança
            </CardTitle>
            <CardDescription>
              Configurações de segurança e autenticação
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="senhaMinima">Tamanho Mínimo da Senha</Label>
              <Input
                id="senhaMinima"
                type="number"
                min="6"
                max="20"
                value={config.seguranca.senhaMinima}
                onChange={(e) => updateConfig('seguranca', 'senhaMinima', parseInt(e.target.value))}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="expiracaoSenha">Expiração da Senha (dias)</Label>
              <Input
                id="expiracaoSenha"
                type="number"
                min="30"
                max="365"
                value={config.seguranca.expiracaoSenha}
                onChange={(e) => updateConfig('seguranca', 'expiracaoSenha', parseInt(e.target.value))}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="tentativasLogin">Tentativas de Login</Label>
              <Input
                id="tentativasLogin"
                type="number"
                min="3"
                max="10"
                value={config.seguranca.tentativasLogin}
                onChange={(e) => updateConfig('seguranca', 'tentativasLogin', parseInt(e.target.value))}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="bloqueioTemporario">Bloqueio Temporário (minutos)</Label>
              <Input
                id="bloqueioTemporario"
                type="number"
                min="5"
                max="1440"
                value={config.seguranca.bloqueioTemporario}
                onChange={(e) => updateConfig('seguranca', 'bloqueioTemporario', parseInt(e.target.value))}
              />
            </div>
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Autenticação em Dois Fatores</Label>
                <p className="text-sm text-gray-500">Requer código adicional para login</p>
              </div>
              <Switch
                checked={config.seguranca.doisFatores}
                onCheckedChange={(checked) => updateConfig('seguranca', 'doisFatores', checked)}
              />
            </div>
          </CardContent>
        </Card>

        {/* Configurações de Relatórios */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Palette className="h-5 w-5" />
              Relatórios
            </CardTitle>
            <CardDescription>
              Configurações de geração de relatórios
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="formatoPadrao">Formato Padrão</Label>
              <Select value={config.relatorios.formatoPadrao} onValueChange={(value) => updateConfig('relatorios', 'formatoPadrao', value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pdf">PDF</SelectItem>
                  <SelectItem value="csv">CSV</SelectItem>
                  <SelectItem value="excel">Excel</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Incluir Gráficos</Label>
                <p className="text-sm text-gray-500">Adicionar gráficos aos relatórios</p>
              </div>
              <Switch
                checked={config.relatorios.incluirGraficos}
                onCheckedChange={(checked) => updateConfig('relatorios', 'incluirGraficos', checked)}
              />
            </div>
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Incluir Tabelas</Label>
                <p className="text-sm text-gray-500">Adicionar tabelas detalhadas</p>
              </div>
              <Switch
                checked={config.relatorios.incluirTabelas}
                onCheckedChange={(checked) => updateConfig('relatorios', 'incluirTabelas', checked)}
              />
            </div>
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Assinatura Digital</Label>
                <p className="text-sm text-gray-500">Incluir assinatura digital</p>
              </div>
              <Switch
                checked={config.relatorios.assinaturaDigital}
                onCheckedChange={(checked) => updateConfig('relatorios', 'assinaturaDigital', checked)}
              />
            </div>
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Logo da Empresa</Label>
                <p className="text-sm text-gray-500">Incluir logo nos relatórios</p>
              </div>
              <Switch
                checked={config.relatorios.logoEmpresa}
                onCheckedChange={(checked) => updateConfig('relatorios', 'logoEmpresa', checked)}
              />
            </div>
          </CardContent>
        </Card>

        {/* Configurações de Usuários */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              Usuários
            </CardTitle>
            <CardDescription>
              Configurações de gerenciamento de usuários
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="maxUsuarios">Máximo de Usuários</Label>
              <Input
                id="maxUsuarios"
                type="number"
                min="1"
                max="1000"
                value={config.usuarios.maxUsuarios}
                onChange={(e) => updateConfig('usuarios', 'maxUsuarios', parseInt(e.target.value))}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="permissoesPadrao">Permissões Padrão</Label>
              <Select value={config.usuarios.permissoesPadrao} onValueChange={(value) => updateConfig('usuarios', 'permissoesPadrao', value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="usuario">Usuário</SelectItem>
                  <SelectItem value="gerente">Gerente</SelectItem>
                  <SelectItem value="admin">Administrador</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Aprovar Novos Usuários</Label>
                <p className="text-sm text-gray-500">Requer aprovação para novos usuários</p>
              </div>
              <Switch
                checked={config.usuarios.aprovarNovosUsuarios}
                onCheckedChange={(checked) => updateConfig('usuarios', 'aprovarNovosUsuarios', checked)}
              />
            </div>
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Notificar Administradores</Label>
                <p className="text-sm text-gray-500">Enviar notificações para admins</p>
              </div>
              <Switch
                checked={config.usuarios.notificarAdmins}
                onCheckedChange={(checked) => updateConfig('usuarios', 'notificarAdmins', checked)}
              />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Status das Configurações */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bell className="h-5 w-5" />
            Status das Configurações
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
              <div>
                <p className="font-medium text-green-900">Configurações Salvas</p>
                <p className="text-sm text-green-600">Última atualização: {new Date().toLocaleString('pt-BR')}</p>
              </div>
              <Badge variant="default" className="bg-green-100 text-green-800">Ativo</Badge>
            </div>
            <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
              <div>
                <p className="font-medium text-blue-900">Backup Automático</p>
                <p className="text-sm text-blue-600">{config.sistema.autoBackup ? 'Ativado' : 'Desativado'}</p>
              </div>
              <Badge variant={config.sistema.autoBackup ? "default" : "secondary"} className={config.sistema.autoBackup ? "bg-blue-100 text-blue-800" : ""}>
                {config.sistema.autoBackup ? 'Ativo' : 'Inativo'}
              </Badge>
            </div>
            <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg">
              <div>
                <p className="font-medium text-purple-900">Segurança</p>
                <p className="text-sm text-purple-600">2FA: {config.seguranca.doisFatores ? 'Ativado' : 'Desativado'}</p>
              </div>
              <Badge variant={config.seguranca.doisFatores ? "default" : "secondary"} className={config.seguranca.doisFatores ? "bg-purple-100 text-purple-800" : ""}>
                {config.seguranca.doisFatores ? 'Alto' : 'Médio'}
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ConfiguracaoPage;
