# Threads Beauty Bar & Spa — Website

**Full website for Threads Beauty Bar & Spa, 6620 Dublin Blvd, Dublin, CA 94568**

Built with React + Vite. No Tailwind required — all styling is inline CSS-in-JS for zero dependencies.

---

## 🚀 Quick Start

```bash
# 1. Clone the repo
git clone https://github.com/YOUR_USERNAME/threads-beauty-bar.git
cd threads-beauty-bar

# 2. Install dependencies
npm install

# 3. Run locally
npm run dev
# → Opens at http://localhost:5173

# 4. Build for production
npm run build
# → Output in /dist folder
```

---

## 📁 Project Structure

```
threads-beauty-bar/
├── index.html                  ← SEO meta, schema markup, entry point
├── vite.config.js
├── vercel.json                 ← Vercel SPA routing
├── public/
│   ├── favicon.svg
│   └── _redirects              ← Netlify SPA routing
└── src/
    ├── main.jsx                ← React Router setup, all routes
    ├── App.jsx                 ← Homepage (hero, services, menu, testimonials)
    ├── components/
    │   ├── BookingModal.jsx    ← 4-step booking flow overlay
    │   ├── BeforeAfterGallery.jsx  ← Filterable gallery + lightbox
    │   └── SEOPageTemplates.jsx   ← Threading, Waxing, Facials SEO pages
    └── pages/
        ├── ThreadingPage.jsx   ← /threading-dublin-ca
        ├── WaxingPage.jsx      ← /waxing-dublin-ca
        ├── FacialsPage.jsx     ← /facials-dublin-ca
        └── GalleryPage.jsx     ← /gallery
```

---

## 🌐 Routes

| URL | Page | Purpose |
|-----|------|---------|
| `/` | Homepage | Main conversion page |
| `/threading-dublin-ca` | Threading | Local SEO — "threading Dublin CA" |
| `/waxing-dublin-ca` | Waxing | Local SEO — "waxing Dublin CA" |
| `/facials-dublin-ca` | Facials | Local SEO — "facials Dublin CA" |
| `/gallery` | Gallery | Before/after showcase |

---

## ☁️ Deploy to Vercel (Recommended — Free)

1. Push this repo to GitHub
2. Go to [vercel.com](https://vercel.com) → "Add New Project"
3. Import your GitHub repo
4. Settings:
   - **Framework**: Vite
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
5. Click **Deploy** — live in ~60 seconds
6. Add your custom domain in Vercel Settings → Domains → `threadsbeautybar.com`

---

## ☁️ Deploy to Netlify (Alternative — Free)

1. Push to GitHub
2. Go to [netlify.com](https://netlify.com) → "Add new site" → "Import from Git"
3. Settings:
   - **Build command**: `npm run build`
   - **Publish directory**: `dist`
4. The `public/_redirects` file handles SPA routing automatically

---

## 🔧 Customization Guide

### Update Business Info
All contact info is defined at the top of `src/App.jsx`:
```js
const bookingUrl = "https://threadsbeautybar.com";  // ← Your booking link
const phone = "(925) 833-1710";
const address = "6620 Dublin Blvd, Dublin, CA 94568";
```

### Connect Real Online Booking
In `src/components/BookingModal.jsx`, replace the success screen logic with your booking API:
```js
// Replace the setDone(true) call with your API:
const response = await fetch("https://your-booking-api.com/appointments", {
  method: "POST",
  body: JSON.stringify({ service, date, time, ...form })
});
```

**Recommended booking platforms** (all have embeddable widgets or APIs):
- [Vagaro](https://www.vagaro.com) — Most popular for salons
- [Fresha](https://www.fresha.com) — Free, no commission
- [StyleSeat](https://www.styleseat.com)
- [Booksy](https://booksy.com)

### Add Real Before/After Photos
In `src/components/BeforeAfterGallery.jsx`, replace `PlaceholderImg` with actual images:
```jsx
// Replace:
<PlaceholderImg bg={card.beforeBg} label="Before" />

// With:
<img src={card.beforeImg} alt={`Before ${card.service}`} style={{width:"100%",height:"100%",objectFit:"cover"}} />
```

Then add image paths to each card in the `CARDS` array:
```js
{ id: 1, beforeImg: "/photos/brow-before-1.jpg", afterImg: "/photos/brow-after-1.jpg", ... }
```

Put photos in `/public/photos/` and reference as `/photos/filename.jpg`.

### Update Testimonials
In `src/App.jsx`, find the `TESTIMONIALS` array and replace with real Google review content.

### Update Hours
Search for the hours grid in `src/App.jsx` and update the array:
```js
["Mon – Fri", "10:00 AM – 7:00 PM"],
["Saturday", "10:00 AM – 6:00 PM"],
["Sunday", "11:00 AM – 5:00 PM"],
```

### Add Google Analytics
In `index.html`, add your GA4 tag inside `<head>`:
```html
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX');
</script>
```

---

## 📈 SEO Checklist

After deploying:

- [ ] Submit sitemap to [Google Search Console](https://search.google.com/search-console)
- [ ] Verify ownership in Search Console
- [ ] Submit to Bing Webmaster Tools
- [ ] Update Google Business Profile with website URL
- [ ] Add all 6 service categories to Google Business Profile
- [ ] Upload 10+ photos to Google Business Profile
- [ ] Enable Google Business Profile messaging
- [ ] Create `sitemap.xml` (see below)

### Create sitemap.xml
Add `/public/sitemap.xml`:
```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url><loc>https://threadsbeautybar.com/</loc><priority>1.0</priority></url>
  <url><loc>https://threadsbeautybar.com/threading-dublin-ca</loc><priority>0.9</priority></url>
  <url><loc>https://threadsbeautybar.com/waxing-dublin-ca</loc><priority>0.9</priority></url>
  <url><loc>https://threadsbeautybar.com/facials-dublin-ca</loc><priority>0.9</priority></url>
  <url><loc>https://threadsbeautybar.com/gallery</loc><priority>0.7</priority></url>
</urlset>
```

---

## 🎨 Design System

| Token | Value |
|-------|-------|
| Gold | `#C9A84C` |
| Gold Light | `#E8C96A` |
| Black | `#0A0A0A` |
| Charcoal | `#1A1A1A` |
| Off White | `#FAF8F4` |
| Warm Gray | `#F0EDE8` |
| Display Font | Cormorant Garamond (Google Fonts) |
| Body Font | Jost (Google Fonts) |

---

## 📞 Support

Website built for **Threads Beauty Bar & Spa**
- Address: 6620 Dublin Blvd, Dublin, CA 94568
- Phone: (925) 833-1710
- Web: [threadsbeautybar.com](https://threadsbeautybar.com)
