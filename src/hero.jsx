// HERO — clean headline, stat cards, chart, no bottom strip
const Hero = () => {
  const ref = useRef(null);
  const m = window.useMouse(ref);
  const y = window.useScrollY();

  // Dot-grid interactive canvas
  useEffect(() => {
    const cv = document.getElementById('hero-dot-canvas');
    const hero = ref.current;
    if (!cv || !hero) return;
    const ctx = cv.getContext('2d');
    let W, H, t2 = 0, particles = [];
    const mouse = { x: -999, y: -999, active: false };
    const SPACING = 52, RADIUS = 1.4, REPEL = 100, FORCE = 3200, SPRING = 0.08, DAMP = 0.70;

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
        const breath = Math.sin(t2 * 0.018 + p.phase) * 0.3;
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
        const dispT = Math.min(1, disp / 28);
        const ddist = mouse.active ? Math.sqrt((p.x - mouse.x) ** 2 + (p.y - mouse.y) ** 2) : 9999;
        const prox = Math.max(0, 1 - ddist / REPEL);
        const r2 = RADIUS + breath * 0.3 + prox * 2.2 + dispT * 1.8;
        const blend = Math.max(prox, dispT * 0.6);
        const gC = Math.round(101 + blend * 62);
        const alpha = Math.min(0.85, (0.08 + breath * 0.02 + prox * 0.55 + dispT * 0.22)) * 0.35;
        ctx.beginPath(); ctx.arc(p.x, p.y, r2, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(22,${gC},52,${alpha.toFixed(2)})`; ctx.fill();
      }
      animId = requestAnimationFrame(draw);
    };

    hero.addEventListener('mousemove', e => {
      const r = cv.getBoundingClientRect();
      mouse.x = e.clientX - r.left; mouse.y = e.clientY - r.top; mouse.active = true;
    }, { passive: true });
    hero.addEventListener('mouseleave', () => { mouse.active = false; });

    setSize();
    window.addEventListener('resize', setSize, { passive: true });
    draw();
    return () => { cancelAnimationFrame(animId); window.removeEventListener('resize', setSize); };
  }, []);

  // Growth chart canvas
  useEffect(() => {
    const cv = document.getElementById('hero-chart-canvas');
    if (!cv) return;
    const ctx = cv.getContext('2d');
    cv.width = 400; cv.height = 240;
    const pts = [8, 10, 13, 18, 24, 34, 48, 66, 82, 95];
    const W = cv.width, H = cv.height;
    const pad = { t: 16, r: 16, b: 24, l: 32 };
    const gW = W - pad.l - pad.r, gH = H - pad.t - pad.b;
    const xStep = gW / (pts.length - 1);
    ctx.clearRect(0, 0, W, H);
    for (let i = 0; i <= 4; i++) {
      const y2 = pad.t + gH * (1 - i / 4);
      ctx.beginPath(); ctx.moveTo(pad.l, y2); ctx.lineTo(W - pad.r, y2);
      ctx.strokeStyle = 'rgba(22,101,52,.08)'; ctx.lineWidth = 1; ctx.stroke();
      ctx.fillStyle = 'rgba(22,101,52,.35)'; ctx.font = '8px monospace';
      ctx.fillText((i * 25) + '%', 2, y2 + 3);
    }
    ctx.beginPath();
    ctx.moveTo(pad.l, pad.t + gH);
    pts.forEach((v, i) => ctx.lineTo(pad.l + i * xStep, pad.t + gH * (1 - v / 100)));
    ctx.lineTo(pad.l + (pts.length - 1) * xStep, pad.t + gH);
    ctx.closePath();
    const grad = ctx.createLinearGradient(0, pad.t, 0, pad.t + gH);
    grad.addColorStop(0, 'rgba(22,101,52,.22)'); grad.addColorStop(1, 'rgba(22,101,52,.02)');
    ctx.fillStyle = grad; ctx.fill();
    ctx.beginPath();
    pts.forEach((v, i) => { const x2 = pad.l + i * xStep, y2 = pad.t + gH * (1 - v / 100); i === 0 ? ctx.moveTo(x2, y2) : ctx.lineTo(x2, y2); });
    ctx.strokeStyle = '#166534'; ctx.lineWidth = 2.5;
    ctx.shadowColor = 'rgba(22,101,52,.45)'; ctx.shadowBlur = 10; ctx.stroke(); ctx.shadowBlur = 0;
    pts.forEach((v, i) => {
      const x2 = pad.l + i * xStep, y2 = pad.t + gH * (1 - v / 100);
      ctx.beginPath(); ctx.arc(x2, y2, 3, 0, Math.PI * 2);
      ctx.fillStyle = '#166534'; ctx.shadowColor = 'rgba(22,101,52,.6)'; ctx.shadowBlur = 7;
      ctx.fill(); ctx.shadowBlur = 0;
    });
  }, []);

  return (
    <section id="hero-section" data-screen-label="01 hero" ref={ref} style={{
      minHeight: '100svh', position: 'relative', overflow: 'hidden',
      paddingTop: 'calc(74px + clamp(24px, 5vw, 56px))',
      paddingBottom: 'clamp(40px,6vw,80px)',
      display: 'flex', flexDirection: 'column',
    }}>
      {/* Interactive dot-grid */}
      <canvas id="hero-dot-canvas" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 0 }}/>

      {/* Ghost word */}
      <div aria-hidden style={{
        position: 'absolute', right: -40, top: 80,
        fontFamily: 'var(--serif)', fontStyle: 'italic', fontWeight: 300,
        fontSize: 'clamp(120px, 22vw, 420px)',
        color: 'rgba(22,101,52,.05)', lineHeight: 1, letterSpacing: '-.04em',
        pointerEvents: 'none', userSelect: 'none',
        transform: `translate(${m.x * 30 - 15}px, ${-y * .18}px)`,
        transition: 'transform .25s ease-out', zIndex: 0,
      }}>seen</div>

      {/* Main grid */}
      <div className="wrap hero-inner-grid" style={{
        position: 'relative', zIndex: 2, flex: 1,
        display: 'grid', gridTemplateColumns: '1.1fr 1fr', gap: 48, alignItems: 'center',
      }}>
        {/* LEFT */}
        <div>
          {/* Status pill */}
          <div className="reveal" style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            padding: '6px 14px', borderRadius: 999,
            background: 'rgba(22,101,52,.10)', border: '1px solid rgba(22,101,52,.22)',
            fontFamily: 'var(--mono)', fontSize: 10, letterSpacing: '.12em', textTransform: 'uppercase',
            color: 'var(--accent)', marginBottom: 22,
          }}>
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--accent)', animation: 'heroDot 2s ease-in-out infinite' }}/>
            Now accepting creators — Instagram &amp; YouTube
          </div>

          {/* Clean headline — no mid-word splits */}
          <h1 className="wreveal" style={{ ...window.bigHeadStyle(), fontSize: 'clamp(44px, 8.5vw, 148px)', marginBottom: 0 }}>
            Your content<br/>
            deserves<br/>
            to be <span style={{ fontFamily: 'var(--serif)', fontStyle: 'italic', fontWeight: 300, textTransform: 'none', letterSpacing: '-.04em', color: 'var(--accent)' }}>seen.</span>
          </h1>

          <p className="reveal reveal-d2" style={{
            fontSize: 18, lineHeight: 1.55, color: 'var(--ink-2)', maxWidth: 520, marginTop: 24,
            fontFamily: 'var(--serif)', fontStyle: 'italic', fontWeight: 300,
          }}>
            We put your content in front of the right people — so <span style={{ color: 'var(--accent)', fontStyle: 'normal', fontFamily: 'var(--sans)', fontWeight: 600 }}>real momentum</span> can finally build.
          </p>

          <div className="reveal reveal-d3" style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginTop: 28 }}>
            <window.Btn primary href="#pricing">View packages →</window.Btn>
            <window.Btn onClick={() => window.openAuditModal && window.openAuditModal()}>Get free audit</window.Btn>
          </div>

          {/* Trust icons */}
          <div className="reveal reveal-d4" style={{ display: 'flex', gap: 24, flexWrap: 'wrap', marginTop: 28 }}>
            {[['🔒','No passwords required'],['🛡️','Secure checkout via Stripe'],['⚡','Results in 24–72 hours']].map(([ic,l]) => (
              <div key={l} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <span style={{ fontSize: 15 }}>{ic}</span>
                <span style={{ fontSize: 12, color: 'var(--ink-3)', lineHeight: 1.3 }}>{l}</span>
              </div>
            ))}
          </div>

          {/* Social proof avatars */}
          <div className="reveal reveal-d4" style={{ display: 'flex', alignItems: 'center', gap: 14, marginTop: 22 }}>
            <div style={{ display: 'flex' }}>
              {[['M','#2d6a4f,#1b4332'],['J','#1e6091,#023e8a'],['S','#6d4c41,#4e342e'],['K','#4a1942,#6a1e5e'],['R','#2d6a4f,#40916c']].map(([l,g], i) => (
                <div key={i} style={{ width:28, height:28, borderRadius:'50%', background:`linear-gradient(135deg,${g})`, border:'2px solid var(--bg)', marginLeft: i ? -8 : 0, display:'flex', alignItems:'center', justifyContent:'center', fontSize:10, fontWeight:700, color:'#fff' }}>{l}</div>
              ))}
              <div style={{ width:28, height:28, borderRadius:'50%', background:'var(--accent)', border:'2px solid var(--bg)', marginLeft:-8, display:'flex', alignItems:'center', justifyContent:'center', fontSize:8, fontWeight:700, color:'#fff' }}>18+</div>
            </div>
            <div>
              <div style={{ fontWeight:700, fontSize:12, color:'var(--ink)' }}>18 creators joined this week</div>
              <div style={{ fontSize:11, color:'var(--ink-3)', fontFamily:'var(--mono)', display:'flex', alignItems:'center', gap:5 }}>
                <span style={{ width:6, height:6, borderRadius:'50%', background:'var(--accent)', display:'inline-block' }}/>
                Avg first results in 24–72 hours
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT — Chart + stat cards */}
        <div className="hero-right-col reveal reveal-d1" style={{ position:'relative', height:420 }}>
          <div style={{ background:'rgba(255,255,255,.6)', border:'1px solid rgba(22,101,52,.12)', borderRadius:20, padding:20, backdropFilter:'blur(8px)', position:'absolute', inset:0 }}>
            <div style={{ fontFamily:'var(--mono)', fontSize:9, letterSpacing:'.1em', textTransform:'uppercase', color:'var(--ink-3)', marginBottom:8 }}>Growth trajectory · 90 days</div>
            <canvas id="hero-chart-canvas" style={{ width:'100%', height:'auto' }}/>
          </div>

          {/* Stat cards */}
          {[
            { icon:'👥', num:'+12.4K', label:'Followers Gained', sub:'This Month', style:{top:-20, right:-20} },
            { icon:'👁️', num:'+280%', label:'Reach Increase', sub:'vs Last Month', style:{top:'38%', right:-28} },
            { icon:'🚀', num:'3.4×', label:'Engagement Rate', sub:'vs Last Month', style:{bottom:50, right:-20} },
          ].map((c, i) => (
            <div key={i} style={{
              position:'absolute', ...c.style,
              background:'rgba(255,255,255,.94)', border:'1px solid rgba(22,101,52,.14)', borderRadius:14,
              padding:'10px 14px', backdropFilter:'blur(12px)',
              display:'flex', alignItems:'center', gap:10,
              boxShadow:'0 8px 28px rgba(15,31,15,.08)',
              animation:`hfc${i} ${3.5+i*.7}s ease-in-out infinite`,
              minWidth:155, zIndex:3,
            }}>
              <span style={{fontSize:20}}>{c.icon}</span>
              <div>
                <div style={{fontWeight:900, fontSize:18, letterSpacing:'-.03em', color:'var(--accent)', lineHeight:1}}>{c.num}</div>
                <div style={{fontSize:11, fontWeight:600, color:'var(--ink)'}}>{c.label}</div>
                <div style={{fontSize:10, color:'var(--ink-3)', fontFamily:'var(--mono)'}}>{c.sub} <span style={{color:'var(--accent)'}}>↗</span></div>
              </div>
            </div>
          ))}

          {/* Review card */}
          <div style={{
            position:'absolute', bottom:-20, left:-20,
            background:'var(--ink)', color:'var(--bone)',
            borderRadius:14, padding:'12px 16px', maxWidth:210,
            boxShadow:'0 8px 32px rgba(15,31,15,.18)',
            animation:'hfc2 4.8s ease-in-out infinite', zIndex:3,
          }}>
            <div style={{color:'var(--accent)', fontSize:11, marginBottom:4}}>★★★★★</div>
            <p style={{fontSize:12, lineHeight:1.5, color:'rgba(240,246,232,.85)', marginBottom:6}}>"Finally real growth, real people. My reach doubled in the first week."</p>
            <div style={{fontSize:10, color:'rgba(240,246,232,.4)', fontFamily:'var(--mono)'}}>@creative.jade · Lifestyle ✓</div>
          </div>
        </div>
      </div>

      <HeroTickerStrip/>

      <style>{`
        @keyframes heroDot{0%,100%{opacity:.4}50%{opacity:1}}
        @keyframes hfc0{0%,100%{transform:translateY(0)}50%{transform:translateY(-8px)}}
        @keyframes hfc1{0%,100%{transform:translateY(-4px)}50%{transform:translateY(6px)}}
        @keyframes hfc2{0%,100%{transform:translateY(0)}50%{transform:translateY(-6px)}}
        @media(max-width:900px){.hero-inner-grid{grid-template-columns:1fr !important}.hero-right-col{display:none !important}}
      `}</style>
    </section>
  );
};

const HeroTickerStrip = () => {
  const items = ['No passwords required','Real visibility — not fake numbers','Instagram & YouTube promotion','Results in 24–72 hours','18+ creators active this week','Secure checkout via Stripe'];
  return (
    <div style={{ position:'relative', zIndex:2, padding:'12px 0', borderTop:'1px solid var(--line)', background:'rgba(15,31,15,.03)', overflow:'hidden', maskImage:'linear-gradient(90deg,transparent,#000 8%,#000 92%,transparent)' }}>
      <div style={{ display:'flex', gap:48, animation:'tickerL 38s linear infinite', whiteSpace:'nowrap', fontFamily:'var(--mono)', fontSize:11, letterSpacing:'.06em', color:'var(--ink-2)', textTransform:'uppercase' }}>
        {[...items,...items,...items].map((it,i)=>(
          <span key={i} style={{display:'flex',alignItems:'center',gap:48}}>
            {it}<span style={{display:'inline-block',width:6,height:6,borderRadius:'50%',background:'var(--accent)'}}/>
          </span>
        ))}
      </div>
      <style>{`@keyframes tickerL{from{transform:translateX(0)}to{transform:translateX(-33.333%)}}`}</style>
    </div>
  );
};

window.Hero = Hero;
