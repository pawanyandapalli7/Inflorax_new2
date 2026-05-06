// FAQ — added CTA after accordion
const faqs = [
  {q:'How does Inflorax promote my content?', a:'We use targeted distribution strategies to get your content in front of real, relevant audiences on Instagram and YouTube. Everything is done externally — we never need access to your account.'},
  {q:'Do you use real accounts? Will you need my password?', a:'Real accounts only — no bots, no fake followers, nothing that violates platform terms. And we never ask for your password or login credentials. Ever. Your account stays completely in your control.'},
  {q:'How quickly will I see results?', a:'Most creators notice movement within 24–72 hours of their campaign launching. Full results come in over the campaign window. Early signals appear fast.'},
  {q:"Do you guarantee specific numbers?", a:"We don't guarantee specific follower or view counts — anyone who does is misleading you. We guarantee a real, targeted promotion campaign. Results depend on your content, niche, and consistency."},
  {q:"What's the difference between Instagram and YouTube packages?", a:'Instagram packages focus on Reels reach, profile visits, and follower growth. YouTube packages focus on video views, watch-time signals, and subscriber growth. Both use the same no-password, real-accounts approach.'},
  {q:'What happens after I pay?', a:"You'll get a confirmation email with a short onboarding form — 2–3 minutes, no passwords. Once submitted, your campaign launches within 24–72 hours. When it completes, you get a full summary of what was done."},
  {q:'Can I do both Instagram and YouTube?', a:'Yes — purchase packages for both platforms separately. Each campaign is handled independently to match the targeting approach each platform needs.'},
];

const FAQ = () => {
  const [open, setOpen] = useState(-1);
  return (
    <window.Section id="faq" padded>
      <div className="wrap">
        <div style={{display:'grid', gridTemplateColumns:'1fr 1.6fr', gap:80}} className="faq-grid">

          {/* LEFT — sticky */}
          <div style={{position:'sticky', top:120, alignSelf:'start'}}>
            <span className="reveal" style={window.labelStyle}>Common questions</span>
            <h2 className="reveal reveal-d1" style={{...window.bigHeadStyle(), fontSize:'clamp(40px,5vw,80px)', marginTop:18}}>
              Asked.<br/><window.Em>Answered.</window.Em>
            </h2>
            <p className="reveal reveal-d2" style={{marginTop:18, color:'var(--ink-2)', fontSize:15, lineHeight:1.6}}>
              Still unsure?{' '}
              <a href="mailto:info@inflorax.com" style={{color:'var(--accent)', textDecoration:'underline'}}>Email us →</a>
            </p>

            {/* Trust signals in sticky col */}
            <div className="reveal reveal-d3" style={{marginTop:32, display:'flex', flexDirection:'column', gap:10}}>
              {[['🔒','No passwords, ever'],['✓','Real accounts only'],['⚡','Results in 24–72h'],['💳','Secure checkout via Stripe']].map(([ic,t])=>(
                <div key={t} style={{display:'flex', alignItems:'center', gap:10, fontSize:13, color:'var(--ink-2)'}}>
                  <span style={{width:24, height:24, borderRadius:8, background:'rgba(22,101,52,.08)', border:'1px solid rgba(22,101,52,.15)', display:'flex', alignItems:'center', justifyContent:'center', fontSize:12, flexShrink:0}}>{ic}</span>
                  {t}
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT — accordion */}
          <div>
            {faqs.map((f, i) => (
              <button key={i} onClick={()=>setOpen(open===i?-1:i)} className="reveal faq-btn"
                style={{
                  display:'block', width:'100%', textAlign:'left',
                  borderTop:'1px solid var(--line)', padding:'20px 0', cursor:'pointer',
                  WebkitTapHighlightColor:'transparent',
                  ...(i===faqs.length-1?{borderBottom:'1px solid var(--line)'}:{}),
                }}>
                <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', gap:20}}>
                  <span style={{fontFamily:'var(--sans)', fontWeight:600, fontSize:'clamp(15px,1.8vw,18px)', letterSpacing:'-.01em', color:'var(--ink)', lineHeight:1.3}}>{f.q}</span>
                  <span style={{
                    width:30, height:30, borderRadius:999, border:'1px solid var(--line)', flexShrink:0,
                    display:'inline-flex', alignItems:'center', justifyContent:'center',
                    fontSize:17, transition:'transform .3s,background .3s',
                    transform:open===i?'rotate(45deg)':'none',
                    background:open===i?'var(--accent)':'transparent',
                    color:open===i?'#fff':'var(--ink)',
                  }}>+</span>
                </div>
                <div style={{maxHeight:open===i?300:0, overflow:'hidden', transition:'max-height .4s cubic-bezier(.2,.8,.2,1)'}}>
                  <p style={{marginTop:12, color:'var(--ink-2)', fontSize:15, lineHeight:1.65, maxWidth:580, paddingBottom:4}}>{f.a}</p>
                </div>
              </button>
            ))}

            {/* ADDED: CTA after FAQ — high intent moment */}
            <div className="reveal" style={{
              marginTop:36, padding:'28px 28px',
              background:'linear-gradient(135deg,rgba(22,101,52,.07),rgba(22,101,52,.04))',
              borderRadius:20, border:'1px solid rgba(22,101,52,.18)',
            }}>
              <div style={{fontFamily:'var(--mono)', fontSize:10, letterSpacing:'.14em', textTransform:'uppercase', color:'var(--accent)', marginBottom:10}}>Ready to grow?</div>
              <h3 style={{fontFamily:'var(--sans)', fontWeight:800, fontSize:'clamp(20px,3vw,28px)', letterSpacing:'-.03em', color:'var(--ink)', marginBottom:8, lineHeight:1.1}}>
                Your content is ready.<br/>Now make it visible.
              </h3>
              <p style={{fontSize:14, color:'var(--ink-2)', lineHeight:1.6, marginBottom:20, maxWidth:420}}>
                Get a free audit of your profile first — we'll tell you exactly what opportunity you're missing and which plan fits you best.
              </p>
              <div style={{display:'flex', gap:10, flexWrap:'wrap'}}>
                <button onClick={()=>window.openAuditModal&&window.openAuditModal()} style={{
                  display:'inline-flex', alignItems:'center', gap:8,
                  padding:'13px 24px', borderRadius:999,
                  background:'var(--accent)', color:'#fff',
                  border:'none', fontSize:14, fontWeight:700, cursor:'pointer',
                  transition:'opacity .2s', WebkitTapHighlightColor:'transparent',
                }}
                onMouseEnter={e=>e.currentTarget.style.opacity='.85'}
                onMouseLeave={e=>e.currentTarget.style.opacity='1'}>
                  Get my free audit →
                </button>
                <a href="#" onClick={e=>{e.preventDefault();window.scrollToSection&&window.scrollToSection('pricing');}} style={{
                  display:'inline-flex', alignItems:'center', gap:8,
                  padding:'13px 24px', borderRadius:999,
                  background:'transparent', color:'var(--ink)',
                  border:'1px solid var(--line)', fontSize:14, fontWeight:600,
                  textDecoration:'none', transition:'background .2s',
                  WebkitTapHighlightColor:'transparent',
                }}
                onMouseEnter={e=>e.currentTarget.style.background='var(--line)'}
                onMouseLeave={e=>e.currentTarget.style.background='transparent'}>
                  View packages
                </a>
              </div>
              <p style={{marginTop:12, fontSize:11, color:'var(--ink-4)', fontFamily:'var(--mono)'}}>Free · No credit card · 48h turnaround</p>
            </div>
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
