# Dashboard JL Construtora

[![React](https://img.shields.io/badge/React-19-61DAFB?style=flat&logo=react&logoColor=000)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-6-646CFF?style=flat&logo=vite&logoColor=fff)](https://vitejs.dev/)
[![Tailwind](https://img.shields.io/badge/Tailwind-4-38B2AC?style=flat&logo=tailwind-css&logoColor=fff)](https://tailwindcss.com/)
[![pnpm](https://img.shields.io/badge/pnpm-10-F69220?style=flat&logo=pnpm&logoColor=fff)](https://pnpm.io/)

> Dashboard corporativo para acompanhamento de KPIs das áreas de RH, Segurança e Obras.

---

## 📋 Sobre

Dashboard para JL Construtora com módulos de RH, Segurança e Obras, relatórios com filtros, exportação CSV/PDF e configurações personalizáveis.

## 🚀 Como rodar

### Pré-requisitos

- Node.js 18+
- pnpm

### Instalação

```bash
# Clone o repositório
git clone https://github.com/sthevan027/dashboard-jl-construtora.git
cd dashboard-jl-construtora

# Instale as dependências
pnpm install

# Inicie o servidor de desenvolvimento
pnpm dev
```

Acesse em: **http://localhost:5173**

### Outros comandos

```bash
pnpm build    # Build de produção
pnpm preview  # Visualizar build
pnpm lint     # Linter
```

## 🛠️ Stack

| Tecnologia | Uso |
|------------|-----|
| React 19 | Framework UI |
| Vite 6 | Build e dev server |
| Tailwind CSS 4 | Estilização |
| Radix UI | Componentes |
| Recharts | Gráficos |
| React Router | Navegação |
| Zod + React Hook Form | Formulários |
| date-fns | Datas |

## 📊 Status do MVP

- [x] Planejamento e documentação
- [x] UI base com Sidebar e módulos (Dashboard, RH, Segurança, Obras)
- [ ] Relatórios com filtros e KPIs
- [ ] Exportação CSV e PDF
- [ ] Configurações persistentes
- [ ] Autenticação e rotas protegidas
- [ ] Deploy (Vercel/Netlify)

## 📁 Estrutura

```
dashboard-jl-construtora/
├── src/
│   ├── App.jsx
│   ├── main.jsx
│   ├── components/
│   │   ├── Sidebar.jsx
│   │   ├── *Module.jsx
│   │   └── ui/
│   ├── data/
│   └── services/    # planejado
├── docs/
├── public/
├── package.json
└── README.md
```

## 📚 Documentação

- [Planejamento](docs/planejamento.md)
- [Arquitetura](docs/arquitetura.md)
- [Execução e Deploy](docs/guia-execucao.md)
- [Relatórios](docs/relatorios.md)
- [Configurações](docs/configuracoes.md)
- [Autenticação](docs/autenticacao.md)
- [Design UI/UX](docs/design-ui-ux.md)

---

**Desenvolvido por [Sthevan Santos](https://github.com/sthevan027)**
