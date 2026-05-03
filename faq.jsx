// TESTIMONIALS — rewritten to match actual product (promotion, not editing)
const quotes = [
  {
    q: "I posted the same kind of content for months with barely any reach. After Inflorax, my last Reel hit 80K views. I didn't change anything — they just got it seen.",
    a: '@sofia.creates',
    r: 'Lifestyle · Instagram',
  },
  {
    q: "Gained 3,200 real followers in my first campaign. These aren't ghost accounts — they actually engage. My comment section is alive for the first time.",
    a: '@marcuscooks',
    r: 'Food · Instagram',
  },
  {
    q: "My YouTube channel was stuck at 1.4K subs for almost a year. Two weeks after my Inflorax campaign, I crossed 4K and my videos are getting recommended for the first time.",
    a: '@trailhead.jay',
    r: 'Outdoors · YouTube',
  },
  {
    q: "No passwords asked, no weird access requests, and the results were exactly what they described. Refreshingly straightforward compared to every other growth service I've tried.",
    a: '@nadia.finance',
    r: 'Finance · YouTube',
  },
];

const Testimonials = () => {
  const [i, setI] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setI(p => (p + 1) % quotes.length), 10000);
    return () => clearInterval(t);
  }, []);
  const cur = quotes[i];
  return (
    <window.Section id="testimonials" padded>
      <div className="wrap-narrow" style={{textAlign:'center'}}>
        <span className="reveal" style={window.labelStyle}>Creator results</span>
        <blockquote className="reveal reveal-d1" key={i} style={{
          marginTop:28,
          fontFamily:'var(--serif)', fontStyle:'italic', fontWeight:300,
          fontSize:'clamp(22px, 3.5vw, 52px)',
          lineHeight:1.2, letterSpacing:'-.02em', color:'var(--ink)',
          animation:'fadeUp .6s cubic-bezier(.2,.8,.2,1)',
        }}>
          <span style={{color:'var(--accent)'}}>"</span>{cur.q}<span style={{color:'var(--accent)'}}>"</span>
        </blockquote>
        <div className="reveal reveal-d2" key={'a'+i} style={{marginTop:24, animation:'fadeUp .6s cubic-bezier(.2,.8,.2,1)'}}>
          <div style={{fontWeight:800, fontSize:14, color:'var(--ink)', textTransform:'uppercase', letterSpacing:'.05em'}}>{cur.a}</div>
          <div style={{fontFamily:'var(--mono)', fontSize:11, color:'var(--ink-3)', marginTop:4, letterSpacing:'.08em', textTransform:'uppercase'}}>{cur.r}</div>
        </div>
        <div style={{display:'flex', gap:8, justifyContent:'center', marginTop:28}}>
          {quotes.map((_, j) => (
            <button key={j} onClick={() => setI(j)} aria-label={`Quote ${j+1}`}
              style={{width: i===j ? 32 : 8, height:8, borderRadius:999, background: i===j ? 'var(--accent)' : 'var(--line)', transition:'all .3s', border:'none', cursor:'pointer'}}/>
          ))}
        </div>
        <style>{`@keyframes fadeUp{from{opacity:0;transform:translateY(12px)}to{opacity:1;transform:none}}`}</style>
      </div>
    </window.Section>
  );
};
window.Testimonials = Testimonials;
