// PRICING — dark warm Kinetic
const igPlans = [
  {tier:'Spark', n:'01', name:'Getting Started', price:79, was:129, save:50, popular:false,
    tag:'For creators trying but not getting reach',
    desc:"You've started posting. You're putting effort. But your videos are not reaching people yet.",
    feats:['Initial visibility boost','Content optimization basics','Engagement signal improvement','Profile setup & audit','Delivered within 5–7 days'],
    best:'New creators stuck with low views', delivery:'5–7 days',
    stripe:'https://buy.stripe.com/7sY9AMb5Z69z3Odeuq67S00'},
  {tier:'Ignite', n:'02', name:'Start Getting Seen', price:199, was:279, save:80, popular:true,
    tag:'For creators stuck with low reach',
    desc:"You've been posting consistently… but nothing is moving. Your content finally starts reaching the right people.",
    feats:['Strong visibility push','Advanced growth strategy','Content reaches wider audience','Higher engagement boost','Momentum building system','Delivered within 7–10 days'],
    best:'Creators who feel stuck and want real movement', delivery:'7–10 days',
    stripe:'https://buy.stripe.com/3cI00cb5Z2Xn3Od3PM67S01'},
  {tier:'Momentum', n:'03', name:'Grow Steadily', price:399, was:559, save:160, popular:false,
    tag:'For creators who want consistent growth',
    desc:"You've seen some results… but it's not consistent. This builds steady growth and stronger reach.",
    feats:['Continuous visibility','Audience targeting','Content calendar planning','Growth tracking dashboard','Strategy calls weekly','Delivered within 10–14 days'],
    best:'Creators who want regular growth', delivery:'10–14 days',
    stripe:'https://buy.stripe.com/dRm28keib2XngAZ86267S02'},
  {tier:'Influence', n:'04', name:'Become a Creator', price:799, was:1199, save:400, popular:false,
    tag:'For creators serious about a strong presence',
    desc:"You want to grow properly — not just get views. Build a strong and visible creator profile.",
    feats:['Long-term visibility system','Profile positioning','Content production support','Personal growth roadmap','1-on-1 strategy calls','Delivered within 14–21 days'],
    best:'Creators ready to take content seriously', delivery:'14–21 days',
    stripe:'https://buy.stripe.com/bJe6oAa1VbtT5Wlbie67S03'},
  {tier:'Icon', n:'05', name:'Authority', price:1499, was:2199, save:700, popular:false,
    tag:'For creators building a media brand',
    desc:"Full-scale brand-building. Dominate your niche and turn content into a real media presence.",
    feats:['Full-scale promotion system','Content + profile overhaul','90-day content strategy','2× 1-on-1 strategy calls','Collab & brand outreach','Priority support','Delivered within 21–30 days'],
    best:'Creators building a media brand', delivery:'21–30 days',
    stripe:'https://buy.stripe.com/cNicMY2zt69z0C14TQ67S04'},
];

const ytPlans = [
  {tier:'Foundation', n:'01', name:'Foundation', price:399, was:549, save:150, popular:false,
    tag:'For new creators ready for real traction',
    desc:"You've started YouTube… but your videos are not getting views. Your channel starts getting noticed.",
    feats:['Initial channel boost','Thumbnail & title guidance','Audience discovery push','Better watch-time signals','Delivered within 14 days'],
    best:'New YouTube creators', delivery:'14 days',
    stripe:'https://buy.stripe.com/fZufZafmfeG54Shcmi67S05'},
  {tier:'Accelerate', n:'02', name:'Start Growing', price:799, was:1099, save:300, popular:true,
    tag:'For creators stuck on low views',
    desc:"You're uploading videos but not seeing growth. Your channel gains real momentum.",
    feats:['Multi-video visibility push','Audience targeting','SEO signal boost','Watch-time improvement','Delivered within 21 days'],
    best:'Creators stuck on low views', delivery:'21 days',
    stripe:'https://buy.stripe.com/14A3cofmf7dDdoN0DA67S06'},
  {tier:'Scale', n:'03', name:'Scale Your Channel', price:1299, was:1799, save:500, popular:false,
    tag:'For creators turning channel into career',
    desc:"You want to build a serious YouTube presence. Scale your channel properly.",
    feats:['Full-scale channel growth system','Long-term audience building','Brand deal preparation','Monetisation strategy support','Delivered within 30 days'],
    best:'Creators serious about YouTube growth', delivery:'30 days',
    stripe:'https://buy.stripe.com/7sYaEQ8XRcxX4Shbie67S07'},
];

const Pricing = () => {
  const [platform, setPlatform] = useState('instagram');
  const plans = platform==='instagram' ? igPlans : ytPlans;

  return (
    <window.Section id="pricing" padded>
      <div className="wrap">
        <header style={{textAlign:'center', marginBottom:36, maxWidth:980, margin:'0 auto 36px'}}>
          <span className="reveal" style={window.labelStyle}>Packages</span>
          <h2 className="wreveal" style={{...window.bigHeadStyle(), fontSize:'clamp(44px, 8vw, 132px)', marginTop:14}}>
            Start from right now.
          </h2>
          <p className="reveal reveal-d2" style={{marginTop:16, fontSize:16, color:'var(--ink-2)', maxWidth:560, margin:'16px auto 0', fontFamily:'var(--serif)', fontStyle:'italic', fontWeight:300}}>
            Pick what fits your situation — we'll help your content finally get seen.
          </p>
        </header>

        <div className="reveal" style={{display:'flex', justifyContent:'center', marginBottom:36}}>
          <div style={{display:'inline-flex', gap:4, padding:5, borderRadius:999, background:'rgba(15,31,15,.05)', border:'1px solid var(--line)'}}>
            {[
              {k:'instagram', label:'Instagram', icon:'IG'},
              {k:'youtube', label:'YouTube', icon:'YT'},
            ].map(p => (
              <button key={p.k} onClick={() => setPlatform(p.k)} style={{
                padding:'10px 22px', borderRadius:999,
                background: platform===p.k ? 'var(--accent)' : 'transparent',
                color: platform===p.k ? '#fff' : 'var(--ink-2)',
                fontSize:13, fontWeight:700, transition:'all .25s',
                display:'flex', alignItems:'center', gap:8, fontFamily:'var(--mono)', letterSpacing:'.06em', textTransform:'uppercase',
              }}>
                <span style={{
                  width:16, height:16, borderRadius:4,
                  background: platform===p.k ? 'rgba(255,255,255,.25)' : 'rgba(15,31,15,.08)',
                  display:'inline-flex', alignItems:'center', justifyContent:'center',
                  fontSize:8, fontWeight:800,
                  color: platform===p.k ? '#fff' : 'var(--ink-3)',
                }}>{p.icon}</span>
                {p.label}
              </button>
            ))}
          </div>
        </div>

        <div style={{display:'grid', gridTemplateColumns: `repeat(${plans.length}, 1fr)`, gap:10}} className="price-grid">
          {plans.map((p, i) => <PriceCard key={`${platform}-${i}`} {...p} idx={i}/>)}
        </div>

        <div className="reveal dis-grid" style={{marginTop:40, padding:'24px 28px', background:'rgba(15,31,15,.04)', border:'1px solid var(--line)', borderRadius:18, display:'grid', gridTemplateColumns:'repeat(3, 1fr)', gap:24}}>
          {[
            {ic:'⚡', t:'Real visibility — not fake numbers', s:'Designed for actual reach, not vanity metrics.'},
            {ic:'🔒', t:'No passwords or login access', s:'We never ask for credentials. Ever.'},
            {ic:'📈', t:'Results depend on you too', s:'Content quality, consistency, and audience response matter.'},
          ].map((x,i) => (
            <div key={i} style={{display:'flex', gap:14, alignItems:'flex-start'}}>
              <span style={{fontSize:18}}>{x.ic}</span>
              <div>
                <div style={{fontSize:13, fontWeight:700, color:'var(--ink)', marginBottom:4}}>{x.t}</div>
                <div style={{fontSize:12, color:'var(--ink-3)', lineHeight:1.5}}>{x.s}</div>
              </div>
            </div>
          ))}
        </div>

        <style>{`@media (max-width:1200px){
          .price-grid{grid-template-columns:repeat(3, 1fr) !important; gap:10px !important}
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
  const isPop = p.popular;
  return (
    <div className="reveal" style={{
      position:'relative',
      background: isPop ? 'linear-gradient(155deg, rgba(10,25,12,.96), rgba(15,31,15,.96))' : 'rgba(15,31,15,.04)',
      color: isPop ? 'var(--bone)' : 'var(--ink)',
      border:'1px solid', borderColor: isPop ? 'var(--accent)' : 'var(--line)',
      borderRadius: 20, padding:'24px 20px',
      transition:'transform .3s, box-shadow .3s',
      display:'flex', flexDirection:'column',
      transform: isPop ? 'translateY(-12px)' : 'none',
      boxShadow: isPop ? '0 30px 80px -30px rgba(22,101,52,.4)' : 'none',
      backdropFilter:'blur(8px)',
    }}
    onMouseEnter={e => { if (!isPop) { e.currentTarget.style.transform='translateY(-6px)'; e.currentTarget.style.borderColor='var(--accent)'; } }}
    onMouseLeave={e => { if (!isPop) { e.currentTarget.style.transform='none'; e.currentTarget.style.borderColor='var(--line)'; } }}>
      {isPop && (
        <div style={{position:'absolute', top:-12, left:'50%', transform:'translateX(-50%)', padding:'5px 12px', background:'var(--accent)', color:'#fff', fontSize:9, fontFamily:'var(--mono)', textTransform:'uppercase', letterSpacing:'.12em', borderRadius:999, fontWeight:700, whiteSpace:'nowrap', boxShadow:'0 0 20px rgba(22,101,52,.6)'}}>★ Most Popular</div>
      )}
      <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:10}}>
        <span style={{fontFamily:'var(--mono)', fontSize:10, color: isPop ? 'rgba(240,246,232,.55)' : 'var(--ink-3)', letterSpacing:'.1em'}}>{p.n} · {p.tier.toUpperCase()}</span>
      </div>
      <h3 style={{fontFamily:'var(--sans)', fontWeight:800, fontSize:22, letterSpacing:'-.02em', lineHeight:1.05, color: isPop ? 'var(--bone)' : 'var(--ink)', textTransform:'uppercase'}}>
        {p.name}
      </h3>
      <p style={{marginTop:6, fontSize:11, color: isPop ? 'rgba(240,246,232,.55)' : 'var(--ink-3)', lineHeight:1.45, fontStyle:'italic', fontFamily:'var(--serif)'}}>{p.tag}</p>

      <div style={{margin:'18px 0 14px', display:'flex', alignItems:'baseline', gap:8, flexWrap:'wrap'}}>
        <span style={{fontFamily:'var(--sans)', fontWeight:900, fontSize:38, lineHeight:1, color:'var(--accent)', letterSpacing:'-.04em'}}>${p.price}</span>
        <span style={{fontSize:13, textDecoration:'line-through', color: isPop ? 'rgba(240,246,232,.32)' : 'var(--ink-4)'}}>${p.was}</span>
        <span style={{fontSize:9, fontFamily:'var(--mono)', fontWeight:700, padding:'3px 7px', borderRadius:4, background:'var(--accent)', color:'#fff', letterSpacing:'.08em'}}>SAVE ${p.save}</span>
      </div>

      <p style={{fontSize:12, lineHeight:1.55, color: isPop ? 'rgba(240,246,232,.78)' : 'var(--ink-2)', marginBottom:16, paddingBottom:16, borderBottom:'1px solid', borderColor: isPop ? 'rgba(240,246,232,.1)' : 'var(--line)'}}>{p.desc}</p>

      <ul style={{listStyle:'none', display:'flex', flexDirection:'column', gap:8, marginBottom:18, flex:1}}>
        {p.feats.map((f, i) => (
          <li key={i} style={{display:'flex', gap:10, fontSize:12, lineHeight:1.45, color: isPop ? 'rgba(240,246,232,.78)' : 'var(--ink-2)'}}>
            <span style={{color:'var(--accent)', fontWeight:700, marginTop:1}}>✓</span>
            <span>{f}</span>
          </li>
        ))}
      </ul>

      <div style={{display:'flex', flexDirection:'column', gap:6, padding:'10px 12px', background: isPop ? 'rgba(240,246,232,.05)' : 'rgba(15,31,15,.05)', border:'1px solid', borderColor: isPop ? 'rgba(240,246,232,.1)' : 'var(--line-soft)', borderRadius:8, marginBottom:12}}>
        <div style={{fontSize:9, fontFamily:'var(--mono)', textTransform:'uppercase', letterSpacing:'.08em', color: isPop ? 'rgba(240,246,232,.55)' : 'var(--ink-3)'}}>Best for</div>
        <div style={{fontSize:11, fontWeight:600, color: isPop ? 'var(--bone)' : 'var(--ink)', lineHeight:1.4}}>{p.best}</div>
      </div>

      <a href={p.stripe} target="_blank" rel="noopener" style={{
        display:'inline-flex', alignItems:'center', justifyContent:'center', gap:8,
        padding:'13px 18px', borderRadius:999,
        background: isPop ? 'var(--accent)' : 'rgba(15,31,15,.06)',
        color: isPop ? '#fff' : 'var(--ink)',
        border:'1px solid', borderColor: isPop ? 'var(--accent)' : 'var(--line)',
        fontSize:13, fontWeight:700,
        transition:'transform .2s, background .2s',
      }}
      onMouseEnter={e => { e.currentTarget.style.transform='translateY(-2px)'; if(!isPop) e.currentTarget.style.background='var(--accent)'; }}
      onMouseLeave={e => { e.currentTarget.style.transform='none'; if(!isPop) e.currentTarget.style.background='rgba(15,31,15,.06)'; }}>
        Get {p.tier} →
      </a>
    </div>
  );
};

window.Pricing = Pricing;
