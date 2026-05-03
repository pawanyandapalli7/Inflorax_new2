// ABOUT — studio team & honest list
const team = [
  {n:'Sami Vora', r:'Founder · Strategy', i:'SV'},
  {n:'Theo Kapur', r:'Head of Edits', i:'TK'},
  {n:'June Park', r:'Head of Distribution', i:'JP'},
  {n:'Reya Lin', r:'Senior Producer', i:'RL'},
];
const wedont = [
  'We don\'t guarantee follower counts. We guarantee the system.',
  'We don\'t take on every brand-deal pitch — only ones aligned with your channel.',
  'We don\'t do "viral hacks". We build retention curves.',
  'We don\'t white-label, ghost-write, or pretend to be you.',
  'We don\'t scale past 24 creators. The bench can\'t be that thin.',
];

const About = () => {
  const dir = window.useDir();
  return (
    <window.Section id="about" padded>
      <div className="wrap">
        <div style={{display:'grid', gridTemplateColumns:'1.2fr 1fr', gap:80}} className="about-grid">
          <div>
            <span className="reveal" style={window.labelStyle}>The studio</span>
            <h2 className="reveal reveal-d1" style={{...window.bigHeadStyle(dir), fontSize:'clamp(40px, 6vw, 96px)', marginTop:18}}>
              {dir==='editorial' && <>A small studio<br/>by <window.Em>practitioners.</window.Em></>}
              {dir==='kinetic'   && <>Small team.<br/><window.Em>Loud results.</window.Em></>}
              {dir==='grid'      && <>Small studio.<br/><window.Em>Senior bench.</window.Em></>}
            </h2>
            <p className="reveal reveal-d2" style={{marginTop:32, fontSize:17, lineHeight:1.6, color:'var(--ink-2)', maxWidth:520}}>
              Inflorax was started in 2021 by Sami Vora after eight years inside creator economy companies. We're small on purpose — every engagement is staffed by a senior producer, an editor, a strategist, and a distribution lead. No juniors hidden behind PMs.
            </p>
            <div className="reveal reveal-d3" style={{marginTop:48, display:'grid', gridTemplateColumns:'repeat(2, 1fr)', gap:20}}>
              {team.map((t,i) => (
                <div key={i} style={{display:'flex', gap:14, alignItems:'center', padding:14, borderRadius:14, background:'var(--soft)'}}>
                  <span style={{
                    width:48, height:48, borderRadius:dir==='grid' ? 4 : 999,
                    background:'var(--accent)', color:'#fff',
                    display:'inline-flex', alignItems:'center', justifyContent:'center',
                    fontWeight:800, fontSize:14, letterSpacing:'.04em',
                  }}>{t.i}</span>
                  <div>
                    <div style={{fontWeight:600, fontSize:15}}>{t.n}</div>
                    <div style={{fontSize:13, color:'var(--ink-3)'}}>{t.r}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* What we don't do */}
          <div className="reveal" style={{
            background:'var(--ink)', color:'var(--bone)', padding:'40px 32px', borderRadius:dir==='grid' ? 0 : 24, position:'relative', overflow:'hidden',
          }}>
            <div style={{position:'absolute', top:-40, right:-40, width:200, height:200, borderRadius:'50%', background:'var(--accent)', opacity:.15, filter:'blur(40px)'}}/>
            <span style={{...window.labelStyle, color:'rgba(255,255,255,.6)'}}>What we don't do</span>
            <h3 style={{
              marginTop:14,
              fontFamily: dir==='editorial' ? 'var(--serif)' : 'var(--sans)',
              fontStyle: dir==='editorial' ? 'italic' : 'normal',
              fontWeight: dir==='editorial' ? 400 : 700,
              fontSize:'clamp(28px, 3vw, 40px)', letterSpacing:'-.03em', lineHeight:1.05,
            }}>The honest part.</h3>
            <ul style={{listStyle:'none', marginTop:32, display:'flex', flexDirection:'column', gap:18}}>
              {wedont.map((w,i) => (
                <li key={i} style={{display:'flex', gap:14, alignItems:'flex-start', paddingBottom:18, borderBottom:'1px solid rgba(255,255,255,.1)', fontSize:14, lineHeight:1.5, color:'rgba(255,255,255,.85)'}}>
                  <span style={{color:'var(--accent)', fontWeight:800}}>✕</span>{w}
                </li>
              ))}
            </ul>
          </div>
        </div>
        <style>{`@media (max-width:900px){ .about-grid{grid-template-columns:1fr !important; gap:40px} }`}</style>
      </div>
    </window.Section>
  );
};
window.About = About;
