// MARQUEE — desktop: scrolling ticker | mobile: animated staggered pills with tap interaction
const Marquee = ({words, speed=42, reverse=false, big=true}) => {
  const list = words || ['VISIBILITY','REACH','GROWTH','PROMOTION','DISCOVERY','AUDIENCE','MOMENTUM','EXPOSURE','ENGAGEMENT','RESULTS'];

  const pills = [
    {w:'Visibility',  e:'👁️', accent:false},
    {w:'Reach',       e:'📡', accent:true},
    {w:'Growth',      e:'📈', accent:false},
    {w:'Promotion',   e:'🚀', accent:true},
    {w:'Discovery',   e:'🔍', accent:false},
    {w:'Audience',    e:'👥', accent:false},
    {w:'Momentum',    e:'⚡', accent:true},
    {w:'Exposure',    e:'✨', accent:false},
    {w:'Engagement',  e:'💬', accent:false},
    {w:'Results',     e:'🎯', accent:false},
  ];

  return (
    <div style={{
      borderTop:'1px solid var(--line)', borderBottom:'1px solid var(--line)',
      background:'rgba(15,31,15,.03)', overflow:'hidden',
    }}>

      {/* ── Desktop: scrolling ticker ── */}
      <div className="mq-desktop" style={{padding:'40px 0'}}>
        <div style={{
          display:'flex', gap:48, whiteSpace:'nowrap',
          animation:`mqRun ${speed}s linear infinite`,
          animationDirection: reverse ? 'reverse' : 'normal',
          fontFamily:'var(--sans)', fontWeight:900,
          fontSize:'clamp(56px,11vw,160px)',
          letterSpacing:'-.05em', textTransform:'uppercase',
          color:'var(--ink)', lineHeight:.9,
        }}>
          {[...list,...list,...list].map((w,i)=>(
            <span key={i} style={{display:'inline-flex',alignItems:'center',gap:48}}>
              {i%3===1
                ? <span style={{fontFamily:'var(--serif)',fontStyle:'italic',fontWeight:300,letterSpacing:'-.04em',textTransform:'none',color:'var(--accent)'}}>{w.toLowerCase()}</span>
                : w}
              <span style={{display:'inline-block',width:18,height:18,borderRadius:'50%',background:'var(--accent)',boxShadow:'0 0 30px var(--accent)'}}/>
            </span>
          ))}
        </div>
      </div>

      {/* ── Mobile: interactive animated pill grid ── */}
      <div className="mq-mobile" style={{display:'none', padding:'36px 20px 32px'}}>
        <MobilePillGrid pills={pills}/>
      </div>

      <style>{`
        @keyframes mqRun{from{transform:translateX(0)}to{transform:translateX(-33.333%)}}
        @media(max-width:768px){.mq-desktop{display:none !important}.mq-mobile{display:block !important}}
      `}</style>
    </div>
  );
};

const MobilePillGrid = ({pills}) => {
  const [active, setActive] = useState(null);
  const [entered, setEntered] = useState(false);
  const ref = useRef(null);

  // Trigger entrance animation when scrolled into view
  useEffect(()=>{
    const el = ref.current; if(!el) return;
    const io = new IntersectionObserver(([e])=>{
      if(e.isIntersecting){ setEntered(true); io.disconnect(); }
    },{threshold:0.15});
    io.observe(el);
    return ()=>io.disconnect();
  },[]);

  // Auto-cycle active pill every 1.8s when no user interaction
  const [autoCycle, setAutoCycle] = useState(true);
  const [cycleIdx, setCycleIdx] = useState(0);
  useEffect(()=>{
    if(!autoCycle || !entered) return;
    const id = setInterval(()=>{
      setCycleIdx(p=>(p+1)%pills.length);
    }, 1800);
    return ()=>clearInterval(id);
  },[autoCycle, entered]);

  const displayActive = active !== null ? active : (entered ? cycleIdx : null);

  const handleTap = (i) => {
    setAutoCycle(false);
    setActive(i===active ? null : i);
    // resume auto-cycle after 5s of no interaction
    clearTimeout(window.__pillResume);
    window.__pillResume = setTimeout(()=>{ setActive(null); setAutoCycle(true); }, 5000);
  };

  // Layout: two flowing rows + centered last row
  // Row 1: 3 pills, Row 2: 3 pills, Row 3: 2 pills, Row 4: 2 pills
  const rows = [[0,1,2],[3,4,5],[6,7],[8,9]];

  return (
    <div ref={ref}>
      {/* Eyebrow */}
      <div style={{
        textAlign:'center', marginBottom:24,
        fontFamily:'var(--mono)', fontSize:10, letterSpacing:'.18em',
        textTransform:'uppercase', color:'var(--ink-3)',
        display:'flex', alignItems:'center', justifyContent:'center', gap:12,
      }}>
        <span style={{display:'inline-block', width:24, height:1, background:'var(--line)'}}/>
        What we deliver
        <span style={{display:'inline-block', width:24, height:1, background:'var(--line)'}}/>
      </div>

      {/* Pill rows */}
      <div style={{display:'flex', flexDirection:'column', gap:10, alignItems:'center'}}>
        {rows.map((row, ri)=>(
          <div key={ri} style={{display:'flex', gap:10, justifyContent:'center', flexWrap:'nowrap'}}>
            {row.map(idx=>{
              const pill = pills[idx];
              const isActive = displayActive===idx;
              const isAccent = pill.accent;
              const delay = entered ? idx*0.055 : 0;
              return (
                <button key={idx}
                  onClick={()=>handleTap(idx)}
                  style={{
                    display:'inline-flex', alignItems:'center', gap:8,
                    padding:'13px 18px', borderRadius:999,
                    border:'1.5px solid',
                    cursor:'pointer',
                    fontFamily:'var(--sans)', fontWeight:700, fontSize:15,
                    letterSpacing:'-.01em',
                    WebkitTapHighlightColor:'transparent',
                    userSelect:'none',
                    // entrance animation
                    opacity: entered ? 1 : 0,
                    transform: entered
                      ? (isActive ? 'translateY(-4px) scale(1.06)' : 'translateY(0) scale(1)')
                      : 'translateY(14px) scale(.94)',
                    // colors
                    background: isActive
                      ? 'var(--accent)'
                      : isAccent
                        ? 'var(--accent)'
                        : 'rgba(22,101,52,.06)',
                    borderColor: isActive
                      ? 'var(--accent)'
                      : isAccent
                        ? 'var(--accent)'
                        : 'rgba(22,101,52,.18)',
                    color: (isActive || isAccent) ? '#fff' : 'var(--ink)',
                    boxShadow: isActive
                      ? '0 8px 24px rgba(22,101,52,.3)'
                      : isAccent
                        ? '0 4px 12px rgba(22,101,52,.2)'
                        : 'none',
                    transition: `opacity .5s ease ${delay}s, transform .4s cubic-bezier(.2,.7,.2,1), background .2s, border-color .2s, box-shadow .2s, color .2s`,
                  }}>
                  <span style={{
                    fontSize:17,
                    transform: isActive ? 'scale(1.2) rotate(-5deg)' : 'scale(1) rotate(0)',
                    transition:'transform .3s cubic-bezier(.2,.7,.2,1)',
                    display:'inline-block',
                  }}>{pill.e}</span>
                  {pill.w}
                </button>
              );
            })}
          </div>
        ))}
      </div>

      {/* Active pill description */}
      <div style={{
        marginTop:20, minHeight:40,
        textAlign:'center',
        transition:'opacity .3s',
        opacity: displayActive!==null ? 1 : 0,
      }}>
        {displayActive!==null && (
          <div style={{
            display:'inline-flex', alignItems:'center', gap:8,
            padding:'8px 18px', borderRadius:999,
            background:'rgba(22,101,52,.08)', border:'1px solid rgba(22,101,52,.15)',
            fontSize:13, color:'var(--accent)', fontWeight:600,
            animation:'pillDescIn .3s cubic-bezier(.2,.7,.2,1)',
          }}>
            <span style={{fontSize:15}}>{pills[displayActive].e}</span>
            {pillDescriptions[pills[displayActive].w]}
          </div>
        )}
      </div>

      {/* Tagline */}
      <p style={{
        marginTop:20, textAlign:'center',
        fontFamily:'var(--serif)', fontStyle:'italic', fontWeight:300,
        fontSize:18, color:'var(--ink-2)', lineHeight:1.5,
        opacity: entered ? 1 : 0,
        transform: entered ? 'translateY(0)' : 'translateY(10px)',
        transition:'opacity .6s ease .6s, transform .6s ease .6s',
      }}>
        Everything your content needs to get{' '}
        <span style={{color:'var(--accent)', fontStyle:'normal', fontFamily:'var(--sans)', fontWeight:800}}>seen.</span>
      </p>

      {/* Tap hint — fades out after first tap */}
      <div style={{
        marginTop:12, textAlign:'center',
        fontFamily:'var(--mono)', fontSize:9, letterSpacing:'.1em',
        textTransform:'uppercase', color:'var(--ink-4)',
        opacity: entered && active===null ? 1 : 0,
        transition:'opacity .4s',
      }}>
        Tap any pill to learn more
      </div>

      <style>{`
        @keyframes pillDescIn{from{opacity:0;transform:translateY(6px) scale(.97)}to{opacity:1;transform:none}}
      `}</style>
    </div>
  );
};

const pillDescriptions = {
  'Visibility':  'Your content gets seen by more people',
  'Reach':       'Expand beyond your current followers',
  'Growth':      'Steady increase in followers & subscribers',
  'Promotion':   'Active campaigns on real channels',
  'Discovery':   'New audiences find your profile',
  'Audience':    'Reach people who actually care',
  'Momentum':    'Build consistent, compounding growth',
  'Exposure':    'More impressions, more awareness',
  'Engagement':  'Real interactions from real people',
  'Results':     'Measurable movement in 24–72 hours',
};

window.Marquee = Marquee;
