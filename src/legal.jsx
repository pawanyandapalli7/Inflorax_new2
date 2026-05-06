// LEGAL — Terms & Conditions + Privacy Policy modals
const termsContent = {
  title: "Terms & Conditions",
  updated: "May 2026",
  sections: [
    {
      h: "1. Overview",
      p: "These Terms & Conditions govern your use of Inflorax services. By purchasing or using our services, you agree to the terms outlined below. Our goal is to support creators in improving their social media presence through strategic and growth-focused solutions."
    },
    {
      h: "2. Our Services",
      p: "We provide social media growth support, content strategy, and visibility optimization services designed to help creators build and scale their online presence. Our services are intended to improve content visibility, enhance engagement signals, and support overall growth strategy. We do not claim affiliation with any social media platform."
    },
    {
      h: "3. How Results Work",
      p: "Social media growth depends on multiple factors including content quality, posting consistency, audience behavior, and platform algorithms. While our systems are designed to support growth, results may vary from account to account."
    },
    {
      h: "4. Platform Considerations",
      p: "We work to enhance your account performance in a natural and strategic way. However, social media platforms such as Instagram and YouTube operate independently and may update their algorithms, modify policies, or adjust content visibility. We are not responsible for any platform-level changes that may affect performance."
    },
    {
      h: "5. Client Responsibility",
      p: "To achieve the best results, clients are expected to maintain an active account, post content consistently, and provide accurate account details. Growth works best when combined with consistent effort."
    },
    {
      h: "6. Payments & Refunds",
      p: "All payments are final once services have been initiated. In case of any service issue, we will review and provide support where applicable."
    },
    {
      h: "7. Account Safety",
      p: "We do not require sensitive information such as passwords. We prioritize safe and strategic growth practices, but we cannot control how third-party platforms manage accounts."
    },
    {
      h: "8. Limitation of Responsibility",
      p: "We aim to provide high-quality services and support. However, we are not responsible for changes made by social media platforms, fluctuations in engagement or reach, or external factors affecting account performance."
    },
    {
      h: "9. Privacy",
      p: "We respect your privacy and keep all client information confidential. Your information is used only for service delivery and communication."
    },
    {
      h: "10. Updates to Terms",
      p: "We may update these Terms from time to time. Continued use of our services means you accept any updates."
    },
    {
      h: "11. Acceptance",
      p: "By using our services, you confirm that you understand and agree to these Terms & Conditions. For any questions, contact: info@inflorax.com"
    },
  ]
};

const privacyContent = {
  title: "Privacy Policy",
  updated: "May 2026",
  sections: [
    {
      h: "1. Overview",
      p: "We respect your privacy and are committed to protecting your personal information. This Privacy Policy explains how we collect, use, and protect your information when you use our services."
    },
    {
      h: "2. Information We Collect",
      p: "We may collect: Personal information including name, email address, and payment-related details (processed securely via Stripe). Account information including your social media username or profile link (only what is required to deliver services). Technical information including IP address, browser type, and device information."
    },
    {
      h: "3. How We Use Your Information",
      p: "We use your information to provide and deliver our services, process payments securely, communicate with you regarding your order, and improve our services and user experience. We do not sell or rent your personal information to third parties."
    },
    {
      h: "4. Payment Security",
      p: "All payments are processed through secure third-party payment providers (Stripe). We do not store credit card details or banking information."
    },
    {
      h: "5. Data Sharing",
      p: "We only share information when necessary — with trusted service providers for service delivery or payment processing, or when required by law. We do not share your information for marketing or resale purposes."
    },
    {
      h: "6. Data Protection",
      p: "We take reasonable measures to protect your information from unauthorized access, misuse, or disclosure. However, no system is completely secure, and we cannot guarantee absolute security."
    },
    {
      h: "7. Your Rights (CCPA — California Residents)",
      p: "If you are a California resident, you have the right to request access to the personal data we hold about you, request deletion of your personal data, and request information about how your data is used. To make a request, contact us at: info@inflorax.com"
    },
    {
      h: "8. Data Retention",
      p: "We retain your information only as long as necessary to provide services and comply with legal obligations."
    },
    {
      h: "9. Cookies & Tracking",
      p: "We may use basic cookies or analytics tools to improve website performance and user experience. You can disable cookies through your browser settings."
    },
    {
      h: "10. Third-Party Links",
      p: "Our website may contain links to third-party platforms such as Instagram and YouTube. We are not responsible for the privacy practices of those platforms."
    },
    {
      h: "11. Changes to This Policy",
      p: "We may update this Privacy Policy from time to time. Continued use of our services means you accept any updates."
    },
    {
      h: "12. Contact",
      p: "If you have any questions about this Privacy Policy, contact us at: info@inflorax.com"
    },
  ]
};

const LegalModal = ({open, onClose, content}) => {
  useEffect(() => {
    if (open) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = e => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  if (!open) return null;

  return (
    <div onClick={e => { if (e.target === e.currentTarget) onClose(); }} style={{
      position:'fixed', inset:0, zIndex:9997,
      background:'rgba(8,15,8,.75)', backdropFilter:'blur(6px)',
      display:'flex', alignItems:'flex-end',
      opacity: open ? 1 : 0,
      transition:'opacity .3s',
    }}>
      <div style={{
        width:'100%', maxWidth:680, margin:'0 auto',
        background:'#fff', borderRadius:'20px 20px 0 0',
        maxHeight:'88vh', display:'flex', flexDirection:'column',
        animation:'legalSlideUp .38s cubic-bezier(.16,1,.3,1)',
      }}>
        {/* Header */}
        <div style={{
          padding:'20px 28px 16px',
          borderBottom:'1px solid var(--line)',
          display:'flex', alignItems:'center', justifyContent:'space-between',
          flexShrink:0,
        }}>
          <div>
            <div style={{fontFamily:'var(--mono)', fontSize:10, letterSpacing:'.14em', textTransform:'uppercase', color:'var(--ink-3)', marginBottom:4}}>
              Last updated: {content.updated}
            </div>
            <h2 style={{fontWeight:800, fontSize:20, letterSpacing:'-.02em', color:'var(--ink)'}}>{content.title}</h2>
          </div>
          <button onClick={onClose} style={{
            width:34, height:34, borderRadius:'50%', border:'1px solid var(--line)',
            background:'transparent', fontSize:16, cursor:'pointer',
            display:'flex', alignItems:'center', justifyContent:'center',
            color:'var(--ink-3)', transition:'background .2s',
            flexShrink:0,
          }}
          onMouseEnter={e=>e.currentTarget.style.background='var(--soft)'}
          onMouseLeave={e=>e.currentTarget.style.background='transparent'}>✕</button>
        </div>

        {/* Scrollable content */}
        <div style={{
          flex:1, overflowY:'auto', padding:'24px 28px',
          display:'flex', flexDirection:'column', gap:20,
        }}>
          {content.sections.map((s, i) => (
            <div key={i}>
              <h3 style={{
                fontFamily:'var(--sans)', fontWeight:700, fontSize:14,
                color:'var(--ink)', marginBottom:6, letterSpacing:'-.01em',
              }}>{s.h}</h3>
              <p style={{fontSize:14, lineHeight:1.7, color:'var(--ink-2)'}}>{s.p}</p>
            </div>
          ))}
          <div style={{paddingBottom:8}}/>
        </div>
      </div>
      <style>{`@keyframes legalSlideUp{from{transform:translateY(40px);opacity:0}to{transform:none;opacity:1}}`}</style>
    </div>
  );
};

// Legal provider — mounts modals globally
const LegalProvider = () => {
  const [terms, setTerms] = useState(false);
  const [privacy, setPrivacy] = useState(false);

  useEffect(() => {
    window.openTerms = () => setTerms(true);
    window.openPrivacy = () => setPrivacy(true);
    return () => { window.openTerms = null; window.openPrivacy = null; };
  }, []);

  return (
    <>
      <LegalModal open={terms} onClose={() => setTerms(false)} content={termsContent}/>
      <LegalModal open={privacy} onClose={() => setPrivacy(false)} content={privacyContent}/>
    </>
  );
};

window.LegalProvider = LegalProvider;
