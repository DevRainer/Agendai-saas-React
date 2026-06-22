import { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Card, CardHeader, StatCard, Badge, Button, Avatar, Modal, ModalTitle, Input, EmptyState } from '../components/ui';
import { useFilteredClients } from '../hooks';
import { APPOINTMENTS } from '../data/mockData';

export function ClientesPage() {
  const { showToast, setModalOpen } = useApp();
  const [search, setSearch]   = useState('');
  const [statusF, setStatusF] = useState('');
  const [sortBy, setSortBy]   = useState('name');
  const [selected, setSelected] = useState(null);
  const [newOpen, setNewOpen]   = useState(false);

  const filtered = useFilteredClients(search, statusF);
  const sorted   = [...filtered].sort((a,b) => sortBy==='name' ? a.name.localeCompare(b.name) : b[sortBy]-a[sortBy]);

  return (
    <div style={{ overflowY:'auto', flex:1 }}>
      {/* Topbar */}
      <div style={{ display:'flex', alignItems:'center', gap:10, padding:'13px 22px', borderBottom:'1px solid var(--border-subtle)', background:'rgba(7,7,15,.92)', backdropFilter:'blur(14px)', position:'sticky', top:0, zIndex:20 }}>
        <div><div style={{ fontFamily:'var(--font-display)', fontSize:19, fontWeight:800, color:'var(--text-primary)' }}>Clientes</div><div style={{ fontSize:11.5, color:'var(--text-secondary)' }}>{filtered.length} clientes</div></div>
        <div style={{ marginLeft:'auto', display:'flex', gap:8, alignItems:'center' }}>
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="🔍 Buscar..." style={{ background:'var(--card-bg)', border:'1px solid var(--border-subtle)', borderRadius:'var(--radius-sm)', padding:'7px 12px', color:'var(--text-primary)', fontSize:12.5, fontFamily:'var(--font-body)', outline:'none', width:200 }}/>
          <button onClick={() => showToast('📤 Exportando...')} style={{ padding:'7px 14px', borderRadius:'var(--radius-sm)', fontSize:12.5, fontWeight:600, border:'1px solid var(--border-default)', background:'transparent', color:'var(--text-primary)', cursor:'pointer', fontFamily:'var(--font-body)' }}>📤 Exportar</button>
          <button onClick={() => setNewOpen(true)} style={{ padding:'8px 16px', borderRadius:'var(--radius-sm)', fontSize:12.5, fontWeight:600, border:'none', background:'linear-gradient(135deg,var(--brand),var(--brand-dark))', color:'#fff', cursor:'pointer', boxShadow:'var(--shadow-brand)', fontFamily:'var(--font-body)' }}>＋ Novo cliente</button>
        </div>
      </div>
      <div style={{ padding:22 }}>
        <div style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:14, marginBottom:20 }}>
          <StatCard icon="👥" value="1.247" label="Total"         change="23 este mês" up variant="s1"/>
          <StatCard icon="✅" value={filtered.filter(c=>c.status==='Ativo').length} label="Ativos" variant="s2"/>
          <StatCard icon="🔄" value="68%"   label="Taxa de retorno" change="4%" up variant="s3"/>
          <StatCard icon="💰" value="R$1.530" label="Gasto médio" change="9%" up variant="s4"/>
        </div>
        {/* Filters */}
        <div style={{ display:'flex', alignItems:'center', gap:10, marginBottom:16 }}>
          <div style={{ display:'flex', gap:2, background:'var(--bg-overlay)', borderRadius:'var(--radius-sm)', padding:3 }}>
            {[['','Todos'],['Ativo','Ativos'],['Inativo','Inativos']].map(([v,l]) => (
              <button key={v} onClick={() => setStatusF(v)} style={{ padding:'6px 14px', borderRadius:6, fontSize:12.5, fontWeight:600, border:'none', cursor:'pointer', fontFamily:'var(--font-body)', background:statusF===v?'var(--card-hover)':'transparent', color:statusF===v?'var(--text-primary)':'var(--text-secondary)' }}>{l}</button>
            ))}
          </div>
          <div style={{ marginLeft:'auto', display:'flex', alignItems:'center', gap:6 }}>
            <span style={{ fontSize:12.5, color:'var(--text-secondary)' }}>Ordenar:</span>
            <select value={sortBy} onChange={e => setSortBy(e.target.value)} style={{ background:'var(--card-bg)', border:'1px solid var(--border-subtle)', borderRadius:'var(--radius-sm)', padding:'5px 10px', color:'var(--text-primary)', fontSize:12.5, fontFamily:'var(--font-body)', outline:'none' }}>
              <option value="name">Nome</option><option value="totalSpent">Maior gasto</option><option value="totalVisits">Mais visitas</option>
            </select>
          </div>
        </div>
        <Card>
          {sorted.length===0 ? <EmptyState icon="👥" title="Nenhum cliente encontrado"/> :
            <table style={{ width:'100%', borderCollapse:'collapse' }}>
              <thead><tr style={{ borderBottom:'1px solid var(--border-subtle)' }}>
                {['Cliente','Contato','Último atend.','Visitas','Total','Avaliação','Status','Ações'].map(h => <th key={h} style={{ textAlign:'left', padding:'11px 16px', fontSize:10.5, color:'var(--text-tertiary)', fontWeight:700, textTransform:'uppercase', letterSpacing:'0.4px' }}>{h}</th>)}
              </tr></thead>
              <tbody>
                {sorted.map((c,i) => (
                  <tr key={c.id} className={`fade-up stagger-${Math.min(i+1,6)}`} style={{ borderBottom:'1px solid var(--border-subtle)', transition:'background var(--transition-fast)' }}
                    onMouseEnter={e => e.currentTarget.style.background='rgba(255,255,255,.015)'}
                    onMouseLeave={e => e.currentTarget.style.background='transparent'}>
                    <td style={{ padding:'12px 16px' }} onClick={() => setSelected(c)}>
                      <div style={{ display:'flex', alignItems:'center', gap:10 }}><Avatar init={c.init} color={c.color} size={34}/><div><div style={{ fontSize:13.5, fontWeight:600, color:'var(--text-primary)' }}>{c.name}</div><div style={{ fontSize:11, color:'var(--text-tertiary)', marginTop:2 }}>{c.email}</div></div></div>
                    </td>
                    <td style={{ padding:'12px 16px', fontSize:13, color:'var(--text-secondary)' }}>{c.phone}</td>
                    <td style={{ padding:'12px 16px', fontSize:13, color:'var(--text-secondary)' }}>{c.lastVisit}</td>
                    <td style={{ padding:'12px 16px', fontSize:13, fontWeight:600, color:'var(--text-primary)', textAlign:'center' }}>{c.totalVisits}</td>
                    <td style={{ padding:'12px 16px' }}><div style={{ fontFamily:'var(--font-display)', fontSize:14, fontWeight:800, color:'var(--success)' }}>R${c.totalSpent.toLocaleString('pt-BR')}</div></td>
                    <td style={{ padding:'12px 16px', fontSize:13, letterSpacing:1 }}>{'⭐'.repeat(c.rating||0)}</td>
                    <td style={{ padding:'12px 16px' }}><Badge status={c.status}/></td>
                    <td style={{ padding:'12px 16px' }}>
                      <div style={{ display:'flex', gap:5 }}>
                        <Button variant="secondary" size="xs" onClick={() => setModalOpen(true)}>📅</Button>
                        <Button variant="secondary" size="xs" onClick={() => showToast(`💬 WhatsApp: ${c.name}`)}>💬</Button>
                        <Button variant="ghost"     size="xs" onClick={() => setSelected(c)}>Ver</Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          }
        </Card>
      </div>
      {selected && <ClientModal client={selected} onClose={() => setSelected(null)} onSchedule={() => { setSelected(null); setModalOpen(true); }}/>}
      {newOpen   && <NewClientModal onClose={() => setNewOpen(false)} onSave={d => { showToast(`✅ ${d.name} cadastrado!`); setNewOpen(false); }}/>}
    </div>
  );
}

function ClientModal({ client:c, onClose, onSchedule }) {
  const [tab, setTab] = useState('info');
  const appts = APPOINTMENTS.filter(a => a.name===c.name);
  return (
    <Modal onClose={onClose} width={520}>
      <ModalTitle onClose={onClose}>Perfil do cliente</ModalTitle>
      <div style={{ display:'flex', alignItems:'center', gap:16, padding:'16px 20px', background:'var(--bg-overlay)', borderRadius:'var(--radius-md)', marginBottom:20 }}>
        <Avatar init={c.init} color={c.color} size={56}/>
        <div style={{ flex:1 }}>
          <div style={{ fontFamily:'var(--font-display)', fontSize:18, fontWeight:800, color:'var(--text-primary)' }}>{c.name}</div>
          <div style={{ fontSize:13, color:'var(--text-secondary)', marginTop:3 }}>{c.email} · {c.phone}</div>
          <div style={{ display:'flex', gap:8, marginTop:8 }}><Badge status={c.status}/><span style={{ fontSize:11, color:'var(--text-tertiary)' }}>Cliente desde 2023</span></div>
        </div>
        <div style={{ textAlign:'right' }}><div style={{ fontFamily:'var(--font-display)', fontSize:22, fontWeight:800, color:'var(--success)' }}>R${c.totalSpent.toLocaleString('pt-BR')}</div><div style={{ fontSize:11, color:'var(--text-secondary)' }}>{c.totalVisits} visitas</div></div>
      </div>
      <div style={{ display:'flex', gap:2, background:'var(--bg-overlay)', borderRadius:'var(--radius-sm)', padding:3, width:'fit-content', marginBottom:18 }}>
        {[{id:'info',label:'Informações'},{id:'history',label:'Histórico'},{id:'notes',label:'Notas'}].map(t => <button key={t.id} onClick={() => setTab(t.id)} style={{ padding:'6px 14px', borderRadius:6, fontSize:12.5, fontWeight:600, border:'none', cursor:'pointer', fontFamily:'var(--font-body)', background:tab===t.id?'var(--card-hover)':'transparent', color:tab===t.id?'var(--text-primary)':'var(--text-secondary)' }}>{t.label}</button>)}
      </div>
      {tab==='info' && <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:12 }}>
        {[['📅','Nascimento',c.birthdate],['📱','Telefone',c.phone],['📧','E-mail',c.email],['🏥','Último atend.',c.lastVisit],['📊','Visitas',c.totalVisits],['⭐','Avaliação',`${c.rating}/5`]].map(([ic,k,v]) => (
          <div key={k} style={{ background:'var(--bg-overlay)', borderRadius:'var(--radius-sm)', padding:'12px 14px' }}>
            <div style={{ fontSize:10.5, color:'var(--text-tertiary)', fontWeight:700, textTransform:'uppercase', letterSpacing:'0.5px', marginBottom:5 }}>{ic} {k}</div>
            <div style={{ fontSize:13.5, fontWeight:600, color:'var(--text-primary)' }}>{v}</div>
          </div>
        ))}
      </div>}
      {tab==='history' && <div style={{ display:'flex', flexDirection:'column', gap:8 }}>
        {appts.length===0 ? <EmptyState icon="📅" title="Sem histórico"/> : appts.map(a => (
          <div key={a.id} style={{ display:'flex', alignItems:'center', gap:12, padding:'11px 14px', background:'var(--bg-overlay)', borderRadius:'var(--radius-sm)' }}>
            <div style={{ width:4, height:36, borderRadius:2, background:a.status==='confirmed'?'var(--success)':a.status==='pending'?'var(--accent-amber)':'var(--danger)', flexShrink:0 }}/>
            <div style={{ flex:1 }}><div style={{ fontSize:13, fontWeight:600, color:'var(--text-primary)' }}>{a.service}</div><div style={{ fontSize:11.5, color:'var(--text-secondary)' }}>{a.date} às {a.time} · {a.professional}</div></div>
            <div style={{ textAlign:'right' }}><div style={{ fontWeight:700, color:'var(--text-primary)' }}>R${a.value}</div><Badge status={a.status}/></div>
          </div>
        ))}
      </div>}
      {tab==='notes' && <textarea placeholder="Observações sobre o cliente..." rows={5} style={{ width:'100%', background:'var(--bg-overlay)', border:'1px solid var(--border-default)', borderRadius:'var(--radius-sm)', padding:'12px 14px', color:'var(--text-primary)', fontSize:13, fontFamily:'var(--font-body)', outline:'none', resize:'vertical' }}/>}
      <div style={{ display:'flex', gap:8, justifyContent:'flex-end', marginTop:20 }}>
        <Button variant="ghost" onClick={onClose}>Fechar</Button>
        <Button variant="secondary">💬 WhatsApp</Button>
        <Button variant="primary" onClick={onSchedule}>📅 Agendar</Button>
      </div>
    </Modal>
  );
}

function NewClientModal({ onClose, onSave }) {
  const [form, setForm] = useState({ name:'', phone:'', email:'', birthdate:'', notes:'' });
  const set = (k,v) => setForm(p => ({ ...p,[k]:v }));
  return (
    <Modal onClose={onClose} width={460}>
      <ModalTitle onClose={onClose} subtitle="Preencha os dados do novo cliente">Novo cliente</ModalTitle>
      <div style={{ display:'flex', flexDirection:'column', gap:14 }}>
        <Input label="Nome completo" value={form.name} onChange={e => set('name',e.target.value)} placeholder="Nome do cliente" icon="👤"/>
        <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:12 }}>
          <Input label="WhatsApp" value={form.phone} onChange={e => set('phone',e.target.value)} placeholder="(11) 99999-9999" icon="📱"/>
          <Input label="E-mail" type="email" value={form.email} onChange={e => set('email',e.target.value)} placeholder="email@exemplo.com" icon="📧"/>
        </div>
        <Input label="Data de nascimento" type="date" value={form.birthdate} onChange={e => set('birthdate',e.target.value)}/>
        <div style={{ display:'flex', flexDirection:'column', gap:6 }}>
          <label style={{ fontSize:11, fontWeight:700, color:'var(--text-secondary)', textTransform:'uppercase', letterSpacing:'0.6px' }}>Observações</label>
          <textarea value={form.notes} onChange={e => set('notes',e.target.value)} placeholder="Alergias, histórico, preferências..." rows={3} style={{ background:'var(--bg-elevated)', border:'1px solid var(--border-default)', borderRadius:'var(--radius-sm)', padding:'9px 12px', color:'var(--text-primary)', fontSize:13, fontFamily:'var(--font-body)', outline:'none', resize:'vertical' }}/>
        </div>
        <div style={{ display:'flex', gap:8, justifyContent:'flex-end', marginTop:6 }}>
          <Button variant="ghost" onClick={onClose}>Cancelar</Button>
          <Button variant="primary" onClick={() => onSave(form)} disabled={!form.name||!form.phone}>✅ Cadastrar</Button>
        </div>
      </div>
    </Modal>
  );
}
