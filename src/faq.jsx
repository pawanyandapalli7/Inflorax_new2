// FAQ — 7 tight questions, no overlap
const faqs = [
  {
    q: 'How does Inflorax promote my content?',
    a: 'We use targeted distribution strategies to get your content in front of real, relevant audiences on Instagram and YouTube. Everything is done externally — we never need access to your account.',
  },
  {
    q: 'Do you use real accounts? Will you need my password?',
    a: 'Real accounts only — no bots, no fake followers, nothing that violates platform terms. And we never ask for your password or login credentials. Ever. Your account stays completely in your control.',
  },
  {
    q: 'How quickly will I see results?',
    a: 'Most creators notice movement within 24–72 hours of their campaign launching. Full results come in over the campaign window. Early signals appear fast.',
  },
  {
    q: 'Do you guarantee specific numbers?',
    a: "We don't guarantee specific follower or view counts — anyone who does is misleading you. We guarantee a real, targeted promotion campaign. Results depend on your content, niche, and consistency.",
  },
  {
    q: "What's the difference between Instagram and YouTube packages?",
    a: 'Instagram packages focus on Reels reach, profile visits, and follower growth. YouTube packages focus on video views, watch-time signals, and subscriber growth. Both use the same no-password, real-accounts approach.',
  },
  {
    q: 'What happens after I pay?',
    a: "You'll get a confirmation email with a short onboarding form — 2–3 minutes, no passwords. Once submitted, your campaign launches within 24–72 hours. When it completes, you get a full summary of what was done.",
  },
  {
    q: 'Can I do both Instagram and YouTube?',
    a: 'Yes — purchase packages for both platforms separately. Each campaign is handled independently to match the targeting approach each platform needs.',
  },
];

const FAQ = () => {
  const [open, setOpen] = useState(-1);
  return (
    <window.Section id="faq" padded>
      <div className="wrap">
        <div style={{display:'grid', gridTemplateColumns:'1fr 1.6fr', gap:80}} className="faq-grid">

          {/* LEFT — sticky label */}
          <div style={{position:'sticky', top:120, alignSelf:'start'}}>
            <span className="reveal" style={window.labelStyle}>Common questions</span>
            <h2 className="reveal reveal-d1" style={{...window.bigHeadStyle(), fontSize:'clamp(40px,5vw,80px)', marginTop:18}}>
              Asked.<br/><window.Em>Answered.</window.Em>
            </h2>
            <p className="reveal reveal-d2" style={{marginTop:18, color:'var(--ink-2)', fontSize:15, lineHeight:1.6}}>
              Still unsure?{' '}
              <a href="mailto:info@inflorax.com" style={{color:'var(--accent)', textDecoration:'underline'}}>Email us at info@inflorax.com →</a>
            </p>
          </div>

          {/* RIGHT — accordion */}
          <div>
            {faqs.map((f, i) => (
              <button key={i} onClick={() => setOpen(open===i ? -1 : i)} className="reveal faq-btn"
                style={{
                  display:'block', width:'100%', textAlign:'left',
                  borderTop:'1px solid var(--line)', padding:'20px 0', cursor:'pointer',
                  ...(i===faqs.length-1 ? {borderBottom:'1px solid var(--line)'} : {}),
                }}>
                <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', gap:20}}>
                  <span style={{fontFamily:'var(--sans)', fontWeight:600, fontSize:'clamp(15px,1.8vw,18px)', letterSpacing:'-.01em', color:'var(--ink)', lineHeight:1.3}}>{f.q}</span>
                  <span style={{
                    width:30, height:30, borderRadius:999, border:'1px solid var(--line)', flexShrink:0,
                    display:'inline-flex', alignItems:'center', justifyContent:'center',
                    fontSize:17, transition:'transform .3s, background .3s',
                    transform: open===i ? 'rotate(45deg)' : 'none',
                    background: open===i ? 'var(--accent)' : 'transparent',
                    color: open===i ? '#fff' : 'var(--ink)',
                  }}>+</span>
                </div>
                <div style={{maxHeight:open===i?280:0, overflow:'hidden', transition:'max-height .4s cubic-bezier(.2,.8,.2,1)'}}>
                  <p style={{marginTop:12, color:'var(--ink-2)', fontSize:15, lineHeight:1.65, maxWidth:580, paddingBottom:4}}>{f.a}</p>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>


      <style>{`
        @media(max-width:900px){.faq-grid{grid-template-columns:1fr !important;gap:24px}.faq-grid>div:first-child{position:static !important}}
        @media(max-width:480px){.faq-btn{padding:16px 0 !important}}
      `}</style>
    </window.Section>
  );
};
window.FAQ = FAQ;
