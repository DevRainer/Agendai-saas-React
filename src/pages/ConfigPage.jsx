import { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Card, CardHeader, CardBody, Button, Toggle, Input, Select } from '../components/ui';
import { BarChart } from '../components/charts';

const INT_INITIAL = {
  comunicacao:[{icon:'💬',name:'WhatsApp Business',desc:'Confirmações automáticas',on:true},{icon:'📧',name:'Gmail / SMTP',desc:'E-mails transacionais',on:true},{icon:'📱',name:'SMS (Twilio)',desc:'Notificações por SMS',on:false}],
  calendario:[{icon:'📅',name:'Google Calendar',desc:'Sync bidirecional',on:true},{icon:'📆',name:'Microsoft Outlook',desc:'Calendário corporativo',on:true},{icon:'🍎',name:'Apple Calendar',desc:'CalDAV',on:false}],
  pagamentos:[{icon:'⚡',name:'Pix',desc:'Pagamentos instantâneos',on:true},{icon:'💳',name:'Stripe',desc:'Cartões globais',on:true},{icon:'🛒',name:'Mercado Pago',desc:'Checkout MercadoPago',on:false}],
};

export function IntegracoesPage() {
  const { showToast } = useApp();
  const [ints, setInts] = useState(INT_INITIAL);
  const [apiTab, setApiTab] = useState('endpoints');
  const toggle = (cat,i) => setInts(prev => ({ ...prev,[cat]:prev[cat].map((it,idx) => idx===i?{...it,on:!it.on}:it) }));
  const activeCount = Object.values(ints).flat().filter(i=>i.on).length;
  const cats = { comunicacao:'📡 Comunicação', calendario:'📅 Calendário', pagamentos:'💳 Pagamentos' };
  return (
    <div style={{ overflowY:'auto', flex:1 }}>
      <div style={{ display:'flex', alignItems:'center', gap:10, padding:'13px 22px', borderBottom:'1px solid var(--border-subtle)', background:'rgba(7,7,15,.92)', backdropFilter:'blur(14px)', position:'sticky', top:0, zIndex:20 }}>
        <div><div style={{ fontFamily:'var(--font-display)', fontSize:19, fontWeight:800, color:'var(--text-primary)' }}>Integrações</div><div style={{ fontSize:11.5, color:'var(--text-secondary)' }}>{activeCount} integrações ativas</div></div>
        <div style={{ marginLeft:'auto' }}><button onClick={() => showToast('🔍 Marketplace em breve!')} style={{ padding:'8px 16px', borderRadius:'var(--radius-sm)', fontSize:12.5, fontWeight:600, border:'none', background:'linear-gradient(135deg,var(--brand),var(--brand-dark))', color:'#fff', cursor:'pointer', boxShadow:'var(--shadow-brand)', fontFamily:'var(--font-body)' }}>＋ Explorar marketplace</button></div>
      </div>
      <div style={{ padding:22 }}>
        <div style={{ background:'linear-gradient(135deg,rgba(6,182,212,.08),rgba(124,58,237,.08))', border:'1px solid rgba(6,182,212,.2)', borderRadius:'var(--radius-sm)', padding:'10px 16px', display:'flex', alignItems:'center', gap:12, marginBottom:20 }}>
          <span style={{ fontSize:20 }}>🔗</span>
          <span style={{ fontSize:12.5, color:'var(--text-secondary)', flex:1 }}><b style={{ color:'var(--accent-cyan)' }}>API REST aberta</b> — OAuth 2.0 · Webhooks em tempo real · Documentação interativa</span>
          <div style={{ display:'flex', gap:6 }}>{['REST API','OAuth 2.0','Webhooks'].map(t => <span key={t} style={{ fontSize:9.5, fontWeight:700, padding:'2px 8px', borderRadius:4, background:'rgba(6,182,212,.14)', color:'var(--accent-cyan)' }}>{t}</span>)}</div>
        </div>
        <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:16, marginBottom:16 }}>
          {Object.entries(cats).map(([cat,label]) => (
            <Card key={cat}>
              <CardHeader title={label} action={<span style={{ fontSize:11, color:'var(--text-tertiary)' }}>{ints[cat].filter(i=>i.on).length}/{ints[cat].length}</span>}/>
              <CardBody style={{ display:'flex', flexDirection:'column', gap:8 }}>
                {ints[cat].map((it,i) => (
                  <div key={it.name} style={{ display:'flex', alignItems:'center', gap:10, padding:'10px 12px', borderRadius:'var(--radius-sm)', border:'1px solid var(--border-subtle)', background:'var(--bg-overlay)' }}>
                    <span style={{ fontSize:20, width:32, textAlign:'center', flexShrink:0 }}>{it.icon}</span>
                    <div style={{ flex:1 }}><div style={{ fontSize:13, fontWeight:600, color:'var(--text-primary)' }}>{it.name}</div><div style={{ fontSize:11, color:'var(--text-secondary)' }}>{it.desc}</div></div>
                    {it.on&&<button onClick={() => showToast(`🧪 Testando ${it.name}...`)} style={{ background:'none', border:'none', cursor:'pointer', fontSize:11, color:'var(--text-tertiary)', fontFamily:'var(--font-body)' }}>Testar</button>}
                    <Toggle on={it.on} onChange={() => toggle(cat,i)} size="sm"/>
                  </div>
                ))}
              </CardBody>
            </Card>
          ))}
          <Card>
            <CardHeader title="🤖 API REST" action={<button onClick={() => showToast('📄 Docs abertas!')} style={{ padding:'5px 12px', borderRadius:'var(--radius-sm)', fontSize:12, fontWeight:600, border:'1px solid var(--border-default)', background:'transparent', color:'var(--text-primary)', cursor:'pointer', fontFamily:'var(--font-body)' }}>Ver docs</button>}/>
            <CardBody>
              <div style={{ display:'flex', gap:2, background:'var(--bg-overlay)', borderRadius:'var(--radius-sm)', padding:3, width:'fit-content', marginBottom:14 }}>
                {[['endpoints','Endpoints'],['auth','Auth'],['webhooks','Webhooks']].map(([id,l]) => <button key={id} onClick={() => setApiTab(id)} style={{ padding:'5px 12px', borderRadius:5, fontSize:12, fontWeight:600, border:'none', cursor:'pointer', fontFamily:'var(--font-body)', background:apiTab===id?'var(--card-hover)':'transparent', color:apiTab===id?'var(--text-primary)':'var(--text-secondary)' }}>{l}</button>)}
              </div>
              {apiTab==='endpoints' && (
                <div style={{ display:'flex', flexDirection:'column', gap:5 }}>
                  {[['GET','#10B981','/api/v1/agendamentos','Listar'],['POST','#A78BFA','/api/v1/agendamentos','Criar'],['PUT','#FBBF24','/api/v1/agendamentos/:id','Atualizar'],['DELETE','#EF4444','/api/v1/agendamentos/:id','Cancelar'],['GET','#10B981','/api/v1/clientes','Clientes']].map(([m,c,p,d]) => (
                    <div key={p+m} style={{ display:'flex', alignItems:'center', gap:10, padding:'8px 12px', background:'var(--bg-overlay)', borderRadius:'var(--radius-sm)', fontFamily:'monospace' }}>
                      <span style={{ fontSize:10, fontWeight:800, padding:'2px 6px', borderRadius:3, background:`${c}22`, color:c, minWidth:46, textAlign:'center' }}>{m}</span>
                      <span style={{ color:'var(--brand-light)', fontSize:12, flex:1 }}>{p}</span>
                      <span style={{ color:'var(--text-tertiary)', fontSize:11, fontFamily:'var(--font-body)' }}>{d}</span>
                      <button onClick={() => showToast(`📋 ${m} ${p}`)} style={{ background:'none', border:'none', cursor:'pointer', color:'var(--text-tertiary)', fontSize:13 }}>📋</button>
                    </div>
                  ))}
                </div>
              )}
              {apiTab==='auth' && (
                <div style={{ background:'var(--bg-overlay)', borderRadius:'var(--radius-sm)', padding:'14px 16px', fontFamily:'monospace', fontSize:13, color:'var(--brand-light)', lineHeight:1.8 }}>
                  <div style={{ color:'var(--text-tertiary)', marginBottom:8 }}>// Authorization header</div>
                  <div><span style={{ color:'var(--accent-cyan)' }}>Authorization</span>: Bearer <span style={{ color:'var(--accent-amber)' }}>{'<token>'}</span></div>
                  <div><span style={{ color:'var(--accent-cyan)' }}>Content-Type</span>: <span style={{ color:'var(--success)' }}>application/json</span></div>
                </div>
              )}
              {apiTab==='webhooks' && (
                <div style={{ display:'flex', flexDirection:'column', gap:8 }}>
                  {[['agendamento.criado','Novo agendamento'],['pagamento.confirmado','Pagamento confirmado'],['cliente.cadastrado','Novo cliente']].map(([ev,d]) => (
                    <div key={ev} style={{ display:'flex', alignItems:'center', gap:10, padding:'9px 12px', background:'var(--bg-overlay)', borderRadius:'var(--radius-sm)' }}>
                      <span style={{ fontSize:11, fontWeight:700, padding:'2px 8px', borderRadius:4, background:'rgba(124,58,237,.18)', color:'var(--brand-light)', fontFamily:'monospace' }}>{ev}</span>
                      <span style={{ flex:1, fontSize:12.5, color:'var(--text-secondary)' }}>{d}</span>
                      <Toggle on size="sm" onChange={() => showToast(`Webhook ${ev} atualizado`)}/>
                    </div>
                  ))}
                </div>
              )}
            </CardBody>
          </Card>
        </div>
      </div>
    </div>
  );
}

export function ConfiguracoesPage() {
  const { showToast } = useApp();
  const [tab, setTab]         = useState('branding');
  const [brand, setBrand]     = useState('#7C3AED');
  const [clinic, setClinic]   = useState('Clínica Dra. Silva');
  const [slogan, setSlogan]   = useState('Cuidando de você com excelência');
  const [secT, setSecT]       = useState({ mfa:true, backup:true, alerts:true, audit:true, tls:true, perms:true });
  const [notifT, setNotifT]   = useState({ wa:true, email:true, sms:false, push:true });
  const COLORS = ['#7C3AED','#06B6D4','#F472B6','#10B981','#EF4444','#FBBF24','#3B82F6','#8B5CF6'];
  const TABS = [{ id:'branding',label:'🎨 Identidade' },{ id:'security',label:'🔒 Segurança' },{ id:'notifications',label:'🔔 Notificações' },{ id:'billing',label:'💎 Planos' },{ id:'team',label:'👥 Equipe' }];
  return (
    <div style={{ overflowY:'auto', flex:1 }}>
      <div style={{ display:'flex', alignItems:'center', gap:10, padding:'13px 22px', borderBottom:'1px solid var(--border-subtle)', background:'rgba(7,7,15,.92)', backdropFilter:'blur(14px)', position:'sticky', top:0, zIndex:20 }}>
        <div><div style={{ fontFamily:'var(--font-display)', fontSize:19, fontWeight:800, color:'var(--text-primary)' }}>Configurações</div><div style={{ fontSize:11.5, color:'var(--text-secondary)' }}>Personalize sua plataforma</div></div>
        <div style={{ marginLeft:'auto' }}><button onClick={() => showToast('✅ Configurações salvas!')} style={{ padding:'8px 16px', borderRadius:'var(--radius-sm)', fontSize:12.5, fontWeight:600, border:'none', background:'linear-gradient(135deg,var(--brand),var(--brand-dark))', color:'#fff', cursor:'pointer', boxShadow:'var(--shadow-brand)', fontFamily:'var(--font-body)' }}>💾 Salvar</button></div>
      </div>
      <div style={{ padding:22 }}>
        <div style={{ display:'flex', gap:4, borderBottom:'1px solid var(--border-subtle)', marginBottom:24, paddingBottom:0 }}>
          {TABS.map(t => <button key={t.id} onClick={() => setTab(t.id)} style={{ padding:'10px 18px', fontSize:13, fontWeight:600, cursor:'pointer', border:'none', borderBottom:`2px solid ${tab===t.id?'var(--brand)':'transparent'}`, background:'transparent', color:tab===t.id?'var(--brand-light)':'var(--text-secondary)', fontFamily:'var(--font-body)', marginBottom:-1 }}>{t.label}</button>)}
        </div>

        {tab==='branding' && (
          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:20 }}>
            <div style={{ display:'flex', flexDirection:'column', gap:16 }}>
              <Input label="Nome do negócio" value={clinic} onChange={e => setClinic(e.target.value)} icon="🏥"/>
              <Input label="Slogan" value={slogan} onChange={e => setSlogan(e.target.value)} icon="✍️"/>
              <Select label="Idioma" value="pt-BR" onChange={() => {}} options={[{ value:'pt-BR',label:'🇧🇷 Português (Brasil)' },{ value:'en',label:'🇺🇸 English' },{ value:'es',label:'🇪🇸 Español' }]}/>
              <Select label="Fuso horário" value="GMT-3" onChange={() => {}} options={['GMT-3 (Brasília)','GMT-4 (Manaus)','GMT+0 (Lisboa)']}/>
            </div>
            <div style={{ display:'flex', flexDirection:'column', gap:16 }}>
              <div>
                <div style={{ fontSize:11, fontWeight:700, color:'var(--text-secondary)', textTransform:'uppercase', letterSpacing:'0.6px', marginBottom:12 }}>Cor da marca</div>
                <div style={{ display:'flex', gap:8, flexWrap:'wrap' }}>
                  {COLORS.map(c => <div key={c} title={c} onClick={() => { setBrand(c); showToast('🎨 Cor atualizada!'); }} style={{ width:34, height:34, borderRadius:'50%', background:c, cursor:'pointer', transition:'all var(--transition-base)', border:brand===c?'3px solid #fff':'3px solid transparent', boxShadow:brand===c?`0 0 0 2px ${c}`:'none', transform:brand===c?'scale(1.15)':'scale(1)' }}/>)}
                </div>
              </div>
              <div style={{ background:'var(--bg-overlay)', borderRadius:'var(--radius-md)', padding:18, border:`1px solid ${brand}30` }}>
                <div style={{ fontSize:11, fontWeight:700, color:'var(--text-tertiary)', textTransform:'uppercase', letterSpacing:'0.5px', marginBottom:12 }}>Pré-visualização</div>
                <div style={{ display:'flex', alignItems:'center', gap:10, marginBottom:12 }}>
                  <div style={{ width:36, height:36, background:`linear-gradient(135deg,${brand},${brand}88)`, borderRadius:9, display:'flex', alignItems:'center', justifyContent:'center', fontSize:18 }}>📅</div>
                  <div><div style={{ fontFamily:'var(--font-display)', fontSize:14, fontWeight:800, color:'var(--text-primary)' }}>{clinic||'Meu Negócio'}</div><div style={{ fontSize:11, color:'var(--text-secondary)' }}>{slogan}</div></div>
                </div>
                <button style={{ width:'100%', padding:8, borderRadius:'var(--radius-sm)', border:'none', background:`linear-gradient(135deg,${brand},${brand}88)`, color:'#fff', fontSize:13, fontWeight:600, fontFamily:'var(--font-body)', cursor:'pointer' }}>Agendar consulta</button>
              </div>
            </div>
          </div>
        )}

        {tab==='security' && (
          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:20 }}>
            <div>
              <div style={{ fontSize:14, fontWeight:700, color:'var(--text-primary)', marginBottom:14, fontFamily:'var(--font-display)' }}>Autenticação e Acesso</div>
              <div style={{ display:'flex', flexDirection:'column', gap:8 }}>
                {[['🔐','mfa','Autenticação MFA','Verificação em 2 etapas'],['🔑','perms','Controle de permissões','Admin · Profissional · Cliente'],['🔔','alerts','Alertas de login','Notificação em novos acessos'],['📋','audit','Log de auditoria LGPD','Registro imutável de ações']].map(([ic,k,n,d]) => <SecRow key={k} icon={ic} name={n} desc={d} on={secT[k]} onChange={v => setSecT(p => ({...p,[k]:v}))}/>)}
              </div>
            </div>
            <div>
              <div style={{ fontSize:14, fontWeight:700, color:'var(--text-primary)', marginBottom:14, fontFamily:'var(--font-display)' }}>Criptografia e Backup</div>
              <div style={{ display:'flex', flexDirection:'column', gap:8, marginBottom:16 }}>
                {[['🔒','tls','TLS 1.3 forçado','Criptografia em trânsito'],['🛡️','encrypt','AES-256 em repouso','Dados armazenados criptografados'],['💾','backup','Backup automático','Diário em nuvem multi-região']].map(([ic,k,n,d]) => <SecRow key={k} icon={ic} name={n} desc={d} on={secT[k]??true} onChange={v => setSecT(p => ({...p,[k]:v}))}/>)}
              </div>
              <div style={{ background:'rgba(16,185,129,.08)', border:'1px solid rgba(16,185,129,.2)', borderRadius:'var(--radius-sm)', padding:'12px 14px' }}>
                <div style={{ fontSize:13, fontWeight:600, color:'var(--success)', marginBottom:6 }}>✅ Conformidade ativa</div>
                <div style={{ display:'flex', gap:6, flexWrap:'wrap' }}>
                  {['LGPD (Brasil)','GDPR (Europa)','ISO 27001','SOC 2'].map(t => <span key={t} style={{ fontSize:10.5, fontWeight:600, padding:'2px 8px', borderRadius:'var(--radius-full)', background:'rgba(16,185,129,.14)', color:'var(--success)' }}>{t}</span>)}
                </div>
              </div>
            </div>
          </div>
        )}

        {tab==='notifications' && (
          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:20 }}>
            <Card>
              <CardHeader title="Canais de notificação"/>
              <CardBody style={{ display:'flex', flexDirection:'column', gap:8 }}>
                {[['💬','wa','WhatsApp Business','Lembretes automáticos'],['📧','email','E-mail','Comprovantes'],['📱','sms','SMS','Clientes sem WhatsApp'],['🔔','push','Push no app','Notificações no browser']].map(([ic,k,n,d]) => <SecRow key={k} icon={ic} name={n} desc={d} on={notifT[k]} onChange={v => setNotifT(p => ({...p,[k]:v}))}/>)}
              </CardBody>
            </Card>
            <Card>
              <CardHeader title="Gatilhos automáticos"/>
              <CardBody>
                <div style={{ display:'flex', flexDirection:'column', gap:12 }}>
                  {[['✅','Confirmação','Imediatamente após agendamento'],['🔔','Lembrete D-1','24 horas antes'],['⏰','Lembrete no dia','2 horas antes'],['❌','Cancelamento','Imediatamente'],['⭐','Avaliação','2 horas após consulta']].map(([ic,l,d]) => (
                    <div key={l} style={{ display:'flex', alignItems:'center', gap:10, padding:'9px 12px', background:'var(--bg-overlay)', borderRadius:'var(--radius-sm)' }}>
                      <span>{ic}</span>
                      <div style={{ flex:1 }}><div style={{ fontSize:13, fontWeight:600, color:'var(--text-primary)' }}>{l}</div><div style={{ fontSize:11, color:'var(--text-tertiary)' }}>{d}</div></div>
                      <Toggle on size="sm" onChange={() => showToast('⚙️ Gatilho atualizado')}/>
                    </div>
                  ))}
                </div>
              </CardBody>
            </Card>
          </div>
        )}

        {tab==='billing' && (
          <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:14 }}>
            {[{ name:'Básico',price:'R$49',per:'/mês',features:'• 1 profissional\n• 100 agend./mês\n• E-mail básico\n• Suporte ticket',active:false,color:'var(--text-secondary)' },{ name:'Profissional',price:'R$99',per:'/mês',features:'• 5 profissionais\n• Ilimitados\n• WhatsApp+SMS+Email\n• Suporte prioritário\n• Relatórios avançados',active:true,color:'var(--brand-light)' },{ name:'Enterprise',price:'Consulte',per:'',features:'• Ilimitados\n• Multi-unidade\n• API dedicada\n• Suporte 24/7\n• White-label',active:false,color:'var(--accent-amber)' }].map(plan => (
              <div key={plan.name} style={{ padding:22, borderRadius:'var(--radius-lg)', position:'relative', border:plan.active?'2px solid var(--brand)':'1px solid var(--border-default)', background:plan.active?'rgba(124,58,237,.07)':'var(--card-bg)' }}>
                {plan.active&&<span style={{ position:'absolute', top:-12, left:'50%', transform:'translateX(-50%)', background:'var(--brand)', color:'#fff', fontSize:9.5, fontWeight:700, padding:'3px 14px', borderRadius:'var(--radius-full)', whiteSpace:'nowrap' }}>✓ PLANO ATUAL</span>}
                <div style={{ fontSize:13, fontWeight:700, color:plan.color, marginBottom:6 }}>{plan.name}</div>
                <div style={{ fontFamily:'var(--font-display)', fontSize:26, fontWeight:800, color:'var(--text-primary)' }}>{plan.price}<span style={{ fontSize:12, fontWeight:400, color:'var(--text-secondary)', fontFamily:'var(--font-body)' }}>{plan.per}</span></div>
                <div style={{ margin:'14px 0', fontSize:12.5, color:'var(--text-secondary)', lineHeight:1.9, whiteSpace:'pre-line' }}>{plan.features}</div>
                <button onClick={() => showToast(plan.active?'✓ Plano atual':'📧 Contato enviado!')} style={{ width:'100%', padding:'8px', borderRadius:'var(--radius-sm)', fontSize:13, fontWeight:600, fontFamily:'var(--font-body)', cursor:'pointer', border:plan.active?'none':'1px solid var(--border-default)', background:plan.active?'linear-gradient(135deg,var(--brand),var(--brand-dark))':'transparent', color:plan.active?'#fff':'var(--text-primary)' }}>{plan.active?'Plano atual':plan.name==='Enterprise'?'Falar com vendas':'Fazer upgrade'}</button>
              </div>
            ))}
          </div>
        )}

        {tab==='team' && (
          <div>
            <div style={{ display:'flex', justifyContent:'flex-end', marginBottom:16 }}>
              <button onClick={() => showToast('➕ Convidar membro!')} style={{ padding:'8px 16px', borderRadius:'var(--radius-sm)', fontSize:12.5, fontWeight:600, border:'none', background:'linear-gradient(135deg,var(--brand),var(--brand-dark))', color:'#fff', cursor:'pointer', boxShadow:'var(--shadow-brand)', fontFamily:'var(--font-body)' }}>＋ Convidar membro</button>
            </div>
            <Card>
              <CardHeader title="Membros da equipe" subtitle="3 profissionais ativos"/>
              <div>
                {[{name:'Dra. Ana Silva',role:'Administradora · Clínica Geral',init:'DS',color:'#7C3AED',perm:'Admin',last:'Agora'},{name:'Dr. Pedro Mendes',role:'Cardiologista',init:'DM',color:'#06B6D4',perm:'Profissional',last:'Há 2h'},{name:'Dra. Carla Costa',role:'Dermatologista',init:'DC',color:'#F472B6',perm:'Profissional',last:'Ontem'}].map((m,i) => (
                  <div key={m.name} style={{ display:'flex', alignItems:'center', gap:14, padding:'14px 20px', borderBottom:i<2?'1px solid var(--border-subtle)':'none' }}>
                    <div style={{ width:40, height:40, borderRadius:'50%', background:`${m.color}22`, color:m.color, display:'flex', alignItems:'center', justifyContent:'center', fontSize:13, fontWeight:700 }}>{m.init}</div>
                    <div style={{ flex:1 }}><div style={{ fontSize:14, fontWeight:600, color:'var(--text-primary)' }}>{m.name}</div><div style={{ fontSize:12, color:'var(--text-secondary)', marginTop:2 }}>{m.role}</div></div>
                    <span style={{ fontSize:11, fontWeight:600, padding:'3px 9px', borderRadius:'var(--radius-full)', background:m.perm==='Admin'?'rgba(124,58,237,.18)':'rgba(6,182,212,.14)', color:m.perm==='Admin'?'var(--brand-light)':'var(--accent-cyan)' }}>{m.perm}</span>
                    <span style={{ fontSize:11.5, color:'var(--text-tertiary)', minWidth:50, textAlign:'right' }}>{m.last}</span>
                    <button onClick={() => showToast('⚙️ Editar membro')} style={{ padding:'4px 10px', borderRadius:'var(--radius-sm)', fontSize:12, fontWeight:600, border:'1px solid var(--border-subtle)', background:'transparent', color:'var(--text-secondary)', cursor:'pointer', fontFamily:'var(--font-body)' }}>⚙️</button>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}

function SecRow({ icon, name, desc, on, onChange }) {
  return (
    <div style={{ display:'flex', alignItems:'center', gap:10, padding:'10px 12px', borderRadius:'var(--radius-sm)', border:'1px solid var(--border-subtle)', background:'var(--bg-overlay)' }}>
      <span style={{ fontSize:18, width:30, textAlign:'center', flexShrink:0 }}>{icon}</span>
      <div style={{ flex:1 }}><div style={{ fontSize:13, fontWeight:600, color:'var(--text-primary)' }}>{name}</div><div style={{ fontSize:11, color:'var(--text-secondary)' }}>{desc}</div></div>
      <Toggle on={on} onChange={onChange} size="sm"/>
    </div>
  );
}
