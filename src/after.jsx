// AFTER — what happens after you pay (4-step timeline)
const After = () => {
  const dir = window.useDir();
  const steps = [
    { num:'01', eyebrow:'PAYMENT', icon:'🔒', light:true,
      title:'Secure checkout via Stripe',
      body:'Pay safely through Stripe — the world\'s most trusted payment platform. A confirmation email with your onboarding link lands in your inbox immediately.',
      tag:'● INSTANT CONFIRMATION' },
    { num:'02', eyebrow:'ONBOARDING', icon:'📋', light:false,
      title:'Complete a short brief',
      body:"A focused 3–5 minute form about your content, niche, and goals. We never ask for your password — your account security is completely non-negotiable.",
      tag:'● NO PASSWORDS. EVER.' },
    { num:'03', eyebrow:'ACTIVATION', icon:'🚀', light:true,
      title:'Your campaign launches',
      body:'We get to work within 24–72 hours of receiving your brief. Early signals in reach and visibility often appear within the first few days.',
      tag:'● STARTS IN 24–72H' },
    { num:'04', eyebrow:'COMPLETION', icon:'📊', light:false,
      title:'Full summary delivered',
      body:"When your package completes, we send a detailed wrap-up covering everything done and concrete next steps to maintain momentum independently.",
      tag:'● FULL REPORT INCLUDED' },
  ];

  return (
    <window.Section id="after" padded>
      <div className="wrap">
        <div style={{display:'grid', gridTemplateColumns:'1fr 1.1fr', gap:64, alignItems:'start'}} className="after-grid">
          {/* LEFT */}
          <div>
            <span className="reveal" style={window.labelStyle}>After you pay</span>
            <h2 className="wreveal" style={{...window.bigHeadStyle(), fontSize:'clamp(40px, 6vw, 88px)', marginTop:14}}>
              Here's exactly<br/><window.Em>what happens.</window.Em>
            </h2>
            <div className="reveal reveal-d1" style={{display:'flex', gap:12, flexWrap:'wrap', marginTop:12, marginBottom:28}}>
              {['4 Steps','No Surprises','Full Transparency'].map(t => (
                <span key={t} style={{fontFamily:'var(--mono)', fontSize:9, letterSpacing:'.12em', textTransform:'uppercase', color:'var(--ink-3)', padding:'4px 10px', border:'1px solid var(--line)', borderRadius:999}}>{t}</span>
              ))}
            </div>
            <p className="reveal reveal-d2" style={{fontSize:16, lineHeight:1.6, color:'var(--ink-2)', maxWidth:460}}>
              From secure checkout to campaign launch — here's exactly what to expect.
            </p>

            <div className="reveal reveal-d3" style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:14, marginTop:32}}>
              {[
                ['🛡️','Secure & Safe','Your data is always protected.'],
                ['⚡','Fast & Efficient','We move quickly.'],
                ['✅','No Hidden Steps','Full transparency throughout.'],
                ['💬','Human Support','Our team is with you.'],
              ].map(([ic,t,d]) => (
                <div key={t} style={{display:'flex', gap:12, alignItems:'flex-start', padding:'14px', background:'var(--soft)', borderRadius:12}}>
                  <span style={{fontSize:18}}>{ic}</span>
                  <div>
                    <div style={{fontWeight:700, fontSize:13, color:'var(--ink)', marginBottom:3}}>{t}</div>
                    <div style={{fontSize:12, color:'var(--ink-3)', lineHeight:1.4}}>{d}</div>
                  </div>
                </div>
              ))}
            </div>

            <div className="reveal reveal-d4" style={{
              marginTop:28, padding:'20px 22px',
              background:'var(--ink)', color:'var(--bone)',
              borderRadius: dir==='grid' ? 0 : 18,
              display:'flex', gap:14, alignItems:'center',
            }}>
              <span style={{fontSize:26}}>🎁</span>
              <div style={{flex:1}}>
                <div style={{fontWeight:700, fontSize:14, marginBottom:4}}>You're in good hands. <span style={{color:'var(--accent)', fontStyle:'italic', fontFamily:'var(--serif)'}}>Let's grow.</span></div>
                <div style={{fontSize:12, color:'rgba(240,246,232,.6)', lineHeight:1.5}}>Once you complete checkout, we'll take it from there and keep you updated every step.</div>
              </div>
              <button onClick={() => window.openAuditModal && window.openAuditModal()} style={{
                background:'var(--accent)', color:'#fff', border:'none',
                padding:'10px 18px', borderRadius:999, fontSize:12, fontWeight:700, cursor:'pointer', whiteSpace:'nowrap',
              }}>Free Audit →</button>
            </div>
          </div>

          {/* RIGHT — Timeline */}
          <div className="reveal" style={{display:'flex', flexDirection:'column', gap:0}}>
            {steps.map((s, i) => (
              <div key={i} style={{display:'flex', gap:20, alignItems:'stretch'}}>
                {/* Number + line */}
                <div style={{display:'flex', flexDirection:'column', alignItems:'center'}}>
                  <div style={{
                    width:44, height:44, borderRadius:'50%', flexShrink:0,
                    background: s.light ? 'transparent' : 'var(--ink)',
                    border:'2px solid', borderColor: s.light ? 'var(--line)' : 'var(--ink)',
                    display:'flex', alignItems:'center', justifyContent:'center',
                    fontFamily:'var(--mono)', fontSize:11, fontWeight:700,
                    color: s.light ? 'var(--ink-2)' : 'var(--bone)',
                  }}>{s.num}</div>
                  {i < steps.length - 1 && (
                    <div style={{width:1, flex:1, background:'var(--line)', margin:'8px 0', minHeight:24}}/>
                  )}
                </div>
                {/* Card */}
                <div style={{
                  flex:1, padding:'18px 20px', marginBottom:12,
                  background: s.light ? 'var(--soft)' : 'var(--ink)',
                  color: s.light ? 'var(--ink)' : 'var(--bone)',
                  borderRadius: dir==='grid' ? 0 : 16,
                  border:'1px solid', borderColor: s.light ? 'var(--line)' : 'transparent',
                }}>
                  <div style={{fontFamily:'var(--mono)', fontSize:9, letterSpacing:'.12em', textTransform:'uppercase', color: s.light ? 'var(--ink-3)' : 'rgba(80,200,95,.6)', marginBottom:8}}>{s.eyebrow}</div>
                  <div style={{fontSize:18, marginBottom:6}}>{s.icon}</div>
                  <div style={{fontWeight:700, fontSize:16, letterSpacing:'-.01em', marginBottom:8}}>{s.title}</div>
                  <p style={{fontSize:13, lineHeight:1.6, color: s.light ? 'var(--ink-2)' : 'rgba(240,246,232,.65)', marginBottom:10}}>{s.body}</p>
                  <div style={{fontFamily:'var(--mono)', fontSize:9, letterSpacing:'.1em', textTransform:'uppercase', color:'var(--accent)', fontWeight:700}}>{s.tag}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <style>{`@media(max-width:900px){.after-grid{grid-template-columns:1fr !important; gap:40px}}`}</style>
    </window.Section>
  );
};
window.After = After;
