// Shared utilities & constants — Kinetic-only (locked direction)
const { useState, useEffect, useRef, useCallback, useMemo, useLayoutEffect } = React;

window.cx = (...xs) => xs.filter(Boolean).join(' ');

window.useMouse = (ref) => {
  const [m, setM] = useState({x:.5, y:.5, active:false});
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const move = (e) => { const r = el.getBoundingClientRect(); setM({x:(e.clientX-r.left)/r.width,y:(e.clientY-r.top)/r.height,active:true}); };
    const leave = () => setM(p => ({...p, active:false}));
    el.addEventListener('pointermove', move); el.addEventListener('pointerleave', leave);
    return () => { el.removeEventListener('pointermove', move); el.removeEventListener('pointerleave', leave); };
  }, []);
  return m;
};

window.useScrollY = () => {
  const [y, setY] = useState(0);
  useEffect(() => { const f = () => setY(window.scrollY); f(); window.addEventListener('scroll',f,{passive:true}); return () => window.removeEventListener('scroll',f); }, []);
  return y;
};

// Count-up hook — animates number when element scrolls into view
window.useCountUp = (end, duration=1600) => {
  const ref = useRef(null);
  const [count, setCount] = useState(0);
  const [started, setStarted] = useState(false);
  useEffect(() => {
    const el = ref.current; if(!el) return;
    const io = new IntersectionObserver(([e]) => {
      if(e.isIntersecting && !started){
        setStarted(true); io.disconnect();
        const start = performance.now();
        const step = (now) => {
          const p = Math.min((now-start)/duration, 1);
          const eased = 1-Math.pow(1-p,4);
          setCount(Math.round(eased*end));
          if(p<1) requestAnimationFrame(step);
        };
        requestAnimationFrame(step);
      }
    }, {threshold:0.2});
    io.observe(el);
    return () => io.disconnect();
  }, [started]);
  return [ref, count];
};

// 3D tilt card — wraps children, responds to hover on desktop
window.Card3D = ({children, style, className, strength=10}) => {
  const ref = useRef(null);
  const [tilt, setTilt] = useState({x:0,y:0});
  const [hov, setHov] = useState(false);
  const isMob = typeof window !== 'undefined' && ('ontouchstart' in window);
  const handleMove = (e) => {
    if(isMob) return;
    const r = ref.current.getBoundingClientRect();
    setTilt({x:((e.clientX-r.left)/r.width-.5)*strength, y:((e.clientY-r.top)/r.height-.5)*-strength});
  };
  return (
    <div ref={ref}
      onMouseEnter={()=>setHov(true)}
      onMouseMove={handleMove}
      onMouseLeave={()=>{setHov(false);setTilt({x:0,y:0});}}
      className={className}
      style={{
        perspective:800,
        transform: hov ? `rotateY(${tilt.x}deg) rotateX(${tilt.y}deg) translateY(-4px) scale(1.015)` : 'rotateY(0) rotateX(0)',
        transition: hov ? 'transform .25s cubic-bezier(.2,.7,.2,1)' : 'transform .45s cubic-bezier(.2,.7,.2,1)',
        willChange:'transform',
        ...style,
      }}>
      {children}
    </div>
  );
};

window.DirectionCtx = React.createContext('kinetic');
window.useDir = () => 'kinetic';

window.Section = ({id, children, padded=true, bg, style, className}) => (
  <section id={id} data-screen-label={id} style={{padding:padded?'clamp(64px,9vw,120px) 0':0,background:bg??'transparent',position:'relative',...style}} className={className}>
    {children}
  </section>
);

window.Btn = ({children, primary, href, onClick, sm, mag=true}) => {
  const base = {display:'inline-flex',alignItems:'center',gap:8,padding:sm?'9px 16px':'15px 24px',borderRadius:999,fontSize:sm?13:14,fontWeight:600,transition:'background .2s,box-shadow .2s,color .2s',border:'1px solid transparent',cursor:'pointer',whiteSpace:'nowrap',WebkitTapHighlightColor:'transparent'};
  const styles = primary ? {...base,background:'var(--accent)',color:'#fff',boxShadow:'0 0 0 0 rgba(22,163,74,.5)'} : {...base,background:'transparent',color:'var(--ink)',border:'1px solid var(--line)'};
  const Comp = href ? 'a' : 'button';
  return (
    <Comp href={href} onClick={onClick} style={styles} className={mag?'magnet':''}
      onMouseEnter={e=>{ if(primary)e.currentTarget.style.boxShadow='0 12px 40px -10px rgba(22,163,74,.7)'; else e.currentTarget.style.background='var(--line)'; }}
      onMouseLeave={e=>{ if(primary)e.currentTarget.style.boxShadow='0 0 0 0 rgba(22,163,74,.5)'; else e.currentTarget.style.background='transparent'; }}>
      {children}
    </Comp>
  );
};

window.bigHeadStyle = () => ({fontFamily:'var(--sans)',fontWeight:900,lineHeight:.84,letterSpacing:'-.05em',fontSize:'clamp(56px,12vw,200px)',color:'var(--ink)',textTransform:'uppercase'});
window.labelStyle = {fontFamily:'var(--mono)',fontSize:11,letterSpacing:'.18em',textTransform:'uppercase',color:'var(--ink-3)',display:'inline-flex',alignItems:'center',gap:10};
window.Em = ({children}) => <span style={{color:'var(--accent)',fontStyle:'italic',fontFamily:'var(--serif)',fontWeight:300,textTransform:'none',letterSpacing:'-.04em'}}>{children}</span>;
window.fmtNum = (n) => n>=1e6?(n/1e6).toFixed(1)+'M':n>=1e3?(n/1e3).toFixed(0)+'K':String(n);
