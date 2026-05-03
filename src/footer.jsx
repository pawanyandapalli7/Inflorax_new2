// FOOTER
const Footer = () => {
  const dir = window.useDir();
  return (
    <footer className="site">
      <div className="wrap">
        <div className="foot-mega" style={{
          fontFamily: dir==='editorial' ? 'var(--serif)' : 'var(--sans)',
          fontStyle: dir==='editorial' ? 'italic' : 'normal',
          fontWeight: dir==='editorial' ? 400 : 800,
          textTransform: dir==='kinetic' ? 'uppercase' : 'none',
        }}>
          {dir==='editorial' && <>Let's grow<br/>something <span style={{color:'var(--accent)', fontStyle:'italic'}}>worth growing.</span></>}
          {dir==='kinetic'   && <>Big channel.<br/><span style={{color:'var(--accent)'}}>Bigger plan.</span></>}
          {dir==='grid'      && <>Run an audit.<br/>Engineer the <span style={{color:'var(--accent)'}}>compound.</span></>}
        </div>
        <div className="foot-grid">
          <div>
            <div style={{display:'flex', alignItems:'center', gap:10, marginBottom:18}}>
              <span className="brand-mark" style={{display:'inline-block'}}/>
              <span style={{fontWeight:800, letterSpacing:'-.02em', fontSize:20, color:'#fff'}}>Inflorax<span style={{fontFamily:'var(--mono)', fontSize:10, color:'rgba(255,255,255,.5)', verticalAlign:'super', marginLeft:4}}>®</span></span>
            </div>
            <p style={{fontSize:14, color:'rgba(255,255,255,.6)', maxWidth:340, lineHeight:1.55}}>A small studio engineering creator growth, since 2021. Brooklyn · Lisbon · remote.</p>
            <div style={{marginTop:20, display:'flex', gap:8, alignItems:'center'}}>
              <span style={{width:8, height:8, borderRadius:'50%', background:'#22c55e'}}/>
              <span style={{fontSize:12, fontFamily:'var(--mono)', color:'rgba(255,255,255,.7)', letterSpacing:'.08em', textTransform:'uppercase'}}>Booking Q3 · 4 of 8 slots open</span>
            </div>
          </div>
          <div>
            <div className="foot-h">Studio</div>
            <ul>
              <li><a href="#work">Work</a></li>
              <li><a href="#process">Process</a></li>
              <li><a href="#pricing">Pricing</a></li>
              <li><a href="#about">About</a></li>
              <li><a href="#faq">FAQ</a></li>
            </ul>
          </div>
          <div>
            <div className="foot-h">Practices</div>
            <ul>
              <li><a href="#services">Strategy</a></li>
              <li><a href="#services">Scripts & Hooks</a></li>
              <li><a href="#services">Edits & Production</a></li>
              <li><a href="#services">Distribution</a></li>
              <li><a href="#services">Analytics</a></li>
            </ul>
          </div>
          <div>
            <div className="foot-h">Connect</div>
            <ul>
              <li><a href="mailto:hello@inflorax.studio">hello@inflorax.studio</a></li>
              <li><a href="#audit">Free audit ↗</a></li>
              <li><a href="#">Instagram ↗</a></li>
              <li><a href="#">YouTube ↗</a></li>
              <li><a href="#">Newsletter ↗</a></li>
            </ul>
          </div>
        </div>
        <div className="foot-bottom">
          <span>© 2026 Inflorax Studio LLC · All rights reserved</span>
          <span>Brooklyn 11201 · Lisbon 1200</span>
        </div>
      </div>
    </footer>
  );
};
window.Footer = Footer;
