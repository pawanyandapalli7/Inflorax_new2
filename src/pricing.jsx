// PRICING — named tiers, icon top-right, n·name top-left, uniform card color
const igPlans = [
  {
    name:'Spark', tier:'Getting Started', n:'01', emoji:'✦', tag:'Perfect for beginners',
    price:79, popular:false,
    tagline:'For creators who are trying but not getting reach',
    desc:"You've started posting. You're putting effort. But your videos are not reaching people yet.",
    feats:[
      'Your Reels start reaching more people',
      'Initial visibility boost for your content',
      'Better engagement signals on your posts',
      'Your profile starts getting noticed',
    ],
    best:'New creators stuck with low views',
    delivery:'5–7 days',
    stripe:'https://buy.stripe.com/7sY9AMb5Z69z3Odeuq67S00',
  },
  {
    name:'Ignite', tier:'Start Getting Seen', n:'02', emoji:'⚡', tag:'Break your reach ceiling',
    price:199, popular:true,
    tagline:'For creators stuck with low reach',
    desc:"You've been posting consistently… but nothing is moving. Your content finally starts reaching the right people.",
    feats:[
      'Strong visibility push for multiple Reels',
      'Your content reaches a larger audience',
      'Higher engagement on your posts',
      'Your profile starts building momentum',
      'Direction to improve your content performance',
      'Priority campaign handling',
    ],
    best:'Creators who feel stuck and want real movement',
    delivery:'7–10 days',
    stripe:'https://buy.stripe.com/3cI00cb5Z2Xn3Od3PM67S01',
  },
  {
    name:'Momentum', tier:'Grow Steadily', n:'03', emoji:'📈', tag:'Build consistent growth',
    price:399, popular:false,
    tagline:'For creators who want consistent growth',
    desc:"You've seen some results… but it's not consistent. This builds steady growth and stronger reach.",
    feats:[
      'Continuous visibility for your content',
      'Stronger engagement over time',
      'Better audience targeting',
      'Your profile grows more consistently',
      'Content improvement direction',
      'Reach across multiple posts',
      'Growth tracking summary',
    ],
    best:'Creators who want regular, consistent growth',
    delivery:'10–14 days',
    stripe:'https://buy.stripe.com/dRm28keib2XngAZ86267S02',
  },
  {
    name:'Influence', tier:'Become a Creator', n:'04', emoji:'👑', tag:'Build authority & presence',
    price:799, popular:false,
    tagline:'For creators serious about building a strong presence',
    desc:"You want to grow properly — not just get views. Build a strong and visible creator profile.",
    feats:[
      'Long-term visibility support',
      'Strong reach and engagement growth',
      'Profile positioning improvement',
      'Clear content direction',
      'Personal growth guidance',
      'Audience targeting strategy',
      'Multi-post promotion campaign',
      'Detailed results summary',
    ],
    best:'Creators ready to take content seriously',
    delivery:'14–21 days',
    stripe:'https://buy.stripe.com/bJe6oAa1VbtT5Wlbie67S03',
  },
  {
    name:'Icon', tier:'Authority', n:'05', emoji:'💎', tag:'Dominate your niche',
    price:1199, popular:false,
    tagline:'For creators building a media brand',
    desc:"Full-scale brand-building. Dominate your niche and turn content into a real, lasting media presence.",
    feats:[
      'Full-scale promotion system',
      'Content + profile overhaul support',
      'Long-term audience building',
      'Profile positioning strategy',
      'Personal growth roadmap',
      'Audience targeting — advanced',
      'Multi-post + multi-platform campaign',
      'Collab & brand outreach support',
      'Detailed performance summary',
    ],
    best:'Creators building a serious media brand',
    delivery:'21–30 days',
    stripe:'https://buy.stripe.com/cNicMY2zt69z0C14TQ67S04',
  },
];

const ytPlans = [
  {
    name:'Foundation', tier:'Foundation', n:'01', emoji:'▶', tag:'Start getting traction',
    price:399, popular:false,
    tagline:'For new YouTube creators ready for real visibility',
    desc:"You've started YouTube… but your videos are not getting views. Your channel starts getting noticed.",
    feats:[
      'Initial visibility for your videos',
      'More reach to your content',
      'Better watch-time signals',
      'Your channel starts getting attention',
    ],
    best:'New YouTube creators',
    delivery:'14 days',
    stripe:'https://buy.stripe.com/fZufZafmfeG54Shcmi67S05',
  },
  {
    name:'Accelerate', tier:'Start Growing', n:'02', emoji:'🚀', tag:'Break through low views',
    price:799, popular:true,
    tagline:'For creators stuck with low views',
    desc:"You're uploading videos but not seeing growth. Your channel gains real momentum.",
    feats:[
      'Strong visibility push for your videos',
      'Better audience reach across videos',
      'Improved engagement signals',
      'Your channel starts growing consistently',
      'Watch-time improvement',
      'Priority campaign handling',
    ],
    best:'Creators stuck on low views who need momentum',
    delivery:'21 days',
    stripe:'https://buy.stripe.com/14A3cofmf7dDdoN0DA67S06',
  },
  {
    name:'Scale', tier:'Scale Your Channel', n:'03', emoji:'💎', tag:'Dominate your niche',
    price:1299, popular:false,
    tagline:'For creators building a serious YouTube presence',
    desc:"You want to build a serious YouTube presence. Scale your channel properly.",
    feats:[
      'Long-term growth support',
      'Strong audience building',
      'Better reach and retention signals',
      'Clear growth direction',
      'Multi-video promotion campaign',
      'Channel positioning strategy',
      'Detailed performance summary',
    ],
    best:'Creators serious about YouTube as a career',
    delivery:'30 days',
    stripe:'https://buy.stripe.com/7sYaEQ8XRcxX4Shbie67S07',
  },
];

const FEAT_SHOW = {
  'Spark':4, 'Ignite':6, 'Momentum':7, 'Influence':8, 'Icon':9,
  'Foundation':4, 'Accelerate':6, 'Scale':7,
};

const Pricing = () => {
  const [platform, setPlatform] = useState('instagram');
  const plans = platform === 'instagram' ? igPlans : ytPlans;

  return (
    <window.Section id="pricing" padded>
      <div className="wrap">
        <header style={{textAlign:'center', maxWidth:900, margin:'0 auto 48px'}}>
          <span className="reveal" style={window.labelStyle}>Packages</span>
          <h2 className="wreveal" style={{...window.bigHeadStyle(), fontSize:'clamp(44px,8vw,120px)', marginTop:14}}>
            Start from right now.
          </h2>
          <p className="reveal reveal-d2" style={{marginTop:14, fontSize:17, color:'var(--ink-2)', maxWidth:520, margin:'14px auto 0', fontFamily:'var(--serif)', fontStyle:'italic', fontWeight:300}}>
            Pick what fits your situation — we'll help your content finally get seen.
          </p>
        </header>

        {/* Platform toggle */}
        <div className="reveal" style={{display:'flex', justifyContent:'center', marginBottom:40}}>
          <div style={{display:'inline-flex', gap:4, padding:5, borderRadius:999, background:'rgba(15,31,15,.06)', border:'1px solid var(--line)'}}>
            {[{k:'instagram',label:'Instagram'},{k:'youtube',label:'YouTube'}].map(p => (
              <button key={p.k} onClick={() => setPlatform(p.k)} style={{
                padding:'10px 28px', borderRadius:999,
                background: platform===p.k ? 'var(--accent)' : 'transparent',
                color: platform===p.k ? '#fff' : 'var(--ink-2)',
                fontSize:13, fontWeight:700, transition:'all .25s',
                fontFamily:'var(--mono)', letterSpacing:'.06em', textTransform:'uppercase',
              }}>{p.label}</button>
            ))}
          </div>
        </div>

        {/* Cards */}
        <div style={{
          display:'grid',
          gridTemplateColumns:`repeat(${plans.length}, 1fr)`,
          gap:12, alignItems:'stretch',
        }} className="price-grid">
          {plans.map((p, i) => <PriceCard key={`${platform}-${i}`} plan={p} showCount={FEAT_SHOW[p.name] || p.feats.length}/>)}
        </div>

        {/* Undecided CTA */}
        <div className="reveal" style={{marginTop:32, padding:'20px 24px', background:'rgba(22,101,52,.06)', border:'1px solid rgba(22,101,52,.15)', borderRadius:16, display:'flex', alignItems:'center', justifyContent:'space-between', gap:20, flexWrap:'wrap'}}>
          <p style={{fontSize:15, color:'var(--ink-2)', fontFamily:'var(--serif)', fontStyle:'italic', fontWeight:300}}>
            Not sure which plan fits you?
          </p>
          <button onClick={() => window.openAuditModal && window.openAuditModal()} style={{
            background:'var(--accent)', color:'#fff', border:'none',
            padding:'11px 22px', borderRadius:999, fontSize:13, fontWeight:700,
            cursor:'pointer', whiteSpace:'nowrap', transition:'opacity .2s',
          }}
          onMouseEnter={e=>e.currentTarget.style.opacity='.85'}
          onMouseLeave={e=>e.currentTarget.style.opacity='1'}>
            Get a free audit — we'll recommend one →
          </button>
        </div>

        {/* Disclaimer — 3 lines from doc */}
        <div className="reveal" style={{marginTop:16, display:'flex', flexDirection:'column', gap:6, alignItems:'center'}}>
          {[
            'Results depend on content quality, consistency, and audience response.',
            'We never ask for passwords or login access.',
            'Designed for real visibility — not fake numbers.',
          ].map(t => (
            <p key={t} style={{fontFamily:'var(--mono)', fontSize:11, color:'var(--ink-3)', letterSpacing:'.04em', textAlign:'center'}}>
              → {t}
            </p>
          ))}
        </div>

        <style>{`
          @media(max-width:1200px){.price-grid{grid-template-columns:repeat(3,1fr) !important; gap:10px}}
          @media(max-width:720px){.price-grid{grid-template-columns:repeat(2,1fr) !important; gap:10px}}
          @media(max-width:480px){.price-grid{grid-template-columns:1fr !important; gap:12px}}
          @media(max-width:480px){.price-card-inner{padding:20px 16px 18px !important}}
        `}</style>
      </div>
    </window.Section>
  );
};

const PriceCard = ({plan: p, showCount}) => {
  const isPop = p.popular;
  const maxFeats = 9;
  const fillRatio = showCount / maxFeats;

  return (
    <div className="reveal price-card-inner" style={{
      position:'relative',
      background:'rgba(255,255,255,.8)',
      color:'var(--ink)',
      border: isPop ? '2px solid var(--accent)' : '1.5px solid var(--line)',
      borderRadius:18,
      padding:'18px 16px 16px',
      display:'flex', flexDirection:'column',
      boxShadow: isPop ? '0 4px 24px rgba(22,101,52,.15)' : '0 2px 12px rgba(15,31,15,.05)',
      transform: 'none',
      backdropFilter:'blur(8px)',
      transition:'transform .25s, border-color .25s, box-shadow .25s',
    }}
    onMouseEnter={e => { e.currentTarget.style.borderColor='var(--accent)'; e.currentTarget.style.boxShadow='0 8px 32px rgba(22,101,52,.12)'; }}
    onMouseLeave={e => { e.currentTarget.style.borderColor=isPop?'var(--accent)':'var(--line)'; e.currentTarget.style.boxShadow='0 2px 12px rgba(15,31,15,.05)'; }}>

      {/* Top: n · tier-name small, emoji right, + popular badge inline */}
      <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:4}}>
        <div style={{fontFamily:'var(--mono)', fontSize:9, letterSpacing:'.12em', textTransform:'uppercase', color:'var(--ink-3)'}}>
          {p.n} · {p.tier}
        </div>
        <div style={{display:'flex', alignItems:'center', gap:6}}>
          {isPop && (
            <span style={{
              padding:'2px 8px', background:'var(--accent)', color:'#fff',
              fontSize:8, fontFamily:'var(--mono)', textTransform:'uppercase', letterSpacing:'.1em',
              borderRadius:999, fontWeight:700, whiteSpace:'nowrap',
            }}>★ Popular</span>
          )}
          <span style={{fontSize:18, lineHeight:1}}>{p.emoji}</span>
        </div>
      </div>

      {/* Plan NAME — big and bold (swapped) */}
      <h3 style={{
        fontFamily:'var(--sans)', fontWeight:900,
        fontSize:'clamp(22px,2.4vw,30px)', letterSpacing:'-.03em', lineHeight:1,
        color:'var(--ink)', marginBottom:4,
      }}>{p.name}</h3>

      {/* Tagline — small italic */}
      <p style={{
        fontSize:11, color:'var(--ink-3)', marginBottom:12,
        lineHeight:1.4, fontStyle:'italic', fontFamily:'var(--serif)',
      }}>{p.tagline}</p>

      {/* Price */}
      <div style={{display:'flex', alignItems:'baseline', gap:6, marginBottom:2}}>
        <span style={{fontFamily:'var(--sans)', fontWeight:900, fontSize:'clamp(26px,3vw,38px)', lineHeight:1, color:'var(--accent)', letterSpacing:'-.03em'}}>${p.price}</span>
        <span style={{fontSize:10, color:'var(--ink-3)', fontFamily:'var(--mono)'}}>one-time</span>
      </div>
      <div style={{fontSize:9, fontFamily:'var(--mono)', color:'var(--ink-3)', letterSpacing:'.06em', textTransform:'uppercase', marginBottom:12}}>
        Delivered in {p.delivery} · Launch pricing
      </div>

      {/* Divider */}
      <div style={{height:1, background:'var(--line)', marginBottom:10}}/>

      {/* Feature count bar */}
      <div style={{marginBottom:8}}>
        <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:4}}>
          <span style={{fontFamily:'var(--mono)', fontSize:9, letterSpacing:'.08em', textTransform:'uppercase', color:'var(--ink-3)'}}>What's included</span>
          <span style={{
            fontFamily:'var(--mono)', fontSize:9, fontWeight:700,
            color:'var(--accent)', padding:'2px 6px', borderRadius:4,
            background:'var(--accent-l)',
          }}>{showCount} services</span>
        </div>
        <div style={{height:2, background:'var(--line)', borderRadius:999}}>
          <div style={{height:'100%', borderRadius:999, width:`${fillRatio*100}%`, background:'var(--accent)', transition:'width .4s ease'}}/>
        </div>
      </div>

      {/* Features — tighter gap */}
      <ul style={{listStyle:'none', display:'flex', flexDirection:'column', gap:5, marginBottom:12, flex:1}}>
        {p.feats.slice(0, showCount).map((f, i) => (
          <li key={i} style={{display:'flex', gap:7, fontSize:12, lineHeight:1.4, color:'var(--ink-2)'}}>
            <span style={{color:'var(--accent)', fontWeight:700, fontSize:10, marginTop:1, flexShrink:0}}>✓</span>
            <span>{f}</span>
          </li>
        ))}
      </ul>

      {/* Best for */}
      <div style={{
        padding:'8px 10px', borderRadius:8, marginBottom:10,
        background:'rgba(22,101,52,.06)',
        border:'1px solid rgba(22,101,52,.12)',
      }}>
        <div style={{fontSize:8, fontFamily:'var(--mono)', textTransform:'uppercase', letterSpacing:'.08em', color:'var(--ink-3)', marginBottom:2}}>Best for</div>
        <div style={{fontSize:11, fontWeight:600, color:'var(--ink)', lineHeight:1.35}}>{p.best}</div>
      </div>

      {/* CTA */}
      <a href={p.stripe}  style={{
        display:'flex', alignItems:'center', justifyContent:'center', gap:8,
        padding:'11px 14px', borderRadius:999,
        background:'var(--ink)', color:'#fff',
        border:'1.5px solid var(--ink)',
        fontSize:12, fontWeight:700, textDecoration:'none',
        letterSpacing:'.01em', transition:'transform .2s, background .2s, border-color .2s',
      }}
      onMouseEnter={e => { e.currentTarget.style.background='var(--accent)'; e.currentTarget.style.borderColor='var(--accent)'; e.currentTarget.style.transform='translateY(-1px)'; }}
      onMouseLeave={e => { e.currentTarget.style.background='var(--ink)'; e.currentTarget.style.borderColor='var(--ink)'; e.currentTarget.style.transform='none'; }}>
        Get {p.name} →
      </a>
    </div>
  );
};

window.Pricing = Pricing;
