// PRELOADER — HUD-style starfield intro screen
const Preloader = () => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    // Lock scroll
    document.documentElement.style.overflow = 'hidden';
    document.body.style.overflow = 'hidden';

    const unlock = () => {
      document.documentElement.style.overflow = '';
      document.body.style.overflow = '';
    };

    // Stars canvas
    const cv = document.getElementById('intro-stars');
    const ctx = cv ? cv.getContext('2d') : null;
    let stars = [], st = 0, starAnimId;
    const resizeStar = () => {
      if (!cv) return;
      cv.width = window.innerWidth;
      cv.height = window.innerHeight;
      stars = [];
      const n = Math.floor(cv.width * cv.height / 3500);
      for (let i = 0; i < n; i++) stars.push({
        x: Math.random() * cv.width, y: Math.random() * cv.height,
        r: .3 + Math.random() * 1.2, a: .1 + Math.random() * .5,
        sp: .003 + Math.random() * .012, ph: Math.random() * Math.PI * 2,
        g: Math.random() < .2,
      });
    };
    const drawStars = () => {
      if (!ctx || !cv) return;
      ctx.clearRect(0, 0, cv.width, cv.height);
      st += .016;
      stars.forEach(s => {
        const a = s.a * (.5 + .5 * Math.sin(st * s.sp * 60 + s.ph));
        ctx.globalAlpha = a;
        const g = ctx.createRadialGradient(s.x, s.y, 0, s.x, s.y, s.r * 4);
        g.addColorStop(0, s.g ? 'rgba(74,222,128,1)' : 'rgba(255,255,255,.9)');
        g.addColorStop(1, 'rgba(0,0,0,0)');
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r * 4, 0, Math.PI * 2);
        ctx.fill();
      });
      ctx.globalAlpha = 1;
      starAnimId = requestAnimationFrame(drawStars);
    };
    resizeStar(); drawStars();

    // Ring canvas
    const rc = document.getElementById('intro-ring-canvas');
    const rctx = rc ? rc.getContext('2d') : null;
    let rt = 0, ringAnimId;
    const resizeRing = () => {
      if (!rc) return;
      const sz = Math.min(window.innerWidth * .7, 600);
      rc.width = sz; rc.height = sz;
    };
    resizeRing();
    const drawRing = () => {
      if (!rctx || !rc) return;
      const W = rc.width, H = rc.height, cx = W / 2, cy = H / 2;
      rctx.clearRect(0, 0, W, H);
      rt += .012;
      [.42, .46, .5].forEach((rf, ri) => {
        rctx.beginPath();
        rctx.arc(cx, cy, Math.min(W, H) * rf, 0, Math.PI * 2);
        rctx.strokeStyle = `rgba(34,197,94,${0.12 - ri * .03})`;
        rctx.lineWidth = 1;
        rctx.stroke();
      });
      const r = Math.min(W, H) * .46;
      rctx.save();
      rctx.shadowColor = 'rgba(74,222,128,.9)';
      rctx.shadowBlur = 25;
      rctx.beginPath();
      rctx.arc(cx, cy, r, rt, rt + Math.PI * .35);
      rctx.strokeStyle = 'rgba(74,222,128,.95)';
      rctx.lineWidth = 3;
      rctx.stroke();
      rctx.restore();
      const tx = cx + Math.cos(rt + Math.PI * .35) * r;
      const ty = cy + Math.sin(rt + Math.PI * .35) * r;
      const tg = rctx.createRadialGradient(tx, ty, 0, tx, ty, 22);
      tg.addColorStop(0, 'rgba(255,255,255,1)');
      tg.addColorStop(.4, 'rgba(74,222,128,.7)');
      tg.addColorStop(1, 'rgba(74,222,128,0)');
      rctx.shadowColor = 'rgba(74,222,128,1)';
      rctx.shadowBlur = 35;
      rctx.fillStyle = tg;
      rctx.beginPath();
      rctx.arc(tx, ty, 22, 0, Math.PI * 2);
      rctx.fill();
      rctx.shadowBlur = 0;
      [210, 270, 330, 30, 90, 150].forEach(d => {
        const a = d * Math.PI / 180;
        const x1 = cx + Math.cos(a) * r, y1 = cy + Math.sin(a) * r;
        const x2 = cx + Math.cos(a) * (r + 28), y2 = cy + Math.sin(a) * (r + 28);
        rctx.globalAlpha = .35;
        rctx.beginPath(); rctx.moveTo(x1, y1); rctx.lineTo(x2, y2);
        rctx.strokeStyle = '#4ade80'; rctx.lineWidth = 1; rctx.stroke();
        rctx.beginPath(); rctx.arc(x1, y1, 2.5, 0, Math.PI * 2);
        rctx.fillStyle = '#4ade80'; rctx.fill();
      });
      rctx.globalAlpha = 1;
      ringAnimId = requestAnimationFrame(drawRing);
    };
    drawRing();

    // Progress animation
    let prog = 0, target = 0, progId;
    const bar = document.getElementById('intro-bar');
    const pctEl = document.getElementById('intro-pct');
    const animProg = () => {
      if (prog < target) prog = Math.min(target, prog + 2);
      if (bar) bar.style.width = prog + '%';
      if (pctEl) pctEl.textContent = Math.round(prog) + '%';
      progId = requestAnimationFrame(animProg);
    };
    animProg();
    [[100,18],[300,35],[600,55],[900,72],[1200,85],[1600,95],[2000,100]].forEach(([delay,val]) => {
      setTimeout(() => { target = val; }, delay);
    });

    let done = false;
    const dismiss = () => {
      if (done) return; done = true;
      cancelAnimationFrame(starAnimId);
      cancelAnimationFrame(ringAnimId);
      cancelAnimationFrame(progId);
      unlock();
      setVisible(false);
    };

    const t1 = setTimeout(dismiss, 2500);
    const t2 = setTimeout(() => { if (!done) dismiss(); }, 5000);

    window.addEventListener('resize', resizeStar);
    window.addEventListener('resize', resizeRing);

    return () => {
      clearTimeout(t1); clearTimeout(t2);
      cancelAnimationFrame(starAnimId);
      cancelAnimationFrame(ringAnimId);
      cancelAnimationFrame(progId);
      window.removeEventListener('resize', resizeStar);
      window.removeEventListener('resize', resizeRing);
      unlock();
    };
  }, []);

  if (!visible) return null;

  return (
    <div id="intro" onClick={() => {
      document.documentElement.style.overflow = '';
      document.body.style.overflow = '';
      setVisible(false);
    }} style={{
      position: 'fixed', inset: 0, zIndex: 99999,
      background: '#000', display: 'flex', alignItems: 'center', justifyContent: 'center',
      flexDirection: 'column',
    }}>
      <canvas id="intro-stars" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}/>

      {/* HUD corners */}
      {['tl','tr','bl','br'].map(pos => (
        <div key={pos} className={`hud-corner hud-${pos}`}/>
      ))}
      <div className="hud-scanline"/>

      <canvas id="intro-ring-canvas" style={{ position: 'absolute', width: 'min(70vw,600px)', height: 'min(70vw,600px)' }}/>

      {/* Left HUD */}
      <div className="hud-side hud-left">
        {[['👥','CREATORS','GROWING'],['📊','RESULTS','DRIVEN'],['🎯','REAL GROWTH','REAL PEOPLE']].map(([ico,t1,t2], i) => (
          <React.Fragment key={i}>
            {i > 0 && <div className="hud-line-h"/>}
            <div className="hud-item">
              <div className="hud-icon">{ico}</div>
              <div><div className="hud-item-title">{t1}</div><div className="hud-item-sub" style={{color:'#4ade80'}}>{t2}</div></div>
            </div>
          </React.Fragment>
        ))}
      </div>

      {/* Right HUD */}
      <div className="hud-side hud-right">
        {[['INSTAGRAM','YOUTUBE','▶'],['SAFE &','SECURE','🛡️'],['FAST','RESULTS','⚡']].map(([t1,t2,ico], i) => (
          <React.Fragment key={i}>
            {i > 0 && <div className="hud-line-h"/>}
            <div className="hud-item hud-item-r">
              <div><div className="hud-item-title">{t1}</div><div className="hud-item-sub">{t2}</div></div>
              <div className="hud-icon">{ico}</div>
            </div>
          </React.Fragment>
        ))}
      </div>

      {/* Center */}
      <div id="intro-content" style={{ position: 'relative', zIndex: 2, textAlign: 'center' }}>
        <div className="hud-hex">
          <svg viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg">
            <polygon points="30,2 55,16 55,44 30,58 5,44 5,16" fill="none" stroke="#22c55e" strokeWidth="1.5"/>
            <polygon points="30,8 50,20 50,40 30,52 10,40 10,20" fill="none" stroke="rgba(34,197,94,.4)" strokeWidth="1"/>
            <path d="M18,38 L26,22 L34,32 L42,18" fill="none" stroke="#22c55e" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M36,18 L44,18 L44,26" fill="none" stroke="#22c55e" strokeWidth="2" strokeLinecap="round"/>
          </svg>
        </div>
        <div className="hud-agency-label">INSTAGRAM &amp; YOUTUBE GROWTH AGENCY</div>
        <div className="hud-wordmark">INFLORA<span className="hud-x">X</span></div>
        <div className="hud-tagline">WHERE VISIBILITY BECOMES <span style={{color:'#4ade80'}}>GROWTH.</span></div>
        <div className="hud-progress-label">LOADING...</div>
        <div className="hud-progress-wrap">
          <div className="hud-progress-bar" id="intro-bar"/>
          <div className="hud-progress-pct" id="intro-pct">0%</div>
        </div>
      </div>

      <style>{`
        #intro{cursor:pointer}
        .hud-corner{position:absolute;width:28px;height:28px;border-color:#22c55e;border-style:solid;border-width:0;opacity:.6}
        .hud-tl{top:20px;left:20px;border-top-width:2px;border-left-width:2px}
        .hud-tr{top:20px;right:20px;border-top-width:2px;border-right-width:2px}
        .hud-bl{bottom:20px;left:20px;border-bottom-width:2px;border-left-width:2px}
        .hud-br{bottom:20px;right:20px;border-bottom-width:2px;border-right-width:2px}
        .hud-scanline{position:absolute;left:0;right:0;height:1px;background:rgba(34,197,94,.15);animation:scanMove 3s linear infinite;pointer-events:none}
        @keyframes scanMove{from{top:0}to{top:100%}}
        .hud-side{position:absolute;top:50%;transform:translateY(-50%);display:flex;flex-direction:column;gap:16px}
        .hud-left{left:32px}.hud-right{right:32px;align-items:flex-end}
        .hud-item{display:flex;align-items:center;gap:10px}
        .hud-item-r{flex-direction:row-reverse}
        .hud-icon{font-size:18px;opacity:.7}
        .hud-item-title{font-family:var(--mono);font-size:10px;letter-spacing:.1em;color:rgba(255,255,255,.7);text-transform:uppercase}
        .hud-item-sub{font-family:var(--mono);font-size:9px;letter-spacing:.08em;color:rgba(255,255,255,.4);text-transform:uppercase}
        .hud-line-h{width:100%;height:1px;background:rgba(34,197,94,.2)}
        .hud-hex{width:60px;height:60px;margin:0 auto 20px}
        .hud-agency-label{font-family:var(--mono);font-size:9px;letter-spacing:.18em;color:rgba(255,255,255,.4);text-transform:uppercase;margin-bottom:14px}
        .hud-wordmark{font-family:var(--sans);font-weight:900;font-size:clamp(40px,8vw,80px);letter-spacing:-.04em;color:#fff;line-height:1}
        .hud-x{color:#22c55e}
        .hud-tagline{font-family:var(--mono);font-size:12px;letter-spacing:.12em;color:rgba(255,255,255,.5);text-transform:uppercase;margin:12px 0 24px}
        .hud-progress-label{font-family:var(--mono);font-size:9px;letter-spacing:.12em;color:rgba(34,197,94,.6);text-transform:uppercase;margin-bottom:8px}
        .hud-progress-wrap{width:min(300px,60vw);height:3px;background:rgba(255,255,255,.1);position:relative;margin:0 auto}
        .hud-progress-bar{height:100%;background:linear-gradient(90deg,#166534,#22c55e);width:0%;transition:width .3s}
        .hud-progress-pct{font-family:var(--mono);font-size:11px;color:#22c55e;text-align:center;margin-top:8px;position:absolute;width:100%;top:8px}
        @media(max-width:600px){.hud-side{display:none}}
      `}</style>
    </div>
  );
};
window.Preloader = Preloader;
