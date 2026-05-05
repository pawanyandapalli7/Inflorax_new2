// SHOWCASE — Niches we serve (replaces fake agency names)
const NICHES = [
  { id:1, niche:'FITNESS',     icon:'🏋️', desc:'Gym, nutrition, wellness, running, yoga — high-engagement audiences that follow consistently.',    color:'#1b4332', accent:'#40916c' },
  { id:2, niche:'FINANCE',     icon:'📈', desc:'Personal finance, investing, crypto, budgeting — one of the most monetisable creator niches.',    color:'#1e3a5f', accent:'#2d7dd2' },
  { id:3, niche:'LIFESTYLE',   icon:'✨', desc:'Daily life, home, travel, fashion — broad appeal and strong brand deal potential.',                 color:'#4a1942', accent:'#9d4edd' },
  { id:4, niche:'FOOD',        icon:'🍳', desc:'Recipes, restaurants, food reviews — consistently high save rates and share-worthy content.',       color:'#7b2d00', accent:'#e76f51' },
  { id:5, niche:'EDUCATION',   icon:'📚', desc:'How-to, tutorials, explainers — YouTube\'s most rewatchable content category.',                    color:'#1a3a2a', accent:'#52b788' },
  { id:6, niche:'COMEDY',      icon:'😂', desc:'Sketches, reactions, relatable content — viral potential and rapid follower growth.',               color:'#3d2b00', accent:'#f4a261' },
  { id:7, niche:'BEAUTY',      icon:'💄', desc:'Makeup, skincare, hair — one of Instagram\'s most engaged communities.',                            color:'#4a1228', accent:'#c9184a' },
  { id:8, niche:'GAMING',      icon:'🎮', desc:'Gameplay, reviews, gaming culture — YouTube\'s largest single content category by watch time.',     color:'#0d1b2a', accent:'#4cc9f0' },
];

const Showcase = () => {
  const [active, setActive] = useState(0);
  const cur = NICHES[active];

  return (
    <window.Section id="showcase" padded>
      <div className="wrap">
        <div style={{marginBottom:48}}>
          <span className="reveal" style={window.labelStyle}>Niches we serve</span>
          <h2 className="wreveal" style={{...window.bigHeadStyle(), fontSize:'clamp(40px,7vw,108px)', marginTop:14}}>
            We grow creators<br/><window.Em>across every niche.</window.Em>
          </h2>
        </div>

        <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:24}} className="showcase-grid">

          {/* LEFT — niche list */}
          <div className="showcase-niche-list" style={{display:'flex', flexDirection:'column', gap:6}}>
            {NICHES.map((n, i) => (
              <button key={n.id}
                onMouseEnter={() => setActive(i)}
                onClick={() => setActive(i)}
                className="reveal showcase-niche-btn"
                style={{
                  display:'flex', alignItems:'center', gap:16,
                  padding:'16px 20px', borderRadius:14, textAlign:'left',
                  border:'1px solid', cursor:'pointer',
                  borderColor: active===i ? 'var(--accent)' : 'var(--line)',
                  background: active===i ? 'var(--accent-l)' : 'var(--soft)',
                  transition:'all .25s',
                }}>
                <span style={{fontSize:22, flexShrink:0}}>{n.icon}</span>
                <div style={{flex:1}}>
                  <div style={{
                    fontFamily:'var(--mono)', fontWeight:700, fontSize:12,
                    letterSpacing:'.1em', color: active===i ? 'var(--accent)' : 'var(--ink)',
                    transition:'color .25s',
                  }}>{n.niche}</div>
                  <div style={{
                    fontSize:12, color:'var(--ink-3)', marginTop:2, lineHeight:1.4,
                    maxHeight: active===i ? 60 : 0, overflow:'hidden',
                    transition:'max-height .35s cubic-bezier(.2,.8,.2,1)',
                  }}>{n.desc}</div>
                </div>
                <span style={{
                  color: active===i ? 'var(--accent)' : 'var(--ink-4)',
                  fontSize:16, transition:'transform .25s, color .25s',
                  transform: active===i ? 'translateX(4px)' : 'none',
                }}>→</span>
              </button>
            ))}
          </div>

          {/* RIGHT — active niche hero card (desktop only) */}
          <div className="reveal reveal-d1 showcase-sticky showcase-desktop-card" style={{position:'sticky', top:120, alignSelf:'start'}}>
            <div key={cur.id} style={{
              background:`linear-gradient(145deg, ${cur.color}, ${cur.color}dd)`,
              borderRadius:24, padding:'44px 36px',
              minHeight:480, display:'flex', flexDirection:'column',
              justifyContent:'space-between', position:'relative', overflow:'hidden',
              animation:'nicheFadeIn .35s cubic-bezier(.2,.8,.2,1)',
            }}>
              {/* Glow blob */}
              <div style={{position:'absolute', top:-60, right:-60, width:220, height:220, borderRadius:'50%', background:cur.accent, opacity:.18, filter:'blur(60px)'}}/>
              <div style={{position:'absolute', bottom:-80, left:-40, width:180, height:180, borderRadius:'50%', background:cur.accent, opacity:.12, filter:'blur(50px)'}}/>

              <div style={{position:'relative'}}>
                <div style={{fontSize:56, marginBottom:20}}>{cur.icon}</div>
                <div style={{fontFamily:'var(--mono)', fontSize:10, letterSpacing:'.14em', textTransform:'uppercase', color:'rgba(255,255,255,.4)', marginBottom:10}}>Niche {String(active+1).padStart(2,'0')} of {NICHES.length}</div>
                <h3 style={{fontFamily:'var(--sans)', fontWeight:900, fontSize:'clamp(36px,6vw,72px)', letterSpacing:'-.04em', lineHeight:.9, color:'#fff', textTransform:'uppercase'}}>{cur.niche}</h3>
                <p style={{marginTop:20, fontSize:15, lineHeight:1.65, color:'rgba(255,255,255,.65)', maxWidth:380}}>{cur.desc}</p>
              </div>

              <div style={{position:'relative', marginTop:32}}>
                <div style={{display:'flex', gap:20, marginBottom:24}}>
                  {[['Real accounts','No bots'],['Fast results','24–72h'],['Both platforms','IG + YT']].map(([t,s]) => (
                    <div key={t}>
                      <div style={{fontSize:12, fontWeight:700, color:'rgba(255,255,255,.9)'}}>{t}</div>
                      <div style={{fontSize:11, color:'rgba(255,255,255,.45)', fontFamily:'var(--mono)'}}>{s}</div>
                    </div>
                  ))}
                </div>
                <button onClick={() => window.openAuditModal && window.openAuditModal()} style={{
                  background:'rgba(255,255,255,.15)', color:'#fff', border:'1px solid rgba(255,255,255,.25)',
                  padding:'12px 22px', borderRadius:999, fontSize:13, fontWeight:700, cursor:'pointer',
                  backdropFilter:'blur(8px)', transition:'background .2s',
                }}
                onMouseEnter={e => e.currentTarget.style.background='rgba(255,255,255,.25)'}
                onMouseLeave={e => e.currentTarget.style.background='rgba(255,255,255,.15)'}>
                  Get a free audit →
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile — horizontal scroll strip */}
        <div className="showcase-mobile-scroll" style={{display:'none', marginTop:0}}>
          <div style={{
            display:'flex', gap:14, overflowX:'auto', paddingBottom:16,
            scrollSnapType:'x mandatory', WebkitOverflowScrolling:'touch',
            msOverflowStyle:'none', scrollbarWidth:'none',
          }}
          onScroll={e => {
            const el = e.currentTarget;
            const idx = Math.round(el.scrollLeft / (el.offsetWidth * 0.78 + 14));
            setActive(Math.min(idx, NICHES.length - 1));
          }}>
            {NICHES.map((n, i) => (
              <div key={n.id} style={{
                flexShrink:0, width:'78vw', maxWidth:320,
                scrollSnapAlign:'start',
                background:`linear-gradient(145deg, ${n.color}, ${n.color}dd)`,
                borderRadius:20, padding:'28px 24px',
                display:'flex', flexDirection:'column', justifyContent:'space-between',
                minHeight:360, position:'relative', overflow:'hidden',
              }}>
                {/* Glow */}
                <div style={{position:'absolute', top:-40, right:-40, width:160, height:160, borderRadius:'50%', background:n.accent, opacity:.2, filter:'blur(50px)'}}/>
                <div style={{position:'relative'}}>
                  <div style={{fontSize:44, marginBottom:12}}>{n.icon}</div>
                  <div style={{fontFamily:'var(--mono)', fontSize:9, letterSpacing:'.14em', textTransform:'uppercase', color:'rgba(255,255,255,.4)', marginBottom:8}}>
                    Niche {String(i+1).padStart(2,'0')} of {NICHES.length}
                  </div>
                  <h3 style={{fontFamily:'var(--sans)', fontWeight:900, fontSize:32, letterSpacing:'-.03em', lineHeight:.95, color:'#fff', textTransform:'uppercase'}}>
                    {n.niche}
                  </h3>
                  <p style={{marginTop:14, fontSize:13, lineHeight:1.6, color:'rgba(255,255,255,.6)'}}>{n.desc}</p>
                </div>
                <div style={{position:'relative', marginTop:20}}>
                  <div style={{display:'flex', gap:16, marginBottom:16, flexWrap:'wrap'}}>
                    {[['Real accounts','No bots'],['Fast results','24–72h'],['IG + YT','Both']].map(([t,s]) => (
                      <div key={t}>
                        <div style={{fontSize:11, fontWeight:700, color:'rgba(255,255,255,.9)'}}>{t}</div>
                        <div style={{fontSize:10, color:'rgba(255,255,255,.4)', fontFamily:'var(--mono)'}}>{s}</div>
                      </div>
                    ))}
                  </div>
                  <button onClick={() => window.openAuditModal && window.openAuditModal()} style={{
                    background:'rgba(255,255,255,.15)', color:'#fff', border:'1px solid rgba(255,255,255,.25)',
                    padding:'10px 20px', borderRadius:999, fontSize:13, fontWeight:700, cursor:'pointer',
                  }}>
                    Get a free audit →
                  </button>
                </div>
              </div>
            ))}
          </div>
          {/* Scroll indicator */}
          <div style={{display:'flex', justifyContent:'center', gap:6, marginTop:12}}>
            {NICHES.map((_,i) => (
              <div key={i} style={{
                width: active===i ? 24 : 6, height:6, borderRadius:999,
                background: active===i ? 'var(--accent)' : 'var(--line)',
                transition:'all .3s',
              }}/>
            ))}
          </div>
        </div>

        {/* Progress dots */}
        <div className="showcase-dots" style={{display:'flex', justifyContent:'center', gap:8, marginTop:32}}>
          {NICHES.map((_,i) => (
            <button key={i} onClick={() => setActive(i)} style={{
              width: active===i ? 28 : 8, height:8, borderRadius:999,
              background: active===i ? 'var(--accent)' : 'var(--line)',
              border:'none', cursor:'pointer', transition:'all .3s',
            }}/>
          ))}
        </div>
      </div>
      <style>{`
        @keyframes nicheFadeIn{from{opacity:0;transform:translateY(12px)}to{opacity:1;transform:none}}
        @media(max-width:900px){
          .showcase-grid{grid-template-columns:1fr !important}
          .showcase-sticky{position:static !important; margin-top:16px}
          .showcase-niche-list{display:none !important}
          .showcase-dots{display:none !important}
          .showcase-mobile-scroll{display:block !important}
          .showcase-desktop-card{display:none !important}
        }
        @media(max-width:480px){
          .showcase-niche-btn{padding:12px 14px !important}
        }
      `}</style>
    </window.Section>
  );
};
window.Showcase = Showcase;
