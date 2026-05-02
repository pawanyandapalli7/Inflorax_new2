// TESTIMONIALS — dark warm
const quotes = [
  {q:"They treat my channel like an engineering project. We ship, we measure, we adjust. My retention curves are unrecognisable.", a:"@finn.codes", r:"Tech · 424K"},
  {q:"I came in with vibes. I left with a posting cadence, three hook frameworks, and the calmest brain I've had in years.", a:"@maya.cooks", r:"Food · 1.2M"},
  {q:"Six months in and my channel finally compounds without me being chained to it. The studio runs the system; I get to be a person.", a:"@harlow.run", r:"Fitness · 182K"},
  {q:"Best money I've spent on the business. Period. They sourced two brand deals in month one that more than covered the year.", a:"@nora.draws", r:"Art · 310K"},
];

const Testimonials = () => {
  const [i, setI] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setI(p => (p+1) % quotes.length), 6000);
    return () => clearInterval(t);
  }, []);
  const cur = quotes[i];
  return (
    <window.Section id="testimonials" padded>
      <div className="wrap-narrow" style={{textAlign:'center'}}>
        <span className="reveal" style={window.labelStyle}>From the residency</span>
        <blockquote className="reveal reveal-d1" key={i} style={{
          marginTop:28,
          fontFamily:'var(--serif)', fontStyle:'italic', fontWeight:300,
          fontSize:'clamp(28px, 4.5vw, 64px)',
          lineHeight:1.15, letterSpacing:'-.02em', color:'var(--ink)',
          textWrap:'balance',
          animation:'fadeUp .6s cubic-bezier(.2,.8,.2,1)',
        }}>
          <span style={{color:'var(--accent)'}}>“</span>{cur.q}<span style={{color:'var(--accent)'}}>”</span>
        </blockquote>
        <div className="reveal reveal-d2" key={'a'+i} style={{marginTop:28, animation:'fadeUp .6s cubic-bezier(.2,.8,.2,1)'}}>
          <div style={{fontWeight:800, fontSize:14, color:'var(--ink)', textTransform:'uppercase', letterSpacing:'.05em'}}>{cur.a}</div>
          <div style={{fontFamily:'var(--mono)', fontSize:11, color:'var(--ink-3)', marginTop:4, letterSpacing:'.08em', textTransform:'uppercase'}}>{cur.r}</div>
        </div>
        <div style={{display:'flex', gap:8, justifyContent:'center', marginTop:28}}>
          {quotes.map((_,j) => (
            <button key={j} onClick={() => setI(j)} aria-label={`Quote ${j+1}`}
              style={{width: i===j ? 32 : 8, height:8, borderRadius:999, background:i===j ? 'var(--accent)' : 'var(--line)', transition:'all .3s', border:'none', cursor:'pointer'}}/>
          ))}
        </div>
        <style>{`@keyframes fadeUp{from{opacity:0;transform:translateY(12px)}to{opacity:1;transform:none}}`}</style>
      </div>
    </window.Section>
  );
};
window.Testimonials = Testimonials;
