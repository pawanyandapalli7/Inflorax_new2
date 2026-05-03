// TRUST STRIP — between problem and who
const TrustStrip = () => (
  <div style={{
    background: 'var(--bg-mid)',
    borderTop: '1px solid var(--line)',
    borderBottom: '1px solid var(--line)',
    padding: '20px 0',
  }}>
    <div className="wrap">
      <div className="ts-grid" style={{
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        gap: 0, flexWrap: 'wrap',
      }}>
        {[
          ['🛡️', 'No Contracts', 'Cancel anytime'],
          ['🎯', 'Results-Driven', 'Focused on real growth'],
          ['🌿', 'Safe & Organic', '100% algorithm-friendly'],
          ['🎧', 'Expert Support', "We're here to help"],
        ].map(([icon, strong, sub], i) => (
          <React.Fragment key={i}>
            {i > 0 && <div style={{width:1, height:36, background:'var(--line)', margin:'0 28px'}}/>}
            <div style={{display:'flex', alignItems:'center', gap:12}}>
              <span style={{fontSize:20}}>{icon}</span>
              <div>
                <div style={{fontWeight:700, fontSize:13, color:'var(--ink)', letterSpacing:'-.01em'}}>{strong}</div>
                <div style={{fontSize:12, color:'var(--ink-3)', fontFamily:'var(--mono)', letterSpacing:'.04em'}}>{sub}</div>
              </div>
            </div>
          </React.Fragment>
        ))}
      </div>
    </div>
    <style>{`@media(max-width:600px){.ts-grid{gap:16px !important;flex-direction:column;align-items:flex-start !important;padding:0 20px} .ts-grid>div{display:none}}`}</style>
  </div>
);
window.TrustStrip = TrustStrip;
