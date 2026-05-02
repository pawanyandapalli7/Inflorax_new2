// FAQ — accordion
const faqs = [
  {q:'How long is a typical engagement?', a:'Audits are a fixed 10-day sprint. Residency and Studio engagements run on quarterly contracts with monthly opt-outs after the first quarter.'},
  {q:'What size creator do you work with?', a:'We have a soft floor of 5K followers (or strong content with smaller distribution). Above that, we work with everyone from sub-50K up to 5M+ creators.'},
  {q:'Do you guarantee follower growth?', a:'No, and you should be skeptical of anyone who does. We guarantee the system, the cadence, and the senior team. Growth is a function of your input + ours + the algorithm.'},
  {q:'Will you ghost-write or appear in my videos?', a:'Never. We script with you, never for you. Your voice is the asset; we sharpen the system around it.'},
  {q:'How do you charge for brand deals?', a:'We source and negotiate, you keep 100% of the deal value. No commissions. We bake brand-deal sourcing into the Residency and Studio retainer.'},
  {q:'Why "Inflorax"?', a:'Inflorescence — the way a stem grows new flowers in sequence. We thought it was a better metaphor for a creator channel than "funnel" or "flywheel".'},
];

const FAQ = () => {
  const dir = window.useDir();
  const [open, setOpen] = useState(0);
  return (
    <window.Section id="faq" padded>
      <div className="wrap">
        <div style={{display:'grid', gridTemplateColumns:'1fr 1.5fr', gap:80}} className="faq-grid">
          <div style={{position:'sticky', top:120, alignSelf:'start'}}>
            <span className="reveal" style={window.labelStyle}>Asked often</span>
            <h2 className="reveal reveal-d1" style={{...window.bigHeadStyle(dir), fontSize:'clamp(40px, 5vw, 80px)', marginTop:18}}>
              {dir==='editorial' && <>Quick<br/><window.Em>answers.</window.Em></>}
              {dir==='kinetic'   && <>Asked.<br/><window.Em>Answered.</window.Em></>}
              {dir==='grid'      && <>FAQ.<br/><window.Em>The fast version.</window.Em></>}
            </h2>
            <p className="reveal reveal-d2" style={{marginTop:24, color:'var(--ink-2)', fontSize:15}}>Don't see yours? <a href="#audit" style={{color:'var(--accent)', textDecoration:'underline'}}>Ask in the audit form →</a></p>
          </div>
          <div>
            {faqs.map((f,i) => (
              <button key={i} onClick={() => setOpen(open===i ? -1 : i)} className="reveal"
                style={{display:'block', width:'100%', textAlign:'left', borderTop:'1px solid var(--line)', padding:'22px 0', cursor:'pointer', ...(i===faqs.length-1 ? {borderBottom:'1px solid var(--line)'} : {})}}>
                <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', gap:24}}>
                  <span style={{
                    fontFamily: dir==='editorial' ? 'var(--serif)' : 'var(--sans)',
                    fontStyle: dir==='editorial' ? 'italic' : 'normal',
                    fontWeight: dir==='editorial' ? 500 : 600,
                    fontSize:'clamp(18px, 2vw, 22px)', letterSpacing:'-.01em', color:'var(--ink)',
                  }}>{f.q}</span>
                  <span style={{
                    width:32, height:32, borderRadius:999, border:'1px solid var(--line)',
                    display:'inline-flex', alignItems:'center', justifyContent:'center',
                    color:'var(--ink)', fontSize:18, transition:'transform .3s, background .3s',
                    transform: open===i ? 'rotate(45deg)' : 'none',
                    background: open===i ? 'var(--accent)' : 'transparent',
                    color: open===i ? '#fff' : 'var(--ink)', flexShrink:0,
                  }}>+</span>
                </div>
                <div style={{
                  maxHeight: open===i ? 200 : 0, overflow:'hidden',
                  transition:'max-height .5s cubic-bezier(.2,.8,.2,1)',
                }}>
                  <p style={{marginTop:16, color:'var(--ink-2)', fontSize:15, lineHeight:1.6, maxWidth:680}}>{f.a}</p>
                </div>
              </button>
            ))}
          </div>
        </div>
        <style>{`@media (max-width:900px){ .faq-grid{grid-template-columns:1fr !important; gap:40px} .faq-grid > div:first-child{position:static !important} }`}</style>
      </div>
    </window.Section>
  );
};
window.FAQ = FAQ;
