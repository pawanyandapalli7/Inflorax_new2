// APP — composition + tweaks
const App = () => {
  const tw = window.useTweaks ? window.useTweaks(window.TWEAK_DEFAULTS) : [window.TWEAK_DEFAULTS, () => {}];
  const [tweaks, setTweak] = tw;
  const dir = tweaks.direction || 'editorial';

  // Apply direction to body
  useEffect(() => {
    document.body.dataset.dir = dir;
  }, [dir]);

  return (
    <window.DirectionCtx.Provider value={dir}>
      <window.Hero/>
      <window.Marquee big speed={50}/>
      <window.Problem/>
      <window.Who/>
      <window.Process/>
      <window.Numbers/>
      <window.Pricing/>
      <window.Testimonials/>
      <window.About/>
      <window.FAQ/>
      <window.AuditCTA/>
      <window.Footer/>

      {/* Tweaks panel */}
      {window.TweaksPanel && (
        <window.TweaksPanel title="Tweaks">
          <window.TweakSection label="Visual direction"/>
          <window.TweakRadio
            label="Style"
            value={dir}
            onChange={v => setTweak('direction', v)}
            options={['editorial', 'kinetic', 'grid']}/>
          <window.TweakSection label="Notes"/>
          <div style={{fontSize:11, color:'#666', lineHeight:1.55, padding:'4px 0'}}>
            <b>Editorial</b> — cream/moss, italic serif, magazine.<br/>
            <b>Kinetic</b> — punchy uppercase + serif italic, orange pop, playful.<br/>
            <b>Grid</b> — mono labels, sharp edges, tech/startup.
          </div>
        </window.TweaksPanel>
      )}
    </window.DirectionCtx.Provider>
  );
};

window.TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "direction": "editorial"
}/*EDITMODE-END*/;

ReactDOM.createRoot(document.getElementById('app')).render(<App/>);
