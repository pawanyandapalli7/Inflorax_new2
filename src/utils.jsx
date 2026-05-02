// Shared utilities & constants
const { useState, useEffect, useRef, useCallback, useMemo, useLayoutEffect } = React;

// Direction context: 'editorial' | 'kinetic' | 'grid'
window.DirectionCtx = React.createContext('editorial');
window.useDir = () => React.useContext(window.DirectionCtx);

// Class joiner
window.cx = (...xs) => xs.filter(Boolean).join(' ');

// useMouse hook (for parallax / hover)
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

// Direction-aware section background colors
window.sectionBgFor = (dir, idx=0) => {
  if (dir === 'editorial') return idx % 2 ? '#fbf8f1' : '#f6f1e6';
  if (dir === 'kinetic')   return idx % 2 ? '#f4ede0' : '#ffe9c8';
  return idx % 2 ? '#f5f5f3' : '#ececea';
};

// Section component — applies reveal + dir-aware background
window.Section = ({id, children, padded=true, bg, style, className}) => {
  const dir = window.useDir();
  const bgVal = bg ?? (dir==='editorial' ? 'transparent' : 'transparent');
  return (
    <section id={id} data-screen-label={id} style={{padding: padded ? 'clamp(80px,10vw,140px) 0' : 0, background:bgVal, position:'relative', ...style}} className={className}>
      {children}
    </section>
  );
};

// Pill button
window.Btn = ({children, primary, href, onClick, sm}) => {
  const dir = window.useDir();
  const base = {
    display:'inline-flex', alignItems:'center', gap:8,
    padding: sm ? '8px 14px' : '14px 22px',
    borderRadius: 999,
    fontSize: sm ? 13 : 14,
    fontWeight: 600,
    transition:'transform .2s, background .2s, box-shadow .2s',
    border:'1px solid transparent',
    cursor:'pointer',
  };
  const styles = primary
    ? {...base, background:'var(--accent)', color: dir==='kinetic' ? '#fff' : (dir==='grid' ? '#fff' : '#fff')}
    : {...base, background:'transparent', color:'var(--ink)', border:'1px solid var(--line)'};
  const Comp = href ? 'a' : 'button';
  return (
    <Comp href={href} onClick={onClick} style={styles}
      onMouseEnter={(e)=>{e.currentTarget.style.transform='translateY(-2px)'}}
      onMouseLeave={(e)=>{e.currentTarget.style.transform='none'}}>
      {children}
    </Comp>
  );
};

// Heading helpers — direction-aware big display type
window.bigHeadStyle = (dir) => {
  if (dir==='editorial') return {
    fontFamily:'var(--serif)', fontWeight:400, lineHeight:.92, letterSpacing:'-.03em',
    fontSize:'clamp(48px, 8vw, 132px)', color:'var(--ink)',
  };
  if (dir==='kinetic') return {
    fontFamily:'var(--sans)', fontWeight:900, lineHeight:.85, letterSpacing:'-.05em',
    fontSize:'clamp(56px, 11vw, 180px)', color:'var(--ink)', textTransform:'uppercase',
  };
  return {
    fontFamily:'var(--sans)', fontWeight:700, lineHeight:.95, letterSpacing:'-.04em',
    fontSize:'clamp(44px, 7.5vw, 116px)', color:'var(--ink)',
  };
};

// Label/eyebrow style
window.labelStyle = {
  fontFamily:'var(--mono)', fontSize:11, letterSpacing:'.18em', textTransform:'uppercase',
  color:'var(--ink-3)', display:'inline-flex', alignItems:'center', gap:10,
};

// Italic em helper for editorial direction
window.Em = ({children}) => {
  const dir = window.useDir();
  if (dir==='editorial') return <em style={{fontStyle:'italic', fontWeight:300, color:'var(--accent)'}}>{children}</em>;
  if (dir==='kinetic')   return <span style={{color:'var(--accent)', fontStyle:'italic', fontFamily:'var(--serif)', fontWeight:300}}>{children}</span>;
  return <span style={{color:'var(--accent)', fontWeight:600, borderBottom:'3px solid var(--accent)', paddingBottom:'.05em'}}>{children}</span>;
};

// Number formatter
window.fmtNum = (n) => n >= 1e6 ? (n/1e6).toFixed(1)+'M' : n >= 1e3 ? (n/1e3).toFixed(0)+'K' : String(n);
