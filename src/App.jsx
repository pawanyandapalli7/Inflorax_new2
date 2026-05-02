import { useState, useEffect } from "react";
import BookingModal from "./components/BookingModal.jsx";
import { loadPrices, DEFAULT_PRICES } from "./utils/prices.js";

/* ── EDITORIAL PALETTE (Eliah-inspired) ── */
const CREAM   = "#F5F0E8";
const CREAM2  = "#EDE8DE";
const BLACK   = "#0F0F0F";
const DARK    = "#1A1714";
const MID     = "#6B6560";
const LIGHT   = "#A09890";
const ACCENT  = "#C4956A";   // warm terracotta/sand
const ACCENT2 = "#8B6F5E";   // deeper earth
const WHITE   = "#FDFAF6";

const styles = `
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  html { scroll-behavior: smooth; scroll-padding-top: 70px; }
  body {
    font-family: 'DM Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
    background: ${WHITE};
    color: ${BLACK};
    overflow-x: hidden;
    -webkit-font-smoothing: antialiased;
  }

  /* ════════════════════════════════════
     NAV
  ════════════════════════════════════ */
  .nav {
    position: fixed; top: 0; left: 0; right: 0; z-index: 300;
    display: flex; align-items: center; justify-content: space-between;
    padding: 12px 52px;
    background: ${DARK};
    border-bottom: 1px solid rgba(255,255,255,0.06);
    transition: all 0.3s ease;
    min-height: 64px;
  }
  .nav.scrolled {
    padding: 8px 52px;
    box-shadow: 0 4px 32px rgba(0,0,0,0.4);
    min-height: 56px;
  }
  .nav-logo {
    text-decoration: none;
    display: flex; align-items: center;
    flex-shrink: 0; line-height: 0;
  }
  .nav-logo img {
    height: 40px; width: auto;
    display: block; background: transparent;
    max-width: 180px; object-fit: contain;
  }
  .nav.scrolled .nav-logo img { height: 34px; }

  .nav-center {
    display: flex; gap: 36px; align-items: center;
    position: absolute; left: 50%; transform: translateX(-50%);
  }
  .nav-center a {
    font-size: 10px; letter-spacing: 0.18em; text-transform: uppercase;
    color: rgba(255,255,255,0.5); text-decoration: none;
    font-weight: 400; transition: color 0.2s;
  }
  .nav-center a:hover { color: ${ACCENT} !important; }

  .nav-right { display: flex; align-items: center; gap: 20px; }
  .nav-book {
    font-size: 10px; letter-spacing: 0.18em; text-transform: uppercase;
    font-weight: 500; color: ${WHITE};
    background: ${ACCENT}; border: none;
    padding: 10px 22px; transition: all 0.25s; cursor: pointer;
    font-family: 'DM Sans', sans-serif;
  }
  .nav-book:hover { background: ${ACCENT2}; transform: translateY(-1px); }

  /* Hamburger */
  .hamburger {
    display: none; flex-direction: column; gap: 5px;
    background: none; border: none; cursor: pointer; padding: 4px; z-index: 400;
  }
  .hamburger span {
    display: block; width: 22px; height: 1.5px;
    background: ${WHITE}; transition: all 0.3s ease; transform-origin: center;
  }
  .hamburger.open span { background: ${WHITE} !important; }
  .hamburger.open span:nth-child(1) { transform: translateY(6.5px) rotate(45deg); }
  .hamburger.open span:nth-child(2) { opacity: 0; }
  .hamburger.open span:nth-child(3) { transform: translateY(-6.5px) rotate(-45deg); }

  /* Mobile drawer */
  .mob-drawer {
    position: fixed; inset: 0; z-index: 290;
    background: ${WHITE}; display: flex; flex-direction: column;
    align-items: flex-start; justify-content: center;
    padding: 80px 48px;
    transform: translateY(-100%);
    transition: transform 0.5s cubic-bezier(0.16,1,0.3,1);
  }
  .mob-drawer.open { transform: translateY(0); }
  .mob-nav-link {
    font-family: 'DM Serif Display', serif;
    font-size: clamp(32px, 8vw, 52px); font-style: italic;
    color: ${BLACK}; text-decoration: none;
    padding: 12px 0; border-bottom: 1px solid rgba(0,0,0,0.07);
    width: 100%; display: block; transition: color 0.2s;
  }
  .mob-nav-link:hover { color: ${ACCENT}; }
  .mob-book-btn {
    margin-top: 32px;
    font-size: 11px; letter-spacing: 0.22em; text-transform: uppercase;
    font-weight: 500; color: ${WHITE}; background: ${BLACK};
    padding: 16px 40px; border: none; cursor: pointer;
    font-family: 'DM Sans', sans-serif; transition: background 0.2s;
  }
  .mob-book-btn:hover { background: ${ACCENT}; }
  .mob-contact {
    margin-top: 24px; font-size: 12px; color: ${LIGHT};
    letter-spacing: 0.06em;
  }

  /* ════════════════════════════════════
     HERO — Full screen editorial
  ════════════════════════════════════ */
  .hero {
    height: 100vh; min-height: 600px;
    position: relative; overflow: hidden;
    display: grid; grid-template-columns: 1fr 1fr;
  }
  .hero-left {
    background: ${DARK};
    display: flex; flex-direction: column;
    justify-content: flex-end; padding: 80px 60px 120px;
    position: relative; overflow: hidden;
    z-index: 1;
  }
  .hero-left-bg {
    position: absolute; inset: 0;
    background: linear-gradient(160deg, #1a1714 40%, #2a1f1a 100%);
  }
  /* Photo slide area */
  .hero-slides {
    position: absolute; inset: 0; z-index: 0;
  }
  .hero-slide {
    position: absolute; inset: 0;
    opacity: 0; transition: opacity 1.4s ease;
  }
  .hero-slide.active { opacity: 1; }
  .hero-slide-inner {
    width: 100%; height: 100%;
    filter: brightness(0.5) saturate(0.85);
  }
  .hero-text { position: relative; z-index: 2; }
  .hero-eyebrow {
    font-size: 9px; letter-spacing: 0.35em; text-transform: uppercase;
    color: ${ACCENT}; font-weight: 400; margin-bottom: 28px;
    display: flex; align-items: center; gap: 14px;
  }
  .hero-eyebrow::before { content:''; width:32px; height:1px; background:${ACCENT}; }
  .hero-h1 {
    font-family: 'DM Serif Display', serif;
    font-size: clamp(44px, 6vw, 82px);
    font-weight: 400; line-height: 1;
    color: ${WHITE}; margin-bottom: 28px; font-style: italic;
  }
  .hero-h1 span { font-style: normal; display: block; }
  .hero-desc {
    font-size: 14px; color: rgba(255,255,255,0.65);
    line-height: 1.85; max-width: 340px; font-weight: 300;
    margin-bottom: 44px; letter-spacing: 0.02em;
  }
  .hero-actions { display: flex; gap: 14px; align-items: center; flex-wrap: wrap; }
  .btn-fill {
    font-size: 10px; letter-spacing: 0.22em; text-transform: uppercase;
    font-weight: 500; color: ${BLACK}; background: ${CREAM};
    padding: 15px 36px; border: none; cursor: pointer;
    font-family: 'DM Sans', sans-serif; text-decoration: none;
    display: inline-block; transition: all 0.25s;
  }
  .btn-fill:hover { background: ${WHITE}; transform: translateY(-2px); }
  .btn-line {
    font-size: 10px; letter-spacing: 0.22em; text-transform: uppercase;
    font-weight: 400; color: rgba(255,255,255,0.65);
    background: none; border: 1px solid rgba(255,255,255,0.2);
    padding: 15px 36px; cursor: pointer;
    font-family: 'DM Sans', sans-serif; text-decoration: none;
    display: inline-block; transition: all 0.25s;
  }
  .btn-line:hover { border-color: ${ACCENT}; color: ${ACCENT}; }

  /* Mobile-only elements — hidden on desktop */
  .hero-mob-bg { display: none; }
  .hero-mob-overlay { display: none; }

  .hero-right {
    position: relative; overflow: hidden;
    background: ${CREAM2};
  }
  .hero-right-slides {
    position: absolute; inset: 0;
  }
  .hero-right-slide {
    position: absolute; inset: 0;
    opacity: 0; transition: opacity 1.4s ease;
  }
  .hero-right-slide.active { opacity: 1; }
  .hero-right-bg {
    width: 100%; height: 100%;
    object-fit: cover;
    object-position: center top;
    display: block;
  }
  /* Floating stat card — inside hero-right bottom-left */
  .hero-stat-card {
    position: absolute; bottom: 80px; left: 32px;
    background: rgba(253,250,246,0.97);
    backdrop-filter: blur(12px);
    padding: 22px 26px;
    box-shadow: 0 12px 48px rgba(0,0,0,0.18);
    min-width: 160px; z-index: 10;
    border-left: 3px solid ${ACCENT};
  }
  .hsc-num {
    font-family: 'DM Serif Display', serif;
    font-size: 38px; font-style: italic;
    color: ${ACCENT}; line-height: 1;
  }
  .hsc-label {
    font-size: 9px; letter-spacing: 0.2em; text-transform: uppercase;
    color: ${LIGHT}; margin-top: 5px; font-weight: 400;
  }
  /* Slide dots */
  .hero-dots {
    position: absolute; bottom: 48px; right: 0; left: 0;
    display: flex; gap: 8px; justify-content: center; z-index: 5;
  }
  .hdot {
    width: 5px; height: 5px; border-radius: 50%;
    background: rgba(255,255,255,0.3);
    border: none; cursor: pointer; transition: all 0.3s; padding: 0;
  }
  .hdot.active { background: ${ACCENT}; width: 20px; border-radius: 3px; }

  /* Hero bottom strip */
  .hero-bottom {
    position: absolute; bottom: 0; left: 0; right: 0; z-index: 10;
    background: rgba(253,250,246,0.95);
    backdrop-filter: blur(8px);
    display: flex; align-items: center; justify-content: center;
    gap: 0; border-top: 1px solid rgba(0,0,0,0.08);
  }
  .hb-stat {
    flex: 1; text-align: center; padding: 20px 24px;
    border-right: 1px solid rgba(0,0,0,0.08);
  }
  .hb-stat:last-child { border-right: none; }
  .hb-num {
    font-family: 'DM Serif Display', serif;
    font-size: 26px; font-style: italic; color: ${BLACK}; line-height: 1;
  }
  .hb-label {
    font-size: 9px; letter-spacing: 0.2em; text-transform: uppercase;
    color: ${LIGHT}; margin-top: 4px;
  }

  /* ════════════════════════════════════
     TICKER / MARQUEE
  ════════════════════════════════════ */
  .ticker {
    background: ${BLACK};
    padding: 14px 0; overflow: hidden;
  }
  .ticker-track { display: flex; width: max-content; animation: ticker 30s linear infinite; }
  .ticker-item {
    font-size: 10px; letter-spacing: 0.28em; text-transform: uppercase;
    color: rgba(255,255,255,0.5); padding: 0 40px;
    display: flex; align-items: center; gap: 20px; white-space: nowrap;
    font-weight: 300;
  }
  .ticker-sep { color: ${ACCENT}; font-size: 14px; }
  @keyframes ticker { from{transform:translateX(0)} to{transform:translateX(-50%)} }

  /* ════════════════════════════════════
     INTRO STRIP
  ════════════════════════════════════ */
  .intro-strip {
    display: grid; grid-template-columns: 1fr 2px 1fr 2px 1fr;
    background: ${CREAM2}; padding: 0;
  }
  .intro-divider { background: rgba(0,0,0,0.08); }
  .intro-cell {
    padding: 52px 48px;
    display: flex; flex-direction: column; gap: 12px;
  }
  .intro-num {
    font-family: 'DM Serif Display', serif;
    font-size: 48px; font-style: italic; color: ${ACCENT};
    line-height: 1; font-weight: 400;
  }
  .intro-title {
    font-family: 'DM Serif Display', serif;
    font-size: 19px; color: ${BLACK}; font-weight: 400;
  }
  .intro-body { font-size: 13px; color: ${MID}; line-height: 1.8; font-weight: 300; }

  /* ════════════════════════════════════
     SERVICES — Editorial grid
  ════════════════════════════════════ */
  .services-wrap { padding: 100px 52px; background: ${WHITE}; }
  .section-header {
    display: grid; grid-template-columns: 1fr 1fr;
    gap: 48px; align-items: end; margin-bottom: 72px;
  }
  .sec-tag {
    font-size: 9px; letter-spacing: 0.35em; text-transform: uppercase;
    color: ${ACCENT}; font-weight: 400; margin-bottom: 16px;
    display: flex; align-items: center; gap: 12px;
  }
  .sec-tag::before { content:''; width:24px; height:1px; background:${ACCENT}; }
  .sec-h2 {
    font-family: 'DM Serif Display', serif;
    font-size: clamp(32px, 4.5vw, 60px); font-weight: 400;
    line-height: 1.05; color: ${BLACK};
  }
  .sec-h2 em { font-style: italic; color: ${ACCENT2}; }
  .sec-body { font-size: 14px; color: ${MID}; line-height: 1.9; font-weight: 300; }
  .sec-link {
    margin-top: 20px; font-size: 10px; letter-spacing: 0.2em;
    text-transform: uppercase; color: ${BLACK}; text-decoration: none;
    display: inline-flex; align-items: center; gap: 10px;
    font-weight: 500; border-bottom: 1px solid ${BLACK};
    padding-bottom: 2px; cursor: pointer; background: none; border-top: none; border-left: none; border-right: none;
    font-family: 'DM Sans', sans-serif; transition: color 0.2s, border-color 0.2s;
  }
  .sec-link:hover { color: ${ACCENT}; border-bottom-color: ${ACCENT}; }

  /* Horizontal scroll service cards on mobile, grid on desktop */
  .svc-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 2px; background: rgba(0,0,0,0.07);
  }
  .svc-card {
    background: ${WHITE}; padding: 0;
    cursor: pointer; transition: all 0.3s;
    position: relative; overflow: hidden;
    display: flex; flex-direction: column;
  }
  .svc-card:hover { background: ${CREAM}; }
  .svc-photo {
    aspect-ratio: 4/3; overflow: hidden;
    position: relative;
  }
  .svc-photo-bg {
    width: 100%; height: 100%;
    object-fit: cover;
    transition: transform 0.6s ease;
  }
  .svc-card:hover .svc-photo-bg { transform: scale(1.04); }
  .svc-info { padding: 28px 28px 32px; flex: 1; }
  .svc-cat {
    font-size: 9px; letter-spacing: 0.25em; text-transform: uppercase;
    color: ${LIGHT}; font-weight: 400; margin-bottom: 10px;
  }
  .svc-name {
    font-family: 'DM Serif Display', serif;
    font-size: 22px; font-weight: 400; color: ${BLACK};
    margin-bottom: 10px; line-height: 1.2;
  }
  .svc-desc { font-size: 12px; color: ${MID}; line-height: 1.75; font-weight: 300; margin-bottom: 16px; }
  .svc-from {
    font-size: 11px; color: ${ACCENT};
    letter-spacing: 0.06em; font-weight: 400;
    display: flex; align-items: center; justify-content: space-between;
  }
  .svc-arrow { color: ${ACCENT}; font-size: 16px; transition: transform 0.25s; }
  .svc-card:hover .svc-arrow { transform: translate(4px, -4px); }

  /* ════════════════════════════════════
     FEATURE — Split screen
  ════════════════════════════════════ */
  .feature-split {
    display: grid; grid-template-columns: 1fr 1fr; min-height: 600px;
  }
  .feature-photo { position: relative; overflow: hidden; }
  .feature-photo-bg { width: 100%; height: 100%; object-fit: cover; display: block; }
  .feature-content {
    background: ${CREAM2};
    display: flex; flex-direction: column; justify-content: center;
    padding: 80px 64px;
  }
  .feature-content.dark { background: ${DARK}; }
  .feature-quote {
    font-family: 'DM Serif Display', serif;
    font-size: clamp(22px, 3vw, 38px); font-style: italic;
    color: ${WHITE}; line-height: 1.4; margin-bottom: 20px;
    font-weight: 400;
  }
  .feature-attr { font-size: 11px; letter-spacing: 0.15em; text-transform: uppercase; color: rgba(255,255,255,0.35); }
  .feature-stars { color: ${ACCENT}; font-size: 14px; letter-spacing: 3px; margin-bottom: 16px; }

  /* ════════════════════════════════════
     MENU — Clean table style
  ════════════════════════════════════ */
  .menu-wrap { padding: 100px 52px 80px; background: ${CREAM}; }
  .menu-tabs-row {
    display: flex; gap: 0; border-bottom: 1px solid rgba(0,0,0,0.1);
    margin-bottom: 56px; overflow-x: auto;
    scrollbar-width: none; -ms-overflow-style: none;
  }
  .menu-tabs-row::-webkit-scrollbar { display: none; }
  .mtab {
    font-size: 10px; letter-spacing: 0.2em; text-transform: uppercase;
    font-weight: 400; color: ${LIGHT};
    padding: 12px 28px; cursor: pointer;
    border-bottom: 2px solid transparent; white-space: nowrap;
    background: none; border-top: none; border-left: none; border-right: none;
    font-family: 'DM Sans', sans-serif; transition: all 0.2s;
  }
  .mtab.active { color: ${BLACK}; border-bottom-color: ${BLACK}; }
  .mtab:hover:not(.active) { color: ${ACCENT}; }
  .menu-2col { display: grid; grid-template-columns: 1fr 1fr; gap: 0 64px; }
  .menu-row {
    display: flex; align-items: baseline; justify-content: space-between;
    padding: 16px 0; border-bottom: 1px solid rgba(0,0,0,0.07);
  }
  .menu-row:hover { background: none; }
  .mrow-left { display: flex; align-items: baseline; gap: 8px; min-width: 0; flex: 1; }
  .mrow-name {
    font-family: 'DM Serif Display', serif;
    font-size: 18px; font-weight: 400; color: ${BLACK}; font-style: italic;
  }
  .mrow-sub { font-size: 10px; color: ${LIGHT}; letter-spacing: 0.06em; }
  .mrow-dots { flex:1; border-bottom:1px dotted rgba(0,0,0,0.12); margin: 0 12px; min-width:16px; }
  .mrow-price {
    font-family: 'DM Serif Display', serif;
    font-size: 18px; color: ${ACCENT2}; white-space: nowrap;
  }
  .menu-note { margin-top: 28px; font-size: 11px; color: ${LIGHT}; font-style: italic; letter-spacing: 0.04em; }

  /* ════════════════════════════════════
     GALLERY MOSAIC
  ════════════════════════════════════ */
  .gallery-mosaic {
    display: grid;
    grid-template-columns: 2fr 1fr 1fr;
    grid-template-rows: 320px 320px;
    gap: 3px; background: ${DARK};
  }
  .gm-item {
    position: relative; overflow: hidden; cursor: pointer;
  }
  .gm-item:first-child { grid-row: span 2; }
  .gm-bg {
    width: 100%; height: 100%;
    object-fit: cover;
    transition: transform 0.6s ease;
  }
  .gm-item:hover .gm-bg { transform: scale(1.05); }
  .gm-overlay {
    position: absolute; inset: 0;
    background: linear-gradient(to top, rgba(15,15,15,0.7) 0%, transparent 50%);
    opacity: 0; transition: opacity 0.3s;
    display: flex; align-items: flex-end; padding: 24px;
  }
  .gm-item:hover .gm-overlay { opacity: 1; }
  .gm-label {
    font-family: 'DM Serif Display', serif;
    font-size: 18px; font-style: italic; color: ${WHITE};
  }
  /* Gallery CTA bar */
  .gallery-cta-bar {
    background: ${ACCENT}; padding: 28px 52px;
    display: flex; align-items: center; justify-content: space-between; gap: 20px;
    flex-wrap: wrap;
  }
  .gcb-text {
    font-family: 'DM Serif Display', serif;
    font-size: 24px; font-style: italic; color: ${WHITE};
  }
  .btn-dark-sm {
    font-size: 10px; letter-spacing: 0.2em; text-transform: uppercase;
    font-weight: 500; color: ${WHITE}; background: ${DARK};
    padding: 13px 32px; border: none; cursor: pointer;
    font-family: 'DM Sans', sans-serif; text-decoration: none;
    display: inline-block; transition: background 0.2s;
  }
  .btn-dark-sm:hover { background: ${BLACK}; }

  /* ════════════════════════════════════
     TESTIMONIALS — Card carousel style
  ════════════════════════════════════ */
  .testi-wrap { padding: 100px 52px; background: ${WHITE}; }
  .testi-grid { display: grid; grid-template-columns: repeat(3,1fr); gap: 24px; margin-top: 60px; }
  .testi-card {
    border: 1px solid rgba(0,0,0,0.09); padding: 36px;
    position: relative; background: ${WHITE};
    transition: box-shadow 0.3s;
  }
  .testi-card:hover { box-shadow: 0 12px 40px rgba(0,0,0,0.08); }
  .tq-mark {
    font-family: 'DM Serif Display', serif;
    font-size: 64px; font-style: italic;
    color: ${CREAM2}; position: absolute; top: 16px; left: 24px;
    line-height: 1;
  }
  .tq-stars { color: ${ACCENT}; font-size: 11px; letter-spacing: 3px; margin-bottom: 16px; }
  .tq-text {
    font-family: 'DM Serif Display', serif;
    font-size: 16px; font-style: italic; line-height: 1.65;
    color: ${DARK}; margin-bottom: 24px;
  }
  .tq-line { width: 32px; height: 1px; background: ${ACCENT}; margin-bottom: 14px; }
  .tq-name { font-size: 10px; letter-spacing: 0.18em; text-transform: uppercase; color: ${BLACK}; font-weight: 500; }
  .tq-service { font-size: 11px; color: ${LIGHT}; margin-top: 3px; }

  /* ════════════════════════════════════
     LOCATION — Split with real map
  ════════════════════════════════════ */
  .loc-wrap {
    display: grid; grid-template-columns: 1fr 1fr;
    min-height: 560px; background: ${WHITE};
  }
  .loc-left { padding: 80px 64px; display:flex; flex-direction:column; justify-content:center; }
  .loc-item { display:flex; gap:20px; align-items:flex-start; margin-bottom:28px; }
  .loc-icon {
    width:44px; height:44px; background:${ACCENT};
    display:flex; align-items:center; justify-content:center;
    font-size:17px; flex-shrink:0;
  }
  .loc-lbl { font-size:9px; letter-spacing:0.2em; text-transform:uppercase; color:${LIGHT}; margin-bottom:5px; }
  .loc-val {
    font-family:'DM Serif Display',serif;
    font-size:18px; color:${BLACK}; font-style:italic; line-height:1.35;
  }
  .loc-val a { color:${BLACK}; text-decoration:none; }
  .loc-val a:hover { color:${ACCENT}; }
  .hours-section { margin-top:32px; }
  .hours-r {
    display:flex; justify-content:space-between;
    padding:11px 0; border-bottom:1px solid rgba(0,0,0,0.07);
  }
  .hours-r:last-child { border-bottom:none; }
  .hours-d { font-size:11px; text-transform:uppercase; letter-spacing:0.1em; color:${LIGHT}; }
  .hours-t { font-family:'DM Serif Display',serif; font-size:16px; font-style:italic; color:${BLACK}; }
  .hours-t.today { color:${ACCENT}; }
  .loc-right { position:relative; overflow:hidden; background:${CREAM2}; min-height:480px; }
  .loc-map { width:100%; height:100%; border:none; display:block; }
  .map-bar {
    position:absolute; bottom:0; left:0; right:0;
    background:rgba(15,15,15,0.85); padding:18px 24px;
    display:flex; align-items:center; justify-content:space-between; gap:12px;
  }
  .map-bar-addr { font-size:11px; color:rgba(255,255,255,0.6); letter-spacing:0.04em; }
  .map-bar-btn {
    font-size:9px; letter-spacing:0.2em; text-transform:uppercase;
    color:${ACCENT}; border:1px solid rgba(196,149,106,0.4); padding:7px 14px;
    text-decoration:none; font-weight:500; font-family:'DM Sans',sans-serif;
    transition:all 0.2s; white-space:nowrap;
  }
  .map-bar-btn:hover { background:${ACCENT}; color:${WHITE}; }

  /* ════════════════════════════════════
     CTA BAND
  ════════════════════════════════════ */
  .cta-band {
    background: ${BLACK}; padding: 80px 52px;
    display: grid; grid-template-columns: 1fr auto;
    gap: 40px; align-items: center;
  }
  .cta-h {
    font-family: 'DM Serif Display', serif;
    font-size: clamp(28px, 4vw, 52px); font-style: italic;
    color: ${WHITE}; line-height: 1.15; font-weight: 400;
  }
  .cta-h span { color: ${ACCENT}; }
  .cta-btns { display:flex; gap:12px; flex-wrap:wrap; }
  .btn-accent {
    font-size: 10px; letter-spacing: 0.22em; text-transform: uppercase;
    font-weight: 500; color: ${WHITE}; background: ${ACCENT};
    padding: 16px 36px; border: none; cursor: pointer;
    font-family: 'DM Sans', sans-serif; text-decoration: none;
    display: inline-block; transition: all 0.25s;
  }
  .btn-accent:hover { background: ${ACCENT2}; transform: translateY(-2px); }
  .btn-outline-light {
    font-size: 10px; letter-spacing: 0.22em; text-transform: uppercase;
    font-weight: 400; color: rgba(255,255,255,0.65);
    border: 1px solid rgba(255,255,255,0.2); padding: 16px 36px;
    background: none; cursor: pointer; font-family: 'DM Sans', sans-serif;
    text-decoration: none; display: inline-block; transition: all 0.25s;
  }
  .btn-outline-light:hover { border-color: ${ACCENT}; color: ${ACCENT}; }

  /* ════════════════════════════════════
     FOOTER — Premium redesign
  ════════════════════════════════════ */
  .footer {
    background: ${DARK};
    position: relative;
    overflow: hidden;
  }
  /* Subtle top accent line */
  .footer::before {
    content: '';
    position: absolute; top: 0; left: 52px; right: 52px;
    height: 1px;
    background: linear-gradient(to right, transparent, ${ACCENT}, transparent);
    opacity: 0.4;
  }
  /* TOP section — logo centered + tagline */
  .footer-top {
    text-align: center;
    padding: 64px 52px 48px;
    border-bottom: 1px solid rgba(255,255,255,0.06);
  }
  .footer-logo-wrap {
    display: inline-block; margin-bottom: 16px;
  }
  .footer-logo-wrap img {
    height: 72px; width: auto;
    background: transparent;
    display: block;
    margin: 0 auto;
  }
  .footer-tagline {
    font-family: 'DM Serif Display', serif;
    font-size: 15px; font-style: italic;
    color: rgba(255,255,255,0.38); letter-spacing: 0.04em;
    margin-bottom: 28px;
  }
  /* Contact pills row */
  .footer-contact-row {
    display: flex; gap: 12px; justify-content: center; flex-wrap: wrap;
  }
  .footer-contact-pill {
    display: inline-flex; align-items: center; gap: 8px;
    padding: 10px 20px;
    border: 1px solid rgba(255,255,255,0.1);
    color: rgba(255,255,255,0.6); font-size: 12px;
    text-decoration: none; font-family: 'DM Sans', sans-serif;
    font-weight: 400; letter-spacing: 0.04em;
    transition: all 0.2s; border-radius: 0;
    background: rgba(255,255,255,0.03);
  }
  .footer-contact-pill:hover {
    border-color: ${ACCENT}; color: ${ACCENT};
    background: rgba(196,149,106,0.06);
  }
  .footer-contact-pill span { font-size: 14px; }
  /* CTA button in footer top */
  .footer-cta {
    margin-top: 28px;
    display: inline-block;
    font-size: 10px; letter-spacing: 0.22em; text-transform: uppercase;
    font-weight: 600; color: ${WHITE}; background: ${ACCENT};
    padding: 14px 36px; border: none; cursor: pointer;
    font-family: 'DM Sans', sans-serif; transition: all 0.2s;
  }
  .footer-cta:hover { background: ${ACCENT2}; transform: translateY(-2px); }

  /* MIDDLE section — 4 column grid */
  .footer-grid {
    display: grid; grid-template-columns: 1fr 1fr 1fr 1fr;
    gap: 0; border-bottom: 1px solid rgba(255,255,255,0.06);
  }
  .footer-col {
    padding: 40px 36px;
    border-right: 1px solid rgba(255,255,255,0.06);
  }
  .footer-col:last-child { border-right: none; }
  .footer-h {
    font-size: 9px; letter-spacing: 0.28em; text-transform: uppercase;
    color: ${ACCENT}; font-weight: 500; margin-bottom: 18px;
    display: flex; align-items: center; gap: 8px;
  }
  .footer-h::after { content: ''; flex: 1; height: 1px; background: rgba(255,255,255,0.06); }
  .footer-ul { list-style: none; }
  .footer-ul li { margin-bottom: 10px; }
  .footer-ul a {
    font-size: 13px; color: rgba(255,255,255,0.4);
    text-decoration: none; transition: all 0.2s;
    display: inline-flex; align-items: center; gap: 6px;
  }
  .footer-ul a:hover { color: ${ACCENT}; padding-left: 4px; }
  .footer-hours-row {
    display: flex; justify-content: space-between;
    padding: 7px 0; border-bottom: 1px solid rgba(255,255,255,0.04);
    font-size: 11px;
  }
  .footer-hours-row:last-child { border-bottom: none; }
  .footer-hours-day { color: rgba(255,255,255,0.3); letter-spacing: 0.04em; }
  .footer-hours-time { color: rgba(255,255,255,0.55); font-weight: 500; }
  .footer-hours-time.today { color: ${ACCENT}; }
  .footer-serve {
    margin-top: 16px; font-size: 11px;
    color: rgba(255,255,255,0.2); line-height: 1.9;
  }

  /* BOTTOM bar */
  .foot-bot {
    padding: 18px 52px;
    display: flex; justify-content: space-between; align-items: center;
    flex-wrap: wrap; gap: 10px;
    background: rgba(0,0,0,0.25);
  }
  .foot-copy { font-size: 10px; color: rgba(255,255,255,0.18); letter-spacing: 0.06em; }
  .foot-rating { font-size: 10px; color: rgba(255,255,255,0.28); display: flex; align-items: center; gap: 7px; }
  .foot-stars { color: ${ACCENT}; letter-spacing: 2px; }

  /* STICKY CTA */
  .sticky-book {
    position: fixed; bottom: 24px; right: 24px; z-index: 200;
    background: ${ACCENT}; color: ${WHITE};
    padding: 14px 24px; font-size: 10px; letter-spacing: 0.2em;
    min-height: 48px;
    text-transform: uppercase; font-weight: 500; font-family: 'DM Sans', sans-serif;
    border: none; cursor: pointer;
    box-shadow: 0 8px 28px rgba(196,149,106,0.45);
    transition: all 0.3s; opacity: 0; transform: translateY(12px);
    pointer-events: none; text-decoration: none; display: block;
  }
  .sticky-book.show { opacity: 1; transform: translateY(0); pointer-events: auto; }
  .sticky-book:hover { background: ${ACCENT2}; transform: translateY(-2px); }

  /* ════════════════════════════════════
     RESPONSIVE
  ════════════════════════════════════ */
  @media (max-width: 900px) {
    /* Nav */
    .nav { padding: 10px 20px; min-height: 56px; }
    .nav.scrolled { padding: 8px 20px; min-height: 50px; }
    .nav-logo img { height: 32px; max-width: 140px; }
    .nav-center { display: none; }
    .hamburger { display: flex; }
    .nav-book { display: none; }

    /* ── MOBILE HERO ── */
    .hero {
      display: block !important;
      height: 100svh; min-height: 600px;
      position: relative; overflow: hidden;
    }
    .hero-right { display: none !important; }
    .hero-slides { display: none; }
    /* hero-left BECOMES the full-screen photo on mobile */
    .hero-left {
      position: absolute !important;
      top: 0 !important; left: 0 !important;
      right: 0 !important; bottom: 0 !important;
      width: 100% !important;
      height: 100% !important;
      display: flex !important;
      flex-direction: column !important;
      justify-content: flex-end !important;
      padding: 0 24px 140px !important;
      /* Photo as background */
      background-image: var(--mob-bg) !important;
      background-size: cover !important;
      background-position: center top !important;
      background-repeat: no-repeat !important;
      background-color: ${DARK} !important;
    }
    /* Gradient overlay — strong at bottom for readability */
    .hero-left::before {
      content: '';
      position: absolute; top:0; left:0; right:0; bottom:0;
      background: linear-gradient(
        to top,
        rgba(8,6,4,0.95) 0%,
        rgba(8,6,4,0.55) 40%,
        rgba(8,6,4,0.0) 75%
      );
      z-index: 0; pointer-events: none;
    }
    .hero-left-bg { display: none !important; }
    /* All text above overlay */
    .hero-text,
    .hero-eyebrow,
    .hero-actions,
    .hero-h1,
    .hero-desc,
    .hero-dots { position: relative; z-index: 1; }
    .hero-eyebrow { margin-bottom: 14px; font-size: 9px; }
    .hero-h1 {
      font-size: clamp(38px, 10vw, 52px);
      line-height: 0.95; margin-bottom: 14px;
    }
    .hero-desc {
      font-size: 13px; line-height: 1.7;
      color: rgba(255,255,255,0.65);
      margin-bottom: 24px; max-width: 100%;
    }
    .hero-actions { flex-direction: column; gap: 10px; }
    .btn-fill {
      width: 100%; text-align: center;
      padding: 16px; font-size: 11px;
      background: ${ACCENT}; color: #fff;
      letter-spacing: 0.2em;
    }
    .btn-line {
      width: 100%; text-align: center;
      padding: 14px; font-size: 11px;
      border-color: rgba(255,255,255,0.3);
      letter-spacing: 0.18em;
    }
    .hero-stat-card { display: none; }
    /* Dots above actions */
    .hero-dots { position: static; margin-bottom: 18px; justify-content: flex-start; display: flex; }
    /* Bottom stats bar */
    .hero-bottom {
      position: absolute; bottom: 0; left: 0; right: 0;
      z-index: 4; flex-wrap: nowrap; overflow-x: auto;
      background: rgba(8,6,4,0.85);
      backdrop-filter: blur(10px);
      border-top: 1px solid rgba(255,255,255,0.08);
    }
    .hb-stat { min-width: 80px; padding: 14px 10px; border-right: 1px solid rgba(255,255,255,0.1); }
    .hb-num { font-size: 18px; color: #fff !important; font-style: italic; }
    .hb-label { font-size: 7px; color: rgba(255,255,255,0.5) !important; letter-spacing: 0.12em; }

    /* Intro */
    .intro-strip {
      display: flex; overflow-x: auto;
      scroll-snap-type: x mandatory;
      -webkit-overflow-scrolling: touch;
    }
    .intro-divider { width: 1px; height: auto; flex-shrink: 0; }
    .intro-cell { min-width: 80vw; scroll-snap-align: start; padding: 32px 28px; flex-shrink: 0; }

    /* Services */
    .services-wrap { padding: 64px 24px; }
    .section-header { grid-template-columns: 1fr; gap: 16px; }
    /* ── SERVICES: horizontal swipe carousel on mobile ── */
    .services-wrap { padding: 56px 0 56px; }
    .services-wrap .section-header { padding: 0 24px; margin-bottom: 32px; }
    .svc-grid {
      display: flex !important;
      flex-direction: row !important;
      overflow-x: auto !important;
      overflow-y: hidden !important;
      gap: 12px !important;
      scroll-snap-type: x mandatory;
      -webkit-overflow-scrolling: touch;
      background: none !important;
      padding: 0 24px 24px !important;
      /* Show partial next card as hint */
    }
    .svc-card {
      min-width: 78vw !important;
      max-width: 78vw !important;
      scroll-snap-align: start;
      flex-shrink: 0 !important;
      background: #fff;
      border-radius: 0;
      box-shadow: 0 4px 24px rgba(0,0,0,0.09);
      /* Fixed height so cards don't collapse */
      display: flex !important;
      flex-direction: column !important;
    }
    .svc-photo {
      aspect-ratio: 4/3 !important;
      flex-shrink: 0;
      overflow: hidden;
    }
    .svc-photo-bg {
      width: 100% !important;
      height: 100% !important;
      object-fit: cover !important;
    }
    .svc-info { flex: 1; }
    /* Swipe hint label */
    .svc-grid-hint {
      display: flex;
      align-items: center;
      gap: 6px;
      padding: 0 24px 16px;
      font-size: 10px;
      letter-spacing: 0.15em;
      text-transform: uppercase;
      color: ${MID};
      font-weight: 400;
    }
    .svc-grid-hint::before {
      content: '←';
      font-size: 14px;
      animation: swipeHint 1.5s ease-in-out infinite;
    }
    @keyframes swipeHint {
      0%, 100% { transform: translateX(0); opacity: 0.4; }
      50% { transform: translateX(6px); opacity: 1; }
    }

    /* Feature split */
    .feature-split { grid-template-columns: 1fr; }
    .feature-photo { aspect-ratio: 4/3; min-height: 0; }
    .feature-content { padding: 48px 28px; }

    /* Menu */
    .menu-wrap { padding: 64px 24px; }
    .menu-2col { grid-template-columns: 1fr; }

    /* Gallery */
    .gallery-mosaic {
      grid-template-columns: 1fr 1fr;
      grid-template-rows: 200px 200px;
    }
    .gm-item:first-child { grid-row: auto; grid-column: span 2; aspect-ratio: 16/9; }
    .gallery-cta-bar { padding: 24px 28px; }

    /* Testimonials */
    .testi-wrap { padding: 64px 24px; }
    .testi-grid {
      display: flex;
      overflow-x: auto;
      scroll-snap-type: x mandatory;
      -webkit-overflow-scrolling: touch;
      gap: 16px;
      margin: 0 -24px;
      padding: 0 24px 16px;
    }
    .testi-card {
      min-width: 85vw;
      scroll-snap-align: start;
      flex-shrink: 0;
    }

    /* Packages */

    /* Location */
    .loc-wrap { grid-template-columns: 1fr; }
    .loc-left { padding: 56px 28px; }
    .loc-right { min-height: 320px; }

    /* CTA Band */
    .cta-band { grid-template-columns: 1fr; padding: 56px 24px; gap: 28px; }

    /* Footer */
    .footer-top { padding: 48px 24px 36px; }
    .footer-logo-wrap img { height: 60px; }
    .footer-contact-pill { font-size: 11px; padding: 9px 16px; }
    .footer-grid { grid-template-columns: 1fr 1fr; }
    .footer-col { padding: 28px 20px; }
    .foot-bot { padding: 14px 24px; flex-direction: column; text-align: center; gap: 6px; }

    /* Sticky */
    .sticky-book { bottom: 16px; right: 16px; left: 16px; text-align: center; }
  }

  /* Hide scrollbars on horizontal scroll containers */
  .svc-grid::-webkit-scrollbar,
  .testi-grid::-webkit-scrollbar,
  .intro-strip::-webkit-scrollbar { display: none; }
  .svc-grid, .testi-grid, .intro-strip { scrollbar-width: none; }

  @media (max-width: 540px) {
    .footer-grid { grid-template-columns: 1fr; }
    .footer-col { border-right: none; border-bottom: 1px solid rgba(255,255,255,0.06); padding: 24px 20px; }
    .footer-contact-row { flex-direction: column; align-items: center; }
    .gallery-mosaic { grid-template-columns: 1fr 1fr; }
    .gm-item:first-child { grid-column: span 2; aspect-ratio: 16/9; }
    .svc-card { min-width: 86vw !important; max-width: 86vw !important; }
    .hb-stat { padding: 14px 12px; }
    .hb-num { font-size: 20px; }
    .hb-label { font-size: 8px; }
  }
`;

/* ── DATA ── */
const TABS = ["Threading","Facials","Waxing","Hair","Massage","Henna"];

// Prices loaded from localStorage (admin edits) or defaults
function getMenuPrices() {
  try { return loadPrices(); } catch { return DEFAULT_PRICES; }
}

const SVCS = [
  { cat:"Signature Service", name:"Threading",     photo:"threading.jpg",     desc:"Precision brow shaping and full-face threading with 100% cotton thread. Our most requested service.", from:"From $10", bg:"linear-gradient(160deg,#2a1e18,#C4956A44)" },
  { cat:"Skincare",          name:"Facials",        photo:"facials.jpg",        desc:"From express 25-min treatments to 90-min HydraFacials. Custom add-ons available.", from:"From $55", bg:"linear-gradient(160deg,#1a1714,#8B6F5E44)" },
  { cat:"Body",              name:"Waxing",         photo:"waxing.jpg",         desc:"Full-body waxing in private rooms. No double-dip policy. Brazilian packages available.", from:"From $12", bg:"linear-gradient(160deg,#2D1B2E,#C4956A33)" },
  { cat:"Hair",              name:"Hair Services",  photo:"hair_services.jpg",  desc:"Precision cuts, color, highlights, Keratin treatments, and styling for every occasion.", from:"From $25", bg:"linear-gradient(160deg,#1a1714,#C4956A44)" },
  { cat:"Wellness",          name:"Head Massage",   photo:"head_massage.jpg",   desc:"Indian head massage with or without warm oil — 10 to 30 minutes in our private room.", from:"From $20", bg:"linear-gradient(160deg,#1a1714,#8B6F5E55)" },
  { cat:"Art",               name:"Henna",          photo:"henna.jpg",          desc:"Traditional mehendi and custom henna art for weddings, events, and personal expression.", from:"From $10", bg:"linear-gradient(160deg,#2a1e18,#C4956A33)" },
];

const TESTIMONIALS = [
  { text:"The most precise brow threading I've ever had. I drive from Pleasanton just for this.", author:"Priya M.", service:"Threading", stars:5 },
  { text:"My HydraFacial left me absolutely glowing. The esthetician really took time to understand my skin.", author:"Jennifer L.", service:"Hydra Facial", stars:5 },
  { text:"Fast, professional Brazilian wax. Clean, private room. I won't go anywhere else now.", author:"Daniela R.", service:"Brazilian Wax", stars:5 },
  { text:"My wedding henna was beyond beautiful. Every guest asked who did it. Truly artistic.", author:"Ananya K.", service:"Bridal Henna", stars:5 },
  { text:"Best highlights I've had in years. Natural, dimensional, exactly what I asked for.", author:"Melissa T.", service:"Full Color", stars:5 },
  { text:"The head massage in the private room is pure meditation. I come every month.", author:"Sunita A.", service:"Head Massage", stars:5 },
];

const HERO_SLIDES = [
  { left:"linear-gradient(160deg,#1a1714,#2a1e18)", right:"linear-gradient(160deg,#C4956A22,#EDE8DE)" },
  { left:"linear-gradient(160deg,#1a1714,#1e1518)", right:"linear-gradient(160deg,#8B6F5E22,#F5F0E8)" },
  { left:"linear-gradient(160deg,#1c1814,#2a2018)", right:"linear-gradient(160deg,#C4956A33,#EDE8DE)" },
];

const GALLERY_ITEMS = [
  { bg:"linear-gradient(160deg,#2a1e18,#C4956A55)", label:"Threading" },
  { bg:"linear-gradient(160deg,#1a1714,#8B6F5E44)", label:"Facials" },
  { bg:"linear-gradient(160deg,#2D1B2E,#C4956A33)", label:"Hair" },
  { bg:"linear-gradient(160deg,#1a1714,#C4956A44)", label:"Waxing" },
  { bg:"linear-gradient(160deg,#2a1e18,#8B6F5E55)", label:"Henna" },
];

const TICKER = ["Threading","Waxing","HydraFacials","Hair Color","Henna","Head Massage","Brazilian Wax","Keratin Treatments","Bridal Services","4.5★ on Google"];

export default function App() {
  const [scrolled, setScrolled]   = useState(false);
  const [sticky, setSticky]       = useState(false);
  const [tab, setTab]             = useState("Threading");
  const [modal, setModal]         = useState(false);
  const [menuOpen, setMenuOpen]   = useState(false);
  const [slide, setSlide]         = useState(0);

  useEffect(() => {
    const fn = () => { setScrolled(window.scrollY > 60); setSticky(window.scrollY > 500); };
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  useEffect(() => {
    const t = setInterval(() => setSlide(s => (s+1) % HERO_SLIDES.length), 5500);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    document.body.style.overflow = (modal || menuOpen) ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [modal, menuOpen]);

  const open = (e) => { e?.preventDefault(); setModal(true); setMenuOpen(false); };
  const close = () => setModal(false);

  const phone    = "(925) 833-1710";
  const mapsUrl  = "https://maps.google.com/?q=6620+Dublin+Blvd+Dublin+CA+94568";
  const mapsEmbed = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d787.7!2d-121.9019!3d37.7160!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x808fe8e6e0b7c935%3A0x91ab9d18bf5f9eff!2s6620%20Dublin%20Blvd%2C%20Dublin%2C%20CA%2094568!5e0!3m2!1sen!2sus!4v1700000000000!5m2!1sen!2sus";

  const todayIdx = new Date().getDay();
  const HOURS = [
    { d:"Monday",            t:"Closed",             days:[1] },
    { d:"Tue – Thu",         t:"10:30 AM – 6:30 PM", days:[2,3,4] },
    { d:"Friday",            t:"10:00 AM – 6:30 PM", days:[5] },
    { d:"Sat & Sun",         t:"10:00 AM – 5:00 PM", days:[0,6] },
  ];

  const [liveMenu, setLiveMenu] = useState(() => {
    try { return loadPrices(); } catch { return DEFAULT_PRICES; }
  });

  // Reload prices on focus (in case admin updated in another tab)
  useEffect(() => {
    const reload = () => {
      try { setLiveMenu(loadPrices()); } catch {}
    };
    window.addEventListener("focus", reload);
    return () => window.removeEventListener("focus", reload);
  }, []);

  const doubled = [...TICKER,...TICKER];
  const items   = liveMenu[tab] || [];
  const half    = Math.ceil(items.length / 2);

  return (
    <>
      <style>{styles}</style>

      {/* NAV */}
      <nav className={`nav${scrolled ? " scrolled" : ""}`}>
        <a href="/" className="nav-logo">
          <img src="/logo.png" alt="Threads Beauty Bar & Spa" />
        </a>
        <div className="nav-center">
          {[["#services","Services"],["#menu","Pricing"],["#gallery","Gallery"],["#reviews","Reviews"],["#location","Location"]].map(([h,l]) => (
            <a key={l} href={h}>{l}</a>
          ))}
        </div>
        <div className="nav-right">
          <button className="nav-book" onClick={open}>Book Now</button>
          <button className={`hamburger${menuOpen?" open":""}`} onClick={()=>setMenuOpen(m=>!m)} aria-label="Menu">
            <span/><span/><span/>
          </button>
        </div>
      </nav>

      {/* MOBILE DRAWER */}
      <div className={`mob-drawer${menuOpen?" open":""}`}>
        <img src="/logo.png" alt="Threads Beauty Bar & Spa"
          style={{height:"56px",width:"auto",marginBottom:"36px",objectFit:"contain"}} />
        {[["#services","Services"],["#menu","Pricing"],["#gallery","Gallery"],["#reviews","Reviews"],["#location","Location"]].map(([h,l])=>(
          <a key={l} href={h} className="mob-nav-link" onClick={()=>setMenuOpen(false)}>{l}</a>
        ))}
        <button className="mob-book-btn" onClick={open}>Book an Appointment</button>
        <div className="mob-contact">6620 Dublin Blvd, Dublin CA · {phone}</div>
      </div>

      {/* HERO */}
      <section className="hero">
        <div className="hero-left" style={{
          '--mob-bg': `url('/photos/hero-${slide+1}.jpg')`
        }}>
          {HERO_SLIDES.map((s,i) => (
            <div key={i} className={`hero-slide${slide===i?" active":""}`}>
              <div className="hero-slide-inner" style={{background:s.left}} />
            </div>
          ))}
          <div className="hero-left-bg" style={{mixBlendMode:"multiply"}} />

          <div className="hero-text">
            <p className="hero-eyebrow">Dublin, California · Est. in the East Bay</p>
            <h1 className="hero-h1">
              <span>Where</span>
              Precision<br/>
              Meets<br/>
              <em>Beauty.</em>
            </h1>
            <p className="hero-desc">
              Full-service beauty salon specializing in threading, waxing,
              facials, hair, head massage & henna. Dublin's most trusted — 4.5★ on Google.
            </p>
            <div className="hero-actions">
              <a href="#" className="btn-fill" onClick={open}>Book Appointment</a>
              <a href={`tel:${phone}`} className="btn-line">Call {phone}</a>
            </div>
          </div>

          <div className="hero-dots" style={{position:"static",marginTop:40,justifyContent:"flex-start"}}>
            {HERO_SLIDES.map((_,i) => (
              <button key={i} className={`hdot${slide===i?" active":""}`} onClick={()=>setSlide(i)} />
            ))}
          </div>
        </div>

        <div className="hero-right">
          {HERO_SLIDES.map((s,i) => (
            <div key={i} className={`hero-right-slide${slide===i?" active":""}`}>
              <img
                src={`/photos/hero-${i+1}.jpg`}
                alt={s.label}
                className="hero-right-bg"
                loading={i===0?"eager":"lazy"}
                style={{width:"100%",height:"100%",objectFit:"cover",objectPosition:"center top"}}
                onError={e=>{e.target.style.display="none";e.target.parentNode.style.background=s.right;}}
              />
            </div>
          ))}
          {/* Floating stat card */}
          <div className="hero-stat-card">
            <div className="hsc-num">4.5★</div>
            <div className="hsc-label">Google Rating</div>
            <div style={{marginTop:16,paddingTop:16,borderTop:"1px solid rgba(0,0,0,0.07)"}}>
              <div className="hsc-num" style={{fontSize:32}}>94+</div>
              <div className="hsc-label">Verified Reviews</div>
            </div>
          </div>
        </div>

        {/* Bottom stats bar */}
        <div className="hero-bottom">
          {[["4.5★","Google Rating"],["94+","Reviews"],["6","Services"],["10+","Years in Dublin"],["Walk-ins","Welcome"]].map(([n,l]) => (
            <div className="hb-stat" key={l}>
              <div className="hb-num">{n}</div>
              <div className="hb-label">{l}</div>
            </div>
          ))}
        </div>
      </section>

      {/* TICKER */}
      <div className="ticker">
        <div className="ticker-track">
          {[...doubled,...doubled].map((item,i) => (
            <span className="ticker-item" key={i}>
              {item}<span className="ticker-sep">✦</span>
            </span>
          ))}
        </div>
      </div>

      {/* INTRO STRIP */}
      <div className="intro-strip">
        {[
          { num:"01", title:"Precision Threading", body:"Cotton thread. Zero chemicals. Every brow mapped to your bone structure for flattering, symmetrical results." },
          { num:"02", title:"Medical-Grade Clean", body:"Single-use applicators, strict sanitation. No double-dip — ever. Your safety is our non-negotiable standard." },
          { num:"03", title:"Full Service, One Roof", body:"Threading, waxing, facials, hair, massage, henna — your entire beauty routine without changing salons." },
        ].map((c,i) => (
          <div key={c.num} style={{display:"contents"}}>
            {i > 0 && <div className="intro-divider" />}
            <div className="intro-cell">
              <div className="intro-num">{c.num}</div>
              <div className="intro-title">{c.title}</div>
              <div className="intro-body">{c.body}</div>
            </div>
          </div>
        ))}
      </div>

      {/* SERVICES */}
      <section className="services-wrap" id="services">
        <div className="section-header">
          <div>
            <p className="sec-tag">Our Services</p>
            <h2 className="sec-h2">Six Ways to<br/><em>Elevate</em> Your Look</h2>
          </div>
          <div>
            <p className="sec-body">
              From precision brow threading to transformative facials and vibrant hair color,
              every service is delivered with expert technique and genuine care.
              One visit — and you'll understand the difference.
            </p>
            <button className="sec-link" onClick={open}>Book an Appointment →</button>
          </div>
        </div>
        {/* Swipe hint — mobile only */}
        <div className="svc-grid-hint">Swipe to explore</div>
        <div className="svc-grid">
          {SVCS.map(s => (
            <div className="svc-card" key={s.name} onClick={open}>
              <div className="svc-photo">
                <img
                  src={`/photos/${s.photo}`}
                  alt={s.name}
                  className="svc-photo-bg"
                  style={{width:"100%",height:"100%",objectFit:"cover"}}
                  onError={e=>{e.target.style.display="none";e.target.parentNode.style.background=s.bg;}}
                />
              </div>
              <div className="svc-info">
                <div className="svc-cat">{s.cat}</div>
                <div className="svc-name">{s.name}</div>
                <div className="svc-desc">{s.desc}</div>
                <div className="svc-from">
                  <span>{s.from}</span>
                  <span className="svc-arrow">↗</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FEATURE SPLIT — review + visual */}
      <div className="feature-split">
        <div className="feature-photo">
          <img
            src="/photos/feature.jpg"
            alt="Threads Beauty Bar"
            className="feature-photo-bg"
            style={{width:"100%",height:"100%",objectFit:"cover",minHeight:480}}
            onError={e=>{e.target.style.display="none";e.target.parentNode.style.background="linear-gradient(160deg,#2a1e18,#C4956A33)";}}
          />
        </div>
        <div className="feature-content dark">
          <div className="feature-stars">★★★★★</div>
          <div className="feature-quote">
            "The most precise brow threading I've ever had.<br/>I don't trust anyone else — period."
          </div>
          <div className="feature-attr">— Priya M., Verified Google Review</div>
          <div style={{marginTop:36,paddingTop:36,borderTop:"1px solid rgba(255,255,255,0.1)"}}>
            <p className="sec-tag" style={{color:ACCENT}}>4.5★ on Google · 94+ Reviews</p>
            <p style={{fontSize:13,color:"rgba(255,255,255,0.4)",lineHeight:1.8,fontWeight:300}}>
              Dublin's most-reviewed beauty salon for threading, waxing and facials.
              Walk-ins welcome. Appointments preferred.
            </p>
            <button className="sec-link" style={{color:ACCENT,borderColor:ACCENT,marginTop:20}} onClick={open}>
              Book Your Visit →
            </button>
          </div>
        </div>
      </div>

      {/* PRICING MENU */}
      <section className="menu-wrap" id="menu">
        <div style={{maxWidth:1100,margin:"0 auto"}}>
          <div className="section-header" style={{marginBottom:0}}>
            <div>
              <p className="sec-tag">Pricing</p>
              <h2 className="sec-h2">Full Price Menu,<br/><em>No Surprises</em></h2>
            </div>
            <p className="sec-body">
              Select multiple services when booking — we'll schedule them in one seamless visit.
              All prices are transparent and fixed.
            </p>
          </div>
          <div className="menu-tabs-row" style={{marginTop:48}}>
            {TABS.map(t => (
              <button key={t} className={`mtab${tab===t?" active":""}`} onClick={()=>setTab(t)}>{t}</button>
            ))}
          </div>
          <div className="menu-2col">
            {[items.slice(0,half), items.slice(half)].map((col,ci) => (
              <div key={ci}>
                {col.map((item,i) => (
                  <div className="menu-row" key={i}>
                    <div className="mrow-left">
                      <span className="mrow-name">{item.name}</span>
                      {item.sub && <span className="mrow-sub">({item.sub})</span>}
                    </div>
                    <div className="mrow-dots" />
                    <span className="mrow-price">{item.price}</span>
                  </div>
                ))}
              </div>
            ))}
          </div>

          <div style={{textAlign:"center",marginTop:52}}>
            <button className="btn-accent" onClick={open}>Book Multiple Services →</button>
          </div>
        </div>
      </section>

      {/* GALLERY MOSAIC */}
      <div id="gallery">
        <div className="gallery-mosaic">
          {GALLERY_ITEMS.map((item,i) => (
            <div className="gm-item" key={i} onClick={open}>
              <img
                src={`/photos/gallery-${i+1}.jpg`}
                alt={item.label}
                className="gm-bg"
                style={{objectFit:"cover",width:"100%",height:"100%",minHeight:200}}
                onError={e=>{e.target.style.display="none";e.target.parentNode.style.background=item.bg;}}
              />
              <div className="gm-overlay">
                <span className="gm-label">{item.label}</span>
              </div>
            </div>
          ))}
        </div>
        <div className="gallery-cta-bar">
          <div className="gcb-text">"Results that speak for themselves"</div>
          <a href="#" className="btn-dark-sm" onClick={open}>Book Your Appointment</a>
        </div>
      </div>

      {/* CTA BAND */}
      <div className="cta-band">
        <div className="cta-h">
          Ready for your best brows?<br/>
          <span>Book in under 60 seconds.</span>
        </div>
        <div className="cta-btns">
          <button className="btn-accent" onClick={open}>Book Online Now</button>
          <a href={`tel:${phone}`} className="btn-outline-light">Call {phone}</a>
        </div>
      </div>

      {/* TESTIMONIALS */}
      <section className="testi-wrap" id="reviews">
        <div className="section-header">
          <div>
            <p className="sec-tag">Client Reviews</p>
            <h2 className="sec-h2">What Dublin<br/><em>Is Saying</em></h2>
          </div>
          <div>
            <p className="sec-body">
              94+ verified Google reviews. 4.5 stars. Real clients, real results.
              Here's what they say after their first — and every — visit.
            </p>
            <a href="https://g.page/r/threads-beauty-bar-dublin" target="_blank" rel="noopener noreferrer"
              className="sec-link" style={{display:"inline-flex"}}>
              Read All Google Reviews →
            </a>
          </div>
        </div>
        <div className="testi-grid">
          {TESTIMONIALS.map(t => (
            <div className="testi-card" key={t.author}>
              <div className="tq-mark">"</div>
              <div className="tq-stars">{"★".repeat(t.stars)}</div>
              <div className="tq-text">"{t.text}"</div>
              <div className="tq-line" />
              <div className="tq-name">{t.author}</div>
              <div className="tq-service">{t.service}</div>
            </div>
          ))}
        </div>
      </section>

      {/* LOCATION */}
      <section className="loc-wrap" id="location">
        <div className="loc-left">
          <p className="sec-tag">Find Us</p>
          <h2 className="sec-h2" style={{marginBottom:40}}>Visit <em>Threads</em></h2>
          {[
            { icon:"📍", lbl:"Address", val:<a href={mapsUrl} target="_blank" rel="noopener noreferrer">6620 Dublin Blvd<br/>Dublin, CA 94568</a> },
            { icon:"📞", lbl:"Phone", val:<a href={`tel:${phone}`}>{phone}</a> },
            { icon:"🌐", lbl:"Website", val:<a href="https://threads2-five.vercel.app" style={{color:ACCENT}}>threads2-five.vercel.app</a> },
          ].map(r => (
            <div className="loc-item" key={r.lbl}>
              <div className="loc-icon">{r.icon}</div>
              <div><div className="loc-lbl">{r.lbl}</div><div className="loc-val">{r.val}</div></div>
            </div>
          ))}
          <div className="hours-section">
            {HOURS.map(h => (
              <div className="hours-r" key={h.d}>
                <span className="hours-d">{h.d}</span>
                <span className={`hours-t${h.days.includes(todayIdx)?" today":""}`}>{h.t}</span>
              </div>
            ))}
          </div>
          <div style={{marginTop:32,display:"flex",gap:12,flexWrap:"wrap"}}>
            <button className="btn-accent" onClick={open}>Book Now</button>
            <a href={mapsUrl} target="_blank" rel="noopener noreferrer"
              style={{fontSize:10,letterSpacing:"0.18em",textTransform:"uppercase",fontWeight:500,
                padding:"13px 24px",color:ACCENT,border:`1px solid ${ACCENT}`,textDecoration:"none",
                fontFamily:"'DM Sans',sans-serif",display:"inline-block",transition:"all 0.2s"}}>
              Get Directions →
            </a>
          </div>
        </div>
        <div className="loc-right">
          <iframe
            src={mapsEmbed}
            className="loc-map"
            style={{minHeight:480}}
            allowFullScreen="" loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Threads Beauty Bar location"
          />
          <div className="map-bar">
            <span className="map-bar-addr">6620 Dublin Blvd, Dublin, CA 94568</span>
            <a href={mapsUrl} target="_blank" rel="noopener noreferrer" className="map-bar-btn">Open in Maps ↗</a>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="footer">

        {/* ── TOP: Logo + Contact ── */}
        <div className="footer-top">
          <div className="footer-logo-wrap">
            <img src="/logo.png" alt="Threads Beauty Bar and Spa" style={{background:"transparent"}} />
          </div>
          <div className="footer-tagline">
            Dublin's premier full-service beauty destination
          </div>
          <div className="footer-contact-row">
            <a href={`tel:${phone}`} className="footer-contact-pill">
              <span>📞</span> {phone}
            </a>
            <a href={mapsUrl} target="_blank" rel="noopener noreferrer" className="footer-contact-pill">
              <span>📍</span> 6620 Dublin Blvd, Dublin CA
            </a>
            <a href="https://threads2-five.vercel.app" className="footer-contact-pill">
              <span>🌐</span> threads2-five.vercel.app
            </a>
          </div>
          <button className="footer-cta" onClick={open}>
            Book an Appointment
          </button>
        </div>

        {/* ── MIDDLE: 4-col grid ── */}
        <div className="footer-grid">
          <div className="footer-col">
            <div className="footer-h">Services</div>
            <ul className="footer-ul">
              {["Threading","Waxing","Facials","Hair Services","Head Massage","Henna & Events"].map(s=>(
                <li key={s}><a href="#services" onClick={open}>{s}</a></li>
              ))}
            </ul>
          </div>
          <div className="footer-col">
            <div className="footer-h">Hours</div>
            {[
              ["Monday","Closed",[1]],
              ["Tue – Thu","10:30am – 6:30pm",[2,3,4]],
              ["Friday","10:00am – 6:30pm",[5]],
              ["Sat & Sun","10:00am – 5:00pm",[0,6]],
            ].map(([day,time,days])=>(
              <div className="footer-hours-row" key={day}>
                <span className="footer-hours-day">{day}</span>
                <span className={`footer-hours-time${days.includes(todayIdx)?" today":""}`}>{time}</span>
              </div>
            ))}
            <div style={{marginTop:16,fontSize:11,color:"rgba(255,255,255,0.2)",lineHeight:1.7}}>
              Walk-ins welcome<br/>Appointments preferred
            </div>
          </div>
          <div className="footer-col">
            <div className="footer-h">Visit</div>
            <ul className="footer-ul">
              <li><a href={mapsUrl} target="_blank" rel="noopener noreferrer">6620 Dublin Blvd<br/>Dublin, CA 94568</a></li>
              <li><a href={`tel:${phone}`}>{phone}</a></li>
              <li><a href={mapsUrl} target="_blank" rel="noopener noreferrer">Get Directions →</a></li>
            </ul>
            <div className="footer-serve">
              Serving Dublin · Pleasanton<br/>San Ramon · Livermore
            </div>
          </div>
          <div className="footer-col">
            <div className="footer-h">Policies</div>
            <ul className="footer-ul">
              <li><a href="#">24-Hour Cancellation</a></li>
              <li><a href="#">Arrive 15 Min Early</a></li>
              <li><a href="#">Walk-ins Welcome</a></li>
              <li><a href="#">All Skin Types Welcome</a></li>
              <li><a href="#">Children Safety Policy</a></li>
            </ul>
          </div>
        </div>

      </footer>

      {/* ── BOTTOM BAR ── */}
      <div className="foot-bot">
        <div className="foot-copy">© 2026 Threads Beauty Bar and Spa · Dublin, CA 94568</div>
        <div className="foot-rating">
          <span className="foot-stars">★★★★★</span> 4.5 · 94 Google Reviews
        </div>
      </div>

      {/* STICKY CTA */}
      <button className={`sticky-book${sticky?" show":""}`} onClick={open} aria-label="Book appointment">
        Book Appointment →
      </button>

      {/* BOOKING MODAL */}
      <BookingModal open={modal} onClose={close} />
    </>
  );
}
