import { useState, useRef, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';

export function LoginPage() {
  const { login, loading, error, setError } = useAuth();
  const [email, setEmail]   = useState('admin@agendai.com');
  const [pass, setPass]     = useState('123456');
  const [showPw, setShowPw] = useState(false);
  const handle = e => { e.preventDefault(); setError(''); login(email, pass); };
  return (
    <div style={{ minHeight:'100vh', background:'var(--bg-base)', display:'flex', alignItems:'center', justifyContent:'center', position:'relative', overflow:'hidden' }}>
      <div style={{ position:'absolute', top:'10%', left:'15%', width:400, height:400, background:'radial-gradient(circle,rgba(124,58,237,.12) 0%,transparent 70%)', pointerEvents:'none' }}/>
      <div style={{ position:'absolute', bottom:'15%', right:'10%', width:300, height:300, background:'radial-gradient(circle,rgba(6,182,212,.08) 0%,transparent 70%)', pointerEvents:'none' }}/>
      <div style={{ position:'absolute', inset:0, backgroundImage:'radial-gradient(circle at 1px 1px,rgba(124,58,237,.06) 1px,transparent 0)', backgroundSize:'40px 40px', pointerEvents:'none' }}/>
      <div style={{ width:'100%', maxWidth:420, padding:'0 20px', animation:'fadeUp .4s both' }}>
        <div style={{ textAlign:'center', marginBottom:36 }}>
          <div style={{ width:52, height:52, background:'linear-gradient(135deg,var(--brand),var(--accent-cyan))', borderRadius:14, display:'flex', alignItems:'center', justifyContent:'center', fontSize:24, margin:'0 auto 14px', boxShadow:'var(--shadow-brand)' }}>📅</div>
          <div style={{ fontFamily:'var(--font-display)', fontSize:28, fontWeight:800, letterSpacing:'-1px', background:'linear-gradient(135deg,#fff,var(--brand-light))', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent' }}>Agendaí</div>
          <div style={{ fontSize:13, color:'var(--text-secondary)', marginTop:6 }}>Plataforma de Gestão de Agendamentos</div>
        </div>
        <div style={{ background:'var(--bg-elevated)', border:'1px solid var(--border-default)', borderRadius:'var(--radius-xl)', padding:32, boxShadow:'var(--shadow-lg)' }}>
          <div style={{ fontFamily:'var(--font-display)', fontSize:20, fontWeight:800, color:'var(--text-primary)', marginBottom:4 }}>Entrar na conta</div>
          <div style={{ fontSize:13, color:'var(--text-secondary)', marginBottom:24 }}>Use: admin@agendai.com / 123456</div>
          <form onSubmit={handle} style={{ display:'flex', flexDirection:'column', gap:14 }}>
            <Field label="E-mail" icon="📧">
              <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="seu@email.com" style={INP} autoComplete="email"/>
            </Field>
            <Field label="Senha" icon="🔒">
              <div style={{ position:'relative' }}>
                <input type={showPw?'text':'password'} value={pass} onChange={e => setPass(e.target.value)} placeholder="••••••••" style={{ ...INP, paddingRight:40 }} autoComplete="current-password"/>
                <button type="button" onClick={() => setShowPw(p=>!p)} style={{ position:'absolute', right:11, top:'50%', transform:'translateY(-50%)', background:'none', border:'none', cursor:'pointer', fontSize:15, color:'var(--text-tertiary)' }}>{showPw?'🙈':'👁️'}</button>
              </div>
            </Field>
            {error&&<ErrBox msg={error}/>}
            <button type="submit" disabled={loading||!email||!pass} style={{ marginTop:8, padding:12, borderRadius:'var(--radius-sm)', fontSize:14, fontWeight:700, border:'none', background:'linear-gradient(135deg,var(--brand),var(--brand-dark))', color:'#fff', cursor:loading?'not-allowed':'pointer', boxShadow:'var(--shadow-brand)', opacity:(!email||!pass)?.5:1, display:'flex', alignItems:'center', justifyContent:'center', gap:8, fontFamily:'var(--font-body)' }}>
              {loading?<><span className="spin" style={{ display:'inline-block' }}>⏳</span>Entrando...</>:'→ Entrar'}
            </button>
          </form>
          <div style={{ marginTop:24, paddingTop:20, borderTop:'1px solid var(--border-subtle)', display:'flex', justifyContent:'center', gap:20 }}>
            {[['🔒','LGPD'],['🛡️','GDPR'],['🔐','MFA'],['☁️','Backup']].map(([ic,lb]) => (
              <div key={lb} style={{ display:'flex', flexDirection:'column', alignItems:'center', gap:3 }}>
                <span style={{ fontSize:16 }}>{ic}</span>
                <span style={{ fontSize:9.5, fontWeight:700, color:'var(--text-tertiary)', letterSpacing:'0.5px' }}>{lb}</span>
              </div>
            ))}
          </div>
        </div>
        <div style={{ textAlign:'center', marginTop:20, fontSize:12, color:'var(--text-tertiary)' }}>© 2025 Agendaí · Todos os direitos reservados</div>
      </div>
    </div>
  );
}

export function MfaPage() {
  const { verifyMfa, loading, error, setError } = useAuth();
  const [code, setCode] = useState(['','','','','','']);
  const inputs = useRef([]);
  useEffect(() => { inputs.current[0]?.focus(); }, []);
  const handleChange = (i, val) => {
    const v = val.replace(/\D/g,'').slice(0,1);
    const next = [...code]; next[i] = v; setCode(next); setError('');
    if (v && i < 5) inputs.current[i+1]?.focus();
    if (next.every(c => c!=='')) setTimeout(() => verifyMfa(next.join('')), 120);
  };
  const handleKey = (i, e) => { if (e.key==='Backspace' && !code[i] && i>0) inputs.current[i-1]?.focus(); };
  return (
    <div style={{ minHeight:'100vh', background:'var(--bg-base)', display:'flex', alignItems:'center', justifyContent:'center', overflow:'hidden', position:'relative' }}>
      <div style={{ position:'absolute', top:'20%', left:'20%', width:350, height:350, background:'radial-gradient(circle,rgba(124,58,237,.12) 0%,transparent 70%)', pointerEvents:'none' }}/>
      <div style={{ position:'absolute', inset:0, backgroundImage:'radial-gradient(circle at 1px 1px,rgba(124,58,237,.05) 1px,transparent 0)', backgroundSize:'40px 40px', pointerEvents:'none' }}/>
      <div style={{ width:'100%', maxWidth:400, padding:'0 20px', animation:'fadeUp .4s both' }}>
        <div style={{ textAlign:'center', marginBottom:32 }}>
          <div style={{ width:60, height:60, background:'rgba(124,58,237,.18)', borderRadius:16, display:'flex', alignItems:'center', justifyContent:'center', fontSize:28, margin:'0 auto 16px', border:'1px solid var(--border-default)' }}>🔐</div>
          <div style={{ fontFamily:'var(--font-display)', fontSize:22, fontWeight:800, color:'var(--text-primary)', letterSpacing:'-0.5px' }}>Verificação em 2 etapas</div>
          <div style={{ fontSize:13, color:'var(--text-secondary)', marginTop:8, lineHeight:1.6 }}>Digite o código de 6 dígitos do autenticador.<br/><span style={{ color:'var(--accent-amber)' }}>Dica: qualquer 6 dígitos funciona aqui.</span></div>
        </div>
        <div style={{ background:'var(--bg-elevated)', border:'1px solid var(--border-default)', borderRadius:'var(--radius-xl)', padding:32, boxShadow:'var(--shadow-lg)' }}>
          <div style={{ display:'flex', gap:10, justifyContent:'center', marginBottom:24 }}>
            {code.map((c,i) => (
              <input key={i} ref={el => inputs.current[i]=el} type="text" inputMode="numeric" value={c}
                onChange={e => handleChange(i,e.target.value)} onKeyDown={e => handleKey(i,e)} maxLength={1}
                style={{ width:48, height:56, textAlign:'center', fontSize:22, fontWeight:800, background:'var(--bg-overlay)', border:`2px solid ${c?'var(--brand)':'var(--border-default)'}`, borderRadius:'var(--radius-md)', color:'var(--text-primary)', fontFamily:'var(--font-display)', outline:'none', transition:'border var(--transition-fast)' }}/>
            ))}
          </div>
          {error&&<ErrBox msg={error}/>}
          {loading&&<div style={{ display:'flex', alignItems:'center', justifyContent:'center', gap:8, padding:12, color:'var(--text-secondary)', fontSize:13 }}><span className="spin" style={{ display:'inline-block' }}>⏳</span>Verificando...</div>}
          <div style={{ textAlign:'center', marginTop:16 }}>
            <button style={{ background:'none', border:'none', cursor:'pointer', fontSize:13, color:'var(--brand-light)', fontFamily:'var(--font-body)', fontWeight:600 }}>Reenviar código por SMS</button>
          </div>
        </div>
        <div style={{ display:'flex', justifyContent:'center', gap:8, marginTop:20, flexWrap:'wrap' }}>
          {['🔒 Criptografado','🌐 TLS 1.3','🛡️ LGPD'].map(t => <span key={t} style={{ fontSize:11, color:'var(--text-tertiary)', background:'rgba(255,255,255,.04)', padding:'4px 10px', borderRadius:'var(--radius-full)', border:'1px solid var(--border-subtle)' }}>{t}</span>)}
        </div>
      </div>
    </div>
  );
}

const INP = { width:'100%', background:'var(--bg-overlay)', border:'1px solid var(--border-default)', borderRadius:'var(--radius-sm)', padding:'10px 12px 10px 36px', color:'var(--text-primary)', fontSize:13.5, fontFamily:'var(--font-body)', outline:'none' };
function Field({ label, icon, children }) {
  return <div style={{ display:'flex', flexDirection:'column', gap:6 }}>
    <label style={{ fontSize:11.5, fontWeight:600, color:'var(--text-secondary)', letterSpacing:'0.3px' }}>{label}</label>
    <div style={{ position:'relative' }}>
      <span style={{ position:'absolute', left:11, top:'50%', transform:'translateY(-50%)', fontSize:14, pointerEvents:'none' }}>{icon}</span>
      {children}
    </div>
  </div>;
}
function ErrBox({ msg }) {
  return <div style={{ background:'rgba(239,68,68,.1)', border:'1px solid rgba(239,68,68,.25)', borderRadius:'var(--radius-sm)', padding:'10px 14px', fontSize:13, color:'var(--danger)', display:'flex', alignItems:'center', gap:8 }}>⚠️ {msg}</div>;
}
