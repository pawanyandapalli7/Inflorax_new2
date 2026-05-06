// PROBLEM — 3D cards + count-up stats strip
const Problem = () => {
  // Count-up stats
  const [r1,c1] = window.useCountUp(93,1500);
  const [r2,c2] = window.useCountUp(72,1500);
  const [r3,c3] = window.useCountUp(4,1200);

  return (
    <window.Section id="problem" padded>
      <div className="wrap">
        <header style={{textAlign:'center',marginBottom:60,maxWidth:980,margin:'0 auto 60px'}}>
          <span className="reveal" style={window.labelStyle}>Where most creators get stuck</span>
          <h2 className="wreveal" style={{...window.bigHeadStyle(),fontSize:'clamp(44px,8vw,132px)',marginTop:18}}>The stage no one talks about.</h2>
          <p className="reveal reveal-d2" style={{marginTop:18,maxWidth:680,margin:'18px auto 0',fontFamily:'var(--serif)',fontStyle:'italic',fontWeight:300,fontSize:'clamp(20px,2.4vw,30px)',lineHeight:1.3,color:'var(--ink-2)'}}>But everyone goes through it.</p>
        </header>

        {/* Stats strip — scrollable on mobile, count-up on enter */}
        <div className="reveal prob-stats-strip" style={{display:'flex',borderRadius:18,overflow:'hidden',border:'1px solid var(--line)',marginBottom:36,overflowX:'auto',scrollSnapType:'x mandatory',WebkitOverflowScrolling:'touch',scrollbarWidth:'none'}}>
          {[
            {ref:r1,val:c1,suffix:'%',label:'of creators never break 1K followers',bg:'var(--soft)',valColor:'var(--accent)'},
            {ref:r2,val:c2,suffix:'%',label:'of Reels reach fewer than 500 people',bg:'var(--accent)',valColor:'#fff'},
            {ref:r3,val:c3,suffix:'×',label:'more reach with targeted promotion',bg:'var(--ink)',valColor:'#4ade80'},
          ].map((s,i)=>(
            <div key={i} ref={s.ref} style={{flex:'0 0 clamp(200px,33.333%,100%)',scrollSnapAlign:'start',padding:'28px 22px',background:s.bg,textAlign:'center',borderRight:i<2?'1px solid var(--line)':'none'}}>
              <div style={{fontFamily:'var(--sans)',fontWeight:900,fontSize:'clamp(40px,5.5vw,64px)',letterSpacing:'-.04em',lineHeight:1,color:s.valColor}}>{s.val}{s.suffix}</div>
              <div style={{fontSize:13,lineHeight:1.45,marginTop:8,color:i===1?'rgba(255,255,255,.8)':i===2?'rgba(255,255,255,.6)':'var(--ink-2)'}}>{s.label}</div>
            </div>
          ))}
        </div>
        <p className="prob-swipe-hint" style={{display:'none',textAlign:'center',fontFamily:'var(--mono)',fontSize:10,color:'var(--ink-3)',letterSpacing:'.08em',textTransform:'uppercase',marginBottom:4,marginTop:-24}}>← swipe for stats →</p>

        <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:24}} className="prob-grid">
          {/* LEFT */}
          <window.Card3D style={{borderRadius:24}}>
            <div className="reveal prob-card" style={{background:'rgba(15,31,15,.04)',border:'1px solid var(--line)',borderRadius:24,padding:'36px 32px',backdropFilter:'blur(8px)',height:'100%'}}>
              <span style={{...window.labelStyle,marginBottom:18,display:'inline-flex'}}>The feeling</span>
              <ul style={{listStyle:'none',display:'flex',flexDirection:'column',gap:10,fontSize:16,lineHeight:1.55,color:'var(--ink-2)',marginTop:14}}>
                {['You post regularly.','You try different types of videos.','You put effort into your content.'].map((t,i)=>(
                  <li key={i} style={{display:'flex',gap:10,alignItems:'center'}}>
                    <span style={{width:18,height:18,borderRadius:'50%',border:'1.5px solid rgba(22,101,52,.3)',display:'flex',alignItems:'center',justifyContent:'center',fontSize:9,color:'var(--accent)',flexShrink:0}}>✓</span>{t}
                  </li>
                ))}
              </ul>
              <p style={{marginTop:24,fontSize:'clamp(20px,2.4vw,28px)',lineHeight:1.25,color:'var(--ink)',fontFamily:'var(--serif)',fontStyle:'italic',fontWeight:400,letterSpacing:'-.02em'}}>But nothing changes.</p>
              <div style={{marginTop:24,padding:'18px 20px',background:'rgba(15,31,15,.05)',borderRadius:14,border:'1px solid var(--line-soft)'}}>
                <div style={{fontSize:11,fontFamily:'var(--mono)',color:'var(--ink-3)',textTransform:'uppercase',letterSpacing:'.1em',marginBottom:12}}>And slowly you start thinking…</div>
                <div style={{display:'flex',flexDirection:'column',gap:8,fontSize:14,color:'var(--ink-2)'}}>
                  {['"Maybe my content is not good enough."','"Do I need a better phone?"','"Am I doing something wrong?"'].map((q,i)=>(
                    <span key={i} style={{paddingLeft:12,borderLeft:'2px solid var(--accent)',fontStyle:'italic'}}>{q}</span>
                  ))}
                </div>
              </div>
              <p style={{marginTop:20,fontSize:14,fontWeight:700,color:'var(--ink)',lineHeight:1.5}}>This is the stage where most people give up.</p>
            </div>
          </window.Card3D>

          {/* RIGHT */}
          <window.Card3D delay={0.1} style={{borderRadius:24}}>
            <div className="reveal reveal-d2 prob-card" style={{background:'linear-gradient(140deg,rgba(10,25,12,.95),rgba(15,31,15,.92))',color:'var(--bone)',borderRadius:24,padding:'36px 32px',position:'relative',overflow:'hidden',border:'1px solid var(--line)',height:'100%'}}>
              <div style={{position:'absolute',top:-60,right:-60,width:280,height:280,borderRadius:'50%',background:'var(--accent)',opacity:.25,filter:'blur(80px)',animation:'blobPulse 6s ease-in-out infinite'}}/>
              <span style={{...window.labelStyle,color:'rgba(240,246,232,.55)',marginBottom:18,display:'inline-flex',position:'relative'}}>The truth</span>
              <h3 style={{fontFamily:'var(--sans)',fontWeight:900,fontSize:'clamp(36px,5vw,72px)',letterSpacing:'-.04em',lineHeight:.95,marginTop:14,position:'relative',textTransform:'uppercase',color:'var(--bone)'}}>
                It's <window.Em>not</window.Em><br/>your content.
              </h3>
              <p style={{marginTop:24,fontSize:16,lineHeight:1.55,color:'rgba(240,246,232,.78)',position:'relative'}}>
                Most creators don't fail because their content is bad. They fail because their content is <span style={{color:'var(--accent)',fontStyle:'italic',fontFamily:'var(--serif)'}}>not being seen</span>.
              </p>
              <div style={{marginTop:28,padding:'20px',background:'rgba(22,101,52,.12)',borderRadius:14,border:'1px solid rgba(22,101,52,.3)',position:'relative'}}>
                <div style={{fontSize:13,color:'rgba(240,246,232,.55)',marginBottom:6,fontFamily:'var(--mono)',textTransform:'uppercase',letterSpacing:'.1em'}}>That's not your fault.</div>
                <div style={{fontSize:'clamp(20px,2.5vw,28px)',fontWeight:800,color:'var(--accent)',letterSpacing:'-.02em'}}>It's a visibility problem.</div>
              </div>
              {/* Pulsing signal */}
              <div style={{position:'relative',marginTop:24,display:'flex',alignItems:'center',gap:12}}>
                <div style={{position:'relative',width:32,height:32,flexShrink:0}}>
                  <div style={{position:'absolute',inset:0,borderRadius:'50%',background:'rgba(22,101,52,.25)',animation:'pingAnim 2s ease-in-out infinite'}}/>
                  <div style={{position:'absolute',inset:4,borderRadius:'50%',background:'rgba(22,101,52,.4)',animation:'pingAnim 2s ease-in-out infinite .4s'}}/>
                  <div style={{position:'absolute',inset:9,borderRadius:'50%',background:'var(--accent)'}}/>
                </div>
                <p style={{fontSize:16,lineHeight:1.55,color:'rgba(240,246,232,.78)',fontWeight:600}}>And that's exactly where we help you.</p>
              </div>
            </div>
          </window.Card3D>
        </div>

        <div className="reveal" style={{marginTop:48,display:'flex',alignItems:'center',justifyContent:'center',gap:16,flexWrap:'wrap'}}>
          <span style={{fontSize:15,color:'var(--ink-2)',fontFamily:'var(--serif)',fontStyle:'italic',fontWeight:600}}>You're not alone. This is where most creators get stuck.</span>
          <a href="#" onClick={e=>{e.preventDefault();window.scrollToSection&&window.scrollToSection("process");}} style={{
            display:'inline-flex',alignItems:'center',gap:8,
            fontSize:14,fontWeight:700,color:'#fff',textDecoration:'none',
            background:'var(--accent)',padding:'12px 22px',borderRadius:999,
            transition:'opacity .2s',boxShadow:'0 4px 16px rgba(22,101,52,.3)',
            WebkitTapHighlightColor:'transparent',
          }}
          onMouseEnter={e=>e.currentTarget.style.opacity='.85'}
          onMouseLeave={e=>e.currentTarget.style.opacity='1'}>See how we fix it →</a>
        </div>
      </div>
      <style>{`
        @keyframes blobPulse{0%,100%{opacity:.25;transform:scale(1)}50%{opacity:.38;transform:scale(1.1)}}
        @keyframes pingAnim{0%{transform:scale(1);opacity:.7}80%,100%{transform:scale(2.4);opacity:0}}
        @media(max-width:900px){.prob-grid{grid-template-columns:1fr !important;gap:16px}}
        @media(max-width:768px){.prob-swipe-hint{display:block !important}.prob-stats-strip>div{flex:0 0 78vw !important}}
        @media(max-width:480px){.prob-card{padding:24px 20px !important}}
      `}</style>
    </window.Section>
  );
};
window.Problem = Problem;
