export function OrganizationSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": "https://hire-np.com/#organization",
        "name": "HireNP",
        "url": "https://hire-np.com",
        "logo": {
          "@type": "ImageObject",
          "url": "https://hire-np.com/logo.jpg",
        },
        "description":
          "AI-native hiring intelligence platform for Nepal and USA companies",
        "foundingDate": "2026",
        "founder": {
          "@type": "Person",
          "name": "Saugat Siwakoti",
        },
        "address": [
          {
            "@type": "PostalAddress",
            "addressLocality": "Buffalo",
            "addressRegion": "NY",
            "addressCountry": "US",
          },
          {
            "@type": "PostalAddress",
            "addressLocality": "Kathmandu",
            "addressCountry": "NP",
          },
        ],
        "areaServed": ["US", "NP"],
        "sameAs": [
          "https://linkedin.com/company/hirenp",
          "https://twitter.com/hirenp",
        ],
        "contactPoint": {
          "@type": "ContactPoint",
          "email": "hello@hire-np.com",
          "contactType": "customer support",
          "availableLanguage": ["English", "Nepali"],
        },
      },
      {
        "@type": "SoftwareApplication",
        "@id": "https://hire-np.com/#software",
        "name": "HireNP",
        "applicationCategory": "BusinessApplication",
        "applicationSubCategory": "HumanResourcesApplication",
        "operatingSystem": "Web",
        "url": "https://hire-np.com",
        "description":
          "AI-native hiring platform that explains every candidate decision. From job post to signed offer in one system.",
        "featureList": [
          "AI Resume Scoring with Reasoning",
          "Interview Transcription and Analysis",
          "3-Dimensional Interview Scoring",
          "Natural Language Scheduling",
          "AI Offer Letter Generation",
          "Digital Signing",
          "Emma AI Hiring Assistant",
          "Candidate Pool",
          "Nepal Labor Law Compliance",
          "eSewa and Khalti Payments",
        ],
        "softwareVersion": "2.0",
        "offers": [
          {
            "@type": "Offer",
            "name": "Free Plan",
            "price": "0",
            "priceCurrency": "USD",
            "description": "1 active job, 20 candidates per job",
          },
          {
            "@type": "Offer",
            "name": "Pay Per Job",
            "price": "60",
            "priceCurrency": "USD",
            "description": "Full workflow for 1 job posting",
          },
          {
            "@type": "Offer",
            "name": "Pro Plan",
            "price": "299",
            "priceCurrency": "USD",
            "description": "10 active jobs, full AI suite, 30 days access",
          },
          {
            "@type": "Offer",
            "name": "Business Plan",
            "price": "400",
            "priceCurrency": "USD",
            "description": "Unlimited jobs and candidates, 30 days access",
          },
          {
            "@type": "Offer",
            "name": "Pay Per Job Nepal",
            "price": "4000",
            "priceCurrency": "NPR",
            "description": "Full workflow for 1 job posting",
          },
          {
            "@type": "Offer",
            "name": "Pro Plan Nepal",
            "price": "19900",
            "priceCurrency": "NPR",
            "description": "10 active jobs, full AI suite, 30 days access",
          },
          {
            "@type": "Offer",
            "name": "Business Plan Nepal",
            "price": "26600",
            "priceCurrency": "NPR",
            "description": "Unlimited everything, 30 days access",
          },
        ],
      },
      {
        "@type": "WebSite",
        "@id": "https://hire-np.com/#website",
        "url": "https://hire-np.com",
        "name": "HireNP",
        "description": "AI Hiring Software for Nepal and USA",
        "publisher": { "@id": "https://hire-np.com/#organization" },
        "potentialAction": {
          "@type": "SearchAction",
          "target": {
            "@type": "EntryPoint",
            "urlTemplate":
              "https://hire-np.com/blog?search={search_term_string}",
          },
          "query-input": "required name=search_term_string",
        },
        "inLanguage": ["en-US"],
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
