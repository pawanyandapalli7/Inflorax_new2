// WORK — case studies grid with hover effect (inspired by framer grid hover)
const cases = [
  {handle:'@finn.codes', niche:'Dev education', from:'12K', to:'424K', months:14, hue:'#1f5d2f', accent:'#86c878', img:'F'},
  {handle:'@maya.cooks', niche:'Weeknight cooking', from:'48K', to:'1.2M', months:11, hue:'#c4421f', accent:'#ffaa6b', img:'M'},
  {handle:'@harlow.run', niche:'Endurance training', from:'5K', to:'182K', months:9, hue:'#1f3d5d', accent:'#88b8e0', img:'H'},
  {handle:'@nora.draws', niche:'Illustration', from:'21K', to:'310K', months:12, hue:'#5d3d1f', accent:'#e0b888', img:'N'},
  {handle:'@kit.sounds', niche:'Music production', from:'2K', to:'96K', months:6, hue:'#5d1f3d', accent:'#e088b8', img:'K'},
  {handle:'@arlo.gear', niche:'Outdoor reviews', from:'18K', to:'267K', months:13, hue:'#1f5d5d', accent:'#88e0d4', img:'A'},
];

const Work = () => {
  const dir = window.useDir();
  return (
    <window.Section id="work" padded>
      <div className="wrap">
        <header style={{marginBottom:60}}>
          <span className="reveal" style={window.labelStyle}>Selected outcomes · 2024–2026</span>
          <h2 className="reveal reveal-d1" style={{...window.bigHeadStyle(dir), fontSize:'clamp(40px, 6vw, 88px)', marginTop:18, maxWidth:880}}>
            {dir==='editorial' && <>Receipts, not <window.Em>renders.</window.Em></>}
            {dir==='kinetic'   && <>Real growth.<br/><window.Em>Real receipts.</window.Em></>}
            {dir==='grid'      && <>Case studies. <window.Em>Numbers attached.</window.Em></>}
          </h2>
        </header>

        <div style={{display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(320px, 1fr))', gap:dir==='grid' ? 0 : 24}}>
          {cases.map((c,i) => <CaseCard key={i} {...c} idx={i}/>)}
        </div>

        <div className="reveal" style={{marginTop:48, display:'flex', justifyContent:'center'}}>
          <window.Btn href="#audit">See all 24 cohort outcomes →</window.Btn>
        </div>
      </div>
    </window.Section>
  );
};

const CaseCard = ({handle, niche, from, to, months, hue, accent, img, idx}) => {
  const dir = window.useDir();
  const ref = useRef(null);
  const m = window.useMouse(ref);
  const [hover, setHover] = useState(false);
  const sharp = dir==='grid';
  return (
    <div ref={ref} className="reveal"
      onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}
      style={{
        position:'relative', overflow:'hidden',
        borderRadius: sharp ? 0 : 22,
        border: sharp ? '1px solid var(--line)' : '1px solid var(--line)',
        marginLeft: sharp && idx%3 ? -1 : 0,
        marginTop: sharp && idx>=3 ? -1 : 0,
        background:'#fff',
        cursor:'pointer',
        aspectRatio: '1.05/1',
        transition:'transform .4s cubic-bezier(.2,.8,.2,1)',
      }}>
      {/* "thumbnail" — gradient + initial */}
      <div style={{
        position:'absolute', inset:0,
        background:`linear-gradient(135deg, ${hue}, ${accent})`,
        transition:'opacity .5s, transform .6s cubic-bezier(.2,.8,.2,1)',
        opacity: hover ? .92 : 1,
        transform: hover ? 'scale(1.06)' : 'scale(1)',
      }}/>
      {/* grid overlay (Framer-esque) */}
      <GridHoverOverlay hue={hue} active={hover} m={m}/>
      <div style={{
        position:'absolute', inset:0,
        display:'flex', alignItems:'flex-end', padding:24, color:'#fff',
        background:'linear-gradient(to top, rgba(0,0,0,.55), rgba(0,0,0,0) 50%)',
      }}>
        <div style={{width:'100%'}}>
          <div style={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
            <div>
              <div style={{fontFamily:'var(--mono)', fontSize:11, opacity:.85, letterSpacing:'.1em'}}>{niche.toUpperCase()}</div>
              <div style={{fontSize:22, fontWeight:700, marginTop:4}}>{handle}</div>
            </div>
            <div style={{textAlign:'right'}}>
              <div style={{fontFamily:'var(--mono)', fontSize:11, opacity:.7}}>{from} → {to}</div>
              <div style={{fontSize:22, fontWeight:800, fontFamily: dir==='editorial' ? 'var(--serif)' : 'var(--sans)', fontStyle: dir==='editorial' ? 'italic' : 'normal'}}>{months}mo</div>
            </div>
          </div>
        </div>
      </div>
      {/* corner mark */}
      <div style={{position:'absolute', top:18, left:18, width:48, height:48, borderRadius:dir==='grid' ? 0 : 14, background:'rgba(255,255,255,.18)', backdropFilter:'blur(10px)', color:'#fff', display:'flex', alignItems:'center', justifyContent:'center', fontFamily:'var(--serif)', fontStyle:'italic', fontSize:24}}>{img}</div>
    </div>
  );
};

// Framer-style grid hover overlay
const GridHoverOverlay = ({hue, active, m}) => {
  const cells = 9;
  return (
    <div style={{position:'absolute', inset:0, pointerEvents:'none', opacity: active ? 1 : 0.0, transition:'opacity .3s'}}>
      <div style={{display:'grid', gridTemplateColumns:`repeat(${cells}, 1fr)`, gridTemplateRows:`repeat(${cells}, 1fr)`, width:'100%', height:'100%'}}>
        {Array.from({length:cells*cells}).map((_,i) => {
          const col = i % cells, row = Math.floor(i/cells);
          const cx = (col + .5) / cells, cy = (row + .5) / cells;
          const dx = cx - m.x, dy = cy - m.y;
          const dist = Math.sqrt(dx*dx + dy*dy);
          const intensity = Math.max(0, 1 - dist*2.2);
          return <div key={i} style={{
            background: active ? `rgba(255,255,255,${intensity*.45})` : 'transparent',
            transition:'background .12s',
            border:'1px solid rgba(255,255,255,.05)',
          }}/>;
        })}
      </div>
    </div>
  );
};

window.Work = Work;
