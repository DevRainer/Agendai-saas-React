import { useState, useMemo } from 'react';
import { useApp } from '../context/AppContext';
import { useCalendar } from '../hooks';
import { Badge, Avatar, Button, Modal, ModalTitle, Input, Select, Chip, EmptyState, Tabs } from '../components/ui';
import { PROFESSIONALS, TIME_SLOTS } from '../data/mockData';

const S_COLOR = { confirmed:'#10B981', pending:'#FBBF24', cancelled:'#EF4444' };

export function AgendaPage() {
  const { appointments, calendarView, setCalendarView, selectedDate, setSelectedDate, setModalOpen, cancelAppointment } = useApp();
  const cal = useCalendar(selectedDate);
  const [selected, setSelected] = useState(null);
  const VIEWS = [{ id:'day', label:'Dia' },{ id:'week', label:'Semana' },{ id:'month', label:'Mês' }];

  const navDir = dir => {
    if (calendarView==='day') cal.navigateDay(dir);
    else if (calendarView==='week') cal.navigateWeek(dir);
    else cal.navigate(dir);
    setSelectedDate(new Date(cal.current));
  };

  const fmtHeader = () => {
    const d = selectedDate, M = cal.MONTHS;
    if (calendarView==='day') return `${cal.DAYS_SHORT[d.getDay()]}, ${d.getDate()} de ${M[d.getMonth()]} ${d.getFullYear()}`;
    if (calendarView==='week') { const w=cal.weekDays; return `${w[0].getDate()} — ${w[6].getDate()} de ${M[d.getMonth()]} ${d.getFullYear()}`; }
    return `${M[d.getMonth()]} ${d.getFullYear()}`;
  };

  return (
    <div style={{ display:'flex', flexDirection:'column', height:'100%', overflow:'hidden' }}>
      {/* Topbar */}
      <div style={{ display:'flex', alignItems:'center', gap:10, padding:'13px 22px', borderBottom:'1px solid var(--border-subtle)', background:'rgba(7,7,15,.92)', backdropFilter:'blur(14px)', position:'sticky', top:0, zIndex:20, flexShrink:0 }}>
        <div>
          <div style={{ fontFamily:'var(--font-display)', fontSize:19, fontWeight:800, color:'var(--text-primary)' }}>Agenda</div>
          <div style={{ fontSize:11.5, color:'var(--text-secondary)', display:'flex', alignItems:'center', gap:5 }}>
            <span className="pulse" style={{ display:'inline-block', width:6, height:6, background:'var(--success)', borderRadius:'50%' }}/>Sincronizado em tempo real
          </div>
        </div>
        <div style={{ marginLeft:'auto', display:'flex', gap:8, alignItems:'center' }}>
          <Tabs tabs={VIEWS} active={calendarView} onChange={setCalendarView}/>
          <div style={{ display:'flex', gap:4 }}>
            {[['‹',()=>navDir(-1)],['Hoje',cal.goToday],['›',()=>navDir(1)]].map(([l,fn]) => (
              <button key={l} onClick={fn} style={{ padding:'6px 12px', borderRadius:'var(--radius-sm)', fontSize:12.5, fontWeight:600, border:'1px solid var(--border-subtle)', background:'transparent', color:'var(--text-secondary)', cursor:'pointer', fontFamily:'var(--font-body)' }}>{l}</button>
            ))}
          </div>
          <button onClick={() => setModalOpen(true)} style={{ padding:'8px 16px', borderRadius:'var(--radius-sm)', fontSize:12.5, fontWeight:600, border:'none', background:'linear-gradient(135deg,var(--brand),var(--brand-dark))', color:'#fff', cursor:'pointer', boxShadow:'var(--shadow-brand)', fontFamily:'var(--font-body)' }}>＋ Novo</button>
        </div>
      </div>

      {/* Date + Prof filter */}
      <div style={{ padding:'12px 22px', borderBottom:'1px solid var(--border-subtle)', background:'var(--bg-elevated)', flexShrink:0 }}>
        <div style={{ fontFamily:'var(--font-display)', fontSize:16, fontWeight:700, color:'var(--text-primary)', marginBottom:8 }}>{fmtHeader()}</div>
        <div style={{ display:'flex', gap:6, flexWrap:'wrap' }}>
          {PROFESSIONALS.map(p => (
            <div key={p.id} style={{ display:'flex', alignItems:'center', gap:5, padding:'4px 10px', borderRadius:'var(--radius-full)', border:'1px solid var(--border-default)', background:'var(--card-bg)', cursor:'pointer', fontSize:12, fontWeight:500, color:'var(--text-secondary)' }}>
              <div style={{ width:8, height:8, borderRadius:'50%', background:p.color }}/>{p.name}{!p.available&&<span style={{ fontSize:10, color:'var(--text-tertiary)' }}>(Folga)</span>}
            </div>
          ))}
        </div>
      </div>

      {/* Calendar */}
      <div style={{ flex:1, overflowY:'auto' }}>
        {calendarView==='month' && <MonthView cal={cal} appointments={appointments} onDayClick={d => { setSelectedDate(d); setCalendarView('day'); }}/>}
        {calendarView==='week'  && <WeekView  cal={cal} appointments={appointments} onApptClick={setSelected} onSlotClick={() => setModalOpen(true)}/>}
        {calendarView==='day'   && <DayView   date={selectedDate} appointments={appointments} onApptClick={setSelected}/>}
      </div>

      {selected && <ApptModal appt={selected} onClose={() => setSelected(null)} onCancel={id => { cancelAppointment(id); setSelected(null); }}/>}
    </div>
  );
}

function MonthView({ cal, appointments, onDayClick }) {
  const byDate = useMemo(() => { const m={}; appointments.forEach(a => { if(!m[a.date]) m[a.date]=[]; m[a.date].push(a); }); return m; }, [appointments]);
  return (
    <div style={{ padding:20 }}>
      <div style={{ display:'grid', gridTemplateColumns:'repeat(7,1fr)', gap:4, marginBottom:4 }}>
        {cal.DAYS_SHORT.map(d => <div key={d} style={{ textAlign:'center', fontSize:11, fontWeight:700, color:'var(--text-tertiary)', padding:'6px 0', textTransform:'uppercase', letterSpacing:'0.8px' }}>{d}</div>)}
      </div>
      <div style={{ display:'grid', gridTemplateColumns:'repeat(7,1fr)', gap:4 }}>
        {cal.monthDays.map((day,i) => {
          const key = `${day.date.getFullYear()}-${String(day.date.getMonth()+1).padStart(2,'0')}-${String(day.date.getDate()).padStart(2,'0')}`;
          const dayAppts = byDate[key]||[];
          const isToday  = day.current && day.day===1 && cal.current.getMonth()===4;
          return (
            <div key={i} onClick={() => day.current && onDayClick(day.date)} style={{ minHeight:90, padding:'7px 8px', borderRadius:'var(--radius-sm)', background:isToday?'rgba(124,58,237,.12)':day.current?'var(--card-bg)':'transparent', border:`1px solid ${isToday?'var(--brand)':day.current?'var(--border-subtle)':'transparent'}`, cursor:day.current?'pointer':'default', opacity:day.current?1:0.3 }}>
              <div style={{ fontSize:13, fontWeight:isToday?800:500, color:isToday?'var(--brand-light)':day.current?'var(--text-primary)':'var(--text-tertiary)', marginBottom:5 }}>{day.day}</div>
              {dayAppts.slice(0,3).map(a => <div key={a.id} style={{ fontSize:10, padding:'2px 5px', borderRadius:4, marginBottom:2, background:`${S_COLOR[a.status]}18`, color:S_COLOR[a.status], fontWeight:600, whiteSpace:'nowrap', overflow:'hidden', textOverflow:'ellipsis' }}>{a.time} {a.name.split(' ')[0]}</div>)}
              {dayAppts.length>3&&<div style={{ fontSize:9.5, color:'var(--text-tertiary)' }}>+{dayAppts.length-3} mais</div>}
            </div>
          );
        })}
      </div>
    </div>
  );
}

function WeekView({ cal, appointments, onApptClick, onSlotClick }) {
  const HOURS = ['08','09','10','11','12','13','14','15','16','17','18'];
  const byKey = useMemo(() => { const m={}; appointments.forEach(a => { const hr=a.time.split(':')[0]; const k=`${a.date}-${hr}`; if(!m[k]) m[k]=[]; m[k].push(a); }); return m; }, [appointments]);
  return (
    <div style={{ overflowX:'auto' }}>
      <div style={{ display:'grid', gridTemplateColumns:'60px repeat(7,1fr)', minWidth:700, position:'sticky', top:0, background:'var(--bg-elevated)', borderBottom:'1px solid var(--border-subtle)', zIndex:5 }}>
        <div/>
        {cal.weekDays.map((d,i) => {
          const isT = d.getDate()===1 && d.getMonth()===4;
          return <div key={i} style={{ padding:'10px 4px', textAlign:'center', borderLeft:'1px solid var(--border-subtle)' }}>
            <div style={{ fontSize:11, fontWeight:700, color:'var(--text-tertiary)', textTransform:'uppercase' }}>{cal.DAYS_SHORT[i]}</div>
            <div style={{ width:28, height:28, borderRadius:'50%', margin:'4px auto 0', background:isT?'var(--brand)':'transparent', display:'flex', alignItems:'center', justifyContent:'center', fontFamily:'var(--font-display)', fontSize:15, fontWeight:700, color:isT?'#fff':'var(--text-primary)' }}>{d.getDate()}</div>
          </div>;
        })}
      </div>
      <div style={{ minWidth:700 }}>
        {HOURS.map(hr => (
          <div key={hr} style={{ display:'grid', gridTemplateColumns:'60px repeat(7,1fr)', borderBottom:'1px solid var(--border-subtle)', minHeight:70 }}>
            <div style={{ padding:'8px 10px 0', fontSize:11, fontWeight:600, color:'var(--text-tertiary)', textAlign:'right' }}>{hr}:00</div>
            {cal.weekDays.map((d,ci) => {
              const key = `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}-${hr}`;
              const appts = byKey[key]||[];
              return <div key={ci} onClick={() => !appts.length && onSlotClick()} style={{ borderLeft:'1px solid var(--border-subtle)', padding:3, cursor:appts.length?'default':'pointer', minHeight:70 }}>
                {appts.map(a => <div key={a.id} onClick={e => { e.stopPropagation(); onApptClick(a); }} style={{ padding:'5px 7px', borderRadius:5, marginBottom:2, cursor:'pointer', background:`${S_COLOR[a.status]}18`, borderLeft:`3px solid ${S_COLOR[a.status]}` }}>
                  <div style={{ fontSize:11.5, fontWeight:600, color:'var(--text-primary)', whiteSpace:'nowrap', overflow:'hidden', textOverflow:'ellipsis' }}>{a.name.split(' ')[0]}</div>
                  <div style={{ fontSize:10, color:'var(--text-secondary)' }}>{a.time} · {a.service}</div>
                </div>)}
              </div>;
            })}
          </div>
        ))}
      </div>
    </div>
  );
}

function DayView({ date, appointments, onApptClick }) {
  const key = date instanceof Date ? `${date.getFullYear()}-${String(date.getMonth()+1).padStart(2,'0')}-${String(date.getDate()).padStart(2,'0')}` : date;
  const appts = appointments.filter(a => a.date===key).sort((a,b) => a.time.localeCompare(b.time));
  return (
    <div style={{ padding:20 }}>
      {appts.length===0 ? <EmptyState icon="📅" title="Nenhum agendamento neste dia" desc="Clique em + Novo para adicionar"/> :
        <div style={{ display:'flex', flexDirection:'column', gap:10 }}>
          {appts.map((a,i) => (
            <div key={a.id} className={`fade-up stagger-${Math.min(i+1,6)}`} onClick={() => onApptClick(a)} style={{ display:'flex', alignItems:'center', gap:14, padding:'14px 18px', background:'var(--card-bg)', border:'1px solid var(--border-subtle)', borderRadius:'var(--radius-md)', cursor:'pointer', transition:'all var(--transition-base)' }}
              onMouseEnter={e => { e.currentTarget.style.borderColor='var(--brand)'; e.currentTarget.style.background='rgba(124,58,237,.04)'; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor='var(--border-subtle)'; e.currentTarget.style.background='var(--card-bg)'; }}>
              <div style={{ textAlign:'right', minWidth:50 }}>
                <div style={{ fontSize:14, fontWeight:700, color:'var(--text-primary)', fontVariantNumeric:'tabular-nums' }}>{a.time}</div>
                <div style={{ fontSize:10.5, color:'var(--text-tertiary)' }}>{a.duration}min</div>
              </div>
              <div style={{ width:4, height:44, borderRadius:2, background:S_COLOR[a.status], flexShrink:0 }}/>
              <Avatar init={a.init} color={a.color} size={38}/>
              <div style={{ flex:1 }}>
                <div style={{ fontSize:14, fontWeight:600, color:'var(--text-primary)' }}>{a.name}</div>
                <div style={{ fontSize:12, color:'var(--text-secondary)', marginTop:2 }}>{a.service} · {a.professional} · R${a.value}</div>
                {a.notes&&<div style={{ fontSize:11, color:'var(--text-tertiary)', marginTop:3 }}>📝 {a.notes}</div>}
              </div>
              <Badge status={a.status}/>
            </div>
          ))}
        </div>
      }
    </div>
  );
}

function ApptModal({ appt, onClose, onCancel }) {
  return (
    <Modal onClose={onClose} width={420}>
      <ModalTitle onClose={onClose} subtitle={`${appt.date} às ${appt.time}`}>Detalhes do Agendamento</ModalTitle>
      <div style={{ display:'flex', flexDirection:'column', gap:16 }}>
        <div style={{ display:'flex', alignItems:'center', gap:14 }}>
          <Avatar init={appt.init} color={appt.color} size={52}/>
          <div><div style={{ fontSize:17, fontWeight:700, color:'var(--text-primary)', fontFamily:'var(--font-display)' }}>{appt.name}</div><div style={{ fontSize:13, color:'var(--text-secondary)', marginTop:3 }}>{appt.phone}</div></div>
          <div style={{ marginLeft:'auto' }}><Badge status={appt.status}/></div>
        </div>
        <div style={{ background:'var(--bg-overlay)', borderRadius:'var(--radius-md)', padding:'14px 16px', display:'grid', gridTemplateColumns:'1fr 1fr', gap:12 }}>
          {[['Serviço',appt.service],['Profissional',appt.professional],['Duração',`${appt.duration} min`],['Valor',`R$ ${appt.value},00`]].map(([k,v]) => (
            <div key={k}><div style={{ fontSize:10.5, fontWeight:700, color:'var(--text-tertiary)', textTransform:'uppercase', letterSpacing:'0.5px', marginBottom:3 }}>{k}</div><div style={{ fontSize:13.5, fontWeight:600, color:'var(--text-primary)' }}>{v}</div></div>
          ))}
        </div>
        {appt.notes&&<div style={{ background:'rgba(251,191,36,.08)', border:'1px solid rgba(251,191,36,.2)', borderRadius:'var(--radius-sm)', padding:'10px 14px', fontSize:13, color:'var(--accent-amber)' }}>📝 {appt.notes}</div>}
        <div style={{ display:'flex', gap:8, justifyContent:'flex-end', marginTop:4 }}>
          {appt.status!=='cancelled'&&<Button variant="danger" onClick={() => onCancel(appt.id)}>❌ Cancelar</Button>}
          <Button variant="secondary" onClick={onClose}>Fechar</Button>
          <Button variant="primary">✏️ Editar</Button>
        </div>
      </div>
    </Modal>
  );
}

export function NewAppointmentModal({ onClose }) {
  const { addAppointment } = useApp();
  const [form, setForm] = useState({ name:'', phone:'', service:'Consulta', professional:'p1', date:'2025-05-01', time:'09:00', payment:'Pix', notes:'' });
  const [chips, setChips] = useState({ wa:true, email:true, sms:false });
  const set = (k,v) => setForm(p => ({ ...p, [k]:v }));
  const svc = { Consulta:{value:180,duration:45}, Retorno:{value:120,duration:30}, Avaliação:{value:250,duration:60}, Exame:{value:200,duration:30} };
  const handle = () => {
    if (!form.name||!form.phone) return;
    const prof = PROFESSIONALS.find(p => p.id===form.professional);
    addAppointment({ ...form, professional:prof?.name||'Dra. Silva', value:svc[form.service]?.value||180, duration:svc[form.service]?.duration||45, status:'confirmed', init:form.name.split(' ').slice(0,2).map(n=>n[0]).join(''), color:'#7C3AED' });
    onClose();
  };
  return (
    <Modal onClose={onClose} width={490}>
      <ModalTitle onClose={onClose} subtitle="Preencha os dados para criar um novo horário">Novo Agendamento</ModalTitle>
      <div style={{ display:'flex', flexDirection:'column', gap:14 }}>
        <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:12 }}>
          <Input label="Nome" value={form.name} onChange={e => set('name',e.target.value)} placeholder="Nome completo" icon="👤"/>
          <Input label="WhatsApp" value={form.phone} onChange={e => set('phone',e.target.value)} placeholder="(11) 99999-9999" icon="📱"/>
        </div>
        <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:12 }}>
          <Select label="Serviço" value={form.service} onChange={e => set('service',e.target.value)} options={['Consulta','Retorno','Avaliação','Exame']}/>
          <Select label="Profissional" value={form.professional} onChange={e => set('professional',e.target.value)} options={PROFESSIONALS.map(p => ({ value:p.id, label:p.name }))}/>
        </div>
        <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:12 }}>
          <Input label="Data" type="date" value={form.date} onChange={e => set('date',e.target.value)}/>
          <Select label="Horário" value={form.time} onChange={e => set('time',e.target.value)} options={TIME_SLOTS}/>
        </div>
        <div>
          <div style={{ fontSize:11, fontWeight:700, color:'var(--text-secondary)', textTransform:'uppercase', letterSpacing:'0.6px', marginBottom:8 }}>Notificar via</div>
          <div style={{ display:'flex', gap:6 }}>
            {[['wa','💬 WhatsApp'],['email','📧 E-mail'],['sms','📱 SMS']].map(([k,l]) => <Chip key={k} label={l} selected={chips[k]} onClick={() => setChips(p => ({ ...p,[k]:!p[k] }))}/>)}
          </div>
        </div>
        <div style={{ display:'flex', gap:8, justifyContent:'flex-end', marginTop:6 }}>
          <Button variant="ghost" onClick={onClose}>Cancelar</Button>
          <Button variant="primary" onClick={handle} disabled={!form.name||!form.phone}>✓ Confirmar</Button>
        </div>
      </div>
    </Modal>
  );
}
