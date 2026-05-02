// HERO — direction-aware (matches brief copy)
const Hero = () => {
  const dir = window.useDir();
  const ref = useRef(null);
  const m = window.useMouse(ref);
  const y = window.useScrollY();

  return (
    <section id="hero-section" data-screen-label="01 hero" ref={ref} style={{
      minHeight:'100svh', position:'relative', overflow:'hidden',
      paddingTop: 'calc(74px + clamp(32px, 6vw, 80px))',
      paddingBottom: 'clamp(40px, 6vw, 80px)',
      display:'flex', flexDirection:'column', justifyContent:'center',
    }}>
      <HeroBg dir={dir} m={m} y={y}/>
      <div className="wrap" style={{position:'relative', zIndex:2, width:'100%'}}>
        {dir==='editorial' && <HeroEditorial m={m}/>}
        {dir==='kinetic'   && <HeroKinetic m={m}/>}
        {dir==='grid'      && <HeroGrid m={m}/>}
      </div>
      <HeroTickerStrip dir={dir}/>
    </section>
  );
};

const HeroBg = ({dir, m, y}) => {
  if (dir==='editorial') return (
    <>
      <div style={{position:'absolute',inset:0,background:'radial-gradient(60% 50% at 70% 30%, rgba(31,93,47,.08), transparent 60%)',pointerEvents:'none'}}/>
      <svg style={{position:'absolute',inset:0,width:'100%',height:'100%',opacity:.4,pointerEvents:'none'}}>
        <defs>
          <pattern id="dot-pat" width="32" height="32" patternUnits="userSpaceOnUse">
            <circle cx="1" cy="1" r="1" fill="rgba(14,26,14,.16)"/>
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#dot-pat)"/>
      </svg>
    </>
  );
  if (dir==='kinetic') return (
    <>
      <div style={{position:'absolute',inset:0,background:'radial-gradient(circle at 20% 80%, rgba(255,91,46,.18), transparent 50%), radial-gradient(circle at 80% 20%, rgba(246,196,83,.25), transparent 60%)'}}/>
      <div aria-hidden style={{position:'absolute', right:-60+m.x*40, top:120, fontFamily:'var(--serif)', fontStyle:'italic', fontWeight:300, fontSize:'clamp(120px, 22vw, 360px)', color:'rgba(14,26,14,.04)', lineHeight:1, letterSpacing:'-.04em', pointerEvents:'none', userSelect:'none', transform:`translateY(${-y*.18}px)`}}>seen</div>
    </>
  );
  return (
    <div style={{position:'absolute',inset:0,
      backgroundImage:'linear-gradient(rgba(14,26,14,.06) 1px, transparent 1px), linear-gradient(90deg, rgba(14,26,14,.06) 1px, transparent 1px)',
      backgroundSize:'48px 48px',
      maskImage:'radial-gradient(ellipse at center, #000 50%, transparent 100%)'}}/>
  );
};

const HeroEditorial = ({m}) => (
  <div style={{display:'grid', gridTemplateColumns:'1.4fr 1fr', gap:60, alignItems:'end'}} className="hero-grid">
    <div>
      <div className="reveal" style={window.labelStyle}>
        <span style={{display:'inline-flex',width:8,height:8,borderRadius:'50%',background:'var(--accent)'}}/>
        Where visibility becomes growth
      </div>
      <h1 className="reveal reveal-d1" style={{...window.bigHeadStyle('editorial'), marginTop:24, textWrap:'balance'}}>
        Your content<br/>deserves to be<br/><em style={{fontStyle:'italic', color:'var(--accent)', fontFamily:'var(--serif)'}}>seen.</em>
      </h1>
      <p className="reveal reveal-d2" style={{maxWidth:540, marginTop:32, fontSize:18, lineHeight:1.55, color:'var(--ink-2)', fontFamily:'var(--serif)', fontStyle:'italic', fontWeight:300}}>
        You've been posting consistently — but your videos don't reach enough people.
        Not because your content is bad… because it's not getting the visibility it needs.
      </p>
      <div className="reveal reveal-d3" style={{marginTop:40, display:'flex', gap:12, flexWrap:'wrap'}}>
        <window.Btn primary href="#pricing">Start my growth ↗</window.Btn>
        <window.Btn href="#process">See how it works</window.Btn>
      </div>
    </div>
    <HeroProofStack/>
  </div>
);

const HeroKinetic = ({m}) => (
  <div>
    <div className="reveal" style={{...window.labelStyle, marginBottom:18}}>
      <span style={{width:8,height:8,borderRadius:'50%',background:'var(--accent)'}}/> Where visibility becomes growth
    </div>
    <h1 className="reveal reveal-d1" style={{...window.bigHeadStyle('kinetic')}}>
      Your content<br/>
      <span style={{display:'inline-block', transform:`translateX(${m.x*8-4}px) rotate(-2deg)`, color:'var(--accent)'}}>deserves</span><br/>
      <span style={{fontFamily:'var(--serif)', fontStyle:'italic', fontWeight:300, textTransform:'none', letterSpacing:'-.04em'}}>to be seen.</span>
    </h1>
    <div className="reveal reveal-d2" style={{display:'grid', gridTemplateColumns:'1.2fr 1fr', gap:48, marginTop:48, alignItems:'end'}}>
      <p style={{fontSize:18, lineHeight:1.5, color:'var(--ink-2)', maxWidth:540}}>
        You try, you post, you stay consistent — but your videos don't reach enough people. Not because your content is bad… because it's not getting the <i>visibility</i> it needs.
      </p>
      <div style={{display:'flex', gap:12, flexWrap:'wrap', justifyContent:'flex-end'}}>
        <window.Btn primary href="#pricing">Start my growth ↗</window.Btn>
        <window.Btn href="#process">See how it works</window.Btn>
      </div>
    </div>
  </div>
);

const HeroGrid = ({m}) => (
  <div style={{display:'grid', gridTemplateColumns:'1.6fr 1fr', gap:80, alignItems:'center'}} className="hero-grid">
    <div>
      <div className="reveal" style={{...window.labelStyle, marginBottom:24}}>
        <span style={{display:'inline-flex',width:8,height:8,borderRadius:2,background:'var(--accent)'}}/>
        Inflorax · Where visibility becomes growth
      </div>
      <h1 className="reveal reveal-d1" style={{...window.bigHeadStyle('grid')}}>
        Your content<br/>deserves to be<br/><window.Em>seen.</window.Em>
      </h1>
      <p className="reveal reveal-d2" style={{maxWidth:560, marginTop:28, fontSize:17, lineHeight:1.55, color:'var(--ink-2)'}}>
        You post, you stay consistent — but reach stays low. We help your content finally get the visibility it needs. No gimmicks. No fake engagement.
      </p>
      <div className="reveal reveal-d3" style={{marginTop:36, display:'flex', gap:12, flexWrap:'wrap'}}>
        <window.Btn primary href="#pricing">Start my growth →</window.Btn>
        <window.Btn href="#process">See how it works</window.Btn>
      </div>
    </div>
    <HeroTerminal/>
  </div>
);

const HeroProofStack = () => (
  <div className="reveal reveal-d2" style={{position:'relative', height:380}}>
    <ProofCard rotate={-6} top={0} right={40} title="@finn.codes" stat="+412K" sub="reach in 14 weeks" growth={[3,8,12,16,22,30,40,55,72,88]}/>
    <ProofCard rotate={4} top={120} right={140} title="@maya.cooks" stat="3.1M" sub="avg monthly views" growth={[10,12,14,18,22,30,42,56,68,82]}/>
    <ProofCard rotate={-2} top={240} right={20} title="@harlow.run" stat="68%" sub="watch-time lift" growth={[20,22,30,35,40,52,60,71,80,92]}/>
  </div>
);

const ProofCard = ({rotate, top, right, title, stat, sub, growth}) => (
  <div style={{position:'absolute', top, right, width:280, background:'#fff', border:'1px solid var(--line)', borderRadius:18, padding:20, boxShadow:'0 24px 60px -28px rgba(14,26,14,.25)', transform:`rotate(${rotate}deg)`, transition:'transform .35s cubic-bezier(.2,.8,.2,1)'}}
    onMouseEnter={e => e.currentTarget.style.transform = `rotate(0deg) translateY(-4px) scale(1.02)`}
    onMouseLeave={e => e.currentTarget.style.transform = `rotate(${rotate}deg)`}>
    <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
      <span style={{fontFamily:'var(--mono)', fontSize:11, color:'var(--ink-3)'}}>{title}</span>
      <span style={{width:8,height:8,borderRadius:'50%',background:'#22c55e'}}/>
    </div>
    <div style={{fontFamily:'var(--serif)', fontStyle:'italic', fontSize:48, fontWeight:400, lineHeight:1, marginTop:8, color:'var(--accent)'}}>{stat}</div>
    <div style={{fontSize:13, color:'var(--ink-2)', marginTop:4}}>{sub}</div>
    <svg viewBox="0 0 100 30" style={{width:'100%', height:36, marginTop:12}}>
      <polyline fill="none" stroke="var(--accent)" strokeWidth="2" points={growth.map((v,i) => `${i*100/(growth.length-1)},${30-v/100*28}`).join(' ')}/>
      <polyline fill="rgba(31,93,47,.1)" stroke="none" points={`0,30 ${growth.map((v,i) => `${i*100/(growth.length-1)},${30-v/100*28}`).join(' ')} 100,30`}/>
    </svg>
  </div>
);

const HeroTerminal = () => {
  const [lines, setLines] = useState([]);
  const all = [
    {t:'$', c:'inflorax visibility @yourchannel', d:0},
    {t:'>', c:'analyzing reach signals…', d:600, dim:true},
    {t:'>', c:'detected low first-hour distribution', d:1200, dim:true},
    {t:'>', c:'visibility lift potential +180%', d:1800, dim:true},
    {t:'✓', c:'plan ready — getting seen mode', d:2400, color:'#22c55e'},
    {t:'$', c:'inflorax start --plan accelerate', d:3000},
    {t:'>', c:'pushing visibility…', d:3600, dim:true, blink:true},
  ];
  useEffect(() => {
    const timers = [];
    all.forEach((ln,i) => { timers.push(setTimeout(() => setLines(p => [...p, ln]), ln.d)); });
    return () => timers.forEach(clearTimeout);
  }, []);
  return (
    <div style={{background:'#0e1a0e', color:'#cfe6cf', fontFamily:'var(--mono)', fontSize:13, borderRadius:14, padding:18, lineHeight:1.7, minHeight:280, boxShadow:'0 30px 80px -30px rgba(14,26,14,.4)', border:'1px solid #1f2c1f'}}>
      <div style={{display:'flex', alignItems:'center', gap:6, marginBottom:14, paddingBottom:12, borderBottom:'1px solid #1f2c1f'}}>
        <span style={{width:10,height:10,borderRadius:'50%',background:'#ef4444'}}/>
        <span style={{width:10,height:10,borderRadius:'50%',background:'#f59e0b'}}/>
        <span style={{width:10,height:10,borderRadius:'50%',background:'#22c55e'}}/>
        <span style={{marginLeft:'auto', fontSize:11, color:'#5a6e5a'}}>~/inflorax</span>
      </div>
      {lines.map((ln, i) => (
        <div key={i} style={{display:'flex', gap:8, color: ln.dim ? '#7a8c7a' : (ln.color || '#cfe6cf')}}>
          <span style={{color: ln.color || '#22c55e', minWidth:14}}>{ln.t}</span>
          <span>{ln.c}{ln.blink && <span style={{display:'inline-block',width:8,height:14,background:'#cfe6cf',marginLeft:4,verticalAlign:'-2px',animation:'blink 1s steps(2) infinite'}}/>}</span>
        </div>
      ))}
      <style>{`@keyframes blink{50%{opacity:0}}`}</style>
    </div>
  );
};

const HeroTickerStrip = ({dir}) => {
  const items = ['Built for creators under 5K · plateau · serious about growth', 'No passwords · no fake engagement', 'Real visibility — not fake numbers', 'Designed for early-stage growth', '7–10 days to first lift', '24 creators in residency'];
  return (
    <div style={{position:'absolute', left:0, right:0, bottom:0, padding:'14px 0', borderTop:'1px solid var(--line)', borderBottom:'1px solid var(--line)', background:'color-mix(in oklab, var(--bg) 90%, transparent)', overflow:'hidden', maskImage:'linear-gradient(90deg, transparent, #000 8%, #000 92%, transparent)'}}>
      <div style={{display:'flex', gap:48, animation:'tickerL 38s linear infinite', whiteSpace:'nowrap', fontFamily:'var(--mono)', fontSize:12, letterSpacing:'.06em', color:'var(--ink-2)', textTransform:'uppercase'}}>
        {[...items, ...items, ...items].map((it, i) => (
          <span key={i} style={{display:'flex', alignItems:'center', gap:48}}>
            {it}
            <span style={{display:'inline-block',width:6,height:6,borderRadius:'50%',background:'var(--accent)'}}/>
          </span>
        ))}
      </div>
      <style>{`@keyframes tickerL{from{transform:translateX(0)}to{transform:translateX(-33.333%)}}`}</style>
    </div>
  );
};

window.Hero = Hero;
