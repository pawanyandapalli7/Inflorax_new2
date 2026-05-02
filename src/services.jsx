// SERVICES — what we do (4 services with hover detail)
const services = [
  {n:'01', t:'Strategy', d:'Annual roadmap, channel positioning, competitive teardown, audience mapping. We refuse to ship pretty content with no thesis.', tags:['Positioning','Niche audit','Roadmap']},
  {n:'02', t:'Scripts & Hooks', d:'Hook libraries, script frameworks, narrative arcs. We A/B test the first 3 seconds like our rent depends on it.', tags:['Hooks','Frameworks','A/B tests']},
  {n:'03', t:'Edits & Production', d:'Senior editors only. We cut for retention curves, not vibes — pacing, b-roll, sound design, captions.', tags:['Edit','Sound','Captions']},
  {n:'04', t:'Distribution & Data', d:'Posting cadence, multi-platform repurposing, weekly retention reviews, dashboards you actually open.', tags:['Cadence','Repurpose','Dashboards']},
];

const Services = () => {
  const dir = window.useDir();
  const [active, setActive] = useState(null);
  return (
    <window.Section id="services" padded>
      <div className="wrap">
        <header style={{display:'flex', justifyContent:'space-between', alignItems:'flex-end', gap:40, flexWrap:'wrap', marginBottom:60}}>
          <div>
            <span className="reveal" style={window.labelStyle}>What we do</span>
            <h2 className="reveal reveal-d1" style={{...window.bigHeadStyle(dir), fontSize:'clamp(40px, 6vw, 88px)', marginTop:18, maxWidth:780}}>
              {dir==='editorial' && <>Four practices,<br/><window.Em>one system.</window.Em></>}
              {dir==='kinetic'   && <>Four loud<br/><window.Em>obsessions.</window.Em></>}
              {dir==='grid'      && <>Four practices.<br/><window.Em>One pipeline.</window.Em></>}
            </h2>
          </div>
          <p className="reveal reveal-d2" style={{maxWidth:380, color:'var(--ink-2)', fontSize:16, lineHeight:1.55}}>
            Each engagement runs all four — they only compound when they're stacked.
          </p>
        </header>

        <div style={{borderTop:'1px solid var(--line)'}}>
          {services.map((s, i) => (
            <ServiceRow key={i} {...s} active={active===i} onEnter={() => setActive(i)} onLeave={() => setActive(null)}/>
          ))}
        </div>
      </div>
    </window.Section>
  );
};

const ServiceRow = ({n,t,d,tags, active, onEnter, onLeave}) => {
  const dir = window.useDir();
  const isOpen = active;
  return (
    <div className="reveal"
      onMouseEnter={onEnter} onMouseLeave={onLeave}
      style={{
        borderBottom:'1px solid var(--line)',
        padding:'32px 0',
        display:'grid',
        gridTemplateColumns:'80px 1fr auto',
        gap:32, alignItems:'start',
        cursor:'pointer',
        transition:'padding .4s cubic-bezier(.2,.8,.2,1), background .4s',
        ...(isOpen ? {paddingLeft:24, paddingRight:24, background:'var(--soft)', borderRadius:18, borderBottom:'1px solid transparent'} : {}),
      }}>
      <span style={{fontFamily:'var(--mono)', fontSize:13, color:'var(--ink-3)', paddingTop:6}}>{n}</span>
      <div>
        <div style={{
          fontFamily: dir==='editorial' ? 'var(--serif)' : 'var(--sans)',
          fontStyle: dir==='editorial' ? 'italic' : 'normal',
          fontWeight: dir==='editorial' ? 500 : 700,
          fontSize:'clamp(28px, 4vw, 56px)',
          letterSpacing:'-.03em', lineHeight:1, color:'var(--ink)',
          textTransform: dir==='kinetic' ? 'uppercase' : 'none',
        }}>{t}</div>
        <div style={{
          maxHeight: isOpen ? 200 : 0, overflow:'hidden',
          transition:'max-height .5s cubic-bezier(.2,.8,.2,1), opacity .4s',
          opacity: isOpen ? 1 : 0,
        }}>
          <p style={{marginTop:18, color:'var(--ink-2)', fontSize:16, lineHeight:1.55, maxWidth:680}}>{d}</p>
          <div style={{display:'flex', gap:8, flexWrap:'wrap', marginTop:16}}>
            {tags.map((tag,i) => (
              <span key={i} style={{padding:'5px 12px', borderRadius:999, background:'#fff', border:'1px solid var(--line)', fontSize:12, fontFamily:'var(--mono)', color:'var(--ink-2)'}}>{tag}</span>
            ))}
          </div>
        </div>
      </div>
      <span style={{
        width:36, height:36, borderRadius:999, background: isOpen ? 'var(--accent)' : 'transparent',
        border:'1px solid var(--line)',
        display:'inline-flex', alignItems:'center', justifyContent:'center',
        color: isOpen ? '#fff' : 'var(--ink)', fontSize:18, transition:'all .3s',
        transform: isOpen ? 'rotate(45deg)' : 'none',
      }}>+</span>
    </div>
  );
};

window.Services = Services;
