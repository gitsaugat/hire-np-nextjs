"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/lib/supabaseClient";
import {
  Users,
  Briefcase,
  Zap,
  TrendingUp,
  ArrowUpRight,
  MoreVertical,
  Plus
} from "lucide-react";

// Types for stats
// const stats = ... moved inside component for dynamic values

export default function DashboardPage() {
  const { user, isLoggedIn, isLoading } = useAuth();
  const router = useRouter();
  const [jobs, setJobs] = useState([]);
  const [applicants, setApplicants] = useState([]);
  const [statsData, setStatsData] = useState({
    activeJobs: 0,
    totalApplicants: 0,
    aiShortlisted: 0,
    shortlisted: 0,
    interview: 0,
    offered: 0
  });
  const [isDataLoading, setIsDataLoading] = useState(true);

  useEffect(() => {
    if (!isLoading && !isLoggedIn) {
      router.push("/auth");
    } else if (user && user.role !== 'company_admin' && user.role !== 'company') {
      router.push("/");
    }
  }, [user, isLoggedIn, isLoading, router]);

  useEffect(() => {
    const fetchDashboardData = async () => {
      // Use company_id from AuthContext now that we fixed it
      const companyId = user?.company_id;
      if (!companyId) return;

      setIsDataLoading(true);
      try {
        // 1. Fetch total jobs
        const { data: companyJobs, error: jobsError } = await supabase
          .from('jobs')
          .select('id, title, is_active')
          .eq('company_id', companyId);

        if (jobsError) throw jobsError;
        setJobs(companyJobs || []);

        const jobIds = companyJobs.map(j => j.id);
        
        if (jobIds.length > 0) {
          // 2. Fetch applications with AI scores
          const { data: apps, error: appsError } = await supabase
            .from('applications')
            .select(`
              id, 
              status, 
              created_at, 
              users:user_id(
                email,
                profiles(full_name)
              ),
              jobs(title),
              application_ai_data(match_score)
            `)
            .in('job_id', jobIds)
            .order('created_at', { ascending: false });

          if (appsError) throw appsError;

          // 3. Process Stats
          const processedApps = apps.map(app => ({
            ...app,
            full_name: app.users?.profiles?.[0]?.full_name || app.users?.email || 'Unknown',
            ai_score: app.application_ai_data?.[0]?.match_score || 0
          }));

          setApplicants(processedApps.slice(0, 10)); // Top 10 for "Recent" table

          setStatsData({
            activeJobs: companyJobs.filter(j => j.is_active).length,
            totalApplicants: processedApps.length,
            aiShortlisted: processedApps.filter(a => a.ai_score >= 80).length,
            shortlisted: processedApps.filter(a => a.status === 'shortlisted').length,
            interview: processedApps.filter(a => a.status === 'interview').length,
            offered: processedApps.filter(a => a.status === 'offered').length
          });
        }
      } catch (err) {
        console.error('Dashboard data fetch error:', err);
      } finally {
        setIsDataLoading(false);
      }
    };

    fetchDashboardData();
  }, [user]);

  const stats = [
    { name: "Active Jobs", value: statsData.activeJobs.toString(), icon: Briefcase, trend: "Live postings", color: "text-blue-600", bg: "bg-blue-50" },
    { name: "Total Applicants", value: statsData.totalApplicants.toString(), icon: Users, trend: "Across current roles", color: "text-teal", bg: "bg-teal/10" },
    { name: "Hiring Pipeline", value: `${statsData.shortlisted + statsData.interview + statsData.offered}`, icon: Zap, trend: "Active leads", color: "text-amber-600", bg: "bg-amber-50" },
    { name: "Top Matches", value: statsData.aiShortlisted.toString(), icon: TrendingUp, trend: "AI Score > 80%", color: "text-purple-600", bg: "bg-purple-50" },
  ];


  if (isLoading || isDataLoading) {
    return (
      <div className="min-h-[400px] flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-teal"></div>
      </div>
    );
  }
  return (
    <div className="space-y-8">
      {/* Header Section */}
      <div>
        <h1 className="text-2xl font-bold text-forest">Dashboard Overview</h1>
        <p className="text-text-muted mt-1 font-medium">Welcome back! Here&apos;s what&apos;s happening with your hiring today.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <div key={stat.name} className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-300">
            <div className="flex items-center justify-between mb-4">
              <div className={`p-3 ${stat.bg} rounded-xl ${stat.color}`}>
                <stat.icon size={24} />
              </div>
              <button className="text-text-muted hover:text-forest">
                <MoreVertical size={20} />
              </button>
            </div>
            <div>
              <p className="text-sm font-semibold text-text-muted">{stat.name}</p>
              <h3 className="text-3xl font-bold text-forest mt-1">{stat.value}</h3>
              <p className="text-xs font-medium text-teal mt-2 flex items-center gap-1">
                <ArrowUpRight size={14} />
                {stat.trend}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Applicants Table */}
        <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm overflow-hidden">
          <div className="p-6 border-b border-[#f1f5f9] flex items-center justify-between">
            <h3 className="font-bold text-forest">Recent Applicants</h3>
            <button className="text-sm font-bold text-teal hover:text-forest transition-colors">View All</button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left font-medium">
              <thead>
                <tr className="bg-[#f8fafc] text-text-muted text-[11px] uppercase tracking-wider">
                  <th className="px-6 py-4">Candidate</th>
                  <th className="px-6 py-4">Role</th>
                  <th className="px-6 py-4 text-center">AI Score</th>
                  <th className="px-6 py-4">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#f1f5f9]">
                {applicants.length > 0 ? applicants.map((app) => (
                  <tr key={app.id} className="hover:bg-[#f8fafc] transition-colors group">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 bg-forest/5 rounded-full flex items-center justify-center font-bold text-forest text-xs">
                          {app.profiles?.full_name?.split(' ').map(n => n[0]).join('') || "?"}
                        </div>
                        <div>
                          <p className="text-sm font-bold text-forest">{app.profiles?.full_name || "Anonymous"}</p>
                          <p className="text-[10px] text-text-muted">{new Date(app.created_at).toLocaleDateString()}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-text-muted">{app.jobs?.title}</td>
                    <td className="px-6 py-4 text-center">
                      <span className={`px-2 py-1 rounded-lg text-xs font-bold ${app.ai_score >= 80 ? "bg-teal/10 text-teal" : "bg-amber-50 text-amber-600"
                        }`}>
                        {app.ai_score || 0}%
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-xs font-bold text-teal capitalize">{app.status}</span>
                    </td>
                  </tr>
                )) : (
                  <tr>
                    <td colSpan="4" className="px-6 py-10 text-center text-text-muted font-medium">
                      No applicants yet. Keep it up!
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* AI Insights Card */}
        <div className="bg-forest rounded-2xl p-8 text-white relative overflow-hidden shadow-lg">
          <div className="relative z-10 flex flex-col h-full">
            <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center mb-6">
              <Zap size={24} className="text-aqua" />
            </div>
            <h3 className="text-xl font-bold mb-2">AI Insights</h3>
            <p className="text-white/70 text-sm leading-relaxed mb-8 font-medium">
              Your "Senior Frontend Engineer" role has 3 new applicants that match over 90% of your requirements.
            </p>
            <div className="mt-auto">
              <button className="w-full py-3 bg-aqua hover:bg-white text-forest rounded-xl font-bold text-sm transition-all duration-300">
                View Recommendations
              </button>
            </div>
          </div>
          {/* Decorative Elements */}
          <div className="absolute top-[-20%] right-[-20%] w-64 h-64 bg-white/5 blur-[80px] rounded-full" />
          <div className="absolute bottom-[-10%] left-[-10%] w-32 h-32 bg-teal/20 blur-[40px] rounded-full" />
        </div>
      </div>
    </div>
  );
}
