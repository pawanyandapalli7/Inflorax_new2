// FOOTER — fixed email link, social hrefs, particle canvas
const Footer = () => {
  const dir = window.useDir();

  useEffect(() => {
    const cv = document.getElementById('footer-canvas');
    if (!cv) return;
    const ctx = cv.getContext('2d');
    let W, H, particles = [], animId;
    const setSize = () => {
      const parent = cv.parentElement;
      W = cv.width = parent.offsetWidth;
      H = cv.height = parent.offsetHeight;
      particles = [];
      const count = Math.floor(W * H / 8000);
      for (let i = 0; i < count; i++) {
        particles.push({x:Math.random()*W,y:Math.random()*H,r:.5+Math.random()*1.5,vx:(Math.random()-.5)*.3,vy:-.1-Math.random()*.4,a:.1+Math.random()*.4,phase:Math.random()*Math.PI*2});
      }
    };
    let t3 = 0;
    const draw = () => {
      t3++;
      ctx.clearRect(0,0,W,H);
      for (const p of particles) {
        p.x+=p.vx; p.y+=p.vy;
        if(p.y<-10){p.y=H+10;p.x=Math.random()*W;}
        if(p.x<0)p.x=W; if(p.x>W)p.x=0;
        const alpha=p.a*(.5+.5*Math.sin(t3*.02+p.phase));
        ctx.beginPath();ctx.arc(p.x,p.y,p.r,0,Math.PI*2);
        ctx.fillStyle=`rgba(74,222,128,${alpha.toFixed(2)})`;ctx.fill();
      }
      animId=requestAnimationFrame(draw);
    };
    setSize(); draw();
    window.addEventListener('resize',setSize,{passive:true});
    return ()=>{cancelAnimationFrame(animId);window.removeEventListener('resize',setSize);};
  }, []);

  return (
    <footer className="site" style={{background:'#0c190c',position:'relative',overflow:'hidden',borderTop:'1px solid var(--line)'}}>
      <canvas id="footer-canvas" style={{position:'absolute',inset:0,width:'100%',height:'100%',pointerEvents:'none',zIndex:0,opacity:.6}}/>
      <div style={{position:'absolute',top:0,left:0,right:0,height:1,background:'linear-gradient(90deg,transparent 0%,rgba(45,122,58,.5) 30%,rgba(74,222,128,.7) 50%,rgba(45,122,58,.5) 70%,transparent 100%)',zIndex:2}}/>

      <div className="wrap" style={{position:'relative',zIndex:2}}>
        {/* Mega wordmark */}
        <div className="foot-mega">
          Your content<br/>deserves to be <span style={{color:'var(--accent)'}}>seen.</span>
        </div>

        <div className="foot-grid">
          {/* Brand */}
          <div>
            <div style={{display:'flex',alignItems:'center',gap:10,marginBottom:16}}>
              <span className="brand-mark" style={{display:'inline-block'}}/>
              <span style={{fontWeight:800,letterSpacing:'-.02em',fontSize:20,color:'#fff'}}>
                INFLORAX<span style={{fontFamily:'var(--mono)',fontSize:9,color:'rgba(255,255,255,.4)',verticalAlign:'super',marginLeft:3}}>®</span>
              </span>
            </div>
            <p style={{fontSize:13,color:'rgba(255,255,255,.55)',maxWidth:280,lineHeight:1.6}}>
              Strategic content promotion for Instagram &amp; YouTube creators ready to break through.
            </p>
            <div style={{marginTop:16,display:'flex',flexDirection:'column',gap:6}}>
              {['No passwords required','Secure payments via Stripe','Results vary by account'].map(t=>(
                <div key={t} style={{display:'flex',alignItems:'center',gap:8,fontSize:12,color:'rgba(255,255,255,.4)'}}>
                  <span style={{color:'rgba(74,222,128,.7)',fontWeight:700}}>✓</span> {t}
                </div>
              ))}
            </div>
            <div style={{marginTop:16,display:'flex',alignItems:'center',gap:8}}>
              <span style={{width:7,height:7,borderRadius:'50%',background:'#22c55e'}}/>
              <span style={{fontSize:11,fontFamily:'var(--mono)',color:'rgba(255,255,255,.6)',letterSpacing:'.06em',textTransform:'uppercase'}}>Accepting creators</span>
            </div>
          </div>

          {/* Navigate */}
          <div>
            <div className="foot-h">Navigate</div>
            <ul style={{listStyle:'none',display:'flex',flexDirection:'column',gap:10}}>
              {[['process','How it works'],['pricing','Packages'],['showcase','Niches'],['faq','FAQ'],['about','About']].map(([h,l])=>(
                <li key={l}>
                  <a href="#" onClick={e=>{e.preventDefault();window.scrollToSection&&window.scrollToSection(h);}}
                    style={{fontSize:13,color:'rgba(240,246,232,.55)',transition:'color .2s',textDecoration:'none'}}
                    onMouseEnter={e=>e.target.style.color='var(--accent)'}
                    onMouseLeave={e=>e.target.style.color='rgba(240,246,232,.55)'}>{l}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Get Started */}
          <div>
            <div className="foot-h" style={{color:'rgba(74,222,128,.7)'}}>Get Started</div>
            <ul style={{listStyle:'none',display:'flex',flexDirection:'column',gap:10}}>
              {[['audit','Free audit →'],['pricing','Instagram plans'],['pricing','YouTube plans']].map(([h,l])=>(
                <li key={l}>
                  <a href="#" onClick={e=>{e.preventDefault();window.scrollToSection&&window.scrollToSection(h);}}
                    style={{fontSize:13,color:'rgba(240,246,232,.55)',transition:'color .2s',textDecoration:'none'}}
                    onMouseEnter={e=>e.target.style.color='var(--accent)'}
                    onMouseLeave={e=>e.target.style.color='rgba(240,246,232,.55)'}>{l}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Connect */}
          <div>
            <div className="foot-h">Connect</div>
            <ul style={{listStyle:'none',display:'flex',flexDirection:'column',gap:10}}>
              {/* FIXED: proper mailto href, no scrollToSection */}
              <li>
                <a href="mailto:info@inflorax.com"
                  style={{fontSize:13,color:'rgba(240,246,232,.55)',transition:'color .2s',textDecoration:'none'}}
                  onMouseEnter={e=>e.target.style.color='var(--accent)'}
                  onMouseLeave={e=>e.target.style.color='rgba(240,246,232,.55)'}>
                  info@inflorax.com
                </a>
              </li>
              <li>
                <a href="#" onClick={e=>{e.preventDefault();window.scrollToSection&&window.scrollToSection('audit');}}
                  style={{fontSize:13,color:'rgba(240,246,232,.55)',transition:'color .2s',textDecoration:'none'}}
                  onMouseEnter={e=>e.target.style.color='var(--accent)'}
                  onMouseLeave={e=>e.target.style.color='rgba(240,246,232,.55)'}>
                  Free audit →
                </a>
              </li>
            </ul>

            {/* FIXED: Social icons with real placeholder URLs — update with actual URLs */}
            <div style={{marginTop:20,display:'flex',gap:10}}>
              {[
                {label:'Instagram', href:'https://instagram.com/inflorax', icon:(
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
                  </svg>
                )},
                {label:'X / Twitter', href:'https://x.com/inflorax', icon:(
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                  </svg>
                )},
                {label:'YouTube', href:'https://youtube.com/@inflorax', icon:(
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46a2.78 2.78 0 0 0-1.95 1.96A29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58A2.78 2.78 0 0 0 3.41 19.6C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.95A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z"/><polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02"/>
                  </svg>
                )},
              ].map(({label,href,icon})=>(
                <a key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={label} style={{
                  width:36,height:36,borderRadius:'50%',
                  border:'1px solid rgba(240,246,232,.15)',
                  display:'flex',alignItems:'center',justifyContent:'center',
                  color:'rgba(240,246,232,.45)',
                  transition:'color .2s,border-color .2s,background .2s',
                  textDecoration:'none',
                }}
                onMouseEnter={e=>{e.currentTarget.style.color='var(--accent)';e.currentTarget.style.borderColor='var(--accent)';e.currentTarget.style.background='rgba(22,101,52,.12)';}}
                onMouseLeave={e=>{e.currentTarget.style.color='rgba(240,246,232,.45)';e.currentTarget.style.borderColor='rgba(240,246,232,.15)';e.currentTarget.style.background='transparent';}}>
                  {icon}
                </a>
              ))}
            </div>

            <div style={{marginTop:16,display:'flex',alignItems:'center',gap:8}}>
              <span style={{width:7,height:7,borderRadius:'50%',background:'#22c55e'}}/>
              <span style={{fontFamily:'var(--mono)',fontSize:9,letterSpacing:'.08em',textTransform:'uppercase',color:'rgba(255,255,255,.45)'}}>Accepting creators</span>
            </div>
          </div>
        </div>

        <div className="foot-bottom">
          <span>© {new Date().getFullYear()} Inflorax. All rights reserved.</span>
          <div style={{display:'flex', gap:20, flexWrap:'wrap', alignItems:'center'}}>
            <button onClick={()=>window.openTerms&&window.openTerms()} style={{
              background:'none', border:'none', cursor:'pointer', padding:0,
              fontSize:11, fontFamily:'var(--mono)', textTransform:'uppercase',
              letterSpacing:'.1em', color:'rgba(245,236,217,.35)',
              transition:'color .2s',
            }}
            onMouseEnter={e=>e.currentTarget.style.color='var(--accent)'}
            onMouseLeave={e=>e.currentTarget.style.color='rgba(245,236,217,.35)'}>
              Terms &amp; Conditions
            </button>
            <button onClick={()=>window.openPrivacy&&window.openPrivacy()} style={{
              background:'none', border:'none', cursor:'pointer', padding:0,
              fontSize:11, fontFamily:'var(--mono)', textTransform:'uppercase',
              letterSpacing:'.1em', color:'rgba(245,236,217,.35)',
              transition:'color .2s',
            }}
            onMouseEnter={e=>e.currentTarget.style.color='var(--accent)'}
            onMouseLeave={e=>e.currentTarget.style.color='rgba(245,236,217,.35)'}>
              Privacy Policy
            </button>
            <span>Results vary by account</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
window.Footer = Footer;
