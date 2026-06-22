import { useState } from 'react';

export function Button({ children, variant='primary', size='md', onClick, disabled, fullWidth, icon, style:s }) {
  const sz = { xs:{p:'4px 10px',fs:11,r:'var(--radius-xs)'}, sm:{p:'6px 12px',fs:12,r:'var(--radius-sm)'}, md:{p:'8px 16px',fs:13,r:'var(--radius-sm)'}, lg:{p:'10px 20px',fs:14,r:'var(--radius-md)'} }[size];
  const vr = { primary:{background:'linear-gradient(135deg,var(--brand),var(--brand-dark))',color:'#fff',boxShadow:'var(--shadow-brand)',border:'none'}, secondary:{background:'var(--card-bg)',color:'var(--text-primary)',border:'1px solid var(--border-default)'}, ghost:{background:'transparent',color:'var(--text-secondary)',border:'1px solid var(--border-subtle)'}, danger:{background:'rgba(239,68,68,.15)',color:'var(--danger)',border:'1px solid rgba(239,68,68,.25)'}, success:{background:'rgba(16,185,129,.15)',color:'var(--success)',border:'1px solid rgba(16,185,129,.25)'} }[variant];
  return <button style={{ display:'inline-flex', alignItems:'center', justifyContent:'center', gap:6, fontFamily:'var(--font-body)', fontWeight:600, cursor:disabled?'not-allowed':'pointer', transition:'all var(--transition-base)', whiteSpace:'nowrap', opacity:disabled?.5:1, width:fullWidth?'100%':undefined, padding:sz.p, fontSize:sz.fs, borderRadius:sz.r, ...vr, ...s }} onClick={onClick} disabled={disabled}>{icon&&<span style={{ fontSize:14 }}>{icon}</span>}{children}</button>;
}

const BS = { confirmed:{bg:'rgba(16,185,129,.14)',color:'var(--success)',label:'Confirmado'}, pending:{bg:'rgba(251,191,36,.14)',color:'var(--accent-amber)',label:'Pendente'}, cancelled:{bg:'rgba(239,68,68,.14)',color:'var(--danger)',label:'Cancelado'}, paid:{bg:'rgba(16,185,129,.14)',color:'var(--success)',label:'Pago'}, ativo:{bg:'rgba(16,185,129,.14)',color:'var(--success)',label:'Ativo'}, inativo:{bg:'rgba(74,74,106,.25)',color:'var(--text-tertiary)',label:'Inativo'} };
export function Badge({ status }) {
  const k = (status||'').toLowerCase(); const s = BS[k]||BS.inativo;
  return <span style={{ fontSize:10.5, fontWeight:600, padding:'3px 9px', borderRadius:'var(--radius-full)', background:s.bg, color:s.color, flexShrink:0 }}>{s.label}</span>;
}

export function Card({ children, style:s }) {
  return <div style={{ background:'var(--card-bg)', border:'1px solid var(--border-subtle)', borderRadius:'var(--radius-md)', overflow:'hidden', ...s }}>{children}</div>;
}
export function CardHeader({ title, subtitle, action, icon }) {
  return <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', padding:'16px 20px', borderBottom:'1px solid var(--border-subtle)' }}>
    <div style={{ display:'flex', alignItems:'center', gap:10 }}>
      {icon&&<span style={{ fontSize:18 }}>{icon}</span>}
      <div>
        <div style={{ fontSize:14, fontWeight:700, color:'var(--text-primary)', fontFamily:'var(--font-display)' }}>{title}</div>
        {subtitle&&<div style={{ fontSize:11.5, color:'var(--text-secondary)', marginTop:2 }}>{subtitle}</div>}
      </div>
    </div>
    {action}
  </div>;
}
export function CardBody({ children, style:s }) { return <div style={{ padding:20, ...s }}>{children}</div>; }

export function Toggle({ on, onChange, size='md' }) {
  const d = size==='sm' ? {w:30,h:17,b:11} : {w:36,h:20,b:14};
  return <button onClick={() => onChange(!on)} style={{ width:d.w, height:d.h, borderRadius:d.h, border:'none', cursor:'pointer', background:on?'var(--success)':'var(--text-tertiary)', position:'relative', transition:'background var(--transition-base)', flexShrink:0 }}>
    <span style={{ position:'absolute', width:d.b, height:d.b, background:'#fff', borderRadius:'50%', top:(d.h-d.b)/2, left:on?d.w-d.b-3:3, transition:'left var(--transition-base)', boxShadow:'0 1px 4px rgba(0,0,0,.3)' }}/>
  </button>;
}

export function Input({ label, type='text', value, onChange, placeholder, icon, style:s }) {
  const [f,setF] = useState(false);
  return <div style={{ display:'flex', flexDirection:'column', gap:6, ...s }}>
    {label&&<label style={{ fontSize:11, fontWeight:700, color:'var(--text-secondary)', textTransform:'uppercase', letterSpacing:'0.6px' }}>{label}</label>}
    <div style={{ position:'relative' }}>
      {icon&&<span style={{ position:'absolute', left:11, top:'50%', transform:'translateY(-50%)', fontSize:14, color:'var(--text-tertiary)', pointerEvents:'none' }}>{icon}</span>}
      <input type={type} value={value} onChange={onChange} placeholder={placeholder} onFocus={() => setF(true)} onBlur={() => setF(false)} style={{ width:'100%', background:'var(--bg-elevated)', border:`1px solid ${f?'var(--brand)':'var(--border-default)'}`, borderRadius:'var(--radius-sm)', padding:icon?'9px 12px 9px 34px':'9px 12px', color:'var(--text-primary)', fontSize:13, fontFamily:'var(--font-body)', outline:'none', transition:'border var(--transition-fast)' }}/>
    </div>
  </div>;
}

export function Select({ label, value, onChange, options, style:s }) {
  return <div style={{ display:'flex', flexDirection:'column', gap:6, ...s }}>
    {label&&<label style={{ fontSize:11, fontWeight:700, color:'var(--text-secondary)', textTransform:'uppercase', letterSpacing:'0.6px' }}>{label}</label>}
    <select value={value} onChange={onChange} style={{ background:'var(--bg-elevated)', border:'1px solid var(--border-default)', borderRadius:'var(--radius-sm)', padding:'9px 12px', color:'var(--text-primary)', fontSize:13, fontFamily:'var(--font-body)', outline:'none', width:'100%', cursor:'pointer' }}>
      {options.map(o => <option key={o.value??o} value={o.value??o} style={{ background:'var(--bg-elevated)' }}>{o.label??o}</option>)}
    </select>
  </div>;
}

export function Chip({ label, selected, onClick }) {
  return <button onClick={onClick} style={{ padding:'5px 12px', borderRadius:'var(--radius-full)', fontSize:12, fontWeight:600, cursor:'pointer', transition:'all var(--transition-fast)', fontFamily:'var(--font-body)', border:`1px solid ${selected?'var(--brand)':'var(--border-default)'}`, background:selected?'rgba(124,58,237,.18)':'transparent', color:selected?'var(--brand-light)':'var(--text-secondary)' }}>{label}</button>;
}

export function Avatar({ init, color, size=32, style:s }) {
  return <div style={{ width:size, height:size, borderRadius:'50%', background:`${color}22`, color, display:'flex', alignItems:'center', justifyContent:'center', fontSize:size*.34, fontWeight:700, flexShrink:0, ...s }}>{init}</div>;
}

const SA = { s1:{bg:'rgba(124,58,237,.18)',color:'var(--brand-light)',bar:'linear-gradient(90deg,var(--brand),var(--accent-cyan))'}, s2:{bg:'rgba(16,185,129,.18)',color:'var(--success)',bar:'linear-gradient(90deg,var(--success),var(--accent-cyan))'}, s3:{bg:'rgba(251,191,36,.18)',color:'var(--accent-amber)',bar:'linear-gradient(90deg,var(--accent-amber),var(--accent-pink))'}, s4:{bg:'rgba(239,68,68,.18)',color:'var(--danger)',bar:'linear-gradient(90deg,var(--danger),var(--accent-pink))'} };
export function StatCard({ icon, value, label, change, up, variant='s1', onClick }) {
  const [h,setH] = useState(false); const a = SA[variant];
  return <div onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)} onClick={onClick} style={{ background:'var(--card-bg)', border:`1px solid ${h?'var(--border-default)':'var(--border-subtle)'}`, borderRadius:'var(--radius-md)', padding:'18px 20px', position:'relative', overflow:'hidden', transition:'all var(--transition-base)', cursor:onClick?'pointer':'default', transform:h?'translateY(-2px)':'none', boxShadow:h?'var(--shadow-md)':'none' }}>
    <div style={{ position:'absolute', bottom:0, left:0, right:0, height:2, background:a.bar, opacity:h?1:0, transition:'opacity var(--transition-base)' }}/>
    <div style={{ width:36, height:36, borderRadius:'var(--radius-sm)', background:a.bg, color:a.color, display:'flex', alignItems:'center', justifyContent:'center', fontSize:17, marginBottom:14 }}>{icon}</div>
    <div style={{ fontFamily:'var(--font-display)', fontSize:24, fontWeight:800, color:'var(--text-primary)', lineHeight:1, letterSpacing:'-0.5px' }}>{value}</div>
    <div style={{ fontSize:12, color:'var(--text-secondary)', marginTop:5, fontWeight:500 }}>{label}</div>
    {change&&<div style={{ fontSize:11, fontWeight:600, marginTop:10, color:up?'var(--success)':'var(--danger)', display:'flex', alignItems:'center', gap:3 }}>{up?'↑':'↓'} {change}</div>}
  </div>;
}

export function ToastList({ toasts }) {
  return <div style={{ position:'fixed', bottom:24, right:24, zIndex:9999, display:'flex', flexDirection:'column', gap:8 }}>
    {toasts.map(t => <div key={t.id} style={{ background:'var(--card-hover)', border:'1px solid var(--border-default)', color:'var(--text-primary)', padding:'12px 18px', borderRadius:'var(--radius-md)', fontSize:13, fontWeight:500, boxShadow:'var(--shadow-lg)', animation:'toastIn .3s both', maxWidth:320, lineHeight:1.5 }}>{t.msg}</div>)}
  </div>;
}

export function Modal({ children, onClose, width=480 }) {
  return <div onClick={e => e.target===e.currentTarget&&onClose()} style={{ position:'fixed', inset:0, background:'rgba(0,0,0,.78)', zIndex:200, display:'flex', alignItems:'center', justifyContent:'center', animation:'fadeIn .2s' }}>
    <div style={{ background:'var(--bg-elevated)', border:'1px solid var(--border-strong)', borderRadius:'var(--radius-xl)', padding:28, width, maxWidth:'95vw', maxHeight:'90vh', overflowY:'auto', animation:'scaleIn .25s both' }}>{children}</div>
  </div>;
}
export function ModalTitle({ children, subtitle, onClose }) {
  return <div style={{ marginBottom:22 }}>
    <div style={{ display:'flex', alignItems:'flex-start', justifyContent:'space-between' }}>
      <div style={{ fontFamily:'var(--font-display)', fontSize:18, fontWeight:800, color:'var(--text-primary)', letterSpacing:'-0.3px' }}>{children}</div>
      {onClose&&<button onClick={onClose} style={{ background:'none', border:'none', cursor:'pointer', fontSize:18, color:'var(--text-tertiary)', padding:'2px 4px' }}>✕</button>}
    </div>
    {subtitle&&<div style={{ fontSize:13, color:'var(--text-secondary)', marginTop:4 }}>{subtitle}</div>}
  </div>;
}

export function Tabs({ tabs, active, onChange }) {
  return <div style={{ display:'flex', gap:2, background:'var(--bg-overlay)', borderRadius:'var(--radius-sm)', padding:3, width:'fit-content' }}>
    {tabs.map(t => <button key={t.id} onClick={() => onChange(t.id)} style={{ padding:'7px 16px', borderRadius:6, fontSize:12.5, fontWeight:600, cursor:'pointer', fontFamily:'var(--font-body)', border:'none', transition:'all var(--transition-fast)', background:active===t.id?'var(--card-hover)':'transparent', color:active===t.id?'var(--text-primary)':'var(--text-secondary)', boxShadow:active===t.id?'var(--shadow-sm)':'none' }}>{t.label}</button>)}
  </div>;
}

export function SearchBox({ value, onChange, placeholder='Buscar...', width=200 }) {
  const [f,setF] = useState(false);
  return <div style={{ display:'flex', alignItems:'center', gap:8, background:'var(--card-bg)', border:`1px solid ${f?'var(--brand)':'var(--border-subtle)'}`, borderRadius:'var(--radius-sm)', padding:'7px 12px', width, transition:'border var(--transition-fast)' }}>
    <span style={{ color:'var(--text-tertiary)', fontSize:14 }}>🔍</span>
    <input value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder} onFocus={() => setF(true)} onBlur={() => setF(false)} style={{ background:'none', border:'none', outline:'none', color:'var(--text-primary)', fontSize:13, fontFamily:'var(--font-body)', width:'100%' }}/>
  </div>;
}

export function EmptyState({ icon='📭', title, desc }) {
  return <div style={{ display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', padding:'48px 24px', gap:12, color:'var(--text-tertiary)' }}>
    <span style={{ fontSize:40 }}>{icon}</span>
    <div style={{ fontSize:14, fontWeight:600, color:'var(--text-secondary)' }}>{title}</div>
    {desc&&<div style={{ fontSize:12.5, textAlign:'center' }}>{desc}</div>}
  </div>;
}

export function Textarea({ label, value, onChange, placeholder, rows=3 }) {
  const [f,setF] = useState(false);
  return <div style={{ display:'flex', flexDirection:'column', gap:6 }}>
    {label&&<label style={{ fontSize:11, fontWeight:700, color:'var(--text-secondary)', textTransform:'uppercase', letterSpacing:'0.6px' }}>{label}</label>}
    <textarea value={value} onChange={onChange} placeholder={placeholder} rows={rows} onFocus={() => setF(true)} onBlur={() => setF(false)} style={{ width:'100%', background:'var(--bg-elevated)', border:`1px solid ${f?'var(--brand)':'var(--border-default)'}`, borderRadius:'var(--radius-sm)', padding:'9px 12px', color:'var(--text-primary)', fontSize:13, fontFamily:'var(--font-body)', outline:'none', resize:'vertical', transition:'border var(--transition-fast)' }}/>
  </div>;
}
