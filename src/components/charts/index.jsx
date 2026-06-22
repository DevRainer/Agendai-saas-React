import { useState } from 'react';
import { useChartData } from '../../hooks';

export function BarChart({ data, height=160, valueKey='value', labelKey='label', colors, showValues=false }) {
  const { pcts } = useChartData(data, { key:valueKey });
  const [hov, setHov] = useState(null);
  const DC = ['#7C3AED','#06B6D4','#F472B6','#7C3AED','#10B981','#FBBF24','#7C3AED','#A78BFA'];
  return (
    <div style={{ display:'flex', alignItems:'flex-end', gap:6, height }}>
      {data.map((d,i) => {
        const col = colors ? colors[i%colors.length] : DC[i%DC.length];
        const isH = hov===i;
        return (
          <div key={i} style={{ flex:1, display:'flex', flexDirection:'column', alignItems:'center', gap:5, height:'100%' }}
            onMouseEnter={() => setHov(i)} onMouseLeave={() => setHov(null)}>
            <div style={{ flex:1, width:'100%', display:'flex', alignItems:'flex-end', position:'relative' }}>
              {showValues && isH && (
                <div style={{ position:'absolute', bottom:'100%', left:'50%', transform:'translateX(-50%)', background:'var(--card-active)', border:'1px solid var(--border-default)', color:'var(--text-primary)', fontSize:10, fontWeight:700, padding:'3px 7px', borderRadius:5, whiteSpace:'nowrap', marginBottom:4, zIndex:10 }}>
                  {typeof d[valueKey]==='number' && d[valueKey]>1000 ? `R$${(d[valueKey]/1000).toFixed(1)}k` : d[valueKey]}
                </div>
              )}
              <div style={{ width:'100%', height:`${pcts[i]}%`, borderRadius:'4px 4px 0 0', background:col, opacity: hov===null?(i===data.length-1?1:0.65):isH?1:0.35, minHeight:4, transition:'all var(--transition-base)', transform:isH?'scaleY(1.03)':'scaleY(1)', transformOrigin:'bottom', cursor:'pointer' }}/>
            </div>
            <span style={{ fontSize:10, color:'var(--text-tertiary)', fontWeight:600 }}>{d[labelKey]}</span>
          </div>
        );
      })}
    </div>
  );
}

export function LineChart({ data, height=120, valueKey='value', color='#7C3AED', fillOpacity=0.15 }) {
  const vals = data.map(d => d[valueKey]||0);
  const max=Math.max(...vals,1), min=Math.min(...vals);
  const w=400, h=height-24;
  const pts = vals.map((v,i) => ({ x:(i/(vals.length-1))*w, y:h-((v-min)/Math.max(max-min,1))*h*0.85-8 }));
  const lp  = pts.map((p,i) => (i===0?`M${p.x},${p.y}`:`L${p.x},${p.y}`)).join(' ');
  const fp  = `${lp} L${pts[pts.length-1].x},${h+8} L0,${h+8} Z`;
  const id  = `fill-${color.replace('#','')}`;
  return (
    <div style={{ height, overflow:'hidden' }}>
      <svg viewBox={`0 0 ${w} ${h+24}`} preserveAspectRatio="none" style={{ width:'100%', height:'100%' }}>
        <defs>
          <linearGradient id={id} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={color} stopOpacity={fillOpacity*3}/>
            <stop offset="100%" stopColor={color} stopOpacity="0"/>
          </linearGradient>
        </defs>
        <path d={fp} fill={`url(#${id})`}/>
        <path d={lp} fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
        {pts.map((p,i) => <circle key={i} cx={p.x} cy={p.y} r="3.5" fill={color} stroke="var(--bg-elevated)" strokeWidth="2"/>)}
      </svg>
    </div>
  );
}

export function OccupancyRing({ pct=78, size=110 }) {
  const r=size*.38, C=2*Math.PI*r, id=`rg-${size}`;
  return (
    <div style={{ position:'relative', width:size, height:size }}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} style={{ transform:'rotate(-90deg)' }}>
        <circle cx={size/2} cy={size/2} r={r} fill="none" stroke="rgba(255,255,255,.06)" strokeWidth="9"/>
        <circle cx={size/2} cy={size/2} r={r} fill="none" stroke={`url(#${id})`} strokeWidth="9" strokeLinecap="round" strokeDasharray={C} strokeDashoffset={C-C*pct/100}/>
        <defs><linearGradient id={id} x1="0" y1="0" x2="1" y2="0"><stop offset="0%" stopColor="#7C3AED"/><stop offset="100%" stopColor="#06B6D4"/></linearGradient></defs>
      </svg>
      <div style={{ position:'absolute', inset:0, display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center' }}>
        <span style={{ fontFamily:'var(--font-display)', fontSize:size*.18, fontWeight:800, color:'var(--text-primary)', lineHeight:1 }}>{pct}%</span>
        <span style={{ fontSize:10, color:'var(--text-secondary)', marginTop:2 }}>ocupado</span>
      </div>
    </div>
  );
}

export function ProgressBar({ value, max, color='var(--brand)', label, subLabel, showPct=true }) {
  const pct = Math.round((value/Math.max(max,1))*100);
  return (
    <div>
      <div style={{ display:'flex', justifyContent:'space-between', fontSize:13, marginBottom:7 }}>
        <span style={{ fontWeight:600, color:'var(--text-primary)' }}>{label}</span>
        <span style={{ color:'var(--text-secondary)' }}>{subLabel}{showPct&&<b style={{ color:'var(--text-primary)', marginLeft:4 }}>{pct}%</b>}</span>
      </div>
      <div style={{ height:7, background:'rgba(255,255,255,.07)', borderRadius:4 }}>
        <div style={{ height:'100%', width:`${pct}%`, background:color, borderRadius:4, transition:'width .8s cubic-bezier(.34,1.56,.64,1)' }}/>
      </div>
    </div>
  );
}

export function DonutChart({ segments, size=140 }) {
  const total=segments.reduce((s,sg)=>s+sg.value,0);
  let cum=0;
  const r=size*.36, cx=size/2, cy=size/2, C=2*Math.PI*r;
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} style={{ transform:'rotate(-90deg)' }}>
      {segments.map((sg,i) => {
        const pct=sg.value/total, offset=C*(1-cum), dash=C*pct; cum+=pct;
        return <circle key={i} cx={cx} cy={cy} r={r} fill="none" stroke={sg.color} strokeWidth="18" strokeDasharray={`${dash} ${C-dash}`} strokeDashoffset={-offset+C} strokeLinecap="butt"/>;
      })}
    </svg>
  );
}

export function SparkBars({ data, height=32, color='var(--brand)' }) {
  const max=Math.max(...data,1);
  return (
    <div style={{ display:'flex', alignItems:'flex-end', gap:2, height }}>
      {data.map((v,i) => <div key={i} style={{ flex:1, height:`${(v/max)*100}%`, background:color, borderRadius:2, opacity:i===data.length-1?1:0.5, minHeight:2 }}/>)}
    </div>
  );
}
