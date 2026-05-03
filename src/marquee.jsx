// MARQUEE — bigger Kinetic
const Marquee = ({words, speed=42, reverse=false, big=true}) => {
  const list = words || ['VISIBILITY', 'REACH', 'GROWTH', 'PROMOTION', 'DISCOVERY', 'AUDIENCE', 'MOMENTUM', 'EXPOSURE', 'INSTAGRAM', 'YOUTUBE'];
  return (
    <div style={{
      padding: big ? '40px 0' : '20px 0',
      borderTop:'1px solid var(--line)', borderBottom:'1px solid var(--line)',
      overflow:'hidden', background:'rgba(15,31,15,.03)',
    }}>
      <div style={{
        display:'flex', gap: big ? 48 : 36, whiteSpace:'nowrap',
        animation:`mqRun ${speed}s linear infinite`,
        animationDirection: reverse ? 'reverse' : 'normal',
        fontFamily:'var(--sans)',
        fontWeight: 900,
        fontSize: big ? 'clamp(56px, 11vw, 160px)' : 16,
        letterSpacing: big ? '-.05em' : '.12em',
        textTransform:'uppercase',
        color:'var(--ink)',
        lineHeight:.9,
      }}>
        {[...list, ...list, ...list].map((w,i) => (
          <span key={i} style={{display:'inline-flex', alignItems:'center', gap: big ? 48 : 36}}>
            {i % 3 === 1 ? <span style={{fontFamily:'var(--serif)', fontStyle:'italic', fontWeight:300, letterSpacing:'-.04em', textTransform:'none', color:'var(--accent)'}}>{w.toLowerCase()}</span> : w}
            <span style={{
              display:'inline-block',
              width: big ? 18 : 6, height: big ? 18 : 6,
              borderRadius: '50%', background:'var(--accent)',
              boxShadow: big ? '0 0 30px var(--accent)' : 'none',
            }}/>
          </span>
        ))}
      </div>
      <style>{`@keyframes mqRun{from{transform:translateX(0)}to{transform:translateX(-33.333%)}}`}</style>
    </div>
  );
};
window.Marquee = Marquee;
