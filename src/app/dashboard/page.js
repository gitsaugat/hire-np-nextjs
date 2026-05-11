"use client";

import React from 'react';
import { 
  RefreshCw, 
  BarChart3, 
  Briefcase, 
  Users, 
  Zap, 
  Mail, 
  CheckCircle2,
  AlertCircle,
  Calendar,
  Undo2,
  FileCheck,
  TrendingUp,
  ChevronRight,
  Circle,
  Eye,
  Archive,
  MoreVertical
} from 'lucide-react';

const JOBS = [
  { id: 1, title: "Senior Product Designer", dept: "Design", location: "Remote", applicants: 24, status: "Active" },
  { id: 2, title: "Frontend Engineer (React)", dept: "Engineering", location: "Remote", applicants: 42, status: "Active" },
  { id: 3, title: "Product Manager", dept: "Product", location: "Remote", applicants: 18, status: "Active" },
];

const stats = [
  { label: 'JOBS', value: '8', icon: Briefcase, color: 'text-blue-500', bg: 'bg-blue-50' },
  { label: 'POOL', value: '3', icon: Users, color: 'text-emerald-500', bg: 'bg-emerald-50' },
  { label: 'SAVED', value: '22h', icon: Zap, color: 'text-orange-500', bg: 'bg-orange-50' },
  { label: 'EMAILS', value: '4', icon: Mail, color: 'text-purple-500', bg: 'bg-purple-50' },
  { label: 'OFFERS', value: '0', icon: FileCheck, color: 'text-slate-500', bg: 'bg-slate-50' },
];

const attentionItems = [
  { label: 'PENDING AI ANALYSIS', value: '0', icon: Zap, color: 'text-blue-400', bg: 'bg-blue-50/50' },
  { label: 'WAITING FOR INVITE', value: '0', icon: Calendar, color: 'text-emerald-400', bg: 'bg-emerald-50/50' },
  { label: 'RESCHEDULE REQUESTS', value: '0', icon: RefreshCw, color: 'text-orange-400', bg: 'bg-orange-50/50' },
  { label: 'UNSIGNED OFFERS', value: '0', icon: FileCheck, color: 'text-pink-400', bg: 'bg-pink-50/50' },
];

const checklistItems = [
  { label: 'Company profile', completed: true },
  { label: 'Google Calendar', completed: true },
  { label: 'First job', completed: true },
  { label: 'Availability', completed: false, active: true },
  { label: 'Email setup', completed: true },
  { label: 'Team invite', completed: false, active: true },
];

export default function DashboardPage() {
  return (
    <div className="p-10 space-y-10 max-w-[1600px] mx-auto">
      {/* Top Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-black text-slate-800 tracking-tight">Hiring Intelligence Overview</h1>
        <div className="flex items-center gap-3">
          <button className="p-2.5 bg-white border border-slate-100 rounded-xl text-slate-400 hover:text-slate-600 hover:bg-slate-50 transition-all shadow-sm">
            <RefreshCw size={18} />
          </button>
          <button className="flex items-center gap-2 px-5 py-2.5 bg-[#0F172A] text-white rounded-xl text-xs font-black tracking-widest uppercase hover:bg-slate-800 transition-all shadow-lg shadow-slate-200">
            <BarChart3 size={16} />
            ANALYTICS
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-5 gap-6">
        {stats.map((stat) => (
          <div key={stat.label} className="bg-white p-8 rounded-[2.5rem] border border-slate-50 shadow-sm hover:shadow-md transition-all group cursor-pointer">
            <div className={`w-12 h-12 ${stat.bg} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
              <stat.icon className={stat.color} size={24} />
            </div>
            <p className="text-[10px] font-black text-slate-400 tracking-[0.2em] mb-1">{stat.label}</p>
            <p className="text-4xl font-black text-slate-800">{stat.value}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-12 gap-8">
        {/* Left Column (9/12) */}
        <div className="col-span-9 space-y-10">
          {/* Needs Attention Section */}
          <section>
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-xl font-black text-slate-800 tracking-tight">Today / Needs Attention</h2>
                <p className="text-[10px] font-black text-slate-400 tracking-[0.15em] uppercase">Critical items requiring your action</p>
              </div>
              <button className="flex items-center gap-1.5 text-[10px] font-black text-slate-400 tracking-widest uppercase hover:text-emerald-600 transition-colors">
                Full Queue <ChevronRight size={14} />
              </button>
            </div>
            <div className="grid grid-cols-4 gap-6">
              {attentionItems.map((item) => (
                <div key={item.label} className="bg-white p-8 rounded-[2.5rem] border border-slate-50 shadow-sm flex flex-col items-start hover:border-emerald-100 transition-all group">
                  <div className={`w-10 h-10 ${item.bg} rounded-xl flex items-center justify-center mb-6 group-hover:rotate-12 transition-transform`}>
                    <item.icon className={item.color} size={20} />
                  </div>
                  <p className="text-4xl font-black text-slate-800 mb-2">{item.value}</p>
                  <p className="text-[9px] font-black text-slate-400 tracking-[0.15em] uppercase leading-tight">{item.label}</p>
                </div>
              ))}
            </div>
          </section>

          {/* ROI and Pipeline Funnel Row */}
          <div className="grid grid-cols-2 gap-8">
            {/* Recruitment ROI Card */}
            <div className="bg-[#0F172A] rounded-[3rem] p-10 text-white relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-full -mr-32 -mt-32 blur-[80px]"></div>
              
              <div className="flex items-center justify-between mb-10 relative z-10">
                <div className="w-14 h-14 bg-emerald-500/20 border border-emerald-500/30 rounded-2xl flex items-center justify-center">
                  <TrendingUp className="text-emerald-400" size={28} />
                </div>
                <div className="bg-emerald-500/20 border border-emerald-500/30 px-3 py-1 rounded-full flex items-center gap-1.5">
                  <span className="text-[10px] font-black text-emerald-400">58.3% ROI</span>
                </div>
              </div>

              <h3 className="text-2xl font-black mb-1 relative z-10">Recruitment ROI</h3>
              <p className="text-[10px] font-bold text-slate-400 tracking-wider uppercase mb-8 relative z-10">Platform savings summary</p>

              <div className="space-y-6 relative z-10">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-black text-slate-400 tracking-[0.2em] uppercase">Agency Fees Saved</span>
                  <span className="text-lg font-black tracking-tight">NPR 0</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-black text-slate-400 tracking-[0.2em] uppercase">Hours Saved</span>
                  <span className="text-lg font-black tracking-tight">22h</span>
                </div>
                <div className="pt-6 border-t border-slate-800">
                  <p className="text-[10px] font-black text-emerald-500 tracking-[0.2em] uppercase mb-1">Total Saved</p>
                  <p className="text-5xl font-black tracking-tight">NPR 11,150</p>
                </div>
              </div>
            </div>

            {/* Pipeline Funnel */}
            <div className="bg-white rounded-[3rem] p-10 border border-slate-50 shadow-sm">
              <h3 className="text-2xl font-black text-slate-800 mb-1">Pipeline Funnel</h3>
              <p className="text-[10px] font-black text-slate-400 tracking-wider uppercase mb-10">Candidate Progression</p>

              <div className="space-y-3">
                {[
                  { label: 'Applied', count: 4, percent: 100, width: 'w-full', opacity: 'bg-emerald-900/90' },
                  { label: 'AI Analyzed', count: 4, percent: 100, width: 'w-full', opacity: 'bg-emerald-800/80' },
                  { label: 'Invited', count: 2, percent: 50, width: 'w-2/3', opacity: 'bg-emerald-700/70' },
                  { label: 'Accepted', count: 1, percent: 25, width: 'w-1/3', opacity: 'bg-emerald-600/60' },
                ].map((step, i) => (
                  <div key={step.label} className="flex flex-col items-center">
                    <div className={`${step.width} ${step.opacity} py-3 px-4 flex items-center justify-center text-white relative group transition-all hover:scale-[1.02] cursor-pointer`} 
                         style={{ clipPath: i === 0 ? 'none' : `polygon(${(i*5)}% 0%, ${100-(i*5)}% 0%, ${100-((i+1)*5)}% 100%, ${((i+1)*5)}% 100%)` }}>
                      <span className="text-[9px] font-black uppercase tracking-widest">{step.label}: {step.count} ({step.percent}%)</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Recent Jobs Section */}
          <section>
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-xl font-black text-slate-800 tracking-tight">Active Job Listings</h2>
                <p className="text-[10px] font-black text-slate-400 tracking-[0.15em] uppercase">Manage your open positions</p>
              </div>
              <button className="flex items-center gap-1.5 text-[10px] font-black text-slate-400 tracking-widest uppercase hover:text-emerald-600 transition-colors">
                All Jobs <ChevronRight size={14} />
              </button>
            </div>
            <div className="bg-white rounded-[2.5rem] border border-slate-50 shadow-sm overflow-hidden">
              <div className="divide-y divide-slate-50">
                {JOBS.map((job) => (
                  <div key={job.id} className="p-6 flex items-center justify-between hover:bg-slate-50/50 transition-colors cursor-pointer group">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center text-slate-400 font-bold group-hover:bg-emerald-50 group-hover:text-emerald-500 transition-colors">
                        {job.title.charAt(0)}
                      </div>
                      <div>
                        <h4 className="font-bold text-slate-800">{job.title}</h4>
                        <p className="text-[10px] font-black text-slate-400 tracking-wider uppercase">{job.dept} • {job.location}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-6">
                      <div className="text-right">
                        <p className="font-black text-slate-800">{job.applicants}</p>
                        <p className="text-[9px] font-black text-slate-400 tracking-widest uppercase">Applicants</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <button className="p-2 rounded-xl hover:bg-white hover:shadow-sm text-slate-400 hover:text-blue-500 transition-all">
                          <Eye size={18} />
                        </button>
                        <button className="p-2 rounded-xl hover:bg-white hover:shadow-sm text-slate-400 hover:text-orange-500 transition-all">
                          <BarChart3 size={18} />
                        </button>
                        <button className="p-2 rounded-xl hover:bg-white hover:shadow-sm text-slate-400 hover:text-rose-500 transition-all">
                          <Archive size={18} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </div>

        {/* Right Column (3/12) - Setup Checklist */}
        <div className="col-span-3">
          <div className="bg-[#0F172A] rounded-[3rem] p-10 text-white h-full relative overflow-hidden flex flex-col">
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-slate-900/50 to-transparent"></div>
            
            <div className="relative z-10 mb-10">
              <div className="flex items-center justify-between mb-1">
                <h3 className="text-2xl font-black tracking-tight">Setup Checklist</h3>
                <div className="flex flex-col items-end">
                  <span className="text-2xl font-black text-emerald-400">67%</span>
                  <span className="text-[8px] font-black text-slate-400 tracking-widest uppercase">Complete</span>
                </div>
              </div>
              <p className="text-[9px] font-black text-slate-400 tracking-widest uppercase">Platform Readiness</p>
            </div>

            <div className="relative z-10 space-y-6 flex-grow">
              {checklistItems.map((item) => (
                <div key={item.label} className={`flex items-center justify-between group cursor-pointer transition-all ${item.completed ? 'opacity-100' : 'opacity-60 hover:opacity-100'}`}>
                  <div className="flex items-center gap-4">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${
                      item.completed 
                        ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' 
                        : 'bg-slate-800 text-slate-500 border border-slate-700'
                    }`}>
                      {item.completed ? <CheckCircle2 size={16} /> : <Circle size={16} />}
                    </div>
                    <span className={`text-sm font-bold tracking-tight transition-colors ${item.completed ? 'text-slate-300' : 'text-slate-500 group-hover:text-slate-300'}`}>
                      {item.label}
                    </span>
                  </div>
                  {item.active && !item.completed && <ChevronRight size={16} className="text-slate-600 group-hover:text-slate-400" />}
                </div>
              ))}
            </div>

            <div className="relative z-10 mt-10 pt-10 border-t border-slate-800">
              <p className="text-[9px] font-black text-slate-500 tracking-widest uppercase mb-4">Live Status</p>
              <div className="flex items-center gap-3 bg-slate-800/40 p-4 rounded-2xl border border-slate-800/60">
                <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></div>
                <span className="text-xs font-black text-slate-300 tracking-tight uppercase">System Online</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
