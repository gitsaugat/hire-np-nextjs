"use client";

import React, { useState, useMemo, useRef, useEffect } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import Logo from "@/components/Logo";
import AuthBanner from "./AuthBanner";
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
  Globe
} from "lucide-react";

const JOBS_DATA = [
  {
    id: 1,
    title: "AI Engineer",
    company: "NovaTech",
    logoInitials: "NT",
    location: "Kathmandu",
    locationType: "Remote",
    type: "Full-time",
    experience: "Senior",
    salary: "$2k - $4k",
    tags: ["AI", "Python", "LLMs"],
    preview: "Scale our LLM infrastructure and integrate multi-modal AI models into our core platform.",
    description: "NovaTech is leading the next wave of AI innovation in South Asia. We are looking for an AI Engineer who is passionate about large language models, computer vision, and building scalable production systems.",
    responsibilities: [
      "Design and implement scalable machine learning pipelines using PyTorch and FastAPI.",
      "Optimize LLM inference performance for real-time user interactions.",
      "Collaborate with product teams to integrate AI features into the user dashboard."
    ],
    requirements: [
      "3+ years of experience in Software Engineering or Machine Learning.",
      "Proficiency in Python and deep learning frameworks like PyTorch or TensorFlow.",
      "Experience with Vector Databases (Pinecone, Weaviate, etc.)."
    ],
    aboutCompany: "NovaTech is a series-A funded startup based in Kathmandu, focused on democratizing AI for emerging markets."
  },
  {
    id: 2,
    title: "Backend Engineer",
    company: "DataForge",
    logoInitials: "DF",
    location: "Lalitpur",
    locationType: "Onsite",
    type: "Full-time",
    experience: "Mid",
    salary: "$1.2k - $2k",
    tags: ["Go", "Kubernetes", "Redis"],
    preview: "Architect high-performance distributed systems managing petabytes of financial data.",
    description: "DataForge provides the backbone for digital finance across Nepal. As a Backend Engineer, you'll be responsible for building secure, low-latency APIs.",
    responsibilities: [
      "Develop and maintain high-concurrency microservices in Go.",
      "Maintain and optimize our PostgreSQL databases and caching layers.",
      "Implement rigorous security protocols for financial data handling."
    ],
    requirements: [
      "Strong proficiency in Go or Java.",
      "Hands-on experience with distributed system design and CAP theorem.",
      "Experience with relational databases and SQL optimization."
    ],
    aboutCompany: "DataForge is Nepal's leading fintech infrastructure provider, partnering with major banks."
  },
  {
    id: 3,
    title: "Product Manager",
    company: "Orbit Systems",
    logoInitials: "OS",
    location: "Remote",
    locationType: "Remote",
    type: "Full-time",
    experience: "Senior",
    salary: "$2.5k+",
    tags: ["SaaS", "Product", "Strategy"],
    preview: "Define the roadmap for our next-generation project management suite for creative teams.",
    description: "Orbit Systems creates tools that help creative professionals stay in 'the flow'. We need a Product Manager who can balance technical constraints with user delight.",
    responsibilities: [
      "Translate user needs into detailed PRDs and user stories.",
      "Prioritize the product backlog based on data-driven insights.",
      "Coordinate across design and engineering teams."
    ],
    requirements: [
      "4+ years of experience in product management, preferably in B2B SaaS.",
      "Excellent communication skills and cross-functional leadership.",
      "Deep understanding of Agile methodologies."
    ],
    aboutCompany: "Orbit Systems is a remote-first team building beautiful software for the modern creative."
  },
  {
    id: 4,
    title: "UI/UX Designer",
    company: "Pixel Perfect",
    logoInitials: "PP",
    location: "Kathmandu",
    locationType: "Hybrid",
    type: "Full-time",
    experience: "Mid",
    salary: "$1k - $1.8k",
    tags: ["Figma", "Design System"],
    preview: "Create stunning, accessible interfaces for a diverse range of global clients.",
    description: "Pixel Perfect is a design-first agency. We are looking for a Senior UI/UX Designer who obsesses over typography and usability.",
    responsibilities: [
      "Create high-fidelity wireframes and interactive prototypes in Figma.",
      "Maintain and evolve our internal design system.",
      "Work closely with developers to ensure pixel-perfect implementation."
    ],
    requirements: [
      "A strong portfolio showcasing clean, modern design work.",
      "Expertise in Figma and advanced prototyping tools.",
      "Understanding of accessibility standards (WCAG 2.1)."
    ],
    aboutCompany: "Pixel Perfect is Nepal's premier design studio, known for international-standard products."
  },
  {
    id: 5,
    title: "DevOps Lead",
    company: "CloudScale",
    logoInitials: "CS",
    location: "Remote",
    locationType: "Remote",
    type: "Contract",
    experience: "Senior",
    salary: "Competitive",
    tags: ["AWS", "Terraform", "CI/CD"],
    preview: "Lead our cloud infrastructure transformation and implement automated CI/CD pipelines.",
    description: "CloudScale helps enterprises move to the cloud with confidence. You will architect global cloud infrastructure and cultivate automation.",
    responsibilities: [
      "Manage and scale multi-region AWS environments using Terraform.",
      "Build and maintain robust CI/CD pipelines.",
      "Monitor system health and perform incident response."
    ],
    requirements: [
      "5+ years of experience in DevOps or SRE roles.",
      "Deep expertise in Docker and Kubernetes orchestration.",
      "Strong scripting skills in Python, Bash, or Go."
    ],
    aboutCompany: "CloudScale is a boutique cloud consultancy based in the UK with a growing hub in Nepal."
  },
  {
    id: 6,
    title: "Senior Lead Frontend",
    company: "WebFlow Inc",
    logoInitials: "WF",
    location: "Kathmandu",
    locationType: "Onsite",
    type: "Full-time",
    experience: "Senior",
    salary: "$1.8k - $3k",
    tags: ["React", "Next.js", "Motion"],
    preview: "Build blazing fast, responsive web applications using the latest React ecosystem.",
    description: "WebFlow Inc creates specialized e-commerce solutions. We need a developer obsessed with performance and clean React code.",
    responsibilities: [
      "Implement UI features using React and Next.js.",
      "Optimize performance for low-bandwidth environments.",
      "Collaborate with designers to implement motion details."
    ],
    requirements: [
      "Proficient in Modern React (Hooks) and CSS.",
      "Experience with Tailwind CSS.",
      "Solid understanding of browser APIs."
    ],
    aboutCompany: "WebFlow Inc is a high-growth startup building the next generation of e-commerce tools."
  }
];

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
        <div className="absolute right-0 mt-3 w-60 bg-white rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.15)] border border-slate-100 py-2 z-[100] animate-in fade-in zoom-in-95 duration-200">
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
                <p className="text-sm font-bold text-[#0d4f3c]">{user?.name || "Member"}</p>
                <p className="text-[11px] text-slate-500 truncate">{user?.email || "member@hire-np.ai"}</p>
              </div>
              {[
                { label: "Profile", icon: User },
                { label: "My Applications", icon: FileText, badge: "3" },
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
                  {item.badge && <span className="bg-[#0f9e76] text-white text-[10px] px-1.5 py-0.5 rounded-full">{item.badge}</span>}
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
      <div className="max-w-[1440px] mx-auto flex items-center justify-between gap-6">
        <Link href="/">
          <Logo textColor="text-[#0d4f3c]" />
        </Link>

        <div className="flex-1 max-w-xl hidden md:block">
          <div className="relative group">
            <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-[#0f9e76] transition-colors" />
            <input
              type="text" value={query} onChange={(e) => setQuery(e.target.value)}
              placeholder="Search jobs, roles, or skills..."
              className="w-full bg-slate-50/50 border border-slate-200 rounded-2xl py-2.5 pl-11 pr-4 text-sm focus:outline-none focus:ring-4 focus:ring-[#0f9e76]/5 focus:border-[#0f9e76] transition-all placeholder:text-slate-400"
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
    className={`group relative p-4 mb-3 transition-all duration-300 border rounded-[20px] cursor-pointer overflow-hidden ${isActive
        ? "bg-white border-[#0f9e76]/30 shadow-[0_15px_30px_rgba(0,0,0,0.06)] scale-[1.01]"
        : "bg-white/50 border-slate-100 hover:border-slate-200 hover:bg-white hover:shadow-md"
      }`}
  >
    {/* Active indicator */}
    <div className={`absolute left-0 top-0 bottom-0 w-1.5 bg-gradient-to-b from-[#0d4f3c] to-[#0f9e76] transition-transform duration-300 ${isActive ? "translate-x-0" : "-translate-x-full"}`} />

    <div className="flex gap-4">
      <div className={`shrink-0 w-11 h-11 rounded-1.5xl flex items-center justify-center font-bold text-sm transition-all shadow-sm ${isActive ? "bg-[#0d4f3c] text-white rotate-3" : "bg-slate-50 text-[#0d4f3c] group-hover:bg-[#0f9e76] group-hover:text-white"
        }`}>
        {job.logoInitials}
      </div>
      <div className="min-w-0 flex-1">
        <div className="flex items-center justify-between gap-2">
          <h3 className={`font-bold text-[15px] truncate transition-colors ${isActive ? "text-[#0f9e76]" : "text-[#0d4f3c]"}`}>
            {job.title}
          </h3>
          <span className="text-[10px] font-black text-[#0f9e76] bg-[#0f9e76]/5 px-2 py-0.5 rounded-full whitespace-nowrap">
            {job.salary}
          </span>
        </div>
        <p className="text-[12px] font-medium text-slate-500 mb-2">{job.company}</p>

        <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5">
          <span className="flex items-center gap-1 text-[10px] font-semibold text-slate-400">
            <MapPin size={12} className="text-slate-300" /> {job.locationType}
          </span>
          <span className="flex items-center gap-1 text-[10px] font-semibold text-slate-400">
            <Briefcase size={12} className="text-slate-300" /> {job.experience}
          </span>
          <span className="flex items-center gap-1 text-[10px] font-semibold text-slate-400">
            <Clock size={12} className="text-slate-300" /> Just now
          </span>
        </div>
      </div>
    </div>

    <div className="flex flex-wrap gap-1.5 mt-3 pt-3 border-t border-slate-50">
      {job.tags.map(tag => (
        <span key={tag} className="px-2 py-0.5 rounded-lg bg-slate-50 text-slate-500 text-[9px] font-bold uppercase tracking-wider group-hover:bg-[#0f9e76]/5 group-hover:text-[#0f9e76] transition-colors">
          {tag}
        </span>
      ))}
    </div>
  </div>
);

const JobDetail = ({ job }) => {
  const { isLoggedIn } = useAuth();
  const router = useRouter();

  const handleApply = () => {
    if (!isLoggedIn) {
      router.push(`/auth?jobId=${job.id}`);
    } else {
      alert("Application magic happening...");
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
    <div className="bg-white rounded-[24px] border border-slate-100 shadow-[0_10px_40px_rgba(0,0,0,0.04)] h-full flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-2 duration-400">
      {/* Compact Header */}
      <div className="p-6 border-b border-slate-50 bg-gradient-to-br from-[#0f9e76]/5 via-white to-white relative overflow-hidden shrink-0">
        <div className="absolute -top-10 -right-10 w-32 h-32 bg-[#0f9e76]/5 rounded-full blur-2xl" />

        <div className="relative flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="flex gap-4 items-center">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#0d4f3c] to-[#0f9e76] text-white flex items-center justify-center font-black text-xl shadow-lg shadow-teal/10">
              {job.logoInitials}
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <h1 className="text-2xl font-black text-[#0d4f3c] tracking-tight">{job.title}</h1>
                <span className="bg-[#0f9e76] text-white text-[8px] font-black px-2 py-0.5 rounded-full">HOT</span>
              </div>
              <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-slate-500 font-bold text-[12px]">
                <span className="flex items-center gap-1.5 text-[#0f9e76]"><Building2 size={13} /> {job.company}</span>
                <span className="flex items-center gap-1.5"><MapPin size={13} /> {job.location}</span>
                <span className="text-[#0d4f3c]">{job.salary}</span>
              </div>
            </div>
          </div>

          <div className="flex gap-2 shrink-0">
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
                className="flex-1 lg:flex-none flex items-center justify-center gap-2 px-6 py-2.5 bg-white border border-slate-200 text-[#0f9e76] text-sm font-black rounded-xl hover:bg-slate-50 transition-all hover:border-[#0f9e76]/30 shadow-sm group/btn"
              >
                <TrendingUp size={16} className="text-[#0f9e76] group-hover/btn:translate-y-[-2px] transition-transform" />
                Sign in to apply
              </button>
            )}
            <button className="p-2.5 rounded-xl bg-slate-50 text-slate-400 hover:text-[#0d4f3c] border border-slate-100">
              <Bookmark size={20} />
            </button>
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
              {job.responsibilities.map((r, i) => (
                <div key={i} className="flex gap-4 p-3 rounded-xl hover:bg-slate-50 transition-colors group">
                  <div className="w-5 h-5 rounded-full bg-[#0f9e76]/10 flex items-center justify-center shrink-0 mt-0.5">
                    <CheckCircle2 size={12} className="text-[#0f9e76]" />
                  </div>
                  <p className="text-slate-600 text-[13px] font-semibold leading-relaxed">{r}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="bg-[#0d4f3c]/5 rounded-2xl p-6 border border-[#0d4f3c]/10 relative overflow-hidden">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-1 h-4 bg-[#0d4f3c] rounded-full" />
              <h3 className="text-sm font-black text-[#0d4f3c] uppercase tracking-wider">Requirements</h3>
            </div>
            <ul className="space-y-3">
              {job.requirements.map((r, i) => (
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
  const [selectedId, setSelectedId] = useState(JOBS_DATA[0].id);

  // Sync selection with URL jobId param
  useEffect(() => {
    const jobId = searchParams.get("jobId");
    if (jobId) {
      const id = parseInt(jobId);
      if (!isNaN(id) && JOBS_DATA.some(j => j.id === id)) {
        setSelectedId(id);
      }
    }
  }, [searchParams]);

  const filteredJobs = useMemo(() => JOBS_DATA.filter(j =>
    (j.title.toLowerCase().includes(query.toLowerCase()) || j.company.toLowerCase().includes(query.toLowerCase())) &&
    (!filters.type || j.type === filters.type) && (!filters.location || j.locationType === filters.location) &&
    (!filters.experience || j.experience === filters.experience)
  ), [query, filters]);

  const activeJob = filteredJobs.find(j => j.id === selectedId) || filteredJobs[0];

  return (
    <div className="min-h-screen bg-slate-50/50">
      <Navbar query={query} setQuery={setQuery} />

      <main className="max-w-[1440px] mx-auto px-4 md:px-8 pt-6">
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
                <div className="w-1.5 h-1.5 rounded-full bg-[#0f9e76] animate-pulse" /> Updated 2m ago
              </div>
            </div>

            <div className="flex-1 overflow-y-auto pr-1 custom-scrollbar space-y-1">
              {filteredJobs.length > 0 ? (
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
            <JobDetail job={activeJob} />
          </div>

          {/* Mobile Detail Overlay (Optional: can just stack) */}
          {activeJob && (
            <div className="lg:hidden mt-4 pb-10">
              <JobDetail job={activeJob} />
            </div>
          )}
        </div>
      </main>

      {/* Mobile Search - Bottom Bar (Optional optimization) */}
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
