import { useState } from 'react';
import { useApp } from '../context/AppContext';
import { useDashboardStats } from '../hooks';
import { Card, CardHeader, CardBody, StatCard, Badge, Avatar, Button, EmptyState } from '../components/ui';
import { BarChart, OccupancyRing } from '../components/charts';
import { REVENUE_WEEKLY, PROFESSIONALS } from '../data/mockData';

export function DashboardPage() {
  const { appointments, setModalOpen, showToast, setAiOpen } = useApp();
  const stats = useDashboardStats();
  const todayAppts = appointments.filter(a => a.date === '2025-05-01').sort((a,b) => a.time.localeCompare(b.time));
  const S = { confirmed:'#10B981', pending:'#FBBF24', cancelled:'#EF4444' };

  return (
    <div style={{ overflowY:'auto', flex:1 }}>
      {/* Topbar */}
      <div style={{ display:'flex', alignItems:'center', gap:10, padding:'13px 22px', borderBottom:'1px solid var(--border-subtle)', background:'rgba(7,7,15,.92)', backdropFilter:'blur(14px)', position:'sticky', top:0, zIndex:20 }}>
        <div>
          <div style={{ fontFamily:'var(--font-display)', fontSize:19, fontWeight:800, color:'var(--text-primary)' }}>Dashboard</div>
          <div style={{ fontSize:11.5, color:'var(--text-secondary)', display:'flex', alignItems:'center', gap:5 }}>
            <span className="pulse" style={{ display:'inline-block', width:6, height:6, background:'var(--success)', borderRadius:'50%' }}/>
            Quinta-feira, 1 de maio de 2025
          </div>
        </div>
        <div style={{ marginLeft:'auto', display:'flex', gap:8 }}>
          <button onClick={() => setAiOpen(true)} style={{ display:'flex', alignItems:'center', gap:6, padding:'7px 14px', borderRadius:'var(--radius-sm)', fontSize:12.5, fontWeight:600, border:'1px solid var(--border-default)', background:'rgba(124,58,237,.1)', color:'var(--brand-light)', cursor:'pointer', fontFamily:'var(--font-body)' }}>🤖 IA</button>
          <button onClick={() => setModalOpen(true)} style={{ display:'flex', alignItems:'center', gap:5, padding:'8px 16px', borderRadius:'var(--radius-sm)', fontSize:12.5, fontWeight:600, border:'none', background:'linear-gradient(135deg,var(--brand),var(--brand-dark))', color:'#fff', cursor:'pointer', boxShadow:'var(--shadow-brand)', fontFamily:'var(--font-body)' }}>＋ Novo agendamento</button>
        </div>
      </div>

      <div style={{ padding:22 }}>
        {/* AI banner */}
        <div onClick={() => setAiOpen(true)} style={{ background:'linear-gradient(135deg,rgba(124,58,237,.15),rgba(6,182,212,.1))', border:'1px solid var(--border-default)', borderRadius:'var(--radius-md)', padding:'11px 18px', display:'flex', alignItems:'center', gap:12, marginBottom:20, cursor:'pointer' }}>
          <span style={{ fontSize:22 }}>🤖</span>
          <span style={{ fontSize:13, color:'var(--text-secondary)' }}><b style={{ color:'var(--brand-light)' }}>Assistente IA ativo</b> — Powered by Claude · Pergunte sobre agendamentos, métricas e configurações</span>
          <div style={{ display:'flex', gap:6, marginLeft:'auto' }}>
            {['LGPD','AES-256','MFA'].map(t => <span key={t} style={{ fontSize:9.5, fontWeight:700, padding:'2px 7px', borderRadius:4, background:'rgba(6,182,212,.14)', color:'var(--accent-cyan)' }}>{t}</span>)}
          </div>
        </div>

        {/* Stats */}
        <div style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:14, marginBottom:20 }}>
          <StatCard icon="📅" value={stats.total}                        label="Agendamentos hoje"  change="12% vs ontem"  up variant="s1"/>
          <StatCard icon="✅" value={`R$${stats.revenue.toLocaleString('pt-BR')}`} label="Faturamento do dia" change="8% esta semana" up variant="s2"/>
          <StatCard icon="🎯" value={`${stats.occupancy}%`}              label="Taxa de ocupação"   change="5% este mês"  up variant="s3"/>
          <StatCard icon="❌" value={`${stats.cancelRate}%`}             label="Cancelamentos"                               variant="s4"/>
        </div>

        {/* Quick actions */}
        <div style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:10, marginBottom:20 }}>
          {[['➕','Novo agendamento',() => setModalOpen(true)],['💬','Enviar lembretes',() => showToast('✉️ Lembretes enviados!')],['📊','Gerar relatório',() => showToast('📊 Relatório gerado!')],['🤖','Assistente IA',() => setAiOpen(true)]].map(([ic,lb,fn],i) => (
            <div key={lb} className={`fade-up stagger-${i+1}`} onClick={fn}
              style={{ background:'var(--card-bg)', border:'1px solid var(--border-subtle)', borderRadius:'var(--radius-sm)', padding:13, display:'flex', flexDirection:'column', alignItems:'center', gap:7, cursor:'pointer', transition:'all var(--transition-base)', textAlign:'center' }}
              onMouseEnter={e => { e.currentTarget.style.borderColor='var(--brand)'; e.currentTarget.style.background='rgba(124,58,237,.07)'; e.currentTarget.style.transform='translateY(-2px)'; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor='var(--border-subtle)'; e.currentTarget.style.background='var(--card-bg)'; e.currentTarget.style.transform='none'; }}>
              <span style={{ fontSize:20 }}>{ic}</span>
              <span style={{ fontSize:11.5, fontWeight:600, color:'var(--text-secondary)' }}>{lb}</span>
            </div>
          ))}
        </div>

        {/* Main grid */}
        <div style={{ display:'grid', gridTemplateColumns:'1.8fr 1fr', gap:16, marginBottom:16 }}>
          <Card>
            <CardHeader title="Agenda de hoje" subtitle={`${todayAppts.length} atendimentos`}/>
            <CardBody>
              {todayAppts.length === 0 ? <EmptyState icon="📅" title="Sem agendamentos hoje"/> :
                <div style={{ display:'flex', flexDirection:'column', gap:7 }}>
                  {todayAppts.map((a,i) => (
                    <div key={a.id} className={`fade-up stagger-${Math.min(i+1,6)}`}
                      style={{ display:'flex', alignItems:'center', gap:10, padding:'10px 12px', borderRadius:'var(--radius-sm)', border:'1px solid var(--border-subtle)', background:'var(--bg-overlay)', cursor:'pointer', transition:'all var(--transition-fast)' }}
                      onMouseEnter={e => { e.currentTarget.style.borderColor='var(--brand)'; e.currentTarget.style.background='rgba(124,58,237,.06)'; }}
                      onMouseLeave={e => { e.currentTarget.style.borderColor='var(--border-subtle)'; e.currentTarget.style.background='var(--bg-overlay)'; }}>
                      <span style={{ fontSize:11.5, fontWeight:700, color:'var(--text-secondary)', minWidth:40, fontVariantNumeric:'tabular-nums' }}>{a.time}</span>
                      <div style={{ width:3, height:34, borderRadius:2, background:S[a.status], flexShrink:0 }}/>
                      <Avatar init={a.init} color={a.color} size={28}/>
                      <div style={{ flex:1, minWidth:0 }}>
                        <div style={{ fontSize:13, fontWeight:600, color:'var(--text-primary)', whiteSpace:'nowrap', overflow:'hidden', textOverflow:'ellipsis' }}>{a.name}</div>
                        <div style={{ fontSize:11, color:'var(--text-secondary)' }}>{a.service} · R${a.value}</div>
                      </div>
                      <Badge status={a.status}/>
                    </div>
                  ))}
                </div>
              }
            </CardBody>
          </Card>
          <div style={{ display:'flex', flexDirection:'column', gap:16 }}>
            <MiniCal/>
            <Card>
              <CardHeader title="Ocupação" subtitle="Esta semana"/>
              <CardBody style={{ padding:'12px 18px 16px' }}>
                <div style={{ display:'flex', justifyContent:'center' }}><OccupancyRing pct={stats.occupancy}/></div>
                <div style={{ display:'flex', flexDirection:'column', gap:9, marginTop:12 }}>
                  {[['var(--success)','Confirmados',stats.confirmed],['var(--accent-amber)','Pendentes',stats.pending],['var(--danger)','Cancelados',stats.cancelled]].map(([c,l,v]) => (
                    <div key={l} style={{ display:'flex', justifyContent:'space-between', fontSize:12.5 }}>
                      <span style={{ display:'flex', alignItems:'center', gap:6, color:'var(--text-secondary)' }}>
                        <span style={{ width:7, height:7, borderRadius:'50%', background:c, display:'inline-block' }}/>{l}
                      </span>
                      <span style={{ fontWeight:700, color:'var(--text-primary)' }}>{v}</span>
                    </div>
                  ))}
                </div>
              </CardBody>
            </Card>
          </div>
        </div>

        {/* Bottom */}
        <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:16, marginBottom:16 }}>
          <Card>
            <CardHeader title="Faturamento" subtitle="Últimos 7 dias"
              action={<span style={{ fontFamily:'var(--font-display)', fontSize:17, fontWeight:800, color:'var(--success)' }}>R$24.680 <span style={{ fontSize:11, fontWeight:600, background:'rgba(16,185,129,.14)', padding:'2px 8px', borderRadius:20 }}>↑14%</span></span>}/>
            <CardBody><BarChart data={REVENUE_WEEKLY} labelKey="label" showValues height={150}/></CardBody>
          </Card>
          <Card>
            <CardHeader title="Atividade recente" subtitle="Em tempo real"
              action={<span style={{ display:'flex', alignItems:'center', gap:5, fontSize:11, color:'var(--text-tertiary)' }}><span className="pulse" style={{ display:'inline-block', width:6, height:6, background:'var(--success)', borderRadius:'50%' }}/>ao vivo</span>}/>
            <CardBody style={{ padding:'4px 18px' }}>
              {[['✅','rgba(16,185,129,.14)','Maria Oliveira confirmou pelo WhatsApp','3 min'],['📅','rgba(124,58,237,.14)','Novo agendamento: Paulo Mendes — 15/05','12 min'],['💰','rgba(251,191,36,.14)','Pagamento Pix confirmado — R$180','28 min'],['❌','rgba(239,68,68,.14)','Carla Souza cancelou — horário liberado','41 min'],['🔔','rgba(6,182,212,.14)','Lembretes enviados para 3 clientes','1h']].map(([ic,bg,txt,t],i) => (
                <div key={i} style={{ display:'flex', gap:10, padding:'10px 0', borderBottom: i<4 ? '1px solid var(--border-subtle)' : 'none' }}>
                  <div style={{ width:30, height:30, borderRadius:'50%', background:bg, display:'flex', alignItems:'center', justifyContent:'center', fontSize:13, flexShrink:0 }}>{ic}</div>
                  <div>
                    <div style={{ fontSize:12.5, color:'var(--text-primary)', fontWeight:500 }}>{txt}</div>
                    <div style={{ fontSize:10.5, color:'var(--text-tertiary)', marginTop:2 }}>há {t}</div>
                  </div>
                </div>
              ))}
            </CardBody>
          </Card>
        </div>

        {/* Professionals */}
        <Card>
          <CardHeader title="Profissionais" subtitle="Status em tempo real"/>
          <CardBody>
            <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:14 }}>
              {PROFESSIONALS.map(p => (
                <div key={p.id} style={{ background:'var(--bg-overlay)', borderRadius:'var(--radius-sm)', padding:'14px 16px', display:'flex', alignItems:'center', gap:12 }}>
                  <div style={{ position:'relative' }}>
                    <div style={{ width:40, height:40, borderRadius:'50%', background:`${p.color}22`, color:p.color, display:'flex', alignItems:'center', justifyContent:'center', fontSize:13, fontWeight:700 }}>{p.avatar}</div>
                    <div style={{ position:'absolute', bottom:1, right:1, width:10, height:10, borderRadius:'50%', background: p.available ? 'var(--success)' : 'var(--text-tertiary)', border:'2px solid var(--bg-overlay)' }}/>
                  </div>
                  <div>
                    <div style={{ fontSize:13, fontWeight:600, color:'var(--text-primary)' }}>{p.name}</div>
                    <div style={{ fontSize:11, color:'var(--text-secondary)' }}>{p.role}</div>
                    <div style={{ fontSize:10.5, color: p.available ? 'var(--success)' : 'var(--text-tertiary)', marginTop:3 }}>{p.available ? '● Disponível' : '● Folga'}</div>
                  </div>
                </div>
              ))}
            </div>
          </CardBody>
        </Card>
      </div>
    </div>
  );
}

function MiniCal() {
  const [month, setMonth] = useState(4), [year, setYear] = useState(2025);
  const M = ['Jan','Fev','Mar','Abr','Mai','Jun','Jul','Ago','Set','Out','Nov','Dez'];
  const D = ['D','S','T','Q','Q','S','S'];
  const EV = [1,3,7,8,14,15,19,22,28];
  const fd = new Date(year,month,1).getDay(), dm = new Date(year,month+1,0).getDate();
  const isCur = year===2025 && month===4;
  const nav = d => { let m=month+d,y=year; if(m>11){m=0;y++;}if(m<0){m=11;y--;}setMonth(m);setYear(y); };
  return (
    <Card>
      <CardBody style={{ padding:16 }}>
        <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:12 }}>
          <span style={{ fontSize:13, fontWeight:700, color:'var(--text-primary)' }}>{M[month]} {year}</span>
          <div style={{ display:'flex', gap:4 }}>
            {['‹','›'].map((a,i) => <button key={i} onClick={() => nav(i===0?-1:1)} style={{ width:24, height:24, background:'var(--bg-overlay)', border:'1px solid var(--border-subtle)', borderRadius:6, cursor:'pointer', fontSize:12, color:'var(--text-secondary)', fontFamily:'var(--font-body)' }}>{a}</button>)}
          </div>
        </div>
        <div style={{ display:'grid', gridTemplateColumns:'repeat(7,1fr)', gap:2 }}>
          {D.map(d => <div key={d} style={{ fontSize:9.5, fontWeight:700, color:'var(--text-tertiary)', textAlign:'center', padding:'3px 0', textTransform:'uppercase' }}>{d}</div>)}
          {Array(fd).fill(0).map((_,i) => <div key={`e${i}`} style={{ visibility:'hidden' }}>x</div>)}
          {Array(dm).fill(0).map((_,i) => {
            const d=i+1, isT=isCur&&d===1, hasE=EV.includes(d);
            return <div key={d} style={{ fontSize:11.5, textAlign:'center', padding:'5px 2px', borderRadius:5, cursor:'pointer', fontWeight:isT?700:500, position:'relative', background:isT?'var(--brand)':'transparent', color:isT?'#fff':'var(--text-secondary)' }}>
              {d}{hasE&&<span style={{ position:'absolute', bottom:1, left:'50%', transform:'translateX(-50%)', width:4, height:4, background:isT?'#fff':'var(--accent-cyan)', borderRadius:'50%', display:'block' }}/>}
            </div>;
          })}
        </div>
      </CardBody>
    </Card>
  );
}
