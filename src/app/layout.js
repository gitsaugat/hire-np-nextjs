import "./globals.css";
import { DM_Sans, DM_Serif_Display } from 'next/font/google';
import { OrganizationSchema } from '@/components/schema/OrganizationSchema';

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
  metadataBase: new URL('https://hire-np.com'),
  title: {
    default: 'HireNP — AI Hiring Software Nepal & USA | Best Recruitment Platform',
    template: '%s | HireNP',
  },
  description:
    "Nepal's most advanced AI hiring platform. Screen candidates instantly, analyze interviews with AI, generate offer letters in one system. NPR pricing with eSewa & Khalti. USD pricing with Stripe. 15-day free trial. No card required.",
  keywords: [
    // PRIMARY NEPAL
    'AI hiring software Nepal',
    'AI recruitment software Nepal',
    'hiring software Nepal',
    'recruitment software Nepal',
    'ATS Nepal',
    'applicant tracking system Nepal',
    'HR software Nepal hiring',
    'online hiring platform Nepal',
    'AI HR software Nepal',
    'best hiring platform Nepal',
    'nepali hiring platform',
    'Nepal HR tech',
    'hiring platform Kathmandu',
    'recruitment platform Nepal',
    'job posting software Nepal',
    // PRIMARY USA
    'AI hiring software',
    'AI recruitment platform',
    'applicant tracking system',
    'hiring intelligence platform',
    'AI native ATS',
    'startup hiring software',
    'interview intelligence platform',
    'offer letter software',
    'end to end hiring platform',
    'hiring software startups',
    // PROBLEM BASED NEPAL
    'how to hire faster Nepal',
    'reduce time to hire Nepal',
    'automate recruitment Nepal',
    'screen candidates automatically Nepal',
    'recruitment problems Nepal',
    'hiring process improvement Nepal',
    'reduce recruitment cost Nepal',
    'structured hiring Nepal',
    'bad hire cost Nepal',
    'replace recruitment agency Nepal',
    // INDUSTRY NEPAL
    'IT company hiring software Nepal',
    'hire software developers Nepal',
    'tech recruitment Nepal',
    'startup hiring platform Nepal',
    'Nepal startup recruitment',
    'SME hiring software Nepal',
    'bank recruitment software Nepal',
    'fintech hiring Nepal',
    'NGO recruitment Nepal',
    'BFI hiring platform Nepal',
    // LONG TAIL NEPAL
    'AI candidate screening Nepal',
    'interview analysis software Nepal',
    'offer letter software Nepal',
    'digital signing Nepal hiring',
    'AI job description generator Nepal',
    'candidate scoring software Nepal',
    'interview transcription Nepal',
    'hiring dashboard Nepal',
    'recruitment ROI Nepal',
    'esewa payment HR software',
    'khalti payment hiring platform',
    'Nepal labour law hiring compliance',
    'hire employees Nepal online',
    'best ATS Nepal 2026',
    'AI recruitment Nepal 2026',
    // COMPETITOR NEPAL
    'TalentSathi alternative Nepal',
    'recruitment agency alternative Nepal',
    'Kumari Job alternative',
    'Froxjob alternative Nepal',
    'recruitment agency vs software Nepal',
    'Merojob alternative',
    // CANDIDATE SIDE
    'jobs in Nepal',
    'find jobs Kathmandu',
    'IT jobs Nepal 2026',
    'career advisor Nepal',
    'apply jobs online Nepal',
    'jobs in Lalitpur Nepal',
    // USA LONG TAIL
    'AI hiring platform Buffalo NY',
    'startup ATS software',
    'hiring software no annual contract',
    'pay per job ATS',
    'AI resume screening software',
    'interview scoring software',
    'combined candidate scoring',
    'hiring reasoning AI',
    'replace greenhouse lever',
    'affordable ATS startups',
  ],
  authors: [{ name: 'Saugat Siwakoti', url: 'https://hire-np.com' }],
  creator: 'HireNP',
  publisher: 'HireNP',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://hire-np.com',
    siteName: 'HireNP',
    title: 'HireNP — AI Hiring Software Nepal & USA',
    description:
      'The only AI hiring platform that explains every candidate decision. Built for Nepal and USA companies. NPR and USD pricing. 15-day free trial.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'HireNP — AI Hiring Software Nepal & USA',
    description:
      'AI hiring platform that explains every candidate decision. Nepal NPR pricing + USA USD pricing. 15-day free trial.',
    creator: '@hirenp',
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
  alternates: {
    canonical: 'https://hire-np.com',
    languages: {
      'en-US': 'https://hire-np.com',
      'x-default': 'https://hire-np.com',
    },
  },
  category: 'technology',
  // verification: { google: '<paste GSC code here>' },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${dmSans.variable} ${dmSerif.variable} h-full antialiased`} suppressHydrationWarning>
      <body className="min-h-full flex flex-col font-sans transition-colors duration-300">
        <OrganizationSchema />
        {children}
      </body>
    </html>
  );
}
