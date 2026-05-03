// FOOTER — with live clock + particle canvas
const Footer = () => {
  const dir = window.useDir();
  const { time, date } = window.useClock ? window.useClock() : { time: '—', date: '—' };

  // Footer particle canvas
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
        particles.push({
          x: Math.random() * W, y: Math.random() * H,
          r: .5 + Math.random() * 1.5,
          vx: (Math.random() - .5) * .3, vy: -.1 - Math.random() * .4,
          a: .1 + Math.random() * .4, phase: Math.random() * Math.PI * 2,
        });
      }
    };

    let t3 = 0;
    const draw = () => {
      t3++;
      ctx.clearRect(0, 0, W, H);
      for (const p of particles) {
        p.x += p.vx; p.y += p.vy;
        if (p.y < -10) { p.y = H + 10; p.x = Math.random() * W; }
        if (p.x < 0) p.x = W; if (p.x > W) p.x = 0;
        const alpha = p.a * (.5 + .5 * Math.sin(t3 * .02 + p.phase));
        ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(74,222,128,${alpha.toFixed(2)})`; ctx.fill();
      }
      animId = requestAnimationFrame(draw);
    };

    setSize(); draw();
    window.addEventListener('resize', setSize, { passive: true });
    return () => { cancelAnimationFrame(animId); window.removeEventListener('resize', setSize); };
  }, []);

  return (
    <footer className="site" style={{ background: '#0c190c', position: 'relative', overflow: 'hidden', borderTop: '1px solid var(--line)' }}>
      {/* Particle canvas */}
      <canvas id="footer-canvas" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 0, opacity: .6 }}/>
      {/* Top glow line */}
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 1, background: 'linear-gradient(90deg,transparent 0%,rgba(45,122,58,.5) 30%,rgba(74,222,128,.7) 50%,rgba(45,122,58,.5) 70%,transparent 100%)', zIndex: 2 }}/>

      <div className="wrap" style={{ position: 'relative', zIndex: 2 }}>
        {/* Mega wordmark */}
        <div className="foot-mega" style={{
          fontFamily: dir === 'editorial' ? 'var(--serif)' : 'var(--sans)',
          fontStyle: dir === 'editorial' ? 'italic' : 'normal',
          fontWeight: dir === 'editorial' ? 400 : 800,
          textTransform: dir === 'kinetic' ? 'uppercase' : 'none',
        }}>
          {dir === 'editorial' && <>Let's grow<br/>something <span style={{ color: 'var(--accent)', fontStyle: 'italic' }}>worth growing.</span></>}
          {dir === 'kinetic' && <>Big channel.<br/><span style={{ color: 'var(--accent)' }}>Bigger plan.</span></>}
          {dir === 'grid' && <>Run an audit.<br/>Engineer the <span style={{ color: 'var(--accent)' }}>compound.</span></>}
        </div>

        {/* 4-col grid */}
        <div className="foot-grid">
          {/* Brand */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
              <span className="brand-mark" style={{ display: 'inline-block' }}/>
              <span style={{ fontWeight: 800, letterSpacing: '-.02em', fontSize: 20, color: '#fff' }}>
                INFLORAX
                <span style={{ fontFamily: 'var(--mono)', fontSize: 9, color: 'rgba(255,255,255,.4)', verticalAlign: 'super', marginLeft: 3 }}>®</span>
              </span>
            </div>
            <p style={{ fontSize: 13, color: 'rgba(255,255,255,.55)', maxWidth: 280, lineHeight: 1.6 }}>
              Strategic content promotion for Instagram &amp; YouTube creators ready to break through.
            </p>
            <div style={{ marginTop: 16, display: 'flex', flexDirection: 'column', gap: 6 }}>
              {['No passwords required', 'Secure payments via Stripe', 'Results vary by account'].map(t => (
                <div key={t} style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 12, color: 'rgba(255,255,255,.4)' }}>
                  <span style={{ color: 'rgba(74,222,128,.7)', fontWeight: 700 }}>✓</span> {t}
                </div>
              ))}
            </div>
            <div style={{ marginTop: 16, display: 'flex', alignItems: 'center', gap: 8 }}>
              <span style={{ width: 7, height: 7, borderRadius: '50%', background: '#22c55e' }}/>
              <span style={{ fontSize: 11, fontFamily: 'var(--mono)', color: 'rgba(255,255,255,.6)', letterSpacing: '.06em', textTransform: 'uppercase' }}>Accepting creators</span>
            </div>
          </div>

          {/* Navigate */}
          <div>
            <div className="foot-h">Navigate</div>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 10 }}>
              {[['#process','How it works'],['#pricing','Packages'],['#faq','FAQ'],['#about','About'],['#honest','Transparency']].map(([h,l]) => (
                <li key={l}><a href={h} className="foot-link" style={{ fontSize:13, color:'rgba(245,236,217,.55)', transition:'color .2s', textDecoration:'none' }} onMouseEnter={e=>e.target.style.color='var(--accent)'} onMouseLeave={e=>e.target.style.color='rgba(245,236,217,.55)'}>{l}</a></li>
              ))}
            </ul>
          </div>

          {/* Get Started */}
          <div>
            <div className="foot-h" style={{ color: 'rgba(74,222,128,.7)' }}>Get Started</div>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 10 }}>
              {[['#audit','Free audit ↗'],['#pricing','Instagram plans'],['#pricing','YouTube plans'],['#','Terms of service'],['#','Privacy policy']].map(([h,l]) => (
                <li key={l}><a href={h} style={{ fontSize:13, color:'rgba(245,236,217,.55)', transition:'color .2s', textDecoration:'none' }} onMouseEnter={e=>e.target.style.color='var(--accent)'} onMouseLeave={e=>e.target.style.color='rgba(245,236,217,.55)'}>{l}</a></li>
              ))}
            </ul>
          </div>

          {/* Local time */}
          <div>
            <div className="foot-h">Local Time</div>
            <div style={{ fontFamily: 'var(--mono)', fontSize: 22, fontWeight: 500, color: '#fff', letterSpacing: '.04em', lineHeight: 1.2 }}>{time}</div>
            <div style={{ fontFamily: 'var(--mono)', fontSize: 12, color: 'rgba(255,255,255,.4)', marginTop: 4, letterSpacing: '.06em' }}>{date}</div>
            <div style={{ marginTop: 16, fontSize: 12, color: 'rgba(255,255,255,.4)', lineHeight: 1.5 }}>
              Creator Growth Agency<br/>Instagram &amp; YouTube
            </div>
            <div style={{ marginTop: 12, display: 'flex', alignItems: 'center', gap: 6 }}>
              <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#22c55e', animation: 'footPulse 2.5s ease-in-out infinite' }}/>
              <span style={{ fontFamily: 'var(--mono)', fontSize: 9, letterSpacing: '.1em', textTransform: 'uppercase', color: 'rgba(255,255,255,.35)' }}>Live</span>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="foot-bottom">
          <span>© {new Date().getFullYear()} Inflorax. All rights reserved.</span>
          <span>Results depend on content quality, posting consistency &amp; niche.</span>
        </div>
      </div>

      <style>{`
        @keyframes footPulse{0%,100%{opacity:.4}50%{opacity:1}}
      `}</style>
    </footer>
  );
};
window.Footer = Footer;
