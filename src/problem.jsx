// PROBLEM — dark warm Kinetic
const Problem = () => {
  return (
    <window.Section id="problem" padded>
      <div className="wrap">
        <header style={{textAlign:'center', marginBottom:60, maxWidth:980, margin:'0 auto 60px'}}>
          <span className="reveal" style={window.labelStyle}>Where most creators get stuck</span>
          <h2 className="wreveal" style={{...window.bigHeadStyle(), fontSize:'clamp(44px, 8vw, 132px)', marginTop:18}}>
            The stage no one talks about.
          </h2>
          <p className="reveal reveal-d2" style={{
            marginTop:18, maxWidth:680, margin:'18px auto 0',
            fontFamily:'var(--serif)', fontStyle:'italic', fontWeight:300,
            fontSize:'clamp(20px,2.4vw,30px)', lineHeight:1.3, color:'var(--ink-2)',
          }}>
            But everyone goes through it.
          </p>
        </header>

        <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:24}} className="prob-grid">
          {/* LEFT — feeling */}
          <div className="reveal prob-card" style={{
            background:'rgba(15,31,15,.04)', border:'1px solid var(--line)',
            borderRadius:24, padding:'36px 32px', backdropFilter:'blur(8px)',
          }}>
            <span style={{...window.labelStyle, marginBottom:18, display:'inline-flex'}}>The feeling</span>
            <ul style={{listStyle:'none', display:'flex', flexDirection:'column', gap:10, fontSize:16, lineHeight:1.55, color:'var(--ink-2)', marginTop:14}}>
              <li>You post regularly.</li>
              <li>You try different types of videos.</li>
              <li>You put effort into your content.</li>
            </ul>
            <p style={{marginTop:24, fontSize:'clamp(20px,2.4vw,28px)', lineHeight:1.25, color:'var(--ink)', fontFamily:'var(--serif)', fontStyle:'italic', fontWeight:400, letterSpacing:'-.02em'}}>
              But nothing changes.
            </p>
            <div style={{marginTop:24, padding:'18px 20px', background:'rgba(15,31,15,.05)', borderRadius:14, border:'1px solid var(--line-soft)'}}>
              <div style={{fontSize:11, fontFamily:'var(--mono)', color:'var(--ink-3)', textTransform:'uppercase', letterSpacing:'.1em', marginBottom:12}}>And slowly you start thinking…</div>
              <div style={{display:'flex', flexDirection:'column', gap:8, fontSize:14, color:'var(--ink-2)'}}>
                <span style={{paddingLeft:12, borderLeft:'2px solid var(--accent)', fontStyle:'italic'}}>"Maybe my content is not good enough."</span>
                <span style={{paddingLeft:12, borderLeft:'2px solid var(--accent)', fontStyle:'italic'}}>"Do I need a better phone?"</span>
                <span style={{paddingLeft:12, borderLeft:'2px solid var(--accent)', fontStyle:'italic'}}>"Am I doing something wrong?"</span>
              </div>
            </div>
            <p style={{marginTop:20, fontSize:14, fontWeight:700, color:'var(--ink)', lineHeight:1.5}}>
              This is the stage where most people give up.
            </p>
          </div>

          {/* RIGHT — truth */}
          <div className="reveal reveal-d2 prob-card" style={{
            background:'linear-gradient(140deg, rgba(10,25,12,.95), rgba(15,31,15,.92))',
            color:'var(--bone)', borderRadius:24, padding:'36px 32px',
            position:'relative', overflow:'hidden', border:'1px solid var(--line)',
          }}>
            <div style={{position:'absolute', top:-60, right:-60, width:280, height:280, borderRadius:'50%', background:'var(--accent)', opacity:.25, filter:'blur(80px)'}}/>
            <span style={{...window.labelStyle, color:'rgba(240,246,232,.55)', marginBottom:18, display:'inline-flex', position:'relative'}}>The truth</span>
            <h3 style={{
              fontFamily:'var(--sans)', fontWeight:900, fontSize:'clamp(36px, 5vw, 72px)',
              letterSpacing:'-.04em', lineHeight:.95, marginTop:14, position:'relative',
              textTransform:'uppercase', color:'var(--bone)',
            }}>
              It's <window.Em>not</window.Em><br/>your content.
            </h3>
            <p style={{marginTop:24, fontSize:16, lineHeight:1.55, color:'rgba(240,246,232,.78)', position:'relative'}}>
              Most creators don't fail because their content is bad. They fail because their content is <span style={{color:'var(--accent)', fontStyle:'italic', fontFamily:'var(--serif)'}}>not being seen</span>.
            </p>
            <div style={{marginTop:28, padding:'20px', background:'rgba(22,101,52,.12)', borderRadius:14, border:'1px solid rgba(22,101,52,.3)', position:'relative'}}>
              <div style={{fontSize:13, color:'rgba(240,246,232,.55)', marginBottom:6, fontFamily:'var(--mono)', textTransform:'uppercase', letterSpacing:'.1em'}}>That's not your fault.</div>
              <div style={{fontSize:'clamp(20px,2.5vw,28px)', fontWeight:800, color:'var(--accent)', letterSpacing:'-.02em'}}>It's a visibility problem.</div>
            </div>
            <p style={{marginTop:24, fontSize:16, lineHeight:1.55, color:'rgba(240,246,232,.78)', position:'relative', fontWeight:600}}>
              And that's exactly where we help you.
            </p>
          </div>
        </div>
        {/* Bridge to next section */}
        <div className="reveal" style={{marginTop:48, display:'flex', alignItems:'center', justifyContent:'center', gap:16, flexWrap:'wrap'}}>
          <span style={{fontSize:15, color:'var(--ink-2)', fontFamily:'var(--serif)', fontStyle:'italic', fontWeight:600}}>You're not alone. This is where most creators get stuck.</span>
          <a href="#" onClick={e=>{e.preventDefault();window.scrollToSection&&window.scrollToSection("process");}} style={{
            display:'inline-flex', alignItems:'center', gap:8,
            fontSize:14, fontWeight:700, color:'var(--accent)', textDecoration:'none',
            borderBottom:'1.5px solid var(--accent-l)', paddingBottom:2,
            transition:'border-color .2s',
          }}
          onMouseEnter={e=>e.currentTarget.style.borderColor='var(--accent)'}
          onMouseLeave={e=>e.currentTarget.style.borderColor='var(--accent-l)'}>
            See how we fix it →
          </a>
        </div>

        <style>{`
          @media(max-width:900px){.prob-grid{grid-template-columns:1fr !important; gap:16px}}
          @media(max-width:480px){.prob-card{padding:24px 20px !important}}
        `}</style>
      </div>
    </window.Section>
  );
};
window.Problem = Problem;
