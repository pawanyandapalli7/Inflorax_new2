// WELCOME SCREEN — dark, green accent, big wordmark, corner brackets, dot
const Preloader = () => {
  const [phase, setPhase] = useState('in');   // 'in' | 'hold' | 'out' | 'gone'

  useEffect(() => {
    document.documentElement.style.overflow = 'hidden';
    document.body.style.overflow = 'hidden';
    const unlock = () => {
      document.documentElement.style.overflow = '';
      document.body.style.overflow = '';
    };

    // Sequence: fade in → hold → fade out → gone
    const t1 = setTimeout(() => setPhase('hold'), 400);
    const t2 = setTimeout(() => setPhase('out'),  2200);
    const t3 = setTimeout(() => { setPhase('gone'); unlock(); }, 2900);

    // Click to skip
    const skip = () => {
      unlock();
      setPhase('gone');
    };
    window.addEventListener('click', skip, { once: true });

    return () => {
      clearTimeout(t1); clearTimeout(t2); clearTimeout(t3);
      window.removeEventListener('click', skip);
      unlock();
    };
  }, []);

  if (phase === 'gone') return null;

  const isOut = phase === 'out';

  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 99999,
      background: '#080f08',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      flexDirection: 'column',
      opacity: isOut ? 0 : 1,
      transition: isOut ? 'opacity .7s cubic-bezier(.4,0,1,1)' : 'opacity .4s ease',
      cursor: 'pointer',
    }}>

      {/* Subtle grid overlay */}
      <div style={{
        position: 'absolute', inset: 0, zIndex: 0,
        backgroundImage: `
          linear-gradient(rgba(22,101,52,.06) 1px, transparent 1px),
          linear-gradient(90deg, rgba(22,101,52,.06) 1px, transparent 1px)
        `,
        backgroundSize: '60px 60px',
        pointerEvents: 'none',
      }}/>

      {/* Radial glow behind wordmark */}
      <div style={{
        position: 'absolute', top: '50%', left: '50%',
        transform: 'translate(-50%,-50%)',
        width: 800, height: 400,
        background: 'radial-gradient(ellipse at center, rgba(22,101,52,.18) 0%, transparent 70%)',
        pointerEvents: 'none', zIndex: 0,
      }}/>

      {/* Corner brackets */}
      {[
        { top: 28, left: 28, borderTop: '1.5px solid', borderLeft: '1.5px solid' },
        { top: 28, right: 28, borderTop: '1.5px solid', borderRight: '1.5px solid' },
        { bottom: 28, left: 28, borderBottom: '1.5px solid', borderLeft: '1.5px solid' },
        { bottom: 28, right: 28, borderBottom: '1.5px solid', borderRight: '1.5px solid' },
      ].map((s, i) => (
        <div key={i} style={{
          position: 'absolute', width: 32, height: 32,
          borderColor: 'rgba(22,101,52,.5)',
          ...s, zIndex: 1,
        }}/>
      ))}

      {/* Bottom dots */}
      <div style={{
        position: 'absolute', bottom: 36, left: '50%', transform: 'translateX(-50%)',
        display: 'flex', gap: 12, zIndex: 1,
      }}>
        {[0,1,2].map(i => (
          <div key={i} style={{
            width: 5, height: 5, borderRadius: '50%',
            background: i === 1 ? '#166534' : 'rgba(22,101,52,.25)',
          }}/>
        ))}
      </div>

      {/* Skip hint */}
      <div style={{
        position: 'absolute', bottom: 28, right: 40,
        fontFamily: 'var(--mono)', fontSize: 9, letterSpacing: '.12em',
        textTransform: 'uppercase', color: 'rgba(22,101,52,.4)', zIndex: 1,
      }}>Click to skip</div>

      {/* Main content */}
      <div style={{ position: 'relative', zIndex: 2, textAlign: 'center' }}>

        {/* Agency label */}
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 16,
          marginBottom: 32,
          fontFamily: 'var(--mono)', fontSize: 11, letterSpacing: '.22em',
          textTransform: 'uppercase', color: 'rgba(22,101,52,.65)',
        }}>
          <span style={{ display: 'inline-block', width: 40, height: 1, background: 'rgba(22,101,52,.4)' }}/>
          Instagram &amp; YouTube Growth Agency
          <span style={{ display: 'inline-block', width: 40, height: 1, background: 'rgba(22,101,52,.4)' }}/>
        </div>

        {/* INFLORAX wordmark + dot */}
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 0,
          lineHeight: 1,
        }}>
          <span style={{
            fontFamily: 'var(--sans)', fontWeight: 900,
            fontSize: 'clamp(56px, 12vw, 148px)',
            letterSpacing: '-.02em',
            color: '#fff',
            textTransform: 'uppercase',
          }}>INFLORAX</span>
          {/* Green dot */}
          <div style={{
            width: 'clamp(44px, 9vw, 112px)',
            height: 'clamp(44px, 9vw, 112px)',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #22c55e, #166534)',
            marginLeft: 8,
            flexShrink: 0,
            boxShadow: '0 0 60px rgba(34,197,94,.35), 0 0 120px rgba(22,101,52,.2)',
          }}/>
        </div>

        {/* Tagline */}
        <p style={{
          marginTop: 28,
          fontFamily: 'var(--sans)', fontSize: 'clamp(13px, 1.4vw, 17px)',
          color: 'rgba(255,255,255,.45)', letterSpacing: '.02em',
          fontWeight: 400,
        }}>
          Strategic content promotion for creators who are serious about being{' '}
          <span style={{
            fontFamily: 'var(--serif)', fontStyle: 'italic', fontWeight: 400,
            color: '#22c55e',
          }}>seen.</span>
        </p>

        {/* Loading bar */}
        <div style={{
          marginTop: 40, width: 'clamp(160px, 20vw, 240px)',
          height: 1, background: 'rgba(22,101,52,.2)', margin: '40px auto 0',
          position: 'relative', overflow: 'hidden',
        }}>
          <div style={{
            position: 'absolute', inset: 0,
            background: 'linear-gradient(90deg, transparent, #166534, #22c55e, transparent)',
            animation: 'wsScan 1.8s ease-in-out infinite',
          }}/>
        </div>

      </div>

      <style>{`
        @keyframes wsScan {
          0%   { transform: translateX(-100%) }
          100% { transform: translateX(100%) }
        }
      `}</style>
    </div>
  );
};
window.Preloader = Preloader;
