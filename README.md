# Agendaí — Plataforma SaaS de Gestão de Agendamentos

Stack: **React 18 + Vite + CSS Variables** (zero dependências de UI externas)

---

##  Instalação e execução

```bash
# 1. Entre na pasta do projeto
cd agendai

# 2. Instale as dependências
npm install

# 3. Inicie o servidor de desenvolvimento
npm run dev

# Acesse: http://localhost:5173
```

### Credenciais de acesso (mock)
| Campo  | Valor               |
|--------|---------------------|
| E-mail | admin@agendai.com   |
| Senha  | 123456              |
| MFA    | qualquer 6 dígitos  |

---

##  Estrutura de arquivos

```
agendai/
├── index.html
├── vite.config.js
├── package.json
└── src/
    ├── main.jsx                  # Entry point
    ├── App.jsx                   # Root + roteamento
    ├── styles/
    │   └── globals.css           # CSS Variables + animações globais
    ├── context/
    │   ├── AuthContext.jsx       # Autenticação (login + MFA)
    │   └── AppContext.jsx        # Estado global (agendamentos, toasts, modals)
    ├── hooks/
    │   └── index.js              # useCalendar, useDashboardStats, useFilteredClients...
    ├── data/
    │   ├── mockData.js           # Todos os dados simulados
    │   └── integrations.js       # Dados de integrações
    ├── components/
    │   ├── ui/
    │   │   └── index.jsx         # Button, Card, Badge, Toggle, Input, Modal, Toast...
    │   ├── charts/
    │   │   └── index.jsx         # BarChart, LineChart, OccupancyRing, DonutChart...
    │   ├── layout/
    │   │   └── index.jsx         # Sidebar, Topbar, NotifPanel
    │   └── AIAssistant.jsx       # Chat IA com Claude (Anthropic API)
    └── pages/
        ├── AuthPages.jsx         # LoginPage + MfaPage
        ├── DashboardPage.jsx     # Dashboard com métricas e agenda do dia
        ├── AgendaPage.jsx        # Calendário completo (Dia / Semana / Mês)
        ├── ClientesPage.jsx      # CRUD de clientes com filtros e perfil
        ├── ServicosPage.jsx      # Catálogo de serviços + PagamentosPage
        ├── RelatoriosPage.jsx    # Relatórios com gráficos avançados
        └── ConfigPage.jsx        # Integrações + Configurações
```

---

## Funcionalidades implementadas

### Autenticação
- [x] Tela de login com validação
- [x] Autenticação MFA com código de 6 dígitos
- [x] Logout no avatar da sidebar

### Dashboard
- [x] Métricas em tempo real (agendamentos, faturamento, ocupação, cancelamentos)
- [x] Ações rápidas (novo agendamento, lembretes, relatório, IA)
- [x] Agenda do dia com status visual
- [x] Mini-calendário com eventos
- [x] Gráfico de faturamento semanal
- [x] Feed de atividade em tempo real
- [x] Status dos profissionais

### Agenda
- [x] Visão por **dia**, **semana** e **mês**
- [x] Filtro por profissional
- [x] Clicar no slot para ver detalhes
- [x] Modal de cancelamento e edição
- [x] Navegação por período (‹ Hoje ›)

### Clientes
- [x] Tabela com busca, filtro e ordenação
- [x] Modal de perfil completo (info, histórico, notas)
- [x] Cadastro de novo cliente
- [x] Integração WhatsApp (simulada)

### Serviços
- [x] Cards de serviços com gráfico sparkline
- [x] Modal de criação/edição
- [x] Toggle ativo/inativo
- [x] Gráfico de receita por serviço

### Pagamentos
- [x] Tabela de transações com filtros
- [x] Breakdown por método (Pix, Cartão)
- [x] Configuração Pix
- [x] Resumo financeiro do dia

### Relatórios
- [x] 4 seções: Visão Geral, Faturamento, Cancelamentos, Ocupação
- [x] Gráficos de barra, linha, donut e progresso
- [x] Projeção de faturamento
- [x] Taxa de retorno e avaliações

### Integrações
- [x] Toggles para WhatsApp, Google Calendar, Outlook, Pix, Stripe, Analytics
- [x] Viewer de endpoints REST API
- [x] Gestão de Webhooks
- [x] Autenticação OAuth 2.0 com token

### Configurações
- [x] Identidade visual (nome, slogan, cor, idioma, fuso)
- [x] Preview em tempo real da marca
- [x] Segurança (MFA, TLS, AES-256, LGPD, GDPR)
- [x] Notificações e gatilhos automáticos
- [x] Planos (Básico R$49 / Profissional R$99 / Enterprise)
- [x] Gestão de equipe

### Assistente IA (Claude)
- [x] Chat integrado com API Anthropic
- [x] System prompt com contexto do negócio
- [x] Sugestões rápidas
- [x] Histórico de conversa
- [x] Limpar histórico

---

##  Segurança (simulada no frontend)

| Recurso           | Status  |
|-------------------|---------|
| Autenticação MFA  | ✅ Ativo |
| TLS 1.3           | ✅ Ativo |
| AES-256 em repouso| ✅ Ativo |
| Backup automático | ✅ Ativo |
| Log de auditoria  | ✅ Ativo |
| LGPD / GDPR       | ✅ Ativo |

---

##Integração com Claude (Anthropic)

O `AIAssistant.jsx` chama `https://api.anthropic.com/v1/messages` diretamente.

> **Atenção:** em produção, nunca exponha chamadas à API Anthropic no frontend.
> Use um backend intermediário (Node.js / Next.js API Routes) para proteger sua chave.

Para ambientes de produção, crie uma rota `/api/ai` no seu backend:
```js
// pages/api/ai.js (Next.js example)
export default async function handler(req, res) {
  const response = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': process.env.ANTHROPIC_API_KEY,
      'anthropic-version': '2023-06-01',
    },
    body: JSON.stringify(req.body),
  });
  const data = await response.json();
  res.json(data);
}
```

---

## Build para produção

```bash
npm run build
# Saída em ./dist/
```

---

## Tecnologias utilizadas

| Tecnologia    | Versão  | Uso                          |
|---------------|---------|------------------------------|
| React         | 18.3    | UI e componentes             |
| Vite          | 5.4     | Build tool e dev server      |
| CSS Variables | nativo  | Design system e temas        |
| Anthropic API | v1      | Assistente IA (Claude)       |

**Zero dependências de UI externas** — tudo construído do zero com CSS Variables e React puro.
