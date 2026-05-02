// NUMBERS — dark warm
const Numbers = () => {
  const stats = [
    {n:24, suf:'', l:'creators in residency'},
    {n:182, suf:'%', l:'avg follower lift / yr'},
    {n:1.2, suf:'M', l:'creator revenue · 2025'},
    {n:14, suf:'×', l:'avg ROI cohort 12'},
  ];
  return (
    <window.Section id="numbers" padded>
      <div className="wrap">
        <span className="reveal" style={{...window.labelStyle, marginBottom:32, display:'inline-flex'}}>By the numbers · 2025</span>
        <div style={{display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(220px, 1fr))', gap:0, marginTop:18, borderTop:'1px solid var(--line)'}}>
          {stats.map((s,i) => <Stat key={i} {...s} delay={i*120} idx={i}/>)}
        </div>
      </div>
    </window.Section>
  );
};

const Stat = ({n, suf, l, delay, idx}) => {
  const ref = useRef(null);
  const [val, setVal] = useState(0);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const io = new IntersectionObserver(([en]) => {
      if (en.isIntersecting) {
        setTimeout(() => {
          const dur = 1400, t0 = performance.now();
          const tick = (t) => {
            const p = Math.min(1, (t - t0)/dur);
            const eased = 1 - Math.pow(1-p, 3);
            setVal(eased * n);
            if (p < 1) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
        }, delay);
        io.disconnect();
      }
    }, {threshold:.4});
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <div ref={ref} className="reveal" style={{padding:'40px 22px 40px 0', borderBottom:'1px solid var(--line)', borderRight:'1px solid var(--line)', background:'transparent', position:'relative'}}>
      <div style={{
        fontFamily:'var(--sans)', fontWeight:900,
        fontSize:'clamp(56px, 9vw, 132px)', letterSpacing:'-.05em', lineHeight:1,
        color:'var(--accent)',
      }}>
        {n < 10 ? val.toFixed(1) : Math.round(val)}<span style={{fontSize:'.5em', fontFamily:'var(--serif)', fontStyle:'italic', fontWeight:300}}>{suf}</span>
      </div>
      <div style={{marginTop:14, color:'var(--ink-2)', fontSize:13, fontFamily:'var(--mono)', textTransform:'uppercase', letterSpacing:'.08em'}}>{l}</div>
    </div>
  );
};

window.Numbers = Numbers;
