// WHO — 3 audience cards (dark)
const audiences = [
  {n:'01', t:"Posting… but no one's seeing", tag:'Under 5K', d:"Trying your best. Posting regularly. Following trends. But your videos don't reach people.", cta:'You need that first visibility push.'},
  {n:'02', t:'Your growth suddenly stopped', tag:'Plateau', d:"Some posts did okay before. Now everything's slow again. Less reach. Less engagement.", cta:'You need momentum again.'},
  {n:'03', t:"Serious… but something's missing", tag:'Serious', d:"You care about your content. You want to grow properly. But without visibility, even good content stays hidden.", cta:'You need the right push.'},
];

const Who = () => {
  return (
    <window.Section id="who" padded>
      <div className="wrap">
        <header style={{textAlign:'center', marginBottom:48, maxWidth:780, margin:'0 auto 48px'}}>
          <span className="reveal" style={window.labelStyle}>This is for you</span>
          <h2 className="wreveal" style={{...window.bigHeadStyle(), fontSize:'clamp(44px, 8vw, 132px)', marginTop:18}}>
            If you feel stuck.
          </h2>
        </header>
        <div style={{display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(280px, 1fr))', gap:16}}>
          {audiences.map((a,i) => <WhoCard key={i} {...a} idx={i}/>)}
        </div>
      </div>
    </window.Section>
  );
};

const WhoCard = ({n,t,tag,d,cta}) => {
  return (
    <div className="reveal" style={{
      background:'rgba(26,20,10,.04)', border:'1px solid var(--line)',
      borderRadius:22, padding:'28px 24px',
      transition:'transform .3s, background .3s, border-color .3s',
      cursor:'default', backdropFilter:'blur(8px)',
    }}
    onMouseEnter={e => {e.currentTarget.style.transform='translateY(-6px)'; e.currentTarget.style.borderColor='var(--accent)'; e.currentTarget.style.background='rgba(216,95,31,.07)'}}
    onMouseLeave={e => {e.currentTarget.style.transform='none'; e.currentTarget.style.borderColor='var(--line)'; e.currentTarget.style.background='rgba(26,20,10,.04)'}}>
      <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:18}}>
        <span style={{fontFamily:'var(--mono)', fontSize:13, color:'var(--accent)', fontWeight:600}}>{n}</span>
        <span style={{padding:'4px 10px', borderRadius:999, background:'var(--line)', fontSize:10, fontFamily:'var(--mono)', color:'var(--ink-2)', textTransform:'uppercase', letterSpacing:'.08em'}}>{tag}</span>
      </div>
      <h3 style={{fontFamily:'var(--sans)', fontWeight:800, fontSize:'clamp(20px, 2.4vw, 28px)', letterSpacing:'-.02em', lineHeight:1.1, color:'var(--ink)'}}>{t}</h3>
      <p style={{marginTop:14, fontSize:14, lineHeight:1.55, color:'var(--ink-2)'}}>{d}</p>
      <div style={{marginTop:20, paddingTop:16, borderTop:'1px solid var(--line)', fontSize:13, color:'var(--accent)', fontWeight:600, fontFamily:'var(--serif)', fontStyle:'italic'}}>→ {cta}</div>
    </div>
  );
};

window.Who = Who;
