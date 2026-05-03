// SHOWCASE — hover-reveal typographic ladder
const ITEMS = [
  {id:1, name:'NORTH HARBOR',   niche:'LIFESTYLE',    title:'NORTH'},
  {id:2, name:'AETHER STUDIO',  niche:'TECH/SAAS',    title:'AETHER'},
  {id:3, name:'KILOJOULE',      niche:'FITNESS',      title:'KILO'},
  {id:4, name:'MERIDIAN HOUSE', niche:'FINANCE',      title:'MERIDIAN'},
  {id:5, name:'PARAGON CO.',    niche:'BEAUTY',       title:'PARAGON'},
  {id:6, name:'OBSCURA',        niche:'COMEDY',       title:'OBSCURA'},
  {id:7, name:'HALCYON',        niche:'WELLNESS',     title:'HALCYON'},
  {id:8, name:'STRATA',         niche:'EDUCATION',    title:'STRATA'},
];

const Showcase = () => {
  const [active, setActive] = useState(1);
  const ref = useRef(null);
  const m = window.useMouse(ref);
  const cur = ITEMS[active] || ITEMS[1];

  return (
    <window.Section id="showcase" padded={false} style={{padding:'80px 0 100px'}}>
      <div className="wrap" style={{marginBottom:32}}>
        <span className="reveal" style={window.labelStyle}>Selected work</span>
        <h2 className="wreveal" style={{...window.bigHeadStyle(), fontSize:'clamp(40px,7vw,108px)', marginTop:14}}>
          Where they got seen.
        </h2>
      </div>

      <div ref={ref} style={{
        position:'relative', minHeight:'min(78vh, 720px)',
        display:'grid', gridTemplateColumns:'1fr 1.4fr 1fr', gap:24, alignItems:'stretch',
        padding:'48px 28px', overflow:'hidden',
      }} className="show-grid">
        {/* glow following cursor */}
        <div aria-hidden style={{
          position:'absolute', inset:0, pointerEvents:'none',
          background:`radial-gradient(circle at ${m.x*100}% ${m.y*100}%, rgba(22,101,52,.15), transparent 45%)`,
          transition:'background .3s ease-out',
        }}/>

        {/* LEFT — names */}
        <ul style={{listStyle:'none', display:'flex', flexDirection:'column', gap:6, justifyContent:'center', position:'relative', zIndex:2}} className="show-list">
          {ITEMS.map((it, i) => (
            <li key={it.id}
              onMouseEnter={() => setActive(i)}
              onClick={() => setActive(i)}
              style={{
                fontFamily:'var(--sans)', fontWeight: active===i ? 700 : 500,
                fontSize:'clamp(13px,1.3vw,16px)', letterSpacing:'.04em',
                color: active===i ? 'var(--ink)' : 'var(--ink-4)',
                cursor:'pointer', display:'flex', alignItems:'center', gap:10,
                padding:'4px 0', transition:'color .25s, transform .25s',
                transform: active===i ? 'translateX(8px)' : 'none',
              }}>
              <span style={{
                width:6, height:6, borderRadius:'50%',
                background: active===i ? 'var(--accent)' : 'transparent',
                boxShadow: active===i ? '0 0 12px var(--accent)' : 'none',
                transition:'all .25s',
              }}/>
              {it.name}
            </li>
          ))}
        </ul>

        {/* CENTER — giant title with displacement */}
        <div style={{position:'relative', display:'flex', alignItems:'center', justifyContent:'center', zIndex:2, minHeight:'min(56vh, 520px)'}}>
          <div aria-hidden style={{
            position:'absolute', inset:0,
            background:'radial-gradient(ellipse at center, rgba(22,163,74,.20), transparent 60%)',
            filter:'blur(40px)',
          }}/>
          <div style={{position:'relative', textAlign:'center'}}>
            <div style={{
              fontFamily:'var(--mono)', fontSize:11, letterSpacing:'.18em',
              textTransform:'uppercase', color:'var(--ink-3)', marginBottom:14,
            }}>
              {String(active+1).padStart(2,'0')} / {String(ITEMS.length).padStart(2,'0')}
            </div>
            <ShowcaseTitle title={cur.title} key={cur.id} m={m}/>
            <div style={{
              marginTop:18, fontFamily:'var(--serif)', fontStyle:'italic',
              fontWeight:300, fontSize:'clamp(16px,1.8vw,22px)',
              color:'var(--accent)', letterSpacing:'-.02em',
            }}>
              {cur.niche.toLowerCase()}
            </div>
          </div>
        </div>

        {/* RIGHT — niches */}
        <ul style={{listStyle:'none', display:'flex', flexDirection:'column', gap:6, justifyContent:'center', alignItems:'flex-end', position:'relative', zIndex:2}} className="show-list">
          {ITEMS.map((it, i) => (
            <li key={it.id}
              onMouseEnter={() => setActive(i)}
              onClick={() => setActive(i)}
              style={{
                fontFamily:'var(--sans)', fontWeight: active===i ? 700 : 500,
                fontSize:'clamp(13px,1.3vw,16px)', letterSpacing:'.04em',
                color: active===i ? 'var(--ink)' : 'var(--ink-4)',
                cursor:'pointer', display:'flex', alignItems:'center', gap:10,
                padding:'4px 0', transition:'color .25s, transform .25s',
                transform: active===i ? 'translateX(-8px)' : 'none',
                flexDirection:'row-reverse',
              }}>
              <span style={{
                width:6, height:6, borderRadius:'50%',
                background: active===i ? 'var(--accent)' : 'transparent',
                boxShadow: active===i ? '0 0 12px var(--accent)' : 'none',
                transition:'all .25s',
              }}/>
              {it.niche}
            </li>
          ))}
        </ul>

        {/* bottom counter line */}
        <div style={{
          position:'absolute', bottom:24, left:'50%', transform:'translateX(-50%)',
          display:'flex', alignItems:'center', gap:12, zIndex:2,
          fontFamily:'var(--mono)', fontSize:11, color:'var(--ink-3)',
          letterSpacing:'.1em', textTransform:'uppercase',
        }}>
          <span>{String(active+1).padStart(2,'0')}</span>
          <span style={{
            width:120, height:1, background:'var(--line)', position:'relative',
          }}>
            <span style={{
              position:'absolute', left:0, top:0, height:'100%',
              width: `${((active+1)/ITEMS.length)*100}%`,
              background:'var(--accent)', transition:'width .35s cubic-bezier(.2,.8,.2,1)',
            }}/>
          </span>
          <span>{String(ITEMS.length).padStart(2,'0')}</span>
        </div>
      </div>

      <style>{`
        @media (max-width:760px){
          .show-grid{ grid-template-columns:1fr !important; padding:32px 20px !important }
          .show-list{ flex-direction:row !important; flex-wrap:wrap !important; align-items:flex-start !important; gap:14px 18px !important; justify-content:center !important }
          .show-list li{ padding:0 !important; transform:none !important }
        }
      `}</style>
    </window.Section>
  );
};

const ShowcaseTitle = ({title, m}) => {
  // displacement-style giant title — letter-by-letter with stagger
  const letters = title.split('');
  return (
    <h3 style={{
      fontFamily:'var(--sans)', fontWeight:900,
      fontSize:'clamp(72px, 14vw, 220px)', letterSpacing:'-.06em',
      lineHeight:.9, color:'var(--ink)', textTransform:'uppercase',
      display:'flex', justifyContent:'center', flexWrap:'wrap',
      animation:'showFadeIn .45s cubic-bezier(.2,.8,.2,1)',
    }}>
      {letters.map((l, i) => (
        <span key={i} style={{
          display:'inline-block',
          transform:`translateY(${Math.sin((i+m.x*3))*4}px) skewY(${(m.x-.5)*4}deg)`,
          transition:'transform .35s ease-out',
          color: i % 2 === 0 ? 'var(--ink)' : 'var(--accent)',
        }}>{l}</span>
      ))}
      <style>{`@keyframes showFadeIn{from{opacity:0; transform:translateY(20px) scaleY(.9); filter:blur(8px)} to{opacity:1; transform:none; filter:none}}`}</style>
    </h3>
  );
};

window.Showcase = Showcase;
