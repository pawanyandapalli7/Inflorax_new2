import { useEffect } from "react";
import SEOPageTemplates from "../components/SEOPageTemplates.jsx";

export default function WaxingPage() {
  useEffect(() => {
    document.title = "Waxing Salon in Dublin, CA | Brazilian, Body & Face Wax | Threads Beauty Bar";
    const meta = document.querySelector('meta[name="description"]');
    if (meta) meta.setAttribute("content", "Professional waxing in Dublin, CA — Brazilian, full body, bikini, legs, and face waxing. Hygienic, experienced, results-focused. Book online or call (925) 833-1710.");

    const schema = document.createElement("script");
    schema.type = "application/ld+json";
    schema.text = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "How much does a Brazilian wax cost in Dublin CA?",
          "acceptedAnswer": { "@type": "Answer", "text": "A Brazilian wax at Threads Beauty Bar in Dublin, CA costs $70. Package deals: 3 sessions for $180, 6 sessions for $330." }
        },
        {
          "@type": "Question",
          "name": "Do you double-dip wax applicators?",
          "acceptedAnswer": { "@type": "Answer", "text": "Never. Threads Beauty Bar has a strict no double-dip policy. Every applicator is used once and discarded immediately." }
        },
        {
          "@type": "Question",
          "name": "How long does hair need to be for waxing?",
          "acceptedAnswer": { "@type": "Answer", "text": "At least 1/4 inch — approximately 2–3 weeks of growth after shaving. Too short and the wax cannot grip effectively." }
        }
      ]
    });
    document.head.appendChild(schema);
    return () => document.head.removeChild(schema);
  }, []);

  return <SEOPageTemplates defaultPage="waxing" />;
}
