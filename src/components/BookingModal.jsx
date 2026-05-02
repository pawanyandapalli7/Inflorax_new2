import { useState, useEffect } from "react";

/**
 * BOOKING MODAL — Email powered by Formspree (free)
 *
 * SETUP (one-time, 2 minutes):
 * 1. Go to https://formspree.io → Sign up free with 1611py@gmail.com
 * 2. Click "+ New Form" → name it "Threads Bookings" → Create Form
 * 3. Copy your Form ID (looks like: xbjvkgzr)
 * 4. Replace "YOUR_FORM_ID" below with your actual ID
 * 5. Commit the file → Vercel redeploys → bookings arrive at 1611py@gmail.com
 *
 * Formspree free tier: 50 submissions/month
 */
const FORMSPREE_ID = "xrervkbg";

const GOLD = "#C9A84C";
const GOLD_LIGHT = "#E8C96A";
const BLACK = "#0A0A0A";
const CHARCOAL = "#1A1A1A";
const OFF_WHITE = "#FAF8F4";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,300;1,400&family=Jost:wght@300;400;500;600&display=swap');
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  .bm-overlay {
    position: fixed; inset: 0; z-index: 1000;
    background: rgba(0,0,0,0.78); backdrop-filter: blur(6px);
    display: flex; align-items: center; justify-content: center;
    padding: 20px; animation: bmFadeIn 0.25s ease;
    font-family: 'Jost', sans-serif;
  }
  @keyframes bmFadeIn { from { opacity:0; } to { opacity:1; } }

  .bm-modal {
    background: ${OFF_WHITE}; width: 100%; max-width: 860px;
    max-height: 92vh; overflow-y: auto;
    display: grid; grid-template-columns: 260px 1fr;
    animation: bmSlideUp 0.3s cubic-bezier(0.16,1,0.3,1);
    position: relative;
  }
  @keyframes bmSlideUp {
    from { transform: translateY(40px); opacity:0; }
    to   { transform: translateY(0);    opacity:1; }
  }

  /* SIDEBAR */
  .bm-sidebar {
    background: ${BLACK}; padding: 40px 26px;
    display: flex; flex-direction: column;
    position: relative; overflow: hidden;
  }
  .bm-sidebar-bg {
    position: absolute; inset: 0;
    background: radial-gradient(ellipse 80% 60% at 30% 20%, #1a1208 0%, ${BLACK} 100%);
  }
  .bm-sc { position: relative; z-index:1; flex:1; display:flex; flex-direction:column; }
  .bm-brand {
    font-family:'Cormorant Garamond',serif; font-size:20px; font-weight:400;
    color:#fff; letter-spacing:.04em; margin-bottom:3px;
  }
  .bm-brand span { color:${GOLD}; }
  .bm-tagline {
    font-size:10px; letter-spacing:.2em; text-transform:uppercase;
    color:rgba(255,255,255,.28); margin-bottom:32px;
  }
  .bm-pl { font-size:9px; letter-spacing:.25em; text-transform:uppercase; color:${GOLD}; font-weight:500; margin-bottom:8px; }
  .bm-ps { font-family:'Cormorant Garamond',serif; font-size:21px; color:#fff; line-height:1.25; margin-bottom:5px; }
  .bm-pp { font-family:'Cormorant Garamond',serif; font-size:17px; color:${GOLD}; font-weight:300; }
  .bm-pd { font-size:11px; color:rgba(255,255,255,.28); margin-top:3px; }
  .bm-dp { margin-top:22px; padding-top:18px; border-top:1px solid rgba(255,255,255,.07); }
  .bm-sf { margin-top:auto; padding-top:20px; border-top:1px solid rgba(255,255,255,.07); }
  .bm-ci { font-size:11px; color:rgba(255,255,255,.28); margin-bottom:6px; }
  .bm-ci a { color:rgba(255,255,255,.28); text-decoration:none; }
  .bm-ci a:hover { color:${GOLD}; }

  /* MAIN */
  .bm-main { padding:38px 34px; position:relative; }
  .bm-close {
    position:absolute; top:14px; right:14px;
    background:none; border:none; cursor:pointer; color:#bbb; font-size:17px;
    width:30px; height:30px; display:flex; align-items:center; justify-content:center;
    transition:color .2s; font-family:'Jost',sans-serif; z-index:10;
  }
  .bm-close:hover { color:${BLACK}; }

  /* STEPS */
  .bm-steps {
    display:flex; gap:0; margin-bottom:28px;
    border-bottom:1px solid rgba(0,0,0,.08); overflow-x:auto;
  }
  .bm-step {
    display:flex; align-items:center; gap:7px;
    padding:0 0 12px; margin-right:20px;
    border-bottom:2px solid transparent; flex-shrink:0;
  }
  .bm-step.active { border-bottom-color:${GOLD}; }
  .bm-step-n {
    width:20px; height:20px; border-radius:50%;
    background:rgba(0,0,0,.08);
    display:flex; align-items:center; justify-content:center;
    font-size:10px; font-weight:600; color:#aaa;
  }
  .bm-step.active .bm-step-n,
  .bm-step.done  .bm-step-n { background:${GOLD}; color:${BLACK}; }
  .bm-step-l { font-size:10px; letter-spacing:.12em; text-transform:uppercase; font-weight:500; color:#ccc; }
  .bm-step.active .bm-step-l { color:${BLACK}; }
  .bm-step.done  .bm-step-l { color:#999; }

  .bm-title { font-family:'Cormorant Garamond',serif; font-size:25px; font-weight:400; color:${BLACK}; margin-bottom:3px; }
  .bm-sub   { font-size:12px; color:#999; margin-bottom:22px; }

  /* SERVICE GRID */
  .bm-sg { display:grid; grid-template-columns:1fr 1fr; gap:2px; background:rgba(0,0,0,.06); margin-bottom:6px; }
  .bm-so {
    background:#fff; padding:13px 14px;
    cursor:pointer; border:2px solid transparent; transition:all .15s; position:relative;
  }
  .bm-so:hover { background:#fffef8; }
  .bm-so.sel { border-color:${GOLD}; background:#fffbf0; }
  .bm-so.sel::after {
    content:'✓'; position:absolute; top:9px; right:11px;
    color:${GOLD}; font-size:12px; font-weight:700;
  }
  .bm-sn { font-size:13px; font-weight:500; color:${BLACK}; margin-bottom:2px; }
  .bm-sp { font-family:'Cormorant Garamond',serif; font-size:14px; color:${GOLD}; }

  /* CALENDAR */
  .bm-cal { background:#fff; border:1px solid rgba(0,0,0,.1); padding:14px; margin-bottom:14px; }
  .bm-cal-hdr { display:flex; align-items:center; justify-content:space-between; margin-bottom:10px; }
  .bm-cal-nav { background:none; border:none; color:#aaa; font-size:17px; cursor:pointer; padding:2px 7px; transition:color .2s; font-family:'Jost',sans-serif; }
  .bm-cal-nav:hover { color:${GOLD}; }
  .bm-cal-mo { font-family:'Cormorant Garamond',serif; font-size:17px; font-weight:500; color:${BLACK}; }
  .bm-cal-grid { display:grid; grid-template-columns:repeat(7,1fr); gap:2px; text-align:center; }
  .bm-dow { font-size:9px; letter-spacing:.1em; text-transform:uppercase; color:#bbb; font-weight:500; padding:2px 0 5px; }
  .bm-day {
    height:30px; width:30px; margin:0 auto;
    display:flex; align-items:center; justify-content:center;
    font-size:12px; color:${BLACK}; cursor:pointer; border-radius:50%; transition:all .12s;
  }
  .bm-day:hover:not(.dis):not(.emp) { background:rgba(201,168,76,.12); color:${GOLD}; }
  .bm-day.sel { background:${GOLD}!important; color:${BLACK}!important; font-weight:600; }
  .bm-day.tod { border:1px solid rgba(201,168,76,.4); }
  .bm-day.dis { color:#ddd; cursor:default; }
  .bm-day.emp { cursor:default; }

  /* TIME */
  .bm-tg { display:grid; grid-template-columns:repeat(4,1fr); gap:5px; }
  .bm-ts {
    padding:8px 4px; text-align:center; font-size:11px; font-weight:500;
    border:1px solid rgba(0,0,0,.1); background:#fff;
    cursor:pointer; transition:all .12s; letter-spacing:.02em;
  }
  .bm-ts:hover { border-color:${GOLD}; color:${GOLD}; }
  .bm-ts.sel { background:${GOLD}; border-color:${GOLD}; color:${BLACK}; font-weight:600; }

  /* FORM */
  .bm-field { margin-bottom:14px; }
  .bm-lbl { font-size:10px; letter-spacing:.18em; text-transform:uppercase; font-weight:600; color:#555; margin-bottom:6px; display:block; }
  .bm-inp {
    width:100%; padding:10px 13px;
    border:1px solid rgba(0,0,0,.14); background:#fff;
    font-size:14px; font-family:'Jost',sans-serif; color:${BLACK};
    transition:border-color .2s; outline:none; appearance:none;
  }
  .bm-inp:focus { border-color:${GOLD}; }
  .bm-inp::placeholder { color:#ccc; }
  .bm-row2 { display:grid; grid-template-columns:1fr 1fr; gap:12px; }

  /* SUMMARY */
  .bm-sum { background:${BLACK}; padding:22px; margin-bottom:18px; }
  .bm-sr { display:flex; justify-content:space-between; align-items:baseline; padding:8px 0; border-bottom:1px solid rgba(255,255,255,.06); }
  .bm-sr:last-child { border-bottom:none; padding-bottom:0; }
  .bm-sk { font-size:9px; letter-spacing:.18em; text-transform:uppercase; color:rgba(255,255,255,.3); font-weight:500; }
  .bm-sv { font-family:'Cormorant Garamond',serif; font-size:15px; color:#fff; text-align:right; max-width:200px; word-break:break-word; }
  .bm-sv.g { color:${GOLD}; }

  .bm-policy {
    font-size:11px; color:#999; line-height:1.7; margin-bottom:18px;
    padding:12px 14px; background:rgba(0,0,0,.04); border-left:3px solid ${GOLD};
  }
  .bm-err {
    background:#fff0f0; border-left:3px solid #e24b4a;
    padding:11px 14px; margin-bottom:14px;
    font-size:12px; color:#a32d2d; line-height:1.6;
  }

  /* BUTTONS */
  .bm-actions { display:flex; gap:9px; justify-content:flex-end; margin-top:8px; }
  .bm-back {
    background:none; border:1px solid rgba(0,0,0,.15); color:#888;
    padding:11px 22px; font-size:10px; letter-spacing:.15em;
    text-transform:uppercase; font-weight:500;
    font-family:'Jost',sans-serif; cursor:pointer; transition:all .2s;
  }
  .bm-back:hover { border-color:#aaa; color:${BLACK}; }
  .bm-next {
    background:${GOLD}; border:none; color:${BLACK};
    padding:11px 30px; font-size:10px; letter-spacing:.18em;
    text-transform:uppercase; font-weight:700;
    font-family:'Jost',sans-serif; cursor:pointer; transition:all .2s;
    display:flex; align-items:center; gap:7px;
  }
  .bm-next:hover:not(:disabled) { background:${GOLD_LIGHT}; transform:translateY(-1px); }
  .bm-next:disabled { background:#ddd; color:#aaa; cursor:default; transform:none; }
  .bm-spin {
    width:13px; height:13px; border:2px solid rgba(0,0,0,.2);
    border-top-color:${BLACK}; border-radius:50%;
    animation:spin .7s linear infinite; flex-shrink:0;
  }
  @keyframes spin { to { transform:rotate(360deg); } }

  /* SUCCESS */
  .bm-done { text-align:center; padding:44px 28px; }
  .bm-done-icon {
    width:64px; height:64px; background:${GOLD}; border-radius:50%;
    display:flex; align-items:center; justify-content:center;
    margin:0 auto 20px; font-size:26px;
  }
  .bm-done-title { font-family:'Cormorant Garamond',serif; font-size:34px; font-weight:300; color:${BLACK}; margin-bottom:10px; }
  .bm-done-sub { font-size:13px; color:#777; line-height:1.8; max-width:360px; margin:0 auto 24px; }
  .bm-done-card { background:${BLACK}; display:inline-block; padding:18px 32px; text-align:left; margin-bottom:20px; }
  .bm-dr { display:flex; gap:12px; margin-bottom:6px; font-size:12px; }
  .bm-dr:last-child { margin-bottom:0; }
  .bm-dl { color:rgba(255,255,255,.32); width:52px; flex-shrink:0; letter-spacing:.05em; }
  .bm-dv { color:#fff; font-weight:500; }

  @media (max-width:620px) {
    .bm-modal { grid-template-columns:1fr; }
    .bm-sidebar { display:none; }
    .bm-main { padding:24px 18px; }
    .bm-row2 { grid-template-columns:1fr; }
    .bm-sg { grid-template-columns:1fr; }
    .bm-tg { grid-template-columns:repeat(3,1fr); }
  }
`;

const SERVICES = [
  // ── THREADING ──
  { name: "Eyebrow Threading",          price: "$15",   duration: "~15 min",  group: "Threading" },
  { name: "Eyebrow + Upper Lip",        price: "$21",   duration: "~20 min",  group: "Threading" },
  { name: "Upper Lip Threading",        price: "$10",   duration: "~8 min",   group: "Threading" },
  { name: "Chin Threading",             price: "$10",   duration: "~10 min",  group: "Threading" },
  { name: "Full Face Threading",        price: "$50",   duration: "~30 min",  group: "Threading" },
  { name: "Full Face + Full Chin",      price: "$60",   duration: "~35 min",  group: "Threading" },
  // ── FACIALS ──
  { name: "Express Facial",             price: "$55",   duration: "25 min",   group: "Facials" },
  { name: "Signature Facial",           price: "$90",   duration: "50 min",   group: "Facials" },
  { name: "Indulgence Facial",          price: "$150",  duration: "80 min",   group: "Facials" },
  { name: "Hydra Facial",              price: "$175",  duration: "90 min",   group: "Facials" },
  // ── WAXING ──
  { name: "Eyebrow Wax",               price: "$20",   duration: "~15 min",  group: "Waxing" },
  { name: "Full Face Wax (with brows)", price: "$60",   duration: "~25 min",  group: "Waxing" },
  { name: "Brazilian Wax",             price: "$70",   duration: "~45 min",  group: "Waxing" },
  { name: "Bikini Basic",              price: "$30",   duration: "~20 min",  group: "Waxing" },
  { name: "Half Leg Wax",             price: "$30",   duration: "~25 min",  group: "Waxing" },
  { name: "Full Leg Wax",             price: "$65",   duration: "~40 min",  group: "Waxing" },
  { name: "Under Arms Wax",           price: "$25",   duration: "~15 min",  group: "Waxing" },
  { name: "Half/Full Back Wax",       price: "$35/$60", duration: "~30 min",group: "Waxing" },
  // ── HAIR ──
  { name: "Women's Cut",              price: "$70+",  duration: "~60 min",  group: "Hair" },
  { name: "Men's Cut",               price: "$25",   duration: "~30 min",  group: "Hair" },
  { name: "Full Color",              price: "$90+",  duration: "~90 min",  group: "Hair" },
  { name: "Root Touch-Up",           price: "$70+",  duration: "~60 min",  group: "Hair" },
  { name: "Cut & Color",             price: "$120+", duration: "~2 hrs",   group: "Hair" },
  { name: "Partial Highlights",      price: "$125+", duration: "~90 min",  group: "Hair" },
  { name: "Full Highlights",         price: "$145+", duration: "~2 hrs",   group: "Hair" },
  { name: "Shampoo & Blow Dry",      price: "$50+",  duration: "~45 min",  group: "Hair" },
  { name: "Style Updo",              price: "$65+",  duration: "~60 min",  group: "Hair" },
  { name: "Hair Retexturing",        price: "$360+", duration: "~3 hrs",   group: "Hair" },
  // ── MASSAGE ──
  { name: "Head Massage 10 min (Oil)",  price: "$25",  duration: "10 min",  group: "Massage" },
  { name: "Head Massage 20 min (Oil)",  price: "$35",  duration: "20 min",  group: "Massage" },
  { name: "Head Massage 30 min (Oil)",  price: "$55",  duration: "30 min",  group: "Massage" },
  { name: "Head Massage 30 min (No Oil)",price:"$50", duration: "30 min",  group: "Massage" },
  // ── HENNA ──
  { name: "Henna — X-Small Design",   price: "$10",  duration: "Varies",   group: "Henna" },
  { name: "Henna — Large Design",     price: "$40",  duration: "Varies",   group: "Henna" },
  { name: "Henna — Custom/Event",     price: "$75/hr", duration: "2 hr min",group: "Henna" },
];

const TIMES = [
  "10:00 AM","10:30 AM","11:00 AM","11:30 AM",
  "12:00 PM","12:30 PM","1:00 PM","1:30 PM",
  "2:00 PM","2:30 PM","3:00 PM","3:30 PM",
  "4:00 PM","4:30 PM","5:00 PM","5:30 PM",
  "6:00 PM","6:30 PM",
];

const MONTHS = ["January","February","March","April","May","June",
                 "July","August","September","October","November","December"];
const DAYS = ["Su","Mo","Tu","We","Th","Fr","Sa"];

function Calendar({ selected, onSelect }) {
  const today = new Date();
  const [view, setView] = useState({ year: today.getFullYear(), month: today.getMonth() });
  const firstDay = new Date(view.year, view.month, 1).getDay();
  const daysInMonth = new Date(view.year, view.month + 1, 0).getDate();
  const cells = [];
  for (let i = 0; i < firstDay; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(d);

  const isPast = d => {
    const dt = new Date(view.year, view.month, d); dt.setHours(0,0,0,0);
    const t = new Date(); t.setHours(0,0,0,0);
    return dt < t;
  };
  const selKey = selected ? `${selected.year}-${selected.month}-${selected.day}` : null;
  const prev = () => setView(v => v.month === 0 ? {year:v.year-1,month:11} : {year:v.year,month:v.month-1});
  const next = () => setView(v => v.month===11 ? {year:v.year+1,month:0} : {year:v.year,month:v.month+1});

  return (
    <div className="bm-cal">
      <div className="bm-cal-hdr">
        <button className="bm-cal-nav" onClick={prev}>‹</button>
        <span className="bm-cal-mo">{MONTHS[view.month]} {view.year}</span>
        <button className="bm-cal-nav" onClick={next}>›</button>
      </div>
      <div className="bm-cal-grid">
        {DAYS.map(d => <div className="bm-dow" key={d}>{d}</div>)}
        {cells.map((day, i) => {
          if (!day) return <div key={`e${i}`} className="bm-day emp" />;
          const past = isPast(day);
          const isToday = day===today.getDate() && view.month===today.getMonth() && view.year===today.getFullYear();
          const isSel = selKey===`${view.year}-${view.month}-${day}`;
          return (
            <div
              key={day}
              className={`bm-day${past?" dis":""}${isToday?" tod":""}${isSel?" sel":""}`}
              onClick={() => !past && onSelect({year:view.year, month:view.month, day})}
            >{day}</div>
          );
        })}
      </div>
    </div>
  );
}

const fmtDate = d => d ? `${MONTHS[d.month]} ${d.day}, ${d.year}` : "";

export default function BookingModal({ open, onClose }) {
  const [step, setStep]             = useState(1);
  const [services, setServices]     = useState([]); // multi-select array
  const [date, setDate]             = useState(null);
  const [time, setTime]             = useState("");
  const [form, setForm]             = useState({ name:"", phone:"", email:"", notes:"" });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError]           = useState("");
  const [done, setDone]             = useState(false);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  const reset = () => {
    setStep(1); setServices([]); setDate(null); setTime("");
    setForm({name:"",phone:"",email:"",notes:""});
    setSubmitting(false); setError(""); setDone(false);
  };
  const close = () => { onClose(); setTimeout(reset, 400); };

  const toggleService = (name) => {
    setServices(prev =>
      prev.includes(name) ? prev.filter(s => s !== name) : [...prev, name]
    );
  };

  const selectedSvcs = SERVICES.filter(s => services.includes(s.name));
  const totalPrice = selectedSvcs.length > 0
    ? selectedSvcs.map(s => s.price.replace(/[^0-9]/g,"")).filter(Boolean).reduce((a,b)=>a+parseInt(b),0)
    : 0;

  const canNext = () => {
    if (step===1) return services.length > 0;
    if (step===2) return !!date && !!time;
    if (step===3) return form.name.trim() && form.phone.trim() && form.email.trim();
    return true;
  };

  const submit = async () => {
    setSubmitting(true); setError("");
    const serviceList = services.join(", ");
    const payload = {
      _subject: `📅 New Booking — ${serviceList} — ${fmtDate(date)} at ${time}`,
      _replyto: form.email,
      "Services":      serviceList,
      "Date":          fmtDate(date),
      "Time":          time,
      "Client Name":   form.name,
      "Client Phone":  form.phone,
      "Client Email":  form.email,
      "Special Notes": form.notes || "None",
    };
    try {
      const res = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(payload),
      });
      if (res.ok) {
        setDone(true);
      } else {
        const data = await res.json().catch(()=>({}));
        setError(data?.errors?.[0]?.message || "Something went wrong. Please call (925) 833-1710.");
      }
    } catch {
      setError("Network error. Please call us at (925) 833-1710 to book.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleNext = () => { if (step < 4) setStep(s => s+1); else submit(); };

  if (!open) return null;

  return (
    <>
      <style>{styles}</style>
      <div className="bm-overlay" onClick={e => e.target===e.currentTarget && close()}>
        <div className="bm-modal">

          {/* SIDEBAR */}
          <div className="bm-sidebar">
            <div className="bm-sidebar-bg" />
            <div className="bm-sc">
              <div className="bm-brand">Threads <span>Beauty</span></div>
              <div className="bm-tagline">Dublin, California</div>

              {selectedSvcs.length > 0 ? (
                <>
                  <div className="bm-pl">Selected Services ({selectedSvcs.length})</div>
                  {selectedSvcs.map(s => (
                    <div key={s.name} style={{marginBottom:8}}>
                      <div className="bm-ps" style={{fontSize:16}}>{s.name}</div>
                      <div className="bm-pp" style={{fontSize:14}}>{s.price}</div>
                    </div>
                  ))}
                  {totalPrice > 0 && (
                    <div style={{marginTop:8,paddingTop:8,borderTop:"1px solid rgba(255,255,255,0.1)"}}>
                      <div className="bm-pl">Est. Total</div>
                      <div className="bm-pp" style={{fontSize:22}}>${totalPrice}+</div>
                    </div>
                  )}
                </>
              ) : (
                <div style={{fontSize:13,color:"rgba(255,255,255,.22)",lineHeight:1.7,fontWeight:300}}>
                  Select one or more services to book together.
                </div>
              )}

              {date && (
                <div className="bm-dp">
                  <div className="bm-pl">Appointment</div>
                  <div style={{fontFamily:"'Cormorant Garamond',serif",fontSize:16,color:"#fff",lineHeight:1.5}}>
                    {fmtDate(date)}
                  </div>
                  {time && (
                    <div style={{fontFamily:"'Cormorant Garamond',serif",fontSize:15,color:GOLD}}>{time}</div>
                  )}
                </div>
              )}

              <div className="bm-sf">
                <div className="bm-ci">📞 <a href="tel:9258331710">(925) 833-1710</a></div>
                <div className="bm-ci">📍 6620 Dublin Blvd, Dublin CA</div>
                <div className="bm-ci" style={{marginTop:5,lineHeight:1.7}}>
                  Mon–Fri 10am–7pm<br/>Sat 10am–6pm · Sun 11am–5pm
                </div>
              </div>
            </div>
          </div>

          {/* MAIN */}
          <div className="bm-main">
            <button className="bm-close" onClick={close}>✕</button>

            {!done ? (
              <>
                {/* STEP INDICATORS */}
                <div className="bm-steps">
                  {["Service","Date & Time","Your Info","Confirm"].map((label,i) => (
                    <div key={label} className={`bm-step${step===i+1?" active":""}${step>i+1?" done":""}`}>
                      <div className="bm-step-n">{step>i+1?"✓":i+1}</div>
                      <div className="bm-step-l">{label}</div>
                    </div>
                  ))}
                </div>

                {/* STEP 1 */}
                {step===1 && (
                  <>
                    <div className="bm-title">Select Services</div>
                    <div className="bm-sub">Choose one or more — we'll combine them into one visit</div>
                    {["Threading","Facials","Waxing","Hair","Massage","Henna"].map(group => (
                      <div key={group} style={{marginBottom:16}}>
                        <div style={{fontSize:9,letterSpacing:"0.22em",textTransform:"uppercase",
                          color:"#C4956A",fontWeight:500,marginBottom:6,paddingLeft:2}}>
                          {group}
                        </div>
                        <div className="bm-sg">
                          {SERVICES.filter(s=>s.group===group).map(s => {
                            const selected = services.includes(s.name);
                            return (
                              <div
                                key={s.name}
                                className={`bm-so${selected ? " sel" : ""}`}
                                onClick={() => toggleService(s.name)}
                              >
                                <div className="bm-sn" style={{display:"flex",alignItems:"center",gap:8}}>
                                  <span style={{
                                    width:15,height:15,borderRadius:3,flexShrink:0,display:"inline-flex",
                                    alignItems:"center",justifyContent:"center",fontSize:9,fontWeight:700,
                                    border: selected ? "none" : "1px solid #ccc",
                                    background: selected ? "#C4956A" : "transparent",
                                    color:"#fff",
                                  }}>{selected?"✓":""}</span>
                                  {s.name}
                                </div>
                                <div className="bm-sp">{s.price} · {s.duration}</div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    ))}
                    {services.length > 0 && (
                      <div style={{fontSize:12,color:"#888",marginTop:4,padding:"8px 0",
                        borderTop:"1px solid rgba(0,0,0,0.07)"}}>
                        ✓ {services.length} service{services.length>1?"s":""} selected
                      </div>
                    )}
                  </>
                )}

                {/* STEP 2 */}
                {step===2 && (
                  <>
                    <div className="bm-title">Date & Time</div>
                    <div className="bm-sub">Select your preferred appointment slot</div>
                    <Calendar selected={date} onSelect={d => { setDate(d); setTime(""); }} />
                    {date && (
                      <>
                        <div className="bm-lbl" style={{marginBottom:9}}>
                          Available Times — {fmtDate(date)}
                        </div>
                        <div className="bm-tg">
                          {TIMES.map(t => (
                            <div
                              key={t}
                              className={`bm-ts${time===t?" sel":""}`}
                              onClick={() => setTime(t)}
                            >{t}</div>
                          ))}
                        </div>
                      </>
                    )}
                  </>
                )}

                {/* STEP 3 */}
                {step===3 && (
                  <>
                    <div className="bm-title">Your Details</div>
                    <div className="bm-sub">So we can confirm your appointment</div>
                    <div className="bm-row2">
                      <div className="bm-field">
                        <label className="bm-lbl">Full Name *</label>
                        <input className="bm-inp" value={form.name}
                          onChange={e=>setForm(f=>({...f,name:e.target.value}))}
                          placeholder="Jane Smith" />
                      </div>
                      <div className="bm-field">
                        <label className="bm-lbl">Phone Number *</label>
                        <input className="bm-inp" value={form.phone} type="tel"
                          onChange={e=>setForm(f=>({...f,phone:e.target.value}))}
                          placeholder="(925) 555-0100" />
                      </div>
                    </div>
                    <div className="bm-field">
                      <label className="bm-lbl">Email Address *</label>
                      <input className="bm-inp" value={form.email} type="email"
                        onChange={e=>setForm(f=>({...f,email:e.target.value}))}
                        placeholder="jane@email.com" />
                    </div>
                    <div className="bm-field">
                      <label className="bm-lbl">Special Notes (Optional)</label>
                      <textarea className="bm-inp" value={form.notes} rows={3}
                        onChange={e=>setForm(f=>({...f,notes:e.target.value}))}
                        placeholder="Sensitive skin, first visit, specific requests..."
                        style={{resize:"vertical"}} />
                    </div>
                  </>
                )}

                {/* STEP 4 */}
                {step===4 && (
                  <>
                    <div className="bm-title">Confirm Booking</div>
                    <div className="bm-sub">Review your details — we'll email to confirm within a few hours</div>
                    <div className="bm-sum">
                      {[
                        ["Services",  services.join(", "), false],
                        ["Date",      fmtDate(date),       false],
                        ["Time",      time,                false],
                        ["Name",      form.name,           false],
                        ["Phone",     form.phone,          false],
                        ["Email",     form.email,          false],
                        ...(form.notes?[["Notes",form.notes,false]]:[]),
                      ].map(([k,v,g]) => (
                        <div className="bm-sr" key={k}>
                          <span className="bm-sk">{k}</span>
                          <span className={`bm-sv${g?" g":""}`} style={{maxWidth:220}}>{v}</span>
                        </div>
                      ))}
                    </div>
                    {error && <div className="bm-err">{error}</div>}
                    <div className="bm-policy">
                      <strong style={{fontSize:10,letterSpacing:".15em",textTransform:"uppercase"}}>Cancellation Policy</strong><br/>
                      24-hour notice required. Late cancellations may be charged in full. Please arrive 15 minutes early.
                    </div>
                  </>
                )}

                {/* ACTIONS */}
                <div className="bm-actions">
                  {step>1 && (
                    <button className="bm-back" onClick={()=>{setStep(s=>s-1);setError("");}}>Back</button>
                  )}
                  <button
                    className="bm-next"
                    onClick={handleNext}
                    disabled={!canNext()||submitting}
                  >
                    {submitting && <span className="bm-spin"/>}
                    {step===4 ? (submitting?"Sending...":"Confirm & Send Request") : "Continue →"}
                  </button>
                </div>
              </>
            ) : (
              /* SUCCESS */
              <div className="bm-done">
                <div className="bm-done-icon">✓</div>
                <div className="bm-done-title">Request Sent!</div>
                <div className="bm-done-sub">
                  Your appointment request has been sent to Threads Beauty Bar.
                  We'll confirm by phone or email within a few hours.
                </div>
                <div className="bm-done-card">
                  <div className="bm-dr"><span className="bm-dl">Services</span><span className="bm-dv" style={{maxWidth:180,wordBreak:"break-word"}}>{services.join(", ")}</span></div>
                  <div className="bm-dr"><span className="bm-dl">Date</span><span className="bm-dv">{fmtDate(date)}</span></div>
                  <div className="bm-dr"><span className="bm-dl">Time</span><span className="bm-dv">{time}</span></div>
                  <div className="bm-dr"><span className="bm-dl">Phone</span><span className="bm-dv">{form.phone}</span></div>
                </div>
                <div style={{fontSize:12,color:"#999",marginBottom:22,lineHeight:1.7}}>
                  Questions? Call <a href="tel:9258331710" style={{color:GOLD}}>(925) 833-1710</a>
                </div>
                <button className="bm-next" onClick={close} style={{margin:"0 auto",display:"flex"}}>
                  Done
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
