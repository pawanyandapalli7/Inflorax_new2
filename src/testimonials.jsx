// TESTIMONIALS — auto-rotating quote
const quotes = [
  {q:"They treat my channel like an engineering project. We ship, we measure, we adjust. My retention curves are unrecognisable.", a:"Finn Berg", r:"@finn.codes · 424K"},
  {q:"I came in with vibes. I left with a posting cadence, three hook frameworks, and the calmest brain I've had in years.", a:"Maya Okafor", r:"@maya.cooks · 1.2M"},
  {q:"Six months in and my channel finally compounds without me being chained to it. The studio runs the system; I get to be a person.", a:"Harlow Reyes", r:"@harlow.run · 182K"},
  {q:"Best money I've spent on the business. Period. They sourced two brand deals in month one that more than covered the year.", a:"Nora Tang", r:"@nora.draws · 310K"},
];

const Testimonials = () => {
  const dir = window.useDir();
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
          marginTop:32,
          fontFamily: dir==='editorial' ? 'var(--serif)' : (dir==='kinetic' ? 'var(--serif)' : 'var(--sans)'),
          fontStyle: dir!=='grid' ? 'italic' : 'normal',
          fontWeight: dir==='grid' ? 500 : 400,
          fontSize:'clamp(28px, 4vw, 56px)',
          lineHeight:1.15, letterSpacing:'-.02em', color:'var(--ink)',
          textWrap:'balance',
          animation:'fadeUp .6s cubic-bezier(.2,.8,.2,1)',
        }}>
          <span style={{color:'var(--accent)'}}>“</span>{cur.q}<span style={{color:'var(--accent)'}}>”</span>
        </blockquote>
        <div className="reveal reveal-d2" key={'a'+i} style={{marginTop:32, animation:'fadeUp .6s cubic-bezier(.2,.8,.2,1)'}}>
          <div style={{fontWeight:600, fontSize:15}}>{cur.a}</div>
          <div style={{fontFamily:'var(--mono)', fontSize:12, color:'var(--ink-3)', marginTop:4}}>{cur.r}</div>
        </div>
        <div style={{display:'flex', gap:8, justifyContent:'center', marginTop:32}}>
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
