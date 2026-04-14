"use client";

import React, { useState, useEffect } from "react";
import { 
  Briefcase, 
  MapPin, 
  Clock, 
  ChevronRight,
  ExternalLink,
  Search,
  Filter,
  Loader2,
  Inbox
} from "lucide-react";
import { supabase } from "@/lib/supabaseClient";
import { useAuth } from "@/contexts/AuthContext";
import Link from "next/link";

const STATUS_COLORS = {
  applied: "bg-blue-50 text-blue-600 border-blue-100",
  shortlisted: "bg-teal-50 text-teal-600 border-teal-100",
  interview: "bg-purple-50 text-purple-600 border-purple-100",
  rejected: "bg-red-50 text-red-600 border-red-100",
  offered: "bg-emerald-50 text-emerald-600 border-emerald-100"
};

export default function ApplicationsPage() {
  const { user } = useAuth();
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");

  const fetchApplications = async () => {
    if (!user) return;
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from("applications")
        .select(`
          *,
          jobs (
            id,
            title,
            company_name,
            location,
            type,
            salary
          )
        `)
        .eq("user_id", user.id)
        .order("created_at", { ascending: false });

      if (error) throw error;
      setApplications(data || []);
    } catch (error) {
      console.error("Error fetching applications:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchApplications();
  }, [user]);

  const filteredApps = filter === "all" 
    ? applications 
    : applications.filter(app => app.status === filter);

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-20">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-gray-100 pb-8">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Applications</h1>
          <p className="text-slate-500 font-medium mt-1">Track the status of your journey with every company.</p>
        </div>
        
        <div className="flex items-center gap-1 p-1 bg-gray-50 rounded-lg">
          {["all", "applied", "shortlisted"].map((f) => (
            <button 
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-1.5 rounded-md text-[10px] font-bold uppercase tracking-wider transition-all ${
                filter === f ? "bg-white text-slate-900 shadow-sm" : "text-slate-400 hover:text-slate-600"
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {loading ? (
        <div className="py-20 flex flex-col items-center justify-center gap-4">
          <Loader2 className="animate-spin text-slate-200" size={32} />
          <p className="text-slate-400 font-bold text-xs uppercase tracking-widest">Loading applications...</p>
        </div>
      ) : filteredApps.length > 0 ? (
        <div className="grid grid-cols-1 gap-6">
          {filteredApps.map((app) => (
            <div 
              key={app.id}
              className="group border-b border-gray-100 last:border-0 pb-8 last:pb-0"
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div className="flex items-start gap-5">
                  <div className="w-12 h-12 bg-gray-50 rounded-xl flex items-center justify-center border border-gray-100 transition-colors">
                    <Briefcase className="text-slate-400" size={20} />
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center gap-3">
                      <h3 className="text-lg font-bold text-slate-900 tracking-tight group-hover:text-[#0f9e76] transition-colors">
                        {app.jobs?.title || "Untitled Position"}
                      </h3>
                    </div>
                    <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
                      <p className="text-[#0d4f3c] font-bold text-sm">{app.jobs?.company_name}</p>
                      <div className="flex items-center gap-1.5 text-[10px] text-slate-400 font-bold uppercase tracking-wider">
                        <MapPin size={12} /> {app.jobs?.location || "Remote"}
                      </div>
                      <div className="flex items-center gap-1.5 text-[10px] text-slate-400 font-bold uppercase tracking-wider">
                        <Clock size={12} /> {new Date(app.created_at).toLocaleDateString()}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex flex-row md:flex-col items-center md:items-end gap-4">
                  <div className={`px-3 py-1 rounded-md text-[9px] font-bold uppercase tracking-widest border ${
                    STATUS_COLORS[app.status] || "bg-slate-50 text-slate-400 border-slate-100"
                  }`}>
                    {app.status}
                  </div>
                  <Link 
                    href={`/jobs/${app.job_id}`}
                    className="flex items-center gap-1.5 text-[10px] font-bold text-slate-400 hover:text-[#0f9e76] transition-colors uppercase tracking-widest"
                  >
                    Details <ExternalLink size={10} />
                  </Link>
                </div>
              </div>

              {/* Minimal Status Progress */}
              <div className="mt-6 flex items-center gap-1">
                {[1, 2, 3, 4].map((step) => (
                  <div 
                    key={step} 
                    className={`h-1 flex-1 rounded-full transition-all ${
                      step === 1 ? "bg-emerald-500" : "bg-gray-100"
                    }`}
                  />
                ))}
                <span className="text-[9px] font-bold text-slate-300 ml-4 uppercase tracking-tight">Step 1/4</span>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="py-20 flex flex-col items-center justify-center text-center">
          <div className="w-12 h-12 bg-gray-50 rounded-full flex items-center justify-center mb-4 text-slate-200">
            <Inbox size={24} />
          </div>
          <h4 className="text-slate-900 font-bold">No applications yet</h4>
          <p className="text-slate-500 font-medium text-sm mt-1 max-w-xs">
            {filter === "all" 
              ? "Your future career starts here. Browse jobs to get started."
              : `No applications found for "${filter}".`}
          </p>
          <Link 
            href="/"
            className="mt-6 px-6 py-2.5 bg-slate-900 text-white rounded-lg font-bold text-xs uppercase tracking-wider hover:bg-slate-800 transition-all"
          >
            Find Jobs
          </Link>
        </div>
      )}
    </div>
  );
}
