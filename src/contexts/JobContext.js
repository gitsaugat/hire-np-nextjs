"use client";

import React, { createContext, useContext, useState, useEffect, useMemo } from "react";
import { supabase } from "@/lib/supabaseClient";

const JobContext = createContext();

export function JobProvider({ children }) {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState("");
  const [filters, setFilters] = useState({ type: "", location: "", experience: "" });
  const [selectedJobId, setSelectedJobId] = useState(null);

  const fetchJobs = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('jobs')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setJobs(data || []);
      
      // Select first job if none selected
      if (data && data.length > 0 && !selectedJobId) {
        setSelectedJobId(data[0].id);
      }
    } catch (err) {
      console.error('Error fetching jobs:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  const filteredJobs = useMemo(() => {
    return jobs.filter(j => {
      const matchQuery = !query ||
        j.title.toLowerCase().includes(query.toLowerCase()) ||
        j.company_name?.toLowerCase().includes(query.toLowerCase()) ||
        j.description?.toLowerCase().includes(query.toLowerCase());

      const normalizedJobType = j.job_type?.toLowerCase().replace('_', '-');
      const matchType = !filters.type ||
        normalizedJobType === filters.type.toLowerCase();

      const matchLoc = !filters.location ||
        j.location?.toLowerCase().includes(filters.location.toLowerCase());

      const matchExp = !filters.experience ||
        j.experience_level?.toLowerCase() === filters.experience.toLowerCase();

      return matchQuery && matchType && matchLoc && matchExp;
    });
  }, [jobs, query, filters]);

  const value = {
    jobs,
    filteredJobs,
    loading,
    query,
    setQuery,
    filters,
    setFilters,
    selectedJobId,
    setSelectedJobId,
    refreshJobs: fetchJobs
  };

  return <JobContext.Provider value={value}>{children}</JobContext.Provider>;
}

export const useJobs = () => {
  const context = useContext(JobContext);
  if (!context) throw new Error("useJobs must be used within a JobProvider");
  return context;
};
