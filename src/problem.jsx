// PROBLEM — "The stage no one talks about" — left/right
const Problem = () => {
  const dir = window.useDir();
  return (
    <window.Section id="problem" padded>
      <div className="wrap">
        <header style={{textAlign:'center', marginBottom:80, maxWidth:880, margin:'0 auto 80px'}}>
          <span className="reveal" style={window.labelStyle}>Where most creators get stuck</span>
          <h2 className="reveal reveal-d1" style={{...window.bigHeadStyle(dir), fontSize:'clamp(40px, 6.5vw, 96px)', marginTop:18}}>
            {dir==='editorial' && <>The stage no one<br/>talks about… <window.Em>but everyone<br/>goes through.</window.Em></>}
            {dir==='kinetic'   && <>The stage<br/>no one <window.Em>talks about.</window.Em></>}
            {dir==='grid'      && <>The stage no one<br/>talks about. <window.Em>Everyone goes through it.</window.Em></>}
          </h2>
        </header>

        <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:48}} className="prob-grid">
          {/* LEFT */}
          <div className="reveal" style={{background:'#fff', border:'1px solid var(--line)', borderRadius:dir==='grid' ? 0 : 24, padding:'40px 36px'}}>
            <span style={{...window.labelStyle, marginBottom:24, display:'inline-flex'}}>The feeling</span>
            <ul style={{listStyle:'none', display:'flex', flexDirection:'column', gap:14, fontSize:17, lineHeight:1.55, color:'var(--ink-2)', marginTop:14}}>
              <li>You post regularly.</li>
              <li>You try different types of videos.</li>
              <li>You put effort into your content.</li>
            </ul>
            <p style={{marginTop:28, fontSize:20, lineHeight:1.4, color:'var(--ink)', fontFamily:dir==='editorial'?'var(--serif)':'var(--sans)', fontStyle:dir==='editorial'?'italic':'normal', fontWeight:dir==='editorial'?500:600}}>
              But nothing changes. Your videos don't reach people. Your likes stay low. Your growth feels stuck.
            </p>
            <div style={{marginTop:32, padding:'20px 22px', background:'var(--soft)', borderRadius:14}}>
              <div style={{fontSize:13, fontFamily:'var(--mono)', color:'var(--ink-3)', textTransform:'uppercase', letterSpacing:'.1em', marginBottom:12}}>And slowly you start thinking…</div>
              <div style={{display:'flex', flexDirection:'column', gap:10, fontSize:15, color:'var(--ink-2)'}}>
                <span style={{paddingLeft:14, borderLeft:'2px solid var(--accent)'}}>"Maybe my content is not good enough."</span>
                <span style={{paddingLeft:14, borderLeft:'2px solid var(--accent)'}}>"Do I need a better phone?"</span>
                <span style={{paddingLeft:14, borderLeft:'2px solid var(--accent)'}}>"Am I doing something wrong?"</span>
              </div>
            </div>
            <p style={{marginTop:24, fontSize:14, color:'var(--ink-3)'}}>👉 This is the stage where most people give up.</p>
          </div>

          {/* RIGHT */}
          <div className="reveal reveal-d2" style={{background:'var(--ink)', color:'var(--bone)', borderRadius:dir==='grid' ? 0 : 24, padding:'40px 36px', position:'relative', overflow:'hidden'}}>
            <div style={{position:'absolute', top:-60, right:-60, width:240, height:240, borderRadius:'50%', background:'var(--accent)', opacity:.15, filter:'blur(60px)'}}/>
            <span style={{...window.labelStyle, color:'rgba(255,255,255,.6)', marginBottom:24, display:'inline-flex'}}>The truth</span>
            <h3 style={{fontFamily:dir==='editorial'?'var(--serif)':'var(--sans)', fontStyle:dir==='editorial'?'italic':'normal', fontWeight:dir==='editorial'?400:800, fontSize:'clamp(32px, 4vw, 56px)', letterSpacing:'-.03em', lineHeight:1, marginTop:14, position:'relative'}}>
              It's not your content.
            </h3>
            <p style={{marginTop:28, fontSize:17, lineHeight:1.55, color:'rgba(255,255,255,.85)', position:'relative'}}>
              Most creators don't fail because their content is bad. They fail because their content is <i style={{color:'var(--accent)'}}>not being seen</i>.
            </p>
            <p style={{marginTop:18, fontSize:15, lineHeight:1.55, color:'rgba(255,255,255,.7)', position:'relative'}}>
              In the early stage, even good content gets ignored. Platforms don't automatically push new creators.
            </p>
            <div style={{marginTop:32, padding:'24px 22px', background:'rgba(255,255,255,.06)', borderRadius:14, border:'1px solid rgba(255,255,255,.1)', position:'relative'}}>
              <div style={{fontSize:14, color:'rgba(255,255,255,.7)', marginBottom:8}}>That's not your fault.</div>
              <div style={{fontSize:22, fontWeight:700, color:'var(--accent)', fontFamily:dir==='editorial'?'var(--serif)':'var(--sans)', fontStyle:dir==='editorial'?'italic':'normal'}}>👉 It's a visibility problem.</div>
            </div>
            <p style={{marginTop:24, fontSize:14, color:'rgba(255,255,255,.6)', position:'relative'}}>And that's exactly where we help you.</p>
          </div>
        </div>
        <p className="reveal" style={{textAlign:'center', marginTop:40, fontSize:15, color:'var(--ink-3)'}}>👉 You're not alone. This is where most creators get stuck.</p>
        <style>{`@media (max-width:900px){ .prob-grid{grid-template-columns:1fr !important; gap:24px} }`}</style>
      </div>
    </window.Section>
  );
};
window.Problem = Problem;
