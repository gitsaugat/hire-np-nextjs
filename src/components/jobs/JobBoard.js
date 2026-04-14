"use client";

import React, { useState, useMemo, useRef, useEffect } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/lib/supabaseClient";
import Logo from "@/components/Logo";
import AuthBanner from "./AuthBanner";
import ChatPopup from "./ChatPopup";
import {
  MapPin,
  Briefcase,
  Clock,
  Search,
  User,
  Settings,
  FileText,
  LogOut,
  Filter,
  X,
  Bookmark,
  Building2,
  CheckCircle2,
  ArrowRight,
  TrendingUp,
  Sparkles
} from "lucide-react";

const FILTER_OPTIONS = {
  type: ["Full-time", "Part-time", "Contract"],
  location: ["Remote", "Onsite", "Hybrid"],
  experience: ["Junior", "Mid", "Senior"]
};

const UserDropdown = () => {
  const { isLoggedIn, logout, user } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) setIsOpen(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-10 h-10 rounded-full bg-slate-100 p-0.5 shadow-sm hover:shadow-md transition-all active:scale-95 flex items-center justify-center border border-slate-200"
      >
        <User size={20} className="text-slate-400" />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-3 w-60 bg-white rounded-2xl shadow-[0_30px_60px_-12px_rgba(0,0,0,0.15)] py-2 z-[100] animate-in fade-in zoom-in-95 duration-200">
          {!isLoggedIn ? (
            <div className="p-2">
              <button
                onClick={() => router.push("/auth")}
                className="w-full flex items-center gap-3 px-4 py-3 text-sm font-bold text-[#0d4f3c] hover:bg-slate-50 rounded-xl transition-colors"
              >
                <div className="w-8 h-8 rounded-full bg-[#0f9e76]/10 flex items-center justify-center">
                  <User size={16} className="text-[#0f9e76]" />
                </div>
                Sign In
              </button>
            </div>
          ) : (
            <>
              <div className="px-4 py-3 border-b border-slate-50 mb-1 text-left">
                <p className="text-sm font-bold text-[#0d4f3c]">{user?.full_name || user?.email || "Member"}</p>
                <p className="text-[11px] text-slate-500 truncate">{user?.email}</p>
              </div>
              {[
                { label: "Profile", icon: User },
                { label: "My Applications", icon: FileText },
                { label: "Settings", icon: Settings },
                { label: "Logout", icon: LogOut, danger: true, onClick: logout },
              ].map((item) => (
                <button
                  key={item.label}
                  onClick={item.onClick}
                  className={`w-full flex items-center justify-between px-4 py-2.5 text-sm font-medium transition-colors ${item.danger ? "text-red-500 hover:bg-red-50" : "text-slate-600 hover:bg-slate-50"}`}
                >
                  <div className="flex items-center gap-3">
                    <item.icon size={16} /> {item.label}
                  </div>
                </button>
              ))}
            </>
          )}
        </div>
      )}
    </div>
  );
};


const Navbar = ({ query, setQuery }) => {
  const { isLoggedIn } = useAuth();
  return (
    <header className="sticky top-0 z-[60] w-full bg-white/70 backdrop-blur-xl border-b border-slate-100 px-4 md:px-8 py-3">
      <div className="w-full mx-auto flex items-center justify-between gap-6 px-4 md:px-8">
        <Link href="/">
          <Logo textColor="text-[#0d4f3c]" />
        </Link>

        <div className="flex-1 max-w-xl hidden md:block">
          <div className="relative group">
            <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-[#0f9e76] transition-colors" />
            <input
              type="text" value={query} onChange={(e) => setQuery(e.target.value)}
              placeholder="Search jobs, roles, or skills..."
              className="w-full bg-[#f8fafc] rounded-2xl py-3.5 pl-11 pr-4 text-sm focus:outline-none focus:ring-4 focus:ring-[#0f9e76]/5 transition-all placeholder:text-slate-400 font-medium"
            />
          </div>
        </div>

        <div className="flex items-center gap-5">
          <div className="hidden lg:flex items-center gap-6 mr-2">
            <a href="#" className="text-sm font-semibold text-slate-600 hover:text-[#0f9e76] transition-colors">Find Jobs</a>
            <a href="#" className="text-sm font-semibold text-slate-600 hover:text-[#0f9e76] transition-colors">Companies</a>
          </div>
          {isLoggedIn ? (
            <>
              <button className="hidden sm:inline-flex items-center gap-2 px-5 py-2.5 bg-[#0d4f3c] text-white text-xs font-bold rounded-xl hover:bg-[#0f9e76] transition-all shadow-md shadow-teal/10">
                Post Job
              </button>
              <div className="h-6 w-px bg-slate-200 hidden sm:block"></div>
              <UserDropdown />
            </>
          ) : (
            <Link
              href="/auth"
              className="hidden sm:inline-flex items-center gap-2 px-6 py-2.5 bg-[#0d4f3c] text-white text-xs font-bold rounded-xl hover:bg-[#0f9e76] transition-all shadow-md shadow-teal/10"
            >
              Sign In
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};
const FilterSection = ({ filters, setFilters }) => {
  const toggleFilter = (key, value) => setFilters(prev => ({ ...prev, [key]: prev[key] === value ? "" : value }));

  return (
    <div className="flex items-center gap-2 py-5 overflow-x-auto no-scrollbar scroll-smooth">
      <div className="flex items-center gap-2 text-slate-900 font-bold text-xs bg-slate-50 px-3 py-2 rounded-xl border border-slate-200 shrink-0 mr-1">
        <Filter size={14} /> FILTERS
      </div>

      {Object.entries(FILTER_OPTIONS).map(([key, options]) => (
        <div key={key} className="flex gap-1.5 shrink-0">
          {options.map(option => (
            <button key={option} onClick={() => toggleFilter(key, option)}
              className={`px-4 py-2 rounded-xl text-[11px] font-bold border transition-all duration-200 ${filters[key] === option
                  ? "bg-[#0d4f3c] border-[#0d4f3c] text-white shadow-lg shadow-[#0d4f3c]/20 scale-[1.02]"
                  : "bg-white border-slate-200 text-slate-500 hover:border-[#0f9e76] hover:text-[#0f9e76] hover:shadow-sm"
                }`}
            >
              {option}
            </button>
          ))}
        </div>
      ))}

      {(filters.type || filters.location || filters.experience) && (
        <button
          onClick={() => setFilters({ type: "", location: "", experience: "" })}
          className="text-[11px] font-bold text-red-500 hover:bg-red-50 px-3 py-2 rounded-xl ml-2 transition-colors whitespace-nowrap"
        >
          Clear all
        </button>
      )}
    </div>
  );
};

const JobCard = ({ job, isActive, onClick }) => (
  <div
    onClick={() => onClick(job)}
    className={`group relative p-4 mb-3 transition-all duration-300 rounded-[24px] cursor-pointer overflow-hidden ${isActive
        ? "bg-white shadow-[0_20px_40px_-12px_rgba(13,79,60,0.12)] scale-[1.01]"
        : "bg-white/40 hover:bg-white hover:shadow-lg"
      }`}
  >
    {/* Active indicator */}
    <div className={`absolute left-0 top-0 bottom-0 w-1.5 bg-gradient-to-b from-[#0d4f3c] to-[#0f9e76] transition-transform duration-300 ${isActive ? "translate-x-0" : "-translate-x-full"}`} />

    <div className="flex gap-4">
      <div className={`shrink-0 w-11 h-11 rounded-1.5xl flex items-center justify-center font-bold text-sm transition-all shadow-sm ${isActive ? "bg-[#0d4f3c] text-white rotate-3" : "bg-slate-50 text-[#0d4f3c] group-hover:bg-[#0f9e76] group-hover:text-white"
        }`}>
        {job.company?.[0]?.toUpperCase() || "J"}
      </div>
      <div className="min-w-0 flex-1">
        <div className="flex items-center justify-between gap-2">
          <h3 className={`font-bold text-[15px] truncate transition-colors ${isActive ? "text-[#0f9e76]" : "text-[#0d4f3c]"}`}>
            {job.title}
          </h3>
          <span className="text-[10px] font-black text-[#0f9e76] bg-[#0f9e76]/5 px-2 py-0.5 rounded-full whitespace-nowrap">
            {job.salary_range}
          </span>
        </div>
        <p className="text-[12px] font-medium text-slate-500 mb-2">{job.company_name}</p>

        <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5">
          <span className="flex items-center gap-1 text-[10px] font-semibold text-slate-400">
            <MapPin size={12} className="text-slate-300" /> {job.location_type}
          </span>
          <span className="flex items-center gap-1 text-[10px] font-semibold text-slate-400">
            <Briefcase size={12} className="text-slate-300" /> {job.experience_level}
          </span>
          <span className="flex items-center gap-1 text-[10px] font-semibold text-slate-400">
            <Clock size={12} className="text-slate-300" /> {new Date(job.created_at).toLocaleDateString()}
          </span>
        </div>
      </div>
    </div>

    <div className="flex flex-wrap gap-1.5 mt-3 pt-3 border-t border-slate-50">
      {(job.tags || []).map(tag => (
        <span key={tag} className="px-2 py-0.5 rounded-lg bg-slate-50 text-slate-500 text-[9px] font-bold uppercase tracking-wider group-hover:bg-[#0f9e76]/5 group-hover:text-[#0f9e76] transition-colors">
          {tag}
        </span>
      ))}
    </div>
  </div>
);

const JobDetail = ({ job, onChatOpen }) => {
  const { isLoggedIn, user } = useAuth();
  const router = useRouter();

  const handleApply = async () => {
    if (!isLoggedIn) {
      router.push(`/auth?jobId=${job.id}`);
      return;
    }

    try {
      const { error } = await supabase
        .from('applications')
        .insert([
          { job_id: job.id, candidate_id: user.id, status: 'applied', ai_score: Math.floor(Math.random() * 20) + 80 }
        ]);

      if (error) throw error;
      alert("Application submitted successfully!");
    } catch (err) {
      console.error('Application error:', err);
      alert("Error submitting application: " + err.message);
    }
  };

  if (!job) return (
    <div className="h-full flex flex-col items-center justify-center text-slate-300">
      <div className="p-8 rounded-full bg-slate-50 mb-4 animate-pulse">
        <Search size={48} />
      </div>
      <p className="font-semibold tracking-tight">Select a job to view details</p>
    </div>
  );

  return (
    <div className="bg-white rounded-[32px] shadow-[0_30px_60px_-12px_rgba(13,79,60,0.08)] h-full flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-2 duration-400">
      {/* Compact Header */}
      <div className="p-6 bg-gradient-to-br from-[#0f9e76]/5 via-white to-white relative overflow-hidden shrink-0 border-b border-slate-50">
        <div className="absolute -top-10 -right-10 w-32 h-32 bg-[#0f9e76]/5 rounded-full blur-2xl" />

        <div className="relative flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="flex gap-4 items-center">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#0d4f3c] to-[#0f9e76] text-white flex items-center justify-center font-black text-xl shadow-lg shadow-teal/10">
              {job.company_name?.[0]?.toUpperCase() || "J"}
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <h1 className="text-2xl font-black text-[#0d4f3c] tracking-tight">{job.title}</h1>
                <span className="bg-[#0f9e76] text-white text-[8px] font-black px-2 py-0.5 rounded-full">LIVE</span>
              </div>
              <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-slate-500 font-bold text-[12px]">
                <span className="flex items-center gap-1.5 text-[#0f9e76]"><Building2 size={13} /> {job.company_name}</span>
                <span className="flex items-center gap-1.5"><MapPin size={13} /> {job.location}</span>
                <span className="text-[#0d4f3c]">{job.salary_range}</span>
              </div>
            </div>
          </div>

          <div className="flex gap-2 items-center">
            <button
              onClick={onChatOpen}
              className="flex items-center justify-center gap-2 px-5 py-2.5 bg-white border border-slate-200 text-teal-600 text-sm font-bold rounded-xl hover:border-teal-500 hover:bg-teal-50 transition-all shadow-sm group/chat shrink-0"
            >
              <Sparkles size={16} className="text-teal-500 group-hover/chat:scale-110 transition-transform" />
              <span className="hidden sm:inline">Chat with HireNP</span>
              <span className="sm:hidden">Chat</span>
            </button>
            
            {isLoggedIn ? (
              <button
                onClick={handleApply}
                className="flex-1 lg:flex-none flex items-center justify-center gap-2 px-6 py-2.5 bg-[#0d4f3c] text-white text-sm font-bold rounded-xl hover:bg-[#0f9e76] transition-all shadow-lg shadow-teal/10"
              >
                Apply <ArrowRight size={16} />
              </button>
            ) : (
              <button
                onClick={handleApply}
                className="flex-1 lg:flex-none flex items-center justify-center gap-2 px-6 py-2.5 bg-[#0d4f3c] text-white text-sm font-bold rounded-xl hover:bg-[#0f9e76] transition-all shadow-lg shadow-teal/10"
              >
                Sign In
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Content Area */}
      <div className="flex-1 overflow-y-auto p-6 custom-scrollbar">
        <div className="max-w-3xl space-y-8">
          <section>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-1 h-4 bg-[#0f9e76] rounded-full" />
              <h3 className="text-sm font-black text-[#0d4f3c] uppercase tracking-wider">Mission</h3>
            </div>
            <p className="text-slate-600 leading-relaxed text-[15px] font-medium">{job.description}</p>
          </section>

          <section>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-1 h-4 bg-[#0d4f3c] rounded-full" />
              <h3 className="text-sm font-black text-[#0d4f3c] uppercase tracking-wider">Core Competencies</h3>
            </div>
            <div className="space-y-3">
              {(job.responsibilities || []).map((r, i) => (
                <div key={i} className="flex gap-4 p-3 rounded-xl hover:bg-slate-50 transition-colors group">
                  <div className="w-5 h-5 rounded-full bg-[#0f9e76]/10 flex items-center justify-center shrink-0 mt-0.5">
                    <CheckCircle2 size={12} className="text-[#0f9e76]" />
                  </div>
                  <p className="text-slate-600 text-[13px] font-semibold leading-relaxed">{r}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="bg-[#0d4f3c]/5 rounded-[24px] p-6 relative overflow-hidden">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-1 h-4 bg-[#0d4f3c] rounded-full" />
              <h3 className="text-sm font-black text-[#0d4f3c] uppercase tracking-wider">Requirements</h3>
            </div>
            <ul className="space-y-3">
              {(job.requirements || []).map((r, i) => (
                <li key={i} className="flex gap-4 items-start text-slate-700 text-[13px] font-semibold leading-relaxed">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#0f9e76] mt-1.5 shrink-0" />
                  {r}
                </li>
              ))}
            </ul>
          </section>
        </div>
      </div>
    </div>
  );
};

export default function JobBoard() {
  const { isLoggedIn } = useAuth();
  const searchParams = useSearchParams();
  const [query, setQuery] = useState("");
  const [filters, setFilters] = useState({ type: "", location: "", experience: "" });
  const [jobs, setJobs] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isChatOpen, setIsChatOpen] = useState(false);

  // Fetch jobs from Supabase
  useEffect(() => {
    const fetchJobs = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from('jobs')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching jobs:', error);
      } else {
        setJobs(data || []);
        if (data && data.length > 0 && !selectedId) {
          setSelectedId(data[0].id);
        }
      }
      setLoading(false);
    };

    fetchJobs();
  }, []);

  // Sync selection with URL jobId param
  useEffect(() => {
    const jobId = searchParams.get("jobId");
    if (jobId && jobs.length > 0) {
      const id = jobId; 
      if (jobs.some(j => j.id === id)) {
        setSelectedId(id);
      }
    }
  }, [searchParams, jobs]);

  const filteredJobs = useMemo(() => jobs.filter(j =>
    (j.title.toLowerCase().includes(query.toLowerCase()) || j.company_name?.toLowerCase().includes(query.toLowerCase())) &&
    (!filters.type || j.job_type === filters.type) && (!filters.location || j.location_type === filters.location) &&
    (!filters.experience || j.experience_level === filters.experience)
  ), [query, filters, jobs]);

  const activeJob = filteredJobs.find(j => j.id === selectedId) || filteredJobs[0];

  return (
    <div className="min-h-screen bg-slate-50/50">
      <Navbar query={query} setQuery={setQuery} />

      <main className="max-w-7xl mx-auto px-6 md:px-10 pt-6">
        <AuthBanner isAuthenticated={isLoggedIn} />
        <FilterSection filters={filters} setFilters={setFilters} />

        <div className="flex flex-col lg:flex-row gap-4 h-[calc(100vh-160px)] pb-6">
          {/* List Column */}
          <div className="w-full lg:w-[380px] xl:w-[420px] shrink-0 flex flex-col pt-1">
            <div className="flex items-center justify-between mb-4 px-2">
              <h2 className="text-xs font-black text-slate-400 uppercase tracking-widest">
                Live Openings — {filteredJobs.length}
              </h2>
              <div className="flex items-center gap-1.5 text-[10px] font-bold text-[#0f9e76] bg-[#0f9e76]/5 px-2 py-0.5 rounded-full">
                <div className="w-1.5 h-1.5 rounded-full bg-[#0f9e76] animate-pulse" /> Live
              </div>
            </div>

            <div className="flex-1 overflow-y-auto pr-1 custom-scrollbar space-y-1">
              {loading ? (
                <div className="flex flex-col gap-3">
                  {[1, 2, 3].map(i => (
                    <div key={i} className="h-32 bg-white/50 rounded-2xl animate-pulse" />
                  ))}
                </div>
              ) : filteredJobs.length > 0 ? (
                filteredJobs.map(j => <JobCard key={j.id} job={j} isActive={activeJob?.id === j.id} onClick={(job) => setSelectedId(job.id)} />)
              ) : (
                <div className="py-20 text-center bg-white rounded-3xl border border-dashed border-slate-200">
                  <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4 text-slate-300">
                    <Search size={32} />
                  </div>
                  <p className="text-slate-500 font-bold">No results found</p>
                  <button onClick={() => { setQuery(""); setFilters({ type: "", location: "", experience: "" }); }} className="text-[#0f9e76] text-xs font-bold mt-2 hover:underline">Reset Search</button>
                </div>
              )}
            </div>
          </div>

          {/* Detail Column */}
          <div className="hidden lg:block flex-1 h-full">
            <JobDetail job={activeJob} onChatOpen={() => setIsChatOpen(true)} />
          </div>

          {/* Mobile Detail Overlay */}
          {activeJob && (
            <div className="lg:hidden mt-4 pb-10">
              <JobDetail job={activeJob} onChatOpen={() => setIsChatOpen(true)} />
            </div>
          )}
        </div>
      </main>

      {/* Chat Assistant */}
      <ChatPopup 
        isOpen={isChatOpen} 
        onClose={() => setIsChatOpen(false)} 
        job={activeJob}
      />

      {/* Mobile Search */}
      <div className="md:hidden sticky bottom-6 mx-4 z-50">
        <div className="relative shadow-2xl">
          <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text" value={query} onChange={(e) => setQuery(e.target.value)}
            placeholder="Quick search..."
            className="w-full bg-white border border-slate-200 rounded-2xl py-3.5 pl-11 pr-4 shadow-xl focus:ring-4 focus:ring-[#0f9e76]/10 outline-none"
          />
        </div>
      </div>
    </div>
  );
}
