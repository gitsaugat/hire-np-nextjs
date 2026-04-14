"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/lib/supabaseClient";
import { 
  Briefcase, 
  MapPin, 
  Clock, 
  Users, 
  MoreVertical,
  PlusCircle,
  Search,
  Filter
} from "lucide-react";

export default function MyJobsPage() {
  const { user, isLoggedIn, isLoading } = useAuth();
  const router = useRouter();
  const [jobs, setJobs] = useState([]);
  const [isDataLoading, setIsDataLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    if (!isLoading && !isLoggedIn) {
      router.push("/auth");
    } else if (user && user.role !== 'company_admin' && user.role !== 'company') {
      router.push("/");
    }
  }, [user, isLoggedIn, isLoading, router]);

  const fetchMyJobs = async () => {
    const companyId = user?.company_id;
    if (!companyId) return;
    
    setIsDataLoading(true);
    try {
      // Fetch jobs with applicant counts using join select
      const { data, error } = await supabase
        .from('jobs')
        .select(`
          *,
          applications(count)
        `)
        .eq('company_id', companyId)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setJobs(data || []);
    } catch (err) {
      console.error('Error fetching jobs:', err);
    } finally {
      setIsDataLoading(false);
    }
  };

  useEffect(() => {
    fetchMyJobs();
  }, [user]);

  const toggleJobStatus = async (jobId, currentStatus) => {
    try {
      const { error } = await supabase
        .from('jobs')
        .update({ is_active: !currentStatus })
        .eq('id', jobId);
      
      if (error) throw error;
      setJobs(prev => prev.map(j => j.id === jobId ? { ...j, is_active: !currentStatus } : j));
    } catch (err) {
      alert("Failed to update job status");
    }
  };

  const deleteJob = async (jobId) => {
    if (!confirm("Are you sure you want to delete this job posting? All associated applications will be lost.")) return;
    
    try {
      const { error } = await supabase
        .from('jobs')
        .delete()
        .eq('id', jobId);
      
      if (error) throw error;
      setJobs(prev => prev.filter(j => j.id !== jobId));
    } catch (err) {
      alert("Failed to delete job");
    }
  };

  const filteredJobs = jobs.filter(j => 
    j.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
          <h1 className="text-2xl font-bold text-forest">My Job Postings</h1>
          <p className="text-text-muted mt-1 font-medium">Manage and track your active career opportunities.</p>
        </div>
        <button className="flex items-center gap-2 bg-teal text-white px-6 py-3 rounded-xl font-bold text-sm shadow-lg shadow-teal/20 hover:bg-forest transition-all">
          <PlusCircle size={18} />
          Post New Job
        </button>
      </div>

      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted" size={18} />
          <input 
            type="text" 
            placeholder="Search jobs by title..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-3 bg-white border border-[#f1f5f9] rounded-xl outline-none focus:ring-2 focus:ring-teal/20 focus:border-teal font-medium"
          />
        </div>
        <button className="flex items-center gap-2 px-6 py-3 bg-white border border-[#f1f5f9] rounded-xl text-forest font-bold text-sm hover:bg-[#f8fafc] transition-all">
          <Filter size={18} />
          Filter
        </button>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {filteredJobs.length > 0 ? filteredJobs.map((job) => (
          <div key={job.id} className="bg-white p-6 rounded-2xl shadow-sm border border-transparent hover:border-teal/20 hover:shadow-md transition-all group">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-4">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${job.is_active ? 'bg-teal/5 text-teal' : 'bg-gray-100 text-gray-400'}`}>
                  <Briefcase size={24} />
                </div>
                <div>
                  <div className="flex items-center gap-3">
                    <h3 className="font-bold text-forest group-hover:text-teal transition-colors">{job.title}</h3>
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-tight ${job.is_active ? 'bg-teal/10 text-teal' : 'bg-gray-100 text-gray-400'}`}>
                      {job.is_active ? 'Active' : 'Inactive'}
                    </span>
                  </div>
                  <div className="flex flex-wrap items-center gap-4 mt-1 text-sm text-text-muted font-medium">
                    <span className="flex items-center gap-1.5">
                      <MapPin size={14} />
                      {job.location} ({job.location_type})
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Clock size={14} />
                      {job.job_type}
                    </span>
                    <span className="text-teal font-bold">{job.salary_range || "Competitive"}</span>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <button 
                  onClick={() => toggleJobStatus(job.id, job.is_active)}
                  className={`text-xs font-bold px-3 py-1.5 rounded-lg transition-colors ${job.is_active ? 'text-amber-600 hover:bg-amber-50' : 'text-teal hover:bg-teal/5'}`}
                >
                  {job.is_active ? 'Deactivate' : 'Activate'}
                </button>
                <button 
                  onClick={() => deleteJob(job.id)}
                  className="text-xs font-bold text-red-500 px-3 py-1.5 rounded-lg hover:bg-red-50 transition-colors"
                >
                  Delete
                </button>
              </div>
            </div>
            
            <div className="mt-6 pt-6 border-t border-[#f1f5f9] flex items-center justify-between">
              <div className="flex items-center gap-6">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-text-muted uppercase tracking-wider">Posted:</span>
                  <span className="text-sm font-bold text-forest">{new Date(job.created_at).toLocaleDateString()}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users size={16} className="text-teal" />
                  <span className="text-sm font-bold text-forest">
                    {job.applications?.[0]?.count || 0} Applicants
                  </span>
                </div>
              </div>
              <button className="text-sm font-bold text-teal hover:text-forest transition-colors">
                View & Edit Details
              </button>
            </div>
          </div>
        )) : (
          <div className="bg-white py-20 rounded-2xl shadow-sm border border-dashed border-[#f1f5f9] flex flex-col items-center text-center px-4">
            <div className="w-16 h-16 bg-[#f8fafc] rounded-full flex items-center justify-center text-text-muted mb-4">
              <Briefcase size={32} />
            </div>
            <h3 className="text-lg font-bold text-forest">No jobs found</h3>
            <p className="text-text-muted mt-1 max-w-sm font-medium">Try adjusting your search or create a new job posting.</p>
            <button className="mt-6 bg-teal text-white px-8 py-3 rounded-xl font-bold text-sm shadow-lg shadow-teal/20 hover:bg-forest transition-all">
              Create Job Posting
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
