// NUMBERS — softened stats with context
const Numbers = () => {
  const stats = [
    {n:180, suf:'%+', l:'avg reach increase', sub:'across promoted content'},
    {n:72,  suf:'h',  l:'avg time to first lift', sub:'from campaign launch'},
    {n:98,  suf:'%',  l:'real accounts only', sub:'zero bots, zero fakes'},
    {n:8,   suf:'+',  l:'content niches served', sub:'IG & YT creators'},
  ];
  return (
    <window.Section id="numbers" padded>
      <div className="wrap">
        <div style={{display:'flex', justifyContent:'space-between', alignItems:'flex-end', marginBottom:48, flexWrap:'wrap', gap:16}}>
          <div>
            <span className="reveal" style={{...window.labelStyle, marginBottom:12, display:'inline-flex'}}>Why it works</span>
            <h2 className="reveal reveal-d1" style={{...window.bigHeadStyle(), fontSize:'clamp(40px,6vw,88px)', marginTop:14}}>
              Real numbers.<br/><window.Em>Real results.</window.Em>
            </h2>
          </div>
          <p className="reveal reveal-d2" style={{fontSize:14, color:'var(--ink-3)', fontFamily:'var(--mono)', maxWidth:260, textAlign:'right', lineHeight:1.6}}>
            Based on Inflorax promotion campaigns. Individual results vary by content quality, niche, and consistency.
          </p>
        </div>

        <div style={{display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(220px, 1fr))', gap:0, borderTop:'1px solid var(--line)'}}>
          {stats.map((s,i) => <Stat key={i} {...s} delay={i*120}/>)}
        </div>
      </div>
    </window.Section>
  );
};

const Stat = ({n, suf, l, sub, delay}) => {
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
    <div ref={ref} className="reveal" style={{padding:'40px 24px 40px 0', borderBottom:'1px solid var(--line)', borderRight:'1px solid var(--line)'}}>
      <div style={{fontFamily:'var(--sans)', fontWeight:900, fontSize:'clamp(52px, 8vw, 120px)', letterSpacing:'-.05em', lineHeight:1, color:'var(--accent)'}}>
        {Number.isInteger(n) ? Math.round(val) : val.toFixed(0)}
        <span style={{fontSize:'.45em', fontFamily:'var(--serif)', fontStyle:'italic', fontWeight:300}}>{suf}</span>
      </div>
      <div style={{marginTop:12, color:'var(--ink)', fontSize:14, fontWeight:600, letterSpacing:'-.01em'}}>{l}</div>
      <div style={{marginTop:4, color:'var(--ink-3)', fontSize:12, fontFamily:'var(--mono)', textTransform:'uppercase', letterSpacing:'.06em'}}>{sub}</div>
    </div>
  );
};
window.Numbers = Numbers;
