import "./globals.css";
import { DM_Sans, DM_Serif_Display } from 'next/font/google';

const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-dm-sans',
  display: 'swap',
});

const dmSerif = DM_Serif_Display({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-dm-serif',
  display: 'swap',
});

export const metadata = {
  title: "HireNP — #1 AI Hiring Platform in Nepal | Native AI Recruitment",
  description: "HireNP is Nepal's first AI-native hiring platform. Replace Merojob and traditional ATS with AI intelligence that explains every candidate decision. Best hiring platform for startups and enterprises in Nepal.",
  keywords: ["HireNP", "hire-np", "hirenp", "AI hiring platform nepal", "hiring platform nepal", "hiringnepal", "merojob alternative", "mero job", "Native AI hiring platform", "AI recruitment Nepal", "hiring in Nepal"],
  alternates: {
    canonical: 'https://hire-np.com',
  },
  openGraph: {
    title: "HireNP — AI-Native Hiring Intelligence Platform in Nepal",
    description: "The only AI hiring platform in Nepal that explains every decision. From job post to offer in one system. 15-day free trial.",
    url: 'https://hire-np.com',
    siteName: 'HireNP',
    locale: 'en_NP',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "HireNP — #1 AI Hiring Platform in Nepal",
    description: "Native AI recruitment platform for Nepal. Automate screening, scheduling, and interviews.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({ children }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "HireNP",
    "url": "https://hire-np.com",
    "logo": "https://hire-np.com/logo.jpg",
    "description": "Nepal's first AI-native hiring intelligence platform.",
    "address": {
      "@type": "PostalAddress",
      "addressCountry": "NP"
    },
    "sameAs": [
      "https://linkedin.com/company/hirenp"
    ]
  };

  return (
    <html lang="en" className={`${dmSans.variable} ${dmSerif.variable} h-full antialiased`} suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-full flex flex-col font-sans transition-colors duration-300">
        {children}
      </body>
    </html>
  );
}
