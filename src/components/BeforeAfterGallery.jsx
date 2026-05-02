import { useState, useEffect } from "react";

const GOLD = "#C9A84C";
const GOLD_LIGHT = "#E8C96A";
const BLACK = "#0A0A0A";
const CHARCOAL = "#1A1A1A";
const OFF_WHITE = "#FAF8F4";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,300;1,400&family=Jost:wght@300;400;500;600&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  body { font-family: 'Jost', sans-serif; background: ${OFF_WHITE}; }

  .gallery-section {
    padding: 100px 60px;
    background: ${OFF_WHITE};
  }
  .gallery-header {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 60px;
    align-items: end;
    margin-bottom: 60px;
  }
  .section-label {
    font-size: 10px;
    letter-spacing: 0.3em;
    text-transform: uppercase;
    color: ${GOLD};
    font-weight: 500;
    margin-bottom: 16px;
    display: flex; align-items: center; gap: 12px;
  }
  .section-label::before { content: ''; width: 30px; height: 1px; background: ${GOLD}; }
  .section-title {
    font-family: 'Cormorant Garamond', serif;
    font-size: clamp(36px, 5vw, 60px);
    font-weight: 300;
    line-height: 1.05;
    color: ${BLACK};
  }
  .section-title em { font-style: italic; color: ${GOLD}; }
  .section-body {
    font-size: 14px;
    line-height: 1.9;
    color: #666;
    font-weight: 300;
  }

  /* FILTERS */
  .gallery-filters {
    display: flex; gap: 2px;
    margin-bottom: 40px;
    flex-wrap: wrap;
  }
  .filter-btn {
    padding: 11px 24px;
    font-size: 10px;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    font-weight: 600;
    font-family: 'Jost', sans-serif;
    background: #fff;
    border: none;
    color: #999;
    cursor: pointer;
    transition: all 0.18s;
  }
  .filter-btn:hover { color: ${BLACK}; background: #f5f3ef; }
  .filter-btn.active { background: ${BLACK}; color: ${GOLD}; }

  /* GRID */
  .gallery-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 3px;
  }
  .gallery-card {
    position: relative;
    cursor: pointer;
    overflow: hidden;
    background: ${CHARCOAL};
    aspect-ratio: 1;
  }
  .gallery-card:first-child {
    grid-column: span 2;
    grid-row: span 2;
    aspect-ratio: auto;
  }
  .gallery-ba {
    width: 100%; height: 100%;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 2px;
  }
  .gallery-ba-panel {
    position: relative;
    overflow: hidden;
    height: 100%;
    min-height: 200px;
  }
  .gallery-ba-panel .panel-img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
    transition: transform 0.5s ease;
  }
  .gallery-card:hover .panel-img { transform: scale(1.05); }
  .ba-label {
    position: absolute;
    top: 12px; left: 12px;
    font-size: 9px;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    font-weight: 700;
    background: rgba(0,0,0,0.65);
    color: #fff;
    padding: 4px 8px;
  }
  .ba-label.after { background: ${GOLD}; color: ${BLACK}; }

  .gallery-single {
    width: 100%; height: 100%;
    position: relative;
    overflow: hidden;
  }
  .gallery-single .panel-img {
    width: 100%; height: 100%;
    object-fit: cover;
    display: block;
    transition: transform 0.5s ease;
  }
  .gallery-card:hover .gallery-single .panel-img { transform: scale(1.05); }

  .gallery-overlay {
    position: absolute; inset: 0;
    background: linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 50%);
    opacity: 0;
    transition: opacity 0.3s;
    display: flex; flex-direction: column;
    justify-content: flex-end;
    padding: 20px;
  }
  .gallery-card:hover .gallery-overlay { opacity: 1; }
  .overlay-service {
    font-size: 10px;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    color: ${GOLD};
    font-weight: 500;
    margin-bottom: 4px;
  }
  .overlay-desc {
    font-family: 'Cormorant Garamond', serif;
    font-size: 16px;
    color: #fff;
    font-weight: 400;
  }
  .overlay-zoom {
    position: absolute;
    top: 12px; right: 12px;
    width: 32px; height: 32px;
    background: rgba(255,255,255,0.15);
    backdrop-filter: blur(4px);
    display: flex; align-items: center; justify-content: center;
    color: #fff;
    font-size: 14px;
  }

  /* PLACEHOLDER IMG (colored bg + text) */
  .placeholder-img {
    width: 100%; height: 100%;
    display: flex; flex-direction: column;
    align-items: center; justify-content: center;
    gap: 8px;
  }
  .placeholder-label {
    font-family: 'Cormorant Garamond', serif;
    font-size: 20px;
    font-weight: 300;
    color: rgba(255,255,255,0.7);
    text-align: center;
    line-height: 1.3;
  }
  .placeholder-sub {
    font-size: 10px;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    color: rgba(255,255,255,0.3);
  }

  /* LIGHTBOX */
  .lightbox-overlay {
    position: fixed; inset: 0; z-index: 2000;
    background: rgba(0,0,0,0.92);
    display: flex; align-items: center; justify-content: center;
    padding: 24px;
    animation: lbFade 0.2s ease;
  }
  @keyframes lbFade { from { opacity: 0; } to { opacity: 1; } }
  .lightbox-inner {
    max-width: 900px; width: 100%;
    animation: lbScale 0.25s cubic-bezier(0.16,1,0.3,1);
  }
  @keyframes lbScale { from { transform: scale(0.94); opacity: 0; } to { transform: scale(1); opacity: 1; } }
  .lightbox-image-wrap {
    position: relative;
    background: ${CHARCOAL};
    display: flex;
    overflow: hidden;
  }
  .lightbox-panel {
    flex: 1;
    min-height: 500px;
    display: flex; align-items: center; justify-content: center;
    position: relative;
  }
  .lightbox-divider {
    width: 3px;
    background: #fff;
    position: relative;
    flex-shrink: 0;
    display: flex; align-items: center; justify-content: center;
  }
  .lightbox-divider-circle {
    width: 36px; height: 36px;
    background: #fff;
    border-radius: 50%;
    display: flex; align-items: center; justify-content: center;
    font-size: 11px;
    font-weight: 700;
    color: ${BLACK};
    letter-spacing: 0.05em;
    position: absolute;
    z-index: 2;
    flex-shrink: 0;
  }
  .lb-label {
    position: absolute;
    top: 16px; left: 16px;
    font-size: 9px;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    font-weight: 700;
    padding: 5px 10px;
  }
  .lb-label.before { background: rgba(255,255,255,0.15); color: #fff; }
  .lb-label.after { background: ${GOLD}; color: ${BLACK}; }
  .lightbox-meta {
    padding: 24px 28px;
    background: ${BLACK};
    display: flex; align-items: center; justify-content: space-between;
    gap: 20px; flex-wrap: wrap;
  }
  .lb-service-tag {
    font-size: 9px;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    color: ${GOLD};
    font-weight: 500;
    margin-bottom: 4px;
  }
  .lb-desc {
    font-family: 'Cormorant Garamond', serif;
    font-size: 20px;
    color: #fff;
    font-weight: 400;
  }
  .lb-close {
    background: none; border: none;
    color: rgba(255,255,255,0.4);
    font-size: 22px;
    cursor: pointer;
    transition: color 0.2s;
    font-family: 'Jost', sans-serif;
    padding: 4px 8px;
  }
  .lb-close:hover { color: #fff; }
  .lb-nav {
    position: absolute;
    top: 50%; transform: translateY(-50%);
    background: rgba(255,255,255,0.1);
    border: none;
    color: #fff;
    font-size: 24px;
    width: 48px; height: 48px;
    display: flex; align-items: center; justify-content: center;
    cursor: pointer;
    transition: background 0.2s;
    z-index: 10;
    font-family: 'Jost', sans-serif;
  }
  .lb-nav:hover { background: rgba(255,255,255,0.2); }
  .lb-nav.prev { left: 12px; }
  .lb-nav.next { right: 12px; }

  /* CTA STRIP */
  .gallery-cta {
    margin-top: 60px;
    background: ${BLACK};
    padding: 52px 60px;
    display: flex; align-items: center; justify-content: space-between;
    gap: 32px; flex-wrap: wrap;
  }
  .gcta-title {
    font-family: 'Cormorant Garamond', serif;
    font-size: 32px;
    font-weight: 300;
    color: #fff;
  }
  .gcta-sub {
    font-size: 12px;
    color: rgba(255,255,255,0.4);
    margin-top: 6px;
    letter-spacing: 0.06em;
  }
  .btn-gold {
    background: ${GOLD};
    color: ${BLACK};
    border: none;
    padding: 16px 40px;
    font-size: 11px;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    font-weight: 700;
    font-family: 'Jost', sans-serif;
    cursor: pointer;
    transition: all 0.2s;
    white-space: nowrap;
    text-decoration: none;
    display: inline-block;
  }
  .btn-gold:hover { background: ${GOLD_LIGHT}; transform: translateY(-2px); }

  /* STATS ROW */
  .gallery-stats {
    display: flex; gap: 2px;
    margin-top: 3px;
    background: rgba(0,0,0,0.06);
  }
  .gstat {
    flex: 1;
    background: #fff;
    padding: 24px 20px;
    text-align: center;
  }
  .gstat-num {
    font-family: 'Cormorant Garamond', serif;
    font-size: 36px;
    font-weight: 300;
    color: ${GOLD};
    line-height: 1;
  }
  .gstat-label {
    font-size: 9px;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    color: #999;
    margin-top: 6px;
    font-weight: 500;
  }

  @media (max-width: 800px) {
    .gallery-section { padding: 60px 20px; }
    .gallery-header { grid-template-columns: 1fr; gap: 20px; }
    .gallery-grid { grid-template-columns: 1fr 1fr; }
    .gallery-card:first-child { grid-column: 1 / -1; }
    .lightbox-panel { min-height: 200px; }
    .gallery-cta { padding: 40px 24px; flex-direction: column; }
  }
`;

// Palette of "before" and "after" visual placeholders with distinct colors
const CARDS = [
  {
    id: 1, category: "Threading",
    service: "Eyebrow Threading",
    desc: "Defined, symmetrical brows shaped to the client's bone structure",
    beforeBg: "#2a2520", afterBg: "#1a1208",
    beforeLabel: "Overgrown, uneven brows", afterLabel: "Precise, defined arch",
    featured: true,
  },
  {
    id: 2, category: "Threading",
    service: "Full Face Thread",
    desc: "Complete facial threading — brows, lip, chin, cheeks",
    beforeBg: "#1e1c18", afterBg: "#141008",
  },
  {
    id: 3, category: "Waxing",
    service: "Brazilian Wax",
    desc: "Clean, smooth results — professional & private",
    beforeBg: "#1c1a18", afterBg: "#0e0c08",
  },
  {
    id: 4, category: "Facials",
    service: "Hydra Facial",
    desc: "Visibly tighter, brighter skin after one 90-min session",
    beforeBg: "#1a1814", afterBg: "#120f08",
  },
  {
    id: 5, category: "Hair",
    service: "Balayage Highlights",
    desc: "Natural, sun-kissed dimension — custom mixed in-salon",
    beforeBg: "#1e1814", afterBg: "#140c04",
  },
  {
    id: 6, category: "Facials",
    service: "Anti-Aging Facial",
    desc: "Reduced fine lines, lifted tone after 80-min treatment",
    beforeBg: "#1a1814", afterBg: "#100e08",
  },
  {
    id: 7, category: "Hair",
    service: "Full Color",
    desc: "Rich, even color from root to tip with zero brassiness",
    beforeBg: "#1c1410", afterBg: "#100804",
  },
];

const CATEGORIES = ["All", "Threading", "Waxing", "Facials", "Hair"];

// Decorative placeholder image (SVG in a colored box)
function PlaceholderImg({ bg, label, sub, style = {} }) {
  return (
    <div
      className="placeholder-img"
      style={{ background: bg, ...style }}
    >
      <div className="placeholder-label">{label}</div>
      {sub && <div className="placeholder-sub">{sub}</div>}
    </div>
  );
}

function GalleryCard({ card, onClick }) {
  const isFeatured = card.featured;

  return (
    <div className="gallery-card" onClick={() => onClick(card)}>
      {isFeatured ? (
        <div className="gallery-ba" style={{ height: "100%", minHeight: 380 }}>
          <div className="gallery-ba-panel" style={{ minHeight: 380 }}>
            <PlaceholderImg bg={card.beforeBg} label="Before" sub="Threading" style={{ minHeight: 380 }} />
            <div className="ba-label">Before</div>
          </div>
          <div className="gallery-ba-panel" style={{ minHeight: 380 }}>
            <PlaceholderImg bg={card.afterBg} label="After" sub="Threads Beauty Bar" style={{ minHeight: 380 }} />
            <div className="ba-label after">After</div>
          </div>
        </div>
      ) : (
        <div className="gallery-single" style={{ minHeight: 200 }}>
          <PlaceholderImg bg={card.afterBg} label={card.service} sub={card.category} style={{ minHeight: 200 }} />
        </div>
      )}
      <div className="gallery-overlay">
        <div className="overlay-service">{card.service}</div>
        <div className="overlay-desc">{card.desc}</div>
        <div className="overlay-zoom">⊕</div>
      </div>
    </div>
  );
}

function Lightbox({ card, cards, onClose, onNav }) {
  useEffect(() => {
    const handler = (e) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") onNav(1);
      if (e.key === "ArrowLeft") onNav(-1);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose, onNav]);

  return (
    <div className="lightbox-overlay" onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="lightbox-inner">
        <div className="lightbox-image-wrap">
          <button className="lb-nav prev" onClick={() => onNav(-1)}>‹</button>

          <div className="lightbox-panel" style={{ minHeight: 440 }}>
            <PlaceholderImg bg={card.beforeBg} label="Before" sub={card.service} style={{ width: "100%", minHeight: 440 }} />
            <div className="lb-label before">Before</div>
          </div>

          <div className="lightbox-divider">
            <div className="lightbox-divider-circle">B/A</div>
          </div>

          <div className="lightbox-panel" style={{ minHeight: 440 }}>
            <PlaceholderImg bg={card.afterBg} label="After" sub="Threads Beauty Bar" style={{ width: "100%", minHeight: 440 }} />
            <div className="lb-label after">After</div>
          </div>

          <button className="lb-nav next" onClick={() => onNav(1)}>›</button>
        </div>
        <div className="lightbox-meta">
          <div>
            <div className="lb-service-tag">{card.category} · Threads Beauty Bar, Dublin CA</div>
            <div className="lb-desc">{card.desc}</div>
          </div>
          <button className="lb-close" onClick={onClose}>✕</button>
        </div>
      </div>
    </div>
  );
}

export default function BeforeAfterGallery() {
  const [category, setCategory] = useState("All");
  const [lightbox, setLightbox] = useState(null);

  const filtered = category === "All" ? CARDS : CARDS.filter(c => c.category === category);

  const openLightbox = (card) => setLightbox(card);
  const closeLightbox = () => setLightbox(null);
  const navLightbox = (dir) => {
    const idx = filtered.findIndex(c => c.id === lightbox.id);
    const next = (idx + dir + filtered.length) % filtered.length;
    setLightbox(filtered[next]);
  };

  return (
    <>
      <style>{styles}</style>

      <section className="gallery-section">
        {/* HEADER */}
        <div className="gallery-header">
          <div>
            <p className="section-label">Real Results</p>
            <h2 className="section-title">
              Before & <em>After</em><br />Gallery
            </h2>
          </div>
          <p className="section-body">
            Every photo is from a real Threads client. No filters, no staging —
            just the work. Our results speak for themselves across threading,
            waxing, facials, and hair services. This is what precision looks like.
          </p>
        </div>

        {/* FILTERS */}
        <div className="gallery-filters">
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              className={`filter-btn${category === cat ? " active" : ""}`}
              onClick={() => setCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* GRID */}
        <div className="gallery-grid">
          {filtered.map(card => (
            <GalleryCard key={card.id} card={card} onClick={openLightbox} />
          ))}
        </div>

        {/* STATS */}
        <div className="gallery-stats">
          {[
            { num: "4.5★", label: "Google Rating" },
            { num: "94+", label: "Verified Reviews" },
            { num: "100%", label: "Cotton Thread" },
            { num: "0", label: "Double-Dip Policy" },
            { num: "10+", label: "Years in Dublin" },
          ].map(s => (
            <div className="gstat" key={s.label}>
              <div className="gstat-num">{s.num}</div>
              <div className="gstat-label">{s.label}</div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="gallery-cta">
          <div>
            <div className="gcta-title">Ready for your transformation?</div>
            <div className="gcta-sub">Walk-ins welcome · Appointments preferred · (925) 833-1710</div>
          </div>
          <a href="https://threadsbeautybar.com" className="btn-gold">
            Book Your Appointment
          </a>
        </div>
      </section>

      {/* LIGHTBOX */}
      {lightbox && (
        <Lightbox
          card={lightbox}
          cards={filtered}
          onClose={closeLightbox}
          onNav={navLightbox}
        />
      )}
    </>
  );
}
