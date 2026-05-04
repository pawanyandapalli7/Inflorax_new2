// APP — conversion-optimised order
const App = () => {
  const tw = window.useTweaks ? window.useTweaks(window.TWEAK_DEFAULTS) : [window.TWEAK_DEFAULTS, () => {}];
  const [tweaks, setTweak] = tw;

  useEffect(() => {
    document.body.dataset.density = tweaks.density || 'tight';
    document.documentElement.style.setProperty('--accent', tweaks.accent || '#166534');
    document.documentElement.style.setProperty('--accent-d', shade(tweaks.accent || '#166534', -.18));
    document.documentElement.style.setProperty('--accent-l', hexToRgba(tweaks.accent || '#166534', .14));
    document.body.dataset.glow = tweaks.glow ? 'on' : 'off';
    document.body.dataset.motion = tweaks.motion || 'high';
  }, [tweaks.density, tweaks.accent, tweaks.glow, tweaks.motion]);

  return (
    <window.DirectionCtx.Provider value="kinetic">
      {window.Preloader && <window.Preloader/>}
      <window.Hero/>
      <window.Marquee big speed={tweaks.motion === 'extra' ? 32 : 50}/>
      <window.Problem/>
      <window.Who/>
      <window.Process/>
      <window.Pricing/>
      <window.Showcase/>
      <window.About/>
      <window.FAQ/>
      <window.AuditCTA/>
      <window.Footer/>
      {window.FloatCTA && <window.FloatCTA/>}

      {window.TweaksPanel && (
        <window.TweaksPanel title="Tweaks">
          <window.TweakSection label="Density"/>
          <window.TweakRadio label="Spacing" value={tweaks.density||'tight'} onChange={v=>setTweak('density',v)} options={['cozy','tight','compressed']}/>
          <window.TweakSection label="Motion"/>
          <window.TweakRadio label="Intensity" value={tweaks.motion||'high'} onChange={v=>setTweak('motion',v)} options={['calm','high','extra']}/>
          <window.TweakToggle label="Background glow" value={!!tweaks.glow} onChange={v=>setTweak('glow',v)}/>
          <window.TweakSection label="Accent"/>
          <window.TweakColor label="Accent color" value={tweaks.accent||'#166534'} onChange={v=>setTweak('accent',v)}/>
          <div style={{display:'flex',gap:6,padding:'4px 0',flexWrap:'wrap'}}>
            {[{n:'Forest',c:'#166534'},{n:'Emerald',c:'#059669'},{n:'Lime',c:'#65a30d'},{n:'Teal',c:'#0d9488'},{n:'Sage',c:'#4d7c5f'},{n:'Mint',c:'#16a34a'}].map(p=>(
              <button key={p.c} onClick={()=>setTweak('accent',p.c)} title={p.n}
                style={{width:24,height:24,borderRadius:'50%',background:p.c,border:tweaks.accent===p.c?'2px solid #fff':'2px solid rgba(0,0,0,.1)',cursor:'pointer',boxShadow:tweaks.accent===p.c?`0 0 0 2px ${p.c}`:'none'}}/>
            ))}
          </div>
        </window.TweaksPanel>
      )}
    </window.DirectionCtx.Provider>
  );
};

function hexToRgba(hex,a){const h=hex.replace('#','');const v=h.length===3?h.split('').map(c=>c+c).join(''):h;const r=parseInt(v.slice(0,2),16),g=parseInt(v.slice(2,4),16),b=parseInt(v.slice(4,6),16);return `rgba(${r},${g},${b},${a})`;}
function shade(hex,amt){const h=hex.replace('#','');const v=h.length===3?h.split('').map(c=>c+c).join(''):h;let r=parseInt(v.slice(0,2),16),g=parseInt(v.slice(2,4),16),b=parseInt(v.slice(4,6),16);r=Math.max(0,Math.min(255,Math.round(r+255*amt)));g=Math.max(0,Math.min(255,Math.round(g+255*amt)));b=Math.max(0,Math.min(255,Math.round(b+255*amt)));return '#'+[r,g,b].map(x=>x.toString(16).padStart(2,'0')).join('');}

window.TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{"density":"tight","motion":"high","glow":true,"accent":"#166534"}/*EDITMODE-END*/;
ReactDOM.createRoot(document.getElementById('app')).render(<App/>);
