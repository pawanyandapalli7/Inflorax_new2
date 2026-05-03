// HONEST — What we don't do (radical transparency)
const honest = [
  {icon:'👥', title:"We don't buy followers", body:"Every number you gain comes from real visibility and interest. No bots, no fake accounts, no inflated vanity metrics that disappear next week."},
  {icon:'🚫', title:"We don't promise viral", body:"Anyone who guarantees a viral video is lying. We promise a real strategic push — results depend on your content, niche, and consistency."},
  {icon:'🔐', title:"We don't need your password", body:"Never. Not your Instagram login, not your YouTube credentials. We work externally — your account security is never at risk."},
  {icon:'📅', title:"We don't lock you in", body:"No subscriptions, no retainers, no 3-month commitments. Pay per campaign. If it works, come back. If it doesn't fit, you're free to walk away."},
  {icon:'👁️', title:"We don't hide the numbers", body:"Every package shows you estimated results upfront. What you see is what you can expect."},
  {icon:'💬', title:"We don't disappear after payment", body:"You get a full campaign summary when it's done — everything that was done, and concrete next steps to maintain momentum on your own."},
];

const Honest = () => {
  const dir = window.useDir();
  return (
    <window.Section id="honest" padded>
      <div className="wrap">
        <div style={{marginBottom:52}}>
          <span className="reveal" style={window.labelStyle}>Radical transparency</span>
          <h2 className="wreveal" style={{...window.bigHeadStyle(), fontSize:'clamp(44px, 7vw, 108px)', marginTop:14, maxWidth:900}}>
            What we <window.Em>don't</window.Em> do.
          </h2>
          <p className="reveal reveal-d2" style={{marginTop:16, fontSize:16, color:'var(--ink-2)', maxWidth:560}}>
            We'd rather lose a sale than overpromise. Here's exactly what you won't get from <strong style={{color:'var(--ink)'}}>Inflorax</strong>.
          </p>
        </div>

        <div style={{display:'grid', gridTemplateColumns:'repeat(3, 1fr)', gap:16}} className="honest-grid">
          {honest.map((h, i) => (
            <div key={i} className="reveal" style={{
              padding:'28px 24px', border:'1px solid var(--line)',
              borderRadius: dir==='grid' ? 0 : 18,
              background:'var(--soft)',
              transition:'border-color .25s, transform .25s',
            }}
            onMouseEnter={e => { e.currentTarget.style.borderColor='var(--accent)'; e.currentTarget.style.transform='translateY(-4px)'; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor='var(--line)'; e.currentTarget.style.transform='none'; }}>
              <div style={{
                width:44, height:44, borderRadius:12, background:'var(--accent-l)',
                display:'flex', alignItems:'center', justifyContent:'center',
                fontSize:20, marginBottom:14,
              }}>{h.icon}</div>
              <div style={{fontWeight:700, fontSize:16, color:'var(--ink)', letterSpacing:'-.01em', marginBottom:10}}>{h.title}</div>
              <div style={{width:24, height:2, background:'var(--accent)', marginBottom:14, borderRadius:1}}/>
              <p style={{fontSize:13, lineHeight:1.6, color:'var(--ink-2)'}}>{h.body}</p>
            </div>
          ))}
        </div>

        {/* Bottom strip */}
        <div className="reveal" style={{
          marginTop:36, padding:'22px 28px',
          background:'var(--ink)', color:'var(--bone)',
          borderRadius: dir==='grid' ? 0 : 18,
          display:'flex', alignItems:'center', gap:20, flexWrap:'wrap',
        }}>
          <span style={{fontSize:26}}>🛡️</span>
          <div style={{flex:1, minWidth:200}}>
            <div style={{fontWeight:700, fontSize:15, marginBottom:4}}>Honesty first. Results next.</div>
            <div style={{fontSize:13, color:'rgba(245,236,217,.6)', lineHeight:1.5}}>That's how we've built trust with creators — and why they keep coming back.</div>
          </div>
          <button onClick={() => window.openAuditModal && window.openAuditModal()} style={{
            background:'var(--accent)', color:'#fff', border:'none',
            padding:'12px 22px', borderRadius:999, fontSize:13, fontWeight:700, cursor:'pointer',
            transition:'transform .2s',
          }}
          onMouseEnter={e => e.currentTarget.style.transform='translateY(-2px)'}
          onMouseLeave={e => e.currentTarget.style.transform='none'}>
            Free Audit →
          </button>
        </div>
      </div>
      <style>{`@media(max-width:900px){.honest-grid{grid-template-columns:1fr 1fr !important}} @media(max-width:600px){.honest-grid{grid-template-columns:1fr !important}}`}</style>
    </window.Section>
  );
};
window.Honest = Honest;
