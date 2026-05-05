// MARQUEE — big scrolling on desktop, engaging pill grid on mobile
const Marquee = ({words, speed=42, reverse=false, big=true}) => {
  const list = words || ['VISIBILITY', 'REACH', 'GROWTH', 'PROMOTION', 'DISCOVERY', 'AUDIENCE', 'MOMENTUM', 'EXPOSURE', 'ENGAGEMENT', 'RESULTS'];

  // Mobile pill data — word + emoji pairs
  const pills = [
    {w:'Visibility',  e:'👁️'},
    {w:'Reach',       e:'📡'},
    {w:'Growth',      e:'📈'},
    {w:'Promotion',   e:'🚀'},
    {w:'Discovery',   e:'🔍'},
    {w:'Audience',    e:'👥'},
    {w:'Momentum',    e:'⚡'},
    {w:'Exposure',    e:'✨'},
    {w:'Engagement',  e:'💬'},
    {w:'Results',     e:'🎯'},
  ];

  return (
    <div style={{
      borderTop:'1px solid var(--line)', borderBottom:'1px solid var(--line)',
      background:'rgba(15,31,15,.03)', overflow:'hidden',
    }}>

      {/* Desktop — scrolling marquee */}
      <div className="mq-desktop" style={{ padding:'40px 0' }}>
        <div style={{
          display:'flex', gap:48, whiteSpace:'nowrap',
          animation:`mqRun ${speed}s linear infinite`,
          animationDirection: reverse ? 'reverse' : 'normal',
          fontFamily:'var(--sans)', fontWeight:900,
          fontSize:'clamp(56px, 11vw, 160px)',
          letterSpacing:'-.05em', textTransform:'uppercase',
          color:'var(--ink)', lineHeight:.9,
        }}>
          {[...list, ...list, ...list].map((w, i) => (
            <span key={i} style={{display:'inline-flex', alignItems:'center', gap:48}}>
              {i % 3 === 1
                ? <span style={{fontFamily:'var(--serif)', fontStyle:'italic', fontWeight:300, letterSpacing:'-.04em', textTransform:'none', color:'var(--accent)'}}>{w.toLowerCase()}</span>
                : w}
              <span style={{display:'inline-block', width:18, height:18, borderRadius:'50%', background:'var(--accent)', boxShadow:'0 0 30px var(--accent)'}}/>
            </span>
          ))}
        </div>
      </div>

      {/* Mobile — animated pill grid */}
      <div className="mq-mobile" style={{ padding:'28px 20px', display:'none' }}>
        <div style={{
          display:'flex', flexWrap:'wrap', gap:10, justifyContent:'center',
        }}>
          {pills.map(({w, e}, i) => {
            const isAccent = i % 3 === 1;
            return (
              <div key={w} style={{
                display:'inline-flex', alignItems:'center', gap:7,
                padding:'10px 16px', borderRadius:999,
                background: isAccent ? 'var(--accent)' : 'rgba(22,101,52,.08)',
                border: `1.5px solid ${isAccent ? 'var(--accent)' : 'rgba(22,101,52,.15)'}`,
                animation:`pillFade .5s ease both`,
                animationDelay:`${i * 0.06}s`,
              }}>
                <span style={{fontSize:15}}>{e}</span>
                <span style={{
                  fontFamily:'var(--sans)', fontWeight:700, fontSize:14,
                  letterSpacing:'-.01em',
                  color: isAccent ? '#fff' : 'var(--ink)',
                }}>{w}</span>
              </div>
            );
          })}
        </div>

        {/* Tagline below pills on mobile */}
        <p style={{
          marginTop:20, textAlign:'center',
          fontFamily:'var(--serif)', fontStyle:'italic', fontWeight:300,
          fontSize:17, color:'var(--ink-2)', lineHeight:1.5,
        }}>
          Everything your content needs to get <span style={{color:'var(--accent)', fontStyle:'normal', fontFamily:'var(--sans)', fontWeight:700}}>seen.</span>
        </p>
      </div>

      <style>{`
        @keyframes mqRun { from{transform:translateX(0)} to{transform:translateX(-33.333%)} }
        @keyframes pillFade { from{opacity:0; transform:translateY(8px)} to{opacity:1; transform:none} }
        @media(max-width:768px) {
          .mq-desktop { display:none !important }
          .mq-mobile  { display:block !important }
        }
      `}</style>
    </div>
  );
};
window.Marquee = Marquee;
