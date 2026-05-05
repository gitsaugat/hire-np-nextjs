"use client";

import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Mail, MapPin, Clock, Share2, Globe, CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';

const fadeInUp = {
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.4 }
};

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    country: 'USA',
    subject: 'General',
    message: ''
  });
  const [status, setStatus] = useState('idle'); // idle, loading, success, error

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

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow pt-32 pb-20">
        
        {/* HERO */}
        <section className="px-6 lg:px-8 max-w-7xl mx-auto text-center mb-20">
          <motion.h1 {...fadeInUp} className="text-4xl md:text-6xl font-serif text-[#0A0F1E] mb-6">
            Get in touch
          </motion.h1>
          <motion.p {...fadeInUp} className="text-[#6B7280] text-lg md:text-xl font-medium">
            We respond within 24 hours.
          </motion.p>
        </section>

        <section className="px-6 lg:px-8 max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-32">
            
            {/* FORM */}
            <motion.div {...fadeInUp}>
              {status === 'success' ? (
                <div className="bg-[#F0FDF4] p-10 rounded-3xl border border-[#BBF7D0] text-center">
                  <CheckCircle className="text-[#00B67A] mx-auto mb-6" size={48} />
                  <h2 className="text-2xl font-bold text-[#0A0F1E] mb-4">Message sent!</h2>
                  <p className="text-[#4B5563] font-medium mb-8">We've received your inquiry and will respond within 24 hours.</p>
                  <button 
                    onClick={() => setStatus('idle')}
                    className="text-[#00B67A] font-bold hover:underline"
                  >
                    Send another message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-xs font-bold text-[#9CA3AF] uppercase mb-2 tracking-widest">Full Name *</label>
                      <input 
                        required
                        type="text" 
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                        className="w-full bg-[#F9FAFB] border border-[#E5E7EB] rounded-xl px-5 py-3 focus:outline-none focus:ring-2 focus:ring-[#00B67A]/20 focus:border-[#00B67A] transition-all"
                        placeholder="Your name"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-[#9CA3AF] uppercase mb-2 tracking-widest">Email *</label>
                      <input 
                        required
                        type="email" 
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                        className="w-full bg-[#F9FAFB] border border-[#E5E7EB] rounded-xl px-5 py-3 focus:outline-none focus:ring-2 focus:ring-[#00B67A]/20 focus:border-[#00B67A] transition-all"
                        placeholder="you@example.com"
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-xs font-bold text-[#9CA3AF] uppercase mb-2 tracking-widest">Company Name</label>
                      <input 
                        type="text" 
                        value={formData.company}
                        onChange={(e) => setFormData({...formData, company: e.target.value})}
                        className="w-full bg-[#F9FAFB] border border-[#E5E7EB] rounded-xl px-5 py-3 focus:outline-none focus:ring-2 focus:ring-[#00B67A]/20 focus:border-[#00B67A] transition-all"
                        placeholder="Your company"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-[#9CA3AF] uppercase mb-2 tracking-widest">Country</label>
                      <select 
                        value={formData.country}
                        onChange={(e) => setFormData({...formData, country: e.target.value})}
                        className="w-full bg-[#F9FAFB] border border-[#E5E7EB] rounded-xl px-5 py-3 focus:outline-none focus:ring-2 focus:ring-[#00B67A]/20 focus:border-[#00B67A] transition-all"
                      >
                        <option value="USA">USA</option>
                        <option value="Nepal">Nepal</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#9CA3AF] uppercase mb-2 tracking-widest">Subject</label>
                    <select 
                      value={formData.subject}
                      onChange={(e) => setFormData({...formData, subject: e.target.value})}
                      className="w-full bg-[#F9FAFB] border border-[#E5E7EB] rounded-xl px-5 py-3 focus:outline-none focus:ring-2 focus:ring-[#00B67A]/20 focus:border-[#00B67A] transition-all"
                    >
                      <option value="General">General Inquiry</option>
                      <option value="Sales">Sales</option>
                      <option value="Support">Support</option>
                      <option value="Partnership">Partnership</option>
                      <option value="Press">Press</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#9CA3AF] uppercase mb-2 tracking-widest">Message *</label>
                    <textarea 
                      required
                      rows={5}
                      value={formData.message}
                      onChange={(e) => setFormData({...formData, message: e.target.value})}
                      className="w-full bg-[#F9FAFB] border border-[#E5E7EB] rounded-xl px-5 py-3 focus:outline-none focus:ring-2 focus:ring-[#00B67A]/20 focus:border-[#00B67A] transition-all"
                      placeholder="How can we help?"
                    />
                  </div>

                  <button 
                    disabled={status === 'loading'}
                    type="submit"
                    className="w-full bg-[#00B67A] text-white py-4 rounded-xl font-bold hover:bg-[#008F5E] transition-all shadow-xl shadow-[#00B67A]/20 disabled:opacity-50"
                  >
                    {status === 'loading' ? 'Sending...' : 'Send Message'}
                  </button>
                  
                  {status === 'error' && (
                    <p className="text-red-500 text-sm font-bold text-center">Something went wrong. Please try again.</p>
                  )}
                </form>
              )}
            </motion.div>

            {/* INFO */}
            <motion.div {...fadeInUp} transition={{ delay: 0.2 }} className="space-y-12">
              <div>
                <h4 className="text-xs font-bold text-[#9CA3AF] uppercase mb-6 tracking-widest">Contact Info</h4>
                <div className="flex items-center gap-4 text-[#0A0F1E] font-bold">
                  <Mail className="text-[#00B67A]" size={20} />
                  <span>hello@hire-np.com</span>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-10">
                <div>
                  <h4 className="text-xs font-bold text-[#9CA3AF] uppercase mb-6 tracking-widest">Headquarters</h4>
                  <div className="flex items-start gap-4 text-[#0A0F1E] font-bold leading-relaxed">
                    <MapPin className="text-[#00B67A] shrink-0 mt-1" size={20} />
                    <span>Buffalo, NY, USA</span>
                  </div>
                </div>
                <div>
                  <h4 className="text-xs font-bold text-[#9CA3AF] uppercase mb-6 tracking-widest">Nepal</h4>
                  <div className="flex items-start gap-4 text-[#0A0F1E] font-bold leading-relaxed">
                    <MapPin className="text-[#00B67A] shrink-0 mt-1" size={20} />
                    <span>Kathmandu, Nepal</span>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="text-xs font-bold text-[#9CA3AF] uppercase mb-6 tracking-widest">Business Hours</h4>
                <div className="space-y-4">
                  <div className="flex items-start gap-4 text-[#0A0F1E] font-bold">
                    <Clock className="text-[#00B67A] shrink-0 mt-1" size={20} />
                    <div>
                      <p>🇺🇸 Mon-Fri, 9am-6pm EST</p>
                      <p>🇳🇵 Mon-Fri, 9am-6pm NPT</p>
                    </div>
                  </div>
                  <p className="text-sm text-[#6B7280] font-medium pl-9">
                    "We respond to all inquiries within 24 hours on business days."
                  </p>
                </div>
              </div>

              <div>
                <h4 className="text-xs font-bold text-[#9CA3AF] uppercase mb-6 tracking-widest">Social</h4>
                <div className="flex items-center gap-6">
                  <a href="#" className="text-[#0A0F1E] hover:text-[#00B67A] transition-colors"><Share2 size={24} /></a>
                  <a href="#" className="text-[#0A0F1E] hover:text-[#00B67A] transition-colors"><Globe size={24} /></a>
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
