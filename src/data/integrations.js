// This file re-exports INTEGRATIONS_DATA for ConfigPage compatibility
// (already defined inline in ConfigPage but exported here for consistency)

export const INTEGRATIONS_DATA = {
  comunicacao: [
    { icon: '💬', name: 'WhatsApp Business', desc: 'Confirmações e lembretes automáticos', on: true  },
    { icon: '📧', name: 'Gmail / SMTP',       desc: 'E-mails transacionais',               on: true  },
    { icon: '📱', name: 'SMS (Twilio)',        desc: 'Notificações por SMS',                on: false },
  ],
  calendario: [
    { icon: '📅', name: 'Google Calendar',   desc: 'Sincronização bidirecional',  on: true  },
    { icon: '📆', name: 'Microsoft Outlook', desc: 'Calendário corporativo',      on: true  },
    { icon: '🍎', name: 'Apple Calendar',    desc: 'Sync via CalDAV',             on: false },
  ],
  pagamentos: [
    { icon: '⚡', name: 'Pix',         desc: 'Pagamentos instantâneos', on: true  },
    { icon: '💳', name: 'Stripe',      desc: 'Cartões globais',         on: true  },
    { icon: '🛒', name: 'Mercado Pago',desc: 'Checkout MercadoPago',    on: false },
  ],
};
