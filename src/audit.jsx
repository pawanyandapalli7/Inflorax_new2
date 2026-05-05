// AUDIT — single-page form, slide-in from right

const AuditModal = ({open, onClose}) => {
  const [data, setData] = useState({fname:'',lname:'',email:'',handle:'',platform:'',goal:'',niche:'',followers:'',experience:'',challenge:'',budget:'',frequency:'',tried:''});
  const [honeypot, setHoneypot] = useState('');       // must stay empty
  const [mathAnswer, setMathAnswer] = useState('');   // human check
  const [mathError, setMathError] = useState(false);
  const [mathQ] = useState(() => {
    const a = Math.floor(Math.random()*9)+1;
    const b = Math.floor(Math.random()*9)+1;
    return { a, b, answer: a + b };
  });
  const [recaptchaReady, setRecaptchaReady] = useState(false);
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (open) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  // Load reCAPTCHA v3 once
  useEffect(() => {
    if (document.getElementById('rcaptcha-script')) { setRecaptchaReady(true); return; }
    const s = document.createElement('script');
    s.id = 'rcaptcha-script';
    s.src = 'https://www.google.com/recaptcha/api.js?render=6LdCFNgsAAAAAJ5LaaMgTyy8ijFQLi2V9AoQLrRz';
    s.async = true;
    s.onload = () => setRecaptchaReady(true);
    document.head.appendChild(s);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = e => { if (e.key === 'Escape') handleClose(); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  const set = (k, v) => {
    setData(d => ({...d, [k]: v}));
    setErrors(e => ({...e, [k]: false}));
  };

  const validate = () => {
    // Honeypot — if filled, it's a bot
    if (honeypot.trim()) return false;
    // Math check
    if (parseInt(mathAnswer, 10) !== mathQ.answer) {
      setMathError(true);
      return false;
    }
    setMathError(false);
    const e = {};
    if (!data.fname.trim()) e.fname = true;
    if (!data.lname.trim()) e.lname = true;
    if (!data.email.trim() || !data.email.includes('@')) e.email = true;
    if (!data.handle.trim()) e.handle = true;
    if (!data.platform) e.platform = true;
    if (!data.goal) e.goal = true;
    if (!data.niche.trim()) e.niche = true;
    if (!data.followers) e.followers = true;
    if (!data.frequency) e.frequency = true;
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const submit = () => {
    if (!validate()) return;
    setLoading(true);

    const doSubmit = (token) => {
      // Formspree — each field has a clear name, works without internal field IDs
      const payload = {
        'First name':        data.fname,
        'Last name':         data.lname,
        '_replyto':          data.email,
        'Handle':            data.handle,
        'Platform':          data.platform,
        'Frequency':         data.frequency,
        'Main goal':         data.goal,
        'Challenge':         data.challenge,
        'Niche':             data.niche,
        'Followers':         data.followers,
        'Experience':        data.experience,
        'Tried before':      data.tried,
        'Budget openness':   data.budget,
        '_subject':          'New Creator Audit — ' + data.fname + ' ' + data.lname,
        'g-recaptcha-response': token || '',
      };
      fetch('https://formspree.io/f/xojregkr', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify(payload),
      })
      .then(r => r.json())
      .then(() => { setLoading(false); setSubmitted(true); })
      .catch(() => { setLoading(false); setSubmitted(true); });
    };

    if (recaptchaReady && window.grecaptcha) {
      window.grecaptcha.ready(() => {
        window.grecaptcha.execute('6LdCFNgsAAAAAJ5LaaMgTyy8ijFQLi2V9AoQLrRz', {action:'audit_submit'})
          .then(token => doSubmit(token))
          .catch(() => doSubmit(null));
      });
    } else {
      doSubmit(null);
    }
  };

  const reset = () => {
    setData({fname:'',lname:'',email:'',handle:'',platform:'',goal:'',niche:''});
    setErrors({}); setSubmitted(false); setLoading(false);
  };
  const handleClose = () => { onClose(); setTimeout(reset, 500); };

  const inp = (k, overrides={}) => ({
    value: data[k],
    onChange: e => set(k, e.target.value),
    style: {
      width:'100%', padding:'15px 16px',
      border: `2px solid ${errors[k] ? '#c0392b' : '#d0d8d0'}`,
      background: '#fff',
      fontFamily:'var(--serif)', fontSize:16, color:'#111',
      outline:'none', borderRadius:10, transition:'border-color .2s',
      ...overrides,
    },
    onFocus: e => { e.target.style.borderColor='var(--accent)'; },
    onBlur:  e => { e.target.style.borderColor=errors[k]?'#c0392b':'#d0d8d0'; },
  });

  const ChoiceBtn = ({label, field, value}) => {
    const on = data[field] === value;
    return (
      <button type="button" onClick={() => set(field, value)} style={{
        padding:'13px 18px', borderRadius:10, border:'1.5px solid', minHeight:50,
        borderColor: on ? 'var(--accent)' : errors[field] ? 'rgba(216,95,31,.4)' : 'var(--line)',
        background: on ? 'var(--accent-l)' : 'var(--soft)',
        fontSize:15, fontWeight: on ? 700 : 500,
        color: on ? 'var(--accent)' : 'var(--ink-2)',
        cursor:'pointer', transition:'all .18s', textAlign:'left',
        display:'flex', alignItems:'center', gap:8,
      }}
      onMouseEnter={e=>{ if(!on){e.currentTarget.style.borderColor='var(--accent)'; e.currentTarget.style.color='var(--accent)';} }}
      onMouseLeave={e=>{ if(!on){e.currentTarget.style.borderColor=errors[field]?'#c0392b':'#d0d8d0'; e.currentTarget.style.color='#111';} }}>
        <span style={{
          width:14, height:14, borderRadius:'50%', flexShrink:0,
          border:'1.5px solid', borderColor: on ? 'var(--accent)' : 'var(--line)',
          background: on ? 'var(--accent)' : 'transparent',
          display:'flex', alignItems:'center', justifyContent:'center',
        }}>
          {on && <span style={{width:5, height:5, borderRadius:'50%', background:'#fff', display:'block'}}/>}
        </span>
        {label}
      </button>
    );
  };

  const Label = ({children, error}) => (
    <div style={{
      fontFamily:'var(--mono)', fontSize:11, letterSpacing:'.08em', textTransform:'uppercase',
      color: error ? '#c0392b' : '#1a1a1a', marginBottom:10, display:'flex', alignItems:'center', gap:6,
      fontWeight: 600,
    }}>
      {children}{error && <span style={{color:'#c0392b', marginLeft:4}}>← required</span>}
    </div>
  );

  const hasErrors = Object.values(errors).some(Boolean);

  return (
    <div onClick={e => { if (e.target === e.currentTarget) handleClose(); }} style={{
      position:'fixed', inset:0, zIndex:9998,
      display:'flex',
      opacity: open ? 1 : 0,
      pointerEvents: open ? 'auto' : 'none',
      transition:'opacity .38s cubic-bezier(.16,1,.3,1)',
    }}>
      {/* Backdrop */}
      <div style={{position:'absolute', inset:0, background:'rgba(8,15,8,.7)', backdropFilter:'blur(6px)', WebkitBackdropFilter:'blur(6px)'}}/>

      {/* Panel — slides from right */}
      <div className="audit-panel" style={{
        position:'relative', zIndex:1, marginLeft:'auto',
        width:'min(100%, 560px)', height:'100%',
        background:'#fff', display:'flex', flexDirection:'column',
        transform: open ? 'translateX(0)' : 'translateX(60px)',
        transition:'transform .42s cubic-bezier(.16,1,.3,1)',
        overflow:'hidden',
      }}>
        {/* Header */}
        <div className="audit-header" style={{
          padding:'20px 28px 18px', flexShrink:0,
          borderBottom:'1px solid var(--line)',
          display:'flex', alignItems:'center', justifyContent:'space-between',
          background:'var(--ink)',
        }}>
          <div>
            <div style={{fontFamily:'var(--mono)', fontSize:9, letterSpacing:'.14em', textTransform:'uppercase', color:'rgba(240,246,232,.45)', marginBottom:4}}>
              Free Creator Audit
            </div>
            <div style={{fontWeight:800, fontSize:'clamp(15px,4vw,18px)', letterSpacing:'-.02em', color:'#fff'}}>
              Let's find your growth <span style={{color:'#22c55e', fontFamily:'var(--serif)', fontStyle:'italic', fontWeight:300}}>opportunity.</span>
            </div>
          </div>
          <button onClick={handleClose} style={{
            width:34, height:34, borderRadius:'50%', border:'none',
            background:'rgba(240,246,232,.1)', color:'rgba(240,246,232,.7)',
            fontSize:16, cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0,
            transition:'background .2s',
          }}
          onMouseEnter={e=>e.currentTarget.style.background='rgba(240,246,232,.2)'}
          onMouseLeave={e=>e.currentTarget.style.background='rgba(240,246,232,.1)'}>✕</button>
        </div>

        {/* Scrollable form body */}
        <div className="audit-body" style={{flex:1, overflowY:'auto', padding:'24px 28px', display:'flex', flexDirection:'column', gap:24, background:'#fff'}}>

          {!submitted ? (<>

            {/* Name row */}
            <div>
              <Label error={errors.fname || errors.lname}>Your name</Label>
              <div className="audit-name-grid" style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:12}}>
                <input type="text" placeholder="First name" autoComplete="given-name" {...inp('fname')}/>
                <input type="text" placeholder="Last name" autoComplete="family-name" {...inp('lname')}/>
              </div>
            </div>

            {/* Email */}
            <div>
              <Label error={errors.email}>Email address</Label>
              <input type="email" placeholder="you@email.com" autoComplete="email" {...inp('email')}/>
            </div>

            {/* Handle */}
            <div>
              <Label error={errors.handle}>Your Instagram or YouTube handle</Label>
              <input type="text" placeholder="@yourhandle or youtube.com/channel" {...inp('handle')}/>
            </div>

            {/* Platform */}
            <div>
              <Label error={errors.platform}>Which platform are you focusing on?</Label>
              <div style={{display:'flex', gap:8, flexWrap:'wrap'}}>
                {['Instagram','YouTube','Both'].map(v => (
                  <ChoiceBtn key={v} label={v} field="platform" value={v}/>
                ))}
              </div>
            </div>

            {/* Goal */}
            <div>
              <Label error={errors.goal}>What's your main goal right now?</Label>
              <div className="audit-choice-grid" style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:8}}>
                {['More followers','More views','Better engagement','Build my brand'].map(v => (
                  <ChoiceBtn key={v} label={v} field="goal" value={v}/>
                ))}
              </div>
            </div>

            {/* Niche */}
            <div>
              <Label error={errors.niche}>Your content niche</Label>
              <input type="text" placeholder="e.g. fitness, finance, travel, cooking…" {...inp('niche')}/>
            </div>

            {/* Followers */}
            <div>
              <Label error={errors.followers}>Current followers / subscribers</Label>
              <div style={{display:'flex', gap:8, flexWrap:'wrap'}}>
                {['Under 1K','1K–5K','5K–20K','20K–100K','100K+'].map(v => (
                  <ChoiceBtn key={v} label={v} field="followers" value={v}/>
                ))}
              </div>
            </div>

            {/* Posting frequency */}
            <div>
              <Label error={errors.frequency}>How often do you post?</Label>
              <div style={{display:'flex', gap:8, flexWrap:'wrap'}}>
                {['Daily','3–5× a week','1–2× a week','A few times a month','Rarely'].map(v => (
                  <ChoiceBtn key={v} label={v} field="frequency" value={v}/>
                ))}
              </div>
            </div>

            {/* Experience */}
            <div>
              <Label>How long have you been creating? <span style={{color:'var(--ink-4)',fontWeight:400}}>(optional)</span></Label>
              <div style={{display:'flex', gap:8, flexWrap:'wrap'}}>
                {['Under 6 months','6–12 months','1–2 years','2+ years'].map(v => (
                  <ChoiceBtn key={v} label={v} field="experience" value={v}/>
                ))}
              </div>
            </div>

            {/* Biggest challenge */}
            <div>
              <Label>Biggest challenge right now <span style={{color:'var(--ink-4)',fontWeight:400}}>(optional)</span></Label>
              <textarea placeholder="e.g. My reach dropped, I don't know what to post, nothing is growing…"
                rows={3}
                value={data.challenge}
                onChange={e => set('challenge', e.target.value)}
                style={{
                  width:'100%', padding:'15px 16px',
                  border:'2px solid #d0d8d0', background:'#fff',
                  fontFamily:'var(--serif)', fontSize:16, color:'#111',
                  outline:'none', borderRadius:10, resize:'vertical',
                  transition:'border-color .2s',
                }}
                onFocus={e=>{e.target.style.borderColor='var(--accent)';}}
                onBlur={e=>{e.target.style.borderColor='#d0d8d0';}}
              />
            </div>

            {/* What they've tried */}
            <div>
              <Label>What have you tried before? <span style={{color:'var(--ink-4)',fontWeight:400}}>(optional)</span></Label>
              <div className="audit-choice-grid" style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:8}}>
                {['Boosting posts','Running ads','Posting more often','Changing content style','Nothing yet','Other growth services'].map(v => (
                  <ChoiceBtn key={v} label={v} field="tried" value={v}/>
                ))}
              </div>
            </div>

            {/* Budget */}
            <div>
              <Label>Open to a paid promotion plan? <span style={{color:'var(--ink-4)',fontWeight:400}}>(optional)</span></Label>
              <div style={{display:'flex', gap:8, flexWrap:'wrap'}}>
                {['Yes, definitely','Maybe — depends on the plan','Not right now','Just exploring'].map(v => (
                  <ChoiceBtn key={v} label={v} field="budget" value={v}/>
                ))}
              </div>
            </div>

            {/* Honeypot — visually hidden, bots fill this, humans don't */}
            <div style={{position:'absolute', left:'-9999px', top:'-9999px', opacity:0, height:0, overflow:'hidden'}} aria-hidden="true">
              <label>Leave this empty</label>
              <input type="text" name="website" tabIndex={-1} autoComplete="off"
                value={honeypot} onChange={e => setHoneypot(e.target.value)}/>
            </div>

            {/* Math CAPTCHA */}
            <div>
              <Label error={mathError}>
                Quick check — what is {mathQ.a} + {mathQ.b}?
                {mathError && <span style={{color:'var(--accent)', marginLeft:6}}>← wrong answer</span>}
              </Label>
              <input
                type="number"
                inputMode="numeric"
                placeholder={`${mathQ.a} + ${mathQ.b} = ?`}
                value={mathAnswer}
                onChange={e => { setMathAnswer(e.target.value); setMathError(false); }}
                style={{
                  width:'100%', padding:'14px 16px',
                  border:`1.5px solid ${mathError ? 'var(--accent)' : 'var(--line)'}`,
                  background: mathError ? 'rgba(216,95,31,.04)' : 'var(--soft)',
                  fontFamily:'var(--serif)', fontSize:16, color:'var(--ink)',
                  outline:'none', borderRadius:10, transition:'border-color .2s, background .2s',
                  maxWidth:180,
                }}
                onFocus={e=>{e.target.style.borderColor='var(--accent)';}}
                onBlur={e=>{e.target.style.borderColor=mathError?'#c0392b':'#d0d8d0';}}
              />
              <p style={{marginTop:6, fontSize:11, color:'var(--ink-3)', fontFamily:'var(--mono)'}}>
                This confirms you're a real person, not a bot.
              </p>
            </div>

            {/* reCAPTCHA badge note */}
            <p style={{fontSize:10, color:'var(--ink-4)', lineHeight:1.5, fontFamily:'var(--mono)'}}>
              Protected by reCAPTCHA ·{' '}
              <a href="https://policies.google.com/privacy" target="_blank" rel="noopener" style={{color:'var(--ink-3)'}}>Privacy</a>
              {' '}·{' '}
              <a href="https://policies.google.com/terms" target="_blank" rel="noopener" style={{color:'var(--ink-3)'}}>Terms</a>
            </p>

            {/* Trust row */}
            <div style={{display:'flex', gap:16, flexWrap:'wrap', paddingTop:4}}>
              {[['🔒','No passwords'],['✓','Free audit'],['⚡','48h reply']].map(([ic,t]) => (
                <div key={t} style={{display:'flex', alignItems:'center', gap:6, fontSize:12, color:'var(--ink-3)'}}>
                  <span style={{color:'var(--accent)'}}>{ic}</span>{t}
                </div>
              ))}
            </div>

          </>) : (
            /* Thank you */
            <div style={{
              display:'flex', flexDirection:'column', alignItems:'center',
              justifyContent:'center', textAlign:'center', flex:1, padding:'40px 0',
              animation:'amTYIn .5s cubic-bezier(.16,1,.3,1)',
            }}>
              <div style={{
                width:64, height:64, borderRadius:'50%',
                background:'rgba(22,101,52,.1)', border:'2px solid rgba(22,101,52,.3)',
                display:'flex', alignItems:'center', justifyContent:'center',
                fontSize:26, color:'var(--accent)', marginBottom:20,
                animation:'amCkPop .55s cubic-bezier(.16,1,.3,1) .1s both',
              }}>✓</div>
              <h3 style={{fontWeight:800, fontSize:22, letterSpacing:'-.02em', color:'var(--ink)', marginBottom:8}}>You're on the list.</h3>
              <p style={{fontSize:14, color:'var(--ink-2)', lineHeight:1.65, maxWidth:300, marginBottom:24}}>
                We'll review your profile and send your personalized audit within 48 hours.
              </p>
              {[["Delivered to your email within 48 hours"],["Personalized based on your answers"],["No purchase required — ever"]].map(([t]) => (
                <div key={t} style={{display:'flex', alignItems:'center', gap:8, fontSize:13, color:'var(--ink-2)', marginBottom:8}}>
                  <span style={{color:'var(--accent)', fontWeight:700}}>✓</span>{t}
                </div>
              ))}
              <p style={{marginTop:16, fontSize:13, color:'var(--ink-3)', textAlign:'center', lineHeight:1.6}}>
                Questions? Email us at{' '}
                <a href="mailto:info@inflorax.com" style={{color:'var(--accent)', textDecoration:'none', fontWeight:600}}>info@inflorax.com</a>
              </p>
              <button onClick={handleClose} style={{
                marginTop:16, background:'var(--ink)', color:'#fff', border:'none',
                padding:'12px 28px', borderRadius:999, fontSize:13, fontWeight:700, cursor:'pointer',
              }}
              onMouseEnter={e=>e.currentTarget.style.background='var(--accent)'}
              onMouseLeave={e=>e.currentTarget.style.background='var(--ink)'}>Close ✕</button>
            </div>
          )}
        </div>

        {/* Footer CTA */}
        {!submitted && (
          <div className="audit-footer" style={{
            padding:'16px 28px 20px', flexShrink:0,
            borderTop:'1px solid #e8ede8', background:'#fff',
          }}>
            {hasErrors && (
              <p style={{fontFamily:'var(--mono)', fontSize:10, color:'var(--accent)', letterSpacing:'.06em', marginBottom:10}}>
                ↑ Please fill in all required fields
              </p>
            )}
            <button onClick={submit} disabled={loading} style={{
              width:'100%', padding:'16px',
              background: loading ? 'var(--line)' : 'var(--accent)',
              color: loading ? 'var(--ink-3)' : '#fff',
              border:'none', borderRadius:999,
              fontFamily:'var(--serif)', fontSize:'clamp(15px,3vw,17px)', fontWeight:700,
              cursor: loading ? 'not-allowed' : 'pointer',
              transition:'background .2s, transform .15s',
              letterSpacing:'-.01em',
            }}
            onMouseEnter={e=>{ if(!loading) e.currentTarget.style.transform='translateY(-1px)'; }}
            onMouseLeave={e=>{ e.currentTarget.style.transform='none'; }}>
              {loading ? 'Sending…' : 'Send my free audit →'}
            </button>
          </div>
        )}
      </div>

      <style>{`
        @keyframes amTYIn  { from{opacity:0;transform:translateY(16px)} to{opacity:1;transform:none} }
        @keyframes amCkPop { 0%{transform:scale(.5);opacity:0} 60%{transform:scale(1.15)} 100%{transform:scale(1);opacity:1} }

        /* Scrollbar */
        .audit-body::-webkit-scrollbar { width: 4px }
        .audit-body::-webkit-scrollbar-track { background: transparent }
        .audit-body::-webkit-scrollbar-thumb { background: var(--line); border-radius: 4px }

        /* Mobile — full width, tighter padding */
        @media(max-width:540px) {
          .audit-panel  { width: 100% !important }
          .audit-header { padding: 16px 18px 14px !important }
          .audit-body   { padding: 18px 18px !important; gap: 16px !important }
          .audit-footer { padding: 12px 18px 16px !important }
        }

        /* Very small screens — stack name side by side → single col */
        @media(max-width:380px) {
          .audit-name-grid    { grid-template-columns: 1fr !important }
          .audit-choice-grid  { grid-template-columns: 1fr !important }
        }

        /* Input font-size 16px on mobile prevents iOS zoom */
        @media(max-width:540px) {
          .audit-body input,
          .audit-body textarea { font-size: 16px !important; padding: 12px 14px !important }
          .audit-body { padding: 16px 16px !important; gap: 20px !important }
        }
      `}</style>
    </div>
  );
};

// AuditCTA section
const AuditCTA = () => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onClick = e => {
      const trig = e.target.closest('[data-audit-trigger]');
      if (trig) { e.preventDefault(); setOpen(true); }
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
            background:'var(--ink)', color:'var(--bone)', borderRadius:28,
            padding:'clamp(48px,7vw,88px)', position:'relative', overflow:'hidden', textAlign:'center',
          }}>
            <div style={{position:'absolute',top:-100,right:-100,width:400,height:400,borderRadius:'50%',background:'var(--accent)',opacity:.15,filter:'blur(80px)'}}/>
            <div style={{position:'absolute',bottom:-120,left:-80,width:360,height:360,borderRadius:'50%',background:'var(--accent)',opacity:.1,filter:'blur(80px)'}}/>
            <div style={{position:'relative', maxWidth:680, margin:'0 auto'}}>
              <span className="reveal" style={{...window.labelStyle, color:'rgba(240,246,232,.5)'}}>Free creator audit</span>
              <h2 className="reveal reveal-d1" style={{
                marginTop:16, fontFamily:'var(--sans)', fontWeight:800,
                fontSize:'clamp(36px,6vw,80px)', lineHeight:.95, letterSpacing:'-.04em',
              }}>
                Get a real audit.<br/>Not a sales call.
              </h2>
              <p className="reveal reveal-d2" style={{
                marginTop:20, color:'rgba(240,246,232,.65)', fontSize:16, lineHeight:1.55,
                maxWidth:480, margin:'20px auto 0',
              }}>
                We'll review your profile, surface your biggest opportunity, and send a personalised breakdown — free, within 48 hours.
              </p>
              <div className="reveal reveal-d3" style={{marginTop:32, display:'flex', gap:12, justifyContent:'center', flexWrap:'wrap'}}>
                <button onClick={() => setOpen(true)} style={{
                  display:'inline-flex', alignItems:'center', gap:8,
                  padding:'14px 28px', borderRadius:999,
                  background:'var(--accent)', color:'#fff',
                  fontSize:15, fontWeight:700, border:'none', cursor:'pointer',
                  transition:'transform .2s',
                }}
                onMouseEnter={e=>e.currentTarget.style.transform='translateY(-2px)'}
                onMouseLeave={e=>e.currentTarget.style.transform='none'}>
                  Start my free audit →
                </button>
              </div>
              <div className="reveal reveal-d4" style={{
                marginTop:24, display:'flex', gap:20, justifyContent:'center', flexWrap:'wrap',
                fontSize:11, fontFamily:'var(--mono)', color:'rgba(240,246,232,.4)',
                textTransform:'uppercase', letterSpacing:'.1em',
              }}>
                <span>2 min to complete</span><span>·</span>
                <span>No credit card</span><span>·</span>
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
