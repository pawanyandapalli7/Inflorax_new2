// PRICING — Instagram (5) + YouTube (3) with Stripe checkout
const igPlans = [
  {tier:'Spark', icon:'✦', n:'01', name:'Getting Started', price:79, was:129, save:50, popular:false,
    eyebrow:'Perfect for beginners', tag:'For creators trying but not getting reach',
    desc:"You've started posting. You're putting effort. But your videos are not reaching people yet. This is your first step to get your content noticed.",
    feats:['Initial visibility boost','Content optimization basics','Engagement signal improvement','Profile setup & audit','Delivered within 5–7 days'],
    best:'New creators stuck with low views', delivery:'5–7 days',
    stripe:'https://buy.stripe.com/7sY9AMb5Z69z3Odeuq67S00', modal:'Instagram — Spark'},
  {tier:'Ignite', icon:'⚡', n:'02', name:'Start Getting Seen', price:199, was:279, save:80, popular:true,
    eyebrow:'Break your reach ceiling', tag:'For creators stuck with low reach',
    desc:"You've been posting consistently… but nothing is moving. This is where your content finally starts reaching the right people.",
    feats:['Strong visibility push','Advanced growth strategy','Content reaches wider audience','Higher engagement boost','Momentum building system','Delivered within 7–10 days'],
    best:'Creators who feel stuck and want real movement', delivery:'7–10 days',
    stripe:'https://buy.stripe.com/3cI00cb5Z2Xn3Od3PM67S01', modal:'Instagram — Ignite'},
  {tier:'Momentum', icon:'📈', n:'03', name:'Grow Steadily', price:399, was:559, save:160, popular:false,
    eyebrow:'Build consistent growth', tag:'For creators who want consistent growth',
    desc:"You've seen some results… but it's not consistent. This helps you build steady growth and stronger reach.",
    feats:['Continuous visibility','Audience targeting','Content calendar planning','Growth tracking dashboard','Strategy calls weekly','Delivered within 10–14 days'],
    best:'Creators who want regular growth', delivery:'10–14 days',
    stripe:'https://buy.stripe.com/dRm28keib2XngAZ86267S02', modal:'Instagram — Momentum'},
  {tier:'Influence', icon:'👑', n:'04', name:'Become a Creator', price:799, was:1199, save:400, popular:false,
    eyebrow:'Build authority & presence', tag:'For creators serious about a strong presence',
    desc:"You want to grow properly — not just get views. This helps you build a strong and visible creator profile.",
    feats:['Long-term visibility system','Profile positioning','Content production support','Personal growth roadmap','1-on-1 strategy calls','Delivered within 14–21 days'],
    best:'Creators ready to take content seriously', delivery:'14–21 days',
    stripe:'https://buy.stripe.com/bJe6oAa1VbtT5Wlbie67S03', modal:'Instagram — Influence'},
  {tier:'Icon', icon:'💎', n:'05', name:'Authority', price:1499, was:2199, save:700, popular:false,
    eyebrow:'Dominate your niche', tag:'For creators building a media brand',
    desc:"Full-scale brand-building. For creators ready to dominate their niche and turn content into a real media presence.",
    feats:['Full-scale promotion system','Content + profile overhaul','90-day content strategy','2× 1-on-1 strategy calls','Collab & brand outreach','Priority support','Delivered within 21–30 days'],
    best:'Creators building a media brand', delivery:'21–30 days',
    stripe:'https://buy.stripe.com/cNicMY2zt69z0C14TQ67S04', modal:'Instagram — Icon'},
];

const ytPlans = [
  {tier:'Foundation', icon:'🌱', n:'01', name:'Foundation', price:399, was:549, save:150, popular:false,
    eyebrow:'Start your YouTube journey', tag:'For new creators ready for real traction',
    desc:"You've started YouTube… but your videos are not getting views. This helps your channel start getting noticed.",
    feats:['Initial channel boost','Thumbnail & title guidance','Audience discovery push','Better watch-time signals','Delivered within 14 days'],
    best:'New YouTube creators', delivery:'14 days',
    stripe:'https://buy.stripe.com/fZufZafmfeG54Shcmi67S05', modal:'YouTube — Foundation'},
  {tier:'Accelerate', icon:'🚀', n:'02', name:'Start Growing', price:799, was:1099, save:300, popular:true,
    eyebrow:'Break through the plateau', tag:'For creators stuck on low views',
    desc:"You're uploading videos but not seeing growth. This helps your channel gain real momentum.",
    feats:['Multi-video visibility push','Audience targeting','SEO signal boost','Watch-time improvement','Delivered within 21 days'],
    best:'Creators stuck on low views', delivery:'21 days',
    stripe:'https://buy.stripe.com/14A3cofmf7dDdoN0DA67S06', modal:'YouTube — Accelerate'},
  {tier:'Scale', icon:'📡', n:'03', name:'Scale Your Channel', price:1299, was:1799, save:500, popular:false,
    eyebrow:'Serious about YouTube growth', tag:'For creators turning channel into career',
    desc:"You want to build a serious YouTube presence. This helps you scale your channel properly.",
    feats:['Full-scale channel growth system','Long-term audience building','Brand deal preparation','Monetisation strategy support','Delivered within 30 days'],
    best:'Creators serious about YouTube growth', delivery:'30 days',
    stripe:'https://buy.stripe.com/7sYaEQ8XRcxX4Shbie67S07', modal:'YouTube — Scale'},
];

const Pricing = () => {
  const dir = window.useDir();
  const [platform, setPlatform] = useState('instagram');
  const plans = platform==='instagram' ? igPlans : ytPlans;

  return (
    <window.Section id="pricing" padded>
      <div className="wrap">
        <header style={{textAlign:'center', marginBottom:48, maxWidth:880, margin:'0 auto 48px'}}>
          <span className="reveal" style={window.labelStyle}>Packages</span>
          <h2 className="reveal reveal-d1" style={{...window.bigHeadStyle(dir), fontSize:'clamp(40px, 6.5vw, 96px)', marginTop:18}}>
            {dir==='editorial' && <>Start from where<br/>you are <window.Em>right now.</window.Em></>}
            {dir==='kinetic'   && <>Start from<br/><window.Em>right now.</window.Em></>}
            {dir==='grid'      && <>Start from where you are <window.Em>right now.</window.Em></>}
          </h2>
          <p className="reveal reveal-d2" style={{marginTop:22, fontSize:17, color:'var(--ink-2)', maxWidth:600, margin:'22px auto 0'}}>
            Pick what fits your situation — we'll help your content finally get seen.
          </p>
        </header>

        {/* Platform toggle */}
        <div className="reveal" style={{display:'flex', justifyContent:'center', marginBottom:48}}>
          <div style={{display:'inline-flex', gap:4, padding:5, borderRadius:dir==='grid'?6:999, background:'#fff', border:'1px solid var(--line)'}}>
            {[
              {k:'instagram', label:'Instagram', icon:'IG'},
              {k:'youtube', label:'YouTube', icon:'YT'},
            ].map(p => (
              <button key={p.k} onClick={() => setPlatform(p.k)} style={{
                padding:'10px 22px', borderRadius:dir==='grid'?4:999,
                background: platform===p.k ? 'var(--ink)' : 'transparent',
                color: platform===p.k ? 'var(--bone)' : 'var(--ink-2)',
                fontSize:14, fontWeight:600, transition:'all .25s',
                display:'flex', alignItems:'center', gap:8,
              }}>
                <span style={{
                  width:18, height:18, borderRadius:dir==='grid'?2:5,
                  background: platform===p.k ? 'var(--accent)' : 'var(--soft)',
                  display:'inline-flex', alignItems:'center', justifyContent:'center',
                  fontSize:9, fontFamily:'var(--mono)', fontWeight:700,
                  color: platform===p.k ? '#fff' : 'var(--ink-3)',
                }}>{p.icon}</span>
                {p.label}
              </button>
            ))}
          </div>
        </div>

        <div style={{display:'grid', gridTemplateColumns: `repeat(${plans.length}, 1fr)`, gap: dir==='grid' ? 0 : 14}} className="price-grid">
          {plans.map((p, i) => <PriceCard key={`${platform}-${i}`} {...p} idx={i}/>)}
        </div>

        <div className="reveal dis-grid" style={{marginTop:60, padding:'28px 32px', background:'#fff', border:'1px solid var(--line)', borderRadius: dir==='grid' ? 0 : 18, display:'grid', gridTemplateColumns:'repeat(3, 1fr)', gap:24}}>
          {[
            {ic:'⚡', t:'Real visibility — not fake numbers', s:'Designed for actual reach, not vanity metrics.'},
            {ic:'🔒', t:'No passwords or login access', s:'We never ask for credentials. Ever.'},
            {ic:'📈', t:'Results depend on you too', s:'Content quality, consistency, and audience response matter.'},
          ].map((x,i) => (
            <div key={i} style={{display:'flex', gap:14, alignItems:'flex-start'}}>
              <span style={{fontSize:20}}>{x.ic}</span>
              <div>
                <div style={{fontSize:14, fontWeight:700, color:'var(--ink)', marginBottom:4}}>{x.t}</div>
                <div style={{fontSize:13, color:'var(--ink-3)', lineHeight:1.5}}>{x.s}</div>
              </div>
            </div>
          ))}
        </div>

        <style>{`@media (max-width:1200px){
          .price-grid{grid-template-columns:repeat(3, 1fr) !important; gap:14px !important}
        }
        @media (max-width:820px){
          .price-grid{grid-template-columns:repeat(2, 1fr) !important}
        }
        @media (max-width:540px){
          .price-grid{grid-template-columns:1fr !important}
          .dis-grid{grid-template-columns:1fr !important}
        }`}</style>
      </div>
    </window.Section>
  );
};

const PriceCard = (p) => {
  const dir = window.useDir();
  const isPop = p.popular;
  return (
    <div className="reveal" style={{
      position:'relative',
      background: isPop ? 'var(--ink)' : '#fff',
      color: isPop ? 'var(--bone)' : 'var(--ink)',
      border:'1px solid', borderColor: isPop ? 'var(--ink)' : 'var(--line)',
      borderRadius: dir==='grid' ? 0 : 20,
      padding:'28px 22px',
      marginLeft: dir==='grid' && p.idx>0 ? -1 : 0,
      transition:'transform .3s, box-shadow .3s',
      display:'flex', flexDirection:'column',
      transform: isPop ? 'translateY(-12px)' : 'none',
    }}
    onMouseEnter={e => { if (!isPop) e.currentTarget.style.transform='translateY(-6px)' }}
    onMouseLeave={e => { if (!isPop) e.currentTarget.style.transform='none' }}>
      {isPop && (
        <div style={{position:'absolute', top:-12, left:'50%', transform:'translateX(-50%)', padding:'5px 12px', background:'var(--accent)', color:'#fff', fontSize:10, fontFamily:'var(--mono)', textTransform:'uppercase', letterSpacing:'.12em', borderRadius:999, fontWeight:700, whiteSpace:'nowrap'}}>★ Most Popular</div>
      )}
      <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:12}}>
        <span style={{fontFamily:'var(--mono)', fontSize:11, color: isPop ? 'rgba(255,255,255,.6)' : 'var(--ink-3)', letterSpacing:'.1em'}}>{p.n} · {p.tier.toUpperCase()}</span>
        <span style={{fontSize:18}}>{p.icon}</span>
      </div>
      <h3 style={{
        fontFamily:dir==='editorial'?'var(--serif)':'var(--sans)',
        fontStyle:dir==='editorial'?'italic':'normal',
        fontWeight:dir==='editorial'?500:700,
        fontSize:24, letterSpacing:'-.02em', lineHeight:1.05, color: isPop ? '#fff' : 'var(--ink)'}}>
        {p.name}
      </h3>
      <p style={{marginTop:6, fontSize:12, color: isPop ? 'rgba(255,255,255,.7)' : 'var(--ink-3)', lineHeight:1.45, fontStyle:'italic'}}>{p.tag}</p>

      <div style={{margin:'20px 0 16px', display:'flex', alignItems:'baseline', gap:8, flexWrap:'wrap'}}>
        <span style={{fontFamily:dir==='editorial'?'var(--serif)':'var(--sans)', fontWeight: dir==='editorial'?500:700, fontSize:42, lineHeight:1, color:'var(--accent)'}}>${p.price}</span>
        <span style={{fontSize:14, textDecoration:'line-through', color: isPop ? 'rgba(255,255,255,.4)' : 'var(--ink-4)'}}>${p.was}</span>
        <span style={{fontSize:10, fontFamily:'var(--mono)', fontWeight:700, padding:'3px 7px', borderRadius:4, background:'var(--accent)', color:'#fff', letterSpacing:'.08em'}}>SAVE ${p.save}</span>
      </div>

      <p style={{fontSize:13, lineHeight:1.55, color: isPop ? 'rgba(255,255,255,.85)' : 'var(--ink-2)', marginBottom:18, paddingBottom:18, borderBottom:'1px solid', borderColor: isPop ? 'rgba(255,255,255,.1)' : 'var(--line)'}}>{p.desc}</p>

      <ul style={{listStyle:'none', display:'flex', flexDirection:'column', gap:9, marginBottom:20, flex:1}}>
        {p.feats.map((f, i) => (
          <li key={i} style={{display:'flex', gap:10, fontSize:13, lineHeight:1.45, color: isPop ? 'rgba(255,255,255,.9)' : 'var(--ink-2)'}}>
            <span style={{color:'var(--accent)', fontWeight:700, marginTop:1}}>✓</span>
            <span>{f}</span>
          </li>
        ))}
      </ul>

      <div style={{display:'flex', flexDirection:'column', gap:6, padding:'12px 12px', background: isPop ? 'rgba(255,255,255,.06)' : 'var(--soft)', borderRadius:dir==='grid'?0:10, marginBottom:14}}>
        <div style={{fontSize:10, fontFamily:'var(--mono)', textTransform:'uppercase', letterSpacing:'.08em', color: isPop ? 'rgba(255,255,255,.6)' : 'var(--ink-3)'}}>Best for</div>
        <div style={{fontSize:12, fontWeight:600, color: isPop ? '#fff' : 'var(--ink)', lineHeight:1.4}}>{p.best}</div>
      </div>

      <a href={p.stripe} target="_blank" rel="noopener" style={{
        display:'inline-flex', alignItems:'center', justifyContent:'center', gap:8,
        padding:'14px 18px', borderRadius: dir==='grid' ? 0 : 999,
        background: isPop ? 'var(--accent)' : 'var(--ink)',
        color:'#fff', fontSize:14, fontWeight:600,
        transition:'transform .2s',
      }}
      onMouseEnter={e => e.currentTarget.style.transform='translateY(-2px)'}
      onMouseLeave={e => e.currentTarget.style.transform='none'}>
        Get {p.tier} →
      </a>
    </div>
  );
};

window.Pricing = Pricing;
