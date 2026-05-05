// Shared utilities & constants — Kinetic-only (locked direction)
const { useState, useEffect, useRef, useCallback, useMemo, useLayoutEffect } = React;

window.cx = (...xs) => xs.filter(Boolean).join(' ');

// useMouse hook
window.useMouse = (ref) => {
  const [m, setM] = useState({x:.5, y:.5, active:false});
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const move = (e) => {
      const r = el.getBoundingClientRect();
      setM({x:(e.clientX - r.left)/r.width, y:(e.clientY - r.top)/r.height, active:true});
    };
    const leave = () => setM(p => ({...p, active:false}));
    el.addEventListener('pointermove', move);
    el.addEventListener('pointerleave', leave);
    return () => { el.removeEventListener('pointermove', move); el.removeEventListener('pointerleave', leave); };
  }, []);
  return m;
};

// useScrollY
window.useScrollY = () => {
  const [y, setY] = useState(0);
  useEffect(() => {
    const f = () => setY(window.scrollY);
    f(); window.addEventListener('scroll', f, {passive:true});
    return () => window.removeEventListener('scroll', f);
  }, []);
  return y;
};

// useInView — fires once when element enters viewport
window.useInView = (ref, rootMargin='-5% 0px -5% 0px') => {
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setInView(true); io.disconnect(); } }, {rootMargin});
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return inView;
};

// Dummy DirectionCtx kept for compat (always 'kinetic')
window.DirectionCtx = React.createContext('kinetic');
window.useDir = () => 'kinetic';

// Section component
window.Section = ({id, children, padded=true, bg, style, className}) => {
  return (
    <section id={id} data-screen-label={id} style={{
      padding: padded ? 'clamp(40px,7vw,120px) 0' : 0,
      background:bg ?? 'transparent',
      position:'relative',
      ...style,
    }} className={className}>
      {children}
    </section>
  );
};

// 3D scroll-reveal card wrapper — works on mobile via IntersectionObserver
window.ScrollCard3D = ({children, delay=0, style}) => {
  const ref = useRef(null);
  const [vis, setVis] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [tilt, setTilt] = useState({x:0, y:0});
  const isMobile = typeof window !== 'undefined' && window.innerWidth <= 768;

  useEffect(() => {
    const el = ref.current; if(!el) return;
    const io = new IntersectionObserver(([e]) => {
      if(e.isIntersecting){ setVis(true); io.disconnect(); }
    }, {rootMargin:'-4% 0px -4% 0px', threshold:0.1});
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const handleMove = (e) => {
    if(isMobile) return;
    const r = ref.current.getBoundingClientRect();
    const x = ((e.clientX - r.left) / r.width - 0.5) * 12;
    const y = ((e.clientY - r.top) / r.height - 0.5) * -12;
    setTilt({x, y});
  };

  return (
    <div ref={ref}
      onMouseEnter={() => setHovered(true)}
      onMouseMove={handleMove}
      onMouseLeave={() => { setHovered(false); setTilt({x:0,y:0}); }}
      style={{
        perspective: 800,
        opacity: vis ? 1 : 0,
        transform: vis
          ? (hovered ? `rotateY(${tilt.x}deg) rotateX(${tilt.y}deg) translateY(-4px) scale(1.015)` : 'translateY(0) scale(1)')
          : 'translateY(32px) scale(.97)',
        transition: vis
          ? `opacity .7s cubic-bezier(.2,.7,.2,1) ${delay}s, transform .55s cubic-bezier(.2,.7,.2,1)`
          : `opacity .7s ${delay}s, transform .7s cubic-bezier(.2,.7,.2,1) ${delay}s`,
        willChange:'transform,opacity',
        ...style,
      }}>
      {children}
    </div>
  );
};

// Mobile-optimized Stat counter that counts up when in view
window.CountUp = ({end, suffix='', prefix='', duration=1800}) => {
  const ref = useRef(null);
  const [count, setCount] = useState(0);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const el = ref.current; if(!el) return;
    const io = new IntersectionObserver(([e]) => {
      if(e.isIntersecting && !started) {
        setStarted(true);
        io.disconnect();
        const start = performance.now();
        const step = (now) => {
          const progress = Math.min((now - start) / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 4);
          setCount(Math.round(eased * end));
          if(progress < 1) requestAnimationFrame(step);
        };
        requestAnimationFrame(step);
      }
    }, {rootMargin:'-5% 0px -5% 0px', threshold:0.2});
    io.observe(el);
    return () => io.disconnect();
  }, [started]);

  return <span ref={ref}>{prefix}{count.toLocaleString()}{suffix}</span>;
};

// Pill button
window.Btn = ({children, primary, href, onClick, sm, mag=true}) => {
  const base = {
    display:'inline-flex', alignItems:'center', gap:8,
    padding: sm ? '9px 16px' : '15px 24px',
    borderRadius: 999,
    fontSize: sm ? 13 : 14,
    fontWeight: 600,
    transition:'background .2s, box-shadow .2s, color .2s, transform .2s',
    border:'1px solid transparent',
    cursor:'pointer',
    whiteSpace:'nowrap',
    WebkitTapHighlightColor:'transparent',
  };
  const styles = primary
    ? {...base, background:'var(--accent)', color:'#fff', boxShadow:'0 0 0 0 rgba(22,163,74,.5)'}
    : {...base, background:'transparent', color:'var(--ink)', border:'1px solid var(--line)'};
  const Comp = href ? 'a' : 'button';
  return (
    <Comp href={href} onClick={onClick} style={styles}
      className={mag ? 'magnet' : ''}
      onMouseEnter={(e)=>{ if(primary) e.currentTarget.style.boxShadow='0 12px 40px -10px rgba(22,163,74,.7)'; else e.currentTarget.style.background='var(--line)'; }}
      onMouseLeave={(e)=>{ if(primary) e.currentTarget.style.boxShadow='0 0 0 0 rgba(22,163,74,.5)'; else e.currentTarget.style.background='transparent'; }}>
      {children}
    </Comp>
  );
};

// Big display headline style — Kinetic
window.bigHeadStyle = () => ({
  fontFamily:'var(--sans)', fontWeight:900, lineHeight:.84, letterSpacing:'-.05em',
  fontSize:'clamp(56px, 12vw, 200px)', color:'var(--ink)', textTransform:'uppercase',
});

// Label/eyebrow
window.labelStyle = {
  fontFamily:'var(--mono)', fontSize:11, letterSpacing:'.18em', textTransform:'uppercase',
  color:'var(--ink-3)', display:'inline-flex', alignItems:'center', gap:10,
};

// Italic em (accent serif italic)
window.Em = ({children}) => (
  <span style={{
    color:'var(--accent)',
    fontStyle:'italic',
    fontFamily:'var(--serif)',
    fontWeight:300,
    textTransform:'none',
    letterSpacing:'-.04em',
  }}>{children}</span>
);

window.fmtNum = (n) => n >= 1e6 ? (n/1e6).toFixed(1)+'M' : n >= 1e3 ? (n/1e3).toFixed(0)+'K' : String(n);
