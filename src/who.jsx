// WHO — 3 audience cards
const audiences = [
  {n:'01', t:'You\'re posting… but no one is seeing it', tag:'Under 5K followers', d:'You\'re trying your best. Posting regularly. Following trends. But your videos don\'t reach people. You\'re waiting for something to click — but it never does.', cta:'You just need that first visibility push.'},
  {n:'02', t:'Your growth suddenly stopped', tag:'Hit a plateau', d:'You had some posts doing okay before. But now everything feels slow again. Less reach. Less engagement. And you don\'t know what changed.', cta:'You need momentum again.'},
  {n:'03', t:'You\'re serious… but something is missing', tag:'Serious about growth', d:'You care about your content. You want to grow properly. But without visibility, even good content stays hidden.', cta:'You need the right push to move forward.'},
];

const Who = () => {
  const dir = window.useDir();
  return (
    <window.Section id="who" padded>
      <div className="wrap">
        <header style={{textAlign:'center', marginBottom:60, maxWidth:780, margin:'0 auto 60px'}}>
          <span className="reveal" style={window.labelStyle}>This is for you</span>
          <h2 className="reveal reveal-d1" style={{...window.bigHeadStyle(dir), fontSize:'clamp(40px, 6vw, 88px)', marginTop:18}}>
            {dir==='editorial' && <>This is for you…<br/>if you feel <window.Em>stuck right now.</window.Em></>}
            {dir==='kinetic'   && <>If you feel<br/><window.Em>stuck right now.</window.Em></>}
            {dir==='grid'      && <>This is for you<br/>if you feel <window.Em>stuck right now.</window.Em></>}
          </h2>
          <p className="reveal reveal-d2" style={{marginTop:22, fontSize:16, color:'var(--ink-2)', lineHeight:1.55}}>
            No matter where you are in your journey — this is the stage where most creators struggle.
          </p>
        </header>

        <div style={{display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(300px, 1fr))', gap:dir==='grid' ? 0 : 20}}>
          {audiences.map((a,i) => <WhoCard key={i} {...a} idx={i}/>)}
        </div>

        <p className="reveal" style={{textAlign:'center', marginTop:40, fontSize:15, color:'var(--ink-3)'}}>👉 Wherever you are — this is the stage we help you move past.</p>
      </div>
    </window.Section>
  );
};

const WhoCard = ({n,t,tag,d,cta, idx}) => {
  const dir = window.useDir();
  return (
    <div className="reveal" style={{
      background:'#fff', border:'1px solid var(--line)',
      borderRadius:dir==='grid' ? 0 : 22,
      padding:'32px 28px',
      marginLeft: dir==='grid' && idx>0 ? -1 : 0,
      transition:'transform .3s, box-shadow .3s',
      cursor:'default',
    }}
    onMouseEnter={e => {e.currentTarget.style.transform='translateY(-4px)'; e.currentTarget.style.boxShadow='0 24px 60px -30px rgba(14,26,14,.25)'}}
    onMouseLeave={e => {e.currentTarget.style.transform='none'; e.currentTarget.style.boxShadow='none'}}>
      <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:20}}>
        <span style={{fontFamily:'var(--mono)', fontSize:13, color:'var(--accent)', fontWeight:600}}>{n}</span>
        <span style={{padding:'4px 10px', borderRadius:999, background:'var(--soft)', fontSize:11, fontFamily:'var(--mono)', color:'var(--ink-2)', textTransform:'uppercase', letterSpacing:'.08em'}}>{tag}</span>
      </div>
      <h3 style={{
        fontFamily:dir==='editorial'?'var(--serif)':'var(--sans)',
        fontStyle:dir==='editorial'?'italic':'normal',
        fontWeight:dir==='editorial'?500:700,
        fontSize:'clamp(22px, 2.6vw, 30px)', letterSpacing:'-.02em', lineHeight:1.1, color:'var(--ink)',
      }}>{t}</h3>
      <p style={{marginTop:18, fontSize:15, lineHeight:1.55, color:'var(--ink-2)'}}>{d}</p>
      <div style={{marginTop:24, paddingTop:20, borderTop:'1px solid var(--line)', fontSize:14, color:'var(--accent)', fontWeight:600}}>👉 {cta}</div>
    </div>
  );
};

window.Who = Who;
