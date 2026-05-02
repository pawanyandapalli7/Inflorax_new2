// HERO — Kinetic, dark warm
const Hero = () => {
  const ref = useRef(null);
  const m = window.useMouse(ref);
  const y = window.useScrollY();

  return (
    <section id="hero-section" data-screen-label="01 hero" ref={ref} style={{
      minHeight:'100svh', position:'relative', overflow:'hidden',
      paddingTop:'calc(74px + clamp(24px, 5vw, 64px))',
      paddingBottom:'clamp(40px, 6vw, 80px)',
      display:'flex', flexDirection:'column', justifyContent:'center',
    }}>
      {/* Floating ghost word */}
      <div aria-hidden style={{
        position:'absolute', right:-40, top:120,
        fontFamily:'var(--serif)', fontStyle:'italic', fontWeight:300,
        fontSize:'clamp(140px, 26vw, 460px)',
        color:'rgba(216,95,31,.07)', lineHeight:1, letterSpacing:'-.04em',
        pointerEvents:'none', userSelect:'none',
        transform:`translate(${m.x*30-15}px, ${-y*.18}px)`,
        transition:'transform .25s ease-out',
      }}>seen</div>

      <div className="wrap" style={{position:'relative', zIndex:2, width:'100%'}}>
        <div className="reveal" style={{...window.labelStyle, marginBottom:18}}>
          <span style={{width:8, height:8, borderRadius:'50%', background:'var(--accent)', boxShadow:'0 0 12px var(--accent)'}}/>
          Where visibility becomes growth
        </div>

        <h1 className="wreveal" style={{...window.bigHeadStyle(), fontSize:'clamp(56px, 13vw, 220px)'}}>
          Your content<br/>
          <span style={{display:'inline-block', transform:`translateX(${m.x*8-4}px)`, color:'var(--accent)'}}>deserves</span>
          {' '}
          <span style={{fontFamily:'var(--serif)', fontStyle:'italic', fontWeight:300, textTransform:'none', letterSpacing:'-.04em', color:'var(--ink-2)'}}>to&nbsp;be</span>
          <br/>
          <span style={{fontFamily:'var(--serif)', fontStyle:'italic', fontWeight:300, textTransform:'none', letterSpacing:'-.04em', color:'var(--accent)'}}>seen.</span>
        </h1>

        <div className="reveal reveal-d2" style={{display:'grid', gridTemplateColumns:'1.2fr 1fr', gap:48, marginTop:48, alignItems:'end'}} >
          <p style={{fontSize:18, lineHeight:1.5, color:'var(--ink-2)', maxWidth:540, fontFamily:'var(--serif)', fontStyle:'italic', fontWeight:300}}>
            You try, you post, you stay consistent — but your videos don't reach enough people. Not because your content is bad… because it's not getting the <span style={{color:'var(--accent)', fontStyle:'normal', fontFamily:'var(--sans)', fontWeight:600, fontSize:17}}>visibility</span> it needs.
          </p>
          <div style={{display:'flex', gap:12, flexWrap:'wrap', justifyContent:'flex-end'}}>
            <window.Btn primary href="#pricing">Start my growth ↗</window.Btn>
            <window.Btn href="#process">See how it works</window.Btn>
          </div>
        </div>
      </div>

      <HeroTickerStrip/>
    </section>
  );
};

const HeroTickerStrip = () => {
  const items = ['Built for creators under 5K · plateau · serious about growth', 'No passwords · no fake engagement', 'Real visibility — not fake numbers', 'Designed for early-stage growth', '7–10 days to first lift', '24 creators in residency'];
  return (
    <div style={{position:'absolute', left:0, right:0, bottom:0, padding:'12px 0', borderTop:'1px solid var(--line)', borderBottom:'1px solid var(--line)', background:'rgba(26,20,10,.04)', overflow:'hidden', maskImage:'linear-gradient(90deg, transparent, #000 8%, #000 92%, transparent)'}}>
      <div style={{display:'flex', gap:48, animation:'tickerL 38s linear infinite', whiteSpace:'nowrap', fontFamily:'var(--mono)', fontSize:11, letterSpacing:'.06em', color:'var(--ink-2)', textTransform:'uppercase'}}>
        {[...items, ...items, ...items].map((it, i) => (
          <span key={i} style={{display:'flex', alignItems:'center', gap:48}}>
            {it}
            <span style={{display:'inline-block', width:6, height:6, borderRadius:'50%', background:'var(--accent)'}}/>
          </span>
        ))}
      </div>
      <style>{`@keyframes tickerL{from{transform:translateX(0)}to{transform:translateX(-33.333%)}}`}</style>
    </div>
  );
};

window.Hero = Hero;
