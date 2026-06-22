import { useState, useRef, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { useAuth } from '../context/AuthContext';

const SYSTEM = `Você é o Assistente IA do Agendaí, plataforma SaaS de gestão de agendamentos. Ajude profissionais de saúde, salões, academias e consultórios. Contexto atual: 47 agendamentos hoje, R$4.280 faturamento, 78% ocupação, 6.2% cancelamentos, 1.247 clientes, 3 profissionais ativos. Seja conciso, prático e amigável. Responda em português brasileiro.`;

const SUGGESTIONS = ['📅 Horários disponíveis amanhã?','📊 Faturamento desta semana','🔔 Como reduzir cancelamentos?','💡 Dicas para aumentar ocupação','👥 Clientes sem retorno em 30 dias'];

export function AIAssistant() {
  const { setAiOpen } = useApp();
  const { user }      = useAuth();
  const [msgs, setMsgs] = useState([{ role:'assistant', content:`Olá, ${user?.name?.split(' ')[0]||'Doutor(a)'}! 👋 Sou seu assistente inteligente. Como posso ajudar?` }]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef(null);
  const inputRef  = useRef(null);
  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior:'smooth' }); }, [msgs]);
  useEffect(() => { inputRef.current?.focus(); }, []);

  const send = async (text) => {
    const t = text || input.trim();
    if (!t || loading) return;
    setInput('');
    const next = [...msgs, { role:'user', content:t }];
    setMsgs(next);
    setLoading(true);
    try {
      const res  = await fetch('https://api.anthropic.com/v1/messages', { method:'POST', headers:{ 'Content-Type':'application/json' }, body:JSON.stringify({ model:'claude-sonnet-4-20250514', max_tokens:1000, system:SYSTEM, messages:next.map(m => ({ role:m.role, content:m.content })) }) });
      const data = await res.json();
      setMsgs(p => [...p, { role:'assistant', content:data.content?.[0]?.text||'Erro ao processar.' }]);
    } catch { setMsgs(p => [...p, { role:'assistant', content:'⚠️ Erro de conexão. Tente novamente.' }]); }
    setLoading(false);
  };

  const handleKey = e => { if (e.key==='Enter' && !e.shiftKey) { e.preventDefault(); send(); } };

  return (
    <div style={{ position:'fixed', inset:0, background:'rgba(0,0,0,.75)', zIndex:300, display:'flex', alignItems:'flex-end', justifyContent:'flex-end', padding:20, animation:'fadeIn .2s' }}>
      <div style={{ width:400, height:'85vh', background:'var(--bg-elevated)', border:'1px solid var(--border-strong)', borderRadius:'var(--radius-xl)', display:'flex', flexDirection:'column', overflow:'hidden', boxShadow:'var(--shadow-lg)', animation:'scaleIn .25s both' }}>
        {/* Header */}
        <div style={{ padding:'16px 20px', background:'linear-gradient(135deg,rgba(124,58,237,.2),rgba(6,182,212,.15))', borderBottom:'1px solid var(--border-default)', display:'flex', alignItems:'center', gap:12, flexShrink:0 }}>
          <div style={{ width:38, height:38, borderRadius:10, background:'linear-gradient(135deg,var(--brand),var(--accent-cyan))', display:'flex', alignItems:'center', justifyContent:'center', fontSize:20, flexShrink:0 }}>🤖</div>
          <div style={{ flex:1 }}>
            <div style={{ fontFamily:'var(--font-display)', fontSize:14, fontWeight:800, color:'var(--text-primary)' }}>Assistente Agendaí</div>
            <div style={{ fontSize:11, color:'var(--success)', display:'flex', alignItems:'center', gap:5 }}>
              <span className="pulse" style={{ display:'inline-block', width:6, height:6, borderRadius:'50%', background:'var(--success)' }}/>
              Powered by Claude · Online
            </div>
          </div>
          <div style={{ display:'flex', gap:6 }}>
            <button onClick={() => setMsgs([{ role:'assistant', content:'Histórico limpo! Como posso ajudar?' }])} style={{ background:'none', border:'none', cursor:'pointer', fontSize:15, color:'var(--text-tertiary)' }} title="Limpar">🗑️</button>
            <button onClick={() => setAiOpen(false)} style={{ background:'none', border:'none', cursor:'pointer', fontSize:17, color:'var(--text-tertiary)' }}>✕</button>
          </div>
        </div>
        {/* Messages */}
        <div style={{ flex:1, overflowY:'auto', padding:'16px 18px', display:'flex', flexDirection:'column', gap:12 }}>
          {msgs.map((m,i) => {
            const isU = m.role==='user';
            return (
              <div key={i} style={{ display:'flex', gap:10, alignItems:'flex-start', flexDirection:isU?'row-reverse':'row', animation:'fadeUp .2s both' }}>
                {!isU&&<div style={{ width:30, height:30, borderRadius:'50%', background:'linear-gradient(135deg,var(--brand),var(--accent-cyan))', display:'flex', alignItems:'center', justifyContent:'center', fontSize:14, flexShrink:0 }}>🤖</div>}
                <div style={{ maxWidth:'80%', padding:'10px 14px', fontSize:13, lineHeight:1.6, color:'var(--text-primary)', background:isU?'linear-gradient(135deg,var(--brand),var(--brand-dark))':'var(--bg-overlay)', border:isU?'none':'1px solid var(--border-subtle)', borderRadius:isU?'12px 4px 12px 12px':'4px 12px 12px 12px', boxShadow:isU?'var(--shadow-brand)':'none' }}>
                  {m.content.split('\n').map((l,j) => <span key={j}>{l}{j<m.content.split('\n').length-1&&<br/>}</span>)}
                </div>
              </div>
            );
          })}
          {loading&&(
            <div style={{ display:'flex', gap:10, alignItems:'flex-start' }}>
              <div style={{ width:30, height:30, borderRadius:'50%', background:'linear-gradient(135deg,var(--brand),var(--accent-cyan))', display:'flex', alignItems:'center', justifyContent:'center', fontSize:14 }}>🤖</div>
              <div style={{ background:'var(--bg-overlay)', border:'1px solid var(--border-subtle)', borderRadius:'4px 12px 12px 12px', padding:'10px 14px' }}>
                <div style={{ display:'flex', gap:4 }}>
                  {[0,1,2].map(i => <div key={i} style={{ width:7, height:7, borderRadius:'50%', background:'var(--brand)', animation:`pulse 1.2s ease-in-out ${i*.2}s infinite` }}/>)}
                </div>
              </div>
            </div>
          )}
          {msgs.length===1&&(
            <div style={{ display:'flex', flexDirection:'column', gap:7, marginTop:8 }}>
              <div style={{ fontSize:11, fontWeight:700, color:'var(--text-tertiary)', textTransform:'uppercase', letterSpacing:'0.6px' }}>Sugestões</div>
              {SUGGESTIONS.map(s => (
                <button key={s} onClick={() => send(s.replace(/^[^\s]+ /,''))} style={{ padding:'8px 12px', background:'var(--bg-overlay)', border:'1px solid var(--border-subtle)', borderRadius:'var(--radius-sm)', fontSize:12.5, color:'var(--text-secondary)', cursor:'pointer', textAlign:'left', fontFamily:'var(--font-body)', transition:'all var(--transition-fast)' }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor='var(--brand)'; e.currentTarget.style.color='var(--text-primary)'; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor='var(--border-subtle)'; e.currentTarget.style.color='var(--text-secondary)'; }}>{s}</button>
              ))}
            </div>
          )}
          <div ref={bottomRef}/>
        </div>
        {/* Input */}
        <div style={{ padding:'12px 16px', borderTop:'1px solid var(--border-subtle)', flexShrink:0 }}>
          <div style={{ display:'flex', gap:8, alignItems:'flex-end', background:'var(--bg-overlay)', border:'1px solid var(--border-default)', borderRadius:'var(--radius-md)', padding:'8px 12px' }}>
            <textarea ref={inputRef} value={input} onChange={e => setInput(e.target.value)} onKeyDown={handleKey} placeholder="Pergunte algo... (Enter para enviar)" rows={1} style={{ flex:1, background:'none', border:'none', outline:'none', color:'var(--text-primary)', fontSize:13, fontFamily:'var(--font-body)', resize:'none', lineHeight:1.5, maxHeight:100 }}/>
            <button onClick={() => send()} disabled={!input.trim()||loading} style={{ width:34, height:34, borderRadius:'var(--radius-sm)', border:'none', cursor:!input.trim()||loading?'not-allowed':'pointer', background:input.trim()&&!loading?'var(--brand)':'var(--bg-subtle)', color:input.trim()&&!loading?'#fff':'var(--text-tertiary)', display:'flex', alignItems:'center', justifyContent:'center', fontSize:16, flexShrink:0 }}>{loading?'⏳':'↑'}</button>
          </div>
          <div style={{ textAlign:'center', fontSize:10.5, color:'var(--text-tertiary)', marginTop:8 }}>Powered by Claude (Anthropic) · Dados fictícios para demonstração</div>
        </div>
      </div>
    </div>
  );
}
