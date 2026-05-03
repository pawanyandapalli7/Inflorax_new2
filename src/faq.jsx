// FAQ — rewritten to match actual Inflorax product
const faqs = [
  {
    q: 'How does Inflorax promote my content?',
    a: 'We use targeted distribution and visibility strategies to get your content in front of real, relevant audiences on Instagram and YouTube. We work externally — we never need access to your account or password.'
  },
  {
    q: 'Do you buy fake followers or use bots?',
    a: 'Never. Every follower and view comes from real people. We don\'t use bots, fake accounts, or any method that violates Instagram or YouTube\'s terms of service. Your account security and standing are always protected.'
  },
  {
    q: 'Will you need my Instagram or YouTube password?',
    a: 'No — never. We work entirely externally. You keep full control of your account at all times. If any service ever asks for your login credentials, that\'s a major red flag.'
  },
  {
    q: 'How quickly will I see results?',
    a: 'Most creators start seeing movement within 24–72 hours of their campaign launching. Full results depend on your package tier, content quality, and niche — but early signals appear fast.'
  },
  {
    q: 'Do you guarantee specific follower or view numbers?',
    a: 'We don\'t guarantee specific numbers — anyone who does is lying. We guarantee a real, targeted promotion campaign. Results vary based on your content, niche, and consistency. We\'re honest about that upfront.'
  },
  {
    q: 'What\'s the difference between Instagram and YouTube packages?',
    a: 'Instagram packages focus on Reels reach, profile visits, and follower growth. YouTube packages focus on video views, watch time signals, and subscriber growth. Both are offered at different tiers based on how much push you need.'
  },
  {
    q: 'Can I do both Instagram and YouTube at the same time?',
    a: 'Yes — you can purchase packages for both platforms. We handle each campaign separately to ensure the right audience targeting for each platform\'s unique algorithm.'
  },
  {
    q: 'What happens after I pay?',
    a: 'You\'ll get a confirmation email with a short onboarding form (2–3 minutes, no passwords). Once submitted, your campaign launches within 24–72 hours. When it completes, we send a full summary of what was done.'
  },
];

const FAQ = () => {
  const dir = window.useDir();
  const [open, setOpen] = useState(-1);
  return (
    <window.Section id="faq" padded>
      <div className="wrap">
        <div style={{display:'grid', gridTemplateColumns:'1fr 1.6fr', gap:80}} className="faq-grid">

          <div style={{position:'sticky', top:120, alignSelf:'start'}}>
            <span className="reveal" style={window.labelStyle}>Common questions</span>
            <h2 className="reveal reveal-d1" style={{...window.bigHeadStyle(), fontSize:'clamp(40px, 5vw, 80px)', marginTop:18}}>
              Asked.<br/><window.Em>Answered.</window.Em>
            </h2>
            <p className="reveal reveal-d2" style={{marginTop:20, color:'var(--ink-2)', fontSize:15, lineHeight:1.6}}>
              Still unsure? <a href="#audit" style={{color:'var(--accent)', textDecoration:'underline'}}>Get a free audit →</a>
            </p>

            {/* Quick trust badges */}
            <div className="reveal reveal-d3" style={{marginTop:32, display:'flex', flexDirection:'column', gap:10}}>
              {[['🔒','Zero passwords, always'],['🛡️','Secure Stripe payments'],['⚡','24–72h campaign start'],['✓','No fake followers, ever']].map(([ic,t]) => (
                <div key={t} style={{display:'flex', alignItems:'center', gap:10, fontSize:13, color:'var(--ink-2)'}}>
                  <span style={{fontSize:14}}>{ic}</span>{t}
                </div>
              ))}
            </div>
          </div>

          <div>
            {faqs.map((f, i) => (
              <button key={i} onClick={() => setOpen(open === i ? -1 : i)} className="reveal"
                style={{
                  display:'block', width:'100%', textAlign:'left',
                  borderTop:'1px solid var(--line)', padding:'20px 0', cursor:'pointer',
                  ...(i === faqs.length - 1 ? {borderBottom:'1px solid var(--line)'} : {}),
                }}>
                <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', gap:20}}>
                  <span style={{
                    fontFamily:'var(--sans)', fontWeight:600,
                    fontSize:'clamp(15px, 1.8vw, 19px)', letterSpacing:'-.01em', color:'var(--ink)',
                    lineHeight:1.3,
                  }}>{f.q}</span>
                  <span style={{
                    width:32, height:32, borderRadius:999, border:'1px solid var(--line)', flexShrink:0,
                    display:'inline-flex', alignItems:'center', justifyContent:'center',
                    fontSize:18, transition:'transform .3s, background .3s',
                    transform: open === i ? 'rotate(45deg)' : 'none',
                    background: open === i ? 'var(--accent)' : 'transparent',
                    color: open === i ? '#fff' : 'var(--ink)',
                  }}>+</span>
                </div>
                <div style={{
                  maxHeight: open === i ? 300 : 0, overflow:'hidden',
                  transition:'max-height .45s cubic-bezier(.2,.8,.2,1)',
                }}>
                  <p style={{marginTop:14, color:'var(--ink-2)', fontSize:15, lineHeight:1.65, maxWidth:600, paddingBottom:4}}>{f.a}</p>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
      <style>{`@media(max-width:900px){.faq-grid{grid-template-columns:1fr !important;gap:40px}.faq-grid>div:first-child{position:static !important}}`}</style>
    </window.Section>
  );
};
window.FAQ = FAQ;
