// AUDIT — slide-in modal form (10 questions), Jotform submit
const AUDIT_STEPS = [
  {q:1, type:'contact', key:'contact', ey:'01 of 10 — Your details', qt:"What's your name and email?"},
  {q:2, type:'text', key:'handle', ey:'02 of 10 — Your profile', qt:"What's your Instagram or YouTube handle?", hint:'e.g. @yourhandle or youtube.com/yourchannel', placeholder:'@handle or profile URL'},
  {q:3, type:'choice', key:'platform', ey:'03 of 10 — Platform', qt:'Which platform are you focusing on?', choices:['Instagram','YouTube','Both']},
  {q:4, type:'choice', key:'frequency', ey:'04 of 10 — Posting frequency', qt:'How often do you post content?', choices:['Daily','3–5x per week','1–2x per week','Rarely']},
  {q:5, type:'choice', key:'goal', ey:'05 of 10 — Your goal', qt:"What's your main goal right now?", choices:['More followers','More views','Better engagement','Build my brand']},
  {q:6, type:'textarea', key:'challenge', ey:'06 of 10 — Your challenge', qt:"What's your biggest challenge right now?", hint:'Be honest — this helps us give the most useful feedback.', placeholder:"e.g. My reach dropped, I don't know what to post…"},
  {q:7, type:'text', key:'niche', ey:'07 of 10 — Your niche', qt:'What is your content niche or category?', hint:'e.g. fitness, finance, travel, cooking, comedy…', placeholder:'Describe your niche…'},
  {q:8, type:'choice', key:'experience', ey:'08 of 10 — Experience', qt:'How long have you been creating content?', choices:['Under 6 months','6–12 months','1–2 years','2+ years']},
  {q:9, type:'textarea', key:'extra', ey:'09 of 10 — Extra info', qt:'Anything else we should know?', hint:'Any context that would help us give better feedback.', placeholder:'Share anything relevant…', optional:true},
  {q:10, type:'confirm', key:'confirm', ey:'10 of 10 — Ready to submit', qt:"We're ready to review your profile.", hint:"Hit submit and we'll send your personalized audit within 48 hours — no pitch, no pressure."},
];

const AuditModal = ({open, onClose}) => {
  const dir = window.useDir();
  const [cur, setCur] = useState(1);
  const [data, setData] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [direction, setDirection] = useState(1);
  const total = AUDIT_STEPS.length;
  const step = AUDIT_STEPS[cur-1];

  // Lock body scroll when open
  useEffect(() => {
    if (open) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  // Esc to close
  useEffect(() => {
    if (!open) return;
    const onKey = e => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  const set = (k, v) => setData(d => ({...d, [k]: v}));

  const canGo = (() => {
    if (step.optional || step.type === 'confirm') return true;
    if (step.type === 'choice') return !!data[step.key];
    if (step.type === 'text' || step.type === 'textarea') return (data[step.key] || '').trim().length > 0;
    if (step.type === 'contact') {
      const fn = (data.fname||'').trim(), ln = (data.lname||'').trim(), em = (data.email||'').trim();
      return fn && ln && em && em.includes('@');
    }
    return true;
  })();

  const next = () => {
    if (!canGo && !step.optional) return;
    if (cur === total) { submit(); return; }
    setDirection(1); setCur(c => c + 1);
  };
  const prev = () => { if (cur > 1) { setDirection(-1); setCur(c => c - 1); } };
  const skip = () => {
    if (cur === total) { submit(); return; }
    setDirection(1); setCur(c => c + 1);
  };

  const pickChoice = (val) => {
    set(step.key, val);
    setTimeout(() => {
      // auto-advance after picking
      setDirection(1);
      setCur(c => c < total ? c + 1 : c);
    }, 280);
  };

  const submit = () => {
    const fd = new FormData();
    fd.append('q2_fullname0[first]', data.fname||'');
    fd.append('q2_fullname0[last]',  data.lname||'');
    fd.append('q3_email1',           data.email||'');
    fd.append('q4_textbox2',         data.handle||'');
    fd.append('q5_dropdown3',        data.platform||'');
    fd.append('q6_dropdown4',        data.frequency||'');
    fd.append('q7_dropdown5',        data.goal||'');
    fd.append('q8_textarea6',        data.challenge||'');
    fd.append('q9_textbox7',         data.niche||'');
    fd.append('q10_dropdown8',       data.experience||'');
    fd.append('q11_textarea9',       data.extra||'');
    fd.append('formID', '261090594312049');
    fd.append('simple_spc', '261090594312049-261090594312049');
    fetch('https://submit.jotform.com/submit/261090594312049', {method:'POST', body:fd, mode:'no-cors'})
      .finally(() => setSubmitted(true));
  };

  const reset = () => { setCur(1); setData({}); setSubmitted(false); };
  const handleClose = () => { onClose(); setTimeout(reset, 500); };

  const pct = Math.round((cur - 1) / total * 100);
  const remaining = total - cur;

  return (
    <div onClick={(e) => { if (e.target === e.currentTarget) handleClose(); }}
      style={{
        position:'fixed', inset:0, zIndex:9998,
        display:'flex',
        opacity: open ? 1 : 0,
        pointerEvents: open ? 'auto' : 'none',
        transition:'opacity .38s cubic-bezier(.16,1,.3,1)',
      }}>
      {/* backdrop */}
      <div style={{
        position:'absolute', inset:0,
        background:'rgba(10,10,10,.55)',
        backdropFilter:'blur(8px)', WebkitBackdropFilter:'blur(8px)',
      }}/>

      {/* panel */}
      <div className="am-panel-resp" style={{
        position:'relative', zIndex:1, marginLeft:'auto',
        width:'min(100%, 920px)', height:'100%',
        display:'grid', gridTemplateColumns:'300px 1fr',
        background:'#fff',
        transform: open ? 'translateX(0)' : 'translateX(60px)',
        transition:'transform .42s cubic-bezier(.16,1,.3,1)',
        overflow:'hidden',
      }}>
        {/* close */}
        <button onClick={handleClose} aria-label="Close" style={{
          position:'absolute', top:18, right:18, zIndex:10,
          width:38, height:38, borderRadius:'50%',
          background:'rgba(10,10,10,.08)', border:'none', cursor:'pointer',
          display:'flex', alignItems:'center', justifyContent:'center',
          fontSize:18, color:'var(--ink)',
        }}
        onMouseEnter={e => { e.currentTarget.style.background='rgba(10,10,10,.15)'; e.currentTarget.style.transform='scale(1.08)'; }}
        onMouseLeave={e => { e.currentTarget.style.background='rgba(10,10,10,.08)'; e.currentTarget.style.transform='none'; }}>
          ✕
        </button>

        {/* sidebar */}
        <aside className="am-side-resp" style={{
          background:'var(--ink)', color:'#fff', position:'relative', overflow:'hidden',
          padding:'44px 32px',
          display:'flex', flexDirection:'column', justifyContent:'space-between',
        }}>
          <div aria-hidden="true" style={{
            position:'absolute', bottom:'-0.1em', left:'-0.04em',
            fontSize:160, fontWeight:900, lineHeight:1,
            color:'rgba(255,255,255,.03)', letterSpacing:'-.06em',
            pointerEvents:'none', whiteSpace:'nowrap', userSelect:'none',
            fontFamily:'var(--sans)',
          }}>Audit</div>

          <div style={{position:'relative', zIndex:1}}>
            <div style={{display:'flex', alignItems:'center', gap:6, fontWeight:900, fontSize:16, letterSpacing:'-.04em'}}>
              INFLORAX
              <span style={{width:6, height:6, borderRadius:'50%', background:'var(--accent)', display:'inline-block', animation:'sdot 2.5s ease-in-out infinite'}}/>
            </div>
            <div style={{fontFamily:'var(--mono)', fontSize:9, letterSpacing:'.12em', textTransform:'uppercase', color:'rgba(255,255,255,.3)', marginTop:4}}>Free Creator Audit</div>
          </div>

          <div style={{position:'relative', zIndex:1}}>
            <h2 style={{
              fontSize:'clamp(20px, 2.2vw, 30px)',
              fontFamily: dir==='editorial' ? 'var(--serif)' : 'var(--sans)',
              fontWeight: dir==='editorial' ? 500 : 800,
              fontStyle: dir==='editorial' ? 'italic' : 'normal',
              color:'#fff', letterSpacing:'-.03em', lineHeight:1.1, marginBottom:14,
            }}>
              Let's find your growth <span style={{color:'var(--accent)', fontStyle:'italic', fontFamily:'var(--serif)'}}>opportunity.</span>
            </h2>
            <p style={{fontSize:13, lineHeight:1.65, color:'rgba(255,255,255,.5)'}}>
              Answer a few quick questions. We'll send you a personalized breakdown — free, within 48 hours.
            </p>
            <div style={{marginTop:22, display:'flex', flexDirection:'column', gap:7}}>
              {[
                ['📊','Personalized profile breakdown'],
                ['🎯','Your single biggest opportunity'],
                ['⚡','Delivered within 48 hours'],
                ['🔒','No password required'],
              ].map(([ic, t]) => (
                <div key={t} style={{
                  display:'flex', alignItems:'center', gap:10,
                  padding:'9px 12px', background:'rgba(255,255,255,.04)',
                  border:'1px solid rgba(255,255,255,.07)',
                  fontSize:12, color:'rgba(255,255,255,.55)',
                }}>
                  <span style={{
                    width:22, height:22, display:'flex', alignItems:'center', justifyContent:'center',
                    background:'color-mix(in oklab, var(--accent) 22%, transparent)',
                    border:'1px solid color-mix(in oklab, var(--accent) 35%, transparent)',
                    fontSize:11, flexShrink:0,
                  }}>{ic}</span>
                  {t}
                </div>
              ))}
            </div>
          </div>

          <div style={{position:'relative', zIndex:1, display:'flex', flexDirection:'column', gap:6}}>
            {['No purchase required','No passwords ever asked','48h turnaround guaranteed'].map(t => (
              <div key={t} style={{
                fontFamily:'var(--mono)', fontSize:9, letterSpacing:'.08em', textTransform:'uppercase',
                color:'rgba(255,255,255,.25)', display:'flex', alignItems:'center', gap:6,
              }}>
                <span style={{color:'color-mix(in oklab, var(--accent) 70%, transparent)', fontWeight:700}}>✓</span>
                {t}
              </div>
            ))}
          </div>
        </aside>

        {/* form */}
        <div style={{display:'flex', flexDirection:'column', overflow:'hidden', position:'relative', flex:1, minHeight:0}}>
          {/* progress */}
          <div style={{padding:'24px 36px 20px', flexShrink:0, borderBottom:'1px solid var(--line)'}}>
            <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:8}}>
              <span style={{fontFamily:'var(--mono)', fontSize:10, letterSpacing:'.1em', textTransform:'uppercase', color:'var(--ink-3)'}}>Question {cur} of {total}</span>
              <span style={{fontFamily:'var(--mono)', fontSize:12, fontWeight:500, color:'var(--accent)'}}>{pct}%</span>
            </div>
            <div style={{height:2, background:'var(--line)', overflow:'hidden'}}>
              <div style={{height:'100%', background:'var(--accent)', width:pct+'%', transition:'width .5s cubic-bezier(.16,1,.3,1)'}}/>
            </div>
            <div style={{display:'flex', gap:3, marginTop:8}}>
              {AUDIT_STEPS.map((_, i) => (
                <div key={i} style={{
                  height:3, flex:1,
                  background: i+1 < cur ? 'var(--accent)' : (i+1 === cur ? 'color-mix(in oklab, var(--accent) 45%, transparent)' : 'var(--line)'),
                  transition:'background .3s',
                }}/>
              ))}
            </div>
          </div>

          {/* question area */}
          <div style={{flex:1, overflow:'hidden', position:'relative', minHeight:0}}>
            {!submitted && (
              <div key={cur} style={{
                position:'absolute', inset:0,
                padding:'32px 36px',
                display:'flex', flexDirection:'column', justifyContent:'center',
                overflowY:'auto',
                animation: `amSlide${direction>0?'In':'Back'} .36s cubic-bezier(.16,1,.3,1)`,
              }}>
                <div style={{fontFamily:'var(--mono)', fontSize:9, letterSpacing:'.12em', textTransform:'uppercase', color:'var(--ink-3)', marginBottom:10, display:'flex', alignItems:'center', gap:7}}>
                  <span style={{width:12, height:1, background:'var(--line)'}}/>
                  {step.ey}
                  {step.optional && <span style={{color:'var(--accent)', marginLeft:4}}>(Optional)</span>}
                </div>
                <h3 style={{
                  fontSize:'clamp(20px, 2.4vw, 28px)',
                  fontFamily: dir==='editorial' ? 'var(--serif)' : 'var(--sans)',
                  fontWeight: dir==='editorial' ? 500 : 800,
                  fontStyle: dir==='editorial' ? 'italic' : 'normal',
                  color:'var(--ink)', letterSpacing:'-.03em', lineHeight:1.15, marginBottom:6,
                }}>{step.qt}</h3>
                {step.hint && <div style={{fontFamily:'var(--mono)', fontSize:11, color:'var(--ink-3)', marginBottom:18, lineHeight:1.5, fontStyle:'italic'}}>{step.hint}</div>}
                {!step.hint && <div style={{height:18}}/>}

                {step.type === 'contact' && (
                  <div style={{display:'flex', flexDirection:'column', border:'1.5px solid var(--line)', marginBottom:16}}>
                    {[
                      {k:'fname', ph:'First name', ac:'given-name'},
                      {k:'lname', ph:'Last name', ac:'family-name'},
                      {k:'email', ph:'you@email.com', ac:'email', t:'email'},
                    ].map((f, i, arr) => (
                      <input key={f.k} type={f.t || 'text'} placeholder={f.ph} autoComplete={f.ac}
                        value={data[f.k] || ''} onChange={e => set(f.k, e.target.value)}
                        style={{
                          width:'100%', padding:'12px 14px',
                          border:'none', borderBottom: i < arr.length-1 ? '1px solid var(--line)' : 'none',
                          background:'var(--soft)', fontFamily:'var(--sans)', fontSize:14,
                          color:'var(--ink)', outline:'none', borderRadius:0,
                        }}
                        onFocus={e => e.target.style.background='#fff'}
                        onBlur={e => e.target.style.background='var(--soft)'}
                      />
                    ))}
                  </div>
                )}

                {step.type === 'text' && (
                  <input type="text" placeholder={step.placeholder}
                    value={data[step.key] || ''} onChange={e => set(step.key, e.target.value)}
                    style={textInputStyle}
                    onFocus={e => { e.target.style.borderColor='var(--accent)'; e.target.style.background='#fff'; }}
                    onBlur={e => { e.target.style.borderColor='var(--line)'; e.target.style.background='var(--soft)'; }}
                  />
                )}

                {step.type === 'textarea' && (
                  <textarea rows={4} placeholder={step.placeholder}
                    value={data[step.key] || ''} onChange={e => set(step.key, e.target.value)}
                    style={{...textInputStyle, resize:'none'}}
                    onFocus={e => { e.target.style.borderColor='var(--accent)'; e.target.style.background='#fff'; }}
                    onBlur={e => { e.target.style.borderColor='var(--line)'; e.target.style.background='var(--soft)'; }}
                  />
                )}

                {step.type === 'choice' && (
                  <div style={{display:'flex', flexDirection:'column', gap:6}}>
                    {step.choices.map(c => {
                      const on = data[step.key] === c;
                      return (
                        <div key={c} onClick={() => pickChoice(c)} style={{
                          display:'flex', alignItems:'center', gap:12,
                          padding:'11px 14px',
                          border:'1.5px solid', borderColor: on ? 'var(--accent)' : 'var(--line)',
                          background: on ? 'color-mix(in oklab, var(--accent) 8%, transparent)' : 'var(--soft)',
                          cursor:'pointer', userSelect:'none',
                          transition:'border-color .18s, background .18s, transform .15s',
                        }}
                        onMouseEnter={e => { if (!on) { e.currentTarget.style.borderColor='var(--accent)'; e.currentTarget.style.background='color-mix(in oklab, var(--accent) 6%, transparent)'; e.currentTarget.style.transform='translateX(3px)'; }}}
                        onMouseLeave={e => { if (!on) { e.currentTarget.style.borderColor='var(--line)'; e.currentTarget.style.background='var(--soft)'; e.currentTarget.style.transform='none'; }}}>
                          <div style={{
                            width:16, height:16, borderRadius:'50%',
                            border:'1.5px solid', borderColor: on ? 'var(--accent)' : 'var(--line)',
                            background: on ? 'var(--accent)' : 'transparent',
                            flexShrink:0, display:'flex', alignItems:'center', justifyContent:'center',
                          }}>
                            {on && <span style={{width:5, height:5, borderRadius:'50%', background:'#fff', display:'inline-block'}}/>}
                          </div>
                          <div style={{fontSize:13, fontWeight:500, color: on ? 'var(--accent)' : 'var(--ink)', flex:1, lineHeight:1.4}}>{c}</div>
                        </div>
                      );
                    })}
                  </div>
                )}

                {step.type === 'confirm' && (
                  <div style={{
                    marginTop:8, padding:16,
                    background:'color-mix(in oklab, var(--accent) 8%, transparent)',
                    border:'1px solid color-mix(in oklab, var(--accent) 25%, transparent)',
                    fontSize:13, color:'var(--ink-2)', lineHeight:1.7,
                  }}>
                    ✓ Free · No purchase required<br/>
                    ✓ Delivered within 48 hours<br/>
                    ✓ No passwords or login access asked
                  </div>
                )}
              </div>
            )}

            {/* Thank you */}
            {submitted && (
              <div style={{
                position:'absolute', inset:0,
                background:'#fff', display:'flex', flexDirection:'column',
                alignItems:'center', justifyContent:'center',
                padding:'40px 32px', textAlign:'center', zIndex:10,
                animation:'amTYIn .5s cubic-bezier(.16,1,.3,1)',
              }}>
                <div style={{
                  width:60, height:60, borderRadius:'50%',
                  background:'color-mix(in oklab, var(--accent) 15%, transparent)',
                  border:'2px solid color-mix(in oklab, var(--accent) 40%, transparent)',
                  display:'flex', alignItems:'center', justifyContent:'center',
                  fontSize:22, color:'var(--accent)', marginBottom:20,
                  animation:'amCkPop .55s cubic-bezier(.16,1,.3,1) .2s both',
                }}>✓</div>
                <h3 style={{
                  fontSize:'clamp(22px, 2.5vw, 30px)',
                  fontFamily: dir==='editorial' ? 'var(--serif)' : 'var(--sans)',
                  fontWeight: dir==='editorial' ? 500 : 800,
                  fontStyle: dir==='editorial' ? 'italic' : 'normal',
                  color:'var(--ink)', letterSpacing:'-.03em', marginBottom:8,
                }}>You're on the list.</h3>
                <p style={{fontSize:14, color:'var(--ink-2)', lineHeight:1.65, maxWidth:320, margin:'0 auto 20px'}}>
                  We'll review your profile and send your personalized audit within 48 hours.
                </p>
                <div style={{background:'var(--soft)', border:'1px solid var(--line)', maxWidth:300, width:'100%', marginBottom:20, textAlign:'left'}}>
                  {['Delivered to your email within 48 hours','Personalized based on your answers','No purchase required — ever'].map((t, i, arr) => (
                    <div key={t} style={{
                      display:'flex', alignItems:'center', gap:8, padding:'10px 14px',
                      fontSize:12, color:'var(--ink-2)',
                      borderBottom: i < arr.length-1 ? '1px solid var(--line)' : 'none',
                    }}>
                      <span style={{color:'var(--accent)', fontWeight:700, fontSize:10}}>✓</span>
                      {t}
                    </div>
                  ))}
                </div>
                <button onClick={handleClose} style={{
                  background:'var(--ink)', color:'#fff', border:'none',
                  padding:'11px 24px', borderRadius:100,
                  fontFamily:'var(--sans)', fontSize:12, fontWeight:700,
                  cursor:'pointer', letterSpacing:'-.01em',
                }}
                onMouseEnter={e => e.currentTarget.style.background='var(--accent)'}
                onMouseLeave={e => e.currentTarget.style.background='var(--ink)'}>Close ✕</button>
              </div>
            )}
          </div>

          {/* nav */}
          {!submitted && (
            <div style={{padding:'16px 36px 20px', display:'flex', alignItems:'center', justifyContent:'space-between', borderTop:'1px solid var(--line)', flexShrink:0, gap:10}}>
              <span style={{fontFamily:'var(--mono)', fontSize:9, letterSpacing:'.08em', textTransform:'uppercase', color:'var(--ink-3)'}}>
                {cur === total ? 'Ready to submit!' : `${remaining} question${remaining===1?'':'s'} remaining`}
              </span>
              <div style={{display:'flex', gap:8, alignItems:'center'}}>
                {step.optional && (
                  <button onClick={skip} style={{
                    fontFamily:'var(--mono)', fontSize:9, letterSpacing:'.08em', textTransform:'uppercase',
                    color:'var(--ink-3)', background:'none', border:'none', cursor:'pointer', padding:4,
                  }}
                  onMouseEnter={e => e.currentTarget.style.color='var(--ink)'}
                  onMouseLeave={e => e.currentTarget.style.color='var(--ink-3)'}>Skip</button>
                )}
                {cur > 1 && (
                  <button onClick={prev} style={{
                    background:'none', border:'1.5px solid var(--line)',
                    padding:'9px 18px', borderRadius:100,
                    fontFamily:'var(--sans)', fontSize:12, fontWeight:600,
                    color:'var(--ink-2)', cursor:'pointer', letterSpacing:'-.01em',
                  }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor='var(--ink-3)'; e.currentTarget.style.color='var(--ink)'; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor='var(--line)'; e.currentTarget.style.color='var(--ink-2)'; }}>← Back</button>
                )}
                <button onClick={next} disabled={!canGo} style={{
                  background: canGo ? 'var(--ink)' : 'var(--line)',
                  color: canGo ? '#fff' : 'var(--ink-3)',
                  border:'none', padding:'11px 22px', borderRadius:100,
                  fontFamily:'var(--sans)', fontSize:13, fontWeight:700,
                  cursor: canGo ? 'pointer' : 'not-allowed',
                  letterSpacing:'-.01em', whiteSpace:'nowrap',
                  transition:'background .2s, transform .15s',
                }}
                onMouseEnter={e => { if (canGo) { e.currentTarget.style.background='var(--accent)'; e.currentTarget.style.transform='translateY(-1px)'; }}}
                onMouseLeave={e => { if (canGo) { e.currentTarget.style.background='var(--ink)'; e.currentTarget.style.transform='none'; }}}>
                  {cur === total ? 'Submit →' : 'Continue →'}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      <style>{`
        @keyframes amSlideIn  { from{opacity:0; transform:translateX(40px)}  to{opacity:1; transform:translateX(0)} }
        @keyframes amSlideBack{ from{opacity:0; transform:translateX(-40px)} to{opacity:1; transform:translateX(0)} }
        @keyframes amTYIn     { from{opacity:0; transform:translateY(16px)}  to{opacity:1; transform:none} }
        @keyframes amCkPop    { 0%{transform:scale(.5);opacity:0} 60%{transform:scale(1.15)} 100%{transform:scale(1);opacity:1} }
        @keyframes sdot       { 0%,100%{opacity:.4} 50%{opacity:1} }
        @media(max-width:720px){
          .am-panel-resp { grid-template-columns:1fr !important; width:100% !important; }
          .am-side-resp  { display:none !important; }
        }
      `}</style>
    </div>
  );
};

const textInputStyle = {
  width:'100%', padding:'12px 14px',
  border:'1.5px solid var(--line)', background:'var(--soft)',
  fontFamily:'var(--sans)', fontSize:14, color:'var(--ink)',
  outline:'none', borderRadius:0, resize:'vertical',
  transition:'border-color .2s, background .2s',
};

// CTA section that opens the modal
const AuditCTA = () => {
  const dir = window.useDir();
  const [open, setOpen] = useState(false);

  // Listen for triggers anywhere in the page
  useEffect(() => {
    const onClick = (e) => {
      const trig = e.target.closest('a[href="#audit"], [data-audit-trigger]');
      if (trig) {
        e.preventDefault();
        setOpen(true);
      }
    };
    document.addEventListener('click', onClick);
    window.openAuditModal = () => setOpen(true);
    return () => document.removeEventListener('click', onClick);
  }, []);

  return (
    <>
      <window.Section id="audit" padded>
        <div className="wrap">
          <div style={{
            background:'var(--ink)', color:'var(--bone)', borderRadius: dir==='grid' ? 0 : 32,
            padding:'clamp(48px, 7vw, 96px)', position:'relative', overflow:'hidden',
            textAlign:'center',
          }}>
            <div style={{position:'absolute', top:-100, right:-100, width:400, height:400, borderRadius:'50%', background:'var(--accent)', opacity:.2, filter:'blur(80px)'}}/>
            <div style={{position:'absolute', bottom:-150, left:-100, width:400, height:400, borderRadius:'50%', background:'var(--accent)', opacity:.12, filter:'blur(100px)'}}/>

            <div style={{position:'relative', maxWidth:780, margin:'0 auto'}}>
              <span className="reveal" style={{...window.labelStyle, color:'rgba(255,255,255,.65)'}}>Free creator audit</span>
              <h2 className="reveal reveal-d1" style={{
                marginTop:18,
                fontFamily: dir==='editorial' ? 'var(--serif)' : 'var(--sans)',
                fontStyle: dir==='editorial' ? 'italic' : 'normal',
                fontWeight: dir==='editorial' ? 400 : 800,
                fontSize:'clamp(40px, 6vw, 88px)', lineHeight:.95, letterSpacing:'-.04em',
              }}>
                Get a real audit.<br/>Not a sales call.
              </h2>
              <p className="reveal reveal-d2" style={{
                marginTop:24, color:'rgba(255,255,255,.7)', fontSize:17, lineHeight:1.55,
                maxWidth:560, margin:'24px auto 0',
              }}>
                We'll review your profile, surface your single biggest opportunity, and send a personalized breakdown — free, within 48 hours.
              </p>

              <div className="reveal reveal-d3" style={{marginTop:36, display:'flex', gap:12, justifyContent:'center', flexWrap:'wrap'}}>
                <button onClick={() => setOpen(true)} style={{
                  display:'inline-flex', alignItems:'center', gap:8,
                  padding:'16px 28px', borderRadius: dir==='grid' ? 0 : 999,
                  background:'var(--accent)', color:'#fff',
                  fontSize:15, fontWeight:700, border:'none', cursor:'pointer',
                  transition:'transform .2s',
                }}
                onMouseEnter={e => e.currentTarget.style.transform='translateY(-2px)'}
                onMouseLeave={e => e.currentTarget.style.transform='none'}>
                  Start my free audit <span>↗</span>
                </button>
              </div>

              <div className="reveal reveal-d4" style={{
                marginTop:32, display:'flex', gap:24, justifyContent:'center', flexWrap:'wrap',
                fontSize:11, fontFamily:'var(--mono)', color:'rgba(255,255,255,.5)',
                textTransform:'uppercase', letterSpacing:'.1em',
              }}>
                <span>2 min · To complete</span>
                <span>•</span>
                <span>No credit card</span>
                <span>•</span>
                <span>48h turnaround</span>
              </div>
            </div>
          </div>
        </div>
      </window.Section>

      <AuditModal open={open} onClose={() => setOpen(false)}/>
    </>
  );
};

window.AuditCTA = AuditCTA;
window.AuditModal = AuditModal;
