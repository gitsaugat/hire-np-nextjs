import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function PrivacyPolicy() {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Navbar />
      <main className="flex-grow">

        {/* HERO */}
        <section className="relative pt-28 pb-12 lg:pt-32 lg:pb-16 px-5 lg:px-6 overflow-hidden">
          <div className="absolute inset-0 bg-grid mask-radial opacity-60 pointer-events-none" />
          <div className="relative max-w-3xl mx-auto text-center">
            <span className="inline-flex items-center gap-1.5 text-[10px] font-semibold tracking-[0.16em] uppercase text-brand-primary mb-3">
              <span className="w-3 h-px bg-brand-primary/50" /> Legal
            </span>
            <h1 className="text-3xl md:text-5xl font-serif text-ink-900 mb-3 leading-[1.05] tracking-[-0.025em]">Privacy Policy</h1>
            <p className="text-ink-400 text-[13px] font-medium">
              Last updated · {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
            </p>
          </div>
        </section>

        <section className="px-5 lg:px-6 max-w-2xl mx-auto py-12 lg:py-16">
          <div className="prose prose-base max-w-none text-ink-700 prose-headings:font-serif prose-headings:tracking-tight prose-headings:text-ink-900 prose-h2:text-xl prose-h2:mt-10 prose-h2:mb-3 prose-p:leading-relaxed prose-strong:text-ink-900 prose-a:text-brand-primary prose-a:no-underline hover:prose-a:underline">
            <h2>1. Information we collect</h2>
            <p>At HireNP, we collect information you provide directly to us when using our platform. This includes contact information, account credentials, and the data you upload or process through our automated hiring system (such as candidate resumes, assessment scores, and interview notes).</p>

            <h2>2. How we use your information</h2>
            <p>We use the information we collect to operate, maintain, and provide the features of the HireNP platform. Specifically, this includes processing candidate applications, scheduling interviews, generating AI summaries, and communicating with you regarding your account and services.</p>

            <h2>3. AI and data processing</h2>
            <p>HireNP utilizes Artificial Intelligence (AI) to evaluate candidates and summarize interviews. The data processed by our AI models is used strictly for the purpose of providing hiring insights to your organization. We do not use your candidate data to train our foundational models without explicit consent.</p>

            <h2>4. Data sharing and disclosure</h2>
            <p>We do not sell your personal information or the data of your candidates to third parties. We may share information with trusted third-party service providers (such as hosting and email delivery services like Resend) solely to facilitate the operation of our platform.</p>

            <h2>5. Security</h2>
            <p>We implement industry-standard security measures to protect your data from unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the Internet or electronic storage is 100% secure.</p>

            <h2>6. Contact us</h2>
            <p>If you have any questions or concerns about this Privacy Policy, please contact us at <a href="mailto:privacy@hirenp.com">privacy@hirenp.com</a>.</p>
          </div>
        </section>

      </main>
      <Footer />
    </div>
  );
}
