// FLOAT CTA — sticky floating audit button
const FloatCTA = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <button
      onClick={() => window.openAuditModal && window.openAuditModal()}
      style={{
        position: 'fixed', bottom: 24, right: 24, zIndex: 9990,
        background: 'var(--accent)', color: '#fff',
        border: 'none', padding: '12px 22px', borderRadius: 999,
        fontFamily: 'var(--sans)', fontSize: 13, fontWeight: 700,
        cursor: 'pointer', letterSpacing: '-.01em',
        boxShadow: '0 8px 32px -8px rgba(216,95,31,.6)',
        opacity: visible ? 1 : 0,
        pointerEvents: visible ? 'auto' : 'none',
        transform: visible ? 'translateY(0)' : 'translateY(12px)',
        transition: 'opacity .3s, transform .3s',
        display: 'flex', alignItems: 'center', gap: 8,
      }}
      onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-2px)'}
      onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}
    >
      Free Audit →
    </button>
  );
};
window.FloatCTA = FloatCTA;

// LIVE CLOCK — updates every second, used by nav + footer
const useClock = () => {
  const [time, setTime] = useState('');
  const [date, setDate] = useState('');

  useEffect(() => {
    const fmt = () => {
      const d = new Date();
      const h = d.getHours(), m = d.getMinutes(), s = d.getSeconds();
      const ampm = h < 12 ? ' am' : ' pm';
      const pad = n => (n < 10 ? '0' : '') + n;
      setTime(pad(h) + ':' + pad(m) + ':' + pad(s) + ampm);
      setDate(d.getDate() + '.' + pad(d.getMonth() + 1) + '.' + d.getFullYear());
    };
    fmt();
    const id = setInterval(fmt, 1000);
    return () => clearInterval(id);
  }, []);

  return { time, date };
};
window.useClock = useClock;
