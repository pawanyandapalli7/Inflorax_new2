// Insight cards — cycling "Did you know?" facts
const insightCards = [
  {
    line1: "Most creators only reach people they already know.",
    line2: "Real growth starts when strangers begin seeing your content.",
  },
  {
    line1: "Low reach doesn't always mean low-quality content.",
    line2: "Sometimes the algorithm simply hasn't understood your audience yet.",
  },
  {
    line1: "Most creators think they need a better camera…",
    line2: "when they actually need better visibility.",
  },
  {
    line1: "A Reel shown to the wrong audience can completely fail…",
    line2: "the same Reel can go viral with the right one.",
  },
  {
    line1: "Many creators quit during the exact phase",
    line2: "where growth is about to begin.",
  },
];

const InsightCards = () => {
  const [idx, setIdx] = useState(0);
  const [animating, setAnimating] = useState(false);
  const [direction, setDirection] = useState(1); // 1 = forward, -1 = back

  const goTo = (next, dir=1) => {
    if (animating) return;
    setAnimating(true);
    setDirection(dir);
    setTimeout(() => {
      setIdx(next);
      setAnimating(false);
    }, 320);
  };

  const prev = () => goTo((idx - 1 + insightCards.length) % insightCards.length, -1);
  const next = () => goTo((idx + 1) % insightCards.length, 1);

  // Auto-advance every 4s
  useEffect(() => {
    const id = setInterval(() => goTo((idx + 1) % insightCards.length, 1), 4000);
    return () => clearInterval(id);
  }, [idx, animating]);

  const card = insightCards[idx];

  return (
    <div style={{position:'relative'}}>
      {/* Header */}
      <div style={{
        display:'flex', alignItems:'center', justifyContent:'space-between',
        marginBottom:10,
      }}>
        <div style={{display:'flex', alignItems:'center', gap:8}}>
          <span style={{
            width:6, height:6, borderRadius:'50%', background:'var(--accent)',
            animation:'insightPulse 2s ease-in-out infinite',
            display:'inline-block',
          }}/>
          <span style={{
            fontFamily:'var(--mono)', fontSize:9, letterSpacing:'.16em',
            textTransform:'uppercase', color:'rgba(240,246,232,.4)',
          }}>Did you know?</span>
        </div>
        {/* Dot indicators */}
        <div style={{display:'flex', gap:5, alignItems:'center'}}>
          {insightCards.map((_,i) => (
            <button key={i} onClick={() => goTo(i, i > idx ? 1 : -1)} style={{
              width: i===idx ? 16 : 5, height:5, borderRadius:999,
              background: i===idx ? 'var(--accent)' : 'rgba(240,246,232,.2)',
              border:'none', cursor:'pointer', padding:0,
              transition:'width .3s, background .3s',
              WebkitTapHighlightColor:'transparent',
            }}/>
          ))}
        </div>
      </div>

      {/* Card */}
      <div style={{
        background:'rgba(240,246,232,.06)',
        border:'1px solid rgba(240,246,232,.1)',
        borderRadius:16, padding:'18px 18px',
        minHeight:90,
        position:'relative', overflow:'hidden',
      }}>
        {/* Subtle accent line left */}
        <div style={{
          position:'absolute', left:0, top:16, bottom:16,
          width:2, borderRadius:999, background:'var(--accent)', opacity:.6,
        }}/>

        <div style={{
          paddingLeft:12,
          opacity: animating ? 0 : 1,
          transform: animating
            ? `translateX(${direction * 12}px)`
            : 'translateX(0)',
          transition:'opacity .32s ease, transform .32s ease',
        }}>
          <p style={{
            fontSize:14, lineHeight:1.6,
            color:'rgba(240,246,232,.85)',
            fontFamily:'var(--serif)', fontStyle:'italic', fontWeight:300,
            margin:0,
          }}>
            {card.line1}
          </p>
          <p style={{
            fontSize:14, lineHeight:1.6,
            color:'var(--accent)',
            fontFamily:'var(--serif)', fontStyle:'italic', fontWeight:400,
            margin:'4px 0 0',
          }}>
            {card.line2}
          </p>
        </div>
      </div>

      {/* Prev / Next */}
      <div style={{display:'flex', justifyContent:'flex-end', gap:6, marginTop:8}}>
        {[['←', prev], ['→', next]].map(([label, fn]) => (
          <button key={label} onClick={fn} style={{
            width:28, height:28, borderRadius:'50%',
            border:'1px solid rgba(240,246,232,.15)',
            background:'transparent', color:'rgba(240,246,232,.5)',
            fontSize:12, cursor:'pointer', display:'flex',
            alignItems:'center', justifyContent:'center',
            transition:'border-color .2s, color .2s, background .2s',
            WebkitTapHighlightColor:'transparent',
          }}
          onMouseEnter={e=>{e.currentTarget.style.borderColor='var(--accent)';e.currentTarget.style.color='var(--accent)';e.currentTarget.style.background='rgba(22,101,52,.15)';}}
          onMouseLeave={e=>{e.currentTarget.style.borderColor='rgba(240,246,232,.15)';e.currentTarget.style.color='rgba(240,246,232,.5)';e.currentTarget.style.background='transparent';}}
          >{label}</button>
        ))}
      </div>

      <style>{`@keyframes insightPulse{0%,100%{opacity:.4;transform:scale(1)}50%{opacity:1;transform:scale(1.4)}}`}</style>
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
