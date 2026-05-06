// PRICING — fixed: mobile end spacer, 'Show more' for Icon plan, improved disclaimer
const igPlans = [
  {name:'Spark',tier:'Getting Started',n:'01',emoji:'✦',price:79,popular:false,tagline:'For creators who are trying but not getting reach',feats:['Your Reels start reaching more people','Initial visibility boost for your content','Better engagement signals on your posts','Your profile starts getting noticed'],best:'New creators stuck with low views',delivery:'5–7 days',stripe:'https://buy.stripe.com/7sY9AMb5Z69z3Odeuq67S00'},
  {name:'Ignite',tier:'Start Getting Seen',n:'02',emoji:'⚡',price:199,popular:true,tagline:'For creators stuck with low reach',feats:['Strong visibility push for multiple Reels','Your content reaches a larger audience','Higher engagement on your posts','Your profile starts building momentum','Direction to improve your content performance','Priority campaign handling'],best:'Creators who feel stuck and want real movement',delivery:'7–10 days',stripe:'https://buy.stripe.com/3cI00cb5Z2Xn3Od3PM67S01'},
  {name:'Momentum',tier:'Grow Steadily',n:'03',emoji:'📈',price:399,popular:false,tagline:'For creators who want consistent growth',feats:['Continuous visibility for your content','Stronger engagement over time','Better audience targeting','Your profile grows more consistently','Content improvement direction','Reach across multiple posts','Growth tracking summary'],best:'Creators who want regular, consistent growth',delivery:'10–14 days',stripe:'https://buy.stripe.com/dRm28keib2XngAZ86267S02'},
  {name:'Influence',tier:'Become a Creator',n:'04',emoji:'👑',price:799,popular:false,tagline:'For creators serious about building a strong presence',feats:['Long-term visibility support','Strong reach and engagement growth','Profile positioning improvement','Clear content direction','Personal growth guidance','Audience targeting strategy','Multi-post promotion campaign','Detailed results summary'],best:'Creators ready to take content seriously',delivery:'14–21 days',stripe:'https://buy.stripe.com/bJe6oAa1VbtT5Wlbie67S03'},
  {name:'Icon',tier:'Authority',n:'05',emoji:'💎',price:1199,popular:false,tagline:'For creators building a media brand',feats:['Full-scale promotion system','Content + profile overhaul support','Long-term audience building','Profile positioning strategy','Personal growth roadmap','Audience targeting — advanced','Multi-post + multi-platform campaign','Collab & brand outreach support','Detailed performance summary'],best:'Creators building a serious media brand',delivery:'21–30 days',stripe:'https://buy.stripe.com/cNicMY2zt69z0C14TQ67S04'},
];
const ytPlans = [
  {name:'Foundation',tier:'Foundation',n:'01',emoji:'▶',price:399,popular:false,tagline:'For new YouTube creators ready for real visibility',feats:['Initial visibility for your videos','More reach to your content','Better watch-time signals','Your channel starts getting attention'],best:'New YouTube creators',delivery:'14 days',stripe:'https://buy.stripe.com/fZufZafmfeG54Shcmi67S05'},
  {name:'Accelerate',tier:'Start Growing',n:'02',emoji:'🚀',price:799,popular:true,tagline:'For creators stuck with low views',feats:['Strong visibility push for your videos','Better audience reach across videos','Improved engagement signals','Your channel starts growing consistently','Watch-time improvement','Priority campaign handling'],best:'Creators stuck on low views who need momentum',delivery:'21 days',stripe:'https://buy.stripe.com/14A3cofmf7dDdoN0DA67S06'},
  {name:'Scale',tier:'Scale Your Channel',n:'03',emoji:'💎',price:1299,popular:false,tagline:'For creators building a serious YouTube presence',feats:['Long-term growth support','Strong audience building','Better reach and retention signals','Clear growth direction','Multi-video promotion campaign','Channel positioning strategy','Detailed performance summary'],best:'Creators serious about YouTube as a career',delivery:'30 days',stripe:'https://buy.stripe.com/7sYaEQ8XRcxX4Shbie67S07'},
];
const FEAT_SHOW={Spark:4,Ignite:6,Momentum:7,Influence:8,Icon:9,Foundation:4,Accelerate:6,Scale:7};

const Pricing = () => {
  const [platform,setPlatform] = useState('instagram');
  // ADDED: show more toggle for mobile Instagram (5 plans is a lot)
  const [showAll, setShowAll] = useState(false);
  const plans = platform==='instagram'?igPlans:ytPlans;
  const mobilePlans = platform==='instagram' && !showAll ? plans.slice(0,3) : plans;

  return (
    <window.Section id="pricing" padded>
      <div className="wrap">
        <header style={{textAlign:'center',maxWidth:900,margin:'0 auto 44px'}}>
          <span className="reveal" style={window.labelStyle}>Packages</span>
          <h2 className="wreveal" style={{...window.bigHeadStyle(),fontSize:'clamp(44px,8vw,120px)',marginTop:14}}>Start from right now.</h2>
          <p className="reveal reveal-d2" style={{marginTop:14,fontSize:17,color:'var(--ink-2)',maxWidth:520,margin:'14px auto 0',fontFamily:'var(--serif)',fontStyle:'italic',fontWeight:300}}>Pick what fits your situation — we'll help your content finally get seen.</p>
        </header>

        <div className="reveal" style={{display:'flex',justifyContent:'center',marginBottom:40}}>
          <div style={{display:'inline-flex',gap:4,padding:5,borderRadius:999,background:'rgba(15,31,15,.06)',border:'1px solid var(--line)'}}>
            {[{k:'instagram',label:'📸 Instagram'},{k:'youtube',label:'▶️ YouTube'}].map(p=>(
              <button key={p.k} onClick={()=>{setPlatform(p.k);setShowAll(false);}} style={{
                padding:'11px 24px',borderRadius:999,
                background:platform===p.k?'var(--accent)':'transparent',
                color:platform===p.k?'#fff':'var(--ink-2)',
                fontSize:13,fontWeight:700,transition:'all .25s',
                fontFamily:'var(--mono)',letterSpacing:'.04em',textTransform:'uppercase',
                WebkitTapHighlightColor:'transparent',
              }}>{p.label}</button>
            ))}
          </div>
        </div>

        {/* Mobile: snap scroll — FIXED with end spacer + show-more */}
        <div className="price-mobile-scroll" style={{display:'none',overflowX:'auto',gap:12,paddingTop:8,paddingBottom:20,scrollSnapType:'x mandatory',WebkitOverflowScrolling:'touch',scrollbarWidth:'none',marginLeft:-20,marginRight:-20,paddingLeft:20}}>
          {mobilePlans.map((p,i)=><PriceCard key={`mob-${platform}-${i}`} plan={p} showCount={FEAT_SHOW[p.name]||p.feats.length} mobile/>)}
          {/* FIXED: end spacer so last card isn't clipped */}
          <div style={{flexShrink:0,width:20}}/>
        </div>

        {/* Mobile show-more for Instagram */}
        {platform==='instagram' && !showAll && (
          <div className="price-show-more" style={{display:'none',textAlign:'center',marginTop:12}}>
            <button onClick={()=>setShowAll(true)} style={{
              padding:'10px 24px',borderRadius:999,
              border:'1px solid var(--line)',background:'transparent',
              fontSize:13,fontWeight:600,color:'var(--ink-2)',cursor:'pointer',
              WebkitTapHighlightColor:'transparent',
            }}>
              Show all 5 plans ↓
            </button>
          </div>
        )}

        {/* Desktop: grid */}
        <div style={{display:'grid',gridTemplateColumns:`repeat(${plans.length},1fr)`,gap:12,alignItems:'stretch'}} className="price-grid">
          {plans.map((p,i)=><PriceCard key={`${platform}-${i}`} plan={p} showCount={FEAT_SHOW[p.name]||p.feats.length}/>)}
        </div>

        <div className="reveal" style={{marginTop:32,padding:'20px 24px',background:'rgba(22,101,52,.06)',border:'1px solid rgba(22,101,52,.15)',borderRadius:16,display:'flex',alignItems:'center',justifyContent:'space-between',gap:20,flexWrap:'wrap'}}>
          <p style={{fontSize:15,color:'var(--ink-2)',fontFamily:'var(--serif)',fontStyle:'italic',fontWeight:300}}>Not sure which plan fits you?</p>
          <button onClick={()=>window.openAuditModal&&window.openAuditModal()} style={{
            background:'var(--accent)',color:'#fff',border:'none',
            padding:'11px 22px',borderRadius:999,fontSize:13,fontWeight:700,
            cursor:'pointer',whiteSpace:'nowrap',WebkitTapHighlightColor:'transparent',
          }}>Get a free audit — we'll recommend one →</button>
        </div>

        {/* FIXED: disclaimer slightly larger and more legible */}
        <div className="reveal" style={{marginTop:14,display:'flex',flexDirection:'column',gap:5,alignItems:'center'}}>
          {['Results depend on content quality, consistency, and audience response.','We never ask for passwords or login access.','Designed for real visibility — not fake numbers.'].map(t=>(
            <p key={t} style={{fontFamily:'var(--mono)',fontSize:12,color:'var(--ink-3)',letterSpacing:'.03em',textAlign:'center'}}>→ {t}</p>
          ))}
        </div>
      </div>

      <style>{`
        @media(max-width:1200px){.price-grid{grid-template-columns:repeat(3,1fr) !important;gap:10px}}
        @media(max-width:720px){.price-grid{display:none !important}.price-mobile-scroll{display:flex !important}.price-show-more{display:block !important}}
        @media(max-width:480px){.price-card-inner{padding:18px 14px 16px !important}}
      `}</style>
    </window.Section>
  );
};

const PriceCard = ({plan:p,showCount,mobile}) => {
  const ref=useRef(null);
  const [vis,setVis]=useState(false);
  const [hov,setHov]=useState(false);
  const [tilt,setTilt]=useState({x:0,y:0});
  const isPop=p.popular;
  const fillRatio=showCount/9;
  useEffect(()=>{
    if(mobile){setTimeout(()=>setVis(true),80);return;}
    const el=ref.current;if(!el)return;
    const io=new IntersectionObserver(([e])=>{if(e.isIntersecting){setVis(true);io.disconnect();}},{threshold:0.08});
    io.observe(el);return()=>io.disconnect();
  },[]);
  const handleMove=(e)=>{
    if(mobile)return;const r=ref.current.getBoundingClientRect();
    setTilt({x:((e.clientX-r.left)/r.width-.5)*10,y:((e.clientY-r.top)/r.height-.5)*-10});
  };
  return (
    <div ref={ref} className="price-card-inner"
      onMouseEnter={()=>setHov(true)} onMouseMove={handleMove}
      onMouseLeave={()=>{setHov(false);setTilt({x:0,y:0});}}
      style={{
        position:'relative',flexShrink:mobile?0:undefined,
        width:mobile?'clamp(230px,74vw,290px)':undefined,
        scrollSnapAlign:mobile?'start':undefined,
        background:'rgba(255,255,255,.85)',color:'var(--ink)',
        border:isPop?'2px solid var(--accent)':'1.5px solid var(--line)',
        borderRadius:18,padding:'18px 16px 16px',
        display:'flex',flexDirection:'column',backdropFilter:'blur(8px)',
        opacity:vis?1:0,
        transform:vis?(hov?`perspective(700px) rotateY(${tilt.x}deg) rotateX(${tilt.y}deg) translateY(-4px) scale(1.02)`:'perspective(700px) rotateY(0) rotateX(0)'):'translateY(20px)',
        transition:vis?'opacity .5s,transform .3s cubic-bezier(.2,.7,.2,1),box-shadow .25s':'opacity .5s,transform .5s',
        boxShadow:hov?`${-tilt.x*.4}px ${tilt.y*.4}px 28px rgba(22,101,52,.14)`:isPop?'0 4px 24px rgba(22,101,52,.12)':'0 2px 12px rgba(15,31,15,.05)',
        willChange:'transform',WebkitTapHighlightColor:'transparent',
      }}>
      <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:4}}>
        <div style={{fontFamily:'var(--mono)',fontSize:9,letterSpacing:'.12em',textTransform:'uppercase',color:'var(--ink-3)'}}>{p.n} · {p.tier}</div>
        <div style={{display:'flex',alignItems:'center',gap:6}}>
          {isPop&&<span style={{padding:'2px 8px',background:'var(--accent)',color:'#fff',fontSize:8,fontFamily:'var(--mono)',textTransform:'uppercase',letterSpacing:'.1em',borderRadius:999,fontWeight:700}}>★ Popular</span>}
          <span style={{fontSize:18,lineHeight:1}}>{p.emoji}</span>
        </div>
      </div>
      <h3 style={{fontFamily:'var(--sans)',fontWeight:900,fontSize:'clamp(22px,2.4vw,30px)',letterSpacing:'-.03em',lineHeight:1,color:'var(--ink)',marginBottom:4}}>{p.name}</h3>
      <p style={{fontSize:11,color:'var(--ink-3)',marginBottom:12,lineHeight:1.4,fontStyle:'italic',fontFamily:'var(--serif)'}}>{p.tagline}</p>
      <div style={{display:'flex',alignItems:'baseline',gap:6,marginBottom:2}}>
        <span style={{fontFamily:'var(--sans)',fontWeight:900,fontSize:'clamp(26px,3vw,38px)',lineHeight:1,color:'var(--accent)',letterSpacing:'-.03em'}}>${p.price}</span>
        <span style={{fontSize:10,color:'var(--ink-3)',fontFamily:'var(--mono)'}}>one-time</span>
      </div>
      <div style={{fontSize:9,fontFamily:'var(--mono)',color:'var(--ink-3)',letterSpacing:'.06em',textTransform:'uppercase',marginBottom:12}}>Delivered in {p.delivery} · Launch pricing</div>
      <div style={{height:1,background:'var(--line)',marginBottom:10}}/>
      <div style={{marginBottom:8}}>
        <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:4}}>
          <span style={{fontFamily:'var(--mono)',fontSize:9,letterSpacing:'.08em',textTransform:'uppercase',color:'var(--ink-3)'}}>Included</span>
          <span style={{fontFamily:'var(--mono)',fontSize:9,fontWeight:700,color:'var(--accent)',padding:'2px 6px',borderRadius:4,background:'var(--accent-l)'}}>{showCount} services</span>
        </div>
        <div style={{height:2,background:'var(--line)',borderRadius:999}}><div style={{height:'100%',borderRadius:999,width:`${fillRatio*100}%`,background:'var(--accent)',transition:'width .4s ease'}}/></div>
      </div>
      <ul style={{listStyle:'none',display:'flex',flexDirection:'column',gap:5,marginBottom:12,flex:1}}>
        {p.feats.slice(0,showCount).map((f,i)=>(
          <li key={i} style={{display:'flex',gap:7,fontSize:12,lineHeight:1.4,color:'var(--ink-2)'}}>
            <span style={{color:'var(--accent)',fontWeight:700,fontSize:10,marginTop:1,flexShrink:0}}>✓</span><span>{f}</span>
          </li>
        ))}
      </ul>
      <div style={{padding:'8px 10px',borderRadius:8,marginBottom:10,background:'rgba(22,101,52,.06)',border:'1px solid rgba(22,101,52,.12)'}}>
        <div style={{fontSize:8,fontFamily:'var(--mono)',textTransform:'uppercase',letterSpacing:'.08em',color:'var(--ink-3)',marginBottom:2}}>Best for</div>
        <div style={{fontSize:11,fontWeight:600,color:'var(--ink)',lineHeight:1.35}}>{p.best}</div>
      </div>
      <a href={p.stripe} style={{
        display:'flex',alignItems:'center',justifyContent:'center',gap:8,
        padding:'11px 14px',borderRadius:999,
        background:'var(--ink)',color:'#fff',
        border:'1.5px solid var(--ink)',
        fontSize:12,fontWeight:700,textDecoration:'none',
        transition:'background .2s,border-color .2s',
        WebkitTapHighlightColor:'transparent',
      }}
      onMouseEnter={e=>{e.currentTarget.style.background='var(--accent)';e.currentTarget.style.borderColor='var(--accent)';}}
      onMouseLeave={e=>{e.currentTarget.style.background='var(--ink)';e.currentTarget.style.borderColor='var(--ink)';}}>
        Get {p.name} →
      </a>
    </div>
  );
};
window.Pricing = Pricing;
