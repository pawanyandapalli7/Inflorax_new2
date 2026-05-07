// SHOWCASE — 3D carousel with peek cards left/right + niche list
const NICHES = [
  {id:1,niche:'FITNESS',icon:'🏋️',desc:'Gym, nutrition, wellness, running, yoga — high-engagement audiences that follow consistently.',color:'#0f4d32',color2:'#186c4a',color3:'#0b2a1d',accent:'#40916c'},
  {id:2,niche:'FINANCE',icon:'📈',desc:'Personal finance, investing, crypto, budgeting — one of the most monetisable creator niches.',color:'#132c4c',color2:'#25568e',color3:'#081220',accent:'#2d7dd2'},
  {id:3,niche:'LIFESTYLE',icon:'✨',desc:'Daily life, home, travel, fashion — broad appeal and strong brand deal potential.',color:'#5d2f5b',color2:'#aa5da4',color3:'#250f24',accent:'#9d4edd'},
  {id:4,niche:'BEAUTY',icon:'💄',desc:"Makeup, skincare, hair — one of Instagram's most engaged communities.",color:'#782947',color2:'#de6e9d',color3:'#290b16',accent:'#c9184a'},
  {id:5,niche:'GAMING',icon:'🎮',desc:"Gameplay, reviews, gaming culture — YouTube's largest single content category by watch time.",color:'#352778',color2:'#7463e6',color3:'#100d25',accent:'#4cc9f0'},
  {id:6,niche:'FOOD',icon:'🍳',desc:'Recipes, restaurants, food reviews — consistently high save rates and share-worthy content.',color:'#5c1e00',color2:'#c45c20',color3:'#2a0e00',accent:'#e76f51'},
  {id:7,niche:'EDUCATION',icon:'📚',desc:"How-to, tutorials, explainers — YouTube's most rewatchable content category.",color:'#0d2e1a',color2:'#1a6b3c',color3:'#061508',accent:'#52b788'},
  {id:8,niche:'COMEDY',icon:'😂',desc:'Sketches, reactions, relatable content — viral potential and rapid follower growth.',color:'#3d2b00',color2:'#b87d00',color3:'#1a1200',accent:'#f4a261'},
];

const Showcase = () => {
  const [active, setActive] = useState(0);
  const [dragging, setDragging] = useState(false);
  const [dragStart, setDragStart] = useState(null);
  const n = NICHES.length;

  const prev = () => setActive(a => (a - 1 + n) % n);
  const next = () => setActive(a => (a + 1) % n);

  // Touch/drag swipe
  const onTouchStart = (e) => { setDragStart(e.touches[0].clientX); };
  const onTouchEnd = (e) => {
    if (dragStart === null) return;
    const diff = dragStart - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 40) diff > 0 ? next() : prev();
    setDragStart(null);
  };

  // Keyboard
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'ArrowLeft') prev();
      if (e.key === 'ArrowRight') next();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  return (
    <window.Section id="showcase" padded>
      <div className="wrap">
        {/* Header */}
        <div style={{marginBottom:48}}>
          <span className="reveal" style={window.labelStyle}>Niches we serve</span>
          <div style={{marginTop:14}}>
            <div className="wreveal" style={{...window.bigHeadStyle(), fontSize:'clamp(40px,7vw,120px)'}}>
              WE GROW
            </div>
            <div style={{display:'flex', flexWrap:'wrap', alignItems:'flex-end', gap:'0 16px', marginTop:'-0.08em'}}>
              <span style={{...window.bigHeadStyle(), fontSize:'clamp(40px,7vw,120px)'}}>CREATORS</span>
              <span style={{fontFamily:'var(--serif)', fontStyle:'italic', fontWeight:300, fontSize:'clamp(32px,5.5vw,96px)', letterSpacing:'-.04em', color:'var(--accent)', lineHeight:1.05}}>
                across every niche.
              </span>
            </div>
          </div>
        </div>

        {/* Desktop: list left + 3D carousel right */}
        <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:40, alignItems:'start'}} className="showcase-grid">

          {/* LEFT — niche list */}
          <div className="showcase-niche-list" style={{display:'flex', flexDirection:'column', gap:10}}>
            {NICHES.map((niche, i) => (
              <button key={niche.id}
                onMouseEnter={() => setActive(i)}
                onClick={() => setActive(i)}
                className="reveal"
                style={{
                  display:'flex', alignItems:'center', justifyContent:'space-between',
                  padding:'18px 22px', borderRadius:26,
                  border:'1px solid',
                  borderColor: active===i ? 'var(--accent)' : 'rgba(15,31,15,.12)',
                  background: active===i ? '#e8eee1' : '#e3ead9',
                  cursor:'pointer', textAlign:'left',
                  transition:'all .3s', WebkitTapHighlightColor:'transparent',
                  boxShadow: active===i ? '0 10px 30px rgba(0,0,0,.04)' : 'none',
                }}>
                <div style={{display:'flex', alignItems:'flex-start', gap:16}}>
                  <span style={{fontSize:22, marginTop:2}}>{niche.icon}</span>
                  <div>
                    <div style={{fontFamily:'var(--mono)', fontWeight:700, fontSize:12, letterSpacing:'.22em', textTransform:'uppercase', color:'var(--ink)'}}>{niche.niche}</div>
                    <div style={{
                      fontSize:14, lineHeight:1.55, color:'var(--ink-3)',
                      maxHeight: active===i ? 80 : 0, overflow:'hidden',
                      transition:'max-height .3s, opacity .3s',
                      opacity: active===i ? 1 : 0, marginTop: active===i ? 6 : 0,
                    }}>{niche.desc}</div>
                  </div>
                </div>
                <span style={{color:'var(--ink-3)', fontSize:18, transition:'transform .25s', transform:active===i?'translateX(4px)':'none'}}>→</span>
              </button>
            ))}
          </div>

          {/* RIGHT — 3D carousel */}
          <div className="showcase-carousel-desktop" style={{position:'sticky', top:100, alignSelf:'start'}}>
            <Carousel3D active={active} setActive={setActive} onPrev={prev} onNext={next}/>
          </div>
        </div>

        {/* Mobile: full-width carousel */}
        <div className="showcase-mobile-carousel" style={{display:'none'}}>
          <Carousel3D active={active} setActive={setActive} onPrev={prev} onNext={next} mobile/>
          {/* Mobile niche dots */}
          <div style={{display:'flex', justifyContent:'center', gap:6, marginTop:20}}>
            {NICHES.map((_,i) => (
              <button key={i} onClick={() => setActive(i)} style={{
                width:active===i?24:6, height:6, borderRadius:999,
                background:active===i?'var(--accent)':'var(--line)',
                border:'none', cursor:'pointer', transition:'all .3s',
                WebkitTapHighlightColor:'transparent',
              }}/>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @media(max-width:960px){
          .showcase-grid{grid-template-columns:1fr !important}
          .showcase-niche-list{display:none !important}
          .showcase-carousel-desktop{display:none !important}
          .showcase-mobile-carousel{display:block !important}
        }
      `}</style>
    </window.Section>
  );
};

const Carousel3D = ({active, setActive, onPrev, onNext, mobile}) => {
  const n = NICHES.length;
  const [touchStart, setTouchStart] = useState(null);

  const onTouchStart = (e) => setTouchStart(e.touches[0].clientX);
  const onTouchEnd = (e) => {
    if (touchStart === null) return;
    const diff = touchStart - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 40) diff > 0 ? onNext() : onPrev();
    setTouchStart(null);
  };

  return (
    <div style={{position:'relative', width:'100%'}}>
      {/* 3D stage */}
      <div
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
        style={{
          position:'relative',
          height: mobile ? 440 : 580,
          perspective: 2200,
          overflow:'hidden',
          display:'flex', alignItems:'center', justifyContent:'center',
        }}>
        {NICHES.map((niche, index) => {
          const offset = (index - active + n) % n;
          let transform, opacity, zIdx, scale;

          if (offset === 0) {
            transform = 'translateX(0px) rotateY(0deg)';
            opacity = 1; zIdx = 30; scale = 1;
          } else if (offset === 1) {
            transform = `translateX(${mobile?'54%':'260px'}) rotateY(-28deg)`;
            opacity = 0.45; zIdx = 10; scale = 0.86;
          } else if (offset === n - 1) {
            transform = `translateX(${mobile?'-54%':'-260px'}) rotateY(28deg)`;
            opacity = 0.45; zIdx = 10; scale = 0.86;
          } else {
            transform = 'translateX(0px)';
            opacity = 0; zIdx = 0; scale = 0.7;
          }

          const grad = `radial-gradient(circle at top left, rgba(${hexToRgb(niche.color)},0.95), rgba(${hexToRgb(niche.color2)},0.9), rgba(${hexToRgb(niche.color3)},1))`;

          return (
            <div key={niche.id}
              onClick={() => offset !== 0 && (offset === 1 ? onNext() : onPrev())}
              style={{
                position:'absolute',
                transform,
                opacity,
                zIndex: zIdx,
                transition:'all .7s cubic-bezier(0.22,1,0.36,1)',
                cursor: offset !== 0 ? 'pointer' : 'default',
                width: mobile ? '78vw' : 460,
                maxWidth: mobile ? 340 : 460,
              }}>
              <div style={{
                borderRadius:32,
                padding: mobile ? '32px 28px' : '44px 40px',
                background: grad,
                minHeight: mobile ? 380 : 520,
                position:'relative', overflow:'hidden',
                transform:`scale(${scale})`,
                transformOrigin:'center center',
                boxShadow:'0 40px 120px rgba(0,0,0,.22)',
                display:'flex', flexDirection:'column',
              }}>
                {/* Inner glow */}
                <div style={{position:'absolute',inset:0,background:'radial-gradient(circle at top right,rgba(255,255,255,.14),transparent 35%)',pointerEvents:'none'}}/>

                <div style={{position:'relative', zIndex:1, display:'flex', flexDirection:'column', height:'100%'}}>
                  <div style={{fontSize: mobile?44:56, marginBottom: mobile?16:24}}>{niche.icon}</div>
                  <div style={{fontFamily:'var(--mono)',fontSize:10,letterSpacing:'.35em',textTransform:'uppercase',color:'rgba(255,255,255,.55)',marginBottom:12}}>
                    Niche {String(index+1).padStart(2,'0')} of {n}
                  </div>
                  <h2 style={{
                    fontFamily:'var(--sans)', fontWeight:900,
                    fontSize: mobile ? 'clamp(44px,11vw,64px)' : 72,
                    letterSpacing:'-.06em', lineHeight:.9,
                    color:'#fff', textTransform:'uppercase', margin:0,
                  }}>{niche.niche}</h2>
                  <p style={{
                    marginTop:20, fontSize: mobile?15:18,
                    lineHeight:1.6, color:'rgba(255,255,255,.72)',
                    flex:1,
                  }}>{niche.desc}</p>

                  {/* Stats row */}
                  <div style={{display:'flex', gap: mobile?20:32, marginTop: mobile?20:32, marginBottom: mobile?20:32}}>
                    {[['Real growth','Organic reach'],['Fast scaling','Short-form content']].map(([t,s])=>(
                      <div key={t}>
                        <div style={{fontSize:15,fontWeight:700,color:'rgba(255,255,255,.9)'}}>{t}</div>
                        <div style={{fontSize:12,color:'rgba(255,255,255,.45)',fontFamily:'var(--mono)'}}>{s}</div>
                      </div>
                    ))}
                  </div>

                  <button onClick={(e)=>{e.stopPropagation();window.openAuditModal&&window.openAuditModal();}} style={{
                    display:'flex',alignItems:'center',gap:8,
                    padding:'14px 24px',borderRadius:999,
                    border:'1px solid rgba(255,255,255,.2)',
                    background:'rgba(255,255,255,.1)',
                    color:'#fff',fontSize:14,fontWeight:600,
                    cursor:'pointer',backdropFilter:'blur(12px)',
                    transition:'background .2s',width:'fit-content',
                    WebkitTapHighlightColor:'transparent',
                  }}
                  onMouseEnter={e=>e.currentTarget.style.background='rgba(255,255,255,.22)'}
                  onMouseLeave={e=>e.currentTarget.style.background='rgba(255,255,255,.1)'}>
                    Get a free audit →
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Prev / Next buttons */}
      <div style={{display:'flex',justifyContent:'center',gap:12,marginTop:20}}>
        <button onClick={onPrev} style={{
          width:44,height:44,borderRadius:'50%',
          border:'1px solid var(--line)',background:'var(--soft)',
          cursor:'pointer',fontSize:18,color:'var(--ink)',
          display:'flex',alignItems:'center',justifyContent:'center',
          transition:'background .2s,border-color .2s',
          WebkitTapHighlightColor:'transparent',
        }}
        onMouseEnter={e=>{e.currentTarget.style.background='var(--accent)';e.currentTarget.style.color='#fff';e.currentTarget.style.borderColor='var(--accent)';}}
        onMouseLeave={e=>{e.currentTarget.style.background='var(--soft)';e.currentTarget.style.color='var(--ink)';e.currentTarget.style.borderColor='var(--line)';}}>‹</button>
        <button onClick={onNext} style={{
          width:44,height:44,borderRadius:'50%',
          border:'1px solid var(--line)',background:'var(--soft)',
          cursor:'pointer',fontSize:18,color:'var(--ink)',
          display:'flex',alignItems:'center',justifyContent:'center',
          transition:'background .2s,border-color .2s',
          WebkitTapHighlightColor:'transparent',
        }}
        onMouseEnter={e=>{e.currentTarget.style.background='var(--accent)';e.currentTarget.style.color='#fff';e.currentTarget.style.borderColor='var(--accent)';}}
        onMouseLeave={e=>{e.currentTarget.style.background='var(--soft)';e.currentTarget.style.color='var(--ink)';e.currentTarget.style.borderColor='var(--line)';}}>›</button>
      </div>
    </div>
  );
};

// Helper: hex to rgb values for gradient
function hexToRgb(hex) {
  const r = parseInt(hex.slice(1,3),16);
  const g = parseInt(hex.slice(3,5),16);
  const b = parseInt(hex.slice(5,7),16);
  return `${r},${g},${b}`;
}

window.Showcase = Showcase;
