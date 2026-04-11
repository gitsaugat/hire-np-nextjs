"use client";

import React from "react";
import {
  Users,
  Briefcase,
  Zap,
  TrendingUp,
  ArrowUpRight,
  MoreVertical
} from "lucide-react";

const stats = [
  { name: "Active Jobs", value: "12", icon: Briefcase, trend: "+2 this month", color: "text-blue-600", bg: "bg-blue-50" },
  { name: "Total Applicants", value: "486", icon: Users, trend: "+12% vs last month", color: "text-teal", bg: "bg-teal/10" },
  { name: "AI Shortlisted", value: "84", icon: Zap, trend: "17% conversion", color: "text-amber-600", bg: "bg-amber-50" },
  { name: "Hiring Rate", value: "24%", icon: TrendingUp, trend: "+4% improvement", color: "text-purple-600", bg: "bg-purple-50" },
];

const recentApplicants = [
  { name: "Suman Shrestha", role: "Senior Frontend Engineer", score: 94, status: "Shortlisted", date: "2h ago" },
  { name: "Anjali Rayamajhi", role: "Product Designer", score: 88, status: "Interviewing", date: "5h ago" },
  { name: "Biraj Thapa", role: "Backend Developer", score: 82, status: "Applied", date: "8h ago" },
  { name: "Nikita Sharma", role: "Mobile Lead", score: 91, status: "Shortlisted", date: "1d ago" },
];

export default function DashboardPage() {
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
                {recentApplicants.map((app) => (
                  <tr key={app.name} className="hover:bg-[#f8fafc] transition-colors group">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 bg-forest/5 rounded-full flex items-center justify-center font-bold text-forest text-xs">
                          {app.name.split(' ').map(n => n[0]).join('')}
                        </div>
                        <div>
                          <p className="text-sm font-bold text-forest">{app.name}</p>
                          <p className="text-[10px] text-text-muted">{app.date}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-text-muted">{app.role}</td>
                    <td className="px-6 py-4 text-center">
                      <span className={`px-2 py-1 rounded-lg text-xs font-bold ${app.score >= 90 ? "bg-teal/10 text-teal" : "bg-amber-50 text-amber-600"
                        }`}>
                        {app.score}%
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-xs font-bold text-teal">{app.status}</span>
                    </td>
                  </tr>
                ))}
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
