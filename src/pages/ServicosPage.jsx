import { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Card, CardHeader, CardBody, StatCard, Button, Toggle, Modal, ModalTitle, Input, Select } from '../components/ui';
import { BarChart, SparkBars } from '../components/charts';
import { PAYMENTS } from '../data/mockData';

export function ServicosPage() {
  const { services, toggleService, showToast } = useApp();
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing]     = useState(null);
  const total = services.reduce((s,sv) => s+sv.revenue, 0);
  return (
    <div style={{ overflowY:'auto', flex:1 }}>
      <div style={{ display:'flex', alignItems:'center', gap:10, padding:'13px 22px', borderBottom:'1px solid var(--border-subtle)', background:'rgba(7,7,15,.92)', backdropFilter:'blur(14px)', position:'sticky', top:0, zIndex:20 }}>
        <div><div style={{ fontFamily:'var(--font-display)', fontSize:19, fontWeight:800, color:'var(--text-primary)' }}>Serviços</div><div style={{ fontSize:11.5, color:'var(--text-secondary)' }}>Catálogo e preços</div></div>
        <div style={{ marginLeft:'auto' }}><button onClick={() => { setEditing(null); setModalOpen(true); }} style={{ padding:'8px 16px', borderRadius:'var(--radius-sm)', fontSize:12.5, fontWeight:600, border:'none', background:'linear-gradient(135deg,var(--brand),var(--brand-dark))', color:'#fff', cursor:'pointer', boxShadow:'var(--shadow-brand)', fontFamily:'var(--font-body)' }}>＋ Novo serviço</button></div>
      </div>
      <div style={{ padding:22 }}>
        <div style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:14, marginBottom:20 }}>
          <StatCard icon="✂️" value={services.length}     label="Total serviços" variant="s1"/>
          <StatCard icon="✅" value={services.filter(s=>s.active).length} label="Ativos" variant="s2"/>
          <StatCard icon="💰" value="R$175" label="Ticket médio" change="5%" up variant="s3"/>
          <StatCard icon="📊" value={`R$${(total/1000).toFixed(0)}k`} label="Receita total" change="18%" up variant="s4"/>
        </div>
        <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:14, marginBottom:20 }}>
          {services.map((svc,i) => (
            <div key={svc.id} className={`fade-up stagger-${Math.min(i+1,6)}`} style={{ background:'var(--card-bg)', border:'1px solid var(--border-subtle)', borderRadius:'var(--radius-md)', padding:18, opacity:svc.active?1:0.6, transition:'all var(--transition-base)' }}
              onMouseEnter={e => { e.currentTarget.style.borderColor='var(--border-default)'; e.currentTarget.style.transform='translateY(-2px)'; e.currentTarget.style.boxShadow='var(--shadow-md)'; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor='var(--border-subtle)'; e.currentTarget.style.transform='none'; e.currentTarget.style.boxShadow='none'; }}>
              <div style={{ display:'flex', alignItems:'flex-start', justifyContent:'space-between', marginBottom:14 }}>
                <div style={{ display:'flex', alignItems:'center', gap:10 }}>
                  <div style={{ width:40, height:40, borderRadius:'var(--radius-sm)', background:'rgba(124,58,237,.15)', display:'flex', alignItems:'center', justifyContent:'center', fontSize:20 }}>{svc.icon}</div>
                  <div><div style={{ fontSize:14, fontWeight:700, color:'var(--text-primary)', fontFamily:'var(--font-display)' }}>{svc.name}</div><div style={{ fontSize:11, color:'var(--text-tertiary)', marginTop:2 }}>{svc.category}</div></div>
                </div>
                <Toggle on={svc.active} onChange={() => toggleService(svc.id)} size="sm"/>
              </div>
              <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:10, marginBottom:14 }}>
                <div style={{ background:'var(--bg-overlay)', borderRadius:'var(--radius-sm)', padding:'10px 12px' }}>
                  <div style={{ fontSize:10, color:'var(--text-tertiary)', fontWeight:700, textTransform:'uppercase', letterSpacing:'0.5px', marginBottom:4 }}>Preço</div>
                  <div style={{ fontFamily:'var(--font-display)', fontSize:18, fontWeight:800, color:'var(--brand-light)' }}>R${svc.price}</div>
                </div>
                <div style={{ background:'var(--bg-overlay)', borderRadius:'var(--radius-sm)', padding:'10px 12px' }}>
                  <div style={{ fontSize:10, color:'var(--text-tertiary)', fontWeight:700, textTransform:'uppercase', letterSpacing:'0.5px', marginBottom:4 }}>Duração</div>
                  <div style={{ fontFamily:'var(--font-display)', fontSize:18, fontWeight:800, color:'var(--text-primary)' }}>{svc.duration}min</div>
                </div>
              </div>
              <div style={{ marginBottom:12 }}>
                <div style={{ display:'flex', justifyContent:'space-between', fontSize:11.5, marginBottom:6 }}>
                  <span style={{ color:'var(--text-secondary)' }}>Agendamentos</span>
                  <span style={{ fontWeight:700, color:'var(--text-primary)' }}>{svc.totalBookings}</span>
                </div>
                <SparkBars data={[svc.totalBookings*.6,svc.totalBookings*.7,svc.totalBookings*.75,svc.totalBookings*.8,svc.totalBookings*.88,svc.totalBookings*.93,svc.totalBookings].map(Math.round)} height={28} color="var(--brand)"/>
              </div>
              <div style={{ display:'flex', gap:6 }}>
                <button onClick={() => { setEditing(svc); setModalOpen(true); }} style={{ flex:1, padding:'6px', borderRadius:'var(--radius-sm)', fontSize:12, fontWeight:600, border:'1px solid var(--border-default)', background:'transparent', color:'var(--text-primary)', cursor:'pointer', fontFamily:'var(--font-body)' }}>✏️ Editar</button>
                <button onClick={() => showToast(`🗑️ "${svc.name}" removido`)} style={{ padding:'6px 10px', borderRadius:'var(--radius-sm)', fontSize:12, border:'1px solid rgba(239,68,68,.25)', background:'rgba(239,68,68,.1)', color:'var(--danger)', cursor:'pointer', fontFamily:'var(--font-body)' }}>🗑️</button>
              </div>
            </div>
          ))}
          <div onClick={() => { setEditing(null); setModalOpen(true); }} style={{ minHeight:160, background:'var(--card-bg)', border:'1px dashed var(--border-default)', borderRadius:'var(--radius-md)', display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', gap:10, cursor:'pointer', transition:'all var(--transition-base)' }}
            onMouseEnter={e => e.currentTarget.style.borderColor='var(--brand)'} onMouseLeave={e => e.currentTarget.style.borderColor='var(--border-default)'}>
            <span style={{ fontSize:30, color:'var(--text-tertiary)' }}>＋</span>
            <span style={{ fontSize:13, fontWeight:600, color:'var(--text-tertiary)' }}>Adicionar serviço</span>
          </div>
        </div>
        <Card>
          <CardHeader title="Receita por serviço" subtitle="Comparativo de desempenho"/>
          <CardBody><BarChart data={services.filter(s=>s.active).map(s => ({ label:s.name, value:s.revenue }))} showValues height={160} colors={['#7C3AED','#06B6D4','#F472B6','#10B981','#FBBF24','#A78BFA']}/></CardBody>
        </Card>
      </div>
      {modalOpen && <SvcModal svc={editing} onClose={() => { setModalOpen(false); setEditing(null); }} onSave={d => { showToast(`✅ "${d.name}" salvo!`); setModalOpen(false); }}/>}
    </div>
  );
}

function SvcModal({ svc, onClose, onSave }) {
  const [form, setForm] = useState({ name:svc?.name||'', icon:svc?.icon||'✂️', price:svc?.price||150, duration:svc?.duration||45, category:svc?.category||'Clínico', active:svc?.active??true });
  const set = (k,v) => setForm(p => ({ ...p,[k]:v }));
  const ICONS = ['✂️','🩺','📋','🔬','💉','💻','🧴','🦷','💆','🏋️','👁️','🩹'];
  return (
    <Modal onClose={onClose} width={460}>
      <ModalTitle onClose={onClose} subtitle={svc?'Editar serviço':'Novo serviço'}>{svc?'Editar serviço':'Novo serviço'}</ModalTitle>
      <div style={{ display:'flex', flexDirection:'column', gap:14 }}>
        <div>
          <div style={{ fontSize:11, fontWeight:700, color:'var(--text-secondary)', textTransform:'uppercase', letterSpacing:'0.6px', marginBottom:8 }}>Ícone</div>
          <div style={{ display:'flex', gap:6, flexWrap:'wrap' }}>{ICONS.map(ic => <button key={ic} onClick={() => set('icon',ic)} style={{ width:38, height:38, fontSize:20, borderRadius:'var(--radius-sm)', cursor:'pointer', border:`1px solid ${form.icon===ic?'var(--brand)':'var(--border-default)'}`, background:form.icon===ic?'rgba(124,58,237,.18)':'var(--bg-overlay)' }}>{ic}</button>)}</div>
        </div>
        <Input label="Nome" value={form.name} onChange={e => set('name',e.target.value)} placeholder="Ex: Consulta Geral"/>
        <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:12 }}>
          <Input label="Preço (R$)" type="number" value={form.price} onChange={e => set('price',+e.target.value)}/>
          <Input label="Duração (min)" type="number" value={form.duration} onChange={e => set('duration',+e.target.value)}/>
        </div>
        <Select label="Categoria" value={form.category} onChange={e => set('category',e.target.value)} options={['Clínico','Diagnóstico','Cirúrgico','Online','Estético','Fisioterapia']}/>
        <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', padding:'12px 14px', background:'var(--bg-overlay)', borderRadius:'var(--radius-sm)' }}>
          <div><div style={{ fontSize:13, fontWeight:600, color:'var(--text-primary)' }}>Serviço ativo</div><div style={{ fontSize:11.5, color:'var(--text-secondary)' }}>Disponível para agendamento</div></div>
          <Toggle on={form.active} onChange={v => set('active',v)}/>
        </div>
        <div style={{ display:'flex', gap:8, justifyContent:'flex-end', marginTop:6 }}>
          <Button variant="ghost" onClick={onClose}>Cancelar</Button>
          <Button variant="primary" onClick={() => onSave(form)} disabled={!form.name}>💾 Salvar</Button>
        </div>
      </div>
    </Modal>
  );
}

export function PagamentosPage() {
  const { showToast } = useApp();
  const [filter, setFilter] = useState('all');
  const [search, setSearch] = useState('');
  const filtered = PAYMENTS.filter(p => (filter==='all'||p.status===filter) && (!search||p.client.toLowerCase().includes(search.toLowerCase())));
  const totalPaid    = PAYMENTS.filter(p=>p.status==='paid').reduce((s,p)=>s+p.value,0);
  const totalPending = PAYMENTS.filter(p=>p.status==='pending').reduce((s,p)=>s+p.value,0);
  return (
    <div style={{ overflowY:'auto', flex:1 }}>
      <div style={{ display:'flex', alignItems:'center', gap:10, padding:'13px 22px', borderBottom:'1px solid var(--border-subtle)', background:'rgba(7,7,15,.92)', backdropFilter:'blur(14px)', position:'sticky', top:0, zIndex:20 }}>
        <div><div style={{ fontFamily:'var(--font-display)', fontSize:19, fontWeight:800, color:'var(--text-primary)' }}>Pagamentos</div><div style={{ fontSize:11.5, color:'var(--text-secondary)' }}>Cobranças e transações</div></div>
        <div style={{ marginLeft:'auto' }}><button onClick={() => showToast('💳 Emitir cobrança em breve!')} style={{ padding:'8px 16px', borderRadius:'var(--radius-sm)', fontSize:12.5, fontWeight:600, border:'none', background:'linear-gradient(135deg,var(--brand),var(--brand-dark))', color:'#fff', cursor:'pointer', boxShadow:'var(--shadow-brand)', fontFamily:'var(--font-body)' }}>＋ Emitir cobrança</button></div>
      </div>
      <div style={{ padding:22 }}>
        <div style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:14, marginBottom:20 }}>
          <StatCard icon="💰" value={`R$${totalPaid.toLocaleString('pt-BR')}`} label="Recebido hoje" change="8%" up variant="s2"/>
          <StatCard icon="⏳" value={`R$${totalPending}`} label="Aguardando" variant="s3"/>
          <StatCard icon="📊" value="89%" label="Taxa recebimento" change="2%" up variant="s1"/>
          <StatCard icon="💳" value="Pix" label="Método favorito" variant="s4"/>
        </div>
        <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:14, marginBottom:20 }}>
          {[['⚡','Pix','rgba(6,182,212,.1)','var(--accent-cyan)',PAYMENTS.filter(p=>p.method==='Pix')],['💳','Cartão','rgba(124,58,237,.1)','var(--brand-light)',PAYMENTS.filter(p=>p.method==='Cartão')],['💵','Dinheiro','rgba(16,185,129,.1)','var(--success)',[]]].map(([ic,lb,bg,col,items]) => (
            <div key={lb} style={{ background:'var(--card-bg)', border:'1px solid var(--border-subtle)', borderRadius:'var(--radius-md)', padding:'16px 18px', display:'flex', alignItems:'center', gap:14 }}>
              <div style={{ width:44, height:44, borderRadius:'var(--radius-sm)', background:bg, display:'flex', alignItems:'center', justifyContent:'center', fontSize:22, flexShrink:0 }}>{ic}</div>
              <div><div style={{ fontSize:13, fontWeight:600, color:'var(--text-secondary)' }}>{lb}</div><div style={{ fontFamily:'var(--font-display)', fontSize:20, fontWeight:800, color:col }}>R${items.reduce((s,p)=>s+p.value,0)}</div><div style={{ fontSize:11, color:'var(--text-tertiary)' }}>{items.length} transações</div></div>
            </div>
          ))}
        </div>
        <Card>
          <CardHeader title="Transações recentes"
            action={<div style={{ display:'flex', gap:8, alignItems:'center' }}>
              <input value={search} onChange={e => setSearch(e.target.value)} placeholder="🔍 Buscar..." style={{ background:'var(--bg-overlay)', border:'1px solid var(--border-subtle)', borderRadius:'var(--radius-sm)', padding:'6px 11px', color:'var(--text-primary)', fontSize:12.5, fontFamily:'var(--font-body)', outline:'none', width:150 }}/>
              <div style={{ display:'flex', gap:2, background:'var(--bg-overlay)', borderRadius:'var(--radius-sm)', padding:3 }}>
                {[['all','Todos'],['paid','Pagos'],['pending','Pendentes']].map(([v,l]) => <button key={v} onClick={() => setFilter(v)} style={{ padding:'5px 12px', borderRadius:5, fontSize:12, fontWeight:600, border:'none', cursor:'pointer', fontFamily:'var(--font-body)', background:filter===v?'var(--card-hover)':'transparent', color:filter===v?'var(--text-primary)':'var(--text-secondary)' }}>{l}</button>)}
              </div>
            </div>}/>
          <div>
            <table style={{ width:'100%', borderCollapse:'collapse' }}>
              <thead><tr style={{ borderBottom:'1px solid var(--border-subtle)' }}>{['Cliente','Serviço','Método','Data','Valor','Status','Ação'].map(h => <th key={h} style={{ textAlign:'left', padding:'11px 18px', fontSize:10.5, color:'var(--text-tertiary)', fontWeight:700, textTransform:'uppercase', letterSpacing:'0.5px' }}>{h}</th>)}</tr></thead>
              <tbody>
                {filtered.map((p,i) => (
                  <tr key={p.id} className={`fade-up stagger-${Math.min(i+1,6)}`} style={{ borderBottom:'1px solid var(--border-subtle)' }}
                    onMouseEnter={e => e.currentTarget.style.background='rgba(255,255,255,.015)'} onMouseLeave={e => e.currentTarget.style.background='transparent'}>
                    <td style={{ padding:'12px 18px' }}><div style={{ display:'flex', alignItems:'center', gap:9 }}><div style={{ width:30, height:30, borderRadius:'50%', background:`${p.color}22`, color:p.color, display:'flex', alignItems:'center', justifyContent:'center', fontSize:10.5, fontWeight:700, flexShrink:0 }}>{p.init}</div><span style={{ fontSize:13, fontWeight:500, color:'var(--text-primary)' }}>{p.client}</span></div></td>
                    <td style={{ padding:'12px 18px', fontSize:13, color:'var(--text-secondary)' }}>{p.service}</td>
                    <td style={{ padding:'12px 18px' }}><span style={{ fontSize:11.5, fontWeight:600, padding:'3px 9px', borderRadius:'var(--radius-full)', background:p.method==='Pix'?'rgba(6,182,212,.14)':'rgba(124,58,237,.14)', color:p.method==='Pix'?'var(--accent-cyan)':'var(--brand-light)' }}>{p.method}</span></td>
                    <td style={{ padding:'12px 18px', fontSize:13, color:'var(--text-secondary)' }}>{p.date}</td>
                    <td style={{ padding:'12px 18px', fontFamily:'var(--font-display)', fontSize:14, fontWeight:800, color:'var(--text-primary)' }}>R${p.value}</td>
                    <td style={{ padding:'12px 18px' }}><span style={{ fontSize:10.5, fontWeight:600, padding:'3px 9px', borderRadius:'var(--radius-full)', background:p.status==='paid'?'rgba(16,185,129,.14)':'rgba(251,191,36,.14)', color:p.status==='paid'?'var(--success)':'var(--accent-amber)' }}>{p.status==='paid'?'Pago':'Pendente'}</span></td>
                    <td style={{ padding:'12px 18px' }}>{p.status==='pending'?<button onClick={() => showToast('✅ Pago!')} style={{ padding:'4px 10px', borderRadius:'var(--radius-sm)', fontSize:11, fontWeight:600, border:'1px solid rgba(16,185,129,.25)', background:'rgba(16,185,129,.15)', color:'var(--success)', cursor:'pointer', fontFamily:'var(--font-body)' }}>Confirmar</button>:<button onClick={() => showToast('🧾 Recibo enviado!')} style={{ padding:'4px 10px', borderRadius:'var(--radius-sm)', fontSize:11, fontWeight:600, border:'1px solid var(--border-subtle)', background:'transparent', color:'var(--text-secondary)', cursor:'pointer', fontFamily:'var(--font-body)' }}>🧾 Recibo</button>}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    </div>
  );
}
