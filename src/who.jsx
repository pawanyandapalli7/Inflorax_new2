// WHO — 3 cards, no redundant header (Problem above already sets the stage)
const audiences = [
  {
    n:'01', tag:'Under 5K followers',
    t:"Posting… but no one's seeing it",
    d:"You're trying your best. Posting regularly. Following trends. But your videos don't reach people. You're waiting for something to click — but it never does.",
    cta:'You just need that first visibility push.',
  },
  {
    n:'02', tag:'Plateau',
    t:'Your growth suddenly stopped',
    d:"You had some posts doing okay before. But now everything feels slow again. Less reach. Less engagement. And you don't know what changed.",
    cta:'You need momentum again.',
  },
  {
    n:'03', tag:'Serious creator',
    t:"You're serious… but something is missing",
    d:"You care about your content. You want to grow properly. But without visibility, even good content stays hidden.",
    cta:'You need the right push to move forward.',
  },
];

const Who = () => (
  <window.Section id="who" padded>
    <div className="wrap">
      <div style={{marginBottom:40}}>
        <span className="reveal" style={window.labelStyle}>This is for you</span>
        <h2 className="wreveal" style={{...window.bigHeadStyle(), fontSize:'clamp(40px,7vw,108px)', marginTop:14}}>
          If you feel stuck<br/>right now.
        </h2>
        <p className="reveal reveal-d1" style={{marginTop:16, fontSize:16, color:'var(--ink-2)', maxWidth:600, lineHeight:1.6}}>
          No matter where you are in your journey — this is the stage where most creators struggle.
        </p>
      </div>
      <div style={{display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:16}} className="who-grid">
        {audiences.map((a,i) => <WhoCard key={i} {...a}/>)}
      </div>
    </div>
    <div className="reveal" style={{marginTop:36, textAlign:'center', fontSize:15, fontWeight:600, color:'var(--ink)', fontFamily:'var(--serif)', fontStyle:'italic'}}>
      Wherever you are — this is the stage we help you move past.
    </div>
    <style>{`
      @media(max-width:900px){.who-grid{grid-template-columns:1fr !important}}
      @media(max-width:480px){.who-grid .who-card{padding:20px 18px !important}}
    `}</style>
  </window.Section>
);

const WhoCard = ({n,t,tag,d,cta}) => (
  <div className="reveal who-card" style={{
    background:'rgba(255,255,255,.85)', border:'1px solid rgba(22,101,52,.15)',
    borderRadius:20, padding:'28px 24px',
    transition:'transform .25s, border-color .25s, box-shadow .25s',
    backdropFilter:'blur(8px)', display:'flex', flexDirection:'column',
  }}
  onMouseEnter={e=>{e.currentTarget.style.transform='translateY(-5px)';e.currentTarget.style.borderColor='var(--accent)';e.currentTarget.style.boxShadow='0 12px 36px rgba(22,101,52,.1)';}}
  onMouseLeave={e=>{e.currentTarget.style.transform='none';e.currentTarget.style.borderColor='var(--line)';e.currentTarget.style.boxShadow='none';}}>
    <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:20}}>
      <span style={{fontFamily:'var(--mono)', fontSize:11, color:'var(--accent)', fontWeight:600}}>{n}</span>
      <span style={{padding:'3px 10px', borderRadius:999, background:'var(--accent-l)', border:'1px solid rgba(22,101,52,.2)', fontSize:10, fontFamily:'var(--mono)', color:'var(--accent)', textTransform:'uppercase', letterSpacing:'.08em'}}>{tag}</span>
    </div>
    <h3 style={{fontFamily:'var(--sans)', fontWeight:800, fontSize:'clamp(18px,2vw,24px)', letterSpacing:'-.02em', lineHeight:1.15, color:'var(--ink)', marginBottom:12}}>{t}</h3>
    <p style={{fontSize:14, lineHeight:1.6, color:'var(--ink-2)', flex:1}}>{d}</p>
    <a href="#" onClick={e=>{e.preventDefault();window.scrollToSection&&window.scrollToSection("pricing");}} style={{marginTop:20, paddingTop:16, borderTop:'1px solid var(--line)', fontSize:13, color:'var(--accent)', fontWeight:600, fontFamily:'var(--serif)', fontStyle:'italic', display:'block', textDecoration:'none', transition:'opacity .2s'}} onMouseEnter={e=>e.currentTarget.style.opacity='.7'} onMouseLeave={e=>e.currentTarget.style.opacity='1'}>→ {cta}</a>
  </div>
);

window.Who = Who;
