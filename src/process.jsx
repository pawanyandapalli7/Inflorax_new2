// PROCESS — 4 steps from brief
const steps = [
  {n:'01', t:'Pick what fits you', orig:'Choose your package', d:'Choose a plan based on where you are right now. You don\'t need to overthink it.', icon:'pkg'},
  {n:'02', t:'Tell us about your account', orig:'Complete onboarding', d:'A quick 2–3 minute form. No passwords. No access needed.', icon:'form'},
  {n:'03', t:'We start your growth', orig:'We begin work', d:'We begin working on your content visibility. You may start noticing changes within a few days.', icon:'rocket'},
  {n:'04', t:'You see real movement', orig:'Summary delivered', d:'Your content starts reaching more people. Your growth finally begins to move forward.', icon:'chart'},
];

const Process = () => {
  const dir = window.useDir();
  const [active, setActive] = useState(0);
  const ref = useRef(null);

  useEffect(() => {
    const onScroll = () => {
      if (!ref.current) return;
      const r = ref.current.getBoundingClientRect();
      const total = r.height - window.innerHeight;
      const p = Math.max(0, Math.min(1, -r.top / total));
      const idx = Math.min(steps.length-1, Math.floor(p * steps.length));
      setActive(idx);
    };
    window.addEventListener('scroll', onScroll, {passive:true});
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <window.Section id="process" padded>
      <div className="wrap">
        <header style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:48, marginBottom:80, alignItems:'end'}} className="proc-head">
          <div>
            <span className="reveal" style={window.labelStyle}>How it works</span>
            <h2 className="reveal reveal-d1" style={{...window.bigHeadStyle(dir), fontSize:'clamp(40px, 6.5vw, 96px)', marginTop:18}}>
              {dir==='editorial' && <>Simple steps<br/>to get your content <window.Em>seen.</window.Em></>}
              {dir==='kinetic'   && <>Get your content<br/><window.Em>seen.</window.Em></>}
              {dir==='grid'      && <>Simple steps to get<br/>your content <window.Em>seen.</window.Em></>}
            </h2>
          </div>
          <p className="reveal reveal-d2" style={{fontSize:18, lineHeight:1.55, color:'var(--ink-2)', maxWidth:480, justifySelf:'end'}}>
            No confusion. No complicated setup. Just a clear process — from picking a plan to seeing real movement on your content.
          </p>
        </header>

        <div ref={ref} style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:80, position:'relative'}} className="proc-body">
          {/* Sticky visual */}
          <div style={{position:'sticky', top:120, alignSelf:'start', height:'min(70vh, 560px)'}} className="proc-sticky">
            <ProcessVisual idx={active} dir={dir}/>
          </div>

          {/* Steps list */}
          <div style={{display:'flex', flexDirection:'column', gap:16}}>
            {steps.map((s, i) => (
              <div key={i} onMouseEnter={() => setActive(i)} className="reveal" style={{
                padding:'28px 28px',
                borderRadius:dir==='grid' ? 0 : 18,
                background: active===i ? '#fff' : 'transparent',
                border:'1px solid', borderColor: active===i ? 'var(--line)' : 'transparent',
                transition:'all .35s', cursor:'pointer',
                opacity: active===i ? 1 : .4,
              }}>
                <div style={{display:'flex', alignItems:'baseline', gap:18}}>
                  <span style={{fontFamily:'var(--mono)', fontSize:13, color:'var(--accent)', fontWeight:700}}>{s.n}</span>
                  <div style={{flex:1}}>
                    <h3 style={{
                      fontFamily:dir==='editorial'?'var(--serif)':'var(--sans)',
                      fontStyle:dir==='editorial'?'italic':'normal',
                      fontWeight:dir==='editorial'?500:700,
                      fontSize:'clamp(24px, 3vw, 36px)', letterSpacing:'-.02em', lineHeight:1.05, color:'var(--ink)'}}>
                      {s.t}
                    </h3>
                    <p style={{marginTop:12, fontSize:15, lineHeight:1.55, color:'var(--ink-2)', maxHeight: active===i ? 200 : 0, overflow:'hidden', transition:'max-height .35s'}}>{s.d}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <p className="reveal" style={{textAlign:'center', marginTop:60, fontSize:15, color:'var(--ink-3)'}}>👉 That's it. No complicated setup. Just results.</p>
        <style>{`@media (max-width:900px){
          .proc-head{grid-template-columns:1fr !important; gap:24px}
          .proc-body{grid-template-columns:1fr !important; gap:40px}
          .proc-sticky{position:relative !important; top:0 !important; height:auto !important}
        }`}</style>
      </div>
    </window.Section>
  );
};

const ProcessVisual = ({idx, dir}) => {
  return (
    <div style={{height:'100%', background:'#fff', border:'1px solid var(--line)', borderRadius:dir==='grid'?0:24, padding:32, position:'relative', overflow:'hidden', display:'flex', flexDirection:'column', justifyContent:'space-between'}}>
      <div style={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
        <span style={{fontFamily:'var(--mono)', fontSize:11, color:'var(--ink-3)', textTransform:'uppercase', letterSpacing:'.1em'}}>Step {idx+1} / 4</span>
        <span style={{display:'flex', gap:6}}>
          {steps.map((_,i) => <span key={i} style={{width:24, height:3, borderRadius:2, background: i<=idx ? 'var(--accent)' : 'var(--line)', transition:'background .35s'}}/>)}
        </span>
      </div>

      <div style={{flex:1, display:'flex', alignItems:'center', justifyContent:'center'}}>
        {idx===0 && <PVPackages/>}
        {idx===1 && <PVForm/>}
        {idx===2 && <PVPush/>}
        {idx===3 && <PVChart/>}
      </div>

      <div>
        <h4 style={{
          fontFamily:dir==='editorial'?'var(--serif)':'var(--sans)',
          fontStyle:dir==='editorial'?'italic':'normal',
          fontWeight:dir==='editorial'?500:700,
          fontSize:28, letterSpacing:'-.02em', color:'var(--ink)'}}>
          {steps[idx].t}
        </h4>
        <p style={{marginTop:8, fontSize:14, color:'var(--ink-3)'}}>{steps[idx].orig}</p>
      </div>
    </div>
  );
};

const PVPackages = () => (
  <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:10, width:'100%', maxWidth:340}}>
    {['$79','$199','$399','$799'].map((p,i) => (
      <div key={i} style={{padding:'18px 14px', borderRadius:12, border:'1px solid var(--line)', background: i===1 ? 'var(--accent)' : 'var(--soft)', color: i===1 ? '#fff' : 'var(--ink)', position:'relative'}}>
        {i===1 && <span style={{position:'absolute', top:-8, right:8, fontSize:9, padding:'3px 6px', background:'var(--ink)', color:'#fff', borderRadius:999, fontFamily:'var(--mono)', textTransform:'uppercase'}}>Popular</span>}
        <div style={{fontSize:11, fontFamily:'var(--mono)', opacity:.6, textTransform:'uppercase'}}>Plan {i+1}</div>
        <div style={{fontWeight:700, fontSize:22, marginTop:4}}>{p}</div>
      </div>
    ))}
  </div>
);

const PVForm = () => (
  <div style={{width:'100%', maxWidth:320, background:'var(--soft)', borderRadius:14, padding:18}}>
    {['Instagram handle','Niche','Followers'].map((l,i) => (
      <div key={i} style={{marginBottom:12}}>
        <div style={{fontSize:10, fontFamily:'var(--mono)', color:'var(--ink-3)', textTransform:'uppercase', letterSpacing:'.1em', marginBottom:6}}>{l}</div>
        <div style={{height:32, background:'#fff', borderRadius:8, border:'1px solid var(--line)', display:'flex', alignItems:'center', padding:'0 10px', fontSize:13, color:'var(--ink-2)'}}>
          {i===0 ? '@yourhandle' : i===1 ? 'Lifestyle' : '2.4K'}
        </div>
      </div>
    ))}
    <div style={{marginTop:14, padding:'8px 12px', background:'var(--accent)', color:'#fff', borderRadius:8, textAlign:'center', fontSize:12, fontWeight:600}}>Submit ↗</div>
  </div>
);

const PVPush = () => (
  <div style={{position:'relative', width:'100%', maxWidth:320, height:200}}>
    {[0,1,2,3,4].map(i => (
      <div key={i} style={{
        position:'absolute', left:'50%', top:'50%',
        width:60+i*30, height:60+i*30,
        marginLeft:-(30+i*15), marginTop:-(30+i*15),
        borderRadius:'50%',
        border:'2px solid var(--accent)', opacity:.6-i*.1,
        animation:`pulse${i} 2.4s ease-out infinite`,
        animationDelay:`${i*.4}s`,
      }}/>
    ))}
    <div style={{position:'absolute', left:'50%', top:'50%', transform:'translate(-50%,-50%)', width:48, height:48, borderRadius:'50%', background:'var(--accent)', display:'flex', alignItems:'center', justifyContent:'center', color:'#fff', fontSize:24}}>↗</div>
    <style>{`@keyframes pulse0{0%{transform:scale(.8);opacity:.6}100%{transform:scale(1.4);opacity:0}}
      @keyframes pulse1{0%{transform:scale(.8);opacity:.5}100%{transform:scale(1.4);opacity:0}}
      @keyframes pulse2{0%{transform:scale(.8);opacity:.4}100%{transform:scale(1.4);opacity:0}}
      @keyframes pulse3{0%{transform:scale(.8);opacity:.3}100%{transform:scale(1.4);opacity:0}}
      @keyframes pulse4{0%{transform:scale(.8);opacity:.2}100%{transform:scale(1.4);opacity:0}}`}</style>
  </div>
);

const PVChart = () => {
  const pts = [10,12,16,20,28,40,55,72,88];
  const max = 100;
  return (
    <div style={{width:'100%', maxWidth:340}}>
      <svg viewBox="0 0 200 100" style={{width:'100%', height:140}}>
        <polyline fill="rgba(31,93,47,.12)" stroke="none" points={`0,100 ${pts.map((v,i)=>`${i*200/(pts.length-1)},${100-v}`).join(' ')} 200,100`}/>
        <polyline fill="none" stroke="var(--accent)" strokeWidth="2.5" points={pts.map((v,i)=>`${i*200/(pts.length-1)},${100-v}`).join(' ')}/>
        {pts.map((v,i) => <circle key={i} cx={i*200/(pts.length-1)} cy={100-v} r="2.5" fill="var(--accent)"/>)}
      </svg>
      <div style={{display:'flex', justifyContent:'space-between', marginTop:16, padding:'14px 16px', background:'var(--soft)', borderRadius:12}}>
        <div>
          <div style={{fontSize:10, fontFamily:'var(--mono)', color:'var(--ink-3)', textTransform:'uppercase'}}>Reach</div>
          <div style={{fontSize:20, fontWeight:700, color:'var(--accent)'}}>+412%</div>
        </div>
        <div>
          <div style={{fontSize:10, fontFamily:'var(--mono)', color:'var(--ink-3)', textTransform:'uppercase'}}>Avg views</div>
          <div style={{fontSize:20, fontWeight:700, color:'var(--accent)'}}>38K</div>
        </div>
      </div>
    </div>
  );
};

window.Process = Process;
