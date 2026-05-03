// ABOUT — clean founder story + mission, no fake team, no duplicate wedont
const About = () => {
  const dir = window.useDir();
  return (
    <window.Section id="about" padded>
      <div className="wrap">
        <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:72}} className="about-grid">

          {/* LEFT — story */}
          <div>
            <span className="reveal" style={window.labelStyle}>The studio</span>
            <h2 className="reveal reveal-d1" style={{...window.bigHeadStyle(), fontSize:'clamp(40px, 6vw, 96px)', marginTop:18}}>
              Small team.<br/><window.Em>Real results.</window.Em>
            </h2>
            <p className="reveal reveal-d2" style={{marginTop:28, fontSize:17, lineHeight:1.7, color:'var(--ink-2)', maxWidth:500}}>
              Inflorax is a creator growth studio focused entirely on one thing: getting your content seen by the right people. We work with Instagram and YouTube creators at every stage — from 500 followers to 500K.
            </p>
            <p className="reveal reveal-d3" style={{marginTop:16, fontSize:17, lineHeight:1.7, color:'var(--ink-2)', maxWidth:500}}>
              We don't do editing, scriptwriting, or content strategy. We do promotion — and we do it properly, without bots, without fake accounts, and without asking for your password.
            </p>

            {/* Values grid */}
            <div className="reveal reveal-d3" style={{marginTop:36, display:'grid', gridTemplateColumns:'1fr 1fr', gap:14}}>
              {[
                ['🎯','Promotion only','We do one thing and do it well.'],
                ['🔒','Zero account access','Never ask for your login.'],
                ['📈','Organic-first','Real people, real visibility.'],
                ['⚡','Fast turnaround','Campaigns start within 24–72h.'],
              ].map(([ic,t,d]) => (
                <div key={t} style={{padding:'16px', background:'var(--soft)', borderRadius:14, border:'1px solid var(--line)'}}>
                  <div style={{fontSize:20, marginBottom:8}}>{ic}</div>
                  <div style={{fontWeight:700, fontSize:13, color:'var(--ink)', marginBottom:4}}>{t}</div>
                  <div style={{fontSize:12, color:'var(--ink-3)', lineHeight:1.5}}>{d}</div>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT — mission card */}
          <div className="reveal reveal-d1" style={{
            background:'var(--ink)', color:'var(--bone)',
            padding:'44px 36px', borderRadius:28,
            position:'relative', overflow:'hidden',
            display:'flex', flexDirection:'column', justifyContent:'space-between',
          }}>
            <div style={{position:'absolute', top:-60, right:-60, width:260, height:260, borderRadius:'50%', background:'var(--accent)', opacity:.12, filter:'blur(80px)'}}/>
            <div style={{position:'absolute', bottom:-80, left:-40, width:200, height:200, borderRadius:'50%', background:'var(--accent)', opacity:.08, filter:'blur(60px)'}}/>

            <div style={{position:'relative'}}>
              <span style={{...window.labelStyle, color:'rgba(240,246,232,.5)', marginBottom:20, display:'inline-flex'}}>Our mission</span>
              <h3 style={{
                fontFamily:'var(--serif)', fontStyle:'italic', fontWeight:300,
                fontSize:'clamp(28px, 3.5vw, 44px)', letterSpacing:'-.02em', lineHeight:1.1,
                color:'var(--bone)', marginTop:14,
              }}>
                Every creator deserves to be <span style={{color:'var(--accent)'}}>seen.</span>
              </h3>
              <p style={{marginTop:20, fontSize:15, lineHeight:1.7, color:'rgba(240,246,232,.65)'}}>
                Too much good content disappears into the algorithm, not because it's bad — but because it never got the initial push it needed. We exist to fix that.
              </p>
            </div>

            <div style={{position:'relative', marginTop:36}}>
              <div style={{display:'flex', flexDirection:'column', gap:12}}>
                {[
                  ['📸','Instagram promotion','Reels, posts, profile growth'],
                  ['▶️','YouTube promotion','Views, subscribers, channel reach'],
                  ['🌐','Both platforms','Combined visibility campaigns'],
                ].map(([ic,t,d]) => (
                  <div key={t} style={{display:'flex', gap:14, alignItems:'center', padding:'12px 14px', background:'rgba(240,246,232,.05)', borderRadius:12, border:'1px solid rgba(240,246,232,.08)'}}>
                    <span style={{fontSize:18, flexShrink:0}}>{ic}</span>
                    <div>
                      <div style={{fontSize:13, fontWeight:600, color:'var(--bone)'}}>{t}</div>
                      <div style={{fontSize:11, color:'rgba(240,246,232,.45)', fontFamily:'var(--mono)'}}>{d}</div>
                    </div>
                  </div>
                ))}
              </div>

              <button onClick={() => window.openAuditModal && window.openAuditModal()} style={{
                marginTop:24, width:'100%', background:'var(--accent)', color:'#fff', border:'none',
                padding:'14px', borderRadius:999, fontSize:14, fontWeight:700, cursor:'pointer',
                transition:'opacity .2s',
              }}
              onMouseEnter={e => e.currentTarget.style.opacity='.85'}
              onMouseLeave={e => e.currentTarget.style.opacity='1'}>
                Get a free audit →
              </button>
            </div>
          </div>

        </div>
      </div>
      <style>{`@media(max-width:900px){.about-grid{grid-template-columns:1fr !important;gap:40px}}`}</style>
    </window.Section>
  );
};
window.About = About;
