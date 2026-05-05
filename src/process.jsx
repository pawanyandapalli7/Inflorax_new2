// PROCESS — redesigned: emotional steps, rich visual, mobile timeline
const steps = [
  {
    n:'01',
    t:'Pick your plan',
    sub:'Takes 30 seconds',
    d:'Choose based on where you are — not where you want to be. Starting out? Spark. Stuck? Ignite. Serious about growth? Momentum and above.',
    icon:'📦',
    detail:'No confusion. Every plan is clearly explained.',
    tag:'Choose',
  },
  {
    n:'02',
    t:'Send us your handle',
    sub:'2 minutes. No passwords.',
    d:'Just your handle, your niche, and what you want to achieve. That\'s it. We never ask for your login. We never need access to your account.',
    icon:'🔒',
    detail:'Your account security stays completely with you.',
    tag:'Onboard',
  },
  {
    n:'03',
    t:'We promote your content',
    sub:'You keep posting. We handle the rest.',
    d:'We run a targeted promotion campaign across real channels. Real accounts. Real reach. Your content gets in front of the right people — not random bots.',
    icon:'🚀',
    detail:'Campaigns typically launch within 24–72 hours of onboarding.',
    tag:'Launch',
  },
  {
    n:'04',
    t:'Watch your numbers move',
    sub:'Results you can actually see.',
    d:'More views. More followers. More engagement. You\'ll see the difference in your analytics — and feel it in how your content performs going forward.',
    icon:'📈',
    detail:'You get a full summary when your campaign completes.',
    tag:'Results',
  },
];

const Process = () => {
  const [active, setActive] = useState(0);
  const bodyRef = useRef(null);

  // Desktop scroll-driven step activation
  useEffect(() => {
    const onScroll = () => {
      if(!bodyRef.current) return;
      const r = bodyRef.current.getBoundingClientRect();
      const total = r.height - window.innerHeight;
      const p = Math.max(0, Math.min(1, -r.top / (total || 1)));
      setActive(Math.min(steps.length - 1, Math.floor(p * steps.length)));
    };
    window.addEventListener('scroll', onScroll, {passive:true});
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <window.Section id="process" padded>
      <div className="wrap">

        {/* Header */}
        <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:40, marginBottom:72, alignItems:'end'}} className="proc-head">
          <div>
            <span className="reveal" style={window.labelStyle}>How it works</span>
            <h2 className="wreveal" style={{...window.bigHeadStyle(), fontSize:'clamp(44px,7.5vw,120px)', marginTop:14}}>
              Simple.<br/><window.Em>Seriously.</window.Em>
            </h2>
          </div>
          <div className="reveal reveal-d2 proc-head-right">
            <p style={{fontSize:17, lineHeight:1.6, color:'var(--ink-2)', fontFamily:'var(--serif)', fontStyle:'italic', fontWeight:300, marginBottom:20}}>
              No confusing setup. No waiting around. Just four clear steps from choosing a plan to seeing real movement on your content.
            </p>
            {/* Mini trust strip */}
            <div style={{display:'flex', gap:16, flexWrap:'wrap'}}>
              {[['⚡','Campaign live in 24–72h'],['🔒','Never ask for your password'],['✓','Real accounts only']].map(([ic,t])=>(
                <div key={t} style={{display:'flex', alignItems:'center', gap:7, fontSize:12, color:'var(--ink-3)'}}>
                  <span style={{fontSize:14, color:'var(--accent)'}}>{ic}</span>{t}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Desktop: sticky visual left + interactive steps right */}
        <div ref={bodyRef} style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:56, position:'relative'}} className="proc-body">

          {/* LEFT — sticky visual */}
          <div style={{position:'sticky', top:110, alignSelf:'start', height:'min(70vh,560px)'}} className="proc-sticky">
            <ProcessVisual idx={active} step={steps[active]}/>
          </div>

          {/* RIGHT — steps */}
          <div style={{display:'flex', flexDirection:'column', gap:4}}>
            {steps.map((s, i) => (
              <ProcessStep key={i} s={s} i={i} active={active===i} onEnter={()=>setActive(i)}/>
            ))}

            {/* CTA inline after steps on desktop */}
            <div className="reveal proc-cta-inline" style={{marginTop:32, display:'flex', gap:12, flexWrap:'wrap'}}>
              <window.Btn primary href="#" onClick={e=>{e.preventDefault();window.scrollToSection&&window.scrollToSection("pricing");}}>View packages →</window.Btn>
              <window.Btn onClick={()=>window.openAuditModal&&window.openAuditModal()}>Get free audit</window.Btn>
            </div>
          </div>
        </div>

        {/* Mobile: vertical animated timeline */}
        <div className="proc-mobile-timeline" style={{display:'none', flexDirection:'column', gap:0, marginTop:8}}>
          {steps.map((s,i)=><MobileTimelineStep key={i} s={s} i={i} total={steps.length}/>)}
          <div style={{marginTop:32, display:'flex', gap:12, flexWrap:'wrap', justifyContent:'center'}}>
            <window.Btn primary href="#" onClick={e=>{e.preventDefault();window.scrollToSection&&window.scrollToSection("pricing");}}>View packages →</window.Btn>
            <window.Btn onClick={()=>window.openAuditModal&&window.openAuditModal()}>Get free audit</window.Btn>
          </div>
        </div>

      </div>
      <style>{`
        @media(max-width:960px){
          .proc-head{grid-template-columns:1fr !important;gap:16px}
          .proc-head-right{margin-top:0}
          .proc-body{display:none !important}
          .proc-mobile-timeline{display:flex !important}
          .proc-cta-inline{display:none !important}
        }
        @media(max-width:480px){
          .proc-head h2{font-size:clamp(44px,13vw,80px) !important}
        }
      `}</style>
    </window.Section>
  );
};

// Individual step row — desktop
const ProcessStep = ({s, i, active, onEnter}) => {
  const ref = useRef(null);
  const [vis, setVis] = useState(false);
  useEffect(()=>{
    const el=ref.current;if(!el)return;
    const io=new IntersectionObserver(([e])=>{if(e.isIntersecting){setVis(true);io.disconnect();}},{threshold:0.2});
    io.observe(el);return()=>io.disconnect();
  },[]);

  return (
    <div ref={ref}
      onMouseEnter={onEnter}
      onClick={onEnter}
      style={{
        padding:'22px 24px', borderRadius:18, cursor:'pointer',
        opacity: vis ? (active ? 1 : 0.55) : 0,
        transform: vis ? 'translateY(0)' : 'translateY(20px)',
        transition: `opacity .55s ease ${i*0.06}s, transform .55s ease ${i*0.06}s, background .25s, border-color .25s, box-shadow .25s`,
        background: active ? 'rgba(22,101,52,.07)' : 'transparent',
        border: '1.5px solid',
        borderColor: active ? 'rgba(22,101,52,.28)' : 'transparent',
        boxShadow: active ? '0 4px 24px rgba(22,101,52,.08)' : 'none',
        WebkitTapHighlightColor:'transparent',
      }}>
      <div style={{display:'flex', alignItems:'flex-start', gap:16}}>
        {/* Step number + icon */}
        <div style={{display:'flex', flexDirection:'column', alignItems:'center', gap:6, flexShrink:0, paddingTop:2}}>
          <div style={{
            width:38, height:38, borderRadius:12,
            background: active ? 'var(--accent)' : 'var(--soft)',
            border: `1.5px solid ${active ? 'var(--accent)' : 'var(--line)'}`,
            display:'flex', alignItems:'center', justifyContent:'center',
            fontSize:18, transition:'background .3s, border-color .3s',
            boxShadow: active ? '0 0 0 5px rgba(22,101,52,.12)' : 'none',
          }}>{s.icon}</div>
          <span style={{fontFamily:'var(--mono)', fontSize:10, color: active ? 'var(--accent)' : 'var(--ink-4)', fontWeight:700, letterSpacing:'.06em', transition:'color .3s'}}>{s.n}</span>
        </div>

        {/* Content */}
        <div style={{flex:1, minWidth:0}}>
          <div style={{display:'flex', alignItems:'center', gap:10, marginBottom:active?8:0}}>
            <h3 style={{
              fontFamily:'var(--sans)', fontWeight:800,
              fontSize:'clamp(17px,2vw,24px)',
              letterSpacing:'-.025em', lineHeight:1.1,
              color: active ? 'var(--ink)' : 'var(--ink-2)',
              transition:'color .3s', textTransform:'uppercase',
            }}>{s.t}</h3>
            {/* Tag badge */}
            <span style={{
              padding:'2px 9px', borderRadius:999, fontSize:9,
              fontFamily:'var(--mono)', letterSpacing:'.1em', textTransform:'uppercase',
              background: active ? 'var(--accent)' : 'var(--soft)',
              color: active ? '#fff' : 'var(--ink-3)',
              border: `1px solid ${active ? 'var(--accent)' : 'var(--line)'}`,
              flexShrink:0, transition:'all .3s',
            }}>{s.tag}</span>
          </div>

          {/* Sub label */}
          <div style={{
            fontSize:11, fontFamily:'var(--mono)', color:'var(--accent)',
            letterSpacing:'.06em', textTransform:'uppercase',
            maxHeight: active ? 20 : 0, overflow:'hidden',
            transition:'max-height .3s, opacity .3s',
            opacity: active ? 1 : 0, marginBottom: active ? 8 : 0,
          }}>{s.sub}</div>

          {/* Description */}
          <div style={{
            maxHeight: active ? 120 : 0, overflow:'hidden',
            transition:'max-height .4s cubic-bezier(.2,.8,.2,1)',
          }}>
            <p style={{fontSize:14, lineHeight:1.65, color:'var(--ink-2)', marginBottom:8}}>{s.d}</p>
            <div style={{display:'flex', alignItems:'center', gap:6, fontSize:12, color:'var(--ink-3)', fontFamily:'var(--mono)'}}>
              <span style={{color:'var(--accent)', fontWeight:700}}>→</span>{s.detail}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Mobile timeline step
const MobileTimelineStep = ({s, i, total}) => {
  const ref = useRef(null);
  const [vis, setVis] = useState(false);
  useEffect(()=>{
    const el=ref.current;if(!el)return;
    const io=new IntersectionObserver(([e])=>{if(e.isIntersecting){setVis(true);io.disconnect();}},{threshold:0.18,rootMargin:'-3% 0px -3% 0px'});
    io.observe(el);return()=>io.disconnect();
  },[]);
  return (
    <div ref={ref} style={{display:'flex', gap:0, position:'relative'}}>
      {/* Timeline spine */}
      <div style={{display:'flex', flexDirection:'column', alignItems:'center', width:48, flexShrink:0}}>
        <div style={{
          width:40, height:40, borderRadius:12, flexShrink:0,
          background: vis ? 'var(--accent)' : 'var(--soft)',
          border:'2px solid var(--line)',
          display:'flex', alignItems:'center', justifyContent:'center',
          fontSize:20, transition:'background .5s .1s, box-shadow .5s .1s',
          boxShadow: vis ? '0 0 0 6px rgba(22,101,52,.12)' : 'none',
        }}>{s.icon}</div>
        {i < total-1 && (
          <div style={{
            width:2, flex:1, minHeight:24, marginTop:4, marginBottom:4,
            background: vis ? 'linear-gradient(to bottom,var(--accent),rgba(22,101,52,.15))' : 'var(--line)',
            transition:'background .5s .3s',
          }}/>
        )}
      </div>
      {/* Content */}
      <div style={{
        flex:1, padding:'2px 0 28px 14px',
        opacity: vis ? 1 : 0,
        transform: vis ? 'translateX(0)' : 'translateX(18px)',
        transition:`opacity .5s ease ${i*0.1}s, transform .5s ease ${i*0.1}s`,
      }}>
        <div style={{display:'flex', alignItems:'center', gap:8, marginBottom:4, marginTop:6}}>
          <span style={{fontFamily:'var(--mono)', fontSize:9, color:'var(--accent)', letterSpacing:'.12em', textTransform:'uppercase', fontWeight:700}}>Step {s.n}</span>
          <span style={{padding:'2px 8px', borderRadius:999, fontSize:9, fontFamily:'var(--mono)', letterSpacing:'.1em', textTransform:'uppercase', background:'var(--accent-l)', color:'var(--accent)', border:'1px solid rgba(22,101,52,.2)'}}>{s.tag}</span>
        </div>
        <h3 style={{fontFamily:'var(--sans)', fontWeight:800, fontSize:19, letterSpacing:'-.025em', color:'var(--ink)', textTransform:'uppercase', marginBottom:4, lineHeight:1.1}}>{s.t}</h3>
        <div style={{fontSize:11, fontFamily:'var(--mono)', color:'var(--accent)', letterSpacing:'.06em', textTransform:'uppercase', marginBottom:8}}>{s.sub}</div>
        <p style={{fontSize:14, lineHeight:1.65, color:'var(--ink-2)', marginBottom:6}}>{s.d}</p>
        <div style={{fontSize:12, color:'var(--ink-3)', fontFamily:'var(--mono)', display:'flex', alignItems:'center', gap:5}}>
          <span style={{color:'var(--accent)', fontWeight:700}}>→</span>{s.detail}
        </div>
      </div>
    </div>
  );
};

// Rich step visual — dark card with animated content per step
const ProcessVisual = ({idx, step}) => {
  const visuals = [
    // Step 01 — plan picker
    () => (
      <div style={{flex:1, display:'flex', flexDirection:'column', gap:8, justifyContent:'center'}}>
        {[{name:'Spark',price:'$79',sub:'New creator',h:false},{name:'Ignite',price:'$199',sub:'Stuck creator',h:true},{name:'Momentum',price:'$399',sub:'Growing creator',h:false},{name:'Icon',price:'$1,199',sub:'Serious creator',h:false}].map((p,i)=>(
          <div key={i} style={{
            display:'flex', alignItems:'center', justifyContent:'space-between',
            padding:'12px 16px', borderRadius:12,
            background: p.h ? 'var(--accent)' : 'rgba(240,246,232,.05)',
            border:`1.5px solid ${p.h?'var(--accent)':'rgba(240,246,232,.1)'}`,
            position:'relative',
          }}>
            {p.h && <span style={{position:'absolute',top:-9,right:12,fontSize:8,padding:'2px 8px',background:'#fff',color:'var(--accent)',borderRadius:999,fontFamily:'var(--mono)',textTransform:'uppercase',fontWeight:700,letterSpacing:'.08em'}}>Most popular</span>}
            <div>
              <div style={{fontWeight:800, fontSize:16, letterSpacing:'-.02em', color:p.h?'#fff':'rgba(240,246,232,.85)'}}>{p.name}</div>
              <div style={{fontSize:10, color:p.h?'rgba(255,255,255,.65)':'rgba(240,246,232,.35)', fontFamily:'var(--mono)', marginTop:2, textTransform:'uppercase', letterSpacing:'.06em'}}>{p.sub}</div>
            </div>
            <div style={{fontWeight:900, fontSize:20, letterSpacing:'-.03em', color:p.h?'#fff':'rgba(240,246,232,.7)'}}>{p.price}</div>
          </div>
        ))}
      </div>
    ),
    // Step 02 — onboarding form
    () => (
      <div style={{flex:1, display:'flex', flexDirection:'column', gap:10, justifyContent:'center'}}>
        <div style={{marginBottom:4, fontSize:10, fontFamily:'var(--mono)', color:'rgba(240,246,232,.35)', textTransform:'uppercase', letterSpacing:'.1em'}}>Your info — nothing sensitive</div>
        {[{label:'Your handle',value:'@yourchannel',icon:'📸'},{label:'Your niche',value:'Fitness / Wellness',icon:'🎯'},{label:'Current followers',value:'2,400 followers',icon:'👥'},{label:'Your goal',value:'More reach & visibility',icon:'📈'}].map((f,i)=>(
          <div key={i} style={{display:'flex', alignItems:'center', gap:12, background:'rgba(240,246,232,.05)', borderRadius:10, padding:'12px 14px', border:'1px solid rgba(240,246,232,.1)'}}>
            <span style={{fontSize:16, flexShrink:0}}>{f.icon}</span>
            <div style={{flex:1}}>
              <div style={{fontSize:9, fontFamily:'var(--mono)', color:'rgba(240,246,232,.35)', textTransform:'uppercase', letterSpacing:'.08em', marginBottom:2}}>{f.label}</div>
              <div style={{fontSize:14, color:'rgba(240,246,232,.85)', fontWeight:600}}>{f.value}</div>
            </div>
            <span style={{width:16, height:16, borderRadius:'50%', background:'rgba(22,101,52,.3)', border:'1px solid rgba(22,101,52,.5)', display:'flex', alignItems:'center', justifyContent:'center', fontSize:9, color:'var(--accent)', flexShrink:0}}>✓</span>
          </div>
        ))}
        <div style={{marginTop:4, padding:'10px 14px', borderRadius:10, background:'rgba(22,101,52,.1)', border:'1px solid rgba(22,101,52,.25)', display:'flex', alignItems:'center', gap:10}}>
          <span style={{fontSize:16}}>🔒</span>
          <span style={{fontSize:12, color:'rgba(240,246,232,.6)', fontFamily:'var(--mono)'}}>No password. No access. Ever.</span>
        </div>
      </div>
    ),
    // Step 03 — campaign live
    () => (
      <div style={{flex:1, display:'flex', flexDirection:'column', gap:10, justifyContent:'center'}}>
        <div style={{display:'flex', alignItems:'center', gap:10, padding:'12px 16px', borderRadius:12, background:'rgba(22,101,52,.15)', border:'1px solid rgba(22,101,52,.3)', marginBottom:4}}>
          <span style={{width:8, height:8, borderRadius:'50%', background:'#4ade80', animation:'livePulse 1.8s ease-in-out infinite', flexShrink:0}}/>
          <span style={{fontSize:12, fontFamily:'var(--mono)', color:'#4ade80', letterSpacing:'.08em', textTransform:'uppercase'}}>Campaign live</span>
          <span style={{marginLeft:'auto', fontSize:10, fontFamily:'var(--mono)', color:'rgba(240,246,232,.4)'}}>24h active</span>
        </div>
        {[{icon:'🎯',label:'Audience targeting',value:'Active',green:true},{icon:'📡',label:'Content distribution',value:'Running',green:true},{icon:'👥',label:'Real accounts reached',value:'1,240',green:true},{icon:'📊',label:'Engagement rate',value:'↑ 3.2%',green:true}].map((it,i)=>(
          <div key={i} style={{display:'flex', alignItems:'center', gap:12, background:'rgba(240,246,232,.04)', borderRadius:10, padding:'10px 14px', border:'1px solid rgba(240,246,232,.08)'}}>
            <span style={{fontSize:16, flexShrink:0}}>{it.icon}</span>
            <span style={{flex:1, fontSize:13, color:'rgba(240,246,232,.65)', fontFamily:'var(--mono)', fontSize:11, textTransform:'uppercase', letterSpacing:'.06em'}}>{it.label}</span>
            <span style={{fontSize:13, fontWeight:700, color:'#4ade80'}}>{it.value}</span>
          </div>
        ))}
      </div>
    ),
    // Step 04 — results
    () => (
      <div style={{flex:1, display:'flex', flexDirection:'column', gap:10, justifyContent:'center'}}>
        <div style={{fontFamily:'var(--mono)', fontSize:9, color:'rgba(240,246,232,.35)', textTransform:'uppercase', letterSpacing:'.1em', marginBottom:4}}>Your campaign summary</div>
        {[{label:'New followers',value:'+840',sub:'vs last 30 days',up:true},{label:'Video reach',value:'+12,400',sub:'unique accounts',up:true},{label:'Engagement rate',value:'+1.8%',sub:'improvement',up:true},{label:'Profile visits',value:'+3,200',sub:'from promotion',up:true}].map((it,i)=>(
          <div key={i} style={{display:'flex', alignItems:'center', justifyContent:'space-between', padding:'11px 14px', borderRadius:10, background:'rgba(22,101,52,.1)', border:'1px solid rgba(22,101,52,.22)'}}>
            <div>
              <div style={{fontSize:10, fontFamily:'var(--mono)', color:'rgba(240,246,232,.4)', textTransform:'uppercase', letterSpacing:'.06em', marginBottom:2}}>{it.label}</div>
              <div style={{fontSize:11, color:'rgba(240,246,232,.4)', fontFamily:'var(--mono)'}}>{it.sub}</div>
            </div>
            <div style={{fontWeight:900, fontSize:22, letterSpacing:'-.03em', color:'#4ade80'}}>{it.value}</div>
          </div>
        ))}
      </div>
    ),
  ];

  const content = visuals[idx] ? visuals[idx]() : visuals[0]();

  return (
    <div style={{
      height:'100%', minHeight:400,
      background:'linear-gradient(155deg,#0a1a0c,#0c1e0e)',
      border:'1px solid rgba(22,101,52,.25)', borderRadius:24,
      padding:'24px 22px', display:'flex', flexDirection:'column',
      color:'var(--bone)', overflow:'hidden', position:'relative',
      boxShadow:'0 32px 80px rgba(0,0,0,.25), 0 0 0 1px rgba(22,101,52,.1)',
    }}>
      {/* Glow */}
      <div style={{position:'absolute', top:-80, right:-80, width:260, height:260, borderRadius:'50%', background:'var(--accent)', opacity:.08, filter:'blur(60px)', pointerEvents:'none'}}/>

      {/* Header */}
      <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:18, position:'relative'}}>
        <div style={{display:'flex', alignItems:'center', gap:10}}>
          <div style={{width:28, height:28, borderRadius:8, background:'var(--accent)', display:'flex', alignItems:'center', justifyContent:'center', fontSize:13}}>{step.icon}</div>
          <span style={{fontFamily:'var(--mono)', fontSize:10, color:'rgba(240,246,232,.5)', textTransform:'uppercase', letterSpacing:'.1em'}}>Step {step.n} / 4</span>
        </div>
        {/* Progress dots */}
        <div style={{display:'flex', gap:5}}>
          {steps.map((_,i)=>(
            <div key={i} style={{
              height:3, borderRadius:2,
              width: i===idx ? 24 : 8,
              background: i<=idx ? 'var(--accent)' : 'rgba(240,246,232,.12)',
              transition:'width .35s, background .35s',
            }}/>
          ))}
        </div>
      </div>

      {/* Step title in card */}
      <div style={{marginBottom:16, position:'relative'}}>
        <div style={{fontFamily:'var(--sans)', fontWeight:900, fontSize:'clamp(18px,2.2vw,26px)', letterSpacing:'-.03em', textTransform:'uppercase', color:'#fff', lineHeight:1.05}}>{step.t}</div>
        <div style={{fontSize:10, fontFamily:'var(--mono)', color:'rgba(240,246,232,.35)', letterSpacing:'.1em', textTransform:'uppercase', marginTop:4}}>{step.sub}</div>
      </div>

      {/* Dynamic content */}
      <div style={{flex:1, display:'flex', flexDirection:'column', position:'relative', minHeight:0, animation:'stepFadeIn .35s ease'}}>
        {content}
      </div>

      <style>{`
        @keyframes stepFadeIn{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:none}}
        @keyframes livePulse{0%,100%{opacity:1;transform:scale(1)}50%{opacity:.5;transform:scale(1.6)}}
      `}</style>
    </div>
  );
};

window.Process = Process;
