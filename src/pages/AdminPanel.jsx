import { useState, useEffect } from "react";
import { loadPrices, savePrices, resetPrices, DEFAULT_PRICES, CATEGORIES } from "../utils/prices.js";

/**
 * ADMIN PRICE EDITOR — Threads Beauty Bar & Spa
 * URL: /admin
 * Password: threads2024  (change ADMIN_PASSWORD below)
 */

const ADMIN_PASSWORD = "threads2024";

const ACCENT = "#C4956A";
const DARK   = "#1A1714";
const BLACK  = "#0F0F0F";
const WHITE  = "#FDFAF6";
const CREAM  = "#F5F0E8";
const MID    = "#6B6560";
const LIGHT  = "#A09890";
const RED    = "#C4524A";
const GREEN  = "#4A8A5A";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=DM+Sans:wght@300;400;500;600&display=swap');
  *, *::before, *::after { box-sizing:border-box; margin:0; padding:0; }
  body { font-family:'DM Sans',sans-serif; background:${CREAM}; color:${BLACK}; min-height:100vh; }

  /* LOGIN */
  .adm-login {
    min-height:100vh; background:${DARK};
    display:flex; align-items:center; justify-content:center;
    flex-direction:column; padding:24px;
  }
  .adm-login-logo {
    font-family:'DM Serif Display',serif; font-size:26px; font-style:italic;
    color:${WHITE}; margin-bottom:4px;
  }
  .adm-login-logo span { color:${ACCENT}; font-style:normal; }
  .adm-login-sub {
    font-size:9px; letter-spacing:0.3em; text-transform:uppercase;
    color:rgba(255,255,255,0.3); margin-bottom:36px;
  }
  .adm-login-card {
    background:${WHITE}; padding:36px 40px;
    width:100%; max-width:360px;
    border-top:3px solid ${ACCENT};
    box-shadow:0 24px 64px rgba(0,0,0,0.4);
  }
  .adm-login-title {
    font-family:'DM Serif Display',serif; font-size:22px; font-style:italic;
    color:${BLACK}; margin-bottom:4px;
  }
  .adm-login-hint { font-size:11px; color:${LIGHT}; margin-bottom:24px; line-height:1.5; }
  .adm-lbl { font-size:9px; letter-spacing:0.2em; text-transform:uppercase; font-weight:500; color:${MID}; margin-bottom:6px; display:block; }
  .adm-inp {
    width:100%; padding:12px 14px; border:1px solid rgba(0,0,0,0.14);
    font-size:14px; font-family:'DM Sans',sans-serif; color:${BLACK};
    outline:none; margin-bottom:14px; transition:border-color 0.2s;
    background:${WHITE};
  }
  .adm-inp:focus { border-color:${ACCENT}; }
  .adm-login-btn {
    width:100%; padding:14px; background:${ACCENT}; color:${WHITE};
    border:none; font-size:10px; letter-spacing:0.2em; text-transform:uppercase;
    font-weight:600; font-family:'DM Sans',sans-serif; cursor:pointer; transition:background 0.2s;
  }
  .adm-login-btn:hover { background:#b08050; }
  .adm-login-err { font-size:12px; color:${RED}; margin-top:10px; text-align:center; }

  /* ADMIN SHELL */
  .adm-shell { min-height:100vh; display:flex; flex-direction:column; }

  .adm-nav {
    background:${DARK}; padding:14px 40px;
    display:flex; align-items:center; justify-content:space-between;
    position:sticky; top:0; z-index:100;
    box-shadow:0 2px 20px rgba(0,0,0,0.35);
    flex-shrink:0;
  }
  .adm-nav-logo { font-family:'DM Serif Display',serif; font-size:18px; font-style:italic; color:${WHITE}; }
  .adm-nav-logo span { color:${ACCENT}; font-style:normal; }
  .adm-nav-right { display:flex; align-items:center; gap:14px; }
  .adm-badge {
    font-size:9px; letter-spacing:0.2em; text-transform:uppercase; color:${ACCENT};
    border:1px solid rgba(196,149,106,0.35); padding:5px 12px; font-weight:500;
  }
  .adm-signout {
    font-size:10px; letter-spacing:0.15em; text-transform:uppercase; font-weight:500;
    color:rgba(255,255,255,0.4); background:none; border:none; cursor:pointer;
    font-family:'DM Sans',sans-serif; transition:color 0.2s;
  }
  .adm-signout:hover { color:${WHITE}; }

  /* BODY */
  .adm-body { max-width:1080px; margin:0 auto; padding:36px 32px 100px; flex:1; }

  /* TOP BAR */
  .adm-topbar {
    display:flex; align-items:flex-start; justify-content:space-between;
    margin-bottom:32px; flex-wrap:wrap; gap:16px;
  }
  .adm-page-title { font-family:'DM Serif Display',serif; font-size:30px; font-style:italic; color:${BLACK}; }
  .adm-page-title span { color:${ACCENT}; }
  .adm-page-sub { font-size:12px; color:${LIGHT}; margin-top:4px; line-height:1.5; }
  .adm-btns { display:flex; gap:10px; flex-wrap:wrap; align-items:center; }

  .btn-save {
    background:${ACCENT}; color:${WHITE}; border:none;
    padding:12px 28px; font-size:10px; letter-spacing:0.18em; text-transform:uppercase;
    font-weight:600; font-family:'DM Sans',sans-serif; cursor:pointer; transition:all 0.2s;
  }
  .btn-save:hover:not(:disabled) { background:#b08050; transform:translateY(-1px); }
  .btn-save:disabled { background:#ccc; color:#fff; cursor:not-allowed; }
  .btn-reset-all {
    background:transparent; color:${RED}; border:1px solid rgba(196,82,74,0.3);
    padding:12px 20px; font-size:10px; letter-spacing:0.15em; text-transform:uppercase;
    font-weight:500; font-family:'DM Sans',sans-serif; cursor:pointer; transition:all 0.2s;
  }
  .btn-reset-all:hover { background:rgba(196,82,74,0.06); border-color:${RED}; }
  .btn-visit {
    background:${DARK}; color:rgba(255,255,255,0.7); border:none;
    padding:12px 20px; font-size:10px; letter-spacing:0.15em; text-transform:uppercase;
    font-weight:500; font-family:'DM Sans',sans-serif; cursor:pointer;
    text-decoration:none; display:inline-flex; align-items:center; gap:6px; transition:all 0.2s;
  }
  .btn-visit:hover { background:${BLACK}; color:${WHITE}; }

  /* STATS */
  .adm-stats { display:flex; gap:2px; margin-bottom:28px; background:rgba(0,0,0,0.07); }
  .adm-stat { background:${WHITE}; padding:16px 20px; flex:1; text-align:center; }
  .adm-stat-n { font-family:'DM Serif Display',serif; font-size:26px; font-style:italic; color:${ACCENT}; }
  .adm-stat-l { font-size:9px; letter-spacing:0.18em; text-transform:uppercase; color:${LIGHT}; margin-top:3px; }

  /* TOOLBAR */
  .adm-toolbar {
    display:flex; align-items:center; justify-content:space-between;
    flex-wrap:wrap; gap:12px; margin-bottom:20px;
  }
  .adm-search-wrap { position:relative; }
  .adm-search {
    padding:10px 14px 10px 36px; border:1px solid rgba(0,0,0,0.12);
    font-size:13px; font-family:'DM Sans',sans-serif; color:${BLACK};
    background:${WHITE}; outline:none; width:280px; transition:border-color 0.2s;
  }
  .adm-search:focus { border-color:${ACCENT}; }
  .adm-search-icon { position:absolute; left:11px; top:50%; transform:translateY(-50%); color:${LIGHT}; font-size:13px; pointer-events:none; }
  .adm-cat-tabs { display:flex; gap:4px; flex-wrap:wrap; }
  .adm-cat-btn {
    padding:7px 14px; font-size:9px; letter-spacing:0.15em; text-transform:uppercase;
    font-weight:500; font-family:'DM Sans',sans-serif; cursor:pointer; transition:all 0.15s;
    border:1px solid rgba(0,0,0,0.1);
  }

  /* SECTION */
  .adm-section { margin-bottom:36px; }
  .adm-sec-hdr { display:flex; align-items:center; gap:12px; margin-bottom:12px; }
  .adm-sec-title { font-family:'DM Serif Display',serif; font-size:19px; color:${BLACK}; font-style:italic; }
  .adm-sec-count { font-size:10px; color:${LIGHT}; letter-spacing:0.1em; }
  .adm-sec-dot { width:7px; height:7px; border-radius:50%; background:${ACCENT}; flex-shrink:0; }
  .adm-sec-unsaved { font-size:10px; color:${ACCENT}; letter-spacing:0.08em; }

  /* TABLE */
  .price-tbl { width:100%; border-collapse:collapse; background:${WHITE}; }
  .price-tbl th {
    font-size:9px; letter-spacing:0.2em; text-transform:uppercase; color:${LIGHT}; font-weight:500;
    padding:10px 16px; text-align:left; border-bottom:2px solid rgba(0,0,0,0.08);
  }
  .price-tbl th:last-child { text-align:right; width:180px; }
  .price-tbl tr { border-bottom:1px solid rgba(0,0,0,0.05); transition:background 0.12s; }
  .price-tbl tr:hover td { background:#fffdf9; }
  .price-tbl tr.changed td { background:#fff9f0; }
  .pt-name-cell {
    font-family:'DM Serif Display',serif; font-size:16px; font-style:italic;
    color:${BLACK}; padding:13px 16px; font-weight:400;
  }
  .pt-id-cell { font-size:10px; color:${LIGHT}; padding:13px 8px; width:52px; }
  .pt-price-cell { padding:9px 16px; text-align:right; }
  .pt-price-row { display:flex; align-items:center; justify-content:flex-end; gap:6px; }
  .price-inp {
    width:110px; padding:8px 10px; text-align:right;
    border:1px solid rgba(0,0,0,0.13); font-size:15px;
    font-family:'DM Serif Display',serif; color:${BLACK}; font-style:italic;
    background:${WHITE}; outline:none; transition:all 0.18s;
  }
  .price-inp:focus { border-color:${ACCENT}; background:#fffdf9; }
  .price-inp.changed { border-color:${ACCENT}; color:${ACCENT}; background:#fff9f0; }
  .undo-btn {
    background:none; border:none; cursor:pointer; color:${LIGHT};
    font-size:14px; padding:3px 5px; line-height:1; opacity:0; transition:all 0.2s;
  }
  .price-tbl tr.changed .undo-btn { opacity:1; }
  .undo-btn:hover { color:${RED}; }

  /* INSTRUCTIONS */
  .adm-instructions {
    margin-top:44px; padding:24px 28px;
    background:${WHITE}; border-left:3px solid ${ACCENT};
  }
  .adm-instr-title { font-size:10px; letter-spacing:0.2em; text-transform:uppercase; color:${ACCENT}; font-weight:600; margin-bottom:14px; }
  .adm-instr-row { display:flex; gap:12px; margin-bottom:9px; align-items:flex-start; }
  .adm-instr-num {
    width:20px; height:20px; background:${DARK}; color:${WHITE};
    display:flex; align-items:center; justify-content:center;
    font-size:9px; font-weight:700; flex-shrink:0; margin-top:1px;
  }
  .adm-instr-text { font-size:12px; color:${MID}; line-height:1.6; }

  /* SAVE TOAST */
  .adm-toast {
    position:fixed; bottom:0; left:0; right:0; z-index:500;
    background:${GREEN}; padding:14px 32px;
    display:flex; align-items:center; justify-content:center; gap:10px;
    font-size:12px; color:${WHITE}; font-weight:500; letter-spacing:0.04em;
    transform:translateY(100%); transition:transform 0.3s ease;
  }
  .adm-toast.show { transform:translateY(0); }

  @media (max-width:640px) {
    .adm-nav { padding:12px 20px; }
    .adm-body { padding:24px 16px 80px; }
    .adm-topbar { flex-direction:column; }
    .adm-btns { width:100%; }
    .btn-save, .btn-reset-all, .btn-visit { flex:1; text-align:center; justify-content:center; }
    .adm-stats { flex-wrap:wrap; }
    .adm-stat { min-width:calc(50% - 1px); }
    .adm-search { width:100%; }
    .adm-toolbar { flex-direction:column; align-items:flex-start; }
    .price-inp { width:90px; }
    .adm-login-card { padding:28px 24px; }
  }
`;

export default function AdminPanel() {
  const [authed,    setAuthed]    = useState(false);
  const [pw,        setPw]        = useState("");
  const [pwError,   setPwError]   = useState("");
  const [prices,    setPrices]    = useState(null);
  const [original,  setOriginal]  = useState(null);
  const [toast,     setToast]     = useState(false);
  const [search,    setSearch]    = useState("");
  const [activeTab, setActiveTab] = useState("All");

  useEffect(() => {
    try {
      const loaded = loadPrices();
      setPrices(JSON.parse(JSON.stringify(loaded)));
      setOriginal(JSON.parse(JSON.stringify(loaded)));
    } catch (e) {
      setPrices(JSON.parse(JSON.stringify(DEFAULT_PRICES)));
      setOriginal(JSON.parse(JSON.stringify(DEFAULT_PRICES)));
    }
  }, []);

  const login = () => {
    if (pw === ADMIN_PASSWORD) {
      setAuthed(true); setPwError("");
    } else {
      setPwError("Incorrect password. Please try again.");
      setPw("");
    }
  };

  const updatePrice = (cat, id, val) => {
    setPrices(prev => ({
      ...prev,
      [cat]: prev[cat].map(item => item.id === id ? { ...item, price: val } : item)
    }));
  };

  const undoItem = (cat, id) => {
    const orig = (original[cat] || []).find(i => i.id === id);
    if (orig) updatePrice(cat, id, orig.price);
  };

  const isChanged = (cat, id) => {
    if (!original || !prices) return false;
    const o = (original[cat] || []).find(i => i.id === id);
    const c = (prices[cat]   || []).find(i => i.id === id);
    return o && c && o.price !== c.price;
  };

  const changedCount = () => {
    if (!prices || !original) return 0;
    return CATEGORIES.reduce((acc, cat) =>
      acc + (prices[cat] || []).filter(i => isChanged(cat, i.id)).length, 0);
  };

  const handleSave = () => {
    savePrices(prices);
    setOriginal(JSON.parse(JSON.stringify(prices)));
    setToast(true);
    setTimeout(() => setToast(false), 3000);
  };

  const handleReset = () => {
    if (!window.confirm("Reset ALL prices back to defaults? This cannot be undone.")) return;
    resetPrices();
    const fresh = JSON.parse(JSON.stringify(DEFAULT_PRICES));
    setPrices(fresh);
    setOriginal(JSON.parse(JSON.stringify(fresh)));
  };

  const filterItems = (items) => {
    if (!search.trim()) return items;
    return items.filter(i => i.name.toLowerCase().includes(search.toLowerCase()));
  };

  const displayCats = activeTab === "All" ? CATEGORIES : [activeTab];
  const changed = changedCount();

  if (!prices) return (
    <>
      <style>{styles}</style>
      <div style={{minHeight:"100vh",display:"flex",alignItems:"center",justifyContent:"center",
        background:"#1A1714",color:"#C4956A",fontFamily:"'DM Sans',sans-serif",fontSize:13}}>
        Loading...
      </div>
    </>
  );

  return (
    <>
      <style>{styles}</style>

      {/* ── LOGIN ── */}
      {!authed ? (
        <div className="adm-login">
          <div className="adm-login-logo">Threads <span>Beauty Bar</span></div>
          <div className="adm-login-sub">Staff Admin Panel</div>
          <div className="adm-login-card">
            <div className="adm-login-title">Sign In</div>
            <div className="adm-login-hint">Enter the admin password to manage service prices.</div>
            <label className="adm-lbl">Password</label>
            <input
              className="adm-inp"
              type="password"
              value={pw}
              placeholder="Enter password"
              onChange={e => { setPw(e.target.value); setPwError(""); }}
              onKeyDown={e => e.key === "Enter" && login()}
              autoFocus
            />
            <button className="adm-login-btn" onClick={login}>Sign In →</button>
            {pwError && <div className="adm-login-err">{pwError}</div>}
          </div>
        </div>
      ) : (
        <div className="adm-shell">

          {/* ── NAV ── */}
          <nav className="adm-nav">
            <div className="adm-nav-logo">Threads <span>Beauty Bar</span> — Admin</div>
            <div className="adm-nav-right">
              <div className="adm-badge">Price Manager</div>
              <button className="adm-signout" onClick={() => setAuthed(false)}>Sign Out</button>
            </div>
          </nav>

          <div className="adm-body">

            {/* ── TOP BAR ── */}
            <div className="adm-topbar">
              <div>
                <div className="adm-page-title">Edit <span>Prices</span></div>
                <div className="adm-page-sub">
                  Changes save to this device and appear on the website immediately.
                </div>
              </div>
              <div className="adm-btns">
                <a href="/" target="_blank" rel="noopener noreferrer" className="btn-visit">
                  ↗ View Website
                </a>
                <button className="btn-reset-all" onClick={handleReset}>
                  Reset Defaults
                </button>
                <button
                  className="btn-save"
                  onClick={handleSave}
                  disabled={changed === 0}
                >
                  {changed > 0 ? `Save ${changed} Change${changed > 1 ? "s" : ""}` : "All Saved ✓"}
                </button>
              </div>
            </div>

            {/* ── STATS ── */}
            <div className="adm-stats">
              {[
                [String(CATEGORIES.reduce((a,c)=>a+(prices[c]||[]).length,0)), "Total Services"],
                [String(changed),     "Unsaved Changes"],
                [String(CATEGORIES.length), "Categories"],
                ["Live",              "Update Speed"],
              ].map(([n,l]) => (
                <div className="adm-stat" key={l}>
                  <div className="adm-stat-n" style={n===String(changed)&&changed>0?{color:ACCENT}:{}}>{n}</div>
                  <div className="adm-stat-l">{l}</div>
                </div>
              ))}
            </div>

            {/* ── TOOLBAR ── */}
            <div className="adm-toolbar">
              <div className="adm-search-wrap">
                <span className="adm-search-icon">🔍</span>
                <input
                  className="adm-search"
                  placeholder="Search services..."
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                />
              </div>
              <div className="adm-cat-tabs">
                {["All", ...CATEGORIES].map(cat => {
                  const active = activeTab === cat;
                  return (
                    <button
                      key={cat}
                      className="adm-cat-btn"
                      onClick={() => setActiveTab(cat)}
                      style={{
                        background: active ? DARK : "white",
                        color: active ? "white" : MID,
                      }}
                    >{cat}</button>
                  );
                })}
              </div>
            </div>

            {/* ── PRICE TABLES ── */}
            {displayCats.map(cat => {
              const items = filterItems(prices[cat] || []);
              if (items.length === 0) return null;
              const catChanged = (prices[cat]||[]).filter(i => isChanged(cat, i.id)).length;

              return (
                <div className="adm-section" key={cat}>
                  <div className="adm-sec-hdr">
                    <div className="adm-sec-title">{cat}</div>
                    <div className="adm-sec-count">{(prices[cat]||[]).length} services</div>
                    {catChanged > 0 && (
                      <>
                        <div className="adm-sec-dot" />
                        <div className="adm-sec-unsaved">{catChanged} unsaved</div>
                      </>
                    )}
                  </div>
                  <table className="price-tbl">
                    <thead>
                      <tr>
                        <th>Service</th>
                        <th style={{width:52}}>ID</th>
                        <th>Price</th>
                      </tr>
                    </thead>
                    <tbody>
                      {items.map(item => {
                        const changed = isChanged(cat, item.id);
                        return (
                          <tr key={item.id} className={changed ? "changed" : ""}>
                            <td className="pt-name-cell">{item.name}</td>
                            <td className="pt-id-cell">{item.id}</td>
                            <td className="pt-price-cell">
                              <div className="pt-price-row">
                                <button
                                  className="undo-btn"
                                  onClick={() => undoItem(cat, item.id)}
                                  title="Undo this change"
                                >↩</button>
                                <input
                                  className={`price-inp${changed ? " changed" : ""}`}
                                  value={item.price}
                                  onChange={e => updatePrice(cat, item.id, e.target.value)}
                                  onBlur={e => {
                                    const v = e.target.value.trim();
                                    if (v && !isNaN(v.replace(/[$+/]/g,"").split("/")[0]) &&
                                        !v.startsWith("$") && !["Call","Add-on"].includes(v)) {
                                      updatePrice(cat, item.id, "$" + v);
                                    }
                                  }}
                                />
                              </div>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              );
            })}

            {/* ── INSTRUCTIONS ── */}
            <div className="adm-instructions">
              <div className="adm-instr-title">How to Update Prices</div>
              {[
                ["1", "Click any price field and type the new amount"],
                ["2", "Accepted formats: $15 · $70+ · $30/$65 · Call · Add-on"],
                ["3", "Gold rows = unsaved changes · Click ↩ to undo a single item"],
                ["4", 'Click "Save Changes" — prices update on the website immediately'],
                ["5", "Use the same device each time (prices are stored on this device)"],
              ].map(([n,t]) => (
                <div className="adm-instr-row" key={n}>
                  <div className="adm-instr-num">{n}</div>
                  <div className="adm-instr-text">{t}</div>
                </div>
              ))}
            </div>

          </div>

          {/* ── SAVE TOAST ── */}
          <div className={`adm-toast${toast ? " show" : ""}`}>
            ✓ Prices saved — website updated successfully
          </div>

        </div>
      )}
    </>
  );
}
