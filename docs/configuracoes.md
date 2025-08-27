### Configurações

#### Objetivos
- Metas/KPIs, limiares de alerta e identidade visual.
- Persistência em `localStorage` com chave `jl-settings-v1`.

#### Estrutura proposta
- Hook `useSettings()` para ler/salvar e notificar UI.
- Schema (zod) para validar settings antes de persistir.

#### Exemplo de schema (conceitual)
```ts
type Settings = {
  identidade: { nome: string; logoUrl?: string; tema: 'claro' | 'escuro' };
  metas: { rotatividade: number; acidentesMes: number; percentualEPI: number };
  limiares: { acidentesCritico: number };
};
```

#### Reflexos na UI
- KPIs e badges de risco reagem imediatamente às mudanças de metas/limiares.
- Tema e identidade aplicados em componentes comuns (ex.: `Card`, `Badge`).


