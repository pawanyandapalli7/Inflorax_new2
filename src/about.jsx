// ABOUT — founder story left, clean mission card right (no embedded CTA/service rows)
const About = () => (
  <window.Section id="about" padded>
    <div className="wrap">
      <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:64}} className="about-grid">

        {/* LEFT */}
        <div>
          <span className="reveal" style={window.labelStyle}>The studio</span>
          <h2 className="reveal reveal-d1" style={{...window.bigHeadStyle(), fontSize:'clamp(40px,6vw,96px)', marginTop:18}}>
            Small team.<br/><window.Em>Real results.</window.Em>
          </h2>
          <p className="reveal reveal-d2" style={{marginTop:24, fontSize:17, lineHeight:1.7, color:'var(--ink-2)', maxWidth:480}}>
            Inflorax is a creator promotion studio focused entirely on one thing — getting your content seen by the right people on Instagram and YouTube.
          </p>
          <p className="reveal reveal-d3" style={{marginTop:16, fontSize:17, lineHeight:1.7, color:'var(--ink-2)', maxWidth:480}}>
            We don't do editing, scriptwriting, or strategy. We do promotion — properly, without bots, without fake accounts, and without ever asking for your password.
          </p>

          <div className="reveal reveal-d3 about-values" style={{marginTop:32, display:'grid', gridTemplateColumns:'1fr 1fr', gap:12}}>
            {[
              ['🎯','Promotion only','One thing, done well.'],
              ['🔒','Zero account access','Never ask for your login.'],
              ['📈','Real accounts only','No bots, no fakes.'],
              ['⚡','Fast start','Campaigns live in 24–72h.'],
            ].map(([ic,t,d]) => (
              <div key={t} style={{padding:'14px', background:'var(--soft)', borderRadius:12, border:'1px solid var(--line)'}}>
                <div style={{fontSize:18, marginBottom:6}}>{ic}</div>
                <div style={{fontWeight:700, fontSize:13, color:'var(--ink)', marginBottom:3}}>{t}</div>
                <div style={{fontSize:12, color:'var(--ink-3)', lineHeight:1.4}}>{d}</div>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT — mission only, no CTA */}
        <div className="reveal reveal-d1 about-mission-card" style={{
          background:'var(--ink)', color:'var(--bone)',
          padding:'44px 36px', borderRadius:28,
          position:'relative', overflow:'hidden',
          display:'flex', flexDirection:'column', justifyContent:'center', gap:24,
        }}>
          <div style={{position:'absolute',top:-60,right:-60,width:240,height:240,borderRadius:'50%',background:'var(--accent)',opacity:.12,filter:'blur(80px)'}}/>
          <div style={{position:'absolute',bottom:-80,left:-40,width:200,height:200,borderRadius:'50%',background:'var(--accent)',opacity:.08,filter:'blur(60px)'}}/>

          <div style={{position:'relative'}}>
            <span style={{...window.labelStyle, color:'rgba(240,246,232,.4)', marginBottom:16, display:'inline-flex'}}>Our mission</span>
            <h3 style={{
              fontFamily:'var(--serif)', fontStyle:'italic', fontWeight:300,
              fontSize:'clamp(26px,3.5vw,42px)', letterSpacing:'-.02em', lineHeight:1.15,
              color:'var(--bone)', marginTop:14,
            }}>
              Every creator deserves to be <span style={{color:'var(--accent)'}}>seen.</span>
            </h3>
            <p style={{marginTop:18, fontSize:15, lineHeight:1.7, color:'rgba(240,246,232,.6)'}}>
              Too much good content disappears into the algorithm — not because it's bad, but because it never got the initial push it needed. We exist to fix that.
            </p>
          </div>

          {/* Simple platform tags — no service list */}
          <div style={{position:'relative', display:'flex', gap:10, flexWrap:'wrap'}}>
            {[['📸','Instagram'],['▶️','YouTube'],['🌐','Both platforms']].map(([ic,t]) => (
              <div key={t} style={{
                display:'flex', alignItems:'center', gap:8,
                padding:'8px 14px', borderRadius:999,
                background:'rgba(240,246,232,.07)', border:'1px solid rgba(240,246,232,.1)',
                fontSize:13, color:'rgba(240,246,232,.75)',
              }}>
                <span style={{fontSize:15}}>{ic}</span>{t}
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
        {/* CTA */}
        <div className="reveal" style={{marginTop:48, textAlign:'center'}}>
          <div style={{display:'flex', gap:12, justifyContent:'center', flexWrap:'wrap'}}>
            <window.Btn primary href="#" onClick={e=>{e.preventDefault();window.scrollToSection&&window.scrollToSection("pricing");}}>View packages →</window.Btn>
            <window.Btn onClick={() => window.openAuditModal && window.openAuditModal()}>Get free audit</window.Btn>
          </div>
          <p style={{marginTop:16, fontSize:13, color:'var(--ink-3)'}}>
            Questions? <a href="mailto:info@inflorax.com" style={{color:'var(--accent)', textDecoration:'none', fontWeight:600}}>info@inflorax.com</a>
          </p>
        </div>

    <style>{`
      @media(max-width:900px){.about-grid{grid-template-columns:1fr !important;gap:28px}}
      @media(max-width:480px){.about-mission-card{padding:28px 22px !important}}
      @media(max-width:480px){.about-values{grid-template-columns:1fr 1fr !important;gap:10px !important}}
    `}</style>
  </window.Section>
);
window.About = About;
