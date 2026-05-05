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
  title: "HireNP — AI-Native Hiring Intelligence Platform",
  description: "Replace your entire hiring stack with one AI platform that explains every candidate decision. 15-day free trial. No card required.",
  openGraph: {
    title: "HireNP — AI-Native Hiring Intelligence Platform",
    description: "Replace your entire hiring stack with one AI platform that explains every candidate decision. 15-day free trial. No card required.",
    url: 'https://hire-np.com',
    siteName: 'HireNP',
    locale: 'en_US',
    type: 'website',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${dmSans.variable} ${dmSerif.variable} h-full antialiased`} suppressHydrationWarning>
      <body className="min-h-full flex flex-col font-sans transition-colors duration-300">
        {children}
      </body>
    </html>
  );
}
