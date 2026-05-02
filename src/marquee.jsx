// MARQUEE — running text strip between sections (logos / words)
const Marquee = ({words, speed=40, reverse=false, big=false}) => {
  const dir = window.useDir();
  const list = words || ['STRATEGY', 'SCRIPTS', 'EDITS', 'DISTRIBUTION', 'ANALYTICS', 'GROWTH', 'RETENTION', 'HOOKS', 'BRAND', 'SYSTEMS'];
  return (
    <div style={{
      padding: big ? '40px 0' : '20px 0',
      borderTop:'1px solid var(--line)', borderBottom:'1px solid var(--line)',
      overflow:'hidden', background:'transparent',
    }}>
      <div style={{
        display:'flex', gap: big ? 48 : 36, whiteSpace:'nowrap',
        animation:`mqRun ${speed}s linear infinite`,
        animationDirection: reverse ? 'reverse' : 'normal',
        fontFamily: dir==='editorial' ? 'var(--serif)' : 'var(--sans)',
        fontStyle: dir==='editorial' ? 'italic' : 'normal',
        fontWeight: dir==='editorial' ? 400 : 800,
        fontSize: big ? 'clamp(48px,8vw,120px)' : 16,
        letterSpacing: dir==='editorial' ? '-.02em' : (big ? '-.04em' : '.12em'),
        textTransform: dir==='editorial' || big ? 'none' : 'uppercase',
        color:'var(--ink)',
      }}>
        {[...list, ...list, ...list].map((w,i) => (
          <span key={i} style={{display:'inline-flex', alignItems:'center', gap: big ? 48 : 36}}>
            {w}
            <span style={{
              display:'inline-block',
              width: big ? 14 : 6, height: big ? 14 : 6,
              borderRadius: '50%', background:'var(--accent)',
            }}/>
          </span>
        ))}
      </div>
      <style>{`@keyframes mqRun{from{transform:translateX(0)}to{transform:translateX(-33.333%)}}`}</style>
    </div>
  );
};
window.Marquee = Marquee;
