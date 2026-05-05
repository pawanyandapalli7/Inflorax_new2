// WHO — 3D tilt cards, staggered reveal
const audiences = [
  {n:'01',tag:'Under 5K followers',t:"Posting… but no one's seeing it",d:"You're trying your best. Posting regularly. Following trends. But your videos don't reach people. You're waiting for something to click — but it never does.",cta:'You just need that first visibility push.',icon:'📡'},
  {n:'02',tag:'Plateau',t:'Your growth suddenly stopped',d:"You had some posts doing okay before. But now everything feels slow again. Less reach. Less engagement. And you don't know what changed.",cta:'You need momentum again.',icon:'📉'},
  {n:'03',tag:'Serious creator',t:"You're serious… but something is missing",d:"You care about your content. You want to grow properly. But without visibility, even good content stays hidden.",cta:'You need the right push to move forward.',icon:'🎯'},
];

const Who = () => (
  <window.Section id="who" padded>
    <div className="wrap">
      <div style={{marginBottom:40}}>
        <span className="reveal" style={window.labelStyle}>This is for you</span>
        <h2 className="wreveal" style={{...window.bigHeadStyle(),fontSize:'clamp(40px,7vw,108px)',marginTop:14}}>If you feel stuck<br/>right now.</h2>
        <p className="reveal reveal-d1" style={{marginTop:16,fontSize:16,color:'var(--ink-2)',maxWidth:600,lineHeight:1.6}}>No matter where you are in your journey — this is the stage where most creators struggle.</p>
      </div>
      <div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:16}} className="who-grid">
        {audiences.map((a,i)=><WhoCard key={i} {...a} delay={i*0.08}/>)}
      </div>
    </div>
    <div className="reveal" style={{marginTop:36,textAlign:'center',fontSize:15,fontWeight:600,color:'var(--ink)',fontFamily:'var(--serif)',fontStyle:'italic'}}>
      Wherever you are — this is the stage we help you move past.
    </div>
    <style>{`
      @media(max-width:900px){.who-grid{grid-template-columns:1fr !important}}
      @media(max-width:480px){.who-grid .who-card{padding:20px 18px !important}}
    `}</style>
  </window.Section>
);

const WhoCard = ({n,t,tag,d,cta,icon,delay=0}) => {
  const ref = useRef(null);
  const [vis,setVis] = useState(false);
  const [hov,setHov] = useState(false);
  const [tilt,setTilt] = useState({x:0,y:0});
  const isMob = typeof window!=='undefined'&&('ontouchstart' in window);
  useEffect(()=>{
    const el=ref.current;if(!el)return;
    const io=new IntersectionObserver(([e])=>{if(e.isIntersecting){setVis(true);io.disconnect();}},{threshold:0.15});
    io.observe(el);return()=>io.disconnect();
  },[]);
  const handleMove=(e)=>{
    if(isMob)return;const r=ref.current.getBoundingClientRect();
    setTilt({x:((e.clientX-r.left)/r.width-.5)*10,y:((e.clientY-r.top)/r.height-.5)*-10});
  };
  return (
    <div ref={ref} className="who-card"
      onMouseEnter={()=>setHov(true)} onMouseMove={handleMove}
      onMouseLeave={()=>{setHov(false);setTilt({x:0,y:0});}}
      style={{
        background:'rgba(255,255,255,.85)',border:'1px solid rgba(22,101,52,.15)',borderRadius:20,padding:'28px 24px',
        backdropFilter:'blur(8px)',display:'flex',flexDirection:'column',
        opacity:vis?1:0,
        transform:vis?(hov?`perspective(700px) rotateY(${tilt.x}deg) rotateX(${tilt.y}deg) translateY(-6px) scale(1.02)`:'perspective(700px) rotateY(0) rotateX(0)'):`translateY(36px) scale(.97)`,
        transition:vis?`opacity .6s ease ${delay}s,transform .35s cubic-bezier(.2,.7,.2,1),box-shadow .3s`:`opacity .6s ease ${delay}s,transform .65s cubic-bezier(.2,.7,.2,1) ${delay}s`,
        boxShadow:hov?`${-tilt.x*.5}px ${tilt.y*.5}px 28px rgba(22,101,52,.14),0 1px 0 rgba(255,255,255,.8) inset`:'0 2px 12px rgba(15,31,15,.05)',
        willChange:'transform,opacity',WebkitTapHighlightColor:'transparent',
      }}>
      <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:18}}>
        <div style={{display:'flex',alignItems:'center',gap:10}}>
          <span style={{width:36,height:36,borderRadius:10,background:'rgba(22,101,52,.08)',border:'1px solid rgba(22,101,52,.15)',display:'flex',alignItems:'center',justifyContent:'center',fontSize:18,flexShrink:0}}>{icon}</span>
          <span style={{fontFamily:'var(--mono)',fontSize:11,color:'var(--accent)',fontWeight:600}}>{n}</span>
        </div>
        <span style={{padding:'3px 10px',borderRadius:999,background:'var(--accent-l)',border:'1px solid rgba(22,101,52,.2)',fontSize:10,fontFamily:'var(--mono)',color:'var(--accent)',textTransform:'uppercase',letterSpacing:'.08em'}}>{tag}</span>
      </div>
      <h3 style={{fontFamily:'var(--sans)',fontWeight:800,fontSize:'clamp(18px,2vw,24px)',letterSpacing:'-.02em',lineHeight:1.15,color:'var(--ink)',marginBottom:12}}>{t}</h3>
      <p style={{fontSize:14,lineHeight:1.6,color:'var(--ink-2)',flex:1}}>{d}</p>
      <a href="#" onClick={e=>{e.preventDefault();window.scrollToSection&&window.scrollToSection("pricing");}} style={{marginTop:20,paddingTop:16,borderTop:'1px solid var(--line)',fontSize:13,color:'var(--accent)',fontWeight:600,fontFamily:'var(--serif)',fontStyle:'italic',display:'flex',alignItems:'center',gap:6,textDecoration:'none',transition:'gap .2s'}}
      onMouseEnter={e=>e.currentTarget.style.gap='12px'}
      onMouseLeave={e=>e.currentTarget.style.gap='6px'}>→ {cta}</a>
    </div>
  );
};
window.Who = Who;
