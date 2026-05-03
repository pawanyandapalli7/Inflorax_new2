// PROCESS — dark warm Kinetic
const steps = [
  {n:'01', t:'Pick what fits you', orig:'Choose your package', d:"Choose a plan based on where you are right now. You don't need to overthink it.", icon:'pkg'},
  {n:'02', t:'Tell us about your account', orig:'Complete onboarding', d:'A quick 2–3 minute form. No passwords. No access needed.', icon:'form'},
  {n:'03', t:'We start your growth', orig:'We begin work', d:'We begin working on your content visibility. You may start noticing changes within a few days.', icon:'rocket'},
  {n:'04', t:'You see real movement', orig:'Summary delivered', d:'Your content starts reaching more people. Your growth finally begins to move forward.', icon:'chart'},
];

const Process = () => {
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
        <header style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:32, marginBottom:64, alignItems:'end'}} className="proc-head">
          <div>
            <span className="reveal" style={window.labelStyle}>How it works</span>
            <h2 className="wreveal" style={{...window.bigHeadStyle(), fontSize:'clamp(44px, 8vw, 132px)', marginTop:14}}>
              Get your content seen.
            </h2>
          </div>
          <p className="reveal reveal-d2" style={{fontSize:17, lineHeight:1.55, color:'var(--ink-2)', maxWidth:480, justifySelf:'end', fontFamily:'var(--serif)', fontStyle:'italic', fontWeight:300}}>
            Simple steps to get your content seen. No confusion. No complicated setup. Just a clear process.
          </p>
        </header>

        <div ref={ref} style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:48, position:'relative'}} className="proc-body">
          <div style={{position:'sticky', top:120, alignSelf:'start', height:'min(64vh, 520px)'}} className="proc-sticky">
            <ProcessVisual idx={active}/>
          </div>
          <div style={{display:'flex', flexDirection:'column', gap:10}}>
            {steps.map((s, i) => (
              <div key={i} onMouseEnter={() => setActive(i)} className="reveal" style={{
                padding:'24px 26px', borderRadius:18,
                background: active===i ? 'rgba(22,101,52,.08)' : 'transparent',
                border:'1px solid', borderColor: active===i ? 'rgba(22,101,52,.3)' : 'transparent',
                transition:'all .35s', cursor:'pointer',
                opacity: active===i ? 1 : .6,
              }}>
                <div style={{display:'flex', alignItems:'baseline', gap:18}}>
                  <span style={{fontFamily:'var(--mono)', fontSize:13, color:'var(--accent)', fontWeight:700}}>{s.n}</span>
                  <div style={{flex:1}}>
                    <h3 style={{fontFamily:'var(--sans)', fontWeight:800, fontSize:'clamp(22px, 2.8vw, 32px)', letterSpacing:'-.02em', lineHeight:1.05, color:'var(--ink)', textTransform:'uppercase'}}>
                      {s.t}
                    </h3>
                    <p style={{marginTop:10, fontSize:14, lineHeight:1.55, color:'var(--ink-2)', maxHeight: active===i ? 200 : 0, overflow:'hidden', transition:'max-height .35s'}}>{s.d}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        {/* CTA after process */}
        <div className="reveal" style={{marginTop:56, textAlign:'center'}}>
          <p style={{fontSize:16, color:'var(--ink-2)', marginBottom:20, fontFamily:'var(--serif)', fontStyle:'italic', fontWeight:300}}>
            That's it. No complicated setup. Just results.
          </p>
          <div style={{display:'flex', gap:12, justifyContent:'center', flexWrap:'wrap'}}>
            <window.Btn primary href="#pricing">View packages →</window.Btn>
            <window.Btn onClick={() => window.openAuditModal && window.openAuditModal()}>Get free audit</window.Btn>
          </div>
        </div>

        <style>{`
          @media(max-width:900px){
            .proc-head{grid-template-columns:1fr !important; gap:16px}
            .proc-body{grid-template-columns:1fr !important; gap:24px}
            .proc-sticky{position:relative !important; top:0 !important; height:auto !important; min-height:280px}
          }
          @media(max-width:600px){
            .proc-sticky{min-height:220px}
          }
        `}</style>
      </div>
    </window.Section>
  );
};

const ProcessVisual = ({idx}) => {
  return (
    <div style={{
      height:'100%', minHeight:400,
      background:'linear-gradient(160deg, rgba(10,25,12,.92), rgba(15,31,15,.85))',
      border:'1px solid var(--line)', borderRadius:24,
      padding:28, position:'relative', overflow:'hidden',
      display:'flex', flexDirection:'column', justifyContent:'space-between',
      backdropFilter:'blur(8px)', color:'var(--bone)',
    }}>
      <div style={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
        <span style={{fontFamily:'var(--mono)', fontSize:11, color:'rgba(240,246,232,.55)', textTransform:'uppercase', letterSpacing:'.1em'}}>Step {idx+1} / 4</span>
        <span style={{display:'flex', gap:6}}>
          {steps.map((_,i) => <span key={i} style={{width:24, height:3, borderRadius:2, background: i<=idx ? 'var(--accent)' : 'rgba(240,246,232,.15)', transition:'background .35s'}}/>)}
        </span>
      </div>
      <div style={{flex:1, display:'flex', alignItems:'center', justifyContent:'center'}}>
        {idx===0 && <PVPackages/>}
        {idx===1 && <PVForm/>}
        {idx===2 && <PVPush/>}
        {idx===3 && <PVChart/>}
      </div>
      <div>
        <h4 style={{fontFamily:'var(--sans)', fontWeight:800, fontSize:24, letterSpacing:'-.02em', color:'var(--bone)', textTransform:'uppercase'}}>
          {steps[idx].t}
        </h4>

      </div>
    </div>
  );
};

const PVPackages = () => (
  <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:8, width:'100%', maxWidth:340}}>
    {['$79','$199','$399','$799'].map((p,i) => (
      <div key={i} style={{padding:'16px 12px', borderRadius:12, border:'1px solid', borderColor: i===1 ? 'var(--accent)' : 'rgba(240,246,232,.15)', background: i===1 ? 'var(--accent)' : 'rgba(240,246,232,.05)', color: i===1 ? '#fff' : 'var(--bone)', position:'relative'}}>
        {i===1 && <span style={{position:'absolute', top:-7, right:6, fontSize:8, padding:'3px 6px', background:'#000', color:'#fff', borderRadius:999, fontFamily:'var(--mono)', textTransform:'uppercase'}}>Popular</span>}
        <div style={{fontSize:10, fontFamily:'var(--mono)', opacity:.6, textTransform:'uppercase'}}>Plan {i+1}</div>
        <div style={{fontWeight:800, fontSize:20, marginTop:4}}>{p}</div>
      </div>
    ))}
  </div>
);

const PVForm = () => (
  <div style={{width:'100%', maxWidth:300, background:'rgba(240,246,232,.05)', borderRadius:14, padding:16, border:'1px solid rgba(240,246,232,.12)'}}>
    {['Handle','Niche','Followers'].map((l,i) => (
      <div key={i} style={{marginBottom:10}}>
        <div style={{fontSize:9, fontFamily:'var(--mono)', color:'rgba(240,246,232,.55)', textTransform:'uppercase', letterSpacing:'.1em', marginBottom:5}}>{l}</div>
        <div style={{height:30, background:'rgba(13,9,5,.4)', borderRadius:6, border:'1px solid rgba(240,246,232,.1)', display:'flex', alignItems:'center', padding:'0 10px', fontSize:12, color:'rgba(240,246,232,.78)'}}>
          {i===0 ? '@yourhandle' : i===1 ? 'Lifestyle' : '2.4K'}
        </div>
      </div>
    ))}
    <div style={{marginTop:12, padding:'8px 12px', background:'var(--accent)', color:'#fff', borderRadius:6, textAlign:'center', fontSize:11, fontWeight:700}}>Submit ↗</div>
  </div>
);

const PVPush = () => (
  <div style={{position:'relative', width:'100%', maxWidth:300, height:200}}>
    {[0,1,2,3,4].map(i => (
      <div key={i} style={{
        position:'absolute', left:'50%', top:'50%',
        width:60+i*30, height:60+i*30,
        marginLeft:-(30+i*15), marginTop:-(30+i*15),
        borderRadius:'50%',
        border:'2px solid var(--accent)', opacity:.6-i*.1,
        animation:`pvPulse 2.4s ease-out infinite`,
        animationDelay:`${i*.4}s`,
      }}/>
    ))}
    <div style={{position:'absolute', left:'50%', top:'50%', transform:'translate(-50%,-50%)', width:48, height:48, borderRadius:'50%', background:'var(--accent)', display:'flex', alignItems:'center', justifyContent:'center', color:'#fff', fontSize:22, boxShadow:'0 0 30px var(--accent)'}}>↗</div>
    <style>{`@keyframes pvPulse{0%{transform:scale(.8);opacity:.6}100%{transform:scale(1.4);opacity:0}}`}</style>
  </div>
);

const PVChart = () => {
  const pts = [10,12,16,20,28,40,55,72,88];
  return (
    <div style={{width:'100%', maxWidth:320}}>
      <svg viewBox="0 0 200 100" style={{width:'100%', height:130}}>
        <polyline fill="rgba(22,101,52,.18)" stroke="none" points={`0,100 ${pts.map((v,i)=>`${i*200/(pts.length-1)},${100-v}`).join(' ')} 200,100`}/>
        <polyline fill="none" stroke="var(--accent)" strokeWidth="2.5" points={pts.map((v,i)=>`${i*200/(pts.length-1)},${100-v}`).join(' ')}/>
        {pts.map((v,i) => <circle key={i} cx={i*200/(pts.length-1)} cy={100-v} r="2.5" fill="var(--accent)"/>)}
      </svg>
      <div style={{display:'flex', justifyContent:'space-between', marginTop:12, padding:'12px 14px', background:'rgba(240,246,232,.05)', border:'1px solid rgba(240,246,232,.12)', borderRadius:10}}>
        <div>
          <div style={{fontSize:9, fontFamily:'var(--mono)', color:'rgba(240,246,232,.55)', textTransform:'uppercase'}}>Reach</div>
          <div style={{fontSize:20, fontWeight:800, color:'var(--accent)'}}>↑ Up</div>
        </div>
        <div>
          <div style={{fontSize:9, fontFamily:'var(--mono)', color:'rgba(240,246,232,.55)', textTransform:'uppercase'}}>Visibility</div>
          <div style={{fontSize:20, fontWeight:800, color:'var(--accent)'}}>Growing</div>
        </div>
      </div>
    </div>
  );
};

window.Process = Process;
