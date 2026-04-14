"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/lib/supabaseClient";
import { 
  Search, 
  Zap, 
  Briefcase, 
  Mail, 
  Phone, 
  MoreVertical, 
  Clock, 
  CheckCircle2, 
  Users 
} from "lucide-react";

export default function ApplicantsPage() {
  const { user, isLoggedIn, isLoading } = useAuth();
  const router = useRouter();
  const [applicants, setApplicants] = useState([]);
  const [isDataLoading, setIsDataLoading] = useState(true);
  const [filterStatus, setFilterStatus] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    if (!isLoading && !isLoggedIn) {
      router.push("/auth");
    } else if (user && user.role !== 'company_admin' && user.role !== 'company') {
      router.push("/");
    }
  }, [user, isLoggedIn, isLoading, router]);

  const fetchApplicants = async () => {
    const companyId = user?.company_id;
    if (!companyId) return;

    setIsDataLoading(true);
    try {
      const { data: companyJobs, error: jobsError } = await supabase
        .from('jobs')
        .select('id')
        .eq('company_id', companyId);

      if (jobsError) throw jobsError;
      
      const jobIds = companyJobs.map(j => j.id);
      
      if (jobIds.length > 0) {
        const { data, error } = await supabase
          .from('applications')
          .select(`
            *,
            users:user_id (
              email,
              profiles (full_name, location)
            ),
            jobs (title),
            application_ai_data (match_score)
          `)
          .in('job_id', jobIds)
          .order('created_at', { ascending: false });

        if (error) throw error;
        
        // Flatten data
        const processedApps = data.map(app => {
          const profile = app.users?.profiles?.[0];
          return {
            ...app,
            profiles: profile,
            full_name: profile?.full_name || app.users?.email || 'Unknown',
            email: app.users?.email,
            ai_score: app.application_ai_data?.[0]?.match_score || 0
          };
        });
        
        setApplicants(processedApps || []);
      }
    } catch (err) {
      console.error('Error fetching applicants:', err);
    } finally {
      setIsDataLoading(false);
    }
  };

  useEffect(() => {
    fetchApplicants();
  }, [user]);

  const updateStatus = async (appId, newStatus) => {
    try {
      const { error } = await supabase
        .from('applications')
        .update({ status: newStatus })
        .eq('id', appId);
      
      if (error) throw error;
      setApplicants(prev => prev.map(a => a.id === appId ? { ...a, status: newStatus } : a));
    } catch (err) {
      alert("Failed to update status");
    }
  };

  const filteredApplicants = applicants.filter(app => {
    const matchesSearch = 
      app.profiles?.full_name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      app.jobs?.title?.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = filterStatus === "all" || app.status === filterStatus;
    
    return matchesSearch && matchesStatus;
  });

  if (isLoading || isDataLoading) {
    return (
      <div className="min-h-[400px] flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-teal"></div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-forest">Applicants Tracking</h1>
          <p className="text-text-muted mt-1 font-medium">Review and manage candidates specifically matched for your roles.</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="px-4 py-2 bg-teal/10 rounded-xl text-teal text-xs font-bold uppercase tracking-wider border border-teal/20">
            {filteredApplicants.length} Candidates Found
          </div>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted" size={18} />
          <input 
            type="text" 
            placeholder="Search candidates by name or role..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-3 bg-white border border-[#f1f5f9] rounded-xl outline-none focus:ring-2 focus:ring-teal/20 focus:border-teal font-medium"
          />
        </div>
        <div className="flex items-center gap-2">
          <select 
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-6 py-3 bg-white border border-[#f1f5f9] rounded-xl text-forest font-bold text-sm outline-none focus:ring-2 focus:ring-teal/20"
          >
            <option value="all">All Status</option>
            <option value="applied">Applied</option>
            <option value="shortlisted">Shortlisted</option>
            <option value="interview">Interview</option>
            <option value="offered">Offered</option>
            <option value="rejected">Rejected</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {filteredApplicants.length > 0 ? filteredApplicants.map((app) => (
          <div key={app.id} className="bg-white p-6 rounded-2xl shadow-sm border border-transparent hover:border-teal/20 hover:shadow-md transition-all group">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 bg-forest/5 text-forest rounded-2xl flex items-center justify-center font-bold text-xl uppercase">
                  {app.full_name?.split(' ').map(n => n[0]).join('') || "?"}
                </div>
                <div>
                  <h3 className="text-lg font-bold text-forest group-hover:text-teal transition-colors">
                    {app.full_name}
                  </h3>
                  <div className="flex flex-wrap items-center gap-4 mt-1 text-sm text-text-muted font-medium">
                    <span className={`flex items-center gap-1.5 font-bold px-2 py-0.5 rounded-lg ${
                      app.ai_score >= 80 ? 'bg-teal/10 text-teal' : 'bg-amber-50 text-amber-600'
                    }`}>
                      <Zap size={14} />
                      AI Match: {app.ai_score || 0}%
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Briefcase size={14} />
                      Applied for {app.jobs?.title}
                    </span>
                  </div>
                </div>
              </div>
              
              <div className="flex flex-wrap items-center gap-3">
                {app.email && (
                  <div className="flex items-center gap-2 px-4 py-2 bg-[#f8fafc] border border-[#f1f5f9] rounded-xl text-text-muted">
                    <Mail size={16} />
                    <span className="text-xs font-bold">{app.email}</span>
                  </div>
                )}
                {app.profiles?.location && (
                  <div className="flex items-center gap-2 px-4 py-2 bg-[#f8fafc] border border-[#f1f5f9] rounded-xl text-text-muted">
                    <Phone size={16} />
                    <span className="text-xs font-bold">{app.profiles?.location}</span>
                  </div>
                )}
                <button className="p-2 hover:bg-[#f8fafc] rounded-lg text-text-muted transition-colors">
                  <MoreVertical size={20} />
                </button>
              </div>
            </div>

            <div className="mt-6 pt-6 border-t border-[#f1f5f9] flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2 text-sm">
                  <Clock size={16} className="text-text-muted" />
                  <span className="text-text-muted font-medium">Applied on {new Date(app.created_at).toLocaleDateString()}</span>
                </div>
                <div className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest ${
                  app.status === 'shortlisted' ? 'bg-forest text-white' : 
                  app.status === 'offered' ? 'bg-teal text-white' :
                  app.status === 'rejected' ? 'bg-red-500 text-white' :
                  'bg-teal/10 text-teal'
                }`}>
                  {app.status}
                </div>
              </div>
              <div className="flex gap-3">
                <button className="flex-1 md:flex-none px-6 py-2.5 rounded-xl border border-[#f1f5f9] text-forest font-bold text-sm hover:bg-[#f8fafc] transition-all">
                  View Profile
                </button>
                {app.status === 'applied' && (
                  <button 
                    onClick={() => updateStatus(app.id, 'shortlisted')}
                    className="flex-1 md:flex-none px-6 py-2.5 rounded-xl bg-forest text-white font-bold text-sm hover:bg-teal transition-all flex items-center justify-center gap-2"
                  >
                    <CheckCircle2 size={16} />
                    Shortlist
                  </button>
                )}
              </div>
            </div>
          </div>
        )) : (
          <div className="bg-white py-20 rounded-2xl shadow-sm border border-dashed border-[#f1f5f9] flex flex-col items-center text-center px-4">
            <div className="w-16 h-16 bg-[#f8fafc] rounded-full flex items-center justify-center text-text-muted mb-4">
              <Users size={32} />
            </div>
            <h3 className="text-lg font-bold text-forest">No applicants found</h3>
            <p className="text-text-muted mt-1 max-w-sm font-medium">Try adjusting your filters or search query.</p>
          </div>
        )}
      </div>
    </div>
  );
}

