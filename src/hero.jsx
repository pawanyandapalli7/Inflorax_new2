// HERO — 3D mobile-first with kinetic orb, parallax tilt, floating cards
const Hero = () => {
  const ref = useRef(null);
  const m = window.useMouse(ref);
  const y = window.useScrollY();
  const [gyro, setGyro] = useState({x:0, y:0});
  const [gyroEnabled, setGyroEnabled] = useState(false);
  const [glowPos, setGlowPos] = useState({x:50, y:50});
  const [typed, setTyped] = useState('');
  const [cardPhase, setCardPhase] = useState(0);
  const words = ['no one is seeing it.', 'nothing is happening.', 'the algorithm ignores you.'];
  const fullWord = words[cardPhase % words.length];

  // Typewriter effect
  useEffect(() => {
    let i = 0;
    setTyped('');
    const interval = setInterval(() => {
      setTyped(fullWord.slice(0, i + 1));
      i++;
      if (i >= fullWord.length) {
        clearInterval(interval);
        setTimeout(() => setCardPhase(p => p + 1), 2200);
      }
    }, 52);
    return () => clearInterval(interval);
  }, [cardPhase]);

  // Device gyroscope for mobile tilt
  useEffect(() => {
    const handleMotion = (e) => {
      if (!e.rotationRate) return;
      setGyroEnabled(true);
      setGyro({
        x: Math.max(-15, Math.min(15, (e.rotationRate.beta || 0) * 0.3)),
        y: Math.max(-15, Math.min(15, (e.rotationRate.gamma || 0) * 0.3)),
      });
    };
    if (window.DeviceMotionEvent) {
      window.addEventListener('devicemotion', handleMotion, { passive: true });
    }
    return () => window.removeEventListener('devicemotion', handleMotion);
  }, []);

  // Glow follows pointer / touch
  useEffect(() => {
    const move = (e) => {
      const touch = e.touches?.[0] || e;
      const pct = {
        x: (touch.clientX / window.innerWidth) * 100,
        y: (touch.clientY / window.innerHeight) * 100,
      };
      setGlowPos(pct);
    };
    window.addEventListener('pointermove', move, { passive: true });
    window.addEventListener('touchmove', move, { passive: true });
    return () => { window.removeEventListener('pointermove', move); window.removeEventListener('touchmove', move); };
  }, []);

  // 3D tilt from mouse or gyro
  const tiltX = gyroEnabled ? gyro.x : (m.active ? (m.y - 0.5) * -14 : 0);
  const tiltY = gyroEnabled ? gyro.y : (m.active ? (m.x - 0.5) * 14 : 0);

  // Growth chart canvas
  useEffect(() => {
    const cv = document.getElementById('hero-chart-canvas');
    if (!cv) return;
    const ctx = cv.getContext('2d');
    cv.width = 400; cv.height = 200;
    const pts = [8, 10, 13, 18, 24, 34, 48, 66, 82, 95];
    const W = cv.width, H = cv.height;
    const pad = { t: 12, r: 12, b: 16, l: 28 };
    const gW = W - pad.l - pad.r, gH = H - pad.t - pad.b;
    const xStep = gW / (pts.length - 1);
    ctx.clearRect(0, 0, W, H);
    // Grid lines
    for (let i = 0; i <= 4; i++) {
      const y2 = pad.t + gH * (1 - i / 4);
      ctx.beginPath(); ctx.moveTo(pad.l, y2); ctx.lineTo(W - pad.r, y2);
      ctx.strokeStyle = 'rgba(22,101,52,.08)'; ctx.lineWidth = 1; ctx.stroke();
      ctx.fillStyle = 'rgba(22,101,52,.35)'; ctx.font = '8px monospace';
      ctx.fillText((i * 25) + '%', 2, y2 + 3);
    }
    // Area fill
    ctx.beginPath();
    ctx.moveTo(pad.l, pad.t + gH);
    pts.forEach((v, i) => ctx.lineTo(pad.l + i * xStep, pad.t + gH * (1 - v / 100)));
    ctx.lineTo(pad.l + (pts.length - 1) * xStep, pad.t + gH);
    ctx.closePath();
    const grad = ctx.createLinearGradient(0, pad.t, 0, pad.t + gH);
    grad.addColorStop(0, 'rgba(22,101,52,.25)'); grad.addColorStop(1, 'rgba(22,101,52,.02)');
    ctx.fillStyle = grad; ctx.fill();
    // Line
    ctx.beginPath();
    pts.forEach((v, i) => { const x2 = pad.l + i * xStep, y2 = pad.t + gH * (1 - v / 100); i === 0 ? ctx.moveTo(x2, y2) : ctx.lineTo(x2, y2); });
    ctx.strokeStyle = '#166534'; ctx.lineWidth = 2.5;
    ctx.shadowColor = 'rgba(22,101,52,.5)'; ctx.shadowBlur = 10; ctx.stroke(); ctx.shadowBlur = 0;
    // Dots
    pts.forEach((v, i) => {
      const x2 = pad.l + i * xStep, y2 = pad.t + gH * (1 - v / 100);
      ctx.beginPath(); ctx.arc(x2, y2, 3, 0, Math.PI * 2);
      ctx.fillStyle = '#166534'; ctx.shadowColor = 'rgba(22,101,52,.7)'; ctx.shadowBlur = 8;
      ctx.fill(); ctx.shadowBlur = 0;
    });
  }, []);

  // Dot grid canvas
  useEffect(() => {
    const cv = document.getElementById('hero-dot-canvas');
    const hero = ref.current;
    if (!cv || !hero) return;
    const ctx = cv.getContext('2d');
    let W, H, t2 = 0, particles = [];
    const mouse = { x: -999, y: -999, active: false };
    const SPACING = 48, RADIUS = 1.2, REPEL = 90, FORCE = 2800, SPRING = 0.09, DAMP = 0.68;
    const buildGrid = () => {
      particles = [];
      const cols = Math.ceil(W / SPACING) + 1, rows = Math.ceil(H / SPACING) + 1;
      const ox0 = (W - (cols - 1) * SPACING) / 2, oy0 = (H - (rows - 1) * SPACING) / 2;
      for (let r = 0; r < rows; r++) for (let c = 0; c < cols; c++) {
        const ox = ox0 + c * SPACING, oy = oy0 + r * SPACING;
        particles.push({ ox, oy, x: ox, y: oy, vx: 0, vy: 0, phase: Math.random() * Math.PI * 2 });
      }
    };
    const setSize = () => { W = cv.width = hero.offsetWidth; H = cv.height = hero.offsetHeight; buildGrid(); };
    let animId;
    const draw = () => {
      t2++;
      ctx.clearRect(0, 0, W, H);
      for (const p of particles) {
        const breath = Math.sin(t2 * 0.016 + p.phase) * 0.3;
        let ax = (p.ox - p.x) * SPRING, ay = (p.oy - p.y) * SPRING;
        if (mouse.active) {
          const dx = p.x - mouse.x, dy = p.y - mouse.y;
          const dist = Math.sqrt(dx * dx + dy * dy) || 0.1;
          if (dist < REPEL) {
            const t3 = dist / REPEL;
            const strength = FORCE * (1 - t3) * (1 - t3) / (dist + 8);
            ax += (dx / dist) * strength; ay += (dy / dist) * strength;
          }
        }
        p.vx = (p.vx + ax) * DAMP; p.vy = (p.vy + ay) * DAMP;
        p.x += p.vx; p.y += p.vy;
        const disp = Math.sqrt((p.x - p.ox) ** 2 + (p.y - p.oy) ** 2);
        const dispT = Math.min(1, disp / 24);
        const ddist = mouse.active ? Math.sqrt((p.x - mouse.x) ** 2 + (p.y - mouse.y) ** 2) : 9999;
        const prox = Math.max(0, 1 - ddist / REPEL);
        const r2 = RADIUS + breath * 0.3 + prox * 2.2 + dispT * 1.5;
        const blend = Math.max(prox, dispT * 0.5);
        const gC = Math.round(101 + blend * 55);
        const alpha = Math.min(0.7, (0.07 + breath * 0.015 + prox * 0.45 + dispT * 0.18)) * 0.35;
        ctx.beginPath(); ctx.arc(p.x, p.y, r2, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(22,${gC},52,${alpha.toFixed(2)})`; ctx.fill();
      }
      animId = requestAnimationFrame(draw);
    };
    hero.addEventListener('mousemove', e => {
      const r = cv.getBoundingClientRect();
      mouse.x = e.clientX - r.left; mouse.y = e.clientY - r.top; mouse.active = true;
    }, { passive: true });
    hero.addEventListener('touchmove', e => {
      const r = cv.getBoundingClientRect();
      const t = e.touches[0];
      mouse.x = t.clientX - r.left; mouse.y = t.clientY - r.top; mouse.active = true;
    }, { passive: true });
    hero.addEventListener('mouseleave', () => { mouse.active = false; });
    hero.addEventListener('touchend', () => { setTimeout(() => { mouse.active = false; }, 500); });
    setSize();
    window.addEventListener('resize', setSize, { passive: true });
    draw();
    return () => { cancelAnimationFrame(animId); window.removeEventListener('resize', setSize); };
  }, []);

  return (
    <section id="hero-section" data-screen-label="01 hero" ref={ref} style={{
      minHeight: '100svh', position: 'relative', overflow: 'hidden',
      paddingTop: 'calc(74px + clamp(10px,2.5vw,44px))',
      paddingBottom: 'clamp(32px,5vw,64px)',
      display: 'flex', flexDirection: 'column',
    }}>
      {/* Interactive dot-grid */}
      <canvas id="hero-dot-canvas" style={{ position:'absolute', inset:0, width:'100%', height:'100%', pointerEvents:'none', zIndex:0 }}/>

      {/* Dynamic glow that follows touch/mouse */}
      <div aria-hidden style={{
        position:'absolute', inset:0, zIndex:0, pointerEvents:'none',
        background:`radial-gradient(ellipse 55% 45% at ${glowPos.x}% ${glowPos.y}%, rgba(22,101,52,.13) 0%, transparent 70%)`,
        transition:'background .4s ease',
      }}/>

      {/* Ghost word parallax */}
      <div aria-hidden style={{
        position:'absolute', right:-20, top:60,
        fontFamily:'var(--serif)', fontStyle:'italic', fontWeight:300,
        fontSize:'clamp(100px,20vw,380px)',
        color:'rgba(22,101,52,.04)', lineHeight:1, letterSpacing:'-.04em',
        pointerEvents:'none', userSelect:'none',
        transform:`translate(${tiltY * 2.5}px, ${-y * .15 + tiltX * 1.5}px)`,
        transition:'transform .18s ease-out', zIndex:0,
      }}>seen</div>

      {/* 3D tilt wrapper — desktop card only */}
      <div className="wrap hero-inner-grid" style={{
        position:'relative', zIndex:2, flex:1,
        display:'grid', gridTemplateColumns:'1.1fr 1fr', gap:40, alignItems:'center',
      }}>
        {/* LEFT */}
        <div>
          {/* Status pill */}
          <div className="reveal hero-pill" style={{
            display:'inline-flex', alignItems:'center', gap:7,
            padding:'6px 14px', borderRadius:999,
            background:'rgba(22,101,52,.10)', border:'1px solid rgba(22,101,52,.22)',
            fontFamily:'var(--mono)', fontSize:10, letterSpacing:'.06em', textTransform:'uppercase',
            color:'var(--accent)', marginBottom:18,
          }}>
            <span style={{width:7, height:7, borderRadius:'50%', background:'var(--accent)', animation:'heroDot 2s ease-in-out infinite'}}/>
            Now accepting creators — Instagram &amp; YouTube
          </div>

          {/* Headline */}
          <h1 style={{...window.bigHeadStyle(), fontSize:'clamp(40px,8vw,140px)', marginBottom:0}}>
            <span className="reveal" style={{display:'block'}}>You've been</span>
            <span className="reveal reveal-d1" style={{display:'block'}}>posting… but</span>
            <span className="reveal reveal-d2" style={{
              display:'block',
              fontFamily:'var(--serif)', fontStyle:'italic', fontWeight:300,
              textTransform:'none', letterSpacing:'-.04em', color:'var(--accent)',
              minHeight:'1.2em',
            }}>
              {typed}<span style={{
                display:'inline-block', width:3, height:'0.85em',
                background:'var(--accent)', marginLeft:2, verticalAlign:'middle',
                animation:'blink .8s step-end infinite',
              }}/>
            </span>
          </h1>

          <p className="reveal reveal-d3" style={{
            fontSize:'clamp(14px,1.5vw,17px)', lineHeight:1.6, color:'var(--ink-2)', maxWidth:500, marginTop:20,
            fontFamily:'var(--serif)', fontStyle:'italic', fontWeight:300,
          }}>
            Not because your content is bad — because it's not getting the{' '}
            <span style={{color:'var(--accent)', fontStyle:'normal', fontFamily:'var(--sans)', fontWeight:600}}>visibility it needs.</span>
            <span style={{display:'block', marginTop:8, fontStyle:'normal', fontFamily:'var(--sans)', fontWeight:400}}>We help your content finally get seen.</span>
          </p>

          <div className="reveal reveal-d3" style={{display:'flex', gap:10, flexWrap:'wrap', marginTop:22}}>
            <window.Btn primary href="#" onClick={e=>{e.preventDefault();window.scrollToSection&&window.scrollToSection("pricing");}}>Start My Growth →</window.Btn>
            <window.Btn href="#" onClick={e=>{e.preventDefault();window.scrollToSection&&window.scrollToSection("process");}}>See How It Works</window.Btn>
          </div>

          {/* Trust icons */}
          <div className="reveal reveal-d4 hero-trust" style={{display:'flex', gap:14, flexWrap:'wrap', marginTop:16}}>
            {[['🔒','No passwords'],['🛡️','Secure via Stripe'],['⚡','24–72h results']].map(([ic,l]) => (
              <div key={l} style={{display:'flex', alignItems:'center', gap:7}}>
                <span style={{fontSize:14}}>{ic}</span>
                <span style={{fontSize:12, color:'var(--ink-3)', lineHeight:1.3}}>{l}</span>
              </div>
            ))}
          </div>

          {/* Avatars */}
          <div className="reveal reveal-d4 hero-social" style={{display:'flex', alignItems:'center', gap:12, marginTop:14}}>
            <div style={{display:'flex'}}>
              {[['M','#2d6a4f,#1b4332'],['J','#1e6091,#023e8a'],['S','#6d4c41,#4e342e'],['K','#4a1942,#6a1e5e'],['R','#2d6a4f,#40916c']].map(([l,g], i) => (
                <div key={i} style={{width:28, height:28, borderRadius:'50%', background:`linear-gradient(135deg,${g})`, border:'2px solid var(--bg)', marginLeft:i?-8:0, display:'flex', alignItems:'center', justifyContent:'center', fontSize:10, fontWeight:700, color:'#fff'}}>{l}</div>
              ))}
              <div style={{width:28, height:28, borderRadius:'50%', background:'var(--accent)', border:'2px solid var(--bg)', marginLeft:-8, display:'flex', alignItems:'center', justifyContent:'center', fontSize:8, fontWeight:700, color:'#fff'}}>+</div>
            </div>
            <div>
              <div style={{fontWeight:700, fontSize:12, color:'var(--ink)'}}>Creators joining every week</div>
              <div style={{fontSize:11, color:'var(--ink-3)', fontFamily:'var(--mono)', display:'flex', alignItems:'center', gap:5}}>
                <span style={{width:6, height:6, borderRadius:'50%', background:'var(--accent)', display:'inline-block'}}/>
                Avg first results in 24–72 hours
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT — 3D tilt card with chart */}
        <div className="hero-right-col reveal reveal-d1" style={{perspective:900}}>
          <div style={{
            background:'rgba(255,255,255,.65)', border:'1px solid rgba(22,101,52,.15)',
            borderRadius:22, padding:22, backdropFilter:'blur(12px)',
            position:'relative', height:420,
            transform: m.active ? `rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale(1.02)` : 'rotateX(0) rotateY(0)',
            transition:'transform .35s cubic-bezier(.2,.7,.2,1)',
            transformStyle:'preserve-3d',
            boxShadow: m.active ? `${-tiltY * 2}px ${tiltX * 2}px 40px rgba(22,101,52,.15)` : '0 8px 40px rgba(22,101,52,.08)',
          }}>
            <div style={{fontFamily:'var(--mono)', fontSize:9, letterSpacing:'.1em', textTransform:'uppercase', color:'var(--ink-3)', marginBottom:8}}>Growth trajectory · 90 days</div>
            <canvas id="hero-chart-canvas" style={{width:'100%', height:'auto', borderRadius:8}}/>

            {/* 3D floating stat badges */}
            {[
              {icon:'🔒', num:'Zero', label:'Passwords asked', sub:'Your account stays yours', style:{top:-18, right:-18}},
              {icon:'✓', num:'Real', label:'Accounts only', sub:'No bots, no fakes', style:{top:'36%', right:-26}},
              {icon:'⚡', num:'24–72h', label:'To first results', sub:'From campaign launch', style:{bottom:56, right:-18}},
            ].map((c, i) => (
              <div key={i} style={{
                position:'absolute', ...c.style,
                background:'rgba(255,255,255,.95)', border:'1px solid rgba(22,101,52,.14)',
                borderRadius:14, padding:'9px 13px', backdropFilter:'blur(12px)',
                display:'flex', alignItems:'center', gap:9,
                boxShadow:'0 8px 28px rgba(15,31,15,.10)',
                animation:`hfc${i} ${3.5+i*.7}s ease-in-out infinite`,
                transform:'translateZ(24px)',
                minWidth:148, zIndex:4,
              }}>
                <span style={{fontSize:18}}>{c.icon}</span>
                <div>
                  <div style={{fontWeight:900, fontSize:17, letterSpacing:'-.03em', color:'var(--accent)', lineHeight:1}}>{c.num}</div>
                  <div style={{fontSize:11, fontWeight:600, color:'var(--ink)'}}>{c.label}</div>
                  <div style={{fontSize:9, color:'var(--ink-3)', fontFamily:'var(--mono)'}}>{c.sub} <span style={{color:'var(--accent)'}}>↗</span></div>
                </div>
              </div>
            ))}

            {/* Dark card bottom left */}
            <div style={{
              position:'absolute', bottom:-18, left:-18,
              background:'var(--ink)', color:'var(--bone)',
              borderRadius:14, padding:'11px 15px', maxWidth:200,
              boxShadow:'0 8px 32px rgba(15,31,15,.2)',
              animation:'hfc2 4.8s ease-in-out infinite', zIndex:4,
              transform:'translateZ(20px)',
            }}>
              <div style={{fontFamily:'var(--mono)', fontSize:9, letterSpacing:'.1em', textTransform:'uppercase', color:'rgba(240,246,232,.4)', marginBottom:7}}>Why creators trust us</div>
              {[['🔒','No passwords, ever'],['✓','Real accounts only'],['⚡','Results in 24–72h']].map(([ic,t]) => (
                <div key={t} style={{display:'flex', alignItems:'center', gap:7, fontSize:12, color:'rgba(240,246,232,.8)', marginBottom:5}}>
                  <span style={{color:'var(--accent)', fontSize:10, flexShrink:0}}>{ic}</span>{t}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* MOBILE-ONLY: Scroll cue */}
      <div className="hero-scroll-cue reveal" style={{
        display:'none', flexDirection:'column', alignItems:'center', gap:6,
        marginTop:32, paddingBottom:8, animation:'scrollCue 2s ease-in-out infinite',
      }}>
        <span style={{fontFamily:'var(--mono)', fontSize:10, letterSpacing:'.1em', textTransform:'uppercase', color:'var(--ink-3)'}}>Scroll to explore</span>
        <svg width="16" height="20" viewBox="0 0 16 20" fill="none">
          <rect x="5" y="0" width="6" height="10" rx="3" stroke="var(--accent)" strokeWidth="1.5" opacity=".5"/>
          <circle cx="8" cy="4" r="2" fill="var(--accent)" style={{animation:'scrollDot 2s ease-in-out infinite'}}/>
          <path d="M4 14 L8 18 L12 14" stroke="var(--accent)" strokeWidth="1.5" strokeLinecap="round" opacity=".6"/>
        </svg>
      </div>

      <style>{`
        @keyframes heroDot{0%,100%{opacity:.4;transform:scale(1)}50%{opacity:1;transform:scale(1.3)}}
        @keyframes blink{0%,100%{opacity:1}50%{opacity:0}}
        @keyframes hfc0{0%,100%{transform:translateY(0) translateZ(24px)}50%{transform:translateY(-8px) translateZ(28px)}}
        @keyframes hfc1{0%,100%{transform:translateY(-4px) translateZ(24px)}50%{transform:translateY(6px) translateZ(28px)}}
        @keyframes hfc2{0%,100%{transform:translateY(0) translateZ(20px)}50%{transform:translateY(-6px) translateZ(24px)}}
        @keyframes scrollCue{0%,100%{opacity:.5;transform:translateY(0)}50%{opacity:1;transform:translateY(4px)}}
        @keyframes scrollDot{0%,100%{transform:translateY(0)}60%{transform:translateY(5px)}}
        @media(max-width:900px){
          .hero-inner-grid{grid-template-columns:1fr !important}
          .hero-right-col{display:none !important}
          .hero-scroll-cue{display:flex !important}
        }
        @media(max-width:900px){#hero-section{padding-bottom:0}}
        @media(max-width:480px){.hero-trust{gap:8px !important;flex-wrap:wrap}}
        @media(max-width:480px){.hero-social{flex-direction:column;align-items:flex-start !important;gap:8px !important}}
        @media(max-width:480px){#hero-section{padding-top:calc(74px + 10px) !important}}
        @media(max-width:380px){.hero-pill{font-size:8px !important;letter-spacing:.04em !important;padding:4px 10px !important}}
      `}</style>
    </section>
  );
};
window.Hero = Hero;
