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
            <window.Btn primary href="#" onClick={e=>{e.preventDefault();window.scrollToSection&&window.scrollToSection("pricing");}}>View packages →</window.Btn>
            <window.Btn onClick={() => window.openAuditModal && window.openAuditModal()}>Get free audit</window.Btn>
          </div>
        </div>

        <style>{`
          @media(max-width:900px){
            .proc-head{grid-template-columns:1fr !important; gap:16px}
            .proc-body{grid-template-columns:1fr !important; gap:24px; display:flex !important; flex-direction:column-reverse}
            .proc-sticky{position:relative !important; top:0 !important; height:280px !important; min-height:280px}
          }
          @media(max-width:600px){
            .proc-sticky{height:240px !important; min-height:240px}
          }
        `}</style>
      </div>
    </window.Section>
  );
};

const ProcessVisual = ({idx}) => {
  const cards = [
    {
      step:'01', title:'Pick a plan',
      items:[
        {name:'Spark', price:'$79', highlight:false},
        {name:'Ignite', price:'$199', highlight:true},
        {name:'Momentum', price:'$399', highlight:false},
        {name:'Influence', price:'$799', highlight:false},
      ],
    },
    {
      step:'02', title:'Tell us about your account',
      items:[
        {label:'Handle', value:'@yourchannel'},
        {label:'Niche', value:'Lifestyle'},
        {label:'Followers', value:'2.4K'},
        {label:'Goal', value:'More reach'},
      ],
    },
    {
      step:'03', title:'We start your growth',
      items:[
        {icon:'🚀', text:'Campaign launched'},
        {icon:'📡', text:'Content promoted'},
        {icon:'👥', text:'Audience reached'},
        {icon:'⚡', text:'Results in 24–72h'},
      ],
    },
    {
      step:'04', title:'You see real movement',
      items:[
        {label:'Reach', value:'↑ Rising', green:true},
        {label:'Followers', value:'↑ Growing', green:true},
        {label:'Engagement', value:'↑ More', green:true},
        {label:'Visibility', value:'↑ Up', green:true},
      ],
    },
  ];

  const card = cards[idx] || cards[0];

  return (
    <div style={{
      height:'100%', minHeight:240,
      background:'linear-gradient(160deg, #0a190c, #0f1f0f)',
      border:'1px solid rgba(22,101,52,.3)', borderRadius:20,
      padding:24, display:'flex', flexDirection:'column', gap:16,
      color:'var(--bone)',
    }}>
      {/* Header */}
      <div style={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
        <span style={{fontFamily:'var(--mono)', fontSize:10, color:'rgba(240,246,232,.45)', textTransform:'uppercase', letterSpacing:'.1em'}}>
          Step {card.step} / 4
        </span>
        <div style={{display:'flex', gap:5}}>
          {cards.map((_,i) => (
            <div key={i} style={{width:20, height:2.5, borderRadius:2, background: i<=idx ? 'var(--accent)' : 'rgba(240,246,232,.15)', transition:'background .35s'}}/>
          ))}
        </div>
      </div>

      {/* Content */}
      {idx === 0 && (
        <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:8, flex:1, alignItems:'center'}}>
          {card.items.map((p,i) => (
            <div key={i} style={{
              padding:'12px 10px', borderRadius:10,
              background: p.highlight ? 'var(--accent)' : 'rgba(240,246,232,.05)',
              border:`1px solid ${p.highlight ? 'var(--accent)' : 'rgba(240,246,232,.12)'}`,
              position:'relative',
            }}>
              {p.highlight && <span style={{position:'absolute', top:-8, right:8, fontSize:8, padding:'2px 6px', background:'#fff', color:'var(--accent)', borderRadius:999, fontFamily:'var(--mono)', textTransform:'uppercase', fontWeight:700}}>Popular</span>}
              <div style={{fontSize:9, fontFamily:'var(--mono)', opacity:.6, textTransform:'uppercase', letterSpacing:'.06em'}}>{p.name}</div>
              <div style={{fontWeight:900, fontSize:20, marginTop:3, letterSpacing:'-.02em'}}>{p.price}</div>
            </div>
          ))}
        </div>
      )}

      {idx === 1 && (
        <div style={{display:'flex', flexDirection:'column', gap:8, flex:1, justifyContent:'center'}}>
          {card.items.map((f,i) => (
            <div key={i} style={{display:'flex', alignItems:'center', gap:10, background:'rgba(240,246,232,.04)', borderRadius:8, padding:'9px 12px', border:'1px solid rgba(240,246,232,.08)'}}>
              <span style={{fontSize:9, fontFamily:'var(--mono)', color:'rgba(240,246,232,.4)', textTransform:'uppercase', letterSpacing:'.08em', minWidth:60}}>{f.label}</span>
              <span style={{fontSize:13, color:'rgba(240,246,232,.8)', fontWeight:500}}>{f.value}</span>
            </div>
          ))}
        </div>
      )}

      {idx === 2 && (
        <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:8, flex:1, alignItems:'center'}}>
          {card.items.map((it,i) => (
            <div key={i} style={{padding:'12px 10px', borderRadius:10, background:'rgba(240,246,232,.05)', border:'1px solid rgba(240,246,232,.1)', display:'flex', alignItems:'center', gap:8}}>
              <span style={{fontSize:20}}>{it.icon}</span>
              <span style={{fontSize:12, color:'rgba(240,246,232,.75)', lineHeight:1.3}}>{it.text}</span>
            </div>
          ))}
        </div>
      )}

      {idx === 3 && (
        <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:8, flex:1, alignItems:'center'}}>
          {card.items.map((it,i) => (
            <div key={i} style={{padding:'12px 10px', borderRadius:10, background:'rgba(22,101,52,.12)', border:'1px solid rgba(22,101,52,.25)'}}>
              <div style={{fontSize:9, fontFamily:'var(--mono)', color:'rgba(240,246,232,.45)', textTransform:'uppercase', letterSpacing:'.06em', marginBottom:4}}>{it.label}</div>
              <div style={{fontWeight:800, fontSize:16, color:'#4ade80', letterSpacing:'-.01em'}}>{it.value}</div>
            </div>
          ))}
        </div>
      )}

      {/* Step title */}
      <div style={{fontFamily:'var(--sans)', fontWeight:800, fontSize:15, letterSpacing:'-.01em', color:'rgba(240,246,232,.6)', textTransform:'uppercase'}}>
        {card.title}
      </div>
    </div>
  );
};

window.Process = Process;
