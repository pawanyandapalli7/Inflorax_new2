// WHO — redesigned mobile-first cards with gradient accents
const audiences = [
  {
    n:'01', tag:'Under 5K followers',
    t:"Posting… but no one's seeing it",
    d:"You're trying your best. Posting regularly. Following trends. But your videos don't reach people. You're waiting for something to click — but it never does.",
    cta:'You just need that first visibility push.',
    icon:'📡',
    grad:'linear-gradient(135deg,#0d2818,#1a4a2e)',
    accent:'#4ade80',
    stat:'93%', statLabel:'of creators feel this way early on',
  },
  {
    n:'02', tag:'Plateau',
    t:'Your growth suddenly stopped',
    d:"You had some posts doing okay before. But now everything feels slow again. Less reach. Less engagement. And you don't know what changed.",
    cta:'You need momentum again.',
    icon:'📉',
    grad:'linear-gradient(135deg,#1e0d18,#3a1a2e)',
    accent:'#f472b6',
    stat:'72%', statLabel:'of Reels reach fewer than 500 people',
  },
  {
    n:'03', tag:'Serious creator',
    t:"You're serious… but something is missing",
    d:"You care about your content. You want to grow properly. But without visibility, even good content stays hidden.",
    cta:'You need the right push to move forward.',
    icon:'🎯',
    grad:'linear-gradient(135deg,#0f1e2e,#1a3a4a)',
    accent:'#60c8f0',
    stat:'4×', statLabel:'more reach with targeted promotion',
  },
];

const Who = () => (
  <window.Section id="who" padded>
    <div className="wrap">
      <div style={{marginBottom:36}}>
        <span className="reveal" style={window.labelStyle}>This is for you</span>
        <h2 className="wreveal" style={{...window.bigHeadStyle(), fontSize:'clamp(40px,7vw,108px)', marginTop:14}}>
          If you feel stuck<br/>right now.
        </h2>
        <p className="reveal reveal-d1" style={{marginTop:14, fontSize:16, color:'var(--ink-2)', maxWidth:560, lineHeight:1.6}}>
          No matter where you are in your journey — this is the stage where most creators struggle.
        </p>
      </div>

      {/* Desktop: 3-col grid */}
      <div style={{display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:16}} className="who-grid-desktop">
        {audiences.map((a,i) => <WhoCardDesktop key={i} {...a} delay={i*0.08}/>)}
      </div>

      {/* Mobile: full-width stacked cards */}
      <div className="who-grid-mobile" style={{display:'none', flexDirection:'column', gap:16}}>
        {audiences.map((a,i) => <WhoCardMobile key={i} {...a} delay={i*0.08}/>)}
      </div>
    </div>

    <div className="reveal" style={{marginTop:32, textAlign:'center', fontSize:15, fontWeight:600, color:'var(--ink)', fontFamily:'var(--serif)', fontStyle:'italic'}}>
      Wherever you are — this is the stage we help you move past.
    </div>

    <style>{`
      @media(max-width:900px){.who-grid-desktop{display:none !important}.who-grid-mobile{display:flex !important}}
    `}</style>
  </window.Section>
);

// Desktop card — existing 3D tilt
const WhoCardDesktop = ({n,t,tag,d,cta,icon,delay=0}) => {
  const ref = useRef(null);
  const [vis,setVis] = useState(false);
  const [hov,setHov] = useState(false);
  const [tilt,setTilt] = useState({x:0,y:0});
  useEffect(()=>{
    const el=ref.current;if(!el)return;
    const io=new IntersectionObserver(([e])=>{if(e.isIntersecting){setVis(true);io.disconnect();}},{threshold:0.15});
    io.observe(el);return()=>io.disconnect();
  },[]);
  const handleMove=(e)=>{
    if(window.matchMedia('(hover:none)').matches)return;
    const r=ref.current.getBoundingClientRect();
    setTilt({x:((e.clientX-r.left)/r.width-.5)*10,y:((e.clientY-r.top)/r.height-.5)*-10});
  };
  return (
    <div ref={ref} className="who-card"
      onMouseEnter={()=>setHov(true)} onMouseMove={handleMove}
      onMouseLeave={()=>{setHov(false);setTilt({x:0,y:0});}}
      style={{
        background:'rgba(255,255,255,.88)',border:'1px solid rgba(22,101,52,.15)',
        borderRadius:20,padding:'26px 22px',backdropFilter:'blur(8px)',
        display:'flex',flexDirection:'column',
        opacity:vis?1:0,
        transform:vis?(hov?`perspective(700px) rotateY(${tilt.x}deg) rotateX(${tilt.y}deg) translateY(-6px) scale(1.02)`:'perspective(700px) rotateY(0) rotateX(0)'):`translateY(36px) scale(.97)`,
        transition:vis?`opacity .6s ease ${delay}s,transform .35s cubic-bezier(.2,.7,.2,1),box-shadow .3s`:`opacity .6s ease ${delay}s,transform .65s cubic-bezier(.2,.7,.2,1) ${delay}s`,
        boxShadow:hov?'0 12px 36px rgba(22,101,52,.14)':'0 2px 12px rgba(15,31,15,.05)',
        willChange:'transform,opacity',WebkitTapHighlightColor:'transparent',
      }}>
      <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:18}}>
        <div style={{display:'flex',alignItems:'center',gap:10}}>
          <span style={{width:36,height:36,borderRadius:10,background:'rgba(22,101,52,.08)',border:'1px solid rgba(22,101,52,.15)',display:'flex',alignItems:'center',justifyContent:'center',fontSize:18,flexShrink:0}}>{icon}</span>
          <span style={{fontFamily:'var(--mono)',fontSize:11,color:'var(--accent)',fontWeight:600}}>{n}</span>
        </div>
        <span style={{padding:'3px 10px',borderRadius:999,background:'var(--accent-l)',border:'1px solid rgba(22,101,52,.2)',fontSize:10,fontFamily:'var(--mono)',color:'var(--accent)',textTransform:'uppercase',letterSpacing:'.08em'}}>{tag}</span>
      </div>
      <h3 style={{fontFamily:'var(--sans)',fontWeight:800,fontSize:'clamp(17px,1.8vw,22px)',letterSpacing:'-.02em',lineHeight:1.15,color:'var(--ink)',marginBottom:10}}>{t}</h3>
      <p style={{fontSize:14,lineHeight:1.65,color:'var(--ink-2)',flex:1}}>{d}</p>
      <a href="#" onClick={e=>{e.preventDefault();window.scrollToSection&&window.scrollToSection("pricing");}} style={{marginTop:18,paddingTop:14,borderTop:'1px solid var(--line)',fontSize:13,color:'var(--accent)',fontWeight:600,fontFamily:'var(--serif)',fontStyle:'italic',display:'flex',alignItems:'center',gap:6,textDecoration:'none',transition:'gap .2s'}}
      onMouseEnter={e=>e.currentTarget.style.gap='12px'}
      onMouseLeave={e=>e.currentTarget.style.gap='6px'}>→ {cta}</a>
    </div>
  );
};

// Mobile card — horizontal layout with dark accent bar + stat
const WhoCardMobile = ({n,t,tag,d,cta,icon,grad,accent,stat,statLabel,delay=0}) => {
  const ref = useRef(null);
  const [vis,setVis] = useState(false);
  useEffect(()=>{
    const el=ref.current;if(!el)return;
    const io=new IntersectionObserver(([e])=>{if(e.isIntersecting){setVis(true);io.disconnect();}},{threshold:0.12});
    io.observe(el);return()=>io.disconnect();
  },[]);
  return (
    <div ref={ref} style={{
      borderRadius:20, overflow:'hidden',
      border:'1px solid var(--line)',
      opacity:vis?1:0,
      transform:vis?'translateY(0)':'translateY(20px)',
      transition:`opacity .5s ease ${delay}s, transform .5s ease ${delay}s`,
      boxShadow:'0 2px 16px rgba(15,31,15,.06)',
    }}>
      {/* Dark header bar */}
      <div style={{background:grad, padding:'18px 20px', position:'relative', overflow:'hidden'}}>
        <div style={{position:'absolute',top:-30,right:-30,width:120,height:120,borderRadius:'50%',background:accent,opacity:.12,filter:'blur(30px)'}}/>
        <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',position:'relative'}}>
          <div style={{display:'flex',alignItems:'center',gap:10}}>
            <span style={{fontSize:24}}>{icon}</span>
            <div>
              <div style={{fontFamily:'var(--mono)',fontSize:9,color:'rgba(255,255,255,.4)',letterSpacing:'.1em',textTransform:'uppercase',marginBottom:2}}>{n}</div>
              <h3 style={{fontFamily:'var(--sans)',fontWeight:800,fontSize:17,letterSpacing:'-.025em',lineHeight:1.1,color:'#fff',margin:0}}>{t}</h3>
            </div>
          </div>
          <span style={{
            padding:'3px 10px',borderRadius:999,
            background:'rgba(255,255,255,.12)',border:'1px solid rgba(255,255,255,.18)',
            fontSize:9,fontFamily:'var(--mono)',color:'rgba(255,255,255,.8)',
            textTransform:'uppercase',letterSpacing:'.08em',flexShrink:0,
          }}>{tag}</span>
        </div>
        {/* Stat */}
        <div style={{marginTop:14,display:'flex',alignItems:'center',gap:10,position:'relative'}}>
          <span style={{fontFamily:'var(--sans)',fontWeight:900,fontSize:28,color:accent,letterSpacing:'-.03em',lineHeight:1}}>{stat}</span>
          <span style={{fontSize:12,color:'rgba(255,255,255,.5)',lineHeight:1.3}}>{statLabel}</span>
        </div>
      </div>
      {/* White body */}
      <div style={{background:'#fff',padding:'16px 20px'}}>
        <p style={{fontSize:14,lineHeight:1.65,color:'var(--ink-2)',margin:0}}>{d}</p>
        <a href="#" onClick={e=>{e.preventDefault();window.scrollToSection&&window.scrollToSection("pricing");}} style={{
          marginTop:14,paddingTop:12,borderTop:'1px solid var(--line)',
          fontSize:13,color:'var(--accent)',fontWeight:700,
          fontFamily:'var(--serif)',fontStyle:'italic',
          display:'flex',alignItems:'center',gap:6,textDecoration:'none',
          WebkitTapHighlightColor:'transparent',
        }}>→ {cta}</a>
      </div>
    </div>
  );
};

window.Who = Who;
