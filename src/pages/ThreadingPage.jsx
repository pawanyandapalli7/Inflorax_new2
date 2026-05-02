import { useEffect } from "react";
import SEOPageTemplates from "../components/SEOPageTemplates.jsx";

export default function ThreadingPage() {
  useEffect(() => {
    document.title = "Eyebrow Threading in Dublin, CA | Threads Beauty Bar & Spa";
    const meta = document.querySelector('meta[name="description"]');
    if (meta) meta.setAttribute("content", "Expert eyebrow threading and full face threading in Dublin, CA. Precision brow shaping from $10. Walk-ins welcome. Call (925) 833-1710.");

    // FAQ Schema for Google Rich Results
    const schema = document.createElement("script");
    schema.type = "application/ld+json";
    schema.text = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "How long does eyebrow threading last?",
          "acceptedAnswer": { "@type": "Answer", "text": "Most clients find threading results last 3–4 weeks, similar to waxing. Hair grows back finer over time with repeated treatments." }
        },
        {
          "@type": "Question",
          "name": "Does threading hurt?",
          "acceptedAnswer": { "@type": "Answer", "text": "Most clients describe it as a mild snapping sensation. It's generally considered less painful than waxing and subsides within minutes." }
        },
        {
          "@type": "Question",
          "name": "How much does eyebrow threading cost in Dublin CA?",
          "acceptedAnswer": { "@type": "Answer", "text": "Eyebrow threading at Threads Beauty Bar starts at $15. Full face threading is $50. Packages of 12 eyebrow sessions are $129 (10% savings)." }
        }
      ]
    });
    document.head.appendChild(schema);
    return () => document.head.removeChild(schema);
  }, []);

  return <SEOPageTemplates defaultPage="threading" />;
}
