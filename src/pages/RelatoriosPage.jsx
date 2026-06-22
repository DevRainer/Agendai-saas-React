import { useState } from 'react';
import { Card, CardHeader, CardBody, StatCard, Tabs } from '../components/ui';
import { BarChart, LineChart, ProgressBar, DonutChart, OccupancyRing } from '../components/charts';
import { REVENUE_WEEKLY, REVENUE_MONTHLY, CANCELLATION_DATA, OCCUPANCY_DATA, SERVICES } from '../data/mockData';

const PERIOD_TABS  = [{ id:'7d',label:'7 dias' },{ id:'30d',label:'30 dias' },{ id:'3m',label:'3 meses' },{ id:'1y',label:'1 ano' }];
const SECTION_TABS = [{ id:'overview',label:'Visão Geral' },{ id:'revenue',label:'Faturamento' },{ id:'cancellations',label:'Cancelamentos' },{ id:'occupancy',label:'Ocupação' }];

export function RelatoriosPage() {
  const [period, setPeriod]   = useState('30d');
  const [section, setSection] = useState('overview');
  return (
    <div style={{ overflowY:'auto', flex:1 }}>
      <div style={{ display:'flex', alignItems:'center', gap:10, padding:'13px 22px', borderBottom:'1px solid var(--border-subtle)', background:'rgba(7,7,15,.92)', backdropFilter:'blur(14px)', position:'sticky', top:0, zIndex:20 }}>
        <div><div style={{ fontFamily:'var(--font-display)', fontSize:19, fontWeight:800, color:'var(--text-primary)' }}>Relatórios</div><div style={{ fontSize:11.5, color:'var(--text-secondary)' }}>Análises e métricas</div></div>
        <div style={{ marginLeft:'auto', display:'flex', gap:8 }}>
          <Tabs tabs={PERIOD_TABS} active={period} onChange={setPeriod}/>
          <button onClick={() => {}} style={{ padding:'7px 14px', borderRadius:'var(--radius-sm)', fontSize:12.5, fontWeight:600, border:'1px solid var(--border-default)', background:'transparent', color:'var(--text-primary)', cursor:'pointer', fontFamily:'var(--font-body)' }}>📤 Exportar PDF</button>
        </div>
      </div>
      <div style={{ padding:22 }}>
        <div style={{ marginBottom:20 }}><Tabs tabs={SECTION_TABS} active={section} onChange={setSection}/></div>
        {section==='overview'      && <Overview/>}
        {section==='revenue'       && <Revenue/>}
        {section==='cancellations' && <Cancellations/>}
        {section==='occupancy'     && <Occupancy/>}
      </div>
    </div>
  );
}

function Overview() {
  return (
    <>
      <div style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:14, marginBottom:20 }}>
        <StatCard icon="💰" value="R$89.240" label="Faturamento mensal"  change="18% vs anterior" up variant="s1"/>
        <StatCard icon="📅" value="612"       label="Atendimentos/mês"   change="32 a mais"        up variant="s2"/>
        <StatCard icon="⏱️" value="42min"     label="Duração média"      change="3min otimizado"   up variant="s3"/>
        <StatCard icon="📉" value="6,2%"      label="Taxa cancelamento"  change="1,8% melhora"     up variant="s4"/>
      </div>
      <div style={{ display:'grid', gridTemplateColumns:'1.6fr 1fr', gap:16, marginBottom:16 }}>
        <Card>
          <CardHeader title="Faturamento — 8 semanas" subtitle="Crescimento consistente"/>
          <CardBody>
            <BarChart data={[{l:'S1',v:18500},{l:'S2',v:22300},{l:'S3',v:19800},{l:'S4',v:24100},{l:'S5',v:21600},{l:'S6',v:26800},{l:'S7',v:23400},{l:'S8',v:28900}]} labelKey="l" showValues height={180}/>
          </CardBody>
        </Card>
        <Card>
          <CardHeader title="Top serviços por receita"/>
          <CardBody>
            <div style={{ display:'flex', flexDirection:'column', gap:16 }}>
              {SERVICES.filter(s=>s.active).map((s,i) => <ProgressBar key={s.id} label={`${s.icon} ${s.name}`} value={s.revenue} max={60000} subLabel={`R$${(s.revenue/1000).toFixed(1)}k · `} color={['var(--brand)','var(--success)','var(--accent-cyan)','var(--accent-pink)'][i%4]}/>)}
            </div>
          </CardBody>
        </Card>
      </div>
      <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:16 }}>
        <Card>
          <CardHeader title="Métodos de pagamento"/>
          <CardBody style={{ display:'flex', flexDirection:'column', alignItems:'center', gap:16 }}>
            <div style={{ position:'relative' }}>
              <DonutChart size={130} segments={[{ value:58, color:'var(--accent-cyan)' },{ value:31, color:'var(--brand)' },{ value:11, color:'var(--accent-amber)' }]}/>
              <div style={{ position:'absolute', inset:0, display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center' }}>
                <div style={{ fontFamily:'var(--font-display)', fontSize:18, fontWeight:800, color:'var(--text-primary)' }}>89%</div>
                <div style={{ fontSize:10, color:'var(--text-secondary)' }}>recebido</div>
              </div>
            </div>
            <div style={{ width:'100%', display:'flex', flexDirection:'column', gap:8 }}>
              {[['var(--accent-cyan)','Pix','58%'],['var(--brand)','Cartão','31%'],['var(--accent-amber)','Outros','11%']].map(([c,l,v]) => (
                <div key={l} style={{ display:'flex', alignItems:'center', justifyContent:'space-between', fontSize:12.5 }}>
                  <span style={{ display:'flex', alignItems:'center', gap:7, color:'var(--text-secondary)' }}><span style={{ width:8, height:8, borderRadius:'50%', background:c, display:'inline-block' }}/>{l}</span>
                  <span style={{ fontWeight:700, color:'var(--text-primary)' }}>{v}</span>
                </div>
              ))}
            </div>
          </CardBody>
        </Card>
        <Card>
          <CardHeader title="Taxa de retorno"/>
          <CardBody style={{ display:'flex', flexDirection:'column', alignItems:'center', gap:14 }}>
            <OccupancyRing pct={68} size={100}/>
            <div style={{ width:'100%', display:'flex', flexDirection:'column', gap:8 }}>
              {[['#10B981','Retornaram',348],['#EF4444','Não retornaram',164]].map(([c,l,v]) => (
                <div key={l} style={{ display:'flex', alignItems:'center', justifyContent:'space-between', fontSize:12.5 }}>
                  <span style={{ display:'flex', alignItems:'center', gap:7, color:'var(--text-secondary)' }}><span style={{ width:8, height:8, borderRadius:'50%', background:c, display:'inline-block' }}/>{l}</span>
                  <span style={{ fontWeight:700, color:'var(--text-primary)' }}>{v}</span>
                </div>
              ))}
            </div>
          </CardBody>
        </Card>
        <Card>
          <CardHeader title="Avaliação dos clientes"/>
          <CardBody>
            <div style={{ display:'flex', flexDirection:'column', gap:10 }}>
              {[5,4,3,2,1].map((star,i) => {
                const counts=[148,62,23,8,3], total=244, cnt=counts[i];
                return <div key={star} style={{ display:'flex', alignItems:'center', gap:9 }}>
                  <span style={{ fontSize:12, color:'var(--accent-amber)', minWidth:14 }}>{star}</span>
                  <span style={{ fontSize:13 }}>⭐</span>
                  <div style={{ flex:1, height:7, background:'rgba(255,255,255,.07)', borderRadius:4 }}><div style={{ height:'100%', width:`${(cnt/total)*100}%`, background:'var(--accent-amber)', borderRadius:4 }}/></div>
                  <span style={{ fontSize:11, color:'var(--text-tertiary)', minWidth:24, textAlign:'right' }}>{cnt}</span>
                </div>;
              })}
              <div style={{ textAlign:'center', marginTop:10 }}>
                <div style={{ fontFamily:'var(--font-display)', fontSize:28, fontWeight:800, color:'var(--accent-amber)' }}>4.8</div>
                <div style={{ fontSize:11.5, color:'var(--text-secondary)' }}>de 244 avaliações</div>
              </div>
            </div>
          </CardBody>
        </Card>
      </div>
    </>
  );
}

function Revenue() {
  return (
    <>
      <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:14, marginBottom:20 }}>
        <StatCard icon="💰" value="R$89.240" label="Total do mês"       change="18%" up variant="s1"/>
        <StatCard icon="📈" value="R$2.975"  label="Ticket médio/dia"   change="7%"  up variant="s2"/>
        <StatCard icon="🏆" value="R$250"    label="Serviço mais caro"               variant="s3"/>
      </div>
      <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:16, marginBottom:16 }}>
        <Card><CardHeader title="Faturamento semanal"/><CardBody><BarChart data={REVENUE_WEEKLY} labelKey="label" showValues height={180}/></CardBody></Card>
        <Card><CardHeader title="Faturamento mensal 2025"/><CardBody><BarChart data={REVENUE_MONTHLY.filter(d=>d.value>0)} labelKey="label" showValues height={180} colors={['#A78BFA','#A78BFA','#A78BFA','#A78BFA','#7C3AED']}/></CardBody></Card>
      </div>
      <Card>
        <CardHeader title="Projeção de faturamento" subtitle="Crescimento de 18% ao mês"/>
        <CardBody>
          <LineChart height={140} data={[{v:72000},{v:68000},{v:81000},{v:75000},{v:89240},{v:105000},{v:124000},{v:146000}]} color="#7C3AED"/>
          <div style={{ display:'flex', justifyContent:'space-between', marginTop:8 }}>
            {['Jan','Fev','Mar','Abr','Mai','Jun*','Jul*','Ago*'].map((m,i) => <span key={m} style={{ fontSize:10, color:i>=5?'var(--brand-light)':'var(--text-tertiary)', fontWeight:i>=5?600:400 }}>{m}</span>)}
          </div>
          <div style={{ marginTop:12, padding:'10px 14px', background:'rgba(124,58,237,.08)', borderRadius:'var(--radius-sm)', border:'1px solid var(--border-subtle)', fontSize:12.5, color:'var(--text-secondary)' }}>
            <b style={{ color:'var(--brand-light)' }}>Projeção agosto:</b> R$ 146.000 (+64% vs janeiro)
          </div>
        </CardBody>
      </Card>
    </>
  );
}

function Cancellations() {
  const reasons = [{ label:'Esqueceu o horário',pct:42,color:'var(--danger)' },{ label:'Indisponibilidade',pct:28,color:'var(--accent-amber)' },{ label:'Problema de saúde',pct:18,color:'var(--accent-cyan)' },{ label:'Outros motivos',pct:12,color:'var(--text-tertiary)' }];
  return (
    <>
      <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:14, marginBottom:20 }}>
        <StatCard icon="📉" value="6,2%"  label="Taxa atual"             change="1,8% melhora" up variant="s2"/>
        <StatCard icon="🔔" value="94%"   label="Confirmação por lembrete" change="3% melhora" up variant="s1"/>
        <StatCard icon="💸" value="R$744" label="Receita perdida/mês"    change="R$200 a menos" up variant="s3"/>
      </div>
      <div style={{ display:'grid', gridTemplateColumns:'1.5fr 1fr', gap:16 }}>
        <Card>
          <CardHeader title="Evolução da taxa de cancelamento" subtitle="Meta: abaixo de 5%"/>
          <CardBody>
            <LineChart data={CANCELLATION_DATA} valueKey="rate" color="#EF4444" fillOpacity={0.12} height={140}/>
            <div style={{ display:'flex', justifyContent:'space-between', marginTop:8 }}>
              {CANCELLATION_DATA.map(d => <span key={d.label} style={{ fontSize:10, color:'var(--text-tertiary)' }}>{d.label}</span>)}
            </div>
          </CardBody>
        </Card>
        <Card>
          <CardHeader title="Principais motivos"/>
          <CardBody style={{ display:'flex', flexDirection:'column', gap:14 }}>
            {reasons.map(r => <ProgressBar key={r.label} label={r.label} value={r.pct} max={100} color={r.color} subLabel="" showPct/>)}
            <div style={{ marginTop:8, padding:'10px 14px', background:'rgba(16,185,129,.08)', border:'1px solid rgba(16,185,129,.2)', borderRadius:'var(--radius-sm)', fontSize:12.5, color:'var(--success)' }}>
              💡 <b>Dica:</b> 42% dos cancelamentos são evitáveis com lembretes 24h antes.
            </div>
          </CardBody>
        </Card>
      </div>
    </>
  );
}

function Occupancy() {
  return (
    <>
      <div style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:14, marginBottom:20 }}>
        <StatCard icon="🎯" value="78%"  label="Ocupação média"     change="5% esta semana" up variant="s1"/>
        <StatCard icon="📅" value="47"   label="Atendimentos hoje"  change="12% vs ontem"   up variant="s2"/>
        <StatCard icon="⏳" value="8"    label="Horários livres"                               variant="s3"/>
        <StatCard icon="🏃" value="3"    label="Profissionais ativos"                          variant="s4"/>
      </div>
      <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:16, marginBottom:16 }}>
        <Card>
          <CardHeader title="Ocupação por dia da semana" subtitle="Últimas 4 semanas"/>
          <CardBody><BarChart data={OCCUPANCY_DATA} labelKey="label" valueKey="occ" showValues height={160} colors={OCCUPANCY_DATA.map(d => d.occ>=80?'#10B981':d.occ>=60?'#FBBF24':'#EF4444')}/></CardBody>
        </Card>
        <Card>
          <CardHeader title="Ocupação por profissional"/>
          <CardBody style={{ display:'flex', flexDirection:'column', gap:18 }}>
            {[['Dra. Silva','#7C3AED',92],['Dr. Mendes','#06B6D4',78],['Dra. Costa','#F472B6',64]].map(([name,color,pct]) => (
              <div key={name} style={{ display:'flex', alignItems:'center', gap:12 }}>
                <div style={{ width:36, height:36, borderRadius:'50%', background:`${color}22`, color, display:'flex', alignItems:'center', justifyContent:'center', fontSize:11, fontWeight:700, flexShrink:0 }}>{name.split(' ').map(n=>n[0]).join('')}</div>
                <div style={{ flex:1 }}>
                  <div style={{ display:'flex', justifyContent:'space-between', marginBottom:5, fontSize:12.5 }}>
                    <span style={{ fontWeight:600, color:'var(--text-primary)' }}>{name}</span>
                    <span style={{ fontWeight:700, color }}>{pct}%</span>
                  </div>
                  <div style={{ height:6, background:'rgba(255,255,255,.07)', borderRadius:3 }}><div style={{ height:'100%', width:`${pct}%`, background:color, borderRadius:3 }}/></div>
                </div>
              </div>
            ))}
          </CardBody>
        </Card>
      </div>
    </>
  );
}
