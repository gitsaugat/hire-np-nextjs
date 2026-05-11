"use client";
import React from 'react';
import { Eye, Archive, BarChart3, MoreVertical, Plus, Search, Filter } from 'lucide-react';

const JOBS = [
  { id: 1, title: "Senior Product Designer", dept: "Design", location: "Remote", applicants: 24, status: "Active" },
  { id: 2, title: "Frontend Engineer (React)", dept: "Engineering", location: "New York / Remote", applicants: 42, status: "Active" },
  { id: 3, title: "Product Manager", dept: "Product", location: "London / Remote", applicants: 18, status: "Active" },
  { id: 4, title: "Backend Developer (Node.js)", dept: "Engineering", location: "Remote", applicants: 31, status: "Draft" },
  { id: 5, title: "Marketing Specialist", dept: "Marketing", location: "San Francisco", applicants: 12, status: "Active" },
  { id: 6, title: "Customer Success Lead", dept: "Operations", location: "Remote", applicants: 9, status: "Active" },
  { id: 7, title: "Sales Executive", dept: "Sales", location: "Remote", applicants: 56, status: "Closed" },
  { id: 8, title: "HR Generalist", dept: "HR", location: "Remote", applicants: 15, status: "Active" },
];

const JobListingsMockup = () => {
  return (
    <div className="w-full h-full bg-white flex flex-col">
      {/* Header */}
      <div className="px-6 py-4 border-b border-black/[0.06] flex items-center justify-between bg-[#FAFAF7]">
        <div>
          <h3 className="text-lg font-bold text-ink-900 tracking-tight">Job Listings</h3>
          <p className="text-[10px] font-bold text-ink-300 uppercase tracking-widest">Manage your open positions</p>
        </div>
        <button className="flex items-center gap-2 px-3 py-1.5 bg-brand-primary text-white rounded-lg text-[11px] font-bold shadow-brand hover:bg-brand-deep transition-colors">
          <Plus size={14} /> POST A NEW JOB
        </button>
      </div>

      {/* Filters */}
      <div className="px-6 py-3 border-b border-black/[0.04] flex items-center gap-3">
        <div className="relative flex-1">
          <Search size={12} className="absolute left-3 top-1/2 -translate-y-1/2 text-ink-300" />
          <input 
            disabled 
            placeholder="Search jobs..." 
            className="w-full pl-9 pr-4 py-1.5 bg-[#F8F9FB] border border-black/[0.04] rounded-md text-[11px] outline-none" 
          />
        </div>
        <button className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-md border border-black/[0.06] text-ink-500 text-[10px] font-bold">
          <Filter size={12} /> Filter
        </button>
      </div>

      {/* List */}
      <div className="flex-1 overflow-y-auto px-6 py-4 space-y-2">
        {JOBS.map((job) => (
          <div key={job.id} className="group flex items-center justify-between p-3 rounded-xl border border-black/[0.04] hover:border-brand-primary/20 hover:bg-emerald-50/30 transition-all cursor-pointer">
            <div className="flex items-center gap-4">
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                job.status === 'Active' ? 'bg-emerald-50 text-brand-primary' : 
                job.status === 'Draft' ? 'bg-amber-50 text-amber-500' : 'bg-slate-50 text-slate-400'
              }`}>
                <div className="font-bold text-xs">{job.title.charAt(0)}</div>
              </div>
              <div>
                <h4 className="text-[13px] font-bold text-ink-900 leading-tight">{job.title}</h4>
                <div className="flex items-center gap-2 mt-0.5">
                  <span className="text-[10px] text-ink-400 font-medium">{job.dept}</span>
                  <span className="w-1 h-1 rounded-full bg-ink-200" />
                  <span className="text-[10px] text-ink-400 font-medium">{job.location}</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-6">
              <div className="text-right hidden sm:block">
                <p className="text-[13px] font-bold text-ink-900 leading-none">{job.applicants}</p>
                <p className="text-[9px] font-bold text-ink-300 uppercase tracking-wider mt-1">Applicants</p>
              </div>
              
              <div className="flex items-center gap-1.5">
                <button className="p-2 rounded-lg hover:bg-white hover:shadow-sm text-ink-400 hover:text-brand-primary transition-all" title="View Details">
                  <Eye size={16} />
                </button>
                <button className="p-2 rounded-lg hover:bg-white hover:shadow-sm text-ink-400 hover:text-amber-500 transition-all" title="Analytics">
                  <BarChart3 size={16} />
                </button>
                <button className="p-2 rounded-lg hover:bg-white hover:shadow-sm text-ink-400 hover:text-rose-500 transition-all" title="Archive">
                  <Archive size={16} />
                </button>
                <button className="p-2 rounded-lg hover:bg-white hover:shadow-sm text-ink-400 transition-all">
                  <MoreVertical size={16} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default JobListingsMockup;
