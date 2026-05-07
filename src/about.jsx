// ABOUT — two sections: Studio info + standalone Did You Know cards

// ── DID YOU KNOW standalone section ──────────────────────────────────────
const didYouKnowCards = [
  {
    emoji: '👁️',
    tag: 'Visibility',
    bg: 'linear-gradient(145deg,#0a1f10,#0f3320,#0d2418)',
    accent: '#4ade80',
    front: 'Most creators only reach people they already know.',
    back: 'Real growth starts when strangers begin seeing your content.',
  },
  {
    emoji: '📉',
    tag: 'Reach',
    bg: 'linear-gradient(145deg,#0a121f,#0f2035,#0c1828)',
    accent: '#60c8f0',
    front: "Low reach doesn't always mean low-quality content.",
    back: "Sometimes the algorithm simply hasn't understood your audience yet.",
  },
  {
    emoji: '📷',
    tag: 'Mindset',
    bg: 'linear-gradient(145deg,#1a150a,#2e2010,#1c1508)',
    accent: '#fbbf24',
    front: 'Most creators think they need a better camera…',
    back: 'when they actually need better visibility.',
  },
  {
    emoji: '🎯',
    tag: 'Audience',
    bg: 'linear-gradient(145deg,#1a0a14,#2e1022,#180810)',
    accent: '#f472b6',
    front: 'A Reel shown to the wrong audience can completely fail…',
    back: 'The same Reel can go viral with the right one.',
  },
  {
    emoji: '🚀',
    tag: 'Growth',
    bg: 'linear-gradient(145deg,#0a1a12,#0f2e1a,#081508)',
    accent: '#34d399',
    front: 'Many creators quit during the exact phase',
    back: 'where growth is about to begin.',
  },
];

const DidYouKnowCard = ({card, i}) => {
  const ref = useRef(null);
  const [vis, setVis] = useState(false);
  const [flipped, setFlipped] = useState(false);

  useEffect(() => {
    const el = ref.current; if (!el) return;
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setVis(true); io.disconnect(); }
    }, {threshold: 0.15});
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={ref} style={{
      flexShrink: 0,
      width: 'clamp(280px,80vw,340px)',
      scrollSnapAlign: 'start',
      opacity: vis ? 1 : 0,
      transform: vis ? 'translateY(0)' : 'translateY(24px)',
      transition: `opacity .5s ease ${i * 0.08}s, transform .5s ease ${i * 0.08}s`,
    }}>
      <div
        onClick={() => setFlipped(f => !f)}
        style={{cursor: 'pointer', perspective: 1000, WebkitTapHighlightColor: 'transparent'}}
      >
        <div style={{
          position: 'relative',
          width: '100%',
          height: 340,
          transformStyle: 'preserve-3d',
          transform: flipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
          transition: 'transform .6s cubic-bezier(.4,0,.2,1)',
        }}>

          {/* FRONT */}
          <div style={{
            position: 'absolute', inset: 0,
            backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden',
            borderRadius: 24, background: card.bg,
            border: '1px solid rgba(255,255,255,.07)',
            overflow: 'hidden', display: 'flex', flexDirection: 'column',
          }}>
            {/* Glow */}
            <div style={{position:'absolute',top:-50,right:-50,width:180,height:180,borderRadius:'50%',background:card.accent,opacity:.12,filter:'blur(40px)',pointerEvents:'none'}}/>
            {/* Image area */}
            <div style={{
              flex: '0 0 180px',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              position: 'relative', overflow: 'hidden',
              background: `radial-gradient(ellipse at 50% 70%, ${card.accent}15, transparent 70%)`,
            }}>
              <div style={{position:'absolute',top:14,left:14,padding:'4px 12px',borderRadius:999,background:'rgba(255,255,255,.09)',border:'1px solid rgba(255,255,255,.13)',fontSize:9,fontFamily:'var(--mono)',letterSpacing:'.14em',textTransform:'uppercase',color:'rgba(255,255,255,.55)'}}>
                {card.tag}
              </div>
              <div style={{fontSize:72,filter:'drop-shadow(0 8px 24px rgba(0,0,0,.4))',animation:`cardBob${i} 3s ease-in-out infinite`}}>{card.emoji}</div>
              <div style={{position:'absolute',bottom:0,left:0,right:0,height:60,background:'linear-gradient(to bottom,transparent,rgba(0,0,0,.4))'}}/>
            </div>
            {/* Text */}
            <div style={{flex: 1, padding: '20px 22px 18px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between'}}>
              <p style={{fontSize:15,lineHeight:1.6,color:'rgba(240,246,232,.9)',fontFamily:'var(--serif)',fontStyle:'italic',margin:0}}>
                {card.front}
              </p>
              <div style={{display:'flex',alignItems:'center',gap:8,fontSize:9,fontFamily:'var(--mono)',color:'rgba(255,255,255,.25)',letterSpacing:'.1em',textTransform:'uppercase',marginTop:14}}>
                <span style={{width:20,height:1,background:'rgba(255,255,255,.2)',display:'inline-block'}}/>
                Tap to reveal
              </div>
            </div>
          </div>

          {/* BACK */}
          <div style={{
            position: 'absolute', inset: 0,
            backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)',
            borderRadius: 24,
            background: card.bg,
            border: `1.5px solid ${card.accent}44`,
            boxShadow: `0 0 50px ${card.accent}18`,
            overflow: 'hidden',
            display: 'flex', flexDirection: 'column', justifyContent: 'center',
            padding: '32px 28px',
          }}>
            <div style={{position:'absolute',top:-40,right:-40,width:200,height:200,borderRadius:'50%',background:card.accent,opacity:.1,filter:'blur(50px)'}}/>
            <div style={{position:'absolute',bottom:-50,left:-30,width:160,height:160,borderRadius:'50%',background:card.accent,opacity:.07,filter:'blur(40px)'}}/>
            <div style={{position:'relative'}}>
              <div style={{fontSize:48, marginBottom:20}}>{card.emoji}</div>
              <p style={{
                fontSize:22, lineHeight:1.5,
                color: card.accent,
                fontFamily:'var(--serif)', fontStyle:'italic', fontWeight:400,
                margin: 0,
              }}>{card.back}</p>
              <div style={{marginTop:24,display:'flex',alignItems:'center',gap:8,fontSize:9,fontFamily:'var(--mono)',color:'rgba(255,255,255,.22)',letterSpacing:'.1em',textTransform:'uppercase'}}>
                <span style={{width:20,height:1,background:'rgba(255,255,255,.15)',display:'inline-block'}}/>
                Tap to flip back
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const DidYouKnowSection = () => {
  const ref = useRef(null);
  const [vis, setVis] = useState(false);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVis(true); io.disconnect(); } }, {threshold: 0.1});
    io.observe(el); return () => io.disconnect();
  }, []);

  return (
    <window.Section id="did-you-know" padded>
      <div className="wrap">
        {/* Header */}
        <div ref={ref} style={{marginBottom: 36}}>
          <span style={{...window.labelStyle, opacity: vis ? 1 : 0, transition: 'opacity .5s'}}>Did you know?</span>
          <h2 style={{
            ...window.bigHeadStyle(), fontSize: 'clamp(36px,5.5vw,80px)', marginTop: 12,
            opacity: vis ? 1 : 0, transform: vis ? 'none' : 'translateY(16px)',
            transition: 'opacity .6s .08s, transform .6s .08s',
          }}>
            The truth about<br/><window.Em>creator growth.</window.Em>
          </h2>
          <p style={{
            marginTop: 14, fontSize: 16, color: 'var(--ink-2)', maxWidth: 520, lineHeight: 1.6,
            opacity: vis ? 1 : 0, transition: 'opacity .6s .14s',
          }}>
            Tap any card to reveal what's really holding most creators back.
          </p>
        </div>

        {/* Horizontal scroll on mobile, grid on desktop */}
        <div className="dyk-scroll" style={{
          display: 'flex', gap: 16,
          overflowX: 'auto', paddingBottom: 16,
          scrollSnapType: 'x mandatory',
          WebkitOverflowScrolling: 'touch',
          scrollbarWidth: 'none',
          marginLeft: -20, marginRight: -20,
          paddingLeft: 20, paddingRight: 20,
        }}>
          {didYouKnowCards.map((card, i) => (
            <DidYouKnowCard key={i} card={card} i={i}/>
          ))}
          <div style={{flexShrink: 0, width: 4}}/>
        </div>

        {/* Swipe hint on mobile */}
        <p className="dyk-swipe-hint" style={{
          display: 'none', textAlign: 'center', marginTop: 4,
          fontFamily: 'var(--mono)', fontSize: 10, color: 'var(--ink-4)',
          letterSpacing: '.1em', textTransform: 'uppercase',
        }}>← swipe to explore →</p>
      </div>

      <style>{`
        @keyframes cardBob0{0%,100%{transform:translateY(0)}50%{transform:translateY(-6px)}}
        @keyframes cardBob1{0%,100%{transform:translateY(-3px)}50%{transform:translateY(4px)}}
        @keyframes cardBob2{0%,100%{transform:translateY(0)}50%{transform:translateY(-5px)}}
        @keyframes cardBob3{0%,100%{transform:translateY(-2px)}50%{transform:translateY(5px)}}
        @keyframes cardBob4{0%,100%{transform:translateY(0)}50%{transform:translateY(-4px)}}
        @media(min-width:900px){
          .dyk-scroll{
            display:grid !important;
            grid-template-columns:repeat(5,1fr) !important;
            overflow:visible !important;
            margin-left:0 !important; margin-right:0 !important;
            padding-left:0 !important; padding-right:0 !important;
          }
          .dyk-scroll > div { width:auto !important; }
        }
        @media(max-width:899px){
          .dyk-swipe-hint{display:block !important}
        }
      `}</style>
    </window.Section>
  );
};

// ── ABOUT studio section ──────────────────────────────────────────────────
const About = () => (
  <>
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
              ].map(([ic,t,d]) => (
                <div key={t} style={{padding:'16px', background:'var(--soft)', borderRadius:14, border:'1px solid var(--line)'}}>
                  <div style={{fontSize:20, marginBottom:8}}>{ic}</div>
                  <div style={{fontWeight:700, fontSize:13, color:'var(--ink)', marginBottom:3}}>{t}</div>
                  <div style={{fontSize:12, color:'var(--ink-3)', lineHeight:1.4}}>{d}</div>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT — mission card */}
          <div className="reveal reveal-d1 about-mission-card" style={{
            background:'var(--ink)', color:'var(--bone)',
            padding:'44px 36px', borderRadius:28,
            position:'relative', overflow:'hidden',
            display:'flex', flexDirection:'column', justifyContent:'center', gap:28,
          }}>
            <div style={{position:'absolute',top:-60,right:-60,width:240,height:240,borderRadius:'50%',background:'var(--accent)',opacity:.12,filter:'blur(80px)'}}/>
            <div style={{position:'absolute',bottom:-80,left:-40,width:200,height:200,borderRadius:'50%',background:'var(--accent)',opacity:.08,filter:'blur(60px)'}}/>

            <div style={{position:'relative'}}>
              <span style={{...window.labelStyle, color:'rgba(240,246,232,.4)', display:'inline-flex'}}>Our mission</span>
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

            <div style={{position:'relative', display:'flex', gap:10, flexWrap:'wrap'}}>
              {[['📸','Instagram'],['▶️','YouTube'],['🌐','Both platforms']].map(([ic,t]) => (
                <div key={t} style={{display:'flex',alignItems:'center',gap:8,padding:'8px 14px',borderRadius:999,background:'rgba(240,246,232,.07)',border:'1px solid rgba(240,246,232,.1)',fontSize:13,color:'rgba(240,246,232,.75)'}}>
                  <span style={{fontSize:15}}>{ic}</span>{t}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="reveal" style={{marginTop:56, textAlign:'center'}}>
          <div style={{display:'flex', gap:12, justifyContent:'center', flexWrap:'wrap'}}>
            <window.Btn primary href="#" onClick={e=>{e.preventDefault();window.scrollToSection&&window.scrollToSection("pricing");}}>View packages →</window.Btn>
            <window.Btn onClick={() => window.openAuditModal && window.openAuditModal()}>Get free audit</window.Btn>
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

    {/* Did You Know — separate section */}
    <DidYouKnowSection/>
  </>
);

window.About = About;
