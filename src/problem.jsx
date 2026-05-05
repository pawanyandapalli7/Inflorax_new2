// PROBLEM — dark warm Kinetic with 3D scroll-in cards
const Problem = () => {
  const statsRef = useRef(null);
  const [statsVis, setStatsVis] = useState(false);

  useEffect(() => {
    const el = statsRef.current; if(!el) return;
    const io = new IntersectionObserver(([e]) => {
      if(e.isIntersecting){ setStatsVis(true); io.disconnect(); }
    }, {threshold:0.2});
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <window.Section id="problem" padded>
      <div className="wrap">
        <header style={{textAlign:'center', marginBottom:60, maxWidth:980, margin:'0 auto 60px'}}>
          <span className="reveal" style={window.labelStyle}>Where most creators get stuck</span>
          <h2 className="wreveal" style={{...window.bigHeadStyle(), fontSize:'clamp(40px,8vw,120px)', marginTop:18}}>
            The stage no one talks about.
          </h2>
          <p className="reveal reveal-d2" style={{
            marginTop:18, maxWidth:600, margin:'18px auto 0',
            fontFamily:'var(--serif)', fontStyle:'italic', fontWeight:300,
            fontSize:'clamp(18px,2.2vw,28px)', lineHeight:1.4, color:'var(--ink-2)',
          }}>
            But everyone goes through it.
          </p>
        </header>

        {/* Stats strip — mobile scrollable, counts up */}
        <div ref={statsRef} className="prob-stats" style={{
          display:'flex', gap:0, overflowX:'auto',
          scrollSnapType:'x mandatory', WebkitOverflowScrolling:'touch',
          scrollbarWidth:'none', marginBottom:32,
          borderRadius:16, overflow:'hidden',
          border:'1px solid var(--line)',
        }}>
          {[
            {n:93, suffix:'%', label:'of creators never break 1K followers'},
            {n:72, suffix:'%', label:'of Reels reach <500 people'},
            {n:4, suffix:'x', label:'more views with targeted promotion'},
          ].map((s, i) => (
            <div key={i} style={{
              flex:'0 0 clamp(180px,33.333%,100%)',
              scrollSnapAlign:'start',
              padding:'24px 20px',
              background: i===1 ? 'var(--accent)' : i===2 ? 'var(--ink)' : 'var(--soft)',
              color: i===0 ? 'var(--ink)' : '#fff',
              borderRight: i<2 ? '1px solid var(--line)' : 'none',
              textAlign:'center',
            }}>
              <div style={{
                fontFamily:'var(--sans)', fontWeight:900,
                fontSize:'clamp(40px,6vw,64px)', letterSpacing:'-.04em', lineHeight:1,
                color: i===0 ? 'var(--accent)' : '#fff',
              }}>
                {statsVis ? <window.CountUp end={s.n} suffix={s.suffix}/> : `0${s.suffix}`}
              </div>
              <div style={{fontSize:13, lineHeight:1.4, marginTop:8, opacity:.75}}>{s.label}</div>
            </div>
          ))}
        </div>

        {/* Mobile swipe hint */}
        <div className="prob-swipe-hint" style={{
          display:'none', alignItems:'center', justifyContent:'center', gap:6,
          marginBottom:8, marginTop:-20,
        }}>
          <span style={{fontSize:10, fontFamily:'var(--mono)', color:'var(--ink-3)', letterSpacing:'.08em', textTransform:'uppercase'}}>Swipe for stats</span>
          <span style={{color:'var(--accent)', fontSize:12}}>→</span>
        </div>

        <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:20}} className="prob-grid">
          {/* LEFT — feeling */}
          <window.ScrollCard3D>
            <div className="prob-card" style={{
              background:'rgba(15,31,15,.04)', border:'1px solid var(--line)',
              borderRadius:24, padding:'32px 28px', backdropFilter:'blur(8px)',
              height:'100%',
            }}>
              <span style={{...window.labelStyle, marginBottom:16, display:'inline-flex'}}>The feeling</span>
              <ul style={{listStyle:'none', display:'flex', flexDirection:'column', gap:10, fontSize:16, lineHeight:1.55, color:'var(--ink-2)', marginTop:12}}>
                {['You post regularly.','You try different content.','You stay consistent.'].map((t,i) => (
                  <li key={i} style={{display:'flex', gap:10, alignItems:'flex-start'}}>
                    <span style={{
                      width:20, height:20, borderRadius:'50%', flexShrink:0,
                      border:'1.5px solid rgba(22,101,52,.3)',
                      display:'flex', alignItems:'center', justifyContent:'center',
                      fontSize:10, color:'var(--accent)', marginTop:2,
                    }}>✓</span>
                    {t}
                  </li>
                ))}
              </ul>
              <p style={{marginTop:20, fontSize:'clamp(18px,2.2vw,26px)', lineHeight:1.25, color:'var(--ink)', fontFamily:'var(--serif)', fontStyle:'italic', fontWeight:400, letterSpacing:'-.02em'}}>
                But nothing changes.
              </p>
              <div style={{marginTop:20, padding:'16px 18px', background:'rgba(15,31,15,.05)', borderRadius:14, border:'1px solid var(--line-soft)'}}>
                <div style={{fontSize:10, fontFamily:'var(--mono)', color:'var(--ink-3)', textTransform:'uppercase', letterSpacing:'.1em', marginBottom:10}}>You start thinking…</div>
                <div style={{display:'flex', flexDirection:'column', gap:7, fontSize:13, color:'var(--ink-2)'}}>
                  {['"Maybe my content isn\'t good enough."','"Do I need a better camera?"','"Am I doing something wrong?"'].map((q,i) => (
                    <span key={i} style={{paddingLeft:10, borderLeft:'2px solid var(--accent)', fontStyle:'italic'}}>{q}</span>
                  ))}
                </div>
              </div>
              <p style={{marginTop:16, fontSize:13, fontWeight:700, color:'var(--ink)', lineHeight:1.5}}>
                This is where most creators give up.
              </p>
            </div>
          </window.ScrollCard3D>

          {/* RIGHT — truth */}
          <window.ScrollCard3D delay={0.1}>
            <div className="prob-card" style={{
              background:'linear-gradient(140deg, rgba(10,25,12,.96), rgba(15,31,15,.94))',
              color:'var(--bone)', borderRadius:24, padding:'32px 28px',
              position:'relative', overflow:'hidden', border:'1px solid rgba(22,101,52,.2)',
              height:'100%',
            }}>
              <div style={{position:'absolute', top:-60, right:-60, width:280, height:280, borderRadius:'50%', background:'var(--accent)', opacity:.25, filter:'blur(80px)', animation:'blobPulse 6s ease-in-out infinite'}}/>
              <div style={{position:'absolute', bottom:-80, left:-40, width:200, height:200, borderRadius:'50%', background:'var(--accent)', opacity:.12, filter:'blur(60px)', animation:'blobPulse 8s ease-in-out infinite reverse'}}/>
              <span style={{...window.labelStyle, color:'rgba(240,246,232,.5)', marginBottom:16, display:'inline-flex', position:'relative'}}>The truth</span>
              <h3 style={{
                fontFamily:'var(--sans)', fontWeight:900, fontSize:'clamp(32px,4.5vw,64px)',
                letterSpacing:'-.04em', lineHeight:.95, marginTop:12, position:'relative',
                textTransform:'uppercase', color:'var(--bone)',
              }}>
                It's <window.Em>not</window.Em><br/>your content.
              </h3>
              <p style={{marginTop:20, fontSize:15, lineHeight:1.6, color:'rgba(240,246,232,.75)', position:'relative'}}>
                Most creators don't fail because their content is bad. They fail because their content is{' '}
                <span style={{color:'var(--accent)', fontStyle:'italic', fontFamily:'var(--serif)'}}>not being seen</span>.
              </p>
              <div style={{marginTop:24, padding:'18px', background:'rgba(22,101,52,.12)', borderRadius:14, border:'1px solid rgba(22,101,52,.3)', position:'relative'}}>
                <div style={{fontSize:12, color:'rgba(240,246,232,.5)', marginBottom:5, fontFamily:'var(--mono)', textTransform:'uppercase', letterSpacing:'.1em'}}>That's not your fault.</div>
                <div style={{fontSize:'clamp(18px,2.2vw,26px)', fontWeight:800, color:'var(--accent)', letterSpacing:'-.02em'}}>It's a visibility problem.</div>
              </div>
              <p style={{marginTop:20, fontSize:15, lineHeight:1.55, color:'rgba(240,246,232,.8)', position:'relative', fontWeight:600}}>
                And that's exactly where we help you.
              </p>

              {/* Pulsing signal indicator */}
              <div style={{position:'relative', marginTop:20, display:'flex', alignItems:'center', gap:10}}>
                <div style={{position:'relative', width:32, height:32}}>
                  <div style={{position:'absolute', inset:0, borderRadius:'50%', background:'rgba(22,101,52,.2)', animation:'ping 2s ease-in-out infinite'}}/>
                  <div style={{position:'absolute', inset:4, borderRadius:'50%', background:'rgba(22,101,52,.4)', animation:'ping 2s ease-in-out infinite .4s'}}/>
                  <div style={{position:'absolute', inset:9, borderRadius:'50%', background:'var(--accent)'}}/>
                </div>
                <span style={{fontSize:12, fontFamily:'var(--mono)', color:'rgba(240,246,232,.5)', textTransform:'uppercase', letterSpacing:'.08em'}}>We fix the signal</span>
              </div>
            </div>
          </window.ScrollCard3D>
        </div>

        {/* Bridge CTA */}
        <div className="reveal" style={{marginTop:32, display:'flex', alignItems:'center', justifyContent:'center', gap:12, flexWrap:'wrap'}}>
          <span style={{fontSize:15, color:'var(--ink-2)', fontFamily:'var(--serif)', fontStyle:'italic', fontWeight:600}}>You're not alone. This is where most creators get stuck.</span>
          <a href="#" onClick={e=>{e.preventDefault();window.scrollToSection&&window.scrollToSection("process");}} style={{
            display:'inline-flex', alignItems:'center', gap:8,
            fontSize:15, fontWeight:700, color:'#fff', textDecoration:'none',
            background:'var(--accent)', padding:'12px 22px', borderRadius:999,
            transition:'opacity .2s, transform .2s', boxShadow:'0 4px 16px rgba(22,101,52,.3)',
            WebkitTapHighlightColor:'transparent',
          }}
          onMouseEnter={e=>{e.currentTarget.style.opacity='.85';}}
          onMouseLeave={e=>{e.currentTarget.style.opacity='1';}}>
            See how we fix it →
          </a>
        </div>
      </div>

      <style>{`
        @keyframes blobPulse{0%,100%{opacity:.25;transform:scale(1)}50%{opacity:.35;transform:scale(1.1)}}
        @keyframes ping{0%{transform:scale(1);opacity:.7}80%,100%{transform:scale(2.4);opacity:0}}
        @media(max-width:900px){.prob-grid{grid-template-columns:1fr !important;gap:16px}}
        @media(max-width:768px){.prob-swipe-hint{display:flex !important}}
        @media(max-width:480px){.prob-card{padding:22px 18px !important}}
        @media(max-width:480px){.prob-stats>div{flex:0 0 80vw !important}}
      `}</style>
    </window.Section>
  );
};
window.Problem = Problem;
