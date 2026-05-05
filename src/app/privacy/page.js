import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function PrivacyPolicy() {
  return (
    <div className="flex flex-col min-h-screen relative overflow-hidden bg-gradient-to-br from-green-50 via-white to-green-50/50">
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-green-200/40 mix-blend-multiply blur-[120px] pointer-events-none" />
      <div className="absolute top-[20%] right-[-5%] w-[30%] h-[40%] rounded-full bg-emerald-200/30 mix-blend-multiply blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] left-[20%] w-[50%] h-[40%] rounded-full bg-teal-100/40 mix-blend-multiply blur-[120px] pointer-events-none" />

      <div className="relative z-10 flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow py-32 px-6 lg:px-8 max-w-4xl mx-auto w-full">
          <div className="bg-white/60 backdrop-blur-xl border border-white/50 rounded-3xl p-10 md:p-16 shadow-[0_8px_32px_rgba(34,197,94,0.05)]">
            <h1 className="text-4xl font-extrabold text-slate-900 mb-8">Privacy Policy</h1>
            <div className="prose prose-slate max-w-none text-slate-600 font-medium space-y-6">
              <p>Last Updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</p>
              
              <h2 className="text-2xl font-bold text-slate-900 mt-10 mb-4">1. Information We Collect</h2>
              <p>
                At HireNP, we collect information you provide directly to us when using our platform. This includes contact information, account credentials, and the data you upload or process through our automated hiring system (such as candidate resumes, assessment scores, and interview notes).
              </p>

              <h2 className="text-2xl font-bold text-slate-900 mt-10 mb-4">2. How We Use Your Information</h2>
              <p>
                We use the information we collect to operate, maintain, and provide the features of the HireNP platform. Specifically, this includes processing candidate applications, scheduling interviews, generating AI summaries, and communicating with you regarding your account and services.
              </p>

              <h2 className="text-2xl font-bold text-slate-900 mt-10 mb-4">3. AI and Data Processing</h2>
              <p>
                HireNP utilizes Artificial Intelligence (AI) to evaluate candidates and summarize interviews. The data processed by our AI models is used strictly for the purpose of providing hiring insights to your organization. We do not use your candidate data to train our foundational models without explicit consent.
              </p>

              <h2 className="text-2xl font-bold text-slate-900 mt-10 mb-4">4. Data Sharing and Disclosure</h2>
              <p>
                We do not sell your personal information or the data of your candidates to third parties. We may share information with trusted third-party service providers (such as hosting and email delivery services like Resend) solely to facilitate the operation of our platform.
              </p>

              <h2 className="text-2xl font-bold text-slate-900 mt-10 mb-4">5. Security</h2>
              <p>
                We implement industry-standard security measures to protect your data from unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the Internet or electronic storage is 100% secure.
              </p>

              <h2 className="text-2xl font-bold text-slate-900 mt-10 mb-4">6. Contact Us</h2>
              <p>
                If you have any questions or concerns about this Privacy Policy, please contact us at privacy@hirenp.com.
              </p>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    </div>
  );
}
