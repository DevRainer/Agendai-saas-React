import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useApp }  from '../../context/AppContext';

const NAV = [
  { group:'Principal', items:[{id:'dashboard',icon:'⊞',label:'Dashboard'},{id:'agenda',icon:'📆',label:'Agenda',badge:3,badgeColor:'var(--success)'},{id:'clientes',icon:'👥',label:'Clientes'}] },
  { group:'Gestão',    items:[{id:'servicos',icon:'✂️',label:'Serviços'},{id:'pagamentos',icon:'💳',label:'Pagamentos',badge:2},{id:'relatorios',icon:'📊',label:'Relatórios'}] },
  { group:'Sistema',   items:[{id:'integracoes',icon:'🔗',label:'Integrações'},{id:'configuracoes',icon:'⚙️',label:'Configurações'}] },
];

function NavItem({ item, active, onClick }) {
  const [h,setH] = useState(false);
  return (
    <button onClick={onClick} onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)}
      style={{ display:'flex', alignItems:'center', gap:9, padding:'8px 14px', margin:'1px 8px', borderRadius:'var(--radius-sm)', cursor:'pointer', fontSize:13, fontWeight:500, fontFamily:'var(--font-body)', border:'none', width:'calc(100% - 16px)', textAlign:'left', transition:'all var(--transition-fast)', position:'relative', background:active?'rgba(124,58,237,.15)':h?'rgba(124,58,237,.07)':'transparent', color:active?'var(--brand-light)':h?'var(--text-primary)':'var(--text-secondary)' }}>
      {active&&<span style={{ position:'absolute', left:-8, top:'50%', transform:'translateY(-50%)', width:3, height:'60%', background:'linear-gradient(to bottom,var(--brand),var(--accent-cyan))', borderRadius:2 }}/>}
      <span style={{ fontSize:15, width:19, textAlign:'center', flexShrink:0 }}>{item.icon}</span>
      {item.label}
      {item.badge&&<span style={{ marginLeft:'auto', background:item.badgeColor||'var(--brand)', color:'#fff', fontSize:9.5, fontWeight:700, padding:'2px 7px', borderRadius:'var(--radius-full)' }}>{item.badge}</span>}
    </button>
  );
}

export function Sidebar({ page, onNavigate }) {
  const { user, logout }          = useAuth();
  const { unreadCount, setAiOpen } = useApp();
  return (
    <aside style={{ width:232, background:'var(--bg-elevated)', borderRight:'1px solid var(--border-subtle)', display:'flex', flexDirection:'column', flexShrink:0, position:'relative', overflow:'hidden' }}>
      <div style={{ position:'absolute', top:-80, left:-60, width:220, height:220, background:'radial-gradient(circle,rgba(124,58,237,.18) 0%,transparent 70%)', pointerEvents:'none' }}/>
      {/* Logo */}
      <div style={{ padding:'20px 18px', display:'flex', alignItems:'center', gap:10, borderBottom:'1px solid var(--border-subtle)' }}>
        <div style={{ width:34, height:34, background:'linear-gradient(135deg,var(--brand),var(--accent-cyan))', borderRadius:9, display:'flex', alignItems:'center', justifyContent:'center', fontSize:16, flexShrink:0, boxShadow:'var(--shadow-brand)' }}>📅</div>
        <span style={{ fontFamily:'var(--font-display)', fontSize:17, fontWeight:800, letterSpacing:'-0.5px', background:'linear-gradient(135deg,#fff,var(--brand-light))', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent' }}>Agendaí</span>
        <span style={{ fontSize:9, fontWeight:700, color:'var(--accent-cyan)', background:'rgba(6,182,212,.15)', padding:'2px 7px', borderRadius:4, marginLeft:'auto', letterSpacing:'0.5px' }}>PRO</span>
      </div>
      {/* Nav */}
      <nav style={{ padding:'10px 0', flex:1, overflowY:'auto' }}>
        {NAV.map(g => (
          <div key={g.group}>
            <div style={{ padding:'8px 14px 3px', fontSize:9.5, fontWeight:700, color:'var(--text-tertiary)', textTransform:'uppercase', letterSpacing:'1.2px', marginTop:6 }}>{g.group}</div>
            {g.items.map(item => <NavItem key={item.id} item={item} active={page===item.id} onClick={() => onNavigate(item.id)}/>)}
          </div>
        ))}
        {/* AI button */}
        <div style={{ margin:'16px 8px 0' }}>
          <button onClick={() => setAiOpen(true)} style={{ width:'100%', padding:'10px 14px', borderRadius:'var(--radius-sm)', background:'linear-gradient(135deg,rgba(124,58,237,.2),rgba(6,182,212,.15))', border:'1px solid var(--border-default)', cursor:'pointer', fontFamily:'var(--font-body)', display:'flex', alignItems:'center', gap:9 }}>
            <span style={{ fontSize:16 }}>🤖</span>
            <div style={{ textAlign:'left' }}>
              <div style={{ fontSize:12.5, fontWeight:700, color:'var(--brand-light)' }}>Assistente IA</div>
              <div style={{ fontSize:10.5, color:'var(--text-tertiary)' }}>Powered by Claude</div>
            </div>
            <span style={{ marginLeft:'auto', fontSize:9.5, fontWeight:700, padding:'2px 7px', borderRadius:4, background:'rgba(124,58,237,.3)', color:'var(--brand-light)' }}>AI</span>
          </button>
        </div>
      </nav>
      {/* Footer */}
      <div style={{ padding:14, borderTop:'1px solid var(--border-subtle)' }}>
        <div onClick={logout} title="Sair" style={{ display:'flex', alignItems:'center', gap:9, padding:'9px 10px', background:'var(--card-bg)', borderRadius:'var(--radius-sm)', cursor:'pointer' }}>
          <div style={{ width:32, height:32, borderRadius:'50%', background:'linear-gradient(135deg,var(--brand),var(--accent-pink))', display:'flex', alignItems:'center', justifyContent:'center', fontSize:12, fontWeight:700, flexShrink:0 }}>{user?.avatar}</div>
          <div style={{ flex:1, minWidth:0 }}>
            <div style={{ fontSize:12, fontWeight:600, color:'var(--text-primary)', whiteSpace:'nowrap', overflow:'hidden', textOverflow:'ellipsis' }}>{user?.name}</div>
            <div style={{ fontSize:10.5, color:'var(--brand-light)' }}>{user?.plan}</div>
          </div>
          <span style={{ fontSize:12, color:'var(--text-tertiary)' }}>⏻</span>
        </div>
      </div>
    </aside>
  );
}

export function NotifPanel() {
  const { notifications, setNotifOpen, markAllRead, unreadCount } = useApp();
  return (
    <div style={{ position:'fixed', top:0, right:0, height:'100vh', width:320, background:'var(--bg-elevated)', borderLeft:'1px solid var(--border-subtle)', zIndex:100, display:'flex', flexDirection:'column', animation:'slideInRight .3s cubic-bezier(.16,1,.3,1)' }}>
      <div style={{ padding:'18px 20px', borderBottom:'1px solid var(--border-subtle)', display:'flex', alignItems:'center', justifyContent:'space-between' }}>
        <div>
          <span style={{ fontFamily:'var(--font-display)', fontSize:15, fontWeight:800, color:'var(--text-primary)' }}>Notificações</span>
          {unreadCount>0&&<span style={{ marginLeft:8, fontSize:10.5, fontWeight:700, padding:'2px 7px', borderRadius:'var(--radius-full)', background:'var(--brand)', color:'#fff' }}>{unreadCount}</span>}
        </div>
        <div style={{ display:'flex', gap:8 }}>
          {unreadCount>0&&<button onClick={markAllRead} style={{ background:'none', border:'none', cursor:'pointer', fontSize:11.5, color:'var(--brand-light)', fontFamily:'var(--font-body)', fontWeight:600 }}>Marcar todas</button>}
          <button onClick={() => setNotifOpen(false)} style={{ background:'none', border:'none', cursor:'pointer', fontSize:17, color:'var(--text-tertiary)' }}>✕</button>
        </div>
      </div>
      <div style={{ overflowY:'auto', flex:1 }}>
        {notifications.map((n,i) => (
          <div key={n.id} style={{ display:'flex', alignItems:'flex-start', gap:10, padding:'13px 18px', borderBottom:'1px solid var(--border-subtle)', cursor:'pointer', background:!n.read?'rgba(124,58,237,.05)':'transparent' }}>
            <div style={{ width:32, height:32, borderRadius:'50%', background:`${n.color}20`, display:'flex', alignItems:'center', justifyContent:'center', fontSize:14, flexShrink:0 }}>{n.icon}</div>
            <div style={{ flex:1 }}>
              <div style={{ fontSize:12.5, color:'var(--text-primary)', lineHeight:1.5 }}>{n.msg}</div>
              <div style={{ fontSize:10.5, color:'var(--text-tertiary)', marginTop:3 }}>há {n.time}</div>
            </div>
            {!n.read&&<div style={{ width:7, height:7, borderRadius:'50%', background:'var(--brand)', flexShrink:0, marginTop:4 }}/>}
          </div>
        ))}
      </div>
    </div>
  );
}
