"use client";

import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Mail, MapPin, Clock, CheckCircle, Linkedin, Twitter } from 'lucide-react';
import { motion } from 'framer-motion';

const fade = {
  initial: { opacity: 0, y: 12 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] }
};

const Eyebrow = ({ children }) => (
  <span className="inline-flex items-center gap-1.5 text-[10px] font-semibold tracking-[0.16em] uppercase text-brand-primary mb-3">
    <span className="w-3 h-px bg-brand-primary/50" />
    {children}
  </span>
);

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '', email: '', company: '', country: 'USA', subject: 'General', message: ''
  });
  const [status, setStatus] = useState('idle');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('loading');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      if (res.ok) {
        setStatus('success');
        setFormData({ name: '', email: '', company: '', country: 'USA', subject: 'General', message: '' });
      } else {
        setStatus('error');
      }
    } catch (err) {
      setStatus('error');
    }
  };

  const labelClass = "block text-[11px] font-semibold text-ink-500 mb-1.5 tracking-tight";

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Navbar />
      <main className="flex-grow">

        {/* HERO */}
        <section className="relative pt-28 pb-12 lg:pt-32 lg:pb-16 px-5 lg:px-6 overflow-hidden">
          <div className="absolute inset-0 bg-grid mask-radial opacity-60 pointer-events-none" />
          <div className="relative max-w-3xl mx-auto text-center">
            <motion.div {...fade}><Eyebrow>Contact</Eyebrow></motion.div>
            <motion.h1 {...fade} className="text-3xl md:text-5xl font-serif text-ink-900 mb-4 leading-[1.05] tracking-[-0.025em] text-balance">
              Get in touch.
            </motion.h1>
            <motion.p {...fade} className="text-ink-500 text-[15px] leading-relaxed">
              We respond within 24 hours.
            </motion.p>
          </div>
        </section>

        <section className="px-5 lg:px-6 max-w-5xl mx-auto pb-20 lg:pb-24">
          <div className="grid lg:grid-cols-[1.2fr_1fr] gap-10 lg:gap-14">

            {/* FORM */}
            <motion.div {...fade}>
              {status === 'success' ? (
                <div className="card p-10 text-center">
                  <CheckCircle className="text-brand-primary mx-auto mb-4" size={36} />
                  <h2 className="text-xl font-serif text-ink-900 mb-2 tracking-tight">Message sent</h2>
                  <p className="text-ink-500 text-[14px] mb-6">We've received your inquiry and will respond within 24 hours.</p>
                  <button onClick={() => setStatus('idle')} className="text-brand-primary font-semibold text-[13px] hover:underline">
                    Send another message
                  </button>
                </div>
              ) : (
                <div className="card p-6 lg:p-8">
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className={labelClass}>Full name *</label>
                        <input required type="text" value={formData.name}
                          onChange={(e) => setFormData({...formData, name: e.target.value})}
                          className="input" placeholder="Your name" />
                      </div>
                      <div>
                        <label className={labelClass}>Email *</label>
                        <input required type="email" value={formData.email}
                          onChange={(e) => setFormData({...formData, email: e.target.value})}
                          className="input" placeholder="you@example.com" />
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className={labelClass}>Company</label>
                        <input type="text" value={formData.company}
                          onChange={(e) => setFormData({...formData, company: e.target.value})}
                          className="input" placeholder="Your company" />
                      </div>
                      <div>
                        <label className={labelClass}>Country</label>
                        <select value={formData.country}
                          onChange={(e) => setFormData({...formData, country: e.target.value})}
                          className="input">
                          <option value="USA">USA</option>
                          <option value="Nepal">Nepal</option>
                          <option value="Other">Other</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className={labelClass}>Subject</label>
                      <select value={formData.subject}
                        onChange={(e) => setFormData({...formData, subject: e.target.value})}
                        className="input">
                        <option value="General">General Inquiry</option>
                        <option value="Sales">Sales</option>
                        <option value="Support">Support</option>
                        <option value="Partnership">Partnership</option>
                        <option value="Press">Press</option>
                      </select>
                    </div>

                    <div>
                      <label className={labelClass}>Message *</label>
                      <textarea required rows={5} value={formData.message}
                        onChange={(e) => setFormData({...formData, message: e.target.value})}
                        className="input" placeholder="How can we help?" />
                    </div>

                    <button disabled={status === 'loading'} type="submit" className="btn-primary w-full">
                      {status === 'loading' ? 'Sending...' : 'Send message'}
                    </button>

                    {status === 'error' && (
                      <p className="text-red-500 text-[13px] font-medium text-center">Something went wrong. Please try again.</p>
                    )}
                  </form>
                </div>
              )}
            </motion.div>

            {/* INFO */}
            <motion.div {...fade} transition={{ delay: 0.1 }} className="space-y-7">
              <div>
                <h4 className={labelClass}>Contact</h4>
                <a href="mailto:hello@hire-np.com" className="inline-flex items-center gap-2 text-ink-900 font-semibold text-[14px] hover:text-brand-primary transition-colors">
                  <Mail className="text-brand-primary" size={14} />
                  hello@hire-np.com
                </a>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div>
                  <h4 className={labelClass}>Headquarters</h4>
                  <div className="flex items-start gap-2 text-ink-900 font-semibold text-[13px] leading-relaxed">
                    <MapPin className="text-brand-primary shrink-0 mt-0.5" size={13} />
                    <span>Buffalo, NY<br/>USA</span>
                  </div>
                </div>
                <div>
                  <h4 className={labelClass}>Nepal</h4>
                  <div className="flex items-start gap-2 text-ink-900 font-semibold text-[13px] leading-relaxed">
                    <MapPin className="text-brand-primary shrink-0 mt-0.5" size={13} />
                    <span>Kathmandu<br/>Nepal</span>
                  </div>
                </div>
              </div>

              <div>
                <h4 className={labelClass}>Business hours</h4>
                <div className="space-y-1 text-ink-900 font-semibold text-[13px]">
                  <div className="flex items-start gap-2">
                    <Clock className="text-brand-primary shrink-0 mt-0.5" size={13} />
                    <div className="space-y-0.5">
                      <p>🇺🇸 Mon-Fri, 9am-6pm EST</p>
                      <p>🇳🇵 Mon-Fri, 9am-6pm NPT</p>
                    </div>
                  </div>
                  <p className="text-[12px] text-ink-500 font-medium pl-5 pt-1.5">
                    We respond within 24 hours on business days.
                  </p>
                </div>
              </div>

              <div>
                <h4 className={labelClass}>Social</h4>
                <div className="flex items-center gap-2">
                  <a href="#" aria-label="LinkedIn" className="w-9 h-9 rounded-lg bg-[#FAFAF7] border border-black/[0.06] flex items-center justify-center text-ink-700 hover:bg-white hover:border-brand-primary/30 hover:text-brand-primary transition-all">
                    <Linkedin size={15} />
                  </a>
                  <a href="#" aria-label="Twitter" className="w-9 h-9 rounded-lg bg-[#FAFAF7] border border-black/[0.06] flex items-center justify-center text-ink-700 hover:bg-white hover:border-brand-primary/30 hover:text-brand-primary transition-all">
                    <Twitter size={15} />
                  </a>
                </div>
              </div>
            </motion.div>

          </div>
        </section>

      </main>
      <Footer />
    </div>
  );
}
