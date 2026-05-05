// PROCESS — 3D step cards, mobile timeline vertical scroll
const steps = [
  {n:'01', t:'Choose your plan', sub:'Takes 30 seconds', d:"Pick a plan based on where you are. Spark if you're starting out, Ignite if you're stuck, Momentum and above if you're serious.", icon:'📦', color:'#166534'},
  {n:'02', t:'Share your handle', sub:'No passwords, ever', d:'Fill in a 2-minute form — your handle, niche, and goals. No passwords, no admin access, no complicated setup.', icon:'📋', color:'#0d9488'},
  {n:'03', t:'We get to work', sub:'You do nothing', d:'We run your promotion campaign across the right channels. Real accounts, real reach. You just keep posting.', icon:'🚀', color:'#166534'},
  {n:'04', t:'Your content reaches people', sub:'Results in 24–72h', d:"More people see your content. Your follower count moves. Your engagement picks up. That's the whole point.", icon:'📈', color:'#16a34a'},
];

const Process = () => {
  const [active, setActive] = useState(0);
  const ref = useRef(null);

  useEffect(() => {
    const onScroll = () => {
      if (!ref.current) return;
      const r = ref.current.getBoundingClientRect();
      const total = r.height - window.innerHeight;
      const p = Math.max(0, Math.min(1, -r.top / (total || 1)));
      const idx = Math.min(steps.length - 1, Math.floor(p * steps.length));
      setActive(idx);
    };
    window.addEventListener('scroll', onScroll, {passive:true});
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <window.Section id="process" padded>
      <div className="wrap">
        <header style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:32, marginBottom:56, alignItems:'end'}} className="proc-head">
          <div>
            <span className="reveal" style={window.labelStyle}>How it works</span>
            <h2 className="wreveal" style={{...window.bigHeadStyle(), fontSize:'clamp(40px,7vw,120px)', marginTop:14}}>
              Four steps.<br/><window.Em>Real results.</window.Em>
            </h2>
          </div>
          <p className="reveal reveal-d2" style={{fontSize:17, lineHeight:1.55, color:'var(--ink-2)', maxWidth:460, justifySelf:'end', fontFamily:'var(--serif)', fontStyle:'italic', fontWeight:300}}>
            No complicated setup. No waiting around. Just a clear process from picking a plan to seeing real movement.
          </p>
        </header>

        {/* Desktop: sticky visual left, steps right */}
        <div ref={ref} style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:48, position:'relative'}} className="proc-body">
          <div style={{position:'sticky', top:120, alignSelf:'start', height:'min(64vh,520px)'}} className="proc-sticky">
            <ProcessVisual idx={active}/>
          </div>
          <div style={{display:'flex', flexDirection:'column', gap:8}}>
            {steps.map((s, i) => (
              <div key={i}
                onMouseEnter={() => setActive(i)}
                onClick={() => setActive(i)}
                className="reveal proc-step"
                style={{
                  padding:'20px 22px', borderRadius:16, cursor:'pointer',
                  background: active===i ? 'rgba(22,101,52,.08)' : 'transparent',
                  border:'1px solid', borderColor: active===i ? 'rgba(22,101,52,.3)' : 'transparent',
                  transition:'all .3s',
                  WebkitTapHighlightColor:'transparent',
                }}>
                <div style={{display:'flex', alignItems:'baseline', gap:16}}>
                  <span style={{fontFamily:'var(--mono)', fontSize:12, color:'var(--accent)', fontWeight:700, flexShrink:0}}>{s.n}</span>
                  <div style={{flex:1}}>
                    <h3 style={{fontFamily:'var(--sans)', fontWeight:800, fontSize:'clamp(16px,2.5vw,28px)', letterSpacing:'-.02em', lineHeight:1.1, color:active===i?'var(--ink)':'var(--ink-2)', textTransform:'uppercase', transition:'color .3s'}}>
                      {s.t}
                    </h3>
                    <p className="proc-step-desc" style={{marginTop:7, fontSize:13, lineHeight:1.55, color:'var(--ink-2)', maxHeight:active===i?200:0, overflow:'hidden', transition:'max-height .35s', opacity:active===i?1:0}}>{s.d}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* MOBILE: vertical timeline (replaces the 2-col layout) */}
        <div className="proc-mobile-timeline" style={{display:'none', flexDirection:'column', gap:0, marginTop:8}}>
          {steps.map((s, i) => (
            <MobileStep key={i} s={s} i={i} total={steps.length}/>
          ))}
        </div>

        {/* CTA after process */}
        <div className="reveal" style={{marginTop:48, textAlign:'center'}}>
          <p style={{fontSize:16, color:'var(--ink-2)', marginBottom:18, fontFamily:'var(--serif)', fontStyle:'italic', fontWeight:300}}>
            That's the whole process. No fluff, no waiting, no passwords.
          </p>
          <div style={{display:'flex', gap:12, justifyContent:'center', flexWrap:'wrap'}}>
            <window.Btn primary href="#" onClick={e=>{e.preventDefault();window.scrollToSection&&window.scrollToSection("pricing");}}>View packages →</window.Btn>
            <window.Btn onClick={() => window.openAuditModal && window.openAuditModal()}>Get free audit</window.Btn>
          </div>
        </div>
      </div>

      <style>{`
        @media(max-width:900px){
          .proc-head{grid-template-columns:1fr !important;gap:12px}
          .proc-head p{display:none}
          .proc-body{display:none !important}
          .proc-mobile-timeline{display:flex !important}
        }
        @media(max-width:480px){.proc-sticky{height:340px !important;min-height:340px}}
      `}</style>
    </window.Section>
  );
};

// Mobile timeline step — reveals with slide-in animation
const MobileStep = ({s, i, total}) => {
  const ref = useRef(null);
  const [vis, setVis] = useState(false);

  useEffect(() => {
    const el = ref.current; if(!el) return;
    const io = new IntersectionObserver(([e]) => {
      if(e.isIntersecting){ setVis(true); io.disconnect(); }
    }, {threshold:0.2, rootMargin:'-3% 0px -3% 0px'});
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={ref} style={{display:'flex', gap:0, position:'relative'}}>
      {/* Timeline line */}
      <div style={{display:'flex', flexDirection:'column', alignItems:'center', width:40, flexShrink:0}}>
        <div style={{
          width:36, height:36, borderRadius:'50%', flexShrink:0,
          background: vis ? 'var(--accent)' : 'var(--soft)',
          border:'2px solid var(--line)',
          display:'flex', alignItems:'center', justifyContent:'center',
          fontSize:18, transition:'background .5s .2s',
          boxShadow: vis ? '0 0 0 6px rgba(22,101,52,.15)' : 'none',
        }}>{s.icon}</div>
        {i < total - 1 && (
          <div style={{
            width:2, flex:1, minHeight:24,
            background: vis ? 'linear-gradient(to bottom, var(--accent), rgba(22,101,52,.15))' : 'var(--line)',
            transition:'background .5s .4s',
            marginTop:4, marginBottom:4,
          }}/>
        )}
      </div>

      {/* Content */}
      <div style={{
        flex:1, padding:'0 0 28px 16px',
        opacity: vis ? 1 : 0,
        transform: vis ? 'translateX(0)' : 'translateX(16px)',
        transition:`opacity .5s ease ${i*0.1}s, transform .5s ease ${i*0.1}s`,
      }}>
        <div style={{fontFamily:'var(--mono)', fontSize:9, color:'var(--accent)', letterSpacing:'.12em', textTransform:'uppercase', marginBottom:4, marginTop:8}}>Step {s.n}</div>
        <h3 style={{fontFamily:'var(--sans)', fontWeight:800, fontSize:18, letterSpacing:'-.02em', color:'var(--ink)', textTransform:'uppercase', marginBottom:6}}>{s.t}</h3>
        <div style={{display:'inline-flex', padding:'3px 10px', background:'rgba(22,101,52,.08)', borderRadius:999, fontSize:11, fontFamily:'var(--mono)', color:'var(--accent)', marginBottom:8}}>{s.sub}</div>
        <p style={{fontSize:13, lineHeight:1.6, color:'var(--ink-2)'}}>{s.d}</p>
      </div>
    </div>
  );
};

const ProcessVisual = ({idx}) => {
  const cards = [
    {step:'01',title:'Choose your plan',items:[{name:'Spark',price:'$79',highlight:false},{name:'Ignite',price:'$199',highlight:true},{name:'Momentum',price:'$399',highlight:false},{name:'Influence',price:'$799',highlight:false}]},
    {step:'02',title:'Share your handle',items:[{label:'Handle',value:'@yourchannel'},{label:'Niche',value:'Lifestyle'},{label:'Followers',value:'2.4K'},{label:'Goal',value:'More reach'}]},
    {step:'03',title:'We get to work',items:[{icon:'🚀',text:'Campaign launched'},{icon:'📡',text:'Content promoted'},{icon:'👥',text:'Audience reached'},{icon:'⚡',text:'Results in 24–72h'}]},
    {step:'04',title:'Your content reaches people',items:[{label:'Reach',value:'↑ Rising',green:true},{label:'Followers',value:'↑ Growing',green:true},{label:'Engagement',value:'↑ More',green:true},{label:'Visibility',value:'↑ Up',green:true}]},
  ];
  const card = cards[idx] || cards[0];

  return (
    <div style={{
      height:'100%', minHeight:400,
      background:'linear-gradient(160deg,#0a190c,#0f1f0f)',
      border:'1px solid rgba(22,101,52,.3)', borderRadius:20,
      padding:24, display:'flex', flexDirection:'column',
      color:'var(--bone)', overflow:'hidden',
      boxShadow:'0 20px 60px rgba(0,0,0,.2)',
    }}>
      <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:20}}>
        <span style={{fontFamily:'var(--mono)', fontSize:10, color:'rgba(240,246,232,.45)', textTransform:'uppercase', letterSpacing:'.1em'}}>Step {card.step} / 4</span>
        <div style={{display:'flex', gap:5}}>
          {cards.map((_,i) => (
            <div key={i} style={{width:20, height:2.5, borderRadius:2, background:i<=idx?'var(--accent)':'rgba(240,246,232,.15)', transition:'background .35s'}}/>
          ))}
        </div>
      </div>

      {idx===0 && (
        <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:8, flex:1, alignItems:'center'}}>
          {card.items.map((p,i) => (
            <div key={i} style={{padding:'12px 10px', borderRadius:10, background:p.highlight?'var(--accent)':'rgba(240,246,232,.05)', border:`1px solid ${p.highlight?'var(--accent)':'rgba(240,246,232,.12)'}`, position:'relative', transition:'transform .2s', cursor:'default'}}>
              {p.highlight && <span style={{position:'absolute', top:-8, right:8, fontSize:8, padding:'2px 6px', background:'#fff', color:'var(--accent)', borderRadius:999, fontFamily:'var(--mono)', textTransform:'uppercase', fontWeight:700}}>Popular</span>}
              <div style={{fontSize:9, fontFamily:'var(--mono)', opacity:.6, textTransform:'uppercase', letterSpacing:'.06em'}}>{p.name}</div>
              <div style={{fontWeight:900, fontSize:20, marginTop:3, letterSpacing:'-.02em'}}>{p.price}</div>
            </div>
          ))}
        </div>
      )}
      {idx===1 && (
        <div style={{flex:1, display:'flex', flexDirection:'column', gap:9, justifyContent:'center', minHeight:0}}>
          {card.items.map((f,i) => (
            <div key={i} style={{display:'flex', alignItems:'center', gap:12, background:'rgba(240,246,232,.05)', borderRadius:10, padding:'13px 15px', border:'1px solid rgba(240,246,232,.1)'}}>
              <span style={{fontSize:9, fontFamily:'var(--mono)', color:'rgba(240,246,232,.4)', textTransform:'uppercase', letterSpacing:'.08em', minWidth:68}}>{f.label}</span>
              <span style={{fontSize:14, color:'rgba(240,246,232,.85)', fontWeight:600}}>{f.value}</span>
            </div>
          ))}
        </div>
      )}
      {idx===2 && (
        <div style={{flex:1, display:'grid', gridTemplateColumns:'1fr 1fr', gridAutoRows:'1fr', gap:10, minHeight:0}}>
          {card.items.map((it,i) => (
            <div key={i} style={{padding:'16px 12px', borderRadius:12, background:'rgba(240,246,232,.05)', border:'1px solid rgba(240,246,232,.1)', display:'flex', flexDirection:'column', gap:8, justifyContent:'center'}}>
              <span style={{fontSize:28}}>{it.icon}</span>
              <span style={{fontSize:12, color:'rgba(240,246,232,.75)', lineHeight:1.3, fontWeight:500}}>{it.text}</span>
            </div>
          ))}
        </div>
      )}
      {idx===3 && (
        <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:8, flex:1, alignItems:'center'}}>
          {card.items.map((it,i) => (
            <div key={i} style={{padding:'12px 10px', borderRadius:10, background:'rgba(22,101,52,.12)', border:'1px solid rgba(22,101,52,.25)'}}>
              <div style={{fontSize:10, fontFamily:'var(--mono)', color:'rgba(240,246,232,.45)', textTransform:'uppercase', letterSpacing:'.06em', marginBottom:5}}>{it.label}</div>
              <div style={{fontWeight:800, fontSize:20, color:'#4ade80', letterSpacing:'-.01em'}}>{it.value}</div>
            </div>
          ))}
        </div>
      )}

      <div style={{fontFamily:'var(--mono)', fontWeight:600, fontSize:12, letterSpacing:'.04em', color:'rgba(240,246,232,.35)', textTransform:'uppercase', marginTop:14}}>
        {card.title}
      </div>
    </div>
  );
};

window.Process = Process;
