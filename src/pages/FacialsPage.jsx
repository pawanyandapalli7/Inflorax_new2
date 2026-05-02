import { useEffect } from "react";
import SEOPageTemplates from "../components/SEOPageTemplates.jsx";

export default function FacialsPage() {
  useEffect(() => {
    document.title = "Facials in Dublin, CA | HydraFacial & Custom Skincare | Threads Beauty Bar";
    const meta = document.querySelector('meta[name="description"]');
    if (meta) meta.setAttribute("content", "Professional facials and HydraFacials in Dublin, CA. 25, 50 & 80 minute custom facials from $55. Anti-aging, vitamin C, microdermabrasion. Book today.");

    const schema = document.createElement("script");
    schema.type = "application/ld+json";
    schema.text = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "How much does a HydraFacial cost in Dublin CA?",
          "acceptedAnswer": { "@type": "Answer", "text": "A HydraFacial at Threads Beauty Bar in Dublin, CA is $175 for a 90-minute session. Regular facials start at $55 for 25 minutes." }
        },
        {
          "@type": "Question",
          "name": "How often should I get a facial?",
          "acceptedAnswer": { "@type": "Answer", "text": "Most skin experts recommend once a month to align with your skin's natural renewal cycle. HydraFacials can be done more frequently." }
        },
        {
          "@type": "Question",
          "name": "Is there downtime after a HydraFacial?",
          "acceptedAnswer": { "@type": "Answer", "text": "HydraFacials have zero downtime. You can return to normal activities immediately after your appointment." }
        }
      ]
    });
    document.head.appendChild(schema);
    return () => document.head.removeChild(schema);
  }, []);

  return <SEOPageTemplates defaultPage="facials" />;
}
