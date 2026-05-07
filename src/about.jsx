// Insight cards — full-size premium flip cards
const insightCards = [
  {
    emoji: '👁️',
    bg: 'linear-gradient(145deg,#0a1f10,#0f3320,#122b1a)',
    accent: '#4ade80',
    tag: 'Visibility',
    front: 'Most creators only reach people they already know.',
    back: 'Real growth starts when strangers begin seeing your content.',
  },
  {
    emoji: '📉',
    bg: 'linear-gradient(145deg,#0a121f,#0f2035,#0c1828)',
    accent: '#60c8f0',
    tag: 'Reach',
    front: "Low reach doesn't always mean low-quality content.",
    back: "Sometimes the algorithm simply hasn't understood your audience yet.",
  },
  {
    emoji: '📷',
    bg: 'linear-gradient(145deg,#1a150a,#2e2010,#1a1208)',
    accent: '#fbbf24',
    tag: 'Visibility',
    front: 'Most creators think they need a better camera…',
    back: 'when they actually need better visibility.',
  },
  {
    emoji: '🎯',
    bg: 'linear-gradient(145deg,#1a0a14,#2e1022,#1a0810)',
    accent: '#f472b6',
    tag: 'Audience',
    front: 'A Reel shown to the wrong audience can completely fail…',
    back: 'The same Reel can go viral with the right one.',
  },
  {
    emoji: '🚀',
    bg: 'linear-gradient(145deg,#0a1a12,#0f2e1a,#081508)',
    accent: '#34d399',
    tag: 'Growth',
    front: 'Many creators quit during the exact phase',
    back: 'where growth is about to begin.',
  },
];

const InsightCards = () => {
  const [active, setActive] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [transitioning, setTransitioning] = useState(false);
  const n = insightCards.length;

  const goTo = (i) => {
    if (transitioning) return;
    setFlipped(false);
    setTransitioning(true);
    setTimeout(() => { setActive(i); setTransitioning(false); }, 280);
  };

  const next = () => goTo((active + 1) % n);
  const prev = () => goTo((active - 1 + n) % n);

  // Auto-advance
  useEffect(() => {
    const id = setInterval(() => {
      if (!flipped) {
        setFlipped(true);
        setTimeout(() => {
          goTo((active + 1) % n);
        }, 2200);
      }
    }, 4800);
    return () => clearInterval(id);
  }, [flipped, active]);

  const card = insightCards[active];

  return (
    <div style={{position:'relative', marginTop:4}}>
      {/* Header */}
      <div style={{display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:16}}>
        <div style={{display:'flex', alignItems:'center', gap:8}}>
          <span style={{width:7,height:7,borderRadius:'50%',background:'var(--accent)',display:'inline-block',animation:'insightPulse 2s ease-in-out infinite'}}/>
          <span style={{fontFamily:'var(--mono)',fontSize:9,letterSpacing:'.18em',textTransform:'uppercase',color:'rgba(240,246,232,.4)'}}>Did you know?</span>
        </div>
        {/* Progress dots */}
        <div style={{display:'flex', gap:5}}>
          {insightCards.map((_,i) => (
            <button key={i} onClick={() => goTo(i)} style={{
              width:i===active?20:5, height:5, borderRadius:999,
              background:i===active?'var(--accent)':'rgba(240,246,232,.2)',
              border:'none', cursor:'pointer', padding:0,
              transition:'width .3s, background .3s',
              WebkitTapHighlightColor:'transparent',
            }}/>
          ))}
        </div>
      </div>

      {/* Full-size flip card */}
      <div
        onClick={() => setFlipped(f => !f)}
        style={{cursor:'pointer', perspective:1200, WebkitTapHighlightColor:'transparent'}}
      >
        <div style={{
          position:'relative',
          width:'100%', height:260,
          transformStyle:'preserve-3d',
          transform: flipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
          transition: transitioning ? 'none' : 'transform .6s cubic-bezier(.4,0,.2,1)',
        }}>

          {/* FRONT */}
          <div style={{
            position:'absolute', inset:0,
            backfaceVisibility:'hidden', WebkitBackfaceVisibility:'hidden',
            borderRadius:22,
            background: card.bg,
            border:'1px solid rgba(255,255,255,.07)',
            overflow:'hidden',
            opacity: transitioning ? 0 : 1,
            transition:'opacity .28s',
          }}>
            {/* Glow */}
            <div style={{position:'absolute',top:-60,right:-60,width:220,height:220,borderRadius:'50%',background:card.accent,opacity:.1,filter:'blur(50px)',pointerEvents:'none'}}/>
            {/* Top image-like area */}
            <div style={{
              height:140,
              display:'flex', alignItems:'center', justifyContent:'center',
              position:'relative', overflow:'hidden',
            }}>
              <div style={{position:'absolute',inset:0,background:`radial-gradient(ellipse at 50% 60%, ${card.accent}18, transparent 70%)`}}/>
              {/* Tag */}
              <div style={{position:'absolute',top:16,left:16,padding:'4px 12px',borderRadius:999,background:'rgba(255,255,255,.08)',border:'1px solid rgba(255,255,255,.12)',fontSize:9,fontFamily:'var(--mono)',letterSpacing:'.14em',textTransform:'uppercase',color:'rgba(255,255,255,.5)'}}>
                {card.tag}
              </div>
              <div style={{fontSize:64,filter:'drop-shadow(0 4px 20px rgba(0,0,0,.3))',animation:'cardEmojiBob 3s ease-in-out infinite'}}>{card.emoji}</div>
              {/* Bottom fade */}
              <div style={{position:'absolute',bottom:0,left:0,right:0,height:50,background:'linear-gradient(to bottom,transparent,rgba(0,0,0,.35))'}}/>
            </div>
            {/* Content */}
            <div style={{padding:'18px 22px 20px'}}>
              <p style={{fontSize:15,lineHeight:1.6,color:'rgba(240,246,232,.88)',fontFamily:'var(--serif)',fontStyle:'italic',margin:0}}>
                {card.front}
              </p>
              <div style={{marginTop:12,display:'flex',alignItems:'center',gap:8,fontSize:10,fontFamily:'var(--mono)',color:'rgba(255,255,255,.28)',letterSpacing:'.1em',textTransform:'uppercase'}}>
                <span style={{width:16,height:1,background:'rgba(255,255,255,.2)',display:'inline-block'}}/>
                Tap to reveal
              </div>
            </div>
          </div>

          {/* BACK */}
          <div style={{
            position:'absolute', inset:0,
            backfaceVisibility:'hidden', WebkitBackfaceVisibility:'hidden',
            transform:'rotateY(180deg)',
            borderRadius:22,
            background: card.bg,
            border:`1px solid ${card.accent}33`,
            boxShadow:`0 0 40px ${card.accent}18`,
            overflow:'hidden',
            display:'flex', flexDirection:'column', justifyContent:'center',
            padding:'28px 28px',
            opacity: transitioning ? 0 : 1,
            transition:'opacity .28s',
          }}>
            <div style={{position:'absolute',top:-40,right:-40,width:200,height:200,borderRadius:'50%',background:card.accent,opacity:.1,filter:'blur(50px)'}}/>
            <div style={{position:'absolute',bottom:-60,left:-30,width:180,height:180,borderRadius:'50%',background:card.accent,opacity:.06,filter:'blur(40px)'}}/>
            <div style={{position:'relative'}}>
              <div style={{fontSize:42,marginBottom:18}}>{card.emoji}</div>
              <p style={{
                fontSize:20, lineHeight:1.55,
                color:card.accent,
                fontFamily:'var(--serif)', fontStyle:'italic', fontWeight:400,
                margin:0,
              }}>{card.back}</p>
              <div style={{marginTop:20,display:'flex',alignItems:'center',gap:8,fontSize:10,fontFamily:'var(--mono)',color:'rgba(255,255,255,.25)',letterSpacing:'.1em',textTransform:'uppercase'}}>
                <span style={{width:16,height:1,background:'rgba(255,255,255,.15)',display:'inline-block'}}/>
                Tap to flip back
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Nav buttons */}
      <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', marginTop:16}}>
        <div style={{display:'flex', gap:8}}>
          {[['‹', prev], ['›', next]].map(([label, fn]) => (
            <button key={label} onClick={fn} style={{
              width:36, height:36, borderRadius:'50%',
              border:'1px solid rgba(240,246,232,.15)',
              background:'rgba(255,255,255,.05)', color:'rgba(240,246,232,.6)',
              fontSize:16, cursor:'pointer',
              display:'flex', alignItems:'center', justifyContent:'center',
              transition:'all .2s', WebkitTapHighlightColor:'transparent',
            }}
            onMouseEnter={e=>{e.currentTarget.style.borderColor='var(--accent)';e.currentTarget.style.color='var(--accent)';e.currentTarget.style.background='rgba(22,101,52,.15)';}}
            onMouseLeave={e=>{e.currentTarget.style.borderColor='rgba(240,246,232,.15)';e.currentTarget.style.color='rgba(240,246,232,.6)';e.currentTarget.style.background='rgba(255,255,255,.05)';}}>
              {label}
            </button>
          ))}
        </div>
        <span style={{fontSize:10,fontFamily:'var(--mono)',color:'rgba(240,246,232,.25)',letterSpacing:'.1em',textTransform:'uppercase'}}>
          {String(active+1).padStart(2,'0')} / {String(n).padStart(2,'0')}
        </span>
      </div>

      <style>{`
        @keyframes insightPulse{0%,100%{opacity:.4;transform:scale(1)}50%{opacity:1;transform:scale(1.4)}}
        @keyframes cardEmojiBob{0%,100%{transform:translateY(0) scale(1)}50%{transform:translateY(-6px) scale(1.05)}}
      `}</style>
    </div>
  );
};

// ABOUT — fixed: CTA inside wrap, improved headline
const About = () => (
  <window.Section id="about" padded>
    <div className="wrap">
      <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:64}} className="about-grid">

        {/* LEFT */}
        <div>
          <span className="reveal" style={window.labelStyle}>The studio</span>
          <h2 className="reveal reveal-d1" style={{...window.bigHeadStyle(), fontSize:'clamp(40px,6vw,96px)', marginTop:18}}>
            Built for<br/><window.Em>creators.</window.Em>
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
            ].map(([ic,t,d])=>(
              <div key={t} style={{padding:'14px', background:'var(--soft)', borderRadius:12, border:'1px solid var(--line)'}}>
                <div style={{fontSize:18, marginBottom:6}}>{ic}</div>
                <div style={{fontWeight:700, fontSize:13, color:'var(--ink)', marginBottom:3}}>{t}</div>
                <div style={{fontSize:12, color:'var(--ink-3)', lineHeight:1.4}}>{d}</div>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT — mission card + cycling insight cards */}
        <div className="reveal reveal-d1 about-mission-card" style={{
          background:'var(--ink)', color:'var(--bone)',
          padding:'44px 36px', borderRadius:28,
          position:'relative', overflow:'hidden',
          display:'flex', flexDirection:'column', gap:24,
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

          {/* Insight cards carousel */}
          <InsightCards/>

          <div style={{position:'relative', display:'flex', gap:10, flexWrap:'wrap'}}>
            {[['📸','Instagram'],['▶️','YouTube'],['🌐','Both platforms']].map(([ic,t])=>(
              <div key={t} style={{display:'flex',alignItems:'center',gap:8,padding:'8px 14px',borderRadius:999,background:'rgba(240,246,232,.07)',border:'1px solid rgba(240,246,232,.1)',fontSize:13,color:'rgba(240,246,232,.75)'}}>
                <span style={{fontSize:15}}>{ic}</span>{t}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* FIXED: CTA is now inside .wrap */}
      <div className="reveal" style={{marginTop:56, textAlign:'center'}}>
        <div style={{display:'flex', gap:12, justifyContent:'center', flexWrap:'wrap'}}>
          <window.Btn primary href="#" onClick={e=>{e.preventDefault();window.scrollToSection&&window.scrollToSection("pricing");}}>View packages →</window.Btn>
          <window.Btn onClick={()=>window.openAuditModal&&window.openAuditModal()}>Get free audit</window.Btn>
        </div>
        <p style={{marginTop:16, fontSize:13, color:'var(--ink-3)'}}>
          Questions? <a href="mailto:info@inflorax.com" style={{color:'var(--accent)',textDecoration:'none',fontWeight:600}}>info@inflorax.com</a>
        </p>
      </div>
    </div>

    <style>{`
      @media(max-width:900px){.about-grid{grid-template-columns:1fr !important;gap:28px}}
      @media(max-width:480px){.about-mission-card{padding:28px 22px !important}}
      @media(max-width:480px){.about-values{grid-template-columns:1fr 1fr !important;gap:10px !important}}
    `}</style>
  </window.Section>
);
window.About = About;
