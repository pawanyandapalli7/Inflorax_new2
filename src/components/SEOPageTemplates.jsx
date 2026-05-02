import { useState } from "react";

/**
 * LOCAL SEO PAGE TEMPLATES
 * Threads Beauty Bar & Spa — Dublin, CA
 *
 * Usage: Pass `page` prop to render different city/service pages.
 * Each page is pre-optimized for local search with:
 * - H1 containing primary keyword
 * - Location-specific copy
 * - FAQ schema (render in <script type="application/ld+json"> on production)
 * - Structured service list with prices
 * - Trust signals + CTAs
 */

const GOLD = "#C9A84C";
const GOLD_LIGHT = "#E8C96A";
const BLACK = "#0A0A0A";
const CHARCOAL = "#1A1A1A";
const OFF_WHITE = "#FAF8F4";
const WARM_GRAY = "#F0EDE8";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,300;1,400&family=Jost:wght@300;400;500;600&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  body { font-family: 'Jost', sans-serif; background: ${OFF_WHITE}; color: ${BLACK}; }

  /* PAGE SWITCHER (demo only) */
  .page-switcher {
    background: ${CHARCOAL};
    padding: 14px 40px;
    display: flex; gap: 0; overflow-x: auto;
    position: sticky; top: 0; z-index: 100;
  }
  .ps-btn {
    background: none;
    border: none;
    color: rgba(255,255,255,0.4);
    padding: 8px 20px;
    font-size: 10px;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    font-weight: 500;
    font-family: 'Jost', sans-serif;
    cursor: pointer;
    white-space: nowrap;
    transition: color 0.2s;
    border-bottom: 2px solid transparent;
  }
  .ps-btn.active { color: ${GOLD}; border-bottom-color: ${GOLD}; }
  .ps-btn:hover:not(.active) { color: rgba(255,255,255,0.7); }
  .ps-label {
    font-size: 9px;
    letter-spacing: 0.25em;
    text-transform: uppercase;
    color: rgba(255,255,255,0.2);
    align-self: center;
    margin-right: 16px;
    flex-shrink: 0;
  }

  /* LOCAL HERO */
  .local-hero {
    background: ${BLACK};
    padding: 80px 60px 70px;
    position: relative; overflow: hidden;
  }
  .local-hero-bg {
    position: absolute; inset: 0;
    background: radial-gradient(ellipse 60% 80% at 70% 50%, #1a1208 0%, ${BLACK} 100%);
  }
  .local-hero-grid {
    position: absolute; inset: 0;
    background-image:
      linear-gradient(rgba(201,168,76,0.03) 1px, transparent 1px),
      linear-gradient(90deg, rgba(201,168,76,0.03) 1px, transparent 1px);
    background-size: 50px 50px;
  }
  .local-hero-inner {
    position: relative; z-index: 1;
    max-width: 760px;
  }
  .breadcrumb {
    font-size: 10px;
    letter-spacing: 0.12em;
    color: rgba(255,255,255,0.3);
    margin-bottom: 24px;
    display: flex; align-items: center; gap: 8px;
    flex-wrap: wrap;
  }
  .breadcrumb a { color: rgba(255,255,255,0.3); text-decoration: none; }
  .breadcrumb a:hover { color: ${GOLD}; }
  .breadcrumb-sep { color: rgba(255,255,255,0.15); }
  .local-h1 {
    font-family: 'Cormorant Garamond', serif;
    font-size: clamp(36px, 6vw, 72px);
    font-weight: 300;
    line-height: 1.05;
    color: #fff;
    margin-bottom: 20px;
  }
  .local-h1 em { font-style: italic; color: ${GOLD}; }
  .local-hero-desc {
    font-size: 15px;
    line-height: 1.85;
    color: rgba(255,255,255,0.55);
    font-weight: 300;
    max-width: 580px;
    margin-bottom: 36px;
  }
  .hero-badges {
    display: flex; gap: 8px; flex-wrap: wrap; margin-bottom: 36px;
  }
  .badge {
    font-size: 10px;
    letter-spacing: 0.15em;
    text-transform: uppercase;
    font-weight: 500;
    padding: 6px 14px;
    border: 1px solid rgba(201,168,76,0.3);
    color: ${GOLD};
  }
  .local-hero-ctas {
    display: flex; gap: 12px; flex-wrap: wrap;
  }
  .btn-gold-solid {
    background: ${GOLD};
    color: ${BLACK};
    border: none;
    padding: 14px 36px;
    font-size: 11px;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    font-weight: 700;
    font-family: 'Jost', sans-serif;
    cursor: pointer;
    transition: all 0.2s;
    text-decoration: none;
    display: inline-block;
  }
  .btn-gold-solid:hover { background: ${GOLD_LIGHT}; transform: translateY(-1px); }
  .btn-outline-white {
    background: transparent;
    color: rgba(255,255,255,0.7);
    border: 1px solid rgba(255,255,255,0.2);
    padding: 14px 36px;
    font-size: 11px;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    font-weight: 500;
    font-family: 'Jost', sans-serif;
    cursor: pointer;
    transition: all 0.2s;
    text-decoration: none;
    display: inline-block;
  }
  .btn-outline-white:hover { border-color: ${GOLD}; color: ${GOLD}; }

  /* TRUST BAR */
  .trust-strip {
    background: ${GOLD};
    padding: 14px 60px;
    display: flex; gap: 40px; align-items: center; justify-content: center;
    flex-wrap: wrap;
  }
  .ts-item {
    font-size: 10px;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    font-weight: 700;
    color: ${BLACK};
    display: flex; align-items: center; gap: 8px;
  }

  /* INTRO */
  .intro-section {
    padding: 72px 60px;
    background: #fff;
    display: grid;
    grid-template-columns: 1.2fr 1fr;
    gap: 80px;
    align-items: start;
  }
  .intro-body {
    font-size: 15px;
    line-height: 1.9;
    color: #444;
    font-weight: 300;
  }
  .intro-body p { margin-bottom: 20px; }
  .intro-body strong { font-weight: 600; color: ${BLACK}; }
  .intro-aside {}
  .aside-card {
    background: ${BLACK};
    padding: 32px;
    margin-bottom: 16px;
  }
  .aside-label {
    font-size: 9px;
    letter-spacing: 0.25em;
    text-transform: uppercase;
    color: ${GOLD};
    font-weight: 500;
    margin-bottom: 12px;
  }
  .aside-title {
    font-family: 'Cormorant Garamond', serif;
    font-size: 22px;
    color: #fff;
    font-weight: 400;
    margin-bottom: 16px;
    line-height: 1.3;
  }
  .aside-list {
    list-style: none;
  }
  .aside-list li {
    font-size: 12px;
    color: rgba(255,255,255,0.5);
    padding: 7px 0;
    border-bottom: 1px solid rgba(255,255,255,0.07);
    display: flex; align-items: center; gap: 10px;
    letter-spacing: 0.03em;
  }
  .aside-list li::before { content: '›'; color: ${GOLD}; font-size: 14px; }

  /* PRICING TABLE */
  .pricing-section {
    padding: 72px 60px;
    background: ${WARM_GRAY};
  }
  .section-label {
    font-size: 10px;
    letter-spacing: 0.28em;
    text-transform: uppercase;
    color: ${GOLD};
    font-weight: 500;
    margin-bottom: 14px;
    display: flex; align-items: center; gap: 12px;
  }
  .section-label::before { content: ''; width: 28px; height: 1px; background: ${GOLD}; }
  .section-title {
    font-family: 'Cormorant Garamond', serif;
    font-size: clamp(32px, 4vw, 52px);
    font-weight: 300;
    color: ${BLACK};
    margin-bottom: 48px;
    line-height: 1.1;
  }
  .section-title em { font-style: italic; color: ${GOLD}; }
  .price-table {
    background: #fff;
    width: 100%;
    border-collapse: collapse;
  }
  .price-table th {
    font-size: 9px;
    letter-spacing: 0.25em;
    text-transform: uppercase;
    font-weight: 600;
    color: #888;
    padding: 14px 20px;
    text-align: left;
    border-bottom: 2px solid rgba(0,0,0,0.08);
    background: #fff;
  }
  .price-table th:last-child { text-align: right; }
  .price-table td {
    padding: 16px 20px;
    border-bottom: 1px solid rgba(0,0,0,0.05);
    vertical-align: middle;
  }
  .price-table tr:last-child td { border-bottom: none; }
  .price-table tr:hover td { background: #fffbf0; }
  .pt-name {
    font-family: 'Cormorant Garamond', serif;
    font-size: 19px;
    color: ${BLACK};
    font-weight: 400;
  }
  .pt-desc { font-size: 11px; color: #999; margin-top: 3px; letter-spacing: 0.03em; }
  .pt-duration { font-size: 12px; color: #aaa; text-align: center; letter-spacing: 0.05em; }
  .pt-price {
    font-family: 'Cormorant Garamond', serif;
    font-size: 22px;
    color: ${GOLD};
    text-align: right;
    font-weight: 400;
  }
  .pt-popular {
    display: inline-block;
    font-size: 8px;
    letter-spacing: 0.15em;
    text-transform: uppercase;
    font-weight: 700;
    background: ${GOLD};
    color: ${BLACK};
    padding: 2px 7px;
    margin-left: 8px;
    vertical-align: middle;
  }

  /* FAQ */
  .faq-section {
    padding: 72px 60px;
    background: ${BLACK};
  }
  .faq-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 2px;
    margin-top: 48px;
    background: rgba(255,255,255,0.05);
  }
  .faq-item {
    background: ${CHARCOAL};
    padding: 28px 28px;
    cursor: pointer;
    transition: background 0.2s;
  }
  .faq-item.open { background: #1f1e1a; }
  .faq-q {
    font-family: 'Cormorant Garamond', serif;
    font-size: 19px;
    color: #fff;
    font-weight: 400;
    display: flex; justify-content: space-between; gap: 16px;
    line-height: 1.3;
  }
  .faq-toggle {
    color: ${GOLD};
    font-size: 20px;
    flex-shrink: 0;
    transition: transform 0.25s;
    font-weight: 300;
  }
  .faq-item.open .faq-toggle { transform: rotate(45deg); }
  .faq-a {
    font-size: 13px;
    color: rgba(255,255,255,0.45);
    line-height: 1.8;
    font-weight: 300;
    margin-top: 14px;
    display: none;
  }
  .faq-item.open .faq-a { display: block; }

  /* NEARBY CITIES */
  .cities-section {
    padding: 72px 60px;
    background: ${OFF_WHITE};
  }
  .cities-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 2px;
    margin-top: 40px;
    background: rgba(0,0,0,0.06);
  }
  .city-card {
    background: #fff;
    padding: 28px 24px;
    text-decoration: none;
    transition: background 0.2s;
    display: block;
    position: relative;
  }
  .city-card:hover { background: #fffbf0; }
  .city-card::after {
    content: '→';
    position: absolute;
    top: 28px; right: 24px;
    color: ${GOLD};
    font-size: 14px;
    opacity: 0;
    transition: opacity 0.2s;
  }
  .city-card:hover::after { opacity: 1; }
  .city-name {
    font-family: 'Cormorant Garamond', serif;
    font-size: 22px;
    color: ${BLACK};
    font-weight: 400;
    margin-bottom: 6px;
  }
  .city-dist {
    font-size: 11px;
    color: #999;
    letter-spacing: 0.08em;
    margin-bottom: 10px;
  }
  .city-kw {
    font-size: 10px;
    color: ${GOLD};
    letter-spacing: 0.1em;
  }

  /* SCHEMA OUTPUT */
  .schema-section {
    padding: 40px 60px;
    background: ${CHARCOAL};
    display: none;
  }
  .schema-code {
    background: rgba(0,0,0,0.4);
    padding: 24px;
    border-left: 3px solid ${GOLD};
    font-family: monospace;
    font-size: 11px;
    color: rgba(255,255,255,0.5);
    line-height: 1.7;
    overflow-x: auto;
    white-space: pre;
  }

  /* FINAL CTA */
  .final-cta {
    padding: 80px 60px;
    background: ${GOLD};
    text-align: center;
  }
  .fcta-title {
    font-family: 'Cormorant Garamond', serif;
    font-size: clamp(32px, 5vw, 60px);
    font-weight: 300;
    color: ${BLACK};
    margin-bottom: 14px;
  }
  .fcta-sub {
    font-size: 13px;
    color: rgba(0,0,0,0.5);
    margin-bottom: 36px;
    letter-spacing: 0.04em;
  }
  .fcta-btns {
    display: flex; gap: 12px; justify-content: center; flex-wrap: wrap;
  }
  .btn-black {
    background: ${BLACK};
    color: #fff;
    border: none;
    padding: 16px 44px;
    font-size: 11px;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    font-weight: 700;
    font-family: 'Jost', sans-serif;
    cursor: pointer;
    transition: all 0.2s;
    text-decoration: none;
    display: inline-block;
  }
  .btn-black:hover { background: ${CHARCOAL}; transform: translateY(-1px); }

  @media (max-width: 800px) {
    .local-hero { padding: 60px 24px 48px; }
    .trust-strip { padding: 14px 24px; gap: 20px; }
    .intro-section { grid-template-columns: 1fr; padding: 48px 24px; gap: 40px; }
    .pricing-section { padding: 48px 24px; }
    .faq-section { padding: 48px 24px; }
    .faq-grid { grid-template-columns: 1fr; }
    .cities-section { padding: 48px 24px; }
    .cities-grid { grid-template-columns: 1fr 1fr; }
    .final-cta { padding: 60px 24px; }
  }
`;

// =====================
// PAGE DATA
// =====================
const PAGES = {
  threading: {
    id: "threading",
    meta: {
      title: "Eyebrow Threading in Dublin, CA | Threads Beauty Bar & Spa",
      description: "Expert eyebrow threading and full face threading in Dublin, CA. Precision brow shaping from $10. Walk-ins welcome. Call (925) 833-1710.",
    },
    breadcrumbs: [
      { label: "Home", href: "/" },
      { label: "Services", href: "/services" },
      { label: "Threading" },
    ],
    h1: <>Eyebrow Threading in<br /><em>Dublin, California</em></>,
    heroDesc: "Precision threading by trained artists at Threads Beauty Bar & Spa — Dublin's top-rated full-service beauty salon. Expert brow shaping, full face threading, and more. Walk-ins welcome daily.",
    badges: ["4.5★ Google Rated", "Walk-ins Welcome", "From $10", "Cotton Thread Only"],
    intro: [
      <p>If you're searching for <strong>eyebrow threading in Dublin, CA</strong>, Threads Beauty Bar & Spa is the area's most trusted choice. Located at 6620 Dublin Blvd, we've built a loyal following across Dublin, Pleasanton, San Ramon, and Livermore by delivering consistently precise brow shaping that flatters your bone structure — not just removes hair.</p>,
      <p>Our threading artists use <strong>100% cotton thread</strong> — no wax, no chemicals, no harsh chemicals on your skin. Threading is the most hygienic and precise form of facial hair removal, and it's especially gentle for clients with sensitive skin, rosacea, or retinol-users who can't wax.</p>,
      <p>Whether you need a clean brow arch, upper lip thread, full face thread, or a package that saves you money over multiple visits — Threads is your one-stop threading destination in the Tri-Valley.</p>,
    ],
    asideTitle: "Why Choose Threading?",
    asideItems: ["Removes hair at the root", "No chemicals or wax", "Safe for all skin types", "Precise to the single hair", "Longer results than shaving", "Recommended for retinol users"],
    pricing: [
      { name: "Eyebrows", desc: "Arch mapping + precision shaping", duration: "15 min", price: "$15" },
      { name: "Eyebrow + Upper Lip", desc: "Most popular combo", duration: "20 min", price: "$21", popular: true },
      { name: "Upper Lip", desc: "Clean fine-hair removal", duration: "8 min", price: "$10" },
      { name: "Chin / Full Chin", desc: "Targeted area threading", duration: "10 min", price: "$10 / $12" },
      { name: "Cheeks", desc: "Full cheek coverage", duration: "10 min", price: "$12" },
      { name: "Full Face", desc: "Brows, lip, chin, cheeks, forehead", duration: "30 min", price: "$50" },
      { name: "Full Face + Full Chin", desc: "Complete treatment", duration: "35 min", price: "$60" },
      { name: "Neck", desc: "Hairline edge & neckline", duration: "10 min", price: "$12" },
    ],
    pricingNote: "Coarse hair: +$10–$20. Packages available: 12 Eyebrow Sessions $129 (10% off).",
    faqs: [
      { q: "How long does eyebrow threading last?", a: "Most clients find threading results last 3–4 weeks, similar to waxing. Hair grows back finer over time with repeated treatments." },
      { q: "Does threading hurt?", a: "Most clients describe it as a mild snapping sensation. It's generally considered less painful than waxing and subsides within minutes. We recommend avoiding retinoids for 24 hours before." },
      { q: "Can I get threaded if I have sensitive skin?", a: "Yes — threading is actually the preferred option for sensitive skin. There's no wax, no chemicals, and no pulling of the skin itself, only the hair." },
      { q: "Do I need an appointment for eyebrow threading?", a: "Walk-ins are welcome for most threading services. However, full face threading is appointment-recommended, especially on weekends." },
      { q: "How often should I get my brows threaded?", a: "We recommend every 3–4 weeks to maintain a clean shape. Monthly packages offer the best value and keep your brows perfectly groomed year-round." },
      { q: "Where is Threads Beauty Bar located?", a: "We're at 6620 Dublin Blvd, Dublin, CA 94568 — centrally located and easy to reach from Pleasanton, San Ramon, Livermore, and the 580/680 corridors." },
    ],
    keyword: "Threading",
  },

  waxing: {
    id: "waxing",
    meta: {
      title: "Waxing Salon in Dublin, CA | Brazilian, Body & Face Wax | Threads Beauty Bar",
      description: "Professional waxing in Dublin, CA — Brazilian, full body, bikini, legs, and face waxing. Hygienic, experienced, results-focused. Book online or call (925) 833-1710.",
    },
    breadcrumbs: [
      { label: "Home", href: "/" },
      { label: "Services", href: "/services" },
      { label: "Waxing" },
    ],
    h1: <>Professional Waxing in<br /><em>Dublin, California</em></>,
    heroDesc: "From Brazilian waxing to full body and face waxing — Threads Beauty Bar is Dublin's most trusted waxing salon. Clean technique, professional results, private rooms. Walk-ins welcome.",
    badges: ["Brazilian From $70", "Private Wax Rooms", "No Double-Dip Policy", "All Skin Tones"],
    intro: [
      <p>Looking for a <strong>waxing salon in Dublin, CA</strong> that takes cleanliness and results seriously? Threads Beauty Bar & Spa offers comprehensive waxing services — face, body, bikini, and Brazilian — using professional-grade wax in a clean, private environment.</p>,
      <p>Our strict <strong>no double-dip policy</strong> means every client gets a fresh applicator, every time. We use both hard and soft wax depending on the area and hair type, and our estheticians are trained to minimize discomfort while achieving long-lasting, smooth results.</p>,
      <p>We serve clients from across the East Bay — Dublin, Pleasanton, San Ramon, Livermore — and offer package pricing for Brazilian waxing that saves you up to 21% when you pre-book a series.</p>,
    ],
    asideTitle: "Waxing at Threads Includes",
    asideItems: ["No double-dip, ever", "Hard & soft wax options", "Private wax rooms", "Pre & post-wax skin care", "Package savings up to 21%", "All skin types & tones welcome"],
    pricing: [
      { name: "Brazilian (Full)", desc: "Complete hair removal, front to back", duration: "45 min", price: "$70", popular: true },
      { name: "Basic Bikini", desc: "Panty line cleaning", duration: "20 min", price: "$30" },
      { name: "Basic Bikini Plus", desc: "Extended bikini line", duration: "25 min", price: "$40" },
      { name: "Full Legs", desc: "Knee to ankle", duration: "40 min", price: "$65" },
      { name: "Half Legs", desc: "Lower leg wax", duration: "25 min", price: "$30" },
      { name: "Full Arms / Half Arms", desc: "Smooth, hair-free arms", duration: "30 / 20 min", price: "$45 / $35" },
      { name: "Underarms", desc: "Quick, clean underarm wax", duration: "15 min", price: "$25" },
      { name: "Full Back / Half Back", desc: "Back hair removal", duration: "35 / 20 min", price: "$60 / $35" },
      { name: "Chest / Stomach", desc: "Smooth chest & stomach", duration: "30 min", price: "$35" },
      { name: "Full Face Wax (with brows)", desc: "Complete facial wax", duration: "25 min", price: "$60" },
    ],
    pricingNote: "Brazilian packages: 3 sessions $180 · 6 sessions $330. Extra growth fee may apply.",
    faqs: [
      { q: "How long does a Brazilian wax take at Threads?", a: "Most Brazilian wax appointments take 30–45 minutes. First-time clients may take a little longer as we take care to ensure your comfort throughout." },
      { q: "Do I need to let hair grow out before waxing?", a: "Yes — ideally at least 1/4 inch of growth (about 2–3 weeks after shaving). Too short and the wax can't grip the hair effectively." },
      { q: "What's your no double-dip policy?", a: "Every applicator is used once, then discarded. We never re-dip an applicator that has touched skin into the wax pot — this prevents cross-contamination and is non-negotiable at Threads." },
      { q: "How often should I get a Brazilian wax?", a: "Every 4–6 weeks is ideal for maintaining smooth results and training hair to grow finer and sparser over time. Our 6-session package is designed for this cadence." },
      { q: "Is waxing better than shaving or laser?", a: "Waxing removes hair at the root, providing 4–6 weeks of smoothness vs 1–3 days with shaving. Compared to laser, it's more accessible and works on all skin tones and hair colors." },
      { q: "Can I get waxed on my period?", a: "Yes, but skin tends to be more sensitive during this time. We recommend booking a few days before or after for the most comfortable experience." },
    ],
    keyword: "Waxing",
  },

  facials: {
    id: "facials",
    meta: {
      title: "Facials in Dublin, CA | HydraFacial & Custom Skincare | Threads Beauty Bar",
      description: "Professional facials and HydraFacials in Dublin, CA. 25, 50 & 80 minute custom facials from $55. Anti-aging, vitamin C, microdermabrasion. Book today.",
    },
    breadcrumbs: [
      { label: "Home", href: "/" },
      { label: "Services", href: "/services" },
      { label: "Facials" },
    ],
    h1: <>Luxury Facials &amp;<br /><em>HydraFacials</em> in Dublin, CA</>,
    heroDesc: "Custom facials designed for your skin — from express 25-minute treatments to 90-minute HydraFacials with advanced add-ons. Medical-grade skincare, real results, Dublin's most trusted estheticians.",
    badges: ["Express From $55", "HydraFacial $175", "Custom Add-ons", "Appointment Required"],
    intro: [
      <p>If you're searching for <strong>facials in Dublin, CA</strong> that deliver visible, lasting results — Threads Beauty Bar & Spa offers a full range of professional facial treatments tailored to your unique skin type, concerns, and goals.</p>,
      <p>Whether you're looking to hydrate dry skin, clear congestion, fight fine lines, or simply unwind with a restorative treatment, our estheticians take time to assess your skin before every session. No two facials are exactly alike at Threads — that's intentional.</p>,
      <p>Our most popular treatment, the <strong>90-minute HydraFacial</strong>, combines cleansing, exfoliation, extraction, and hydration in a single patented protocol — leaving skin visibly brighter, tighter, and smoother with zero downtime.</p>,
    ],
    asideTitle: "Facial Add-ons Available",
    asideItems: ["Vitamin C Brightening", "Moisture Infusion", "Detoxifying Treatment", "Anti-Aging Protocol", "Microdermabrasion", "LED Light Therapy (consult)"],
    pricing: [
      { name: "Express Facial", desc: "Cleanse, treat & moisturize — quick refresh", duration: "25 min", price: "$55" },
      { name: "Signature Facial", desc: "Full treatment with extractions & mask", duration: "50 min", price: "$90", popular: true },
      { name: "Indulgence Facial", desc: "Extended treatment with premium protocol", duration: "80 min", price: "$150" },
      { name: "HydraFacial", desc: "Cleanse + exfoliate + extract + hydrate", duration: "90 min", price: "$175" },
      { name: "Vitamin C Add-on", desc: "Brightening serum infusion", duration: "+15 min", price: "+" },
      { name: "Microdermabrasion", desc: "Physical exfoliation add-on", duration: "+20 min", price: "+" },
    ],
    pricingNote: "Appointments required for all facial services. Please arrive 15 minutes early.",
    faqs: [
      { q: "What's the difference between a regular facial and a HydraFacial?", a: "A HydraFacial uses a patented Vortex-Fusion technology to cleanse, exfoliate, extract, and infuse serums in one seamless treatment. Regular facials involve manual techniques. HydraFacials are more intensive and offer more consistent results." },
      { q: "How often should I get a facial?", a: "Most skin experts recommend once a month to align with your skin's natural renewal cycle. However, HydraFacials can be done more frequently. Your esthetician will advise based on your skin type." },
      { q: "Can I get a facial if I have acne?", a: "Yes. We offer facials specifically designed for acne-prone skin including targeted extractions and anti-inflammatory treatments. Please mention acne when booking so we can prepare the right protocol." },
      { q: "Is there downtime after a facial?", a: "Standard facials have no downtime. You may experience mild redness for a few hours. HydraFacials typically have zero visible downtime — you can return to normal activities immediately." },
      { q: "Do I need to do anything to prepare for a facial?", a: "Arrive clean-faced if possible, and avoid retinoids for 48 hours before your appointment. Mention any skin sensitivities, recent treatments, or medications during your consultation." },
      { q: "Are facials suitable for all skin types?", a: "Yes — our estheticians customize every treatment for your skin type: dry, oily, combination, sensitive, or mature. No two treatments at Threads are exactly the same." },
    ],
    keyword: "Facials",
  },
};

const NEARBY_CITIES = [
  { name: "Pleasanton", dist: "4 miles away", kw: "threading & waxing near Pleasanton" },
  { name: "San Ramon", dist: "6 miles away", kw: "beauty salon near San Ramon" },
  { name: "Livermore", dist: "8 miles away", kw: "threading near Livermore CA" },
  { name: "Castro Valley", dist: "12 miles away", kw: "eyebrow threading East Bay" },
];

function FAQItem({ q, a }) {
  const [open, setOpen] = useState(false);
  return (
    <div className={`faq-item${open ? " open" : ""}`} onClick={() => setOpen(o => !o)}>
      <div className="faq-q">
        <span>{q}</span>
        <span className="faq-toggle">+</span>
      </div>
      <div className="faq-a">{a}</div>
    </div>
  );
}

function LocalPage({ data }) {
  return (
    <div>
      {/* LOCAL HERO */}
      <div className="local-hero">
        <div className="local-hero-bg" />
        <div className="local-hero-grid" />
        <div className="local-hero-inner">
          <div className="breadcrumb">
            {data.breadcrumbs.map((b, i) => (
              <span key={i} style={{ display: "flex", alignItems: "center", gap: 8 }}>
                {b.href ? <a href={b.href}>{b.label}</a> : <span style={{ color: "rgba(255,255,255,0.5)" }}>{b.label}</span>}
                {i < data.breadcrumbs.length - 1 && <span className="breadcrumb-sep">›</span>}
              </span>
            ))}
          </div>
          <h1 className="local-h1">{data.h1}</h1>
          <p className="local-hero-desc">{data.heroDesc}</p>
          <div className="hero-badges">
            {data.badges.map(b => <span className="badge" key={b}>{b}</span>)}
          </div>
          <div className="local-hero-ctas">
            <a href="https://threadsbeautybar.com" className="btn-gold-solid">Book Appointment</a>
            <a href="tel:9258331710" className="btn-outline-white">Call (925) 833-1710</a>
          </div>
        </div>
      </div>

      {/* TRUST STRIP */}
      <div className="trust-strip">
        <div className="ts-item">✓ 4.5★ Google</div>
        <div className="ts-item">✓ Walk-ins Welcome</div>
        <div className="ts-item">✓ Hygienic & Professional</div>
        <div className="ts-item">✓ 6620 Dublin Blvd</div>
        <div className="ts-item">✓ (925) 833-1710</div>
      </div>

      {/* INTRO */}
      <div className="intro-section">
        <div className="intro-body">
          {data.intro}
        </div>
        <div className="intro-aside">
          <div className="aside-card">
            <div className="aside-label">{data.keyword} at Threads</div>
            <div className="aside-title">{data.asideTitle}</div>
            <ul className="aside-list">
              {data.asideItems.map(item => <li key={item}>{item}</li>)}
            </ul>
          </div>
          <div className="aside-card" style={{ padding: "24px 32px" }}>
            <div className="aside-label">Visit Us</div>
            <div style={{ fontSize: 13, color: "rgba(255,255,255,0.5)", lineHeight: 2 }}>
              6620 Dublin Blvd, Dublin CA 94568<br />
              (925) 833-1710<br />
              Mon–Fri 10am–7pm<br />
              Sat 10am–6pm · Sun 11am–5pm
            </div>
          </div>
        </div>
      </div>

      {/* PRICING */}
      <div className="pricing-section">
        <p className="section-label">{data.keyword} Pricing</p>
        <h2 className="section-title">Full Price Menu — <em>No Hidden Fees</em></h2>
        <table className="price-table">
          <thead>
            <tr>
              <th>Service</th>
              <th style={{ textAlign: "center" }}>Duration</th>
              <th>Price</th>
            </tr>
          </thead>
          <tbody>
            {data.pricing.map(row => (
              <tr key={row.name}>
                <td>
                  <div className="pt-name">
                    {row.name}
                    {row.popular && <span className="pt-popular">Popular</span>}
                  </div>
                  <div className="pt-desc">{row.desc}</div>
                </td>
                <td className="pt-duration">{row.duration}</td>
                <td className="pt-price">{row.price}</td>
              </tr>
            ))}
          </tbody>
        </table>
        {data.pricingNote && (
          <div style={{ marginTop: 20, fontSize: 12, color: "#888", fontStyle: "italic", letterSpacing: "0.03em" }}>
            * {data.pricingNote}
          </div>
        )}
      </div>

      {/* FAQ */}
      <div className="faq-section">
        <p className="section-label" style={{ color: GOLD }}>Common Questions</p>
        <h2 className="section-title" style={{ color: "#fff" }}>
          {data.keyword} FAQ — <em>Dublin, CA</em>
        </h2>
        <div className="faq-grid">
          {data.faqs.map(f => <FAQItem key={f.q} q={f.q} a={f.a} />)}
        </div>
      </div>

      {/* NEARBY CITIES */}
      <div className="cities-section">
        <p className="section-label">Serving the East Bay</p>
        <h2 className="section-title">We Also Serve<br /><em>Neighboring Cities</em></h2>
        <div className="cities-grid">
          {NEARBY_CITIES.map(city => (
            <a key={city.name} href={`/${data.keyword.toLowerCase()}-${city.name.toLowerCase().replace(" ", "-")}-ca`} className="city-card">
              <div className="city-name">{city.name}, CA</div>
              <div className="city-dist">{city.dist}</div>
              <div className="city-kw">{city.kw}</div>
            </a>
          ))}
        </div>
      </div>

      {/* FINAL CTA */}
      <div className="final-cta">
        <h2 className="fcta-title">
          Book Your {data.keyword} Appointment Today
        </h2>
        <p className="fcta-sub">
          Threads Beauty Bar & Spa · 6620 Dublin Blvd, Dublin CA · (925) 833-1710
        </p>
        <div className="fcta-btns">
          <a href="https://threadsbeautybar.com" className="btn-black">Book Online Now</a>
          <a href="tel:9258331710" className="btn-black" style={{ background: "rgba(0,0,0,0.15)", color: BLACK }}>
            Call (925) 833-1710
          </a>
          <a href="https://maps.google.com/?q=6620+Dublin+Blvd+Dublin+CA" target="_blank" rel="noopener noreferrer" className="btn-black" style={{ background: "rgba(0,0,0,0.12)", color: BLACK }}>
            Get Directions
          </a>
        </div>
      </div>
    </div>
  );
}

export default function SEOPageTemplates({ defaultPage = "threading" }) {
  const [activePage, setActivePage] = useState(defaultPage);

  return (
    <>
      <style>{styles}</style>

      {/* PAGE SWITCHER — for demo only, remove in production */}
      <div className="page-switcher">
        <span className="ps-label">SEO Pages:</span>
        {Object.values(PAGES).map(p => (
          <button
            key={p.id}
            className={`ps-btn${activePage === p.id ? " active" : ""}`}
            onClick={() => setActivePage(p.id)}
          >
            {p.keyword}
          </button>
        ))}
      </div>

      <LocalPage data={PAGES[activePage]} />
    </>
  );
}
