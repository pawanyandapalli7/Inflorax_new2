// WHO — 3 cards, no redundant header (Problem above already sets the stage)
const audiences = [
  {
    n:'01', tag:'Under 5K',
    t:"Posting… but no one's seeing it",
    d:"You're trying your best. Posting regularly. But your videos don't reach people. You just need that first visibility push.",
    cta:'Get your first push',
  },
  {
    n:'02', tag:'Plateau',
    t:'Your growth suddenly stopped',
    d:"Some posts did okay before. Now everything's slow again — less reach, less engagement. You need momentum back.",
    cta:'Break through the plateau',
  },
  {
    n:'03', tag:'Serious creator',
    t:"Good content. Not enough reach.",
    d:"You care about what you make. You're consistent. But without visibility, even great content stays hidden.",
    cta:'Get the right push forward',
  },
];

const Who = () => (
  <window.Section id="who" padded>
    <div className="wrap">
      <div style={{marginBottom:40}}>
        <span className="reveal" style={window.labelStyle}>This is for you</span>
        <h2 className="wreveal" style={{...window.bigHeadStyle(), fontSize:'clamp(40px,7vw,108px)', marginTop:14}}>
          If you feel stuck.
        </h2>
      </div>
      <div style={{display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:16}} className="who-grid">
        {audiences.map((a,i) => <WhoCard key={i} {...a}/>)}
      </div>
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
    <div style={{marginTop:20, paddingTop:16, borderTop:'1px solid var(--line)', fontSize:13, color:'var(--accent)', fontWeight:600, fontFamily:'var(--serif)', fontStyle:'italic'}}>→ {cta}</div>
  </div>
);

window.Who = Who;
